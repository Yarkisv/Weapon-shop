import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ query }) {
  const [fetchedResults, setFetchedResults] = useState({});

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
    <div className="absolute left-1/2 transform -translate-x-1/2 top-[60px] w-full max-w-[65%] bg-white border border-gray-300 rounded-lg shadow-xl z-50 max-h-[300px] overflow-y-auto p-4 transition-all duration-200">
      <div>
        <p className="text-sm text-gray-600 mb-2">Результати пошуку для:</p>
        {fetchedResults.length > 0 ? (
          <ul className="space-y-2">
            {fetchedResults.map((result) => (
              <li
                key={result.product_id}
                className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
              >
                {result.name_}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Товарів не знайдено</p>
        )}
      </div>
    </div>
  );
}
