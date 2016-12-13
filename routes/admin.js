/**
 * Created by Xushd on 2016/12/9.
 */
var express = require('express');
var router = express.Router();

//后台首页
router.get('/', function (req, res, next) {
    res.render('admin/index');
});
//欢迎页面
router.get('/welcome',function(req,res,next){
    res.render('admin/welcome');
})

module.exports = router;