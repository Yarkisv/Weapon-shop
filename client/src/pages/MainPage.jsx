import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import mainPageBg from "../images/mainPageBg.svg";
import knifesCategory from "../images/knifesCategory.svg";
import gunsCategory from "../images/gunsCategory.svg";
import bulletsCategory from "../images/bulletsCategory.svg";
import clothesCategory from "../images/clothesCategory.svg";
import planesCategory from "../images/planesCategory.svg";
import tanksCategory from "../images/tanksCategory.svg";
import bulletSound from "../sounds/bulletSound.mp3";
import gunSound from "../sounds/gunSound.mp3";
import clothSound from "../sounds/clothSound.mp3";
import knifeSound from "../sounds/knifeSound.mp3";
import planeSound from "../sounds/planeSound.mp3";
import tankSound from "../sounds/tankSound.mp3";
import planeMain from "../images/planeMain.svg";

export default function MainPage() {
  const navigate = useNavigate();

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
    <div>
      <Header />
      <div
        className="flex flex-col relative overflow-x-hidden mx-auto gap-5 max-w-[1440px]"
        style={{
          backgroundImage: `url(${mainPageBg})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "778px",
          width: "1440px",
        }}
      >
        <div className="flex">
          <div className="flex items-center w-full ml-[88px] gap-5 mt-[35px]">
            <img
              onClick={() => navigate("/catalog/guns")}
              // onMouseEnter={playSound(gunAudio)}
              // onMouseLeave={stopSound(gunAudio)}
              className="transition-transform duration-300 ease-in-out hover:scale-[1.08] cursor-pointer"
              src={gunsCategory}
            />
            <img
              onClick={() => navigate("/catalog/bullets")}
              // onMouseEnter={playSound(bulletAudio)}
              // onMouseLeave={stopSound(bulletAudio)}
              className="transition-transform duration-300 ease-in-out hover:scale-[1.08] cursor-pointer"
              src={bulletsCategory}
            />
          </div>
          <div className="flex items-center justify-end w-full mr-[88px] gap-5 mt-[35px]">
            <img
              onClick={() => navigate("/catalog/khifes")}
              // onMouseEnter={playSound(knifeAudio)}
              // onMouseLeave={stopSound(knifeAudio)}
              className="transition-transform duration-300 ease-in-out hover:scale-[1.08] cursor-pointer mr-[-4px]"
              src={knifesCategory}
            />
            <img
              onClick={() => navigate("/catalog/ammunition")}
              // onMouseEnter={playSound(clothAudio)}
              // onMouseLeave={stopSound(clothAudio)}
              className="transition-transform duration-300 ease-in-out hover:scale-[1.08] cursor-pointer"
              src={clothesCategory}
            />
          </div>
        </div>

        <div className="flex justify-center items-center gap-[44px] w-full">
          <img
            src={planesCategory}
            onClick={() => navigate("/catalog/military-aircrafts")}
            // onMouseEnter={playSound(planeAudio)}
            // onMouseLeave={stopSound(planeAudio)}
            className="transition-transform duration-300 ease-in-out hover:scale-[1.08] cursor-pointer"
          />
          <img
            src={tanksCategory}
            onClick={() => navigate("/catalog/tanks")}
            // onMouseEnter={playSound(tankAudio)}
            // onMouseLeave={stopSound(tankAudio)}
            className="transition-transform duration-300 ease-in-out hover:scale-[1.08] cursor-pointer"
          />
        </div>

        <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-[20%] flex flex-col gap-[30px] items-center">
          <img
            src={planeMain}
            className="transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
          />

          <h1 className="not-italic text-white text-[40px] whitespace-nowrap m-0">
            NEW "F-14B TOMCAT"
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}
