var rMsie = /msie\s|trident\/4/; //IE8-

module.exports = function (app) {
    app.context.detectIE = function *(){
        if (rMsie.test(this.header["user-agent"].toLowerCase())){
            yield this.render('info/IEuser', {
                title: "/出错提示"
            });
            return false;
        }
        return true;
    };
};
