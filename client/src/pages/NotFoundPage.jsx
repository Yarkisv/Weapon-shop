import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-gray-50 px-4 py-16 sm:py-20">
        <div className="text-center w-full max-w-xs sm:max-w-md">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-800">
            404
          </h1>
          <p className="text-lg sm:text-xl mt-4 text-gray-600">
            Сторінку не знайдено
          </p>

          <Link
            to="/"
            className="inline-block mt-6 px-5 py-2.5 bg-gray-800 text-white text-base sm:text-lg rounded-lg shadow hover:bg-gray-900 transition"
          >
            На головну
          </Link>
        </div>
      </div>
    </div>
  );
}
