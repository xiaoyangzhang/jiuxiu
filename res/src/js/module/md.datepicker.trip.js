define(function(require, exports, module) {
    $public = require("public");
    $datepicker = function(supplierCalendar) {

        /****************************************************价格日历********************************************/
        this.solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        this.nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');

        this.rangedays = 90;
        this.empty_ckbox = {};
        //保存y年m+1月的相关信息
        this.fat = this.mat = 9;
        //在表格中显示公历和农历的日期,以及相关节日
        this.cld = null;
        this.isCtrl = false;
        this.isShift = false;
        this.lastCtrlSelectDay = 0;
        //用自定义变量保存当前系统中的年月日
        this.Today = new Date();
        this.tY = this.Today.getFullYear();
        this.tM = this.Today.getMonth();
        this.tD = this.Today.getDate();

        this.lunarInfo = new Array(
            0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
            0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
            0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
            0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
            0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
            0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
            0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
            0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
            0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
            0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
            0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
            0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
            0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
            0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
            0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0);


        this.supplierCalendar = null;

        this.init.apply(this, arguments);

    }
    $datepicker.prototype = {
        init: function() {
            var _self = this;
                months = [],
                tcs = [];
            if ($('.rds').val()) _self.rangedays = $('.rds').val();

            //设置价和库存
             $('.setvl').on('click', function() {
                var temp = '',
                    $dtbx = $('.day .choiced .dtbx'),
                    $tipvl = $('.day .choiced .dtbx .tipvl'),
                    isSetData = true,
                    number = 0,
                    days = [],
                    blocks = [],
                    times = [];
                   
                $tipvl.remove();
                if ($dtbx.length > 0) {
                    $('.datepicker .price').each(function(index){
                        var isCheckedInput = true,
                            price = $(this),
                            stock = $(this).parent().next().find('.stock'),
                            pTxt = $(this).parent().prev().attr('data-pTxt') || '',
                            tcName = $('.tc-tab .inputxt').val();


                        if ((isCheckedInput && price.val() && !/^\d{1,6}(\.\d{1,2})?$|^[1-9]\d{0,5}$/.test(price.val())) || stock.val() && !price.val()){
                            $public.dialog.msg('“价格”为数字,最大6位整数,能带两位小数', 'error');
                            price.focus();
                            isSetData = false;
                            
                            return false;
                        }
                        if (price.val() && (stock.length && !/^[1-9]\d{0,5}$/.test(stock.val()))) {
                            $public.dialog.msg('“库存”为数字,最大6位整数', 'error');
                            stock.focus();
                            isSetData = false;
                            
                            return false;
                        }
                        isCheckedInput = false;

                        if(price.val()){
                            number++;
                            $dtbx.filter(function() {
                                _self.set_tdvalue($(this), price.val(), stock.val(),pTxt);
                            });
                        }
                        
                        //自由行/跟团游 价格日历存储数据
                        var id = 1,
                            type = 1,
                            name = '';
                           
                        if(pTxt && isSetData){
                            switch(pTxt){
                                case '成' :
                                    id = 1;
                                    type = 2;
                                    name = '成人';
                                    break;
                                case '儿' :
                                    id = 145;
                                    type = 1;
                                    name = '儿童';
                                    break;
                                case '单房差' :
                                    id = 4;
                                    type = 3;
                                    name = '单房差';
                            }
                            blocks.push({
                                id: id,
                                type: type,
                                name: name,
                                PId: 21,
                                PType: 4,
                                pTxt:pTxt,
                                price:price.val()*100,
                                stock:(stock && stock.val()) || 999
                            });
                        }
                    });

                    // 验证信息有误
                    if(!isSetData){ 
                        return false;
                    }else if(isSetData && number == 0){
                        $public.dialog.msg('请输入成人或者儿童的价格和库存', 'error');
                        return;
                    }

                    //$('.datepicker .setvalue input[type=text]').val('');
                    
                    //自由行/跟团游 价格日历存储数据
                    if(isSetData){
                        $('.datepicker .day .choiced').each(function(){
                            var $target = $(this),
                                year = $('#SY').text(),
                                month = $('.tdmonth .on').text(),
                                date = $target.find('font').text(),
                                time = new Date(year+','+month.substring(0,month.length-1)+','+date).getTime(),
                                day = '';
                                times.push(time);
                            //天
                            day = {
                                PId: 20,
                                PType: 3,
                                PTxt: "出发日期",
                                time: time,
                                blocks: blocks
                            };
                            days.push(day);
                        });
                        
                        //月
                        month = {
                            date: times[0],
                            days: days
                        };
                        months.push(month);

                        $('.add-tc .btn-outline').each(function(){
                            var $target = $(this);
                            //套餐
                            var tc = {
                                id: $target.attr("tc-id"),
                                name: $target.text(),
                                PId: 22,
                                PType: 5,
                                PTxt: "套餐",
                                months: months
                            };
                           
                            if($target.hasClass('active')){
                                $target.attr('data-tc',JSON.stringify(tc));
                                $target.html($('.tc-name').val()+'<i class="icon-close"></i>');
                            }
                        });
                    }
                    
                    console.log(JSON.stringify(tcs));
                    
                } else {
                    $public.dialog.msg('请选择要设置的日期', 'error');
                }
            });


            //清除价格和库存
            $('.clearvl').on('click', function() {
                var temp = '',
                    $dtbx = $('.day .choiced .dtbx');
                if ($dtbx.length > 0) {
                    $dtbx.filter(function() {
                        $(this).find('.tipvl').remove();
                        $('.add-tc .btn-outline').each(function(){
                            if($(this).hasClass('active')){
                                $(this).attr('data-tc','');
                            }
                        })
                    });
                    $(document).trigger('click');
                    $('.price,.stock').val('');
                    
                } else
                    $public.dialog.msg('请选择要清除信息的日期', 'error');
            });

            $('.setvalue').on('click', function(ev) {
                $public.stopBubble(ev);
            });

            $('.tdyears .prev').on('click', function(ev) {
                var cur_years = parseInt($('#SY').text());
                $('#SY').text(cur_years - 1);
                _self.changeCld();
                $public.stopBubble(ev);
            });
            $('.tdyears .next').on('click', function(ev) {
                var cur_years = parseInt($('#SY').text());
                $('#SY').text(cur_years + 1);
                _self.changeCld();
                $public.stopBubble(ev);
            });
            $('.tdmonth li').on('click', function(ev) {
                $('.tdmonth li').removeClass('on');
                $(this).addClass('on');
                $('.add-tc .btn-outline').each(function(){
                    if($(this).hasClass('active')){
                        var supplierCalendar = $(this).attr('data-tc');
                        _self.supplierCalendar = typeof supplierCalendar == 'string' ? JSON.parse(supplierCalendar) : _self.supplierCalendar;
                    }
                });
                _self.changeCld();
                $public.stopBubble(ev);
            });
            $('.tdmonth li').on('click', function(ev) {
                $('.tdmonth li').removeClass('on');
                $(".tdweek input[type='checkbox']").attr("checked",false);
                $(this).addClass('on');
                this.lastCtrlSelectDay = 0;
                _self.changeCld();
                $public.stopBubble(ev);
            });

            /*
            $(".tdweek").on("click", "input[type='checkbox']", function() {
                var checked = this.checked;
                var week = $(this).attr("week");
                if (checked) {
                    $(".day td.in-range[week='" + week + "']").addClass("choiced");
                } else {
                    $(".day td.in-range[week='" + week + "']").removeClass("choiced");
                }
            });
            */
            $(".tdweek").on("click", "td:has(input[type='checkbox'])", function() {
                var tagName = event.target.tagName.toLowerCase();
                if (tagName == 'td') {
                    var inputObj = event.target.children[0];
                    inputObj.checked = !inputObj.checked;
                } else if (tagName == 'input'){
                    var inputObj = event.target;
                }
                var checked = inputObj.checked;
                var week = $(inputObj).attr("week");
                if (checked) {
                    $(".day td.in-range[week='" + week + "']").addClass("choiced");
                } else {
                    $(".day td.in-range[week='" + week + "']").removeClass("choiced");
                }
            });

            window.document.onclick = function() {
                //$('.day td.choiced').removeClass("choiced");
                //this.lastCtrlSelectDay = 0;
                //if (!_self.isCtrl) _self.empty_ckbox = {};
            };
            window.document.onkeydown = function(evt) {
                evt = evt || window.event || arguments.callee.caller.arguments[0];
                if (evt.keyCode == 17) _self.isCtrl = true;
                if (evt.keyCode == 16) {
                    _self.isShift = true;
                }
            };
            window.document.onkeyup = function(evt) {
                evt = evt || window.event || arguments.callee.caller.arguments[0];
                if (evt.keyCode == 17) _self.isCtrl = false;
                if (evt.keyCode == 16) {
                    _self.isShift = false;
                }
            };

            window.document.onselectstart = function() {
                //return false;
            };
            _self.initial();

        },
        //返回农历y年的总天数
        lYearDays: function(y) {
            var i, sum = 348;
            for (i = 0x8000; i > 0x8; i >>= 1) sum += (this.lunarInfo[y - 1900] & i) ? 1 : 0;
            return (sum + this.leapDays(y));
        },
        //返回农历y年闰月的天数
        leapDays: function(y) {
            if (this.leapMonth(y)) return ((this.lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
            else return (0);
        },
        //判断y年的农历中那个月是闰月,不是闰月返回0
        leapMonth: function(y) {
            return (this.lunarInfo[y - 1900] & 0xf);
        },
        //返回农历y年m月的总天数
        monthDays: function(y, m) {
            return ((this.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
        },
        //返回公历y年m+1月的天数
        solarDays: function(y, m) {
            if (m == 1)
                return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
            else
                return (this.solarMonth[m]);
        },
        //记录公历和农历某天的日期
        calElement: function(sYear, sMonth, sDay, week) {
            return {
                isToday: false,
                sYear: sYear,
                sMonth: sMonth,
                sDay: sDay,
                week: week,
            };
        },
        calendar: function(y, m) {
            this.fat = this.mat = 0;
            var sDObj, lDObj, lD = 1,
                lX = 0,
                obj = {};
            var n = 0;
            var firstLM = 0;
            sDObj = new Date(y, m, 1); //当月第一天的日期
            obj.length = this.solarDays(y, m); //公历当月天数
            obj.firstWeek = sDObj.getDay(); //公历当月1日星期几
            if ((m + 1) == 5) { this.fat = sDObj.getDay(); }
            if ((m + 1) == 6) { this.mat = sDObj.getDay(); }
            for (var i = 0; i < obj.length; i++) {
                if (lD > lX) {
                    sDObj = new Date(y, m, i + 1); //当月第一天的日期
                }
                obj[i] = this.calElement(y, m + 1, i + 1, this.nStr1[(i + obj.firstWeek) % 7]);
                if ((i + obj.firstWeek) % 7 == 0) {
                    obj[i].color = 'red'; //周日颜色
                }
            }
            if (y == this.tY && m == this.tM) obj[this.tD - 1].isToday = true; //今日
            return obj;
        },
        select: function($td) {
            //清空删除skuId
           //deletedSKU = [];
            //普通的选择
            var _self = this;
            $(".day .choiced").removeClass("choiced");
            $td.addClass('choiced');
            
            $('.price').each(function(index){
                var $price_ = $td.find('.price_').eq(index);
                $(this).val($price_.text()).attr('data-sku-id',$price_.attr('data-sku-id'));
            });

            $('.stock').each(function(index){
                var $stock_ = $td.find('.stock_').eq(index);
                $(this).val($stock_.text()).attr('data-sku-id',$stock_.attr('data-sku-id'));
            });

            $('.day .tipvl').each(function(){
                if(!$(this).closest('td').hasClass('choiced')){
                    $(this).find('.price_').each(function(){
                        var skuId = $(this).attr('data-sku-id');
                        if(!_self.hasSkuid(skuId)){
                            skuId && deletedSKU.push(skuId,skuId);
                            console.log(deletedSKU)
                        }
                    });
                }else{
                    $(this).find('.price_').each(function(){
                        var skuId = $(this).attr('data-sku-id');
                        _self.deleteSameSkuId(skuId);
                        console.log(deletedSKU)
                    });
                }
            });

            this.lastCtrlSelectDay = 0;
        },
        deleteSameSkuId: function(skuId){
            for(var i=0; i<deletedSKU.length; i++){
                if(deletedSKU[i] == skuId){
                    deletedSKU.splice(i,1);
                    i--;
                }
            }
        },
        hasSkuid: function(skuId){
            for(var i=0; i<=deletedSKU.length; i++){
                if(deletedSKU[i] == skuId){
                    return true;
                    break;
                }
            }
            return false;
        },
        ctrlSelect: function($td) {
            //按住ctrl选择
            if ($td.hasClass('choiced')) {
                $td.removeClass('choiced');
            } else {
                $td.addClass('choiced');
                if ($(".day .choiced").length == 1) {
                    $('.price').val($td.find('.price_').text());
                    $('.stock').val($td.find('.stock_').text());
                } else {
                    $('.price,.stock').val('');
                }

                this.lastCtrlSelectDay = parseInt($td.attr("day"));
                console.log("lastCtrlSelectDay:" + this.lastCtrlSelectDay);
            }
        },
        shiftSelect: function($td) {
            //按住shift选择
            var choicedLength = $(".day .choiced").length,
                startDay,
                endDay,
                currentDay = parseInt($td.attr("day"));
            if (choicedLength == 0) {
                $td.addClass('choiced');
                $('.price').val($td.find('.price_').text());
                $('.stock').val($td.find('.stock_').text());

                this.firstShiftSelectDay = currentDay;
            } else {
                endDay = currentDay;

                if (choicedLength == 1) {
                    startDay = parseInt($(".day .choiced").attr("day"));
                } else {
                    startDay = parseInt($(".day .choiced").last().attr("day"));
                }
                if (this.lastCtrlSelectDay != 0) {
                    startDay = this.lastCtrlSelectDay;
                }
                console.log("startDay:" + startDay);
                console.log("endDay:" + endDay);
                if (endDay <= startDay) {
                    return;
                }

                for (var sid = startDay; sid <= endDay; sid++) {
                    $(".day td[day='" + sid + "']").addClass("choiced");
                }
                this.lastCtrlSelectDay = 0;
                $('.price,.stock').val('');
            }
        },
        drawCld: function(SY, SM) {
            var TF = true,
                _prent_self = this;
            var p1 = p2 = "";
            var i, sD, s, size;
            _prent_self.cld = _prent_self.calendar(SY, SM);
            for (i = 0; i < 42; i++) {
                var sObj = document.getElementById("SD" + i);
                var $td = $(sObj).closest("td");
                $td.removeClass().attr("day", "").attr("week", "");
                sD = i - _prent_self.cld.firstWeek;
                if (sD > -1 && sD < _prent_self.cld.length) { //日期内
                    sObj.innerHTML = sD + 1;
                    if (_prent_self.cld[sD].isToday) {
                        $td.addClass("today");
                    }

                    var cDay = new Date(SY, SM, sD + 1);
                    $td.attr("day", sD + 1).attr("week", cDay.getDay());

                    if (_prent_self.checkRangeDay(cDay, _prent_self.rangedays)) {
                        $td.addClass("in-range").off().on('click', function(ev) {
                            var _self = $(this);
                            if (_self.hasClass("out-range")) {
                                return;
                            }

                            if (_prent_self.isCtrl) {
                                _prent_self.ctrlSelect(_self);
                            } else if (_prent_self.isShift) {
                                _prent_self.shiftSelect(_self);
                            } else {
                                _prent_self.select(_self);
                            }

                            $(".tdweek input[type='checkbox']").each(function() {
                                var week = $(this).attr("week");
                                var inRangeDays = $(".day td.in-range[week='" + week + "']").length;
                                var choicedDays = $(".day td.choiced[week='" + week + "']").length;
                                this.checked = inRangeDays == choicedDays;
                            });
                            $public.stopBubble(ev);
                        });
                    } else {
                        $td.addClass("out-range").off();
                    }
                } else { //非日期
                    sObj.innerHTML = '';
                    $td.addClass("out-range").off();
                }
            }
            if ($('.datepicker tr.last td:eq(0) font').text() == '')
                $('.datepicker tr.last').hide();
            else
                $('.datepicker tr.last').show();

            //渲染已设置的日期
            this.dateRender(this.supplierCalendar);

        },
        //记录选中点
        recordck: function(obj, type) {
            var cur_smp = new Date($('#SY').text(), $('.tdmonth li.on').index(), obj.find('font').html()).valueOf();
            if (!this.isCtrl) this.empty_ckbox = {};
            if (type == 'add' && !this.empty_ckbox[cur_smp]) {
                this.empty_ckbox[cur_smp] = true;
            } else if (type == 'del' && this.empty_ckbox[cur_smp]) {
                delete this.empty_ckbox[cur_smp];
            }
        },
        //渲染已设置的日期
        dateRender: function(supplierCalendar) {
            this.supplierCalendar = typeof supplierCalendar == 'string' ? JSON.parse(supplierCalendar) : this.supplierCalendar;
            var _self = this,
                months = this.supplierCalendar && this.supplierCalendar.months,
                days = $('.dtbx font');

            $('.tipvl').remove();
            if(!months ) return;
            $.each(months, function(index, month) {
                $.each(month.days, function(index, day) {
                    days.filter(function() {
                        if (this.innerHTML != '') {
                            var cur_smp = new Date($('#SY').text(), $('.tdmonth li.on').index(), this.innerHTML).valueOf();
                            if (cur_smp == day.time) {
                                var cur_td = $(this).closest('td')[0];
                                $.each(day.blocks, function(index, block) {
                                    _self.set_tdvalue($(cur_td).find('.dtbx'), block.price/100, block.stock, block.pTxt, block.skuId);
                                });

                                if (_self.checkRangeDay(new Date($('#SY').text(), $('.tdmonth li.on').index(), (parseInt(this.innerHTML) + 1)), _self.rangedays)) {
                                    $(cur_td).addClass("choiced");
                                } else {
                                    console.log(this.innerHTML);
                                    console.log($(cur_td).find('.tipvl').html());
                                }
                            }
                        }
                    });
                });
            });
        },
        //设置日期的价格和库存
        set_tdvalue: function(obj, price, stock, pTxt, skuId) {
            var html = '',
                tcArr = [];
            if (obj.find('.tipvl').length == 0){
                if(skuId){
                    obj.append('<div class="tipvl"><label>'+pTxt+'￥</label><label class="price_" data-sku-id="'+ skuId +'">' + price + '</label><br><label>库</label><label class="stock_" data-sku-id="'+ skuId +'">' + stock + '</label></div>');
                }else{
                    obj.append('<div class="tipvl"><label>'+pTxt+'￥</label><label class="price_">' + price + '</label><br><label>库</label><label class="stock_">' + stock + '</label></div>');
                }
                
            }else{
                if(skuId){
                    html += '<br><label>'+pTxt+'￥</label><label class="price_" data-sku-id="'+ skuId +'">' + price + '</label>';
                    if(stock){
                        html += '<br><label>库</label><label class="stock_" data-sku-id="'+ skuId +'">' + stock + '</label>';
                    }
                }else{
                    html += '<br><label>'+pTxt+'￥</label><label class="price_">' + price + '</label>';
                    if(stock){
                        html += '<br><label>库</label><label class="stock_">' + stock + '</label>';
                    }
                }
                
                obj.find('.tipvl').append(html);
            }
        },
        update_value: function(price, stock, name, pTxt, skuId, day) {
            var cur_time = new Date($('#SY').text(), $('.tdmonth li.on').index(), day).getTime() + '',
                months = this.supplierCalendar.months;

            $.each(months, function(index, month) {
                $.each(month.days, function(index, day) {
                    if (cur_time == day.time) {
                        $.each(day.blocks, function(index, block) {
                            block.price = price;
                            block.stock = stock;
                            block.skuId = skuId;
                            block.pTxt = pTxt;
                            block.name = name;
                            return true;
                        });
                    }
                });
            });
            return false;
        },
        //监测日期是否在规定范围内
        //"v" 要检测的日期
        //"frontRangeDay" 向前延伸的天数
        //"behindRangeDay" 向后延伸的天数
        checkRangeDay: function(v, frontRangeDay, behindRangeDay) {
            var cur_time = new Date(),
                behindRangeDay = behindRangeDay ? behindRangeDay : 0,
                frontRangeDay = frontRangeDay ? frontRangeDay : 0,
                days = Math.ceil((v - cur_time) / 1000 / 60 / 60 / 24);
            if (-behindRangeDay <= days && days <= (frontRangeDay - 1))
                return true;
            else
                return false;
        },
        //在下拉列表中选择年月时,调用自定义函数drawCld(),显示公历和农历的相关信息
        changeCld: function() {
            var y, m;
            y = $('#SY').text();
            m = $('.tdmonth li.on').index();
            this.drawCld(y, m);
        },
        //打开页时,在下拉列表中显示当前年月,并调用自定义函数drawCld(),显示公历和农历的相关信息
        initial: function() {
            var gNum, str = '';
                /*slcvalue = $('input[name="supplierCalendar"]').val();*/
            for (i = 0; i < 6; i++) {
                str += '<tr class="day ' + (i == 5 ? 'last' : '') + '">';
                for (j = 0; j < 7; j++) {
                    gNum = i * 7 + j;
                    str += '<td id="GD' + gNum + '"><div class="dtbx"><font id="SD' + gNum + '"';
                    if (j == 0) str += ' style="color:red"';
                    if (j == 6) str += ' style="color:#000080"';
                    str += '> </font></div></td>';
                }
                str += '</tr>';
            }
            $('.datepicker table').append(str);

            $('#SY').text(this.tY);
            $('.tdmonth li').removeClass('on');
            $('.tdmonth').find('li:eq(' + this.tM + ')').addClass('on');

            /*if (slcvalue){
                this.supplierCalendar = JSON.parse(this.supplierCalendar);
            }*/
            /*else
                $('input[name="supplierCalendar"]').val(JSON.stringify(this.supplierCalendar));*/

            this.drawCld(this.tY, this.tM);
        }
    }

    module.exports = new $datepicker();

});