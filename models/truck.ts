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

    private async findAll(where:any = {}): Promise<[Truck[], number]>{
        let info = await db.truck.findMany({where})

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
        var delet = await db.truck.delete({
            where: {
                id: this.info.id
            }
        }).then().catch(a=>{
            return false
        })

        return false
    }

    // Public Methods
    public async GetAll(statusId: number, search:string, pag:Pagination): Promise<[Truck[], number]>{
        var where = {}
        if(statusId > 0) where = {statusId}
        if(search != "") where = {name: {contains: search}}

        return await this.findAll(where);
    }
}