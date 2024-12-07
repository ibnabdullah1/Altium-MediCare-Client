const FilterByBrand = ({ brands, handleBrandSelect }: any) => {
  return (
    <div className="bg-white  rounded-lg border">
      <h4 className="text-lg font-semibold border-b p-4">Filter by Brand</h4>
      {/* Example filter item */}
      <div className="p-4 max-h-[300px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[rgba(0,0,0,0.05)] overflow-y-auto space-y-2 capitalize">
        {" "}
        {brands?.map(({ brand, count }: any) => (
          <div key={brand} className="input-radio">
            <input
              type="radio"
              id={`brand-${brand}`}
              name="brand"
              className="hidden"
              onChange={() => handleBrandSelect(brand)}
            />
            <label className="text-sm text-gray-600" htmlFor={`brand-${brand}`}>
              {brand} ({count})
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterByBrand;
