import { Table } from "antd";
import { useState } from "react";

export default function AntTable(props: any) {
  const {
    data,
    columns,
    rowKey,
    currentPage,
    handlePageChange,
    setLimit,
    setCurrentPage,
    selectRow,
    isPaginate,
    showHeader,
    loading = false,
    onSelectRowsChange,
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Handle row selection change
  const handleRowSelectionChange = (
    selectedRowKeys: any,
    selectedRows: any
  ) => {
    setSelectedRowKeys(selectedRowKeys);
    if (onSelectRowsChange) {
      onSelectRowsChange(selectedRows);
    }
  };

  // rowSelection object for row selection features
  const rowSelection = {
    selectedRowKeys,
    onChange: handleRowSelectionChange,
    getCheckboxProps: (record: any) => {
      return { disabled: record.name === "Disabled User", name: record.name };
    },
  };

  return (
    <Table
      loading={loading}
      rowKey={rowKey ? rowKey : "id"}
      rowSelection={selectRow ? rowSelection : undefined}
      dataSource={data || []}
      columns={columns}
      scroll={{ x: true }}
      pagination={
        isPaginate
          ? {
              pageSize: data?.resultPerPage || 10,
              total: data?.count || data?.length || 0,
              current: currentPage,
              onChange: handlePageChange,
              showSizeChanger: false,
              pageSizeOptions: ["10", "25", "50", "100"],
              onShowSizeChange: (current: any, newSize: any) => {
                setLimit(newSize);
                setCurrentPage(1);
              },
              showQuickJumper: false,
            }
          : false
      }
      showHeader={showHeader}
    />
  );
}
