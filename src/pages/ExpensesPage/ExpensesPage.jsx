import "./ExpensesPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExpenseCard from "../../components/ExpenseCard/ExpenseCard";

function ExpensesPage() {
  const [expensesList, setExpensesList] = useState([]);
  const { pocketsId } = useParams();
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const { data } = await axios.get(
          process.env.REACT_APP_BASE_URL +
            "/pockets/" +
            pocketsId +
            "/expenses",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setExpensesList(data);

        const total = data.reduce(
          (acc, expense) => acc + expense.total_expense,
          0
        );
        setTotalExpenses(total);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExpenses();
  }, [pocketsId]);

  if (!expensesList) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <main className="expenses">
        <div className="expenses__wrapper">
          <h1 className="expenses__title">Group Expenses</h1>
          <ExpenseCard expensesList={expensesList} />
          <section className="expenses__bottom">
            <h2 className="expenses__total">Total:</h2>
            <p className="expenses__amount">${totalExpenses}</p>
          </section>
        </div>
      </main>
    </>
  );
}

export default ExpensesPage;
