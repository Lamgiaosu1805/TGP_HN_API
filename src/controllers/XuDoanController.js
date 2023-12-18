const User = require("../models/User");
const XuDoan = require("../models/XuDoan");
const jwt = require('jsonwebtoken');
const becrypt = require('bcrypt');


class XuDoanController{
    
    async create(req, res, next) {
        //Cần có Transaction
        try {
            const salt = await becrypt.genSalt(10);
            const hashed = await becrypt.hash(req.body.password, salt);

            const newUser = new User({
                username: req.body.username,
                mail: req.body.mail,
                password: hashed,
                role: 3,
            });
            const user = await newUser.save();
            if(user) {
                const newXuDoan = new XuDoan({
                    name: req.body.name,
                    idAccount: user._id,
                    idHiepDoan: '65672a2c88d574a125993c21',
                    ngayThanhLap: req.body.ngayThanhLap,
                })
                await newXuDoan.save();
            }
            res.status(200).json({user, message: "create account successfully"})
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

}

module.exports = new XuDoanController