import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import back from "../../images/back.svg";
import gunsWall from "../../images/gunsWall.svg";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLatsname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isPasswordsSame, setPasswordsSame] = useState(true);

  const navigate = useNavigate();

  const validatePassword = () => {
    if (password === "") {
      setPasswordValid(false);
    }
    if (password.length < 8 || password.length > 30) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  };

  const comparePasswords = () => {
    if (password === "") {
      setPasswordValid(true);
    }

    if (password !== confirmPassword) {
      setPasswordsSame(false);
    } else {
      setPasswordsSame(true);
    }
  };

  useEffect(() => {
    validatePassword();
  }, [password]);

  useEffect(() => {
    comparePasswords();
  }, [confirmPassword]);

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!isPasswordValid || !isPasswordsSame) {
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/register", {
        firstname,
        lastname,
        email,
        phone,
        password,
      });

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper" style={{ backgroundImage: `url(${gunsWall})` }}>
      <p className="reg-logo"> STEEL & GUNS</p>
      <p className="reg-text-main">REGISTER</p>
      <div className="register-page-wrapper">
        <div className="go-back-wrapper" onClick={() => navigate("/")}>
          <img className="go-back-img" src={back} alt="" />
          <p className="go-back">Back</p>
        </div>
        <div className="register-page">
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <div className="name-surname-wrapper">
                <input
                  className="input-field-name-surname"
                  type="text"
                  placeholder="Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
                <input
                  className="input-field-name-surname"
                  type="text"
                  placeholder="Surname"
                  value={lastname}
                  onChange={(e) => setLatsname(e.target.value)}
                  required
                />
              </div>

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
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <input
                className="input-field-password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {password && !isPasswordValid ? (
                <p className="password-recomendation">Password is too short</p>
              ) : (
                <p className="password-recomendation">
                  Password must be more than 8 and less than 30 symbols
                </p>
              )}

              <input
                className="input-field-password"
                type="password"
                placeholder="Submit password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!isPasswordsSame ? (
                <p className="password-recomendation">
                  The passwords entered do not match
                </p>
              ) : (
                <p className="password-recomendation">
                  Please repeat your password to avoid any typos
                </p>
              )}
            </div>
            <div className="form-end">
              <button className="register-button" type="submit">
                REGISTER
              </button>
              <Link className="have-account" to={"/login"}>
                have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
