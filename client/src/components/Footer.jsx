import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#303030" }}
      className="bg-303030 text-white py-10 px-4 mt-5 mb-auto "
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">Steel&Guns</h2>
          <p className="text-gray-400">
            Магазин для справжніх поціновувачів зброї. Вогнепальна зброя, ножі,
            бойова техніка — у нас є все!
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Навігація</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a className="hover:underline cursor-pointer">Каталог</a>
            </li>
            <li>
              <a className="hover:underline cursor-pointer">Про нас</a>
            </li>
            <li>
              <a className="hover:underline cursor-pointer">Контакти</a>
            </li>
            <li>
              <Link className="hover:underline cursor-pointer" to={"/"}>
                На головну
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Контакти</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Телефон: +38 (099) 148-82-28</li>
            <li>Email: steelguns@gmail.com</li>
            <li>Адреса: вул. Московська, 9, Харків</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-3">Ми в соцмережах</h3>
          <div className="flex flex-col gap-2 text-gray-300">
            <a className="hover:text-white cursor-pointer">Facebook</a>
            <a className="hover:text-white cursor-pointer">Instagram</a>
            <a className="hover:text-white cursor-pointer">YouTube</a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-white pt-4 text-center text-white text-sm">
        © 2025 Steel&Guns. Всі права захищені.
      </div>
    </footer>
  );
}
