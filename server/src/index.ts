import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./connectDb";
import cors from "cors";
import { authRouter, chatRouter } from "./routes/auth.route";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

connectToDB();
const port = process.env.PORT || 8000;
app.use("/auth", authRouter);

app.listen(port, () => console.log(`Server started at ${port}`));
