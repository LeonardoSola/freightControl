import { NextFunction, Request, Response } from "express";

export type Route = {
    URI: string;
    method: string;
    handler: (req: Request, res: Response, next: NextFunction) => void;
    Auth: boolean;
}