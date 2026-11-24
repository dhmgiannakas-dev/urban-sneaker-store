import "./ShopFilters.css";

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

function ShopFilters({ filters }) {
  const {
    search,
    setSearch,
    brand,
    setBrand,
    sort,
    setSort,
    productCategory,
    setProductCategory,
    selectedColors,
    gender,
    setGender,
    brands,
    productCategories,
    colors,
    productGenders,
    hasActiveFilters,
    resetFilters,
    handleColorChange,
  } = filters;

  return (
    <aside className="shop-sidebar">
      <div className="filter-group">
        <button
          className="reset-filters-button"
          onClick={resetFilters}
          disabled={!hasActiveFilters}
        >
          Reset Filters
        </button>
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
          onChange={(e) => setGender(e.target.value)}
        >
          {productGenders.map((genderItem) => (
            <option key={genderItem} value={genderItem}>
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
  );
}

export default ShopFilters;