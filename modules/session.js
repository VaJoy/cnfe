

module.exports = {
    set:function(){
        this.session.token = "log";
    },
    get:function(){

    },
    remove:function(){
        this.session = null;
    }
};