import "./ActiveProfile.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ActiveProfile({ chosenProfile }) {
  const [toggleState, setToggleState] = useState(1);
  const [expenseProfile, setExpenseProfile] = useState(null);
  const { pocketsId } = useParams();

  const toggleTab = (index) => {
    setToggleState(index);
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    const fetchExpenseToken = async () => {
      try {
        const { data } = await axios.get(
          process.env.REACT_APP_BASE_URL +
            "/pockets/" +
            pocketsId +
            "/expensesprofiles",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setExpenseProfile(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExpenseToken();
  }, [pocketsId]);

  const calcTotalOwed = (expenses, chosenProfileId) => {
    if (!expenses) {
      return 0;
    }
    const totalOwed = expenses.reduce((total, expense) => {
      if (expense.paid_by !== chosenProfileId) {
        total += expense.single_expense;
      }
      return total;
    }, 0);
    return totalOwed;
  };

  const calcTotalDebt = (expenses, chosenProfileId) => {
    if (!expenses) {
      return 0;
    }
    return expenses.reduce((totalDebt, expense) => {
      if (
        expense.profile_id === chosenProfileId &&
        expense.paid_by !== chosenProfileId
      ) {
        totalDebt += expense.single_expense;
      }
      return totalDebt;
    }, 0);
  };

  const totalOwed = calcTotalOwed(expenseProfile, chosenProfile.id);
  const totalDebt = calcTotalDebt(expenseProfile, chosenProfile.id);

  return (
    <article className="active">
      <div className="active__wrapper">
        <h2 className="active__name">{chosenProfile.name}</h2>
        <div className="active__totals">
          <p className="active__total">total owed / ${totalOwed}</p>
          <p className="active__total">total debt / ${totalDebt}</p>
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
