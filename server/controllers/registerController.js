import { connection } from "../db_config.js";
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
    console.log(`Data invalid: ${newUser.email} ${newUser.password}`);
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    if (UserModel.validateEmail(newUser.email)) {
      console.log("Email is incorrect");
      return res.status(400).json({ message: "Invalid email format" });
    }

    const [existingUsers] = await connection.query(
      "SELECT * FROM Users WHERE email = ? OR phone = ?",
      [newUser.email, newUser.phone]
    );

    if (existingUsers.length > 0) {
      const userExistsMessage = existingUsers.find(
        (user) => user.email === newUser.email
      )
        ? "Email вже зареєстровано"
        : "Phone вже зареєстровано";
      console.log(userExistsMessage);
      return res.status(409).json({ message: userExistsMessage });
    }

    const hashed_password = await bcrypt.hash(newUser.password, 10);

    const query =
      "INSERT INTO users (firstname, lastname, email, phone, hashed_password) VALUES (?, ?, ?, ?, ?)";
    const userData = [
      newUser.firstname,
      newUser.lastname,
      newUser.email,
      newUser.phone,
      hashed_password,
    ];

    await connection.query(query, userData);

    console.log("User created successfully");
    return res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("Error with hashing or query: " + err);
    return res.status(500).json({ message: "Server error" });
  }
};
