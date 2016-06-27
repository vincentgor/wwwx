
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
})();

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
$("#getRedPackage").click(function(){

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
            location.href = '/';
        },
        error: function (err) {
            alert(JSON.stringify(err))
        }
    })

});