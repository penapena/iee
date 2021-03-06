KISSY.add('iee/fp.item', function(S, DOM, Event, Anim, IO, Base){

    var supportHistoryAPI = history.pushState;

    var Item = {};

    Item.init = function(){
        this.sliderEl = DOM.get('#slider');
        this.curPostId = DOM.attr(DOM.children(this.sliderEl), 'id').substr(4);

        if(supportHistoryAPI){
            history.pushState({
                id: Item.curPostId
            }, document.title, location.href);
        }

        this.initEvents();
        this.handleHash();
        this.handleStdPost(this.sliderEl);
    };

    Item.handleHash = function(){
        var id = location.hash.substr(2);
        if(id.match(/^\d+$/)){
            var self = this;
            self.sliderEl.innerHTML = '<p style="line-height:300px;color:#666;font-size:16px;letter-spacing:2px;text-align:center">正在搬运灵感...</p>';
            IO({
                type: 'get',
                url: '/' + id + '?async=y',
                success: function(html){
                    self.sliderEl.innerHTML = '<div class="panel" id="post' + id + '">' + html + '</div>';
                    self.update(DOM.get('#post' + id));
                    DOM.css('#trigger','visibility','visible');
                },
                error: function(){
                    window.location = '/' + id;
                }
            });
        }
    };

    Item.initEvents = function(){
        Event.on(window, 'keyup', function(ev){
            var direction = '';
            var keyCode = ev.keyCode;

            if(39 === keyCode || 34 === keyCode){  //右方向键、Page Down
                direction = 'next';
            }else if(37 === keyCode || 33 === keyCode){
                direction = 'prev';
            }

            if(direction){
                var el = DOM.get('a.' + direction, Item.albumMode ? '#albumTrigger' : '#trigger');
                if(el){
                    var cls = direction + '-hover';
                    DOM.addClass(el, cls);

                    (new Anim(el, {
                        opacity: 0.15
                    }, 0.3, 'easeBothStrong', function(){
                        DOM.removeClass(el, cls);
                    })).run();

                    Event.fire(el, 'click');
                }
            }
        });
    };

    Item.prev = function(target){
        this.switchTo(DOM.attr(target, 'href').substr(1), 'prev');
    };

    Item.next = function(target){
        this.switchTo(DOM.attr(target, 'href').substr(1), 'next');
    };

    Item.switchTo = function(id, direction){
        var toEl = DOM.get('#post' + id);
        toEl ? this.switchPost(toEl) : this.load(id, direction);
    };

    Item.switchPost = function(postEl, doPushState){
        var self = this;
        var sliderEl = self.sliderEl;

        S.each(DOM.children(sliderEl), function(el, idx){
            if(el !== postEl){ return; }

            (new Anim(sliderEl, {
                marginLeft: - idx * 990
            }, 0.6, 'easeBothStrong', function(){
                self.update(postEl, doPushState);
            })).run();
        });
    };

    Item.update = function(postEl, doPushState){
        var title = DOM.text(DOM.get('h1.title', postEl)) + ' | 一味';
        document.title = title;

        var id = postEl.id.substr(4);
        if(supportHistoryAPI){
            if(1 === (doPushState || 1)){
                history.pushState({
                    id: id
                }, title, '/' + id);
            }
        }else{
            location.hash = '!' + id;
        }

        DOM.html('#trigger', DOM.val(DOM.get('textarea', postEl)));
    };

    Item.load = function(id, direction){
        var self = this;

        if(self._loading){ return; }
        self._loading = true;

        IO({
            type: 'get',
            url: '/' + id +'?async=y',
            success: function(html){
                var el = document.createElement('div');
                el.className = 'panel';
                el.id = 'post' + id;
                el.innerHTML = html;

                var sliderEl= self.sliderEl;
                DOM.width(sliderEl, DOM.width(sliderEl) + 990);

                if('prev' === direction){ //是向前，则放在最前面
                    DOM.prepend(el, sliderEl);
                    DOM.css(sliderEl, 'marginLeft', parseInt(DOM.css(sliderEl, 'marginLeft'), 10) - 990);
                }else{
                    sliderEl.appendChild(el);
                }

                self.switchPost(el);
                self.handleStdPost(el);

                self._loading = false;
            },
            error: function(){
                window.location = '/' + id;
            }
        });
    };

    Item.handleStdPost = function(postEl){
        Base.parsePostShare(postEl);
        this.initAlbum(postEl);
    };

    Item.initAlbum = function(root){
        var albumEl = DOM.get('div.albumitem', root);
        if(!albumEl){ return; }

        var triggers = DOM.children(albumEl);
        var data = [];

        S.each(triggers, function(el){
            data.push({
                title       : DOM.html(DOM.get('div.title', el)),
                img         : DOM.attr(DOM.get('img', el), 'src'),
                fullcontent : DOM.html(DOM.get('div.desc', el)),
                outer_url   : DOM.attr(el, 'data-url')
            });
        });

        S.each(triggers, function(el, idx){
            Event.on(el, 'click', function(ev){
                ev.halt();
                S.use('iee/fp.album', function(S, Album){
                    Album.detach('hide');   //移除以前绑定的事件
                    Album.on('hide', function(){
                        Item.albumMode = false;
                    });

                    Album.show(data, {
                        switchTo: idx
                    });

                    Item.albumMode = true;
                    Base.parsePostShare();
                });
            });
        });

        S.use('iee/fp.album');
    };

    if(supportHistoryAPI){
        window.onpopstate = function(ev){
            var state = ev.state;
            if(!state){ return; }

            var toEl = DOM.get('#post' + state.id);
            if(toEl){
                Item.switchPost(toEl, 2);
            }
        };
    }

    return Item;
}, {
    requires: [
        'dom', 'event', 'anim', 'ajax',
        'iee/fp.base'
    ]
});
