import { Role, User } from "@prisma/client";
import db from "../database/database";
import security from "../security/security";
import { ValidCPFCNPJ } from "../utils/tools";
import { Pagination } from "./models";

declare global {
    namespace Express {
        interface Request {
            user: UserModel;
        }
    }
}


class UserModel {
    public info: User = {
        id: 0,
        name: "",
        username: "",
        email: "",
        password: "",
        cpfCnpj: "",
        cellphone: "",
        roleId: 0,
        active: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    }
    public role: Role = {
        id: 0,
        name: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
    }
    
    constructor(){
    }

    // Set user data
    public setUser(user: User) {
        this.info = user;
    }

    // Set user body
    public SetUserBody(body: any) {
        var user: User = {
            name: body.name,
            username: body.username,
            email: body.email,
            password: body.password,
            cpfCnpj: body.cpfCnpj,
            roleId: 3,
            cellphone: body.cellphone,
            id: 0,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    
        this.info = user;
    }

    // Validate user data
    public ValidateUser(skipPass:boolean=false): string {
        let user = this.info;
        // Name
        if(user.name == null || user.name == "") {
            return "Nome é obrigatório";
        } else if(user.name.length < 3) {
            return "Nome deve ter pelo menos 3 caracteres";
        } else if(user.name.length > 100) {
            return "Nome deve ter no máximo 100 caracteres";
        }

        if(user.username == null || user.username == "") {
            return "Username é obrigatório";
        } else if(user.username.length < 3) {
            return "Username deve ter pelo menos 3 caracteres";
        } else if(user.username.length > 50) {
            return "Username deve ter no máximo 50 caracteres";
        }

        if(user.email == null || user.email == "") {
            return "Email é obrigatório";
        } else if(user.email.length < 3) {
            return "Email deve ter pelo menos 3 caracteres";
        } else if(user.email.length > 100) {
            return "Email deve ter no máximo 100 caracteres";
        }

        if(!skipPass) 0
        else if(user.password == null || user.password == "") {
            return "Senha é obrigatória";
        } else if(user.password.length < 3) {
            return "Senha deve ter pelo menos 3 caracteres";
        } else if(user.password.length > 50) {
            return "Senha deve ter no máximo 50 caracteres";
        }

        user.cpfCnpj = user.cpfCnpj.replace(/\D/g, "");
        if(user.cpfCnpj == null || user.cpfCnpj == "") {
            return "CPF/CNPJ é obrigatório";
        } else if(user.cpfCnpj.length != 11 && user.cpfCnpj.length != 14) {
            return "CPF/CNPJ deve ter 11 ou 14 caracteres";
        } else if(!ValidCPFCNPJ(user.cpfCnpj)) {
            return "CPF/CNPJ inválido";
        }

        user.cellphone = String(user.cellphone).replace(/\D/g, "");
        if(user.cellphone == null || user.cellphone == "") {
            return "Celular é obrigatório";
        } else if(user.cellphone.length > 11) {
            return "Celular deve ter no máximo 11 caracteres";
        } else if(user.cellphone.length < 10) {
            return "Celular deve ter pelo menos 10 caracteres";
        }

        return "";
    }

    // Set user password
    public SetPassword(password: string) {
        this.info.password = security.PassHash(password);
    }

    // Compare user password
    public ComparePassword(password: string) {
        return security.PassCompare(password, this.info.password);
    }

    //DATABASE METHODS

    private async find(where: any): Promise<boolean> {
        let found = await db.user.findFirst({
            where
        })

        if(found != null) {
            this.info = found;
            await this.getRole();
            return true;
        }

        return false;
    }

    private async getRole(): Promise<void> {
        let found = await db.role.findFirst({
            where: {
                id: this.info.roleId
            }
        })

        if(found != null) {
            this.role = found;
        }

        return;
    }

    public async GetAllRoles(): Promise<Role[]> {
        let found = await db.role.findMany();

        return found;
    }

    // Search user by CPF/CNPJ
    public async SearchByCPFCNPJ(cpfCnpj: string): Promise<boolean> {
        return await this.find({ cpfCnpj });
    }

    // Search user by id
    public async SearchById(id: number): Promise<boolean> {
        if(isNaN(id)) 
            return false;
        return await this.find({ id: id });
    }

    // Search user by email
    public async SearchByEmail(email: string): Promise<boolean> {
        return await this.find({ email: email });
    }

    // Search user by username
    public async SearchByUsername(username: string): Promise<boolean> {
        let found = await db.user.findFirst({
            where: {
                username: username
            }
        });

        if(found != null) {
            this.info = found;
            return true;
        }

        return false;
    }

    // Set role
    public async SetRole(role: string): Promise<boolean> {
        let found = await db.role.findFirst({
            where: {
                name: role
            }
        });

        if(found != null) {
            this.info.roleId = found.id;
            return true;
        }

        return false;
    }

    // Set role by id
    public async SetRoleById(roleId: number = 3): Promise<boolean> {
        let found = await db.role.findFirst({
            where: {
                id: roleId
            }
        });

        if(found != null) {
            this.info.roleId = found.id;
            return true;
        }

        return false;
    }

    // Get all users
    public async GetAll(pagination: Pagination, search: string = ""): Promise<[User[], number]> {
        let where = {
            deletedAt: null,
            AND: {
                OR: [
                    {
                        name: {
                            contains: search
                        }
                    },
                    {
                        username: {
                            contains: search
                        }
                    },
                    {
                        email: {
                            contains: search
                        }
                    },
                    {
                        cpfCnpj: {
                            contains: search
                        }
                    }
                ]
            }
        }

        let users = await db.user.findMany({
            where,
            skip: pagination.offset,
            take: pagination.limit,
            orderBy: {
                name: "asc"
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                cpfCnpj: true,
                cellphone: true,
                createdAt: true,
                updatedAt: true,
                deletedAt: true,
                roleId: true
            }
        }) as User[];

        let count = await db.user.count({
            where
        });

        return [users, count];
    }

    private async create(): Promise<boolean> {
        try {
            let user = await db.user.create({
                data: this.info
            });
            
            this.info = user;
            return true;
        } catch(e) {
            return false
        }
    }

    // Create user
    public async Create(): Promise<boolean> {
        return await this.create();
    }

    private async update(): Promise<boolean> {
        try {
            let user = await db.user.update({
                where: {
                    id: this.info.id
                },
                data: this.info
            });

            this.info = user;
            return true;
        } catch(e) {
            return false
        }
    }

    // Update user
    public async Update(): Promise<boolean> {
        return await this.update();
    }

    private async delete(): Promise<boolean> {
        try {
            let user = await db.user.delete({
                where: {
                    id: this.info.id
                }
            });

            this.info = user;
            return true;
        } catch(e) {
            return false
        }
    }

    // Delete user
    public async Delete(): Promise<boolean> {
        this.info.deletedAt = new Date();
        this.info.active = false;
        return await this.update();
    }
}

export default UserModel;