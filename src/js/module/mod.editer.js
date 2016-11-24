/*! PC_JX - v1.0.0 - 2016-11-24 */
define(function(require,exports,module){require("json"),require("ajaxform"),$public=require("public");var editer=function(){this.init.apply(this,arguments)};editer.prototype={init:function(a,b){var c=this;c.id=a||"#editer",c.config=$.extend(c.config,b),c.bindDomEvent(),c.setContentData()},config:{addTextBtn:".addtext",addPicBtn:".addpic",moveUpBtn:".moveup",moveDownBtn:".movedown",hdClass:".hd",saveTextBtn:".savetxt",saveImgBtn:".saveimg",closeTextBtn:".closetxt",closeImgBtn:".closeimg",delTextBtn:".deltext",textClass:".text",picClass:".pic",picTemp:".tbd",inputClass:".txtinput",uploadClass:".uploadimg",uploadId:"uploadimg",addImageBtn:".imgwrap",contentText:"#contentText",submitBtn:".submitbtn",maxNum:500,picHeight:750},tuwencheck:function(){if(!$("#contentText").val())return $("#editer").css("border","1px solid red"),!1;var a;return $(".bd p.text").each(function(b,c){if($(this).find("font").text().length>0)return a=!0,!1}),$(".bd p.pic").length>0&&(a=!0),a?$("#editer").css("border","1px solid #ddd"):$("#editer").css("border","1px solid red"),a},picNumCheck:function(){var a=$(".bd p.pic");return!(a.length>10)},distanceFun:function(){$(".eredar-left").height($(".eredar-right").height())},bindDomEvent:function(){var a=this;$(a.id).on("click",a.config.addTextBtn,function(){return a.addTextEvent(a,$(this)),a.distanceFun(),!1}),$(a.id).on("click",a.config.addPicBtn,function(){return $(".bd p.pic").length>=10?void $public.dialog.msg("最多上传10张图片！","error"):(a.addImageEvent(a,$(this)),a.distanceFun(),!1)}),$(a.id).on("click",a.config.moveUpBtn,function(){return a.moveUpEvent(a,$(this)),!1}),$(a.id).on("click",a.config.delTextBtn,function(){return a.delTextEvent(a,$(this)),a.tuwencheck(),!1}),$(a.id).on("click",a.config.moveDownBtn,function(){return a.moveDownEvent(a,$(this)),!1}),$(a.id).on("click",a.config.saveTextBtn,function(){return a.tuwencheck(),a.saveTextEvent(a,$(this)),a.distanceFun(),!1}),$(a.id).on("dblclick",a.config.textClass,function(){return a.dbClickTextEvent(a,$(this)),!1}),$(a.id).on("click",a.config.textClass,function(){return a.setTextSelect(a,$(this)),!1}),$(a.id).on("mouseenter",a.config.textClass,function(){return a.addOperationMenu(a,$(this)),!1}),$(a.id).on("mouseleave",a.config.textClass,function(){return a.delOperationMenu(a,$(this)),!1}),$(a.id).on("mouseenter",a.config.picClass,function(){return a.addOperationMenu(a,$(this)),!1}),$(a.id).on("mouseleave",a.config.picClass,function(){return a.delOperationMenu(a,$(this)),!1}),$(a.id).on("click",a.config.closeTextBtn,function(){return a.closeCurrTextEvent(a,$(this)),a.distanceFun(),!1}),$(a.id).on("click",a.config.closeImgBtn,function(){return a.closeCurrImgEvent(a,$(this)),a.distanceFun(),!1}),$(a.id).on("input propertychange","textarea",function(){return a.limitTextInputEvent(a,$(this)),!1}),$(a.id).on("change",a.config.uploadClass,function(){return a.uploadImgEvent(a,$(this)),!1}),$(a.id).on("click",a.config.saveImgBtn,function(){return $(this).closest(".imgwrap").find("img").hasClass("defaultImg")?void $public.dialog.msg("请先选择图片","error"):(a.tuwencheck(),a.saveImgEvent(a,$(this)),a.distanceFun(),!1)}),$(a.id).on("click",a.config.picClass,function(){return a.setTextSelect(a,$(this)),!1}),$(a.id).on("click",a.config.submitBtn,function(){})},addTextEvent:function(a){if(a.isEditState())return!1;var b=a.getTextAreaHtml();$(a.id).find(".bd").append(b),$(a.id).find(".bd").find("textarea").focus(),a.scrollBottom(".txtinput"),a.defaultText=""},addImageEvent:function(a,b){if(a.isUploadState())return!1;var c=a.getImgUploadHtml();$(a.id).find(".bd").append(c),a.scrollBottom(".imgwrap")},uploadImgEvent:function(_self,_this){var isPicture=$public.isPicture(_this[0],3);return!isPicture.status&&isPicture.content?($public.dialog.msg(isPicture.content,"error"),!1):(0==$("#uploadform").length&&$("#editer").wrap("<form id='uploadform' action='"+(fileCompressURL?fileCompressURL+"file/upload_compress_string":"http://filegw.test.jiuxiulvxing.com/filegw/file/upload_compress_string")+"' method='post' enctype='multipart/form-data'></form>"),void $("#uploadform").ajaxSubmit({success:function(jsondata){jsondata=eval("("+jsondata+")");var _this=$(_self.config.uploadClass),_parent=_this.closest("span");200==!jsondata.status?$public.dialog.msg("上传失败，请稍后重试","error"):_parent.prev().find("img").attr("src",img_domain+jsondata.data).removeClass("defaultImg"),_self.scrollBottom(".imgwrap")},error:function(a){$public.dialog.msg("请求发生错误！","error")}}).off())},addOperationMenu:function(a,b){if(b.find("ul.menu").length>0)return!1;var c=[];c.push('<ul class="menu clearfix">'),c.push('<li class="moveup"><em class="icon-up"></em>上移</li>'),c.push('<li class="movedown"><em class="icon-down"></em>下移</li>'),c.push('<li class="deltext"><em class="icon-del"></em>删除</li>'),c.push("</ul>"),b.append(c.join("\n"))},delOperationMenu:function(a,b){b.find("ul.menu").remove()},isEditState:function(){var a=this;return $(a.id).find(a.config.inputClass).length>0},isUploadState:function(){var a=this;return $(a.id).find(a.config.uploadClass).length>0},getTextAreaHtml:function(a){var b=this,c=[],d=a||"",e=d?d.length:0;return e>b.config.maxNum&&(d=d.substr(0,b.config.maxNum),e=b.config.maxNum),c.push('<p class="'+b.config.inputClass.replace(".","")+'">'),c.push('<span class="tbd"><textarea>'+d+"</textarea></span>"),c.push('<span class="tft clearfix"><em>'+e+" / "+b.config.maxNum+'</em><a href="javascript:void(0)" class="closetxt">取消</a><a href="javascript:void(0)" class="savetxt">保存</a></span>'),c.push("</p>"),c.join("\n")},getImgUploadHtml:function(){var a=[];return a.push('<p class="imgwrap">'),a.push('<span class="tbd"><img src="'+(static_source?static_source+"img/no-img.jpg":"http://s0.test.jiuxiulvxing.com/busines/img/no-img.jpg")+'" width="72" height="72" class="nopic defaultImg"/></span>'),a.push('<span class="tft clearfix">'),a.push('<label class="selectimg">请选择图片：<input type="file" id="uploadimg" name="uploadimg" class="uploadimg"/><em clsss="errormsg"></em></label>'),a.push('<label class="groupbtn clearfix">'),a.push('<a class="closeimg" href="javascript:void(0)">取消</a>'),a.push('<a class="saveimg" href="javascript:void(0)">添加</a>'),a.push("</label>"),a.push("</span>"),a.push("</p>"),a.join("\n")},delTextEvent:function(a,b){var c=b.closest("p");c.remove(),a.setContentData()},saveImgEvent:function(a,b){var c=b.closest("p"),d=c.find(a.config.picTemp).html();c.replaceWith('<p class="pic">'+d+"</p>"),a.setContentData()},saveTextEvent:function(a,b){var c=b.closest("p"),d=c.find("textarea").val();c.replaceWith('<p class="text"><font style="line-height:12px;">'+$public.html_encode(d.Trim())+"</font></p>"),a.setContentData()},moveUpEvent:function(a,b){var c=b.closest("p"),d=c.index();if(0==c.length||0==d)return!1;var e=c.prev();c.insertBefore(e),a.setContentData()},moveDownEvent:function(a,b){var c=b.closest("p"),d=$(a.id).find("p").length,e=c.index();if(0==c.length||e==d)return!1;var f=c.next();c.insertAfter(f),a.setContentData()},dbClickTextEvent:function(a,b){var c=b.find("font").text(),d=a.getTextAreaHtml($.trim(c));a.closeSiblingsTextEvent(a,b),b.replaceWith(d),a.defaultText=c},setTextSelect:function(a,b){b.addClass("on").siblings().removeClass("on")},closeCurrTextEvent:function(a,b){var c=b.closest("p"),d=a.defaultText?'<p class="text"><font>'+a.defaultText+"</font></p>":"";c.replaceWith(d)},closeCurrImgEvent:function(a,b){var c=b.closest("p");c.remove()},closeSiblingsTextEvent:function(a,b){var c=b.siblings(a.config.inputClass),d=a.defaultText?'<p class="text"><font>'+a.defaultText+"</font></p>":"";c.replaceWith(d)},limitTextInputEvent:function(a,b){var c=b.closest(a.config.inputClass),d=b.val(),e=d.length;e>a.config.maxNum&&(e=a.config.maxNum,b.val(d.substr(0,a.config.maxNum))),c.find("span em").text(e+" / "+a.config.maxNum)},scrollBottom:function(a){var b=$(document).height(),c=$(a).height();$(document).scrollTop(b-c)},setContentData:function(){var a=this,b=[],c=a.config.textClass.substr(1),d=a.config.picClass.substr(1);if($(a.config.textClass+","+a.config.picClass).each(function(){var a={};if($(this).hasClass(c)&&(a.type=1,a.value=$public.html_decode($(this).find("font").html())),$(this).hasClass(d)){a.type=2;var e=$(this).find("img").attr("src").lastIndexOf("/");a.value=$(this).find("img").attr("src").substring(e)}b.push(a)}),0==b.length)$(a.config.contentText).val("");else{var e=JSON.stringify(b);$(a.config.contentText).val(e)}}},module.exports=new editer("#editer")});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-24 */