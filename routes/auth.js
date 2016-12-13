/**
 * Created by Xushd on 2016/12/5.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var user = require("../proxy/user");
var logger = require("../utils/logger");
passport.use(new Strategy(
    {
        usernameField: 'UserName',//页面上的用户名字段的name属性值
        passwordField: 'Password'//页面上的密码字段的name属性值
    },
    function (username, password, callback) {
        user.userlogin(username,password,function(err,user){
            if(err){
                return callback(null, false);
            }
            //验证通过
            return callback(null, user);
        });
    })
);
passport.serializeUser(function (user, callback) {
    callback(null, user._id);
});
passport.deserializeUser(function (id, callback) {
    user.findById(id,function(err,user){
        if(err){
            return callback(err);
        }
        return callback(null, user);
    });
});

/*后台入口*/
router.get('/login',function(req, res, next){
    res.render('admin/login');
});
/*提交登录请求*/
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            next(err);
        } else if (!user) {
            logger.errLogger(req, new Error(res.__("auth.wrong_info")));
            res.json({valid: false});
        } else {
            //登录操作
            req.logIn(user, function (err) {
                if (err) {
                    next(err);
                } else {
                    res.json({
                        valid: true,
                        returnTo: '/admin'
                    });
                }
            });
        }
    })(req, res, next);
});
module.exports = router;