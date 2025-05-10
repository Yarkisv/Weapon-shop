import { connection } from "../db_config.js";
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

  try {
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    const isPasswordMatch = await bcrypt.compare(
      password,
      user.hashed_password
    );

    if (!isPasswordMatch) {
      console.error("Wrong password");
      return res.status(401).json({ message: "Wrong password" });
    }

    const payload = {
      user_id: user.user_id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    console.log("User found, login successful");

    return res.status(200).json({
      message: "Login successful",
      token,
      user: payload,
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
