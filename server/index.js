import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes.js";

dotenv.config();

const PORT = process.env.SERVER_PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
