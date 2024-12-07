import { ExclamationCircleFilled } from "@ant-design/icons";
import { Dropdown, Modal, Select } from "antd";
import { Option } from "antd/es/mentions";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { toast } from "react-toastify";
import AntTable from "../../Components/Table/AntTable";
import ShopUpdateModal from "../../Modal/ShopUpdateModal";
import {
  useDeleteShopMutation,
  useGetAllShopsQuery,
  useUpdateShopStatusMutation,
} from "../../Redux/features/shop/shopApi";
import { ShopStatus } from "../../types/types";
import { formatDate } from "../../utils/formatDate";

const ManageAllShops = () => {
  const { data, error, isLoading } = useGetAllShopsQuery(undefined);
  const [deleteShop] = useDeleteShopMutation();
  const [updateShopStatus] = useUpdateShopStatusMutation();
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
  const handleStatusChange = async (shopId: string, newStatus: ShopStatus) => {
    try {
      const res = await updateShopStatus({
        shopId,
        status: newStatus,
      }).unwrap();
      if (res.status) {
        toast.success(`Shop status updated to ${newStatus}`);
      }
    } catch (err) {
      toast.error("Failed to update shop status");
    }
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
      render: (products: any[]) => <p className="w-[100px]">{products}</p>,
    },
    {
      title: "Total Order",
      dataIndex: "orders",
      key: "orders",
      render: (orders: any[]) => <p className="w-[100px]">{orders}</p>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (role: ShopStatus, record: any) => (
        <Select
          value={role}
          onChange={(value) =>
            handleStatusChange(record.id, value as ShopStatus)
          }
          style={{ width: 150 }}
          disabled={isLoading}
        >
          {Object.values(ShopStatus).map((statusOption) => (
            <Option key={statusOption} value={statusOption}>
              {statusOption}
            </Option>
          ))}
        </Select>
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

export default ManageAllShops;
