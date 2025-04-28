import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  // console.log("Middleware executed");
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.log("No token found in headers");
    return res.status(401).json({ message: "Token not found" });
  }

  // console.log("Received Token:", token);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // console.log("JWT verification failed:", err);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // console.log("Decoded token:", decoded);

    const user_id = decoded.user_id;

    req.user_id = user_id;
    next();
  });
};
