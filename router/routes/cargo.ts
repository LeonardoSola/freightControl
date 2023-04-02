import * as controller from "../../controller/cargo/cargoController";
import { Route } from "../../models/models";

export const CargoRoutes: Route[] = [
    {
        URI: '/cargo',
        method: "get",
        handler: controller.GetAll,
        Auth: true,
        Role: ["admin", "client"]
    },
    {
        URI: '/cargo/:id',
        method: "get",
        handler: controller.Get,
        Auth: true,
        Role: ["admin", "client"]
    },
    {
        URI: '/cargo',
        method: "post",
        handler: controller.Create,
        Auth: true,
        Role: ["admin"]
    },
    {
        URI: '/cargo/:id',
        method: "put",
        handler: controller.Update,
        Auth: true,
        Role: ["admin"]
    },
    {
        URI: '/cargo/:id',
        method: "delete",
        handler: controller.Delete,
        Auth: true,
        Role: ["admin"]
    }
]