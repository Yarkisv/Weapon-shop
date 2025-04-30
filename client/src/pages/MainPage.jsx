import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import knifesCategory from "../images/knifesCategory.svg";
import gunsCategory from "../images/gunsCategory.svg";
import bulletsCategory from "../images/bulletsCategory.svg";
import clothesCategory from "../images/clothesCategory.svg";
import planesCategory from "../images/planesCategory.svg";
import tanksCategory from "../images/tanksCategory.svg";
import bgPlanesTanks from "../images/bgPlanesTanks.svg";
import backgroundCategory from "../images/backgroundCategory.svg";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#50593F]">
      <Header />
      <div
        className="flex flex-col relative overflow-x-hidden mx-auto gap-[20px] max-w-[1440px] py-8"
        style={{
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* Верхний блок с категориями */}
        <div className="flex justify-center gap-4 flex-wrap px-8">
          {/* Категория: оружие */}
          <div
            className="relative cursor-pointer "
            onClick={() => navigate("/catalog/guns")}
          >
            <img
              src={backgroundCategory}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 m-auto flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-[1.08]">
              <img
                src={gunsCategory}
                alt="guns"
                className="w-[90%] h-[90%] object-contain pointer-events-none"
              />
            </div>
          </div>

          {/* Категория: пули */}
          <div
            className="relative cursor-pointer "
            onClick={() => navigate("/catalog/bullets")}
          >
            <img
              src={backgroundCategory}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 m-auto flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-[1.08]">
              <img
                src={bulletsCategory}
                alt="bullets"
                className="w-[90%] h-[90%] object-contain pointer-events-none"
              />
            </div>
          </div>

          {/* Категория: ножи */}
          <div
            className="relative cursor-pointer "
            onClick={() => navigate("/catalog/khifes")}
          >
            <img
              src={backgroundCategory}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 m-auto flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-[1.08]">
              <img
                src={knifesCategory}
                alt="knifes"
                className="w-[90%] h-[90%] object-contain pointer-events-none"
              />
            </div>
          </div>

          {/* Категория: экипировка */}
          <div
            className="relative cursor-pointer "
            onClick={() => navigate("/catalog/ammunition")}
          >
            <img
              src={backgroundCategory}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 m-auto flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-[1.08]">
              <img
                src={clothesCategory}
                alt="clothes"
                className="w-[90%] h-[90%] object-contain pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Блок с техникой */}
        <div className="flex justify-center items-center gap-[20px] px-8 flex-wrap">
          {/* Категория: самолёты */}
          <div
            className="relative cursor-pointer "
            onClick={() => navigate("/catalog/military-aircrafts")}
          >
            <img src={bgPlanesTanks} className="w-full h-full object-cover" />
            <div className="absolute inset-0 m-auto flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-[1.08]">
              <img
                src={planesCategory}
                alt="planes"
                className="w-[90%] h-[90%] object-contain pointer-events-none"
              />
            </div>
          </div>

          {/* Категория: танки */}
          <div
            className="relative cursor-pointer "
            onClick={() => navigate("/catalog/tanks")}
          >
            <img src={bgPlanesTanks} className="w-full h-full object-cover" />
            <div className="absolute inset-0 m-auto flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-[1.08]">
              <img
                src={tanksCategory}
                alt="tanks"
                className="w-[90%] h-[90%] object-contain pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
