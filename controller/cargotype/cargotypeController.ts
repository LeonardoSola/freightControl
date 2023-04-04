import { Request, Response } from "express";
import { CargoTypeModel } from "../../models/cargo";
import { SendList, SendRes } from "../../response/response";
import { GetPagination } from "../../utils/tools";

export async function GetAll(req:Request, res:Response){
    var pagination = GetPagination(req.query);

    var cargoType = new CargoTypeModel();

    var search = "";
    if(req.query.search)
        search = req.query.search.toString();

    var [cargoTypes, total] = await cargoType.GetAll(search, pagination);
    pagination.count = total;

    SendList(res, 200, "Resultados da pesquisa", cargoTypes, pagination);
}

export async function Get(req:Request, res:Response){
    var cargoType = new CargoTypeModel();

    if(!await cargoType.SearchById(parseInt(req.params.id)))
        return SendRes(res, 400, "Tipo de carga não encontrado");

    SendRes(res, 200, "Tipo de carga encontrado", cargoType);
}

export async function Create(req:Request, res:Response){
    var cargoType = new CargoTypeModel();

    delete req.body.id;
    cargoType.SetCargoTypeBody(req.body);

    if(!await cargoType.Create())
        return SendRes(res, 500, "Erro ao criar tipo de carga");

    else SendRes(res, 200, "Tipo de carga criado com sucesso");
}

export async function Update(req:Request, res:Response){
    var cargoType = new CargoTypeModel();

    if(!await cargoType.SearchById(parseInt(req.params.id)))
        return SendRes(res, 400, "Tipo de carga não encontrado");

    cargoType.UpdateCargoTypeBody(req.body);

    SendRes(res, 200, "Tipo de carga atualizado com sucesso", cargoType);
}

export async function Delete(req:Request, res:Response){
    var cargoType = new CargoTypeModel();

    if(!await cargoType.SearchById(parseInt(req.params.id)))
        return SendRes(res, 400, "Tipo de carga não encontrado");

    if(!await cargoType.Remove())
        return SendRes(res, 500, "Erro ao deletar tipo de carga");

    SendRes(res, 200, "Tipo de carga deletado com sucesso");
}