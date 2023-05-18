import { Cargo, City, Order, OrderStatus, User } from "@prisma/client";
import { emptyCargo, emptyCity, emptyOrder, emptyOrderStatus, emptyUser } from "./emptyModels";
import db from "../database/database";
import { Pagination } from "./models";

export class OrderModel {
    info: Order = emptyOrder
    cargo: Cargo = emptyCargo
    client: User = emptyUser
    status: OrderStatus = emptyOrderStatus
    origin: City = emptyCity
    destiny: City = emptyCity

    constructor() { }
    
    private async find(where: any = {}): Promise<boolean> {
        var info = await db.order.findFirst({
            where
        })
        
        if (info) {
            this.info = info
            await this.getCargo()
            await this.getClient()
            await this.getStatus()
            await this.getOrigin()
            await this.getDestiny()
            return true
        }

        return false;
    }

    private async getCargo(): Promise<void> {
        let cargo = await db.cargo.findFirst({
            where: {
                id: this.info.cargoId
            }
        })

        if (cargo) {
            this.cargo = cargo
        }
    }

    private async getClient(): Promise<void> {
        let client = await db.user.findFirst({
            where: {
                id: this.info.clientId
            }
        })

        if (client) {
            this.client = client
        }
    }

    private async getStatus(): Promise<void> {
        let status = await db.orderStatus.findFirst({
            where: {
                id: this.info.statusId
            }
        })

        if (status) {
            this.status = status
        }
    }

    private async getOrigin(): Promise<void> {
        let origin = await db.city.findFirst({
            where: {
                id: this.info.originId
            }
        })

        if (origin) {
            this.origin = origin
        }
    }

    private async getDestiny(): Promise<void> {
        let destiny = await db.city.findFirst({
            where: {
                id: this.info.destinyId
            }
        })

        if (destiny) {
            this.destiny = destiny
        }
    }

    public async create(): Promise<boolean> {
        try {
            let order = await db.order.create({
                data: this.info
            });

            this.info = order;
            return true;
        } catch (e) {
            return false
        }
    }

    public async update(): Promise<boolean> {
        try {
            let order = await db.order.update({
                where: {
                    id: this.info.id
                },
                data: this.info
            });

            this.info = order;
            return true;
        } catch (e) {
            return false
        }
    }

    public async delete(): Promise<boolean> {
        try {
            let order = await db.order.delete({
                where: {
                    id: this.info.id
                }
            });

            this.info = order;
            return true;
        } catch (e) {
            return false
        }
    }

    public async GetAll(pagination: Pagination, cargoId: number, clientId: number, statusId: number, originId: number, destinyId: number ): Promise<[Order[], number]> {
        let where: any = {}

        if (cargoId) where.cargoId = cargoId
        if (clientId) where.clientId = clientId
        if (statusId) where.statusId = statusId
        if (originId) where.originId = originId
        if (destinyId) where.destinyId = destinyId

        let orders = await db.order.findMany({
            where,
            skip: pagination.offset,
            take: pagination.limit,
        })

        var count = await db.order.count({ where })

        return [orders, count];
    }

    public async SearchById(id: number): Promise<boolean> {
        return await this.find({ id })
    }

    public async Create(): Promise<boolean> {
        return await this.create()
    }

    public async Update(): Promise<boolean> {
        return await this.update()
    }

    public async Delete(): Promise<boolean> {
        return await this.delete()
    }
}