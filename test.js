var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost:27017/mydb');
var words = wrap(db.get('words'));
/**
 * GET all the results.
 */
exports.all = function *(){
    this.compress = true;
    yield words.remove({});
    yield words.insert({ name: 'v', species: '瞎BB', he: 'hehe' });
    yield words.insert({ name: 'a22', species: '瞎BB' });
    if(this.request.query.name){
        var res = yield words.find({'name':this.request.query.name});
        this.body = res;
    } else {
        this.type = 'json';
        this.status = 200;
        this.body = {'Welcome': this.request.query.name};
    }
};
/**
 * GET a single result.
 */
exports.single = function *(){
    if(this.request.query.word){
        var res = yield words.findOne({ word : this.request.query.word });
        this.body = res;
    } else {
        this.response.status = 404;
    }
};