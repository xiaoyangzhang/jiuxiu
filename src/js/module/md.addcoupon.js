/*! PC_JX - v1.0.0 - 2016-11-25 */
define(function(require,exports,module){$addcoupon=function(){this.init.apply(this,arguments)},$addcoupon.prototype={init:function(){},timeFun:function(a,b,c){var d=a.val(),e=b.val(),f=(new Date).getTime();if(d){var g=d+" 00:00:00",h=new Date(g).getTime(),i=parseInt(f-h)/1e3/60/60/24;i>1&&!c&&(alert("投放/使用时间必须选择今天或者以后的时间"),a.val(""))}if(e){var j=e+" 00:00:00",k=new Date(j).getTime(),l=parseInt(f-k)/1e3/60/60/24;if(l>1)return alert("投放/使用时间必须选择今天或者以后的时间"),void b.val("")}if(d&&e){var m=parseInt(k-h)/1e3/60/60/24,n=parseInt(k-h)/1e3/60/60/24+1;parseInt(k)>parseInt(h)&&m<0?(alert("优惠券投放/使用开始时间必须早于结束时间"),a.val("")):parseInt(k)<parseInt(h)&&(alert("优惠券投放/使用开始时间必须早于结束时间"),b.val("")),parseInt(k)>parseInt(h)&&n>60&&(alert("优惠券投放/使用时间不能超过60天"),b.val(""))}},comperFun:function(a,b){var c=a.val(),d=b.val(),e=c+" 00:00:00",f=d+" 00:00:00",g=new Date(e).getTime(),h=new Date(f).getTime(),i=parseInt(h-g)/1e3/60/60/24;Math.abs(parseInt(h-g)/1e3/60/60/24);""!=c&&""!=d&&parseInt(h)<parseInt(g)&&i<0&&(alert("使用时间不能早于投放时间"),a.val(""))}},module.exports=new $addcoupon});
/*! PC_JX xiongzhaoling 最后修改于： 2016-11-25 */