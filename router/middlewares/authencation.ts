import { Request, Response, NextFunction } from "express";
import auth from "../../auth/auth";
import UserModel from "../../models/user";

export async function Authentication(req: Request, res: Response, next: NextFunction) {
    var token = req.headers['authorization'];

    if(!token) 
        return res.status(401).json({ message: "Unauthorized" });
    
    if(!token.includes("Bearer "))
        return res.status(401).json({ message: "Unauthorized" });

    token = token.replace("Bearer ", "");

    var id = await auth.DecodeToken(token)
    if(!id)
        return res.status(401).json({ message: "Unauthorized" });

    req.user = new UserModel();
    if(!await req.user.SearchById(id))
        return res.status(401).json({ message: "Unauthorized" });

    next();
}