const GiaoXu = require('../models/GiaoXu');

class GiaoXuController {

    //[GET]
    showAllGiaoXu(req, res, next) {
        GiaoXu.find({})
            .then(giaoXus => res.status(200).json({
                code: 200,
                length: giaoXus.length,
                data: giaoXus
            }))
            .catch(next);
    }

    showMoreGiaoXu(req, res, next) {
        const page = parseInt(req.params.page);
        GiaoXu.find().skip((page-1) * 20).limit(20)
            .then(giaoXus => res.json({
                code: 200,
                length: giaoXus.length,
                page: page,
                data: giaoXus,
            }))
            .catch(err => res.json({
                code: 500,
                err: err,
            }))
    }
    
}

module.exports = new GiaoXuController;