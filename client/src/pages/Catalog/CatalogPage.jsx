import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./CatalogPage.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CatalogPage() {
  const [products, setProducts] = useState([]);

  const [orders, setOrders] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:3000/catalog");

      if (response.status === 200) {
        setProducts(response.data.weaponsData);
      }
    };

    fetchProducts();
  }, []);

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
        {products.map((weapon) => (
          <ProductCard key={weapon.id} weapon={weapon} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
