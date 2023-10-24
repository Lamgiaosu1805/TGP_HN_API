const LinhMuc = require('../models/LinhMuc');

class LinhMucController {

    //[GET]
    showAllLinhMuc(req, res, next) {
        LinhMuc.find({})
            .then(linhMucs => res.status(200).json({
                code: 200,
                length: linhMucs.length,
                data: linhMucs
            }))
            .catch(next);
    }

    showMoreLinhMuc(req, res, next) {
        const page = req.params.page
        if(typeof page != Number) {
            res.send("no data");
        }
        else {
            LinhMuc.find().skip((page - 1) * 20).limit(20)
            .then(linhMucs => res.json({
                code: res.status(),
                length: linhMucs.length,
                page: page,
                data: linhMucs,
            }))
            .catch(err => res.json({
                code: res.status(),
                error: err
            }))
        }
    }
    
}

module.exports = new LinhMucController;