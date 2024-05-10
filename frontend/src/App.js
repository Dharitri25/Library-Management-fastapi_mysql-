import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/utils/Welcome";
import Login from "./components/admin/Login";
import Home from "./components/utils/Home";
import BooksByCategory from "./components/utils/BooksByCategory";
import UserHome from "./components/user/UserHome";
import IssueBook from "./components/user/IssueBook";

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Welcome />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route
          exact
          path="/books_by_category/:category"
          element={<BooksByCategory />}
        ></Route>
        <Route exact path="/user-home" element={<UserHome />}></Route>
        <Route exact path="/user/issue-book" element={<IssueBook />}></Route>
      </Routes>
    </>
  );
};
export default App;
