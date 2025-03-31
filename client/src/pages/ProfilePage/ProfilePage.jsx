import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import Header from "../../components/Header/Header";
import UserInformation from "../../components/UserInformation/UserInformation";
import PageBasket from "../../components/PageBasket/PageBasket";
import WishList from "../../components/WishList/WishList";
import Viewed from "../../components/Viewed/Viewed";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import ChatBot from "../../components/ChatBot/ChatBot";
import ReviewsUser from "../../components/ReviewsUser/ReviewsUser";

import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import profile from "../../images/ProfilePageImg/profile.svg";
import basket from "../../images/ProfilePageImg/basket.svg";
import liked from "../../images/ProfilePageImg/liked.svg";
import visited from "../../images/ProfilePageImg/visited.svg";
import history from "../../images/ProfilePageImg/history.svg";
import chat from "../../images/ProfilePageImg/chat.svg";
import reviews from "../../images/ProfilePageImg/reviews.svg";
import logout from "../../images/ProfilePageImg/logout.svg";

export default function ProfilePage() {
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    navigate("/");
    console.log(
      `Logout successful, token - [${localStorage.getItem("token")}]]`
    );
  };

  useEffect(() => {
    const fethcUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    fethcUser();
  }, []);

  useEffect(() => {
    if (user) {
      console.log("User data:", user);
    }
  }, [user]);

  return (
    <div className="profile-page-wrapper">
      <Header />
      <div className="profile-page">
        <p className="profile-main-text">Вітаємо</p>
        <div className="profile-page-container">
          <div className="profile-page-aside">
            <ul className="profile-page-menu">
              <li>
                <img src={profile} />
                <Link
                  to={"/profile"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Профіль
                </Link>
              </li>
              <li>
                <img src={basket} />
                <Link
                  to={"/profile/basket"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Корзина
                </Link>
              </li>
              <li>
                <img src={liked} />
                <Link
                  to={"/profile/wishlist"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Обране
                </Link>
              </li>
              <li>
                <img src={visited} />
                <Link
                  to={"/profile/viewed"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Переглянуте
                </Link>
              </li>
              <li>
                <img src={history} />
                <Link
                  to={"/profile/orderhistory"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Історія замовлень
                </Link>
              </li>
              <li>
                <img src={chat} />
                <Link
                  to={"/profile/chatbot"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Чат-бот
                </Link>
              </li>
              <li>
                <img src={reviews} />
                <Link
                  to={"/profile/reviews"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Відгуки
                </Link>
              </li>
              <li onClick={handleLogoutClick}>
                <img src={logout} /> Вийти
              </li>
            </ul>
          </div>
          <div className="profile-page-main">
            <Routes>
              <Route path="/" element={<UserInformation user={user} />} />
              <Route path="basket" element={<PageBasket />} />
              <Route path="wishlist" element={<WishList />} />
              <Route path="viewed" element={<Viewed />} />
              <Route path="orderhistory" element={<OrderHistory />} />
              <Route path="chatbot" element={<ChatBot />} />
              <Route path="reviews" element={<ReviewsUser />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
