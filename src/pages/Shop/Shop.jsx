import { useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Shop.css";

const colorStyles = {
    Black: "#111",
    White: "#fff",
    Red: "red",
    Blue: "blue",
    Green: "green",
    Grey: "gray",
    Brown: "brown",
    Pink: "pink",
    Purple: "purple",
    Orange: "orange",
    Yellow: "gold",
    Beige: "beige",
    Other: "#ddd",
};

function Shop({ products, loading, error, addToCart }) {
    const [search, setSearch] = useState("");
    const [brand, setBrand] = useState("All Brands");
    const [sort, setSort] = useState("default");
    const [productCategory, setProductCategory] = useState("All Categories");
    const [selectedColors, setSelectedColors] = useState([]);
    const [gender, setGender] = useState("All Genders");

    const hasActiveFilters =
        search !== "" ||
        brand !== "All Brands" ||
        sort !== "default" ||
        productCategory !== "All Categories" ||
        selectedColors.length > 0 ||
        gender !== "All Genders";

    function resetFilters() {
        setSearch("");
        setBrand("All Brands");
        setSort("default");
        setProductCategory("All Categories");
        setSelectedColors([]);
        setGender("All Genders");
    }

    const brands = [
        "All Brands",
        ...new Set(products.map((product) => product.brand)),
    ];

    const productCategories = [
        "All Categories",
        ...new Set(
            products.flatMap((product) => product.categories)
        ),
    ];

    const colors = [
        ...new Set(
            products.flatMap((product) => product.colors || [])
        ),
    ];

    const productGenders = [
        "All Genders",
        ...new Set(
            products.map((product) => product.gender)
        ),
    ];

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesBrand =
            brand === "All Brands" || product.brand === brand;

        const matchesProductCategory =
            productCategory === "All Categories" ||
            product.categories.includes(productCategory);

        const matchesColor =
            selectedColors.length === 0 ||
            selectedColors.some((color) =>
                product.colors.includes(color)
            );

        const matchesGender =
            gender === "All Genders" ||
            product.gender.includes(gender);

        return (
            matchesSearch &&
            matchesBrand &&
            matchesProductCategory &&
            matchesColor &&
            matchesGender
        );
    });

    function handleColorChange(color) {
        setSelectedColors((prev) =>
            prev.includes(color)
                ? prev.filter((item) => item !== color)
                : [...prev, color]
        );
    }

    if (sort === "low-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (sort === "high-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

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
                <aside className="shop-sidebar">
                    <div className="filter-group">
                        {hasActiveFilters ? 
                            <button
                                className="reset-filters-button"
                                onClick={resetFilters}
                            >
                                Reset Filters
                            </button> : null
                        }
                    </div>
                    <div className="filter-group">
                        <h3>Search</h3>

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <h3>Brand</h3>

                        <select
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        >
                            {brands.map((brandItem) => (
                                <option key={brandItem} value={brandItem}>
                                    {brandItem}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <h3>Category</h3>

                        <select
                            value={productCategory}
                            onChange={(e) =>
                                setProductCategory(e.target.value)
                            }
                        >
                            {productCategories.map((categoryItem) => (
                                <option
                                    key={categoryItem}
                                    value={categoryItem}
                                >
                                    {categoryItem}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <h3>Color</h3>

                        <div className="color-options">
                            {colors.map((colorItem) => (
                                <label
                                    className="color-option"
                                    key={colorItem}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedColors.includes(colorItem)}
                                        onChange={() =>
                                            handleColorChange(colorItem)
                                        }
                                    />

                                    <span
                                        className="color-circle"
                                        style={{
                                            backgroundColor: colorStyles[colorItem],
                                        }}
                                    />

                                    <span>{colorItem}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-group">
                        <h3>Gender</h3>

                        <select
                            value={gender}
                            onChange={(e) =>
                                setGender(e.target.value)
                            }
                        >
                            {productGenders.map((genderItem) => (
                                <option
                                    key={genderItem}
                                    value={genderItem}
                                >
                                    {genderItem}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <h3>Sort</h3>

                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="default">Default</option>
                            <option value="low-high">
                                Price: Low to High
                            </option>
                            <option value="high-low">
                                Price: High to Low
                            </option>
                        </select>
                    </div>
                </aside>

                <section className="shop-products">
                    {filteredProducts.length === 0 ? (
                        <p>No products found.</p>
                    ) : (
                        <div className="products-grid">
                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    addToCart={addToCart}
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