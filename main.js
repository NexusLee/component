require.config({
    paths:{
        jquery: 'jquery-1.11.3.min'
    }
})
require(['jquery','dialog/dialog'], function ($, dialog) {
    $("#a").click(function(){
        new dialog.Dialog().alert();
    })
});