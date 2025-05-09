import React from "react";
import { useNavigate } from "react-router-dom";

export default function Bonuses() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-semibold mb-4">Ваші бонуси</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-medium mb-2">Нараховані бонуси</h2>
            <p className="text-3xl font-bold text-green-600">1 250</p>
            <p className="text-sm text-gray-500 mt-1">
              Доступні для використання
            </p>
          </div>
          <div className="border rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-medium mb-2">Історія бонусів</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>+250 — покупка від 05.05.2025</li>
              <li>+500 — акція “Весняний кешбек”</li>
              <li>-100 — використано 01.05.2025</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-sm text-gray-500">
          * Бонуси дійсні протягом 6 місяців з моменту нарахування.
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate("/")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm cursor-pointer"
          >
            Використати бонуси
          </button>
        </div>
      </div>
    </div>
  );
}
