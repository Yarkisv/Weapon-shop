import { connection } from "../db_config.js";

export const getUser = async (req, res) => {
  const id = req.user_id;
  const query = "SELECT * FROM users WHERE user_id = ?";

  try {
    const [rows] = await connection.query(query, [id]);

    if (rows.length === 0) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0];
    const userData = {
      user_id: user.user_id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    };

    return res.status(200).json({ user: userData, message: "User found" });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
