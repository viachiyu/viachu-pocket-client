import "./App.scss";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
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
  const [selectedPocketId, setSelectedPocketId] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<StartPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/"
            element={<ShellPage selectedPocketId={selectedPocketId} />}
          >
            <Route
              path="/pockets"
              element={
                <PocketsPage setSelectedPocketId={setSelectedPocketId} />
              }
            />
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
