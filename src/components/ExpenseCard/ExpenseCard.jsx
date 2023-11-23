import { useState } from "react";
import "./ExpenseCard.scss";
import chevronDown from "../../assets/icons/chevron_down.svg";

function ExpenseCard() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <article className="expense">
      <div className="expense__open">
        <div className="expense__left">
          <h2 className="expense__total">$90</h2>
          <p className="expense__name">Name of Expense</p>
        </div>
        <div className="expense__right">
          <h3 className="expense__date">16 May 2023</h3>
          <button className="expense__trigger-button" onClick={handleToggle}>
            <img
              className={`expense__down-icon ${isCollapsed ? "" : "rotated"}`}
              src={chevronDown}
            />
          </button>
        </div>
      </div>
      {!isCollapsed && (
        <div className="expense__toggle">
          <p className="expense__paid">
            Who Paid: <span className="expense__bold">Name</span>
          </p>
          <div className="expense__container">
            <p className="expense__pay">
              name owes / <span className="expense__single">$18</span>
            </p>
            <p className="expense__pay">
              name owes / <span className="expense__single">$18</span>
            </p>
            <p className="expense__pay">
              name owes / <span className="expense__single">$18</span>
            </p>
          </div>
        </div>
      )}
    </article>
  );
}

export default ExpenseCard;
