import express from "express";
import { regUser } from "./controllers/registerController.js";
import { loginUser } from "./controllers/loginController.js";
import { getUser } from "./controllers/userController.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", (req, res) => {
  regUser(req, res);
});

router.post("/login", (req, res) => {
  loginUser(req, res);
});

router.get("/profile", authMiddleware, (req, res) => {
  getUser(req, res);
});

export default router;
