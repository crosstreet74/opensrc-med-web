function gridCreate(gridId, divId, layoutStr, gridData) {
	var jsVars = "rMateOnLoadCallFunction=gridReadyHandler";
	jsVars += "&assetsPath=/rMateGridH5/Assets/";
	rMateGridH5.create(gridId, divId, jsVars, "100%", "100%");
	
	var gridApp, gridRoot, dataGrid, columns, collection;
	this.gridReadyHandler = function(id) {
		gridApp = document.getElementById(id);
		gridRoot = gridApp.getRoot();
		gridApp.setLayout(layoutStr);
		gridApp.setData(gridData);
	}
}

function gridCreate(gridId, divId, layoutStr, gridData, width, height) {
	var jsVars = "rMateOnLoadCallFunction=gridReadyHandler";
	jsVars += "&assetsPath=/rMateGridH5/Assets/";
	rMateGridH5.create(gridId, divId, jsVars, width, height);
	
	var gridApp, gridRoot, dataGrid, columns, collection;
	this.gridReadyHandler = function(id) {
		gridApp = document.getElementById(id);
		gridRoot = gridApp.getRoot();
		gridApp.setLayout(layoutStr);
		gridApp.setData(gridData);
	}
}
var gridMakerObj = [];
function makeGrid(obj){
	var gridNo = '';
	var dataField = [];
	var selectionMode = 'multipleCells'; //"singleCell", "singleRow", "multipleCells", "multipleRows" ,"none"
	var textAlign = null;
	var width = null;
	var editable = [];
	var data = null;
	var headerTxt = null;
	var combo = [];
	var comboData = [];
	var checkbox = [];
	var dateEditor = [];
	var dateInput = [];
	var icon = [];
	var labelJsFunction = null;
	var fieldHeadTxt = [];
	var itemEditBeginningJsFunction = '';
	var itemEditEndJsFunction = '';
	var colFixed = null;
	
	/**
	 * 기타 변수
	 * gridNo : Grid번호
	 * pkDataField : PK 데이터 필드
	 * pkDataChkUrl : PK 중복DB체크 URL
	 * rowAddValidateFnc : 행추가시 사전 유효성체크 Function 
	 * rowDelValidateFnc : 행삭제시 사전 유효성체크 Function
	 * saveUrl : 저장처리 URL
	 * saveValidateFnc : 저장시 사전 유효성체크 Function 
	 * saveSuccessFnc : 저장 성공시 수행 Function
	 * saveFailFnc : 저장 실패시 수행 Function
	 */	
	
	for(var i in obj){
		if(i == 'dataField'){	//데이터 필드
			var cnt = 0;
			var fieldObj = obj[i];
			for(var j = 0; j<fieldObj.length; j++){
				var fieldObj2 = fieldObj[j];
				if(typeof(fieldObj2) === 'string'){
					dataField.push(fieldObj[j]);
					cnt++;
				} else {
					for(var k in fieldObj2){
						var fieldObj3 = fieldObj2[k];
						for(var l = 0; l<fieldObj3.length; l++){
							dataField.push(fieldObj3[l]);
							if(l == 0) {
								fieldHeadTxt[cnt] = {"title":k,"length":fieldObj3.length};
							}
							cnt++;
						}
					}
				}
			}
		} else if(i == 'selectionMode'){	// 그리드 선택모드
			selectionMode = obj[i];
		} else if(i == 'textAlign'){	//정렬
			textAlign = obj[i].split(',');
		} else if(i == 'width'){		//폭
			width = obj[i].split(',');
		} else if(i == 'gridNo'){		//gridNo
			gridNo = obj[i];
		} else if(i == 'editable'){		//수정가능필드
			var list = obj[i].split(',');
			for(var j=0; j<list.length; j++){
				editable[list[j]] = ' editable="false"';
			}
		} else if(i == 'data'){			//???
			data = obj[i];
		} else if(i == 'headerText'){	//해더명
			headerTxt = obj[i].split(',');
		} else if(i == 'combo'){		//콤보박스 열
			var list = obj[i].split(',');
			for(var j=0; j<list.length; j++){
				combo[list[j]] = 'C';
			}
		} else if(i == 'comboData'){	//콤보에 넣을 공통코드 데이터
			var list = obj[i].split('!');
			for(var j=0; j<list.length; j++){
				for(var k in combo){
					comboData[k] = list[j];
					list.shift();
				}
			}
		} else if(i == 'dateEditor'){	// 달력
			var list = obj[i].split(',');
			for(var j=0; j<list.length; j++){
				dateEditor[list[j]] = ' itemEditor="DateEditor" formatter="{datefmt}"';
			}
		} else if(i == 'dateInput'){	// 날짜
			var list = obj[i].split(',');
			for(var j=0; j<list.length; j++){
				dateInput[list[j]] = ' formatter="{datefmt}"';
			}
		} else if(i == 'icon'){			//???
			var list = obj[i].split(',');
			for(var j=0; j<list.length; j++){
				icon[list[j]] = ' itemRenderer="IconItem" icon="ico_search" ';
			}
		} else if(i == 'labelJsFunction'){	//
			labelJsFunction = obj[i];
		} else if(i == 'itemEditBeginningJsFunction') { //수정모드시 수정가능 체크 Function명
			itemEditBeginningJsFunction = obj[i];
		} else if(i == 'itemEditEndJsFunction'){	//수정후 오류체크 Function명
			itemEditEndJsFunction = obj[i];
		} else if(i == 'checkbox') {	//체크박스
			var list = obj[i].split(',');
			for(var j=0; j<list.length; j++){
				checkbox[list[j]] = ' itemRenderer="CheckBoxItem" rendererlsEditor="true" editorDataField="checked" trueValue="1" falseValue="0"';
			}
		} else if(i == 'colFixed'){
			colFixed = ' lockedColumnCount="2"';
		}
	}

	var layoutStr = '<rMateGrid>';
	layoutStr += '<NumberFormatter id="numfmt" useThousandsSeparator="true"/>';
	layoutStr += '<PercentFormatter id="percfmt" useThousandsSeparator="true"/>';
	layoutStr += '<DateFormatter id="datefmt" formatString="YYYY-MM-DD"/>';
	layoutStr += '<CurrencyFormatter id="currencyfmt" useThousandsSeparator="true" currencySymbol="원" alignSymbol="right"/>';
	layoutStr += '<DataGrid id="dg' + gridNo + '" styleName="gridStyle" editable="true" showDeletedRows="true" doubleClickEnabled="true"';
	layoutStr += ' pasteEnabled="true" liveScrolling="true" showScrollTips="true"';
	if(itemEditBeginningJsFunction) layoutStr += ' itemEditBeginningJsFunction="'+itemEditBeginningJsFunction+'"';
	if(itemEditEndJsFunction) layoutStr += ' itemEditEndJsFunction="'+itemEditEndJsFunction+'"';
	if(fieldHeadTxt[0]) layoutStr += ' lockedRowCount="1"';
	else layoutStr += ' lockedRowCount="0"';
	if(colFixed) layoutStr += colFixed;
	layoutStr += ' selectionMode="'+selectionMode+'" dragSelectable="true" sortableColumns="true"';
	layoutStr += ' sortExpertMode="true" horizontalScrollPolicy="auto" textAlign="center" verticalAlign="middle" variableRowHeight="true"';
	layoutStr += ' headerHeight="36"  rowHeight="29">';
	layoutStr += '<groupedColumns>';
	
	var col = 0;
	var headCnt = 0;
	var headCnt2 = 0;
	for(var i=0; i<headerTxt.length; i++){
		if(headerTxt[i] == 'No'){
			layoutStr += '<DataGridColumn headerText="No" itemRenderer="IndexNoItem" textAlign="right" editable="false" width="' + width[i] + '"/>';
			col++;
		} else if(headerTxt[i] == '상태'){
			layoutStr += '<DataGridRowStateColumn id="rowState" dataField="상태" textAlign="center" width="' + width[i] + '"/>';
			col++;
		} else {
			if (fieldHeadTxt[i] && fieldHeadTxt[i].title) {
				headCnt = 0;
				headCnt2 = fieldHeadTxt[i].length;
				layoutStr += '<DataGridColumnGroup headerText="' + fieldHeadTxt[i].title + '">';
			}
			headCnt++;
			layoutStr += '<DataGridColumn id="dg' + gridNo + 'col' + (i+1-col) + '" dataField="' + dataField[i] + '"';
			layoutStr += ' headerText="' + headerTxt[i] + '"';
			if(textAlign && textAlign[i] != 'null') layoutStr += ' textAlign="' + textAlign[i] + '"';
			if(editable && editable[i]) layoutStr += editable[i];
			if(width && width[i] != 'null') layoutStr += ' width="' + width[i] + '"';
			if(icon && icon[i]) layoutStr += icon[i];
			if(combo && combo[i]) {
				layoutStr += ' itemEditor="ComboBoxEditor" editorDataField="selectedDataField" itemRendererDataField="code"';
				layoutStr += '  labelJsFunction="' + labelJsFunction + '" itemRendererDataProvider=\'' + comboData[i] + '\'';
			}
			if(checkbox && checkbox[i]) {
				layoutStr += checkbox[i];
			}
			if(dateEditor && dateEditor[i]) layoutStr += dateEditor[i];
			if(dateInput && dateInput[i]) layoutStr += dateInput[i];
			layoutStr += ' />';
			if (headCnt == headCnt2) {
				layoutStr += '</DataGridColumnGroup>';
			}
		}
	}
	layoutStr += '</groupedColumns>';
	layoutStr += '<footers>';
	layoutStr += '<DataGridFooter height="29" backgroundColor="#e2e9f5">';
	for(var i=0; i<headerTxt.length; i++){
		if(headerTxt.length-1 == i){
			layoutStr += '<DataGridFooterColumn labelJsFunction="footerCount" textAlign="right"/>';
		} else {
			layoutStr += '<DataGridFooterColumn/>';
		}
	}
	layoutStr += '</DataGridFooter>';
	layoutStr += '</footers>';
	layoutStr += '</DataGrid>';
	/*
		alternatingItemColors 행의 배경색 지정 (반드시 2개이상의 색을 배열로 만들어 넣어줘야 합니다)
		color 폰트색 지정 (기본 #31393F)
		fontWeight 폰트 bold 지정 (bold,normal중 택일, 기본 normal)
		fontStyle 폰트 italic 지정 (italic,normal중 택일, 기본 normal)
		fontFamily 폰트 지정
		fontSize 폰트크기 지정(단위:pixel)
		headerColors 헤더 배경색 지정 (반드시 2개의 색을 배열로 만들어 넣어줘야 합니다)
		headerBorderBottomColor 그리드 헤더의 아랫쪽 테두리 선의 색(기본값 #999999)
		headerBorderBottomWidth 그리드 헤더의 아랫쪽 테두리 선의 두께(기본값 1)
		headerBorderTopColor 그리드 헤더의 윗쪽 테두리 선의 색(기본값 #555555)
		headerBorderTopWidth 그리드 헤더의 윗쪽 테두리 선의 두께(기본값 1)
		headerHorizontalSeparatorColor 헤더 수평분리선색 지정 (기본 #AAB3B3)
		headerSeparatorColor 헤더 분리선색 지정 (기본 #AAB3B3)
		horizontalGridLines 가로 눈금줄 표시 조정 (true,false중 택일, 기본 true)
		horizontalGridLineColor 가로 눈금줄 색 지정 (기본 #CCCCCC)
		horizontalGridLineStyle 가로 눈금줄 속성 (solid, dotted, dashed중 택일, 기본 solid)
		verticalAlign 셀 세로 정렬 지정 (top,middle,bottom중 택일, 기본 top)
		verticalGridLines 상하 눈금줄 표시 지정 (true,false중 택일, 기본 true)
		verticalGridLineColor 상하 눈금줄 색 지정 (기본 #E7EBEF)
		verticalGridLineStyle 상하 눈금줄 속성 (solid, dotted, dashed중 택일, 기본 solid)
	
		backgroundColor 그리드 배경색, 데이터가 없는 영역을 표시(기본 #F2F2F2)
		borderColor 테두리색 지정
		borderStyle 테두리모양 지정 (none,solid,inset,outset중 택일, 기본 none)
		borderWidth 테두리 두께 지정 (borderStyle이 "solid"일때만 작동, 기본 1)
		disabledColor 잠긴상태(enabled가 false인 경우) 폰트색 지정
		paddingBottom 아랫쪽 padding 크기 지정(전체 셀에 적용됨, 기본 7)
		paddingLeft 왼쪽 padding 크기 지정
		paddingRight 오른쪽 padding 크기 지정
		paddingTop 윗쪽 padding 크기 지정(전체 셀에 적용됨, 기본 7)
		rollOverColor 마우스 오버된 셀 또는 행의 바탕색 지정
		selectionColor 선택된 셀 또는 행의 바탕색 지정
		textAlign 셀들의 기본 수평정렬 지정 (left,right,center중 택일, 기본 left)
	*/
	layoutStr += '<Style>\ ';
	layoutStr += '.gridStyle {\ ';
	layoutStr += '	color:#3b434d;\ ';
	layoutStr += '	alternatingItemColors:#FFFFFF,#FFFFFF;\ ';
	layoutStr += '	borderTopColor:#DDDDDD;\ ';
	layoutStr += '	headerColors:#f4f4f4,#f4f4f4;\ ';
	layoutStr += '	headerBorderBottomColor:#a2a7b4;\ ';
	layoutStr += '	headerStyleName:gridHeaderStyle;\ ';
	layoutStr += '	headerSeparatorColor:#d4d7df;\ ';
	layoutStr += '	headerBorderTopColor:#414757;\ ';
	layoutStr += '	horizontalGridLines:true;\ ';
	layoutStr += '	horizontalGridLineColor:#d4d7df;\ ';
	layoutStr += '		selectionColor:#fdfdd6;\ ';
	layoutStr += '	rollOverColor:#eff6fc;\ ';
	layoutStr += '	fontSize:12px;\ ';
	layoutStr += '	verticalAlign:middle;\ ';
	layoutStr += '	verticalGridLines:true;\ ';
	layoutStr += '	verticalGridLineColor:#d4d7df;\ ';
	layoutStr += '	backgroundColor:#ffffff;\ ';
	layoutStr += '  textSelectedColor:#3b434d;'
	layoutStr += '}\ ';
	layoutStr += '.gridHeaderStyle {\ ';
	layoutStr += '	color:#3b434d;\ ';
	layoutStr += '	fontWeight:bold;\ ';
	layoutStr += '	fontSize:11px;\ ';
	layoutStr += '	horizontalAlign:center;\ ';
	layoutStr += '	verticalAlign:middle;\ ';
	layoutStr += '	separatorColor:#000000;\ ';
	layoutStr += '}\ ';
	layoutStr += '</Style>\ ';
	layoutStr += '</rMateGrid>';

	var jsVars1 = "rMateOnLoadCallFunction=gridReadyHandler" + gridNo;
	jsVars1 += "&assetsPath=/rMateGridH5/Assets/";
	rMateGridH5.create('grid' + gridNo, 'gridHolder' + gridNo, jsVars1, "100%", "100%");
	gridMakerObj.push(obj);
	
	return layoutStr;
}

