import React from "react";
import qrCode from "../images/qrCode.svg";
import { Link } from "react-router-dom";

export default function ChatBot() {
  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Чат-бот</h1>

      <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-md flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex-1">
          <p className="text-lg text-gray-700 mb-6">
            Спілкуйся з нашим ботом у Telegram та отримуй допомогу миттєво.
            Натисни на посилання нижче або відскануй QR-код.
          </p>

          <Link
            to="https://t.me/AJAVstudio"
            target="_blank"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
          >
            Перейти до Telegram-бота
          </Link>
        </div>

        <img
          src={qrCode}
          alt="QR-код для Telegram"
          className="w-[250px] h-[250px] rounded-2xl border border-gray-300"
        />
      </div>
    </div>
  );
}
