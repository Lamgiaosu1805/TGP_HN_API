const becrypt = require('bcrypt');
const User = require('../models/User');
const Profile = require('../models/Profile');

class UserController {

    async signUp(req, res, next) {
        try {
            const salt = await becrypt.genSalt(10);
            const hashed = await becrypt.hash(req.body.password, salt);

            const newUser = new User({
                username: req.body.username,
                mail: req.body.mail,
                password: hashed
            });
            const user = await newUser.save();
            if(user) {
                const newProfile = new Profile({
                    idAccount: user._id
                })
                await newProfile.save()
            }
            res.status(200).json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    async signIn(req, res, next) {
        console.log(req.body)
    }
    
}

module.exports = new UserController;