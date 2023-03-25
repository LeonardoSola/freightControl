import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

export function Test() {
    db.$connect().then(async () => {
       console.log("Database: ✅");       
    }).catch((e:any) => {
        console.log("Database: ❌");
        console.log(e);
    }).finally(() => {
        db.$disconnect();
    });
}

export default db