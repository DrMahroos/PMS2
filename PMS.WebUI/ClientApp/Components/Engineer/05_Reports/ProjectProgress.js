$(document).ready(function () {
    ProjectProgress.InitalizeComponent();
});
var ProjectProgress;
(function (ProjectProgress) {
    var sys = new SystemTools();
    var ControllerName = "ProjectProgress";
    var FromDate;
    var ToDate;
    var txtProjID;
    var txtProjCode;
    var btnProjCode;
    var txtProjDesc;
    var txtPhaseID;
    var txtPhaseCode;
    var btnPhaseCode;
    var txtPhaseDesc;
    var _ScreenLanguage;
    function InitalizeComponent() {
        debugger;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
    }
    ProjectProgress.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        ToDate = DocumentActions.GetElementById("ToDate");
        FromDate = DocumentActions.GetElementById("FromDate");
        txtProjID = DocumentActions.GetElementById("txtProjID");
        txtProjCode = DocumentActions.GetElementById("txtProjCode");
        btnProjCode = DocumentActions.GetElementById("btnProjCode");
        txtProjDesc = DocumentActions.GetElementById("txtProjDesc");
        txtPhaseID = DocumentActions.GetElementById("txtPhaseID");
        txtPhaseCode = DocumentActions.GetElementById("txtPhaseCode");
        btnPhaseCode = DocumentActions.GetElementById("btnPhaseCode");
        txtPhaseDesc = DocumentActions.GetElementById("txtPhaseDesc");
    }
    function Clear() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtProjID.value = "";
        txtProjCode.value = "";
        txtProjDesc.value = "";
        txtPhaseID.value = "";
        txtPhaseCode.value = "";
        txtPhaseDesc.value = "";
    }
    function Print() {
        debugger;
        if (txtProjCode.value == "") {
            MessageBox.Show("You Must Select From Project ", "Info");
            return;
        }
        var RP = new ReportParameters();
        if ($("#byprojitem").prop("checked") == false && $("#byactivity").prop("checked") == false) {
            MessageBox.Show("You Must Select", "Info");
            return;
        }
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.ProjectID = Number(txtProjID.value);
        RP.Phaseid = Number(txtPhaseID.value);
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        debugger;
        if ($("#byprojitem").prop("checked") == true) {
            RP.TypeReport = 2;
            Ajax.CallAsync({
                url: Url.Action("rptEngProgressItem", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        if ($("#byactivity").prop("checked") == true) {
            RP.TypeReport = 1;
            Ajax.CallAsync({
                url: Url.Action("rptEngProgressItem", "GeneralReports"),
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
        btnProjCode.onclick = btnProjCode_onclick;
        btnPhaseCode.onclick = btnPhaseCode_onclick;
        txtProjCode.onchange = txtSearchProject_Clicked;
    }
    function btnProjCode_onclick() {
        debugger;
        sys.FindKey(Modules.ProjectProgress, "btnProjCode", "CompCode = " + ClientSharedWork.Session.CompCode + " and BraCode=" + ClientSharedWork.Session.BranchCode, function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjCodeByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    debugger;
                    var result = d.result;
                    txtProjID.value = result.ProjectID.toString();
                    txtProjCode.value = result.ProjectCode;
                    if (_ScreenLanguage == "ar") {
                        txtProjDesc.value = result.DescA;
                    }
                    else {
                        txtProjDesc.value = result.DescL;
                    }
                }
            });
        });
    }
    function txtSearchProject_Clicked() {
        debugger;
        var code = txtProjCode.value;
        Ajax.CallAsync({
            url: Url.Action("getProjectsCode", ControllerName),
            data: { code: code, comp: SharedSession.CurrentEnvironment.CompCode, bra: SharedSession.CurrentEnvironment.BranchCode },
            success: function (d) {
                debugger;
                var result = d.result;
                if (result != null) {
                    // txtProjectCode.value = result.ProjectCode;
                    txtProjID.value = result.ProjectID.toString();
                    if (_ScreenLanguage == "ar") {
                        txtProjDesc.value = result.DescA;
                    }
                    else {
                        txtProjDesc.value = result.DescL;
                    }
                }
                else {
                    WorningMessage(" الكود غير موجود ", " The code does not exist ");
                }
            }
        });
    }
    function btnPhaseCode_onclick() {
        debugger;
        if (txtProjID.value == "" || txtProjID.value == " ") {
            WorningMessage("يجب اختيار المشروع اولا", "Select project First");
            return;
        }
        sys.FindKey(Modules.ProjectProgress, "btnPhaseCode", " Projectid = " + txtProjID.value, function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetPhaseCodeById", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtPhaseID.value = result.ProjectPhaseId.toString();
                    txtPhaseCode.value = result.ProjectPhaseCode;
                    if (_ScreenLanguage == "ar") {
                        txtPhaseDesc.value = result.DescA;
                    }
                    else {
                        txtPhaseDesc.value = result.DescL;
                    }
                }
            });
        });
    }
})(ProjectProgress || (ProjectProgress = {}));
//# sourceMappingURL=ProjectProgress.js.map