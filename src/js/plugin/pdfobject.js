/*! PC_JX - v1.0.0 - 2016-12-21 */
!function(a,b){"function"==typeof define&&define.amd?define([],b):"object"==typeof module&&module.exports?module.exports=b():a.PDFObject=b()}(this,function(){"use strict";if("undefined"==typeof window||"undefined"==typeof navigator)return!1;var a,b,c,d,e,f,g,h,i,j,k,l="2.0.201604172",m="undefined"!=typeof navigator.mimeTypes["application/pdf"],n=function(){return/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase())}();return b=function(a){var b;try{b=new ActiveXObject(a)}catch(a){b=null}return b},c=function(){return!!(window.ActiveXObject||"ActiveXObject"in window)},d=function(){return!(!b("AcroPDF.PDF")&&!b("PDF.PdfCtrl"))},a=m||c()&&d(),e=function(a){var b,c="";if(a){for(b in a)a.hasOwnProperty(b)&&(c+=encodeURIComponent(b)+"="+encodeURIComponent(a[b])+"&");c&&(c="#"+c,c=c.slice(0,c.length-1))}return c},f=function(a){"undefined"!=typeof console&&console.log&&console.log("[PDFObject] "+a)},g=function(a){return f(a),!1},i=function(a){var b=document.body;return"string"==typeof a?b=document.querySelector(a):"undefined"!=typeof jQuery&&a instanceof jQuery&&a.length?b=a.get(0):"undefined"!=typeof a.nodeType&&1===a.nodeType&&(b=a),b},j=function(a,b,c,d,e){var f=d+"?file="+encodeURIComponent(b)+c,g=n?"-webkit-overflow-scrolling: touch; overflow-y: scroll; ":"overflow: hidden; ",h="<div style='"+g+"position: absolute; top: 0; right: 0; bottom: 0; left: 0;'><iframe  "+e+" src='"+f+"' style='border: none; width: 100%; height: 100%;' frameborder='0'></iframe></div>";return a.className+=" pdfobject-container",a.style.position="relative",a.style.overflow="auto",a.innerHTML=h,a.getElementsByTagName("iframe")[0]},k=function(a,b,c,d,e,f,g){var h="";return h=b&&b!==document.body?"width: "+e+"; height: "+f+";":"position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%;",a.className+=" pdfobject-container",a.innerHTML="<embed "+g+" class='pdfobject' src='"+c+d+"' type='application/pdf' style='overflow: auto; "+h+"'/>",a.getElementsByTagName("embed")[0]},h=function(b,c,d){if("string"!=typeof b)return g("URL is not valid");c="undefined"!=typeof c&&c,d="undefined"!=typeof d?d:{};var f=d.id&&"string"==typeof d.id?"id='"+d.id+"'":"",h=!!d.page&&d.page,l=d.pdfOpenParams?d.pdfOpenParams:{},m="undefined"==typeof d.fallbackLink||d.fallbackLink,n=d.width?d.width:"100%",o=d.height?d.height:"100%",p="boolean"==typeof d.forcePDFJS&&d.forcePDFJS,q=!!d.PDFJS_URL&&d.PDFJS_URL,r=i(c),s="",t="",u="<p>This browser does not support inline PDFs. Please download the PDF to view it: <a href='[url]'>Download PDF</a></p>";return r?(h&&(l.page=h),t=e(l),p&&q?j(r,b,t,q,f):a?k(r,c,b,t,n,o,f):q?j(r,b,t,q,f):(m&&(s="string"==typeof m?m:u,r.innerHTML=s.replace(/\[url\]/g,b)),g("This browser does not support embedded PDFs"))):g("Target element cannot be determined")},{embed:function(a,b,c){return h(a,b,c)},pdfobjectversion:function(){return l}(),supportsPDFs:function(){return a}()}});
/*! PC_JX xiongzhaoling 最后修改于： 2016-12-21 */