function changeGridNm(gridRoot, headerTxt, id){
	var headerTxtArr = headerTxt.split(',');
	for(var i=0; i<headerTxtArr.length; i++){
		gridRoot.getObjectById(id + 'col' + (i+1)).setHeaderText(headerTxtArr[i]);
	}
}

// 그리드 행추가
function fncComnAdd(gridObj){
	var _gridNo = gridObj.gridNo;
	var _rowAddValidateFnc = gridObj.rowAddValidateFnc;

	var _gridRoot = eval("gridRoot"+_gridNo);
	var _dataGrid = eval("dataGrid"+_gridNo);
	var _item = JSON.parse(JSON.stringify(eval("gridAddItem"+_gridNo)));
	var _gridDataReadOnly = eval("gridDataReadOnly"+_gridNo);

	var _rowIdx = _dataGrid.getSelectedIndex()+1;
	
//	var _selectGridDataObj = "";

	if (typeof eval(_rowAddValidateFnc) == "function"){
		if(!eval(_rowAddValidateFnc+"()")) return;
	}

	//행추가는 포커스가 존재하는 행 다음
	_gridRoot.addItemAt(_item, _rowIdx);
	girdMoveSelctedIndex(gridObj, _rowIdx);
	
	//행추가시 첫번째 KeyObject로 focus이동
//	for(j in _gridDataReadOnly){
//		if(_selectGridDataObj == "" && _gridDataReadOnly[j] == "PK"){
//			_selectGridDataObj = j;
//		}
//	} 
//	if(_selectGridDataObj != "") $(_selectGridDataObj).focus();
}

