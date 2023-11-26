import "./ActiveProfile.scss";
import { useState } from "react";

function ActiveProfile({
  chosenProfile,
  expenseProfilesList,
  filteredProfiles,
}) {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  function calculateOwedAmount(expenses) {
    const amountOwed = {};
    expenses.forEach((expense) => {
      const { profile_id, single_expense, paid_by } = expense;
      if (profile_id !== paid_by) {
        if (!amountOwed[paid_by]) {
          amountOwed[paid_by] = 0;
        }
        amountOwed[paid_by] += single_expense;
      }
    });
    return amountOwed;
  }
  const owedAmounts = calculateOwedAmount(expenseProfilesList);

  function calculateAmountsOwedToYou(expenses, yourProfileId) {
    const amountsOwedToYou = {};
    expenses.forEach((expense) => {
      const { profile_id, single_expense, paid_by } = expense;
      if (paid_by === yourProfileId && profile_id !== yourProfileId) {
        if (!amountsOwedToYou[profile_id]) {
          amountsOwedToYou[profile_id] = 0;
        }
        amountsOwedToYou[profile_id] += single_expense;
      }
    });
    return amountsOwedToYou;
  }
  const amountsOwedToYou = calculateAmountsOwedToYou(
    expenseProfilesList,
    chosenProfile.id
  );

  function calculateTotalDebt(expenses, yourProfileId) {
    let totalDebt = 0;
    expenses.forEach((expense) => {
      const { profile_id, single_expense, paid_by } = expense;
      if (profile_id === yourProfileId && paid_by !== yourProfileId) {
        totalDebt += single_expense;
      }
    });
    return totalDebt;
  }
  const totalDebt = calculateTotalDebt(expenseProfilesList, chosenProfile.id);

  function calculateAmountsOwedByYou(expenses, yourProfileId) {
    const amountsOwedByYou = {};
    expenses.forEach((expense) => {
      const { profile_id, single_expense, paid_by } = expense;
      if (profile_id === yourProfileId && paid_by !== yourProfileId) {
        if (!amountsOwedByYou[paid_by]) {
          amountsOwedByYou[paid_by] = 0;
        }
        amountsOwedByYou[paid_by] += single_expense;
      }
    });

    return amountsOwedByYou;
  }
  const amountsOwedByYou = calculateAmountsOwedByYou(
    expenseProfilesList,
    chosenProfile.id
  );

  return (
    <article className="active">
      <div className="active__wrapper">
        <h2 className="active__name">{chosenProfile.name}</h2>
        <div className="active__totals">
          <p className="active__total">
            total owed / ${owedAmounts[chosenProfile.id] || 0}
          </p>
          <p className="active__total">total debt / ${totalDebt || 0}</p>
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
            <h3 className="active__label">Who owes you what?</h3>
            {filteredProfiles.map((profile) => (
              <p className="active__names" key={profile.id}>
                {" "}
                {profile.name} owes you / ${amountsOwedToYou[profile.id] || 0}
              </p>
            ))}
          </div>
          <div
            className={`active__content
                ${toggleState === 3 ? "active__content--active" : ""}`}
          >
            <h3 className="active__label">Who do you owe?</h3>

            {filteredProfiles.map((profile) => (
              <div className="active__box" key={profile.id}>
                <p className="active__names">
                  {" "}
                  You owe {profile.name} / ${amountsOwedByYou[profile.id] || 0}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
export default ActiveProfile;
