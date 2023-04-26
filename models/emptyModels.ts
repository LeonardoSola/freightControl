import * as Prisma from '@prisma/client'

export const emptyCargo: Prisma.Cargo = {
    id: 0,
    name: "",
    weight: 0,
    sizeX: 0,
    sizeY: 0,
    sizeZ: 0,
    typeId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
}

export const emptyCargoType: Prisma.CargoType = {
    id: 0,
    name: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    price: 0
}

export const emptyCity: Prisma.City = {
    id: 0,
    name: "",
    stateId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
}

export const emptyState: Prisma.State = {
    id: 0,
    name: "",
    uf: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
}

export const emptyOrder: Prisma.Order = {
    id: 0,
    cargoId: 0,
    clientId: 0,
    statusId: 0,
    originId: 0,
    destinyId: 0,
    value: 0,
    pathId: null,
    startTime: new Date(),
    forecastTime: new Date(),
    endTime: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
}

export const emptyOrderStatus: Prisma.OrderStatus = {
    id: 0,
    name: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
}

export const emptyPath: Prisma.Path = {
    id: 0,
    truckId: 0,
    driverId: 0,
    originId: 0,
    destinyId: 0,
    startTime: new Date(),
    endTime: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
}

export const emptyRole: Prisma.Role = {
    id: 0,
    name: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
}

export const emptyStop: Prisma.Stop = {
    id: 0,
    pathId: 0,
    order: 0,
    cityId: 0,
    time: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
}

export const emptyTruck: Prisma.Truck = {
    id: 0,
    model: "",
    plate: "",
    year: 0,
    maxWeight: 0,
    statusId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
}

export const emptyTruckStatus: Prisma.TruckStatus = {
    id: 0,
    name: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
}

export const emptyUser: Prisma.User = {
    id: 0,
    name: "",
    username: "",
    email: "",
    password: "",
    roleId: 0,
    cellphone: "",
    cpfCnpj: "",
    active: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null
}