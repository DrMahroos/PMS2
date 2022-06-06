$(document).ready(function () {
    _OfferStageItem.InitalizeComponent();
});
var _OfferStageItem;
(function (_OfferStageItem) {
    var ControllerName = "OfferDefinition";
    var JsGridcombobox = "combobox";
    var GridInputClassName = "form-control gridIput";
    var NumberColumnWidth = "50px";
    var DataSource = new Array();
    var DataList = new Array();
    var DetailsAssignHeader = new PQ_GetSlsOfferStageItem();
    var StageItem = new P_Tr_SalesOfferStageItem();
    var _OfferItemId = 0;
    var maxId = 0;
    var GridChild = new JsGrid();
    var sys = new SystemTools();
    var _ScreenLang;
    var _CompCode;
    var _BraCode;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BraCode = SharedSession.CurrentEnvironment.BranchCode;
        InitalizeGrid();
        SumTotal();
        //var _Stage: Array<PQ_GetSlsOfferStage> = new Array<PQ_GetSlsOfferStage>();
        //let _Html: string = CreateDropdownListFilter(_Stage, "StageDescA", "StageDescE", "OfferStageId", "DropOfferStageId")
        //$("#DivHtml").html(_Html);
        $("#DropOfferStageId").on('change', function () { DropOfferStageId_onChange(); });
    }
    _OfferStageItem.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("OffStagI_");
        GridChild.ElementName = "GridChild";
        GridChild.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridChild.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridChild.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        ;
        GridChild.InsertionMode = JsGridInsertionMode.Binding;
        GridChild.Columns = [
            {
                name: "LineCode", width: "8%",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, "", " ", "LineCode", " ");
                    txt.id = "h_LineCode";
                    return HeaderTemplateNew(res.OffStagI_Ser, txt);
                }
            },
            {
                name: "ItemID", visible: false, width: "0%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ItemID", " ");
                    txt.id = "h_ItemID";
                    return HeaderTemplateNew("", txt);
                }
            },
            {
                name: "ItemCode", width: "12%", css: " JsGridHeaderCenter",
                headerTemplate: function () {
                    var btnFindSalesItem = DocumentActions.CreateElement("button");
                    btnFindSalesItem = DocumentActions.CreateElement("button");
                    btnFindSalesItem.className = "btn btn-primary btn-block";
                    btnFindSalesItem.innerText = _ScreenLang == "ar" ? "كود الصنف" : "Item Code";
                    btnFindSalesItem.type = "button";
                    btnFindSalesItem.id = "btnFindSalesItem";
                    btnFindSalesItem.onclick = function (e) {
                        btnFindSalesItems_onclick();
                    };
                    return HeaderTemplateNew(res.OffStagI_ItemNo, btnFindSalesItem);
                }
            },
            {
                name: "DescA", title: res.OffStagI_ItemName, width: "50%",
                headerTemplate: function () {
                    var element = DocumentActions.CreateElement("textarea");
                    element.className = GridInputClassName;
                    element.style.height = "38px";
                    element.id = "h_DescA";
                    return HeaderTemplateNew(res.OffStagI_ItemName, element);
                }
            },
            {
                name: "DescE", title: res.OffStagI_ItemName, width: "50%",
                headerTemplate: function () {
                    var element = DocumentActions.CreateElement("textarea");
                    element.className = GridInputClassName;
                    element.style.height = "38px";
                    element.id = "h_DescE";
                    return HeaderTemplateNew(res.OffStagI_ItemName, element);
                }
            },
            {
                name: "TechDescE", title: res.OffStagI_SystemName_en, width: "22%",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "TechDescE", " ");
                    txt.id = "h_TechDescE";
                    return HeaderTemplateNew(res.OffStagI_SystemName_en, txt);
                }
            },
            {
                name: "TechDescA", title: res.OffStagI_SystemName_ar, width: "22%",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "TechDescA", " ");
                    txt.id = "h_TechDescA";
                    return HeaderTemplateNew(res.OffStagI_SystemName_ar, txt);
                }
            },
            {
                title: res.OffStagI_Fixed, name: "IsFixedSystem", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("checkbox", GridInputClassName, " ", " ", "IsFixedSystem", " ");
                    txt.id = "h_IsFixedSystem";
                    return HeaderTemplateNew(res.OffStagI_Fixed, txt);
                }
            },
            {
                title: res.OffStagI_UOM, name: "Uom_UomCode", width: "9.5%",
                headerTemplate: function () {
                    var txt = DocumentActions.CreateElement("label");
                    txt.id = "h_Uom_UomCode";
                    return HeaderTemplateNew(res.OffStagI_UOM, txt);
                }
            },
            {
                title: res.OffStagI_Qty, name: "Qty", width: "8%",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "Qty", " ");
                    txt.id = "h_Qty";
                    txt.onkeyup = function (e) {
                        CalcTotal();
                    };
                    return HeaderTemplateNew(res.OffStagI_Qty, txt);
                }
            },
            {
                title: res.OffStagI_UnitPrice, name: "UnitPrice", width: "8%",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "UnitPrice", " ");
                    txt.id = "h_UnitPrice";
                    txt.onkeyup = function (e) {
                        CalcTotal();
                    };
                    return HeaderTemplateNew(res.OffStagI_UnitPrice, txt);
                }
            },
            {
                name: "calc_total", title: res.OffStagI_Total, width: "13%",
                headerTemplate: function () {
                    var txt = DocumentActions.CreateElement("label");
                    txt.id = "h_calc_total";
                    return HeaderTemplateNew(res.OffStagI_Total, txt);
                }
            },
            {
                title: res.OffStagI_IsOfferItem, name: "IsOfferItem", width: "8%",
                headerTemplate: function () {
                    var txt = CreateElement("checkbox", GridInputClassName, " ", " ", "IsOfferItem", " ");
                    txt.id = "h_IsOfferItem";
                    txt.checked = true;
                    return HeaderTemplateNew(res.OffStagI_IsOfferItem, txt);
                }
            },
            {
                title: res.OffStagI_Remarks, name: "Remarks", width: "25%",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "Remarks", " ");
                    txt.id = "h_Remarks";
                    return HeaderTemplateNew(res.OffStagI_Remarks, txt);
                }
            },
            {
                title: "#", name: "btnAddItem", visible: true, width: NumberColumnWidth,
                headerTemplate: function () {
                    var btn = DocumentActions.CreateElement("button");
                    btn.className = TransparentButton + "editable";
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemGrid";
                    btn.onclick = function (e) {
                        AddItemInGrid();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.id = "btnDeleteItemGrid";
                    btn.name = DataSource.indexOf(item).toString();
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        debugger;
                        DetailsAssignHeader = item;
                        Delete();
                        debugger;
                        _OfferItemId = 0;
                        DataSource.splice(index, 1);
                        BindDataGrids();
                        SumTotal();
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.style.fontSize = "20px";
                    btn.id = "btnEditItemGrid";
                    btn.style.color = "forestgreen";
                    btn.name = DataSource.indexOf(item).toString();
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
                        DataSource.splice(index, 1);
                        BindDataGrids();
                        _OfferItemId = item.OfferItemId;
                        FillInputText("h_LineCode", item.LineCode);
                        FillInputText("h_ItemID", item.ItemID);
                        FillInputText("btnFindSalesItem", item.ItemCode);
                        FillInputText("h_DescA", item.DescA);
                        FillInputText("h_DescE", item.DescE);
                        FillInputText("h_TechDescA", item.TechDescA);
                        FillInputText("h_TechDescE", item.TechDescE);
                        FillInputText("txtMinUnitPrice", item.MinUnitPrice);
                        item.IsFixedSystem == true ? $('#h_IsFixedSystem').attr('checked', 'checked') : $('#h_IsFixedSystem').removeAttr('checked');
                        FillInputText("h_Uom_UomCode", item.Uom_UomCode);
                        FillInputText("txtUomID", item.UomId);
                        FillInputText("h_Qty", item.Qty);
                        FillInputText("h_UnitPrice", item.UnitPrice);
                        FillInputText("txtStdPrice", item.StdUnitPrice);
                        item.IsOfferItem == true ? $('#h_IsOfferItem').attr('checked', 'checked') : $('#h_IsOfferItem').removeAttr('checked');
                        FillInputText("h_calc_total", item.calc_total);
                        FillInputText("h_Remarks", item.Remarks);
                        if (Number($("#txtStatus").val()) == 0) {
                            $("#btnAddItemGrid").removeAttr("disabled");
                        }
                        else {
                            $("#btnAddItemGrid").attr("disabled", "disabled");
                        }
                    };
                    return btn;
                }
            }
        ];
        BindDataGrids();
    }
    function ClearGridStage() {
        ClearGrid(GridChild, DataSource);
        DataSource = new Array();
    }
    _OfferStageItem.ClearGridStage = ClearGridStage;
    function DropOfferStageId_onChange() {
        var _StageItemId = Number($("#DropOfferStageId").val());
        var _OfferId = Number($("#txtOfferId").val());
        var _Val = $("#DropOfferStageId").val();
        if (_Val == null || _Val == 'null') {
            ClearGrid(GridChild, DataSource);
            DataSource = new Array();
        }
        else {
            DataSource = Ajax.Call({ url: Url.Action("GetOfferStageItemByOfferId", ControllerName), data: { OfferId: _OfferId, StageItemId: _StageItemId } });
            if (DataSource.length > 0) {
                BindDataGrids();
            }
            else {
                ClearGrid(GridChild, DataSource);
                DataSource = new Array();
            }
            OfferDefinition.CheckButtonAddInStageItem();
        }
    }
    function SumTotal() {
        var _Total = 0;
        for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
            var item = DataSource_1[_i];
            if (item.IsOfferItem == true) {
                _Total += item.calc_total;
            }
        }
        $("#txtTotalItem").val(_Total.toString());
    }
    function CalcTotal() {
        debugger;
        var _Qty = IsNullOrEmpty($('#h_Qty').val()) ? 0 : Number($('#h_Qty').val());
        var _Price = IsNullOrEmpty($('#h_UnitPrice').val()) ? 0 : Number($('#h_UnitPrice').val());
        var _Result = Number(_Qty) * Number(_Price);
        $('#h_calc_total').text(_Result.toFixed(2));
    }
    function CheckNotRepaitedLineCode() {
    }
    function AddItemInGrid() {
        debugger;
        DetailsAssignHeader = new PQ_GetSlsOfferStageItem();
        DetailsAssignHeader.LineCode = $('#h_LineCode').val();
        DetailsAssignHeader.ItemID = Number($('#h_ItemID').text());
        DetailsAssignHeader.ItemCode = $('#btnFindSalesItem').text();
        DetailsAssignHeader.DescA = $('#h_DescA').val();
        DetailsAssignHeader.DescE = $('#h_DescE').val();
        //if (_ScreenLang == "ar") {
        //    DetailsAssignHeader.DescE = $("#txtDescTemp").val();
        //} else {
        //    DetailsAssignHeader.DescA = $("#txtDescTemp").val();
        //}
        DetailsAssignHeader.TechDescA = $('#h_TechDescA').val();
        DetailsAssignHeader.TechDescE = $('#h_TechDescE').val();
        DetailsAssignHeader.MinUnitPrice = Number($('#txtMinUnitPrice').val());
        DetailsAssignHeader.OfferID = Number($("#txtOfferId").val());
        DetailsAssignHeader.OfferStageId = Number($("#DropOfferStageId").val());
        DetailsAssignHeader.IsFixedSystem = $('#h_IsFixedSystem').prop('checked');
        DetailsAssignHeader.Qty = Number($('#h_Qty').val());
        DetailsAssignHeader.Uom_UomCode = $('#h_Uom_UomCode').text();
        DetailsAssignHeader.UomId = Number($("#txtUomID").text());
        DetailsAssignHeader.UnitPrice = Number($('#h_UnitPrice').val());
        DetailsAssignHeader.StdUnitPrice = $("#txtStdPrice").val();
        DetailsAssignHeader.IsOfferItem = $('#h_IsOfferItem').prop('checked');
        DetailsAssignHeader.Remarks = $('#h_Remarks').val();
        DetailsAssignHeader.calc_total = Number($('#h_calc_total').text());
        debugger;
        if (_OfferItemId == 0) {
            Insert();
        }
        else {
            Update();
        }
        if (Number($("#txtStatus").val()) == 0) {
            $("#btnAddItemGrid").removeAttr("disabled");
        }
        else {
            $("#btnAddItemGrid").attr("disabled", "disabled");
        }
    }
    function btnFindSalesItems_onclick() {
        debugger;
        if (ClientSharedWork.CurrentMode != ScreenModes.Edit || $("#DropOfferStageId").val() == "null")
            return;
        //let _ScopId: number = Number($("#txtScopeID").val());
        var Condition = "CompCode = " + _CompCode + "  and IsDetail = 1 and IsActive = 1"; /*and ScopeID = " + _ScopId;*/
        sys.FindKey("OfferStageItem", "btnFindSalesItem", Condition, function () {
            var ItemId = ClientSharedWork.SearchDataGrid.SelectedKey;
            var Items = Ajax.Call({ url: Url.Action("GetItemsById", ControllerName), data: { id: ItemId } });
            $("#h_ItemID").text(Items.ItemID);
            $("#btnFindSalesItem").text(Items.ItemCode);
            $("#h_DescA").val(Items.DescA);
            $("#h_DescE").val(Items.DescE);
            $("#txtDescTemp").val(_ScreenLang == "ar" ? Items.DescE : Items.DescA);
            $("#h_TechDescA").val(Items.TechDescA);
            $("#h_TechDescE").val(Items.TechDescE);
            $("#h_Uom_UomCode").text(Items.UomCode);
            $("#txtUomID").text(Items.UomID);
            $("#h_UnitPrice").val(Items.UnitPrice);
            $("#txtMinUnitPrice").val(Items.MinUnitPrice);
            $("#txtStdPrice").val(Items.StdPrice);
            //if (Items.IsEditable == true) {
            //    $("#h_DescE").removeAttr("disabled");
            //    $("#h_DescA").removeAttr("disabled");
            //} else {
            //    $("#h_DescE").attr("disabled", "disabled");
            //    $("#h_DescA").attr("disabled", "disabled");
            //}
        });
    }
    function Assign() {
        StageItem = DetailsAssignHeader;
        StageItem.OfferItemId = DetailsAssignHeader.OfferItemId;
    }
    function Validation() {
        var _Result = true;
        var _MinUnitPrice = Number($("#txtMinUnitPrice").val());
        if (IsNullOrEmpty(DetailsAssignHeader.LineCode.toString())) {
            WorningMessage("الرجاء استكمال البيانات", "Please complete Data");
            _Result = false;
        }
        else if (IsNullOrEmpty(DetailsAssignHeader.ItemCode.toString()) || DetailsAssignHeader.ItemCode.toString() == "0") {
            WorningMessage("الرجاء استكمال البيانات", "Please complete Data");
            _Result = false;
        }
        else if (IsNullOrEmpty(DetailsAssignHeader.Qty.toString()) || DetailsAssignHeader.Qty == 0) {
            WorningMessage("الرجاء استكمال البيانات", "Please complete Data");
            _Result = false;
        }
        else if (IsNullOrEmpty(DetailsAssignHeader.UnitPrice.toString())) {
            WorningMessage("الرجاء استكمال البيانات", "Please complete Data");
            _Result = false;
        }
        else if (DetailsAssignHeader.UnitPrice < _MinUnitPrice) {
            WorningMessage("سعر البيع يجب ان لا يكون اقل من اقل سعر", "Sales Price Can not be less than the Min Sales Price");
            _Result = true;
        }
        else if (DetailsAssignHeader.OfferID == 0 || DetailsAssignHeader.OfferStageId == 0 || $("#DropOfferStageId").val() == "null") {
            WorningMessage("الرجاء اختيار درجة الصنف", "Please choose stage item");
            _Result = false;
        }
        return _Result;
    }
    function NotRepaited(Action) {
        var _OfferId = Number($("#txtOfferId").val());
        DataList = Ajax.Call({ url: Url.Action("GetItemsByOfferId", ControllerName), data: { OfferId: _OfferId } });
        var _LineCode = $('#h_LineCode').val().replace(/\s/g, '');
        if (Action == "Insert") {
            for (var _i = 0, DataList_1 = DataList; _i < DataList_1.length; _i++) {
                var item = DataList_1[_i];
                var OldLC = item.LineCode.replace(/\s/g, '');
                if (OldLC == _LineCode) {
                    return false;
                }
            }
        }
        else if (Action == "Update") {
            debugger;
            var _NewDS = DataList;
            var _Index = _NewDS.indexOf(_NewDS.filter(function (x) { return x.OfferItemId == _OfferItemId; })[0]);
            _NewDS.splice(_Index, 1);
            var _Index2 = _NewDS.filter(function (x) { return x.LineCode.replace(/\s/g, '') == _LineCode; }).length;
            for (var i = 0; i < _NewDS.length; i++) {
                if (_Index2 > 0) {
                    return false;
                }
            }
        }
    }
    function Insert() {
        if (NotRepaited("Insert") == false) {
            WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
            return;
        }
        if (Validation() == false) {
            return;
        }
        Ajax.CallAsync({
            url: Url.Action("InsertStageItem", ControllerName),
            data: DetailsAssignHeader,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    //WorningMessage("تم الحفظ بنجاح", "Successfully saved", "الاضافه", "Insert");
                    //let max: number = GetMaxId();
                    //DetailsAssignHeader.OfferItemId = max;
                    DataSource.push(result.ResponseData);
                    BindDataGrids();
                    SumTotal();
                    _OfferItemId = 0;
                }
                else {
                    MessageBox.Show(result.ResponseMessage, "Insert");
                }
                if (Number($("#txtStatus").val()) == 0) {
                    $("#btnAddItemGrid").removeAttr("disabled");
                }
                else {
                    $("#btnAddItemGrid").attr("disabled", "disabled");
                }
            }
        });
    }
    function LoadDetailsAfterInsert(id) {
        Ajax.CallAsync({
            url: Url.Action("LoadDetailsAfterInsert", ControllerName),
            data: { id: id },
            success: function (d) {
                DataSource = d.result;
                GridChild.DataSource = DataSource;
            }
        });
    }
    function Update() {
        if (NotRepaited("Update") == false) {
            WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
            return;
        }
        if (Validation() == false) {
            WorningMessage("الرجاء استكمال البيانات", "Please complete Data");
            return;
        }
        DetailsAssignHeader.OfferItemId = _OfferItemId;
        Ajax.CallAsync({
            url: Url.Action("UpdateStageItem", ControllerName),
            data: DetailsAssignHeader,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    WorningMessage("تم التعديل بنجاح", "Successfully saved", "Update", "تعديل");
                    DataSource.push(DetailsAssignHeader);
                    BindDataGrids();
                    SumTotal();
                    _OfferItemId = 0;
                }
                else {
                    MessageBox.Show(result.ResponseMessage, "Update");
                }
                if (Number($("#txtStatus").val()) == 0) {
                    $("#btnAddItemGrid").removeAttr("disabled");
                }
                else {
                    $("#btnAddItemGrid").attr("disabled", "disabled");
                }
            }
        });
    }
    function Delete() {
        debugger;
        Ajax.CallAsync({
            url: Url.Action("DeleteStageItem", ControllerName),
            data: DetailsAssignHeader,
            success: function (d) {
                debugger;
                var result = d.result;
                if (result.ResponseState == false) {
                    MessageBox.Show(result.ResponseMessage, "Delete");
                    WorningMessage("لا يمكن حذف هذا العنصر", "Cannot Delete This Item");
                }
            }
        });
    }
    function AddItem(e) {
        var StageItem = e.Item;
        FillDataSource(GridChild, DataSource, StageItem);
    }
    function FillDataSource(_Grid, _Arr, _Obj) {
        _Arr.push(_Obj);
        _Grid.DataSource = _Arr;
        _Grid.Bind();
    }
    function BindDataGrids() {
        GridChild.DataSource = DataSource;
        for (var _i = 0, DataSource_2 = DataSource; _i < DataSource_2.length; _i++) {
            var itm = DataSource_2[_i];
            itm.calc_total = itm.Qty * itm.UnitPrice;
        }
        GridChild.Bind();
        //$("#btnAddItemGrid").attr("disabled", "disabled");
        //$("#h_DescE").attr("disabled", "disabled");
        //$("#h_DescA").attr("disabled", "disabled");
    }
    function FillInputText(_TextID, _Data) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }
})(_OfferStageItem || (_OfferStageItem = {}));
//# sourceMappingURL=_OfferStageItem.js.map