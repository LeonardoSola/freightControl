import { User } from "@prisma/client";
import { Request, Response } from "express";
import UserModel from "../../models/user";
import { SendRes } from "../../response/response";
import { ValidCPF } from "../../utils/tools";

export function Login(req: Request, res: Response) {
    console.log(req.body);
    
    res.send("Login");
}

export async function Register(req: Request, res: Response) {
    var newUser = new UserModel();
    newUser.setUser(req.body);
    var err = newUser.ValidateUser();

    if(err != "") 
    return SendRes(res, 400, err);

    newUser.SetPassword(newUser.user.password);

    var foundUser = new UserModel();
    if(await foundUser.SearchByCPF(newUser.user.cpf)) {
        return SendRes(res, 400, "CPF já cadastrado");
    }

    if(await foundUser.SearchByEmail(newUser.user.email)) {
        return SendRes(res, 400, "Email já cadastrado");
    }

    if(await foundUser.SearchByUsername(newUser.user.username)) {
        return SendRes(res, 400, "Username já cadastrado");
    }

    if(!await newUser.SetRole("client")) {
        return SendRes(res, 500, "Erro ao definir função do usuário");
    }

    if(await newUser.Create()) {
        SendRes(res, 200, "Usuário criado com sucesso");
    } else {
        SendRes(res, 500, "Erro ao criar usuário");
    }
}