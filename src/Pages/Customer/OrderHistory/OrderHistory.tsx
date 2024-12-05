import AntTable from "../../../Components/Table/AntTable";
import { useUserOrderQuery } from "../../../Redux/features/order/orderApi";
import { formatDate } from "../../../utils/formatDate";

const OrderHistory = () => {
  const { data, error, isLoading } = useUserOrderQuery(undefined);

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
      render: (customer: any) => <p>{customer?.name || "N/A"}</p>,
    },
    {
      title: "Shop Name",
      dataIndex: "shop",
      key: "shop.name",
      render: (shop: any) => <p>{shop?.name || "N/A"}</p>,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => <p>${amount.toFixed(2)}</p>,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded ${
            status === "PAID" ? "bg-green/10 text-green" : "bg-red/10 text-red"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Shipping Status",
      dataIndex: "shippingStatus",
      key: "shippingStatus",
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded ${
            status === "DELIVERED"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => <p>{formatDate(createdAt)}</p>,
    },
    {
      title: "Payment Method",
      dataIndex: "payment",
      key: "payment.method",
      render: (payment: any) => <p>{payment?.method || "N/A"}</p>,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
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