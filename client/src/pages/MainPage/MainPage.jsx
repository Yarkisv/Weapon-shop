import React from "react";
import Header from "../../components/Header/Header";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="categories">
        <div className="guns-knifes">
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
        </div>
        
      </div>
    </div>
  );
}
