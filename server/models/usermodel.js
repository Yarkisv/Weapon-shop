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
}
