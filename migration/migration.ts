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