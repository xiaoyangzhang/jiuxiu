/*! PC_JX - v1.0.0 - 2016-12-06 */
define(function(require,exports,module){function a(a){var b=(new Date).getFullYear(),c=site_path+"/basicInfo/contractRenewDate";return'<div class="dialog" style="display: block;"><div class="dialog-agreement"><div class="clearfix"><h2>'+(b+1)+"年九休旅行续签申请须知</h2><i></i></div><p>尊敬的商家您好：</p><p>若您与我平台的协议到期日为<label>"+a+"</label>，请于合同到期日前在线申请"+(b+1)+'年协议续签，逾期未续签的商户将视为自动放弃续签。同时未续签的商户您的店铺届时将不能正常运营。请您及时续签，以免造成不必要的损失</p><p>续签流程如下：</p><p class="bold">申请续签——下载协议&nbsp; ——彩色打印两份，盖章并签字——邮寄回九休——续签成功</p><p>若有疑问请拨打续签咨询电话：18314575075</p><a class="actionagrmt" href="'+c+'">申请续签</a></div><div class="bgmeng"></div></div>'}var b=require("public"),c={show:function(){var a=$("#renewDayContract").val(),b=$("#renewContract").val(),d=$("#renewDate").val();"2"===b&&"2"===a&&c.init(d)},init:function(c){var d=a(c),e=$(d).show().appendTo("body");e.find(".dialog-agreement i").on("click",function(a){e.hide(),b.stopBubble(a)})}};c.show()});
/*! PC_JX xiongzhaoling 最后修改于： 2016-12-06 */