// 그리드 행삭제
function fncComnDelete(gridObj){
	var _gridNo = gridObj.gridNo;
	var _rowDelValidateFnc = gridObj.rowDelValidateFnc;

	var _gridRoot = eval("gridRoot"+_gridNo);
	var _dataGrid = eval("dataGrid"+_gridNo);

	var _selectionMode = _dataGrid.getSelectionMode();
	
	if(_selectionMode == "multipleRows"){
		var rows = _dataGrid.getSelectedIndices();

		if (rows.length < 1) {
			alert("삭제할 데이터를 선택하세요");
			return;
		}
		
		for (var i = 0; i < rows.length; i++) {
			if (typeof eval(_rowDelValidateFnc) == "function"){
				if(!eval(_rowDelValidateFnc+"("+gridObj+","+rows[i].rowIndex+")")) return;
			}
			_gridRoot.removeItemAt(rows[i].rowIndex);
		}
		
	}else if(_selectionMode == "multipleCells"){
		var cells = _dataGrid.getSelectedCells();
		var selectCell = "";

		if (cells.length < 1) {
			alert("삭제할 데이터를 선택하세요");
			return;
		}

		for (var i = 0; i < cells.length; i++) {
			if(cells[i].rowIndex != selectCell){
				selectCell = cells[i].rowInde;
				
				if (typeof eval(_rowDelValidateFnc) == "function"){
					if(!eval(_rowDelValidateFnc+"("+gridObj+","+cells[i].rowIndex+")")) return;
				}
				_gridRoot.removeItemAt(cells[i].rowIndex);
			}
		}
	}else{
		var _rowIdx = _dataGrid.getSelectedIndex();

		if (_rowIdx < 0) {
			alert("삭제할 데이터를 선택하세요");
			return;
		}
		if (typeof eval(_rowDelValidateFnc) == "function"){
			if(!eval(_rowDelValidateFnc+"("+_rowIdx+")")) return;
		}
		_gridRoot.removeItemAt(_rowIdx);
	}
}

