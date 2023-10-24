const LinhMucController = require('../controllers/LinhMucController');
const testController = require('../controllers/TestController');

function route(app, url) {

    // [GET] api/v1/...
    app.get(`${url}/test`, testController.index);
    app.get(`${url}/linhmucdoan`, LinhMucController.showAllLinhMuc);
    app.get(`${url}/linhmucdoan/page/:page`, LinhMucController.showMoreLinhMuc);

}

module.exports = route