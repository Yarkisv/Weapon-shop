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
import bulletSound from "../sounds/bulletSound.mp3";
import gunSound from "../sounds/gunSound.mp3";
import clothSound from "../sounds/clothSound.mp3";
import knifeSound from "../sounds/knifeSound.mp3";
import planeSound from "../sounds/planeSound.mp3";
import tankSound from "../sounds/tankSound.mp3";

export default function MainPage() {
  const navigate = useNavigate();

  // Звуки
  const bulletAudio = new Audio(bulletSound);
  const gunAudio = new Audio(gunSound);
  const clothAudio = new Audio(clothSound);
  const planeAudio = new Audio(planeSound);
  const tankAudio = new Audio(tankSound);
  const knifeAudio = new Audio(knifeSound);

  [
    bulletAudio,
    knifeAudio,
    gunAudio,
    clothAudio,
    planeAudio,
    tankAudio,
  ].forEach((audio) => {
    audio.volume = 0.2;
  });

  const playSound = (sound) => () => {
    sound.currentTime = 0;
    sound.play();
  };

  const stopSound = (sound) => () => {
    sound.pause();
    sound.currentTime = 0;
  };

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
            // onMouseEnter={playSound(gunAudio)}
            // onMouseLeave={stopSound(gunAudio)}
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
            // onMouseEnter={playSound(bulletAudio)}
            // onMouseLeave={stopSound(bulletAudio)}
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
            // onMouseEnter={playSound(knifeAudio)}
            // onMouseLeave={stopSound(knifeAudio)}
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
            // onMouseEnter={playSound(clothAudio)}
            // onMouseLeave={stopSound(clothAudio)}
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
            // onMouseEnter={playSound(planeAudio)}
            // onMouseLeave={stopSound(planeAudio)}
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
            // onMouseEnter={playSound(tankAudio)}
            // onMouseLeave={stopSound(tankAudio)}
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
