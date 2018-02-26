/**************************************************************************************************
 * Program Name : script.js
 * Location     : /js
 * Author       : Kim Jongsu
 * Date         : 2017-12-22
 *
 * History      :
 * *************************************************************************************************
 * No.     Date         Name             Description
 * *************************************************************************************************
 * CH_OO   2017-01-00   김종수           Initial Release
 * CH_01   2018-02-01   방성호           Ax5ui-docker Applied
 * CH_02   2018-02-01   이현아           Styling, Debugging
 ***************************************************************************************************/
/*******************************************************
 * define set visite history date
 *
 * @param m {Number} : month 1 ~ 11
 * @param y {Number} : year 1999
 * @returns : N/A
 * @description set date
 *******************************************************/
function p_setVisitHisDate(m, y){
    var $calendar = $('.cm_calendar_multi');
    var $datepicker = $('.cm_calendar_multi').find('.cm_calendar_multi_datepicker');
    var actClass = 'is_active';
    $datepicker.datepicker('setDate',  m +"/" + 1 + "/"+ y);

    // set option
    $datepicker.datepicker('option', {
        numberOfMonths: 1,
        showCurrentAtPos: 0
    });
    // set style  data-mode
    $calendar.attr('data-mode','today');

    // marking hospital calendar list
    if(typeof setVisitHsptlCldrList !== "undefined"){
        setVisitHsptlCldrList();
    }

    // execute tab
    p_visitHisDayTab();

    // set title
    var	$titleY = $('.cm_calendar_multi_control-year').find('.cm_calendar_multi_year'),
        $titleM = $('.cm_calendar_multi_control-month').find('.cm_calendar_multi_month');
    p_setTitle($titleY,$titleM,y,m);

    // disable default date click
    p_disableDateClick($datepicker);
}

/*******************************************************
 * define datepicker function
 *
 * @description 날짜 만들기
 *******************************************************/
//visite history day tab
function p_visitHisDayTab(){
    var $tab = $($('.cm_panel_tab--diag').attr('data-cm-tab'));
    $tab.children().eq(1).click();
}
// get year
function p_getY(){
    return $(this).datepicker("getDate").getFullYear();
}
// get month
function p_getM(){
    return $(this).datepicker("getDate").getMonth();
}
// get day
function p_getD(){
    return $(this).datepicker("getDate").getDate();
}

/***
 * set year, month title
 *
 * @param $titleY {Selector}
 * @param $titleM {Selector}
 * @param y {Number} : 1999,2000
 * @param m {Number} : 1,2,3,4,
 * @returns : N/A
 * @description 날짜 만들기
 ***/
function p_setTitle($titleY,$titleM,y,m) {
    $titleY.text(y);
    $titleM.text(m);
}

// create today
function p_today(){
    var today = new Date();
    return {
        month : today.getMonth(),
        fullYear : today.getFullYear(),
        date : today.getDate()
    }
}

//  block default click method, not use
function p_disableDateClick($datepicker){
    $datepicker.find('td').off('click');
}

