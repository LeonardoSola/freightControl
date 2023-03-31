import { Route } from "../../models/models";
import * as controller from "../../controller/citystate/citystateController";

export const CitieStateRoutes: Route[] = [
    {
        URI: '/city',
        method: "get",
        handler: controller.GetAllCity,
        Auth: false
    },
    {
        URI: '/state',
        method: "get",
        handler: controller.GetAllState,
        Auth: false
    }
]