//그리드의 selctedIndex를 전달된 행으로 이동
function girdMoveSelctedIndex(gridObj, idx){
    setTimeout("gridSetSelectedIndex("+gridObj.gridNo+", "+idx+")", 100);
}

// 그리드 행이동
function gridSetSelectedIndex(gridNo, idx) {
	var _dataGrid = eval("dataGrid"+gridNo);
	var _gridRoot = eval("gridRoot"+gridNo);
	var _collection = eval("collection"+gridNo);
	
    var verticalScrollPosition = _dataGrid.getVerticalScrollPosition();

    var rowCount = _dataGrid.getRowCount();
    if (rowCount > 0)
        rowCount = rowCount - 1;
    var halfRowCount = (rowCount / 2).toFixed();
 
    if (idx == null || idx == undefined) {
        if (!_collection)
        	_collection = _gridRoot.getCollection();
        idx = _collection.getLength() - 1;
    }
    _dataGrid.setSelectedIndex(idx);
    if (idx < verticalScrollPosition || idx > verticalScrollPosition + rowCount) {
        if (idx - halfRowCount >= 0)
        	_dataGrid.setVerticalScrollPosition(idx - halfRowCount);
        else
        	_dataGrid.setVerticalScrollPosition(0);
    }
}

// Object 수정시 변경값 그리드 데이터로 Set을 위한 Init
function fnInitGridDataObj(gridObj){
	var _gridNo = gridObj.gridNo;

	var _gridDataBind = eval("gridDataBind"+_gridNo);

	for(var i in _gridDataBind ){
		$(i).change(function() { fnSetComnGridData(gridObj, this) });
	}
}

// 그리드 데이터 => Object Set
function fnGetComnGridData(gridObj){
	var _gridNo = gridObj.gridNo;
	
	var _gridRoot = eval("gridRoot"+_gridNo);
	var _gridDataBind = eval("gridDataBind"+_gridNo);
	var _gridDataReadOnly = eval("gridDataReadOnly"+_gridNo);
	var _dataGrid = eval("dataGrid"+_gridNo);

	var _dataGridRowIdx = _dataGrid.getSelectedIndex();
	var _dataRow = _gridRoot.getItemAt(_dataGridRowIdx);
	
	var flag = true;

	for(var i in _gridDataBind){
		$(i).val(_dataRow ?_dataRow[_gridDataBind[i]] :"");
	}
	
	var changedData = _gridRoot.getChangedData();
	for(var i = 0; i < changedData.length; i++ ){
		if( changedData[i].idx == _dataGridRowIdx && changedData[i].job == 'I') {
			flag = false;
		}
	}

	for(var i in _gridDataReadOnly){
		var fieldType = $(i)[0].type;	// text, select-one, hidden, textarea, file, radio, checkbox, password 
		if(fieldType == "text") $(i).attr("readonly",flag);
		else if(fieldType == "select-one") $(i).attr("disabled", flag);
	}

	eval('fnSetRowIdxGrid'+_gridNo+"("+_dataGridRowIdx+")");
	$('select').niceSelect('update');
}

