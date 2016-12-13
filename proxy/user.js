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

exports.userlogin = function(Username,Password,cb){
    var query ={Username:Username,Password:Password};
    userModel.findOne(query,function(err,user) {
        if (err) {
            return cb(err);
        }
        return cb(null, user);
    });

};
/**
 * 根据_id查询
 * @param id
 * @param cb
 */
exports.findById = function(id,cb){
    var mongoose = require('mongoose');
    id = mongoose.Types.ObjectId(id);
    userModel.findOne({_id:id},function(err,user) {
        if (err) {
            return cb(err);
        }
        return cb(null, user);
    });
}
/**
 * 查询单条用户信息
 * @param query
 * @param callback
 */
exports.find = function(query,cb){
    userModel.findOne(query,function(err,user){
        if(err){
            return cb(err);
        }
        return cb(null,user);
    });
};


