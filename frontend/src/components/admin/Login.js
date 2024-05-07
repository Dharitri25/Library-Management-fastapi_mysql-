import React, { useState } from "react";
import axios from "axios";
import "./login.css";

function Login() {
  const api = "http://127.0.0.1:8000";
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("username", loginInfo.username);
    formData.append("password", loginInfo.password);
    try {
      await axios.post(`${api}/token`, formData).then(async (res) => {
        localStorage.setItem("token", res?.data?.access_token);
        //   NotificationManager.success("User signed in sussessfully");
      });
      // .then(async () => {
      //   const accessToken = localStorage.getItem("token");
      //   const headers = {
      //     Authorization: `Bearer ${accessToken}`,
      //   };

      //   //get current user details
      //   await axios.get(`${api}/users/me`, { headers }).then((res) => {
      //     res?.data &&
      //       localStorage.setItem("", res.data.is_admin);
      //   });

      //   let user_isAdmin = localStorage.getItem("user_isAdmin");
      //   user_isAdmin === "true"
      //     ? (window.location.href = "/index")
      //     : user_isAdmin === "false"
      //     ? (window.location.href = "/my-ecommerce")
      //     : (window.location.href = "/");
      // });
    } catch (err) {
      //   NotificationManager.error("Error in user log in!");
    }
  };

  return (
    <>
      {/* <div className="login_page">
        <h3>Hey Librarian, Please log in to proceed your job.</h3>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="username"
                id="username"
                value={loginInfo.username}
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, username: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={loginInfo.password}
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, password: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
              Login
            </button>
            <button>Cancel</button>
          </form>
        </div>
      </div> */}
      <div id="wrapper">
        <div class="main-content">
          <div class="header">
            {/* <h3>Hey Librarian, Please log in to proceed your job.</h3> */}
          </div>
          <div class="l-part">
            <input type="text" placeholder="Username" class="input-1" />
            <div class="overlap-text">
              <input type="password" placeholder="Password" class="input-2" />
              {/* <a href="#">Forgot?</a> */}
            </div>
            <input type="button" value="Log in" class="btn" />
          </div>
        </div>
        <div class="sub-content">
          <div class="s-part">
            Don't have an account?<a href="/">Sign up</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
