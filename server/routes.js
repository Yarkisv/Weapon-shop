import express from "express";
import { regUser } from "./controllers/registerController.js";
import { loginUser } from "./controllers/loginController.js";
import { getUser } from "./controllers/userController.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
// import { getAllWeapons } from "./controllers/catalogConroller.js";
import { getCatalog } from "./controllers/catalogConroller.js";
import { getProductByName } from "./controllers/catalogConroller.js";

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

router.get("/catalog", (req, res) => {
  getCatalog(req, res);
});

router.get("/product/:name", (req, res) => {
  getProductByName(req, res);
});

export default router;
