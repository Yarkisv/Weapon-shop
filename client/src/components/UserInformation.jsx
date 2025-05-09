import { FaEdit } from "react-icons/fa";

export default function UserInformation({ user }) {
  return (
    <div className="w-full max-w-[1080px] mx-auto bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <h1 className="text-3xl font-semibold text-gray-800">
          Персональні дані
        </h1>

        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition">
          <FaEdit className="text-lg" />
          <span className="text-base font-medium cursor-pointer ">
            Редагувати
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm text-gray-500 mb-1">Ім'я</p>
          <div className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-800">
            {user.firstname || "-"}
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Прізвище</p>
          <div className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-800">
            {user.lastname || "-"}
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Пошта</p>
          <div className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-800">
            {user.email || "-"}
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Номер телефону</p>
          <div className="px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 text-gray-800">
            {user.phone || "-"}
          </div>
        </div>
      </div>

      <div className="mt-8 text-right">
        <button className="bg-green-600 hover:bg-green-700 cursor-pointer text-white px-6 py-2 rounded-lg text-base font-semibold transition">
          Зберегти
        </button>
      </div>
    </div>
  );
}
