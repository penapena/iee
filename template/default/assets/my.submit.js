KISSY.add("iee/my.submit",function(e,t,s,a){var i={};return e.mix(i,App.Base),i.pass=function(e){var s=this;a.get(t.attr(e,"href"),function(a){if(a.success)if("s"===queryvars.status)t.remove(s.getItemEl(e));else{var i="";i+='<span class="label info" title="处理人：'+a.agencyNick+'">已通过</span>',i+=a.postid?'<a href="/item/'+a.postid+'" target="_blank">关联文章</a>':'<a href="/item/create/?submit='+a.id+'">发表文章</a>',t.html(t.parent(e,"div.item-action"),i)}else s.showFeedbackMsg(a.msg)},"json")},i.remove=function(e){var s=this;a.get(t.attr(e,"href"),function(a){a.success?t.remove(s.getItemEl(e)):s.showFeedbackMsg(a.msg)},"json")},i},{requires:["dom","event","ajax"]});