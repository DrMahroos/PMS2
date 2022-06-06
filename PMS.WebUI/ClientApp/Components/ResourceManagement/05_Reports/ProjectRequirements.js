$(document).ready(function () {
    ProjectRequirements.InitalizeComponent();
});
var ProjectRequirements;
(function (ProjectRequirements) {
    var sys = new SystemTools();
    var ControllerName = "ProjectRequirements";
    var FromDate;
    var ToDate;
    var txtBranchID;
    var txtBranchRP;
    var btnBranchRP;
    var txtBranch1RP;
    var txtProjectID;
    var txtProjectRP;
    var btnProjectRP;
    var txtProject1RP;
    var txtPhaseID;
    var txtPhaseRP;
    var btnPhaseRP;
    var txtPhase1RP;
    var _ScreenLanguage;
    var Phase_Status;
    var Condition;
    var _CompCode;
    var _BranchCode;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
        debugger;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
    }
    ProjectRequirements.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //txtBranchID = DocumentActions.GetElementById<HTMLInputElement>("txtBranchID");
        //txtBranchRP = DocumentActions.GetElementById<HTMLInputElement>("txtBranchRP");
        //btnBranchRP = DocumentActions.GetElementById<HTMLButtonElement>("btnBranchRP");
        //txtBranch1RP = DocumentActions.GetElementById<HTMLInputElement>("txtBranch1RP");
        txtProjectID = DocumentActions.GetElementById("txtProjectID");
        txtProjectRP = DocumentActions.GetElementById("txtProjectRP");
        btnProjectRP = DocumentActions.GetElementById("btnProjectRP");
        txtProject1RP = DocumentActions.GetElementById("txtProject1RP");
        txtPhaseID = DocumentActions.GetElementById("txtPhaseID");
        txtPhaseRP = DocumentActions.GetElementById("txtPhaseRP");
        btnPhaseRP = DocumentActions.GetElementById("btnPhaseRP");
        txtPhase1RP = DocumentActions.GetElementById("txtPhase1RP");
    }
    function Clear() {
        debugger;
        //FromDate.value = DateFormat(new Date().toString());
        //ToDate.value = DateFormat(new Date().toString());
        txtBranchID.value = "";
        txtBranchRP.value = "";
        txtBranch1RP.value = "";
        txtProjectID.value = "";
        txtProjectRP.value = "";
        txtProject1RP.value = "";
        txtPhaseID.value = "";
        txtPhaseRP.value = "";
        txtPhase1RP.value = "";
    }
    function Print() {
        debugger;
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.ProjectID = Number(txtProjectID.value);
        RP.Phaseid = Number(txtPhaseID.value);
        if ($("#Rrd_phase").prop("checked")) {
            RP.TypeReport = 1;
            Ajax.CallAsync({
                url: Url.Action("rptRes_ProjectRequirements", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        if ($("#Rrd_yitem").prop("checked")) {
            RP.TypeReport = 2;
            Ajax.CallAsync({
                url: Url.Action("rptRes_ProjectRequirements", "GeneralReports"),
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
        $("#Rrd_phase").prop("checked", "checked");
        //btnBranchRP.onclick = btnBranchRP_Click;
        btnProjectRP.onclick = btnProjectRP_Click;
        btnPhaseRP.onclick = btnPhaseRP_Click;
        //btnCustomerClassRP.onclick = btnCustomerClassRP_Click;
        //btnCustomerRP.onclick = btnCustomerRP_Click;
        //btnAreaRP.onclick = btnAreaRP_Click;
        //btnScopeClassRP.onclick = btnScopeClassRP_Click;
        //btnScopeRP.onclick = btnScopeRP_Click;
    }
    function btnProjectRP_Click() {
        debugger;
        sys.FindKey(Modules.EquipmentMonitoring, "btnSearchProject", Condition, function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProjectEng", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtProjectID.value = result.ProjectID.toString();
                    txtProjectRP.value = result.ProjectCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtProject1RP.value = result.DescA;
                    }
                    else {
                        txtProject1RP.value = result.DescL;
                    }
                }
            });
        });
    }
    function btnPhaseRP_Click() {
        debugger;
        sys.FindKey(Modules.EquipmentMonitoring, "btnSearchPhase", " ProjectID = " + txtProjectID.value, function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchPhase", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtPhaseID.value = result.ProjectPhaseId.toString();
                    txtPhaseRP.value = result.ProjectPhaseCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtPhase1RP.value = result.DescA;
                    }
                    else {
                        txtPhase1RP.value = result.DescL;
                    }
                }
            });
        });
    }
})(ProjectRequirements || (ProjectRequirements = {}));
//# sourceMappingURL=ProjectRequirements.js.map