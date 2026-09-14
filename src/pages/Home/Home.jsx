import Hero from "../../components/Hero/Hero";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";
import { comingSoonProducts } from "../../data/Products";
import ComingSoonCard from "../../components/ComingSoonCard/ComingSoonCard";
import { Link } from "react-router-dom";

function Home({ products, addToCart }) {
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <Hero />

      <section className="featured-products">
        <div className="featured-heading">
          <div>
            <p>Our Selection</p>
            <h2>Featured Products</h2>
          </div>

          <Link to="/shop" className="view-all-link">
            View All →
          </Link>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>

      <section className="coming-soon-section">
        <div className="coming-soon-heading">
          <p>What's Next</p>
          <h2>Coming Soon</h2>
        </div>

        <div className="products-grid">
          {comingSoonProducts.map((product) => (
            <ComingSoonCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;