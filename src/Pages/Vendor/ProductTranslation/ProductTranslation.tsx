import { Tag } from "antd";
import { toast } from "react-toastify";
import AntTable from "../../../Components/Table/AntTable";
import { useProductTranslationQuery } from "../../../Redux/features/payment/paymentApi";

const ProductTranslation = () => {
  const { data, error, isLoading } = useProductTranslationQuery(undefined);

  if (error) {
    toast.error(error.data?.message || error.message);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          Failed to load data: {error.data?.message || error.message}
        </p>
      </div>
    );
  }

  const productTranslation = data?.data || [];

  // Columns for AntTable
  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (id: string) => (
        <p className="uppercase">order{id.slice(0, 4)}</p>
      ),
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
      render: (customer: any) => <p>{customer?.name || "Unknown"}</p>,
    },
    {
      title: "Shop",
      dataIndex: "shop",
      key: "shop",
      render: (shop: any) => <p>{shop?.name || "Unknown"}</p>,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount: number) => <p>${totalAmount.toLocaleString()}</p>,
    },
    {
      title: "Payment Method",
      dataIndex: "payment",
      key: "payment",
      render: (payment: any) => <p>{payment?.method || "N/A"}</p>,
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: string) => (
        <Tag color={status === "PAID" ? "green" : "red"}>{status}</Tag>
      ),
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Order Transition
        </h1>
        <div className="bg-white border rounded-md">
          <AntTable
            loading={isLoading}
            columns={columns}
            data={productTranslation}
            isPaginate={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductTranslation;