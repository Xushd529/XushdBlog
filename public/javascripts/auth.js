/**
 * Created by Xushd on 2016/12/6.
 */
layui.define(['jquery','layer','MD5'], function(exports){
    var $=layui.jquery,layer = layui.layer,MD5 = layui.MD5
    $(".btn",$(".login")).click(function(){
        var useraccout = $("#user_accout").val().trim();
        var userpassword = $("#user_password").val();
        if (!useraccout||useraccout=="") {
            $("#user_accout").focus();
            layer.tips('用户名不能为空', '#user_accout',{tips:3});
            return;
        }

        if (!userpassword||userpassword=="") {
            $("#user_password").focus();
            layer.tips('用户密码不能为空', '#user_password',{tips:3});
            return;
        }
        userpassword = MD5.hex_md5(userpassword);
        console.log(userpassword);
        $.ajax({
            url: "/login",
            type: "POST",
            data: {UserName: useraccout, Password: userpassword},
            success: function (data) {
                if (data.valid === true) {
                    window.location.href = data.returnTo;
                } else {
                    layer.msg('帐号或密码错误', {icon: 5});

                }
            }
        });

    })






    exports('auth', {});
});