// define calendar
function p_calendar(){
    var $calendar = $('.cm_calendar_multi'),
        $datepicker = $('.cm_calendar_multi').find('.cm_calendar_multi_datepicker');
    if($datepicker.length == 0){
        return false;
    }

    var defaultArg = {
        dayNamesMin: ['일','월','화','수','목','금','토'],
        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        showMonthAfterYear: true
    };

    // get hopital calendar list
    if(typeof getVisitHsptlCldrList !== "undefined"){
        getVisitHsptlCldrList();
    }

    // create datepicker
    $datepicker.datepicker(defaultArg);

    // marking hospital calendar list
    if(typeof setVisitHsptlCldrList !== "undefined"){
        setVisitHsptlCldrList();
    }

    // find object
    var $ctrlYear = $calendar.find('.cm_calendar_multi_control-year'),
        $titleY = $ctrlYear.find('.cm_calendar_multi_year'),
        $ctrlMonth = $calendar.find('.cm_calendar_multi_control-month'),
        $titleM = $ctrlMonth.find('.cm_calendar_multi_month'),
        prev = '.cm_calendar_multi_prev',
        next = '.cm_calendar_multi_next',
        $btnPrevY = $ctrlYear.find(prev),
        $btnNextY = $ctrlYear.find(next),
        $btnPrevM = $ctrlMonth.find(prev),
        $btnNextM = $ctrlMonth.find(next),
        $btnOptDay = $calendar.find('.cm_calendar_multi_optionday'),
        $optionDayList = $calendar.find('.cm_calendar_multi_optionday_list');
    $btnToday = $('.cm_calendar_multi_opt-today'),
        $btnMonth = $('.cm_calendar_multi_opt-month'),
        $btnYear = $('.cm_calendar_multi_opt-year'),
        handlerY = "[data-handler=selectYear]",
        handlerM = "[data-handler=selectMonth]",
        actClass= "is_active";

    // init tdoay active class
    $btnToday.addClass(actClass);

    // today object
    var today = p_today();

    // 최대 년수, 최소 년수
    function p_minY() {
        var minTxt = $datepicker.datepicker("option","yearRange").split(':')[0];
        if(minTxt.match('c-')){
            minTxt = parseInt(minTxt.replace('c-',''));
        }else{
            minTxt = parseInt(minTxt);
        }
        return today.fullYear - minTxt;
    }
    function p_maxY() {
        var maxTxt = $datepicker.datepicker("option","yearRange").split(':')[1];
        if(maxTxt.match('c+')){
            maxTxt = parseInt(maxTxt.replace('c+',''));
        }else{
            maxTxt = parseInt(maxTxt);
        }
        return today.fullYear + maxTxt;
    }
    function p_currDate(){
        return $datepicker.datepicker("getDate");
    }

    //  다음 해, 이전해, 이전 달, 다음 달 모두 적용
    function p_showMonth() {
        var $month = $datepicker.find(handlerM).parent().find('.ui-datepicker-Month');
        if($month.length == 0){
            $month = $("<span class='ui-datepicker-Month'><span>").appendTo($datepicker.find(handlerM).parent());
        }
        $month.text(p_getM.call($datepicker[0]) + 1 +"월");
    }

    function p_ctrlOptionDay() {
        var chkMode = $calendar.attr('data-mode');
        switch (chkMode) {
            case 'month' : $optionDayList.removeClass(actClass);
                break;
            case 'year' : $optionDayList.removeClass(actClass);
                break;
            default: $optionDayList.addClass(actClass);
                break;
        }
    }

    // 제목 삽입
    p_setTitle($titleY,$titleM,p_getY.call($datepicker[0]), p_getM.call($datepicker[0])+1);

    // 오늘 버튼
    $btnToday.click(function(){
        $(this).addClass(actClass).siblings().removeClass(actClass);
        $calendar.attr('data-mode','today');
        $datepicker.datepicker('setDate',  (today.month+1) +"/" + today.date + "/"+ today.fullYear);
        $datepicker.datepicker('option', {
            numberOfMonths: 1,
            showCurrentAtPos: 0
        });
        p_setTitle($titleY,$titleM,p_getY.call($datepicker[0]), p_getM.call($datepicker[0])+1);

        // marking hospital calendar list
        if(typeof setVisitHsptlCldrList !== "undefined"){
            setVisitHsptlCldrList();
        }

        // disable default date click
        p_disableDateClick($datepicker);

        // delete class
        $optionDayList.removeClass(actClass)

        // ax5 resize
        $('[data-ax5layout=ax0]').ax5layout({
            onResize: p_ctrlPatDiag()
        });
    });

    // 두달 버튼
    $btnMonth.click(function(){
        $(this).addClass(actClass).siblings().removeClass(actClass);
        $calendar.attr('data-mode','month');
        $datepicker.datepicker('option', {
            numberOfMonths: [1, 2],
            showCurrentAtPos: 1
        });

        p_setTitle($titleY,$titleM,p_getY.call($datepicker[0]), p_getM.call($datepicker[0])+1);

        // marking hospital calendar list
        if(typeof setVisitHsptlCldrList !== "undefined"){
            setVisitHsptlCldrList();
        }

        // disable default date click
        p_disableDateClick($datepicker);

        // contorl option day list
        p_ctrlOptionDay();

        // ax5 resize
        $('[data-ax5layout=ax0]').ax5layout({
            onResize: p_ctrlPatDiag()
        });
    });

    // 1년 버튼
    $btnYear.click(function(){
        $(this).addClass(actClass).siblings().removeClass(actClass);
        $calendar.attr('data-mode','year');
        // set date
        $datepicker.datepicker("setDate", "01/01/" + p_getY.call($datepicker[0]));
        // set option
        $datepicker.datepicker('option', {
            numberOfMonths: [4, 3],
            showCurrentAtPos: p_getM.call($datepicker[0])
        });

        // 년월일 타이틀 달기
        p_setTitle($titleY,$titleM,p_getY.call($datepicker[0]), p_getM.call($datepicker[0])+1);
        p_showMonth();

        // marking hospital calendar list
        if(typeof setVisitHsptlCldrList !== "undefined"){
            setVisitHsptlCldrList();
        }

        // disable default date click
        p_disableDateClick($datepicker);

        // contorl option day list
        p_ctrlOptionDay();

        // ax5 resize
        $('[data-ax5layout=ax0]').ax5layout({
            onResize: p_ctrlPatDiag()
        });
    });

    // 이전 해 버튼
    $btnPrevY.click(function(){
        if(p_getY.call($datepicker[0]) > p_minY()){
            $datepicker.datepicker('setDate', (p_getM.call($datepicker[0])+1) + '/'+ p_getD.call($datepicker[0]) + '/'+ (p_getY.call($datepicker[0])-1));
        }
        // 년월일 타이틀 달기
        p_setTitle($titleY,$titleM,p_getY.call($datepicker[0]),p_getM.call($datepicker[0])+1);
        p_showMonth();

        // marking hospital calendar list
        if(typeof setVisitHsptlCldrList !== "undefined"){
            setVisitHsptlCldrList();
        }

        // disable default date click
        p_disableDateClick($datepicker);
    });
    // 다음 해 버튼
    $btnNextY.click(function(){

        if(p_getY.call($datepicker[0]) < p_maxY()){
            $datepicker.datepicker('setDate', (p_getM.call($datepicker[0])+1) + '/'+ p_getD.call($datepicker[0]) + '/'+ (p_getY.call($datepicker[0])+1));
        }
        // 년월일 타이틀 달기
        p_setTitle($titleY,$titleM,p_getY.call($datepicker[0]),p_getM.call($datepicker[0])+1);
        p_showMonth();

        // marking hospital calendar list
        if(typeof setVisitHsptlCldrList !== "undefined"){
            setVisitHsptlCldrList();
        }

        // disable default date click
        p_disableDateClick($datepicker);
    });

    // 이전 달 버튼
    $btnPrevM.click(function(){
        if(p_getM.call($datepicker[0]) == 0 && p_getY.call($datepicker[0]) > p_minY()){
            $datepicker.datepicker('setDate', "12/01/"+ (p_getY.call($datepicker[0])-1));
        }else if(p_getM.call($datepicker[0]) > 0 && p_getY.call($datepicker[0]) >= p_minY()){
            $datepicker.datepicker('setDate', p_getM.call($datepicker[0]) +"/01/"+ p_getY.call($datepicker[0]));
        }
        // 년월일 타이틀 달기
        p_setTitle($titleY,$titleM,p_getY.call($datepicker[0]), p_getM.call($datepicker[0])+1);
        p_showMonth();

        // marking hospital calendar list
        if(typeof setVisitHsptlCldrList !== "undefined"){
            setVisitHsptlCldrList();
        }

        // disable default date click
        p_disableDateClick($datepicker);
    });

    // 다음 달 버튼
    $btnNextM.click(function(){
        if(p_getM.call($datepicker[0]) == 11 && p_getY.call($datepicker[0]) < p_maxY()){
            $datepicker.datepicker('setDate', "01/01/"+ (p_getY.call($datepicker[0])+1));

        }else if(p_getM.call($datepicker[0]) < 11 && p_getY.call($datepicker[0]) <= p_maxY()){
            $datepicker.datepicker('setDate', (p_getM.call($datepicker[0])+2) +"/01/"+ p_getY.call($datepicker[0]));
        }
        // 년월일 타이틀 달기
        p_setTitle($titleY,$titleM,p_getY.call($datepicker[0]), p_getM.call($datepicker[0])+1);
        p_showMonth();

        // marking hospital calendar list
        if(typeof setVisitHsptlCldrList !== "undefined"){
            setVisitHsptlCldrList();
        }

        // disable default date click
        p_disableDateClick($datepicker);

    });

    // option day button handler
    $btnOptDay.click(function(){
        p_ctrlOptionDay();
    });

    //달 실행
    $btnMonth.click();
    $('.date20180105').addClass('is_today');
    $('[data-ax5layout=ax0]').ax5layout({
        onResize: p_ctrlPatDiag()
    });
}

/*******************************************************
 * get related out element
 *
 * @param  obj {Selector}
 * @param arrObj {Array}
 * @returns : N/A
 * @description : related 타겟이 될 오브젝트와 그 오브젝트의 모든 노드를 담을
 * 배열 오브젝트를 지정한다. 필터
 *******************************************************/
function getRelated(obj, arrObj){
    if(arrObj.length == 0){
        arrObj.push(obj[0]);
    }
    if($(obj).children().length){
        for (var i=0; i < $(obj).children().length; i++) {
            arrObj.push($(obj).children().eq(i)[0]);
            getRelated($(obj).children().eq(i),arrObj);
        }
    }else{
        return
    }
}

/*******************************************************
 * define liblery
 *
 * @returns : N/A
 * @description :
 *******************************************************/
$.fn.extend({
    cmCheckbox : function(){
        if(this.length){
            this.each(function(idx, elem){
                var $checkbox = $(elem);
                var $input  = $checkbox.find('input');
                var actClass = 'is_active';
                // 체크박스 활성화
                if($input.prop('checked')){
                    $checkbox.addClass('is_active');
                }

                $checkbox.on('mouseover mouseout', function(evt){
                    var focusClass = 'is_focus';
                    switch (evt.type) {
                        case 'mouseover' :
                            $checkbox.addClass(focusClass);break;
                        case 'mouseout' :
                            $checkbox.removeClass(focusClass);break;
                    }
                });

                $input.on('change',function(){
                    console.log($input.prop('checked'));
                    if($input.prop('checked')){
                        $checkbox.addClass(actClass);
                        if($input.attr('type') == 'radio' && $input.prop('name')){
                            var names = $('[name='+$input.prop('name')+']');
                            for(var i=0; i<names.length; i++){
                                if(names[i] != $input[0]){
                                    $(names[i]).parent().removeClass(actClass);
                                }
                            }
                        }
                    }else{
                        $checkbox.removeClass(actClass);
                        // 이름이 같은  라디오 박스를 가지고 온다.
                    };
                });
            });
        }
    },
    cmGrid: function(){
        /***
         * @param data-cm-grid {boolean} : true or false, at table type
         * @param data-cm-grid-cell-focus {boolean} : true or false, at td type
         * @param data-cm-grid-cell-selected {boolean} : true or false, at td type
         * @param data-cm-grid-cell-cellholder {boolean} : true or false, at inine type
         * @param data-cm-grid-row-selected {boolean} : true or false, at row type
         * @param data-cm-grid-row-select-button {boolean} : true or false, at button type
         * @param data-cm-grid-row-delete-button {boolean} : true or false, at button type
         ***/
        if(this.length){
            this.each(function(idx, elem){
                var $table = $(elem);
                var rowSelect = 'data-cm-grid-row-selected';
                var cellFocus = 'data-cm-grid-cell-focus';
                var cellholder = 'data-cm-grid-cellholder';
                var btnRowSelect = 'data-cm-grid-row-select-button';
                var btnRowDelete = 'data-cm-grid-row-delete-button';
                var btnAllSelect = 'data-cm-grid-all-select-button';
                var $cells = $table.find('['+cellFocus+']');

                // cell focus handler
                $table.find('['+cellFocus+']').click(function(){
                    var $this = $(this);
                    $this.attr(cellFocus,'true')
                    $cells.not($this).attr(cellFocus,'false');
                });



                // row all select handler
                $table.find('['+ btnAllSelect +']').on('click',function(){
                    var $this = $(this);


                    if($this.attr(btnAllSelect)=='true'){
                        $this.attr(btnAllSelect,'false');
                        $table.find('['+rowSelect+']').attr(rowSelect,'false').find('['+cellFocus+']').attr(cellFocus,'false');
                    }else{
                        $this.attr(btnAllSelect,'true');
                        $table.find('['+ rowSelect + ']').attr(rowSelect,'true');
                    }
                });

                // row selector handler
                $table.find('['+btnRowSelect+']').click(function(){
                    var $this = $(this);
                    if($this.attr(btnRowSelect)=='true'){
                        $this.attr(btnRowSelect,'false');
                        $this.parents('['+rowSelect+']').attr(rowSelect,'false').find('['+cellFocus+']').attr(cellFocus,'false');
                    }else{
                        $this.attr(btnRowSelect,'true');
                        $this.parents('['+ rowSelect + ']').attr(rowSelect,'true');
                    }
                });

                // row delete handler
                $table.find('['+btnRowDelete+']').click(function(){
                    $(this).parents('['+rowSelect+']').remove();
                });

                // set cell holder
                $table.find('['+cellholder+']').each(function(idx, elem){
                    var $holder =  $(elem);
                    var $inputbox = $holder.find('input');
                    $holder.data('input', $inputbox);
                    $inputbox.width(60);
                    $table.parent().append($inputbox);
                    $inputbox.hide();
                    // value 값이 있는지 확인하고 없으면 플레이스 홀더를 넣는다.
                    if($inputbox.val()==''){
                        $holder.text($inputbox.attr('placeholder'));
                    }else{
                        $holder.text($inputbox.val());
                    }
                });
                /**
                 * set p_editActive
                 *
                 * @param holder {selector}
                 * @param inputbox {selector}
                 * @param table {selector}
                 * @return N/A
                 **/
                function p_editActive (holder,inputbox,table){
                    if(inputbox){
                        var txt = holder.text();
                        holder.text('');
                        holder.append(inputbox);
                        inputbox.show().focus().val(txt);
                    }
                }

                /**
                 * set p_editComplete
                 *
                 * @param holder {selector}
                 * @param inputbox {selector}
                 * @param table {selector}
                 * @return N/A
                 **/
                function p_editComplete(holder,inputbox,table){
                    if(inputbox){
                        if(inputbox.val() == ''){
                            holder.text(inputbox.attr('placeholder'));
                        }else{
                            holder.text(inputbox.val());
                        }
                        inputbox.appendTo(table.parent()).hide();
                    }
                }

                $(window).on('keyup dbclick click', function(evt){
                    var $actHolder = $table.find('['+cellFocus+'=true]').find('['+cellholder+']');
                    if(evt.type == "keyup"){
                        if($actHolder.attr(cellholder) == 'false'){
                            p_editActive($actHolder,$actHolder.data('input'),$table);
                            $actHolder.attr(cellholder,'true');
                        }

                        if(evt.keyCode == 13 || evt.keyCode == 9){
                            p_editComplete($actHolder,$actHolder.data('input'),$table);
                            $actHolder.attr(cellholder,'false');
                        }
                    }else{
                        var $holder = $table.find('['+cellFocus+'=false]').find('['+cellholder+']');
                        $holder.each(function(idx,elem){
                            var $this = $(elem);
                            p_editComplete($this,$this.data('input'),$table);
                            $actHolder.attr(cellholder,'false');
                        });
                    }
                });

                if($table.length && $table.attr('data-cm-scrolltable') == 'true'){
                    var h = $table.attr("data-cm-scrolltable-height");
                    var bgcolor = $table.attr("data-cm-scrolltable-bgcolor");
                    var tHeadH = 0;
                    var tbodyH = 0;
                    var $cloneTable = $table.before($(this).clone()).prev();
                    var $wrapper =  $table.before('<div> </div>').prev();
                    var $tableWrap =  $table.before('<div> </div>').prev();

                    $tableWrap.append($table).css({height: '100%',overflowY: 'auto',backgroundColor: bgcolor});
                    $tableWrap.mCustomScrollbar();

                    $cloneTable.find('tbody').remove();
                    $cloneTable.css({position: 'absolute',left: 0,top: 0,zIndex: 10});
                    $table.find('thead').addClass('blind');
                    $wrapper.append($cloneTable).append($tableWrap).css({position: 'relative',paddingTop: $cloneTable.height(),height: h});
                }

            });
        }
    },

    cmScrollTable: function(){
        this.each(function(idx,elem){
            /***
             * scroll Table
             *
             * @param data-cm-scrolltable {boolean} : true or false
             * @param data-cm-scrolltable-height {number|percent} : number or 100%
             * @param data-cm-scrolltable-bgcolor : (string | # 16진수)
             * @returns : N/A
             ***/
            var $table = $(elem);
            if($table.length && $table.attr('data-cm-scrolltable') == 'true'){
                var h = $table.attr("data-cm-scrolltable-height");
                var bgcolor = $table.attr("data-cm-scrolltable-bgcolor");
                var tHeadH = 0;
                var tbodyH = 0;
                var $cloneTable = $table.before($(this).clone()).prev();
                var $wrapper =  $table.before('<div> </div>').prev();
                var $tableWrap =  $table.before('<div> </div>').prev();

                $tableWrap.append($table).css({height: '100%',overflowY: 'auto',backgroundColor: bgcolor});
                $cloneTable.find('tbody').remove();
                $cloneTable.css({position: 'absolute',left: 0,top: 0,zIndex: 10});
                $tableWrap.mCustomScrollbar({
                    axis: 'yx',
                    theme: 'gray-thick'
                });
                $table.find('thead').addClass('blind');
                $wrapper.append($cloneTable).append($tableWrap).css({position: 'relative',paddingTop: $cloneTable.height(),height: h});
            }
        });
    },
    cmTab : function(){
        /***
         * @param data-cm-tab {selector} : class or id
         * @param data-cm-tab-content {selector} : class
         * @param data-cm-tab-target {selector} : class
         ***/
        this.each(function(idx, elem){
            var $this = $(elem);
            var actClass= "is_active";
            var $tab = $this.find($this.attr('data-cm-tab'));
            var $tabContent = $this.find($this.attr('data-cm-tab-content'));
            var display = $tabContent.children().css('display');
            $tabContent.children().hide();

            $tab.children().each(function(idx, elem){
                var $this = $(elem);
                var tabTarget = $this.attr('data-cm-tab-target');
                function p_action(){
                    if(tabTarget){
                        if($this.hasClass(actClass)){
                            $tabContent.find(tabTarget).show().siblings().hide();
                        }
                    }else{
                        if($this.hasClass(actClass)){
                            $tabContent.find('>:nth-child('+ (idx+1) +')').show().siblings().hide();
                        }
                    }
                }
                p_action();

                $this.click(function(){
                    $(this).addClass(actClass).siblings().removeClass(actClass);

                    p_action();
                    return false;
                });
            });
        });
    },
    cmInputBox: function(){
        this.each(function(idx, elem){
            /*
            var $elem = $(elem);
            var iptType = this.attr('data-cm-inputbox');
            switch(iptType){
                case 'inline' $elem:
                var $('span').before();
            }
            */

        });
    },
    cmTooltip : function(){

        /***
         *	data-cm-tooltip-placement : (bottom | top | left | right)
         *	data-cm-tooltip-target : selector
         *	data-cm-tooltip-theme : (yellow | darkgreen | normal)
         *	data-cm-tooltip-container : selector
         *	data-cm-tooltip-space : 1, 2 10.... number
         ***/
        this.each(function(idx,elem){
            var $this = $(elem);
            // define variable
            if($this.data('chkTip')){
                return;
            }
            $this.data('chkTip',true);
            $this.css('position','relative');

            var tooltip = '<div class="cm_tooltip_primary"><div class="cm_tooltip_primary_inner"> </div></div>';
            var target = 'data-cm-tooltip-target';
            var events = $this.attr('data-cm-tooltip-events');

            var $tooltip = $this.attr(target) ?
                $($this.attr(target)) : $(tooltip).children().eq(0).text($this.attr('title')).parent();
            $this.attr('title','');
            // create arrow and get theme
            if($tooltip.hasClass("cm_tooltip_primary")){
                var $arrow = $("<div class='cm_tooltip_primary_arrow'> </div>").appendTo($tooltip.children().eq(0));
                if($this.attr("data-cm-tooltip-theme")){
                    $tooltip.children().eq(0).addClass('cm_tooltip_primary_inner--' + $this.attr("data-cm-tooltip-theme"));
                }
                // set padding
                switch(placement){
                    case 'left' : $tooltip.css('padding-right',$arrow.width());
                        break;
                    case 'top' :  $tooltip.css('padding-bottom',$arrow.height());
                        break;
                    case 'right' : $tooltip.css('padding-left',$arrow.width());
                        break;
                    case 'bottom' : $tooltip.css('padding-top',$arrow.height());
                        break;
                }
            }

            // 	define variable
            var	placement = $this.attr("data-cm-tooltip-placement"),
                space = parseInt($this.attr("data-cm-tooltip-space") ? $this.attr("data-cm-tooltip-space") : 5);
            var	container = $this.attr("data-cm-tooltip-container");

            // set tooltip
            $tooltip.css({position: 'absolute', zIndex: idx + 10});

            // all element attach to body and get width, height
            $tooltip.appendTo('body').css('white-space','nowrap');
            var tipW = $tooltip.outerWidth(true);
            var tipH = $tooltip.height();


            // set container
            if(container){
                if(container == 'self'){
                    $tooltip.appendTo($this);
                }else{
                    $tooltip.appendTo($(container));
                }
            }
            $tooltip.addClass('id_tooltip' + idx);
            $tooltip.hide();

            // set body placement
            function p_placement(){
                var thisPosLeft = container ? 0 : $this.offset().left;
                var thisPosTop = container ? 0 : $this.offset().top;
                var thisW = $this.width();
                var thisH = $this.height();
                var	comLeft = thisPosLeft - ( tipW - thisW)/2;
                var	comTop = thisPosTop;

                switch(placement){
                    case 'left' :
                        if($arrow){ $arrow.attr("data-cm-tooltip-arrow","right"); }
                        $tooltip.css({left: thisPosLeft - tipW + space - 3, top: comTop, width: tipW, height: tipH, paddingRight: space});
                        break;
                    case 'top' :
                        if($arrow){ $arrow.attr("data-cm-tooltip-arrow","bottom"); }
                        $tooltip.css({left: comLeft , top: thisPosTop - tipH - space - 3, width: tipW, height: tipH, paddingBottom: space});
                        break;
                    case 'right' :
                        if($arrow){ $arrow.attr("data-cm-tooltip-arrow","left"); }
                        $tooltip.css({left: thisPosLeft + thisW + space - 3, top: comTop, width: tipW, height: tipH, paddingLeft: space});
                        break;
                    case 'bottom' :
                        if($arrow){ $arrow.attr("data-cm-tooltip-arrow","top"); }
                        $tooltip.css({left: comLeft , top:  thisPosTop + thisH + space - 3, width: tipW, height: tipH, paddingTop: space});
                        break;
                }
            }

            events =  events ? events : 'mouseover focusin';
            $this.on(events, function(evt){
                console.log(events);
                p_placement();
                $tooltip.stop().fadeIn(200);
            });

            // mouseout event
            $tooltip.on('mouseout',function(evt){
                var relatedTips=[];
                getRelated($tooltip,relatedTips);

                var chkEvt = true;
                for (var i=0; i<relatedTips.length; i++) {
                    if((evt.relatedTarget == relatedTips[i] || evt.relatedTarget == $this[0]) && container){
                        chkEvt = false;
                    }
                }

                if(chkEvt){
                    $tooltip.hide();
                }
                //evt.stopPropagation();
            });

            $this.on('mouseout',function(evt){
                // get related target
                var relatedTips=[];
                getRelated($tooltip,relatedTips);

                var chkEvt = true;
                for (var i=0; i<relatedTips.length; i++) {
                    if(evt.relatedTarget == relatedTips[i] && container){
                        chkEvt = false;
                    }
                }

                if(chkEvt){
                    $tooltip.hide();
                }
                //evt.stopPropagation();
            });
        });
    }
});

/*******************************************
 * 토글 패널 함수
 *
 * @param : objs (string | array)
 ********************************************/
function p_hideElem(objs){
    if(typeof(objs) == 'string'){
        $(objs).hide();
    }else{
        for(x in objs){
            $(objs[x]).hide();
        }
    }
}

/*******************************************
 * element show fn
 *
 * @param : objs (string | array) selector
 ********************************************/
function p_showElem(objs){
    if(typeof(objs) == 'string'){
        $(objs).show();
    }else{
        for(x in objs){
            $(objs[x]).show();
        }
    }
}

/*******************************************
 * transform to json string
 *
 * @param object {Object} :
 * @return :
 * @description :
 ********************************************/
function JSONtoString(object) {
    var results = [];
    for (var property in object) {
        var value = object[property];
        if (value)
            results.push( property.toString()  + ': ' + "'" + value + "'");
    }
    return '{' + results.join(', ') + '}';
}

/*******************************************
 * control all_size button
 ********************************************/
function p_ctrlAllSzie(){
    var $panel = $(this);
    var mcsbContainer = 'mCSB_container';
    var synthesizePanel = 'cm_panel_post--synthesize';
    var diagHistoryPanel = 'cm_panel_diag-history';
    var containerDiag = 'cm_container_diag';
    var containerPatInfo = 'cm_container_pat-info';
    if($panel.data('chkSize')){
        var $wrap = $panel.parent();
        var w = $wrap.offset().left + $wrap.width();
        $panel.css({position: 'fixed',left: 0,top: 0,width: w,height: window.innerHeight});
        $wrap.css({zIndex: 20}).siblings({zIndex: 10});

        if($panel.hasClass(synthesizePanel)){
            $panel.find('.' + diagHistoryPanel).find('.' + mcsbContainer).addClass('clearfix').children().addClass('col-6');
            $panel.find('.' + diagHistoryPanel).find('.' + mcsbContainer).find('>:nth-child(n+2)').addClass('fl');
            $panel.find('.' + diagHistoryPanel).find(':after').show();
        }

        $('.' + containerDiag).css('z-index', 10).siblings('.' + containerPatInfo).css('z-index', 0);
    }else{
        $panel.removeAttr('style');
        $('.' + containerDiag).removeAttr('style');
        $('.' + containerPatInfo).removeAttr('style');

        if($panel.hasClass(synthesizePanel)){
            $panel.find('.' + diagHistoryPanel).find('.' + mcsbContainer).removeClass('clearfix').children().removeClass('col-6');
            $panel.find('.' + diagHistoryPanel).find('.' + mcsbContainer).find('>:nth-child(n+2)').removeClass('fl');
            $panel.find('.' + diagHistoryPanel).find(':after').hide();
        }
    }
}

