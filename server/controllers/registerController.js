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
    console.log(
      `data invalid ${newUser.userName} ${newUser.email} ${newUser.password}`
    );
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    if (UserModel.validateEmail(newUser.email)) {
      console.log("Email is incorrect");
      return res.status(400).json({message: "400"});
    }

    const [existingUsers] = await connection.query(
      "select * from Users where email = ?",
      newUser.email
    );

    if (existingUsers.length > 0) {
      console.log("User already exists");
      return res.status(409).json({ message: "Email вже зареєстровано" });
    }

    const [existingPhone] = await connection.query(
      "select * from Users where phone = ?",
      newUser.phone
    );

    if (existingPhone.length > 0) {
      console.log("User with his phone already exists");
      return res.status(409).json({ message: "Phone вже зареєстровано" });
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

    await connection.execute(query, userData);

    console.log("User created");
    return res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("Error with hashing or query: " + err);
    return res.status(500).json({ message: "Server error" });
  }
};
