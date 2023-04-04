import { City, Path, Truck, User } from "@prisma/client";
import db from "../database/database";
import { Pagination } from "./models";

export class PathModel {
    info: Path = {
        id: 0,
        truckId: 0,
        driverId: 0,
        originId: 0,
        destinyId: 0,
        startTime: new Date(),
        endTime: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    }
    truck: Truck = {
        id: 0,
        model: "",
        plate: "",
        year: 0,
        maxWeight: 0,
        statusId: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    }
    driver: User = {
        id: 0,
        name: "",
        username: "",
        email: "",
        password: "",
        roleId: 0,
        cellphone: "",
        cpfCnpj: "",
        active: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    }
    origin: City = {
        id: 0,
        name: "",
        stateId: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    }
    destiny: City = {
        id: 0,
        name: "",
        stateId: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    }

    constructor(){}

    // Database Methods
    private async find(where:any = {}): Promise<boolean>{
        let info = await db.path.findFirst({
            where
        })

        if(info) {
            this.info = info
            await this.getTruck()
            await this.getDriver()
            await this.getOrigin()
            await this.getDestiny()
            return true
        }

        return false;
    }

    private async getTruck(): Promise<void>{
        let truck = await db.truck.findFirst({
            where: {
                id: this.info.truckId
            }
        })

        if(truck) {
            this.truck = truck
        }
    }

    private async getDriver(): Promise<void>{
        let driver = await db.user.findFirst({
            where: {
                id: this.info.driverId
            }
        })

        if(driver) {
            this.driver = driver
        }
    }

    private async getOrigin(): Promise<void>{
        let origin = await db.city.findFirst({
            where: {
                id: this.info.originId
            }
        })

        if(origin) {
            this.origin = origin
        }
    }

    private async getDestiny(): Promise<void>{
        let destiny = await db.city.findFirst({
            where: {
                id: this.info.destinyId
            }
        })

        if(destiny) {
            this.destiny = destiny
        }
    }

    private async findAll(pag:Pagination, where:any = {}): Promise<[Path[], number]>{
        var types = await db.path.findMany({
            where,
            skip: pag.offset,
            take: pag.limit,
            include: {
                truck: true,
                driver: true,
                origin: true,
                destiny: true
            }
        })

        var count = await db.path.count({where})

        return [types, count];
    }

    private async create(): Promise<boolean>{
        try {
            let path = await db.path.create({
                data: this.info
            })

            if(path) {
                this.info = path
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    private async update(): Promise<boolean>{
        try {
            let path = await db.path.update({
                where: {
                    id: this.info.id
                },
                data: this.info
            })

            if(path) {
                this.info = path
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    private async delete(): Promise<boolean>{
        try {
            let path = await db.path.delete({
                where: {
                    id: this.info.id
                }
            })

            if(path) {
                this.info = path
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // Methods
    public async GetAll(truckId:number, driverId:number, originId:number, destinyId:number, search:string, pag:Pagination): Promise<[Path[], number]>{
        let where:any = {}
        if(truckId) where.truckId = truckId
        if(driverId) where.driverId = driverId
        if(originId) where.originId = originId
        if(destinyId) where.destinyId = destinyId
        if(search) where.OR = [
            {truck: {model: {contains: search}}},
            {truck: {plate: {contains: search}}},
            {driver: {name: {contains: search}}},
            {driver: {username: {contains: search}}},
            {driver: {email: {contains: search}}},
            {driver: {cpfCnpj: {contains: search}}},
            {origin: {name: {contains: search}}},
            {destiny: {name: {contains: search}}},
        ]

        return await this.findAll(pag, where)
    }

    public async Get(id:number): Promise<boolean>{
        return await this.find({id})
    }

    public async Create(): Promise<boolean>{
        return await this.create()
    }

    public async Update(): Promise<boolean>{
        return await this.update()
    }

    public async Delete(): Promise<boolean>{
        return await this.delete()
    }

    public async SetPathBody(body:any): Promise<boolean>{
        this.info = {
            id: body.id,
            truckId: body.truckId,
            driverId: body.driverId,
            originId: body.originId,
            destinyId: body.destinyId,
            startTime: body.startTime,
            endTime: body.endTime,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
        return true
    }

    public async UpdatePathBody(body:any): Promise<boolean>{
        if(body.truckId) this.info.truckId = body.truckId
        if(body.driverId) this.info.driverId = body.driverId
        if(body.originId) this.info.originId = body.originId
        if(body.destinyId) this.info.destinyId = body.destinyId
        if(body.startTime) this.info.startTime = body.startTime
        if(body.endTime) this.info.endTime = body.endTime

        return true
    }
}