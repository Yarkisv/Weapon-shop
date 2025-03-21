import React from "react";
import "./ProductCard.css";
import gun from "../../images/gun.png"

export default function ProductCard() {
    return(
        <div className="product-card-wrapper">
        <div className="product-card-img">
            <img src={gun} alt="" />
        </div>
        <div className="product-card-text-wrapper">
            <p className="product-name">AWP STEEL&GUNS Хортица 450/230
                (кал. 4,5 мм, коричневый)</p>
            <p className="product-characteristics">caliber-4,4mm</p>
            <p className="product-characteristics">weight-6kg</p>
            <p className="product-characteristics">code:11123441</p>
            <p className="product-price">45000$</p>
        </div>
        <button className="product-card-button">BUY</button>
    </div>
    )
}