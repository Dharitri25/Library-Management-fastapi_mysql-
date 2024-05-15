import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import "./home.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import ClassIcon from "@mui/icons-material/Class";
import GroupIcon from "@mui/icons-material/Group";
import SearchIcon from "@mui/icons-material/Search";
import Person4Icon from "@mui/icons-material/Person4";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ReorderIcon from "@mui/icons-material/Reorder";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import {
  List,
  Drawer,
  Divider,
  ListItem,
  IconButton,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import AllUsers from "../admin/AllUsers";
import AllBooks from "../admin/AllBooks";
import AllBookIssues from "../admin/AllBookIssues";
import AllLibrarians from "../admin/AllLibrarians";
import { checkToken, handleLogout } from "./commonFunctionalities";

const drawerWidth = 240;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function Home() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const api = "http://127.0.0.1:8000";

  const [bookCategories, setBookCategories] = useState([]);
  const [selectedTab, setSelectedTab] = useState("");

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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuOpenIcon />
          </IconButton>
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
                <button
                  className="nav-button"
                  onClick={() => {
                    handleLogout().then(() => {
                      // checkToken();
                      navigate("/");
                    });
                  }}
                >
                  Logout
                </button>
                <button className="nav-button" onClick={() => navigate("/")}>
                  Back
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <NotificationContainer />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#ffede3bf",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding onClick={() => setSelectedTab("librarians")}>
            <ListItemButton className="listItemButton">
              <Person4Icon />
              <ListItemText primary={"LIBRARIANS"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => setSelectedTab("users")}>
            <ListItemButton className="listItemButton">
              <GroupIcon />
              <ListItemText primary={"USERS"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => setSelectedTab("books")}>
            <ListItemButton className="listItemButton">
              <LibraryBooksIcon />
              <ListItemText primary={"BOOKS"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding onClick={() => setSelectedTab("bookIssues")}>
            <ListItemButton className="listItemButton">
              <ReorderIcon />
              <ListItemText primary={"BOOKS ISSUE"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <div>
        {selectedTab === "librarians" ? (
          <AllLibrarians />
        ) : selectedTab === "users" ? (
          <AllUsers />
        ) : selectedTab === "books" ? (
          <AllBooks />
        ) : selectedTab === "bookIssues" ? (
          <AllBookIssues />
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default Home;
