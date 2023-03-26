import { Response } from "express";
import { Pagination } from "../models/models";

export function SendRes(res: Response, statusCode: number, message: string, data?: any) {
    res.status(statusCode).send({
        code: statusCode,
        message: message,
        data: data
    });
}

export function SendList(res: Response, statusCode: number, message: string, data: any[], pagination:Pagination) {
    res.status(statusCode).send({
        code: statusCode,
        message: message,
        data: data,
        pagination: pagination
    });
}