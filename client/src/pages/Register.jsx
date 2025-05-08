import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import back from "../images/back.svg";
import gunsWall from "../images/gunsWall.svg";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isPasswordsSame, setPasswordsSame] = useState(true);

  const API = import.meta.env.VITE_API;
  const navigate = useNavigate();

  useEffect(() => {
    setPasswordValid(password.length >= 8 && password.length <= 30);
  }, [password]);

  useEffect(() => {
    setPasswordsSame(password === confirmPassword);
  }, [confirmPassword, password]);

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!isPasswordValid || !isPasswordsSame) return;

    try {
      const response = await axios.post(`${API}/register`, {
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
      console.error("Error: " + error);

      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage(
            "Вказані дані для входу є некоректними. Перевірте їх і повторіть спробу."
          );
        } else if (error.response.status === 409) {
          setErrorMessage(
            "Обліковий запис з даними які ви надали вже зареєстровано."
          );
        } else {
          setErrorMessage("Сталася помилка при реєстрації. Спробуйте пізніше.");
        }
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#1f1f1f] bg-cover bg-no-repeat px-4"
      style={{ backgroundImage: `url(${gunsWall})` }}
    >
      <div className="w-full max-w-xl bg-white bg-opacity-90 rounded-2xl p-8 shadow-2xl border border-gray-300">
        <div
          className="flex items-center mb-6 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={back} alt="Назад" className="w-5 h-5 mr-2" />
          <span className="text-sm text-gray-700 hover:underline">
            На головну
          </span>
        </div>

        <h2 className="text-center text-3xl font-bold text-gray-900 mb-2">
          STEEL & GUNS
        </h2>
        <p className="text-center text-lg text-gray-600 mb-6">Реєстрація</p>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Ім’я"
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
                setErrorMessage("");
              }}
              required
              className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              placeholder="Прізвище"
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
                setErrorMessage("");
              }}
              required
              className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage("");
            }}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="text"
            placeholder="Телефон"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrorMessage("");
            }}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage("");
            }}
            required
            className={`w-full px-4 py-3 border ${
              isPasswordValid ? "border-gray-300" : "border-red-500"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
          />
          <p className="text-sm text-gray-600">
            {password && !isPasswordValid
              ? "Пароль має бути від 8 до 30 символів"
              : " "}
          </p>

          <input
            type="password"
            placeholder="Підтвердіть пароль"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrorMessage("");
            }}
            required
            className={`w-full px-4 py-3 border ${
              isPasswordsSame ? "border-gray-300" : "border-red-500"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-black`}
          />
          <p className="text-sm text-gray-600">
            {!isPasswordsSame
              ? "Паролі не збігаються"
              : "Повторіть пароль для підтвердження"}
          </p>

          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full py-3 cursor-pointer bg-black text-white font-semibold rounded-lg hover:bg-neutral-800 transition"
          >
            Зареєструватися
          </button>

          <div className="text-center mt-4">
            <Link to="/login" className="text-sm text-gray-600 hover:underline">
              Вже є акаунт? Увійти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
