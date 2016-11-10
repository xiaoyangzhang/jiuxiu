/*! PC_JX - v1.0.0 - 2016-11-10 */
define(function(require,exports,module){require("dropdownlist"),$public=require("public"),ScenicAndHotel=function(){this.init.apply(this,arguments)},ScenicAndHotel.prototype={config:{searchotel:".choicehotel",searchbox:".dialog .searchbox",hotelist:".hotelist",loadlist:".load_list",searchbtn:".search-btn",btnOk:".ok",infoBar:".info-bar",infoBox:".info-box",inputGp:'input[name="gp"]',svdraftbox:".svdraftbox",svdraft:".svdraft",searchScenic:".choiceScenic",scenicList:".sceniclist",svdraftbox:".svdraftbox",svdraft:".svdraft"},init:function(){var a=this;$public.procityaredata("province","city","area",!0),a.hotel.hotelDialog(),$(a.config.infoBar).find(".icon-close").on("click",function(){$(this).prev().html("")}),$(document).on("click",".searchHotelBtn",function(){$(a.config.loadlist).show(),a.hotel.gethotelist()}),$(document).on("click",".hotelist tr",function(){$(this).find('input[type="radio"]').prop("checked","checked")}),$(".backprev").on("click",function(a){$(".eredar-info li.on").prev().trigger("click"),$public.stopBubble(a)}),a.scenic.scenicDialog(),$(document).on("click",".searchScenicBtn",function(){$(a.config.loadlist).show(),a.scenic.getScenicList()})},hotel:{init_pagination:function(a){$(document).on("click",'.hotel-dialog .jiuniu_pagination li.previous:not(".disabled") a',function(){var b=parseInt($(".jiuniu_pagination li.active a").text()),c=b>0?b-1:b;$('input[name="pageNo"]').val(c),a(c)}),$(document).on("click",'.hotel-dialog .jiuniu_pagination li.next:not(".disabled") a',function(){var b=parseInt($(".jiuniu_pagination li.active a").text()),c=b+1;$('input[name="pageNo"]').val(c),a(c)}),$(document).on("click",'.hotel-dialog .jiuniu_pagination li:not(".active,.previous,.next") a',function(){var b=parseInt($(this).text());$('input[name="pageNo"]').val(b),a(b)}),$(document).on("change",".jiuniu_pagination li #pageSize",function(){$('input[name="pageSize"]').val($(this).val()),a(1,$(this).val())})},hotelDialog:function(){var a=ScenicAndHotel.prototype,b=this;$(a.config.searchotel).on("click",function(c){if($.trim($(".info-bar .scenic-name,.info-bar .hotel-name").text()))return void $public.dialog.msg("景区和酒店只能选择一个","error");var d=$(".searchbox"),e=d.find(a.config.hotelist);e.css({overflow:"auto",height:300}),d.find(".tb-txt").text("酒店名称"),$(".hotelname").val(""),$("#content-box").removeClass("scenic-dialog"),d.find(a.config.searchbtn).removeClass("searchScenicBtn").addClass("searchHotelBtn"),$public.dialog.content(968,550,"选择酒店",d.show(),function(){var a=$('input[name="hotelGroup"]:checked'),b=a.val(),c=a.closest("tr").find(":hidden").val(),d=a.closest("td").next().text();return $(".hotelType").text(c),b?($('input[name="outId"]').val(b),$('input[name="outType"]').val(1),$('input[name="hotelName"]').val(d),$(".hotel-name").text(d),$public.dialog.closebox()):alert("请选择酒店！"),!1},function(){e.height($(".container").height()-120),$(a.config.loadlist).show(),$("#content-box").addClass("hotel-dialog")}),b.gethotelist(),$public.stopBubble(c)})},gethotelist:function(a,b){var c=ScenicAndHotel.prototype,d=this,a=a?a:1,b=b?b:$("#pageSize").val(),e=$(c.config.searchbox).find(c.config.hotelist);e.empty(),$(c.config.loadlist).show(),$.get($public.urlpath.gethotelist,{page:a,pageSize:b,name:$(".dialog  .hotelname").val(),locationProvinceId:$('input[name="province"]').val()?$('input[name="province"]').val():0,locationCityId:$('input[name="city"]').val()?$('input[name="city"]').val():0,locationTownId:$('input[name="area"]').val()?$('input[name="area"]').val():0},function(a){e.append(a),$(c.config.loadlist).hide(),$(".jiuniu_pagination").css("margin-left",($(".container").width()-$(".jiuniu_pagination").width())/2+"px"),$(".tb-box").height($(".hotelist").height())}),d.init_pagination&&d.init_pagination(d.gethotelist)}},scenic:{init_pagination:function(a){$(document).on("click",'.scenic-dialog .jiuniu_pagination li.previous:not(".disabled") a',function(){var b=parseInt($(".jiuniu_pagination li.active a").text()),c=b>0?b-1:b;$('input[name="pageNo"]').val(c),a(c)}),$(document).on("click",'.scenic-dialog .jiuniu_pagination li.next:not(".disabled") a',function(){var b=parseInt($(".jiuniu_pagination li.active a").text()),c=b+1;$('input[name="pageNo"]').val(c),a(c)}),$(document).on("click",'.scenic-dialog .jiuniu_pagination li:not(".active,.previous,.next") a',function(){var b=parseInt($(this).text());$('input[name="pageNo"]').val(b),a(b)}),$(document).on("change",".scenic-dialog .jiuniu_pagination li #pageSize",function(){$('input[name="pageSize"]').val($(this).val()),a(1,$(this).val())})},scenicDialog:function(){var a=ScenicAndHotel.prototype,b=this;$(a.config.searchScenic).on("click",function(c){if($.trim($(".info-bar .scenic-name,.info-bar .hotel-name").text()))return void $public.dialog.msg("景区和酒店只能选择一个","error");var d=$(".searchbox"),e=d.find(a.config.hotelist);d.find(".tb-txt").text("景区名称"),$(".hotelname").val(""),e.css({overflow:"auto",height:280}),$("#content-box").removeClass("hotel-dialog"),d.find(a.config.searchbtn).removeClass("searchHotelBtn").addClass("searchScenicBtn"),$public.dialog.content(968,550,"选择景区",d.show(),function(){var a=$('input[name="scenicGroup"]:checked'),b=a.val(),c=a.closest("td").next().text();return b?($('input[name="outId"]').val(b),$('input[name="outType"]').val(2),$('input[name="scenicName"]').val(c),$(".scenic-name").text(c),$public.dialog.closebox()):alert("请选择景区！"),!1},function(){e.height($(".container").height()-120),$(a.config.loadlist).show(),$("#content-box").addClass("scenic-dialog")}),b.getScenicList(),$public.stopBubble(c)})},getScenicList:function(a,b){var c=ScenicAndHotel.prototype,d=this,a=a?a:1,b=b?b:$("#pageSize").val(),e=$(c.config.searchbox).find(c.config.hotelist);e.empty(),$.get($public.urlpath.getScenicList,{page:a,pageSize:b,name:$(".dialog  .hotelname").val(),locationProvinceId:$('input[name="province"]').val()?$('input[name="province"]').val():0,locationCityId:$('input[name="city"]').val()?$('input[name="city"]').val():0,locationTownId:$('input[name="area"]').val()?$('input[name="area"]').val():0},function(a){e.append(a),$(c.config.loadlist).hide(),$(".jiuniu_pagination").css("margin-left",($(".container").width()-$(".jiuniu_pagination").width())/2+"px")}),d.init_pagination&&d.init_pagination(d.getScenicList)}}},module.exports=new ScenicAndHotel});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-10 */