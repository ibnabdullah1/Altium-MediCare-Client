import { Select } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { FiGrid } from "react-icons/fi";

const HeaderFilters = ({
  setSortOrder,
  handleClearFilters,
  setSearchQuery,
  sortOrder,
  searchQueryKey,
  setSearchQueryKey,
  hasFilters,
  totalItem,
  endIndex,
  startIndex,
}: any) => {
  const [layout, setLayout] = useState<string>("grid");

  // Handle the search submission (capturing the search keyword without debounce)
  const handleSearchSubmit = () => {
    setSearchQuery(searchQueryKey);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between py-4 lg:sticky top-16 z-50 bg-white">
      {/* Layout Switcher and Results Info */}
      <div className="flex items-center justify-between w-full md:w-auto gap-4">
        <div className="flex gap-2">
          {/* Grid Layout Button */}
          <div
            className={`w-10 h-10 rounded-xl grid place-items-center cursor-pointer transition ${
              layout === "grid"
                ? "bg-primary text-white"
                : "bg-slate-100 hover:bg-slate-200"
            }`}
            onClick={() => setLayout("grid")}
          >
            <FiGrid />
          </div>
          {/* List Layout Button */}
          <div
            className={`w-10 h-10 rounded-xl grid place-items-center cursor-pointer transition ${
              layout === "list"
                ? "bg-primary text-white"
                : "bg-slate-100 hover:bg-slate-200"
            }`}
            onClick={() => setLayout("list")}
          >
            <FaList />
          </div>
        </div>
        <p>
          Showing <span className="font-semibold">{startIndex}</span> -{" "}
          <span className="font-semibold">{endIndex}</span> of{" "}
          <span className="font-semibold">{totalItem}</span> results
        </p>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        {/* Sort Options */}
        <Select
          id="sort"
          allowClear
          value={sortOrder}
          onChange={(value) => setSortOrder(value as string)}
          showSearch
          placeholder="Sort By"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          options={[
            { value: "price-asc", label: "Price: Low to High" },
            { value: "price-desc", label: "Price: High to Low" },
          ]}
          className="w-full md:w-auto"
        />

        {/* Search Input */}
        <Search
          placeholder="Enter Keywords..."
          value={searchQueryKey}
          allowClear
          onSearch={handleSearchSubmit}
          onChange={(e) => setSearchQueryKey(e.target.value)}
          className="w-full md:w-auto py-2"
        />

        {/* Clear Filters Button */}
        <button
          className={`px-4 py-1.5 rounded text-sm transition w-full md:w-auto ${
            !hasFilters
              ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-600"
              : "bg-primary text-white"
          }`}
          onClick={handleClearFilters}
          disabled={!hasFilters}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default HeaderFilters;
