require.config({
    paths:{
        jquery: 'jquery-1.11.3.min',
        jqueryUI: 'http://code.jquery.com/ui/1.10.4/jquery-ui'
    }
})
require(['jquery','dialog/dialog'], function ($, dialog) {
    $("#a").click(function(){
        var d = new dialog.Dialog();
        d.alert({
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
        }).on("alert", function(){
            alert("the second alert handler");
        }).on("alert", function(){
            alert("the third alert handler");
        });
        d.on("close", function(){
            alert("the second close handler");
        });

    })
});