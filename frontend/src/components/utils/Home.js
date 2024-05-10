import React, { useEffect, useState } from "react";
import "./home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import SearchIcon from "@mui/icons-material/Search";
import ClassIcon from "@mui/icons-material/Class";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

function Home() {
  const navigate = useNavigate();
  const api = "http://127.0.0.1:8000";
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [bookCategories, setBookCategories] = useState([]);

  const handleLogout = async () => {
    try {
      await axios
        .post(`${api}/librarians/sign_out`, { headers })
        .then((res) => {
          NotificationManager.success("Librarian signed out sussessfully");
          navigate("/");
        });
    } catch (err) {
      NotificationManager.error(err);
    }
  };

  const getBookCategories = () => {
    try {
      axios.get(`${api}/categories/get_all`).then((res) => {
        res?.data && setBookCategories(res.data);
      });
    } catch (err) {
      NotificationManager.error(err);
    }
  };

  useEffect(() => {
    getBookCategories();
  }, []);

  return (
    <div className="home-page">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <label for="menu-control" class="hamburger">
            <MenuOpenIcon />
          </label>
          <div className="welcome_logo">
            <AutoStoriesIcon />
            <span>Library</span>
          </div>
          <div
            className="collapse navbar-collapse nav_buttons"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <div className="input-box">
                <input type="text" className="form-control" />
                <SearchIcon className="input-box-icon" />
              </div>
              <li className="nav-item">
                <button className="nav-button" onClick={() => handleLogout()}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <NotificationContainer />
      <div>
        <input type="checkbox" id="menu-control" class="menu-control" />
        <aside class="sidebar">
          <nav class="sidebar__menu">
            <a href="/">Home</a>
            <a href="/">About us</a>
            <a href="/">Services</a>
            <a href="/">Products</a>
            <a href="/">Contact</a>
          </nav>
          <label for="menu-control" class="sidebar__close"></label>
        </aside>
      </div>
      <div>
        <div className="home-container">
          {bookCategories?.length > 0 ? (
            bookCategories.map((cat) => {
              return (
                <div
                  key={cat?.id}
                  className="items"
                  onClick={() => navigate(`/books_by_category/${cat?.id}`)}
                >
                  <div className="icon-wrapper">
                    <ClassIcon className="category" />
                  </div>
                  <div className="project-name">
                    <p>{cat?.name}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-cat-home">Library out of service!</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
