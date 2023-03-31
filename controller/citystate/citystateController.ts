import { Request, response, Response } from "express";
import { CityModel, StateModel } from "../../models/city-state";
import { SendList } from "../../response/response";
import { GetPagination } from "../../utils/tools";

export async function GetAllCity(req: Request, res: Response) {
    var city = new CityModel

    var pagination = GetPagination(req.query)

    var search = ""
    if(req.query.search)
        search = req.query.search.toString()

    var stateId = 0
    if(req.query.stateId)
        stateId = parseInt(req.query.stateId.toString())
    
    var cities = await city.GetAll(stateId, pagination, search)

    SendList(res, 200, "Resultados da pesquisa", cities, pagination)
}

export async function GetAllState(req: Request, res: Response) {
    var state = new StateModel

    var pagination = GetPagination(req.query)

    var search = ""
    if(req.query.search)
        search = req.query.search.toString()

    var states = await state.GetAll(pagination, search)

    SendList(res, 200, "Resultados da pesquisa", states, pagination)
}