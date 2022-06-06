$(document).ready(function () {
    debugger;
    ProjectExpenses.InitalizeComponent();
});
var ProjectExpenses;
(function (ProjectExpenses) {
    var sys = new SystemTools();
    var ControllerName = "ProjectExpenses";
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
    var txtCatID;
    var txtCatCode;
    var btnCatCode;
    var txtCatDesc;
    var txtExpCodeID;
    var txtExpCode;
    var btnExpCodeCode;
    var txtExpCodeDesc;
    var txtExpCodeRPID;
    var txtExpCodeRP;
    var butExpCodeRP;
    var txtExpCodeDesc;
    var txtscopeRPID;
    var txtscopeRP;
    var butscopeRP;
    var txtscope1RP;
    var _ScreenLanguage;
    var _CompCode;
    var _BranchCode;
    var Condition;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
    }
    ProjectExpenses.InitalizeComponent = InitalizeComponent;
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
        txtCatID = DocumentActions.GetElementById("txtCatID");
        txtCatCode = DocumentActions.GetElementById("txtCatCode");
        btnCatCode = DocumentActions.GetElementById("btnCatCode");
        txtCatDesc = DocumentActions.GetElementById("txtCatDesc");
        txtExpCodeID = DocumentActions.GetElementById("txtExpCodeID");
        txtExpCode = DocumentActions.GetElementById("txtExpCode");
        btnExpCodeCode = DocumentActions.GetElementById("btnExpCodeCode");
        txtExpCodeDesc = DocumentActions.GetElementById("txtExpCodeDesc");
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
        txtCatID.value = "";
        txtCatCode.value = "";
        txtCatDesc.value = "";
        txtExpCodeID.value = "";
        txtExpCode.value = "";
        txtExpCodeDesc.value = "";
    }
    function Print() {
        debugger;
        if (txtProjCode.value == "") {
            MessageBox.Show("You Must Select From Project ", "Info");
            return;
        }
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        if ($("#txtsummary").prop("checked") == false && $("#txtdetail").prop("checked") == false) {
            MessageBox.Show("You Must Select", "Info");
            return;
        }
        RP.ProjectID = Number(txtProjID.value);
        RP.Phaseid = Number(txtPhaseID.value);
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        RP.CatID = Number(txtCatID.value);
        RP.ExpID = Number(txtExpCodeID.value);
        if ($("#txtsummary").prop("checked") == true) {
            RP.TypeReport = 1;
            Ajax.CallAsync({
                url: Url.Action("rptEngExpensesSummary", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        if ($("#txtdetail").prop("checked") == true) {
            RP.TypeReport = 2;
            Ajax.CallAsync({
                url: Url.Action("rptEngExpensesSummary", "GeneralReports"),
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
        $("#RDByShowContracts").prop("checked", "checked");
        btnProjCode.onclick = btnProjCode_onclick;
        btnPhaseCode.onclick = btnPhaseCode_onclick;
        btnCatCode.onclick = btnCatCode_onclick;
        btnExpCodeCode.onclick = btnExpCodeCode_onclick;
        txtProjCode.onchange = txtSearchProject_Clicked;
    }
    function btnProjCode_onclick() {
        debugger;
        sys.FindKey(Modules.ProjectExpenses, "btnProjCode", Condition, function () {
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
        if (txtProjCode.value == "") {
            MessageBox.Show("You Must Select From Project ", "Info");
            return;
        }
        sys.FindKey(Modules.ProjectExpenses, "btnPhaseCode", "ProjectID =" + Number(txtProjID.value), function () {
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
    function btnCatCode_onclick() {
        debugger;
        sys.FindKey(Modules.ProjectExpenses, "btnCatCode", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCatCodeById", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtCatID.value = result.ExpCatID.toString();
                    txtCatCode.value = result.ExpCatCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtCatDesc.value = result.DescA;
                    }
                    else {
                        txtCatDesc.value = result.DescE;
                    }
                }
            });
        });
    }
    function btnExpCodeCode_onclick() {
        debugger;
        sys.FindKey(Modules.EngExpences, "btnFindExpences", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetExpCodeById", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtExpCodeID.value = result.ExpencesID.toString();
                    txtExpCode.value = result.ExpCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtExpCodeDesc.value = result.DescA.toString();
                    }
                    else {
                        txtExpCodeDesc.value = result.DescE.toString();
                    }
                }
            });
        });
    }
})(ProjectExpenses || (ProjectExpenses = {}));
//# sourceMappingURL=ProjectExpenses.js.map