/*! PC_JX - v1.0.0 - 2016-12-21 */
define(function(require,exports,module){require("core"),require("widget"),require("datepicker"),require("validform"),require("dropdownlist"),require("uploadfiles"),$public=require("public"),$editer=require("editer"),require("md5"),$Talent=function(){this.init.apply(this,arguments)},$Talent.prototype={init:function(){$editer.distanceFun(),$public.diffBrowser();var a=this;$("#tm").datepicker({changeMonth:!0,changeYear:!0,yearRange:"1940:c+0"}),a.nickName(),a.provinceFun();var b=$(".registerform").Validform({tiptype:3,label:".label",showAllError:!0,datatype:{},ajaxPost:!0}).addRule([{ele:".phone",datatype:"m",errormsg:"请输入正确的手机号码"},{ele:"#nickName",maxlength:"15",nullmsg:"请填写您的昵称",datatype:"s2-15",errormsg:"除下划线以外的特殊字符不允许输入,请填写2-15字以内的字符"},{ele:"#realName",datatype:"s",maxlength:"10",nullmsg:"请填写您的真实姓名",errormsg:"除下划线以外的特殊字符不允许输入,请填写10字以内的昵称"}]);$("#tm").bind("input change",function(){a.timeFun()}),$("#serve").bind("input propertychange",function(){$(this).closest("td").find(".lab").text($(this).val().length+"/30")}),$(function(){0==$("input[name='certificatess']:checked").length&&$("input[name='certificatess']").attr("checked","checked")}),$("#saveBtnEredar").on("click",function(){var a=b.check(),c=$public.selectvalid(),d=null,e=[],f=[],g=[],h={},i=$("#contentText").val(),j=$public.allimgvalid($('.imgbox:not(".cnat")')),k=$public.groupimgvalid($(".groupimg"),"请选择图片！"),l=$editer.tuwencheck();if(!l)return $public.dialog.msg("关于我的图文介绍至少需要输入一段文字或一张图片","error"),!1;if(a&&c&&l&&j&&k){d=$public.paramcompare($(".registerform").serializeArray()),d.pictureTextDOs=i;for(var m in d){if("certificatess"==m&&d[m]){for(var n=0;n<d[m].length;n++)h.id=parseInt(d[m][n]),h.name="",h.type=1,$('input[name="certificatess"]:checked').filter(function(){$(this).val()==d[m][n]&&(h.name=$(this).next("label").text())}),e.push(h),h={};d[m]=JSON.stringify(e),e.length=0}if("imgpath"==m&&d[m]&&(f=d[m],f.constructor==String&&(g.push(f),d[m]=JSON.stringify(g)),f instanceof Array)){for(var o=0;o<f.length;o++)""!=f[o]&&g.push(f[o]);d[m]=JSON.stringify(g)}}$.ajax({type:"POST",url:$public.urlpath.eredar,data:d,success:function(a){$public.isLogin(a),a.success?($public.dialog.msg("保存成功","success"),window.location.href=window.location.href):$public.dialog.msg(a.msg,"error")}})}})},nickName:function(){$("#nickName").blur(function(){var a=this;$.ajax({type:"POST",url:"user/chargeUserNickName",data:{nickName:$("#nickName").val()},success:function(b){$public.isLogin(b),b.success||($(a).parent().find(".Validform_checktip").remove(),$(a).parent().append('<span class="Validform_checktip Validform_wrong">此用户昵称已被使用！</span>'))}})})},provinceFun:function(){$public.actiondata("province","city")},timeFun:function(){var a=!1;return $("#tm").val()?(a=!0,$("#tm").removeClass("Validform_error"),$("#tm").parent().find(".Validform_checktip").remove(),$("#tm").parent().append('<span class="Validform_checktip Validform_right"></span>')):($("#tm").parent().find(".Validform_checktip").remove(),$("#tm").parent().append('<span class="Validform_checktip Validform_wrong">请填写时间</span>')),a}},module.exports=new $Talent});
/*! PC_JX xiongzhaoling 最后修改于： 2016-12-21 */