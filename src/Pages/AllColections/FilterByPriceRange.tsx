import { Slider } from "antd";

const FilterByPriceRange = ({
  setSelectedPriceRange,
  selectedPriceRange,
}: any) => {
  // Ensure selectedPriceRange is defined
  const minPrice =
    selectedPriceRange && selectedPriceRange[0] ? selectedPriceRange[0] : 0;
  const maxPrice =
    selectedPriceRange && selectedPriceRange[1] ? selectedPriceRange[1] : 1000;

  // Handle range change
  const handleRangeChange = (value: any) => {
    setSelectedPriceRange(value);
  };

  return (
    <div className="bg-white rounded-lg border">
      <h4 className="p-4 text-lg font-semibold border-b">Filter by Price</h4>

      <div className="font-roboto p-4">
        {/* Min and Max Price Display */}
        <div className="flex justify-between text-sm mb-4">
          <span className="text-gray-600">Min: ${minPrice}</span>
          <span className="text-gray-600">Max: ${maxPrice}</span>
        </div>

        {/* Ant Design Range Slider */}
        <Slider
          range
          step={10}
          min={0}
          max={1000}
          value={selectedPriceRange || [0, 1000]}
          onChange={handleRangeChange}
          tooltip={{
            formatter: (value) => `$${value}`,
          }}
        />
      </div>
    </div>
  );
};

export default FilterByPriceRange;
