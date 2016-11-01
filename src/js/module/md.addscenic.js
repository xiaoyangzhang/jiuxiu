/*! PC_JX - v1.0.0 - 2016-11-01 */
define(function(require,exports,module){require("dropdownlist"),require("validform"),$cus_datepicker=require("cus_datepicker"),$public=require("public"),$choiceScenic=function(){this.init.apply(this,arguments)},$choiceScenic.prototype={config:{radiobar:".radio-bar",barbox:".bar-box",barboxul:".bar-box ul",barboxdiv:".bar-box div",radiobarlabel:".radio-bar label",radiobarimg:".radio-bar img",eredarli:".eredar-info li",eredarpanel:".eredar-right .panel",searchotel:".choicehotel",searchbox:".searchbox",hotelist:".hotelist",loadlist:".load_list",searchbtn:".search-btn",btnOk:".ok",infoBar:".info-bar",infoBox:".info-box",inputGp:'input[name="gp"]',searchScenic:".searchScenic",scenicList:".sceniclist",svdraftbox:".svdraftbox",svdraft:".svdraft"},init:function(){function a(a,b){var a=a?a:1,b=b?b:$("#pageSize").val(),d=$(c.config.searchbox).find(c.config.scenicList);d.empty(),$.get($public.urlpath.getScenicList,{page:a,pageSize:b,name:$("#scenicName").val(),locationProvinceId:$('input[name="province"]').val()?$('input[name="province"]').val():0,locationCityId:$('input[name="city"]').val()?$('input[name="city"]').val():0,locationTownId:$('input[name="area"]').val()?$('input[name="area"]').val():0},function(a){d.append(a),$(c.config.loadlist).hide(),$(".jiuniu_pagination").css("margin-left",($(".container").width()-$(".jiuniu_pagination").width())/2+"px")})}function b(){var a=$('input[name="scenicGroup"]:checked').closest("tr");$(c.config.infoBar).find(".htn").text(a.find(".scenic-name").text()),$(c.config.infoBar).find(".address").text(a.find(".scenic-locationText").text()),$.post($public.urlpath.getScenicTicketType,{scenicId:$('input[name="scenicId"]').val()},function(a){if(a.success){for(var b=JSON.parse(a.value),c=[],g=0;g<b.length;g++){var h='<label class="radio"><input type="radio" name="ticketId" value='+b[g].id+" tTitle="+b[g].title+">"+b[g].title+"</label>";c.push(h)}$("td.ticketType").empty().append(c.join("\n")),f=$(".scenicForm").Validform(d).addRule(e)}else $public.dialog.msg("请求失败","error")})}var c=this,d={tiptype:3,label:".label",showAllError:!0,datatype:{"*2-10":/^[\w\W]{2,10}$/,"n10-25":/^\d{10,25}$/,price:/^([1-9]\d{0,5}(\.\d{1,2})?|0\.\d{1,2})$/,"n0-90":/^([0-9]|90|[1-8][0-9])$/},ajaxPost:!0},e=[{ele:'tr.notNull input[type="text"]',datatype:"*",nullmsg:"请填信息！"},{ele:'td input[name="ticketId"]:last',datatype:"*",nullmsg:"请选择票务种类"},{ele:'input[name="price"],input[name="originalPrice"]',datatype:"price",errormsg:"整数最多6位,可带两位小数!"},{ele:"input[name='startBookTimeLimit']",datatype:"n0-90",nullmsg:"请填写提前预定天数！",errormsg:"只能输入0-90范围数字！"}],f=$(".scenicForm").Validform(d).addRule(e);$public.procityaredata("province","city","area",!0),$(".inputxt,textarea").keyup(function(){$(this).next(".mark").find("label.cv").text($(this).val().length)}).filter(function(){$(this).next(".mark").find("label.cv").text($(this).val().length)}),$(c.config.eredarli).on("click",function(a){$(c.config.eredarli).removeClass("on"),$(this).addClass("on"),$(c.config.eredarpanel).hide(),$($(c.config.eredarpanel)[$(this).index()]).fadeIn(),$cus_datepicker.dateRender($cus_datepicker.supplierCalendar),$public.stopBubble(a)}),$(c.config.searchbtn).on("click",function(){$(c.config.loadlist).show(),a()}),$(".backprev").on("click",function(a){$(".eredar-info li.on").prev().trigger("click"),$public.stopBubble(a)}),$(".save-to-picker").on("click",function(){return 0==$('input[name="scenicId"]').val()?void $public.dialog.msg("请选择景区","error"):void(f.check()&&($(".eredar-info li:eq(1)").trigger("click"),$public.stopBubble()))}),$(".allsub").on("click",function(a){var b=$cus_datepicker.supplierCalendar.bizSkuInfo,c=!1;if(!f.check())return void $(".eredar-info li:eq(0)").trigger("click");for(var d=0;d<b.length;d++)"del"!=b[d].state&&(c=!0);if(!c)return void $public.dialog.msg("请设置价格日历！","error");var e=[];$(".dynamicTr").each(function(){var a={pId:$(this).attr("pId"),pTxt:$(this).attr("pTxt"),pType:$(this).attr("pType"),vTxt:$(this).find("input").val(),categoryId:parseInt($('input[name="categoryId"]').val()),flag:!1};e.push(a)});var g=$public.paramcompare($(".scenicForm").serializeArray());g.ticketTitle=$('input[name="ticketId"]:checked').attr("tTitle"),g.dynamicEntry=JSON.stringify(e);var h=$('input[name="operationFlag"]').val(),i="update"==h?$public.urlpath.updateScenic:$public.urlpath.addScenic;$.post(i,g,function(a){$public.isLogin(a),a.success?($public.dialog.msg("保存成功","success"),setTimeout(function(){window.location=a.value},1e3)):$public.dialog.msg(a.resultMsg,"error")})}),$(c.config.searchScenic).on("click",function(d){var e=$(c.config.searchbox),f=e.find(c.config.scenicList);$public.dialog.content(968,"auto","选择景区",e.show(),function(){var a=$('input[name="scenicGroup"]:checked'),c=a.val(),d=a.closest("td").next().text();return c?($('input[name="scenicId"]').val(c),$('input[name="scenicName"]').val(d),$("#lbscenicname").text(d),$public.dialog.closebox(),b()):alert("请选择景区！"),!1},function(){f.height($(".container").height()-120),$(c.config.loadlist).show()}),a(),$public.stopBubble(d)}),$(c.config.svdraft).on("click",function(a){var b=$(c.config.svdraftbox);$public.dialog.content(300,160,"保存草稿标题",b.show(),function(){var a=[];$(".dynamicTr").each(function(){var b={pId:$(this).attr("pId"),pTxt:$(this).attr("pTxt"),pType:$(this).attr("pType"),vTxt:$(this).find("input").val(),categoryId:parseInt($('input[name="categoryId"]').val()),flag:!1};a.push(b)});var b=$public.paramcompare($(".scenicForm").serializeArray()),c=$('input[name="ticketId"]:checked').attr("tTitle"),d=$(".svdraftxt").val();return b.ticketTitle=c?c:"",a&&(b.dynamicEntry=JSON.stringify(a)),d?(console.log(b),$public.dialog.closebox(),$public.dialog.waiting(),void $.post($public.urlpath.saveSPOTDraft,{json:b,draftName:d,uuid:$("#uuid").val(),subType:$("#draftSubType").val(),mainType:1,id:$("#draftId").val()},function(a){a.success?a.resultMsg>0&&($("#draftId").val(a.resultMsg),$public.dialog.msg("保存草稿成功！","success")):$public.dialog.msg("保存草稿失败！","error"),$public.dialog.closebox()})):void $(".svdraftxt").focus()},function(){b.height($(".container").height()-120)},1),$public.stopBubble(a)}),$public.init_pagination(a),$(document).on("click",".sceniclist tr",function(){$(this).find('input[type="radio"]').prop("checked","checked")})}},module.exports=new $choiceScenic});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-01 */