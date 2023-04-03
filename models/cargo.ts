import { Cargo, CargoType } from "@prisma/client";;
import { Pagination } from "./models";
import db from "../database/database";

export class CargoModel {
    info: Cargo = {
        id: 0,
        name: "",
        weight: 0,
        sizeX: 0,
        sizeY: 0,
        sizeZ: 0,
        typeId: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    }
    type: CargoType = {
        id: 0,
        name: "",
        price: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    }

    constructor(){}

    // Database Methods
    private async find(where:any = {}): Promise<boolean>{
        let info = await db.cargo.findFirst({
            where
        })

        if(info) {
            this.info = info
            await this.getType()
            return true
        }

        return false;
    }

    private async findAll(pag:Pagination, where:any = {}): Promise<[Cargo[], number]>{
        var trucks = await db.cargo.findMany({
            where,
            skip: pag.offset,
            take: pag.limit,
        })

        var count = await db.cargo.count({where})

        return [trucks, count];
    }

    private async getType(): Promise<void>{
        let type = await db.cargoType.findFirst({
            where: {
                id: this.info.typeId
            }
        })

        if(type) this.type = type
    }

    private async create(): Promise<boolean>{
        try {
            let cargo = await db.cargo.create({
                data: this.info
            })

            if(cargo) {
                this.info = cargo
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    private async update(): Promise<boolean>{
        try {
            let cargo = await db.cargo.update({
                where: {
                    id: this.info.id
                },
                data: this.info
            })

            if(cargo) {
                this.info = cargo
            }

            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    private async remove(): Promise<boolean>{
        try {
            let cargo = await db.cargo.update({
                where: {
                    id: this.info.id
                },
                data: {
                    deletedAt: new Date()
                }
            })

            if(cargo) {
                this.info = cargo
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // Public Methods
    public async GetAll(typeId: number, search:string = "", pag:Pagination): Promise<[Cargo[], number]>{
        let where: any = {
            deletedAt: null,
            AND: {
                OR: [
                    {
                        name: {
                            contains: search
                        }
                    },
                ],
            }
        }

        if(typeId > 0) {
            where.AND["typeId"] = 0
            where.AND.typeId = typeId
        }

        return await this.findAll(pag, where)
    }

    public async SearchById(id:number): Promise<boolean>{
        return await this.find({
            id,
            deletedAt: null
        })
    }

    public SetCargoBody(body:any): void{
        this.info = {
            id: body.id,
            name: body.name,
            weight: body.weight,
            sizeX: body.sizeX,
            sizeY: body.sizeY,
            sizeZ: body.sizeZ,
            typeId: body.typeId,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    }

    public UpdateCargoBody(body:any): void{
        if(body.name) this.info.name = body.name
        if(body.weight) this.info.weight = body.weight
        if(body.sizeX) this.info.sizeX = body.sizeX
        if(body.sizeY) this.info.sizeY = body.sizeY
        if(body.sizeZ) this.info.sizeZ = body.sizeZ
        if(body.typeId) this.info.typeId = body.typeId
    }

    public async Create(): Promise<boolean>{
        return await this.create()
    }

    public async Update(): Promise<boolean>{
        return await this.update()
    }

    public async Remove(): Promise<boolean>{
        return await this.remove()
    }

    public async GetTypes(): Promise<CargoType[]>{
        let types = await db.cargoType.findMany({
            where: {
                deletedAt: null
            }
        })

        return types
    }

    public async CubedWeight(): Promise<number>{
        return this.info.sizeX * this.info.sizeY * this.info.sizeZ * 300
    }

    public async CalculateWeight(): Promise<number>{
        return this.info.weight > await this.CubedWeight() ? this.info.weight : await this.CubedWeight()
    }

    public async CalculatePrice(): Promise<number>{
        return await this.CalculateWeight() * this.type.price
    }
}