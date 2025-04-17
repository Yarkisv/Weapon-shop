import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col  bg-[#5f6a54] items-center justify-center"
      style={{ backgroundImage: `url(${gunsWall})` }}
    >
      <p className="text-white font-bold text-5xl font-[Konkhmer Sleokchher] mt-10">
        STEEL & GUNS
      </p>
      <p className="text-white text-3xl font-semibold font-[Konkhmer Sleokchher] mt-5">
        LOGIN
      </p>

      <div className="w-[550px] mt-6 bg-white rounded shadow-lg border border-black p-6">
        <div
          className="flex items-center mb-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={back} alt="Назад" className="w-5 h-5 mr-2" />
          <p className="text-lg font-sans">На головну</p>
        </div>
        <form onSubmit={handleLogin} className="text-center">
          <div className="flex flex-col gap-6">
            <input
              type="email"
              placeholder="Введіть пошту"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full h-12 border border-black rounded px-2 bg-gray-100 text-lg"
            />
            <input
              type="password"
              placeholder="Введіть пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-12 border border-black rounded px-2 bg-gray-100 text-lg"
            />
          </div>

          <div className="flex flex-col items-center mt-6">
            <button
              type="submit"
              className="w-full h-14 bg-black text-white text-lg rounded cursor-pointer hover:bg-neutral-900 active:bg-neutral-950"
            >
              ЛОГІН
            </button>
            <Link
              to="/register"
              className="text-xl mt-4 text-gray-600 hover:text-gray-800"
            >
              немає аккаунту?
            </Link>
            <span className="text-xl text-gray-700 mt-5">або через</span>
            <div className="flex justify-between mt-5 w-full px-2">
              <div className="flex items-center border border-black rounded w-[48%] h-12 pl-4 cursor-pointer">
                <img src={gogle} alt="Google" className="w-6 h-6" />
                <span className="ml-4">Google</span>
              </div>
              <div className="flex items-center border border-black rounded w-[48%] h-12 pl-4 cursor-pointer">
                <img src={face} alt="Facebook" className="w-6 h-6" />
                <span className="ml-4">Facebook</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
