!function(t){function i(n){if(e[n])return e[n].exports;var s=e[n]={exports:{},id:n,loaded:!1};return t[n].call(s.exports,s,s.exports,i),s.loaded=!0,s.exports}var e={};return i.m=t,i.c=e,i.p="",i(0)}([function(t,i,e){e(1),e(2),e(3);var n=e(4),s=window.pageType||"",a="fp"!==s&&"thing"!==s,o="",r="",l="thing"!==s,c=$("#J_Slider");c.length&&($sliderItems=c.find("a"),r=$sliderItems.last().attr("data-id"),$sliderItems.length>3&&c.unslider({infinite:!0,arrows:!0,nav:!1}));var d,u=$("#waterfall");u.waterfall({itemCls:"pin",fitWidth:!0,colWidth:320,gutterWidth:20,gutterHeight:20,maxCol:3,checkImagesLoaded:!1,loadingMsg:'<p class="loading"><img src="//pic.yupoo.com/iewei/C6Gb0faQ/PMs7M.gif" width="202" height="70"/></p>',path:function(){return"query/all?"+$.param({from:"fp",cat:window.curCatId||"",id:o,noItem:a,information:l,info_id:r})},callbacks:{loadingStart:function(t){t.show()},loadingFinished:function(t,i){i?d||($('<div class="page-load-done"></div>').insertAfter("#content"),t.remove(),d=!0):t.fadeOut()},renderData:function(t,i){var e="";return t.infos.length?$.each(t.infos,function(t,i){r=i.id,e+='<a href="/i'+("0"!==i.sid?i.sid:i.id)+'" class="pin pin-info"><img src="'+i.cover+'" width="320" height="250" /><div class="extra"><div class="date">'+i.dateStr.toUpperCase()+'</div><div class="title">'+i.title+'</div><div class="desc">'+i.desc+"</div></div></a>"}):l=!1,t.items.length?$.each(t.items,function(t,i){o=i.id,e+='<a href="/'+("0"!==i.sid?i.sid:i.id)+'" class="pin pin-item"><img src="'+i.img+'" width="320" height="420" /><div class="extra"><div class="mask"></div>'+n.stddate(i.modified)+'<div class="title">'+i.title+'</div><div class="desc">'+i.fullcontent+'</div><div class="author"><s></s>'+i.nick+"</div></div>"+("album"===i.type?'<s class="type-album"></s>':"")+"</a>"}):a=!0,e?e:void(u.data("plugin_waterfall").options.maxPage=1)}}}),n.initCategory(window.subCat,window.curCatId)},function(t,i){$(function(){var t=$(window),i=$('<span class="gotop" hideFocus="true"></span>'),e="hide";(new Image).src="//pic.yupoo.com/iewei/Cam6yIZo/XryK.gif",i.click(function(){$(document.body).animate({scrollTop:0},Math.min(.2*t.scrollTop()/800,1),"linear",function(){i.css("opacity",0),e="hide"})}),i.mouseenter(function(){i.addClass("gotop-hover")}),i.mouseleave(function(){i.removeClass("gotop-hover")}),t.scroll(function(){var n=t.scrollTop();n>200&&"show"!==e?(e="show",i.animate({opacity:.9},.4,"linear"),e="show"):0===n&&"hide"!==e&&(i.animate({opacity:0},.4,"linear"),e="hide")}),i.appendTo($(document.body))})},function(t,i){/*! waterfall - v0.1.73 - 2015-12-01
	* http://wlog.cn/waterfall/
	* Copyright (c) 2015 bingdian; Licensed MIT */
!function(t,i,e,n){"use strict";function s(i,e){this.$element=t(i),this.options=t.extend(!0,{},r,e),this.colHeightArray=[],this.styleQueue=[],this._init()}var a=t(i),o="waterfall",r={itemCls:"waterfall-item",prefix:"waterfall",fitWidth:!0,colWidth:240,gutterWidth:10,gutterHeight:10,align:"center",minCol:1,maxCol:n,maxPage:n,bufferPixel:-50,containerStyle:{position:"relative"},resizable:!0,isFadeIn:!1,isAnimated:!1,animationOptions:{},isAutoPrefill:!0,checkImagesLoaded:!0,path:n,dataType:"json",params:{},headers:{},loadingMsg:'<div style="text-align:center;padding:10px 0; color:#999;"><img src="data:image/gif;base64,R0lGODlhEAALAPQAAP///zMzM+Li4tra2u7u7jk5OTMzM1hYWJubm4CAgMjIyE9PT29vb6KiooODg8vLy1JSUjc3N3Jycuvr6+Dg4Pb29mBgYOPj4/X19cXFxbOzs9XV1fHx8TMzMzMzMzMzMyH5BAkLAAAAIf4aQ3JlYXRlZCB3aXRoIGFqYXhsb2FkLmluZm8AIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7" alt=""><br />Loading...</div>',state:{isDuringAjax:!1,isProcessingData:!1,isResizing:!1,isPause:!1,curPage:1},callbacks:{loadingStart:function(t){t.show()},loadingFinished:function(t,i){i?t.remove():t.fadeOut()},loadingError:function(t,i){t.html("Data load faild, please try again later.")},renderData:function(i,e){var n,s;return"json"===e||"jsonp"===e?(n=t("#waterfall-tpl").html(),(s=Handlebars.compile(n))(i)):i}},debug:!1};s.prototype={constructor:s,_debug:function(){!0===this.options.debug&&("undefined"!=typeof console&&"function"==typeof console.log?1===Array.prototype.slice.call(arguments).length&&"string"==typeof Array.prototype.slice.call(arguments)[0]?console.log(Array.prototype.slice.call(arguments).toString()):console.log(Array.prototype.slice.call(arguments)):Function.prototype.bind||"undefined"==typeof console||"object"!=typeof console.log||Function.prototype.call.call(console.log,console,Array.prototype.slice.call(arguments)))},_init:function(t){var i=this.options,e=i.path;return this._setColumns(),this._initContainer(),this._resetColumnsHeightArray(),this.reLayout(t),e?(i.isAutoPrefill&&this._prefill(),i.resizable&&this._doResize(),void this._doScroll()):void this._debug("Invalid path")},_initContainer:function(){var i=this.options,e=i.prefix;t("body").css({overflow:"auto"}),this.$element.css(this.options.containerStyle).addClass(e+"-container"),this.$element.after('<div id="'+e+'-loading">'+i.loadingMsg+'</div><div id="'+e+'-message" style="text-align:center;color:#999;"></div>'),this.$loading=t("#"+e+"-loading"),this.$message=t("#"+e+"-message")},_getColumns:function(){var t=this.options,i=t.fitWidth?this.$element.parent():this.$element,e="BODY"===i[0].tagName?i.width()-20:i.width(),n=t.colWidth,s=t.gutterWidth,a=t.minCol,o=t.maxCol,r=Math.floor(e/(n+s)),l=Math.max(r,a);return o&&l>o?o:l},_setColumns:function(){this.cols=this._getColumns()},_getItems:function(t){var i=t.filter("."+this.options.itemCls).css({position:"absolute"});return i},_resetColumnsHeightArray:function(){var t,i=this.cols;for(this.colHeightArray.length=i,t=0;i>t;t++)this.colHeightArray[t]=0},layout:function(t,i){var e,n,s,a,o,r,l=this.options,c=this.options.isFadeIn?this._getItems(t).css({opacity:0}).animate({opacity:1}):this._getItems(t),d=this.options.isAnimated&&this.options.state.isResizing?"animate":"css",u=l.animationOptions,h=l.colWidth,p=l.gutterWidth,f=this.colHeightArray.length,g=l.align;for(this.$element.append(c),"center"===g?(e=(this.$element.width()-h*f-p*(f-1))/2,e=e>0?e:0):"left"===g?e=0:"right"===g&&(e=this.$element.width()-h*f-p*(f-1)),s=0,o=c.length;o>s;s++)this._placeItems(c[s],e);for(a=0,r=this.styleQueue.length;r>a;a++)n=this.styleQueue[a],n.$el[d](n.style,u);this.$element.height(Math.max.apply({},this.colHeightArray)),this.styleQueue=[],this.options.state.isResizing=!1,this.options.state.isProcessingData=!1,i&&i.call(c)},reLayout:function(t){var i=this.$element.find("."+this.options.itemCls);this._resetColumnsHeightArray(),this.layout(i,t)},_placeItems:function(i,e){var n,s,a=t(i),o=this.options,r=o.colWidth,l=o.gutterWidth,c=o.gutterHeight,d=this.colHeightArray,u=d.length,h=Math.min.apply({},d),p=t.inArray(h,d);n=a.hasClass(o.prefix+"-item-fixed-left")?0:a.hasClass(o.prefix+"-item-fixed-right")?u>1?u-1:0:p,s={left:(r+l)*n+e,top:d[n]},this.styleQueue.push({$el:a,style:s}),d[n]+=a.outerHeight()+c},prepend:function(t,i){this.$element.prepend(t),this.reLayout(i)},append:function(t,i){this.$element.append(t),this.reLayout(i)},removeItems:function(t,i){this.$element.find(t).remove(),this.reLayout(i)},option:function(i,e){t.isPlainObject(i)&&(this.options=t.extend(!0,this.options,i),"function"==typeof e&&e(),this._init())},pause:function(t){this.options.state.isPause=!0,"function"==typeof t&&t()},resume:function(t){this.options.state.isPause=!1,"function"==typeof t&&t()},_requestData:function(i){var e,s=this,a=this.options,o=a.maxPage,r=a.state.curPage++,l=a.path,c=a.dataType,d=a.params,u=a.headers;return o!==n&&r>o?(a.state.isBeyondMaxPage=!0,void a.callbacks.loadingFinished(this.$loading,a.state.isBeyondMaxPage)):(e="function"==typeof l?l(r):l.join(r),this._debug("heading into ajax",e+t.param(d)),a.callbacks.loadingStart(this.$loading),a.state.isDuringAjax=!0,a.state.isProcessingData=!0,void t.ajax({url:e,data:d,headers:u,dataType:c,success:function(t){s._handleResponse(t,i),s.options.state.isDuringAjax=!1},error:function(t){s._responeseError("error")}}))},_handleResponse:function(i,e){var n=this,s=this.options,a=t.trim(s.callbacks.renderData(i,s.dataType)),o=t(a),r=s.checkImagesLoaded;r?o.imagesLoaded(function(){n.append(o,e),n.options.callbacks.loadingFinished(n.$loading,n.options.state.isBeyondMaxPage)}):(n.append(o,e),n.options.callbacks.loadingFinished(n.$loading,n.options.state.isBeyondMaxPage))},_responeseError:function(t){this.$loading.hide(),this.options.callbacks.loadingError(this.$message,t),"end"!==t&&"error"!==t&&(t="unknown"),this._debug("Error",t)},_nearbottom:function(){var t=this.options,i=Math.min.apply({},this.colHeightArray),e=a.scrollTop()+a.height()-this.$element.offset().top-i;return this._debug("math:",e),e>t.bufferPixel},_prefill:function(){this.$element.height()<=a.height()&&this._scroll()},_scroll:function(){var t=this.options,i=t.state,e=this;i.isProcessingData||i.isDuringAjax||i.isInvalidPage||i.isPause||this._nearbottom()&&this._requestData(function(){setTimeout(function(){e._scroll()},100)})},_doScroll:function(){var t,i=this;a.bind("scroll",function(){t&&clearTimeout(t),t=setTimeout(function(){i._scroll()},100)})},_resize:function(){var t=this.cols,i=this._getColumns();(i!==t||"left"!==this.options.align)&&(this.options.state.isResizing=!0,this.cols=i,this.reLayout(),this._prefill())},_doResize:function(){var t,i=this;a.bind("resize",function(){t&&clearTimeout(t),t=setTimeout(function(){i._resize()},100)})}},t.fn[o]=function(i){if("string"==typeof i){var e=Array.prototype.slice.call(arguments,1);this.each(function(){var n=t.data(this,"plugin_"+o);return n?t.isFunction(n[i])&&"_"!==i.charAt(0)?void n[i].apply(n,e):void n._debug('no such method "'+i+'"'):void n._debug("instance is not initialization")})}else this.each(function(){t.data(this,"plugin_"+o)||t.data(this,"plugin_"+o,new s(this,i))});return this}}(jQuery,window,document),function(t,i){"use strict";var e="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";t.fn.imagesLoaded=function(n){function s(){var i=t(h),e=t(p);l&&(p.length?l.reject(d,i,e):l.resolve(d)),t.isFunction(n)&&n.call(r,d,i,e)}function a(t){o(t.target,"error"===t.type)}function o(i,n){i.src!==e&&-1===t.inArray(i,u)&&(u.push(i),n?p.push(i):h.push(i),t.data(i,"imagesLoaded",{isBroken:n,src:i.src}),c&&l.notifyWith(t(i),[n,d,t(h),t(p)]),d.length===u.length&&(setTimeout(s),d.unbind(".imagesLoaded",a)))}var r=this,l=t.isFunction(t.Deferred)?t.Deferred():0,c=t.isFunction(l.notify),d=r.find("img").add(r.filter("img")),u=[],h=[],p=[];return t.isPlainObject(n)&&t.each(n,function(t,i){"callback"===t?n=i:l&&l[t](i)}),d.length?d.bind("load.imagesLoaded error.imagesLoaded",a).each(function(n,s){var a=s.src,r=t.data(s,"imagesLoaded");return r&&r.src===a?void o(s,r.isBroken):s.complete&&s.naturalWidth!==i?void o(s,0===s.naturalWidth||0===s.naturalHeight):void((s.readyState||s.complete)&&(s.src=e,s.src=a))}):s(),l?l.promise(r):r}}(jQuery)},function(t,i){!function(t){return t?(t.Unslider=function(i,e){var n=this;return n._="unslider",n.defaults={autoplay:!1,delay:3e3,speed:750,easing:"swing",keys:{prev:37,next:39},nav:!0,arrows:{prev:'<a class="'+n._+'-arrow prev">Prev</a>',next:'<a class="'+n._+'-arrow next">Next</a>'},animation:"horizontal",selectors:{container:"ul:first",slides:"li"},animateHeight:!1,activeClass:n._+"-active",swipe:!0,swipeThreshold:.2},n.$context=i,n.options={},n.$parent=null,n.$container=null,n.$slides=null,n.$nav=null,n.$arrows=[],n.total=0,n.current=0,n.prefix=n._+"-",n.eventSuffix="."+n.prefix+~~(2e3*Math.random()),n.interval=null,n.init=function(i){return n.options=t.extend({},n.defaults,i),n.$container=n.$context.find(n.options.selectors.container).addClass(n.prefix+"wrap"),n.$slides=n.$container.children(n.options.selectors.slides),n.setup(),t.each(["nav","arrows","keys","infinite"],function(i,e){n.options[e]&&n["init"+t._ucfirst(e)]()}),jQuery.event.special.swipe&&n.options.swipe&&n.initSwipe(),n.options.autoplay&&n.start(),n.calculateSlides(),n.$context.trigger(n._+".ready"),n.animate(n.options.index||n.current,"init")},n.setup=function(){n.$context.addClass(n.prefix+n.options.animation).wrap('<div class="'+n._+'" />'),n.$parent=n.$context.parent("."+n._);var t=n.$context.css("position");"static"===t&&n.$context.css("position","relative"),n.$context.css("overflow","hidden")},n.calculateSlides=function(){if(n.total=n.$slides.length,"fade"!==n.options.animation){var t="width";"vertical"===n.options.animation&&(t="height"),n.$container.css(t,100*n.total+"%").addClass(n.prefix+"carousel"),n.$slides.css(t,100/n.total+"%")}},n.start=function(){return n.interval=setTimeout(function(){n.next()},n.options.delay),n},n.stop=function(){return clearTimeout(n.interval),n},n.initNav=function(){var i=t('<nav class="'+n.prefix+'nav"><ol /></nav>');n.$slides.each(function(e){var s=this.getAttribute("data-nav")||e+1;t.isFunction(n.options.nav)&&(s=n.options.nav.call(n.$slides.eq(e),e,s)),i.children("ol").append('<li data-slide="'+e+'">'+s+"</li>")}),n.$nav=i.insertAfter(n.$context),n.$nav.find("li").on("click"+n.eventSuffix,function(){var i=t(this).addClass(n.options.activeClass);i.siblings().removeClass(n.options.activeClass),n.animate(i.attr("data-slide"))})},n.initArrows=function(){n.options.arrows===!0&&(n.options.arrows=n.defaults.arrows),t.each(n.options.arrows,function(i,e){n.$arrows.push(t(e).insertAfter(n.$context).on("click"+n.eventSuffix,n[i]))})},n.initKeys=function(){n.options.keys===!0&&(n.options.keys=n.defaults.keys),t(document).on("keyup"+n.eventSuffix,function(i){t.each(n.options.keys,function(e,s){i.which===s&&t.isFunction(n[e])&&n[e].call(n)})})},n.initSwipe=function(){var t=n.$slides.width();"fade"!==n.options.animation&&n.$container.on({movestart:function(t){return t.distX>t.distY&&t.distX<-t.distY||t.distX<t.distY&&t.distX>-t.distY?!!t.preventDefault():void n.$container.css("position","relative")},move:function(i){n.$container.css("left",-(100*n.current)+100*i.distX/t+"%")},moveend:function(i){Math.abs(i.distX)/t>n.options.swipeThreshold?n[i.distX<0?"next":"prev"]():n.$container.animate({left:-(100*n.current)+"%"},n.options.speed/2)}})},n.initInfinite=function(){var i=["first","last"];t.each(i,function(t,e){n.$slides.push.apply(n.$slides,n.$slides.filter(':not(".'+n._+'-clone")')[e]().clone().addClass(n._+"-clone")["insert"+(0===t?"After":"Before")](n.$slides[i[~~!t]]()))})},n.destroyArrows=function(){t.each(n.$arrows,function(t,i){i.remove()})},n.destroySwipe=function(){n.$container.off("movestart move moveend")},n.destroyKeys=function(){t(document).off("keyup"+n.eventSuffix)},n.setIndex=function(t){return 0>t&&(t=n.total-1),n.current=Math.min(Math.max(0,t),n.total-1),n.options.nav&&n.$nav.find('[data-slide="'+n.current+'"]')._active(n.options.activeClass),n.$slides.eq(n.current)._active(n.options.activeClass),n},n.animate=function(i,e){if("first"===i&&(i=0),"last"===i&&(i=n.total),isNaN(i))return n;n.options.autoplay&&n.stop().start(),n.setIndex(i),n.$context.trigger(n._+".change",[i,n.$slides.eq(i)]);var s="animate"+t._ucfirst(n.options.animation);return t.isFunction(n[s])&&n[s](n.current,e),n},n.next=function(){var t=n.current+1;return t>=n.total&&(t=0),n.animate(t,"next")},n.prev=function(){return n.animate(n.current-1,"prev")},n.animateHorizontal=function(t){var i="left";return"rtl"===n.$context.attr("dir")&&(i="right"),n.options.infinite&&n.$container.css("margin-"+i,"-100%"),n.slide(i,t)},n.animateVertical=function(t){return n.options.animateHeight=!0,n.options.infinite&&n.$container.css("margin-top",-n.$slides.outerHeight()),n.slide("top",t)},n.slide=function(t,i){if(n.options.animateHeight&&n._move(n.$context,{height:n.$slides.eq(i).outerHeight()},!1),n.options.infinite){var e;i===n.total-1&&(e=n.total-3,i=-1),i===n.total-2&&(e=0,i=n.total-2),"number"==typeof e&&(n.setIndex(e),n.$context.on(n._+".moved",function(){n.current===e&&n.$container.css(t,-(100*e)+"%").off(n._+".moved")}))}var s={};return s[t]=-(100*i)+"%",n._move(n.$container,s)},n.animateFade=function(t){var i=n.$slides.eq(t).addClass(n.options.activeClass);n._move(i.siblings().removeClass(n.options.activeClass),{opacity:0}),n._move(i,{opacity:1},!1)},n._move=function(t,i,e,s){return e!==!1&&(e=function(){n.$context.trigger(n._+".moved")}),t._move(i,s||n.options.speed,n.options.easing,e)},n.init(e)},t.fn._active=function(t){return this.addClass(t).siblings().removeClass(t)},t._ucfirst=function(t){return(t+"").toLowerCase().replace(/^./,function(t){return t.toUpperCase()})},t.fn._move=function(){return this.stop(!0,!0),t.fn[t.fn.velocity?"velocity":"animate"].apply(this,arguments)},void(t.fn.unslider=function(i){return this.each(function(){var e=t(this);if("string"==typeof i&&e.data("unslider")){i=i.split(":");var n=e.data("unslider")[i[0]];if(t.isFunction(n))return n.apply(e,i[1]?i[1].split(","):null)}return e.data("unslider",new t.Unslider(e,i))})})):console.warn("Unslider needs jQuery")}(window.jQuery)},function(t,i){var e=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];i.stddate=function(t){var i=t.split(" ")[0].split("-");if(3===i.length){var n=i[1]-1;return n>-1&&12>n&&(i[1]=e[n]),'<div class="stddate"><span class="day">'+i[2]+'</span><span class="month">'+i[1]+'</span><span class="year">'+i[0]+"</span></div>"}return""},i.filterHtmlTag=function(t){var i=document.createElement("div");return i.innerHTML=t,DOM.text(i)},i.initCategory=function(t,i){var e=$("#category"),n=$('<div class="category-placeholder"></div>');n.insertBefore(e);var s,a=e.find("div.sub"),o=function(e){var n=t[e.attr("data-cat")];if($.isArray(n)||0!==n.length){var o=e.data("isExpand");if(o){var r=a.find("div.sub-cat");r.length&&r.animate({marginTop:0-r.outerHeight()},.5),s=null}else{if("color"===n[0].type){var l='<div class="sub-cat sub-cat-color"><div class="list">';$.each(n,function(t,e){l+='<a target="_self" class="cat-'+e.alias+(i===e.id?" active":"")+'" href="?cat='+e.alias+'"><span>'+e.name.substr(e.name.indexOf("/")+1)+"</span></a>"}),l+="</div></div>"}a.html(l);var r=a.find("div.sub-cat"),c=r.outerHeight();r.css("marginTop",0-c),a.css("height",c),r.animate({marginTop:0},.5),s=e}e.data("isExpand",!o)}};e.find("li.collapse a").each(function(){var i=$(this),e=t[i.attr("data-cat")];$.isArray(e)&&e.length&&i.click(function(t){t.preventDefault(),o(i)})});var r,l=$(window);l.scroll(function(){n.offset().top<l.scrollTop()?(r||(r=!0,e.addClass("category-fixed"),n.css("height",e.outerHeight())),s&&o(s)):(r=!1,n.css("height",0),e.removeClass("category-fixed"))})}}]);