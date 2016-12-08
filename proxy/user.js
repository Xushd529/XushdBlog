/**
 * Created by Xushd on 2016/12/8.
 */
var userModel = require('../models/user').UserModel;

/**
 * 用户登录
 * @param Username 用户名
 * @param Password 密码
 * @param callback 回调函数
 */

exports.userlogin = function(Username,Password,callback){
    var query ={Username:Username,Password:Password};
    userModel.findOne(query,function(err,user) {
        if (err) {
            return callback(err);
        }
        return callback(null, user);
    });

};
/**
 * 查询单条用户信息
 * @param query
 * @param callback
 */
exports.find = function(query,callback){
    userModel.findOne(query,function(err,user){
        if(err){
            return callback(err);
        }
        return callback(null,user);
    });
};


