import bcryptjs from "bcryptjs"

export default function hashPassword(password) {
    const saltRounds = 12;
    let salt = bcryptjs.genSaltSync(saltRounds);
    let hashedPassword = bcryptjs.hashSync(password, salt);

    return hashedPassword;
}