$(function(){var o=$(window),e=$('<span class="gotop" hideFocus="true"></span>'),i="hide";(new Image).src="//pic.yupoo.com/iewei/Cam6yIZo/XryK.gif",e.click(function(){$(document.body).animate({scrollTop:0},Math.min(.2*o.scrollTop()/800,1),"linear",function(){e.css("opacity",0),i="hide"})}),e.mouseenter(function(){e.addClass("gotop-hover")}),e.mouseleave(function(){e.removeClass("gotop-hover")}),o.scroll(function(){var n=o.scrollTop();n>200&&"show"!==i?(i="show",e.animate({opacity:.9},.4,"linear"),i="show"):0===n&&"hide"!==i&&(e.animate({opacity:0},.4,"linear"),i="hide")}),e.appendTo($(document.body))});