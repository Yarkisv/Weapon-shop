import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

import Header from "../components/Header";

export default function SearchPage() {
  const { query } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByQuery = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/search-products/${query}`
        );

        if (response.status === 200) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    };

    fetchProductsByQuery();
  }, [query]);

  return (
    <div>
      <Header />
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[400px]">
          <div className="w-[400px] flex flex-col items-center gap-4 border border-black rounded-md p-4 shadow-md">
            <p className="text-black text-xl font-sans text-center">
              Товарів не знайдено
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
