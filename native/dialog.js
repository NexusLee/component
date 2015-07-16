    //默认的层级从1000开始
    var zIndex = 1000;
    //相当于id
    var index = 0;
    var _html = '<div id="dialog_<%=index%>" class="dialog" style="width:<%=width%>px;margin:0;display:none;z-index:<%=zIndex%>">\
      <div class="dialog-head">\
        <%if(title){%><p class="dia-title"><%=title%></p><% } %>\
        <em class="close-ico" id="close_<%=index%>">X</em>\
      </div>\
      <div class="dialog-con" style="<%=textStyle%>">\
        <div>\
		   <p><%=body%></p>\
			<%if(!bottom) {%>\
				<div class="single-btn-area">\
				<input id="dialog_confirm_<%=index%>" class="btn status1-btn" type="submit" value="确定">\
				<input id="dialog_cancel_<%=index%>" class="btn" type="reset" value="取消">\
				</div>\
			<% } else {%>\
				<%=bottom%>\
			<% } %>\
		</div>\
      </div>\
    </div>';

    var dialog = (function(w){
        var jqWIN = $(w);
        return {
            show:function(opt){
                opt = opt||{};
                this.opt = opt;
                var _index = index++;
                var html = mstmpl(_html,{
                    title:opt.title,
                    body:opt.body||'',
                    bottom:opt.bottom||'',
                    index:_index,
                    zIndex:zIndex++,
                    textStyle:opt.textStyle,
                    width:opt.width||'400'
                });

                $('body').append(html);
                $('body').append('<div id="dialog_bg" class="gray-bg dialog_bg" style="z-index:100"></div>');
                this.el = $('#dialog_'+_index);

                //没有底部的结构就不需要事件绑定
                if(!opt.bottom){
                    this.cancelButton = $('#dialog_cancel_'+_index);
                    this.confirmButton = $('#dialog_confirm_'+_index);
                }
                this.onshow = opt.onshow||function(){};
                this.onclose = opt.onclose||function(){};
                this.closeButton = $('#close_'+_index);

                if(!$('body').find('.dialog_bg').length){
                    $('body').append('<div class="gray-bg dialog_bg" style="z-index:100"></div>');
                }
                this.bind();

                function bgHeight(){
                    var dialog_bg = document.getElementById("dialog_bg");
                    var bodyHeight = $(document).height();
                    var windowHeight = $(window).height();
                    if(windowHeight < bodyHeight){
                        dialog_bg.style.height = (bodyHeight) + "px";
                    }else{
                        dialog_bg.style.height = "100%";
                    }
                    dialog_bg.style.width = Math.max($(".dialog").width(), $(document).width()) + "px";
                    dialog_bg.style.display = "block";
                }
                bgHeight();
                $(window).resize(function() {
                    if(document.getElementById("dialog_bg")){
                        bgHeight();
                    }
                });
                this.el.show();
                this._reposition();
                this.onshow();

                ///渲染后可以自己定义一些自定义事件
                setTimeout(function(){
                    opt.afterRender && opt.afterRender();
                },0);
            },
            setTitle:function(html){
                this.el.find('.dia-title').html(html);
            },
            bind:function(){
                var _self = this;
                this.cancelButton&&this.cancelButton.click(function(){
                    _self.close();
                });

                this.closeButton.click(function(){
                    _self.close();
                });

                this.confirmButton&&this.confirmButton.click(function(){
                    _self.opt.onconfirm();
                    return false;
                });

                jqWIN.resize(function(){
                    _self._reposition();
                });
                return this;
            },
            _reposition:function(){
                this.el.css({
                    top:(jqWIN.height()-this.el.height())/2+jqWIN.scrollTop(),
                    left:(jqWIN.width()-this.el.width())/2
                });
            },

            hide:function(){
                this.el.hide();
                $('body').find('.dialog_bg').remove();
            },

            close:function(){
                this.el.remove();
                this.onclose();
                $('body').find('.dialog_bg').remove();

            }
        }

    })(window);
