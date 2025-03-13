import express from "express";
import regUser from "./controllers/registerController.js";
import loginUser from "./controllers/loginController.js";

const router = express.Router();

router.post("/register", (req, res) => {
  regUser(req, res);
});

router.post("/login", (req, res) => {
  loginUser(req, res);
});

export default router;
