define(function (require, exports, module) {
	require("dropdownlist"),//下拉框组件
	require("validform"),//验证组件
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
			eredarli:'.eredar-info li',
			eredarpanel:'.eredar-right .panel',
			searchotel:'.choicehotel',
			searchbox:'.searchbox',
			hotelist:'.hotelist',
			loadlist:'.load_list',
			searchbtn:'.search-btn',
			btnOk:'.ok',
			infoBar:'.info-bar',
			infoBox:'.info-box',
			inputGp:'input[name="gp"]'
		},
		init:function(){
			var _self=this;


	        var validoptions={
					tiptype:3,
					label:".label",
					showAllError:true,
					datatype:{
						"*2-10" : /^[\w\W]{2,10}$/,
						"n10-25" : /^\d{10,25}$/
					},
					ajaxPost:true
				},rule=[{
					ele:"input[type='text'],textarea",
					datatype:"*",
					nullmsg:"请填信息！"
				},{
					ele:"input[name='payType']:last",
					datatype:"*",
					nullmsg:"请选择付款方式！"
				},{
					ele:"input[name='cancelLimit']:last",
					datatype:"*",
					nullmsg:"请选择退订限制！"
				},{
					ele:"input[name='startBookTimeLimit']",
					datatype:"n",
					nullmsg:"请填写提前预定天数！",
					errormsg:"请输入纯数字！"
				}],validfm=$(".baseinfo form").Validform(validoptions).addRule(rule);

			$('.inputxt,textarea').keyup(function(){
				$(this).next('.mark').find('label').text($(this).val().length);
			}).filter(function(){
				$(this).next('.mark').find('label').text($(this).val().length);
			});

			$('#area').selectlist({width: 200});
			$('.baseinfo .checkbox:last').css('width','300px');
			$('.checkbox input').on('change',function(){
				check_storeLastTime();
			});
			$(document).on('click',_self.config.radiobar,function(ev){
				$(_self.config.barbox).css('height','0'); 
				$(_self.config.radiobarimg).attr('src',static_source+'img/droptip_up.jpg');
				$(this).next().css('height',($(_self.config.barboxul).outerHeight()+$(_self.config.barboxdiv).outerHeight()+15)+'px');
				$(this).find('img').attr('src',static_source+'img/droptip_down.jpg');
				$public.stopBubble(ev);
			});

			$(_self.config.searchotel).on('click',function(ev){
				var $searchbox=$(_self.config.searchbox),
				$htlst=$searchbox.find(_self.config.hotelist);
				$public.dialog.content(968,'auto','选择酒店',$searchbox.show(),function(){
					var ckid=$('input[name="hotelGroup"]:checked'),htlid=ckid.val(),
					htname=ckid.closest('td').next().text();
					if(htlid){
						$('input[name="hotelId"]').val(htlid);
						$('input[name="name"]').val(htname);
						$('#lbhotelname').text(htname);
						$public.dialog.closebox();
						gitroominfo();
					}else{
						alert('请选择酒店！');
					}
					return false;
				},function(){
					$htlst.height($('.container').height()-120);
					$(_self.config.loadlist).show();
				});
				gethotelist();
				$public.stopBubble(ev);
			});
			
			$(document).on('click',_self.config.inputGp,function () {
				$('input[name="roomId"]').val($(this).val());
			});
			
			$public.procityaredata('province','city','area',true);

			$(_self.config.eredarli).on('click',function(ev){
				$(_self.config.eredarli).removeClass('on');
				$(this).addClass('on');
				$(_self.config.eredarpanel).hide();
				$($(_self.config.eredarpanel)[$(this).index()]).fadeIn();
				$public.stopBubble(ev);
			});

			$(_self.config.searchbtn).on('click',function(){
				$(_self.config.loadlist).show();
				gethotelist();
			});
			
			
			//返回上一页
			$('.backprev').on('click',function(ev){
				$('.eredar-info li.on').prev().trigger('click');
				$public.stopBubble(ev);
			});

			//“选择酒店”保存并下一步
			$('.save-to-baseinfo').on('click',function(ev){
				if(!valid_step_one())
					return;
				$('.eredar-info li:eq(1)').trigger('click');
				$public.stopBubble(ev);
			});

			//“基本信息”保存并下一步
			$('.save-to-picker').on('click',function(ev){
				var validresult=true;
				if(!valid_step_two())
					validresult=false;
				if(!check_storeLastTime())
					validresult=false;
				if(!validresult) return;
				$('.eredar-info li:eq(2)').trigger('click');
				$public.stopBubble(ev);
			});


			$('.allsub').on('click',function(ev){
				if(!valid_step_one()||!valid_step_two())
					return;
				if(!check_storeLastTime())
					return;
				var ls=supplierCalendar.bizSkuInfo,isHave=false;
				for(var i=0;i<ls.length;i++){
					if(ls[i].state!='del')
						isHave=true;
				}
				if(!isHave){
					$public.dialog.msg('请设置价格日历！','error');
					return;
				}
				var prarm=$public.paramcompare($('#hotelfm').serializeArray());
				if(typeof prarm.storeLastTime=='object')prarm.storeLastTime=prarm.storeLastTime.join(',');
				$.post($public.urlpath.addhotel,prarm,function (data) {
					$public.isLogin(data);
					if(data.success){
						$public.dialog.msg('保存成功','success');
						setTimeout(function(){
							window.location=data.value;
						},1000);
					}else{
						$public.dialog.msg(data.resultMsg,'error');
					}
				});
				
			});
					
			function valid_step_one(){
				if($('input[name="hotelId"]').val()==0){
					$('.eredar-info li:eq(0)').trigger('click');
					$public.dialog.msg('请选择酒店！','error');
					$(document).scrollTop(0);
					return false;
				}else if($('input[name="roomId"]').val()==0){
					$('.eredar-info li:eq(0)').trigger('click');
					$public.dialog.msg('请选择房间！','error');
					$(document).scrollTop(0);
					return false;
				}
				return true;
			}
					
			function valid_step_two(){
				if(!validfm.check()){
					$('.eredar-info li:eq(1)').trigger('click');
					return false;
				}
				return true;
			}

			function check_storeLastTime(){
				var $cked=$('.checkbox input:checked'),$cklast=$('.baseinfo .checkbox:last');
				$cklast.find('.Validform_checktip').remove();
				if($cked.length>3){
					$cklast.append('<span class="Validform_checktip Validform_wrong">最多只能选三个！</span>');
					return false;
				}else if($cked.length==0){
					$cklast.append('<span class="Validform_checktip Validform_wrong"></span>');
					return false;
				}else{
					$cklast.append('<span class="Validform_checktip Validform_right"></span>');
					return true;
				}
			}

			//上一页
			$(document).on('click','li.previous:not(".disabled") a',function(){
				var cur_page=parseInt($('.pagination li.active a').text());
				$(_self.config.loadlist).show();
				gethotelist(cur_page>0?(cur_page-1):cur_page);
			});

			//下一页
			$(document).on('click','li.next:not(".disabled") a',function(){
				var cur_page=parseInt($('.pagination li.active a').text());
				$(_self.config.loadlist).show();
				gethotelist(cur_page+1);
			});

			//选择页
			$(document).on('click','li:not(".active,.previous,.next") a',function(){
				var cur_page=parseInt($(this).text());
				$(_self.config.loadlist).show();
				gethotelist(cur_page);
			});

			//选择页大小
			$(document).on('change','li #pageSize',function(){
				$(_self.config.loadlist).show();
				gethotelist(1,$(this).val());
			});

			//获取酒店列表
			function gethotelist(page,pagesize){
				var $searchbox=$(_self.config.searchbox),page=page?page:1,pagesize=pagesize?pagesize:10,
				$htlst=$searchbox.find(_self.config.hotelist);
				$htlst.empty();
				$.get($public.urlpath.gethotelist,{
					page:page,
					pagesize:pagesize,
					name:$('#hotelname').val(),
					locationProvinceId:$('input[name="province"]').val() ? $('input[name="province"]').val() : 0,
					locationCityId:$('input[name="city"]').val() ? $('input[name="city"]').val() : 0,
					locationTownId:$('input[name="area"]').val() ? $('input[name="area"]').val() : 0
				},function(data){ 
					$htlst.append(data);
					$(_self.config.loadlist).hide();
					$('.pagination').css('margin-left',(($('.container').width()-$('.pagination').width())/2)+'px');
				});
			};
			
			//获取酒店详细信息
			function gitroominfo(){
				var $tr = $('input[name="hotelGroup"]:checked').closest('tr');
				var $infoBox = $(_self.config.infoBox);
				$('.load_room').show();
				$('.hotelcol').hide();
				$(_self.config.infoBar).find('.htn').text($tr.find('.hotel-name').text());
				$(_self.config.infoBar).find('.address').text($tr.find('.hotel-address').text());
				$(_self.config.infoBar).find('.tel').text($tr.find('.hotel-tel').text());
				$.get($public.urlpath.getroominfo,{hotelId:$('input[name="hotelGroup"]:checked').val()},function (data) {
					$('.load_room').hide();
					$('.hotelcol').show();
					$infoBox.empty().append(data);
					var rdlth=$('.radio-bar').length-1;
					$('.radio-bar:eq('+rdlth+')').css('border-bottom','none');
					$('.radio-bar:eq(0)').trigger('click');
				});
			};
			
			








			 
			var solarMonth=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
			var nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');

			var empty_ckbox={};
			var SY=$('#SY').get(0);
			var SM=$('.tdmonth ul');
			//var GZ=$('#GZ').get(0);
			var CLD=$('#CLD').get(0);
			var color_temp='';
			//保存y年m+1月的相关信息
			var fat=mat=9;
			//在表格中显示公历和农历的日期,以及相关节日
			var cld,isCtrl=false;
			//用自定义变量保存当前系统中的年月日
			var Today = new Date();
			var tY = Today.getFullYear();
			var tM = Today.getMonth();
			var tD = Today.getDate();

			var lunarInfo=new Array(
			0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
			0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
			0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
			0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
			0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
			0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
			0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
			0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
			0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
			0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
			0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
			0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
			0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
			0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
			0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0);


		    var supplierCalendar={
		        "seller_id":"2088102122524333",
		        "hotel_id":$('input[name="hotelId"]').val(),
		        "sku_flag":$(".sku_flag").val(),
		        "bizSkuInfo":[
		        // {
		        //     "sku_id":10012,
		        //     "state":"update",
		        //     "stock_num":10,
		        //     "price":"8.8",
		        //     "vTxt":1464364800000
		        // },{
		        //     "sku_id":10014,
		        //     "state":"update",
		        //     "stock_num":228,
		        //     "price":"12",
		        //     "vTxt":1464105600000
		        // }
		        // ,{
		        //     "sku_id":10015,
		        //     "state":"update",
		        //     "stock_num":125,
		        //     "price":"88.9",
		        //     "vTxt":1464624000000
		        // },{
		        //     "sku_id":"fdfd",
		        //     "state":"update",
		        //     "stock_num":366,
		        //     "price":"12.33",
		        //     "vTxt":1467907200000
		        // },{
		        //     "sku_id":10016,
		        //     "state":"update",
		        //     "stock_num":58,
		        //     "price":"100",
		        //     "vTxt":1464796800000
		        // },{
		        //     "sku_id":10018,
		        //     "state":"update",
		        //     "stock_num":98,
		        //     "price":"66",
		        //     "vTxt":1466524800000
		        // }
		        ]
		   
		    };
			  //返回农历y年的总天数
			  function lYearDays(y) {
			     var i, sum = 348;
			     for(i=0x8000; i>0x8; i>>=1)sum+=(lunarInfo[y-1900]&i)?1:0;
			     return(sum+leapDays(y));
			  }
			  //返回农历y年闰月的天数
			  function leapDays(y) {
			     if(leapMonth(y))  return((lunarInfo[y-1900] & 0x10000)? 30: 29);
			     else return(0);
			  }
			  //判断y年的农历中那个月是闰月,不是闰月返回0
			  function leapMonth(y){
			     return(lunarInfo[y-1900]&0xf);
			  }
			  //返回农历y年m月的总天数
			  function monthDays(y,m){
			     return((lunarInfo[y-1900]&(0x10000>>m))?30:29);
			  }
			 //返回公历y年m+1月的天数
			 function solarDays(y,m){
			    if(m==1)
			       return(((y%4==0)&&(y%100!=0)||(y%400==0))?29:28);
			    else
			       return(solarMonth[m]);
			 }
			 //记录公历和农历某天的日期
			 function calElement(sYear,sMonth,sDay,week) {
			       this.isToday = false;
			       //公历
			       this.sYear = sYear;
			       this.sMonth = sMonth;
			       this.sDay = sDay;
			       this.week = week;
			 }
			 function calendar(y,m) {
			    fat=mat=0;
			    var sDObj,lDObj,lD=1,lX=0;
			    var n = 0;
			    var firstLM = 0;
			    sDObj = new Date(y,m,1);    //当月第一天的日期
			    this.length = solarDays(y,m);    //公历当月天数
			    this.firstWeek = sDObj.getDay();    //公历当月1日星期几
			    if ((m+1)==5){fat=sDObj.getDay()}
			    if ((m+1)==6){mat=sDObj.getDay()}
			    for(var i=0;i<this.length;i++) {
			       if(lD>lX) {
			          sDObj = new Date(y,m,i+1);    //当月第一天的日期
			       }
			       this[i] = new calElement(y,m+1,i+1,nStr1[(i+this.firstWeek)%7]);
			       if((i+this.firstWeek)%7==0){
			          this[i].color = 'red';  //周日颜色
			       }
			    }
			    if(y==tY && m==tM) this[tD-1].isToday = true;    //今日
			 }
			 function drawCld(SY,SM) {
			    var TF=true;
			    var p1=p2="";
			    var i,sD,s,size;
			    cld = new calendar(SY,SM);
			    for(i=0;i<42;i++) {
			       sObj=eval('SD'+ i);
			       sObj.className = '';
			       sD = i - cld.firstWeek;
			       if(sD>-1 && sD<cld.length) { //日期内
			          sObj.innerHTML = sD+1;
			          if(cld[sD].isToday){ sObj.style.color = '#ffaf00';} //今日颜色
			          else{sObj.style.color = '#666';}

			          $(sObj).closest('td').css({'background':'#fff','cursor':'pointer'}).off().removeClass()
			          .on('click',function(ev){
			          		var _self=this;
			          		if(!isCtrl){
			          			$('.day td').filter(function(){
			          				if($(this).attr('class')){
										$(this).css('background','#fff').attr('class','').find('font').css('color',this.color_temp);
										$(this).find('label').css('color','#666');
									}
			          			});
			          		}
							if($(_self).attr('class')){
								$(_self).css('background','#fff').attr('class','').find('font').css('color',_self.color_temp);
								$(_self).find('label').css('color','#666');
								recordck($(_self),'del');
							}else{
								_self.color_temp=$(_self).find('font')[0].style.color;
								$(_self).css('background','#ed6c44').attr('class','choiced').find('font,label').css('color','#fff');
								$('.price').val($(_self).find('.price_').text());
								$('.stock').val($(_self).find('.stock_').text());
								recordck($(_self),'add');
							}
							if(isCtrl) $('.price,.stock').val('');
							$public.stopBubble(ev);
					   });                
			       }
			       else { //非日期
			          sObj.innerHTML = '';
			          $(sObj).closest('td').css({'background':'#f5f5f5','cursor':'initial'}).off();
			       }
			    }
			    if($('.datepicker tr.last td:eq(0) font').text()=='')
			    	$('.datepicker tr.last').hide();
			    else
			    	$('.datepicker tr.last').show();

			    //渲染已设置的日期
		    	dateRender(supplierCalendar);

			 }

			//记录选中点
			function recordck(obj,type){
				var cur_smp=new Date($('#SY').text(),$('.tdmonth li.on').index(),obj.find('font').html()).valueOf();
				if(!isCtrl) empty_ckbox={};
				if(type=='add'&&!empty_ckbox[cur_smp]){
					empty_ckbox[cur_smp]=true;
				}else if(type=='del'&&empty_ckbox[cur_smp]){
					delete empty_ckbox[cur_smp];
				}
			}

			//渲染已设置的日期
			function dateRender(supplierCalendar){
				var ls=supplierCalendar.bizSkuInfo,days=$('.dtbx font');
				$('.tipvl').remove();
				for(var i=0;i<ls.length;i++){
					days.filter(function(){
						if(this.innerHTML!=''){
							var cur_smp=new Date($('#SY').text(),$('.tdmonth li.on').index(),this.innerHTML).valueOf();
							if(cur_smp==ls[i].vTxt&&ls[i].state!='del'){
								var cur_td=$(this).closest('td')[0];
								cur_td.color_temp=$(cur_td).find('font')[0].style.color;
								$(cur_td).css('background','#ed6c44').attr('class','choiced').find('font,label').css('color','#fff');
								set_tdvalue($(cur_td).find('.dtbx'),ls[i].price,ls[i].stock_num);
							}
						}
					});
					
				}
			}

			//价格和库存写入缓存
			function set_chahevalue(stock,price,day){
				var cur_time=new Date($('#SY').text(),$('.tdmonth li.on').index(),day).getTime()+'',
				ls=supplierCalendar.bizSkuInfo;
				for(var i=0;i<ls.length;i++){
					if(cur_time==ls[i].vTxt&&ls[i].state!='del'){
						if(ls[i].sku_id!=0) ls[i].state='update';
						ls[i].stock_num=stock;
						ls[i].price=price;
		        		console.log(JSON.stringify(supplierCalendar.bizSkuInfo)+'   ---------set_chahevalue--update------');
						return;
					}
				}
	          	ls.push({
			            "sku_id":0,
			            "state":'add',
			            "stock_num":stock,
			            "price":price,
			            "vTxt":cur_time
						});
		        console.log(JSON.stringify(supplierCalendar.bizSkuInfo)+'   --------set_chahevalue--add------');
			}

			//从缓存删除价格和库存
			function del_chahevalue(day){
				var cur_time=new Date($('#SY').text(),$('.tdmonth li.on').index(),day).getTime()+'',
				ls=supplierCalendar.bizSkuInfo;
				for(var i=0;i<ls.length;i++){
					if(cur_time==ls[i].vTxt){
						if(ls[i].state=='update'||ls[i].state==''){
							ls[i].state='del';
						}else if(ls[i].state=='add'){
	          				ls.remove(i);
						}
					}
				}
		        console.log(JSON.stringify(supplierCalendar.bizSkuInfo)+'   -------del_chahevalue----------');
			}

			//设置日期的价格和库存
			function set_tdvalue(obj,price,stock){
				if(obj.find('.tipvl').length==0)
	          		obj.append('<div class="tipvl"><label>价:￥</label><label class="price_">'+price+'</label><br><label>存:</label><label class="stock_">'+stock+'</label></div>');
				else{
					obj.find('.price_').text(price);
					obj.find('.stock_').text(stock);
				}
	          	obj.find('label').css('color','#fff');
			}

			 //在下拉列表中选择年月时,调用自定义函数drawCld(),显示公历和农历的相关信息
			 function changeCld() {
			    var y,m;
			    y=$(SY).text();
			    m=SM.find('li.on').index();
			    drawCld(y,m);
			 }

			 //打开页时,在下拉列表中显示当前年月,并调用自定义函数drawCld(),显示公历和农历的相关信息
			 function initial() {

				var gNum,str='';
             	for(i=0;i<6;i++) {
	                str+='<tr class="day '+(i==5?'last':'')+'">';
	                for(j=0;j<7;j++) {
	                   gNum = i*7+j;
	                   str+='<td id="GD' + gNum +'"><div class="dtbx"><font id="SD' + gNum +'"';
	                   if(j == 0) str+=' style="color:red"';
	                   if(j == 6) str+=' style="color:#000080"';
	                   str+='> </font></div></td>';
	                }
	                str+='</tr>';
         		}
             	$(CLD).find('table').append(str);

			    $(SY).text(tY);
			    SM.find('li').removeClass('on');
			    SM.find('li:eq('+tM+')').addClass('on');
			    drawCld(tY,tM);


				$('input[name="supplierCalendar"]').val(JSON.stringify(supplierCalendar));

			 }

			 // var curt=new Date(2016,5,22);
			 // var cc=(curt).valueOf();
			 // console.log(cc);
			 // alert($public.dateFormat(curt,'yyyy-MM-dd hh:mm:ss'));
			 // alert($public.dateFormat(new Date(1467907200000),'yyyy-MM-dd hh:mm:ss'));

			//设置价和库存
			$('.setvl').on('click',function(){
				var temp='',$dtbx=$('.day .choiced .dtbx'),price=$('.price').val(),stock=$('.stock').val();
				if($dtbx.length>0){
					if(!/^\d{1,6}(\.\d{1,2})?$|^\d{1,9}$/.test($('.price').val())){
						$public.dialog.msg('“价格”为数字，能带两位小数','error');
						$('.price').focus();
						return;
					}
					if(!/^\d{1,9}$/.test($('.stock').val())){
						$public.dialog.msg('“库存”为纯数字','error');
						$('.stock').focus();
						return;
					}
					$dtbx.filter(function(){
						set_tdvalue($(this),price,stock);
						set_chahevalue(stock,price,$(this).parent().find('font').html());
					});
					$('input[name="supplierCalendar"]').val(JSON.stringify(supplierCalendar));
				}else
					$public.dialog.msg('请选择要设置的日期','error');
			});

			//清除价格和库存
			$('.clearvl').on('click',function(){
				var temp='',$dtbx=$('.day .choiced .dtbx');
				if($dtbx.length>0){
					$dtbx.filter(function(){
						$(this).find('.tipvl').remove();
						del_chahevalue($(this).parent().find('font').html());
					});
					$(document).trigger('click');
					$('input[name="supplierCalendar"]').val(JSON.stringify(supplierCalendar));
				}else
					$public.dialog.msg('请选择要清除的日期','error');
			});

			$('.setvalue').on('click',function(ev){
				$public.stopBubble(ev);
			});

			$('.tdyears .prev').on('click',function(ev){
				var cur_years=parseInt($(SY).text());
				$(SY).text(cur_years-1);
				changeCld();
				$public.stopBubble(ev);
			});
			$('.tdyears .next').on('click',function(ev){
				var cur_years=parseInt($(SY).text());
				$(SY).text(cur_years+1);
				changeCld();
				$public.stopBubble(ev);
			});
			$('.tdmonth li').on('click',function(ev){
		    	SM.find('li').removeClass('on');
		    	$(this).addClass('on');
				changeCld();
				$public.stopBubble(ev);
			});
			$('.tdmonth li').on('click',function(ev){
		    	SM.find('li').removeClass('on');
		    	$(this).addClass('on');
				changeCld();
				$public.stopBubble(ev);
			});

			window.document.onclick = function (){
      			$('.day td').filter(function(){
      				if($(this).attr('class')){
						$(this).css('background','#fff').attr('class','').find('font').css('color',this.color_temp);
						$(this).find('label').css('color','#666');
					}
      			});
      			if(!isCtrl) empty_ckbox={};
			}
			window.document.onkeydown = function (evt){
				evt = evt || window.event || arguments.callee.caller.arguments[0];
				if(evt.keyCode == 17) isCtrl=true;
			}
			window.document.onkeyup = function (evt){
				evt = evt || window.event || arguments.callee.caller.arguments[0];
				if(evt.keyCode == 17) isCtrl=false;
			}

			initial();
			

		}
	}
	module.exports = new $choicehotel();
});
