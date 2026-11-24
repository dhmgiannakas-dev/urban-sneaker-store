import ProductCard from "../../components/ProductCard/ProductCard";
import ShopFilters from "../../components/ShopFilters/ShopFilters";

import { useProductFilters } from "../../hooks/useProductFilters";

import "./Shop.css";

function Shop({ products, loading, error }) {
  const filters = useProductFilters(products);
  const { filteredProducts } = filters;

  if (loading) {
    return (
      <main className="shop-page">
        <p className="loading-message">
          Loading products...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="shop-page">
        <div className="error-message">
          <h2>Something went wrong.</h2>
          <p>We couldn't load the products.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="shop-page">
      <h1>Shop</h1>

      <div className="shop-layout">
        <ShopFilters filters={filters} />

        <section className="shop-products">
          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="products-grid shop-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Shop;