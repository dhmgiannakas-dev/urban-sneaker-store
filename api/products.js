
const API_URL = "https://api.kicks.dev/v3/stockx/products";

const SEARCHES = [
  "Nike",
  "Adidas",
  "New Balance",
  "ASICS",
  "Puma",
  "Converse",
];

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const apiKey = process.env.KICKS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Server API key is not configured",
    });
  }

  try {
    const allProducts = [];
    let successfulRequests = 0;

    // Requests run sequentially to limit concurrency
    for (const search of SEARCHES) {
      const url = new URL(API_URL);

      url.searchParams.set("query", search);
      url.searchParams.set("limit", "100");

      try {
        const response = await fetch(url.toString(), {
          headers: {
            Authorization: apiKey,
          },
          signal: AbortSignal.timeout(5000),
        });

        if (!response.ok) {
          console.error(
            `KicksDB ${search}: HTTP ${response.status}`
          );
          continue;
        }

        const data = await response.json();

        if (Array.isArray(data.data)) {
          allProducts.push(...data.data);
          successfulRequests++;
        }
      } catch (error) {
        console.error(
          `KicksDB request failed for ${search}:`,
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
          .filter((product) => product?.id)
          .map((product) => [product.id, product])
      ).values(),
    ];

    // Return only fields needed by the frontend
    const products = uniqueProducts.map((product) => ({
      id: product.id,
      title: product.title,
      brand: product.brand,
      avg_price: product.avg_price,
      min_price: product.min_price,
      max_price: product.max_price,
      image: product.image,
      categories: product.categories,
      category: product.category,
      secondary_title: product.secondary_title,
      model: product.model,
      gender: product.gender,
      description: product.description,
      short_description: product.short_description,
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
