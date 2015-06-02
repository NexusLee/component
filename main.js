require.config({
    paths:{
        jquery: 'jquery-1.11.3.min',
        jqueryUI: 'http://code.jquery.com/ui/1.10.4/jquery-ui'
    }
})
require(['jquery','dialog/dialog'], function ($, dialog) {
    $("#a").click(function(){
        new dialog.Dialog().alert({
            width: 300,
            y: 50,
            hasCloseBtn: true,
            skinClassName: 'customClass',
            content: 'welcome',
            title: '提示',
            alertBtn: 'OK',
            dragHandle: ".dialog-head",
            close_handler: function () {
                alert("you click the close button");
            },
            callback: function () {
                alert("you click the alert button");
            }
        });
    })
});