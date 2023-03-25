import * as bcrypt from 'bcryptjs';

class Security {
    public PassHash(password: string) {
        return bcrypt.hashSync(password, 10);
    }

    public PassCompare(password: string, hash: string) {
        return bcrypt.compareSync(password, hash);
    }
}

export default new Security();