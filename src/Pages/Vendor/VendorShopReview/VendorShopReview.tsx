import { DatePicker, DatePickerProps } from "antd";
import { AiOutlineShoppingCart, AiOutlineStar } from "react-icons/ai";
import { GoHeartFill } from "react-icons/go";
import { HiMiniArrowTrendingUp, HiOutlineUserGroup } from "react-icons/hi2";
import { MdOutlineLocalOffer } from "react-icons/md";
import Rating from "react-rating";
import { useGetVendorAllReviewQuery } from "../../../Redux/features/shop/shopApi";
import LoaderSpinner from "../../../Shared/LoaderSpinner";

const VendorShopReview = () => {
  const { data, error, isLoading } = useGetVendorAllReviewQuery(undefined);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  if (error) {
    return <p className="text-red-500">Something went wrong!</p>;
  }

  // Aggregate reviews from all shops
  const reviews = data?.data?.flatMap((shop: any) => shop.shopReview) || [];
  const totalReviews = reviews.length;

  const ratingCounts = [5, 4, 3, 2, 1].reduce((acc, rating) => {
    acc[rating] = reviews.filter((r: any) => r.rating === rating).length;
    return acc;
  }, {} as { [key: number]: number });

  const averageRating = totalReviews
    ? (
        reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
        totalReviews
      ).toFixed(1)
    : "0";
  const reviewRatingStat = [
    { level: 5, width: 100, color: "#0A9A73" },
    { level: 4, width: 70, color: "#e4069a90" },
    { level: 3, width: 33, color: "#ffcc00" },
    { level: 2, width: 20, color: "#06c6e4" },
    { level: 1, width: 5, color: "#a0640890" },
  ];
  const style: React.CSSProperties = {
    border: `1px solid #0A9A73`,
    borderRadius: "50%",
  };
  const cellRender: DatePickerProps["cellRender"] = (current, info) => {
    if (info.type !== "date") {
      return info.originNode;
    }
    if (typeof current === "number" || typeof current === "string") {
      return <div className="ant-picker-cell-inner">{current}</div>;
    }
    return (
      <div
        className="ant-picker-cell-inner"
        style={current.date() === 1 ? style : {}}
      >
        {current.date()}
      </div>
    );
  };
  //   const total = data?.data?.length;
  return (
    <div className="p-6">
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-2xl font-bold mb-4">Review Activities</h1>
        <div>
          <DatePicker.RangePicker cellRender={cellRender} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 border-b-[1.5px] border-gray-200 pb-5">
        <div>
          <h4 className="font-medium text-sm text-gray-700 font-roboto pb-2">
            Total Reviews
          </h4>
          <div className="flex items-center gap-2">
            <h5 className="font-semibold text-2xl">{totalReviews}</h5>
            <p className="text-xs w-fit px-2 py-1 flex justify-center items-center bg-primary/10 rounded-full text-primary">
              25% <HiMiniArrowTrendingUp />
            </p>
          </div>
          <p className="text-sm text-gray-500">Growth in reviews this year</p>
        </div>

        <div>
          <h4 className="font-medium text-sm text-gray-700 font-roboto pb-2">
            Average Rating
          </h4>
          <div className="flex items-center gap-2">
            <h5 className="font-semibold text-2xl ">{averageRating}</h5>
            <p className="text-[#ffcc00]">
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
          <p className="text-sm text-gray-500">Average rating this year</p>
        </div>

        <div>
          {reviewRatingStat.map((rating) => (
            <div key={rating.level} className="flex items-center gap-1">
              <p className="text-xs text-gray-500 font-roboto font-medium pr-[2px]">
                -{rating.level}
              </p>
              <div
                className={`h-1.5 rounded-full`}
                style={{
                  width: `${rating.width}%`,
                  backgroundColor: rating.color,
                }}
              ></div>

              <p className="text-xs">{ratingCounts[rating.level]}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3 pt-10">
        {data?.data?.map((shop: any) => (
          <div key={shop?.id} className="border rounded-lg  bg-white">
            <div className="flex gap-4 border-b p-4">
              <img
                src={shop?.logo}
                alt={shop?.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-lg font-bold">{shop.name}</h2>
                <p className="text-sm text-gray-600">{shop?.description}</p>
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 p-4 bg-white ">
                  {/* Shop Reviews */}
                  <div className="flex items-center gap-3">
                    <div className="text-primary bg-primary/10 p-2 rounded-lg">
                      <AiOutlineStar />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {shop?._count.shopReview || 0}
                      </p>
                      <p className="text-xs text-gray-500">Reviews</p>
                    </div>
                  </div>

                  {/* Products */}
                  <div className="flex items-center gap-3">
                    <div className="text-secondary bg-secondary/10 p-2 rounded-lg">
                      <MdOutlineLocalOffer />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {shop?._count.products || 0}
                      </p>
                      <p className="text-xs text-gray-500">Products</p>
                    </div>
                  </div>

                  {/* Orders */}
                  <div className="flex items-center gap-3">
                    <div className="text-green bg-green/10 p-2 rounded-lg">
                      <AiOutlineShoppingCart />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {shop?._count.orders || 0}
                      </p>
                      <p className="text-xs text-gray-500">Orders</p>
                    </div>
                  </div>

                  {/* Followers */}
                  <div className="flex items-center gap-3">
                    <div className="text-blue-500 bg-blue-100 p-2 rounded-lg">
                      <HiOutlineUserGroup />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">
                        {shop?._count.followers || 0}
                      </p>
                      <p className="text-xs text-gray-500">Followers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              {shop?.shopReview?.length > 0 ? (
                <div className="">
                  <h3 className="text-md font-semibold mb-2">Reviews:</h3>
                  <ul className="space-y-2">
                    {shop?.shopReview.map((review: any) => (
                      <div
                        key={review.id}
                        className="p-2 bg-white grid grid-cols-3 border-b py-5"
                      >
                        <div className="col-span-1">
                          <div className="flex gap-2 items-start">
                            <img
                              src={review?.user?.profilePhoto}
                              alt={review?.user?.name}
                              className="size-14 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900">
                                {review?.user?.name}
                              </h4>
                              <p className="text-xs text-gray-600">
                                Total Spend:{" "}
                                <span className="font-semibold">$200</span>
                              </p>
                              <p className="text-xs text-gray-600">
                                Total Review:{" "}
                                <span className="font-semibold">13</span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="flex gap-2 items-center">
                            {" "}
                            <p className="text-[#ffcc00]">
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
                                initialRating={review?.rating}
                                readonly
                              />
                            </p>
                            <p className="text-sm text-gray-500">
                              {review?.createdAt?.split("T")[0]}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500">
                            {review?.content}
                          </p>
                          <div className="flex items-center gap-2 pt-5">
                            <button className="text-sm border rounded-lg px-3 py-1.5 border-gray-200 font-roboto text-gray-600 font-medium hover:bg-gray-50 duration-150">
                              Public Comment
                            </button>
                            <button className="text-sm border rounded-lg px-3 py-1.5 border-gray-200 font-roboto text-gray-600 font-medium hover:bg-gray-50 duration-150">
                              Direct Message
                            </button>
                            <button className="text-sm border rounded-lg p-2 border-gray-200 font-roboto text-primary font-medium hover:bg-gray-50 duration-150">
                              <GoHeartFill />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No reviews yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="py-5">
        {/* <Pagination
          total={total}
          showTotal={(total) => `Total ${total} items`}
          defaultPageSize={10}
          onChange={}
          defaultCurrent={1}
        /> */}
      </div>
    </div>
  );
};

export default VendorShopReview;
