import { Login } from "../../controller/auth/authController";
import { Route } from "../../models/models";

export const LoginRoutes: Array<Route> = [
    {
        URI: "/login",
        method: "post",
        handler: Login,
        Auth: false
    }
]
