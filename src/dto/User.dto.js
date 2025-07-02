class UserDto {
    
    static getUserDto = (user) =>{
        return {
            name: `${user.first_name} ${user.last_name}`,
            role: user.role,
            email:user.email,
            timestampLastLogin: user.timestampLastLogin
        }
    }
}

module.exports = UserDto;