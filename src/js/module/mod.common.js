/*! PC_JX - v1.0.0 - 2016-11-25 */
define(function(require,exports,module){require("tmpl"),require("validform"),require("md5");var a=function(){this.init.apply(this,arguments)};a.prototype={init:function(){var a=this;a.timmer={},a.setPlaceholder(),a.comSelect(),a.lineInteractive(),a.scrollBanner({bannerId:"#scroll-banner"}),a.saveFeedBack(),a.loadIndexImages(),a.setTopFixed(".details-list"),a.scrollTourContent(),a.screenBackTop(),a.hoverText(),a.buyActivity(),a.setTextAreaNumber(),a.immediately()},isUserLogin:function(a){var b=this,c={cookieName:"token2",callback:function(){}},d=$.extend(c,a),e=(require("cookie"),!!$.cookie(d.cookieName));e?d.callback():b.showLoginWindow(d.callback)},showLoginWindow:function(a){var b=this;b.closeWinFn&&b.closeWinFn();var c=function(){var c=$.cookie("loginName");c&&""!==c&&"null"!==c&&$("#loginname").val(c),b.submitLoginEvent(a),$("#loginSubmitBtn").on("click",function(){return b.avoidCntClick(function(){$("#loginForm").submit()},100,"winlogin"),!1})};b.openWindowFn({width:640,height:400,frameId:"login-pop-frame",url:$("#loginWindow").val(),showCallback:c})},submitLoginEvent:function(a){var b=this,c=function(){var a=$("#loginname").val(),b=$("#loginForm .saveuser");if(b.prop("checked")){var c=new Date;c.setTime(c.getTime()+36e5),$.cookie("loginName",a,{expires:c,path:"/"})}else $.cookie("loginName",null,{path:"/"})},d=function(d){if(!d.success)return b.comAlert({msg:d.resultMsg,append:"#login-pop-frame",hideCallback:function(){$("#loginSubmitBtn").removeAttr("disabled")}}),!1;if($("#imgcode").val(""),$(".imgcode")[0].src=$("#root_path").val()+"/user/getImgCode?d="+Math.random(),c(),e.resetForm(),$("#login-pop-frame").remove(),a){var f=a();return setTimeout(function(){$("#loginSubmitBtn").removeAttr("disabled")},500),f}d.value?window.location.href=d.value:window.location.reload()},e=$("#loginForm").Validform({tiptype:4,ajaxPost:!0,beforeCheck:function(){var a=$("#loginname").val(),c=$("#loginpwd").val();return""==a?(b.comAlert({msg:"请输入用户名",append:"#login-pop-frame"}),!1):""==c?(b.comAlert({msg:"请输入密码",append:"#login-pop-frame"}),!1):c.length<6?(b.comAlert({msg:"请输入6-20位密码",append:"#login-pop-frame"}),!1):void 0},beforeSubmit:function(a){$("#loginpwd").val(md5($("#loginpwd").val()))},callback:d});return!1},comSelect:function(){$(document).on("click",".ym-select span",function(){$(this).closest(".ym-select").css("z-index",100),$(".ym-select ul").hide(),$(this).next("ul").children().length>4?$(this).next("ul").css({height:184,overflow:"auto"}):$(this).next("ul").css({height:"auto"}),$(this).next("ul").show()}),$(document).on("click",".ym-select ul li",function(){var a=$(this).closest("ul"),b=$(this).closest(".ym-select"),c=$(this).attr("data-value"),d=$(this).text();b.css("z-index",1),b.find("em").html(d),b.find("input[type='hidden']").val(0!=c?c:""),a.hide()}),$(document).on("click",function(a){0==$(a.target).closest(".ym-select").length&&($(".ym-select").css("z-index",1),$(".ym-select ul").hide())})},comAlert:function(a){var b=$.extend({type:!1,msg:"",showTime:2e3,animationTime:500,append:!1,showCallback:function(){},hideCallback:function(){}},a),c=b.type?"ym-alert-sucess":"ym-alert-fail",d=b.append?b.append:"body",e=$('<div class="ym-alert-fail">'+a.msg+"</div>");""==b.append?e.css("position","fixed"):e.css("position","absolute"),$("."+c).remove(),e.appendTo(d);var f=function(){$("."+c).fadeOut(b.animationTime,b.hideCallback)};$("."+c).fadeIn(b.animationTime,b.showCallback),setTimeout(f,b.showTime)},screenBackTop:function(a){var b=this,c={backId:"#back-top",direction:"right",clickBtn:"a:first",offtop:0,offleft:0,boxWidth:1200,bottomOffSize:380},d=$.extend(c,a),e=$(d.backId),f=e.width(),g=(e.height(),$(document).width()),h=$(document).height(),i=$(window).height(),j=function(){var a=document.all?20:0,b=(g-d.boxWidth-a)/2-f;e.css({right:b})},k=function(){b.avoidCntClick(function(){var a=$(this).scrollTop();a>i?e.find("a:first").removeClass("hidden"):e.find("a:first").addClass("hidden"),a>h-i-d.bottomOffSize?e.animate({bottom:d.bottomOffSize},500):e.animate({bottom:0},500)},100)};j(),$(window).on("scroll",k),e.find("a:first").on("click",function(){$("html,body").animate({scrollTop:0},500)})},scrollBanner:function(a){var b={bannerId:"#scroll-banner",isFullScreen:!0,width:1920,height:660,runtime:1e3,steptime:5e3,numDots:".dots",numOn:"active"},c=$.extend(b,a),d=$(c.bannerId),e=d.find("ul"),f=e.find("li").size(),g=c.isFullScreen?d.find("img").width():c.width;g=g>1920?1920:d.find("img").width();var h,i=(c.isFullScreen?d.find("img").height():c.height,1),j=function(){e.find("li").css({position:"absolute",left:0,top:0,bottom:0,right:0,"z-index":0,opacity:0}),e.find("li:first").css({"z-index":1,opacity:1}),$(c.numDots).find("li:first").addClass(c.numOn),l()},k=function(a){var b=void 0!==a?a:i;b>=f&&(i=b=0);var d=e.find("li:eq("+b+")");d.siblings().stop().animate({opacity:0,"z-index":0},c.runtime),d.stop().animate({opacity:1,"z-index":1},c.runtime),$(c.numDots).find("li:eq("+b+")").addClass(c.numOn).siblings("li").removeClass(c.numOn),i++},l=function(){h=window.setInterval(function(){k()},c.steptime)};d.on("mouseover",function(){window.clearInterval(h)}),d.on("mouseout",function(){l()}),$(c.numDots).find("li").on("mouseover",function(){var a=$(this).index();window.clearInterval(h),k(a)}),$(c.numDots).find("li").on("mouseout",function(){l()}),j()},setTopFixed:function(a,b){var c=$(a);if(0==c.length)return!1;var d={top:0},e=c.offset().top;$.extend(d,b),c.css("position");$(window).on("scroll",function(){var a=c.prev().length>0?c.prev().offset().top:e,b=c.prev().length>0?c.outerHeight():0;return $(this).scrollTop()<=a+b?(c.removeAttr("style"),!1):void c.css({position:"fixed",top:0,bottom:"auto",margin:0,width:c.width(),"z-index":99})})},openWindowFn:function(a){var b={title:"",width:780,height:600,url:"",data:null,content:"",jsondata:{},frameId:"ym-pop-frame",closebtn:".close-pop-btn",showCallback:function(){},hideCallback:function(){}},c=$.extend(b,a),d=$(document).height(),e=$(window).height(),f=function(){var a={width:c.width,height:c.height,"margin-left":-c.width/2,"margin-top":-c.height/2,display:"none","z-index":999,position:c.height>e?"absolute":"fixed"};$("#"+c.fr).remove(),$("#ym-doc-mask").remove(),$('<div id="ym-doc-mask"></div>').css({height:d}).appendTo("body"),$('<div id="'+c.frameId+'"></div>').css(a).appendTo("body"),$("#"+c.frameId).append('<div class="ym-pop-hd"><span class="title">'+c.title+'</span><em class="ym-pop-close close-pop-btn"></em></div>'),$("#"+c.frameId).append('<div class="ym-pop-bd"></div>');var b={cache:!1,type:"get",url:c.url,data:c.data,success:function(a){$.template("template",a),$("#"+c.frameId+" .ym-pop-bd").html($.tmpl("template",c.jsondata))}};c.url&&""!=c.url?$.ajax(b):($.template("template",c.content),$("#"+c.frameId+" .ym-pop-bd").html($.tmpl("template",c.jsondata))),$("#"+c.frameId).fadeIn(300,c.showCallback)},g=function(){$("#"+c.frameId).fadeOut(300,function(){$("#ym-doc-mask").remove(),$(this).remove(),c.hideCallback()})};f(),this.closeWinFn=g,$(document).on("click",c.closebtn,g)},saveFeedBack:function(){var a=this;$("#feedbackform").Validform({tiptype:4,ajaxPost:!0,callback:function(b){return b.success?void a.openWindowFn({width:596,height:378,title:"温馨提示",url:$("#win-feedback").val(),hideCallback:function(){window.location.reload()}}):(a.comAlert({msg:b.resultMsg}),!1)}});$("#feedbackform-submit").on("click",function(){return $("#feedbackform").submit(),!1})},lineInteractive:function(){$("#ym-tour ul li").hover(function(){var a=$(this).find("i.icon-tool");return a.hasClass("air")?(a.addClass("air-on"),!1):a.hasClass("bus")?(a.addClass("bus-on"),!1):a.hasClass("train")?(a.addClass("train-on"),!1):a.hasClass("ship")?(a.addClass("ship-on"),!1):void 0},function(){var a=$(this).find("i.icon-tool");return a.hasClass("air")?(a.removeClass("air-on"),!1):a.hasClass("bus")?(a.removeClass("bus-on"),!1):a.hasClass("train")?(a.removeClass("train-on"),!1):a.hasClass("ship")?(a.removeClass("ship-on"),!1):void 0}),$("#ym-tour ul li > .content").each(function(){var a=$(this).height();a>530?$(this).addClass("hidden"):$(this).closest("li").find("a.more").remove()}),$("#ym-tour ul li > a.more").on("click",function(){$(this).attr("open")?($(this).siblings(".content").addClass("hidden"),$(this).attr("open",!1).text("more")):($(this).siblings(".content").removeClass("hidden"),$(this).attr("open",!0).text("close"))})},loadIndexImages:function(){var a=!0,b=$('<div id="content_0" class="clearfix"></div>');b.css({position:"absolute","z-index":1,opacity:1,left:0,top:0,right:0,bottom:0}),$("#loadarea").css({position:"relative"}).wrapInner(b),$(".tab-lan ul li").on("click",function(){var b=$(this).attr("ajaxurl"),c=$(this).index();return!($(this).find("span").hasClass("on")||!a)&&(a=!1,$(this).find("span").addClass("on"),$(this).siblings().find("span").removeClass("on"),$("#content_"+c).length>0?($("#content_"+c).siblings().animate({"z-index":0,opacity:0},400),$("#content_"+c).stop().animate({"z-index":1,opacity:1},800,function(){a=!0}),!1):($.get(b,{t:(new Date).getTime()},function(b){var d=$('<div id="content_'+c+'"></div>');d.css({position:"absolute","z-index":0,opacity:0,left:0,top:0,right:0,bottom:0}).html(b),$("#loadarea").append(d),$("#content_"+c).siblings().animate({"z-index":0,opacity:0},400),$("#content_"+c).stop().animate({"z-index":1,opacity:1},800,function(){a=!0})}),!1))})},scrollTourContent:function(){$(".details-list ul li").click(function(a){var b=$(this),c=b.index(),d=$("#a"+(c+1)).offset().top,e=$(this).height();return $("html,body").animate({scrollTop:d-e},500,function(){b.addClass("on"),b.siblings().removeClass("on")}),!1}),$(window).on("scroll",function(){var a=$(this);$(".details-list").height();if($("#a1,#a2,#a3").each(function(b){var c=a.scrollTop()-$(this).offset().top;if(c>=0&&c<=$(window).height()/3)return $(".details-list ul li:eq("+b+")").addClass("on").siblings().removeClass("on"),!1}),a.scrollTop()==$(document).height()-$(window).height())return $(".details-list ul li:last").addClass("on").siblings().removeClass("on"),!1})},hoverText:function(){$(document).on("mouseover",".membertab ol li a",function(){var a=$(this),b=a.find("p strong"),c=(a.find("p em"),a.find("p em").height());return c>24&&b.stop().animate({height:c,padding:"10px 0"},300),!1}),$(document).on("mouseout",".membertab ol li a",function(){var a=$(this),b=a.find("p strong");return b.stop().animate({height:24,padding:0},300),!1})},immediately:function(){$("#lk-immediately").on("click",function(){return $("body").append("<div id='mask' class='mask'></div>"),$("#immediately").fadeIn("slow"),!1}),$(".bm-close").on("click",function(){return $("#immediately").fadeOut("fast"),$("#mask").hide().remove(),!1})},buyActivity:function(){var a=this;$("#buyActBtn").on("click",function(){var b=$(this).attr("href");return a.isUserLogin({callback:function(){window.location.href=b}}),!1})},avoidCntClick:function(a,b,c){var d=this,e=c||"flag";return d[e]&&(window.clearTimeout(d[e]),delete d[e]),d[e]=window.setTimeout(function(){a(),delete d[e]},b,e)},setProNumber:function(a,b){var c=this,d=$(a);if(0==d.length)return!1;var e={clickBtn:[".minus",".add"],grayBtn:"on",numInput:".num",initVal:0,callback:function(){}},f=$.extend(e,b),g=function(){$("span[pid]").each(function(){var a=$(this).find(f.numInput),b=parseInt(a.val()),c=a.siblings(f.clickBtn[0]),d=a.siblings(f.clickBtn[1]),e=a.attr("maxnum")?parseInt(a.attr("maxnum")):99;b<=f.initVal?c.addClass(f.grayBtn):c.removeClass(f.grayBtn),b>=e?d.addClass(f.grayBtn):d.removeClass(f.grayBtn)})},h=function(){var a=$(this).parent("span"),b=a.attr("pid"),d=$(this).siblings(f.numInput),e=!!d.attr("data-value")&&JSON.parse(d.attr("data-value")),g=parseInt(d.val());return!$(this).hasClass(f.grayBtn)&&($(this).hasClass(f.clickBtn[0].substr(1))?g--:g++,$("span[pid='"+b+"']").each(function(){var a=$(this).find(f.numInput),b=a.siblings(f.clickBtn[0]),c=a.siblings(f.clickBtn[1]),d=a.attr("maxnum")?parseInt(a.attr("maxnum")):99;g<=f.initVal?(b.addClass(f.grayBtn),c.removeClass(f.grayBtn)):g>=d?(g=d,c.addClass(f.grayBtn),b.removeClass(f.grayBtn)):(c.removeClass(f.grayBtn),b.removeClass(f.grayBtn)),a.val(g)}),f.callback(e,g,a,c),!1)},i=function(){var a=$(this).closest("span"),b=(a.attr("pid"),a.find(f.clickBtn[0])),d=a.find(f.clickBtn[1]),e=a.find(f.numInput),g=$(this).attr("maxnum")?parseInt($(this).attr("maxnum")):99,h=$(this).val(),i=!!$(this).attr("data-value")&&JSON.parse($(this).attr("data-value")),j=h,k=!(!/^[1-9]+[0-9]*]*$/.test(h)&&h!==f.initVal||""===h);return k?parseInt(h)==f.initVal?(setTimeout(function(){e.blur(),f.callback(i,j,a,c)},600),!1):parseInt(h)>g?(e.val(g),b.removeClass(f.grayBtn),d.addClass(f.grayBtn),j=g,setTimeout(function(){e.blur(),f.callback(i,j,a,c)},600),!1):parseInt(h)>f.initVal&&parseInt(h)<g?(b.removeClass(f.grayBtn),d.removeClass(f.grayBtn),setTimeout(function(){e.blur(),f.callback(i,j,a,c)},600),!1):void 0:(e.val(f.initVal),b.addClass(f.grayBtn),g>f.initVal?d.removeClass(f.grayBtn):d.addClass(f.grayBtn),j=f.initVal,setTimeout(function(){e.blur(),f.callback(i,j,a,c)},600),!1)},j=f.clickBtn.join(",");g(),d.on("click",j,h),$(f.numInput).on("input propertychange",i),d.on("click",f.numInput,function(){$(this).select()}),d.on("selectstart",j,function(){return!1})},getValidCode:function(a){var b={runtime:60,disabled:"disabled",clickbtn:"#get-vcode",ajaxurl:"",initText:"获取短信验证码",disabledText:"重新获取",imgcode:"#imgcode",phone:"#regmobile",befCallback:function(){},sendCallback:function(){}},c=$.extend(b,a),d=function(){var a=/^1[0-9]{10}$/,b=$.trim($(c.phone).val()),d=/^[^\s]{4,4}$/,e=$.trim($(c.imgcode).val()),f=$(this),g=f.attr("sendurl"),h=$(c.phone).attr("name"),i=$(c.imgcode).attr("name");if(f.attr("disabled"))return!1;if(""==b){var j=$(c.phone).attr("nullmsg");return $(c.phone).siblings("span.Validform_checktip").text(j).addClass("Validform_wrong"),!1}if(!a.test(b)){var j=$(c.phone).attr("errormsg");return $(c.phone).siblings("span.Validform_checktip").text(j).addClass("Validform_wrong"),!1}if(""==e){var j=$(c.imgcode).attr("nullmsg");return $(c.imgcode).siblings("span.Validform_checktip").text(j).addClass("Validform_wrong"),!1}if(!d.test(e)){var j=$(c.imgcode).attr("errormsg");return $(c.imgcode).siblings("span.Validform_checktip").text(j).addClass("Validform_wrong"),!1}var k={};k[h]=b,k[i]=e,k.t=(new Date).getTime();var l=function(a){var b=c.sendCallback(a,f);if(!b)return $("#imgcode").val(""),$(".imgcode")[0].src=$("#root_path").val()+"/user/getImgCode?d="+Math.random(),!1;var d=f.attr("runtime")?parseInt(f.attr("runtime")):c.runtime,e=window.setInterval(function(){if(d--,f.text(c.disabledText+"("+d+")"),d<=0)return f.removeAttr("disabled").removeClass("disabled").text(c.initText),window.clearInterval(e),!1},1e3);f.attr("disabled","disabled").addClass("disabled")};return $.post(g,k,l),!1};$(c.clickbtn).on("click",d)},setPlaceholder:function(){return!("placeholder"in document.createElement("input"))&&($("[placeholder]").each(function(){var a=$(this).attr("type"),b=$(this).outerWidth(),c=$(this).outerHeight(),d=$(this).position().left,e=$(this).position().top,f=$(this).innerWidth()-$(this).width();$placeholder=$(this).css("color","#a9a9a9").attr("placeholder"),"text"==a&&$(this).val($placeholder),"password"==a&&($(this).parent().css({position:"relative","z-index":1}),$("<div>"+$placeholder+"</div>").css({display:"block",color:"#a9a9a9","font-size":"16px",position:"absolute",cursor:"text","z-index":10,left:d+"px",top:e+"px",width:b-f+"px",height:c+"px","line-height":c+"px",padding:"0 "+f/2+"px"}).on("click",function(){$(this).hide().prev().focus()}).insertAfter($(this)))}),$("[placeholder]").on("focus",function(){var a=$(this).attr("type"),b=$(this).val(),c=$(this).attr("placeholder");b==c&&"text"==a&&$(this).css("color","").val(""),"password"==a&&$(this).next().css("display","none")}),$("[placeholder]").on("blur",function(){var a=$(this).attr("type"),b=$(this).val(),c=$(this).attr("placeholder");""==b&&"text"==a&&$(this).css("color","#999").val(c),""==b&&"password"==a&&$(this).next().css("display","block")}),void $(document).on("submit","form",function(){$(this).find("[placeholder]").each(function(){var a=$(this).val(),b=$(this).attr("placeholder");a==b&&$(this).val("")})}))},setTextAreaNumber:function(){$("textarea[max-length]").on("input propertychange",function(){var a=$.trim($(this).val()),b=$(this).attr("max-length");a.length>parseInt(b)?($(this).val(a.substr(0,b)),$(this).next("p").html("您还可以输入<em>0</em>个字")):$(this).next("p").html("您还可以输入<em>"+(b-a.length)+"</em>个字")})},formatCurrency:function(a){a=a.toString().replace(/\$|\,/g,""),isNaN(a)&&(a="0"),sign=a==(a=Math.abs(a)),a=Math.floor(100*a+.50000000001),cents=a%100,a=Math.floor(a/100).toString(),cents<10&&(cents="0"+cents);for(var b=0;b<Math.floor((a.length-(1+b))/3);b++)a=a.substring(0,a.length-(4*b+3))+","+a.substring(a.length-(4*b+3));return(sign?"":"-")+a+"."+cents}},module.exports=new a});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-25 */