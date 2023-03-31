import { Request, Response } from "express";
import UserModel from "../../models/user";
import { SendRes } from "../../response/response";
import AuthService from "../../auth/auth";

export async function Login(req: Request, res: Response) {
    var user = new UserModel();

    if(String(req.body.username).includes("@"))
    await user.SearchByEmail(req.body.username);
    else await user.SearchByUsername(req.body.username);

    if(user.info.id == 0) {
        return SendRes(res, 400, "Usuário não encontrado");
    }

    if(!user.ComparePassword(req.body.password)) {
        return SendRes(res, 400, "Senha incorreta");
    }

    if(!user.info.active) {
        return SendRes(res, 400, "Usuário inativo");
    }

    var token = AuthService.GenerateToken(user.info.id)

    SendRes(res, 200, "Login efetuado com sucesso", { token, role:user.role.name });
}

export async function Register(req: Request, res: Response) {
    var newUser = new UserModel();
    newUser.setUser(req.body);
    var err = newUser.ValidateUser();

    if(err != "") 
    return SendRes(res, 400, err);

    newUser.SetPassword(newUser.info.password);

    var foundUser = new UserModel();
    if(await foundUser.SearchByCPF(newUser.info.cpf)) {
        return SendRes(res, 400, "CPF já cadastrado");
    }

    if(await foundUser.SearchByEmail(newUser.info.email)) {
        return SendRes(res, 400, "Email já cadastrado");
    }

    if(await foundUser.SearchByUsername(newUser.info.username)) {
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