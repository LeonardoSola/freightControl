import { Request, Response } from "express";
import { PathModel } from "../../models/path";
import { GetPagination } from "../../utils/tools";
import { SendList, SendRes } from "../../response/response";

export async function GetAll(req: Request, res: Response) {
    var pagination = GetPagination(req.query);

    var pathModels = new PathModel();

    var truckId = 0;
    if(req.query.truckId)
        truckId = parseInt(req.query.truckId.toString());

    var driverId = 0;
    if(req.query.driverId)
        driverId = parseInt(req.query.driverId.toString());

    var originId = 0;
    if(req.query.originId)
        originId = parseInt(req.query.originId.toString());

    var destinyId = 0;
    if(req.query.destinyId)
        destinyId = parseInt(req.query.destinyId.toString());

    var search = "";
    if(req.query.search)
        search = req.query.search.toString();

    var [paths, total] = await pathModels.GetAll(truckId, driverId, originId, destinyId, search, pagination)

    pagination.count = total;

    SendList(res, 200, "Resultados da pesquisa", paths, pagination)
}

export async function Get(req: Request, res: Response) {
    var pathModels = new PathModel();

    if(!await pathModels.Get(parseInt(req.params.id)))
        return SendRes(res, 400, "Caminho não encontrado");

    SendRes(res, 200, "Caminho encontrado", pathModels);
}

export async function Create(req: Request, res: Response) {
    var pathModels = new PathModel();
    
    delete req.body.id;
    pathModels.SetPathBody(req.body);

    if(!await pathModels.Create())
        return SendRes(res, 500, "Erro ao criar caminho");
    else SendRes(res, 200, "Caminho criado com sucesso");
}

export async function Update(req: Request, res: Response) {
    var pathModels = new PathModel();

    if(!await pathModels.Get(parseInt(req.params.id)))
        return SendRes(res, 400, "Caminho não encontrado");

    pathModels.UpdatePathBody(req.body);

    if(!await pathModels.Update())
        return SendRes(res, 500, "Erro ao atualizar caminho");

    SendRes(res, 200, "Caminho atualizado com sucesso", pathModels);
}

export async function Delete(req: Request, res: Response) {
    var pathModels = new PathModel();

    if(!await pathModels.Get(parseInt(req.params.id)))
        return SendRes(res, 400, "Caminho não encontrado");

    if(!await pathModels.Delete())
        return SendRes(res, 500, "Erro ao deletar caminho");

    SendRes(res, 200, "Caminho deletado com sucesso");
}