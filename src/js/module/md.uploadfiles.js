/*! PC_JX - v1.0.0 - 2016-12-21 */
define(function(require,exports,module){require("ajaxform"),$public=require("public"),$uploadfiles=function(){this.init.apply(this,arguments)},$uploadfiles.prototype={config:{curfilebox:null,upldclik:".upldclik",adpicfile:".adpicfile",single:".single",mult:".mult",plhd:".plhd",imgbox:".imgbox",del:".del",canclick:".canclick",groupimg:".groupimg",base_str:"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="},init:function(){var a=this,b="";$(a.config.imgbox).find("img").filter(function(){b=$(this).attr("src"),b&&b!=a.config.base_str&&$(this).closest(a.config.imgbox).addClass("imgbox-action").find(a.config.upldclik).css("z-index",3)}),$(a.config.canclick).click(function(){return!1}),$(a.config.del).on("click",function(){return a.delboximg(a,this),!1}),$(a.config.adpicfile).on("change",function(){return a.addboximg(a,this),!1})},uploadPic:function(a,b){var c=$(a).closest("span"),d=this;return $(b).parent().wrap("<form id='uploadform' action='"+(fileuploadURL?fileuploadURL:"http://filegw.test.jiuxiulvxing.com/filegw/file/upload_string")+"' method='post' enctype='multipart/form-data'></form>"),c.find(d.config.plhd).addClass("plhd-action"),$("#uploadform").ajaxSubmit({success:function(a){if($public.isLogin(a),a=JSON.parse(a),$("#uploadform").remove(),$(d.config.plhd).removeClass("plhd-action"),c.append('<a class="upldclik"><input type="file" name="adpicfile" class="adpicfile"></a>'),c.find(".adpicfile").on("change",function(){d.addboximg(d,this)}),d.config.curfilebox&&200==a.status){var b=d.config.curfilebox;b.find("img").attr("src",a.data?img_domain+a.data:"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="),b.find(":hidden").val(a.data),c.addClass("imgbox-action"),d.sucssinfo(c),c.find(d.config.upldclik).css("z-index",3)}else $public.dialog.msg(a.message,"error"),c.find(d.config.upldclik).css("z-index",9)},error:function(a){$public.dialog.msg("请求发生错误！","error"),$("#uploadform").remove(),$(d.config.plhd).removeClass("plhd-action"),c.append('<a class="upldclik"><input type="file" name="adpicfile" class="adpicfile"></a>'),c.find(".adpicfile").on("change",function(){d.addboximg(d,this)}),c.find(d.config.upldclik).css("z-index",9)}}),this.config.curfilebox=c,!1},addboximg:function(a,b){var c=$(b).closest(a.config.imgbox),d=$public.isPicture(b,500);return c.parent().find(".Validform_checktip").remove(),!d.status&&d.content?a.errorinfo(c,d.content):(c.find("input").show(),a.uploadPic(c.find("img").get(0),b)),!1},delboximg:function(a,b){var c=$(b).closest(a.config.imgbox);return c.find(a.config.upldclik).css("z-index",9),c.removeClass("imgbox-action"),c.find("img").attr("src",a.config.base_str),c.find(":hidden").val(""),c.find(a.config.upldclik).show(),a.errorinfo(c,"请选择图片！"),!1},errorinfo:function(a,b){var c=this,d=a.attr("class").indexOf("cnat")!=-1,e="";d?(e=a.closest(c.config.groupimg).attr("class").indexOf("allownull")!=-1,a=a.closest(c.config.groupimg),$files=a.find(":hidden"),a.find(".Validform_checktip").remove(),(!e||e&&"请选择图片！"!=b)&&a.append('<span class="Validform_checktip Validform_wrong">'+b+"</span>")):(e=a.attr("class").indexOf("allownull")!=-1,a.parent().find(".Validform_checktip").remove(),(!e||e&&"请选择图片！"!=b)&&a.after('<span class="Validform_checktip Validform_wrong">'+b+"</span>"))},sucssinfo:function(a){var b=this,c=a.attr("class").indexOf("cnat")!=-1;c?(a=a.closest(b.config.groupimg),a.find(".Validform_checktip").remove(),a.append('<span class="Validform_checktip Validform_right"></span>')):(a.parent().find(".Validform_checktip").remove(),a.after('<span class="Validform_checktip Validform_right"></span>'))}},module.exports=new $uploadfiles});
/*! PC_JX xiongzhaoling 最后修改于： 2016-12-21 */