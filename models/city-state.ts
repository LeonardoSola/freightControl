import { City, State } from "@prisma/client";
import db from "../database/database";
import { Pagination } from "./models";
import { emptyCity, emptyState } from "./emptyModels";

export class CityModel{
    info: City = emptyCity

    public async GetAll(stateId:number, pagination: Pagination, search: string = ""): Promise<City[]> {
        var result: City[] = [];

        search = search.toLowerCase()
        var where:{name:any, stateId?:number} = {
            name: { contains: search }
        }

        if (stateId > 0) {
            where.stateId = stateId
        }

        var result = await db.city.findMany({
            where,
            skip: pagination.offset,
            take: pagination.limit,
        })

        return result
    }
}

export class StateModel{
    info: State = emptyState

    public async GetAll(pagination: Pagination, search: string = ""): Promise<State[]> {
        var result: State[] = [];

        search = search.toLowerCase()

        var result = await db.state.findMany({
            where: {
                name: { contains: search }
            },
            skip: pagination.offset,
            take: pagination.limit,
        })

        return result
    }
}