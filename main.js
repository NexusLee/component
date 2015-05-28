require.config({
    paths:{
        jquery: 'jquery-1.11.3.min'
    }
})
require(['jquery','dialog/dialog'], function ($, dialog) {
    $("#a").click(function(){
        new dialog.Dialog().alert('welcome', function(){
            alert("you click the button");
        },{
            width: 300,
            height: 150,
            y: 50
        });
    })
});