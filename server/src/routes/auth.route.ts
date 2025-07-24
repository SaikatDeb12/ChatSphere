import express from "express";
import { handleSignIn, handleSignUp } from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";
import { handleProtectedRoute } from "../controllers/protectedRoute";
export const router = express.Router();

router.post("/signin", handleSignIn);
router.post("/signup", handleSignUp);
router.get("/home", authMiddleware, handleProtectedRoute);
