$(document).ready(function () {
    ActivityReport.InitalizeComponent();
});
var ActivityReport;
(function (ActivityReport) {
    var sys = new SystemTools();
    var ajaxCall = new AjaxCaller();
    var txtParentActivityIDRp = null;
    var txtParentActivityNameRp = null;
    var btnParentActivityRp;
    var activeId;
    function InitalizeComponent() {
        SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        InitalizeControls();
        InitalizeEvents();
    }
    ActivityReport.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtParentActivityIDRp = DocumentActions.GetElementById("txtParentActivityIDRp");
        txtParentActivityNameRp = DocumentActions.GetElementById("txtParentActivityNameRp");
        btnParentActivityRp = DocumentActions.GetElementById("btnParentActivityRp");
    }
    function InitalizeEvents() {
        btnParentActivityRp.onclick = btnParentActivity_Clicked;
    }
    //Print Current Report
    function Print() {
        var rp = new ReportParameters();
        rp.CompCode = SharedSession.CurrentEnvironment.CompCode;
        rp.braCode = SharedSession.CurrentEnvironment.BranchCode;
        rp.ActID = activeId;
        Ajax.CallAsync({
            url: Url.Action("rptActivity", "GeneralReports"),
            data: rp,
            success: function (d) {
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
    function Clear() {
        txtParentActivityNameRp.value = "";
        txtParentActivityIDRp.value = "";
    }
    function btnParentActivity_Clicked() {
        sys.FindKey(Modules.WorkActivities, "btnParentActivityRp", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("activityList", "WorkActivities"),
                data: { id: id },
                success: function (d) {
                    var _Master = d.result;
                    activeId = _Master.ActivityID;
                    txtParentActivityIDRp.value = _Master.ActivityCode.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar")
                        txtParentActivityNameRp.value = _Master.DescA.toString();
                    else
                        txtParentActivityNameRp.value = _Master.DescE.toString();
                }
            });
        });
    }
})(ActivityReport || (ActivityReport = {}));
//# sourceMappingURL=ActivityReport.js.map