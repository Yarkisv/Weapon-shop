import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Register.css";
import { Link } from "react-router-dom";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLatsname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isPasswordsSame, setPasswordsSame] = useState(true);

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

      if (response.status === 200) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-page-wrapper">
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
              <p>Password is too short</p>
            ) : (
              <p>Password must be more than 8 and less than 30 symbols</p>
            )}

            <input
              className="input-field-password"
              type="password"
              placeholder="Submit password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!isPasswordsSame ? (
              <p>The passwords entered do not match</p>
            ) : (
              <p>Please repeat your password to avoid any typos</p>
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
  );
}
