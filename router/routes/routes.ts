import { Route } from "../../models/models";
import { CitieStateRoutes } from "./city-state";
import { LoginRoutes } from "./login";
import { UserRoutes } from "./user";

export function GetRoutes(): Array<Route> {
    var allRoutes: Array<Route> = [];

    allRoutes = allRoutes.concat(
        LoginRoutes,
        UserRoutes,
        CitieStateRoutes
    );
    
    return allRoutes;
}