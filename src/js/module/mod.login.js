/*! PC_JX - v1.0.0 - 2016-12-21 */
define(function(require,exports,module){var a=require("common"),b=require("servicevali"),c=function(){this.init.apply(this,arguments)};c.prototype={init:function(){var c=this;c.setUserName(),c.submitLoginEvent(),c.submitRegisterEvent(),c.resetPasswordEvent(),a.getValidCode({runtime:120,phone:"#regmobile",clickbtn:"#getcodebtn",sendCallback:function(a){return b.serviceValidate(a,"registerCode")}}),document.onkeydown=function(a){var b=a||window.event||arguments.callee.caller.arguments[0];b&&13==b.keyCode&&$("#regSubmitBtn,#loginSubmitBtn,#resetPwdBtn").trigger("click")};var d=$("#isPopImgCodeInput").val();"true"===d&&$("#isPopImgCodeP>input").length<1&&($("#isPopImgCodeP").prepend($("#imgcode").show()).show(),$(document).on("input","#imgcode",function(){$(this).val().trim()&&new RegExp("^[0-9A-Za-z]{4,4}$").test($(this).val())?$(this).parent().find(".Validform_checktip").html("").hide():$(this).parent().find(".Validform_checktip").html("请输入4位验证码").css({float:"left","padding-left":"24px",color:"#ffaf00"}).show()}))},submitLoginEvent:function(){var c=function(){var a=$.cookie("loginName"),b=$("#loginname").val(),c=$("#loginForm .saveuser");if(c.prop("checked")&&a!=b){var d=new Date;d.setTime(d.getTime()+36e5),$.cookie("loginName",b,{expires:d,path:"/"})}c.prop("checked")||a!=b||$.cookie("loginName",null,{path:"/"})},d=function(a){return!!b.serviceValidate(a,"loginCode")&&(c(),void(a.value?window.location.href=a.value:window.location.reload()))},e=$("#loginForm").Validform({tiptype:4,ajaxPost:!0,callback:d});$("#loginSubmitBtn").on("click",function(){return e.check()&&($("#loginpwd_").val(md5($("#loginpwd").val())),a.avoidCntClick(function(){$("#loginForm").submit()},50,"login")),!1})},submitRegisterEvent:function(){var c=function(a){return!!b.serviceValidate(a,"registerCode")&&void(a.value?window.location.href=a.value:window.location.reload())};$("#registerForm").Validform({tiptype:4,showAllError:!0,ajaxPost:!0,beforeSubmit:function(a){$("#userpwd").val(md5($("#userpwd").val()));var b=document.getElementById("member").checked;$("#VIP").val(b.toString())},callback:c});$("#regSubmitBtn").on("click",function(){return a.avoidCntClick(function(){$("#registerForm").submit(),$("#imgcode").val(""),$(".imgcode")[0].src=$("#root_path").val()+"/user/getImgCode?d="+Math.random()},50,"login"),!1})},resetPasswordEvent:function(){var c=function(a){return!!b.serviceValidate(a,"registerCode")&&void(a.value?window.location.href=a.value:window.location.reload())};$("#resetPwdForm").Validform({tiptype:4,ajaxPost:!0,beforeSubmit:function(a){$("#userpwd").val(md5($("#userpwd").val()))},callback:c});$("#resetPwdBtn").on("click",function(){return a.avoidCntClick(function(){$("#resetPwdForm").submit(),$("#imgcode").val(""),$(".imgcode")[0].src=$("#root_path").val()+"/user/getImgCode?d="+Math.random()},50,"login"),!1})},setUserName:function(){if(0==$("#loginForm").length)return!1;var a=$.cookie("loginName");a&&""!==a&&"null"!==a&&($("#loginname").val(a),$("#loginForm .saveuser").prop("checked",!0))}},module.exports=new c});
/*! PC_JX xiongzhaoling 最后修改于： 2016-12-21 */