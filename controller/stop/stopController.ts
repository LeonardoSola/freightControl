import { Request, Response } from "express";
import { PathModel } from "../../models/path";
import { SendRes } from "../../response/response";
import { StopModel } from "../../models/stop";

export async function ClockIn(req: Request, res: Response){
	var stop = new StopModel();
	
	await stop.Get(parseInt(req.params.id))
	
	if(!stop.info.id)
		return SendRes(res, 400, "Parada não encontrada");

	var path = new PathModel();

	await path.Get(stop.info.pathId)

	if(path.info.driverId != req.user.info.id)
		return SendRes(res, 400, "Você não é o motorista deste caminho");

	if(!await stop.ClockIn())
		return SendRes(res, 500, "Erro ao atualizar caminho");
	else SendRes(res, 200, "Caminho atualizado com sucesso");
}