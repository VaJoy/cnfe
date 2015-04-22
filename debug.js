var koa = require('koa');
var render = require('koa-ejs');
var path = require('path');
var wait = require('co-wait');

var locals = {
    version: '0.0.1',
    now: function () {
        return new Date();
    },
    ip: function *() {
        yield wait(100);
        return this.ip;
    }
};

var filters = {
    format: function (time) {
        return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate();
    }
};

var app = koa();
render(app, {
    root: path.join(__dirname, 'view'),
    layout: false ,
    viewExt: 'html',
    cache: false,
    debug: true,
    locals: locals,
    filters: filters
});

app.use(function *() {
    var title = "ok",
        users = [{name: 'Dead Horse'}, {name: 'Jack'}, {name: 'Tom'}];
    yield this.render('user',{
        title: title,
        users: users
    });
});

app.listen(7001);