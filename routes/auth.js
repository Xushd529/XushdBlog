/**
 * Created by Xushd on 2016/12/5.
 */
var express = require('express');
var router = express.Router();

router.get('/login',function(req, res, next){
    res.render('admin/login');
})
module.exports = router;