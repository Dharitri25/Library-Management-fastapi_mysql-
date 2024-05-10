import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { NotificationManager } from "react-notifications";

const api = "http://127.0.0.1:8000";
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};

// check for token active or not
export const checkToken = async () => {
  let decodedToken = jwtDecode(token);
  let currentDate = new Date();
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    return false;
  } else {
    return true;
  }
};


