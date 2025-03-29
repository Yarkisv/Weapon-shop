import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./ProductsPage.css";
import AboutProductContainer from "../../components/AboutProductContainer/AboutProductContainer";
import ProductCharacteristics from "../../components/ProductCharacteristics/ProductCharacteristics";
import ReviewContainer from "../../components/ReviewsContainer/ReviewsContainer";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function ProductPage() {
  const [product, setProduct] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { name } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductByName = async () => {
      const response = await axios.get(`http://localhost:3000/product/${name}`);
      if (response.status === 200) {
        setProduct(response.data.product);
      }
      if (response.status === 404) {
        setErrorMessage("Product not found");
      }
    };

    fetchProductByName();
  }, []);

  return (
    <div>
      <Header />
      <div className="product-container-wrapper">
        <div className="product-container">
          <div className="navigation">
            <Link to={`/product/${name}`} className="navLink">
              Про товар
            </Link>
            <Link to={`/product/${name}/characteristics`} className="navLink">
              Характеристики
            </Link>
            <Link to={`/product/${name}/reviews`} className="navLink">
              Відгуки
            </Link>
          </div>
        </div>
        <div className="product-page-main">
          <Routes>
            <Route
              path="/"
              element={<AboutProductContainer product={product} />}
            />
            <Route
              path="characteristics"
              element={<ProductCharacteristics product={product} />}
            />
            <Route path="reviews" element={<ReviewContainer />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
