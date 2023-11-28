const User = require("../models/User")

class UserController{
    async getAllUser(req, res, next) {
        if(req.user.isManager) {
            const users = await User.find();
            res.json(users);
        }
        else {
            res.json("Không đủ quyền")
        }
        
    }
}

module.exports = new UserController