import "./Header.scss";
import logo from "../../assets/logo/logo-removebg-preview.png";
import icon from "../../assets/icons/pocket_icon.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__left">
          <Link to="/">
            <img className="header__icon" src={icon} />
          </Link>
          {/* <p className="header__name">{pocketName}</p> */}
        </div>

        <Link to="/">
          <img className="header__logo" src={logo} />
        </Link>
      </div>
    </header>
  );
}
export default Header;
