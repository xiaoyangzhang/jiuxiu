define(function (require, exports, module) {
	require("core"),
	require("widget"),
	require("datepicker"),//引用时间组件
	require("uploadfiles"),//上传文件组件
	require("validform"),
	//require("jqueryui"),
	require("dropdownlist"),//下拉框组件
	$public=require("public"),
	$test = function () {
		this.init.apply(this, arguments);
	};
	$test.prototype = {
		init:function(){
			$public.diffBrowser();
			var $self = this;
			$self.computed();
			//äÖÈ¾Ê±¼ä¿Ø¼þ
			$( "#tm" ).datepicker();
			//äÖÈ¾ÏÂÀ­¿ò¿Ø¼þ
			$('select').selectlist({
				zIndex: 10,
				width: 300,
				height: 32,
				onChange:function(){}
			});

/*
			 $(".eredar-info ul li").click(function(){
			  $(this).addClass("on").siblings().removeClass("on");
			  var index=$(".eredar-info ul li").index(this);
			  $(this).parents(".eredar-info").children("div").eq(index).show().siblings("div").hide();

			  var index = $(this).index();
				$(".merchant-list").hide();
				$(".merchant-list" + (index + 1)).show();
			});*/
			var validoptions={
					tiptype:3,
					label:".label",
					showAllError:true,
					datatype:{
						"addressL" : /^([\w\W]{1,100})?$/,
						"nmname" : /^[\d\w\u4e00-\u9fa5,\—]{2,15}$/,
						"kefutel":/^0\d{2,3}-?\d{7,8}$|^1[0-9]{10}$/
					},
					ajaxPost:true
				},rule=[{
					ele:".fixdetel",
					datatype:"kefutel",
					nullmsg:"请输入客服电话",
					errormsg:"请检查客服电话格式，例:(0731-83187200)或手机号码!"
				},{
					ele:".zetel",
					datatype:"null_m"
					
				},{
					ele:".gray",
					datatype:"addressL",
					nullmsg:"请输入店铺地址",
					errormsg:"请输入0~100位字符！"
					
				},{
					ele:".niname",
					datatype:"nmname",
					nullmsg:"请填写信息",
					errormsg:"请输入2~15位字符，支持中文、字母、数字、下划线"
					
				}],validfm=$(".registerform").Validform(validoptions).addRule(rule);

			    

			$('#save').on('click',function(){
				/*$public.dialog.waiting();*/
				var a=validfm.check(),c=$public.allimgvalid($('.imgbox'));
				if(a&&c){	
					var param=$public.paramcompare($('.registerform').serializeArray());
					$.post($public.urlpath.merchant,param,function(data){
						$public.isLogin(data);
						if(data.success){
							$public.dialog.msg('保存成功','success');
							setTimeout(function(){location.reload();},1000);
						}else{
							$public.dialog.msg(data.msg,'error');
							if(data.value) {
								window.location.href = data.value;
							}
							
						}
					});
				}
			});
				$("#textareaInpute").on('keyup',function(){
					$self.computed();
				});
					    
 							 
		},
		computed:function(){
			var length = document.getElementById('textareaInpute').value.length;
			    document.getElementById('isUsed').innerHTML = length;
		}
	}
	module.exports = new $test();
});
