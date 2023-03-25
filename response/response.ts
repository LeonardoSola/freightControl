import { Response } from "express";

export function SendRes(res: Response, statusCode: number, message: string, data?: any) {
    res.status(statusCode).send({
        code: statusCode,
        message: message,
        data: data
    });
}