/*******************************************
 * set minimum config
 *
 * @return N/A
 ********************************************/
function p_setAxCfg(cusCfg){
    var cfg = $(this).attr('data-split-panel') ?  $(this).attr('data-split-panel') : $(this).attr('data-dock-panel');
    if(cfg){
        cfg = ax5.util.parseJson(cfg,true);
        for (var i in cusCfg){
            cfg[i] = cusCfg[i];
        }
        cfg = JSONtoString(cfg);
        if($(this).attr('data-split-panel')){
            $(this).attr('data-split-panel',cfg);
        }else{
            $(this).attr('data-dock-panel',cfg);
        }
    }
}

/*******************************************
 * control min button
 *
 * @return N/A
 ********************************************/
function p_ctrlMin(){
    var $panel = $(this);
    var myAx5 = axPanels();
    var $ax1_1_1 = $(myAx5.ax1_1_1.layout);
    var $ax1_1 = $(myAx5.ax1_1.layout);
    // 축소되었을 때
    if($panel.data('chkMin')){
        // hide body content
        $panel.find('.cm_panel_post_body').hide();
        var panelCfg = ax5.util.parseJson( $panel.attr('data-split-panel') ? $panel.attr('data-split-panel') : $panel.attr('data-dock-panel'),true);
        p_setAxCfg.call($panel[0],{height: panelCfg.minHeight, maxHeight: panelCfg.minHeight});

        // control ax1_1_1
        if($panel.hasClass(myAx5.ax1_1_1.panels[1]) && !$('.'+ myAx5.ax1_1_1.panels[0]).data('chkMin')){
            p_setAxCfg.call($('.'+myAx5.ax1_1_1.panels[0])[0],{height: '*'});
        }else if($panel.hasClass(myAx5.ax1_1_1.panels[3]) && !$('.'+myAx5.ax1_1_1.panels[2]).data('chkMin')){
            p_setAxCfg.call($('.'+myAx5.ax1_1_1.panels[2])[0],{height: '*'});
        }

        if($panel.parents(myAx5.ax1_1_1.layout).length){
            // increase close number
            var origNum = $ax1_1_1.data('closeNum');
            if(origNum){
                $ax1_1_1.data('closeNum',origNum + 1);
            }else{
                $ax1_1_1.data('closeNum', 1);
            }
        }

        // if colse number is 4
        if($ax1_1_1.data('closeNum') == 4){
            var ax1_1_1_cfg = ax5.util.parseJson($ax1_1_1.parent().attr('data-split-panel'),true);
            p_setAxCfg.call($ax1_1_1.parent()[0],{height: ax1_1_1_cfg.minHeight});

            if($panel.hasClass(myAx5.ax1_1.panels[1])){
                $ax1_1_1.find('.cm_btnico_utils2--min').click();
            }
        }
        // 확대되었을 때
    }else{
        $panel.find('.cm_panel_post_body').show();
        p_setAxCfg.call($panel[0],{height: '*'});

        //p_setAxCfg.call($ax1_1_1.parent()[0],{height: ax1_1_1_cfg.minHeight});

        if($ax1_1_1.data('closeNum') == 4){
            p_setAxCfg.call($ax1_1_1.parent()[0],{height: '*'});

            if($('.'+myAx5.ax1_1.panels[1]).data('closeNum')){
                $('.'+myAx5.ax1_1.panels[1]).click();
            }
        }

        var origNum = $ax1_1_1.data('closeNum');
        if(origNum){
            $ax1_1_1.data('closeNum',origNum - 1);
        }else{
            $ax1_1_1.data('closeNum', 0);
        }

    }
    $('[data-ax5layout]').ax5layout();
}

