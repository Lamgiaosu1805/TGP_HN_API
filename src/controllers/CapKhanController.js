const CapKhan = require("../models/CapKhan");

class CapKhanController{
    
    create(req, res, next) {
        try {
            const newCapKhan = new CapKhan({
                name: req.body.name,
            });
            newCapKhan.save();
            res.status(200).json({message: "create successfully"})
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    async getAllCapKhan(req, res, next) {
        try {
            const data = await CapKhan.find();
            if(data) {
                res.status(200).json(data)
            }
            else {
                res.status(404).json("Data not found")
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error) 
        }
    }
}

module.exports = new CapKhanController