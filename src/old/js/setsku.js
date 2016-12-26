/*! PC_JX - v1.0.0 - 2016-12-26 */
var validate=function(){var a;return skuTableShowFlag?($(".price").each(function(){$(this).val()&&/^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/.test($(this).val())||(a="请检查sku价格格式")}),$(".stock").each(function(){$(this).val()&&/^(0|[1-9]\d+)$/.test($(this).val())||(a="请检查sku库存格式")}),a?a:void 0):"您需要选择完整的属性，才能组合成完整的规格信息。"},checkboxTrAll=[],temp=[],getTrItem=function(a,b,c){b=b?b:0,c=c?c:0;for(var d=0;d<a[b].length;d++){if(c){for(var e=!1,f=0;f<temp.length;f++)temp[f]==c&&(e=!0);e||temp.push(c)}b<a.length-1?getTrItem(a,b+1,a[b][d]):(checkboxTrAll.push(temp.concat(a[b][d])),a[b].length-1==d&&(temp.length=0))}},setPropertyAll=function(){var a=!1,b=1;if($(".sellProperty").each(function(){a=!0,b*=$(this).find(".skuCheckbox").length,$(this).find(".skuCheckbox").length<1&&(a=!1)}),a){var c=[];$(".sellProperty").each(function(){var a=[];$(this).find(".skuCheckbox").each(function(){var b={pId:$(this).closest(".sellProperty").attr("sellPropertyId"),pTxt:$(this).closest(".sellProperty").attr("sellPropertyText"),pType:$(this).closest(".sellProperty").attr("sellPropertyType"),vId:$(this).attr("sellValueId"),vTxt:$(this).attr("sellValueText"),vType:$(this).attr("sellValueType")};a.push(b)}),c.push(a)}),checkboxTrAll.length=0,getTrItem(c);for(var d=[],e=$(".sellProperty").length,f=0;f<checkboxTrAll.length;f++){for(var g="",h=0;h<e;h++)g=g+"_"+checkboxTrAll[f][h].vId;d.push(g)}for(var i=[],f=0;f<b;f++){var j={categoryId:0,checked:!1,id:0,itemId:0,itemPrice:0,idGroup:d[f],itemSkuPVPairList:checkboxTrAll[f],modifyStatus:!1,outSkuId:0,price:0,priceY:0,property:JSON.stringify(checkboxTrAll[f]),sellerId:0,spuId:0,status:0,stockNum:0,version:0};i.push(j)}for(var f=0;f<skuPropertyAll.length;f++)for(var h=0;h<i.length;h++)if(skuPropertyAll[f].idGroup==i[h].idGroup){i[h]=skuPropertyAll[f];break}skuPropertyAll=i}},createSkuProperty=function(){skuProperty=new Array,$(".sellProperty").each(function(a){var b={pId:$(this).attr("sellPropertyId"),pTxt:$(this).attr("sellPropertyText"),pType:$(this).attr("sellPropertyType"),pValue:new Array};$(this).find(".skuCheckbox:checked").each(function(){b.pValue.push({vId:$(this).attr("sellValueId"),vTxt:$(this).attr("sellValueText")})}),skuProperty.push(b)})},setTableShowFlag=function(){skuTableShowFlag=!0,$(".sellProperty").each(function(){$(this).find(".skuCheckbox:checked").length<1&&(skuTableShowFlag=!1)})},createTable=function(){skuPropertyShowAll=skuPropertyAll.filter(function(a){if(a.checked)return a});var a=new Array;$(".sellProperty").each(function(){a.push($(this).find(".skuCheckbox:checked").length)});for(var b=a.length,c=0;c<b;c++)c===b-1?a[c]=1:c===b-2?a[c]=a[c+1]:c===b-3?a[c]=a[c+1]*a[c+2]:a[c]=a[c+1]*a[c+2]*a[c+3];for(var d='<table class="table table-bordered tab-sku"><caption><span class="spColor">*</span>活动属性匹配表</caption><thead>',e="<tr>",c=0;c<skuProperty.length;c++)e+="<th><span>"+skuProperty[c].pTxt+"</span></th>";e+="<th><span>价格</span></th>",e+="<th><span>库存</span></th>",e+="</thead>",e+="</tr>";for(var f="",c=0;c<skuPropertyShowAll.length;c++){f+='<tr class="skuTbEdit" skuTrId="'+skuPropertyShowAll[c].id+'">';for(var g=0;g<skuPropertyShowAll[c].itemSkuPVPairList.length;g++)c%a[g]===0&&(f+='<td rowspan="'+a[g]+'"><span>'+skuPropertyShowAll[c].itemSkuPVPairList[g].vTxt+"</span></td>");f+='<td><input class="price" type="text" value="'+skuPropertyShowAll[c].priceY+'"></td>',f+='<td><input class="stock" type="text" value="'+skuPropertyShowAll[c].stockNum+'"></td>',f+="</tr>"}var h="</table>";return d+e+f+h};$(function(){setTableShowFlag(),skuTableShowFlag?(createSkuProperty(),$(".skuTable").html(createTable())):$(".skuTable").html("您需要选择完整的属性，才能组合成完整的规格信息。"),$(document).delegate(".btn-add","click",function(){var a=$.trim($(this).siblings(".addItemText").val().replace(/[ ]/g,"")),b=$(this).closest("tr").next("tr").find(".checkbox-con");if(a){var c=!1;if(b.find(".skuCheckbox").each(function(){$(this).attr("sellValueText")==a&&(c=!0)}),c)layer.msg("不可重复添加！",{icon:2});else{var d=0;if(b.find(".skuCheckbox").length<1)d=0;else{var e=[];b.find(".skuCheckbox").each(function(){d=parseInt($(this).attr("sellValueId")),e.push(d)}),Array.min=function(a){return Math.min.apply(Math,a)},d=Array.min(e)}d-=1,b.append('<span><input type="checkbox" class="skuCheckbox" sellValueId='+d+" sellValueText= "+a+' sellValueType="1">'+a+"</span>"),setPropertyAll()}}else layer.msg("请检查输入信息！",{icon:2})}),$(document).delegate(".stock","change",function(){for(var a=$(this).parents(".skuTbEdit").index(),b=0,c=0;c<skuPropertyAll.length;c++)skuPropertyAll[c].checked&&(b+=1,b==a+1&&(skuPropertyAll[c].stockNum=$(this).val(),skuPropertyAll[c].modifyStatus=!0))}),$(document).delegate(".price","change",function(){for(var a=$(this).parents(".skuTbEdit").index(),b=0,c=0;c<skuPropertyAll.length;c++)skuPropertyAll[c].checked&&(b+=1,b==a+1&&(skuPropertyAll[c].priceY=$(this).val(),skuPropertyAll[c].modifyStatus=!0))}),$(document).delegate(".skuCheckbox","click",function(){createSkuProperty();for(var a=($(this).prop("checked"),0);a<skuPropertyAll.length;a++){for(var b=!0,c=skuPropertyAll[a].itemSkuPVPairList,d=0;d<c.length;d++){for(var e=!1,f=0;f<skuProperty[d].pValue.length;f++)if(c[d].vId==skuProperty[d].pValue[f].vId&&c[d].vTxt==skuProperty[d].pValue[f].vTxt){e=!0;break}e||(b=!1)}skuPropertyAll[a].checked=b}setTableShowFlag(),skuTableShowFlag?$(".skuTable").html(createTable()):$(".skuTable").html("您需要选择完整的属性，才能组合成完整的规格信息。")})});
/*! PC_JX xiongzhaoling 最后修改于： 2016-12-26 */