import * as controller from "../../controller/stop/stopController";
import { Route } from "../../models/models";

export const StopRoutes: Route[] = [
        // POST
        {
            URI: "/stop/:id",
            method: "put",
            handler: controller.ClockIn,
            Auth: true,
            Role: ["driver"]
        },
]