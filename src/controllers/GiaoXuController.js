const GiaoXu = require('../models/GiaoXu');
const LinhMuc = require('../models/LinhMuc');

const findGx = async (listGx) => {
    var listGxNew = []
    for(var i = 0; i < listGx.length; i++) {
        const lm = await LinhMuc.findOne({link: listGx[i].linkLinhMuc})
        const obj = listGx[i].toJSON();
        if(lm) {
            obj["LinhMucQx"] = lm;
        }
        else {
            obj["LinhMucQx"] = {
                name: listGx[i].linkLinhMuc
            }
        }
        listGxNew.push(obj)
    }
    return listGxNew
}

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
            res.json({
                code: 200,
                length: listGiaoXu.length,
                page: page,
                data: await findGx(listGiaoXu),
            })
        } catch (error) {
            console.log(error)
        }
    }

    searchGx(req, res, next) {
        const params = req.body.searchValue;
        GiaoXu.find({
            detail: {$regex:params, $options: "i"}
        })
            .then(async (resq) => res.json({
                code: 200,
                length: resq.length,
                data: await findGx(resq),
            }))
            .catch(err => res.json({
                code: 500,
                err: err,
            }))
    }
    
}

module.exports = new GiaoXuController;