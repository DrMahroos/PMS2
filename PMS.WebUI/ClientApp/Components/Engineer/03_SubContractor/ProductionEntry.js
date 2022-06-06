$(document).ready(function () {
    ProductionEntry.InitalizeComponent();
});
var ProductionEntry;
(function (ProductionEntry) {
    var GridProductionActivity = new JsGrid();
    var sys = new SystemTools();
    var ControllerName = "ProductionEntry";
    var GridInputClassName = "form-control gridIput";
    var columnWidth = "100px";
    var NumberColumnWidth = "50px";
    var MasterDetails = new M_D_ProductionEntry();
    var Master = new PQ_GetEngSubProduction();
    var ActivityProdDataSource = new Array();
    var DetailsSubProductionActivity = new Array();
    var DetailsAssignHeaderProdActivity = new PQ_GetEngSubProductionActivity();
    var TblProductionActivity = new Array();
    var _ScreenLanguage;
    var _CompCode;
    var _BranchCode;
    var DetailsAssignHeaderActivity = new PQ_GetEngServiceOrderActivity();
    var txtTrNo;
    var txtTrDate;
    var txtSubServiceOrderId;
    var txtSo_DescE;
    var txtsubcon_SubContractorCode;
    var txtsubcon_DescE;
    var txtEng_EngCode;
    var txtEng_DescE;
    var txtProj_DescL;
    var txtPhase_DescE;
    var txtStartDate;
    var txtEndDate;
    var txtOrgAmount;
    var txtDeduction;
    var txtTotalAmount;
    var txtWarranly;
    var txtDownpayment;
    var txtDueAmount;
    var txtVatAmount;
    var txtDescA;
    var txtDescE;
    var btnSearchProduction;
    var btnSearchSeviceOrder;
    var btnApprove;
    var btnOpen;
    var subContId;
    var activityId;
    var ProjectPhaseItemActivId;
    var SubServiceOrderActivityId;
    var SubServiceOrderId;
    //var subServiceOrderId: number;
    var subContract;
    var subContractor;
    var ProjectId;
    var PhaseId;
    var siteEngId;
    var _WarranlyPrc;
    var _downpaymentPrc;
    var stutes;
    var _Cond = "";
    var condition = "";
    var gvatPrc;
    var ChkApprove;
    var ChkIsFinal;
    function InitalizeComponent() {
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
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.DeleteAction(function () { });
        ControlsButtons.UndoAction(function () { });
        ControlsButtons.PrintAction(function () { Print(); });
        InitalizeGrid();
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.ProductionEntry, Master.SubProductionId.toString());
        });
        btnOpen.disabled = true;
        ChkApprove.checked = false;
        ChkApprove.disabled = true;
        ChkIsFinal.checked = false;
    }
    ProductionEntry.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById("txtTrNo");
        txtTrDate = DocumentActions.GetElementById("txtTrDate");
        txtSubServiceOrderId = DocumentActions.GetElementById("txtSubServiceOrderId");
        txtSo_DescE = DocumentActions.GetElementById("txtSo_DescE");
        txtsubcon_SubContractorCode = DocumentActions.GetElementById("txtsubcon_SubContractorCode");
        txtsubcon_DescE = DocumentActions.GetElementById("txtsubcon_DescE");
        txtEng_EngCode = DocumentActions.GetElementById("txtEng_EngCode");
        txtEng_DescE = DocumentActions.GetElementById("txtEng_DescE");
        txtProj_DescL = DocumentActions.GetElementById("txtProj_DescL");
        txtPhase_DescE = DocumentActions.GetElementById("txtPhase_DescE");
        txtStartDate = DocumentActions.GetElementById("txtStartDate");
        txtEndDate = DocumentActions.GetElementById("txtEndDate");
        txtDescA = DocumentActions.GetElementById("txtDescA");
        txtDescE = DocumentActions.GetElementById("txtDescE");
        txtOrgAmount = DocumentActions.GetElementById("txtOrgAmount");
        txtDeduction = DocumentActions.GetElementById("txtDeduction");
        txtTotalAmount = DocumentActions.GetElementById("txtTotalAmount");
        txtWarranly = DocumentActions.GetElementById("txtWarranly");
        txtDownpayment = DocumentActions.GetElementById("txtDownpayment");
        txtDueAmount = DocumentActions.GetElementById("txtDueAmount");
        txtVatAmount = DocumentActions.GetElementById("txtVatAmount");
        btnSearchProduction = DocumentActions.GetElementById("btnSearchProduction");
        btnSearchSeviceOrder = DocumentActions.GetElementById("btnSearchSeviceOrder");
        btnApprove = DocumentActions.GetElementById("btnApprove");
        btnOpen = DocumentActions.GetElementById("btnOpen");
        ChkApprove = DocumentActions.GetElementById("ChkApprove");
        ChkIsFinal = DocumentActions.GetElementById("ChkIsFinal");
    }
    function InitalizeEvents() {
        btnSearchSeviceOrder.onclick = btnSearchSeviceOrder_Clicked;
        btnSearchProduction.onclick = btnSearchProduction_Clicked;
        btnApprove.onclick = btnApprove_Clicked;
        btnOpen.onclick = btnOpen_Clicked;
        txtDeduction.onchange = Deduction_change;
        txtTrNo.onchange = SearchProduction_Changed;
        txtSubServiceOrderId.onchange = SearchSeviceOrder_Changed;
    }
    function InitalizeGrid() {
        var res = GetResourceList("ServiceOrder_");
        GridProductionActivity.ElementName = "GridProductionActivity";
        GridProductionActivity.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridProductionActivity.OnRefreshed = function () {
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
        GridProductionActivity.OnItemInserting = function () { };
        GridProductionActivity.OnItemUpdating = function () { };
        GridProductionActivity.OnItemDeleting = function () { };
        GridProductionActivity.Columns = [
            {
                title: res.ServiceOrder_Act_ActivityCode, name: "ActivityCode", width: "7.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ActivityCode", " ");
                    txt.id = "h_ActivityCode";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_Act_ActivityCode, txt);
                }
            },
            {
                title: res.ServiceOrder_Act_DescA, visible: _ScreenLanguage == "ar", name: "DescA", width: "25.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_Act_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_Act_DescA, txt);
                }
            },
            {
                title: res.ServiceOrder_Act_DescA, visible: _ScreenLanguage == "en", name: "DescE", width: "25.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescE", " ");
                    txt.id = "h_Act_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_Act_DescA, txt);
                }
            },
            {
                title: res.ServiceOrder_uom_DescA, visible: _ScreenLanguage == "ar", name: "Uom_DescA", width: "6.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Uom_DescA", " ");
                    txt.id = "h_uom_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_uom_DescA, txt);
                }
            },
            {
                title: res.ServiceOrder_uom_DescA, visible: _ScreenLanguage == "en", name: "Uom_DescE", width: "6.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Uom_DescE", " ");
                    txt.id = "h_Uom_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_uom_DescA, txt);
                }
            },
            {
                title: res.ServiceOrder_SOQty, name: "SOQty", width: "6.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "SOQty", " ");
                    txt.id = "h_SOQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_SOQty, txt);
                }
            },
            {
                title: res.ServiceOrder_FinishQty, name: "FinishQty", width: "6.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "FinishQty", " ");
                    txt.id = "h_FinishQty";
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
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "AppQty", " ");
                    txt.id = "h_AppQty";
                    txt.onkeyup = function (e) {
                        var res = Number($('#h_AppQty').val()) * Number($('#h_UnitPrice').val());
                        $('#h_Total').val(res);
                    };
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ServiceOrder_AppQty, txt);
                }
            },
            {
                title: res.ServiceOrder_UnitPrice, name: "UnitPrice", width: "6.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "UnitPrice", " ");
                    txt.id = "h_UnitPrice";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_UnitPrice, txt);
                }
            },
            {
                title: res.ServiceOrder_Total, name: "Total", width: "6.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Total", " ");
                    txt.id = "h_Total";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_Total, txt);
                }
            },
            {
                title: res.ServiceOrder_UnitPrice, name: "ProdBeforeQty", width: "6.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ProdBeforeQty", " ");
                    txt.id = "h_ProdBeforeQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_ProdBeforeQty, txt);
                }
            },
            {
                title: res.ServiceOrder_RemainQty, name: "RemainQty", width: "6.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "RemainQty", " ");
                    txt.id = "h_RemainQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ServiceOrder_RemainQty, txt);
                }
            },
            {
                title: res.ServiceOrder_Remarks, name: "Remarks", width: "8.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Remarks", " ");
                    txt.id = "h_Remarks";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ServiceOrder_Remarks, txt);
                }
            },
            {
                title: "#", name: "btnAddItem", visible: true, width: NumberColumnWidth,
                headerTemplate: function () {
                    var btn = DocumentActions.CreateElement("button");
                    btn.className = TransparentButton;
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemActivityGrid";
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddItemInActivityGrid();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.type = "button";
                    btn.name = DetailsSubProductionActivity.indexOf(item).toString();
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        debugger;
                        var index = Number(e.currentTarget.name);
                        DetailsSubProductionActivity.splice(index, 1);
                        BindGridProductionActivity();
                        //ReIndexingGrid();
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
                    btn.style.color = "forestgreen";
                    btn.type = "button";
                    btn.name = DetailsSubProductionActivity.indexOf(item).toString();
                    btn.onclick = function (e) {
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
                        var index = Number(e.currentTarget.name);
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
                        FillInputText("h_uom_DescA", DetailsAssignHeaderProdActivity.Uom_DescA);
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
        ClearGrid(GridProductionActivity, new Array());
        $("#effects").css('backgroundColor', '#FFFFFF');
    }
    function Edit() {
        debugger;
        btnOpen.disabled = true;
        if (SharedSession.CurrentPrivileges.CUSTOM1 == true) {
            ChkApprove.disabled = true;
            btnApprove.disabled = false;
        }
        else {
            ChkApprove.disabled = true;
            btnApprove.disabled = true;
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
        var session = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        debugger;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_SubProduction", "InsertMasterDetail"),
            data: JSON.stringify(MasterDetails),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Update", function () {
                        debugger;
                        var _Index = GetIndexByUseId(result.Response, "PQ_GetEngSubProduction", "SubProductionId", "CompCode =" + _CompCode + " and braCode = " + _BranchCode);
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
        var session = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_SubProduction", "UpdateMasterDetail"),
            data: JSON.stringify(MasterDetails),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Update", function () {
                        debugger;
                        var _Index = GetIndexByUseId(result.Response, "PQ_GetEngSubProduction", "SubProductionId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
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
        DocumentActions.AssignToModel(Master);
        MasterDetails.P_TR_SubProduction = Master;
        Master.VatPrc = gvatPrc;
        if (ChkIsFinal.checked == true)
            Master.IsFinal = true;
        else
            Master.IsFinal = false;
        //AssignDetails
        MasterDetails.P_TR_SubProductionActivity = DetailsSubProductionActivity;
        for (var _i = 0, DetailsSubProductionActivity_1 = DetailsSubProductionActivity; _i < DetailsSubProductionActivity_1.length; _i++) {
            var Act = DetailsSubProductionActivity_1[_i];
            Act.SubProductionId = Master.SubProductionId;
            Act.SubServiceOrderId = Number(Master.SubServiceOrderId);
            TblProductionActivity.push(Act);
        }
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: function (d) {
                Master = d.result;
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
    function FillInputText(_TextID, _Data) {
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
        gvatPrc = Master.VatPrc;
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
            ChkApprove.checked = (Master.Status == 1);
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
        sys.FindKey(Modules.ProductionEntry, "btnSearchSeviceOrder", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode + " and Status = 2", function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.Callsync({
                url: Url.Action("GetService", ControllerName),
                data: { id: id },
                success: function (d) {
                    debugger;
                    var result = d.result;
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
            success: function (d) {
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
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    return;
                }
                debugger;
                var result = d.result;
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
    function LaodDetails(ServiceOrderid) {
        Ajax.Callsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: ServiceOrderid },
            success: function (d) {
                var res = d.result;
                DetailsSubProductionActivity = new Array();
                var obj = new PQ_GetEngSubProductionActivity();
                for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                    var item = res_1[_i];
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
    function DisplayDetails(SubProductionId) {
        Ajax.CallAsync({
            url: Url.Action("DisplayDetails", ControllerName),
            data: { id: SubProductionId },
            success: function (d) {
                DetailsSubProductionActivity = d.result;
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
        var total = 0;
        for (var _i = 0, DetailsSubProductionActivity_2 = DetailsSubProductionActivity; _i < DetailsSubProductionActivity_2.length; _i++) {
            var item = DetailsSubProductionActivity_2[_i];
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
        txtDueAmount.value = (Number(txtTotalAmount.value) - Number(txtDownpayment.value) - Number(txtWarranly.value)).toFixed(2);
    }
    function getSubContract(id) {
        Ajax.Callsync({
            url: Url.Action("getSubContract", ControllerName),
            data: { id: id },
            success: function (d) {
                var result = d.result;
                txtsubcon_DescE.value = result.DescE;
                _WarranlyPrc = result.WarranlyPrc;
                _downpaymentPrc = result.DownpaymentPrc;
            }
        });
    }
    function AddItemInActivityGrid() {
        debugger;
        var sum = Number($('#h_SOQty').val()) - Number($('#h_ProdBeforeQty').val());
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
            success: function (d) {
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
            success: function (d) {
            }
        });
    }
    function btnSearchProduction_Clicked() {
        sys.FindKey(Modules.ProductionEntry, "btnSearchProduction", condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSubProduction", ControllerName),
                data: { id: id },
                success: function (d) {
                    MasterDetails = d.result;
                    Master = d.result;
                    var Index = GetIndexByUseId(Number(Master.SubProductionId), "PQ_GetEngSubProduction", "SubProductionId", condition);
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
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                Master = d.result;
                var Index = GetIndexByUseId(Number(Master.SubProductionId), "PQ_GetEngSubProduction", "SubProductionId", condition);
                NavigateToSearchResultKey(Number(Index), Navigate);
            }
        });
    }
    function Print() {
        Ajax.CallAsync({
            url: Url.Action("printSubProduction", "PrintTransaction"),
            data: { TrNo: Number(Master.SubProductionId) },
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
})(ProductionEntry || (ProductionEntry = {}));
//# sourceMappingURL=ProductionEntry.js.map