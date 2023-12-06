import "./SignupPage.scss";
import Header from "../../components/Header/Header";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userIcon from "../../assets/icons/user_icon.svg";
import lockIcon from "../../assets/icons/lock_icon.svg";
import lock2Icon from "../../assets/icons/lock_hollow_icon.svg";
import emailIcon from "../../assets/icons/email_icon.svg";
import chevronRight from "../../assets/icons/Expand_right.svg";

function SignupPage() {
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsError(true);
      return;
    }

    try {
      await axios.post(
        process.env.REACT_APP_BASE_URL + "/auth/register",

        {
          name: event.target.name.value,
          email: event.target.email.value,
          password: event.target.password.value,
        }
      );

      setMessage("Success!");
      setIsError(false);
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (error) {
      console.error(error);
      setMessage(error.response.data);
      setIsError(true);
    }
  };

  return (
    <>
      <Header />
      <main className="signup">
        <article className="signup__wrapper">
          <h1 className="signup__title"> Sign Up</h1>
          <form className="signup__form" onSubmit={handleSubmit}>
            <div className="signup__field">
              <img className="signup__icon" src={userIcon} alt="usericon" />
              <input
                className="signup__input"
                type="text"
                name="name"
                label="Name"
                placeholder="Name"
              />
            </div>
            <div className="signup__field">
              <img className="signup__icon" src={emailIcon} alt="email icon" />
              <input
                className="signup__input"
                type="text"
                name="email"
                label="Email"
                placeholder="Email"
              />
            </div>
            <div className="signup__field">
              <img className="signup__icon" src={lockIcon} alt="lock icon" />
              <input
                className="signup__input"
                type="password"
                name="password"
                label="Password"
                placeholder="Password"
              />
            </div>
            <div className="signup__field">
              <img className="signup__icon" src={lock2Icon} alt="lock2" />
              <input
                className="signup__input"
                type="password"
                name="confirmPassword"
                label="confirmPassword"
                placeholder="Confirm Password"
              />
            </div>
            {message && (
              <div
                className={`signup__message ${
                  isError ? "signup__error" : "signup__success"
                }`}
              >
                {message}
              </div>
            )}

            <button className="signup__button">
              <p className="signup__text">SIGN UP </p>
              <img className="signup__arrow" src={chevronRight} alt="arrow" />
            </button>
          </form>

          <p className="signup__login">
            Have an account?
            <Link to="/login" className="signup__link">
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
