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
        const page = parseInt(req.params.page);
        LinhMuc.find().skip((page-1) * 20).limit(20)
            .then(linhMucs => res.json({
                code: 200,
                length: linhMucs.length,
                page: page,
                data: linhMucs,
            }))
            .catch(err => res.json({
                code: 500,
                err: err,
            }))
    }

    searchLm(req, res, next) {
        const params = req.body.searchValue;
        LinhMuc.find({
            name: {$regex:params, $options: "i"}
        })
            .then(resq => res.json(resq))
            .catch(err => res.json({
                code: 500,
                err: err,
            }))
    }
    
}

module.exports = new LinhMucController;