import React from "react";
import "./UserInformation.css";

export default function UserInformation({ user }) {
  return (
    <div className="user-information-wrapper">
      <p className="user-main-text">Персональні дані</p>
      <div className="user-information">
        <label className="label-data">
          <p className="label-p-text">Ім'я: </p>
          <div className="user-information-text">
            <p className="user-data-bd"> {user.firstname}</p>
          </div>
        </label>
        <label className="label-data">
          <p className="label-p-text">Прізвище: </p>
          <div className="user-information-text">
            <p className="user-data-bd"> {user.lastname}</p>
          </div>
        </label>
        <label className="label-data">
          <p className="label-p-text">Пошта: </p>
          <div className="user-information-text">
            <p className="user-data-bd"> {user.email}</p>
          </div>
        </label>
        <label className="label-data">
          <p className="label-p-text">Номер телефону: </p>
          <div className="user-information-text">
            <p className="user-data-bd"> {user.phone}</p>
          </div>
        </label>
      </div>
    </div>
  );
}
