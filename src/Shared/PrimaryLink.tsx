import { Link } from "react-router-dom";

const PrimaryLink = ({ level, address }) => {
  return (
    <Link to={address}>
      <button className="text-primary font-semibold underline"> {level}</button>
    </Link>
  );
};
export default PrimaryLink;
