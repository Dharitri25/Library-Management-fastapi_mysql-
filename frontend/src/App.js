import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/utils/Welcome";
import Login from "./components/admin/Login";
import Home from "./components/utils/Home";
import BooksByCategory from "./components/utils/BooksByCategory";
import UserHome from "./components/user/UserHome";
import IssueBook from "./components/user/IssueBook";
import UserInfo from "./components/user/UserInfo";
import UserBookDetails from "./components/user/UserBookDetails";

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
        <Route exact path="/user-info" element={<UserInfo />}></Route>
        <Route
          exact
          path="/user-books"
          element={<UserBookDetails />}
        ></Route>
      </Routes>
    </>
  );
};
export default App;
