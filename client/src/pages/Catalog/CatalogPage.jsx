  import React, { useEffect, useState } from "react";
  import Header from "../../components/Header/Header";
  import "./CatalogPage.css";
  import ProductCard from "../../components/ProductCard/ProductCard";

  const weapons = [
    {
      id: 1,
      name: "AWP STEEL&GUNS Хортица 450/230",
      caliber: "4.5mm",
      weight: "6kg",
      code: "11123441",
      price: 45000,
      image: "/images/awp_hortitsa.jpg",
    },
    {
      id: 2,
      name: "M4A1 Tactical Force",
      caliber: "5.56mm",
      weight: "3.1kg",
      code: "22334455",
      price: 32000,
      image: "/images/m4a1_tactical.jpg",
    },
    {
      id: 3,
      name: "Desert Eagle Gold Edition",
      caliber: "50 AE",
      weight: "2kg",
      code: "33445566",
      price: 15000,
      image: "/images/desert_eagle.jpg",
    },
    {
      id: 4,
      name: "AK-47 Black Edition",
      caliber: "7.62mm",
      weight: "4.3kg",
      code: "55667788",
      price: 28000,
      image: "/images/ak47_black.jpg",
    },
    {
      id: 5,
      name: "Glock 19 Gen5",
      caliber: "9mm",
      weight: "0.7kg",
      code: "66778899",
      price: 800,
      image: "/images/glock19.jpg",
    },
  ];

  export default function CatalogPage() {
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
      setOrders((prevOrders) => [...prevOrders, product]);
    };

    return (
      <div>
        <Header />
        <div className="products-container">
          {weapons.map((weapon) => (
            <ProductCard key={weapon.id} weapon={weapon} addToCart={addToCart} />
          ))}
        </div>
      </div>
    );
  }
