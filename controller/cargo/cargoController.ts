import { Request, Response } from "express";
import { GetPagination } from "../../utils/tools";
import { TruckModel } from "../../models/truck";
import { SendList, SendRes } from "../../response/response";

export async function GetAll(req:Request, res: Response) {
    var pagination = GetPagination(req.query);

    var truckModels = new TruckModel();

    var status = "";
    if(req.query.status)
        status = req.query.status.toString();

    var statusId = 0;
    statusId = parseInt(status);


    var search = "";
    if(req.query.search)
        search = req.query.search.toString();

    var [trucks, total] = await truckModels.GetAll(statusId, search, pagination)

    pagination.count = total;

    SendList(res, 200, "Resultados da pesquisa", trucks, pagination)
}

export async function Get(req: Request, res: Response) {
    var truckModels = new TruckModel();

    if(!await truckModels.SearchById(parseInt(req.params.id)))
        return SendRes(res, 400, "Caminhão não encontrado");

    SendRes(res, 200, "Caminhão encontrado", truckModels);
}

export async function Create(req: Request, res: Response) {
    var truckModels = new TruckModel();
    truckModels.SetTruckBody(req.body);

    if(!await truckModels.Create())
        return SendRes(res, 500, "Erro ao criar caminhão");

    else SendRes(res, 200, "Caminhão criado com sucesso");
}

export async function Update(req: Request, res: Response) {
    var truckModels = new TruckModel();

    if(!await truckModels.SearchById(parseInt(req.params.id)))
        return SendRes(res, 400, "Caminhão não encontrado");

    truckModels.UpdateTruckBody(req.body);

    SendRes(res, 200, "Caminhão atualizado com sucesso", truckModels);
}

export async function Delete(req: Request, res: Response) {
    var truckModels = new TruckModel();

    if(!await truckModels.SearchById(parseInt(req.params.id)))
        return SendRes(res, 400, "Caminhão não encontrado");

    truckModels.Delete();

    SendRes(res, 200, "Caminhão deletado com sucesso");
}