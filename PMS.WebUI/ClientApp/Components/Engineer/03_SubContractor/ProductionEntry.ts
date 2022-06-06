$(document).ready(() => {
    ProductionEntry.InitalizeComponent();
});
namespace ProductionEntry {
    var GridProductionActivity: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "ProductionEntry";
    const GridInputClassName = "form-control gridIput";
    var columnWidth: string = "100px";
    const NumberColumnWidth = "50px";
    var MasterDetails: M_D_ProductionEntry = new M_D_ProductionEntry();
    var Master: PQ_GetEngSubProduction = new PQ_GetEngSubProduction();
    var ActivityProdDataSource: Array<PQ_GetEngSubProductionActivity> = new Array<PQ_GetEngSubProductionActivity>();
    var DetailsSubProductionActivity: Array<PQ_GetEngSubProductionActivity> = new Array<PQ_GetEngSubProductionActivity>();
    var DetailsAssignHeaderProdActivity: PQ_GetEngSubProductionActivity = new PQ_GetEngSubProductionActivity();
    var TblProductionActivity: Array<P_TR_SubProductionActivity> = new Array<P_TR_SubProductionActivity>();
    var _ScreenLanguage: string;
    var _CompCode: string;
    var _BranchCode: string;
    var DetailsAssignHeaderActivity: PQ_GetEngServiceOrderActivity = new PQ_GetEngServiceOrderActivity();
    var txtTrNo: HTMLInputElement;
    var txtTrDate: HTMLInputElement;
    var txtSubServiceOrderId: HTMLInputElement;

    var txtSo_DescE: HTMLInputElement;
    var txtsubcon_SubContractorCode: HTMLInputElement;
    var txtsubcon_DescE: HTMLInputElement;
    var txtEng_EngCode: HTMLInputElement;
    var txtEng_DescE: HTMLInputElement;
    var txtProj_DescL: HTMLInputElement;
    var txtPhase_DescE: HTMLInputElement;
    var txtStartDate: HTMLInputElement;
    var txtEndDate: HTMLInputElement;
    var txtOrgAmount: HTMLInputElement;
    var txtDeduction: HTMLInputElement;
    var txtTotalAmount: HTMLInputElement;
    var txtWarranly    : HTMLInputElement;
    var txtDownpayment : HTMLInputElement;
    var txtDueAmount: HTMLInputElement;
    var txtVatAmount: HTMLInputElement;
    var txtDescA: HTMLInputElement;
    var txtDescE: HTMLInputElement;

    var btnSearchProduction: HTMLButtonElement;
    var btnSearchSeviceOrder: HTMLButtonElement;
    var btnApprove: HTMLButtonElement;
    var btnOpen: HTMLButtonElement;
    
    var subContId: number;
    var activityId: number;
    var ProjectPhaseItemActivId: number;
    var SubServiceOrderActivityId: number;
    var SubServiceOrderId: number;
    //var subServiceOrderId: number;
    var subContract: number;
    var subContractor: number;
    var ProjectId: number;
    var PhaseId: number;
    var siteEngId: number;
    var _WarranlyPrc: number;
    var _downpaymentPrc: number;
    var stutes: number;
    var _Cond: string = "";
    var condition: string = "";
    var gvatPrc: number;
    var ChkApprove: HTMLInputElement;
    var ChkIsFinal: HTMLInputElement;
    
    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        _Cond = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode + " and Status = 2";
        condition = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        InitalizeControls();
        InitalizeEvents();
        SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.SaveAction(
            () => {
                if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                    Insert();
                else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                    Update();
            }
        );

