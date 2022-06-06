$(document).ready(function () {
    MonthBudgetByEng.InitalizeComponent();
});
var MonthBudgetByEng;
(function (MonthBudgetByEng) {
    var sys = new SystemTools();
    var ControllerName = "MonthBudgetByEng";
    var txtEngID;
    var txtEngRP;
    var btnEngRP;
    var txtEng1RP;
    var txtYearID;
    var txtMonthID;
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
        txtEngRP.value = SharedSession.CurrentEnvironment.BranchCode;
        getprojengname();
    }
    MonthBudgetByEng.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtEngID = DocumentActions.GetElementById("txtEngID");
        txtEngRP = DocumentActions.GetElementById("txtEngRP");
        btnEngRP = DocumentActions.GetElementById("btnEngRP");
        txtEng1RP = DocumentActions.GetElementById("txtEng1RP");
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
        //FromDate.value = DateFormat(new Date().toString());
        //ToDate.value = DateFormat(new Date().toString());
        txtEngID.value = "";
        txtEngRP.value = "";
        txtEng1RP.value = "";
        txtYearID.value = "";
        txtMonthID.value = "";
    }
    function Print() {
        debugger;
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = Number(txtEngRP.value).toString();
        RP.yearID = Number(txtYearID.value);
        RP.Monid = (txtMonthID.value);
        RP.EngID = Number(txtEngID.value);
        Ajax.CallAsync({
            url: Url.Action("rptEng_MonthBudgetByEng", "GeneralReports"),
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
        //$("#Rrd_phase").prop("checked", "checked");
        btnEngRP.onclick = btnEngRP_Click;
    }
    function btnEngRP_Click() {
        sys.FindKey(Modules.MonthBudgetByEng, "btnEng", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProjectEng", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtEngID.value = result.SiteEngineerId.toString();
                    txtEngRP.value = result.EngCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtEng1RP.value = result.DescA;
                    }
                    else {
                        txtEng1RP.value = result.DescE;
                    }
                }
            });
        });
    }
    function getprojengname() {
        var _Id = SharedSession.CurrentEnvironment.BranchCode;
        Ajax.CallAsync({
            url: Url.Action("GetSrchProjectEng", ControllerName),
            data: { id: _Id },
            success: function (d) {
                var result = d.result;
                txtEngID.value = result.SiteEngineerId.toString();
                txtEngRP.value = result.EngCode.toString();
                if (_ScreenLanguage == "ar") {
                    txtEng1RP.value = result.DescA;
                }
                else {
                    txtEng1RP.value = result.DescE;
                }
            }
        });
    }
})(MonthBudgetByEng || (MonthBudgetByEng = {}));
//# sourceMappingURL=MonthBudgetByEng.js.map