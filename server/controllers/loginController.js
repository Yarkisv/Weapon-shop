import connection from "../db_config.js";
import { UserModel } from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Invalid data");
    return res.status(400).json({ message: "Invalid data" });
  }

  if (UserModel.validateEmail(email)) {
    console.error("Email is incorrect");
    return res.status(401).json({ message: "Email is incorrect" });
  }

  // if (!UserModel.validatePassword(password)) {
  //   console.error("Password must be more than 8 and less than 30 symbols");
  //   return res.status(401).json({
  //     message: "Password must be more than 8 and less than 30 symbols",
  //   });
  // }

  try {
    const query = "select * from users where email = ?";

    connection.query(query, [email], async (err, result) => {
      if (err) {
        console.error("SQL query error: " + err);
        return res.status(500).json({ message: "SQL query invalid" });
      }

      if (result.length === 0) {
        console.error("User not found");
        return res.status(404).json({ message: "User not found" });
      }

      const user = result[0];

      const isPassExists = await bcrypt.compare(password, user.hashed_password);

      if (!isPassExists) {
        console.error("Wrong password");
        return res.status(401).json({ message: "Wrong password" });
      }

      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      console.log("User found, login successful");

      return res.status(200).json({
        message: "Login successful",
        token,
        isAuth: true,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
