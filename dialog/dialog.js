define(['jquery'],function($){
    function Dialog(){
        this.config = {
            width : 500,
            height : 300
        }
    };

    Dialog.prototype = {
        alert: function(content, callback, config){
            $('body').prepend('<div id="mask"></div>').find('#mask').css({opacity:0.5,  cursor:'pointer', background:'black', position:'absolute', zIndex:999, width:'100%',  height:$(document).height()});

            var box = $('<div class="dialog_box"></div>');
            box.appendTo("body");//.fadeIn().animate({'top':'60%'});
            box.html(content);
            var btn = $('<input type="button" value="确定" />');
            btn.appendTo(box);
            btn.click(function(){
                callback && callback();
                box.remove();
                $('#mask').remove();
            });
            $.extend(this.config, config);
            box.css({
                width: this.config.width + "px",
                height: this.config.height + "px",
                left: (this.config.x || (window.innerWidth - this.config.width)/2 ) + "px",
                top: (this.config.y || (window.innerHeight - this.config.height)/2 ) + "px"
            })

          //  $($(this).attr('href')).fadeIn().animate({'top':'60%'});
        },
        confirm: function(){},
        prompt: function(){}
    }

    return {
        Dialog : Dialog
    }

});
