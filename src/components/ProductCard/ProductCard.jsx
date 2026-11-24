import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import { addToCart } from "../../store/slices/cartSlice";

import "./ProductCard.css";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const [added, setAdded] = useState(false);
  const timeoutRef = useRef(null);

  function handleAddToCart() {
    dispatch(addToCart(product));
    setAdded(true);

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setAdded(false);
    }, 1000);
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="product-card">
      <Link
        to={`/products/${product.id}`}
        className="product-image-wrapper"
      >
        <img src={product.image} alt={product.name} />
      </Link>

      <h3>{product.name}</h3>

      <p>€{product.price}</p>

      <button onClick={handleAddToCart}>
        {added ? "Added ✓" : "Add to cart"}
      </button>
    </div>
  );
}

export default ProductCard;