// Object => 그리드 데이터 Set
function fnSetComnGridData(gridObj, obj){
	var _gridNo = gridObj.gridNo;
	var _pkDataField = gridObj.pkDataField.split(',');
	var _pkChkUrl = gridObj.pkDataChkUrl;

	var _gridDataBind = eval("gridDataBind"+_gridNo);
	var _gridRoot =  eval("gridRoot"+_gridNo);
	var _dataGrid = eval("dataGrid"+_gridNo);
	var _gridDataReadOnly = eval('gridDataReadOnly'+_gridNo);

	var _dataGridRowIdx = eval('dataGridRowIdx'+_gridNo);
	
	var param = "";
	var Overlap = false;
	var keyGridObject = false;
	var keyGridObjectName = "";

	var _gridData = _gridRoot.getChangedData();
	var job = "";
	
	for (var i = 0; i < _gridData.length; i++ ){		
		if(_gridData[i].idx == _dataGridRowIdx && _gridData[i].job == 'I'){
			job = 'I';
		}
	}
	for(i in _gridDataReadOnly){
		if(_gridDataReadOnly[i] == "PK"){
			if(i == ("#"+$(obj)[0].id)) {
				keyGridObject = true;
				keyGridObjectName = _gridDataBind[i];
			}
		}
	}

	// 신규입력인경우만 키중복 체크
	if (job == "I" && keyGridObject == true){
		if($(obj).val() == "") return;
		_gridData = _gridRoot.getChangedData(true,false);

		for (var i = 0; i < _gridData.length; i++ ){		
			if(_gridData[i].idx != _dataGridRowIdx && Overlap == false){
				var dataRow = _gridData[i].data;
				var OverlapF = true;

				for(j in _gridDataReadOnly){
					if(_gridDataReadOnly[j] == "PK"){
						if($(j).val() != dataRow[_gridDataBind[j]]) OverlapF = false;
					}
				}
				if(OverlapF == true) Overlap = true;
			}
		}
		
		if(Overlap == false){
			var dataRow = _gridRoot.getItemAt(_dataGridRowIdx);
	
			for(var j= 0; j < _pkDataField.length; j++ ){
				if(_pkDataField[j] == keyGridObjectName ) dataRow[_pkDataField[j]] = $(obj).val();
				param+=(j!=0?"&":"")+_pkDataField[j]+"="+dataRow[_pkDataField[j]];
			}
		
		    ajaxPost(_pkChkUrl, param, function (data) {
		        if(data.resultMsg > 0){
		        	Overlap = true;
		        }
		
		    }, false);
		}

		if(Overlap == true){
			$(obj).val('');
			$(obj).focus();
	    	alert('중복된 자료가 있습니다.');
		}
	}
	
	for(var i in _gridDataBind ){
		_gridRoot.setItemFieldAt($(i).val(), _dataGridRowIdx, _gridDataBind[i]);
	}

	// 변경엑션이 그리드Row변경이면 위치원복.
	if(_dataGrid.getSelectedIndex() != _dataGridRowIdx)
		girdMoveSelctedIndex(gridObj, _dataGridRowIdx);
}

// 그리드내 PK값 중복 체크
function fnGridPkOverlap(rowIndex, columnIndex, item, dataField, oldValue, newValue, reason, gridObj){
	var _gridNo = gridObj.gridNo;
	var _url = gridObj.pkDataChkUrl;
	var _pkDataField = gridObj.pkDataField.split(',');
	
	var _gridRoot = eval('gridRoot'+_gridNo);
	var _gridData = _gridRoot.getChangedData(true,false);
	var param = "";
	var resultMsg = false;

	// 실제 수정이 안 일어났으면 return
    if (reason == "cancelled" || reason == "sameValue")
        return resultMsg;
	
	// 변경 값이 없으면 리턴
	if (newValue == "") return false;
	
	// 변경 컬럼이 PK가 아니면 리턴
	var chk_ok = "N";
	for( i in _pkDataField){ if (dataField == _pkDataField[i] ) chk_ok = "Y"; } 
	if (chk_ok == "N") return false;

	for (var i = 0; i < _gridData.length; i++ ){		
		if(_gridData[i].idx != rowIndex){
			var dataRow = _gridData[i].data;
			var Overlap = true;

			for(var j= 0; j < _pkDataField.length; j++ ){
				var data = (dataField == _pkDataField[j]) ? newValue : item[_pkDataField[j]];
//				if(data.toUpperCase() != dataRow[_pkDataField[j]].toUpperCase() ) Overlap = false;
				if( data != dataRow[_pkDataField[j]] ) Overlap = false;
			}
			
			if(Overlap == true) return true;
		}
	}
	
	for(var j= 0; j < _pkDataField.length; j++ ){
		var data = (dataField == _pkDataField[j]) ? newValue : item[_pkDataField[j]];
		param+=(j!=0?"&":"")+_pkDataField[j]+"="+data;
	}
	
    ajaxPost(url , param, function (data) {
    	resultMsg = data.resultMsg > 0 ? true : false;
    }, false);

    return resultMsg;
}

