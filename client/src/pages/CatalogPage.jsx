import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/BreadCrumbs";
import Footer from "../components/Footer";

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const { category } = useParams();

  const [firstSortPrice, setFirstSortPrice] = useState("");
  const [secondSortPrice, setSecondSortPrice] = useState("");
  const [priceConfirmation, setPriceConfirmation] = useState(false);
  const [armorType, setArmorType] = useState([]);
  const [armorThickness, setArmorThickness] = useState([]);

  const isAircraft =
    products.length > 0 ? products[0].product_type === "Літак" : "";
  const isTank = products.length > 0 ? products[0].product_type === "Танк" : "";
  const isGun = products.length > 0 ? products[0].product_type === "Зброя" : "";

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        `http://localhost:3000/catalog/${category}`
      );
      if (response.status === 200) {
        setProducts(response.data.weapons);
        setFilteredProducts(response.data.weapons);
      }
    };

    fetchProducts();
  }, [category]);

  const handleSortOptionChange = (event) => {
    setSortOption(event.target.value);
  };

  const handlePriceConfirmationClicked = () => {
    setPriceConfirmation(true);
  };

  const handleArmorTypeChange = (event) => {
    const value = event.target.value;
    setArmorType((prev) =>
      prev.includes(value)
        ? prev.filter((type) => type !== value)
        : [...prev, value]
    );
  };

  const handleArmorThicknessChange = (event) => {
    const value = event.target.value;
    setArmorThickness((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    );
  };

  const sortProducts = () => {
    let filtered = [...products];

    if (sortOption === "cheap") {
      filtered.sort((a, b) => (a.price - b.price ? 1 : -1));
    }

    if (sortOption === "expensive") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (armorType.length > 0) {
      filtered = filtered.filter((product) =>
        armorType.includes(product.armor_type)
      );
    }

    if (priceConfirmation && firstSortPrice && secondSortPrice) {
      filtered = filtered.filter(
        (product) =>
          product.price > Number(firstSortPrice) &&
          product.price < Number(secondSortPrice)
      );
    }

    if (armorThickness.length > 0) {
      filtered = filtered.filter((product) => {
        return armorThickness.some((value) => {
          if (value === "50") return product.armor_thickness < 50;
          if (value === "100") return product.armor_thickness < 100;
          if (value === "101") return product.armor_thickness >= 100;
          return true;
        });
      });
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    sortProducts();
  }, [
    sortOption,
    armorType,
    armorThickness,
    firstSortPrice,
    secondSortPrice,
    priceConfirmation,
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <div className="max-w-[1440px] mx-auto px-4 py-[10px]">
          <Breadcrumbs />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[400px]">
            <div className="md:col-span-1 bg-gray-100 rounded-md p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Фільтри</h2>
              <div className="space-y-4 ">
                <div>
                  <span className="text-gray-700 block mb-1 text-sm">
                    Ціна (₴):
                  </span>
                  <div className="flex gap-2 items-center mb-2">
                    <input
                      type="number"
                      placeholder="від"
                      value={firstSortPrice}
                      onChange={(e) => setFirstSortPrice(e.target.value)}
                      className="w-[90px] border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="до"
                      value={secondSortPrice}
                      onChange={(e) => setSecondSortPrice(e.target.value)}
                      className="w-[90px] border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                      className="bg-[#3b5b88] text-white text-sm px-3 py-1 rounded hover:bg-[#2e486c] transition"
                      onClick={handlePriceConfirmationClicked}
                    >
                      OK
                    </button>
                  </div>

                  <div className="relative h-5 mt-1 w-[260px]">
                    <div className="relative h-2 bg-gray-200 rounded-full">
                      <div
                        className="absolute h-2 bg-blue-500 rounded-full"
                        style={{
                          left: `${(firstSortPrice / 50000000) * 100}%`,
                          width: `${
                            ((secondSortPrice - firstSortPrice) / 50000000) *
                            100
                          }%`,
                        }}
                      />
                    </div>

                    {/* Левый ползунок */}
                    <input
                      type="range"
                      min="0"
                      max="50000000"
                      step="1000"
                      value={firstSortPrice}
                      onChange={(e) =>
                        setFirstSortPrice(Number(e.target.value))
                      }
                      className="range-thumb absolute w-full appearance-none bg-transparent pointer-events-none
      [&::-webkit-slider-thumb]:appearance-none
      [&::-webkit-slider-thumb]:pointer-events-auto
      [&::-webkit-slider-thumb]:w-4
      [&::-webkit-slider-thumb]:h-4
      [&::-webkit-slider-thumb]:bg-blue-600
      [&::-webkit-slider-thumb]:rounded-full
      [&::-webkit-slider-thumb]:border-2
      [&::-webkit-slider-thumb]:border-white
      [&::-webkit-slider-thumb]:mt-[-6px]"
                    />

                    {/* Правый ползунок */}
                    <input
                      type="range"
                      min="0"
                      max="50000000"
                      step="1000"
                      value={secondSortPrice}
                      onChange={(e) =>
                        setSecondSortPrice(Number(e.target.value))
                      }
                      className="range-thumb absolute w-full appearance-none bg-transparent pointer-events-none
      [&::-webkit-slider-thumb]:appearance-none
      [&::-webkit-slider-thumb]:pointer-events-auto
      [&::-webkit-slider-thumb]:w-4
      [&::-webkit-slider-thumb]:h-4
      [&::-webkit-slider-thumb]:bg-blue-600
      [&::-webkit-slider-thumb]:rounded-full
      [&::-webkit-slider-thumb]:border-2
      [&::-webkit-slider-thumb]:border-white
      [&::-webkit-slider-thumb]:mt-[-6px]"
                    />
                  </div>
                </div>

                {isTank && (
                  <aside className="space-y-6 mt-6">
                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Тип броні
                      </p>
                      <div className="space-y-1">
                        {["композитна", "гомогенна", "реактивна"].map((val) => (
                          <label
                            key={val}
                            className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              value={val}
                              className="accent-blue-600"
                              onChange={handleArmorTypeChange}
                            />
                            <span>{val}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Товщина броні
                      </p>
                      <div className="space-y-1">
                        {[
                          { label: "до 50 мм", value: "50" },
                          { label: "до 100 мм", value: "100" },
                          { label: "від 100 мм", value: "101" },
                        ].map((range) => (
                          <label
                            key={range.value}
                            className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              value={range.value}
                              className="accent-blue-600"
                              onChange={handleArmorThicknessChange}
                            />
                            <span>{range.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Екіпаж (осіб)
                      </p>
                      <div className="space-y-1">
                        {[2, 3, 4].map((val) => (
                          <label
                            key={val}
                            className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="accent-blue-600"
                            />
                            <span>{val}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Потужність двигуна (к.с.)
                      </p>
                      <div className="space-y-1">
                        {["до 700", "701-1000", "понад 1000"].map(
                          (label, i) => (
                            <label
                              key={i}
                              className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                className="accent-blue-600"
                              />
                              <span>{label}</span>
                            </label>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Вага (тонн)
                      </p>
                      <div className="space-y-1">
                        {["до 40", "41-60", "більше 60"].map((label, i) => (
                          <label
                            key={i}
                            className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="accent-blue-600"
                            />
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Калібр гармати (мм)
                      </p>
                      <div className="space-y-1">
                        {["до 100", "101-120", "більше 120"].map((label, i) => (
                          <label
                            key={i}
                            className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="accent-blue-600"
                            />
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Обертання башти (град/сек)
                      </p>
                      <div className="space-y-1">
                        {["до 20", "21-25", "більше 25"].map((label, i) => (
                          <label
                            key={i}
                            className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="accent-blue-600"
                            />
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Тип трансмісії
                      </p>
                      <div className="space-y-1">
                        {["механічна", "автоматична"].map((val) => (
                          <label
                            key={val}
                            className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              value={val}
                              className="accent-blue-600"
                            />
                            <span>{val}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </aside>
                )}

                {isGun && (
                  <aside className="space-y-6 mt-6">
                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Калібр
                      </p>
                      <div className="space-y-1">
                        {[1, 2, 3, 4].map((val) => (
                          <label
                            key={val}
                            className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              value={val}
                              className="accent-blue-600"
                            />
                            <span>{val} Калібр</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Наявність (stock)
                      </p>
                      <div className="space-y-1">
                        {["stock1", "stock2"].map((val) => (
                          <label
                            key={val}
                            className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="kbType"
                              value={val}
                              className="accent-blue-600"
                            />
                            <span>{val}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Тип прикладу (stock type)
                      </p>
                      <div className="space-y-1">
                        {["Тип A", "Тип B"].map((val, idx) => (
                          <label
                            key={idx}
                            className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="connectionType"
                              value={val}
                              className="accent-blue-600"
                            />
                            <span>{val}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Вага (кг)
                      </p>
                      <div className="space-y-1">
                        {["до 1 кг", "1-3 кг", "більше 3 кг"].map(
                          (label, i) => (
                            <label
                              key={i}
                              className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                className="accent-blue-600"
                              />
                              <span>{label}</span>
                            </label>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Довжина (см)
                      </p>
                      <div className="space-y-1">
                        {["до 30 см", "31-40 см", "більше 40 см"].map(
                          (label, i) => (
                            <label
                              key={i}
                              className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                className="accent-blue-600"
                              />
                              <span>{label}</span>
                            </label>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Колір
                      </p>
                      <div className="space-y-1">
                        {["Black", "FDE", "Coyote", "Wood"].map((color) => (
                          <label
                            key={color}
                            className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="accent-blue-600"
                            />
                            <span>{color}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Тип магазину
                      </p>
                      <div className="space-y-1">
                        {[
                          "Вбудований",
                          "Знімний магазин",
                          "Коробчатий магазин",
                          "Барабанний магазин",
                          "Однорядний магазин",
                          "Дворядний магазин",
                          "Касетний магазин",
                        ].map((type) => (
                          <label
                            key={type}
                            className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="accent-blue-600"
                            />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </aside>
                )}

                {isAircraft && (
                  <aside className="space-y-6 mt-6">
                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Тип двигуна
                      </p>
                      <div className="space-y-1">
                        {[
                          "поршневий",
                          "реактивний",
                          "турбореактивний",
                          "турбовентиляторний",
                        ].map((type) => (
                          <label
                            key={type}
                            className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="accent-blue-600"
                            />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Кількість двигунів
                      </p>
                      <div className="space-y-1">
                        {[1, 2, 3, 4].map((val) => (
                          <label
                            key={val}
                            className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="accent-blue-600"
                            />
                            <span>{val}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Максимальна швидкість (км/год)
                      </p>
                      <div className="space-y-1">
                        {["до 800", "801-1500", "понад 1500"].map(
                          (label, idx) => (
                            <label
                              key={idx}
                              className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                className="accent-blue-600"
                              />
                              <span>{label}</span>
                            </label>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Дальність польоту (км)
                      </p>
                      <div className="space-y-1">
                        {["до 1000", "1001-2000", "понад 2000"].map(
                          (label, idx) => (
                            <label
                              key={idx}
                              className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                className="accent-blue-600"
                              />
                              <span>{label}</span>
                            </label>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Максимальна висота (м)
                      </p>
                      <div className="space-y-1">
                        {["до 12000", "12001-16000", "понад 16000"].map(
                          (label, idx) => (
                            <label
                              key={idx}
                              className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                className="accent-blue-600"
                              />
                              <span>{label}</span>
                            </label>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Швидкість набору висоти (м/сек)
                      </p>
                      <div className="space-y-1">
                        {["до 50", "51-100", "понад 100"].map((label, idx) => (
                          <label
                            key={idx}
                            className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="accent-blue-600"
                            />
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Радіус дії радара (км)
                      </p>
                      <div className="space-y-1">
                        {["до 100", "101-150", "понад 150"].map(
                          (label, idx) => (
                            <label
                              key={idx}
                              className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                className="accent-blue-600"
                              />
                              <span>{label}</span>
                            </label>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-medium text-gray-800 mb-2">
                        Розмах крил (м)
                      </p>
                      <div className="space-y-1">
                        {["до 10", "10-15", "понад 15"].map((label, idx) => (
                          <label
                            key={idx}
                            className="flex items-center space-x-2 text-gray-700 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              className="accent-blue-600"
                            />
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </aside>
                )}
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col gap-6">
              <div className="flex justify-end mr-[12px]">
                <label className="flex items-center gap-2 text-gray-700">
                  <span className="text-sm font-medium">Сортування:</span>
                  <select
                    onChange={handleSortOptionChange}
                    className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                  >
                    <option value="cheap">Від дешевих</option>
                    <option value="expensive">Від дорогих</option>
                  </select>
                </label>
              </div>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredProducts.map((product) => (
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
