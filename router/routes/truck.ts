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
        URI: "/truck",
        method: "get",
        handler: controller.Get,
        Auth: true,
        Role: ["admin"]
    },
    // POST
    {
        URI: "/truck",
        method: "get",
        handler: controller.Create,
        Auth: true,
        Role: ["admin"]
    },
    // PUT
    {
        URI: "/truck",
        method: "get",
        handler: controller.Update,
        Auth: true,
        Role: ["admin"]
    },
    // DELETE
    {
        URI: "/truck",
        method: "get",
        handler: controller.Delete,
        Auth: true,
        Role: ["admin"]
    },
]