/* 그리드내 Validation Check */
function gridValidationCheck(rowIndex, columnIndex, item, dataField, oldValue, newValue, reason, gridObj){
	var _gridNo = gridObj.gridNo;
	var _pkDataField = gridObj.pkDataField.split(',');
	var _pkDataChkUrl = gridObj.pkDataChkUrl;
	
	var _gridRoot = eval('gridRoot'+_gridNo);
	var _ctrlItem = eval('gridDataItem'+_gridNo);
	var _gridData = _gridRoot.getChangedData(true,false);
	
	var resultMsg = null;
	var param = "";

	// 실제 수정이 안 일어났으면 return
    if (reason == "cancelled" || reason == "sameValue")
        return resultMsg;

    // 날짜필드 체크
    var _dateInput = gridObj.dateInput.split(',');
    for(var i=0; i < _dateInput.length; i++){
    	if ( dataField == _gridRoot.getObjectById('dg' + _gridNo + 'col' + (_dateInput[i]-1)).getDataField()){
			var regEx = /^[0-9]*$/;
    		var header = _gridRoot.getObjectById('dg' + _gridNo + 'col' + (columnIndex-1)).getHeaderText();
    		
			if (!regEx.test(newValue)) return header + "은/는 숫자로 입력하시기 바랍니다.";
			if (newValue.length != 8 || !getDate(newValue.substr(0,4), newValue.substr(4,2), newValue.substr(6,2))) return header + "은/는 정확한 날짜를 입력해야합니다.";
    	}
    }

    // gridDataItem 체크
    for(i in _ctrlItem) {
    	var arr = _ctrlItem[i];
    	if (dataField == i) {
    		for(var j=0; j<arr.length; j++){
    			if(arr[j] == 'null'){
    				if (newValue == null || newValue == ""){
    		    		var header = _gridRoot.getObjectById('dg' + _gridNo + 'col' + (columnIndex-1)).getHeaderText();
    		    		return header + "을/를 입력하시기 바랍니다.";
    		    	}
    			}
    			if(typeof(arr[j]) =='object'){
    				if(arr[j][0] == 'lengthLess'){
    					if(newValue.length > arr[j][1]){
    						var header = _gridRoot.getObjectById('dg' + _gridNo + 'col' + (columnIndex-1)).getHeaderText();
    						return header + '은/는 ' + arr[j][1] + '자 이하로 입력하셔야 합니다.'
    					}
    				}
    				if(arr[j][0] == 'lengthMore'){
    					if(newValue.length < arr[j][1]){
    						var header = _gridRoot.getObjectById('dg' + _gridNo + 'col' + (columnIndex-1)).getHeaderText();
    						return header + '은/는 ' + arr[j][1] + '자 이상 입력하셔야 합니다.'
    					}
    				}
    				if(arr[j][0] == 'dateRangeF'){
    					var dateT = item[arr[j][1]];
    					if(dateT != '' && newValue > dateT ){
    						return '날짜 범위 오류로 시작과 종료일자를 확인 바랍니다.';
    					}
    				}
    				if(arr[j][0] == 'dateRangeT'){
    					var dateF = item[arr[j][1]];
    					if(dateF != '' &&  dateF > newValue ){
    						return '날짜 범위 오류로 시작과 종료일자를 확인 바랍니다.';
    					}
    				}
    			}
    			if(arr[j] == 'engNo'){
    				var regEx = /^[A-Za-z0-9+]*$/;
    				if (!regEx.test(newValue)){
    		    		var header = _gridRoot.getObjectById('dg' + _gridNo + 'col' + (columnIndex-1)).getHeaderText();
    		    		return header + "은/는 영문 + 숫자로 입력하시기 바랍니다.";
    		    	}
    			}
    			if(arr[j] == 'number'){
    				var regEx = /^[0-9]*$/;
    				if (!regEx.test(newValue)){
    		    		var header = _gridRoot.getObjectById('dg' + _gridNo + 'col' + (columnIndex-1)).getHeaderText();
    		    		return header + "은/는 숫자로 입력하시기 바랍니다.";
    		    	}
    			}
    			if(arr[j] == 'PK'){
    				for (var i = 0; i < _gridData.length; i++ ){		
    					if(_gridData[i].idx != rowIndex){
    						var dataRow = _gridData[i].data;
    						var Overlap = true;
    						param = "";

    						for(var k= 0; k < _pkDataField.length; k++ ){
    							var data = (dataField == _pkDataField[k]) ? newValue : item[_pkDataField[k]];
    							param+=(k!=0?"&":"")+_pkDataField[k]+"="+data;

    							if( data != dataRow[_pkDataField[k]] ) Overlap = false;
    						}
    						
    						if(Overlap == true) return "Data Key 중복입니다.";
    					}
    				}
    				
    			    ajaxPost(_pkDataChkUrl , param, function (data) {
    			    	resultMsg = data.resultMsg > 0 ? "Data Key 중복입니다." : null;
    			    }, false);
    			}
    		}
    	}
    }
    return resultMsg;
}

//그리드 CUD 수행
function fnComnSave(dataGrid1,gridRoot1,form1,json,url) {
	// 브라우저의 JSON 지원여부 검사 - IE8부터 지원
	if (typeof JSON != "object") {
		alert("JSON이 지원되지 않는 브라우저입니다.");
		return;
	}
	
	if (dataGrid1.errorInEditing) {
        alert("오류를 먼저 수정하기시 바랍니다.");
        return;
    }

	var changedData = gridRoot1.getChangedData();
	if (changedData.length == 0) {
		alert("변경된 자료가 없습니다");
		return;
	}
	
	$('#' + json).val(JSON.stringify(changedData));
	
	var fm = document.getElementById(form1);
	fm.modifyJson.value = JSON.stringify(changedData);
	fm.action = url;
	fm.submit();
}

