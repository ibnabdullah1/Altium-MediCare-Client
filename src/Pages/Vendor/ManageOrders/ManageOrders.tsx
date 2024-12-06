import { Select } from "antd"; // Import Ant Design's Select component
import { toast } from "react-toastify";
import AntTable from "../../../Components/Table/AntTable";
import {
  useGetVendorAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../Redux/features/order/orderApi";
import { PaymentStatus, ShippingStatus } from "../../../types/types";

const { Option } = Select; // Destructure Option component for easier usage

const ManageOrders = () => {
  const { data, error, isLoading } = useGetVendorAllOrdersQuery(undefined);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  if (error) {
    toast.error(error.data?.message || error.message);
    return null;
  }

  const orders = data?.data || [];

  // Handle the update of payment status
  const handlePaymentStatusChange = async (
    orderId: string,
    newStatus: PaymentStatus
  ) => {
    try {
      const res = await updateOrderStatus({
        orderId,
        action: "PAYMENT",
        status: newStatus,
      }).unwrap();
      if (res.status) {
        toast.success(`Payment Status updated to ${newStatus}`);
      }
    } catch (err) {
      toast.error("Failed to update Payment Status");
    }
  };

  // Handle the update of shipping status
  const handleShippingStatusChange = async (
    orderId: string,
    newStatus: ShippingStatus
  ) => {
    try {
      const res = await updateOrderStatus({
        orderId,
        action: "SHIPPING",
        status: newStatus,
      }).unwrap();
      if (res.status) {
        toast.success(`Shipping Status updated to ${newStatus}`);
      }
    } catch (err) {
      toast.error("Failed to update Shipping Status");
    }
  };

  // Determine which options should be disabled for PaymentStatus
  const getPaymentStatusDisabledOptions = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PENDING:
        return [];
      case PaymentStatus.FAILED:
        return [PaymentStatus.PENDING, PaymentStatus.PAID];
      case PaymentStatus.PAID:
        return [PaymentStatus.PENDING, PaymentStatus.FAILED];
      default:
        return [];
    }
  };

  // Determine which options should be disabled for ShippingStatus
  const getShippingStatusDisabledOptions = (status: ShippingStatus) => {
    switch (status) {
      case ShippingStatus.PENDING:
        return [ShippingStatus.DELIVERED, ShippingStatus.CANCELLED];
      case ShippingStatus.SHIPPED:
        return [ShippingStatus.PENDING];
      case ShippingStatus.DELIVERED:
        return [
          ShippingStatus.PENDING,
          ShippingStatus.SHIPPED,
          ShippingStatus.CANCELLED,
        ];
      case ShippingStatus.CANCELLED:
        return [
          ShippingStatus.PENDING,
          ShippingStatus.SHIPPED,
          ShippingStatus.DELIVERED,
        ];
      default:
        return [];
    }
  };

  // Columns for AntTable
  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (id: any) => <p className="uppercase">order{id.slice(0, 4)}</p>,
    },
    {
      title: "Shop",
      dataIndex: "shop",
      key: "shop",
      render: (shop: any) => <p>{shop?.name}</p>,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount: any) => <p>${totalAmount}</p>,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: PaymentStatus, record: any) => (
        <Select
          value={status}
          onChange={(value) =>
            handlePaymentStatusChange(record.id, value as PaymentStatus)
          }
          style={{ width: 150 }}
          disabled={isLoading}
        >
          {Object.values(PaymentStatus).map((statusOption) => (
            <Option
              key={statusOption}
              value={statusOption}
              disabled={getPaymentStatusDisabledOptions(status).includes(
                statusOption
              )}
            >
              {statusOption}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Shipping Status",
      dataIndex: "shippingStatus",
      key: "shippingStatus",
      render: (status: ShippingStatus, record: any) => (
        <Select
          value={status}
          onChange={(value) =>
            handleShippingStatusChange(record.id, value as ShippingStatus)
          }
          style={{ width: 150 }}
          disabled={isLoading} // Optional: Disable if loading
        >
          {Object.values(ShippingStatus).map((statusOption) => (
            <Option
              key={statusOption}
              value={statusOption}
              disabled={getShippingStatusDisabledOptions(status).includes(
                statusOption
              )} // Disable based on logic
            >
              {statusOption}
            </Option>
          ))}
        </Select>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Manage Orders</h1>
        <div className="bg-white border rounded-md">
          <AntTable
            loading={isLoading}
            columns={columns}
            data={orders}
            isPaginate={true} // Enable pagination if needed
          />
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
