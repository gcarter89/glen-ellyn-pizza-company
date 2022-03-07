import bcryptjs from "bcryptjs";


export default function comparePassword(password, hashedPassword) {
    return bcryptjs.compareSync(password, hashedPassword);

}