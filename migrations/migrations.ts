import db from "../database/database";

export function Migrate() {
    db.$connect().then(async () => {
        var roles = await db.role.findMany();
        if(roles.length == 0) {
            try{
                await db.role.createMany({
                    data: [
                        {name: "adminatrator"},
                        {name: "driver"},
                        {name: "client"}
                    ]
                });
            } catch(e) {
                // Do nothing
            } finally {
                db.$disconnect();
                console.log("Migrations: ✅");
            }
        }
    });
}