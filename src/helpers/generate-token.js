import bcryptjs from "bcryptjs";
import crypto from 'crypto';
import randomiseString from "./randomise-string.js";

export default function generateToken() {
    const saltRounds = 10;
    let randomisedString = randomiseString(32);
    let salt = bcryptjs.genSaltSync(saltRounds);
    let saltedHash = bcryptjs.hashSync(randomisedString, salt);
    const token = crypto.createHash('md5').update(saltedHash).digest('hex');
    return token;
}

let result = generateToken();