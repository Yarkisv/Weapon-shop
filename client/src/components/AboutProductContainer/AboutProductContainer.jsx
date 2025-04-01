import React from "react";
import "./AboutProductContainer.css";
import shipment from "../../images/shipment.svg";
import novaPost from "../../images/novaPost.svg";
import buy from "../../images/buy.svg";
import likeOrder from "../../images/likeOrder.svg";
import { useCart } from "../../contexts/cartContext";
export default function AboutProductContainer({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-info-container">
      <div className="img-about-wrapper">
        <img
          className="about-img"
          src={`data:image/jpg;base64,${product.image}`}
        />
        <div className="aside-img">
          <img
            className="about-img-aside"
            src={`data:image/jpg;base64,${product.image}`}
          />
          <img
            className="about-img-aside"
            src={`data:image/jpg;base64,${product.image}`}
          />
          <img
            className="about-img-aside"
            src={`data:image/jpg;base64,${product.image}`}
          />
          <img
            className="about-img-aside"
            src={`data:image/jpg;base64,${product.image}`}
          />
        </div>
        <div className="aside-information">
          <div className="name-article">
            <p className="product-name-about">{product.name}</p>
            <p className="product-article">Артикль:{product.manufacturer_id}</p>
          </div>
          <div className="product-buy">
            <div className="stock-price">
              <p className="In-stock">✔ В наявності</p>
              <p className="product-price">{product.price}$</p>
            </div>
            <div className="shipment-wrapper">
              <p className="ship-main-text">Доставка</p>
              <div className="shipment">
                <p className="ship-text">
                  <img src={shipment} />
                  Самовиіз
                </p>
                <p className="ship-text">
                  <img src={novaPost} />
                  Нова пошта
                </p>
              </div>
            </div>
            <div className="product-order">
              <button className="buy-button" onClick={() => addToCart(product)}>
                <img src={buy} />В кошик
              </button>
              <div className="One-liked">
                <button className="one-Click">В 1 клік</button>
                <button className="like-button">
                  <img src={likeOrder}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
