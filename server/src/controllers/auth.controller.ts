import { z } from "zod";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user";
import jwt from "jsonwebtoken";

const signUpSchema = z.object({
    name: z.string().min(1, { message: "Required" }),
    email: z.string().email({ message: "Invalid Email" }),
    password: z
        .string()
        .min(4, { message: "Password should be at least 4 characters" })
        .max(20, { message: "Password should be at most 20 characters" }),
});

const handleSignUp = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { success, data, error } = signUpSchema.safeParse(body);
        if (!success) {
            res.status(401).json({ msg: error.message });
            return;
        }

        const { name, email, password } = data;
        const user = await UserModel.findOne({ email });
        if (user) {
            res.status(401).json({ msg: "User already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await UserModel.create({
            name: name,
            email: email,
            password: hashedPassword,
        });

        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET as string,
        );
        res.status(200).json({ token: token });
    } catch (err) {
        console.log("Error: ", err);
    }
};

const signInSchema = z.object({
    email: z.string().email({ message: "Invalid Email" }),
    password: z
        .string()
        .min(4, { message: "Password should be atleast 4 characters" })
        .max(20, { message: "Password shoudl be at most 20 characters" }),
});

const handleSignIn = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { success, data, error } = signInSchema.safeParse(body);
        if (!success) {
            res.status(401).json({ msg: error.message });
            return;
        }

        const { email, password } = data;
        const user = await UserModel.findOne({ email });
        if (!user || !user.hashedPassword) {
            res.status(401).json({ msg: "Invalid Credentials" });
            return;
        }

        const validate = await bcrypt.compare(password, user.hashedPassword);
        if (!validate) {
            res.status(401).json({ msg: "Invalid Credentials" });
            return;
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET as string,
        );
        res.status(200).json({ token: token });
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

export { handleSignUp, handleSignIn };
