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
          `http://localhost:3000/search/${query}`
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
    <div className="absolute top-[45px] w-[65%] bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-[300px] overflow-y-auto p-2">
      <div>
        <p className="text-sm text-gray-500">Результати пошуку для:</p>
        {fetchedResults.length > 0 ? (
          <div>
            {fetchedResults.map((result) => (
              <div key={result.product_id}>
                <p>{result.name_}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>Товарів не знайдено</p>
          </div>
        )}
      </div>
    </div>
  );
}
