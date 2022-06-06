$(document).ready(() => {
    _OfferStageItem.InitalizeComponent();
});
namespace _OfferStageItem {
    const ControllerName: string = "OfferDefinition";
    const JsGridcombobox: string = "combobox";
    const GridInputClassName = "form-control gridIput";
    const NumberColumnWidth = "50px";

    var DataSource: Array<PQ_GetSlsOfferStageItem> = new Array<PQ_GetSlsOfferStageItem>();
    var DataList: Array<PQ_GetSlsOfferStageItem> = new Array<PQ_GetSlsOfferStageItem>();

    var DetailsAssignHeader: PQ_GetSlsOfferStageItem = new PQ_GetSlsOfferStageItem();
    var StageItem: P_Tr_SalesOfferStageItem = new P_Tr_SalesOfferStageItem();
    var _OfferItemId: number = 0;
    var maxId : number = 0;
    var GridChild: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    var _ScreenLang: string;
    var _CompCode: string;
    var _BraCode: string;
    export function InitalizeComponent() {
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

    function InitalizeGrid() {

        let res: any = GetResourceList("OffStagI_");
        GridChild.ElementName = "GridChild";
        GridChild.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridChild.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridChild.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;;
        GridChild.InsertionMode = JsGridInsertionMode.Binding;
        GridChild.Columns = [
            {
                name: "LineCode", width: "8%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, "", " ", "LineCode", " ");
                    txt.id = "h_LineCode"
                    return HeaderTemplateNew(res.OffStagI_Ser, txt);
                }
            },
            {
                name: "ItemID", visible: false, width: "0%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ItemID", " ");
                    txt.id = "h_ItemID"
                    return HeaderTemplateNew("", txt);
                }
            },
            {
                name: "ItemCode", width: "12%", css: " JsGridHeaderCenter",
                headerTemplate: (): HTMLElement => {
                    let btnFindSalesItem: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindSalesItem = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindSalesItem.className = "btn btn-primary btn-block";
                    btnFindSalesItem.innerText = _ScreenLang == "ar" ? "كود الصنف" : "Item Code";
                    btnFindSalesItem.type = "button";
                    btnFindSalesItem.id = "btnFindSalesItem";
                    btnFindSalesItem.onclick = (e) => {
                        btnFindSalesItems_onclick();
                    };
                    return HeaderTemplateNew(res.OffStagI_ItemNo, btnFindSalesItem);
                }
            },
            {
                name: "DescA", title: res.OffStagI_ItemName, width: "50%",
                headerTemplate: (): HTMLElement => {
                    let element: HTMLElement = DocumentActions.CreateElement<HTMLInputElement>("textarea");
                    element.className = GridInputClassName;
                    element.style.height = "38px";
                    element.id = "h_DescA";
                    return HeaderTemplateNew(res.OffStagI_ItemName, element);
                }
            },
            {
                name: "DescE", title: res.OffStagI_ItemName, width: "50%",
                headerTemplate: (): HTMLElement => {
                    let element: HTMLElement = DocumentActions.CreateElement<HTMLInputElement>("textarea");
                    element.className = GridInputClassName;
                    element.style.height = "38px";
                    element.id = "h_DescE";
                    
                    return HeaderTemplateNew(res.OffStagI_ItemName, element);
                }
            },
            {
                name: "TechDescE", title: res.OffStagI_SystemName_en, width: "22%",
                headerTemplate: (): HTMLElement => {
                    let txt: HTMLElement = CreateElement("text", GridInputClassName, " ", " ", "TechDescE", " ");
                    txt.id = "h_TechDescE";
                    return HeaderTemplateNew(res.OffStagI_SystemName_en, txt);
                }
            },
            {
                name: "TechDescA", title: res.OffStagI_SystemName_ar, width: "22%",
                headerTemplate: (): HTMLElement => {
                    let txt: HTMLElement = CreateElement("text", GridInputClassName, " ", " ", "TechDescA", " ");
                    txt.id = "h_TechDescA";
                    return HeaderTemplateNew(res.OffStagI_SystemName_ar, txt);
                }
            },
            {
                title: res.OffStagI_Fixed, name: "IsFixedSystem", width: "5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("checkbox", GridInputClassName, " ", " ", "IsFixedSystem", " ");
                    txt.id = "h_IsFixedSystem";
                    return HeaderTemplateNew(res.OffStagI_Fixed, txt);
                }
            },
            {
                title: res.OffStagI_UOM, name: "Uom_UomCode", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt: HTMLElement = DocumentActions.CreateElement<HTMLElement>("label");
                    txt.id = "h_Uom_UomCode";
                    return HeaderTemplateNew(res.OffStagI_UOM, txt);
                }
            },
            {
                title: res.OffStagI_Qty, name: "Qty", width: "8%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Qty", " ");
                    txt.id = "h_Qty";
                    txt.onkeyup = (e) => {
                        CalcTotal();
                    };
                    return HeaderTemplateNew(res.OffStagI_Qty, txt);
                }
            },
            {
                title: res.OffStagI_UnitPrice, name: "UnitPrice", width: "8%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "UnitPrice", " ");
                    txt.id = "h_UnitPrice";
                    txt.onkeyup = (e) => {
                        CalcTotal();
                    };
                    return HeaderTemplateNew(res.OffStagI_UnitPrice, txt);
                }
            },
            {
                name: "calc_total", title: res.OffStagI_Total, width: "13%",
                headerTemplate: (): HTMLElement => {
                    let txt: HTMLElement = DocumentActions.CreateElement<HTMLElement>("label");
                    txt.id = "h_calc_total";
                    return HeaderTemplateNew(res.OffStagI_Total, txt);
                }
            },
            {
                title: res.OffStagI_IsOfferItem, name: "IsOfferItem", width: "8%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("checkbox", GridInputClassName, " ", " ", "IsOfferItem", " ");
                    txt.id = "h_IsOfferItem";
                    txt.checked = true;
                    return HeaderTemplateNew(res.OffStagI_IsOfferItem, txt);
                }
            },
            {
                title: res.OffStagI_Remarks, name: "Remarks", width: "25%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Remarks", " ");
                    txt.id = "h_Remarks";
                    return HeaderTemplateNew(res.OffStagI_Remarks, txt);
                }
            },
            {
                title: "#", name: "btnAddItem", visible: true, width: NumberColumnWidth,
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton + "editable";
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemGrid";
                    btn.onclick = (e) => {
                        AddItemInGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GetSlsOfferStageItem): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.id = "btnDeleteItemGrid";
                    btn.name = DataSource.indexOf(item).toString();
                    btn.onclick = (e) => {
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        debugger;
                        DetailsAssignHeader = item;
                        Delete();
                        debugger
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
                itemTemplate: (s: string, item: PQ_GetSlsOfferStageItem): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.style.fontSize = "20px";
                    btn.id = "btnEditItemGrid";
                    btn.style.color = "forestgreen";
                    btn.name = DataSource.indexOf(item).toString();
                    btn.onclick = (e) => {
                        
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
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
                        } else {
                            $("#btnAddItemGrid").attr("disabled", "disabled");
                        }
                    };
                    return btn;
                }
            }
        ];
        BindDataGrids();
    }

    export function ClearGridStage() {
        ClearGrid(GridChild, DataSource);
        DataSource = new Array<PQ_GetSlsOfferStageItem>();
    }

    function DropOfferStageId_onChange() {
        
        let _StageItemId: number = Number($("#DropOfferStageId").val());
        let _OfferId: number = Number($("#txtOfferId").val());
        let _Val: string = $("#DropOfferStageId").val();
        if (_Val == null || _Val == 'null') {
            ClearGrid(GridChild, DataSource);
            DataSource = new Array<PQ_GetSlsOfferStageItem>();
        } else {
            DataSource = Ajax.Call<Array<PQ_GetSlsOfferStageItem>>({ url: Url.Action("GetOfferStageItemByOfferId", ControllerName), data: { OfferId: _OfferId, StageItemId: _StageItemId } });

            if (DataSource.length > 0) {
                BindDataGrids();
            } else {
                ClearGrid(GridChild, DataSource);
                DataSource = new Array<PQ_GetSlsOfferStageItem>();
            }
            OfferDefinition.CheckButtonAddInStageItem();
        }
    }

    function SumTotal() {
        let _Total: number = 0;
        for (var item of DataSource) {
            if (item.IsOfferItem == true) {
                _Total += item.calc_total;
            }
        }
        $("#txtTotalItem").val(_Total.toString());
    }

    function CalcTotal() {
        debugger
        let _Qty: Number = IsNullOrEmpty($('#h_Qty').val()) ? 0 : Number($('#h_Qty').val());
        let _Price: Number = IsNullOrEmpty($('#h_UnitPrice').val()) ? 0 : Number($('#h_UnitPrice').val());
        let _Result: number = Number(_Qty) * Number(_Price);
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
        debugger
        if (_OfferItemId == 0) {
            Insert();
        } else {
            Update()
        }
        if (Number($("#txtStatus").val()) == 0) {
            $("#btnAddItemGrid").removeAttr("disabled");
        } else {
            $("#btnAddItemGrid").attr("disabled", "disabled");
        }
    }

    function btnFindSalesItems_onclick() {
        debugger;
        if (ClientSharedWork.CurrentMode != ScreenModes.Edit || $("#DropOfferStageId").val() == "null")
            return;
        //let _ScopId: number = Number($("#txtScopeID").val());
        let Condition: string = "CompCode = " + _CompCode + "  and IsDetail = 1 and IsActive = 1"; /*and ScopeID = " + _ScopId;*/
        sys.FindKey("OfferStageItem", "btnFindSalesItem", Condition, () => {
            let ItemId: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            let Items = Ajax.Call<any>({ url: Url.Action("GetItemsById", ControllerName), data: { id: ItemId } });
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
        })
    }

    function Assign() {
        StageItem = DetailsAssignHeader as P_Tr_SalesOfferStageItem;
        StageItem.OfferItemId = DetailsAssignHeader.OfferItemId;
    }

    function Validation(): boolean {
        let _Result: boolean = true;
        let _MinUnitPrice: Number = Number($("#txtMinUnitPrice").val());
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
        } else if (DetailsAssignHeader.OfferID == 0 || DetailsAssignHeader.OfferStageId == 0 || $("#DropOfferStageId").val() == "null") {
            WorningMessage("الرجاء اختيار درجة الصنف", "Please choose stage item");
            _Result = false;
        }
        return _Result;
    }

    function NotRepaited(Action: string): boolean {
        
        let _OfferId: number = Number($("#txtOfferId").val());
        DataList = Ajax.Call<Array<PQ_GetSlsOfferStageItem>>({ url: Url.Action("GetItemsByOfferId", ControllerName), data: { OfferId: _OfferId } });
        let _LineCode: string = $('#h_LineCode').val().replace(/\s/g, '');

        if (Action == "Insert") {
            for (var item of DataList) {
                let OldLC: string = item.LineCode.replace(/\s/g, '');

                if (OldLC == _LineCode) {
                    return false;
                }
            }
        } else if (Action == "Update") {
            debugger
            let _NewDS = DataList;
            let _Index = _NewDS.indexOf(_NewDS.filter(x => x.OfferItemId == _OfferItemId)[0]);
            _NewDS.splice(_Index, 1);
            let _Index2 = _NewDS.filter(x => x.LineCode.replace(/\s/g, '') == _LineCode).length;
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
            success: (d) => {
                
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    //WorningMessage("تم الحفظ بنجاح", "Successfully saved", "الاضافه", "Insert");
                    
                    //let max: number = GetMaxId();
                    //DetailsAssignHeader.OfferItemId = max;
                    DataSource.push(result.ResponseData);
                    BindDataGrids();
                    SumTotal();
                    _OfferItemId = 0;
                } else {
                    MessageBox.Show(result.ResponseMessage, "Insert");
                }
                if (Number($("#txtStatus").val()) == 0) {
                    $("#btnAddItemGrid").removeAttr("disabled");
                } else {
                    $("#btnAddItemGrid").attr("disabled", "disabled");
                }
            }
        });
    }


    function LoadDetailsAfterInsert(id: number) {
        
        Ajax.CallAsync({
            url: Url.Action("LoadDetailsAfterInsert", ControllerName),
            data: { id: id },
            success: (d) => {
                DataSource = d.result as Array<PQ_GetSlsOfferStageItem>;
                GridChild.DataSource = DataSource;
            }
        })
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
            success: (d) => {
                
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    WorningMessage("تم التعديل بنجاح", "Successfully saved", "Update", "تعديل");
                    DataSource.push(DetailsAssignHeader);
                    BindDataGrids();
                    SumTotal();
                    _OfferItemId = 0;
                } else {
                    MessageBox.Show(result.ResponseMessage, "Update");
                }
                if (Number($("#txtStatus").val()) == 0) {
                    $("#btnAddItemGrid").removeAttr("disabled");
                } else {
                    $("#btnAddItemGrid").attr("disabled", "disabled");
                }
            }
        });
    }

    function Delete() {
        debugger
        Ajax.CallAsync({
            url: Url.Action("DeleteStageItem", ControllerName),
            data: DetailsAssignHeader,
            success: (d) => {
                debugger;
                let result = d.result as ResponseResult;
                if (result.ResponseState == false) {
                    MessageBox.Show(result.ResponseMessage, "Delete");
                    WorningMessage("لا يمكن حذف هذا العنصر", "Cannot Delete This Item");
                }
            }
        });
    }

    function AddItem(e: JsGridInsertEventArgs) {
        let StageItem = e.Item as P_Tr_SalesOfferStageItem;
        FillDataSource(GridChild, DataSource, StageItem);
    }

    function FillDataSource<T>(_Grid: JsGrid, _Arr: Array<T>, _Obj: any) {
        _Arr.push(_Obj);
        _Grid.DataSource = _Arr;
        _Grid.Bind();
    }

    function BindDataGrids() {
        GridChild.DataSource = DataSource;
        for (var itm of DataSource) {
            itm.calc_total = itm.Qty * itm.UnitPrice;
        }
        GridChild.Bind();
        //$("#btnAddItemGrid").attr("disabled", "disabled");
        //$("#h_DescE").attr("disabled", "disabled");
        //$("#h_DescA").attr("disabled", "disabled");
    }

    function FillInputText(_TextID: string, _Data: any) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }
}
