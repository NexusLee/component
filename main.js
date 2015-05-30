require.config({
    paths:{
        jquery: 'jquery-1.11.3.min'
    }
})
require(['jquery','dialog/dialog'], function ($, dialog) {
    $("#a").click(function(){
        new dialog.Dialog().alert({
            width: 300,
            y: 50,
            hasCloseBtn: true,
            content: 'welcome',
            title: '提示',
            close_handler: function () {
                alert("you click the close button");
            },
            callback: function () {
                alert("you click the alert button");
            }
        });
    })
});