// 그리드 CUD 수행 (Ajax)
function fnComnSaveAjax(gridObj) {
	var _gridNo = gridObj.gridNo;
	var _saveValidateFnc = gridObj.saveValidateFnc;
	var _saveUrl = gridObj.saveUrl;
	var _saveSuccessFnc = gridObj.saveSuccessFnc;
	var _saveFailFnc = gridObj.saveFailFnc;

	var _gridRoot = eval("gridRoot"+_gridNo);
	var _gridData = eval("gridData"+_gridNo);
	var _gridApp = eval("gridApp"+_gridNo);
	var _dataGrid = eval("dataGrid"+_gridNo);
	
	// 브라우저의 JSON 지원여부 검사 - IE8부터 지원
	if (typeof JSON != "object") {
		alert("JSON이 지원되지 않는 브라우저입니다.");
		return;
	}

	if (_dataGrid.errorInEditing) {
        alert("오류를 먼저 수정하기시 바랍니다.");
        return;
    }

	if (typeof eval(_saveValidateFnc) == "function"){
		if(!eval(_saveValidateFnc+"()")) return;
	}
	
	var changedData = _gridRoot.getChangedData();
	if (changedData.length == 0) {
		alert("변경된 자료가 없습니다");
		return;
	}

	if(!confirm('저장하시겠습니까?')) return;

//	alert(JSON.stringify(changedData));
	var param = {"modifyJson":JSON.stringify(changedData)};
    ajaxPost(_saveUrl , param, function (data) {
    	if(data.resultCd > 0){
    		if (typeof eval(_saveSuccessFnc) == "function"){
    			eval(_saveSuccessFnc+"(JSON.parse(data.resultVo))");
    		}else{
    			alert('저장되었습니다.');
    		}
    	}else{
    		if (typeof eval(_saveFailFnc) == "function"){
    			eval(_saveFailFnc+"(JSON.parse(data.resultVo))");
    		}else{
        		alert("에러가 발생되었습니다.");
    		}
    	}
    	
    });
}

// 선택행 입력,수정,삭제 상태 제거
function fncRemoveChanged(gridObj) {
	var _gridNo = gridObj.gridNo;
	
	var _gridRoot = eval("gridRoot"+_gridNo);
	var _dataGrid = eval("dataGrid"+_gridNo);
	
	var _selectionMode = _dataGrid.getSelectionMode();
	
	if(_selectionMode == "multipleRows"){
		var rows = _dataGrid.getSelectedIndices();

		if (rows.length < 1) return;
		
		for (var i = 0; i < rows.length; i++) {
			var _selectedItem = _gridRoot.getItemAt(rows[i].rowIndex);
			_gridRoot.removeChangedData(_selectedItem);
			
		}
	}else if(_selectionMode == "multipleCells"){
		var cells = _dataGrid.getSelectedCells();
		var selectCell = "";
		if (cells.length < 1) return;

		for (var i = 0; i < cells.length; i++) {
			if(cells[i].rowIndex != selectCell){
				selectCell = cells[i].rowIndex;
				var _selectedItem = _gridRoot.getItemAt(selectCell);
				_gridRoot.removeChangedData(_selectedItem);
			}
		}
	}else{
		var _rowIdx = _dataGrid.getSelectedIndex();

		if (_rowIdx < 0) return;

		var _selectedItem = _gridRoot.getItemAt(_rowIdx);
		_gridRoot.removeChangedData(_selectedItem);
	}

	_dataGrid.invalidateList();
}

/*
function fnComnCancel(dataGrid,gridRoot,data){
	var changedData = gridRoot.getChangedData();
    if (changedData.length == 0){
//    	alert("변경된 자료가 없습니다");
        return;
    } else {
    	dataGrid.setEnabled(false);	
    	dataGrid.setEnabled(true);

		var dt = $.parseJSON(data);
		
    	for (var i = 0; i < changedData.length; i++){
    		if(changedData[i].job == 'I'){
    			gridRoot.removeItemAt(changedData[i].idx);
			}else{
				var idx = changedData[i].idx;
				var selectedItem = gridRoot.getItemAt(idx);
				
				if(changedData[i].job == 'U'){
					for(j in selectedItem){
						if( j != 'rm_internal_uid'){
							d = dt[idx];
							for(k in d){
								if(j == k) gridRoot.setItemFieldAt(d[k], idx, j);
							}
						}
					}
				}
			    gridRoot.removeChangedData(selectedItem);
    		}
    	}
    	
    	dataGrid.invalidateList();
    }
}
function fnComnCancel(dataGrid,gridRoot,data){
	var changedData = gridRoot.getChangedData();
    if (changedData.length == 0){
    	alert("변경된 자료가 없습니다");
        return;
    } else {
    	var selectedIndex = dataGrid.getSelectedIndex();
    	for (var i = 0; i < changedData.length; i++){
    		if(changedData[i].idx == selectedIndex){
    			if(changedData[i].job == 'I'){
    				gridRoot.removeItemAt(selectedIndex);
    			} else if(changedData[i].job == 'U'){
    				var selectedItem = gridRoot.getItemAt(selectedIndex);
    				for(i in selectedItem){
    					if( i != 'rm_internal_uid'){
    						var dt = $.parseJSON(data);
    						dt = dt[selectedIndex];
    						for(j in dt){
    							if(i == j){
    								gridRoot.setItemFieldAt(dt[j], selectedIndex, i);
    								gridRoot.removeChangedData(selectedItem);
    							}
    						}
    					}
    				}
    			} else {
    				var selectedItem = gridRoot.getItemAt(selectedIndex);
    			    gridRoot.removeChangedData(selectedItem);
    			}
    		}
    	}
    	dataGrid.invalidateList();
    }
}
*/

//엑셀 업로드
function fnExcelImport(gridObj) {
	var _gridNo = gridObj.gridNo;
	
	var _gridRoot = eval("gridRoot"+_gridNo);

	var option = {
		layoutChangeOption:0, 		// 레이아웃 변경 방식 - 0 : 사용자에게 질의, 1 : 현재 레이아웃에 데이터만 import, 2 : 헤더나 데이터에 따라 레이아웃을 재설정하고 데이터를 import
		headerRowCount:1, 			// 헤더라인 수. 기본 값 0
		headerRowCountVisible:true, // 헤더라인 수 표시 여부
		selectSheet:true, 			// import한 파일내에 여러 Sheet가 있을 경우 사용자가 Sheet를 선택할 수 있도록 할 지 여부. (false일 경우 첫번째 Sheet를 가져옵니다) 기본 값 false
		useGroupedColumn:true 		// 그룹컬럼 생성 여부. false일 경우 1줄의 컬럼만 생성됩니다.
	};
	_gridRoot.excelImport(option, "/excel_import.do");
}

