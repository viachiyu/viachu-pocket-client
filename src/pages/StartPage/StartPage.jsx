import "./StartPage.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import icon from "../../assets/icons/pocket_icon.png";
import chevronRight from "../../assets/icons/Expand_right.svg";
import userIcon from "../../assets/icons/user_icon.svg";
import lockIcon from "../../assets/icons/lock_icon.svg";
import Logo from "../../assets/logo/logo-removebg-preview.png";

function StartPage() {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email: event.target.email.value,
        password: event.target.password.value,
      });

      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("email", event.target.email.value);
      setMessage("Welcome Back!");
      setTimeout(() => {
        navigate("/pockets");
      }, 1200);
    } catch (error) {
      console.error(error);
      setMessage(
        "Incorrect email or password. Please double-check and try again."
      );
    }
  };

  return (
    <main className="start">
      <section className="start__top">
        <div className="start__image">
          <img className="start__icon" src={icon} alt="Icon" />
        </div>
        <img className="start__logo" src={Logo} alt="logo" />
        <p className="start__slogan">
          Track and divide group expenses with ease.
        </p>
      </section>
      <section className="start__bottom">
        <form className="login" onSubmit={handleSubmit}>
          <div className="login__fields">
            <div className="login__field">
              <img className="login__icon" src={userIcon} alt="user icon" />
              <input
                className="login__input login__input--email"
                type="text"
                name="email"
                label="Email"
                placeholder="enter email"
              />
            </div>
            <div className="login__field">
              <img className="login__icon" src={lockIcon} alt="lock icon" />
              <input
                className="login__input login__input--password"
                type="password"
                name="password"
                label="Password"
                placeholder="enter password"
              />
            </div>
          </div>
          <button className="login__button">
            <p className="login__text">LOG IN </p>
            <img
              className="login__arrow"
              src={chevronRight}
              alt="right arrow"
            />
          </button>
          {message && (
            <div
              className={`login__message ${
                message.includes("Please") ? "login__error" : "login__success"
              }`}
            >
              {message}
            </div>
          )}
        </form>

        <p className="start__signup">
          Need an account?
          <Link to="/signup" className="start__link">
            Sign Up
          </Link>
        </p>
      </section>
    </main>
  );
}

export default StartPage;
