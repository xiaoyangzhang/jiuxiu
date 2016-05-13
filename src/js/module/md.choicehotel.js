define(function (require, exports, module) {
	require("dropdownlist"),//下拉框组件
	$public=require("public"),
	$choicehotel = function () {
		this.init.apply(this, arguments);
	};
	$choicehotel.prototype = {
		config:{
			radiobar:'.radio-bar',
			barbox:'.bar-box',
			barboxul:'.bar-box ul',
			barboxdiv:'.bar-box div',
			radiobarlabel:'.radio-bar label',
			radiobarimg:'.radio-bar img',
			choicehotel:'.choicehotel'
		},
		init:function(){
			var _self=this;
			$('#area').selectlist({width: 200});
			$(_self.config.radiobar).on('click',function(){
				$(_self.config.barbox).css('height','0');
				$(_self.config.radiobarimg).attr('src',static_source+'img/droptip_up.jpg');
				$(this).next().css('height',$(_self.config.barboxul).height()+$(_self.config.barboxdiv).height()+'px');
				$(this).find('img').attr('src',static_source+'img/droptip_down.jpg');
			});
			$(_self.config.radiobarlabel).on('click',function(e){
				$public.stopBubble(e);
			});

			$(_self.config.choicehotel).on('click',function(){
				$public.dialog.content(968,'auto','选择景区',$('.searchbox').show(),function(){alert();});
			});

			$public.actiondata('province','city',true);
		}
	}
	module.exports = new $choicehotel();
});
