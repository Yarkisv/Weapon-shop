import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useModal } from "../contexts/modalContext";

export default function SearchBar({ query, inputRef, isOpen }) {
  const [fetchedResults, setFetchedResults] = useState([]);
  const [style, setStyle] = useState({});
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API;

  const { setSearcBarOpen } = useModal();

  const handleClosePanel = (e) => {
    if (e.target.closest("#search-bar-panel") || e.target.closest("form")) {
      return;
    }
    setSearcBarOpen(false);
  };

  const handleNavigateToCatalog = (category) => {
    navigate(`/catalog/${category}`);
  };

  const handleNavigateToProduct = (category, name) => {
    if (category === "Танк") {
      category = "tanks";
    } else if (category === "Літак") {
      category = "military-aircrafts";
    } else if (category === "Зброя") {
      category = "guns";
    }

    navigate(`/catalog/${category}/${name}`);
    setSearcBarOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API}/search-name/${query}`);
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

  useEffect(() => {
    const updatePosition = () => {
      if (inputRef?.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setStyle({
          position: "absolute",
          top: `${rect.bottom}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          zIndex: 9999,
        });
      }
    };

    if (isOpen) {
      const timeout = setTimeout(updatePosition, 0);
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition);

      return () => {
        clearTimeout(timeout);
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition);
      };
    }
  }, [inputRef, isOpen]);

  return (
    <>
      <div className="fixed inset-0 z-[9994]" onClick={handleClosePanel} />
      <div
        id="search-bar-panel"
        style={style}
        className="z-[9995] bg-white border border-gray-300 rounded-lg shadow-xl p-4 transition-all duration-200"
      >
        <div className="max-h-[220px] overflow-y-auto mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Результати пошуку для: {query}
          </p>
          {fetchedResults.length > 0 ? (
            <ul className="space-y-2">
              {fetchedResults.map((result) => (
                <li
                  onClick={() =>
                    handleNavigateToProduct(
                      result.product_type,
                      result.product_name
                    )
                  }
                  key={result.product_id}
                  className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={`data:image/jpg;base64,${result.product_image}`}
                      className="w-8 h-8 object-contain"
                    />
                    <span>{result.product_name}</span>
                  </div>
                  <span className="text-sm text-gray-700 whitespace-nowrap">
                    {result.product_price} ₴
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Товарів не знайдено</p>
          )}
        </div>

        <hr className="my-2" />
        <p className="text-sm text-gray-700 mb-2">
          Або перейдіть до категорії:
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleNavigateToCatalog("guns")}
            className="text-black border border-black px-1 py-0.5 cursor-pointer rounded-sm text-xs transition duration-300 hover:bg-black hover:text-white"
          >
            Зброя
          </button>
          <button
            onClick={() => handleNavigateToCatalog("tanks")}
            className="text-black border border-black px-1 py-0.5 cursor-pointer rounded-sm text-xs transition duration-300 hover:bg-black hover:text-white"
          >
            Танки
          </button>
          <button
            onClick={() => handleNavigateToCatalog("military-aircrafts")}
            className="text-black border border-black px-1 py-0.5 cursor-pointer rounded-sm text-xs transition duration-300 hover:bg-black hover:text-white"
          >
            Літаки
          </button>
        </div>
      </div>
    </>
  );
}
