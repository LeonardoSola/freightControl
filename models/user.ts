import { Role, User } from "@prisma/client";
import db from "../database/database";
import security from "../security/security";
import { ValidCPF } from "../utils/tools";

declare global {
    namespace Express {
        interface Request {
        user: UserModel;
        }
    }
}


class UserModel {
    public user: User = {
        id: 0,
        name: "",
        username: "",
        email: "",
        password: "",
        cpf: "",
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
        this.user = user;
    }

    // Set user body
    public SetUserBody(body: any) {
        var user: User = {
            name: body.name,
            username: body.username,
            email: body.email,
            password: body.password,
            cpf: body.cpf,
            roleId: 3,
            cellphone: body.cellphone,
            id: 0,
            active: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        }
    
        this.user = user;
    }

    // Validate user data
    public ValidateUser(): string {
        let user = this.user;
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

        if(user.password == null || user.password == "") {
            return "Senha é obrigatória";
        } else if(user.password.length < 3) {
            return "Senha deve ter pelo menos 3 caracteres";
        } else if(user.password.length > 50) {
            return "Senha deve ter no máximo 50 caracteres";
        }

        user.cpf = user.cpf.replace(/\D/g, "");
        if(user.cpf == null || user.cpf == "") {
            return "CPF é obrigatório";
        } else if(user.cpf.length != 11) {
            return "CPF deve ter 11 caracteres";
        } else if(!ValidCPF(user.cpf)) {
            return "CPF inválido";
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
        this.user.password = security.PassHash(password);
    }

    // Compare user password
    public ComparePassword(password: string) {
        return security.PassCompare(password, this.user.password);
    }

    private async find(where: any): Promise<boolean> {
        let found = await db.user.findFirst({
            where
        })

        if(found != null) {
            this.user = found;
            this.getRole();
            return true;
        }

        return false;
    }

    private async getRole(): Promise<void> {
        let found = await db.role.findFirst({
            where: {
                id: this.user.roleId
            }
        })
    }

    // Search user by CPF
    public async SearchByCPF(cpf: string): Promise<boolean> {
        return await this.find({ cpf: cpf });
    }

    // Search user by id
    public async SearchById(id: number): Promise<boolean> {
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
            this.user = found;
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
            this.user.roleId = found.id;
            return true;
        }

        return false;
    }

    // Create user
    public async Create(): Promise<boolean> {
        try {
            let user = await db.user.create({
                data: this.user
            });

            this.user = user;
            return true;
        } catch(e) {
            console.log(e);
            return false
        }
    }
}

export default UserModel;