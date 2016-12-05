/**
 * Created by Xushd on 2016/12/4.
 */

var query = require('../models/mysql.js')


describe('async', function () {
    it('async', function (done) {
        query("SELECT * FROM tips ORDER BY RAND() LIMIT 1",function(err,vals,fields){
            if(err){
                console.log(err);
                done();
            }else{
                console.log(vals);
                done();
            }
        });
    });
});