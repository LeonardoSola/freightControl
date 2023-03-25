import * as controller from "../../controller/auth/authController";
import { Route } from "../../models/models";

export const LoginRoutes: Array<Route> = [
    {
        URI: "/login",
        method: "post",
        handler: controller.Login,
        Auth: false
    },
    {
        URI: "/register",
        method: "post",
        handler: controller.Register,
        Auth: false
    }
]
