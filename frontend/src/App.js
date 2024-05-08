import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/utils/Welcome";
import Login from "./components/admin/Login";
import Home from "./components/utils/Home";
import BooksByCategory from "./components/utils/BooksByCategory";

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
      </Routes>
    </>
  );
};
export default App;
