import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import Success from "./pages/Success/Success";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";


function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home />
          }
        />

        <Route
          path="/shop"
          element={
            <Shop />
          }
        />

        <Route
          path="/products/:productId"
          element={
            <ProductDetails />
          }
        />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;