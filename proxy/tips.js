/**
 * Created by Xushd on 2016/12/8.
 */
var tipsModel = require("../models/tips").TipsModel;
var tool = require("../utils/tool");

/*随机获取tips*/
exports.getRoundTip = function(callback){
    tipsModel.count(function(err,count){
        if(err){
            console.log(err);
            return callback(err);
        }
        var round = tool.getRound(count);
        var param ={round:round};
        tipsModel.findOne(param,function (err, tips) {
            //读取数据库出错
            if (err) {
                console.log(err);
                return callback(err);
            }
            return callback(null, tips);
        });
    });
}