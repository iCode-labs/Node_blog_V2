'use strict';

exports=module.exports=statistics;

function statistics(opts){
    return function*(next){
        var ip=this.ip;
        var date=new Date;
        log(ip);
        yield next;
    }
}



