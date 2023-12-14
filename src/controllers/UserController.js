const User = require("../models/User");
const XuDoan = require("../models/XuDoan");

class UserController{
    async getAllUser(req, res, next) {
        const users = await User.find();
        res.json(users)
    }

    async getUserInfo(req, res, next) {
        const currentUser = req.user
        try {
            switch (currentUser.role) {
                case 1:
                    console.log("1")
                    break;
                case 2:
                    console.log("2")
                    break;
                case 3:
                    const infoXuDoan = await XuDoan.findOne({idAccount: currentUser.id});
                    res.status(200).json({
                        ...currentUser,
                        tenXuDoan: infoXuDoan.name,
                        detailXuDoan: infoXuDoan.detail,
                        ngayThanhLap: infoXuDoan.ngayThanhLap,
                        idHiepDoan: infoXuDoan.idHiepDoan,
                    })
                    break;
                default:
                    console.log("123")
                    break;
            }
        } catch (error) {
            console.log(error);
            res.json({
                code: 500,
                message: error
            })
        }
    }
}

module.exports = new UserController