//엑셀 다운로드
function fnExcelExport(gridObj) {
	var _gridNo = gridObj.gridNo;
	
	var _gridRoot = eval("gridRoot"+_gridNo);
	var _dataGrid = eval("dataGrid"+_gridNo);

	var changedData = _gridRoot.getChangedData();
	
	if(changedData.length > 0){
		if(!confirm('편집중인 자료가 있습니다. 계속 하시겠습니까?')){
			return;
		}
	}

	_dataGrid.exportFileName = "export.xls";
	_gridRoot.excelExportSave("/excel_export.do", false);
}

//행복사
function fnRowCopy(gridObj){
	var _gridNo = gridObj.gridNo;
	var _pkDataField = gridObj.pkDataField.split(',');

	var _gridRoot = eval("gridRoot"+_gridNo);
	var _dataGrid = eval("dataGrid"+_gridNo);
	var _item = JSON.parse(JSON.stringify(eval("gridAddItem"+_gridNo)));
	var _copyData = [];
	var _rows = [];
	var _cells = [];

	var _selectionMode = _dataGrid.getSelectionMode();
	
	if(_selectionMode == "multipleRows"){
		var rows = _dataGrid.getSelectedIndices();
		
		if (rows.length < 1) return;
		
		for (var i = 0; i < rows.length; i++) rows.push(rows[i].rowIndex);
	}else if(_selectionMode == "multipleCells"){
		_cells = _dataGrid.getSelectedCells();

		if (_cells.length < 1) return;

		for (var i = 0; i<_cells.length; i++) _rows.push(_cells[i].rowIndex);
	}else{
		var _rowIdx = _dataGrid.getSelectedIndex();
		
		if (_rowIdx < 0) return;

		_rows.push(_rowIdx);
	}

	_rows.sort();
	_rows.reverse();
	
	var msg="";
	var dataRowIdx = -1;
	var addRowIdx = (_rows[0])+1;
	for(var i = 0; i<_rows.length; i++){
		if(dataRowIdx != _rows[i]) {
			dataRowIdx =  _rows[i];
			_copyData.push(_gridRoot.getItemAt(dataRowIdx));
		}
	}

	for(var i = 0; i <_copyData.length; i++){
		var data = _copyData[i];
		var addItem = new Object();

		for(var j in _item ) addItem[j] = _item[j];

		for(var j in data){
			var dataFieldYn = "N";
			for(var k = 0; k < _pkDataField.length; k++ ){
				if(j == _pkDataField[k]) dataFieldYn = "Y";
			}
			
			if(dataFieldYn == "N" && j != "No" && j != "rowState" && j !="rm_internal_uid"){
				addItem[j] =  data[j];
			}
		}

		_gridRoot.addItemAt(addItem, addRowIdx);
	}
}

function fnComnDelete(dataGrid1,gridRoot1){
	var selectedIndex = dataGrid1.getSelectedIndex();
	if (selectedIndex >= 0)
		gridRoot1.removeItemAt(selectedIndex);
	else
		alert("삭제할 행을 선택하세요");
}

function convertComboCode(item, value, column) {
	var itemRendererDataProvider = column.getItemRendererDataProvider();
	var itemRendererDataField = column.getItemRendererDataField();
	for (var i = 0; i < itemRendererDataProvider.length; i++) {
		if (value == itemRendererDataProvider[i][itemRendererDataField])
			return itemRendererDataProvider[i]["label"];
	}
	return "";
}

function selectComboCodeList(baseCode){
	var url = '/ehr/com/selectGridComboList.do?baseCd=' + baseCode;
	var rtnVal = null;
	$.ajax({
		url : url,
		type : 'post',
		dataType : 'json',
		cache : false,
		contentType : 'application/x-www-form-urlencoded;charset=utf-8',
		async : false,
		success : function(data) {
			rtnVal = JSON.stringify(data.comboList);
		},
		error : function(request, status, error) {
			console.log('code: ' + request.status + "\n" + 'message: '
					+ request.responseText + "\n" + 'error: ' + error);

			if (request.status != "200") {
				alert("시스템 오류가 발생하였습니다.\n\n시스템 관리자에게 문의하세요.");
			}
		}
	});
	return rtnVal;
}

function footerCount(column, data){
	var gridNo = column._column.id.substring(2,3);
	var collection = eval('collection' + gridNo);
	var gridRoot = eval('gridRoot' + gridNo);
	if (!collection && gridRoot)
        collection = gridRoot.getCollection();
    if (collection)
        return collection.getLength() + "건";
    else
        return "";
}

function gridCheckBefLocChange(){
	var rtn = true;
	var changedData = null;
	if(gridMakerObj.length != 0){
		for(var i=0; i<gridMakerObj.length; i++){
			var gridRoot = eval('gridRoot' + gridMakerObj[i].gridNo);
			if(typeof(gridRoot) == 'undefined' ){ rtn = true; break; }
			changedData = gridRoot.getChangedData();
			if(changedData.length > 0){
				if(!confirm('편집중인 자료가 있습니다. 계속 하시겠습니까?')){
					rtn = false;
					break;
				}
			}
		}
	}
	return rtn;
}