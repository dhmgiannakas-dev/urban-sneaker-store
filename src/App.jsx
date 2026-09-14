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


function getColors(colorway = "") {
  const color = colorway.toLowerCase();

  const colors = [];

  if (
    color.includes("red") ||
    color.includes("toro bravo") ||
    color.includes("chicago")
  ) {
    colors.push("Red");
  }

  if (
    color.includes("black") ||
    color.includes("bred")
  ) {
    colors.push("Black");
  }

  if (
    color.includes("white") ||
    color.includes("sail")
  ) {
    colors.push("White");
  }

  if (
    color.includes("blue") ||
    color.includes("unc")
  ) {
    colors.push("Blue");
  }

  if (color.includes("green")) colors.push("Green");

  if (
    color.includes("grey") ||
    color.includes("gray") ||
    color.includes("silver")
  ) {
    colors.push("Grey");
  }

  if (
    color.includes("brown") ||
    color.includes("mocha")
  ) {
    colors.push("Brown");
  }

  if (color.includes("pink")) colors.push("Pink");
  if (color.includes("purple")) colors.push("Purple");
  if (color.includes("orange")) colors.push("Orange");
  if (color.includes("yellow")) colors.push("Yellow");

  if (
    color.includes("beige") ||
    color.includes("cream")
  ) {
    colors.push("Beige");
  }

  return colors.length > 0 ? colors : ["Other"];
}

function App() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setProductsLoading(true);
        setProductsError(false);

        const apiKey = import.meta.env.VITE_KICKS_API_KEY;

        const response = await fetch(
          "https://api.kicks.dev/v3/stockx/products?limit=100&display[traits]=true",
          {
            headers: {
              Authorization: apiKey,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        const normalizedProducts = data.data.map((product) => ({
          id: product.id,
          name: product.title,
          brand: product.brand,
          price: product.avg_price,
          image: product.image,
          categories: product.categories || [],
          colors: getColors(product.secondary_title),
          model: product.model,
          gender: product.gender,
          description: product.description,
          minPrice: product.min_price,
          maxPrice: product.max_price,
        }));

        setProducts(normalizedProducts);

      } catch (error) {
        setProductsError(true);
        console.error(error);
      } finally {
        setProductsLoading(false);
      }
    }

    fetchProducts();
  }, []);


  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart((prev) => {
      const existingProduct = prev.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function increaseQuantity(productId) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function decreaseQuantity(productId) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  function removeFromCart(productId) {
    setCart((prev) =>
      prev.filter((item) => item.id !== productId)
    );
  }

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
        <Route path="/cart" element={<Cart cart={cart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart} clearCart={clearCart} />} />
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
          element={<Checkout cart={cart} clearCart={clearCart} />}
        />
        <Route
          path="/success"
          element={<Success />}
        />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/about"
          element={<About />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;