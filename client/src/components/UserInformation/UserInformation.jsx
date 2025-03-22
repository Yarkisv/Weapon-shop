import React from "react";
import "./UserInformation.css";

export default function UserInformation({ user }) {
  

  return (
    <div className="user-information-wrapper">
      <p className="user-main-text">Personal data</p>
      <div className="user-information">
        <label className="label-data">
          <p className="label-p-text">Name: </p>
          <div className="user-information-text">
            <p className="user-data-bd"> {user.firstname}</p>
          </div>
        </label>
        <label className="label-data">
          <p className="label-p-text">Surname: </p>
          <div className="user-information-text">
            <p className="user-data-bd">  {user.lastname}</p>
          </div>
        </label>
        <label className="label-data">
          <p className="label-p-text">Email: </p>
          <div className="user-information-text">
            <p className="user-data-bd">  {user.email}</p>
          </div>
        </label>
        <label className="label-data">
          <p className="label-p-text">Phone number: </p>
          <div className="user-information-text">
            <p className="user-data-bd">  {user.phone}</p>
          </div>
        </label>
        
      </div>
    </div>
  );
}
