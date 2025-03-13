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
        return false; //reverse
      }
      return true; //reverse
    }
  }

  static validatePassword(password) {
    // проверка длины
    if (password.length >= 8 && password.length <= 30) return true;
    return false;
  }
  static isUserExist(email) {
    const Querry = "SELECT from Users where email = ?";
    let result = connection.query(Querry, email, (err, res) => {
      if (err) return false;
      // return true;
    });
    if (result.length === 0) return false;
    return true;
  }
}
