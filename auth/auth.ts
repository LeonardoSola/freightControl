import { sign } from 'jsonwebtoken';
require('dotenv').config();

class AuthService {
    public generateToken(id: number): string {
        const token = sign({ id }, process.env.JWT_SECRET, { 
                expiresIn: 3 * 30 * 24 * 60 * 60 // expires in 3 months
            });
        return token;
    }
}

export default new AuthService();