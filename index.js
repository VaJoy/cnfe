var koa = require('koa');
var app = koa();
var router = require('koa-router');
var mount = require('koa-mount');
var api = require('./test.js');
var logger = require('koa-logger');
var limit = require('koa-better-ratelimit');
//Add the lines below just under error middleware.
app.use(limit({ duration: 1000*60*3 , // maximum ten requests in 3mins for one user
    max: 10, blacklist: []}));//you can add a array of IP addresses which will be blacklisted and their request
app.use(logger());

var compress = require('koa-compress');
var opts =  {
    //filter: function (content_type) { return /text/i.test(content_type) }, // filter requests to be compressed using regex
    threshold: 1024, //minimum size to compress
    flush: require('zlib').Z_SYNC_FLUSH
};
//use the code below to add the middleware to the application
app.use(compress(opts));



var handler = function *(next){
    this.type = 'json';
    this.status = 200;
    this.body = {'Welcome': 'This is a level 2 Hello World Application!!'};
};

var fs = require('fs');
var fshandler = function *(next) {
    this.compress = true;
    this.type = 'html';
    this.body = fs.createReadStream('./index.html')
};
var APIv0 = new router();
APIv0.get('/all', fshandler);
app.use(APIv0.routes());

//var APIv1 = new router();
//APIv1.get('/all', handler);
//APIv1.get('/all', api.all);
//APIv1.get('/single', api.single);
//
////app.use(APIv1.routes());
//app.use(mount('/v1', APIv1.middleware()));  //http://localhost:3000/v1/all?name=v
if (!module.parent) app.listen(3000);
console.log('Hello World is Running on http://localhost:3000/');
