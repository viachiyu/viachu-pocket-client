import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage/StartPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import PocketsPage from "./pages/PocketsPage/PocketsPage";
import ExpensesPage from "./pages/ExpensesPage/ExpensesPage";
import AddExpensePage from "./pages/AddExpensePage/AddExpensePage";
import EditExpensePage from "./pages/EditExpensePage/EditExpensePage";
import ProfilesPage from "./pages/ProfilesPage/ProfilesPage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/pockets" element={<PocketsPage />} />
          <Route
            path="/pockets/:pocketsId/expenses"
            element={<ExpensesPage />}
          />
          <Route
            path="/pockets/:pocketsId/expenses/add"
            element={<AddExpensePage />}
          />
          <Route
            path="/pockets/:pocketsId/expenses/:expenseId/edit"
            element={<EditExpensePage />}
          />
          <Route
            path="/pockets/:pocketsId/profiles"
            element={<ProfilesPage />}
          />
          <Route path="/profile/edit" element={<EditProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
