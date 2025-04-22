import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/BreadCrumbs";
import Footer from "../components/Footer";
import sponge from "../images/sponge.svg";

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
              <div className="space-y-4">
                <div>
                  <span className="text-gray-700 block mb-1">Ціна (₴):</span>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="від"
                      value={firstSortPrice}
                      onChange={(e) => setFirstSortPrice(e.target.value)}
                      className="w-full border rounded p-2"
                    />
                    <input
                      type="text"
                      placeholder="до"
                      value={secondSortPrice}
                      onChange={(e) => setSecondSortPrice(e.target.value)}
                      className="w-full border rounded p-2"
                    />
                    <button
                      className="bg-[#7aae99] cursor-pointer text-black border-1 border-black px-3 py-2 rounded hover:bg-green-700 transition"
                      onClick={handlePriceConfirmationClicked}
                    >
                      ОК
                    </button>
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
                  </aside>
                )}
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col gap-6">
              <div className="flex justify-end mr-10">
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
