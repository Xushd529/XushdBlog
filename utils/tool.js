/**
 * 工具类
 * Created by Xushd on 2016/12/2.
 */
var fs = require('fs');

/**
 *  读取配置文件
 * @param filePath
 * @param key
 * @param callback
 */
exports.getConfig = function(filePath,key,callback){
    //第二个参数是callback
    if(typeof key === 'function'){
        callback = key;
        key = undefined;
    }
    fs.readFile(filePath,'utf8',function(err,file){
        if(err){
            console.log('读取文件%s出错：' + err, filePath);
            return callback(err);
        }
        var data = JSON.parse(file);
        if(typeof key ==='string'){
            data = data[key];
        }
        return callback(null,data);
    })

};
/**
 * 获取当期日期 2016年12月2日
 * @returns {string}
 */
exports.getNowDate = function(){
    var myDate = new Date();
    return myDate.getFullYear()+"年"+(myDate.getMonth()+1)+"月"+myDate.getDate()+"日";
};
/**
 * 获取当前星期几
 * @returns {string}
 */
exports.getNowWeek = function(){
    var week = ["日","一","二","三","四","五","六"];
    return "星期"+week[new Date().getDay()];
};
/**
 * 获取指定范围内随机数
 * @param num
 * @returns {number}
 */
exports.getRound = function(num){
   return Math.round(Math.random()*(num-1)+1);
};
/**
 * 根据总条数和分页大小获取页数
 * @param recordCount
 * @param perPage
 * @returns {number}
 */
exports.page_count=function(recordCount,perPage) {
    var pc = Math.ceil(recordCount/perPage);
    console.log(pc);
    return (pc==0)?1:pc;
}

