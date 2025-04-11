import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function CatalogPage() {
  const [products, setProducts] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        `http://localhost:3000/catalog/${category}`
      );
      if (response.status === 200) {
        setProducts(response.data.weapons);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div>
      <Header />

      <div className="max-w-[1440px] mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Фільтри (ліва частина) */}
        <div className="md:col-span-1 bg-gray-100 rounded-md p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Фільтри</h2>
          <div className="space-y-4">
            <div>
              <span className="text-gray-700 block mb-1">Ціна (₴):</span>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="від"
                  className="w-full border rounded p-2"
                />
                <input
                  type="number"
                  placeholder="до"
                  className="w-full border rounded p-2"
                />
              </div>
            </div>

            <aside className="space-y-6 mt-6">
              <div>
                <p className="text-lg font-medium text-gray-800 mb-2">Калібр</p>
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
                <p className="text-lg font-medium text-gray-800 mb-2 ">
                  Наявність (stock)
                </p>
                <div className="space-y-1 ">
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
          </div>
        </div>

        {/* Права частина: сортування + карточки */}
        <div className="md:col-span-3 flex flex-col gap-6">
          {/* Сортування */}
          <div className="flex justify-end mr-10">
            <label className="flex items-center gap-2 text-gray-700">
              <span className="text-sm font-medium">Сортування:</span>
              <select className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer">
                <option value="cheap">Від дешевих</option>
                <option value="expensive">Від дорогих</option>
              </select>
            </label>
          </div>

          {/* Карточки товарів */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
