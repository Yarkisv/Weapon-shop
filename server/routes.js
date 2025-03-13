import express from 'express'
import RegUser from './controllers/registerController.js';

const router = express.Router();

router.post("/register", (req, res) => {
    RegUser(req, res);
});

export default router;