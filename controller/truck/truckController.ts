import { Request, Response } from "express";
import { GetPagination } from "../../utils/tools";
import { TruckModel } from "../../models/truck";
import { SendList } from "../../response/response";

export async function GetAll(req: Request, res: Response) {
    var pagination = GetPagination(req.query);

    var truckModels = new TruckModel();

    var status = "";
    if(req.query.status) 
        status = req.query.status.toString();
    statusId = parseInt(status);

    var statusId = 0;
    statusId = parseInt(status);

    var search = "";
    if(req.query.search)
        search = req.query.search.toString();

    var [trucks, total] = await truckModels.GetAll(statusId, search, pagination)

    pagination.count = total;

    SendList(res, 200, "Resultados da pesquisa", trucks, pagination)
}

export function Get(req: Request, res: Response) {
    
}

export function Create(req: Request, res: Response) {
    
}

export function Update(req: Request, res: Response) {
    
}

export function Delete(req: Request, res: Response) {
    
}