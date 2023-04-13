import { Stop } from "@prisma/client";
import db from "../database/database";

export class StopModel{
    info: Stop = {
        id: 0,
        pathId: 0,
        order: 0,
        cityId: 0,
        time: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    }
    infoArray: Stop[] = []
    pathId: number = 0

    constructor(){}

    // Database Methods
    private async findAll(where:any = {}): Promise<boolean>{
        let info = await db.stop.findMany({
            where
        })

        if(info) {
            this.infoArray = info
            return true
        }

        return false;
    }

    private async findOne(where:any = {}): Promise<boolean>{
        let info = await db.stop.findFirst({
            where
        })

        if(info) {
            this.info = info
            return true
        }
        
        return false;
    }

    private async update(): Promise<boolean>{
        var del = await db.stop.deleteMany({
            where: {
                pathId: this.pathId,
                time: null
            }
        })

        console.log("this.pathId", this.pathId)
        console.log("del", del)

        let info = await db.stop.createMany({
            data: this.infoArray
        })

        console.log("info", info)

        if(info) {
            return true
        }

        return false;
    }

    private async deleteAll(where:any = {}): Promise<boolean>{
        let info = await db.stop.deleteMany({
            where
        })

        if(info) {
            return true
        }

        return false;
    }

    // Model Methods
    public async GetAll(): Promise<boolean>{
        var where = {
            pathId: this.pathId
        }

        return await this.findAll()
    }

    public UpdateBody(body: any): boolean{
        var stops = body?.stops

        if(!stops)
            return false
            
        for(let s of stops as Array<any>){
            this.infoArray.push({
                id: s.id,
                cityId: s.cityId,
                order: s.order,
                pathId: this.pathId,
                time: null,
                createdAt: new Date(),
                deletedAt: null,
                updatedAt: new Date(),
            } as Stop)
        }

        return true
    }

    public async UpdateStops(): Promise<boolean>{
        if(this.pathId == 0) throw new Error("PathId not setted")
        return await this.update()
    }

    public async Get(id: number): Promise<boolean>{
        var where = {
            id
        }

        return await this.findOne(where)
    }

    public async ClockIn(): Promise<boolean>{
        var where = {
            id: this.info.id
        }

        var info = await db.stop.update({
            where,
            data: {
                time: new Date()
            }
        })

        if(info) {
            this.info = info
            return true
        }

        return false;
    }
}