        ControlsButtons.DeleteAction(() => { });
        ControlsButtons.UndoAction(() => { });
        ControlsButtons.PrintAction(() => { Print(); });
        InitalizeGrid();
        $("#ImageEditorButton").on("click", () => {

            sys.ImgPopup(_CompCode, _BranchCode, Modules.ProductionEntry, Master.SubProductionId.toString());
        });
        btnOpen.disabled = true;
        ChkApprove.checked = false;
        ChkApprove.disabled = true;
        ChkIsFinal.checked = false; 
    }

    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById<HTMLInputElement>("txtTrNo");
        txtTrDate = DocumentActions.GetElementById<HTMLInputElement>("txtTrDate");
        txtSubServiceOrderId = DocumentActions.GetElementById<HTMLInputElement>("txtSubServiceOrderId");
        txtSo_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtSo_DescE");
        txtsubcon_SubContractorCode = DocumentActions.GetElementById<HTMLInputElement>("txtsubcon_SubContractorCode");
        txtsubcon_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtsubcon_DescE");
        txtEng_EngCode = DocumentActions.GetElementById<HTMLInputElement>("txtEng_EngCode");
        txtEng_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtEng_DescE");
        txtProj_DescL = DocumentActions.GetElementById<HTMLInputElement>("txtProj_DescL");
        txtPhase_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_DescE");
        txtStartDate = DocumentActions.GetElementById<HTMLInputElement>("txtStartDate");
        txtEndDate = DocumentActions.GetElementById<HTMLInputElement>("txtEndDate");
        txtDescA = DocumentActions.GetElementById<HTMLInputElement>("txtDescA");
        txtDescE = DocumentActions.GetElementById<HTMLInputElement>("txtDescE");
        
        txtOrgAmount = DocumentActions.GetElementById<HTMLInputElement>("txtOrgAmount");
        txtDeduction = DocumentActions.GetElementById<HTMLInputElement>("txtDeduction");
        txtTotalAmount = DocumentActions.GetElementById<HTMLInputElement>("txtTotalAmount");
        txtWarranly = DocumentActions.GetElementById<HTMLInputElement>("txtWarranly");
        txtDownpayment = DocumentActions.GetElementById<HTMLInputElement>("txtDownpayment");
        txtDueAmount = DocumentActions.GetElementById<HTMLInputElement>("txtDueAmount");
        txtVatAmount = DocumentActions.GetElementById<HTMLInputElement>("txtVatAmount");

        btnSearchProduction = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchProduction");
        btnSearchSeviceOrder = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchSeviceOrder");
        btnApprove = DocumentActions.GetElementById<HTMLButtonElement>("btnApprove");
        btnOpen = DocumentActions.GetElementById<HTMLButtonElement>("btnOpen");
        ChkApprove = DocumentActions.GetElementById<HTMLInputElement>("ChkApprove");
        ChkIsFinal = DocumentActions.GetElementById<HTMLInputElement>("ChkIsFinal");
    }

    function InitalizeEvents() {
        btnSearchSeviceOrder.onclick = btnSearchSeviceOrder_Clicked;
        btnSearchProduction.onclick = btnSearchProduction_Clicked;
        btnApprove.onclick = btnApprove_Clicked;
        btnOpen.onclick = btnOpen_Clicked;
        txtDeduction.onchange = Deduction_change;

        txtTrNo.onchange = SearchProduction_Changed;
        txtSubServiceOrderId.onchange = SearchSeviceOrder_Changed ;
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("ServiceOrder_");
        
        GridProductionActivity.ElementName = "GridProductionActivity";
        GridProductionActivity.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridProductionActivity.OnRefreshed = () => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridProductionActivity.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridProductionActivity.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridProductionActivity.InsertionMode = JsGridInsertionMode.Binding;
        GridProductionActivity.OnItemInserting = () => { };
        GridProductionActivity.OnItemUpdating = () => { };
        GridProductionActivity.OnItemDeleting = () => { };
        GridProductionActivity.Columns = [
            {
                title: res.ServiceOrder_Act_ActivityCode, name: "ActivityCode", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ActivityCode", " ");
                    txt.id = "h_ActivityCode"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_Act_ActivityCode, txt);
                }
            },
            {
                title: res.ServiceOrder_Act_DescA, visible: _ScreenLanguage == "ar", name: "DescA", width: "25.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_Act_DescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_Act_DescA, txt);
                }
            },
            {
                title: res.ServiceOrder_Act_DescA, visible: _ScreenLanguage == "en", name: "DescE", width: "25.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescE", " ");
                    txt.id = "h_Act_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_Act_DescA, txt);
                }
            },
            {
                title: res.ServiceOrder_uom_DescA, visible: _ScreenLanguage == "ar", name: "Uom_DescA", width: "6.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Uom_DescA", " ");
                    txt.id = "h_uom_DescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_uom_DescA, txt);
                }
            },
            {
                title: res.ServiceOrder_uom_DescA, visible: _ScreenLanguage == "en", name: "Uom_DescE", width: "6.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Uom_DescE", " ");
                    txt.id = "h_Uom_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_uom_DescA, txt);
                }
            },
            {
                title: res.ServiceOrder_SOQty, name: "SOQty", width: "6.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "SOQty", " ");
                    txt.id = "h_SOQty"
                    txt.disabled = true;

                    return HeaderTemplateNew(res.ServiceOrder_SOQty, txt);
                }
            },
          {
                title: res.ServiceOrder_FinishQty, name: "FinishQty", width: "6.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "FinishQty", " ");
                    txt.id = "h_FinishQty"

                    return HeaderTemplateNew(res.ServiceOrder_FinishQty, txt);
                }
            },
           
            //{
            //    title: res.ServiceOrder_FinishQty, name: "FinishQty", width: "11.5%",
            //    headerTemplate: (): HTMLElement => {
            //        let txt = CreateElement("label", GridInputClassName, " ", " ", "FinishQty", " ");
            //        txt.id = "h_FinishQty"
            //        txt.disabled = false;
            //        return HeaderTemplateNew(res.ServiceOrder_FinishQty, txt);
            //    }
            //},
            {
                title: res.ServiceOrder_AppQty, name: "AppQty", width: "6.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "AppQty", " ");
                    txt.id = "h_AppQty";
                    txt.onkeyup = (e) => {
                        let res: number = Number($('#h_AppQty').val()) * Number($('#h_UnitPrice').val());
                        $('#h_Total').val(res);
                    }
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ServiceOrder_AppQty, txt);
                }
            },
            {
                title: res.ServiceOrder_UnitPrice, name: "UnitPrice", width: "6.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "UnitPrice", " ");
                    txt.id = "h_UnitPrice"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_UnitPrice, txt);
                }
            },
            {
                title: res.ServiceOrder_Total, name: "Total", width: "6.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Total", " ");
                    txt.id = "h_Total"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_Total, txt);
                }
            },
            {
                title: res.ServiceOrder_UnitPrice, name: "ProdBeforeQty", width: "6.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ProdBeforeQty", " ");
                    txt.id = "h_ProdBeforeQty"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_ProdBeforeQty, txt);
                }
            },
            {
                title: res.ServiceOrder_RemainQty, name: "RemainQty", width: "6.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "RemainQty", " ");
                    txt.id = "h_RemainQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_RemainQty, txt);
                }
            },
            {
                title: res.ServiceOrder_Remarks, name: "Remarks", width: "8.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Remarks", " ");
                    txt.id = "h_Remarks";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ServiceOrder_Remarks, txt);
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
                    btn.id = "btnAddItemActivityGrid";
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        
                        AddItemInActivityGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GetEngSubProductionActivity): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.type = "button";
                    btn.name = DetailsSubProductionActivity.indexOf(item).toString();
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        debugger;
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsSubProductionActivity.splice(index, 1);
                        BindGridProductionActivity();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            }
            ,
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: (s: string, item: PQ_GetEngSubProductionActivity): HTMLButtonElement => {

                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.type = "button";
                    btn.name = DetailsSubProductionActivity.indexOf(item).toString();
                    btn.onclick = (e) => {
                        
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        debugger;
                        DetailsAssignHeaderProdActivity = new PQ_GetEngSubProductionActivity();
                        subContId = item.SubContractActivityId;
                        activityId = item.ActivityId;
                        SubServiceOrderActivityId = item.SubServiceOrderActivityId;
                        SubServiceOrderId = item.SubServiceOrderId;
                        ProjectPhaseItemActivId = item.ProjectPhaseItemActivId;
                        DetailsAssignHeaderProdActivity.ActivityCode = item.ActivityCode;
                        DetailsAssignHeaderProdActivity.DescA = item.DescA;
                        DetailsAssignHeaderProdActivity.DescE = item.DescE;
                        DetailsAssignHeaderProdActivity.Uom_DescA = item.Uom_DescA;
                        DetailsAssignHeaderProdActivity.Uom_DescE = item.Uom_DescE;
                        DetailsAssignHeaderProdActivity.SOQty = item.SOQty;
                        DetailsAssignHeaderProdActivity.FinishQty = item.FinishQty;
                        DetailsAssignHeaderProdActivity.AppQty = item.AppQty;
                        DetailsAssignHeaderProdActivity.UnitPrice = item.UnitPrice;
                        DetailsAssignHeaderProdActivity.Total = item.Total;
                        DetailsAssignHeaderProdActivity.ProdBeforeQty = item.ProdBeforeQty;
                        DetailsAssignHeaderProdActivity.RemainQty = item.RemainQty;
                        DetailsAssignHeaderProdActivity.Remarks = item.Remarks;

                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsSubProductionActivity.splice(index, 1);
                        BindGridProductionActivity();
                        //ReIndexingGrid();
                        debugger;
                        DetailsAssignHeaderActivity.SubServiceOrderId = SubServiceOrderId;
                        DetailsAssignHeaderActivity.SubServiceOrderActivityId = SubServiceOrderActivityId;
                        DetailsAssignHeaderActivity.SubContractActivityId = subContId;
                        DetailsAssignHeaderActivity.ActivityId = activityId;
                        DetailsAssignHeaderActivity.ProjectPhaseItemActivId = ProjectPhaseItemActivId;
                        FillInputText("h_ActivityCode", DetailsAssignHeaderProdActivity.ActivityCode.toString());
                        if (!IsNullOrEmpty(DetailsAssignHeaderProdActivity.DescA)) {
                            FillInputText("h_Act_DescA", DetailsAssignHeaderProdActivity.DescA.toString());
                        }
                        FillInputText("h_Act_DescE", DetailsAssignHeaderProdActivity.DescE.toString());

                        FillInputText("h_uom_DescA", DetailsAssignHeaderProdActivity.Uom_DescA
                        );
                        FillInputText("h_Uom_DescE", DetailsAssignHeaderProdActivity.Uom_DescE.toString());
                        FillInputText("h_SOQty", DetailsAssignHeaderProdActivity.SOQty.toString());
                        FillInputText("h_FinishQty", DetailsAssignHeaderProdActivity.FinishQty.toString());
                        FillInputText("h_AppQty", DetailsAssignHeaderProdActivity.AppQty.toString());
                        FillInputText("h_UnitPrice", DetailsAssignHeaderProdActivity.UnitPrice.toString());
                        FillInputText("h_Total", DetailsAssignHeaderProdActivity.Total.toString());
                        FillInputText("h_ProdBeforeQty", DetailsAssignHeaderProdActivity.ProdBeforeQty.toString());
                        FillInputText("h_RemainQty", DetailsAssignHeaderProdActivity.RemainQty.toString());
                        FillInputText("h_Remarks", DetailsAssignHeaderProdActivity.Remarks.toString());
                    };
                    return btn;
                }
            }
        ];
        GridProductionActivity.DataSource = DetailsSubProductionActivity;
        GridProductionActivity.Bind();
    }

    function Add() {
        btnOpen.disabled = true; 
        ChkApprove.checked = false; 
        ChkApprove.disabled = true;
        ClearGrid(GridProductionActivity, new Array<PQ_GetEngSubProductionActivity>());
        $("#effects").css('backgroundColor', '#FFFFFF');

    }
    
    function Edit() {
        debugger;
        btnOpen.disabled = true;
        if (SharedSession.CurrentPrivileges.CUSTOM1 == true) {
            ChkApprove.disabled = true;
            btnApprove.disabled = false
        } else {
            ChkApprove.disabled = true;
            btnApprove.disabled = true
        }

    }

    function Insert() {
        
        Assign();
        Master.ProjectID = ProjectId;
        Master.Status = 0; 
        Master.SubServiceOrderId = SubServiceOrderId;
        Master.ProjectPhaseId = PhaseId;
        Master.SiteEngineerId = siteEngId;
        Master.SubContractId = subContract;
        Master.SubContractorID = subContractor;
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BranchCode);
        var session: SessionRecord = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        debugger

        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_SubProduction", "InsertMasterDetail"),
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
                        let _Index = GetIndexByUseId(result.Response, "PQ_GetEngSubProduction", "SubProductionId", "CompCode =" + _CompCode + " and braCode = " + _BranchCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                        
                        //LoadDetails(Master.ProjectID);
                    });
                }
            }
        });

        //Ajax.CallAsync({
        //    url: Url.Action("Insert", ControllerName),
        //    data: { JsonData: JSON.stringify(MasterDetails) },
        //    success: (d) => {
                
        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            ClientSharedWork.SwitchModes(ScreenModes.Query);
        //            let msg: string = ReturnMsg("تم الحفظ  ", "Data Saved Successfully");
        //            MessageBox.Show(msg, "Insert", () => {
                        
        //                //Display();
        //                let _Index = GetIndexByUseId(result.ResponseData, "PQ_GetEngSubProduction", "SubProductionId", "CompCode =" + _CompCode + " and braCode = " + _BranchCode );
        //                NavigateToSearchResultKey(Number(_Index), Navigate)
        //            });
        //        }
        //        else
        //            MessageBox.Show(result.ResponseMessage, "Insert");
        //    }
        //});
    }

    function Update() {
        
        Assign();
        Master.ProjectID = ProjectId;
        Master.SubServiceOrderId = SubServiceOrderId;
        Master.ProjectPhaseId = PhaseId;
        Master.SiteEngineerId = siteEngId;
        Master.SubContractId = subContract;
        Master.SubContractorID = subContractor;
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BranchCode);
        var session: SessionRecord = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_SubProduction", "UpdateMasterDetail"),
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
                        let _Index = GetIndexByUseId(result.Response, "PQ_GetEngSubProduction", "SubProductionId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                        //LoadDetails(Master.ProjectID);
                    });
                }
            }
        });

        //Ajax.CallAsync({
        //    url: Url.Action("Update", ControllerName),
        //    data: { JsonData: JSON.stringify(MasterDetails) },
        //    success: (d) => {
                
        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            ClientSharedWork.SwitchModes(ScreenModes.Query);
        //            let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
        //            MessageBox.Show(msg, "Insert", () => {
                        
        //                Display();
        //                let _Index = GetIndexByUseId(result.ResponseData, "PQ_GetEngSubProduction", "SubProductionId", "CompCode =" + _CompCode + " and braCode = " + _BranchCode );
        //                NavigateToSearchResultKey(Number(_Index), Navigate);
        //            });
        //        }
        //    }
        //})
    }

    function Assign() {
        
        DocumentActions.AssignToModel<P_TR_SubProduction>(Master);
        MasterDetails.P_TR_SubProduction = Master as P_TR_SubProduction;
        Master.VatPrc = gvatPrc;
        if (ChkIsFinal.checked==true)
            Master.IsFinal = true; 
        else 
            Master.IsFinal = false; 
        //AssignDetails
        MasterDetails.P_TR_SubProductionActivity = DetailsSubProductionActivity as Array<PQ_GetEngSubProductionActivity>;
        for (var Act of DetailsSubProductionActivity) {
            Act.SubProductionId = Master.SubProductionId;
            Act.SubServiceOrderId = Number(Master.SubServiceOrderId);
            TblProductionActivity.push(Act);
        }
    }

    function Navigate() {
        
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {
                
                Master = d.result as PQ_GetEngSubProduction;
                //if (Master.CompCode.toString() == _CompCode && Master.BraCode.toString() == _BranchCode && Master.Status == 2) {
                    Display();

                //}
            }
        });
    }

    function BindGridProductionActivity() {
        GridProductionActivity.DataSource = DetailsSubProductionActivity;
        GridProductionActivity.Bind();
    }

    function FillInputText(_TextID: string, _Data: string) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }

    function Display() {
        debugger;
        DocumentActions.RenderFromModel(Master);
        txtTrDate.value = DateFormat(Master.TrDate);
        SubServiceOrderId = Master.SubServiceOrderId;
        txtStartDate.value = DateFormat(Master.StartDate);
        txtEndDate.value = DateFormat(Master.EndDate);
        ProjectId = Master.ProjectID;
        PhaseId = Master.ProjectPhaseId;
        stutes = Master.Status;
        
         gvatPrc =Master.VatPrc
        _WarranlyPrc = Master.WarranlyPrc;
        _downpaymentPrc = Master.DownpaymentPrc;
        btnApprove.disabled = true;
        if (Master.IsFinal == true)
            ChkIsFinal.checked = true; 
        else 
            ChkIsFinal.checked = false; 
        if (Master.So_Status == 2) {
            $("#effects").css('backgroundColor', '#FFFFFF');
            if (Master.Status == 1) {
                btnOpen.disabled = !(SharedSession.CurrentPrivileges.CUSTOM2);
                
                ControlsButtons.EditButton.disabled = true;
                ChkApprove.checked = true;
            }
            else {
                btnOpen.disabled = true;
                //btnApprove.disabled = !(SharedSession.CurrentPrivileges.CUSTOM1);
                ControlsButtons.EditButton.disabled = !(SharedSession.CurrentPrivileges.EDIT);
                ChkApprove.checked = false;
            }
        }
        else {
            btnOpen.disabled = true;
            //btnApprove.disabled = true;
            ControlsButtons.EditButton.disabled = true; 
            ChkApprove.checked = (Master.Status == 1)
            $("#effects").css('backgroundColor', '#E2E6E6');
        }
        

        
        siteEngId = Master.SiteEngineerId;
        subContract = Master.SubContractId;
        subContractor = Master.SubContractorID;
        txtProj_DescL.value = Master.proj_ProjectCode.toString();
        txtPhase_DescE.value = Master.Phase_ProjectPhaseCode.toString();
        txtDueAmount.value = (Number(txtTotalAmount.value) - Number(txtDownpayment.value) - Number(txtWarranly.value)).toFixed(2);
        DisplayDetails(Master.SubProductionId);
       
    }

    function btnSearchSeviceOrder_Clicked() {
        
        sys.FindKey(Modules.ProductionEntry, "btnSearchSeviceOrder", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode + " and Status = 2", () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.Callsync({
                url: Url.Action("GetService", ControllerName),
                data: { id: id },
                success: (d) => {
                    debugger;
                    let result = d.result as PQ_GetEngSubServiceOrder;
                    SubServiceOrderId = result.SubServiceOrderId;
                    subContract = result.SubContractId;
                    subContractor = result.SubContractorID;
                    siteEngId = result.SiteEngineerId;
                    ProjectId = result.ProjectID;
                    PhaseId = result.ProjectPhaseId;
                    txtSubServiceOrderId.value = result.TrNo.toString();
                    txtSo_DescE.value = result.DescE;
                    txtsubcon_SubContractorCode.value = result.SubContractorID.toString();
                    txtEng_EngCode.value = result.Eng_EngCode;
                    txtEng_DescE.value = result.Eng_DescE;
                    txtProj_DescL.value = result.Proj_ProjectCode.toString();
                    txtPhase_DescE.value = result.Phase_ProjectPhaseCode.toString();
                     
                    if (result.VatType == 1)
                        gvatPrc = 0.15;
                    else
                        gvatPrc = 0;
                    getSubContract(result.SubContractId);
                    LaodDetails(result.SubServiceOrderId);
                    calc_Total();
                }
            });
        });
    }
    function SearchSeviceOrder_Changed() {
        var trno = Number(txtSubServiceOrderId.value);
      
            Ajax.Callsync({
                url: Url.Action("getSubServiceOrderViewByNo", "FindByNo"),
                data: { trno: trno },
                success: (d) => {
                    if (IsNullOrEmpty(d.result)) {
                        SubServiceOrderId = 0;
                        subContract = 0;
                        subContractor = 0;
                        siteEngId = 0;
                        ProjectId = 0;
                        PhaseId = 0;
                        txtSubServiceOrderId.value = "";
                        txtSo_DescE.value = "";
                        txtsubcon_SubContractorCode.value = "";
                        txtEng_EngCode.value = "";
                        txtEng_DescE.value = "";
                        txtProj_DescL.value = "";
                        txtPhase_DescE.value = "";
                        getSubContract(0);
                        LaodDetails(0);
                        calc_Total();
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        return;
                       
                    }
                    debugger;
                    let result = d.result as PQ_GetEngSubServiceOrder;
                    SubServiceOrderId = result.SubServiceOrderId;
                    subContract = result.SubContractId;
                    subContractor = result.SubContractorID;
                    siteEngId = result.SiteEngineerId;
                    ProjectId = result.ProjectID;
                    PhaseId = result.ProjectPhaseId;
                    txtSubServiceOrderId.value = result.TrNo.toString();
                    txtSo_DescE.value = result.DescE;
                    txtsubcon_SubContractorCode.value = result.SubContractorID.toString();
                    txtEng_EngCode.value = result.Eng_EngCode;
                    txtEng_DescE.value = result.Eng_DescE;
                    txtProj_DescL.value = result.Proj_ProjectCode.toString();
                    txtPhase_DescE.value = result.Phase_ProjectPhaseCode.toString();
                    getSubContract(result.SubContractId);
                    LaodDetails(result.SubServiceOrderId);
                    calc_Total();
                }
            });
        
    }

    function LaodDetails(ServiceOrderid: number) {
        
        Ajax.Callsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: ServiceOrderid },
            success: (d) => {
                var res = d.result;
                
                DetailsSubProductionActivity = new Array<PQ_GetEngSubProductionActivity>();
                let obj: PQ_GetEngSubProductionActivity = new PQ_GetEngSubProductionActivity();
                for (var item of res) {
                    
                    obj = new PQ_GetEngSubProductionActivity();
                    obj = item;
                 
                    obj.ProdBeforeQty = item.AppQty;
                    obj.FinishQty = obj.RemainQty;
                    obj.AppQty = obj.RemainQty; 
                    DetailsSubProductionActivity.unshift(obj);
                }
                GridProductionActivity.DataSource = DetailsSubProductionActivity;
                GridProductionActivity.Bind();
                
            }
        });
        
    }

    function DisplayDetails(SubProductionId: number) {
        
        Ajax.CallAsync({
            url: Url.Action("DisplayDetails", ControllerName),
            data: { id: SubProductionId },
            success: (d) => {
                
                DetailsSubProductionActivity = d.result as Array<PQ_GetEngSubProductionActivity>;
                GridProductionActivity.DataSource = DetailsSubProductionActivity;
                GridProductionActivity.Bind();
                //let total: number = 0;
                //for (var item of DetailsSubProductionActivity) {
                //    total += item.Total;
                //}
                //$("#txtTotalAmount").val(total);
            }
        });
    }
    function calc_Total() {
        let total: number = 0;
        for (var item of DetailsSubProductionActivity) {
            total += Number(item.Total);
        }
        txtOrgAmount.value = (total).toFixed(2);
        totals_update();
    }
    function Deduction_change() {
        txtTotalAmount.value = (Number(txtOrgAmount.value) - Number(txtDeduction.value)).toFixed(2);
        totals_update();
    }
    function totals_update() {
       

       
        txtVatAmount.value = (gvatPrc * (Number(txtOrgAmount.value) - Number(txtDeduction.value))).toFixed(2);
        txtTotalAmount.value = (Number(txtOrgAmount.value) + Number(txtVatAmount.value) - Number(txtDeduction.value)).toFixed(2);
        txtDownpayment.value = (_downpaymentPrc / 100 * Number(txtTotalAmount.value)).toFixed(2);
        txtWarranly.value = (_WarranlyPrc / 100 * Number(txtTotalAmount.value)).toFixed(2);
        txtDueAmount.value = ( Number(txtTotalAmount.value) - Number(txtDownpayment.value) - Number(txtWarranly.value)).toFixed(2);
    }
   
    function getSubContract(id: number) {
        
        Ajax.Callsync({
            url: Url.Action("getSubContract", ControllerName),
            data: { id: id },
            success: (d) => {
                
                let result = d.result as P_TR_SubContract;
                txtsubcon_DescE.value = result.DescE;
                _WarranlyPrc = result.WarranlyPrc; 
                _downpaymentPrc = result.DownpaymentPrc; 
            }
        });
    }

    function AddItemInActivityGrid() {
        debugger
        let sum: number = Number($('#h_SOQty').val()) - Number($('#h_ProdBeforeQty').val())
        if (Number($('#h_FinishQty').val()) > sum) {
            WorningMessage("Prod Qty Must Less Than Or Equal To (SoQty - ProdBeforQty)", "Prod Qty Must Less Than Or Equal To (SoQty - ProdBeforQty)");
            return;
        }
        else if (Number($('#h_AppQty').val()) > Number($('#h_FinishQty').val())) {
            WorningMessage("App Qty Must Less Than Or Equal To Prod Qty", "App Qty Must Less Than Or Equal To Prod Qty");
            return;
        }
        DetailsAssignHeaderProdActivity = new PQ_GetEngSubProductionActivity();
        DetailsAssignHeaderProdActivity.SubServiceOrderActivityId = SubServiceOrderActivityId;
        DetailsAssignHeaderProdActivity.SubServiceOrderId = SubServiceOrderId;
        DetailsAssignHeaderProdActivity.SubContractActivityId = subContId;
        DetailsAssignHeaderProdActivity.ActivityId = activityId;
        DetailsAssignHeaderProdActivity.ProjectPhaseItemActivId = ProjectPhaseItemActivId;
        DetailsAssignHeaderProdActivity.ActivityCode = $('#h_ActivityCode').val();
        DetailsAssignHeaderProdActivity.DescA = $('#h_Act_DescA').val();
        DetailsAssignHeaderProdActivity.DescE = $('#h_Act_DescE').val();
        DetailsAssignHeaderProdActivity.Uom_DescA = $('#h_uom_DescA').val();
        DetailsAssignHeaderProdActivity.Uom_DescE = $('#h_Uom_DescE').val();
        DetailsAssignHeaderProdActivity.SOQty = $('#h_SOQty').val();
        DetailsAssignHeaderProdActivity.FinishQty = $('#h_FinishQty').val();
        DetailsAssignHeaderProdActivity.AppQty = $('#h_AppQty').val();
        DetailsAssignHeaderProdActivity.UnitPrice = $('#h_UnitPrice').val();
        DetailsAssignHeaderProdActivity.Total = $('#h_Total').val();
        DetailsAssignHeaderProdActivity.ProdBeforeQty = $('#h_ProdBeforeQty').val();
        DetailsAssignHeaderProdActivity.RemainQty = $('#h_RemainQty').val();
        DetailsAssignHeaderProdActivity.Remarks = $('#h_Remarks').val();
        DetailsSubProductionActivity.unshift(DetailsAssignHeaderProdActivity);
        BindGridProductionActivity();
        calc_Total();

    }
    
    function btnOpen_Clicked() {
        Master.Status = 2;
        btnOpen.disabled = true;
        run_waitMe();

        Update();
        Ajax.CallAsync({
            url: Url.Action("SubProductionApprove", ControllerName),
            data: { id: Number(Master.SubProductionId) },
            success: (d) => {

            }
        });
        Display;
    }
    function btnApprove_Clicked() {
       
        Master.Status = 1;
        btnApprove.disabled = true;
        run_waitMe();

        Update();
        Ajax.CallAsync({
            url: Url.Action("SubProductionApprove", ControllerName),
            data: { id: Number(Master.SubProductionId) },
            success: (d) => {

            }
        });
    }

    function btnSearchProduction_Clicked() {
        
        sys.FindKey(Modules.ProductionEntry, "btnSearchProduction", condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSubProduction", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    MasterDetails = d.result as M_D_ProductionEntry;
                    Master = d.result as PQ_GetEngSubProduction;
                  
                    let Index = GetIndexByUseId(Number(Master.SubProductionId), "PQ_GetEngSubProduction", "SubProductionId", condition,);
                        NavigateToSearchResultKey(Number(Index), Navigate);
                  
                }
            });
        });
    }
    function SearchProduction_Changed() {
        var trno = Number(txtTrNo.value);
       
            Ajax.CallAsync({
                url: Url.Action("getSubProductionViewByNo", "FindByNo"),
                data: { trno: trno },
                success: (d) => {

                    if (IsNullOrEmpty(d.result)) {
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");

                    }
                    
                    Master = d.result as PQ_GetEngSubProduction;
                    let Index = GetIndexByUseId(Number(Master.SubProductionId), "PQ_GetEngSubProduction", "SubProductionId", condition, );
                    NavigateToSearchResultKey(Number(Index), Navigate);

                }
            });
       
    }

    function Print() {
        Ajax.CallAsync({
            url: Url.Action("printSubProduction", "PrintTransaction"),
            data: { TrNo: Number(Master.SubProductionId) },
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });
    }


    
}