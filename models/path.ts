import { Path } from "@prisma/client";

export class PathModel {
    info: Path = {
        id: 0,
        truckId: 0,
        driverId: 0,
        originId: 0,
        destinyId: 0,
        startTime: new Date(),
        endTime: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    }
}