import "./ExpensesPage.scss";

function ExpensesPage({ pocketId }) {
  return (
    <main className="expenses">
      <h1> expenses list for {pocketId}</h1>
    </main>
  );
}

export default ExpensesPage;
