import { Link } from "react-router-dom";

import Hero from "../../components/Hero/Hero";
import ProductCard from "../../components/ProductCard/ProductCard";
import ComingSoonCard from "../../components/ComingSoonCard/ComingSoonCard";

import { useGetProductsQuery } from "../../store/api/productsApi";

import { comingSoonProducts } from "../../data/Products";

import "./Home.css";

function Home() {
  const {
    data: products = [],
    isLoading: loading,
    isError: error,
  } = useGetProductsQuery();

const queryResult = useGetProductsQuery();

console.log("RTK Query:", queryResult);

  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <Hero />

      {loading ? (
        <div
          className="loading-container"
          role="status"
          aria-live="polite"
        >
          <div
            className="loading-spinner"
            aria-hidden="true"
          />

          <h2>Loading sneakers...</h2>
        </div>
      ) : error ? (
        <p>Failed to load products. Please try again.</p>
      ) : (
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

          <div className="products-grid featured-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>
      )}

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