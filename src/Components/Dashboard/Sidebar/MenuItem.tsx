import { NavLink } from "react-router-dom";

const MenuItem = ({ label, address, icon: Icon }: any) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center gap-2 mb-3 px-4 py-[6px]  transition-colors duration-300 transform rounded  ${
          isActive
            ? "bg-[rgb(10,154,115,0.1)] text-primary"
            : "text-gray-500 hover:bg-[rgb(10,154,115,0.1)]   hover:text-primary"
        }`
      }
    >
      <Icon className="size-5" />

      <span>{label}</span>
    </NavLink>
  );
};

export default MenuItem;
