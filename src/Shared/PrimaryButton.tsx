import { Link } from "react-router-dom";

const PrimaryButton = ({ level, address }) => {
  return (
    <Link to={address}>
      <button className="px-6 py-2 text-center text-white bg-primary border border-primary  font-semibold hover:bg-transparent hover:text-primary duration-300">
        {" "}
        {level}
      </button>
    </Link>
  );
};

export default PrimaryButton;
