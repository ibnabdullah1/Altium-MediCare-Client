import Rating from "react-rating";
import CustomerFeedback from "./CustomerFeedback";
import SendAReview from "./SendAReview";

const ProductReview = ({ product }: any) => {
  // Calculate rating distribution
  const ratings = product.reviews || [];
  const totalRatings = ratings.length;

  const ratingCounts = [5, 4, 3, 2, 1].reduce((acc, rating) => {
    acc[rating] = ratings.filter((r: any) => r.rating === rating).length;
    return acc;
  }, {} as { [key: number]: number });

  // Calculate percentage for each rating
  const ratingPercentages = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    percentage: totalRatings
      ? Math.round((ratingCounts[rating] / totalRatings) * 100)
      : 0,
  }));

  // Calculate average rating
  const averageRating = totalRatings
    ? (
        ratings.reduce((acc: number, r: any) => acc + r.rating, 0) /
        totalRatings
      ).toFixed(1)
    : 0;

  return (
    <div className="p-4">
      <div className="grid lg:grid-cols-7 gap-4 ">
        <div className="lg:col-span-3">
          <div className="h-min bg-white border p-4 space-y-6 rounded-lg">
            <p className="text-2xl mb-2">Submit Your Review</p>
            <div className="text-2xl mb-2 flex items-center gap-2">
              <p>{averageRating}</p>
              <p className="text-[#ffcc00] relative">
                <Rating
                  emptySymbol={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  }
                  fullSymbol={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }
                  initialRating={+averageRating}
                  readonly
                />
              </p>
            </div>

            <div className="space-y-3">
              {ratingPercentages.map(({ rating, percentage }) => (
                <div key={rating} className="flex items-center gap-2">
                  <p>{rating}</p>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm">{percentage}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-4">
          <SendAReview id={product.id} />
        </div>
      </div>
      {/* Customer Feedbacks */}
      <CustomerFeedback product={product} />
    </div>
  );
};

export default ProductReview;
