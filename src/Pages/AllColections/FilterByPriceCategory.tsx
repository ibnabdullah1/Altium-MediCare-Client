const FilterByPriceCategory = ({ categories, handleCategorySelect }: any) => {
  return (
    <div className="bg-white rounded-lg border">
      <h4 className="text-lg font-semibold border-b p-4">Product Category</h4>
      {/* Example filter item */}
      <div className="p-4 max-h-[300px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[rgba(0,0,0,0.05)] overflow-y-auto">
        {categories?.map((item: any) => (
          <p
            key={item.category}
            className="text-sm font-roboto pb-2 text-gray-600 hover:text-primary cursor-pointer w-fit"
            onClick={() => handleCategorySelect(item.category)}
            role="button"
            aria-label={`Filter by ${item.category}`}
          >
            {item.category} ({item.count})
          </p>
        ))}
      </div>
    </div>
  );
};

export default FilterByPriceCategory;
