define(['jquery','jqueryUI'],function($, $UI){
    'use strict';
    function Dialog(){
        this.config = {
            width : 500,
            title: "系统消息",
            alertBtn:"确定",
            content: "",
            mask: true,
            hasCloseBtn: false,
            isDraggable: true,
            dragHandle: null,
            skinClassName: null,
            close_handler: null,
            callback: null
        },
        this.handlers = {}
    };

    Dialog.prototype = {
        on: function(type, handler){
            if(typeof this.handlers[type] == "undefined"){
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
            return this;
        },
        fire: function(type, data){
            if(this.handlers[type] instanceof Array){
                var handlers = this.handlers[type];
                for(var i= 0,len = handlers.length; i < len; i++){
                    handlers[i](data);
                }
            }
        },
        alert: function(config){
            //$('body').prepend('<div id="mask"></div>').find('#mask').css({opacity:0.5,  cursor:'pointer', background:'black', position:'absolute', zIndex:999, width:'100%',  height:$(document).height()});
            var mask = null,that = this,
                config = $.extend(this.config, config),
                box = $('<div class="dialog-box">'+
                            '<div class="dialog-head">' + config.title + '</div>'+
                            '<div class="dialog-body">' + config.content + '</div>'+
                            '<div class="dialog-foot"><input type="button" value="' + config.alertBtn + '" /></div>'+
                        '</div>'
                );
            if(config.mask){
                mask = $('<div id="mask"></div>');
                //mask.appendTo("body");
                $('body').prepend(mask);
            }
            if(config.hasCloseBtn){
                var closeBtn = $('<span class="dialog-closeBtn">X</span>');
                closeBtn.appendTo(box);
                closeBtn.click(function (){
                    box.remove();
                    mask && mask.remove();
                    that.fire("close");
                });
            }
            if(config.skinClassName){
                box.addClass(config.skinClassName);
            }
            if(config.isDraggable){
                if(config.dragHandle){
                    box.draggable({handle:config.dragHandle});
                }else{
                    box.draggable();
                }
            }
            box.appendTo("body");//.fadeIn().animate({'top':'60%'});
            var btn = box.find(".dialog-foot input");
            btn.click(function(){
                box.remove();
                mask && mask.remove();
                that.fire("alert");
            });
            box.css({
                width: config.width + "px",
                height: config.height + "px",
                left: (config.x || (window.innerWidth - config.width)/2 ) + "px",
                top: (config.y || (window.innerHeight - config.height)/2 ) + "px"
            })
            if(config.callback){
                this.on("alert", config.callback);
            }
            if(config.close_handler){
                this.on("close", config.close_handler);
            }
            return this;
        },
        confirm: function(){},
        prompt: function(){}
    }

    return {
        Dialog : Dialog
    }

});
