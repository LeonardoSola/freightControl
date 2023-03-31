import { Request, Response, NextFunction } from "express";
import auth from "../../auth/auth";
import UserModel from "../../models/user";


export function Authentication(role: string[] = []): Function {
    return async function (req: Request, res: Response, next: NextFunction) {
        var token = req.headers['authorization'];

        if(!token) 
            return res.status(401).json({ message: "Não autorizado" });
        
        if(!token.includes("Bearer "))
            return res.status(401).json({ message: "Não autorizado" });

        token = token.replace("Bearer ", "");

        var id = await auth.DecodeToken(token)
        if(!id)
            return res.status(401).json({ message: "Não autorizado" });

        // Busca o usuario
        req.user = new UserModel();
        if(!await req.user.SearchById(id))
            return res.status(401).json({ message: "Não autorizado" });

        // Verificação de cargo
        if(role.length > 0){
            if (!role.includes(req.user.role.name)) {
                return res.status(401).json({ message: "Não autorizado" });
            }
        }

        next();
    }
}