import "./Header.scss";
import logo from "../../assets/logo/logo-removebg-preview.png";
import icon from "../../assets/icons/pocket_icon.png";

function Header() {
  return (
    <div className="header">
      <div className="header__wrapper">
        <img className="header__icon" src={icon} />
        <img className="header__logo" src={logo} />
      </div>
    </div>
  );
}
export default Header;
