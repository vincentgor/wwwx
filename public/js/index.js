
// 提交
$("#submit").click(function(){

    alert('准备提交');

    $.ajax({
        type: "POST",
        dataType: "json",
        url: '/api/v1/questionnaire',
        success: function (data) {
            alert(JSON.stringify(data));
            alert('提交成功');
            console.log(data);
            location.href = '/redpackage.html';
        },
        error: function (err) {
            alert(JSON.stringify(err))
        }
    });


});

$("#getRedPackage").click(function(){

    var randomCode = $('#random').val();

    if (randomCode.trim() == '') {
        alert('随机码不能为空');
        return;
    }

    alert('准备领取');

    $.ajax({
        type: "POST",
        dataType: "json",
        url: '/api/v1/red',
        success: function (data) {
            alert(JSON.stringify(data));
            alert('领取成功');
            console.log(data);
            location.href = '/';
        },
        error: function (err) {
            alert(JSON.stringify(err))
        }
    })

});