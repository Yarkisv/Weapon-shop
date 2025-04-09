import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./CatalogPage.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      console.log(category);

      const response = await axios.get(
        `http://localhost:3000/catalog/${category}`
      );

      if (response.status === 200) {
        setProducts(response.data.products);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Header />
      <div className="products-container">
        {products.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}
