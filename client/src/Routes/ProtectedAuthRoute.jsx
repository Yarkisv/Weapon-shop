import React from "react";
import Header from "../components/Header";

export default function ProtectedAuthRoute({ children }) {
  const isAuth = !!localStorage.getItem("isAuth");

  return isAuth ? (
    children
  ) : (
    <div>
      <Header />
      <h1>Log in firstly</h1>
    </div>
  );
}
