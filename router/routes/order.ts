import * as controller from "../../controller/order/orderController";
import { Route } from "../../models/models";

export const OrderRoutes: Route[] = [
    // GET
    {
        URI: "/order",
        method: "get",
        handler: controller.GetAll,
        Auth: true,
        Role: ["admin", "client"]
    },
    {
        URI: "/order/:id",
        method: "get",
        handler: controller.GetById,
        Auth: true,
        Role: ["admin", "client"]
    },
    // POST
    {
        URI: "/order",
        method: "post",
        handler: controller.Create,
        Auth: true,
        Role: ["admin"]
    },
    // PUT
    {
        URI: "/order/:id",
        method: "put",
        handler: controller.Update,
        Auth: true,
        Role: ["admin"]
    },
    // DELETE
    {
        URI: "/order/:id",
        method: "delete",
        handler: controller.Delete,
        Auth: true,
        Role: ["admin"]
    },
]