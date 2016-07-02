
// $(document).ready(() => {
//     alert(324);
//     login();
// });

// 登录授权
(function () {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: '/api/v1/wechat/login?callback=' + location.href,
        success: function (data) {
            console.log(data);
            if (data.code) {
                // 没有登录
                location.href = data.url;
            }
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    });
});

// 提交
$("#submit").click(function(){

    $.ajax({
        type: "POST",
        dataType: "json",
        url: '/api/v1/questionnaire',
        success: function (data) {
            alert(JSON.stringify(data));
            console.log(data);
            location.href = '/redpackage.html';
        },
        error: function (err) {
            alert(JSON.stringify(err))
        }
    });


});

// 领取红包
$("#hongbao").click(function(){

    var randomCode = $('#random').val();

    if (randomCode.trim() == '') {
        alert('随机码不能为空');
        return;
    }

    $.ajax({
        type: "POST",
        dataType: "json",
        url: '/api/v1/red',
        success: function (data) {
            alert(JSON.stringify(data));
            console.log(data);
            letDivHide("#redPage");
            letDivCenter("#personalDiv");
        },
        error: function (err) {
            alert(JSON.stringify(err))
        }
    })

});

// 让指定的DIV始终显示在屏幕正中间 
function letDivCenter(divName){   
    var top = ($(window).height() - $(divName).height())/2;   
    var left = ($(window).width() - $(divName).width())/2;   
    var scrollTop = $(document).scrollTop();   
    var scrollLeft = $(document).scrollLeft();   
    $(divName).css( { position : 'absolute', 'top' : top + scrollTop, left : left + scrollLeft } ).show();  
}  

// 让指div消失
function letDivHide(divName){   
    $(divName).hide();
}  