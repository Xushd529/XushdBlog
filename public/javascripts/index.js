/**
 * Created by Xushd on 2016/12/2.
 */

//页面加载
$('body').show();
$('.version').text(NProgress.version);
NProgress.start();
setTimeout(function() { NProgress.done(); $('.fade').removeClass('out'); }, 1000);

$(function(){
    /*显示隐藏回到顶部按钮*/
    $(window).scroll(function(){
        if($(window).scrollTop()>100){
            $(".gotop").fadeIn();
        }
        else{
            $(".gotop").hide();
        }
    });
    /*返回顶部*/
    $(".gotop").click(function(){
        $('html,body').animate({'scrollTop':0},500);
    });

    requestData();

});
/**
 * 获取数据
 */
var requestData = function(){
    $.ajax({
        url: '/blog/getPosts',
        type: 'GET',
        data: $('#filterForm').serialize(),
        success: function (result) {
            var end = new Date();
            var data = result.posts;
            pageCount = result.pageCount;
            if (end - begin > timeout) {
                addPage($("#PageIndex").val(), data);
            } else {
                var timespan = timeout - (end - begin);
                setTimeout(function () {
                    addPage($("#PageIndex").val(), data);
                }, timespan);
            }
        }
    });
}