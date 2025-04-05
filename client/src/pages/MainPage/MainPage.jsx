import React from "react";
import Header from "../../components/Header/Header";
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
            alt=""
          />
          <img
            onClick={() => navigate("/catalog/khifes")}
            className="khifes-img"
            src={knifesCategory}
            alt=""
          />
        </div>
        <div className="bullets-clothes">
          <img
            onClick={() => navigate("/catalog/bullets")}
            src={bulletsCategory}
            alt=""
          />
          <img
            onClick={() => navigate("/catalog/ammunition")}
            src={clothesCategory}
            alt=""
          />
        </div>
        <div className="planes-tanks">
          <img src={planesCategory} alt="" />
          <img src={tanksCategory} alt="" />
        </div>
        <div className="plane-main">
          <img src={planeMain} alt="" />
          <h1>NEW “F-14B TOMCAT</h1>
        </div>
        {/* <div className="guns-knifes">
          <div className="guns" onClick={() => navigate("/catalog/guns")}>
            <img src="https://telegraf.com.ua/static/storage/originals/4/5b/6e57e8e3f2526517125c13191ea3a5b4.jpg" />
            <label>Guns</label>
          </div>
          <div className="bullets" onClick={() => navigate("/catalog/bullets")}>
            <img src="https://images8.alphacoders.com/499/499182.jpg" />
            <label>Bullets</label>
          </div>
        </div>
        <div className="bullets-clothes">
          
          <div className="khifes" onClick={() => navigate("/catalog/khifes")}>
            <img src="https://e1.pxfuel.com/desktop-wallpaper/208/294/desktop-wallpaper-dagger-ghost-knife.jpg" />
            <label>Knifes</label>
          </div>
          <div
            className="clothes"
            onClick={() => navigate("/catalog/ammunition")}
          >
            <img src="https://us.tencatefabrics.com/hs-fs/hubfs/armyBackground.jpg?width=1920&name=armyBackground.jpg" />
            <label>Clothes</label>
          </div>
        </div> */}
      </div>
    </div>
  );
}
