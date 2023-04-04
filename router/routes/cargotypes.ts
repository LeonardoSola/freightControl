import * as controller from "../../controller/cargotype/cargoTypeController";
import { Route } from "../../models/models";

export const CargoTypeRoutes: Route[] = [
    {
        URI: '/cargotype',
        method: "get",
        handler: controller.GetAll,
        Auth: true,
        Role: ["admin", "client"]
    },
    {
        URI: '/cargotype/:id',
        method: "get",
        handler: controller.Get,
        Auth: true,
        Role: ["admin", "client"]
    },
    {
        URI: '/cargotype',
        method: "post",
        handler: controller.Create,
        Auth: true,
        Role: ["admin"]
    },
    {
        URI: '/cargotype/:id',
        method: "put",
        handler: controller.Update,
        Auth: true,
        Role: ["admin"]
    },
    {
        URI: '/cargotype/:id',
        method: "delete",
        handler: controller.Delete,
        Auth: true,
        Role: ["admin"]
    }
]