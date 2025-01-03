import { ExclamationCircleFilled } from "@ant-design/icons";
import { Dropdown, Modal, Tag } from "antd";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { toast } from "react-toastify";
import AntTable from "../../../Components/Table/AntTable";
import ShopUpdateModal from "../../../Modal/ShopUpdateModal";
import {
  useDeleteShopMutation,
  useGetVendorAllShopsQuery,
} from "../../../Redux/features/shop/shopApi";
import { ShopStatus } from "../../../types/types";
import { formatDate } from "../../../utils/formatDate";

const ManageShops = () => {
  const { data, error, isLoading } = useGetVendorAllShopsQuery(undefined);
  const [deleteShop] = useDeleteShopMutation();
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
      async onOk() {
        const res = await deleteShop(id).unwrap();
        if (res.success) {
          toast.success(res.message);
        }
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
          className="w-12 h-12 max-w-none object-cover rounded-full border"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <p className="font-semibold w-[100px]">{name}</p>
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
      title: "Total Order",
      dataIndex: "orders",
      key: "orders",
      render: (orders: any[]) => (
        <p className="w-[100px]">{orders?.length || 0}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <div className="w-[80px]">
          <Tag color={status === "ACTIVE" ? "green" : "red"}>{status}</Tag>
        </div>
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
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Dropdown
          disabled={record.status === ShopStatus.BLOCKED}
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
      <div className="container mx-auto">
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
