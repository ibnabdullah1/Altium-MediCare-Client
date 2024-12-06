import { ExclamationCircleFilled } from "@ant-design/icons";
import { Dropdown, Modal } from "antd";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { toast } from "react-toastify";
import AntTable from "../../Components/Table/AntTable";
import UpdateProductModal from "../../Modal/UpdateProductModal";
import {
  useAllProductsQuery,
  useDeleteProductMutation,
} from "../../Redux/features/product/productApi";
import { formatDate } from "../../utils/formatDate";

const ManageAllProducts = () => {
  const { data, error, isLoading } = useAllProductsQuery(undefined);
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProductModal, setUpdateProductModal] = useState(false);
  const [productData, setProductData] = useState<any>(null);
  if (error) {
    toast.error(error.data?.message || error.message);
    return null;
  }

  const shops = data?.data || [];
  const { confirm } = Modal;
  const handleDelete = (id: string) => {
    confirm({
      title: "Do you want to delete this product?",
      icon: <ExclamationCircleFilled />,
      content: "Deleting this product will remove all its data permanently.",
      async onOk() {
        const res = await deleteProduct(id).unwrap();
        if (res.success) {
          toast.success(res.message);
        }
      },
      onCancel() {
        console.log("Delete action canceled.");
      },
    });
  };

  const columns = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string) => (
        <img
          src={thumbnail}
          alt="Product Thumbnail"
          className="w-20 h-12 object-cover rounded-md"
        />
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
      render: (price: number) => <p>${price.toFixed(2)}</p>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => <p>{category}</p>,
    },
    {
      title: "Inventory",
      dataIndex: "inventory",
      key: "inventory",
      render: (inventory: number) => <p>{inventory}</p>,
    },
    {
      title: "Shop",
      dataIndex: "shop",
      key: "shop",
      render: (shop: any) => <p>{shop?.name}</p>,
    },
    {
      title: "Reviews",
      dataIndex: "reviews",
      key: "reviews",
      render: (reviews: any[]) => <p>{reviews?.length || 0}</p>,
    },
    {
      title: "Orders",
      dataIndex: "OrderProduct",
      key: "orders",
      render: (OrderProduct: any[]) => <p>{OrderProduct?.length || 0}</p>,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => <p>{formatDate(createdAt)}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: (
                  <div onClick={() => handleDelete(record?.id)}>Delete</div>
                ),
              },
              {
                key: "2",
                label: (
                  <div
                    onClick={() => {
                      setProductData(record);
                      setUpdateProductModal(true);
                    }}
                  >
                    Update
                  </div>
                ),
              },
            ],
            style: { minWidth: "150px" },
          }}
          placement="bottomRight"
          arrow
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            <HiDotsVertical />
          </a>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Manage Shops</h1>
          <div className="bg-white border rounded-md">
            <AntTable
              loading={isLoading}
              columns={columns}
              data={shops}
              isPaginate={true} // Enable pagination if needed
            />
          </div>
        </div>
      </div>
      {updateProductModal && (
        <UpdateProductModal
          updateProductModal={updateProductModal}
          setUpdateProductModal={setUpdateProductModal}
          productData={productData}
        />
      )}
    </>
  );
};

export default ManageAllProducts;
