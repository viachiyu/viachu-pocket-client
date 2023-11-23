import "./ExpensesPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import ExpenseCard from "../../components/ExpenseCard/ExpenseCard";
import { useParams } from "react-router-dom";

function ExpensesPage() {
  const [expensesList, setExpensesList] = useState([]);
  const { pocketsId } = useParams();

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
      } catch (error) {
        console.error(error);
      }
    };
    fetchExpenses();
  }, []);

  if (expensesList === null) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <main className="expenses">
        <div className="expenses__wrapper">
          <h1 className="expenses__title">Your Group Expenses</h1>
          <ExpenseCard expensesList={expensesList} />
        </div>
      </main>
    </>
  );
}

export default ExpensesPage;
