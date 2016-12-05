var express = require('express');
var router = express.Router();
var path = require('path');
var async = require('async');
var util = require('../utils/tool.js');
var query = require('../models/mysql.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  //parallel�����ǲ���ִ�ж��������ÿ��������������ִ�У�����Ҫ�ȴ�����������ִ�С�
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
          query("SELECT * FROM tips ORDER BY RAND() LIMIT 1",function(err,vals,fields){
              if(err){
                  callback(err);
              }else{
                  callback(null,vals);

              }
          });
      }
  ],function(err,results){
      if(err){
          next(err);
      }else{
          var settings = results[0];
          var tip = results[1];
          res.render('index', {
              title: settings["SiteName"],
              nowdate:util.getNowDate(),
              nowweek:util.getNowWeek(),
              tip:tip[0].tip_content
          });
      }

  });
});

module.exports = router;
