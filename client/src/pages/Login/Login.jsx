import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";

import back from "../../images/back.svg";
import gogle from "../../images/gogle.svg";
import face from "../../images/face.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-page-wrapper">
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
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-end">
            <button className="login-button" type="submit">
              Увійти
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
  );
}
