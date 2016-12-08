var express = require('express');
var router = express.Router();
var path = require('path');
var async = require('async');
var util = require('../utils/tool.js');
var tips = require('../proxy/tips');
/* GET home page. */
router.get('/', function(req, res, next) {
    //parallel函数是并行执行多个函数，每个函数都是立即执行，不需要等待其它函数先执行。
    async.parallel([
        function(callback){
            util.getConfig(path.join(__dirname, '../config/setting.json'),function(err, settings){
                if (err) {
                    callback(err);
                } else {
                    callback(null, settings);
                }
            });
        },
        function(callback){
            tips.getRoundTip(function(err,tips){
                if(err){
                    callback(err);
                }else{
                    callback(null, tips);
                }
            })
        }
    ],function(err,results){
        if(err){
            next(err);
        }else{
            var settings = results[0];
            var tip = results[1];
            //console.log(tip);
            res.render('index', {
                title: settings["SiteName"],
                nowdate:util.getNowDate(),
                nowweek:util.getNowWeek(),
                tip:tip.tip_content
            });
        }

    });
});

module.exports = router;
