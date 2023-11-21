import "./Header.scss";
import logo from "../../assets/logo/logo-removebg-preview.png";
import icon from "../../assets/icons/pocket_icon.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="header__wrapper">
        <Link to="/">
          <img className="header__icon" src={icon} />
        </Link>
        <Link to="/">
          <img className="header__logo" src={logo} />
        </Link>
      </div>
    </div>
  );
}
export default Header;
