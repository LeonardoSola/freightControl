import { sign } from 'jsonwebtoken';
require('dotenv').config();

class AuthService {
    public GenerateToken(id: number): string {
        var secret: string = process.env.JWT_SECRET || "";
        const token = sign({ id }, secret, { 
                expiresIn: 3 * 30 * 24 * 60 * 60 // expires in 3 months
            });
        return token;
    }
}

export default new AuthService();