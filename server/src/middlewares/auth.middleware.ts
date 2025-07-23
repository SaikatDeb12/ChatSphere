import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

interface JWTPayload {
    userId: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(404).json({ msg: "Token not found" });
            return;
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string,
        ) as JWTPayload;
        if (!decoded) {
            res.status(400).json({ msg: "Invalid Token" });
            return;
        }

        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.log("Error: ", err);
    }
};

export default authMiddleware;
