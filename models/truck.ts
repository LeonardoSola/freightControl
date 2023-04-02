import { Truck, TruckStatus } from "@prisma/client";
import db from "../database/database";
import { Pagination } from "./models";


export class TruckModel {
    info: Truck = {
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
    status: TruckStatus = {
        id: 0,
        name: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    }

    constructor(){}

    // Database Methods
    private async find(where:any = {}): Promise<boolean>{
        let info = await db.truck.findFirst({
            where
        })

        if(info) {
            this.info = info
            await this.getStatus()
            return true
        }

        return false;
    }

    private async findAll(pag: Pagination, where:any = {}): Promise<[Truck[], number]>{
        let info = await db.truck.findMany({
            where,
            skip: pag.offset,
            take: pag.limit,
        })

        var count = await db.truck.count({where})

        return [info, count];
    }

    private async getStatus(): Promise<void>{
        let status = await db.truckStatus.findFirst({
            where: {
                id: this.info.statusId
            }
        })

        if(status) this.status = status
    }

    private async create(): Promise<boolean> {
        try {
            let truck = await db.truck.create({
                data: this.info
            });
            
            this.info = truck;
            return true;
        } catch(e) {
            return false
        }
    }

    private async save(): Promise<boolean> {
        try {
            let truck = await db.truck.update({
                where: {
                    id: this.info.id
                },
                data: this.info
            });

            this.info = truck;
            return true;
        } catch(e) {
            return false
        }
    }

    private async remove(): Promise<boolean>{
        var del = await db.truck.delete({
            where: {
                id: this.info.id
            }
        }).then(a=>{
            return true
        }).catch(a=>{
            return false
        })

        return del
    }

    // Public Methods
    public async GetAll(statusId: number, search:string, pag:Pagination): Promise<[Truck[], number]>{
        var where = {}
        if(statusId > 0) where = {statusId}
        if(search != "") where = {name: {contains: search}}

        return await this.findAll(pag, where);
    }

    public async SearchById(id: number): Promise<boolean>{
        return await this.find({id})
    }

    public async SetTruck(truck: Truck): Promise<void>{
        this.info = truck
    }   

    public async SetTruckBody(body: any): Promise<void>{
        this.info = {
            id: body.id,
            model: body.model,
            plate: body.plate,
            year: body.year,
            maxWeight: body.maxWeight,
            statusId: body.statusId,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    }

    public async Create(): Promise<boolean>{
        if(!await this.validate()) return false
        return await this.create()
    }

    public async UpdateTruckBody(body: any): Promise<boolean>{
        if(body.model) this.info.model = body.model
        if(body.plate) this.info.plate = body.plate
        if(body.year) this.info.year = body.year
        if(body.maxWeight) this.info.maxWeight = body.maxWeight
        if(body.statusId) this.info.statusId = body.statusId

        return await this.save()
    }

    public async Delete(): Promise<boolean>{
        return await this.remove()
    }
   // Private Methods

    // Return true if the truck is valid
    private async validate(): Promise<boolean>{
        this.info.model = String(this.info.model).trim()
        if(this.info.model == "") return false
        this.info.plate = String(this.info.plate).trim()
        if(this.info.plate == "") return false
        if(this.info.year == 0) return false
        if(this.info.maxWeight == 0) return false
        if(this.info.statusId == 0) return false

        return true
    }
}