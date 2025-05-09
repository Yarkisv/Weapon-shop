import React from "react";
import qrCode from "../images/qrCode.svg";
import { Link } from "react-router-dom";

export default function ChatBot() {
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Чат-бот</h1>

      <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1 text-left min-w-[300px]">
          <p className="text-lg text-gray-700 mb-4">
            Спілкуйся з нашим ботом у Telegram та отримуй допомогу миттєво.
            Натисни на посилання нижче або відскануй QR-код.
          </p>

          <Link
            to="https://t.me/AJAVstudio"
            target="_blank"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Перейти до Telegram-бота
          </Link>
        </div>

        <div className="flex justify-start lg:justify-center w-full lg:w-auto">
          <img
            src={qrCode}
            alt="QR-код для Telegram"
            className="block w-[250px] h-[250px] rounded-lg border border-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
