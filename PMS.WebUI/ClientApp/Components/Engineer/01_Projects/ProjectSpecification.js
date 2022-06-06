$(document).ready(function () {
    ProjectSpecification.InitalizeComponent();
});
var ProjectSpecification;
(function (ProjectSpecification) {
    var ControllerName = "ProjectSpecification";
    var TableName = "PQ_GetEngProjectPhase";
    var FieldKey = "ProjectPhaseId";
    var JsGridcombobox = "combobox";
    var Master = new P_TR_EngProjectPhase();
    var MasterDetails = new M_D_EngSpcDetails();
    var ProjectPjhase = new M_D_EngProjectPhase();
    var MasterDetailsView = new M_D_EngSpcDetailsView();
    var _ScreenLanguage;
    var _CompCode;
    var _BranchCode;
    var DataSourceItem = new Array();
    var DataSourceAct = new Array();
    var ActivityTemp = new Array();
    var _SiteEngineer = new Array();
    var _Scope = new Array();
    var _Calender = new Array();
    var GridItem = new JsGrid();
    var GridActivity = new JsGrid();
    var sys = new SystemTools();
    var txtProjectID;
    var txtProjectPhaseCode;
    var txtDescA;
    var txtDescL;
    var txtSpeciality111;
    var txtCarPlateNo;
    var txtprojectDesc;
    var txtcostcenter;
    var txtcostcentername;
    var txtEng_EngCode;
    var txtEng_DescA;
    var txtStartDate;
    var txtEndDate;
    var txtOfferTrNo;
    var txtOfferTrSerial;
    var txtScop_ScopeCode;
    var txtScop_DescA;
    var txtCal_Calendercode;
    var txtCal_DescA;
    var txtCal_DailyWorkHours;
    var txtCust_CustomerCode;
    var txtCust_DescE;
    var ChkIsMaintenanceWork;
    var ChkToBeInvoiced;
    var ChkIsBonusIncluded;
    var btnPhaseCode;
    var btnProjectCode;
    //var btncostcenter: HTMLButtonElement;
    var btnEng_EngCode;
    var btnScop_ScopeCode;
    var btnCal_Calendercode;
    var btnStartWork;
    var btnSuspend;
    var btnStopped;
    var btnFinished;
    var btnItems;
    var scopeId = 0;
    var calenderId = 0;
    var siteEngineerId = 0;
    var Projectid = 0;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        InitalizeControls();
        InitalizeEvents();
        InitalizeGrid();
        actionControl();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                return;
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.UndoAction(Undo);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.PrintAction(Print);
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.ProjectSpecification, Master.ProjectPhaseId.toString());
        });
    }
    ProjectSpecification.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("ProjSpec_");
        GridItem.ElementName = "GridItem";
        GridItem.OnRefreshed = function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridItem.OnRowDoubleClicked = GridItem_OnRowDoubleClicked;
        GridItem.OnItemDeleting = DeleteItems;
        GridItem.Columns = [
            { title: res.ProjSpec_Serial, name: "LineCode", type: "label", width: "7.5%" },
            { title: res.ProjSpec_SlsITm_ItemCode, name: "SlsITm_ItemCode", type: "text", width: "7.5%" },
            { title: res.ProjSpec_SlsITm_DescE, name: "SlsITm_DescE", type: "text", width: "40%" },
            { title: res.ProjSpec_ContrQty, name: "ContrQty", type: "number", width: "5%" },
            { title: res.ProjSpec_ItemQty, name: "ItemQty", type: "number", width: "5%" },
            { title: res.ProjSpec_ProdQty, name: "ProdQty", type: "text", width: "5%" },
            { title: res.ProjSpec_BilledQty, name: "BilledQty", type: "text", width: "5%" },
            { title: res.ProjSpec_UnitPrice, name: "UnitPrice", type: "text", width: "5.5%" },
            { title: res.ProjSpec_Scp_DescE, name: "Scp_DescE", type: "text", width: "10%" },
            //{ title: res.ProjSpec_Remarks, name: "Remarks", type: "text", width: "5%" },
            { type: "control", width: "3%" }
        ];
        BindGridItem();
        GridActivity.ElementName = "GridActivity";
        GridActivity.Columns = [
            { title: res.ProjSpec_Serial, name: "LineCode", type: "text", width: "3%" },
            { title: res.ProjSpec_act_ActivityCode, name: "act_ActivityCode", type: "text", width: "5%" },
            { title: res.ProjSpec_act_DescE, name: "act_DescE", type: "text", width: "20%" },
            { title: res.ProjSpec_UOM_DescE, name: "UOM_DescE", type: "number", width: "4%" },
            { title: res.ProjSpec_ContrQty, name: "ContrQty", type: "number", width: "4%" },
            { title: res.ProjSpec_ActivQty, name: "ActivQty", type: "number", width: "4%" },
            { title: res.ProjSpec_ProdPRc, name: "ProductionPrc", type: "number", width: "5%" },
            { title: res.ProjSpec_TotalProdQty, name: "TotalProdQty", type: "text", width: "5%" },
            // title: res.ProjSpec_Total, type: "text", width: "6%" },//--------------
            { title: res.ProjSpec_SchedQty, name: "SchedQty", type: "text", width: "5%" },
            { title: res.ProjSpec_SchedProdQty, name: "SchedProdQty", type: "text", width: "5%" },
            { title: res.ProjSpec_SCon_Qty, name: "SCon_Qty", type: "text", width: "5%" },
            { title: res.ProjSpec_SConProdQty, name: "SConProdQty", type: "text", width: "5%" },
        ];
        GridActivity.DataSource = DataSourceAct;
        GridActivity.Bind();
    }
    function InitalizeControls() {
        txtProjectID = document.getElementById("txtProjectID");
        txtProjectPhaseCode = document.getElementById("txtProjectPhaseCode");
        txtDescA = document.getElementById("txtDescA");
        txtDescL = document.getElementById("txtDescL");
        txtSpeciality111 = document.getElementById("txtSpeciality111");
        txtCarPlateNo = document.getElementById("txtCarPlateNo");
        txtprojectDesc = document.getElementById("txtprojectDesc");
        txtcostcenter = document.getElementById("txtcostcenter");
        txtcostcentername = document.getElementById("txtcostcentername");
        txtEng_EngCode = document.getElementById("txtEng_EngCode");
        txtEng_DescA = document.getElementById("txtEng_DescA");
        txtStartDate = document.getElementById("txtStartDate");
        txtEndDate = document.getElementById("txtEndDate");
        txtOfferTrNo = document.getElementById("txtOfferTrNo");
        txtOfferTrSerial = document.getElementById("txtOfferTrSerial");
        txtScop_ScopeCode = document.getElementById("txtScop_ScopeCode");
        txtScop_DescA = document.getElementById("txtScop_DescA");
        txtCal_Calendercode = document.getElementById("txtCal_Calendercode");
        txtCal_DescA = document.getElementById("txtCal_DescA");
        txtCust_CustomerCode = document.getElementById("txtCust_CustomerCode");
        txtCust_DescE = document.getElementById("txtCust_DescE");
        txtCal_DailyWorkHours = document.getElementById("txtCal_DailyWorkHours");
        ChkIsMaintenanceWork = document.getElementById("ChkIsMaintenanceWork");
        ChkToBeInvoiced = document.getElementById("ChkToBeInvoiced");
        ChkIsBonusIncluded = document.getElementById("ChkIsBonusIncluded");
        btnPhaseCode = document.getElementById("btnPhaseCode");
        btnProjectCode = document.getElementById("btnProjectCode");
        //btncostcenter = document.getElementById("btncostcenter") as HTMLButtonElement;
        btnEng_EngCode = document.getElementById("btnEng_EngCode");
        btnScop_ScopeCode = document.getElementById("btnScop_ScopeCode");
        btnCal_Calendercode = document.getElementById("btnCal_Calendercode");
        btnStartWork = document.getElementById("btnStartWork");
        btnSuspend = document.getElementById("btnSuspend");
        btnStopped = document.getElementById("btnStopped");
        btnFinished = document.getElementById("btnFinished");
        btnItems = document.getElementById("btnItems");
    }
    function InitalizeEvents() {
        btnPhaseCode.onclick = btnPhaseCode_onclick;
        btnProjectCode.onclick = btnProjectCode_onclick;
        txtProjectID.onchange = ProjectCode_onChange;
        txtProjectPhaseCode.onchange = PhaseCode_onChanged;
        txtEng_EngCode.onchange = Eng_EngCode_changed;
        //btncostcenter.onclick = btncostcenter_onclick;
        btnEng_EngCode.onclick = btnEng_EngCode_onclick;
        btnScop_ScopeCode.onclick = btnScop_ScopeCode_onclick;
        btnCal_Calendercode.onclick = btnCal_Calendercode_onclick;
        btnStartWork.onclick = btnStartWork_onclick;
        btnSuspend.onclick = btnSuspend_onclick;
        btnStopped.onclick = btnStopped_onclick;
        btnFinished.onclick = btnFinished_onclick;
        btnItems.onclick = btnItems_onclick;
        txtScop_ScopeCode.onchange = Scop_ScopeCode_Changed;
    }
    function btnItems_onclick() {
        debugger;
        var Condition = " ProjectPhaseId  is NULL and ProjectID = " + Master.ProjectID.toString() /*" and (ScopeID =" + Master.ScopeID + " or ScopeID is null*/;
        sys.FindKey(Modules.ProjectSpecification, "btnItems", Condition, function () {
            debugger;
            if (Master.ProjectPhaseId != 0) {
                var id = ClientSharedWork.SearchDataGrid.SelectedKey;
                AjaxApi.CallAsyncApi({
                    url: sys.apiUrl("P_TR_EngProjectPhase", "GetProjectItem"),
                    data: { id: id },
                    success: function (d) {
                        debugger;
                        var result = d;
                        if (result.IsSuccess) {
                            UpdateItems(result.Response);
                        }
                    }
                });
                //let ProjectItems: P_TR_EngProjectItem = Ajax.Call<P_TR_EngProjectItem>({ url: Url.Action("GetProjectItem", ControllerName), data: { id: id } });
                //UpdateItems(ProjectItems[0]);
            }
        });
    }
    function GridItem_OnRowDoubleClicked() {
        var _Item = GridItem.SelectedItem;
        //DataSourceAct = ActivityTemp.filter(x => x.ProjectPhaseItemId = _Item.ProjectPhaseItemId);
        AjaxApi.CallAsyncApi({
            type: "GET",
            url: sys.apiUrl("P_TR_EngProjectPhase", "GetEngProjectActivity"),
            data: { id: _Item.ProjectPhaseItemId },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    DataSourceAct = new Array();
                    DataSourceAct = result.Response;
                    GridActivity.DataSource = DataSourceAct;
                    GridActivity.Bind();
                }
            }
        });
        //DataSourceAct = Ajax.Call<Array<PQ_GetEngProjectActivity>>({ url: Url.Action("GetEngProjectActivity", ControllerName), data: { id: _Item.ProjectPhaseItemId } });
    }
    function BindGridItem() {
        GridItem.DataSource = DataSourceItem;
        GridItem.Bind();
        $(".jsgrid-insert-mode-button").attr("disabled", "disabled");
        $(".jsgrid-edit-button").attr("disabled", "disabled");
        $(".jsgrid-delete-button").attr("disabled", "disabled");
        $(".jsgrid-edit-button").hide();
    }
    function btnPhaseCode_onclick() {
        if (Projectid == null || Projectid == 0) {
            WorningMessage("يجب اختيار مشروع اولا", "You Should Select Project ");
            return;
        }
        debugger;
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode + " and ProjectID = " + Projectid;
        sys.FindKey(Modules.ProjectSpecification, "btnPhaseCode", Condition, function () {
            debugger;
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            var Index = GetIndexByUseId(Number(id), TableName, FieldKey, " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
            NavigateToSearchResultKey(Number(Index), Navigate);
        });
    } //eslam
    function PhaseCode_onChanged() {
        if (Projectid == null || Projectid == 0) {
            WorningMessage("يجب اختيار مشروع اولا", "You Should Select Project ");
            return;
        }
        debugger;
        var PhaseNo = txtProjectPhaseCode.value;
        var ProjectNo = Number(txtProjectID.value);
        Ajax.Callsync({
            url: Url.Action("getProjectPhaseViewByno", 'FindByNo'),
            data: { ProjectNo: ProjectNo, PhaseNo: PhaseNo },
            success: function (d) {
                debugger;
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                debugger;
                var Project = d.result;
                var Index = GetIndexByUseId(Number(Project[0].ProjectPhaseId), TableName, FieldKey, "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                NavigateToSearchResultKey(Number(Index), Navigate);
            }
        });
    }
    function btncostcenter_onclick() {
        var Condition = "";
        debugger;
        sys.FindKey(Modules.ProjectSpecification, "btncostcenter", "COMP_CODE = " + _CompCode, function () {
            var Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            var _Customers = GetCostCenterById(Id);
            txtcostcenter.value = Id;
            txtcostcentername.value = _ScreenLanguage = "ar" ? _Customers.CC_DESC : _Customers.CC_DESCE;
        });
    }
    function btnEng_EngCode_onclick() {
        sys.FindKey(Modules.ProjectSpecification, "btnEng_EngCode", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            AjaxApi.CallAsyncApi({
                url: sys.apiUrl("P_TR_EngProjectPhase", "GetSiteEngineerByID"),
                data: { id: id },
                success: function (d) {
                    var result = d;
                    if (result.IsSuccess) {
                        var SitEng = result.Response;
                        siteEngineerId = SitEng.SiteEngineerId;
                        txtEng_EngCode.value = SitEng.EngCode;
                        txtEng_DescA.value = _ScreenLanguage = "ar" ? SitEng.DescA : SitEng.DescE;
                    }
                }
            });
            //let SitEng: P_D_SiteEngineer = Ajax.Call({ url: Url.Action("GetByID", "SiteEngineer"), data: { id: id } }) as P_D_SiteEngineer;
            //txtEng_EngCode.value = SitEng.EngCode;
            //txtEng_DescA.value = _ScreenLanguage = "ar" ? SitEng.DescA : SitEng.DescE;
        });
    }
    function Eng_EngCode_changed() {
        var code = txtEng_EngCode.value;
        debugger;
        Ajax.Callsync({
            url: Url.Action("getSiteEngineerByCode", "FindByNo"),
            data: { code: code },
            success: function (d) {
                debugger;
                if (IsNullOrEmpty(d.result)) {
                    siteEngineerId = 0;
                    txtEng_EngCode.value = "";
                    txtEng_DescA.value = "";
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    return;
                }
                var result = d.result;
                siteEngineerId = result[0].SiteEngineerId;
                txtEng_EngCode.value = result[0].EngCode;
                txtEng_DescA.value = _ScreenLanguage = "ar" ? result[0].DescA : result[0].DescE;
            }
        });
    }
    function btnScop_ScopeCode_onclick() {
        //if (DataSourceItem.length > 0) {
        //    WorningMessage("احذف بنود المرحلة اولاً", "Remove Phase Items First");
        //    return;
        //}
        var Condition = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        GetIndexByUseCode;
        sys.FindKey(Modules.ProjectSpecification, "btnScop_ScopeCode", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            AjaxApi.CallAsyncApi({
                type: "GET",
                url: sys.apiUrl("P_TR_EngProjectPhase", "GetScopeDefinitionById"),
                data: { id: id },
                success: function (d) {
                    var result = d;
                    if (result.IsSuccess) {
                        var Scop = result.Response;
                        scopeId = Scop.ScopeID;
                        txtScop_ScopeCode.value = Scop.ScopeCode;
                        txtScop_DescA.value = _ScreenLanguage = "ar" ? Scop.DescA : Scop.DescE;
                    }
                }
            });
            //let Scop: P_D_Scope = Ajax.Call({ url: Url.Action("GetById", "ScopeDefinition"), data: { id: id } }) as P_D_Scope;
        });
    }
    function Scop_ScopeCode_Changed() {
        var Condition = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        debugger;
        var code = txtScop_ScopeCode.value;
        AjaxApi.CallAsyncApi({
            type: "GET",
            url: Url.Action("getScopeByCode", "FindByNo"),
            data: { code: code },
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    scopeId = 0;
                    txtScop_ScopeCode.value = "";
                    txtScop_DescA.value = "";
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    return;
                }
                var result = d.result;
                scopeId = result[0].ScopeID;
                txtScop_ScopeCode.value = result[0].ScopeCode;
                txtScop_DescA.value = _ScreenLanguage = "ar" ? result[0].DescA : result[0].DescE;
            }
        });
    }
    function btnCal_Calendercode_onclick() {
        sys.FindKey(Modules.ProjectSpecification, "btnCal_Calendercode", "", function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            AjaxApi.CallAsyncApi({
                type: "GET",
                url: sys.apiUrl("P_TR_EngProjectPhase", "GetCalendarDefinitionByID"),
                data: { catID: id },
                success: function (d) {
                    var result = d;
                    if (result.IsSuccess) {
                        var Calender = result.Response;
                        calenderId = Calender.CalenderID;
                        txtCal_Calendercode.value = Calender.Calendercode;
                        txtCal_DescA.value = _ScreenLanguage = "ar" ? Calender.DescA : Calender.DescE;
                    }
                }
            });
            //let Calender: P_D_Calender = Ajax.Call({ url: Url.Action("GetByID", "CalendarDefinition"), data: { catID: id } }) as P_D_Calender;
            //txtCal_Calendercode.value = Calender.Calendercode;
            //txtCal_DescA.value = _ScreenLanguage = "ar" ? Calender.DescA : Calender.DescE;
        });
    }
    function btnStartWork_onclick() {
        if (CheckStartEndDate(0) == false)
            return;
        $("#SelectStatus").val("1");
        actionControl();
    }
    function btnSuspend_onclick() {
        $("#SelectStatus").val("3");
        actionControl();
    }
    function btnStopped_onclick() {
        $("#SelectStatus").val("2");
        actionControl();
    }
    function btnFinished_onclick() {
        if (CheckStartEndDate(5) == false)
            return;
        $("#SelectStatus").val("5");
        actionControl();
    }
    function CheckStartEndDate(st) {
        debugger;
        if (txtStartDate.value == null || txtStartDate.value == "") {
            WorningMessage("يجب ادخال تاريخ البداية", "Start Date must be entered");
            return (false);
        }
        if (st == 5) {
            if (txtEndDate.value == null || txtEndDate.value == "") {
                WorningMessage("يجب ادخال تاريخ الانتهاء", "End Date must be entered");
                return (false);
            }
            var sd = new Date(txtStartDate.value);
            var ed = new Date(txtEndDate.value);
            if (ed <= sd) {
                WorningMessage(" تاريخ الانتهاء يجب ان يكون بعد تاريخ البداية", "End Date must be after Start Date ");
                return (false);
            }
        }
        return (true);
    }
    function actionControl() {
        debugger;
        btnFinished.disabled = true;
        btnSuspend.disabled = true;
        btnStopped.disabled = true;
        btnStartWork.disabled = true;
        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
            return;
        }
        if ($("#SelectStatus").val() == "1") {
            btnStopped.disabled = !SharedSession.CurrentPrivileges.CUSTOM3;
            btnSuspend.disabled = !SharedSession.CurrentPrivileges.CUSTOM3;
            btnFinished.disabled = !SharedSession.CurrentPrivileges.CUSTOM2;
        }
        if ($("#SelectStatus").val() == "0") {
            btnStopped.disabled = !SharedSession.CurrentPrivileges.CUSTOM3;
            btnStartWork.disabled = !SharedSession.CurrentPrivileges.CUSTOM1;
        }
        if ($("#SelectStatus").val() == "3") {
            btnStopped.disabled = !SharedSession.CurrentPrivileges.CUSTOM3;
            btnStartWork.disabled = !SharedSession.CurrentPrivileges.CUSTOM1;
        }
        if ($("#SelectStatus").val() == "2") {
            btnStartWork.disabled = !SharedSession.CurrentPrivileges.CUSTOM1;
        }
        if ($("#SelectStatus").val() == "5") {
            btnStartWork.disabled = !SharedSession.CurrentPrivileges.CUSTOM1;
        }
    }
    function ClearPhase() {
        txtDescL.value = "";
        txtDescA.value = "";
        txtProjectPhaseCode.value = "";
        txtCust_CustomerCode.value = "";
        txtCust_DescE.value = "";
        txtprojectDesc.value = "";
        txtcostcenter.value = "";
        txtEng_EngCode.value = "";
        txtEng_DescA.value = "";
        txtCal_Calendercode.value = "";
        txtCal_DescA.value = "";
        txtScop_ScopeCode.value = "";
        txtScop_DescA.value = "";
        txtCal_DailyWorkHours.value = "";
        DataSourceItem = null;
        ClearGrid(GridItem, DataSourceItem);
        DataSourceAct = null;
        ClearGrid(GridActivity, DataSourceAct);
    }
    function btnProjectCode_onclick() {
        //this function not used
        var Condition = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.ProjectDefination, "btnProjectCode", Condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.Callsync({
                url: Url.Action("GetProjectByID", ControllerName),
                data: { id: id },
                success: function (d) {
                    debugger;
                    var result = d.result;
                    Projectid = result.ProjectID;
                    txtProjectID.value = result.ProjectCode;
                    ClearPhase();
                    //MasterDetails.P_TR_EngProjectPhase = d.result as P_TR_EngProjectPhase;
                    //Master = d.result as P_TR_EngProjectPhase;
                    //let Index = GetIndexByUseId(Number(Master.ProjectID), TableName, FieldKey, " CompCode = " + _CompCode + " and BraCode = " + _BranchCode)
                    //NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
            //btnPhaseCode_onclick();
        });
    }
    //eslam
    function ProjectCode_onChange() {
        //this function not used
        var Condition = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        var Pno = Number(txtProjectID.value);
        Ajax.Callsync({
            url: Url.Action("getProjectTableByno", "FindByNo"),
            data: { Pno: Pno },
            success: function (d) {
                debugger;
                if (IsNullOrEmpty(d.result)) {
                    txtProjectID.value = "";
                    Projectid = 0;
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    return;
                }
                debugger;
                var result = d.result;
                Projectid = result[0].ProjectID;
                txtProjectID.value = result[0].ProjectCode;
                ClearPhase();
                $("#txtProjectPhaseCode").removeAttr("disabled");
                $("#txtProjectPhaseCode").addClass("xaddable");
                $("#txtProjectPhaseCode").addClass("xeditable");
            }
        });
    }
    function btnCustCode_onclick() {
        var Condition = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode + "  and IsActive = 1 ";
        sys.FindKey(Modules.ProjectDefination, "btnCustCode", Condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            var _Customers = GetCustomersById(id);
        });
    }
    function UpdateItems(Items) {
        debugger;
        Items.ProjectPhaseId = Master.ProjectPhaseId;
        Ajax.Callsync({
            url: Url.Action("UpdateItems", ControllerName),
            data: Items,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    var ProjectItems = Ajax.Call({ url: Url.Action("GetProjectItemFromViwe", ControllerName), data: { id: Items.ProjectPhaseItemId } });
                    DataSourceItem.push(ProjectItems[0]);
                    BindGridItem();
                    //MessageBox.Show(result.ResponseMessage, "Update");
                }
                else {
                    //WorningMessage(result.ResponseMessage, result.ResponseMessage);
                }
            }
        });
    }
    function DeleteItems(e) {
        var Items = e.Item;
        var ProjectItems = Ajax.Call({ url: Url.Action("GetProjectItem", ControllerName), data: { id: Items.ProjectPhaseItemId } });
        var phaseid = ProjectItems[0].ProjectPhaseId;
        ProjectItems[0].ProjectPhaseId = null;
        Ajax.Callsync({
            url: Url.Action("UpdateItems", ControllerName),
            data: ProjectItems[0],
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == false) {
                    WorningMessage(result.ResponseMessage, result.ResponseMessage);
                    ProjectItems[0].ProjectPhaseId = phaseid;
                    BindGridItem();
                    return;
                }
            }
        });
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: function (d) {
                debugger;
                Master = d.result;
                MasterDetailsView.PQ_GetEngProjectPhase = d.result;
                Display();
            }
        });
    }
    function Display() {
        try {
            debugger;
            Projectid = Master.ProjectID;
            Master.StartDate = Master.StartDate != null ? Master.StartDate : null;
            Master.EndDate = Master.EndDate != null ? Master.EndDate : null;
            DocumentActions.RenderFromModel(Master);
            txtprojectDesc.value = _ScreenLanguage = "ar" ? MasterDetailsView.PQ_GetEngProjectPhase.EngProj_DescA : MasterDetailsView.PQ_GetEngProjectPhase.EngProj_DescL;
            $("#txtCust_DescE").val(_ScreenLanguage = "ar" ? MasterDetailsView.PQ_GetEngProjectPhase.Cust_DescA : MasterDetailsView.PQ_GetEngProjectPhase.Cust_DescE);
            LoadDetails(Master.ProjectPhaseId);
            scopeId = Master.ScopeID;
            calenderId = Master.CalenderId;
            siteEngineerId = Master.SiteEngineerId;
            actionControl();
        }
        catch (e) {
        }
        txtStartDate.disabled = true;
        txtEndDate.disabled = true;
    }
    function LoadDetails(id) {
        Ajax.CallAsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: id },
            success: function (d) {
                debugger;
                DataSourceItem = d.PQ_GetEngProjectItem;
                ActivityTemp = d.PQ_GetEngProjectActivity;
                BindGridItem();
                GridActivity.DataSource = ActivityTemp;
                GridActivity.Bind();
            }
        });
    }
    function Update() {
        Assign();
        if (CheckStartEndDate(Master.Status) == false)
            return;
        Master.ScopeID = scopeId;
        Master.CalenderId = calenderId;
        Master.SiteEngineerId = siteEngineerId;
        debugger;
        var session = GetSessionRecord();
        ProjectPjhase.sessionRecord = session;
        ProjectPjhase.P_TR_EngProjectPhase = Master;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_EngProjectPhase", "UpdateMasterDetail"),
            data: JSON.stringify(ProjectPjhase),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var id = result.Response;
                    Master = GetMasterById(id);
                    var msg = ReturnMsg("تم الحفظ برقم ", "Data Saved With NO. ") + Master.ProjectPhaseCode.toString();
                    MessageBox.Show(msg, "Update", function () {
                        var _Index = GetIndexByUseId(result.Response, TableName, FieldKey, " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show("Error Saving", "Update");
            }
        });
        //Ajax.Callsync({
        //    url: Url.Action("Update", ControllerName),
        //    data: { JsonData: JSON.stringify(MasterDetails) },
        //    success: (d) => {
        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            ClientSharedWork.SwitchModes(ScreenModes.Query);
        //            let id = result.ResponseData as number;
        //            Master = GetMasterById(id);
        //            let msg: string = ReturnMsg("تم الحفظ برقم ", "Data Saved With Trans NO. ") + Master.ProjectPhaseCode.toString();
        //            MessageBox.Show(msg, "Update", () => {
        //                let _Index = GetIndexByUseId(result.ResponseData, TableName, FieldKey, " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
        //                NavigateToSearchResultKey(Number(_Index), Navigate)
        //            });
        //        }
        //        else
        //            MessageBox.Show(result.ResponseMessage, "Update");
        //    }
        //});
    }
    function New() {
    }
    function Undo() {
    }
    function Edit() {
        actionControl();
        txtStartDate.disabled = false;
        txtEndDate.disabled = false;
        if ((Master.Status == 0 || Master.Status == 1) && Master.ProjectID != 0) {
            $(".editable").removeAttr("disabled");
            $(".jsgrid-insert-mode-button").removeAttr("disabled");
            $(".jsgrid-edit-button").removeAttr("disabled");
            $(".jsgrid-delete-button").removeAttr("disabled");
            //gridphase
            $(".jsgrid-insert-mode-button").removeAttr("disabled");
            $(".jsgrid-edit-button").removeAttr("disabled");
            $(".jsgrid-delete-button").removeAttr("disabled");
        }
        else {
            $(".editable").attr("disabled", "disabled");
            $(".jsgrid-insert-mode-button").attr("disabled", "disabled");
            $(".jsgrid-edit-button").attr("disabled", "disabled");
            $(".jsgrid-delete-button").attr("disabled", "disabled");
        }
    }
    function Print() {
    }
    function Assign() {
        //AssignMaster
        DocumentActions.AssignToModel(Master);
        MasterDetails.P_TR_EngProjectPhase = Master;
        //AssignDetails
        MasterDetails.P_TR_EngProjectItem = DataSourceItem;
        for (var _i = 0, _a = MasterDetails.P_TR_EngProjectItem; _i < _a.length; _i++) {
            var item = _a[_i];
            if (Master.OfferID == 0) {
                item.ProjectID = Master.ProjectID;
            }
            item.ProjectID = Master.ProjectID;
        }
    }
    function Validation() {
        var _Result = true;
        return _Result;
    }
    function GetMasterById(id) {
        var _Master = Ajax.Call({
            url: Url.Action("GetByID", ControllerName),
            data: { id: id },
        });
        return _Master;
    }
})(ProjectSpecification || (ProjectSpecification = {}));
//# sourceMappingURL=ProjectSpecification.js.map