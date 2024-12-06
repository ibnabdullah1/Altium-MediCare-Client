import { MdOutlineAddBox } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AntTable from "../../../Components/Table/AntTable";
import { useFollowShopMutation } from "../../../Redux/features/shop/shopApi";
import { useGetFollowedShopsQuery } from "../../../Redux/features/user/userApi";
import { formatDate } from "../../../utils/formatDate";

const FollowedShops = () => {
  const { data, error, isLoading } = useGetFollowedShopsQuery(undefined);
  const [followShop] = useFollowShopMutation();
  if (error) {
    toast.error(error.data?.message || error.message);
    return null;
  }

  const followedShops = data?.data || [];

  // Handle update action
  const handleFollowShop = async (id: any) => {
    try {
      const res = await followShop(id).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Something went wrong!"
      );
    }
  };
  const columns = [
    {
      title: "Shop Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <Link to={`/shop/${record.id}`}>
          <div className="flex items-center gap-3 w-[170px]">
            <img
              src={record.logo}
              alt="Shop Logo"
              className="w-12 h-12 object-cover rounded-full border"
            />
            <p className="font-semibold">{record.name}</p>
          </div>
        </Link>
      ),
    },

    {
      title: "Total Product",
      dataIndex: "products",
      key: "products",
      render: (products: any[]) => (
        <p className="w-[100px]">{products?.length || 0}</p>
      ),
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => (
        <p className="w-[130px]">{formatDate(createdAt)}</p>
      ),
    },
    {
      title: "Unfollow",
      key: "action",
      render: (record: any) => (
        <button
          onClick={() => handleFollowShop(record.id)}
          className={`px-3 py-1  h-fit rounded-full flex items-center gap-1 bg-primary hover:bg-primary/90 text-white text-sm`}
        >
          <MdOutlineAddBox />
          Unfollow
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Followed Shops</h1>
        <div className="bg-white border rounded-md">
          <AntTable
            loading={isLoading}
            columns={columns}
            data={followedShops}
            isPaginate={true}
          />
        </div>
      </div>
    </div>
  );
};

export default FollowedShops;
