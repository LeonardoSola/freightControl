import { Route } from "../../models/models";
import * as controller from "../../controller/truck/truckController";


export const TruckRoutes: Route[] = [
    // GET
    {
        URI: "/truck",
        method: "get",
        handler: controller.GetAll,
        Auth: true,
        Role: ["admin"]
    },
    {
        URI: "/truck/:id",
        method: "get",
        handler: controller.Get,
        Auth: true,
        Role: ["admin"]
    },
    // POST
    {
        URI: "/truck",
        method: "post",
        handler: controller.Create,
        Auth: true,
        Role: ["admin"]
    },
    // PUT
    {
        URI: "/truck/:id",
        method: "put",
        handler: controller.Update,
        Auth: true,
        Role: ["admin"]
    },
    // DELETE
    {
        URI: "/truck/:id",
        method: "delete",
        handler: controller.Delete,
        Auth: true,
        Role: ["admin"]
    },
]