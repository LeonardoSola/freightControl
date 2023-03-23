import { Route } from "../../models/models";
import { LoginRoutes } from "./login";

export function GetRoutes(): Array<Route> {
    var allRoutes: Array<Route> = [];

    allRoutes = allRoutes.concat(
        LoginRoutes,
    );
    
    return allRoutes;
}