import "./ExpenseCard.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import chevronDown from "../../assets/icons/chevron_down.svg";

function ExpenseCard({ expensesList }) {
  const [collapsedStates, setCollapsedStates] = useState({});
  const [expenseProfileList, setExpenseProfileList] = useState(null);
  const { pocketsId } = useParams();

  useEffect(() => {
    const fetchExpenseProfileList = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const { data } = await axios.get(
          process.env.REACT_APP_BASE_URL +
            "/pockets/" +
            pocketsId +
            "/expensesprofiles",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setExpenseProfileList(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExpenseProfileList();
  }, [pocketsId]);

  useEffect(() => {
    const initialCollapsedStates = {};
    expensesList.forEach((expense) => {
      initialCollapsedStates[expense.id] = true;
    });
    setCollapsedStates(initialCollapsedStates);
  }, [expensesList]);

  const handleToggle = (expenseId) => {
    setCollapsedStates((prev) => ({
      ...prev,
      [expenseId]: !prev[expenseId],
    }));
  };

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB");
  }

  return (
    <>
      {expensesList.map((expense) => (
        <article className="expense" key={expense.id}>
          <div className="expense__open">
            <div className="expense__left">
              <h2 className="expense__total">${expense.total_expense}</h2>
              <p className="expense__name">{expense.name}</p>
            </div>
            <div className="expense__right">
              <h3 className="expense__date">{formatDate(expense.date)}</h3>
              <button
                className="expense__trigger-button"
                onClick={() => handleToggle(expense.id)}
              >
                <img
                  className={`expense__down-icon ${
                    collapsedStates[expense.id] ? "rotated" : ""
                  }`}
                  src={chevronDown}
                  alt="Toggle"
                />
              </button>
            </div>
          </div>
          {!collapsedStates[expense.id] && (
            <div className="expense__toggle">
              <p className="expense__paid">
                Who Paid:{" "}
                <span className="expense__bold">{expense.profile_name}</span>
              </p>
              {expenseProfileList
                .filter((item) => item.expense_id === expense.id)
                .filter((item) => item.profile_name !== expense.profile_name)
                .map((item) => (
                  <div className="expense__container">
                    <p className="expense__pay">
                      {item.profile_name} /{" "}
                      <span className="expense__single">
                        ${item.single_expense}
                      </span>
                    </p>
                  </div>
                ))}
            </div>
          )}
        </article>
      ))}
    </>
  );
}

export default ExpenseCard;
