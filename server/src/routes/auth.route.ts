import express from "express";
import { handleSignIn, handleSignUp } from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { handleProtectedRoute } from "../controllers/protectedRoute";
import getAllUsers from "../controllers/users.controller";
export const authRouter = express.Router();
export const chatRouter = express.Router();

authRouter.post("/signin", handleSignIn);
authRouter.post("/signup", handleSignUp);
authRouter.get("/home", authMiddleware, handleProtectedRoute);

authRouter.get("/bulk", authMiddleware, getAllUsers);
