import { Request, Response } from "express";
import { GetPagination } from "../../utils/tools";
import { CargoModel } from "../../models/cargo";
import { SendList, SendRes } from "../../response/response";

export async function GetAll(req:Request, res: Response) {
    var pagination = GetPagination(req.query);

    var cargoModels = new CargoModel();

    var type = "";
    if(req.query.type)
        type = req.query.type.toString();

    var typeId = 0;
    typeId = parseInt(type);


    var search = "";
    if(req.query.search)
        search = req.query.search.toString();

    var [cargos, total] = await cargoModels.GetAll(typeId, search, pagination)

    pagination.count = total;

    SendList(res, 200, "Resultados da pesquisa", cargos, pagination)
}

export async function Get(req: Request, res: Response) {
    var cargoModels = new CargoModel();

    if(!await cargoModels.SearchById(parseInt(req.params.id)))
        return SendRes(res, 400, "Carga não encontrada");

    SendRes(res, 200, "Carga encontrada", cargoModels);
}

export async function Create(req: Request, res: Response) {
    var cargoModels = new CargoModel();
    
    delete req.body.id;
    cargoModels.SetCargoBody(req.body);

    if(!await cargoModels.Create())
        return SendRes(res, 500, "Erro ao criar carga");

    else SendRes(res, 200, "Carga criada com sucesso");
}

export async function Update(req: Request, res: Response) {
    var cargoModels = new CargoModel();

    if(!await cargoModels.SearchById(parseInt(req.params.id)))
        return SendRes(res, 400, "Carga não encontrada");

    cargoModels.UpdateCargoBody(req.body);

    SendRes(res, 200, "Carga atualizada com sucesso", cargoModels);
}

export async function Delete(req: Request, res: Response) {
    var cargoModels = new CargoModel();

    if(!await cargoModels.SearchById(parseInt(req.params.id)))
        return SendRes(res, 400, "Carga não encontrada");

    cargoModels.Remove();

    SendRes(res, 200, "Carga deletada com sucesso");
}