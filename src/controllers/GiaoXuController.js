const GiaoXu = require('../models/GiaoXu');
const LinhMuc = require('../models/LinhMuc');

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

    async showMoreGiaoXu(req, res, next) {
        const page = parseInt(req.params.page);
        try {
            const listGiaoXu = await GiaoXu.find().skip((page-1) * 20).limit(20);
            var listGxNew = []
            for(var i = 0; i < listGiaoXu.length; i++) {
                const lm = await LinhMuc.findOne({link: listGiaoXu[i].linkLinhMuc})
                const obj = listGiaoXu[i].toJSON();
                if(lm) {
                    obj["LinhMucQx"] = lm;
                }
                else {
                    obj["LinhMucQx"] = {
                        name: listGiaoXu[i].linkLinhMuc
                    }
                }
                listGxNew.push(obj)
            }
            res.json({
                code: 200,
                length: listGiaoXu.length,
                page: page,
                data: listGxNew,
            })
        } catch (err) {
            console.log(err)
        }
    }
    
}

module.exports = new GiaoXuController;