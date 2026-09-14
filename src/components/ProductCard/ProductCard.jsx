import { Link } from "react-router-dom";
import "./ProductCard.css";
import { useState } from "react";

function ProductCard({ product, addToCart }) {
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1000);
  }

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.name} />
      </Link>

      <h3>{product.name}</h3>
      <p>€{product.price}</p>

      <button onClick={handleAddToCart}>{added ? "Added ✓" : "Add to cart"}</button>
    </div>
  );
}


export default ProductCard;