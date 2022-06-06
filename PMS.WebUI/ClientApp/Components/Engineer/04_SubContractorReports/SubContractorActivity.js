$(document).ready(function () {
    SubContractorActivity.InitalizeComponent();
});
var SubContractorActivity;
(function (SubContractorActivity) {
    var sys = new SystemTools();
    var ControllerName = "SubContractorActivity";
    var FromDate;
    var ToDate;
    var txtsubcontrID;
    var txtsubcontrRP;
    var butsubcontrRP;
    var txtsubcontr1RP;
    var txtprojectID;
    var txtprojectRP;
    var butprojectRP;
    var txtproject1RP;
    var txtphaseRPID;
    var txtphaseRP;
    var butphaseRP;
    var txtphase1RP;
    var txtenginerRPID;
    var txtenginerRP;
    var butenginerRP;
    var txtenginer1RP;
    var txtContactRPID;
    var txtContactRP;
    var butContactRP;
    var txtContact1RP;
    var txtscopeRPID;
    var txtscopeRP;
    var butscopeRP;
    var txtscope1RP;
    var _ScreenLanguage;
    var _CompCode;
    var _BranchCode;
    var Condition;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
    }
    SubContractorActivity.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        ToDate = DocumentActions.GetElementById("ToDate");
        FromDate = DocumentActions.GetElementById("FromDate");
        txtsubcontrID = DocumentActions.GetElementById("txtsubcontrID");
        txtsubcontrRP = DocumentActions.GetElementById("txtsubcontrRP");
        butsubcontrRP = DocumentActions.GetElementById("butsubcontrRP");
        txtsubcontr1RP = DocumentActions.GetElementById("txtsubcontr1RP");
        txtprojectID = DocumentActions.GetElementById("txtprojectID");
        txtprojectRP = DocumentActions.GetElementById("txtprojectRP");
        butprojectRP = DocumentActions.GetElementById("butprojectRP");
        txtproject1RP = DocumentActions.GetElementById("txtproject1RP");
        txtphaseRPID = DocumentActions.GetElementById("txtphaseRPID");
        txtphaseRP = DocumentActions.GetElementById("txtphaseRP");
        butphaseRP = DocumentActions.GetElementById("butphaseRP");
        txtphase1RP = DocumentActions.GetElementById("txtphase1RP");
        txtenginerRPID = DocumentActions.GetElementById("txtenginerRPID");
        txtenginerRP = DocumentActions.GetElementById("txtenginerRP");
        butenginerRP = DocumentActions.GetElementById("butenginerRP");
        txtenginer1RP = DocumentActions.GetElementById("txtenginer1RP");
        txtContactRPID = DocumentActions.GetElementById("txtContactRPID");
        txtContactRP = DocumentActions.GetElementById("txtContactRP");
        butContactRP = DocumentActions.GetElementById("butContactRP");
        txtContact1RP = DocumentActions.GetElementById("txtContact1RP");
        txtscopeRPID = DocumentActions.GetElementById("txtscopeRPID");
        txtscopeRP = DocumentActions.GetElementById("txtscopeRP");
        butscopeRP = DocumentActions.GetElementById("butscopeRP");
        txtscope1RP = DocumentActions.GetElementById("txtscope1RP");
    }
    function Clear() {
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtsubcontrID.value = "";
        txtsubcontrRP.value = "";
        txtsubcontr1RP.value = "";
        txtprojectID.value = "";
        txtprojectRP.value = "";
        txtproject1RP.value = "";
        txtphaseRPID.value = "";
        txtphaseRP.value = "";
        txtphase1RP.value = "";
        txtenginerRPID.value = "";
        txtenginerRP.value = "";
        txtenginer1RP.value = "";
        txtContactRPID.value = "";
        txtContactRP.value = "";
        txtContact1RP.value = "";
        txtscopeRPID.value = "";
        txtscopeRP.value = "";
        txtscope1RP.value = "";
    }
    function Print() {
        debugger;
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        if (Number(txtsubcontrRP.value) == 0) {
            MessageBox.Show("You Must Select subcontr ", "Info");
            return;
        }
        RP.SubID = Number(txtsubcontrID.value);
        RP.ContrNo = Number(txtContactRPID.value);
        RP.Sono = Number();
        RP.ProjectID = Number(txtprojectID.value);
        RP.Phaseid = Number(txtphaseRPID.value);
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        if ($("#RDByShowContracts").prop("checked")) {
            RP.TypeReport = 1;
            Ajax.CallAsync({
                url: Url.Action("rptSlsActivityContract", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        if ($("#RDByProductionEntry").prop("checked")) {
            RP.TypeReport = 2;
            Ajax.CallAsync({
                url: Url.Action("rptSlsActivityContract", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        if ($("#RDByServiceOrder").prop("checked")) {
            RP.TypeReport = 3;
            Ajax.CallAsync({
                url: Url.Action("rptSlsActivityContract", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
    }
    function InitalizeEvents() {
        debugger;
        $("#RDByShowContracts").prop("checked", "checked");
        butsubcontrRP.onclick = butsubcontrRP_Click;
        butprojectRP.onclick = butprojectRP_Click;
        butphaseRP.onclick = butphaseRP_Click;
        butenginerRP.onclick = butenginerRP_Click;
        butContactRP.onclick = butContactRP_Click;
        butscopeRP.onclick = butscopeRP_Click;
    }
    function butsubcontrRP_Click() {
        sys.FindKey(Modules.SubContrActivity, "butsubcontrRP", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSubContractorByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtsubcontrID.value = result.SubContractorID.toString();
                    txtsubcontrRP.value = result.SubContractorCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtsubcontr1RP.value = result.DescA;
                    }
                    else {
                        txtsubcontr1RP.value = result.DescE;
                    }
                }
            });
        });
    }
    function butprojectRP_Click() {
        sys.FindKey(Modules.ServiceOrder, "btnSearchProject", Condition, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchEngProject", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtprojectID.value = result.ProjectID.toString();
                    txtprojectRP.value = result.ProjectCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtproject1RP.value = result.DescA;
                    }
                    else {
                        txtproject1RP.value = result.DescL;
                    }
                }
            });
        });
    }
    function butphaseRP_Click() {
        debugger;
        if (txtprojectID.value == "" || txtprojectID.value == " ") {
            WorningMessage("يجب ادخال رقم المشروع", "Project must be Selected");
        }
        else
            sys.FindKey(Modules.ServiceOrder, "btnSearchProjPhase", " ProjectID =" + txtprojectID.value, function () {
                var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
                Ajax.CallAsync({
                    url: Url.Action("GetSrchEngPhase", ControllerName),
                    data: { id: _Id },
                    success: function (d) {
                        var result = d.result;
                        txtphaseRPID.value = result.ProjectPhaseId.toString();
                        txtphaseRP.value = result.ProjectPhaseCode.toString();
                        if (_ScreenLanguage == "ar") {
                            txtphase1RP.value = result.DescA;
                        }
                        else {
                            txtphase1RP.value = result.DescL;
                        }
                    }
                });
            });
    }
    function butenginerRP_Click() {
        sys.FindKey(Modules.ServiceOrder, "btnSearchEngProject", Condition, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSiteEngineer", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtenginerRPID.value = result.SiteEngineerId.toString();
                    txtenginerRP.value = result.EngCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtenginer1RP.value = result.DescA.toString();
                    }
                    else {
                        txtenginer1RP.value = result.DescE.toString();
                    }
                }
            });
        });
    }
    function butContactRP_Click() {
        sys.FindKey(Modules.SubContract, "butTrNo", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEngSubContract", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtContactRP.value = result.TrNo.toString();
                    txtContactRPID.value = result.TrNo.toString();
                    if (_ScreenLanguage == "ar") {
                        txtContact1RP.value = result.DescA.toString();
                    }
                    else {
                        txtContact1RP.value = result.DescE.toString();
                    }
                }
            });
        });
    }
    function butscopeRP_Click() {
        sys.FindKey(Modules.SubContract, "butScope_Code", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEngSubContractorScope", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtscopeRP.value = result.ScopeCode.toString();
                    txtscopeRPID.value = result.ScopeId.toString();
                    if (_ScreenLanguage == "ar") {
                        txtscope1RP.value = result.DescA.toString();
                    }
                    else {
                        txtscope1RP.value = result.DescE.toString();
                    }
                }
            });
        });
    }
})(SubContractorActivity || (SubContractorActivity = {}));
//# sourceMappingURL=SubContractorActivity.js.map