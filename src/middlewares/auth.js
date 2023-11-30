const jwt = require('jsonwebtoken');

const auth = {
    //verify
    verifyToken: (req, res, next) => {
        const token = req.headers.authorization;
        if(token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
                if(err) {
                    res.status(403).json("Token is not valid");
                }
                else {
                    req.user = user;
                    next();
                }
            })
        }
        else {
            res.status(401).json("Not Authenticated")
        }
    },

    verifyTokenForManager: (req, res, next) => {
        auth.verifyToken(req, res, () => {
            if(req.user.role === 1) {
                next();
            }
            else {
                res.status(403).json("Not Allowed")
            }
        })
    }

}

module.exports = auth;