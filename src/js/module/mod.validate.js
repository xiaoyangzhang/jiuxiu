/*! PC_JX - v1.0.0 - 2016-11-14 */
define(function(require,exports,module){var a=require("servicecode"),b=function(){this.init.apply(this,arguments)};b.prototype={init:function(){},serviceValidate:function(b,c){var d=a[c][b.errorCode];if(!b.success&&"true"===b.value&&$("#isPopImgCodeP>input").length<1&&($("#isPopImgCodeP").prepend($("#imgcode").show()).show(),$(document).on("input","#imgcode",function(){$(this).val().trim()&&new RegExp("^[0-9A-Za-z]{4,4}$").test($(this).val())?$(this).parent().find(".Validform_checktip").html("").hide():$(this).parent().find(".Validform_checktip").html("请输入4位验证码").css({float:"left","padding-left":"24px",color:"#ffaf00"}).show()})),!b.success&&d){if(null!=b.errorCode&&"22000000"==b.errorCode){var e=$("#root_path");return window.location.href=e+"/user/login",!1}return $(d.input).siblings("span.Validform_checktip").removeClass("Validform_right").addClass("Validform_wrong").text(b.resultMsg),$(d.input).closest("form").find("[type='password']").val(""),d.isRunTime}return!0}},module.exports=new b});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-14 */