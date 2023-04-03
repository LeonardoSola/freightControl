import { Route } from "../../models/models";
import { CitieStateRoutes } from "./city-state";
import { LoginRoutes } from "./login";
import { TruckRoutes } from "./truck";
import { UserRoutes } from "./user";
import { CargoRoutes } from "./cargo";

export function GetRoutes(): Array<Route> {
    var allRoutes: Array<Route> = [];

    allRoutes = allRoutes.concat(
        LoginRoutes,
        UserRoutes,
        CitieStateRoutes,
        TruckRoutes,
        CargoRoutes,
    );
    
    return allRoutes;
}