import { Select, Switch, Tag } from "antd"; // Import Ant Design's Select component
import { toast } from "react-toastify";
import AntTable from "../../Components/Table/AntTable";
import {
  useGetAllUserQuery,
  useToggleUserStatusMutation,
  useUpdateUserRoleMutation,
} from "../../Redux/features/user/userApi";
import { UserRole, UserStatus } from "../../types/types";

const { Option } = Select; // Destructure Option component for easier usage

const ManageAllUsers = () => {
  const { data, error, isLoading } = useGetAllUserQuery(undefined);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [toggleUserStatus] = useToggleUserStatusMutation();

  if (error) {
    toast.error(error.data?.message || error.message);
    return null;
  }

  const users = data?.data || [];

  // Handle the update of user role
  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      const res = await updateUserRole({ userId, role: newRole }).unwrap();
      if (res.status) {
        toast.success(`User role updated to ${newRole}`);
      }
    } catch (err) {
      toast.error("Failed to update user role");
    }
  };
  // Handle user status toggle (Active/Deactivated)
  const handleStatusToggle = async (userId: string, isActive: boolean) => {
    try {
      const res = await toggleUserStatus({
        userId,
        isSuspended: !isActive,
      }).unwrap();
      if (res.status) {
        toast.success(
          `User ${isActive ? "Activated" : "Deactivated"} successfully`
        );
      }
    } catch (err) {
      toast.error("Failed to update user status");
    }
  };
  // Determine which options should be disabled for Role based on isSuspended
  const getRoleDisabledOptions = (isSuspended: boolean) => {
    return isSuspended ? Object.values(UserRole) : [];
  };

  // Columns for AntTable
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: any) => <p className="w-[130px]">{name}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: any) => <p className="w-[150px]">{email}</p>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: UserRole, record: any) => (
        <Select
          value={role}
          onChange={(value) => handleRoleChange(record.id, value as UserRole)}
          style={{ width: 150 }}
          disabled={isLoading || record.isSuspended || role === UserRole.ADMIN}
        >
          {Object.values(UserRole).map((roleOption) => (
            <Option
              key={roleOption}
              value={roleOption}
              disabled={getRoleDisabledOptions(record.isSuspended).includes(
                roleOption
              )}
            >
              {roleOption}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === UserStatus.ACTIVE
              ? "green"
              : status === UserStatus.BLOCKED
              ? "red"
              : "cyan"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "isSuspended",
      key: "isSuspended",
      render: (isSuspended: boolean, record: any) => (
        <Switch
          checked={!isSuspended}
          onChange={(checked) => handleStatusToggle(record.id, checked)}
          disabled={isLoading}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Manage Users</h1>
        <div className="bg-white border rounded-md">
          <AntTable
            loading={isLoading}
            columns={columns}
            data={users}
            isPaginate={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageAllUsers;
