import bcrypt from "bcrypt";

export const createHash = (password) => {
    try {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
    catch(error) {
        throw("Error when trying to hash the password");
    }
}

export const comparePassword = (password, hash) => {
    try {
        return bcrypt.compareSync(password, hash);
    }
    catch(error) {
        throw("Error when trying to compare password and hash");
    }
}