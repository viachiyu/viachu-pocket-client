import "./ExpenseCard.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import chevronDown from "../../assets/icons/chevron_down.svg";
import editIcon from "../../assets/icons/edit_icon.svg";
import deleteIcon from "../../assets/icons/delete_icon.svg";
import DeleteExpense from "../DeleteExpense/DeleteExpense";

function ExpenseCard({ expensesList }) {
  const [collapsedStates, setCollapsedStates] = useState({});
  const [expenseProfileList, setExpenseProfileList] = useState(null);
  const [deleteToggle, setDeleteToggle] = useState(null);
  const { pocketsId } = useParams();

  useEffect(() => {
    const fetchExpenseProfileList = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const { data } = await axios.get(
          process.env.REACT_APP_BASE_URL +
            "pockets/" +
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
  }, [pocketsId, expenseProfileList]);

  useEffect(() => {
    const initialCollapsedStates = {};
    expensesList.forEach((expense) => {
      initialCollapsedStates[expense.id] = true;
    });
    setCollapsedStates(initialCollapsedStates);
  }, [expensesList]);

  const handleToggle = (expenseId) => {
    setDeleteToggle(null);
    setCollapsedStates((prev) => ({
      ...prev,
      [expenseId]: !prev[expenseId],
    }));
  };

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-GB");
  }

  const handleDeleteToggle = (expenseId) => {
    setDeleteToggle((prev) =>
      prev?.expenseId === expenseId ? null : { expenseId, delete: true }
    );
  };

  const handleCancelDelete = () => {
    setDeleteToggle(null);
  };

  if (expenseProfileList === null) {
    return <p>Loading...</p>;
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
              <div className="expense__container">
                <div className="expense__actions">
                  <Link
                    className="expense__link"
                    to={`/pockets/${pocketsId}/expenses/${expense.id}/edit`}
                  >
                    <img
                      className="expense__icon"
                      src={editIcon}
                      alt="edit icon"
                    />
                  </Link>
                  <img
                    className="expense__icon"
                    src={deleteIcon}
                    onClick={() => handleDeleteToggle(expense.id)}
                    alt="delete icon"
                  />
                </div>
                <div className="expense__bottom-right">
                  {expenseProfileList
                    .filter((item) => item.expense_id === expense.id)
                    .filter(
                      (item) => item.profile_name !== expense.profile_name
                    )
                    .map((item) => (
                      <p className="expense__pay" key={item.id}>
                        {item.profile_name} owes /{" "}
                        <span className="expense__single">
                          ${item.single_expense}
                        </span>
                      </p>
                    ))}
                </div>
              </div>
              {deleteToggle?.delete && (
                <DeleteExpense
                  expenseId={deleteToggle.expenseId}
                  onCancel={handleCancelDelete}
                />
              )}
            </div>
          )}
        </article>
      ))}
    </>
  );
}

export default ExpenseCard;
