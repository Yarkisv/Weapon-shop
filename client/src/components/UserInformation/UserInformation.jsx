import React from "react";
import { FaEdit } from "react-icons/fa";

export default function UserInformation({ user }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mt-[10px] ml-[20px] mr-[20px]">
        <p className="text-[25px] font-[Konkhmer Sleokchher]">
          Персональні дані
        </p>

        <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600 cursor-pointer transition">
          <FaEdit className="text-[18px]" />
          <span className="text-[16px] font-[Konkhmer Sleokchher]">
            Редагувати
          </span>
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[30px] w-[1015px] mt-6 ml-5 border border-gray-300 rounded-lg p-6 shadow-sm">
        <label className="text-[18px] font-[Konkhmer Sleokchher] pt-2  max-h-[100px] w-full">
          <p className="mb-1 ">Ім'я:</p>
          <div className="flex items-center max-w-[200px] h-10 border border-gray-400 rounded-lg px-3 bg-white shadow-inner">
            <p className="m-0 text-[16px] text-gray-800 cursor-pointer truncate w-full">
              {user.firstname}
            </p>
          </div>
        </label>

        <label className="text-[18px] font-[Konkhmer Sleokchher] pt-2  max-h-[100px] w-full">
          <p className="mb-1 ">Прізвище:</p>
          <div className="flex items-center max-w-[200px] h-10 border border-gray-400 rounded-lg px-3 bg-white shadow-inner">
            <p className="m-0 text-[16px] text-gray-800 cursor-pointer truncate w-full">
              {user.lastname}
            </p>
          </div>
        </label>

        <label className="text-[18px] font-[Konkhmer Sleokchher] pt-2  max-h-[100px] w-full">
          <p className="mb-1 ">Пошта:</p>
          <div className="flex items-center max-w-[200px] h-10 border border-gray-400 rounded-lg px-3 bg-white shadow-inner">
            <p className="m-0 text-[16px] text-gray-800 cursor-pointer truncate w-full">
              {user.email}
            </p>
          </div>
        </label>

        <label className="text-[18px] font-[Konkhmer Sleokchher] pt-2  max-h-[100px] w-full">
          <p className="mb-1 ">Номер телефону:</p>
          <div className="flex items-center max-w-[200px] h-10 border border-gray-400 rounded-lg px-3 bg-white shadow-inner">
            <p className="m-0 text-[16px] text-gray-800 cursor-pointer truncate w-full">
              {user.phone}
            </p>
          </div>
        </label>
      </div>

      <div className="mt-5 ml-5">
        <button className="text-white bg-green-600 hover:bg-green-700 cursor-pointer rounded px-6 py-2 text-[16px] font-[Konkhmer Sleokchher]">
          Зберегти
        </button>
      </div>
    </div>
  );
}
