import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import back from "../images/back.svg";
import gunsWall from "../images/gunsWall.svg";

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
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center bg-[#5f6a54] justify-center"
      style={{ backgroundImage: `url(${gunsWall})` }}
    >
      <p className="text-white font-bold text-5xl font-[Konkhmer Sleokchher] mt-10">
        STEEL & GUNS
      </p>
      <p className="text-white text-3xl font-semibold font-[Konkhmer Sleokchher] mt-5">
        REGISTER
      </p>

      <div className="w-[550px] mt-6 bg-white rounded shadow-lg border border-black p-6">
        <div
          className="flex items-center mb-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={back} alt="Назад" className="w-5 h-5 mr-2" />
          <p className="text-lg font-sans">На головну</p>
        </div>
        <form onSubmit={handleRegister} className="text-center">
          <div className="flex justify-between mb-6 px-2">
            <input
              type="text"
              placeholder="Введіть ім'я"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              className="w-[48%] h-12 border border-black rounded px-2 bg-gray-100 text-lg"
            />
            <input
              type="text"
              placeholder="Введіть прізвище"
              value={lastname}
              onChange={(e) => setLatsname(e.target.value)}
              required
              className="w-[48%] h-12 border border-black rounded px-2 bg-gray-100 text-lg"
            />
          </div>
          <input
            type="email"
            placeholder="Введіть пошту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full h-12 mb-6 border border-black rounded px-2 bg-gray-100 text-lg"
          />
          <input
            type="text"
            placeholder="Введіть номер телефону"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full h-12 mb-6 border border-black rounded px-2 bg-gray-100 text-lg"
          />
          <input
            type="password"
            placeholder="Введіть пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full h-12 mb-2 border border-black rounded px-2 bg-gray-100 text-lg"
          />
          <p className="text-left text-sm px-2 text-gray-700">
            {password && !isPasswordValid
              ? "Пароль занадто короткий"
              : "Пароль повинен містити більше 8 і менше 30 символів"}
          </p>
          <input
            type="password"
            placeholder="Підтвердіть пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full h-12 mt-4 mb-2 border border-black rounded px-2 bg-gray-100 text-lg"
          />
          <p className="text-left text-sm px-2 text-gray-700">
            {!isPasswordsSame
              ? "Введені паролі не збігаються"
              : "Будь ласка, повторіть свій пароль, щоб уникнути помилок"}
          </p>
          <div className="flex flex-col items-center mt-6">
            <button
              type="submit"
              className="w-full h-14 bg-black text-white text-lg rounded hover:bg-neutral-900 cursor-pointer active:bg-neutral-950"
            >
              РЕЄСТРАЦІЯ
            </button>
            <Link
              to="/login"
              className="text-xl mt-4 text-gray-600 hover:text-gray-800"
            >
              Маєте аккаунт?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
