/*! PC_JX - v1.0.0 - 2016-11-23 */
define(function(require,exports,module){require("core"),require("widget"),require("datepicker"),require("uploadfiles"),require("validform"),require("dropdownlist"),require("upload"),$public=require("public"),$userdatafill=function(){this.init.apply(this,arguments)};var a=!0;$userdatafill.prototype={init:function(){var b=this;if($(".error_box").length>0){var c=$(".error_box").offset().top,d=!1;$(window).scroll(function(){var a=$(this).scrollTop();c<a&&!d?($(".error_box").css({position:"fixed",right:($(document).width()-1190)/2+110+"px"}),d=!0):c>a&&d&&($(".error_box").css({position:"absolute",right:"110px"}),d=!1)})}var e={tiptype:3,label:".label",showAllError:!0,datatype:{"*2-10":/^[\w\W]{2,10}$/,"n10-25":/^\d{10,25}$/},ajaxPost:!0},f=[{ele:".picfile",datatype:"*"},{ele:".businesname",datatype:"*2-10",nullmsg:"请填写姓名",errormsg:"请填写2-10字以内的姓名"},{ele:".finance",datatype:"n8-25",nullmsg:"请填写财务结算账号",errormsg:"财务结算账号只允许8-25个数字"}],g=$("#forminfo").Validform(e).addRule(f),h=$(".private_card tr").html(),i=$(".private_tel tr").html(),j=$(".public tr").html();$("#tm").datepicker(),$("#bank").selectlist({width:200}),$("#accountType").selectlist({width:200,onChange:function(){1==$("#accountType :hidden").val()&&($(".settlementCard_").remove(),$(".openerTel_").remove(),$(".openerCard_").remove(),$(".financeOpenName_").after($('<tr class="openerCard_"></tr>').html(h)),$(".openerCard_").after($('<tr class="openerTel_"></tr>').html(i))),2==$("#accountType :hidden").val()&&($(".openerTel_").remove(),$(".openerCard_").remove(),$(".settlementCard_").remove(),$(".financeOpenName_").after($('<tr class="settlementCard_"></tr>').html(j)))}}),$("#card").selectlist({width:200,onChange:function(){a||$("#cardtxt").removeClass("Validform_error").val("").next().empty().removeClass("Validform_wrong Validform_right"),b.changevalid(!0)}}),b.changevalid(),$(".nxt").on("click",function(){var a=$public.allimgvalid($(".panel").find('.imgbox:not(".cnat")')),b=$(".subpath").val(),c=$public.paramcompare($("#forminfo").serializeArray(),function(a){a.saleScope=a.saleScope.replace(/\r\n/g,"\n")}),d=!0;return $(".darenzh").length>0&&(d=$public.groupimgvalid($(".darenzh"),"请选择图片！")),g.check()&&a&&d&&($public.dialog.waiting(),$.post(b,c,function(a){$public.isLogin(a),$public.dialog.closebox(),a.success?($public.dialog.msg("保存成功！","success"),setTimeout(function(){window.location=a.value},1500)):$public.dialog.msg(a.resultMsg,"error")})),!1}),$(".allsub").on("click",function(){var a=$public.selectvalid(),b=$public.groupimgvalid($(".groupimg"),"请选择图片！"),c=$public.allimgvalid($(".panel").find('.imgbox:not(".cnat")')),d=$(".subpath").val(),e=$public.paramcompare($("#forminfo").serializeArray());return g.check()&&c&&a&&b&&($public.dialog.waiting(),$.post(d,e,function(a){$public.isLogin(a),$public.dialog.closebox(),a.success?($public.dialog.msg("保存成功！","success"),setTimeout(function(){window.location=a.value},1500)):$public.dialog.msg(a.resultMsg,"error")})),!1}),$public.actiondata("province","city")},changevalid:function(b){var c=$("#card :hidden").val();b&&(a=!1),0==c?$("#cardtxt").attr("datatype","card"):1==c?$("#cardtxt").attr("datatype","dlic"):2==c?$("#cardtxt").attr("datatype","psport"):3==c&&$("#cardtxt").attr("datatype","gidcard")}},module.exports=new $userdatafill});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-23 */