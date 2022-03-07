import bcryptjs from "bcryptjs";
import crypto from 'crypto';

export default function generateToken(string) {
    const saltRounds = 12;
    let salt = bcryptjs.genSaltSync(saltRounds);
    let saltedHash = bcryptjs.hashSync(string, salt);
    const token = crypto.createHash('md5').update(saltedHash).digest('hex');
    return token;
}
