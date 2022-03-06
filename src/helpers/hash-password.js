import bcryptjs from "bcryptjs"

export default function hashPassword(password) {

    let salt = bcryptjs.genSaltSync(12);
    let hashedPassword = bcryptjs.hashSync(password, salt);
    
    return (
        hashedPassword
    )
}