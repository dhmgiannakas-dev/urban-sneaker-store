import { useState, useEffect } from "react";
import { fetchProducts } from "../services/productService";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setLoading(true);
      setError(false);

      try {
        const data = await fetchProducts(
          controller.signal
        );

        if (controller.signal.aborted) return;

        setProducts(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Products loading error:", error);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, []);

  return { products, loading, error };
}