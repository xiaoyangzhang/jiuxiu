/*! PC_JX - v1.0.0 - 2016-12-21 */
define(function(require,exports,module){$public=require("public"),require("datepicker"),require("validform"),require("core"),require("widget"),$editer=require("editer"),$test=function(){this.init.apply(this,arguments)},$test.prototype={config:{placehd:".infotime",textarea:".reply-edit textarea",replyedtbtn:".reply-content i",replybtnon:".reply-edit .replay.on",replybtncel:".reply-edit .cancel",temp_tip:"买家很喜欢，快来回复一下！"},init:function(){var a=this;$("#tm,#td").datepicker({changeMonth:!0,changeYear:!0});var b={tiptype:3,label:".label",showAllError:!0,datatype:{},ajaxPost:!0},c=[];$(".reviewform").Validform(b).addRule(c);$(".searchBtn").on("click",function(){a.distanceFun(),$.ajax({type:"POST",url:""+$("#subpath").val(),data:{},success:function(a){$public.isLogin(a)}})}),$(".delBtn").click(function(){$("input[name='orderNO']").val(""),$("input[name='nickName']").val(""),$("input[name='itemNo']").val(""),$("input[name='beginDate']").val(""),$("input[name='endDate']").val("")}),a.showImgFun(),$(document).on("keyup",a.config.textarea,function(){a.computed(this)}),$(document).on("paste",a.config.textarea,function(){_current=this,setTimeout(function(){a.computed(_current)},200)}),$(document).on("focus",a.config.textarea,function(){$(this).val()==a.config.temp_tip&&$(this).val("")}),$(document).on("blur",a.config.textarea,function(){!$(this).val()&&$(this).val(a.config.temp_tip)}),$(document).on("click",a.config.replyedtbtn,function(){var b=$(this).closest("div"),c=b.find("p").text(),d=b.find("label").text(),e=b.attr("id");b.after(a.getTextarea(c,d,e)).remove()}),$(document).on("click",a.config.replybtncel,function(){var b=$(this).closest("div"),c=b.find(".temp_content").val(),d=b.find(".temp_time").val(),e=b.attr("id");b.after(a.getRecord(c,d,e)).remove()}),$(document).on("click",a.config.replybtnon,function(){var b=$(this).closest("div"),c=b.find("textarea").val().replace(/^\s+/,"").replace(/\s+$/,""),d=new Date,e=$public.dateFormat(d,"yyyy-MM-dd hh:mm:ss"),f=b.attr("id");return""==c?void $public.dialog.msg("回复内容不能为空！","error"):c.length>200?void $public.dialog.msg("回复内容长度不能大于200字符！","error"):void $.post($public.urlpath.upReplyMsg,{id:b.attr("id"),backTime:d.getTime(),backContent:c},function(d){d.success?($public.dialog.msg("保存成功！","success"),b.after(a.getRecord(c,e,f)).remove()):$public.dialog.msg(d.msg,"error")})})},computed:function(a){var b=$(a).closest(".reply-edit"),c=$(a).val().replace(/^\s+/,"").replace(/\s+$/,""),d=b.find(".replay"),e=b.find("span");e.text(c.length+"/200"),c.length>200?e.css("color","red"):e.css("color","#999"),c.length>0?d.addClass("on"):d.removeClass("on")},getRecord:function(a,b,c){var d=[];return d.push('<div class="reply-content" id="'+c+'">'),d.push("<div>"),d.push("<p>"+a+"</p><label>"+b+"</label>"),d.push("</div>"),d.push("<i>编辑</i>"),d.push("</div>"),d.join("")},getTextarea:function(a,b,c){var d=[];return d.push('<div class="reply-edit" id="'+c+'">'),d.push("<div>"),d.push("<textarea>"+(a?a:"买家很喜欢，快来回复一下！")+"</textarea>"),d.push("<span>"+a.length+"/200</span>"),d.push("</div>"),d.push('<i class="replay '+(a?"on":"")+'">回复</i>'),d.push('<i class="cancel">取消</i>'),d.push('<input type="hidden" class="temp_content" value="'+a+'">'),d.push('<input type="hidden" class="temp_time" value="'+b+'">'),d.push("</div>"),d.join("")},showImgFun:function(){var a=$(".upload ul").find("li");a.click(function(){a.css("borderColor","#f2f2f2"),$(".upload").find("b").css("opacity","0"),this.is_select?($(this).css("borderColor","#f2f2f2"),$(this).find("b").css("opacity","0"),$(this).closest(".inforight").find(".showImg").hide(),this.is_select=!1):($(this).css("borderColor","#ed6c44"),$(this).closest(".inforight").find(".showImg img").attr("src",$(this).find("img").get(0).src),$(this).find("b").css("opacity","1"),$(this).closest(".inforight").find(".showImg").show(),a.filter(function(){this.is_select=!1}),$(".eredar-left").css("min-height",$(".eredar-right").height()+"px"),this.is_select=!0),$(".eredar-left").css("min-height",$(".eredar-right").height()+"px")})},distanceFun:function(){$(".eredar-right").height()<$(".eredar-left").height()?$(".eredar-right").height($(".eredar-left").height()):$editer.distanceFun()}},module.exports=new $test});
/*! PC_JX xiongzhaoling 最后修改于： 2016-12-21 */