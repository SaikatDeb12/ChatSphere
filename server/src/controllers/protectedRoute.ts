import { Request, Response } from "express";
export const handleProtectedRoute = (req: Request, res: Response) => {
    res.status(200).json({ msg: "welcome" });
};
