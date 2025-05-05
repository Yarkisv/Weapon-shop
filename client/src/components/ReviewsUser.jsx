import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function ReviewsUser() {
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Мої відгуки</h1>

      <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md space-y-4">
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-800">Barrett</h2>
            <span className="text-sm text-gray-500">2024-03-21</span>
          </div>
          <div className="flex items-center text-yellow-400 mb-2">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
          </div>
          <p className="text-gray-700 text-sm">
            Хороший товар, швидко стріляє. Доставка була на наступний день!
          </p>
        </div>

        {/* Відгук 2 */}
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-800">XM29 OICW</h2>
            <span className="text-sm text-gray-500">2024-04-02</span>
          </div>
          <div className="flex items-center text-yellow-400 mb-2">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <p className="text-gray-700 text-sm">
            Хороший товар, швидко стріляє. Доставка була на наступний день!
          </p>
        </div>
      </div>
    </div>
  );
}
