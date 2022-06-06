$(document).ready(function () {
    SalesManBonus.InitalizeComponent();
});
var SalesManBonus;
(function (SalesManBonus) {
    var ControllerName = "SalesManBonus";
    var sys = new SystemTools();
    var YearID;
    var PeriodID;
    var ToPeriodID;
    var _CompCode;
    var _BranchCode;
    var btnPrint;
    var _ScreenLanguage;
    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        YearID.value = SharedSession.CurrentEnvironment.CurrentYear;
        PeriodID.value = "01";
        ToPeriodID.value = "01";
        InitalizeEvents();
        //getbranchname();
    }
    SalesManBonus.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //---------- textID---------
        YearID = DocumentActions.GetElementById("txtLoginYear");
        PeriodID = DocumentActions.GetElementById("txtMonth");
        ToPeriodID = DocumentActions.GetElementById("txttoMonth");
        //--------------
    }
    function Clear() {
        YearID.value = SharedSession.CurrentEnvironment.CurrentYear;
        PeriodID.value = "01";
    }
    function InitalizeEvents() {
        debugger;
        btnPrint.onclick = Print;
    }
    function Print() {
        debugger;
        if (ToPeriodID.value < PeriodID.value) {
            WorningMessage("خطأ في اختيار الفترات", "Period Selection Error ");
            return;
        }
        var RP = new ReportParameters();
        // RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = _BranchCode;
        RP.yearID = Number(YearID.value);
        RP.ProjectID = Number(PeriodID.value);
        RP.EngID = Number(ToPeriodID.value);
        Ajax.CallAsync({
            url: Url.Action("P_repSalesEngineerBonus", "GeneralReports"),
            data: RP,
            success: function (d) {
                debugger;
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(SalesManBonus || (SalesManBonus = {}));
//# sourceMappingURL=SalesManBonus.js.map