$(document).ready(() => {
    ActivityPrice.InitalizeComponent();
});
namespace ActivityPrice {
    const ControllerName: string = "ActivityPrice";
    const GridInputClassName = "form-control gridIput";
    const NumberColumnWidth = "50px";
    var columnWidth: string = "100px";
    
    var MasterDetails: M_D_ActivityPrice = new M_D_ActivityPrice()

    var DataSource: Array<PQ_GetSalesActivityPriceDetails> = new Array<PQ_GetSalesActivityPriceDetails>();
    var ReturnDataSource: PQ_GetSalesActivityPriceDetails = new PQ_GetSalesActivityPriceDetails();
    var Details: Array<PQ_GetSalesActivityPriceDetails> = new Array<PQ_GetSalesActivityPriceDetails>();
    var DetailsAssignHeader: PQ_GetSalesActivityPriceDetails = new PQ_GetSalesActivityPriceDetails();
    var Master: PQ_GetSalesActivityPrice = new PQ_GetSalesActivityPrice();
    var active: P_D_Activity = new P_D_Activity();
    var Tbl_DetailactPrice: Array<PQ_GetSalesActivityPriceDetails> = new Array<PQ_GetSalesActivityPriceDetails>();

    var Activities: Array<P_D_Activity> = new Array<P_D_Activity>();
    var LoadedActitvties: Array<P_D_Activity> = new Array<P_D_Activity>();
    var activies: P_D_Activity = new P_D_Activity();
    var Grid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    
    var txtTrNo: HTMLInputElement;
    var txtTrDate: HTMLInputElement;
    var txtFromActivityCode: HTMLInputElement;
    var txtFromActivityName: HTMLInputElement;
    var txtParentActivityID: HTMLInputElement;
    var txtParentActivityName: HTMLInputElement;
    var txtRemarks: HTMLInputElement;
    var ChkStatus: HTMLInputElement;
    var txtToActivityCode: HTMLInputElement;
    var txtToActivityName: HTMLInputElement;

    var btnSearchTrNo: HTMLButtonElement;
    var btnFromAct: HTMLButtonElement;
    var btnToAct: HTMLButtonElement;
    var btnParentActivity: HTMLButtonElement;
    var btnloadActivity: HTMLButtonElement;
    var btnCalculate: HTMLButtonElement;
    var activityId: number;
    var D_ActivityID: number;
    var _ScreenLang: string;
    var _CompCode: string;
    var _BraCode: string;
    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BraCode = SharedSession.CurrentEnvironment.BranchCode;

