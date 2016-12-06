/*! PC_JX - v1.0.0 - 2016-12-06 */
define(function(require,exports,module){require("json"),$urlpath=require("urlpath"),$public=function(){Array.prototype.remove=function(a){if(isNaN(a)||a>this.length)return!1;for(var b=0,c=0;b<this.length;b++)this[b]!=this[a]&&(this[c++]=this[b]);return this.length-=1,this},String.prototype.Trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")},String.prototype.LTrim=function(){return this.replace(/(^\s*)/g,"")},String.prototype.RTrim=function(){return this.replace(/(\s*$)/g,"")},this.init.apply(this,arguments)},fileuploadURL=$("#filegw_url").val()?$("#filegw_url").val()+"/":$urlpath.fileuploadURL,fileCompressURL=$("#filegw_domain").val()+"/",site_path=$("#root_path").val()+"/",img_domain=$("#tfs").val()?$("#tfs").val()+"/":$urlpath.img_domain+"/",static_path=$("#static_path").val()||$urlpath.static_source,static_source=static_path?static_path.substring(0,static_path.lastIndexOf("/")+1):"",$public.prototype={init:function(){var a=this,b='textarea,input:not(input[type="radio"],input[type="checkbox"])';document.domain.indexOf("jiuxiulvxing.com")!=-1&&(document.domain="jiuxiulvxing.com"),$(document).on("focus",b,function(){$(this).css("border","1px solid #ed6c44")}),$(document).on("blur",b,function(){$(this).css("border","1px solid #ddd")}),setTimeout(function(){a.isVdSelect=!0},500)},isLogin:function(a){!a instanceof Object&&(a=JSON.parse(a)),22e6==a.errorCode&&(window.location=site_path+"/user/login")},depath:function(){var a=$("#jiuxColor").height(),b=$("#footID,.jiux-footer").height(),c=$(".eredar-left"),d=$(".eredar-right"),e=$(window).height()-a-b-102,f=$(document).height()-a-b-60,g=c.height()+120,h=d.height();e>g&&e>h?c.height(g):c.height(f)},urlpath:{eredar:site_path+"/basicInfo/talent/saveTalentInfo",merchant:site_path+"/basicInfo/merchant/saveBasic",updatepwd:site_path+"/account/modifyPassword",gethotelist:site_path+"/hotel/queryHotelManageList",getroominfo:site_path+"/hotel/queryRoomTypeListByData",addhotel:site_path+"/hotel/addHotelMessageVOByData",updatehotel:site_path+"/hotel/editHotelMessageVOByData",getScenicList:site_path+"/scenic/queryScenicManageVOListByData",getScenicTicketType:site_path+"/scenic/queryTicketListByScenicId",addScenic:site_path+"/scenic/addScenicManageVOByDdata",updateScenic:site_path+"/scenic/editScenicManageVOByDdata",getBsScope:site_path+"/apply/getBusinessScope",pageilB:site_path+"/apply/seller/pageDetailB",agreement:site_path+"/apply/talent/agreement",saveSPOTDraft:site_path+"/draft/saveSPOTDraft",toDetailPage:site_path+"/apply/seller/toDetailPage",upReplyMsg:site_path+"/order/setUpReplyMsg"},timer:null,isVdSelect:!1,dialog:{initbox:function(){var a=this;clearTimeout(a.timer),a.box||($("body").append('<div class="dialog"><div class="bgmeng" style="height:'+$(document).height()+'px"></div></div>'),$(".bgmeng").on("click",function(b){a.closebox(),$public.stopBubble(b)}),a.box=$(".dialog").height($(window).height()))},closebox:function(){var a=this;"msg-box"!=a.box.attr("id")&&$(".container").children("div").hide().appendTo("body"),a.box.remove(),a.box=null,$(".bgmeng").off().on("click",function(b){a.closebox(),$public.stopBubble(b)})},waiting:function(){var a=this;a.initbox(),"waiting-box"==a.box.attr("id")?a.box.fadeIn():($(".bgmeng").off(),a.box.children(':not(".bgmeng")').hide().appendTo("body"),a.box.attr("id","waiting-box").append('<div class="loading"><img src="'+static_source+'img/loading.gif"><label>请稍后。。。</label></div>').fadeIn())},msg:function(a,b,c){var d=this;d.initbox(),"msg-box"==d.box.attr("id")?($(".msg").text(a),d.box.fadeIn()):(d.box.children(':not(".bgmeng")').remove(),d.box.attr("id","msg-box").append('<div class="msg">'+a+"</div>").fadeIn());var e=$("#msg-box .msg");e.css({"margin-left":-e.outerWidth()/2+"px"}).css({"margin-top":-e.outerHeight()/2+"px"}),clearTimeout(d.timer),d.timer=setTimeout(function(){d.closebox()},c?c:1e3),"success"==b?$(".msg").css("color","green"):"error"==b&&$(".msg").css("color","red")},content:function(a,b,c,d,e,f,g){var h=this,i=g?"prompt-box":"content-box";h.initbox(),$(".bgmeng").off(),"auto"==b&&(b=$(window).height()-180),h.box.attr("id")==i?h.box.fadeIn():(h.box.children(':not(".bgmeng")').remove(),h.box.attr("id",i).append('<div class="'+i+'"></div>').fadeIn(),$("."+i).append('<div class="btn-group"><div><button class="ok">确定</button><button class="cancel">取消</button></div></div>').append('<div class="close-tip clearfix"><i></i><div><h2>'+c+"</h2></div></div>").append('<div class="container"></div>').width(a).height(b).css({"margin-left":-(a/2)+"px","margin-top":-(b/2)+"px"}),$(".container").height(b-125),$(".ok").off().on("click",function(a){e(),$public.stopBubble(a)}),$(".cancel,.close-tip i").off().on("click",function(a){h.closebox(),$public.stopBubble(a)})),d.appendTo($(".container")),f()}},init_pagination:function(a){$(document).on("click",'.jiuniu_pagination li.previous:not(".disabled") a',function(){var b=parseInt($(".jiuniu_pagination li.active a").text()),c=b>0?b-1:b;$('input[name="pageNo"]').val(c),a(c)}),$(document).on("click",'.jiuniu_pagination li.next:not(".disabled") a',function(){var b=parseInt($(".jiuniu_pagination li.active a").text()),c=b+1;$('input[name="pageNo"]').val(c),a(c)}),$(document).on("click",'.jiuniu_pagination li:not(".active,.previous,.next") a',function(){var b=parseInt($(this).text());$('input[name="pageNo"]').val(b),a(b)}),$(document).on("change",".jiuniu_pagination li #pageSize",function(){$('input[name="pageSize"]').val($(this).val()),a(1,$(this).val())})},ck_device:function(){var a={versions:function(){var a=navigator.userAgent;navigator.appVersion;return{trident:a.indexOf("Trident")>-1,presto:a.indexOf("Presto")>-1,webKit:a.indexOf("AppleWebKit")>-1,gecko:a.indexOf("Gecko")>-1&&a.indexOf("KHTML")==-1,mobile:!!a.match(/AppleWebKit.*Mobile.*/),ios:!!a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:a.indexOf("Android")>-1||a.indexOf("Linux")>-1,iPhone:a.indexOf("iPhone")>-1,iPad:a.indexOf("iPad")>-1,webApp:a.indexOf("Safari")==-1}}(),language:(navigator.browserLanguage||navigator.language).toLowerCase()};if(a.versions.mobile){var b=navigator.userAgent.toLowerCase();"micromessenger"==b.match(/MicroMessenger/i),"weibo"==b.match(/WeiBo/i),"qq"==b.match(/QQ/i),a.versions.ios,a.versions.android}},paramcompare:function(a,b){for(var c={},d={},e=0;e<a.length;e++)if(d[a[e].name]){var f=a[e].name,g=c[f],h=a[e].value,i=[];g.constructor==Array?c[f]=g.concat(h):(i.push(g),i.push(h),c[f]=i)}else c[a[e].name]=a[e].value,d[a[e].name]=!0;return b instanceof Function&&b(c),c},actiondata:function(a,b,c){$.ajax({url:static_path+"/js/allcity.js",dataType:"jsonp",jsonpCallback:"callback",success:function(d){setTimeout(function(){function e(a){a.find("li:eq(0)~li").remove(),a.filter(function(){$(this).find(".select-button").val($(this).find("li:eq(0)").first().text())}),a.find(":hidden").val(""),a.next(".Validform_checktip").remove()}$("#"+a).empty().append(_.template($("#province-tpl").html(),d)).children("option").filter(function(){$(this).val()==$(".province_h").val()&&$(this).attr("selected","selected")}),$("#"+a).selectlist({width:110,onChange:function(){var a=$('input[name="province"]').val();if(a)for(var f in d.city)f==a&&$("#"+b).empty().append(_.template($("#city-tpl").html(),{city:d.city[f]})).selectlist({width:180,onChange:function(){c||$public.selectvalid(this.element.id)}});else e($("#"+b));c||$public.selectvalid(this.element.id)},onSuccess:function(){var a=$("#"+this.element.id+"_").val(),a=a?a:"fail",e=$("#"+this.element.id).find("li");e.filter(function(){$(this).attr("data-value")==a&&($(this).trigger("autoclick"),setTimeout(function(){var a=$('input[name="province"]').val();for(var e in d.city)e==a&&$("#"+b).empty().append(_.template($("#city-tpl").html(),{city:d.city[e]})).selectlist({width:180,onChange:function(){c||$public.selectvalid(this.element.id)}})},100))})}}),$("#"+b).selectlist({width:180})},100)}})},procityaredata:function(a,b,c,d){$.ajax({url:static_path+"/js/allcity.js",dataType:"jsonp",jsonpCallback:"callback",success:function(e){setTimeout(function(){function f(a){a.find("li:eq(0)~li").remove(),a.filter(function(){$(this).find(".select-button").val($(this).find("li:eq(0)").first().text())}),a.find(":hidden").val(""),a.next(".Validform_checktip").remove()}$("#"+a).empty().append(_.template($("#province-tpl").html(),e)).children("option").filter(function(){$(this).val()==$(".province_h").val()&&$(this).attr("selected","selected")}),$("#"+a).selectlist({width:110,onChange:function(){var a=$('input[name="province"]').val();if(a)for(var g in e.city)g==a&&$("#"+b).empty().append(_.template($("#city-tpl").html(),{city:e.city[g]})).selectlist({width:180,onChange:function(){var a=$('input[name="city"]').val();if(a)for(var b in e.area)b==a&&$("#"+c).empty().append(_.template($("#area-tpl").html(),{area:e.area[b]})).selectlist({width:180,onChange:function(){d||$public.selectvalid(this.element.id)}});else f($("#"+c));d||$public.selectvalid(this.element.id)}});else f($("#"+b+",#"+c));d||$public.selectvalid(this.element.id)},onSuccess:function(){var a=$("#"+this.element.id+"_").val(),a=a?a:"fail",g=$("#"+this.element.id).find("li");g.filter(function(){$(this).attr("data-value")==a&&($(this).trigger("autoclick"),setTimeout(function(){var a=$('input[name="province"]').val();if(a)for(var g in e.city)g==a&&$("#"+b).empty().append(_.template($("#city-tpl").html(),{city:e.city[g]})).selectlist({width:180,onChange:function(){var a=$('input[name="city"]').val();if(a)for(var b in e.area)b==a&&$("#"+c).empty().append(_.template($("#area-tpl").html(),{area:e.area[b]})).selectlist({width:180,onChange:function(){d||$public.selectvalid(this.element.id)}});else f($("#"+c));d||$public.selectvalid(this.element.id)},onSuccess:function(){var a=$("#"+this.element.id+"_").val(),a=a?a:"fail",b=$("#"+this.element.id).find("li");b.filter(function(){$(this).attr("data-value")==a&&($(this).trigger("autoclick"),setTimeout(function(){var a=$('input[name="city"]').val();if(a)for(var b in e.area)b==a&&$("#"+c).empty().append(_.template($("#area-tpl").html(),{area:e.area[b]})).selectlist({width:180,onChange:function(){d||$public.selectvalid(this.element.id)}});else f($("#"+c))},100))})}});else f($("#"+b+",#"+c))},100))})}}),$("#"+b).selectlist({width:180}),$("#"+c).selectlist({width:180,onChange:function(){d||$public.selectvalid(this.element.id)}})},100)}})},allimgvalid:function(a){var b=!0,c=null;return a.length>0&&a.filter(function(){var a=$(this).attr("class").indexOf("allownull")!=-1;c=$(this).find("input:hidden"),$(this).parent().find(".Validform_checktip").remove(),a||(""!=c.val()?$(this).after('<span class="Validform_checktip Validform_right"></span>'):($(this).after('<span class="Validform_checktip Validform_wrong">请选择图片！</span>'),b=!1))}),b},groupimgvalid:function(a,b){if(a.length>0){var c=a.find(":hidden"),d=a.attr("class").indexOf("allownull")!=-1;if(a.find(".Validform_checktip").remove(),d)return!0;for(var e=0;e<c.length;e++)if(""!=c[e].value)return a.append('<span class="Validform_checktip Validform_right"></span>'),!0;return a.append('<span class="Validform_checktip Validform_wrong">'+(b?b:"")+"</span>"),!1}return!0},selectvalid:function(a){var b=!0,c=null;return this.isVdSelect&&(c=a?$('input[name="'+a+'"]'):$(".select-wrapper input:hidden"),c.filter(function(){var a=$(this).closest(".select-wrapper");a.next(".Validform_checktip").remove(),""!=$(this).val()?(a.find(".select-button").css("background","#fff"),a.after('<span class="Validform_checktip Validform_right Select_tip"></span>')):(a.find(".select-button").css("background","#ffe7e7"),a.after('<span class="Validform_checktip Validform_wrong Select_tip"></span>'),b=!1)})),b},isPicture:function(a,b){var c={content:"文件类型不合法,只能是jpg、png、jpeg类型！"},d=a.value,e={status:!0,content:"文件大小不能超过"+b+(b<10?"M":"K")},f=b<10?1024*b*1024:1024*b,g=0;if("I"!=this.diffBrowser().substring(0,1)&&(g=a.files[0].size,g>f))return e.status=!1,e;if(null!=d&&""!=d)if(d.lastIndexOf(".")!=-1){var h=d.substring(d.lastIndexOf(".")+1,d.length).toLowerCase(),i=new Array;i[0]="jpg",i[2]="png",i[3]="jpeg";for(var j=0;j<i.length;j++)if(i[j]==h)return c.status=!0,c;c.status=!1}else c.status=!1;else c.status=!0;return c},stopBubble:function(a){var b=a||window.event||arguments.callee.caller.arguments[0];b&&b.stopPropagation?b.stopPropagation():window.event.cancelBubble=!0},stopDefault:function(a){var b=a||window.event||arguments.callee.caller.arguments[0];b&&b.preventDefault?b.preventDefault():window.event.returnValue=!1},dateFormat:function(a,b){b=b||"yyyy-MM-dd hh:mm:ss";var c={"M+":a.getMonth()+1,"d+":a.getDate(),"h+":a.getHours(),"m+":a.getMinutes(),"s+":a.getSeconds(),"q+":Math.floor((a.getMonth()+3)/3),S:a.getMilliseconds()};/(y+)/.test(b)&&(b=b.replace(RegExp.$1,(a.getFullYear()+"").substr(4-RegExp.$1.length)));for(var d in c)new RegExp("("+d+")").test(b)&&(b=b.replace(RegExp.$1,1==RegExp.$1.length?c[d]:("00"+c[d]).substr((""+c[d]).length)));return b},setCookie:function(a,b){var c=30,d=new Date;d.setTime(d.getTime()+24*c*60*60*1e3),document.cookie=a+"="+escape(b)+";expires="+d.toGMTString()},getCookie:function(a){var b,c=new RegExp("(^| )"+a+"=([^;]*)(;|$)");return(b=document.cookie.match(c))?unescape(b[2]):null},delCookie:function(a){var b=new Date;b.setTime(b.getTime()-1);var c=getCookie(a);null!=c&&(document.cookie=a+"="+c+";expires="+b.toGMTString())},diffBrowser:function(){var a=navigator.userAgent,b=a.indexOf("Opera")>-1,c=navigator.userAgent.toLowerCase(),d=/(msie\s|trident.*rv:)([\w.]+)/,e=null!=d.exec(c),f=a.indexOf("Firefox")>-1,g=a.indexOf("Safari")>-1,h=a.indexOf("Chrome")>-1;if(e){var i=(k=l=m=n=o=!1,new RegExp("MSIE (\\d+\\.\\d+);"));i.test(a);var j=parseFloat(RegExp.$1),k=5.5==j,l=6==j,m=7==j,n=8==j,o=9==j;return k?"IE55":l?"IE6":m?"IE7":n?"IE8":o?"IE9":"IE"}return f?"FF":b?"Opera":h?"Chrome":g?"Safari":void 0},uploadPic:function(a,b){var c=document.getElementById(a),d=document.getElementById(b);if(window.FileReader)oFReader=new FileReader,oFReader.readAsDataURL(d.files[0]),oFReader.onload=function(a){c.src=a.target.result};else if(document.all){d.select();var e=document.selection.createRange().text;window.ie6?c.src=e:(c.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\""+e+'")',c.src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==")}else d.files&&d.files.item(0)&&(url=d.files.item(0).getAsDataURL(),c.src=url)},html_encode:function(a){var b="";return 0==a.length?"":(b=a.replace(/&/g,"&amp;"),b=b.replace(/</g,"&lt;"),b=b.replace(/>/g,"&gt;"),b=b.replace(/ /g,"&nbsp;"),b=b.replace(/\'/g,"&#39;"),b=b.replace(/\"/g,"&quot;"),b=b.replace(/\n|\r\n/g,"<br>"))},html_decode:function(a){var b="";return 0==a.length?"":(b=a.replace(/&amp;/g,"&"),b=b.replace(/&lt;/g,"<"),b=b.replace(/&gt;/g,">"),b=b.replace(/&nbsp;/g," "),b=b.replace(/&#39;/g,"'"),b=b.replace(/&quot;/g,'"'),b=b.replace(/<br>/g,"\n"))}},module.exports=new $public});
/*! PC_JX xiongzhaoling 最后修改于： 2016-12-06 */