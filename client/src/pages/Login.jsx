import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import gogle from "../images/gogle.svg";
import face from "../images/face.svg";
import back from "../images/back.svg";
import gunsWall from "../images/gunsWall.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const API = import.meta.env.VITE_API;

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API}/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/");
      }
    } catch (error) {
      console.log("Error: " + error);

      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage(
            "Вказані дані для входу є некоректними. Перевірте їх і повторіть спробу."
          );
        } else if (error.response.status === 404) {
          setErrorMessage(
            "Обліковий запис з даними які ви надали не знайдено."
          );
        } else {
          setErrorMessage("Сталася помилка при вході. Спробуйте пізніше.");
        }
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[#1f1f1f] bg-cover bg-no-repeat px-4"
      style={{ backgroundImage: `url(${gunsWall})` }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-90 rounded-2xl p-8 shadow-2xl border border-gray-300">
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
        <p className="text-center text-lg text-gray-600 mb-6">Авторизація</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage("");
            }}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
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
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold cursor-pointer rounded-lg hover:bg-neutral-800 transition"
          >
            Увійти
          </button>
        </form>

        <div className="text-center mt-4">
          <Link
            to="/register"
            className="text-sm text-gray-600 hover:underline"
          >
            Немає аккаунту? Зареєструватись
          </Link>
        </div>

        <div className="my-6 text-center text-gray-500">Або увійти через</div>

        <div className="flex justify-between space-x-4">
          <button className="flex items-center justify-center cursor-pointer w-1/2 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            <img src={gogle} alt="Google" className="w-5 h-5 mr-2" />
            Google
          </button>
          <button className="flex items-center justify-center cursor-pointer w-1/2 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            <img src={face} alt="Facebook" className="w-5 h-5 mr-2" />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
