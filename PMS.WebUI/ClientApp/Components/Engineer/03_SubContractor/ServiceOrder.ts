$(document).ready(() => {
    ServiceOrder.InitalizeComponent();
});
namespace ServiceOrder {
    var GridOrderActivity: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "ServiceOrder";
    const GridInputClassName = "form-control gridIput";
    var columnWidth: string = "100px";
    const NumberColumnWidth = "50px";
    var MasterDetails: M_D_ServiceOrder = new M_D_ServiceOrder();
    var Master: PQ_GetEngSubServiceOrder = new PQ_GetEngSubServiceOrder();
    var GetEngineer: Array<PQ_GetEngProjectPhase> = new Array<PQ_GetEngProjectPhase>();
    var ActivityDataSource: Array<PQ_GetEngServiceOrderActivity> = new Array<PQ_GetEngServiceOrderActivity>();
    var DetailsSubOrderActivity: Array<PQ_GetEngServiceOrderActivity> = new Array<PQ_GetEngServiceOrderActivity>();
    //var newDetails: Array<PQ_LoadEngSubSOContractActivity> = new Array<PQ_LoadEngSubSOContractActivity>();
    var newDetails: Array<PQ_GetEngSubContractActivity> = new Array<PQ_GetEngSubContractActivity>();
    var DetailsAssignHeaderActivity: PQ_GetEngServiceOrderActivity = new PQ_GetEngServiceOrderActivity();
    var TblServiceOrderActivity: Array<P_TR_SubServiceOrderActivity> = new Array<P_TR_SubServiceOrderActivity>();
    var contractId: number;
    var subContractorId: number;
    var projectId: number;
    var projectCode: string;
    var phaseId: number;
    var EngId: number;
    var activityId: number;
    var ProjectPhaseItemActivId: number;

