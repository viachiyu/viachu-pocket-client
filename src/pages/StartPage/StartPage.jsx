import "./StartPage.scss";
import { useNavigate, Link } from "react-router-dom";
import chevronRight from "../../assets/icons/Expand_right.svg";
import userIcon from "../../assets/icons/user_icon.svg";
import lockIcon from "../../assets/icons/lock_icon.svg";
import Logo from "../../assets/logo/logo-removebg-preview.png";

function StartPage() {
  return (
    <main className="start">
      <section className="start__top">
        <div className="start__image">animation</div>
        <img className="start__logo" src={Logo} />
        <p className="start__slogan">
          Track and divide group expenses with ease.
        </p>
      </section>
      <section className="start__bottom">
        <form
          className="login"
          // onSubmit={handleSubmit}
        >
          <div className="login__fields">
            <div className="login__field">
              <img className="login__icon" src={userIcon} />
              <input
                className="login__input login__input--email"
                type="text"
                name="email"
                label="Email"
                placeholder="enter email here"
              />
            </div>
            <div className="login__field">
              <img className="login__icon" src={lockIcon} />
              <input
                className="login__input login__input--password"
                type="password"
                name="password"
                label="Password"
                placeholder="enter password here"
              />
            </div>
          </div>
          <button className="login__button">
            <p className="login__text">LOG IN </p>
            <img className="login__arrow" src={chevronRight} />
          </button>
          {/* {error && <div className="login__message">{error}</div>} */}
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
