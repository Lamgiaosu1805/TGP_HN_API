const becrypt = require('bcrypt');
const User = require('../models/User');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');

const genAccessToken = (user) => {
    return jwt.sign({
        id: user._id,
        username: user.username,
        role: user.role,
    },
        process.env.SECRET_KEY,
        {
            expiresIn: "365d"
        }
    )
}

const genRefeshToken = (user) => {
    return jwt.sign({
        id: user._id,
        username: user.username,
        role: user.role,
    },
        process.env.SECRET_KEY,
        {
            expiresIn: "365d"
        }
    )
}

class AuthController {

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
                    idAccount: user._id,
                    fullname: user.username
                })
                await newProfile.save()
            }
            res.status(200).json({user, message: "create account successfully"})
        } catch (error) {
            console.log(error)
            res.json({
                code: 500,
                message: error
            })
        }
    }

    async signIn(req, res, next) {
        try {
            const user = await User.findOne({username: req.body.username});
            if(!user) {
                res.json({
                    code: 404,
                    message: "Username invalid"
                })
            }
            else {
                const validPassWord = await becrypt.compare(
                    req.body.password,
                    user.password
                );
                if(!validPassWord) {
                    res.json({
                        code: 404,
                        message: "Wrong Password"
                    })
                }
                if(user && validPassWord) {
                    const accessToken = genAccessToken(user);
                    const refreshToken = genRefeshToken(user);
                    const {password, ...others} = user._doc;
                    res.status(200).json({...others, accessToken, refreshToken, code: 200})
                }
            }
        } catch (error) {
            console.log(error)
            res.json({
                code: 500,
                message: error
            })
        }
    }
    
}

module.exports = new AuthController;