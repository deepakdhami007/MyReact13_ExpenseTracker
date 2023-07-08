import { Route, Routes } from "react-router-dom";
import "./App.css";
import Expense from "./Components/ExpenseTracker/Expense";
import RootLayout from "./Components/Layout/Root";
import Profile from "./Components/Profile/Profile";

import SignupLogin from "./Components/SignupLogin/SignupLogin";
import ExpenseProvider from "./store/ExpenseContext";

function App() {
  return (
    <ExpenseProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignupLogin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/expense-tracker" element={<RootLayout />}>
            <Route index element={<Expense />} />
          </Route>
        </Routes>
      </div>
    </ExpenseProvider>
  );
}

export default App;
