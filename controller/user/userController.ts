import { Request, Response } from "express";
import { Pagination } from "../../models/models";
import UserModel from "../../models/user";
import { SendList, SendRes } from "../../response/response";
import * as tools from "../../utils/tools";

export async function GetAll(req: Request, res: Response) {
    var user = new UserModel();

    var pagin = tools.GetPagination(req.query);

    var search = ""
    if(req.query.search)
        search = req.query.search.toString();

    var [users, count] = await user.GetAll(pagin, search);

    pagin.count = count;

    SendList(res, 200, "Resultados da pesquisa", users, pagin);
}

export async function Get(req: Request, res: Response) {
    var user = new UserModel();
    
    if(!await user.SearchById(parseInt(req.params.id)))
        return SendRes(res, 400, "Usuário não encontrado");

    SendRes(res, 200, "Usuário encontrado", user);
}

export async function Create(req: Request, res: Response) {
    var newUser = new UserModel();
    newUser.setUser(req.body);

    var err = newUser.ValidateUser(true);
    if(err != "")
        return SendRes(res, 400, err);

    newUser.SetPassword(newUser.info.password);

    var foundUser = new UserModel();
    if(await foundUser.SearchByCPF(newUser.info.cpf)) 
        return SendRes(res, 400, "CPF já cadastrado");

    if(await foundUser.SearchByEmail(newUser.info.email))
        return SendRes(res, 400, "Email já cadastrado");

    if(await foundUser.SearchByUsername(newUser.info.username))
        return SendRes(res, 400, "Username já cadastrado");

    console.log("Aqui 1");
    
    if(!await newUser.SetRoleById(req.body.role))

    console.log("Aqui 2");

    if(!await newUser.Create())
        return SendRes(res, 500, "Erro ao criar usuário");
        else SendRes(res, 200, "Usuário criado com sucesso");
}

export async function Update(req: Request, res: Response) {
    var user = new UserModel();
    var oldUser = new UserModel();

    if(!await oldUser.SearchById(parseInt(req.params.id)))
        return SendRes(res, 400, "Usuário não encontrado");

    user.setUser(req.body);
    
    var err = user.ValidateUser();
    if(err != "")
        return SendRes(res, 400, err);

    if(req.body.password)
        user.SetPassword(req.body.password)
    else user.info.password = oldUser.info.password;

    if(!await user.Update())
        return SendRes(res, 500, "Erro ao atualizar usuário");

    SendRes(res, 200, "Usuário atualizado com sucesso", user);
}

export async function Delete(req: Request, res: Response) {
    var user = new UserModel();

    if(!await user.SearchById(parseInt(req.params.id)))
        return SendRes(res, 400, "Usuário não encontrado");

    if(!await user.Delete())
        return SendRes(res, 500, "Erro ao deletar usuário");

    SendRes(res, 200, "Usuário deletado com sucesso");
}