import { Link } from "react-router-dom";
import useAddToCart  from "../../hooks/useAddToCart";

import "./ProductCard.css";

function ProductCard({ product }) {
const { added, handleAddToCart } = useAddToCart(product);

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