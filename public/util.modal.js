/**
 * 模式对话框
 */
KISSY.add('iee/util.modal', function(S, DOM, Event, IO, Anim){

    function Modal(params){
        this.init();

        params = params || {};

        this.setTitle(params.title);
        this.setBody(params.body);
        this.setFooter(params.footer);

        if(params.cls){
            DOM.addClass(this.el, params.cls);
            DOM.addClass(this.maskEl, params.cls + '-mask');
        }

        this.params = params;
    }

    S.augment(Modal, S.EventTarget, {
        init: function(){
            var self = this;

            self.el = DOM.create('<div class="modal"></div>');
            self.el.innerHTML = '<div class="modal-header"></div><div class="modal-body"></div><div class="modal-footer"></div>';
            self.headerEl = DOM.get('div.modal-header', self.el);
            self.bodyEl = DOM.get('div.modal-body', self.el);
            self.footerEl = DOM.get('div.modal-footer', self.el);

            DOM.insertBefore(self.el, document.body.lastChild);

            self.maskEl = DOM.create('<div class="modal-mask"></div>');
            DOM.insertBefore(self.maskEl, self.el);

            Event.on(window, 'scroll resize', function(){
                if(self.isShow){
                    self.center();
                }
            });
            Event.on(self.footerEl, 'click', function(vo){
                if('true' === DOM.attr(vo.target, 'data-dismiss')){
                    self.hide();
                }
            });
        },
        setTitle: function(title){
            if(title){
                this.headerEl.innerHTML = title;
                this.headerEl.style.display = 'block';
            }else{
                this.headerEl.style.display = 'none';
            }
        },
        setBody: function(html){
            this.bodyEl.innerHTML = html || '';
        },
        setFooter: function(html){
            if(html){
                /*
                 * title 标题
                 * act: 触发的操作
                 * primary true|false 主按钮
                 * href 链接（将以链接展示）
                 * dismiss 默认为true，点击后会关闭层
                 */
                if(S.isArray(html)){
                    var footerHtml = '';
                    S.each(html, function(vo){
                        var cls = ['btn'];
                        if(vo.primary){
                            cls.push('btn-primary');
                        }

                        var dismiss = vo.dismiss;
                        dismiss = dismiss ? ' data-dismiss="true" ' : '';

                        if(vo.href){
                            footerHtml += '<a class="' + cls.join(' ') + '" ' + ' href="' + vo.href + '" ' + dismiss + ' target="' + (vo.target || '_blank') + '">' + vo.title + '</a>';
                        }else{
                            footerHtml += '<span tabindex="0" class="' + cls.join(' ') + '" ' + dismiss + ' data-act="' + vo.act + '">' + vo.title + '</span>';
                        }
                    });
                    this.footerEl.innerHTML = footerHtml;
                }else{
                    this.footerEl.innerHTML = html;
                }

                this.footerEl.style.display = 'block';
            }else{
                this.footerEl.style.display = 'none';
            }
        },
        /**
         * 打开一个链接地址
         */
        open: function(url, title){
            var self = this;

            self.setTitle(title);
            self.setBody('加载中...');
            self.show();

            IO.get(url, new Date().getTime(), function(html){
                self.setBody(html);
                self.center();
            }, 'html');
        },
        show: function(){
            var self = this;

            self.maskEl.style.visibility = 'visible';
            self.el.style.visibility = 'visible';
            self.isShow = true;
            self.center();

            if('fade' === self.params.effect){
                DOM.css(self.el, 'opacity', 0);
                (new Anim(self.el, {opacity: 1}, 0.6, 'easeOutString', function(){
                    self.fire('show');
                })).run();
            }else{
                self.fire('show');
            }
        },
        hide: function(){
            var self = this;

            self.isShow = false;
            self.maskEl.style.visibility = 'hidden';

            if('fade' === self.params.effect){
                (new Anim(self.el, {opacity: 0}, 0.6, 'easeInString', function(){
                    self.el.style.visibility = 'hidden';
                    self.fire('hide');
                })).run();
            }else{
                self.el.style.visibility = 'hidden';
                self.fire('hide');
            }

        },
        center: function(){
            var el = this.el;
            DOM.css(el, {
                top: DOM.scrollTop() + (DOM.viewportHeight() - DOM.outerHeight(el)) * 3 / 7,
                left: DOM.scrollLeft() + (DOM.viewportWidth() - DOM.outerWidth(el)) / 2
            });
        }
    });

    /**
     * 进度指示
     */
    function ProgressBar(){
    }

    S.augment(ProgressBar, {
        show: function(tip){
            var self = this;
            self._init();

            self.tipEl.innerHTML = tip || '处理中...';

            var idx = 0;
            var lastEl;
            var els = self.els;
            var len = self.length;
            DOM.removeClass(els);

            self._stop();

            var highlight = function(){
                DOM.removeClass(lastEl, 'active');
                lastEl = els[idx++];
                DOM.addClass(lastEl, 'active');

                if(idx >= len){
                    idx = 0;
                }

                self.timer = S.later(highlight, 300);
            };
            highlight();

            self.modal.show();
        },
        _stop: function(){
            if(this.timer){
                this.timer.cancel();
            }
        },
        hide: function(){
            if(this.modal){
                this._stop();
                this.modal.hide();
            }
        },
        _init: function(){
            if(this.modal){
                return;
            }
            var html = '<div class="list">';
            var i = 12;

            do{
                html += '<span></span>';
                i--;
            }while(i > 0);

            html += '</div><div class="tip"></div>';

            var modal = new Modal({
                cls: 'progressbar',
                body: html
            });

            var bodyEl = modal.bodyEl;
            this.tipEl = DOM.get('div.tip', bodyEl);
            this.els = DOM.children(DOM.get('div.list', bodyEl));
            this.length = this.els.length;

            this.modal = modal;
        }
    });

    Modal.ProgressBar = ProgressBar;

    return Modal;
}, {
    requires: [
        'dom', 'event', 'ajax', 'anim',
        'iee/util.modal.css'
    ]
});
