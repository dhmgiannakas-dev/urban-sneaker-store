import { useParams, Link } from "react-router-dom";
import "./ProductDetails.css";

function ProductDetails({
  products,
  loading,
  error,
  addToCart,
}) {
  const { productId: id } = useParams();

  const product = products.find(
    (product) => product.id === id
  );

  if (loading) {
    return (
      <main className="product-details-message">
        <p>Loading product...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="product-details-message">
        <h2>Something went wrong.</h2>
        <p>We couldn't load this product.</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="product-not-found">
        <h2>Product not found.</h2>
        <Link to="/shop">Back to Shop</Link>
      </main>
    );
  }

  return (
    <main className="product-details">
      <div className="product-details-image">
        <img
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-details-content">
        <p className="product-details-brand">
          {product.brand}
        </p>

        <h1>{product.name}</h1>

        <p className="product-details-price">
          €{product.price}
        </p>

        <div className="product-info-card">
          <div className="product-info-row">
            <span>Brand</span>
            <strong>{product.brand}</strong>
          </div>

          {product.model && (
            <div className="product-info-row">
              <span>Model</span>
              <strong>{product.model}</strong>
            </div>
          )}

          <div className="product-info-row">
            <span>Category</span>
            <strong>
              {product.categories.length > 0
                ? product.categories.join(", ")
                : "—"}
            </strong>
          </div>

          <div className="product-info-row">
            <span>Color</span>
            <strong>
              {product.colors.length > 0
                ? product.colors.join(", ")
                : "—"}
            </strong>
          </div>

          {product.gender && (
            <div className="product-info-row">
              <span>Gender</span>
              <strong>{product.gender}</strong>
            </div>
          )}
        </div>

        <button
          className="product-details-button"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </main>
  );
}

export default ProductDetails;