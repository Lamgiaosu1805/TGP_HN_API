const Class = require("../models/Class");


class ClassController{
    async getAllClass(req, res, next) {
        try {
            const listClass = await Class.find();
            res.json({
                data: listClass,
                code: 200
            })
        } catch (error) {
            console.log(error);
            res.json({
                code: 500,
                message: error
            })
        }
    }

    async createClass(req, res, next) {
        try {
            const classes = new Class(req.body);
            await classes.save();
            res.json(
                {
                    data: req.body,
                    message: "create class successfully",
                    code: 200
                }
            )
        } catch (error) {
            console.log(error);
            res.json({
                code: 500,
                message: error
            })
        }
    }
}

module.exports = new ClassController