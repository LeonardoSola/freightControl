import { Request, Response } from "express";
import { OrderModel } from "../../models/order";
import { GetPagination } from "../../utils/tools";
import { SendList } from "../../response/response";

export async function GetAll(req: Request, res: Response) {
    var user = req.user;
    
    var pagination = GetPagination(req.query);

    var orderModels = new OrderModel();

    var cargoId = 0;
    if(req.query.cargoId)
        cargoId = parseInt(req.query.cargoId.toString());

    var clientId = 0;
    if(user.role.name == "client")
        clientId = user.info.id
    else if(req.query.clientId) 
        clientId = parseInt(req.query.clientId.toString());

    var statusId = 0;
    if(req.query.statusId)
        statusId = parseInt(req.query.statusId.toString());

    var originId = 0;
    if(req.query.originId)
        originId = parseInt(req.query.originId.toString());

    var destinationId = 0;
    if(req.query.destinationId)
        destinationId = parseInt(req.query.destinationId.toString());

    var [orders, total] = await orderModels.GetAll(pagination, cargoId, clientId, statusId, originId, destinationId);

    pagination.count = total;

    SendList(res, 200, "Resultados da pesquisa", orders, pagination);
}