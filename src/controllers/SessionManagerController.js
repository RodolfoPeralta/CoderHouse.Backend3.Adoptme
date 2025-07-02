const UserDto = require('../dto/User.dto.js');
const BcryptUtils = require("../utils/Bcrypt.js");
const JwtUtils = require("../utils/Jwt.js");
const UserManager = require("../Managers/UserManager.js");

class SessionManagerController {

    // Public Methods

    static async register(request, response) {
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
                password: BcryptUtils.createHash(password),
                timestampLastLogin: new Date()
            };

            const token = JwtUtils.generateToken(user);

            const newUser = await UserManager.createUser(user);

            const dto = UserDto.getUserDto(newUser);
            
            return response.status(201).json({Status: "Success", Payload: {token,...dto} });
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async login(request, response) {
        try {
            const { email, password } = request.body || {};

            if(!email) {
                response.locals.message = "Email is required";
                return response.status(400).json({Status: "Error", Message: "Email is required"});
            }

            if(!password) {
                response.locals.message = "Password is required";
                return response.status(400).json({Status: "Error", Message: "Password is required"});
            }

            const user = await UserManager.getUserByEmail(email);

            if(!user) {
                response.locals.message = `User with email '${email}' not found`;
                return response.status(404).json({Status: "Error", Message: `User with email '${email}' not found`});
            }

            const isValidPassword = BcryptUtils.comparePassword(password, user.password);

            if(!isValidPassword) {
                response.locals.message = "Wrong password";
                return response.status(400).json({Status: "Error", Message: "Wrong password"});
            }

            user.timestampLastLogin = new Date();

            await UserManager.updateUserById(user._id, user);

            const userDto = UserDto.getUserDto(user);

            const token = JwtUtils.generateToken(userDto);

            return response.status(200).json({Status: "Success", Payload: {token,...userDto} });
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

    static async current(request, response) {
        try {
            const user = request.user;

            if(user) {
                return response.status(200).json({Status: "Success", Payload: user });
            }
        }
        catch(error) {
            response.locals.message = error;
            return response.status(500).json({Status: "Error", Message: `${error}`});
        }
    }

}

module.exports = SessionManagerController;
