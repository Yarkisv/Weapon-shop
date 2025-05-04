import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Результати пошуку для:{" "}
          <span className="text-emerald-800">{query}</span>
        </h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 animate-fadeIn">
            {products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[400px] bg-white rounded-lg shadow-inner mt-10">
            <div className="w-[400px] flex flex-col items-center gap-4 border border-black rounded-md p-6 shadow-md bg-white">
              <p className="text-black text-xl font-sans text-center">
                Товарів не знайдено
              </p>
              <p className="text-gray-500 text-sm text-center">
                Спробуйте змінити запит або перегляньте популярні категорії
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
