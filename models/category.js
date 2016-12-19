/**
 * Created by Xushd on 2016/12/15.
 */
var db = require("./mongodb");
var mongoose = db.mongoose;
var base = db.base;
var categorySchema = base.extend({
    //分类名称
    CateName: {type: String},
    //图标地址
    Img: {type: String},
    //链接地址
    Link: {type: String},
    //可用状态
    State:{type:Number},
    //描述
    Remark:{type:String}
});
exports.CategoryModel = mongoose.model("category",categorySchema,"category");