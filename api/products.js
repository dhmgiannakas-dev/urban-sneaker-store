const API_URL = "https://solescout.ai/api/public/search";

const SEARCHES = [
  "Nike Air Max",
  "Jordan",
  "Adidas Samba",
  "New Balance 9060",
  "ASICS Gel",
  "Puma Suede",
];

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const allProducts = [];
    let successfulRequests = 0;

    // Requests run sequentially to limit concurrency
    for (const search of SEARCHES) {
      const url = new URL(API_URL);

      url.searchParams.set("q", search);
      url.searchParams.set("limit", "20");

      try {
        const response = await fetch(url.toString(), {
          signal: AbortSignal.timeout(5000),
        });

        if (!response.ok) {
          console.error(
            `SoleScout ${search}: HTTP ${response.status}`
          );
          continue;
        }

        const data = await response.json();

        if (Array.isArray(data.results) && data.results.length > 0) {
          allProducts.push(...data.results);
          successfulRequests++;
        }
      } catch (error) {
        console.error(
          `SoleScout request failed for ${search}:`,
          error.message
        );
      }
    }

    if (successfulRequests === 0) {
      return res.status(502).json({
        error: "Unable to retrieve products",
      });
    }

    const uniqueProducts = [
      ...new Map(
        allProducts
          .filter((product) => product?.slug)
          .map((product) => [product.slug, product])
      ).values(),
    ];

    // Return only fields needed by the frontend
const products = uniqueProducts
  .filter(
    (product) =>
      product.category === "shoes" &&
      product.title &&
      product.image &&
      Number.isFinite(product.lowest_price_usd) &&
      product.lowest_price_usd > 0
  )
  .map((product) => ({
    id: product.slug,
    title: product.title,
    brand: product.brand,
    avg_price: product.lowest_price_usd,
    min_price: product.lowest_price_usd,
    max_price: product.retail_price_usd,
    image: product.image,
    category: product.category,
    gender: product.gender,
    style_code: product.style_code,
    source_url: product.url,
  }));

    // Cache the public response at Vercel's edge
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=3600"
    );

    return res.status(200).json({
      data: products,
    });
  } catch (error) {
    console.error("Products function error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
