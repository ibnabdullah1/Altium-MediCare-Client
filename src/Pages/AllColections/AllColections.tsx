import { Pagination, PaginationProps } from "antd";
import { useEffect, useState } from "react";
import ProductCard from "../../Components/Products/ProductCard";
import { useAllProductsQuery } from "../../Redux/features/product/productApi";
import FilterByBrand from "./FilterByBrand";
import FilterByColors from "./FilterByColor";
import FilterByPriceCategory from "./FilterByPriceCategory";
import FilterByPriceRange from "./FilterByPriceRange";
import FilterByRating from "./FilterByRating";
import HeaderFilters from "./HeaderFilter";

const AllCollections = () => {
  const { data, isLoading } = useAllProductsQuery(undefined);

  const [compareProducts, setCompareProducts] = useState<any[]>([]);
  const [comparisonError, setComparisonError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("price-asc");

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchQueryKey, setSearchQueryKey] = useState<string>(searchQuery);
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    [number, number] | null
  >(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  // if (isLoading) {
  //   return <LoaderSpinner />;
  // }
  const products = data?.data || [];

  // Group products by category and calculate item counts
  const categoryCounts = products.reduce(
    (acc: Record<string, number>, product: any) => {
      const category = product.category;
      if (category) {
        acc[category] = (acc[category] || 0) + 1;
      }
      return acc;
    },
    {}
  );
  const brandCounts = products.reduce(
    (acc: Record<string, number>, product: any) => {
      const brand = product?.brand;
      if (brand) {
        acc[brand] = (acc[brand] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  // Convert the category counts into an array for display
  const categories = Object.entries(categoryCounts || {}).map(
    ([category, count]) => ({
      category,
      count,
    })
  );
  const brands = Object.entries(brandCounts || {}).map(([brand, count]) => ({
    brand,
    count,
  }));

  // Filter the products based on the selected filter values and search query
  const filteredProducts = products
    .filter((product: any) => {
      if (selectedCategory && product.category !== selectedCategory)
        return false;
      if (selectedBrand && product.brand !== selectedBrand) return false;
      if (selectedPriceRange) {
        const [minPrice, maxPrice] = selectedPriceRange;
        if (product.price < minPrice || product.price > maxPrice) return false;
      }
      if (selectedRating && product.rating < selectedRating) return false;

      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a: any, b: any) => {
      if (sortOrder === "price-asc") {
        return a.price - b.price;
      }
      if (sortOrder === "price-desc") {
        return b.price - a.price;
      }
      if (sortOrder === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Paginate the filtered products
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddToCompare = (product: any) => {
    // Check if the product category is the same as the first product in the comparison list
    if (
      compareProducts.length > 0 &&
      compareProducts[0].category !== product.category
    ) {
      setComparisonError(
        "You can only compare products from the same category."
      );
      return;
    }

    // If we already have 3 products, prevent adding more
    if (compareProducts.length >= 3) {
      setComparisonError("You can only compare up to 3 products.");
      return;
    }

    // Add the product to the comparison list
    setCompareProducts([...compareProducts, product]);
    setComparisonError(null);
  };

  const handleRemoveFromCompare = (productId: string) => {
    setCompareProducts(
      compareProducts.filter((product) => product.id !== productId)
    );
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };
  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
  };

  useEffect(() => {
    if (searchQueryKey === "") {
      handleClearFilters();
    }
  }, [searchQueryKey]);

  // Monitor if filters are applied
  const hasFilters =
    !!searchQueryKey || !!searchQuery || !!selectedBrand || selectedPriceRange;

  // Handle clearing all filters
  const handleClearFilters = () => {
    setSortOrder("price-asc");
    setSearchQuery("");
    setSearchQueryKey("");
    setSelectedCategory("");
    setSelectedPriceRange(null);
    setSelectedBrand("");
  };

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const startIndex = (currentPage - 1) * itemsPerPage + 1; // Starting index
  const endIndex = Math.min(
    currentPage * itemsPerPage,
    filteredProducts?.length
  ); // Ending index
  return (
    <div className="fixed-w">
      <div className="py-10 font-josefin">
        <h3 className="text-center heading my-6">All Collections</h3>

        {/* Header Filters */}
        <HeaderFilters
          startIndex={startIndex}
          endIndex={endIndex}
          totalItem={filteredProducts?.length}
          setSearchQuery={setSearchQuery}
          setSortOrder={setSortOrder}
          searchQuery={searchQuery}
          searchQueryKey={searchQueryKey}
          setSearchQueryKey={setSearchQueryKey}
          sortOrder={sortOrder}
          hasFilters={hasFilters}
          handleClearFilters={handleClearFilters}
        />

        <div className="lg:grid grid-cols-4 gap-4 w-full">
          {/* Filter & Sort Section */}
          <div className="lg:col-span-1 w-full lg:flex-col flex-col md:flex-row flex lg:justify-start justify-center py-4 lg:py-0 gap-4">
            <FilterByPriceCategory
              categories={categories}
              handleCategorySelect={handleCategorySelect}
            />

            <FilterByPriceRange
              setSelectedPriceRange={setSelectedPriceRange}
              selectedPriceRange={selectedPriceRange}
            />
            <FilterByRating setSelectedRating={setSelectedRating} />

            <FilterByBrand
              brands={brands}
              handleBrandSelect={handleBrandSelect}
            />
            <FilterByColors />
          </div>

          {/* Product Grid Section */}
          <div className="lg:col-span-3 h-fit min-h-[500px] border rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedProducts.length ? (
                paginatedProducts.map((product: any) => (
                  <div key={product.id} className="relative">
                    <ProductCard
                      product={product}
                      handleAddToCompare={handleAddToCompare}
                    />
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-600">
                  No products found.
                </p>
              )}
            </div>
            <div className="py-6">
              <Pagination
                align="center"
                current={currentPage}
                total={filteredProducts?.length}
                pageSize={itemsPerPage}
                onChange={onChange}
                showSizeChanger={false}
              />
            </div>
          </div>
        </div>

        {/* Comparison Error Message */}
        {comparisonError && (
          <div className="text-red-500 text-center mt-4">{comparisonError}</div>
        )}

        {/* Comparison List */}
        {compareProducts.length > 0 && (
          <div className="mt-8">
            <h3 className="text-center font-bold">Comparing Products</h3>
            <div className="grid lg:grid-cols-3 gap-4 mt-4">
              {compareProducts.map((product) => (
                <div key={product.id} className="border p-4">
                  <ProductCard product={product} />
                  <button
                    onClick={() => handleRemoveFromCompare(product.id)}
                    className="text-red-500 mt-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCollections;
