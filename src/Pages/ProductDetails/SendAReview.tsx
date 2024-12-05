import { Input } from "antd";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectCurrentUser } from "../../Redux/features/auth/authSlice";
import { useCreateReviewMutation } from "../../Redux/features/review/reviewApi";
import StarRating from "../../Shared/StarRating";
const SendAReview = ({ id }: any) => {
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectCurrentUser);
  const [createReview] = useCreateReviewMutation();
  const [rating, setRating] = useState(0);
  const handleStarChange = (value: any) => {
    setRating(value);
  };
  const { TextArea } = Input;
  const handleSubmitReview = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    try {
      const reviewDescription = form.review.value;
      if (reviewDescription.length < 5) {
        setLoading(false);
        return toast.error("Please fill out minimum 10 characters ");
      }
      const data = {
        rating: rating,
        productId: id,
        content: form.review.value,
      };

      if (rating === 0) {
        setLoading(false);
        toast.error("Please send a rating");
        return;
      }
      const res = await createReview(data).unwrap();
      if (res.status) {
        form.reset();
        setRating(0);
        setLoading(false);
        toast.success(res.message);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(
        error?.data?.message || error?.message || "Something went wrong!"
      );
    }

    form.reset();
  };

  return (
    <div className="h-min bg-white border p-4 space-y-6 rounded-lg">
      <p className="text-2xl mb-2">Submit Your Review</p>
      <form onSubmit={handleSubmitReview} className="space-y-5">
        <StarRating maxStars={5} onChange={handleStarChange} />

        <div className="flex justify-between items-center gap-3 my-5">
          <div className="w-full">
            <label htmlFor="name" className="block text-sm text-gray-600">
              Name
            </label>
            <div className="mt-1 rounded-md">
              <Input
                id="name"
                name="name"
                type="text"
                value={user?.name}
                placeholder="Enter your name"
                disabled
                className="w-full"
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="email" className="block text-sm text-gray-600">
              Email
            </label>
            <div className="mt-1 rounded-md">
              <Input
                id="email"
                name="email"
                value={user?.email}
                type="email"
                placeholder="Enter email address"
                disabled
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="review" className="block text-sm text-gray-600">
            Write Your Review <span className="text-red font-bold">*</span>
          </label>
          <TextArea
            id="review"
            rows={4}
            name="review"
            required
            className="w-full"
            placeholder="Write here..."
          ></TextArea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 duration-500"
        >
          {loading ? (
            <TbFidgetSpinner className="animate-spin m-auto text-2xl" />
          ) : (
            "Submit Review"
          )}
        </button>
      </form>
    </div>
  );
};

export default SendAReview;
