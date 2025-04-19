import React from "react";

import { Link } from "react-router-dom";

export default function ChatBot() {
  return (
    <div className="ml-4 mt-4 max-w-[1015px] h-auto border border-gray-600 rounded-xl p-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Чат-бот</h1>
      <p className="text-lg text-gray-700 mb-6">
        Спілкуйся з нашим ботом у Telegram та отримуй допомогу миттєво. Натисни
        на посилання нижче або відскануй QR-код.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link
            to="https://t.me/AJAVstudio"
            target="_blank"
            className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
          >
            Перейти до Telegram-бота
          </Link>
        </div>
      </div>
    </div>
  );
}
