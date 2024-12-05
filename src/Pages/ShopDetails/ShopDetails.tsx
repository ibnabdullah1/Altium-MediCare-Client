import { AiFillProduct } from "react-icons/ai";
import { IoLocationSharp } from "react-icons/io5";
import { MdJoinFull, MdOutlineAddBox } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProductCard from "../../Components/Products/ProductCard";
import { selectCurrentUser } from "../../Redux/features/auth/authSlice";
import {
  useFollowShopMutation,
  useGetSingleShopQuery,
} from "../../Redux/features/shop/shopApi";
import { formatDate } from "../../utils/formatDate";

const ShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [followShop] = useFollowShopMutation();
  const { data, error, isLoading } = useGetSingleShopQuery(id);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  const shop = data?.data;
  const handleFollowShop = async () => {
    try {
      const res = await followShop(shop?.id).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Something went wrong!"
      );
    }
  };

  const isFollow =
    user?.email && Array.isArray(shop?.followers)
      ? shop.followers.some((follow: any) => follow?.email === user.email)
      : false;

  return (
    <div className="fixed-w">
      {/* Profile */}
      <div className="grid grid-cols-4 p-4 gap-4 ">
        <div
          style={{
            backgroundImage: `url("https://t3.ftcdn.net/jpg/04/65/46/52/360_F_465465254_1pN9MGrA831idD6zIBL7q8rnZZpUCQTy.jpg")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.02)",
            backgroundRepeat: "no-repeat",
          }}
          className="col-span-3 min-h-[250px] rounded-lg flex items-end "
        >
          <div className="rounded-lg bg-white w-full p-4 flex gap-4">
            <div>
              <img
                src={shop?.logo}
                alt=""
                style={{ boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.02)" }}
                className="size-[100px] relative -top-10 object-cover rounded-full bg-white"
              />
            </div>
            <div className="w-full">
              <div className="flex justify-between items-start w-full">
                <h3 className="font-semibold text-lg font-roboto">
                  {shop.name}
                </h3>

                <div className="flex items-center gap-2">
                  <img
                    src="https://cdn-icons-png.freepik.com/256/15707/15707884.png?semt=ais_hybrid"
                    alt=""
                    className="size-6 object-cover rounded-lg"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"
                    alt=""
                    className="size-6 object-cover rounded-lg"
                  />
                  <img
                    src="https://cdn-icons-png.freepik.com/256/15707/15707874.png?semt=ais_hybrid"
                    alt=""
                    className="size-6 object-cover rounded-lg"
                  />
                </div>
              </div>
              <p className="text-sm">{shop.description}</p>
              <div className="flex justify-between items-center font-roboto py-4">
                <div className="flex items-center gap-10 ">
                  <div>
                    <h5 className="text-sm font-medium text-gray-600">
                      Location
                    </h5>
                    <p className="text-rose-600 flex items-center gap-1">
                      <IoLocationSharp />
                      {shop?.location || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-600">
                      Joined
                    </h5>
                    <p className="text-cyan-600 flex items-center gap-1">
                      <MdJoinFull />
                      {formatDate(shop?.createdAt)}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-600">
                      Total Product
                    </h5>
                    <p className="text-primary flex items-center gap-1">
                      <AiFillProduct />
                      {shop?.products?.length}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleFollowShop()}
                  className={`px-3 py-1  h-fit rounded-full flex items-center gap-1 ${
                    isFollow
                      ? "bg-primary hover:bg-primary/90 text-white"
                      : "border text-primary border-primary"
                  } text-sm`}
                >
                  <MdOutlineAddBox />
                  {isFollow ? "Following" : "Follow"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.02)" }}
          className="col-span-1 rounded-lg"
        >
          <div className="p-4 border-b">
            <h4 className="font-medium font-roboto text-lg text-center">
              Shop Owner
            </h4>
          </div>
          <div className="p-4">
            <img
              src={shop?.owner?.profilePhoto}
              alt=""
              className="h-[100px] rounded-lg object-cover bg-white w-full"
            />
          </div>
          <h4 className="font-medium font-roboto text-base text-center mb-4">
            {shop?.owner?.name}
          </h4>
        </div>
      </div>
      {/* Shop Products */}
      <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {shop?.products?.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopDetails;
