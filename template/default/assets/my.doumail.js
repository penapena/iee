KISSY.add("iee/my.doumail",function(t,n,e,i){function u(t){n.get("#output");e.remove(n.get("input",output),"keyup"),output.innerHTML=t;var i=n.get("input",output);i&&(i.focus(),e.on(i,"keyup",function(t){13===t.keyCode&&r()}))}function r(){if(!o){var e=n.get("#sendbtn"),a=n.get("input","#output");if(a){var p=t.trim(n.val(a));if(!p)return void u('说好的暗号呢？再来：<img src="'+c.captcha_url+'" /> 输入暗号：<input type="text" class="text" />');c.captcha_string=p}i({type:"post",url:"/wii/doumail",data:c,success:function(t){return c={},t.stop?(u(t.msg||"发不动了，上天有好生之德，先歇一歇...."),void n.remove(e)):t.captcha_token?(c=t,u('这是暗号：<img src="'+t.captcha_url+'" /> 请输入此暗号后点击继续：<input type="text" class="text" />'),void(e.innerHTML="继续吧，骚年")):(u("成功溅射 "+t.user_name+"，准备下一个"),e.innerHTML="停止豆邮溅射",void setTimeout(function(){r()},6e3))}})}}var o=!1,a={init:function(){},start:function(t){var n=t.innerHTML.indexOf("停止")>-1;return n?(o=!0,void(t.innerHTML="开启豆邮溅射")):(t.innerHTML="停止豆邮溅射",void r())}},c={};return a},{requires:["dom","event","ajax"]});