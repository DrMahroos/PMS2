$(document).ready(() => {
    SalesItemPlan.InitalizeComponent();
});
namespace SalesItemPlan {
    const ControllerName: string = "SalesItemPlan";
    var MasterDetails: M_D_ItemPlan = new M_D_ItemPlan();
    var Uom: Array<P_D_UOM> = new Array<P_D_UOM>();
    var Master: PQ_GetSalesItem = new PQ_GetSalesItem();

    var Details: Array<PQ_GETSalesItemActivity> = new Array<PQ_GETSalesItemActivity>();
    var DetailsAssignHeader: PQ_GETSalesItemActivity = new PQ_GETSalesItemActivity();
    var ReturnDataSource: PQ_GETSalesItemActivity = new PQ_GETSalesItemActivity();
    var DataSource: Array<PQ_GETSalesItemActivity> = new Array<PQ_GETSalesItemActivity>();
    var tbl_SalesItemActivity: Array<P_D_SalesItemsActivity> = new Array<P_D_SalesItemsActivity>();
    var columnWidth: string = "100px";
    const NumberColumnWidth = "50px";
    const GridInputClassName = "form-control gridIput";
    var Grid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();

    var txtItemCode: HTMLInputElement;
    var txtSystemCode: HTMLInputElement;
    var txtSysDescE: HTMLInputElement;
    var txtNAMEA: HTMLInputElement;
    var txtDescE: HTMLInputElement;
    var txtItemLevel: HTMLInputElement;
    var txtUnitPrice: HTMLInputElement;
    var txtMinUnitPrice: HTMLInputElement;
    var txtUomDescA: HTMLInputElement;
    var txtScopeDescA: HTMLInputElement;
    var btnSearchcode: HTMLButtonElement;
    var btnFindActivity: HTMLButtonElement;
    var activityId: number;
    var ItemID: number;
    var ItemsActivityId: number;
    var _ScreenLang: string;
    var _CompCode: string;
    var _BraCode: string;
    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BraCode = SharedSession.CurrentEnvironment.BranchCode;
        InitalizeControls();
        InitalizeEvents();
        SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddButton.disabled = true;
        //ControlsButtons.AddAction(() => { });
        ControlsButtons.EditAction(Edit);
        ControlsButtons.SaveAction(() => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                return;
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        //ControlsButtons.PrintAction(() => { });
        //ControlsButtons.DeleteAction(() => { });
        ControlsButtons.UndoAction(Undo);
        Uom = Ajax.Call<Array<P_D_UOM>>({ url: Url.Action("GetUomList", "SalesItemPlan") });
        InitalizeGrid();
        //$("#h_ActivityID").height("25");
        $("#h_ActivityDesc").attr("disabled", "disabled");
        $("#h_UOM").attr("disabled", "disabled");

        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_CompCode, _BraCode, Modules.SalesItemPlan, Master.ItemID.toString());
        });

    }

    function InitalizeGrid() {
        let res: any = GetResourceList("Fld_");
        Grid.ElementName = "Grid";
        Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
        Grid.OnRefreshed = () => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                //$(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                //$(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        Grid.Editing = SharedSession.CurrentPrivileges.EDIT;
        Grid.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        Grid.InsertionMode = JsGridInsertionMode.Internal;
        Grid.OnItemInserting = () => { };
        Grid.OnItemUpdating = () => { };
        Grid.OnItemDeleting = () => { };
        Grid.Columns = [
            {
                title: res.Fld_ActivityID, name: "ActivityID", width: columnWidth, css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let btnFindActivity: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindActivity = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindActivity.className = "btn btn-primary btn-block addable editable";
                    btnFindActivity.innerText = _ScreenLang == "ar" ? "تحميل الانشطة" : "Loading Activity";
                    btnFindActivity.id = "btnFindActivity";
                    btnFindActivity.type = "button";
                    btnFindActivity.onclick = (e) => {
                        btnFindActivity_onclick();
                    };
                    return HeaderTemplate("Fld_ActivityID", btnFindActivity);
                },
                itemTemplate: (index: string, item: P_D_Activity): HTMLElement => {
                    let lbl = DocumentActions.CreateElement<HTMLLabelElement>("label");
                    lbl.innerText = item.ActivityCode.toString();
                    return lbl;
                }
            },
            {
                title: res.Fld_ActivityDesc, visible: _ScreenLang == "ar", name: "ActDescA", width: "20%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ActDescA", " ");
                    txt.id = "h_ActDescA";
                    txt.disabled = true;
                    txt.hidden = _ScreenLang == "en";
                    return HeaderTemplate("Fld_ActivityDesc", txt);
                }
            },
            {
                title: res.Fld_ActivityDesc, visible: _ScreenLang == "en", name: "ActDescE", width: "20%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ActDescE", " ");
                    txt.id = "h_ActDescE";
                    txt.disabled = true;
                    txt.hidden = _ScreenLang == "ar";
                    return HeaderTemplate("Fld_ActivityDesc", txt);
                }
            },
            {
                title: res.Fld_UOM, visible: _ScreenLang == "ar", name: "puomdescA", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "puomdescA", " ");
                    txt.disabled = true;
                    txt.id = "h_ActUomDescA";
                    txt.hidden = _ScreenLang == "en";
                    return HeaderTemplate("Fld_UOM", txt);
                }
            },
            {
                title: res.Fld_UOM, visible: _ScreenLang == "en", name: "puomDescE", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "puomDescE", " ");
                    txt.disabled = true;
                    txt.id = "h_ActUomDescE";
                    txt.hidden = _ScreenLang == "ar";
                    return HeaderTemplate("Fld_UOM", txt);
                }
            },
            {
                title: res.Fld_ActQty, name: "ActQty", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("number", GridInputClassName, " ", " ", "ActQty", " ");
                    txt.id = "h_ActQty";
                    return HeaderTemplate("Fld_ActQty", txt);
                }
            },
            {
                title: res.Fld_IsProdIncluded, name: "IsProdIncluded", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("checkbox", GridInputClassName, " ", " ", "IsProdIncluded", " ");
                    txt.id = "h_IsProdIncluded";
                    return HeaderTemplate("Fld_IsProdIncluded", txt);
                }
            },
            {
                title: res.Fld_ProdPrc, name: "ProdPrc", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("number", GridInputClassName, " ", " ", "ProdPrc", " ");
                    txt.id = "h_ProdPrc";
                    return HeaderTemplate("Fld_ProdPrc", txt);
                }
            },
            {
                title: "#", name: "btnAddItem", visible: true, width: NumberColumnWidth,
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton;
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemGrid";
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddItemInGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GETSalesItemActivity): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.type = "button";
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.name = Details.indexOf(item).toString();
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        Details.splice(index, 1);
                        BindDataGrids();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            }
            ,
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: (s: string, item: PQ_GETSalesItemActivity): HTMLButtonElement => {

                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton;
                    btn.type = "button";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.name = Details.indexOf(item).toString();
                    btn.onclick = (e) => {

                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        DetailsAssignHeader = new PQ_GETSalesItemActivity();
                        ItemID = item.ItemID;
                        activityId = item.ActivityID;
                        ItemsActivityId = item.ItemsActivityId;
                        DetailsAssignHeader.ActivityCode = item.ActivityCode;
                        DetailsAssignHeader.ActDescA = item.ActDescA;
                        DetailsAssignHeader.ActDescE = item.ActDescE;
                        DetailsAssignHeader.puomdescA = item.puomdescA;
                        DetailsAssignHeader.puomDescE = item.puomDescE;
                        DetailsAssignHeader.ActQty = item.ActQty;
                        DetailsAssignHeader.IsProdIncluded = item.IsProdIncluded;
                        DetailsAssignHeader.ProdPrc = item.ProdPrc;

                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        Details.splice(index, 1);
                        BindDataGrids();
                        
                        DetailsAssignHeader.ActivityID = activityId;
                        DetailsAssignHeader.ItemID = ItemID;
                        DetailsAssignHeader.ItemsActivityId = ItemsActivityId;
                        FillInputText("btnFindActivity", item.ActivityCode);
                        FillInputText("h_ActDescA", item.ActDescA);
                        FillInputText("h_ActDescE", item.ActDescE);
                        FillInputText("h_ActUomDescA", item.puomdescA);
                        FillInputText("h_ActUomDescE", item.puomDescE);
                        FillInputText("h_ActQty", item.ActQty.toString());
                        
                        if (item.IsProdIncluded == "1") {
                            $('#h_IsProdIncluded').attr('checked', 'checked');
                        } else {
                            $('#h_IsProdIncluded').removeAttr('checked');
                        }
                        FillInputText("h_ProdPrc", item.ProdPrc.toString());
                    };
                    return btn;
                }
            }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
        $(".jsgrid-header-scrollbar").height("75");
    }

    function InitalizeControls() {
        txtItemCode = DocumentActions.GetElementById<HTMLInputElement>("txtItemCode");
        txtSystemCode = DocumentActions.GetElementById<HTMLInputElement>("txtSystemCode");
        txtSysDescE = DocumentActions.GetElementById<HTMLInputElement>("txtSysDescE");
        txtNAMEA = DocumentActions.GetElementById<HTMLInputElement>("txtNAMEA");
        txtDescE = DocumentActions.GetElementById<HTMLInputElement>("txtDescE");
        txtItemLevel = DocumentActions.GetElementById<HTMLInputElement>("txtItemLevel");
        txtUnitPrice = DocumentActions.GetElementById<HTMLInputElement>("txtUnitPrice");
        txtMinUnitPrice = DocumentActions.GetElementById<HTMLInputElement>("txtMinUnitPrice");
        txtUomDescA = DocumentActions.GetElementById<HTMLInputElement>("txtUomDescA");
        txtScopeDescA = DocumentActions.GetElementById<HTMLInputElement>("txtScopeDescA");
        btnSearchcode = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchcode");
        btnFindActivity = DocumentActions.GetElementById<HTMLButtonElement>("btnFindActivity");
    }

    function InitalizeEvents() {
        btnSearchcode.onclick = btnSearchcode_clicked;
    }

    function Navigate() {
        
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {
                
                Master = d.result as PQ_GetSalesItem;
                Display();
            }
        })
    }

    function Display() {
        
        DocumentActions.RenderFromModel(Master);
        LoadDetails(Master.ItemID);
    }

    function LoadDetails(id: number) {
        
        Ajax.CallAsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { itemIid: Number(Master.ItemID) },
            success: (d) => {
                
                Details = d.result as Array<PQ_GETSalesItemActivity>;
                for (var itm of Details) {
                    if (itm.IsProdIncluded == "1") {
                        itm.IsProdIncluded = "1";
                    }
                    else { itm.IsProdIncluded = "0"; }
                }
                BindDataGrids();
            }
        })
    }

    function Add() {

    }

    function Edit() {

    }

    function Validation(): boolean {
        var _Result: boolean = true;
        //check on total persentage
        debugger
        let CountPersnt: number = 0;
        for (var item of Details) {
            if (item.IsProdIncluded == "1" || item.IsProdIncluded == "true") {
                let _Per: Number = Number(item.ProdPrc);
                CountPersnt += Number(_Per);
            }
        }
        if (CountPersnt != 100) {
            WorningMessage("اجمالي نسبة الانتاج يجب ان يساوي 100", "Total percent must be equal 100");
            _Result = false;
        }
        //end check on total persentage
        return _Result;
    }

    function Update() {
        debugger
        if (Validation() == false) {
            return;
        }
        Assign();
        Master.CompCode = Number(_CompCode);
        debugger
        Ajax.CallAsync({
            url: Url.Action("UpdatePlan", ControllerName),
            data: { JsonData: JSON.stringify(MasterDetails) },
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    debugger
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Update", () => {
                        Display();
                        
                        let _Index = GetIndexByUseId(result.ResponseData.ItemID, "PQ_GetSalesItem", "ItemID", " CompCode = " + _CompCode + " and IsDetail = 1");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        })
    }

    function Undo() {

    }

    function btnSearchcode_clicked() {
        
        sys.FindKey(Modules.SalesItemPlan, "btnSearchcode", "CompCode = " + _CompCode   + " and IsDetail = 1 ", () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSalesItems", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    Master = d.result as PQ_GetSalesItem;
                    let index = GetIndexByUseId(Master.ItemID, "PQ_GetSalesItem", "ItemID", "IsDetail = 1 ");
                    NavigateToSearchResultKey(Number(index), Navigate);
                }
            });
        });
    }

    function AddItemInGrid() {
        debugger
        //btnFindActivity
        let BtnActVal = $("#btnFindActivity").text();
        let _ActQty = $("#h_ActQty").val();
        let BaseText = _ScreenLang == "ar" ? "تحميل الانشطة" : "Loading Activity";
        if (BtnActVal == BaseText || BtnActVal == "") {
            WorningMessage("الرجاء ادخال نشاط", "Plese Enter Activity");
            return;
        }
        if (_ActQty == "") {
            WorningMessage("الرجاء ادخال كميه", "Plese Enter QTY");
            return;
        }
        DetailsAssignHeader = new PQ_GETSalesItemActivity();
        let production: number = $('#h_ProdPrc').val();
        let isProduct: string;
        if (($('#h_IsProdIncluded').prop('checked')) == false) {
            isProduct = "0";
            production = 0;
        }
        else {
            isProduct = "1";
        }
        if (production < 0 || production > 100) {
            WorningMessage("يجب ان تكون النسبة % من 0 الى 100", "Prodction % Must be between 0 : 100", "Worrning");
            return;
        }
        for (var itm of Details) {
            if (itm.ActivityCode == $('#btnFindActivity').text()) {
                WorningMessage("لا يمكن تكرار النشاط", "Activity Cannot Repeated");
                return;
            }
        }
        debugger
        DetailsAssignHeader.ActivityID = activityId;
        DetailsAssignHeader.ItemID = ItemID;
        DetailsAssignHeader.ItemsActivityId = ItemsActivityId;
        DetailsAssignHeader.ActivityCode = $('#btnFindActivity').text();
        DetailsAssignHeader.ActDescA = $('#h_ActDescA').val();
        DetailsAssignHeader.ActDescE = $('#h_ActDescE').val();
        DetailsAssignHeader.puomdescA = $('#h_ActUomDescA').val();
        DetailsAssignHeader.puomDescE = $('#h_ActUomDescE').val();
        DetailsAssignHeader.ActQty = $('#h_ActQty').val();
        
        DetailsAssignHeader.IsProdIncluded = isProduct;
        DetailsAssignHeader.ProdPrc = Number($('#h_ProdPrc').val());
        Details.unshift(DetailsAssignHeader);
        BindDataGrids();
        //$("#txtFindActivityId").text("");
        //$("#h_ItemsSystemActivityId").text("");
        //$('#h_ItemsSystemId').text();
    }

    function BindDataGrids() {
        Grid.DataSource = Details;
        Grid.Bind();
        $(".jsgrid-header-scrollbar").height("75");
    }

    function FillInputText(_TextID: string, _Data: string) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }

    function Assign() {
        
        DocumentActions.AssignToModel<PQ_GetSalesItem>(Master);
        MasterDetails.P_D_SalesItems = Master as PQ_GetSalesItem;
        MasterDetails.P_D_SalesItems.ItemID = Master.ItemID;
        
        //AssignDetails
        MasterDetails.P_D_SalesItemsActivity = Details as Array<PQ_GETSalesItemActivity>;
        for (var detail of Details) {
            detail.ItemID = Master.ItemID;
            if (detail.IsProdIncluded == "1") {
                detail.IsProdIncluded = "true";
            } else {
                detail.IsProdIncluded = "false";
            }
            tbl_SalesItemActivity.push(detail);
        }
    }

    //function AssignDetails(): boolean {

    //    let result: boolean = true;
    //    let index = Details.indexOf(Details.filter(f => f.ItemsActivityId == null)[0]);
    //    if (index >= 0)
    //        Details.splice(index, 1);
    //    for (var row of Details) {
    //        if (row.IsProdIncluded == "1") {
    //            row.IsProdIncluded = "true";
    //        } else {
    //            row.IsProdIncluded = "false";
    //        }
    //        result = Ajax.Call<boolean>({
    //            url: Url.Action("AssignDetails", ControllerName),
    //            data: row
    //        });
    //        if (result == false) {
    //            break;
    //        }
    //    }
    //    return result;
    //}

    //function AssignTrDetails() {
    //    
    //    DataSource = new Array<PQ_GETSalesItemActivity>();
    //    for (var _Row of Details) {
    //        ReturnDataSource = new PQ_GETSalesItemActivity;
    //        var _Serial: number = 1 + Number(DataSource.length);
    //        ReturnDataSource.ActivityID = _Row.ActivityID;
    //        ReturnDataSource.ItemID = Master.ItemID;
    //        ReturnDataSource.ActQty = _Row.ActQty;
    //        ReturnDataSource.IsProdIncluded = _Row.IsProdIncluded == "1" ? "1" : "0";
    //        ReturnDataSource.ProdPrc = _Row.ProdPrc;
    //        DataSource.unshift(ReturnDataSource);
    //    }
    //}

    function btnFindActivity_onclick() {
        
        let Condition: string = "IsDetail='true' And CompCode = " + _CompCode;
        sys.FindKey(Modules.SalesItemPlan, "btnFindActivity", Condition, () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetActivityByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_Activity;
                    activityId = result.ActivityID;
                    $("#btnFindActivity").text(result.ActivityCode);
                    $("#h_ActDescA").val(result.DescA);
                    $("#h_ActDescE").val(result.DescE);
                    let uom: Array<P_D_UOM> = Uom.filter(x => x.UomID == result.UomID);
                    $("#h_ActUomDescA").val(uom[0].DescA);
                    $("#h_ActUomDescE").val(uom[0].DescE);
                }
            });
        })
    }
}