        Activities = Ajax.Call<Array<P_D_Activity>>({ url: Url.Action("GetActivityByID", ControllerName) });
        InitalizeControls();
        InitalizeGrid();
        SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.UndoAction(Undo);
        ControlsButtons.SaveAction(
            () => {
                if (ClientSharedWork.CurrentMode == ScreenModes.Add) {
                    
                    Insert();
                }
                else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                    Update();
            }
        );
        ControlsButtons.PrintAction(() => { PrintSlsActivity(); });
        ControlsButtons.DeleteAction(() => { });
        ControlsButtons.UndoAction(Undo);
        InitalizeEvents();

        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_CompCode, _BraCode, Modules.ActivityPrice, Master.ActivityPriceId.toString());
        });


    }

    function InitalizeGrid() {
        let res: any = GetResourceList("Fld_");
        Grid.ElementName = "Grid";
        Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
        Grid.OnRefreshed = () => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        Grid.Editing = SharedSession.CurrentPrivileges.EDIT;
        Grid.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        Grid.InsertionMode = JsGridInsertionMode.Binding;
        Grid.OnItemInserting = () => { };
        Grid.OnItemUpdating = () => { };
        Grid.OnItemDeleting = () => { };
        Grid.Columns = [
            {
                title: res.Fld_ActivityPriceDetailId, name: "ActivityID", width: columnWidth, css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let btnFindAtcivity: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindAtcivity = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindAtcivity.className = "btn btn-primary btn-block addable editable";
                    btnFindAtcivity.innerText = _ScreenLang == "ar" ? "الانشطة" : "Activity";
                    btnFindAtcivity.id = "btnFindAtcivity";
                    btnFindAtcivity.type = "button";
                    btnFindAtcivity.onclick = (e) => {
                        btnFindAtcivity_onclick();
                    };
                    return HeaderTemplate("Fld_ActivityPriceDetailId", btnFindAtcivity);
                },
                itemTemplate: (index: string, item: PQ_GetSalesActivityPriceDetails): HTMLElement => {
                    let lbl = DocumentActions.CreateElement<HTMLLabelElement>("label");
                    lbl.innerText = item.D_ActivityCode.toString();
                    return lbl;
                }
            },
            {
                title: res.Fld_ActivityDesc, css: "ColumPadding",  name: "D_ActName_en", width: "20%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ActivityDesc", " ");
                    txt.id = "h_ActivityDesc"
                    txt.disabled = true;
                    return HeaderTemplate("Fld_ActivityDesc", txt);
                }
            },
            {
                title: res.Fld_OldPrice, css: "ColumPadding",name: "OldPrice", width: "5.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "OldPrice", " ");
                    txt.id = "h_OldPrice"
                    txt.disabled = true;
                    return HeaderTemplate("Fld_OldPrice", txt);
                }
            },
            {
                title: res.Fld_MatCost, css: "ColumPadding",name: "MatCost", width: "5.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "MatCost", " ");
                    txt.disabled = true;
                    txt.id = "h_MatCost";
                    txt.onkeyup = (e) => {
                        $('#h_TotalCost').val(CalctotalCost().toString());
                    }
                    return HeaderTemplate("Fld_MatCost", txt);
                }

            },
            {
                title: res.Fld_LaborCost, css: "ColumPadding",name: "LaborCost", width: "5.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "LaborCost", " ");
                    txt.disabled = true;
                    txt.id = "h_LaborCost";
                    txt.onkeyup = (e) => {
                        $('#h_TotalCost').val(CalctotalCost().toString());
                    }
                    return HeaderTemplate("Fld_LaborCost", txt);
                }
            },
            {
                title: res.Fld_EquipCost, css: "ColumPadding",name: "EquipCost", width: "5.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "EquipCost", " ");
                    txt.disabled = true;
                    txt.id = "h_EquipCost";
                    txt.onkeyup = (e) => {
                        $('#h_TotalCost').val(CalctotalCost().toString());
                    }
                    return HeaderTemplate("Fld_EquipCost", txt);
                }
            },
            {
                title: res.Fld_POHCost, css: "ColumPadding", name: "POHCost", width: "5.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "POHCost", " ");
                    txt.disabled = true;
                    txt.id = "h_POHCost";
                    txt.onkeyup = (e) => {
                        $('#h_TotalCost').val(CalctotalCost().toString());
                    }
                    return HeaderTemplate("Fld_POHCost", txt);
                }
            },
            {
                title: res.Fld_OHCost, css: "ColumPadding", name: "OHCost", width: "5.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "OHCost", " ");
                    txt.disabled = true;
                    txt.id = "h_OHCost";
                    txt.onkeyup = (e) => {
                        $('#h_TotalCost').val(CalctotalCost().toString());
                    }
                    return HeaderTemplate("Fld_OHCost", txt);
                }
            },
            {
                title: res.Fld_TotalCost, css: "ColumPadding", name: "Calc_TotalCost", width: "5.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Calc_TotalCost", " ");
                    txt.disabled = true;
                    txt.id = "h_TotalCost"
                    return HeaderTemplate("Fld_TotalCost", txt);
                }
            },
            {
                title: res.Fld_Profit, css: "ColumPadding",name: "Profit", width: "5.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Profit", " ");
                    txt.disabled = true;
                    txt.id = "h_Profit"
                    return HeaderTemplate("Fld_Profit", txt);
                }
            },
            {
                title: res.Fld_NewPrice, css: "ColumPadding", name: "NewPrice", width: "5.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "NewPrice", " ");
                    txt.disabled = true;
                    txt.id = "h_NewPrice";
                    return HeaderTemplate("Fld_NewPrice", txt);
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
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        
                        AddItemInGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GetSalesActivityPriceDetails): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.style.fontSize = "24px";
                    btn.type = "button";
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
                itemTemplate: (s: string, item: PQ_GetSalesActivityPriceDetails): HTMLButtonElement => {

                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.style.fontSize = "20px";
                    btn.type = "button";
                    btn.style.color = "forestgreen";
                    btn.name = Details.indexOf(item).toString();
                    btn.onclick = (e) => {
                        
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        DetailsAssignHeader = new PQ_GetSalesActivityPriceDetails();
                        D_ActivityID = item.ActivityID;
                        DetailsAssignHeader.D_ActivityCode = item.D_ActivityCode;
                        DetailsAssignHeader.D_ActName_en = item.D_ActName_en;
                        DetailsAssignHeader.OldPrice = item.OldPrice;
                        DetailsAssignHeader.MatCost = item.MatCost;
                        DetailsAssignHeader.LaborCost = item.LaborCost;
                        DetailsAssignHeader.EquipCost = item.EquipCost;
                        DetailsAssignHeader.POHCost = item.POHCost;
                        DetailsAssignHeader.OHCost = item.OHCost;
                        DetailsAssignHeader.Calc_TotalCost = item.Calc_TotalCost;
                        DetailsAssignHeader.Profit = item.Profit;
                        DetailsAssignHeader.NewPrice = item.NewPrice;

                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        Details.splice(index, 1);
                        BindDataGrids();
                        //ReIndexingGrid();
                        
                        DetailsAssignHeader.ActivityID = D_ActivityID;
                        $('#btnFindAtcivity').text(DetailsAssignHeader.D_ActivityCode.toString());
                        FillInputText("h_ActivityDesc", DetailsAssignHeader.D_ActName_en.toString());
                        FillInputText("h_OldPrice", DetailsAssignHeader.OldPrice.toString());
                        FillInputText("h_MatCost", DetailsAssignHeader.MatCost.toString());
                        FillInputText("h_LaborCost", DetailsAssignHeader.LaborCost.toString());
                        FillInputText("h_EquipCost", DetailsAssignHeader.EquipCost.toString());
                        FillInputText("h_POHCost", DetailsAssignHeader.POHCost.toString());
                        FillInputText("h_OHCost", DetailsAssignHeader.OHCost.toString());
                        FillInputText("h_TotalCost", DetailsAssignHeader.Calc_TotalCost.toString());
                        FillInputText("h_Profit", DetailsAssignHeader.Profit.toString());
                        FillInputText("h_NewPrice", DetailsAssignHeader.NewPrice.toString());

                    };
                    return btn;
                }
            }
        ];
        Grid.DataSource = Details;
        Grid.Bind();
    }

    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById<HTMLInputElement>("txtTrNo");
        txtTrDate = DocumentActions.GetElementById<HTMLInputElement>("txtTrDate");
        txtFromActivityCode = DocumentActions.GetElementById<HTMLInputElement>("txtFromActivityCode");
        txtFromActivityName = DocumentActions.GetElementById<HTMLInputElement>("txtFromActivityName");
        txtParentActivityID = DocumentActions.GetElementById<HTMLInputElement>("txtParentActivityID");
        txtParentActivityName = DocumentActions.GetElementById<HTMLInputElement>("txtParentActivityName");
        txtRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtRemarks");
        ChkStatus = DocumentActions.GetElementById<HTMLInputElement>("ChkStatus");
        txtToActivityCode = DocumentActions.GetElementById<HTMLInputElement>("txtToActivityCode");
        txtToActivityName = DocumentActions.GetElementById<HTMLInputElement>("txtToActivityName");

        btnFromAct = DocumentActions.GetElementById<HTMLButtonElement>("btnFromAct");
        btnToAct = DocumentActions.GetElementById<HTMLButtonElement>("btnToAct");
        btnParentActivity = DocumentActions.GetElementById<HTMLButtonElement>("btnParentActivity");
        btnloadActivity = DocumentActions.GetElementById<HTMLButtonElement>("btnloadActivity");
        btnCalculate = DocumentActions.GetElementById<HTMLButtonElement>("btnCalculate");
        btnSearchTrNo = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchTrNo");
    }

    function InitalizeEvents() {
        debugger
        btnSearchTrNo.onclick = btnSearchTrNo_Clicked;
        btnParentActivity.onclick = btnParentActivity_Clicked;
        btnloadActivity.onclick = btnloadActivity_Clicked;
        btnCalculate.onclick = CalculateActivitypriceCall;;
    }

    function Navigate() {
        
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {
                
                Master = d.result as PQ_GetSalesActivityPrice;
                Display();
            }
        })
    }

    function Edit() {
       
        $('#btnCalculate').removeAttr('disabled');
        $('#btnCalculate').addClass('editable');
    }

    function Insert() {
        
        Master = new PQ_GetSalesActivityPrice;
        Assign();
        Master.ParentActivityID = activityId;
        Master.CompCode = Number(_CompCode);
        var session: SessionRecord = GetSessionRecord();
        MasterDetails.sessionRecord = session;

        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_Tr_SalesActivtyPrice", "InsertMasterDetail"),
            data: JSON.stringify(MasterDetails),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: (d) => {
                debugger;
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم الحفظ بنجاح  ", "Data saved Successfuly. ");
                    MessageBox.Show(msg, "Update", () => {
                        debugger;
                        let _Index = GetIndexByUseId(result.Response, "PQ_GetSalesActivityPrice", "ActivityPriceId");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                        //LoadDetails(Master.ProjectID);
                    });
                }
            }
        });

        //Ajax.CallAsync({
        //    url: Url.Action("InsertPrice", ControllerName),
        //    data: { JsonData: JSON.stringify(MasterDetails) },
        //    success: (d) => {
                
        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            ClientSharedWork.SwitchModes(ScreenModes.Query);
        //            let msg: string = ReturnMsg("تم الحفظ بنجاح  ", "Data Insert Successfuly. ");
        //            MessageBox.Show(msg, "Insert", () => {
        //                //Display();
                        
        //                let _Index = GetIndexByUseId(result.ResponseData, "PQ_GetSalesActivityPrice", "ActivityPriceId");
        //                NavigateToSearchResultKey(Number(_Index), Navigate);
        //            });
        //        }
        //    }
        //})
    }

    function Update() {
        
        Assign();
        Master.CompCode = Number(_CompCode);
        var session: SessionRecord = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_Tr_SalesActivtyPrice", "UpdateMasterDetail"),
            data: JSON.stringify(MasterDetails),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: (d) => {
                debugger;
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Update", () => {
                        debugger;
                        let _Index = GetIndexByUseId(result.Response, "PQ_GetSalesActivityPrice", "ActivityPriceId");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                        //LoadDetails(Master.ProjectID);
                    });
                }
            }
        });

        //Ajax.CallAsync({
        //    url: Url.Action("UpdatePrice", ControllerName),
        //    data: { JsonData: JSON.stringify(MasterDetails) },
        //    success: (d) => {
        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            ClientSharedWork.SwitchModes(ScreenModes.Query);
        //            let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
        //            MessageBox.Show(msg, "Update", () => {
        //                Display();
                        
        //                let _Index = GetIndexByUseId(result.ResponseData, "PQ_GetSalesActivityPrice", "ActivityPriceId");
        //                NavigateToSearchResultKey(Number(_Index), Navigate);
        //            });
        //        }
        //    }
        //})
    }

    function Assign() {
        
        DocumentActions.AssignToModel<PQ_GetSalesActivityPrice>(Master);
        MasterDetails.P_Tr_SalesActivtyPrice = Master as PQ_GetSalesActivityPrice;
        MasterDetails.P_Tr_SalesActivtyPrice.ActivityPriceId = Master.ActivityPriceId;;

        
        //AssignDetails
        MasterDetails.P_Tr_SalesActivtyPriceDetail = Details as Array<PQ_GetSalesActivityPriceDetails>;
        for (var act of Details) {
            act.ActivityPriceId = Master.ActivityPriceId;
            Tbl_DetailactPrice.push(act);
        }
    }

    function Display() {
        DocumentActions.RenderFromModel(Master);
        txtTrDate.value = DateFormat(Master.TrDate);
        activityId = Master.ParentActivityID;
        
        LoadDetails(Master.ActivityPriceId);
        getparentActName();
        if (Master.Status == true) {
            ControlsButtons.EditButton.disabled = true;
        } else {
            ControlsButtons.EditButton.disabled = false;
        }
    }

    function Undo() {
        txtParentActivityID.value = "";
        txtParentActivityName.value = "";
        txtRemarks.value = "";
        Details = new Array<PQ_GetSalesActivityPriceDetails>();
        ClearGrid(Grid, Details);
    }

    function Add() {
        
        //txtTrDate.value = DateFormat(new Date().toString());
        $('#h_NewPrice').val(0);
        ChkStatus.checked = false;
        Details = new Array<PQ_GetSalesActivityPriceDetails>();
        ClearGrid(Grid, Details);
        txtTrNo.value = "";
        txtParentActivityID.value = "";
        txtParentActivityName.value = "";
    }

    function AddItemInGrid() {
        
        DetailsAssignHeader = new PQ_GetSalesActivityPriceDetails();
        //DetailsAssignHeader.ActivityID = $('#h_ActivityID').val();
        DetailsAssignHeader.ActivityID = D_ActivityID;
        DetailsAssignHeader.D_ActivityCode = $('#btnFindAtcivity').text();
        DetailsAssignHeader.D_ActName_en = $('#h_ActivityDesc').val();
        DetailsAssignHeader.OldPrice = Number($('#h_OldPrice').val());
        DetailsAssignHeader.MatCost = Number($('#h_MatCost').val());
        DetailsAssignHeader.LaborCost = Number($('#h_LaborCost').val());
        DetailsAssignHeader.EquipCost = Number($('#h_EquipCost').val());
        DetailsAssignHeader.POHCost = Number($('#h_POHCost').val());
        DetailsAssignHeader.OHCost = Number($('#h_OHCost').val());
        DetailsAssignHeader.Calc_TotalCost = Number($('#h_TotalCost').val());
        DetailsAssignHeader.Profit = Number($('#h_Profit').val());
        DetailsAssignHeader.NewPrice = Number($('#h_NewPrice').val());
        Details.unshift(DetailsAssignHeader);
        BindDataGrids();
    }

    function BindDataGrids() {
        
        Grid.DataSource = Details;
        Grid.Bind();
    }

    function FillInputText(_TextID: string, _Data: string) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }

    function CalctotalCost(): number {
        var totalCost: number = Number($('#h_MatCost').val()) + Number($('#h_LaborCost').val()) + Number($('#h_EquipCost').val())
            + Number($('#h_POHCost').val()) + Number($('#h_OHCost').val());
        return totalCost;
    }

    function btnParentActivity_Clicked() {
        sys.FindKey(Modules.Activity, "btnParentActivity", "CompCode = " + _CompCode + " and IsDetail =" + 0, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getActivity", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    active = d.result as P_D_Activity;
                    activityId = active.ActivityID;
                    txtParentActivityID.value = active.ActivityCode.toString();
                    txtParentActivityName.value = active.DescA.toString();
                }
            });
        });
    }

    function LoadDetails(id: number) {
        
        Ajax.CallAsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: id },
            success: (d) => {
                
                Details = d.result as Array<PQ_GetSalesActivityPriceDetails>;
                Grid.DataSource = Details;
                Grid.Bind();
            }
        })
    }

    function getparentActName() {
        Ajax.CallAsync({
            url: Url.Action("getparentActName", ControllerName),
            data: { parentAct: Number(Master.ParentActivityID) },
            success: (d) => {
                
                let _Result = d.result as P_D_Activity;
                txtParentActivityName.value = _Result.DescE;
            }
        })
    }

    function btnloadActivity_Clicked() {
        
        ClearGrid(Grid, new Array<Number>());
        let parent: number = activityId;
        loadFrom_To_Activity(parent);
    }

    function loadFrom_To_Activity(parent: number) {
        
        Ajax.CallAsync({
            url: Url.Action("LoadActivity", ControllerName),
            data: { parent: parent },
            success: (d) => {
                
                let LoadedActitvties = d.result as Array<P_D_Activity>;
                activies = new P_D_Activity();
                //ClearGrid(Grid, new Array<Number>());
                //Details = new Array<PQ_GetSalesActivityPriceDetails>();
                for (var itm of LoadedActitvties) {
                    let NewItems = new PQ_GetSalesActivityPriceDetails();
                    NewItems.ActivityID = itm.ActivityID;
                    NewItems.D_ActivityCode = itm.ActivityCode;
                    NewItems.D_ActName_en = itm.DescA;
                    NewItems.OldPrice = itm.UnitPrice;
                    Details.push(NewItems);
                }
                Grid.DataSource = Details;
                Grid.Bind();
                
                //UpdateAfterLoadActivities();
            }
        })
       
    }

    function UpdateAfterLoadActivities() {
        
        Assign();
        Master.CompCode = Number(_CompCode);
        Ajax.CallAsync({
            url: Url.Action("Update", ControllerName),
            data: Master,
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Update", () => {
                        Display();
                        
                        let _Index = GetIndexByUseId(Master.ActivityPriceId, "P_Tr_SalesActivtyPrice", "ActivityPriceId");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        })
    }

    function PrintSlsActivity() {
        Ajax.CallAsync({
            url: Url.Action("PrintSlsActivityChangePRice", "PrintTransaction"),
            data: { TrID: Master.ActivityPriceId },
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });

    }

    function CalculateActivitypriceCall()
    {
        
        Update();
        CalculateActivityprice(Master.ActivityPriceId);
        LoadDetails(Master.ActivityPriceId);
    }

    function CalculateActivityprice(ActivityPriceId: number)
    {
        
        Ajax.CallAsync({
            url: Url.Action("CalculateActivityprice", ControllerName),
            data: { _Id: ActivityPriceId},
            success: (d) => {
                //let result = d.result as ResponseResult;
                //if (result.ResponseState == true) {
                
                //LoadDetails(ActivityPriceId);
                //Details = d.result as Array<PQ_GetSalesActivityPrice>;
                //Grid.DataSource = Details;
                //Grid.Bind();
                //}
                //LoadDetails(ActivityPriceId);
            }
        })
                //LoadDetails(ActivityPriceId);
    }

    function btnFindAtcivity_onclick() {
        
        sys.FindKey(Modules.ActivityPrice, "btnFindAtcivity", " CompCode = " + _CompCode +  " and IsDetail = " + 1, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("SearchActivity", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    let result = d.result as PQ_SrchActivity;
                    D_ActivityID = result.ActivityID;
                    $('#btnFindAtcivity').text(result.ActivityCode);
                    $('#h_ActivityDesc').val(result.DescE);
                    $('#h_OldPrice').val(result.UnitPrice);
                }
            });
        });
    }

    function btnSearchTrNo_Clicked() {
        
        sys.FindKey(Modules.ActivityPrice, "btnSearchTrNo", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getActivityPrice", ControllerName),
                data: { id: id },
                success: (d) => {
                    Master = d.result as PQ_GetSalesActivityPrice;
                    let Index = GetIndexByUseId(Number(Master.ActivityPriceId), "PQ_GetSalesActivityPrice", "ActivityPriceId");
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }
}