import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage/StartPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/pockets" element={<MainPage />} />
          <Route path="/pockets/:pocketsId/expenses" element={<MainPage />} />
          <Route
            path="/pockets/:pocketsId/expenses/add"
            element={<MainPage />}
          />
          <Route
            path="/pockets/:pocketsId/expenses/:expenseId/edit"
            element={<MainPage />}
          />
          <Route path="/pockets/:pocketsId/profiles" element={<MainPage />} />
          <Route path="/profile/edit" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
