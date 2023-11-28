const User = require("../models/User")

class UserController{
    async getAllUser(req, res, next) {
        const users = await User.find();
        res.json(users)
    }
}

module.exports = new UserController