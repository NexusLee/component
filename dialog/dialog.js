define(['jquery'],function($){
    function Dialog(){};

    Dialog.prototype = {
        alert: function(){
            console.log("123");
        },
        confirm: function(){},
        prompt: function(){}
    }

    return {
        Dialog : Dialog
    }

});
