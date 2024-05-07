import React, { useState } from "react";
import axios from "axios";

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
    <div className="login_page">
      <div>
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
      </div>
    </div>
  );
}

export default Login;
