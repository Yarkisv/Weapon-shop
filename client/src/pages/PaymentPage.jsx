import Footer from "../components/Footer";
import logoBlack from "../images/logoBlack.svg";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="max-w-[1440px] w-full mx-auto px-4 pt-4">
        <img
          className="w-48 h-auto cursor-pointer"
          onClick={() => navigate("/")}
          src={logoBlack}
          alt="Логотип"
        />
      </div>

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 py-10 border-t">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-900 mb-6">
          Оплата замовлення
        </h1>
        <div className="bg-white w-full max-w-md mx-auto shadow-lg rounded-lg p-6 border border-green-800">
          <p className="text-base sm:text-lg text-gray-800 mb-6">
            Введіть дані своєї картки для завершення оплати:
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Номер картки
              </label>
              <input
                type="text"
                placeholder="0000 0000 0000 0000"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Термін дії
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  CVV
                </label>
                <input
                  type="password"
                  placeholder="***"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Ім'я власника картки
              </label>
              <input
                type="text"
                placeholder="Ім'я"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white py-3 rounded-md text-lg font-semibold transition"
            >
              Оплатити зараз
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
