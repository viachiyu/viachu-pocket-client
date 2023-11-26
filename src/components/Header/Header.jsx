import "./Header.scss";
import logo from "../../assets/logo/logo-removebg-preview.png";
import icon from "../../assets/icons/pocket_icon.png";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__left">
          <Link to="/login">
            <img
              className="header__icon"
              src={icon}
              alt="Icon"
              onClick={handleLogoClick}
            />
          </Link>
        </div>

        <Link to="/login">
          <img
            className="header__logo"
            src={logo}
            alt="Logo"
            onClick={handleLogoClick}
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
