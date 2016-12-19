/**
 * Created by Xushd on 2016/12/9.
 */
var express = require('express');
var router = express.Router();
var category = require('../proxy/category');
var i18n = require('../models/i18n');
var async = require('async');
var tool = require('../utils/tool');
//后台首页
router.get('/', function (req, res, next) {
    res.render('admin/index');
});
//欢迎页面
router.get('/welcome',function(req,res,next){
    res.render('admin/welcome');
});
//分类管理
router.get('/category',function(req,res,next){
    res.render('admin/category');
});
//获取所有分类信息
router.get('/getCategories',function(req,res,next){
    var params = {
            pageIndex: req.query.pageNumber,
            pageSize: req.query.pageSize
        };
    async.parallel([
        function(cb){
            //获取分类列表
            category.getAll(params,function(err,result){
                if(err){
                    cb(err);
                }else{
                    cb(null,result);
                }
            });
        },
        function(cb){
            //获取总条数
            category.getCount(params,function(err,result){
                if(err){
                    cb(err);
                }else{
                    cb(null,result);
                }
            })
        }
    ],function(err, results){
        if(err){
            next(err);
        }else{
            var rows = results[0];
            var count = results[1];
            res.json({
                rows: rows,
                total: tool.page_count(count,params.pageSize)
            });
        }
    });
});
//保存分类信息
router.post('/saveCategory',function(req,res,next){
    var data = JSON.parse(req.body.json);
    category.save(data,function(err){
        if(err){
           // next(err);
            console.log(err);
           res.json({flag:0,msg:err});
        }else{
           res.json({flag:1,msg:i18n.__("success.add")});
        }

    });
});
module.exports = router;