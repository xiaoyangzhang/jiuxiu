/*! PC_JX - v1.0.0 - 2016-11-10 */
define(function(require,exports,module){require("core"),require("widget"),require("datepicker"),require("validform"),require("dropdownlist"),require("uploadfiles"),$public=require("public"),$editer=require("editer"),require("md5"),$test=function(){this.init.apply(this,arguments)},$test.prototype={init:function(){$editer.distanceFun();var a=this;$("#tm").datepicker({changeYear:!0,changeMonth:!0,numberOfMonths:1,yearRange:"-76:+0"}),$("#tm").bind("input change",function(){a.timeFun()}),a.eredrInfoTab(),a.nickName(),a.provinceFun();var b={tiptype:3,label:".label",showAllError:!0,datatype:{},ajaxPost:!0},c=[{ele:"#nickName",maxlength:"15",nullmsg:"请填写您的昵称",datatype:"s",errormsg:"除下划线以外的特殊字符不允许输入,请填写2-15字以内的字符"},{ele:"#realName",datatype:"s",maxlength:"10",nullmsg:"请填写您的真实姓名",errormsg:"除下划线以外的特殊字符不允许输入,请填写10字以内的昵称"}],d=$(".registerform").Validform(b).addRule(c);$(".change").text($("#serve").val().length),$("#serve").bind("input propertychange",function(){var a=$(this).val().length;$(".change").text(a)}),$(function(){0==$("input[name='certificatess']:checked").length&&$("input[name='certificatess']").attr("checked","checked")}),$("#saveBtnEredar").on("click",function(){var b=d.check(),c=$public.selectvalid(),f=null,i=[],j=[],k=[],l={},m=$("#contentText").val(),n=$public.allimgvalid($('.imgbox:not(".cnat")')),o=$public.groupimgvalid($(".groupimg"),"请选择图片！");if(e=$editer.tuwencheck(),h=a.timeFun(),g=$editer.picNumCheck(),!e)return $public.dialog.msg("关于我的图文介绍至少需要输入一段文字或一张图片","error"),!1;if(!g)return $public.dialog.msg("关于我的图片最多只能上传10张","error"),!1;if(b&&c&&n&&o&&e&&h){f=$public.paramcompare($(".registerform").serializeArray()),f.pictureTextDOs=m;for(var p in f){if("certificatess"==p&&f[p]){for(var q=0;q<f[p].length;q++)l.id=parseInt(f[p][q]),l.name="",l.type=1,$('input[name="certificatess"]:checked').filter(function(){$(this).val()==f[p][q]&&(l.name=$(this).next("label").text())}),i.push(l),l={};f[p]=JSON.stringify(i),i.length=0}if("imgpath"==p&&f[p]&&(j=f[p],j.constructor==String&&(k.push(j),f[p]=JSON.stringify(k)),j instanceof Array)){for(var r=0;r<j.length;r++)""!=j[r]&&k.push(j[r]);f[p]=JSON.stringify(k)}}$.ajax({type:"POST",url:$public.urlpath.eredar,data:f,success:function(a){$public.isLogin(a),a.success?($public.dialog.msg("保存成功","success"),window.location.href=window.location.href):($public.dialog.msg(a.msg,"error"),a.value&&(window.location.href=a.value))}})}})},eredrInfoTab:function(){$(".eredar-info ul li").click(function(){$(this).addClass("on").siblings().removeClass("on");var a=$(this).index();$(".eredar-list").hide(),$(".eredar-list"+(a+1)).show()})},timeFun:function(){var a=!1;return $("#tm").val()?(a=!0,$("#tm").parent().find(".Validform_checktip").remove(),$("#tm").parent().append('<span class="Validform_checktip Validform_right"></span>')):($("#tm").parent().find(".Validform_checktip").remove(),$("#tm").parent().append('<span class="Validform_checktip Validform_wrong">请填写时间</span>')),a},nickName:function(){$("#nickName").blur(function(){var a=this;$.ajax({type:"POST",url:"user/chargeUserNickName",data:{nickName:$("#nickName").val()},success:function(b){$public.isLogin(b),b.success||($(a).parent().find(".Validform_checktip").remove(),$(a).parent().append('<span class="Validform_checktip Validform_wrong">此用户昵称已被使用！</span>'))}})})},provinceFun:function(){$public.actiondata("province","city")}},module.exports=new $test});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-10 */