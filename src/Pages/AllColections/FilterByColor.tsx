import { useState } from "react";

const FilterByColors = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  // Handle click and get selected rating
  const handleColorChange = (color: any) => {
    setSelectedColor(color);
    console.log("Selected Rating:", selectedColor);
  };

  const colors = ["Black", "White", "Blue", "Green", "Yellow", "Red"];

  return (
    <div>
      <div className="bg-white rounded-lg border">
        <h4 className="text-lg font-semibold border-b p-4">Filter by Color</h4>
        <div className="p-4 font-roboto">
          <div className="mt-3 filter flex flex-col space-y-2">
            {colors.map((color, i) => (
              <div key={i} className="input-radio">
                <input
                  type="radio"
                  id={`color-${color}`}
                  name="color"
                  className="hidden"
                  onChange={() => handleColorChange(color)}
                />
                <label
                  className="text-sm text-gray-600"
                  htmlFor={`rating-${color}`}
                >
                  {color}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterByColors;
