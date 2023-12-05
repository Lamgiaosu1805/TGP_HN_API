const GiaoLyController = require('../controllers/GiaoLyController');
const GiaoXuController = require('../controllers/GiaoXuController');
const LinhMucController = require('../controllers/LinhMucController');
const AuthController = require('../controllers/AuthController');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');
const CapKhanController = require('../controllers/CapKhanController');
const ChucVuController = require('../controllers/ChucVuController');
const XuDoanController = require('../controllers/XuDoanController');
const MemberInfoController = require('../controllers/MemberInfoController');

function route(app, url) {

    // [GET] api/v1/...
    app.get(`${url}/linhmucdoan`, LinhMucController.showAllLinhMuc);
    app.get(`${url}/linhmucdoan/page/:page`, LinhMucController.showMoreLinhMuc);
    app.get(`${url}/giaoxu/page/:page`, GiaoXuController.showMoreGiaoXu);
    app.get(`${url}/tinmungthanhmattheu/:option`, GiaoLyController.getData);


    app.post(`${url}/linhmucdoan/search`, LinhMucController.searchLm);
    app.post(`${url}/giaoxu/search`, GiaoXuController.searchGx);
    app.post(`${url}/tinmungthanhmattheu/detail`, GiaoLyController.getDetail);



    //App TNTT
    app.get(`${url}/users`, auth.verifyTokenForManager, UserController.getAllUser);
    app.get(`${url}/capkhan`, CapKhanController.getAllCapKhan);
    app.get(`${url}/chucvu`, ChucVuController.getAllChucVu);

    app.post(`${url}/auth/signIn`, AuthController.signIn);
    app.post(`${url}/auth/signUp`, AuthController.signUp);

    //Tạo xứ đoàn
    app.post(`${url}/xudoan/create`, auth.verifyTokenForManager, XuDoanController.create);

    //Tạo profile member
    app.post(`${url}/xudoan/member/create`, MemberInfoController.create)

    //Tạo khởi đầu
    // app.post(`${url}/capkhan`, CapKhanController.create);
    // app.post(`${url}/chucvu`, ChucVuController.create)
}

module.exports = route