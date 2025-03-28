import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import gogle from "../../images/gogle.svg";
import face from "../../images/face.svg";
import back from "../../images/back.svg";
import gunsWall from "../../images/gunsWall.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        const IsAuth = response.status.IsAuth;

        localStorage.setItem("token", token);
        localStorage.setItem("isAuth", IsAuth);

        console.log("Login successful, token: " + token);

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper" style={{ backgroundImage: `url(${gunsWall})` }}>
      <p className="reg-logo"> STEEL & GUNS</p>
      <p className="reg-text-main">LOGIN</p>
      <div className="login-page-wrapper">
        <div className="go-back-wrapper" onClick={() => navigate("/")}>
          <img className="go-back-img" src={back} alt="" />
          <p className="go-back">Back</p>
        </div>
        <div className="login-page">
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                className="input-field"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="input-field"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-end">
              <button className="login-button" type="submit">
                LOGIN
              </button>
              <Link className="dont-have-account" to={"/register"}>
                don`t have an account?
              </Link>
              <span className="another-login">or log in with</span>
              <div className="gogle-or-face">
                <div className="gogle">
                  <img className="gogle-face-img" src={gogle} alt="" />
                  <span>Google</span>
                </div>
                <div className="face">
                  <img className="gogle-face-img" src={face} alt="" />
                  <span className="face-text">Facebook</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
