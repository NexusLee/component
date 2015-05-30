define(['jquery'],function($){
    function Dialog(){
        this.config = {
            width : 500,
            title: "系统消息",
            content: "",
            hasCloseBtn: false,
            close_handler: null,
            callback: null
        }
    };

    Dialog.prototype = {
        alert: function(config){
            //$('body').prepend('<div id="mask"></div>').find('#mask').css({opacity:0.5,  cursor:'pointer', background:'black', position:'absolute', zIndex:999, width:'100%',  height:$(document).height()});

            var config = $.extend(this.config, config);
            var box = $('<div class="dialog-box">'+
                            '<div class="dialog-head">' + config.title + '</div>'+
                            '<div class="dialog-body">' + config.content + '</div>'+
                            '<div class="dialog-foot"><input type="button" value="确定" /></div>'+
                        '</div>'
            );
            if(config.hasCloseBtn){
                var closeBtn = $('<span class="dialog-closeBtn">X</span>');
                closeBtn.appendTo(box);
                closeBtn.click(function (){
                    config.close_handler && config.close_handler();
                    box.remove();
                });
            }
            box.appendTo("body");//.fadeIn().animate({'top':'60%'});
            var btn = box.find(".dialog-foot input");
            btn.click(function(){
                config.callback && config.callback();
                box.remove();
                $('#mask').remove();
            });
            box.css({
                width: config.width + "px",
                height: config.height + "px",
                left: (config.x || (window.innerWidth - config.width)/2 ) + "px",
                top: (config.y || (window.innerHeight - config.height)/2 ) + "px"
            })

        },
        confirm: function(){},
        prompt: function(){}
    }

    return {
        Dialog : Dialog
    }

});
