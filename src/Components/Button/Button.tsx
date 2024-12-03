import { Link } from "react-router-dom";
import "./Button.css";

const Button = ({ level, address }) => {
  return (
    <Link to={address}>
      <button className="btn theme-btn-1 btn-effect-1" type="submit">
        {level}
      </button>
    </Link>
  );
};

export default Button;