/*******************************************
 * define utility interface
 ********************************************/
function p_interfaceUtils(){
    // 유틸 버튼 공통
    $('[class*=cm_btnico_utils]').on('click', function(){
        var actClass = 'is_active';
        var $this = $(this);
        if($this.hasClass(actClass)){
            $this.removeClass(actClass);
        }else{
            $this.addClass(actClass);
        }
    });

    $('.cm_btnico_utils2--min').each(function(idx, elem){
        $(elem).click(function(evt){
            var $panel = $(this).parents('[class*=id_ax]').eq(0);
            if($panel.data('chkMin')){
                $panel.data('chkMin',0);
            }else{
                $panel.data('chkMin',1);
            }
            p_ctrlMin.call($panel[0]);
        });
    });

    $('.cm_btnico_utils2--all_max').each(function(idx, elem){
        $(elem).click(function(){
            var $panel = $(this).parents('[class*=id_ax]').eq(0);
            if($panel.data('chkSize')){
                $panel.data('chkSize',0);
            }else{
                $panel.data('chkSize',1);
            }
            p_ctrlAllSzie.call($panel[0]);
        });
    });

    $('.cm_btnico_utils2--vert_max').each(function(idx, elem){
        $(elem).click(function(){
            var $panel = $(this).parents('[class*=id_ax]').eq(0);
            if($panel.data('chkVertMax')){
                $panel.data('chkVertMax',0);
            }else{
                $panel.data('chkVertMax',1);
            }
            p_ctrlVertMax.call($panel[0]);
        });
    });

}

/*******************************************
 * 메모 줄메모 활성화 handler
 ********************************************/
function ctrlSymptom(){

    $('.cm_panel_post--symptom').each(function(){
        var $this = $(this);
        var actClass = "is_active",
            $btnMemo = $this.find('.cm_btnico_utils4--memo'),
            $btnLine = $this.find('.cm_btnico_utils4--line'),
            $memo = $this.find('.cm_textarea_primary_wrap--line'),
            $line = $this.find('.cm_panel_linememo');

        // 숨김
        $memo.hide();
        $line.hide();

        if($btnMemo.hasClass(actClass)){
            $memo.show();
            $line.hide();
        }else if($btnLine.hasClass(actClass)){
            $line.show();
            $memo.hide();
        }

        $btnMemo.click(function(){
            $(this).addClass(actClass);
            $btnLine.removeClass(actClass);
            $memo.show()
            $line.hide();
        });
        $btnLine.click(function(){
            $(this).addClass(actClass);
            $btnMemo.removeClass(actClass);
            $line.show();
            $memo.hide();
        });
    });
}

/*******************************************
 * 묶음 증상 리스트 토글 handler
 ********************************************/
$('.cm_btnico_utils3--symptom').click(function(){
    var actClass = 'is_active';
    $(this).addClass(actClass);
    $('.cm_panel_symptom-list').children().show().click(function(){
        var $this = $(this);
        var idx = $this.addClass(actClass).index();
        $('.cm_panel_symptom-result').css('display','table-row').find('.cm_panel_symptom-result_item').eq(idx).show().siblings().hide();
    });
});

/*******************************************
 * select checkbox
 *
 * @returns : N/A
 ********************************************/
function selectCheckbox(){
    // 반복 방지
    if($('.cm_select_checkbox').data('createCheckbox')){
        return;
    }

    $('.cm_select_checkbox').each(function(){
        var actClass = 'is_active';
        var $selectCheckbox = $(this);
        var $list = $selectCheckbox.find('.cm_select_checkbox_list');
        $selectCheckbox.find('input').each(function(){
            if($(this).prop('checked')){
                p_setCurrText.call($(this)[0]);
            }
        });

        // 텍스트 설정.
        function p_setCurrText(){
            var $this = $(this);
            var $val = $('<span>' + $this.val() + '</span>').appendTo($('.cm_select_checkbox_txt'));
            $this.data('coupleEl',$val);
            $this.parents('li').addClass(actClass);
        }

        $selectCheckbox.on('click mouseout', function(evt){
            var relatedObjs = [];
            if(evt.type=="click"){
                $selectCheckbox.addClass(actClass);
            }else{
                getRelated($list, relatedObjs);
                getRelated($selectCheckbox, relatedObjs);
                var chkEvt = true;
                for (var i=0; i<relatedObjs.length; i++) {
                    if(evt.relatedTarget == relatedObjs[i]){
                        chkEvt = false;
                    }
                }
                if(chkEvt){
                    $selectCheckbox.removeClass(actClass);
                }
            }
        });

        $list.find('input').on('change',function(){
            var $input = $(this);
            if($input.prop('checked')){
                p_setCurrText.call($input[0]);
            }else{
                $input.parents('li').removeClass(actClass);

                if($input.data('coupleEl')){
                    $input.data('coupleEl').remove();
                }
            }
        });

    });
}


/*******************************************
 * ax0Panels
 *
 * @returns : Object
 ********************************************/
function ax0Panels() {
    return {
        0: 'id_ax0-panel-1',
        1: 'id_ax0-panel-2'
    }
}

/**********************************************
 * control pat diag panel
 *
 * @returns : N/A
 **********************************************/

function p_ctrlPatDiag(){
    var actClass = 'is_active';
    var ax0 = '[data-ax5layout=ax0]';
    var minH = 29;
    var patDiag = 'cm_panel_pat-diag';

    if($('.' + patDiag).length){
        $('.' + patDiag).height($(document).height() - $('.' + patDiag).offset().top);
        if($(ax0).length){
            $(ax0).height($(document).height() - $(ax0).offset().top);
        }
    }

    // 달력의 data-mode 가 year인지 체크
    if($('.cm_calendar_multi').attr('data-mode') == 'year'){
        if($(this).data('chkClick')){
            p_setAxCfg.call($('.'+ax0Panels()[0])[0],{height: $(ax0).height(),minHeight: minH});

            $('.'+ax0Panels()[1]).css('overflow','hidden');
            p_setAxCfg.call($('.'+ax0Panels()[1])[0],{height: '0',minHeight: minH});
            $(this).data('chkClick',0);
        }else{
            p_setAxCfg.call($('.'+ax0Panels()[0])[0],{height: '0',minHeight: minH});
            $('.'+ax0Panels()[0]).css('overflow','hidden');
            p_setAxCfg.call($('.'+ax0Panels()[1])[0],{height: $(ax0).height(),minHeight: minH});

            $(this).data('chkClick',1);
        }
    }else{
        p_setAxCfg.call($('.'+ax0Panels()[0])[0],{height: '*',minHeight: minH});
        p_setAxCfg.call($('.'+ax0Panels()[1])[0],{height: '*',minHeight: minH});
    }
}

