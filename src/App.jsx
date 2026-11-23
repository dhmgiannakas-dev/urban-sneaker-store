
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Shop from "./pages/Shop/Shop";
import Checkout from "./pages/Checkout/Checkout";
import Success from "./pages/Success/Success";
import NotFound from "./pages/NotFound/NotFound";
import Footer from "./components/Footer/Footer";
import About from "./pages/About/About";

import { getColors } from "./data/Products";

// API CONFIGURATION
const API_URL = "https://api.kicks.dev/v3/stockx/products";

const CACHE_KEY = "portfolio_sneakers_v3";
const CACHE_DURATION = 24 * 60 * 60 * 1000;
const MAX_PRODUCTS = 40;

// Brands and target product counts
const BRANDS = [
  { name: "Nike", query: "Nike", limit: 8 },
  { name: "Adidas", query: "Adidas", limit: 8 },
  { name: "New Balance", query: "New Balance", limit: 7 },
  { name: "ASICS", query: "ASICS", limit: 7 },
  { name: "Puma", query: "Puma", limit: 5 },
  { name: "Converse", query: "Converse", limit: 5 },
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

// Validate image
function hasValidImage(product) {
  const image = product.image;

  return (
    typeof image === "string" &&
    image.trim().length > 0 &&
    !image.toLowerCase().includes("placeholder")
  );
}

// Check sneaker category
function isSneaker(product) {
  const categories = Array.isArray(product.categories)
    ? product.categories
    : [];

  const categoryMatch = categories.some(
    (category) =>
      typeof category === "string" &&
      (
        category.toLowerCase().includes("sneaker") ||
        category.toLowerCase().includes("footwear")
      )
  );

  const singleCategory = String(
    product.category || ""
  ).toLowerCase();

  return (
    categoryMatch ||
    singleCategory.includes("sneaker") ||
    singleCategory.includes("footwear")
  );
}

// Normalize product
function normalizeProduct(product) {
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
    categories: product.categories || [],
    colors: getColors(product.secondary_title || ""),
    model: product.model || "",
    gender: product.gender || "",
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

// Get products with balanced brand distribution
function getBalancedProducts(products) {
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

    const chosen = brandProducts.slice(0, brand.limit);

    for (const product of chosen) {
      selected.push(product);
      usedIds.add(product.id);
    }
  }

  // Fill remaining slots with other valid products
  if (selected.length < MAX_PRODUCTS) {
    const remaining = products.filter(
      (product) => !usedIds.has(product.id)
    );

    selected.push(
      ...remaining.slice(0, MAX_PRODUCTS - selected.length)
    );
  }

  return selected.slice(0, MAX_PRODUCTS);
}

function App() {
  // PRODUCTS STATE
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(false);


useEffect(() => {
  const controller = new AbortController();

  async function fetchProducts() {
    setProductsLoading(true);
    setProductsError(false);

    try {
      const response = await fetch("/api/products", {
        signal: controller.signal,
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

      const normalizedProducts =
        balancedProducts.map(normalizeProduct);

      if (controller.signal.aborted) return;

      setProducts(normalizedProducts);

    } catch (error) {
      if (error.name !== "AbortError") {
        setProductsError(true);
      }
    } finally {
      if (!controller.signal.aborted) {
        setProductsLoading(false);
      }
    }
  }

  fetchProducts();

  return () => controller.abort();
}, []);


  // CART STATE
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      const parsed = savedCart
        ? JSON.parse(savedCart)
        : [];

      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // SAVE CART
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ADD TO CART
  function addToCart(product) {
    setCart((prev) => {
      const existingProduct = prev.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  }

  // INCREASE QUANTITY
  function increaseQuantity(productId) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? {
            ...item,
            quantity: item.quantity + 1,
          }
          : item
      )
    );
  }

  // DECREASE QUANTITY
  function decreaseQuantity(productId) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.quantity > 1
          ? {
            ...item,
            quantity: item.quantity - 1,
          }
          : item
      )
    );
  }

  // REMOVE PRODUCT
  function removeFromCart(productId) {
    setCart((prev) =>
      prev.filter((item) => item.id !== productId)
    );
  }

  // CLEAR CART
  function clearCart() {
    setCart([]);
  }

  return (
    <>
      <Navbar cart={cart} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={products}
              loading={productsLoading}
              error={productsError}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/products/:productId"
          element={
            <ProductDetails
              products={products}
              loading={productsLoading}
              error={productsError}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />

        <Route
          path="/shop"
          element={
            <Shop
              products={products}
              loading={productsLoading}
              error={productsError}
              addToCart={addToCart}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              clearCart={clearCart}
            />
          }
        />

        <Route
          path="/success"
          element={<Success />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
