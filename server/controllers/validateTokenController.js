import connection from "../db_config.js";

export function validateToken(req, res) {

  const id = req.user_id;

  try {
    const query = "select * from users where user_id = ?";
    connection.query(query, [id], (err, result) => {
      if (err) {
        console.log("SQL server error");
        return res.status(500).json({ message: "SQL server error" });
      }

      if (result.length === 0) {
        console.log("User not found");
        return res.status(404).json({ message: "User not found" });
      }

      const user = {
        firstName: result.firstname,
        secondName: result.secondname,
        email: result.email,
        phone: result.phone,
      };

      return res.status(200).json({ message: "User found", user: user });
    });
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
}
