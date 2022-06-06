$(document).ready(function () {
    MaterialUsageSummary.InitalizeComponent();
});
var MaterialUsageSummary;
(function (MaterialUsageSummary) {
    var sys = new SystemTools();
    var ControllerName = "MaterialUsageSummary";
    var FromDate;
    var ToDate;
    //var txtitemcodeID: HTMLInputElement;
    //var txtitemcodeRP: HTMLInputElement;
    //var btnitemcodeRP: HTMLButtonElement;
    //var txtitemcode1RP: HTMLInputElement;
    var txtProjectID;
    var txtProjectRP;
    var btnProjectRP;
    var txtProject1RP;
    var txtProjectEngineerID;
    var txtProjectEngineerRP;
    var btnProjectEngineerRP;
    var txtProjectEngineer1RP;
    var txtPhaseID;
    var txtPhaseRP;
    var btnPhaseRP;
    var txtPhase1RP;
    var _ScreenLanguage;
    var _BranchCode;
    var Condition;
    var _CompCode;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        InitalizeControls();
        InitalizeEvents();
    }
    MaterialUsageSummary.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        //txtitemcodeID = DocumentActions.GetElementById<HTMLInputElement>("txtitemcodeID");
        //txtitemcodeRP = DocumentActions.GetElementById<HTMLInputElement>("txtitemcodeRP");
        //btnitemcodeRP = DocumentActions.GetElementById<HTMLButtonElement>("btnitemcodeRP");
        //txtitemcode1RP = DocumentActions.GetElementById<HTMLInputElement>("txtitemcode1RP");
        txtProjectID = DocumentActions.GetElementById("txtProjectID");
        txtProjectRP = DocumentActions.GetElementById("txtProjectRP");
        btnProjectRP = DocumentActions.GetElementById("btnProjectRP");
        txtProject1RP = DocumentActions.GetElementById("txtProject1RP");
        txtProjectEngineerID = DocumentActions.GetElementById("txtProjectEngineerID");
        txtProjectEngineerRP = DocumentActions.GetElementById("txtProjectEngineerRP");
        btnProjectEngineerRP = DocumentActions.GetElementById("btnProjectEngineerRP");
        txtProjectEngineer1RP = DocumentActions.GetElementById("txtProjectEngineer1RP");
        txtPhaseID = DocumentActions.GetElementById("txtPhaseID");
        txtPhaseRP = DocumentActions.GetElementById("txtPhaseRP");
        btnPhaseRP = DocumentActions.GetElementById("btnPhaseRP");
        txtPhase1RP = DocumentActions.GetElementById("txtPhase1RP");
        //FromMat = DocumentActions.GetElementById<HTMLInputElement>("FromMat");
        //ToMat = DocumentActions.GetElementById<HTMLInputElement>("ToMat");
    }
    function Clear() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtProjectID.value = "";
        txtProjectRP.value = "";
        txtProject1RP.value = "";
        txtPhaseID.value = "";
        txtPhaseRP.value = "";
        txtPhase1RP.value = "";
        txtProjectEngineerID.value = "";
        txtProjectEngineerRP.value = "";
        txtProjectEngineer1RP.value = "";
        //FromMat.value = "";
        //ToMat.value = "";
    }
    function Print() {
        debugger;
        var RP = new ReportParameters();
        if (DateFormat(FromDate.value) == "NaN-NaN-NaN" || DateFormat(ToDate.value) == "NaN-NaN-NaN") {
            MessageBox.Show(" you must select Date", "Info");
            return;
        }
        else if (DateFormat(FromDate.value) > DateFormat(ToDate.value)) {
            MessageBox.Show(" From date  is largethan To Date", "Info");
            return;
        }
        else {
            RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
            RP.FromDate = DateFormat(FromDate.value);
            RP.ToDate = DateFormat(ToDate.value);
            RP.ProjectID = Number(txtProjectID.value);
            RP.Phaseid = Number(txtPhaseID.value);
            RP.EngID = Number(txtProjectEngineerID.value);
            RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
            if ($("#RAD_Material").prop("checked")) {
                RP.TypeReport = 1;
            }
            else if ($("#RAD_Trans").prop("checked")) {
                RP.TypeReport = 2;
            }
            Ajax.CallAsync({
                url: Url.Action("rptRes_MaterialUsageSummary", "GeneralReports"),
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
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        $("#RAD_Material").prop("checked", "checked");
        btnProjectRP.onclick = btnProjectRP_Click; //-----
        btnProjectEngineerRP.onclick = btnProjectEngineerRP_Click;
        btnPhaseRP.onclick = btnPhaseRP_Click;
    }
    function btnPhaseRP_Click() {
        if (txtProjectID.value == "") {
            WorningMessage("يجب اختيار مشروع ", "you must select project");
            return;
        }
        sys.FindKey(Modules.MaterialUsageSummary, "btnSearchPhase", " ProjectID = " + txtProjectID.value, function () {
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
    function btnProjectEngineerRP_Click() {
        debugger;
        sys.FindKey(Modules.MaterialUsageSummary, "butEng_Code", Condition, function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProjectEng", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtProjectEngineerID.value = result.SiteEngineerId.toString();
                    txtProjectEngineerRP.value = result.EngCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtProjectEngineer1RP.value = result.DescA;
                    }
                    else {
                        txtProjectEngineer1RP.value = result.DescE;
                    }
                }
            });
        });
    }
    function btnProjectRP_Click() {
        debugger;
        sys.FindKey(Modules.MaterialUsageSummary, "butProj_Code", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProject", ControllerName),
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
})(MaterialUsageSummary || (MaterialUsageSummary = {}));
//# sourceMappingURL=MaterialUsageSummary.js.map