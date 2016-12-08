/**
 * Created by Xushd on 2016/12/8.
 */
var db = require("./mongodb");
var mongoose = db.mongoose;
var base = db.base;

var userSchema = base.extend({
    //用户名称
    Username:{type:String},
    //用户密码
    Password:{type:String}
});
exports.UserModel = mongoose.model("user",userSchema,"user");