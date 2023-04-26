import * as controller from "../../controller/order/orderController";
import { Route } from "../../models/models";

export const OrderRoutes: Route[] = [
    // GET
    {
        URI: "/order",
        method: "get",
        handler: controller.GetAll,
        Auth: true,
        Role: ["admin"]
    },
]