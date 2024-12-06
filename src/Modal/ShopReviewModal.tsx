import { Input, Modal, Select } from "antd";
import { useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserOrderShopListQuery } from "../Redux/features/order/orderApi";
import { useCreateShopReviewMutation } from "../Redux/features/review/reviewApi";
import StarRating from "../Shared/StarRating";

const ShopReviewModal = ({
  updateShopReviewModal,
  setUpdateShopReviewModal,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [selectedShopIds, setSelectedShopIds] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const { TextArea } = Input;
  const navigate = useNavigate();
  const { data, isLoading } = useUserOrderShopListQuery(undefined);
  const [createShopReview] = useCreateShopReviewMutation();

  const handleStarChange = (value: any) => {
    setRating(value);
  };

  const handleShopChange = (value: string[]) => {
    setSelectedShopIds(value);
  };

  // Handle form submission
  const handleSubmitReview = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    try {
      const reviewDescription = form.review.value;

      if (reviewDescription.length < 5) {
        setLoading(false);
        return toast.error("Please fill out minimum 5 characters ");
      }

      if (selectedShopIds.length === 0) {
        setLoading(false);
        return toast.error("Please select at least one shop");
      }

      if (rating === 0) {
        setLoading(false);
        return toast.error("Please provide a rating");
      }

      const reviewData = {
        rating,
        shopIds: selectedShopIds,
        content: reviewDescription,
      };

      const res = await createShopReview(reviewData).unwrap();

      if (res.status) {
        form.reset();
        setRating(0);
        setSelectedShopIds([]);
        setUpdateShopReviewModal(false);
        navigate("/dashboard/order-history");
        setLoading(false);
        toast.success(res.message);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(
        error?.data?.message || error?.message || "Something went wrong!"
      );
    }
  };
  const options =
    data?.data?.map((shop: any) => ({
      label: shop.level,
      value: shop.value,
    })) || [];

  return (
    <Modal
      title="Submit Your Review"
      style={{ top: 20 }}
      open={updateShopReviewModal}
      onOk={() => setUpdateShopReviewModal(false)}
      onCancel={() => setUpdateShopReviewModal(false)}
      footer={null}
    >
      <form onSubmit={handleSubmitReview} className="space-y-5">
        <StarRating maxStars={5} onChange={handleStarChange} />
        <div>
          <label htmlFor="shop" className="block text-sm text-gray-600">
            Select Shop(s) <span className="text-red font-bold">*</span>
          </label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Select one or more shops"
            loading={isLoading}
            onChange={handleShopChange}
            options={options}
            value={selectedShopIds}
          />
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
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setUpdateShopReviewModal(false)}
            className="bg-red px-8 rounded-lg transform font-semibold duration-100 hover:bg-[rgba(154,10,10,0.8)] py-3 text-white font-raleway uppercase w-fit"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-primary px-8 rounded-lg transform font-semibold duration-100 hover:bg-[rgb(10,154,115,0.8)] py-3 text-white font-raleway uppercase w-fit"
            disabled={loading}
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto text-2xl" />
            ) : (
              "Submit Review"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ShopReviewModal;
