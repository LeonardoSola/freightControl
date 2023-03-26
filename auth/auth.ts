import jwt from 'jsonwebtoken';
import { Token } from '../models/authentication';
require('dotenv').config();

class AuthService {
    private secret: string = process.env.SECRET || "secret";

    public GenerateToken(id: number): string {
        const token = jwt.sign({ id }, this.secret, { 
                expiresIn: 3 * 30 * 24 * 60 * 60 // expires in 3 months
            });
        return token;
    }

    public async DecodeToken(token: string): Promise<number> {
        try {
            const decoded = await jwt.verify(token, this.secret) as Token;
            return decoded.id;
        } catch (error) {
            return 0;
        }
    }
}

export default new AuthService();