import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import Header from "../../components/Header/Header";
import UserInformation from "../../components/UserInformation/UserInformation";
import PageBasket from "../../components/PageBasket/PageBasket";
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
        <p className="profile-main-text">Welcome</p>
        <div className="profile-page-container">
          <div className="profile-page-aside">
            <ul className="profile-page-menu">
              <li>
                <Link to={"/profile"}>Profile</Link>
                <img src={profile} />
              </li>
              <li>
                <Link to={"/profile/basket"}>Basket</Link>
                <img src={basket} />
              </li>
              <li>
                <Link to={"/profile/wishlist"}>Wish list</Link>
                <img src={liked} />
              </li>
              <li>
                <Link to={"/profile/viewed"}>Viewed</Link>
                <img src={visited} />
              </li>
              <li>
                <Link to={"/profile/orderhistory"}>Order history</Link>
                <img src={history} />
              </li>
              <li>
                <Link to={"/profile/chatbot"}>Chat-bot</Link>
                <img src={chat} />
              </li>
              <li>
                <Link to={"/profile/reviews"}>Reviews</Link>
                <img src={reviews} />
              </li>
              <li onClick={handleLogoutClick}>
                <img src={logout} /> Logout
              </li>
            </ul>
          </div>
          <div className="profile-page-main">
            <Routes>
              <Route path="/" element={<UserInformation user={user} />} />
              <Route path="basket" element={<PageBasket />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
