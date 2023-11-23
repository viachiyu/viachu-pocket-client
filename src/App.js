import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage/StartPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ExpensesPage from "./pages/ExpensesPage/ExpensesPage";
import AddExpensePage from "./pages/AddExpensePage/AddExpensePage";
import EditExpensePage from "./pages/EditExpensePage/EditExpensePage";
import ProfilesPage from "./pages/ProfilesPage/ProfilesPage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import PocketsPage from "./pages/PocketsPage/PocketsPage";
import ShellPage from "./pages/ShellPage/ShellPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/pockets" element={<PocketsPage />} />
          <Route path="pockets/:pocketsId" element={<ShellPage />}>
            <Route path="expenses" element={<ExpensesPage />} />
            <Route path="expenses/add" element={<AddExpensePage />} />
            <Route
              path="expenses/:expenseId/edit"
              element={<EditExpensePage />}
            />
            <Route path="profiles" element={<ProfilesPage />} />
            <Route
              path="profile/:profileId/edit"
              element={<EditProfilePage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
