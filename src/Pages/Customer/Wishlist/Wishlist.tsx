import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import AntTable from "../../../Components/Table/AntTable";
import { addToCart } from "../../../Redux/features/cart/cartSlice";
import { RootState } from "../../../Redux/features/store";
import { removeWishlist } from "../../../Redux/features/wishlist/wishlistSlice";

const MyWishlist = () => {
  const dispatch = useDispatch();

  // Get the wishlist items from Redux
  const wishlist = useSelector((state: RootState) => state.wishList.items);

  const columns = [
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (record: any) => (
        <button
          onClick={() => handleRemove(record.id)}
          className="text-gray-400 bg-gray-200 hover:text-primary text-lg hover:bg-primary/10 rounded-full p-1"
        >
          <IoClose />
        </button>
      ),
    },
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string, record: any) => (
        <div className="flex items-center space-x-2">
          <img
            src={thumbnail}
            alt={record.name}
            className="w-20 h-16 object-cover rounded-md"
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => <p className="font-semibold">{name}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <p className="font-semibold text-green-600">${price.toFixed(2)}</p>
      ),
    },
    {
      title: "Stock Status",
      dataIndex: "stock_status",
      key: "stock_status",
      render: () => (
        // <p
        //   className={`font-semibold ${stockStatus ? "text-green" : "text-red"}`}
        // >
        //   {stockStatus ? "In Stock" : "Out of Stock"}
        // </p>
        <p className={`font-semibold text-green`}>In Stock</p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAddToCart(record)}
            className="px-4 py-1 bg-primary text-white rounded hover:bg-primary/80"
          >
            Add To Cart
          </button>
        </div>
      ),
    },
  ];

  // Remove item from wishlist
  const handleRemove = (id: string) => {
    dispatch(removeWishlist(id));
  };

  // Add item to cart
  const handleAddToCart = (product: any) => {
    const cartData = {
      id: product.id,
      name: product.name,
      price: product.price,
      shopId: product.shop.id,
      thumbnail: product.thumbnail,
      quantity: 1,
      stockQuantity: product.inventory,
    };
    dispatch(addToCart(cartData));
    dispatch(removeWishlist(product.id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">My Wishlist</h1>
        <div className="bg-white border rounded-md">
          <AntTable columns={columns} data={wishlist} isPaginate={true} />
        </div>
      </div>
    </div>
  );
};

export default MyWishlist;
