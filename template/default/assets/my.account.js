KISSY.add("iee/my.account",function(i,e,t,s,n){var c={};return i.mix(c,App.Base),c.initialize=function(){this.formEl=e.get("#accountForm"),this.checkObj=new n(this.formEl)},c.save=function(i){var e=this;e.isSubmiting||(e.isSubmiting=!0,e.checkObj.validate(function(i){s({url:"/account/save",type:"post",form:e.formEl,dataType:"json",success:function(i){i.success?(e.showFeedbackMsg("帐号信息保存成功"),e.formEl.reset()):e.showFeedbackMsg(i.msg),e.isSubmiting=!1}})}))},c},{requires:["dom","event","ajax","iee/util.validation"]});