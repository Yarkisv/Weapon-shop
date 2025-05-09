import { useState } from "react";
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

import barret from "../images/barret.png";
import A10A from "../images/A10A.png";
import abrams from "../images/abrams.png";
import anschutz from "../images/logoBrands/anschutz.png";
import benelli from "../images/logoBrands/benelli.png";
import Beretta from "../images/logoBrands/Beretta.png";
import bersa from "../images/logoBrands/bersa.png";
import colt from "../images/logoBrands/colt.png";
import keltec from "../images/logoBrands/keltec.png";
import SAUER from "../images/logoBrands/SAUER.png";
import bt from "../images/logoBrands/bt.png";
import thompson from "../images/logoBrands/thompson.png";
import SA from "../images/logoBrands/SA.png";
import norinco from "../images/logoBrands/norinco.png";

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

      <div className="relative w-full overflow-hidden bg-[#121212] py-12">
        <h2 className="text-center text-white text-2xl font-semibold mb-8">
          Ми співпрацюємо з
        </h2>

        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-scroll whitespace-nowrap gap-8 px-4">
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={anschutz} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={benelli} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={Beretta} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={bersa} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={colt} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={keltec} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={SAUER} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={bt} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={SA} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={thompson} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={norinco} className="object-contain w-full h-full" />
            </div>

            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={anschutz} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={benelli} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={Beretta} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={bersa} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={colt} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={keltec} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={SAUER} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={bt} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={SA} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={thompson} className="object-contain w-full h-full" />
            </div>
            <div className="w-[180px] h-[80px] bg-white rounded-lg flex items-center justify-center">
              <img src={norinco} className="object-contain w-full h-full" />
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-3xl font-bold mt-[10px] text-black ">
        Категорії
      </p>

      <div className="max-w-[1440px] mx-auto pt-[10px] px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          onClick={() => navigate("/catalog/guns")}
          className="cursor-pointer bg-[#1a1a1a] border rounded  border-[#333] hover:border-[#555] transition-all duration-200 flex flex-col items-center px-4 py-6"
        >
          <img
            src={gunsCategory}
            alt="Вогнепальна зброя"
            className="w-full h-32 object-contain mb-4 rotate-90"
          />
          <h3 className="text-center text-white text-base font-medium uppercase tracking-wide">
            Вогнепальна зброя
          </h3>
        </div>

        <div
          onClick={() => navigate("/catalog/military-aircrafts")}
          className="cursor-pointer bg-[#1a1a1a] border rounded  border-[#333] hover:border-[#555] transition-all duration-200 flex flex-col items-center px-4 py-6"
        >
          <img
            src={planesCategory}
            alt="Військова авіація"
            className="w-full h-32 object-contain mb-4"
          />
          <h3 className="text-center text-white text-base font-medium uppercase tracking-wide">
            Військова авіація
          </h3>
        </div>

        <div
          onClick={() => navigate("/catalog/tanks")}
          className="cursor-pointer bg-[#1a1a1a] border rounded  border-[#333] hover:border-[#555] transition-all duration-200 flex flex-col items-center px-4 py-6"
        >
          <img
            src={tanksCategory}
            alt="Бойові танки"
            className="w-full h-32 object-contain mb-4"
          />
          <h3 className="text-center text-white text-base font-medium uppercase tracking-wide">
            Бойові танки
          </h3>
        </div>

        <div
          onClick={() => navigate("/catalog/bullets")}
          className="cursor-pointer bg-[#1a1a1a] border rounded  border-[#333] hover:border-[#555] transition-all duration-200 flex flex-col items-center px-4 py-6"
        >
          <img
            src={bulletsCategory}
            alt="Боєприпаси"
            className="w-full h-32 object-contain mb-4 rotate-90"
          />
          <h3 className="text-center text-white text-base font-medium uppercase tracking-wide">
            Боєприпаси
          </h3>
        </div>

        <div
          onClick={() => navigate("/catalog/knifes")}
          className="cursor-pointer bg-[#1a1a1a] border rounded  border-[#333] hover:border-[#555] transition-all duration-200 flex flex-col items-center px-4 py-6"
        >
          <img
            src={knifesCategory}
            alt="Холодна зброя"
            className="w-full h-32 object-contain mb-4 rotate-90"
          />
          <h3 className="text-center text-white text-base font-medium uppercase tracking-wide">
            Холодна зброя
          </h3>
        </div>

        <div
          onClick={() => navigate("/catalog/ammunition")}
          className="cursor-pointer bg-[#1a1a1a] border rounded  border-[#333] hover:border-[#555] transition-all duration-200 flex flex-col items-center px-4 py-6"
        >
          <img
            src={clothesCategory}
            alt="Екіпірування"
            className="w-full h-32 object-contain mb-4"
          />
          <h3 className="text-center text-white text-base font-medium uppercase tracking-wide">
            Екіпірування
          </h3>
        </div>
      </div>

      <Footer />
    </div>
  );
}
