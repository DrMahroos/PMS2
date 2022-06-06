$(document).ready(function () {
    SiteEngineerBonus.InitalizeComponent();
});
var SiteEngineerBonus;
(function (SiteEngineerBonus) {
    var sys = new SystemTools();
    var ControllerName = "SiteEngineerBonus";
    var YearID;
    var PeriodID;
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
        InitalizeEvents();
        //getbranchname();
    }
    SiteEngineerBonus.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //---------- textID---------
        YearID = DocumentActions.GetElementById("txtLoginYear");
        PeriodID = DocumentActions.GetElementById("txtMonth");
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
        var RP = new ReportParameters();
        // RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = _BranchCode;
        RP.yearID = Number(YearID.value);
        RP.ProjectID = Number(PeriodID.value);
        Ajax.CallAsync({
            url: Url.Action("P_repSiteEngineerBonus", "GeneralReports"),
            data: RP,
            success: function (d) {
                debugger;
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(SiteEngineerBonus || (SiteEngineerBonus = {}));
//# sourceMappingURL=SiteEngineerBonus.js.map