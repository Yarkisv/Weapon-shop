import connection from "../db_config.js";

export class UserModel {
  constructor(email, password, firstname, lastname, phone) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }

  static validateEmail(email) {
    const emails = ["gmail.com", "outlook.com"];
    if (email.includes("@")) {
      let stri = email.indexOf("@");
      let getEmail = email.slice(stri + 1);
      if (emails.includes(getEmail)) {
        return false;
      }
      return true;
    }
  }

  static isUserExist(email) {
    const query = "SELECT * FROM Users WHERE email = ?";
    connection.query(query, [email], (err, results) => {
      if (err) {
        console.error("DB error in isUserExist:", err);
        return false;
      }

      if (results.length === 0) {
        console.log("From class user not found");
        return false;
      }

      if (results.length > 0) {
        console.log("From class user exists");
        return true;
      }
    });
  }

  static isPhoneExist(phone) {
    const query = "select * from Users where phone = ?";
    connection.query(query, [phone], (err, results) => {
      if (err) {
        console.error("DB error in isPhoneExist:", err);
        return false;
      }
      if (results.length > 0) {
        return false;
      }
      return true;
    });
  }
}
