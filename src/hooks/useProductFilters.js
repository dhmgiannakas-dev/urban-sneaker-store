import { useState } from "react";

export function useProductFilters(products) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All Brands");
  const [sort, setSort] = useState("default");
  const [productCategory, setProductCategory] =
    useState("All Categories");
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
      brand === "All Brands" ||
      product.brand === brand;

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
      product.gender === gender;

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

  return {
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
    filteredProducts,
  };
}