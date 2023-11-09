const GiaoLyController = require('../controllers/GiaoLyController');
const GiaoXuController = require('../controllers/GiaoXuController');
const LinhMucController = require('../controllers/LinhMucController');

function route(app, url) {

    // [GET] api/v1/...
    app.get(`${url}/linhmucdoan`, LinhMucController.showAllLinhMuc);
    app.get(`${url}/linhmucdoan/page/:page`, LinhMucController.showMoreLinhMuc);
    app.get(`${url}/giaoxu/page/:page`, GiaoXuController.showMoreGiaoXu);
    app.get(`${url}/tinmungthanhmattheu/:option`, GiaoLyController.getData)


    app.post(`${url}/linhmucdoan/search`, LinhMucController.searchLm);
    app.post(`${url}/giaoxu/search`, GiaoXuController.searchGx);

}

module.exports = route