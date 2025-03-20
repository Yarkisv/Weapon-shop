import React from "react";
import "./UserInformation.css";

export default function UserInformation({ user }) {
  return (
    <div className="user-information">
      <p>Personal data</p>
      <div>
        <p>Name: {user.firstname}</p>
        <p>Surname: {user.lastname}</p>
        <p>Email: {user.email}</p>
        <p>Phone number: {user.phone}</p>
      </div>
    </div>
  );
}