/************************************
 * 레코드 클래스 토글
 * @return : N/A
 ************************************/
function toggleRecord(){
    var $record = $('.cm_panel_date-record');
    var $recordContent = $('.cm_panel_date-record_content');
    if($record.data('applyEvent')){return}

    $record.find('.cm_btnico_record').click(function(){
        if($(this).hasClass('is_active')){
            $(this).removeClass('is_active').parents($record.selector).find($recordContent.selector).hide();;
        }else{
            $(this).addClass('is_active').parents($record.selector).find($recordContent.selector).show();
        }
    });
}

/************************************
 * 검색결과 컨트롤
 * @param this {Object} : srch Object
 * @param btn {Class} : search button
 * @param r {Class} : result
 * @return : N/A
 ************************************/
function p_ctrlSrch(btn,srchResult){
    var $srch = $(this);
    $srch.find(btn).click(function(){
        $srch.find(srchResult).show();
    });

    $srch.find(srchResult).on('mouseout', function(evt){
        var arrObj = [];
        var chkEvt = true;

        getRelated($(this), arrObj);
        console.log(arrObj);
        for (var i=0; i<arrObj.length; i++) {

            if(evt.relatedTarget == arrObj[i]){
                console.log('.');
                chkEvt = false;
                break;
            };

        }
        if(chkEvt){
            $(this).hide();
        }
    });
}

/************************************
 * 포커스 컨트롤
 * @param this {Object} : srch Object
 * @param target {Classes} :  class, class
 * @return : N/A
 ************************************/
function p_focus(target) {
    var actClass = 'is_active';
    var arrT = target.split(',');
    $(this).on('focusin focusout',function(evt){
        if(evt.type == "focusin"){
            for (var i=0; i<arrT.length; i++) {
                $(arrT[i]).addClass(actClass);
            }
        }else{
            for (var i=0; i<arrT.length; i++) {
                $(arrT[i]).removeClass(actClass);
            }
        }
    });
}
/*******************************************
 * axDockerGroup
 *
 * @return : N/A
 *******************************************/
