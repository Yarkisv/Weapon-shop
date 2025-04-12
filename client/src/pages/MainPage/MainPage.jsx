import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";
import mainPageBg from "../../images/mainPageBg.svg";
import knifesCategory from "../../images/knifesCategory.svg";
import gunsCategory from "../../images/gunsCategory.svg";
import bulletsCategory from "../../images/bulletsCategory.svg";
import clothesCategory from "../../images/clothesCategory.svg";
import planesCategory from "../../images/planesCategory.svg";
import tanksCategory from "../../images/tanksCategory.svg";
import planeMain from "../../images/planeMain.svg";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div
        className="categories"
        style={{
          backgroundImage: `url(${mainPageBg})`,
          marginTop: "-1px",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "778px",
          width: "1440px",
        }}
      >
        <div className="guns-knifes">
          <img
            onClick={() => navigate("/catalog/guns")}
            className="guns-img"
            src={gunsCategory}
          />
          <img
            onClick={() => navigate("/catalog/khifes")}
            className="khifes-img"
            src={knifesCategory}
          />
        </div>
        <div className="bullets-clothes">
          <img
            onClick={() => navigate("/catalog/bullets")}
            src={bulletsCategory}
          />
          <img
            onClick={() => navigate("/catalog/ammunition")}
            src={clothesCategory}
          />
        </div>
        <div className="planes-tanks">
          <img
            src={planesCategory}
            onClick={() => navigate("/catalog/military-aircrafts")}
          />
          <img src={tanksCategory} onClick={() => navigate("/catalog/tanks")} />
        </div>
        <div className="plane-main">
          <img src={planeMain} />
          <h1>NEW "F-14B TOMCAT"</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}
