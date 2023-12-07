const ChucVu = require("../models/ChucVu");

class ChucVuController{
    
    create(req, res, next) {
        try {
            const newChucVu = new ChucVu({
                name: req.body.name,
            });
            newChucVu.save();
            res.status(200).json({message: "create successfully"})
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    async getAllChucVu(req, res, next) {
        try {
            const data = await ChucVu.find();
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

module.exports = new ChucVuController