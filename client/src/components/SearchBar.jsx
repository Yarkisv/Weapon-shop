import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ query }) {
  const [fetchedResults, setFetchedResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/search-name/${query}`
        );

        if (response.status === 200) {
          setFetchedResults(response.data.results);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (query && query.length > 0) {
      fetchProducts();
    } else {
      setFetchedResults([]);
    }
  }, [query]);

  return (
    <div className="absolute left-[52%] transform -translate-x-1/2 top-[52px] w-full max-w-[920px] bg-white border border-gray-300 rounded-lg shadow-xl z-50 p-4 transition-all duration-200">
      <div className="max-h-[220px] overflow-y-auto mb-4">
        <p className="text-sm text-gray-600 mb-2">Результати пошуку для:</p>
        {fetchedResults.length > 0 ? (
          <ul className="space-y-2">
            {fetchedResults.map((result) => (
              <li
                key={result.product_id}
                className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {/* заглушка */}
                  <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
                  <span>{result.name_}</span>
                </div>
                {/* заглушка */}
                <span className="text-sm text-gray-700 whitespace-nowrap">
                  ₴0.00
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Товарів не знайдено</p>
        )}
      </div>

      <hr className="my-2" />
      <p className="text-sm text-gray-700 mb-2">Або перейдіть до категорії:</p>
      <div className="flex flex-wrap gap-2">
        <button className="text-black border border-black px-1 py-0.5 cursor-pointer rounded-sm text-xs transition duration-300 hover:bg-black hover:text-white">
          Зброя
        </button>
        <button className="text-black border border-black px-1 py-0.5 cursor-pointer rounded-sm text-xs transition duration-300 hover:bg-black hover:text-white">
          Ножі
        </button>
        <button className="text-black border border-black px-1 py-0.5 cursor-pointer rounded-sm text-xs transition duration-300 hover:bg-black hover:text-white">
          Одяг
        </button>
        <button className="text-black border border-black px-1 py-0.5 cursor-pointer rounded-sm text-xs transition duration-300 hover:bg-black hover:text-white">
          Патрони
        </button>
        <button className="text-black border border-black px-1 py-0.5 cursor-pointer rounded-sm text-xs transition duration-300 hover:bg-black hover:text-white">
          Танки
        </button>
        <button className="text-black border border-black px-1 py-0.5 cursor-pointer rounded-sm text-xs transition duration-300 hover:bg-black hover:text-white">
          Літаки
        </button>
      </div>
    </div>
  );
}
