const testController = require('../controllers/TestController');

function route(app, url) {
    app.get(`${url}/test`, testController.index);
}

module.exports = route