import "./SignupPage.scss";
import Header from "../../components/Header/Header";
import { useNavigate, Link } from "react-router-dom";
import userIcon from "../../assets/icons/user_icon.svg";
import lockIcon from "../../assets/icons/lock_icon.svg";
import emailIcon from "../../assets/icons/email_icon.svg";
import chevronRight from "../../assets/icons/Expand_right.svg";

function SignupPage() {
  return (
    <>
      <Header />
      <main className="signup">
        <article className="signup__wrapper">
          <h1 className="signup__title"> Sign Up</h1>
          <form
            className="signup__form"
            // onSubmit={handleSubmit}
          >
            <div className="signup__field">
              <img className="signup__icon" src={userIcon} />
              <input
                className="signup__input"
                type="text"
                name="name"
                label="Name"
                placeholder="Name"
              />
            </div>
            <div className="signup__field">
              <img className="signup__icon" src={emailIcon} />
              <input
                className="signup__input"
                type="text"
                name="email"
                label="Email"
                placeholder="Email"
              />
            </div>
            <div className="signup__field">
              <img className="signup__icon" src={lockIcon} />
              <input
                className="signup__input"
                type="password"
                name="password"
                label="Password"
                placeholder="Password"
              />
            </div>

            <button className="signup__button">
              <p className="signup__text">SIGN UP </p>
              <img className="signup__arrow" src={chevronRight} />
            </button>
            {/* {error && <div className="signup__message">{error}</div>} */}
          </form>

          <p className="signup__login">
            Have an account?
            <Link to="/" className="signup__link">
              Log In
            </Link>
          </p>
        </article>
        <h2 className="signup__description">
          Designed to effortlessly track and divide group expenses & settle up
          post-trip with ease.
        </h2>
      </main>
    </>
  );
}

export default SignupPage;
