/*! PC_JX - v1.0.0 - 2016-12-06 */
var validatePro=function(){var a;if($("#longitude,#latitude").length>0){var b=/^[-]?(\d|([1-9]\d)|(1[0-7]\d)|(180))(\.\d*)?$/;if($.trim($("#longitude").val()).length<1)return"请输入经度";if(!b.test($("#longitude").val()))return"请检查经度格式";if($.trim($("#latitude").val()).length<1)return"请输入纬度";if(!b.test($("#latitude").val()))return"请检查纬度格式"}if($(".skuTable").length>0){if($(".skuTable").find("table").length<1)return"价格套餐不能为空";var c=!1;$(".skuTable").find("tr.skuTbEdit").each(function(){var a=$.trim($(this).find(".stock").val()),b=$.trim($(this).find(".price").val());0!=a&&0!=b&&(c=!0)}),c||(a="价格套餐至少有一项价格和库存不为0"),$(".skuTable").find(".stock").each(function(){return $.trim($(this).val()).length<1?(a="请填写库存",$(this).focus(),!1):/^(0|[1-9]\d{0,5})$/.test($(this).val())?void 0:(a="库存为正整数，最大六位整数",$(this).focus(),!1)}),$(".skuTable").find(".price").each(function(){return $.trim($(this).val()).length<1?(a="请填写价格",$(this).focus(),!1):/^\d{1,6}(\.\d{1,2})?$|^[1-9]\d{0,5}$/.test($(this).val())?void 0:(a="价格为数字，最大六位整数，可带两位小数",$(this).focus(),!1)})}if(a)return a;if("价格信息"==$(".eredar-info .on").text()&&$(".days.int-only").length>0){if($.trim($(".days.int-only").val()).length<1)return"请填写行程天数";if($(".days.int-only").val()<1||$(".days.int-only").val()>100)return"行程天数为1-100的整数"}return $(".priceInfo").find(".tc-stock").each(function(){return $.trim($(this).val()).length<1?(a="请填写库存",$(this).focus(),!1):/^([1-9]\d{0,5}|\d{0,6})$/.test($(this).val())?void 0:(a="库存为数字，最大六位整数",$(this).focus(),!1)}),$(".priceInfo").find(".tc-price").each(function(){return $.trim($(this).val()).length<1?(a="请填写价格",$(this).focus(),!1):/^\d{1,6}(\.\d{1,2})?$|^[1-9]\d{0,5}$/.test($(this).val())?void 0:(a="价格为数字，最大六位整数，可带两位小数",$(this).focus(),!1)}),a?a:$(".day-limit").length>0&&(!/^[1-9]\d{0,4}$/.test(Number($(".day-limit").val()))||$(".day-limit").val()>1e4)?($(".day-limit").focus(),"提前报名天数为1-10000的整数"):void 0},wordCount=function(){$(".textarea-count").each(function(){var a=$.trim($(this).val()).length;parseInt($(this).siblings(".word-num").find(".num-b").text());$(this).siblings(".word-num").find(".num-a").text(a)})};$(function(){wordCount(),$(document).on("keyup paste blur",".textarea-count",function(a){var a=a||window.event||arguments.callee.caller.arguments[0],b=parseInt($(this).siblings(".word-num").find(".num-b").text()),c=$.trim($(this).val());return $.trim($(this).val()).length>b&&8!=a.keyCode?($(this).val(c.substring(0,b)),wordCount(),!1):void wordCount()}),$(document).on("click",".ic-example",function(){var a=$(this).closest("td").length?$(this).closest("td"):$(this).closest("dd"),b=a.find(".text-example").html();layer.open({type:1,title:"文本样例",area:["600px","300px"],shadeClose:!0,content:'<div style="padding:20px">'+b+"</div>"})})});
/*! PC_JX xiongzhaoling 最后修改于： 2016-12-06 */