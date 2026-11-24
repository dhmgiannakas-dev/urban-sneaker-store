import {
  hasValidImage,
  isSneaker,
  normalizeProduct,
  getBalancedProducts,
} from "../utils/productUtils";

const API_URL = "/api/products";

export async function fetchProducts(signal) {
  const response = await fetch(API_URL, {
    signal,
  });

  if (!response.ok) {
    throw new Error(
      `Products API error: ${response.status}`
    );
  }

  const data = await response.json();

  const apiProducts = Array.isArray(data.data)
    ? data.data
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