function createDocker() {
    var myDocker = new ax5.ui.docker();
    myDocker.setConfig({
        target: $('[data-ax5docker="docker1"]'),
        icons: {
            close: 'X',
            more: '▼'
        },
        // panels 구조 사전 정의. 없으면 패널동작안함
        panels: [
            {
                type: "row",
                panels: [
                    {
                        type: "column",
                        panels: [
                            {
                                type: "row",
                                panels: [
                                    {
                                        type: "column",
                                        panels: [
                                            {
                                                type: "panel",
                                                name: "접수메모",
                                                moduleName: "content",
                                                moduleState: {
                                                    key: "pane0_0_0_0"
                                                }
                                            },
                                            {
                                                type: "panel",
                                                name: "진료메모",
                                                moduleName: "content",
                                                moduleState: {
                                                    key: "pane0_0_0_1"
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        type: "column",
                                        panels: [
                                            {
                                                type: "panel",
                                                name: "알레르기",
                                                moduleName: "content",
                                                moduleState: {
                                                    key: "pane0_0_1_0"
                                                }
                                            },
                                            {
                                                type: "panel",
                                                name: "과거력",
                                                moduleName: "content",
                                                moduleState: {
                                                    key: "pane0_0_1_1"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: "stack",
                                panels: [
                                    {
                                        type: "panel",
                                        name: "과거차트",
                                        moduleName: "content",
                                        moduleState: {
                                            key: "pane0_0_2_0"
                                        }
                                    },
                                    {
                                        type: "panel",
                                        name: "병리검사",
                                        moduleName: "content",
                                        moduleState: {
                                            key: "pane0_0_2_1"
                                        }
                                    },
                                    {
                                        type: "panel",
                                        name: "방사선",
                                        moduleName: "content",
                                        moduleState: {
                                            key: "pane0_0_2_2"
                                        }
                                    },
                                    {
                                        type: "panel",
                                        name: "예방접종",
                                        moduleName: "content",
                                        moduleState: {
                                            key: "pane0_0_2_3"
                                        }
                                    },
                                    {
                                        type: "panel",
                                        name: "약",
                                        moduleName: "content",
                                        moduleState: {
                                            key: "pane0_0_2_4"
                                        }
                                    },
                                    {
                                        type: "panel",
                                        name: "묶음처방",
                                        moduleName: "content",
                                        moduleState: {
                                            key: "pane0_0_2_5"
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: "column",
                        panels: [
                            {
                                type: "panel",
                                name: "증상",
                                moduleName: "content",
                                moduleState: {
                                    key: "pane0_1_0"
                                }
                            },
                            {
                                type: "panel",
                                name: "진단",
                                moduleName: "content",
                                moduleState: {
                                    key: "pane0_1_1"
                                }
                            },
                            {
                                type: "panel",
                                name: "처방",
                                moduleName: "content",
                                moduleState: {
                                    key: "pane0_1_2"
                                }
                            },
                            {
                                type: "panel",
                                name: "청구메모",
                                moduleName: "content",
                                moduleState: {
                                    key: "pane0_1_3"
                                }
                            }
                        ]
                    }
                ]
            }
        ],
        disableClosePanel: true,
        disableDragPanel: false,
        control: {
            before: function (that, callback) {
                if (that.controlType === "destroy") {
                    if (confirm("Do you want to Delete?")) {
                        setTimeout(function () {
                            callback();
                        }, 300);

                        return;
                    }
                } else {
                    callback();
                    return;
                }
            }
        },
        menu: {
            theme: 'default',
            position: "absolute",
            icons: {
                'arrow': '▸'
            }
        }
    });

    myDocker.addModule({
        "content": {
            // module.init은 각 panel에 속성 name과 item 초기값 결정
            // container["$element"] = panel.$item
            // state.key = panel.moduleState.key
            // <div data-ax5docker-pane-item~> 안에 <section>~</section>
            init: function (container, state) {
                $("section[data-key = " + state.key + "]").each(function () {
                    //각 section에 대해 attribute 'data-key'가 현재 panel의 state.key와 일치하면 section을 panel의 item에 대입
                    container['$element'].html(this);
                });
            },
            active: function (container, state) {
                // console.log(state, "active");
            },
            deactive: function (container, state) {
                // console.log(state, "deactive");
            },
            destroy: function (container, state) {
                // console.log(state, "destroy");
            }
        }
    });

    // <div class="title"> 안에 panel.name = <header>~</header>
    $("header").each(function () {
        //각 header element 속성값'data-key'이 myDocker의 panels.moduleState.key와 일치하면 header를 해당 panel의 name에 대입
        var key = $(this).attr("data-key");
        var p = myDocker.searchPanel(function (panel) {
            return (panel.moduleState.key == key);
        });
        if (p)
            p.name = $(this).prop('outerHTML');
    });

    myDocker.repaint(); //각 panel이 html에 그려짐

    // <div class="title">의 padding = 0 하여 <header>와 사이 여백 제거
    $('div.title').addClass('pd-0');

    // 기존 appendPanel에 대한 call과 return은 oldAppend가 대체
    var oldAppend = myDocker.appendPanel;
    // appendPanel 확장, 정의
    myDocker.appendPanel = function () {
        // 기존 appendPanel의 call, return 값 저장
        var result = oldAppend.apply(this, arguments);
        // 기존 appendPanel은 panel을 원래 형태로 다시 그리므로 <div class="title"> padding = 0 다시 적용
        $('div.title').addClass('pd-0');
        // 기존 appendPanel의 return값
        return result;
    };

    //
    var oldRepaint = myDocker.repaint;
    //
    myDocker.repaint = function () {
        //
        var result = oldRepaint.apply(this, arguments);
        //버튼 다시 추가
        $("ul[data-ax5docker-path]").append($("#panebtn1"));
        //
        return result;
    };
}
/******************************************************
 *  Document ready  !!!!
 ******************************************************/
$(function(){

    createDocker();

    $("ul[data-ax5docker-path]").append($("#panebtn1"));

    $('button.cm_btnico_utils2--min').click(function(){
        if($(this).data('chkMin')){
            $(this).data('chkMin',0);
            $(this.closest("div[data-ax5docker-path]")).css("flex-grow","1");
        }else{
            $(this).data('chkMin',1);
            $(this.closest("div[data-ax5docker-path]")).css("flex-grow","0");
        }
    });


    // excute  cm_checkbox_circle
    $('[class*=cm_checkbox]').cmCheckbox();

    // ax5layout excute
    $('[data-ax5layout]').ax5layout({
        bind: {
            target: $('[data-ax5layout=ax0]'),
            onResize: p_ctrlPatDiag()
        }
    });

    // excute p_focus
    p_focus.call($('.cm_srch_primary_wrap').find('input')[0],'.cm_srch_primary_wrap, .cm_srch_primary_wrap .cm_btnico_srch');
    p_focus.call($('.cm_srch_primary_wrap').find('.cm_btnico_srch')[0],'.cm_srch_primary_wrap, .cm_srch_primary_wrap .cm_btnico_srch');

    // srch 컨트롤
    p_ctrlSrch.call($('.cm_srch_primary')[0],'.cm_btnico_srch','.cm_srch_primary_result');

    // cm_btnico_more--diag click
    $('.cm_btnico_more--diag').click(function(){
        var ax0 = '[data-ax5layout=ax0]';
        var minH = 29;

        if($(this).data('chkClick')){
            p_setAxCfg.call($('.'+ax0Panels()[0])[0],{height: $(ax0).height(),minHeight: minH});
            $('.'+ax0Panels()[1]).css('overflow','hidden');
            p_setAxCfg.call($('.'+ax0Panels()[1])[0],{height: '0',minHeight: minH});
            $(this).data('chkClick',0);
        }else{
            p_setAxCfg.call($('.'+ax0Panels()[0])[0],{height: '0',minHeight: minH});
            $('.'+ax0Panels()[0]).css('overflow','hidden');
            p_setAxCfg.call($('.'+ax0Panels()[1])[0],{height: $(ax0).height(),minHeight: minH});

            $(this).data('chkClick',1);
        }
        $('[data-ax5layout=ax0]').ax5layout();
    });

    // define common variable
    var actClass = "is_active";

    $('.cm_panel_pat-baseinfo_attention').click(function(){
        $('.id_tooltip2').hide();
    });

    // execute grid
    $('[data-cm-grid=true]').cmGrid();

    // excute interface utils
    p_interfaceUtils();

    // primary tooltip
    $('[data-cm-tooltip=true]').cmTooltip();

    // 탭 기능 구현
    $('[data-cm-tab]').cmTab();

    // 탭 기능 구현
    $('[data-cm-scrolltable]').cmScrollTable();

    // 나이스 셀렉터
    $('[class*=cm_select] select').niceSelect();

    // define outline class when focus
    $('.cm_ipttxt_code').on('focusin focusout', function(evt){
        if(evt.type == "focusin"){
            $(this).addClass('is_focus');
        }else if(evt.type == "focusout"){
            $(this).removeClass('is_focus');
        }
    });

    // scroll
    console.log('ready to scroll!');
    $('[data-scroll=true]').mCustomScrollbar({
        axis: 'yx',
        theme: 'gray-thick'
    });

    // 차트 프로그램
    function p_chart() {
        var data = [
            ['외래', 12],
            ['', 12]
        ];
        var data2 = [
            ['내시경', 30],
            ['', 20]
        ];
        var data3 = [
            ['검진', 26],
            ['', 20]
        ];

        var defGrid = {
            drawBorder: false,
            drawGridlines: false,
            background: 'transparent',
            shadow:false
        }
        var def = {
            // make this a donut chart.
            renderer:$.jqplot.DonutRenderer,
            rendererOptions:{
                padding: 0,
                // Donut's can be cut into slices like pies.
                sliceMargin: 0,
                // Pies and donuts can start at any arbitrary angle.
                startAngle: 130,
                showDataLabels: true,
                // By default, data labels show the percentage of the donut/pie.
                // You can show the data 'value' or data 'label' instead.
                dataLabels: 'value',
                // "totalLabel=true" uses the centre of the donut for the total amount
                totalLabel: false,
                shadowAlpha: 0,
                diameter: 90,
                innerDiameter: 70,
                highlightMouseOver: false
            }
        }

        var plot1 = $.jqplot('chart', [data], {
            grid: defGrid,
            seriesDefaults: def,
            seriesColors:['#7baec0','#e0e2e5']
        });

        var plot2 = $.jqplot('chart2', [data2], {
            grid: defGrid,
            seriesDefaults:	def,
            seriesColors:['#92a4be','#e0e2e5']
        });

        var plot3 = $.jqplot('chart3', [data3], {
            grid: defGrid,
            seriesDefaults:	def,
            seriesColors:['#e4b1b1','#e0e2e5']
        });
    }

    // 증상 panel control
    ctrlSymptom();

    // cm_table_case3--family hover 이벤트
    $('.cm_table_case3--family').find('tr').hover(function(){
        $(this).find('.cm_btnico_delete').addClass('is_active');
    },function(){
        $(this).find('.cm_btnico_delete').removeClass('is_active');
    });

    // execute calendar
    p_calendar();

    // select checbox
    selectCheckbox();

    $('.cm_datepicker_primary').find('input').datepicker({
        showOn: "both",
        buttonImageOnly: true,
        buttonImage: "images/btnico_datepicker.png",
        dateFormat: "yy-mm-dd"
    });

    // sortable;
    $('data-sortable').sortable();

    // toggleRecord;
    toggleRecord();

});
