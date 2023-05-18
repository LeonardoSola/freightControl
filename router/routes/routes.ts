import { Route } from "../../models/models";
import { CitieStateRoutes } from "./city-state";
import { LoginRoutes } from "./login";
import { TruckRoutes } from "./truck";
import { UserRoutes } from "./user";
import { CargoRoutes } from "./cargo";
import { CargoTypeRoutes } from "./cargotypes";
import { PathRoutes } from "./path";
import { StopRoutes } from "./stop";
import { OrderRoutes } from "./order";

export function GetRoutes(): Array<Route> {
    var allRoutes: Array<Route> = [];

    allRoutes = allRoutes.concat(
        LoginRoutes,
        UserRoutes,
        CitieStateRoutes,
        TruckRoutes,
        CargoRoutes,
        CargoTypeRoutes,
        PathRoutes,
        StopRoutes,
        OrderRoutes,
    );
    
    return allRoutes;
}