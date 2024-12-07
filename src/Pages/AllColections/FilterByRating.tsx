import { TiStarFullOutline } from "react-icons/ti";

const FilterByRating = ({ setSelectedRating }: any) => {
  // Handle click and get selected rating
  const handleRatingChange = (rating: any) => {
    setSelectedRating(rating);
  };

  const ratings = [5, 4, 3, 2, 1];
  return (
    <div>
      <div className="bg-white rounded-lg border">
        <h4 className="text-lg font-semibold border-b p-4">Filter by Rating</h4>
        <div className="p-4">
          <div className="mt-3 filter flex flex-col space-y-2">
            {ratings.map((rating) => (
              <div key={rating} className="input-radio">
                <input
                  type="radio"
                  id={`rating-${rating}`}
                  name="rating"
                  className="hidden"
                  onChange={() => handleRatingChange(rating)}
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="flex justify-between items-center gap-2 cursor-pointer"
                >
                  {/* Progress Bar */}
                  <div className="h-2 w-[150px] bg-gray-200 rounded-full"></div>
                  {/* Star Rating */}
                  <div className="flex items-center text-xs">
                    {Array.from({ length: 5 }, (_, index) => (
                      <TiStarFullOutline
                        key={index}
                        className={`${
                          index < rating
                            ? "text-[#ffcc00]" // Active stars
                            : "text-gray-300" // Inactive stars
                        }`}
                      />
                    ))}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterByRating;