    var txtTrNo: HTMLInputElement;
    var txtTrDate: HTMLInputElement;
    var txtSc_Code: HTMLInputElement;
    var txtSubContractorID: HTMLInputElement;
    var txtSubContractor: HTMLInputElement;
    var txtProj_DescE: HTMLInputElement;
    var txtPhase_DescL: HTMLInputElement;
    var txtEng_EngCode: HTMLInputElement;
    var txtEng_DescE: HTMLInputElement;
    var txtStartDate: HTMLInputElement;
    var txtEndDate: HTMLInputElement;
    var txtContractName: HTMLInputElement;
    var txtMaterialRequestID: HTMLInputElement;
    var ChkApprove: HTMLInputElement;
    var ChkClose: HTMLInputElement;
    var btnReopen: HTMLButtonElement;
    var btnSearchProject: HTMLButtonElement;
    var btnSearchProjPhase: HTMLButtonElement;
    var btnSearchContract: HTMLButtonElement;
    var btnLoadDetails: HTMLButtonElement;
    var btnSearchOrder: HTMLButtonElement;
    var _Cond: string = "";
    var _ScreenLanguage: string;
    var _CompCode: string;
    var _BranchCode: string;
    var subContractActivityId: number;
    var eng: P_D_SiteEngineer = new P_D_SiteEngineer();
    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        _Cond = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
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
        ControlsButtons.PrintAction(() => { PrintServiceOrder(); });
        InitalizeGrid();
        $("#ImageEditorButton").on("click", () => {

            sys.ImgPopup(_CompCode, _BranchCode, Modules.ServiceOrder, Master.SubServiceOrderId.toString());
        });
        //GetEngineer = Ajax.Call<Array<PQ_GetEngProjectPhase>>({ url: Url.Action("GetEngineer", ControllerName) });
    }

    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById<HTMLInputElement>("txtTrNo");
        txtTrDate = DocumentActions.GetElementById<HTMLInputElement>("txtTrDate");
        txtSc_Code = DocumentActions.GetElementById<HTMLInputElement>("txtSc_Code");
        txtContractName = DocumentActions.GetElementById<HTMLInputElement>("txtContractName");
        txtMaterialRequestID = DocumentActions.GetElementById<HTMLInputElement>("txtMaterialRequestID");
        txtSubContractorID = DocumentActions.GetElementById<HTMLInputElement>("txtSubContractorID");
        txtSubContractor = DocumentActions.GetElementById<HTMLInputElement>("txtSubContractor");
        txtProj_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtProj_DescE");
        txtPhase_DescL = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_DescL");
        txtEng_EngCode = DocumentActions.GetElementById<HTMLInputElement>("txtEng_EngCode");
        txtEng_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtEng_DescE");
        txtStartDate = DocumentActions.GetElementById<HTMLInputElement>("txtStartDate");
        txtEndDate = DocumentActions.GetElementById<HTMLInputElement>("txtEndDate");
        ChkApprove = DocumentActions.GetElementById<HTMLInputElement>("ChkApprove");
        ChkClose = DocumentActions.GetElementById<HTMLInputElement>("ChkClose");
        btnReopen = DocumentActions.GetElementById<HTMLButtonElement>("btnReopen");
        btnSearchContract = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchContract");
        btnSearchProject = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchProject");
        btnSearchProjPhase = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchProjPhase");
        btnLoadDetails = DocumentActions.GetElementById<HTMLButtonElement>("btnLoadDetails");
        btnSearchOrder = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchOrder");
    }

    function InitalizeEvents() {
        btnSearchOrder.onclick = btnSearchOrder_Clicked;
        btnSearchContract.onclick = btnSearchContract_Clicked;
        //btnSearchProject.onclick = btnSearchProject_Clicked;
        btnSearchProjPhase.onclick = btnSearchProjPhase_Clicked;
        btnLoadDetails.onclick = btnLoadDetails_Clicked;
        btnReopen.onclick = ServiceOrder_ReOpen;
        ChkApprove.onchange = ChkApprove_Changed;
        ChkClose.onchange = ChkClose_Changed;
        txtTrNo.onchange = SearchOrder_Changed;
        txtSc_Code.onchange = SearchContract_Changed;
        txtPhase_DescL.onchange = SearchProjPhase_Changed;
       
         
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("ServiceOrder_");
        GridOrderActivity.ElementName = "serviceordergrid";
        GridOrderActivity.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridOrderActivity.OnRefreshed = () => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridOrderActivity.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridOrderActivity.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridOrderActivity.InsertionMode = JsGridInsertionMode.Binding;
        GridOrderActivity.OnItemInserting = () => { };
        GridOrderActivity.OnItemUpdating = () => { };
        GridOrderActivity.OnItemDeleting = () => { };
        GridOrderActivity.Columns = [
            {
                title: res.ServiceOrder_Act_ActivityCode, name: "ActivityCode", width: "5.0%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ActivityCode", " ");
                    txt.id = "h_ActivityCode"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_Act_ActivityCode, txt);
                }
            },
            {
                title: res.ServiceOrder_Act_DescA, visible: _ScreenLanguage == "ar", name: "DescA", width: "20.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_Act_DescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_Act_DescA, txt);
                }
            },
            {
                title: res.ServiceOrder_Act_DescA, visible: _ScreenLanguage == "en", name: "DescE", width: "20.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescE", " ");
                    txt.id = "h_Act_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_Act_DescA, txt);
                }
            },
            {
                title: res.ServiceOrder_uom_DescA, visible: _ScreenLanguage == "ar", name: "Uom_DescA", width: "4.0%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Uom_DescA", " ");
                    txt.id = "h_uom_DescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_uom_DescA, txt);
                }
            },
            {
                title: res.ServiceOrder_uom_DescA, visible: _ScreenLanguage == "en", name: "Uom_DescE", width: "4.0%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Uom_DescE", " ");
                    txt.id = "h_Uom_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_uom_DescA, txt);
                }
            },
            {
                title: res.ServiceOrder_ProjectQty, name: "ProjectQty", width: "5.0%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ProjectQty", " ");
                    txt.id = "h_ProjectQty"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_ProjectQty, txt);
                }
            },
            {
                title: res.ServiceOrder_ContractQty, name: "ContractQty", width: "5.0%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ContractQty", " ");
                    txt.id = "h_ContractQty"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_ContractQty, txt);
                }
            },
            {
                title: res.ServiceOrder_SOQty, name: "SOQty", width: "5.0%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "SOQty", " ");
                    txt.id = "h_SOQty"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ServiceOrder_SOQty, txt);
                }
            },
            {
                title: res.ServiceOrder_UnitPrice, name: "UnitPrice", width: "5.0%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "UnitPrice", " ");
                    txt.id = "h_UnitPrice"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_UnitPrice, txt);
                }
            },
            {
                title: res.ServiceOrder_Total, name: "Total", width: "5.0%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Total", " ");
                    txt.id = "h_Total"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_Total, txt);
                }
            },
            {
                title: res.ServiceOrder_AppQty, name: "AppQty", width: "5.0%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "AppQty", " ");
                    txt.id = "h_AppQty"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_AppQty, txt);
                }
            },
            {
                title: res.ServiceOrder_RemainQty, name: "RemainQty", width: "5.0%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "RemainQty", " ");
                    txt.id = "h_RemainQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_RemainQty, txt);
                }
            },
            {
                title: res.ServiceOrder_Remarks, name: "Remarks", width: "5.5%",
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
                itemTemplate: (s: string, item: PQ_GetEngServiceOrderActivity): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.type = "button";
                    btn.name = DetailsSubOrderActivity.indexOf(item).toString();
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsSubOrderActivity.splice(index, 1);
                        BindDataGridActivity();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            }
            ,
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: (s: string, item: PQ_GetEngServiceOrderActivity): HTMLButtonElement => {

                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.type = "button";
                    btn.name = DetailsSubOrderActivity.indexOf(item).toString();
                    btn.onclick = (e) => {

                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        DetailsAssignHeaderActivity = new PQ_GetEngServiceOrderActivity();
                        activityId = item.ActivityId;
                        ProjectPhaseItemActivId = item.ProjectPhaseItemActivId;
                        DetailsAssignHeaderActivity.ActivityCode = item.ActivityCode;
                        DetailsAssignHeaderActivity.ActivityCode = item.ActivityCode;
                        DetailsAssignHeaderActivity.DescA = item.DescA;
                        DetailsAssignHeaderActivity.DescE = item.DescE;
                        DetailsAssignHeaderActivity.Uom_DescA = item.Uom_DescA;
                        DetailsAssignHeaderActivity.Uom_DescE = item.Uom_DescE;
                        DetailsAssignHeaderActivity.ProjectQty = item.ProjectQty;
                        DetailsAssignHeaderActivity.ContractQty = item.ContractQty;
                        DetailsAssignHeaderActivity.SOQty = item.SOQty;
                        DetailsAssignHeaderActivity.UnitPrice = item.UnitPrice;
                        DetailsAssignHeaderActivity.Total = item.Total;
                        DetailsAssignHeaderActivity.AppQty = item.AppQty;
                        DetailsAssignHeaderActivity.RemainQty = item.RemainQty;
                        DetailsAssignHeaderActivity.Remarks = item.Remarks;
                        subContractActivityId = item.SubContractActivityId;
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsSubOrderActivity.splice(index, 1);
                        BindDataGridActivity();
                        //ReIndexingGrid();

                        DetailsAssignHeaderActivity.ActivityId = activityId;
                        DetailsAssignHeaderActivity.ProjectPhaseItemActivId = ProjectPhaseItemActivId;
                        FillInputText("h_ActivityCode", DetailsAssignHeaderActivity.ActivityCode);
                        FillInputText("h_Act_DescA", DetailsAssignHeaderActivity.DescA);
                        FillInputText("h_Act_DescE", DetailsAssignHeaderActivity.DescE);
                        FillInputText("h_uom_DescA", DetailsAssignHeaderActivity.Uom_DescA);
                        FillInputText("h_Uom_DescE", DetailsAssignHeaderActivity.Uom_DescE);
                        FillInputText("h_ProjectQty", DetailsAssignHeaderActivity.ProjectQty.toString());
                        FillInputText("h_ContractQty", DetailsAssignHeaderActivity.ContractQty.toString());
                        FillInputText("h_SOQty", DetailsAssignHeaderActivity.SOQty.toString());
                        FillInputText("h_UnitPrice", DetailsAssignHeaderActivity.UnitPrice.toString());
                        FillInputText("h_Total", DetailsAssignHeaderActivity.Total.toString());
                        FillInputText("h_AppQty", DetailsAssignHeaderActivity.AppQty.toString());
                        FillInputText("h_RemainQty", DetailsAssignHeaderActivity.RemainQty.toString());
                        FillInputText("h_Remarks", DetailsAssignHeaderActivity.Remarks);
                    };
                    return btn;
                }
            }
        ];
        GridOrderActivity.DataSource = DetailsSubOrderActivity;
        GridOrderActivity.Bind();
    }

    function Navigate() {
        debugger;
        Ajax.Callsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {

                Master = d.result as PQ_GetEngSubServiceOrder;
                Display();
            }
        })
    }

    function Add() {

        Master.Status = 0;
        txtTrDate.value = DateFormat(Date());
        ChkApprove.checked = false;
        ChkClose.checked = false;
        txtStartDate.value = DateFormat(Date());
        txtEndDate.value = DateFormat(Date());
        
        SetChkStatus();
        ClearData();
    }
    function ClearData() {
        DetailsSubOrderActivity = new Array<PQ_GetEngServiceOrderActivity>();
        ClearGrid(GridOrderActivity, DetailsSubOrderActivity);
    }

    function Edit() {
        debugger;
        if (!IsNullOrEmpty(txtProj_DescE.value) && !IsNullOrEmpty(txtPhase_DescL.value)) {
            $('#btnLoadDetails').removeAttr('disabled');
        }
        SetChkStatus();
    }

    function Insert() {

        Assign();
        if (projectId == null || phaseId == null) {
            WorningMessage("يجب اخيار مشروع اولا", "You Should Select Project first");
            return;
        }
        if (IsNullOrEmpty(Master.TrDate) || IsNullOrEmpty(Master.EndDate) || IsNullOrEmpty(Master.StartDate) ) {
            WorningMessage("يجب ادخال التاريخ ", "You Should Enter Date ");
            return;
        }
        Master.ProjectID = projectId;
        Master.ProjectPhaseId = phaseId;
        Master.SubContractId = contractId;
        Master.SubContractorID = subContractorId;
        Master.SiteEngineerId = EngId;
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BranchCode);
        StatusValidation();
        var session: SessionRecord = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        debugger
       
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_SubServiceOrder", "InsertMasterDetail"),
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
                        let _Index = GetIndexByUseId(result.Response, "PQ_GetEngSubServiceOrder", "SubServiceOrderId", _Cond);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                        btnLoadDetails_Clicked();
                        //LoadDetails(Master.ProjectID);
                    });
                }
            }
        });
        //Ajax.Callsync({
        //    url: Url.Action("Insert", ControllerName),
        //    data: { JsonData: JSON.stringify(MasterDetails) },
        //    success: (d) => {

        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            ClientSharedWork.SwitchModes(ScreenModes.Query);
        //            let msg: string = ReturnMsg("تم الحفظ  ", "Data Saved Successfully");
        //            MessageBox.Show(msg, "Insert", () => {
        //                debugger;
        //                //Display();
        //                let _Index = GetIndexByUseId(result.ResponseData, "PQ_GetEngSubServiceOrder", "SubServiceOrderId", _Cond);
        //                NavigateToSearchResultKey(Number(_Index), Navigate)
        //                btnLoadDetails_Clicked();
        //            });
        //        }
        //        else
        //            MessageBox.Show(result.ResponseMessage, "Insert");
        //    }
        //});
    }

    function Update() {
        debugger;
        Assign();
        Master.ProjectID = projectId;
        Master.ProjectPhaseId = phaseId;
        Master.SubContractId = contractId;
        Master.SubContractorID = subContractorId;
        Master.SiteEngineerId = EngId;
        Master.CompCode = Number(_CompCode);

        StatusValidation();
        var session: SessionRecord = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_SubServiceOrder", "UpdateMasterDetail"),
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
                    WorningMessage("تم التعديل بنجاح  ", "Data Updated Successfuly. ");                                       
                 
                    let _Index = GetIndexByUseId(result.Response, "PQ_GetEngSubServiceOrder", "SubServiceOrderId", _Cond);
                    NavigateToSearchResultKey(Number(_Index), Navigate);
                    //LoadDetails(Master.ProjectID);
                    
                }
            }
        });

        //Ajax.Callsync({
        //    url: Url.Action("Update", ControllerName),
        //    data: { JsonData: JSON.stringify(MasterDetails) },
        //    success: (d) => {

        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            ClientSharedWork.SwitchModes(ScreenModes.Query);
        //            let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
        //            MessageBox.Show(msg, "Insert", () => {
        //                debugger;
        //                Display();
        //                let _Index = GetIndexByUseId(result.ResponseData, "PQ_GetEngSubServiceOrder", "SubServiceOrderId", _Cond);
        //                NavigateToSearchResultKey(Number(_Index), Navigate);
        //            });
        //        }
        //    }
        //})
    }

    function Assign() {
        debugger;
        DocumentActions.AssignToModel<P_TR_SubServiceOrder>(Master);
        MasterDetails.P_TR_SubServiceOrder = Master as P_TR_SubServiceOrder;

        //AssignDetails
        MasterDetails.P_TR_SubServiceOrderActivity = DetailsSubOrderActivity as Array<PQ_GetEngServiceOrderActivity>;
        for (var Act of DetailsSubOrderActivity) {
            Act.SubServiceOrderId = Master.SubServiceOrderId;
            TblServiceOrderActivity.push(Act);
        }
    }

    function Display() {
        debugger;
        DocumentActions.RenderFromModel(Master);
        txtTrDate.value = DateFormat(Master.TrDate);
        txtStartDate.value = DateFormat(Master.StartDate);
        txtEndDate.value = DateFormat(Master.EndDate);
        getSubContract(Master.SubContractId);
        DisplayChkValues();
        LoadDetails(Master.SubServiceOrderId);
        projectId = Master.ProjectID;
        phaseId = Master.ProjectPhaseId;
        contractId = Master.SubContractId;
        subContractorId = Master.SubContractorID;
        EngId = Master.SiteEngineerId;
        //txtMaterialRequestID.value = Master.RMat_TrNo.toString();
        //txtProj_DescE = Master.Proj_ProjectCode.toString();

        $('#ChkApprove').attr('disabled', 'disabled');
        $("#btnReopen").css('cursor', 'no-drop');
        $("#btnReopen").css('backgroundColor', '#0B6D8A');
        if (Master.Status == 2) {
            ControlsButtons.EditButton.disabled = true;
        }
        else {
            ControlsButtons.EditButton.disabled = false;
        }
        if (Master.Status == 2 && SharedSession.CurrentPrivileges.CUSTOM2 == true) {
            $('#ChkClose').removeAttr('disabled');
            $("#ChkClose").css('cursor', 'pointer');
        } else {
            $('#ChkClose').attr('disabled', 'disabled');
        }
        if (Master.Status == 6 && SharedSession.CurrentPrivileges.CUSTOM3 == true) {
            $('#btnReopen').removeAttr('disabled');
            $("#btnReopen").css('cursor', 'pointer');
            $("#btnReopen").css('backgroundColor', 'red');
        }
        else {
            $('#btnReopen').attr('disabled', 'disabled');
            $("#btnReopen").css('backgroundColor', '#0B6D8A');
        }



    }

    function StatusValidation() {
        //Status = 0 < - approved = false and closed = false
        //2: <-approved = true and closed = false
        //6: <-approved = true and closed = true
        // if  $("#ChkApprove") = false and $("#ChkClose")= false  then master.status = 0 
        //if  $("#ChkApprove") = true and $("#ChkClose")= false  then master.status = 2 
        //if  $("#ChkApprove") = true and $("#ChkClose") = truethen master.status = 6
        //debugger
        //if ($("#ChkApprove").prop('checked', false) && $("#ChkClose").prop('checked', false)) {
        //    Master.Status = 0;
        //}
        //else if ($("#ChkApprove").prop('checked', true) && $("#ChkClose").prop('checked', false)) {

        //    Master.Status= 2;
        //}    
        //else if ($("#ChkApprove").prop('checked', true) && $("#ChkClose").prop('checked', true)) {          
        //    Master.Status == 6
        //}
    }

    function FillInputText(_TextID: string, _Data: string) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }

    function BindDataGridActivity() {

        GridOrderActivity.DataSource = DetailsSubOrderActivity;
        GridOrderActivity.Bind();
    }

    function btnSearchContract_Clicked() {

        let con: string = "CompCode= " + _CompCode + " and BraCode= " + _BranchCode;
        sys.FindKey(Modules.ServiceOrder, "btnSearchContract", con + " and Status = 2", () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;

            Ajax.CallAsync({
                url: Url.Action("getContract", ControllerName),
                data: { id: id },
                success: (d) => {
                    debugger;
                    let result = d.result as PQ_GetEngSubContract;
                    contractId = result.SubContractId;
                    txtSc_Code.value = result.TrNo.toString();
                    txtContractName.value = result.DescE;
                    subContractorId = result.SubContractorID;
                    txtSubContractorID.value = result.Sc_Code.toString();
                    txtSubContractor.value = result.Sc_DescE;
                    debugger


                    if (result.IsBlank == false) {
                        projectId = result.ProjectID;
                        phaseId = result.ProjectPhaseId;
                        txtProj_DescE.value = result.Proj_Code;
                        txtPhase_DescL.value = result.Phase_Code;
                        $('#btnSearchProject').attr('disabled', 'disabled');
                        $('#btnSearchProjPhase').attr('disabled', 'disabled');
                        $('#txtPhase_DescL').attr('disabled', 'disabled');
                    

                        let engineer: P_D_SiteEngineer = GetEngineerById(result.SiteEngineerId);
                        //let eng: PQ_GetEngProjectPhase = GetEngineer.filter(f => f.SiteEngineerId == result.SiteEngineerId)[0];
                        EngId = engineer.SiteEngineerId;
                        txtEng_EngCode.value = engineer.EngCode;
                        txtEng_DescE.value = engineer.DescE;
                    }
                    else if (result.IsBlank == true) {
                        $('#btnSearchProject').removeAttr('disabled');
                        $('#btnSearchProjPhase').removeAttr('disabled');
                        $('#txtPhase_DescL').removeAttr('disabled');

                        contractId = result.SubContractId;
                        txtProj_DescE.value = "";
                        txtPhase_DescL.value = "";
                    }
                }
            });
        });
    }
    function SearchContract_Changed() {

        var trno = Number(txtSc_Code.value);
            Ajax.CallAsync({
                url: Url.Action("getSubContractViewByNo", "FindByNo"),
                data: { trno: trno },
                success: (d) => {
                    debugger
                    if (IsNullOrEmpty(d.result)) {
                        contractId = 0;
                        txtSc_Code.value = "";
                        txtContractName.value = "";
                        subContractorId = 0;
                        txtSubContractorID.value = "";
                        txtSubContractor.value = "";
                        debugger

                        
                            projectId =0;
                            phaseId = 0;
                            txtProj_DescE.value = "";
                            txtPhase_DescL.value = "";
                            EngId = 0;
                            txtEng_EngCode.value = "";
                            txtEng_DescE.value = "";
                            $('#btnSearchProject').removeAttr('disabled');
                            $('#btnSearchProjPhase').removeAttr('disabled');
                          
                            contractId = 0;
                            txtProj_DescE.value = "";
                            txtPhase_DescL.value = "";
                         

                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        return;

                    }
                    debugger;
                    let result = d.result as PQ_GetEngSubContract;
                    contractId = result.SubContractId;
                    txtSc_Code.value = result.TrNo.toString();
                    txtContractName.value = result.DescE;
                    subContractorId = result.SubContractorID;
                    txtSubContractorID.value = result.Sc_Code.toString();
                    txtSubContractor.value = result.Sc_DescE;
                    debugger


                    if (result.IsBlank == false) {
                        projectId = result.ProjectID;
                        projectCode = result.Proj_Code;
                        phaseId = result.ProjectPhaseId;
                        txtProj_DescE.value = result.Proj_Code;
                        txtPhase_DescL.value = result.Phase_Code;
                        $('#btnSearchProject').attr('disabled', 'disabled');
                        $('#btnSearchProjPhase').attr('disabled', 'disabled');
                        $('#txtPhase_DescL').attr('disabled', 'disabled');
                       

                        let engineer: P_D_SiteEngineer = GetEngineerById(result.SiteEngineerId);
                        //let eng: PQ_GetEngProjectPhase = GetEngineer.filter(f => f.SiteEngineerId == result.SiteEngineerId)[0];
                        EngId = engineer.SiteEngineerId;
                        txtEng_EngCode.value = engineer.EngCode;
                        txtEng_DescE.value = engineer.DescE;
                    }
                    else if (result.IsBlank == true) {
                        $('#btnSearchProject').removeAttr('disabled');
                        $('#btnSearchProjPhase').removeAttr('disabled');
                        $('#txtPhase_DescL').removeAttr('disabled');
                        contractId = result.SubContractId;
                        txtProj_DescE.value = "";
                        txtPhase_DescL.value = "";
                    }
                    ClearData();
                }
            });
        
    }

    function GetEngineerById(id: number): P_D_SiteEngineer {
        debugger;
        eng = Ajax.Call<P_D_SiteEngineer>({ url: Url.Action("GetSiteEngineerById", ControllerName), data: { Id: id } });
        return eng;
    }

    function btnSearchProject_Clicked() {

        sys.FindKey(Modules.ServiceOrder, "btnSearchProject", "CompCode= " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getProject", ControllerName),
                data: { id: id },
                success: (d) => {

                    let result = d.result as PQ_SrchEngProjectPhase;
                    txtProj_DescE.value = result.Proj_Code;
                    projectId = result.ProjectID;
                }
            });
        });
    }

    function btnSearchProjPhase_Clicked() {

        sys.FindKey(Modules.ServiceOrder, "btnSearchProjPhase", "CompCode =" + _CompCode + " and braCode = " + _BranchCode + " and status = 1 ", () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getProjectPhase", ControllerName),
                data: { id: id },
                success: (d) => {

                    let result = d.result as PQ_GetEngProjectPhase;
                    txtPhase_DescL.value = result.ProjectPhaseCode;
                    phaseId = result.ProjectPhaseId;
                    txtProj_DescE.value = result.EngProj_ProjectCode;
                    projectId = result.ProjectID;
                    //let engineer: P_D_SiteEngineer = GetEngineerById(result.SiteEngineerId);
                    //let eng: PQ_GetEngProjectPhase = GetEngineer.filter(f => f.SiteEngineerId == result.SiteEngineerId)[0];
                    EngId = result.SiteEngineerId;
                    txtEng_EngCode.value = result.Eng_EngCode;
                    txtEng_DescE.value = result.Eng_DescE;
                    ClearData();
                }
            });
        });
    }
    function SearchProjPhase_Changed() {

        var PhaseNo = txtPhase_DescL.value;
        var ProjectNo=txtProj_DescE.value;
            Ajax.CallAsync({
                url: Url.Action("getProjectPhaseViewByno", "FindByNo"),
                data: { ProjectNo: ProjectNo , PhaseNo: PhaseNo },
                success: (d) => {
                    debugger
                    if (IsNullOrEmpty(d.result)) {
                        txtPhase_DescL.value = "";
                        phaseId = 0;
                        
                      
                        EngId = 0;
                        txtEng_EngCode.value = "";
                        txtEng_DescE.value = "";
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        return;

                    }
                    let result = d.result as PQ_GetEngProjectPhase;
                    txtPhase_DescL.value = result[0].ProjectPhaseCode;
                    phaseId = result[0].ProjectPhaseId;
                    txtProj_DescE.value = result[0].EngProj_ProjectCode;
                    projectId = result[0].ProjectID; 
                    EngId = result[0].SiteEngineerId;
                    txtEng_EngCode.value = result[0].Eng_EngCode;
                    txtEng_DescE.value = result[0].Eng_DescE;
                    ClearData();
                }
            });
        
    }

    function ChkApprove_Changed(): number {
        if (ClientSharedWork.CurrentMode == ScreenModes.Edit) {
            run_waitMe();
            debugger;
            let Approvestate: boolean = ChkApprove.checked;
            if (Master.Status == 0 && SharedSession.CurrentPrivileges.CUSTOM1 == true) {
                Master.Status = 2;
                ChkApprove.checked = true;
                Update();
                //EngSubServiceOrderApprove(Master.SubServiceOrderId);
                return 2;
            } else {
                ChkApprove.checked = !Approvestate;
                $('#ChkApprove').attr('disabled', 'disabled');
                return Master.Status;
            }
        }
    }

    function ChkClose_Changed(): number {
        if (ChkClose.checked == true) {
            run_waitMe();
            debugger;
            let Closestate: boolean = ChkClose.checked;
            if (Master.Status == 2 && SharedSession.CurrentPrivileges.CUSTOM2 == true) {
                Master.Status = 6;
                //ChkClose.checked = true;
                Update();
                //EngSubServiceOrderClose(Master.SubServiceOrderId);
                return 6;
            } else {
                ChkClose.checked = !Closestate;
                $('#ChkClose').attr('disabled', 'disabled');
                return Master.Status;
            }
        }
    }

    function getSubContract(id: number) {

        Ajax.CallAsync({
            url: Url.Action("getSubContract", ControllerName),
            data: { id: id },
            success: (d) => {

                let result = d.result as P_TR_SubContract;
                txtContractName.value = result.DescE;
            }
        });
    }

    function SetChkStatus() {
        debugger;

        if (Master.Status == 0 && SharedSession.CurrentPrivileges.CUSTOM1 == true) {
            $('#ChkApprove').removeAttr('disabled');
            $("#ChkApprove").css('cursor', 'pointer');
        } else {
            $('#ChkApprove').attr('disabled', 'disabled');
        }

    }
    function DisplayChkValues() {
        debugger;
        ChkApprove.checked = false;
        ChkClose.checked = false;
        if (Master.IsApproved == 1) {
            ChkApprove.checked = true;
        }

        if (Master.IsClosed == 1) {
            ChkClose.checked = true;
        }
    }

    function AddItemInActivityGrid() {
        debugger;
        if ($('#h_ActivityCode').val() == "" || $('#h_Act_DescE').val() == "") {
            WorningMessage("يجب اختيار نشاط للتعديل اولا", "You Should Select Activity First T Edit ");
            return;
        }
        else if (Master.ISFlexQty == false) {
            if ((Number($('#h_SOQty').val()) > Number($('#h_ContractQty').val()))) {
                WorningMessage("الكمية يجب ان تكون اقل من او تساوى كمية العقد", "So Qty Must Be Smaller Than Or Equal To Contract Qty");
                return;
            }
        }
        else if (Number($('#h_SOQty').val()) > Number($('#h_ProjectQty').val())) {
            WorningMessage("الكمية يجب ان تكون اقل من او تساوى كمية المشروع", "So Qty Must Be Smaller Than Or Equal To Project Qty");
            return;
        }
        DetailsAssignHeaderActivity = new PQ_GetEngServiceOrderActivity();
        DetailsAssignHeaderActivity.ActivityId = activityId;
        DetailsAssignHeaderActivity.ProjectPhaseItemActivId = ProjectPhaseItemActivId;
        DetailsAssignHeaderActivity.ActivityCode = $('#h_ActivityCode').val();
        DetailsAssignHeaderActivity.DescA = $('#h_Act_DescA').val();
        DetailsAssignHeaderActivity.DescE = $('#h_Act_DescE').val();
        DetailsAssignHeaderActivity.Uom_DescA = $('#h_uom_DescA').val();
        DetailsAssignHeaderActivity.Uom_DescE = $('#h_Uom_DescE').val();
        DetailsAssignHeaderActivity.ProjectQty = $('#h_ProjectQty').val();
        DetailsAssignHeaderActivity.ContractQty = $('#h_ContractQty').val();
        DetailsAssignHeaderActivity.SOQty = $('#h_SOQty').val();
        DetailsAssignHeaderActivity.UnitPrice = $('#h_UnitPrice').val();
        DetailsAssignHeaderActivity.Total = $('#h_Total').val();
        DetailsAssignHeaderActivity.AppQty = $('#h_AppQty').val();
        DetailsAssignHeaderActivity.RemainQty = $('#h_RemainQty').val();
        DetailsAssignHeaderActivity.Remarks = $('#h_Remarks').val();
        DetailsAssignHeaderActivity.SubContractActivityId = subContractActivityId;
        DetailsSubOrderActivity.unshift(DetailsAssignHeaderActivity);
        BindDataGridActivity();
    }

    function LoadDetails(serviceOrderId: number) {

        Ajax.CallAsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: serviceOrderId },
            success: (d) => {

                DetailsSubOrderActivity = d.result as Array<PQ_GetEngServiceOrderActivity>;
                GridOrderActivity.DataSource = DetailsSubOrderActivity;
                GridOrderActivity.Bind();
                let Total: number = 0;
                for (var item of DetailsSubOrderActivity) {
                    Total += item.Total;
                }
                $("#txtTotalAmount").val(Total);
            }
        });
    }

    function PProc_EngSubBuildSODetail(Id: number) {
        debugger;
        AjaxApi.CallsyncApi({
            type: "GET",
            url: sys.apiUrl("P_TR_SubServiceOrder", "PProc_EngSubBuildSODetail"),
            data: { soId: Id },
            success: (d) => {
                debugger;
            }
        });
    }

    function btnLoadDetails_Clicked() {
        debugger;
        //Call stored
        //Display 
        debugger;
        if (ClientSharedWork.CurrentMode != ScreenModes.Query)
            Update();
        PProc_EngSubBuildSODetail(Master.SubServiceOrderId);
        Display();
        //Update();
        //newDetails = Ajax.Call<Array<PQ_GetEngSubContractActivity>>({ url: Url.Action("LoadNewDetails", ControllerName), data: { id: contractId } });
        //let FromViewToDataSource: PQ_GetEngServiceOrderActivity = new PQ_GetEngServiceOrderActivity();
        //for (var item of newDetails) {
        //    debugger;
        //    FromViewToDataSource = new PQ_GetEngServiceOrderActivity();
        //    FromViewToDataSource.SubServiceOrderId = Master.SubServiceOrderId;
        //    FromViewToDataSource.ActivityId = item.ActivityId;
        //    FromViewToDataSource.ProjectPhaseItemActivId = item.ProjectPhaseItemActivId;
        //    FromViewToDataSource.SubContractActivityId = item.SubContractActivityId;
        //    FromViewToDataSource.UnitPrice = Number(item.UnitPrice);
        //    FromViewToDataSource.ProjectQty = item.ProjQty;
        //    FromViewToDataSource.ContractQty = item.ContractQty;
        //    FromViewToDataSource.FinishQty = 0; //
        //    FromViewToDataSource.SOQty = item.ContractQty - item.SOQty; //
        //    FromViewToDataSource.ActivityCode = item.Act_Code;
        //    FromViewToDataSource.DescA = item.Act_DescA;
        //    FromViewToDataSource.DescE = item.Act_DescE;
        //    FromViewToDataSource.Uom_Code = item.Uom_Code;
        //    FromViewToDataSource.Uom_DescA = item.Uom_DescA;
        //    FromViewToDataSource.Uom_DescE = item.Uom_DescE;
        //    DetailsSubOrderActivity.unshift(FromViewToDataSource);
        //}
        //GridOrderActivity.DataSource = DetailsSubOrderActivity;
        //GridOrderActivity.Bind();
        //Update();
    }

    function btnSearchOrder_Clicked() {


        sys.FindKey(Modules.ServiceOrder, "btnSearchOrder", _Cond, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetServiceOrder", ControllerName),
                data: { id: id },
                success: (d) => {

                    MasterDetails = d.result as M_D_ServiceOrder;
                    Master = d.result as PQ_GetEngSubServiceOrder;
                    let Index = GetIndexByUseId(Number(Master.SubServiceOrderId), "PQ_GetEngSubServiceOrder", "SubServiceOrderId", _Cond);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }
    function SearchOrder_Changed() {
        var trno = Number(txtTrNo.value);
            Ajax.CallAsync({
                url: Url.Action("getSubServiceOrderViewByNo", "FindByNo"),
                data: { trno: trno },
                success: (d) => {

                    if (IsNullOrEmpty(d.result)) {
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");

                    }
                    Master = d.result as PQ_GetEngSubServiceOrder;
                    let Index = GetIndexByUseId(Number(Master.SubServiceOrderId), "PQ_GetEngSubServiceOrder", "SubServiceOrderId", _Cond);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        
    }
    function ServiceOrder_ReOpen() {


        Ajax.Callsync({
            url: Url.Action("EngSubServiceOrderReopen", ControllerName),
            data: { _Id: Master.SubServiceOrderId },
            success: (d) => {

                //alert(d);
            }
        });
        let Index = GetIndexByUseId(Number(Master.SubServiceOrderId), "PQ_GetEngSubServiceOrder", "SubServiceOrderId", _Cond);
        NavigateToSearchResultKey(Number(Index), Navigate);

    }
    //function EngSubServiceOrderClose(id: number) {

    //    Ajax.CallAsync({
    //        url: Url.Action("EngSubServiceOrderClose", ControllerName),
    //        data: { id: id },
    //        success: (d) => {

    //        }
    //    });
    //}

    function PrintServiceOrder() {
        Ajax.CallAsync({
            url: Url.Action("printServiceOrder", "PrintTransaction"),
            data: { TrNo: Number(Master.SubServiceOrderId) },
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });
    }

    //function EngSubServiceOrderApprove(id: number) {
    //    Update();
    //    Ajax.Callsync({
    //        url: Url.Action("EngSubServiceOrderApprove", ControllerName),
    //        async: false,
    //        data: { id: id },
    //        success: (d) => {

    //        }
    //    });
    //}
}