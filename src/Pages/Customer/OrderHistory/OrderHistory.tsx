import { Tag } from "antd";
import AntTable from "../../../Components/Table/AntTable";
import { useUserOrderQuery } from "../../../Redux/features/order/orderApi";
import { formatDate } from "../../../utils/formatDate";

const OrderHistory = () => {
  const { data, isLoading } = useUserOrderQuery(undefined);

  // Define table columns
  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (id: any) => <p className="uppercase">order{id.slice(0, 4)}</p>,
    },
    {
      title: "Customer Name",
      dataIndex: "customer",
      key: "customer.name",
      render: (customer: any) => (
        <p className="w-[120px]">{customer?.name || "N/A"}</p>
      ),
    },
    {
      title: "Shop Name",
      dataIndex: "shop",
      key: "shop.name",
      render: (shop: any) => <p className="w-[100px]">{shop?.name || "N/A"}</p>,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => (
        <p className="w-[100px]">${amount.toFixed(2)}</p>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: string) => (
        <div className="w-[120px]">
          <Tag
            color={
              status === "PENDING"
                ? "processing"
                : status === "PAID"
                ? "green"
                : status === "FAILED"
                ? "red"
                : "gray"
            }
          >
            {status}
          </Tag>
        </div>
      ),
    },
    {
      title: "Shipping Status",
      dataIndex: "shippingStatus",
      key: "shippingStatus",
      render: (status: string) => (
        <div className="w-[120px]">
          {" "}
          <Tag
            color={
              status === "PENDING"
                ? "processing"
                : status === "SHIPPED"
                ? "blue"
                : status === "DELIVERED"
                ? "green"
                : status === "CANCELLED"
                ? "red"
                : "gray"
            }
          >
            {status}
          </Tag>
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
      title: "Payment Method",
      dataIndex: "payment",
      key: "payment.method",
      render: (payment: any) => (
        <p className="w-[120px]">
          {payment?.method === "CASH_ON_DELIVERY"
            ? "COD"
            : payment?.methods || "N/A"}
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Order History</h1>
        <div className="bg-white border rounded-md">
          <AntTable
            loading={isLoading}
            columns={columns}
            data={data?.data || []}
            isPaginate={true}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
