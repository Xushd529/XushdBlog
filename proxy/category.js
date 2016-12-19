/**
 * Created by Xushd on 2016/12/16.
 */
var categoryModel = require('../models/category').CategoryModel;
var i18n = require('../models/i18n');
var shortid = require('shortid');
/**
 * 保存分类信息
 * @param data
 * @param cb
 */
exports.save = function(data,cb){
    data._id= data._id || shortid.generate();
    data.CreateTime= new Date();
    data.ModifyTime= new Date();
    //判断名称是否重复
    categoryModel.findOne({CateName:data.CateName},function(err,old){
        if(err){
            return cb(err);
        }
        if(old!=null){
            return cb(i18n.__("Category.repeated"));
        }
        categoryModel.create(data,function(err){
            if(err){
                return cb(err);
            }
            return cb(null);
        })
    })

};
/**
 * 获取所有分类
 * @param params
 * @param cb
 */
exports.getAll = function (params, cb) {
    var page = parseInt(params.pageIndex) || 1;
    var size = parseInt(params.pageSize) || 10;
    page = page > 0 ? page : 1;
    var options = {};
    options.skip = (page - 1) * size;
    options.limit = size;
    var query = {};
    categoryModel.find(query, {}, options, function (err, res) {
        if (err) {
            return cb(err);
        }
        return cb(null, res);
    });
};
/**
 * 获取总的数量
 * @param params
 * @param callback
 */
exports.getCount = function (params, cb) {
    var query = {};
    categoryModel.count(query, function (err, count) {
        if (err) {
            return cb(err);
        }
        return cb(null, count);
    });
};