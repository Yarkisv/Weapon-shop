import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AboutProductContainer.css";
import { useModal } from "../../contexts/modalContext";
import shipment from "../../images/shipment.svg";
import novaPost from "../../images/novaPost.svg";
import buy from "../../images/buy.svg";
import likeOrder from "../../images/likeOrder.svg";
export default function AboutProductContainer({ product }) {
  const navigate = useNavigate();

  const { setBasketOpen } = useModal();

  const [orders, setOrders] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const addToLocalStorage = (product) => {
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    const updatedProducts = [...existingProducts, product];

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    console.log(updatedProducts);
  };

  const addToCart = (product) => {
    addToLocalStorage(product);
    setBasketOpen(true);
    setOrders((prevOrders) => [...prevOrders, product]);
  };

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
            <p className="product-name">{product.name}</p>
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
                {/* <button className="one-Click">В 1 клік</button> */}
                <button className="liked-button">
                  <img src={likeOrder} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
