import { Tag } from "antd";
import { useSelector } from "react-redux";
import AntTable from "../../Components/Table/AntTable";
import { RootState } from "../../Redux/features/store";
const RecentView = () => {
  const resentViewProduct = useSelector(
    (state: RootState) => state.resentViewProduct.items
  );
  console.log(resentViewProduct);
  // Define table columns
  const columns = [
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => (
        <div className="flex items-center gap-2 w-[130px]">
          <img
            className="w-10 h-10 rounded-lg"
            src={record.thumbnail}
            alt={record.name}
          />
          <h3 className="text-[13px]">{text}</h3>
        </div>
      ),
    },
    {
      title: "Item Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <p className="w-[100px]">${price}</p>,
    },
    {
      title: "Total Quantity",
      dataIndex: "inventory",
      key: "inventory",
      render: (inventory: number) => <p className="w-[100px]">{inventory}</p>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: string) => (
        <p className="w-[100px]">
          <Tag color={"green"}>{category}</Tag>
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Recent View Product
        </h1>
        <div className="bg-white border rounded-md">
          {/* Ant Design Table */}
          <AntTable
            columns={columns}
            data={resentViewProduct || []}
            isPaginate={false}
          />
        </div>
      </div>
    </div>
  );
};

export default RecentView;
