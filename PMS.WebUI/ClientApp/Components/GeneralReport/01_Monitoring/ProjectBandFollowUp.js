$(document).ready(function () {
    ProjectBandFollowUp.InitalizeComponent();
});
var ProjectBandFollowUp;
(function (ProjectBandFollowUp) {
    var sys = new SystemTools();
    var ControllerName = "ProjectBandFollowUp";
    //----------ID-------------
    var FromDate;
    var ToDate;
    var txtProject;
    var txtProjectCod;
    var txtProjectDes;
    var btnProject;
    var _CompCode;
    var _BranchCode;
    var _ScreenLanguage;
    var _BranchCode;
    var Condition;
    function InitalizeComponent() {
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        InitalizeControls();
        InitalizeEvents();
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = print;
        // GeneralReports.OnPrint = print;
        //ControlsButtons.PrintAction(() => { print });
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        // ControlsButtons.PrintAction(() => { print(); });
    }
    ProjectBandFollowUp.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //---------- textID---------
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtProject = DocumentActions.GetElementById("txtProject");
        txtProjectCod = DocumentActions.GetElementById("txtProjectCod");
        txtProjectDes = DocumentActions.GetElementById("txtProjectDes");
        btnProject = DocumentActions.GetElementById("btnProject");
        //--------------
    }
    function Clear() {
        txtProject.value = "";
        txtProjectCod.value = "";
        txtProjectDes.value = "";
    }
    function InitalizeEvents() {
        btnProject.onclick = btnProject_onclick;
        txtProjectCod.onchange = txtSearchProject_Clicked;
    }
    function btnProject_onclick() {
        sys.FindKey(Modules.RepProjectBandFollow, "btnProject", Condition, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjCodeByID", "ProjectBandFollowUp"),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtProject.value = result.ProjectID.toString();
                    txtProjectCod.value = result.ProjectCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtProjectDes.value = result.DescA;
                    }
                    else {
                        txtProjectDes.value = result.DescL;
                    }
                }
            });
        });
    }
    function txtSearchProject_Clicked() {
        debugger;
        var code = txtProjectCod.value;
        Ajax.CallAsync({
            url: Url.Action("getProjectsCode", ControllerName),
            data: { code: code, comp: SharedSession.CurrentEnvironment.CompCode, bra: SharedSession.CurrentEnvironment.BranchCode },
            success: function (d) {
                debugger;
                var result = d.result;
                if (result != null) {
                    txtProject.value = result.ProjectID.toString();
                    if (_ScreenLanguage == "ar") {
                        txtProjectDes.value = result.DescA;
                    }
                    else {
                        txtProjectDes.value = result.DescL;
                    }
                }
                else {
                    WorningMessage(" ????? ??? ????? ", " The code does not exist ");
                }
            }
        });
    }
    function print() {
        debugger;
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.ProjectID = Number(txtProject.value);
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        debugger;
        Ajax.CallAsync({
            url: Url.Action("rptProjectBandFollow", "GeneralReports"),
            data: RP,
            success: function (d) {
                debugger;
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(ProjectBandFollowUp || (ProjectBandFollowUp = {}));
//# sourceMappingURL=ProjectBandFollowUp.js.map