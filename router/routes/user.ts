import * as controller from "../../controller/user/userController";
import { Route } from "../../models/models";

export const UserRoutes: Array<Route> = [
    // Get
    {
        URI: "/user",
        method: "get",
        handler: controller.GetAll,
        Auth: true,
        Role: ["admin"]
    },
    {
        URI: "/user/:id",
        method: "get",
        handler: controller.Get,
        Auth: true,
        Role: ["admin"]
    },
    // Post
    {
        URI: "/user",
        method: "post",
        handler: controller.Create,
        Auth: true,
        Role: ["admin"]
    },
    // Put
    {
        URI: "/user/:id",
        method: "put",
        handler: controller.Update,
        Auth: true,
        Role: ["admin"]
    },
    // Delete
    {
        URI: "/user/:id",
        method: "delete",
        handler: controller.Delete,
        Auth: true,
        Role: ["admin"]
    }
]
