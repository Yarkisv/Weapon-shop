import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
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
import barret from "../images/barret.png";
import A10A from "../images/A10A.png";
import abrams from "../images/abrams.png";

export default function MainPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === 2 ? 0 : prev + 1));
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F8F8F2]">
      <Header />

      <div className="relative w-full h-[92vh] overflow-hidden">
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: currentIndex === 0 ? 1 : 0 }}
        >
          <img
            src={barret}
            alt="Barrett M82"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-5 left-5 bg-black/60 text-white p-4 rounded-xl max-w-md shadow-xl">
            <p className="text-lg">
              Barrett M82 - великокаліберна снайперська гвинтівка американського
              виробництва.
            </p>
          </div>
        </div>
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: currentIndex === 1 ? 1 : 0 }}
        >
          <img
            src={A10A}
            alt="A-10 Thunderbolt II"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-5 left-5 bg-black/60 text-white p-4 rounded-xl max-w-md shadow-xl">
            <p className="text-lg">
              A-10 Thunderbolt II - штурмовик ВПС США, призначений для підтримки
              з повітря.
            </p>
          </div>
        </div>
        <div
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: currentIndex === 2 ? 1 : 0 }}
        >
          <img
            src={abrams}
            alt="M1 Abrams"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-5 left-5 bg-black/60 text-white p-4 rounded-xl max-w-md shadow-xl">
            <p className="text-lg">
              M1 Abrams - основний бойовий танк армії США, що вирізняється
              високою захищеністю.
            </p>
          </div>
        </div>

        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-50">
          <button
            onClick={prevSlide}
            className="text-white text-5xl p-4 bg-black/40 cursor-pointer hover:bg-black/60 transition rounded-r-full"
          >
            <FiChevronLeft />
          </button>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-50">
          <button
            onClick={nextSlide}
            className="text-white text-5xl p-4 bg-black/40 cursor-pointer hover:bg-black/60 transition rounded-l-full"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      <div className="w-full bg-[#121212] py-12 overflow-hidden">
        <h2 className="text-center text-white text-2xl font-semibold mb-8">
          Ми співпрацюємо з
        </h2>

        <div className="relative w-full overflow-hidden">
          <div className="flex animate-scroll-left whitespace-nowrap">
            <div className="flex shrink-0 gap-8 px-4">
              <div className="w-[180px] h-[80px] bg-gray-300 rounded-lg flex items-center justify-center text-base text-gray-600">
                Логотип 1
              </div>
              <div className="w-[180px] h-[80px] bg-gray-300 rounded-lg flex items-center justify-center text-base text-gray-600">
                Логотип 2
              </div>
              <div className="w-[180px] h-[80px] bg-gray-300 rounded-lg flex items-center justify-center text-base text-gray-600">
                Логотип 3
              </div>
              <div className="w-[180px] h-[80px] bg-gray-300 rounded-lg flex items-center justify-center text-base text-gray-600">
                Логотип 4
              </div>
              <div className="w-[180px] h-[80px] bg-gray-300 rounded-lg flex items-center justify-center text-base text-gray-600">
                Логотип 5
              </div>
              <div className="w-[180px] h-[80px] bg-gray-300 rounded-lg flex items-center justify-center text-base text-gray-600">
                Логотип 6
              </div>
              <div className="w-[180px] h-[80px] bg-gray-300 rounded-lg flex items-center justify-center text-base text-gray-600">
                Логотип 7
              </div>
            </div>

            <div className="flex shrink-0 gap-8 px-4">
              <div className="w-[180px] h-[80px] bg-gray-300 rounded-lg flex items-center justify-center text-base text-gray-600">
                Логотип 1
              </div>
              <div className="w-[180px] h-[80px] bg-gray-300 rounded-lg flex items-center justify-center text-base text-gray-600">
                Логотип 2
              </div>
              <div className="w-[180px] h-[80px] bg-gray-300 rounded-lg flex items-center justify-center text-base text-gray-600">
                Логотип 3
              </div>
              <div className="w-[180px] h-[80px] bg-gray-300 rounded-lg flex items-center justify-center text-base text-gray-600">
                Логотип 4
              </div>
              <div className="w-[180px] h-[80px] bg-gray-300 rounded-lg flex items-center justify-center text-base text-gray-600">
                Логотип 5
              </div>
              <div className="w-[180px] h-[80px] bg-gray-300 rounded-lg flex items-center justify-center text-base text-gray-600">
                Логотип 6
              </div>
              <div className="w-[180px] h-[80px] bg-gray-300 rounded-lg flex items-center justify-center text-base text-gray-600">
                Логотип 7
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col relative overflow-x-hidden mx-auto gap-[20px] max-w-[1440px] py-8"
        style={{
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex justify-center gap-4 flex-wrap px-8">
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/catalog/guns")}
          >
            <img
              src={backgroundCategory}
              className="w-full h-full object-cover"
              alt="Фон категории оружие"
            />
            <div className="absolute inset-0 m-auto flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-[1.08]">
              <img
                src={gunsCategory}
                alt="guns"
                className="w-[90%] h-[90%] object-contain pointer-events-none"
              />
            </div>
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/catalog/bullets")}
          >
            <img
              src={backgroundCategory}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 m-auto flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-[1.08]">
              <img
                src={bulletsCategory}
                className="w-[90%] h-[90%] object-contain pointer-events-none"
              />
            </div>
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/catalog/knifes")}
          >
            <img
              src={backgroundCategory}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 m-auto flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-[1.08]">
              <img
                src={knifesCategory}
                className="w-[90%] h-[90%] object-contain pointer-events-none"
              />
            </div>
          </div>

          <div
            className="relative cursor-pointer"
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

        <div className="flex justify-center items-center gap-[20px] px-8 flex-wrap">
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/catalog/military-aircrafts")}
          >
            <img
              src={bgPlanesTanks}
              className="w-full h-full object-cover"
              alt="Фон категории самолёты"
            />
            <div className="absolute inset-0 m-auto flex justify-center items-center transition-transform duration-300 ease-in-out hover:scale-[1.08]">
              <img
                src={planesCategory}
                alt="planes"
                className="w-[90%] h-[90%] object-contain pointer-events-none"
              />
            </div>
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/catalog/tanks")}
          >
            <img
              src={bgPlanesTanks}
              className="w-full h-full object-cover"
              alt="Фон категории танки"
            />
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
