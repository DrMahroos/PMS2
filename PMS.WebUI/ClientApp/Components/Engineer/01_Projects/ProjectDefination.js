$(document).ready(function () {
    ProjectDefination.InitalizeComponent();
});
var ProjectDefination;
(function (ProjectDefination) {
    var ControllerName = "ProjectDefination";
    var TableName = "PQ_GetEngProject";
    var FieldKey = "ProjectID";
    var JsGridcombobox = "combobox";
    var Master = new PQ_GetEngProject();
    var MasterDetails = new M_D_EngDefDetails();
    var MasterDetailsView = new M_D_EngDefDetailsView();
    var DataSourcePhase = new Array();
    var DataSourceItem = new Array();
    var _ScreenLanguage;
    var _CompCode;
    var _BranchCode;
    var _SiteEngineer = new Array();
    var _Scope = new Array();
    var _Calender = new Array();
    var ProjPosted;
    var GridPhase = new JsGrid();
    var GridItem = new JsGrid();
    var sys = new SystemTools();
    var txtProjectCode;
    var txtOfferTrNo;
    var txtDescA;
    var txtOfferTrSerial;
    var txtDescL;
    var txtContractRefNo;
    var txtcust_CustomerCode;
    var txtcust_DescA;
    var txtCustomerAccCode;
    var txtCustomerMobile;
    var txtTotalAllow;
    var txtCustomerContact;
    var txtCustomerTel;
    var txtEng_Code;
    var txtEng_DescA;
    var SelectStatus;
    var txtProjArea;
    var txtLoc_DescA;
    var txtProjectTermsCond;
    var txtProjTechnicalSpecs;
    var txtNationalityID;
    var txtContractPrice;
    var txtContractCode;
    var txtDownPaymentPrc;
    var txtDownPaymentAmount;
    var txtContractDate;
    var txtWarrntyPaymentPrc;
    var txtWarrntyPaymentAmount;
    var txtContractPeriod;
    var txtContractDiscountPrc;
    var txtContractAdditions;
    var txtProjectNet;
    var btnProjectCode;
    var btnStartWork;
    var btnSuspend;
    var btnStopped;
    var btnFinished;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        AjaxApi.CallsyncApi({
            type: "GET",
            url: sys.apiUrl("P_TR_EngProject", "GetSiteEngineer"),
            data: { comCode: Number(_CompCode), BraCode: Number(_BranchCode) },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    var res = result.Response;
                    _SiteEngineer = result.Response.P_D_SiteEngineer;
                    _Scope = result.Response.P_D_Scope;
                    _Calender = result.Response.P_D_Calender;
                }
            }
        });
        //_SiteEngineer = Ajax.Call<Array<P_D_SiteEngineer>>({ url: Url.Action("GetSiteEngineer", ControllerName) });
        //_Scope = Ajax.Call<Array<P_D_Scope>>({ url: Url.Action("GetScop", ControllerName) });
        //_Calender = Ajax.Call<Array<P_D_Calender>>({ url: Url.Action("GetCalender", ControllerName) });
        InitalizeControls();
        InitalizeEvents();
        InitalizeGrid();
        actionControl();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(New);
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                return;
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.UndoAction(Undo);
        ControlsButtons.DeleteAction(Delete);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.PrintAction(Print);
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.ProjectDefination, Master.ProjectID.toString());
        });
    }
    ProjectDefination.InitalizeComponent = InitalizeComponent;
    function InsertPhase(e) {
        debugger;
        var Phase = e.Item;
        Phase.Status = 0;
        Phase.CC_CODE = Master.ProjectCode + "-" + Phase.ProjectPhaseCode;
        Phase.Status_DescE = 'New';
        Phase.ISPosted = false;
        Phase.IsMaintenanceWork = false;
        Phase.IsBonusIncluded = true;
        Phase.ToBeInvoiced = true;
        Phase.ProjectID = Master.ProjectID;
        if (Phase.ProjectPhaseCode.length != 2) {
            WorningMessage("رقم المرحلة يجب ان يكون رقمين ", "Code must be two digits");
            Phase = null;
            return;
        }
        for (var _i = 0, DataSourcePhase_1 = DataSourcePhase; _i < DataSourcePhase_1.length; _i++) {
            var ph = DataSourcePhase_1[_i];
            if (ph.ProjectPhaseCode.toLowerCase() == Phase.ProjectPhaseCode.toLowerCase()) {
                WorningMessage("لا يمكن تكرار الكود", "Code cannot Repeated For the same Project");
                e.Item = null;
                Phase = null;
                return;
            }
        }
        DataSourcePhase.push(Phase);
        GridPhase.DataSource = DataSourcePhase;
        GridPhase.Bind();
        //$("#GridPhase .jsgrid-table .jsgrid-insert-row td input").eq(3).attr('type', 'date');
        //$("#GridPhase .jsgrid-table .jsgrid-insert-row td input").eq(4).attr('type', 'date');
        debugger;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_EngProject", "UpdatePhase"),
            data: JSON.stringify(Phase),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: function (d) {
                var result = d;
                LoadDetails(Master.ProjectID);
            }
        });
    }
    function UpdatePhase(e) {
        debugger;
        var Phase = e.Item;
        Phase.Status = Master.Status;
        Phase.OfferID = Master.OfferID;
        Phase.OfferTrNo = Master.OfferTrNo;
        Phase.OfferTrSerial = Master.OfferTrSerial;
        debugger;
        AjaxApi.CallAsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_EngProject", "UpdatePhase"),
            data: JSON.stringify(Phase),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                }
            }
        });
    }
    function DeletePhase(e) {
        var Phase = e.Item;
        for (var _i = 0, DataSourceItem_1 = DataSourceItem; _i < DataSourceItem_1.length; _i++) {
            var itm = DataSourceItem_1[_i];
            if (itm.ProjectPhaseId == Phase.ProjectPhaseId) {
                WorningMessage("هذة الحالة مرتبطة ببعض العناصر الاخرى ولا يمكن حذفها", "The Phase " + Phase.ProjectPhaseCode + " is related to other items, cannot delet it");
                LoadPhases(Master.ProjectID);
                return;
            }
        }
        debugger;
        AjaxApi.CallAsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_EngProject", "DeletePhase"),
            data: JSON.stringify(Phase),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    GridPhase.DataSource = DataSourcePhase;
                    LoadPhases(Master.ProjectID);
                }
            }
        });
        //Ajax.CallAsync({
        //    url: Url.Action("DeletePhase", ControllerName),
        //    data: Phase,
        //    success: (d) => {
        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            MessageBox.Show("Data Deleted", "Delete");
        //        }
        //        else {
        //            MessageBox.Show("the  " + Phase.ProjectPhaseId + "use as FK in another Table", "Can't Delete");
        //            GridPhase.DataSource = DataSourcePhase;
        //            LoadPhases(Master.ProjectID);
        //        }
        //    }
        //});
    }
    function InitalizeGrid() {
        var res = GetResourceList("ProjDef_");
        GridPhase.ElementName = "GridPhase";
        GridPhase.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridPhase.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridPhase.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridPhase.InsertionMode = JsGridInsertionMode.Binding;
        GridPhase.OnItemInserting = InsertPhase;
        GridPhase.OnItemUpdating = UpdatePhase;
        GridPhase.OnItemDeleting = DeletePhase;
        GridPhase.Columns = [
            { title: res.ProjDef_PhaseNo, validate: "required", name: "ProjectPhaseCode", type: "text", width: "4%" },
            { title: res.ProjDef_PhaseDescriptionA, validate: "required", name: "DescA", type: "text", width: "14%" },
            { title: res.ProjDef_PhaseDescriptionB, validate: "required", name: "DescL", type: "text", width: "14%" },
            { title: res.ProjDef_Enginer, validate: "required", name: "SiteEngineerId", type: "select", items: _SiteEngineer, valueField: "SiteEngineerId", textField: "DescE", width: "10%" },
            { title: res.ProjDef_Scope, validate: "required", name: "ScopeID", type: "select", items: _Scope, valueField: "ScopeID", textField: "DescE", width: "10%" },
            { title: res.ProjDef_Caleander, validate: "required", name: "CalenderId", type: "select", items: _Calender, valueField: "CalenderID", textField: "DescA", width: "10%" },
            //{ title: res.ProjDef_StartDate, name: "StartDate", type: "label", width: "7%" },
            //{ title: res.ProjDef_EndDate, name: "EndDate", type: "label", width: "7%" },
            { title: res.ProjDef_Status, name: "Status_DescE", type: "lable", width: "5%" },
            { type: "control", width: "3%" }
        ];
        BindGridPhase();
        GridItem.ElementName = "GridItem";
        GridItem.Columns = [
            { title: res.ProjDef_Itemser, validate: "required", name: "LineCode", type: "text", width: "7%" },
            { title: res.ProjDef_ItemNo, validate: "required", name: "SlsITm_ItemCode", type: "text", width: "7%" },
            { title: res.ProjDef_PhaseNo, validate: "required", name: "Phase_PhaseCode", type: "text", width: "7%" },
            { title: res.ProjDef_ItemName, name: "SlsITm_DescE", type: "text", width: "40%", visible: _ScreenLanguage == "en" },
            { title: res.ProjDef_ItemName, name: "SlsITm_DescA", type: "text", width: "40%", visible: _ScreenLanguage == "ar" },
            { title: res.ProjDef_ContrQty, name: "ContrQty", type: "number", width: "7%" },
            { title: res.ProjDef_ItemQty, name: "ItemQty", type: "number", width: "7%" },
            { title: res.ProjDef_ProdQty, name: "ProdQty", type: "text", width: "7.%" },
            { title: res.ProjDef_BilledQty, name: "BilledQty", type: "text", width: "7%" },
            { title: res.ProjDef_UntilPrice, name: "UnitPrice", type: "text", width: "7%" },
            //{ title: res.ProjDef_ScopeName, name: "Scp_DescE", type: "text", width: "9%" },
            //{ title: res.ProjDef_Remark, name: "Remarks", type: "text", width: "7%" },
        ];
        GridItem.DataSource = DataSourceItem;
        GridItem.Bind();
    }
    function BindGridPhase() {
        GridPhase.DataSource = DataSourcePhase;
        GridPhase.Bind();
        $(".jsgrid-insert-mode-button").attr("disabled", "disabled");
        $(".jsgrid-edit-button").attr("disabled", "disabled");
        //$(".jsgrid-delete-button").attr("disabled", "disabled")
        if (Master.Status == 0) {
            $("#GridPhase .jsgrid-table .jsgrid-insert-row td input").eq(3).attr('disabled', 'disabled');
            $("#GridPhase .jsgrid-table .jsgrid-insert-row td input").eq(4).attr('disabled', 'disabled');
        }
        else {
            $("#GridPhase .jsgrid-table .jsgrid-insert-row td input").eq(3).attr('type', 'date');
            $("#GridPhase .jsgrid-table .jsgrid-insert-row td input").eq(4).attr('type', 'date');
        }
    }
    function InitalizeControls() {
        txtProjectCode = document.getElementById("txtProjectCode");
        txtOfferTrNo = document.getElementById("txtOfferTrNo");
        txtDescA = document.getElementById("txtDescA");
        txtOfferTrSerial = document.getElementById("txtOfferTrSerial");
        txtDescL = document.getElementById("txtDescL");
        txtContractRefNo = document.getElementById("txtContractRefNo");
        txtcust_CustomerCode = document.getElementById("txtcust_CustomerCode");
        txtcust_DescA = document.getElementById("txtcust_DescA");
        txtCustomerAccCode = document.getElementById("txtCustomerAccCode");
        txtCustomerMobile = document.getElementById("txtCustomerMobile");
        txtTotalAllow = document.getElementById("txtTotalAllow");
        txtCustomerContact = document.getElementById("txtCustomerContact");
        txtCustomerTel = document.getElementById("txtCustomerTel");
        txtEng_Code = document.getElementById("txtEng_Code");
        txtEng_DescA = document.getElementById("txtEng_DescA");
        SelectStatus = document.getElementById("SelectStatus");
        txtProjArea = document.getElementById("txtProjArea");
        txtLoc_DescA = document.getElementById("txtLoc_DescA");
        txtProjectTermsCond = document.getElementById("txtProjectTermsCond");
        txtProjTechnicalSpecs = document.getElementById("txtProjTechnicalSpecs");
        txtNationalityID = document.getElementById("txtNationalityID");
        txtContractPrice = document.getElementById("txtContractPrice");
        txtContractCode = document.getElementById("txtContractCode");
        txtDownPaymentPrc = document.getElementById("txtDownPaymentPrc");
        txtDownPaymentAmount = document.getElementById("txtDownPaymentAmount");
        txtContractDate = document.getElementById("txtContractDate");
        txtWarrntyPaymentPrc = document.getElementById("txtWarrntyPaymentPrc");
        txtWarrntyPaymentAmount = document.getElementById("txtWarrntyPaymentAmount");
        txtContractPeriod = document.getElementById("txtContractPeriod");
        txtContractDiscountPrc = document.getElementById("txtContractDiscountPrc");
        txtContractAdditions = document.getElementById("txtContractAdditions");
        txtProjectNet = document.getElementById("txtProjectNet");
        btnProjectCode = document.getElementById("btnProjectCode");
        btnStartWork = document.getElementById("btnStartWork");
        btnSuspend = document.getElementById("btnSuspend");
        btnStopped = document.getElementById("btnStopped");
        btnFinished = document.getElementById("btnFinished");
    }
    function InitalizeEvents() {
        txtProjectCode.onchange = ProjectCode_onChange;
        btnProjectCode.onclick = btnProjectCode_onclick;
        btnStartWork.onclick = btnStartWork_onclick;
        btnSuspend.onclick = btnSuspend_onclick;
        btnStopped.onclick = btnStopped_onclick;
        btnFinished.onclick = btnFinished_onclick;
        txtContractDiscountPrc.onchange = DiscountChange;
    }
    function btnStartWork_onclick() {
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
        $("#SelectStatus").val("5");
        actionControl();
    }
    function actionControl() {
        //debugger;
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
    function DiscountChange() {
        txtContractDiscountPrc.value = Number(txtContractDiscountPrc.value).toFixed(2);
        txtProjectNet.value = ((100 - Number(txtContractDiscountPrc.value)) * (Number(txtContractPrice.value) + Number(txtContractAdditions.value)) / 100).toFixed(2);
        Master.ContractDiscountAmount = Number(txtContractDiscountPrc.value) * (Number(txtContractPrice.value) + Number(txtContractAdditions.value)) / 100;
    }
    //eslam
    function ProjectCode_onChange() {
        debugger;
        var Pno = Number(txtProjectCode.value);
        Ajax.Callsync({
            url: Url.Action("getProjectViewByno", 'FindByNo'),
            data: { Pno: Pno },
            success: function (d) {
                debugger;
                if (IsNullOrEmpty(d.result)) {
                    txtProjectCode.value = "";
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                var Project = d.result;
                var Index = GetIndexByUseId(Number(Project[0].ProjectID), TableName, FieldKey, "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                NavigateToSearchResultKey(Number(Index), Navigate);
            }
        });
    }
    function btnProjectCode_onclick() {
        debugger;
        var Condition = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.ProjectDefination, "btnProjectCode", Condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger;
            var Index = GetIndexByUseId(Number(id), TableName, FieldKey, " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
            NavigateToSearchResultKey(Number(Index), Navigate);
        });
    }
    function btnCustCode_onclick() {
        var Condition = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode + "  and IsActive = 1 ";
        sys.FindKey(Modules.ProjectDefination, "btnCustCode", Condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            var _Customers = GetCustomersById(id);
            txtcust_CustomerCode.value = id;
            txtcust_DescA.value = _ScreenLanguage = "ar" ? _Customers.DescA : _Customers.DescE;
        });
    }
    function Navigate() {
        //debugger;
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: function (d) {
                debugger;
                Master = d.result;
                Display();
            }
        });
    }
    function Update() {
        debugger;
        Assign();
        Ajax.Callsync({
            url: Url.Action("Update", ControllerName),
            data: { JsonData: JSON.stringify(MasterDetails) },
            success: function (d) {
                debugger;
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var id = result.ResponseData;
                    //Master = GetMasterById(id);
                    debugger;
                    var msg = ReturnMsg("تم الحفظ برقم ", "Data Saved With Trans NO. ") + Master.ProjectCode.toString();
                    MessageBox.Show(msg, "Update", function () {
                        Display();
                        var _Index = GetIndexByUseId(result.ResponseData, TableName, FieldKey, " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Update");
            }
        });
    }
    function New() {
    }
    function Undo() {
    }
    function Delete() {
        debugger;
        AjaxApi.CallAsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_EngProject", "Delete"),
            data: JSON.stringify(Master.ProjectID),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess) {
                    MessageBox.Show("تم حذف المشروع", "Projectis delete");
                    debugger;
                    //currents.   CurrentEnvironment.ModelCount = SharedSession.CurrentEnvironment.ModelCount-1;
                    var _Index = ClientSharedWork.PageIndex - 1;
                    NavigateToSearchResultKey(Number(_Index), Navigate);
                }
                else
                    MessageBox.Show("تعذر حذف المشروع", "Unable to delete project ");
            }
        });
    }
    function Edit() {
        debugger;
        actionControl();
        if ((Master.Status == 0 || Master.Status == 1) && Master.ProjectID != 0) {
            $(".editable").removeAttr("disabled");
            $(".jsgrid-insert-mode-button").removeAttr("disabled");
            $(".jsgrid-edit-button").removeAttr("disabled");
            $(".jsgrid-delete-button").removeAttr("disabled");
            //gridphase
            $(".jsgrid-edit-button").removeAttr("disabled");
            $(".jsgrid-delete-button").removeAttr("disabled");
            $(".jsgrid-insert-button").removeAttr("disabled");
        }
        else {
            $(".editable").attr("disabled", "disabled");
            // Enable start and end date 
            $("#txtStartDate").removeAttr("disabled");
            $("#txtEndDate").removeAttr("disabled");
            $(".jsgrid-insert-mode-button").attr("disabled", "disabled");
            $(".jsgrid-edit-button").attr("disabled", "disabled");
            $(".jsgrid-delete-button").attr("disabled", "disabled");
            //ClientSharedWork.SwitchModes(ScreenModes.Query);
        }
    }
    function Print() {
    }
    function Display() {
        //debugger;
        DocumentActions.RenderFromModel(Master);
        txtContractDate.value = DateFormat(Master.ContractDate);
        LoadDetails(Master.ProjectID);
        ProjPosted = Master.ISPosted;
        txtContractPrice.value = Master.ContractPrice.toString();
        txtContractAdditions.value = Master.ContractAdditions.toString();
        txtContractDiscountPrc.value = Master.ContractDiscountPrc.toString();
        var totalNet = (Number(txtContractPrice.value) + Number(txtContractAdditions.value)) * (100 - Number(txtContractDiscountPrc.value)) / 100;
        txtProjectNet.value = totalNet.toFixed(2);
        actionControl();
    }
    function LoadDetails(id) {
        AjaxApi.CallAsyncApi({
            type: "GET",
            url: sys.apiUrl("P_TR_EngProject", "LoadDetails"),
            data: { id: id },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    DataSourcePhase = result.Response.PQ_GetEngProjectPhase;
                    DataSourceItem = result.Response.PQ_GetEngProjectItem;
                    for (var _i = 0, DataSourcePhase_2 = DataSourcePhase; _i < DataSourcePhase_2.length; _i++) {
                        var item = DataSourcePhase_2[_i];
                        item.StartDate = item.StartDate != null ? DateFormat(item.StartDate) : null;
                        item.EndDate = item.EndDate != null ? DateFormat(item.EndDate) : null;
                    }
                    BindGridPhase();
                    GridItem.DataSource = DataSourceItem;
                    GridItem.Bind();
                }
            }
        });
    }
    function LoadPhases(id) {
        AjaxApi.CallAsyncApi({
            type: "GET",
            url: sys.apiUrl("P_TR_EngProject", "LoadPhases"),
            data: { id: id },
            success: function (d) {
                var result = d;
                if (result.IsSuccess) {
                    DataSourcePhase = result.Response.PQ_GetEngProjectPhase;
                    for (var _i = 0, DataSourcePhase_3 = DataSourcePhase; _i < DataSourcePhase_3.length; _i++) {
                        var item = DataSourcePhase_3[_i];
                        item.StartDate = DateFormat(item.StartDate);
                        item.EndDate = DateFormat(item.EndDate);
                    }
                    GridPhase.DataSource = DataSourcePhase;
                    GridPhase.Bind();
                }
            }
        });
    }
    function Assign() {
        debugger;
        DocumentActions.AssignToModel(Master);
        MasterDetails.P_TR_EngProject = Master;
        //MasterDetails.P_TR_EngProjectPhase = DataSourcePhase as Array<P_TR_EngProjectPhase>;
        //for (var item of MasterDetails.P_TR_EngProjectPhase) {
        //    if (Master.OfferID == 0) {
        //        item.OfferID = Master.OfferID;
        //        item.OfferTrNo = Master.OfferTrNo;
        //        item.OfferTrSerial = Master.OfferTrSerial;
        //    }
        //    item.IsMaintenanceWork = false;
        //    item.IsBonusIncluded = true;
        //    item.ToBeInvoiced = true;
        //    item.ProjectID = Master.ProjectID;
        //}
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
    function Clear() {
    }
})(ProjectDefination || (ProjectDefination = {}));
//# sourceMappingURL=ProjectDefination.js.map