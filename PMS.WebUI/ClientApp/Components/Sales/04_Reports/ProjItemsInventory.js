$(document).ready(function () {
    ProjItemsInventory.InitalizeComponent();
});
var ProjItemsInventory;
(function (ProjItemsInventory) {
    var sys = new SystemTools();
    var ControllerName = "ProjItemsInventory";
    var FromDate;
    var ToDate;
    var txtProjectID;
    var txtProjectRP;
    var btnProjectRP;
    var txtProject1RP;
    var _ScreenLanguage;
    var Phase_Status;
    var Condition;
    var _CompCode;
    var _BranchCode;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
    }
    ProjItemsInventory.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtProjectID = DocumentActions.GetElementById("txtProjectID");
        txtProjectRP = DocumentActions.GetElementById("txtProjectRP");
        btnProjectRP = DocumentActions.GetElementById("btnProjectRP");
        txtProject1RP = DocumentActions.GetElementById("txtProject1RP");
    }
    function Clear() {
        debugger;
        txtProjectID.value = "";
        txtProjectRP.value = "";
        txtProject1RP.value = "";
    }
    function Print() {
        debugger;
        if (txtProjectID.value == "") {
            WorningMessage("يجب اختيار مشروع ", "Select Project");
            return;
        }
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.ProjectID = Number(txtProjectID.value);
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
        Ajax.CallAsync({
            url: Url.Action("Rpt_ProjectItemsInventory", "GeneralReports"),
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
        btnProjectRP.onclick = btnProjectRP_Click;
    }
    function btnProjectRP_Click() {
        debugger;
        sys.FindKey(Modules.ProjItemsInventory, "btnSearchProject", Condition, function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProjectEng", ControllerName),
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
})(ProjItemsInventory || (ProjItemsInventory = {}));
//# sourceMappingURL=ProjItemsInventory.js.map