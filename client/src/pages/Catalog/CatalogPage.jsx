import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./CatalogPage.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";
import { useCart } from "../../contexts/cartContext";

export default function CatalogPage() {
  const [products, setProducts] = useState([]);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:3000/catalog");

      if (response.status === 200) {
        setProducts(response.data.weaponsData);
      }
    };

    fetchProducts();
  }, []);

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
