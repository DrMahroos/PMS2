$(document).ready(function () {
    MonthBudgetForBranch.InitalizeComponent();
});
var MonthBudgetForBranch;
(function (MonthBudgetForBranch) {
    var sys = new SystemTools();
    var ControllerName = "MonthBudgetForBranch";
    var txtBraID;
    var txtBraRP;
    var btnBraRP;
    var txtBra1RP;
    var txtYearID;
    var txtMonthID;
    var _ScreenLanguage;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
        txtYearID.value = SharedSession.CurrentEnvironment.CurrentYear;
        txtBraRP.value = SharedSession.CurrentEnvironment.BranchCode;
        getbranchname();
    }
    MonthBudgetForBranch.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtBraID = DocumentActions.GetElementById("txtBraID");
        txtBraRP = DocumentActions.GetElementById("txtBraRP");
        btnBraRP = DocumentActions.GetElementById("btnBraRP");
        txtBra1RP = DocumentActions.GetElementById("txtBra1RP");
        //txtProjectID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectID");
        txtYearID = DocumentActions.GetElementById("txtYearID");
        //btnProjectRP = DocumentActions.GetElementById<HTMLButtonElement>("btnProjectRP");
        //txtProject1RP = DocumentActions.GetElementById<HTMLInputElement>("txtProject1RP");
        //txtPhaseID = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseID");
        txtMonthID = DocumentActions.GetElementById("txtMonthID");
        //btnPhaseRP = DocumentActions.GetElementById<HTMLButtonElement>("btnPhaseRP");
        //txtPhase1RP = DocumentActions.GetElementById<HTMLInputElement>("txtPhase1RP");
    }
    function Clear() {
        txtBraID.value = "";
        txtBraRP.value = "";
        txtBra1RP.value = "";
        txtYearID.value = "";
        txtMonthID.value = "";
    }
    function Print() {
        debugger;
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = Number(txtBraRP.value).toString();
        RP.yearID = Number(txtYearID.value);
        RP.Monid = (txtMonthID.value);
        Ajax.CallAsync({
            url: Url.Action("rptEng_MonthBudgetForBranch", "GeneralReports"),
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
        btnBraRP.onclick = btnEngRP_Click;
    }
    function btnEngRP_Click() {
        sys.FindKey(Modules.SubCandidate, "butBraCode", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetBranchByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtBraID.value = result.BRA_CODE.toString();
                    txtBraRP.value = result.BRA_CODE.toString();
                    if (_ScreenLanguage == "ar") {
                        txtBra1RP.value = result.BRA_DESCL;
                    }
                    else {
                        txtBra1RP.value = result.BRA_DESCE;
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
                txtBraID.value = result.BRA_CODE.toString();
                txtBraRP.value = result.BRA_CODE.toString();
                if (_ScreenLanguage == "ar") {
                    txtBra1RP.value = result.BRA_DESCL;
                }
                else {
                    txtBra1RP.value = result.BRA_DESCE;
                }
            }
        });
    }
})(MonthBudgetForBranch || (MonthBudgetForBranch = {}));
//# sourceMappingURL=MonthBudgetForBranch.js.map