import express from "express";
import { handleSignIn, handleSignUp } from "../controllers/auth.controller";
const router = express.Router();

router.post("/signin", handleSignIn);
router.post("/signup", handleSignUp);
