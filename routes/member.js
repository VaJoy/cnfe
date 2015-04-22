var router = require('koa-router'),
    mount = require('koa-mount'),
    getHost = require('../modules/getHost'),
    apiRouter = new router();


module.exports = function (app) {

    apiRouter.get('/reg', function *() {  //首页
        yield this.render('member/reg', {
            title: "/注册",
            dirpath: getHost(this)
        });
    });

    apiRouter.get('/login', function *() {  //首页
        yield this.render('member/login', {
            title: "/用户登录",
            dirpath: getHost(this)
        });
    });

    app.use(mount('/member', apiRouter.middleware()));
};
