/*! PC_JX - v1.0.0 - 2016-11-24 */
!function(a){function b(a,b){for(var c=0;c<=a.length-1;c++)if(a[c]==b)return!0;return!1}function c(b){a('a[data-toggle="tab"][href="'+b+'"]').tab("show")}function d(b){var c=a('a[data-toggle="tab"][href="'+b+'"]');c.on("show.zui.tab",function(){return!1}).removeAttr("data-toggle")}function e(e){c(e.editTabList[0]);var f=a('[data-toggle="tab"]');a.each(f,function(c,f){var g=a(f).attr("href");b(e.editTabList,g)||d(g)})}function f(b){a.each(b.disableFieldList,function(b,c){var d=c.el,e=c.type;switch(e){case"img":a('[name="'+d+'"]').closest(".imgbox").find(".del,.upl").hide();break;case"container":a(d).find("input,select,teatarea").prop("disabled",!0);default:a('[name="'+d+'"]').prop("disabled",!0)}})}function g(a){var b=i[a];if(b)switch(b.type){case"tab":e(b);break;case"form":f(b)}}var h=2,i={line:{type:"tab",editTabList:["#tab2"]},cityActivity:{type:"tab",editTabList:["#tab2"]},integralMall:{type:"form",disableFieldList:[{el:"title"},{el:"code"},{el:"priceY"},{el:"maxPoint"},{el:"stockNum"},{el:"imgvalue",type:"img"},{el:".nonKeyProperty",type:"container"}]},common:{type:"form",disableFieldList:[{el:"title"},{el:"code"},{el:"priceY"},{el:"stockNum"},{el:"imgvalue",type:"img"},{el:".property",type:"container"}]}};a(function(){var b=a("#itemStatus").val(),c=a("#itemType").val();b==h&&g(c)})}(jQuery);
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-24 */