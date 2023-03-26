import * as controller from "../../controller/user/userController";
import { Route } from "../../models/models";

export const UserRoutes: Array<Route> = [
    // Get
    {
        URI: "/user",
        method: "get",
        handler: controller.GetAll,
        Auth: true
    },
    {
        URI: "/user/:id",
        method: "get",
        handler: controller.Get,
        Auth: true
    },
    // Post
    {
        URI: "/user",
        method: "post",
        handler: controller.Create,
        Auth: true
    },
    // Put
    {
        URI: "/user/:id",
        method: "put",
        handler: controller.Update,
        Auth: true
    },
    // Delete
    {
        URI: "/user/:id",
        method: "delete",
        handler: controller.Delete,
        Auth: true
    }
]
