var router = require('koa-router'),
    getHost = require('../modules/getHost'),
    apiRouter = new router();

module.exports = function (app) {
    apiRouter.get('/', function *() {  //首页
        //console.log(this.detectIE);
        if(yield this.detectIE())
        yield this.render('home/index', {
            title: "",
            dirpath: getHost(this)
        });
    });


    app.use(apiRouter.routes());
};


