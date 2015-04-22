var fs = require('fs'),
    koa = require('koa'),
    compress = require('koa-compress'),
    render = require('koa-ejs'),
    detectIE = require('./modules/detectIE'),
    mime = require('mime-types'),
    session = require('koa-session'),
    dbconf = require('./fe_db/setting'),
    r_home = require('./routes/home'),
    r_member = require('./routes/member'),
    limit = require('koa-better-ratelimit');

var app = koa();

app.keys = dbconf.cookieSecret;
app.use(session({key:"CNFE:sess"},app));

app.use(limit({ duration: 1000*10 , // maximum 500 requests in 10secs for one user
    max: 500, accessLimited : "您的请求太过频繁，请稍后重试"})
);
app.use(compress({
    threshold: 50, //minimum size to compress
    flush: require('zlib').Z_SYNC_FLUSH
}));

render(app, {
    root: './views',
    layout: false ,
    viewExt: 'html',
    cache: false,
    debug: true
});
detectIE(app);

//路由
r_home(app);
r_member(app);

//资源
app.use(function*(next){
    var p = this.path;
    this.type = mime.lookup(p);
    this.body = fs.createReadStream('.'+p);
});

app.listen(1300);