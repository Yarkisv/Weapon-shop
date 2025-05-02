import express from "express";
import { regUser } from "./controllers/registerController.js";
import { loginUser } from "./controllers/loginController.js";
import { getUser } from "./controllers/userController.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { getCatalog } from "./controllers/catalogConroller.js";
import { getProductByName } from "./controllers/catalogConroller.js";
import { createOrder } from "./controllers/orderController.js";
import { getOrders } from "./controllers/getOrdersContorller.js";
import { validateToken } from "./controllers/validateTokenController.js";
import { searchProducts } from "./controllers/searchController.js";

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

router.get("/catalog/:category", (req, res) => {
  getCatalog(req, res);
});

router.get("/catalog/:category/:name", (req, res) => {
  getProductByName(req, res);
});

router.post("/order", (req, res) => {
  createOrder(req, res);
});

router.get("/orders", authMiddleware, (req, res) => {
  getOrders(req, res);
});

router.get("/auth/validate", authMiddleware, (req, res) => {
  validateToken(req, res);
});

router.get("/search/:query", (req, res) => {
  searchProducts(req, res);
});

export default router;
