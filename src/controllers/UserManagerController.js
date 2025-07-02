const UserManager = require("../Managers/UserManager.js");
const BcryptUtils = require("../utils/Bcrypt.js");

class UserManagerController {

    // Public Methods

    static async getAllUsers(request, response) {
        try {
            const users = await UserManager.getAllUsers();

            if(users) {
                return response.status(200).json({Status: "Success", Payload: users });
            }
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async getUserById(request, response) {
        try {
            const uid = request.params.uid;

            if(!uid) {
                response.locals.message = "User id is required";
                return response.status(400).json({Status: "Error", Message: "User id is required"});
            }

            const user = await UserManager.getUserById(uid);

            if(!user) {
                response.locals.message = `User with id '${uid}' not found`;
                return response.status(404).json({Status: "Error", Message: `User with id '${uid}' not found`});
            }

            return response.status(200).json({Status: "Success", Payload: user });
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async createUser(request, response) {
        try {
          const { first_name, last_name, email, password } = request.body || {};

            if(!first_name || !last_name) {
                response.locals.message = "Complete name is required";
                return response.status(400).json({Status: "Error", Message: "Complete name is required"});
            }

            if(!email) {
                response.locals.message = "Email is required";
                return response.status(400).json({Status: "Error", Message: "Email is required"});
            }

            if(!password) {
                response.locals.message = "Password is required";
                return response.status(400).json({Status: "Error", Message: "Password is required"});
            }

            const oldUser = await UserManager.getUserByEmail(email);

            if(oldUser) {
                response.locals.message = `User with email '${email}' already exists`;
                return response.status(400).json({Status: "Error", Message: `User with email '${email}' already exists`});
            }

            const user = {
                first_name,
                last_name,
                email,
                password: BcryptUtils.createHash(password)
            };

            const newUser = await UserManager.createUser(user);

            return response.status(201).json({Status: "Success", Payload: newUser });
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async updateUserById(request, response) {
        try {
            const uid = request.params.uid;

            if(!uid) {
                response.locals.message = "User id is required";
                return response.status(400).json({Status: "Error", Message: "User id is required"});
            }

            const { first_name, last_name , email, password } = request.body || {};

            if(!first_name || !last_name) {
                response.locals.message = "Complete name is required";
                return response.status(400).json({Status: "Error", Message: "Complete name is required"});
            }

            if(!email) {
                response.locals.message = "Email is required";
                return response.status(400).json({Status: "Error", Message: "Email is required"});
            }

            if(!password) {
                response.locals.message = "Password is required";
                return response.status(400).json({Status: "Error", Message: "Password is required"});
            }

            const user = await UserManager.getUserById(uid);

            if(!user) {
                response.locals.message = `User with id '${uid}' not found`;
                return response.status(404).json({Status: "Error", Message: `User with id '${uid}' not found`});
            }

            if(BcryptUtils.comparePassword(password, user.password)) {
                response.locals.message = "Password must be different from the current one";
                return response.status(400).json({Status: "Error", Message: "Password must be different from the current one"});
            }

            const updated = {
                first_name,
                last_name,
                email,
                password: BcryptUtils.createHash(password)
            };

            if(await UserManager.updateUserById(uid, updated)) {
                return response.status(200).json({Status: "Success", Message: "User updated successfully"});
            }
            else {
                response.locals.message = `User with id '${uid}' not found`;
                return response.status(404).json({Status: "Error", Message: `User with id '${uid}' not found`});
            }
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async deleteUserById(request, response) {
        try {
            const uid = request.params.uid;

            if(!uid) {
                response.locals.message = "User id is required";
                return response.status(400).json({Status: "Error", Message: "User id is required"});
            }

            if(await UserManager.deleteUserById(uid)) {
                return response.status(200).json({Status: "Success", Message: "User deleted successfully"});
            }
            else {
                response.locals.message = `User with id '${uid}' not found`;
                return response.status(404).json({Status: "Error", Message: `User with id '${uid}' not found`});
            }
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }
}

module.exports = UserManagerController;