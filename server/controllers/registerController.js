import connection from "../db_config.js";
import { UserModel } from "../models/usermodel.js";
import bcrypt from "bcrypt";

export const regUser = async (req, res) => {
  const newUser = new UserModel(
    req.body.email,
    req.body.password,
    req.body.firstname,
    req.body.lastname,
    req.body.phone
  );

  if (
    !newUser.phone ||
    !newUser.email ||
    !newUser.password ||
    !newUser.firstname ||
    !newUser.lastname
  ) {
    console.log(
      `data invalid ${newUser.userName} ${newUser.email} ${newUser.password}`
    );
    return res.status(400).json({ message: "Invalid data" });
  }

  if (UserModel.isUserExist(newUser.email)) {
    console.error("User already exist");
    return res.status(409).json({ message: "User already exist" });
  }

  if (UserModel.validateEmail(newUser.email)) {
    console.error("Email is incorrect");
    return res.status(401).json({ message: "Email is incorrect" });
  }

  try {
    const hashed_password = await bcrypt.hash(newUser.password, 10);

    const Querry =
      "INSERT into users (firstname, lastname, email, phone, hashed_password) values (?,?,?,?,?)";
    const DataArr = [
      newUser.firstname,
      newUser.lastname,
      newUser.email,
      newUser.phone,
      hashed_password,
    ];

    connection.query(Querry, DataArr, (err, result) => {
      if (err) {
        console.error("Query is invalid: " + err);
        return res.status(500).json({ message: "Server error" });
      }
      console.log("User created");
      return res.status(201).json({ message: "User created" });
    });
  } catch (err) {
    console.error("Error with hashing or querry: " + err);
    return res.status(500).json({ message: "Server error" });
  }
};
