
var conf = {
    cookieSecret:["feCookie"],
    _DB:"fedb",
    _HOST:"localhost:27017"
};
conf._PATH = conf._HOST + "/" + conf._DB;
module.exports = conf;