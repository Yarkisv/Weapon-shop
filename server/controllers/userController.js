import connection from "../db_config.js";

export const getUser = (req, res) => {
  const id = req.user_id;
  const query = "select * from users where user_id = ?";

  try {
    connection.query(query, [id], (err, result) => {
      if (err) {
        console.log("Server error: " + err);
        return res.status(500).json({ message: "Server error" });
      }

      if (result.length === 0) {
        console.log("User not found");
        return res.status(404).json({ message: "User not found" });
      }

      const user = result[0];

      const userData = {
        user_id: user.user_id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
      };
      
      return res.status(200).json({ user: result[0], message: "User found" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
