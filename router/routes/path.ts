import * as controller from "../../controller/path/pathController";
import { Route } from "../../models/models";

export const PathRoutes: Route[] = [
     // GET
     {
        URI: "/path",
        method: "get",
        handler: controller.GetAll,
        Auth: true,
        Role: ["admin"]
    },
    {
        URI: "/path/:id",
        method: "get",
        handler: controller.Get,
        Auth: true,
        Role: ["admin", "driver"]
    },
    // POST
    {
        URI: "/path",
        method: "post",
        handler: controller.Create,
        Auth: true,
        Role: ["admin"]
    },
    // PUT
    {
        URI: "/path/:id",
        method: "put",
        handler: controller.Update,
        Auth: true,
        Role: ["admin"]
    },
    // PUT  
    {
        URI: "/path/:id/stops",
        method: "put",
        handler: controller.UpdateStops,
        Auth: true,
        Role: ["admin"]
    },
    // DELETE
    {
        URI: "/path/:id",
        method: "delete",
        handler: controller.Delete,
        Auth: true,
        Role: ["admin"]
    },
]
