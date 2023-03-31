import { Truck, TruckStatus } from "@prisma/client";
import db from "../database/database";


export class TruckModel {
    info: Truck
    status: TruckStatus

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
}