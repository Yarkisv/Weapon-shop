import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import back from "../../images/back.svg";
import { Link } from "react-router-dom";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLatsname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/register", {
        firstname,
        lastname,
        email,
        phone,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-page-wrapper">
      {/* <div className="go-back-wrapper" >
        <img className="go-back-img" src={back} alt="" />
        <p className="go-back">Back</p>
      </div> */}
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
            <div className="phone-code">
              <input
                className="input-field-code"
                type="text"
                placeholder="Code"
              />
              {/* <span className="phone-code-text">confirm your phone <br />
              number to register</span> */}
            </div>

            <input
              className="input-field-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="input-field-password"
              type="password"
              placeholder="Submit password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
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
