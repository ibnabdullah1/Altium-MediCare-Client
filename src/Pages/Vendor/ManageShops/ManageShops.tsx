import { ExclamationCircleFilled } from "@ant-design/icons";
import { Dropdown, Modal } from "antd";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { toast } from "react-toastify";
import AntTable from "../../../Components/Table/AntTable";
import ShopUpdateModal from "../../../Modal/ShopUpdateModal";
import { useGetAllShopQuery } from "../../../Redux/features/shop/shopApi";
import { formatDate } from "../../../utils/formatDate";

const ManageShops = () => {
  const { data, error, isLoading } = useGetAllShopQuery(undefined);
  const [updateShopModal, setUpdateShopModal] = useState(false);

  const [shopData, setShopData] = useState<any>(null);

  if (error) {
    toast.error(error.data?.message || error.message);
    return null;
  }

  const { confirm } = Modal;
  const shops = data?.data || [];

  // Handle delete action
  const handleDelete = (id: string) => {
    confirm({
      title: "Do you want to delete this shop?",
      icon: <ExclamationCircleFilled />,
      content: "Deleting this shop will remove all its data permanently.",
      onOk() {
        console.log("Shop deleted:", id);
      },
      onCancel() {
        console.log("Delete action canceled.");
      },
    });
  };

  // Handle update action

  const columns = [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (logo: string) => (
        <img
          src={logo}
          alt="Shop Logo"
          className="w-12 h-12 object-cover rounded-full border"
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
      title: "Total Product",
      dataIndex: "products",
      key: "products",
      render: (products: any[]) => <p>{products?.length || 0}</p>,
    },
    {
      title: "Total Order",
      dataIndex: "orders",
      key: "orders",
      render: (orders: any[]) => <p>{orders?.length || 0}</p>,
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
                      setShopData(record);
                      setUpdateShopModal(true);
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
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Manage Shops</h1>
        <div className="bg-white border rounded-md">
          <AntTable
            loading={isLoading}
            columns={columns}
            data={shops}
            isPaginate={true}
          />
        </div>
      </div>
      {updateShopModal && (
        <ShopUpdateModal
          updateShopModal={updateShopModal}
          setUpdateShopModal={setUpdateShopModal}
          shopData={shopData}
        />
      )}
    </div>
  );
};

export default ManageShops;
