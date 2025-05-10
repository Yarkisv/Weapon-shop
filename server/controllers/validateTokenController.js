import { connection } from "../db_config.js";

export async function validateToken(req, res) {
  const id = req.user_id;

  try {
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE user_id = ?",
      [id]
    );

    if (rows.length === 0) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];

    const userData = {
      firstName: user.firstname,
      secondName: user.secondname,
      email: user.email,
      phone: user.phone,
    };

    return res.status(200).json({ message: "User found", user: userData });
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
}
