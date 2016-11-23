/*! PC_JX - v1.0.0 - 2016-11-23 */
define(function(require,exports,module){$public=require("public"),$datepicker=function(){this.solarMonth=new Array(31,28,31,30,31,30,31,31,30,31,30,31),this.nStr1=new Array("日","一","二","三","四","五","六","七","八","九","十"),this.rangedays=90,this.empty_ckbox={},this.fat=this.mat=9,this.cld=null,this.isCtrl=!1,this.isShift=!1,this.lastCtrlSelectDay=0,this.Today=new Date,this.tY=this.Today.getFullYear(),this.tM=this.Today.getMonth(),this.tD=this.Today.getDate(),this.lunarInfo=new Array(19416,19168,42352,21717,53856,55632,91476,22176,39632,21970,19168,42422,42192,53840,119381,46400,54944,44450,38320,84343,18800,42160,46261,27216,27968,109396,11104,38256,21234,18800,25958,54432,59984,28309,23248,11104,100067,37600,116951,51536,54432,120998,46416,22176,107956,9680,37584,53938,43344,46423,27808,46416,86869,19872,42448,83315,21200,43432,59728,27296,44710,43856,19296,43748,42352,21088,62051,55632,23383,22176,38608,19925,19152,42192,54484,53840,54616,46400,46496,103846,38320,18864,43380,42160,45690,27216,27968,44870,43872,38256,19189,18800,25776,29859,59984,27480,21952,43872,38613,37600,51552,55636,54432,55888,30034,22176,43959,9680,37584,51893,43344,46240,47780,44368,21977,19360,42416,86390,21168,43312,31060,27296,44368,23378,19296,42726,42208,53856,60005,54576,23200,30371,38608,19415,19152,42192,118966,53840,54560,56645,46496,22224,21938,18864,42359,42160,43600,111189,27936,44448),this.supplierCalendar={seller_id:$('input[name="sellerId"]').val(),hotel_id:$('input[name="hotelId"]').val(),sku_flag:"",bizSkuInfo:[]},this.init.apply(this,arguments)},$datepicker.prototype={init:function(){var a=this;$(".rds").val()&&(a.rangedays=$(".rds").val()),$(".setvl").on("click",function(){var b=$(".day .choiced .dtbx"),c=$(".price").val(),d=$(".stock").val();if(b.length>0){if(!/^\d{1,6}(\.\d{1,2})?$|^[1-9]\d{0,5}$/.test($(".price").val()))return $public.dialog.msg("“价格”为数字,最大6位整数,能带两位小数","error"),void $(".price").focus();if(!/^[1-9]\d{0,5}$/.test($(".stock").val()))return $public.dialog.msg("“库存”为数字,最大6位整数","error"),void $(".stock").focus();b.filter(function(){a.set_tdvalue($(this),c,d),a.set_chahevalue(d,c,$(this).parent().find("font").html())}),$('input[name="supplierCalendar"]').val(JSON.stringify(a.supplierCalendar))}else $public.dialog.msg("请选择要设置的日期","error")}),$(".clearvl").on("click",function(){var b=$(".day .choiced .dtbx");b.length>0?(b.filter(function(){$(this).find(".tipvl").remove(),a.del_chahevalue($(this).parent().find("font").html())}),$(document).trigger("click"),$(".price,.stock").val(""),$('input[name="supplierCalendar"]').val(JSON.stringify(a.supplierCalendar))):$public.dialog.msg("请选择要清除信息的日期","error")}),$(".setvalue").on("click",function(a){$public.stopBubble(a)}),$(".tdyears .prev").on("click",function(b){var c=parseInt($("#SY").text());$("#SY").text(c-1),a.changeCld(),$public.stopBubble(b)}),$(".tdyears .next").on("click",function(b){var c=parseInt($("#SY").text());$("#SY").text(c+1),a.changeCld(),$public.stopBubble(b)}),$(".tdmonth li").on("click",function(b){$(".tdmonth li").removeClass("on"),$(this).addClass("on"),a.changeCld(),$public.stopBubble(b)}),$(".tdmonth li").on("click",function(b){$(".tdmonth li").removeClass("on"),$(".tdweek input[type='checkbox']").attr("checked",!1),$(this).addClass("on"),this.lastCtrlSelectDay=0,a.changeCld(),$public.stopBubble(b)}),$(".tdweek").on("click","td:has(input[type='checkbox'])",function(){var a=event.target.tagName.toLowerCase();if("td"==a){var b=event.target.children[0];b.checked=!b.checked}else if("input"==a)var b=event.target;var c=b.checked,d=$(b).attr("week");c?$(".day td.in-range[week='"+d+"']").addClass("choiced"):$(".day td.in-range[week='"+d+"']").removeClass("choiced")}),window.document.onclick=function(){},window.document.onkeydown=function(b){b=b||window.event||arguments.callee.caller.arguments[0],17==b.keyCode&&(a.isCtrl=!0),16==b.keyCode&&(a.isShift=!0)},window.document.onkeyup=function(b){b=b||window.event||arguments.callee.caller.arguments[0],17==b.keyCode&&(a.isCtrl=!1),16==b.keyCode&&(a.isShift=!1)},window.document.onselectstart=function(){},a.initial()},lYearDays:function(a){var b,c=348;for(b=32768;b>8;b>>=1)c+=this.lunarInfo[a-1900]&b?1:0;return c+this.leapDays(a)},leapDays:function(a){return this.leapMonth(a)?65536&this.lunarInfo[a-1900]?30:29:0},leapMonth:function(a){return 15&this.lunarInfo[a-1900]},monthDays:function(a,b){return this.lunarInfo[a-1900]&65536>>b?30:29},solarDays:function(a,b){return 1==b?a%4==0&&a%100!=0||a%400==0?29:28:this.solarMonth[b]},calElement:function(a,b,c,d){return{isToday:!1,sYear:a,sMonth:b,sDay:c,week:d}},calendar:function(a,b){this.fat=this.mat=0;var c,d=1,e=0,f={};c=new Date(a,b,1),f.length=this.solarDays(a,b),f.firstWeek=c.getDay(),b+1==5&&(this.fat=c.getDay()),b+1==6&&(this.mat=c.getDay());for(var g=0;g<f.length;g++)d>e&&(c=new Date(a,b,g+1)),f[g]=this.calElement(a,b+1,g+1,this.nStr1[(g+f.firstWeek)%7]),(g+f.firstWeek)%7==0&&(f[g].color="red");return a==this.tY&&b==this.tM&&(f[this.tD-1].isToday=!0),f},select:function(a){$(".day .choiced").removeClass("choiced"),a.addClass("choiced"),$(".price").val(a.find(".price_").text()),$(".stock").val(a.find(".stock_").text()),this.lastCtrlSelectDay=0},ctrlSelect:function(a){a.hasClass("choiced")?a.removeClass("choiced"):(a.addClass("choiced"),1==$(".day .choiced").length?($(".price").val(a.find(".price_").text()),$(".stock").val(a.find(".stock_").text())):$(".price,.stock").val(""),this.lastCtrlSelectDay=parseInt(a.attr("day")),console.log("lastCtrlSelectDay:"+this.lastCtrlSelectDay))},shiftSelect:function(a){var b,c,d=$(".day .choiced").length,e=parseInt(a.attr("day"));if(0==d)a.addClass("choiced"),$(".price").val(a.find(".price_").text()),$(".stock").val(a.find(".stock_").text()),this.firstShiftSelectDay=e;else{if(c=e,b=1==d?parseInt($(".day .choiced").attr("day")):parseInt($(".day .choiced").last().attr("day")),0!=this.lastCtrlSelectDay&&(b=this.lastCtrlSelectDay),console.log("startDay:"+b),console.log("endDay:"+c),c<=b)return;for(var f=b;f<=c;f++)$(".day td[day='"+f+"']").addClass("choiced");this.lastCtrlSelectDay=0,$(".price,.stock").val("")}},drawCld:function(a,b){var c,d,e=this;p2="";for(e.cld=e.calendar(a,b),c=0;c<42;c++){var f=document.getElementById("SD"+c),g=$(f).closest("td");if(g.removeClass().attr("day","").attr("week",""),d=c-e.cld.firstWeek,d>-1&&d<e.cld.length){f.innerHTML=d+1,e.cld[d].isToday&&g.addClass("today");var h=new Date(a,b,d+1);g.attr("day",d+1).attr("week",h.getDay()),e.checkRangeDay(h,e.rangedays)?g.addClass("in-range").off().on("click",function(a){var b=$(this);b.hasClass("out-range")||(e.isCtrl?e.ctrlSelect(b):e.isShift?e.shiftSelect(b):e.select(b),$(".tdweek input[type='checkbox']").each(function(){var a=$(this).attr("week"),b=$(".day td.in-range[week='"+a+"']").length,c=$(".day td.choiced[week='"+a+"']").length;this.checked=b==c}),$public.stopBubble(a))}):g.addClass("out-range").off()}else f.innerHTML="",g.addClass("out-range").off()}""==$(".datepicker tr.last td:eq(0) font").text()?$(".datepicker tr.last").hide():$(".datepicker tr.last").show(),this.dateRender(this.supplierCalendar)},recordck:function(a,b){var c=new Date($("#SY").text(),$(".tdmonth li.on").index(),a.find("font").html()).valueOf();this.isCtrl||(this.empty_ckbox={}),"add"!=b||this.empty_ckbox[c]?"del"==b&&this.empty_ckbox[c]&&delete this.empty_ckbox[c]:this.empty_ckbox[c]=!0},dateRender:function(a){var b=this.supplierCalendar.bizSkuInfo,c=$(".dtbx font"),d=this;$(".tipvl").remove();for(var e=0;e<b.length;e++)c.filter(function(){if(""!=this.innerHTML){var a=new Date($("#SY").text(),$(".tdmonth li.on").index(),this.innerHTML).valueOf();if(a==b[e].vTxt&&"del"!=b[e].state){var c=$(this).closest("td")[0];d.set_tdvalue($(c).find(".dtbx"),b[e].price,b[e].stock_num),d.checkRangeDay(new Date($("#SY").text(),$(".tdmonth li.on").index(),this.innerHTML),d.rangedays)?$(c).addClass("choiced"):(console.log(this.innerHTML),console.log($(c).find(".tipvl").html()))}}});$(".tdweek input[type='checkbox']").each(function(){var a=$(this).attr("week"),b=$(".day td.in-range[week='"+a+"']").length,c=$(".day td.choiced[week='"+a+"']").length;this.checked=b==c})},set_chahevalue:function(a,b,c){for(var d=new Date($("#SY").text(),$(".tdmonth li.on").index(),c).getTime()+"",e=this.supplierCalendar.bizSkuInfo,f=0;f<e.length;f++)if(d==e[f].vTxt&&"del"!=e[f].state)return 0!=e[f].sku_id&&(e[f].state="update"),e[f].stock_num=a,e[f].price=b,void console.log(JSON.stringify(this.supplierCalendar.bizSkuInfo)+"   ---------set_chahevalue--update------");e.push({sku_id:0,state:"add",stock_num:a,price:b,vTxt:d}),console.log(JSON.stringify(this.supplierCalendar.bizSkuInfo)+"   --------set_chahevalue--add------")},del_chahevalue:function(a){for(var b=new Date($("#SY").text(),$(".tdmonth li.on").index(),a).getTime()+"",c=this.supplierCalendar.bizSkuInfo,d=0;d<c.length;d++)b==c[d].vTxt&&("update"==c[d].state||""==c[d].state?c[d].state="del":"add"==c[d].state&&c.remove(d));console.log(JSON.stringify(this.supplierCalendar.bizSkuInfo)+"   -------del_chahevalue----------")},set_tdvalue:function(a,b,c){0==a.find(".tipvl").length?a.append('<div class="tipvl"><label>￥：</label><label class="price_">'+b+'</label><br><label>库存：</label><label class="stock_">'+c+"</label></div>"):(a.find(".price_").text(b),a.find(".stock_").text(c))},checkRangeDay:function(a,b,c){var d=new Date,c=c?c:0,b=b?b:0,e=Math.ceil((a-d)/1e3/60/60/24);return-c<=e&&e<=b-1},changeCld:function(){var a,b;a=$("#SY").text(),b=$(".tdmonth li.on").index(),this.drawCld(a,b)},initial:function(){var a,b="",c=$('input[name="supplierCalendar"]').val();for(i=0;i<6;i++){for(b+='<tr class="day '+(5==i?"last":"")+'">',j=0;j<7;j++)a=7*i+j,b+='<td id="GD'+a+'"><div class="dtbx"><font id="SD'+a+'"',0==j&&(b+=' style="color:red"'),6==j&&(b+=' style="color:#000080"'),b+="> </font></div></td>";b+="</tr>"}$(".datepicker table").append(b),$("#SY").text(this.tY),$(".tdmonth li").removeClass("on"),$(".tdmonth").find("li:eq("+this.tM+")").addClass("on"),c?this.supplierCalendar=JSON.parse(c):$('input[name="supplierCalendar"]').val(JSON.stringify(this.supplierCalendar)),this.drawCld(this.tY,this.tM)}},module.exports=new $datepicker});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-23 */