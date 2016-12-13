/**
 * Created by Xushd on 2016/12/8.
 */
var dbPath = require('../config').DbPath;
var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var i18n = require('./i18n');


mongoose.connect(dbPath);
var db = mongoose.connection;
db.on('error', function (err) {
    console.error(i18n.__('error.db_1') + err);
    process.exit(1);
});
exports.mongoose = mongoose;
//基础Schema
var base = new mongoose.Schema({
    //唯一键
    _id: {type: String, unique: true},
    //创建时间
    CreateTime: {type: Date},
    //修改时间
    ModifyTime: {type: Date}
});
exports.base = base;