import React from "react";
import Header from "../components/Header";

export default function ProtectedAuthRoute({ children }) {
  const isAuth = !!localStorage.getItem("isAuth");

  return isAuth ? (
    children
  ) : (
    <div>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="text-black text-xl font-sans text-center border border-black rounded-md p-4 shadow-md">
          Спершу увійдіть
        </div>
      </div>
    </div>
  );
}
