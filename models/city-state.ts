import { City, State } from "@prisma/client";
import db from "../database/database";
import { Pagination } from "./models";

export class CityModel{
    info: City = {
        id: 0,
        name: "",
        stateId: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    }

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
    info: State = {
        id: 0,
        name: "",
        uf: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    }

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