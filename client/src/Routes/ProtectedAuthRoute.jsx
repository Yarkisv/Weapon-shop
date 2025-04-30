import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";

export default function ProtectedAuthRoute({ children }) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/auth/validate",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setIsValid(true);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("isAuth");
        }
      } catch (error) {
        console.log("Error: " + error);
      }
    };

    checkToken();
  }, []);

  return isValid ? (
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
