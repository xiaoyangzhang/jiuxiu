/*! PC_JX - v1.0.0 - 2016-12-21 */
define(function(require,exports,module){jQuery.extend({handleError:function(a,b,c,d){a.error&&a.error.call(a.context||a,b,c,d),a.global&&(a.context?jQuery(a.context):jQuery.event).trigger("ajaxError",[b,a,d])},createUploadIframe:function(a,b){var c="jUploadFrame"+a;if(window.ActiveXObject){var d=document.createElement('<iframe id="'+c+'" name="'+c+'" />');"boolean"==typeof b?d.src="javascript:false":"string"==typeof b&&(d.src=b)}else{var d=document.createElement("iframe");d.id=c,d.name=c}return d.style.position="absolute",d.style.top="-1000px",d.style.left="-1000px",document.body.appendChild(d),d},createUploadForm:function(a,b){var c="jUploadForm"+a,d="jUploadFile"+a,e=$('<form  action="" method="POST" name="'+c+'" id="'+c+'" enctype="multipart/form-data"></form>'),f=$("#"+b),g=$(f).clone();return $(f).attr("id",d),$(f).before(g),$(f).appendTo(e),$(e).css("position","absolute"),$(e).css("top","-1200px"),$(e).css("left","-1200px"),$(e).appendTo("body"),e},ajaxFileUpload:function(a){a=jQuery.extend({},jQuery.ajaxSettings,a);var b=a.fileElementId,c=jQuery.createUploadForm(b,a.fileElementId),d=(jQuery.createUploadIframe(b,a.secureuri),"jUploadFrame"+b),e="jUploadForm"+b;a.global&&!jQuery.active++&&jQuery.event.trigger("ajaxStart");var f=!1,g={};a.global&&jQuery.event.trigger("ajaxSend",[g,a]);var h=function(b){var e=document.getElementById(d);try{e.contentWindow?(g.responseText=e.contentWindow.document.body?e.contentWindow.document.body.innerHTML:null,g.responseXML=e.contentWindow.document.XMLDocument?e.contentWindow.document.XMLDocument:e.contentWindow.document):e.contentDocument&&(g.responseText=e.contentDocument.document.body?e.contentDocument.document.body.innerHTML:null,g.responseXML=e.contentDocument.document.XMLDocument?e.contentDocument.document.XMLDocument:e.contentDocument.document)}catch(b){jQuery.handleError(a,g,null,b)}if(g||"timeout"==b){f=!0;var h;try{if(h="timeout"!=b?"success":"error","error"!=h){var i=jQuery.uploadHttpData(g,a.dataType);a.success&&a.success(i,h),a.global&&jQuery.event.trigger("ajaxSuccess",[g,a])}else jQuery.handleError(a,g,h)}catch(b){h="error",jQuery.handleError(a,g,h,b)}a.global&&jQuery.event.trigger("ajaxComplete",[g,a]),a.global&&!--jQuery.active&&jQuery.event.trigger("ajaxStop"),a.complete&&a.complete(g,h),jQuery(e).unbind(),setTimeout(function(){try{$(e).remove(),$(c).remove()}catch(b){jQuery.handleError(a,g,null,b)}},100),g=null}};a.timeout>0&&setTimeout(function(){f||h("timeout")},a.timeout);try{var c=$("#"+e);$(c).attr("action",a.url),$(c).attr("method","POST"),$(c).attr("target",d),c.encoding?c.encoding="multipart/form-data":c.enctype="multipart/form-data",$(c).submit()}catch(b){jQuery.handleError(a,g,null,b)}return window.attachEvent?document.getElementById(d).attachEvent("onload",h):document.getElementById(d).addEventListener("load",h,!1),{abort:function(){}}},uploadHttpData:function(a,b){var c=!b;return c="xml"==b||c?a.responseXML:a.responseText,"script"==b&&jQuery.globalEval(c),"json"==b&&(c=c.replace(/<[^>]+>/g,"")),"html"==b&&jQuery("<div>").html(c).evalScripts(),c}})});
/*! PC_JX xiongzhaoling 最后修改于： 2016-12-21 */