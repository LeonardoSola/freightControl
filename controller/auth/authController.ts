import { Request, Response } from "express";

export function Login(req: Request, res: Response) {
    console.log(req.body);
    
    res.send("Login");
}