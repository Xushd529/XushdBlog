/**
 * Created by Xushd on 2016/12/8.
 */
var db = require("./mongodb");
var mongoose = db.mongoose;
var base = db.base;

var tipsSchema = new mongoose.Schema({
    //唯一键
    _id: {type: String, unique: true},
    //每日一言
    tip_content: {type: String},
    //随机参数
    round:{type:Number}
});
exports.TipsModel = mongoose.model("tips",tipsSchema,"tips");