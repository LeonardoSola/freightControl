import { Route } from "../../models/models";
import { LoginRoutes } from "./login";
import { UserRoutes } from "./user";

export function GetRoutes(): Array<Route> {
    var allRoutes: Array<Route> = [];

    allRoutes = allRoutes.concat(
        LoginRoutes,
        UserRoutes
    );
    
    return allRoutes;
}