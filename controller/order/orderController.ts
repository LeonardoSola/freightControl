import { Request, Response } from "express";
import { OrderModel } from "../../models/order";
import { GetPagination } from "../../utils/tools";
import { SendList, SendRes } from "../../response/response";

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


export async function GetById(req: Request, res: Response) {
    var id = parseInt(req.params.id);

    var orderModels = new OrderModel();
    if(!await orderModels.SearchById(id))
        return res.status(404).json({ message: "Pedido não encontrado" });

    if(req.user.role.name != "administrator" && req.user.info.id != orderModels.info.clientId)
        return res.status(401).json({ message: "Não autorizado" });

    SendRes(res, 200, "Pedido encontrado", orderModels.info);
}

export async function Create(req: Request, res: Response) {
    var user = req.user;
    var orderModels = new OrderModel();

    orderModels.info = req.body;
    orderModels.info.clientId = user.info.id;

    if(!await orderModels.Create())
        return res.status(400).json({ message: "Não foi possivel criar o pedido" });

    SendRes(res, 200, "Pedido criado", orderModels.info);
}

export async function Update(req: Request, res: Response) {
    var id = parseInt(req.params.id);

    var orderModels = new OrderModel();
    if(!await orderModels.SearchById(id))
        return res.status(404).json({ message: "Pedido não encontrado" });

    if(req.user.role.name != "administrator" && req.user.info.id != orderModels.info.clientId)
        return res.status(401).json({ message: "Não autorizado" });

    orderModels.info = req.body;

    if(!await orderModels.Update())
        return res.status(400).json({ message: "Não foi possivel atualizar o pedido" });

    SendRes(res, 200, "Pedido atualizado", orderModels.info);
}

export async function Delete(req: Request, res: Response) {
    var id = parseInt(req.params.id);

    var orderModels = new OrderModel();
    if(!await orderModels.SearchById(id))
        return res.status(404).json({ message: "Pedido não encontrado" });

    if(req.user.role.name != "administrator" && req.user.info.id != orderModels.info.clientId)
        return res.status(401).json({ message: "Não autorizado" });

    if(!await orderModels.Delete())
        return res.status(400).json({ message: "Não foi possivel deletar o pedido" });

    SendRes(res, 200, "Pedido deletado", orderModels.info);
}