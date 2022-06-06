$(document).ready(function () {
    BudgetRequirements.InitalizeComponent();
});
var BudgetRequirements;
(function (BudgetRequirements) {
    var sys = new SystemTools();
    var ControllerName = "BudgetRequirements";
    var FromDate;
    var ToDate;
    var txtBranchID;
    var txtBranchRP;
    var btnBranchRP;
    var txtBranch1RP;
    var txtProjectID;
    var txtYearID;
    var btnProjectRP;
    var txtProject1RP;
    var txtPhaseID;
    var txtMonthID;
    var btnPhaseRP;
    var txtPhase1RP;
    var IsLabor = 0;
    var IsEquip = 0;
    var IsMat = 0;
    var _ScreenLanguage;
    var Phase_Status;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
        txtYearID.value = SharedSession.CurrentEnvironment.CurrentYear;
        txtBranchRP.value = SharedSession.CurrentEnvironment.BranchCode;
        getbranchname();
    }
    BudgetRequirements.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtBranchID = DocumentActions.GetElementById("txtBranchID");
        txtBranchRP = DocumentActions.GetElementById("txtBranchRP");
        btnBranchRP = DocumentActions.GetElementById("btnBranchRP");
        txtBranch1RP = DocumentActions.GetElementById("txtBranch1RP");
        txtProjectID = DocumentActions.GetElementById("txtProjectID");
        txtYearID = DocumentActions.GetElementById("txtYearID");
        btnProjectRP = DocumentActions.GetElementById("btnProjectRP");
        txtProject1RP = DocumentActions.GetElementById("txtProject1RP");
        txtPhaseID = DocumentActions.GetElementById("txtPhaseID");
        txtMonthID = DocumentActions.GetElementById("txtMonthID");
        btnPhaseRP = DocumentActions.GetElementById("btnPhaseRP");
        txtPhase1RP = DocumentActions.GetElementById("txtPhase1RP");
    }
    function Clear() {
        //FromDate.value = DateFormat(new Date().toString());
        //ToDate.value = DateFormat(new Date().toString());
        txtBranchID.value = "";
        txtBranchRP.value = "";
        txtBranch1RP.value = "";
        txtYearID.value = "";
        txtMonthID.value = "";
        IsLabor = 0;
        IsEquip = 0;
        IsMat = 0;
        $("#IsLaborID").prop("checked", "");
        $("#IsEquipID").prop("checked", "");
        $("#IsMatID").prop("checked", "");
    }
    function Print() {
        debugger;
        var RP = new ReportParameters();
        if ($("#IsLaborID").prop("checked")) {
            IsLabor = 1;
        }
        else {
            IsLabor = 0;
        }
        if ($("#IsEquipID").prop("checked")) {
            IsEquip = 1;
        }
        else {
            IsEquip = 0;
        }
        if ($("#IsMatID").prop("checked")) {
            IsMat = 1;
        }
        else {
            IsMat = 0;
        }
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = txtBranchID.value;
        RP.yearID = Number(txtYearID.value);
        RP.Monid = (txtMonthID.value);
        RP.IsLabor = IsLabor;
        RP.IsEquip = IsEquip;
        RP.IsMat = IsMat;
        Ajax.CallAsync({
            url: Url.Action("rptEng_BudgetRequirements", "GeneralReports"),
            data: RP,
            success: function (d) {
                debugger;
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
    function InitalizeEvents() {
        debugger;
        $("#Rrd_phase").prop("checked", "checked");
        btnBranchRP.onclick = btnBranchRP_Click;
    }
    function btnBranchRP_Click() {
        sys.FindKey(Modules.SubCandidate, "butBraCode", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetBranchByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtBranchID.value = result.BRA_CODE.toString();
                    txtBranchRP.value = result.BRA_CODE.toString();
                    if (_ScreenLanguage == "ar") {
                        txtBranch1RP.value = result.BRA_DESCL;
                    }
                    else {
                        txtBranch1RP.value = result.BRA_DESCE;
                    }
                }
            });
        });
    }
    function getbranchname() {
        var _Id = SharedSession.CurrentEnvironment.BranchCode;
        Ajax.CallAsync({
            url: Url.Action("GetBranchByID", ControllerName),
            data: { id: _Id },
            success: function (d) {
                var result = d.result;
                txtBranchID.value = result.BRA_CODE.toString();
                txtBranchRP.value = result.BRA_CODE.toString();
                txtBranch1RP.value = _ScreenLanguage == "ar" ? result.BRA_DESCL : txtBranch1RP.value = result.BRA_DESCE;
            }
        });
    }
})(BudgetRequirements || (BudgetRequirements = {}));
//# sourceMappingURL=BudgetRequirements.js.map