import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./CatalogPage.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";

export default function CatalogPage() {
  const [products, setProducts] = useState([]);

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
          <ProductCard key={weapon.product_id} weapon={weapon} />
        ))}
      </div>
    </div>
  );
}
