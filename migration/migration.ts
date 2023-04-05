import { State } from "@prisma/client";
import db from "../database/database";

export function Migrate() {
    db.$connect().then(async () => {
        var roles = await db.role.count();
        if(roles == 0) await CreateRoles();
        var states = await db.state.count();
        if(states == 0) await CreateStates();
        var truckStatus = await db.truckStatus.count();
        if(truckStatus == 0) await CreateTruckStatus();
        var cargoTypes = await db.cargoType.count();
        if(cargoTypes == 0) await CreateCargoTypes();
        var orderStatus = await db.orderStatus.count();
        if(orderStatus == 0) await CreateOrderStatus();
        var users = await db.user.count();
        if(users == 0) await CreateUserAdmin();
        console.log("Migrations: ✅");
    });
}

async function CreateRoles() {
    try{
        await db.role.createMany({
            data: [
                {name: "admin"},
                {name: "driver"},
                {name: "client"}
            ]
        });
    } catch(e) {
        // Do nothing
    } finally {
        db.$disconnect();
    }
}

type EstadosCidades = {
    estados: {
        nome: string,
        sigla: string,
        cidades: string[]
    }[]
}
var estadosCidades: EstadosCidades = require("../data/estados-cidades.json")

async function CreateStates() {
    try{
        for (let estado of estadosCidades.estados) {
            await db.state.create({
                data: {
                    name: estado.nome,
                    // @ts-ignore
                    uf: estado.sigla,
                    cities: {
                        create: estado.cidades.map((city) => {
                            return {name: city}
                        })
                    }
                }
            });
        }
    } catch(e) {
        // Do nothing
    } finally {
        db.$disconnect();
    }
}

async function CreateTruckStatus() {
    try{
        await db.truckStatus.createMany({
            data: [
                {name: "Disponível"},
                {name: "Indisponível"},
                {name: "Em manutenção"},
                {name: "Em viagem"}
            ]
        });
    } catch(e) {
        // Do nothing
    } finally {
        db.$disconnect();
    }
}

async function CreateCargoTypes() {
    try{
        await db.cargoType.createMany({
            data: [
                {
                    name: "Carga Seca",
                    price: 50
                },
                {
                    name: "Carga Frágil",
                    price: 100
                },
                {
                    name: "Carga Perigosa",
                    price: 150
                },
                {
                    name: "Carga Refrigerada",
                    price: 200
                },
                {
                    name: "Carga Viva",
                    price: 250
                },
                {
                    name: "Carga Pesada",
                    price: 100
                },
                {
                    name: "Carga Muito Pesada",
                    price: 150
                }
            ]
        });
    } catch(e) {
        // Do nothing
    } finally {
        db.$disconnect();
    }
}

async function CreateOrderStatus() {
    try{
        await db.orderStatus.createMany({
            data: [
                {name: "Em análise"},
                {name: "A caminho"},
                {name: "Concluído"},
                {name: "Cancelado"}
            ]
        });
    } catch(e) {
        // Do nothing
    } finally {
        db.$disconnect();
    }
}

async function CreateUserAdmin() {
    try{
        await db.user.create({
            data: {
                name: "Admin User",
                username: "admin",
                email: "admin@email.com",
                password: "$2a$10$V9nwcNiFmIIA/Tshs2m7tu9hVTGux5il6pMKjUw9Pmq4AeDllyxiu", // 1234
                roleId: 1,
                cellphone: "00123456789",
                cpfCnpj: "12345678909",
                active: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
    } catch(e) {
        // Do nothing
    } finally {
        db.$disconnect();
    }
}