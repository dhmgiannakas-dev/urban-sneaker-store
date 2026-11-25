import { getColors } from "../data/Products";

const MAX_PRODUCTS = 40;

const BRANDS = [
  { name: "Nike", limit: 8 },
  { name: "Adidas", limit: 8 },
  { name: "New Balance", limit: 7 },
  { name: "ASICS", limit: 7 },
  { name: "Puma", limit: 5 },
  { name: "Converse", limit: 5 },
];

// Stable demo price
function getDemoPrice(id) {
  const hash = String(id)
    .split("")
    .reduce(
      (total, char) => total + char.charCodeAt(0),
      0
    );

  return 90 + (hash % 151);
}

// Validate product image
export function hasValidImage(product) {
  const image = product.image;

  return (
    typeof image === "string" &&
    image.trim().length > 0 &&
    !image.toLowerCase().includes("placeholder")
  );
}

// Validate product category
export function isSneaker(product) {
  return product.category === "shoes";
}

// Determine product categories
function getCategories(title) {
  const name = String(title || "").toLowerCase();

  if (name.includes("jordan")) {
    return ["Basketball", "Lifestyle"];
  }

  if (
    name.includes("air max") ||
    name.includes("gel")
  ) {
    return ["Running", "Lifestyle"];
  }

  if (
    name.includes("samba") ||
    name.includes("9060") ||
    name.includes("suede")
  ) {
    return ["Lifestyle"];
  }

  return ["Other"];
}

// Normalize product gender
function getGender(gender) {
  const value = String(gender || "")
    .trim()
    .toLowerCase();

  const genderMap = {
    men: "Men",
    women: "Women",
    youth: "Kids",
    infant: "Kids",
    unisex: "Unisex",
  };

  return genderMap[value] || "Unknown";
}

// Normalize API product
export function normalizeProduct(product) {
  const apiPrice = Number(product.avg_price);

  const hasApiPrice =
    Number.isFinite(apiPrice) && apiPrice > 0;

  const price = hasApiPrice
    ? apiPrice
    : getDemoPrice(product.id);

  return {
    id: product.id,
    name: product.title,
    brand: product.brand || "Unknown",
    price,
    image: product.image,
    categories: getCategories(product.title),
    colors: getColors(
      product.color || product.title || ""
    ),
    model: product.model || "",
    gender: getGender(product.gender),
    description:
      product.description ||
      product.short_description ||
      product.title ||
      "",
    minPrice:
      Number(product.min_price) > 0
        ? Number(product.min_price)
        : price,
    maxPrice:
      Number(product.max_price) > 0
        ? Number(product.max_price)
        : price,
    isDemoPrice: !hasApiPrice,
  };
}

// Balance products by brand
export function getBalancedProducts(products) {
  const selected = [];
  const usedIds = new Set();

  for (const brand of BRANDS) {
    const brandProducts = products.filter(
      (product) =>
        String(product.brand || "")
          .toLowerCase()
          .includes(brand.name.toLowerCase()) &&
        !usedIds.has(product.id)
    );

    const chosen = brandProducts.slice(
      0,
      brand.limit
    );

    for (const product of chosen) {
      selected.push(product);
      usedIds.add(product.id);
    }
  }

  if (selected.length < MAX_PRODUCTS) {
    const remaining = products.filter(
      (product) => !usedIds.has(product.id)
    );

    selected.push(
      ...remaining.slice(
        0,
        MAX_PRODUCTS - selected.length
      )
    );
  }

  return selected.slice(0, MAX_PRODUCTS);
}

export function processProducts(products) {
    const apiProducts = Array.isArray(products)
    ? products
    : [];

  const uniqueProducts = [
    ...new Map(
      apiProducts
        .filter((product) => product?.id)
        .map((product) => [product.id, product])
    ).values(),
  ];

  const validProducts = uniqueProducts.filter(
    (product) =>
      isSneaker(product) &&
      hasValidImage(product)
  );

  const balancedProducts =
    getBalancedProducts(validProducts);

  return balancedProducts.map(normalizeProduct);
}
