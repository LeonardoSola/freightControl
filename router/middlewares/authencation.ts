import { Request, Response, NextFunction } from "express";

export function Authentication(req: Request, res: Response, next: NextFunction) {
    next();
}