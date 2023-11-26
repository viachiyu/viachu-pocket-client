import "./ActiveProfile.scss";
import { useState } from "react";

function ActiveProfile({ chosenProfile }) {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <article className="active">
      <div className="active__wrapper">
        <h2 className="active__name">{chosenProfile.name}</h2>
        <div className="active__totals">
          <p className="active__total">total owed / $100</p>
          <p className="active__total">total debt / $100</p>
        </div>
      </div>

      <div className="active__container">
        <div className="active__tabs">
          <button
            className={`active__tab
                ${toggleState === 1 ? "active__tab--active" : ""}`}
            onClick={() => toggleTab(1)}
          >
            Info
          </button>
          <button
            className={`active__tab
                ${toggleState === 2 ? "active__tab--active" : ""}`}
            onClick={() => toggleTab(2)}
          >
            Owed
          </button>
          <button
            className={`active__tab
                ${toggleState === 3 ? "active__tab--active" : ""}`}
            onClick={() => toggleTab(3)}
          >
            Debt
          </button>
        </div>
        <div className="active__contents">
          <div
            className={`active__content
                ${toggleState === 1 ? "active__content--active" : ""}`}
          >
            <h3 className="active__label">Payment Details:</h3>
            <p> PayPal: {chosenProfile.payment_info}</p>
          </div>

          <div
            className={`active__content
                ${toggleState === 2 ? "active__content--active" : ""}`}
          >
            <h3 className="active__label">Owes Breakdown</h3>
            <p> mimimimi</p>
          </div>
          <div
            className={`active__content
                ${toggleState === 3 ? "active__content--active" : ""}`}
          >
            <h3 className="active__label">Debt Breakdown</h3>
            <p> mimimimi</p>
          </div>
        </div>
      </div>
    </article>
  );
}
export default ActiveProfile;
