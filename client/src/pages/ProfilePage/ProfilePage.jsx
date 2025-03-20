import React, {useState} from "react";
import "./ProfilePage.css";
import Header from "../../components/Header/Header";
import UserInformation from "../../components/UserInformation/UserInformation";
import PageBasket from "../../components/PageBasket/PageBasket";

import profile from "../../images/ProfilePageImg/profile.svg";
import basket from "../../images/ProfilePageImg/basket.svg";
import liked from "../../images/ProfilePageImg/liked.svg";
import visited from "../../images/ProfilePageImg/visited.svg";
import history from "../../images/ProfilePageImg/history.svg";
import chat from "../../images/ProfilePageImg/chat.svg";
import reviews from "../../images/ProfilePageImg/reviews.svg";
import logout from "../../images/ProfilePageImg/logout.svg";
export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState(profile);

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <UserInformation/>;
      case "basket":
        return <PageBasket/>;
      default:
        return <UserInformation/>;
    }
  }
  return (
    <div className="profile-page-wrapper">
      <Header />
      <div className="profile-page">
        <p className="profile-main-text">Good afternoon user</p>
        <div className="profile-page-container">
          <div className="profile-page-aside">
            <ul className="profile-page-menu">
              <li onClick={() => setActiveSection("profile")}>
                <img src={profile} /> Profile
              </li>
              <li onClick={() => setActiveSection("basket")}>
                <img src={basket} /> Basket
              </li>
              <li>
                <img src={liked}/> wish list
              </li>
              <li>
                <img src={visited} /> Viewed
              </li>
              <li>
                <img src={history}  /> Order history
              </li>
              <li>
                <img src={chat} /> Chat-bot
              </li>
              <li>
                <img src={reviews} /> Reviews
              </li>
              <li>
                <img src={logout} /> Logout
              </li>
            </ul>
            
          </div>
          <div className="profile-page-main">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
