/**
 * Created by Xushd on 2016/12/6.
 */
layui.define(['jquery','layer'], function(exports){
    var $=layui.jquery,layer = layui.layer
    $(".btn",$(".login")).click(function(){
        var useraccout = $("#user_accout").val().trim();
        var userpassword = $("#user_password").val();
        if (!useraccout||useraccout=="") {
            $("#user_accout").focus();
            layer.tips('用户名不能为空', '#user_accout');
            return;
        }

        if (!userpassword||userpassword=="") {
            $("#user_password").focus();
            layer.tips('用户密码不能为空', '#user_password');
            return;
        }
    })






    exports('auth', {}); //ע�⣬������ģ������ĺ��ģ�ģ���������useʱ��ģ����һ��
});




