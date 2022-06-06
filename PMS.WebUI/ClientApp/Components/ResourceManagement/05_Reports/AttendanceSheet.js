$(document).ready(function () {
    AttendanceSheet.InitalizeComponent();
});
var AttendanceSheet;
(function (AttendanceSheet) {
    var sys = new SystemTools();
    var ControllerName = "AttendanceSheet";
    var FromDate;
    var ToDate;
    var txtLaborClassID;
    var txtLaborClassRP;
    var btnLaborClassRP;
    var txtLaborClass1RP;
    var txtFromLaborRP;
    var txtToLaborRP;
    var txtLabCatID;
    var txtLabCatRP;
    var btnLabCatRP;
    var txtLabCat1RP;
    //var date: string;
    var _ScreenLanguage;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
    }
    AttendanceSheet.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtLaborClassID = DocumentActions.GetElementById("txtLaborClassID");
        txtLaborClassRP = DocumentActions.GetElementById("txtLaborClassRP");
        btnLaborClassRP = DocumentActions.GetElementById("btnLaborClassRP");
        txtLaborClass1RP = DocumentActions.GetElementById("txtLaborClass1RP");
        txtFromLaborRP = DocumentActions.GetElementById("txtFromLaborRP");
        txtToLaborRP = DocumentActions.GetElementById("txtToLaborRP");
        txtLabCatID = DocumentActions.GetElementById("txtLabCatID");
        txtLabCatRP = DocumentActions.GetElementById("txtLabCatRP");
        btnLabCatRP = DocumentActions.GetElementById("btnLabCatRP");
        txtLabCat1RP = DocumentActions.GetElementById("txtLabCat1RP");
    }
    function Clear() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtLaborClassID.value = "";
        txtLaborClassRP.value = "";
        txtLaborClass1RP.value = "";
        txtFromLaborRP.value = "";
        txtToLaborRP.value = "";
        txtLabCatID.value = "";
        txtLabCatRP.value = "";
        txtLabCat1RP.value = "";
    }
    function Print() {
        debugger;
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        if (DateFormat(FromDate.value) == "NaN-NaN-NaN" || DateFormat(ToDate.value) == "NaN-NaN-NaN") {
            MessageBox.Show(" you must select Date", "Info");
            return;
        }
        else if (DateFormat(FromDate.value) > DateFormat(ToDate.value)) {
            MessageBox.Show(" From date  is largethan To Date", "Info");
            return;
        }
        else {
            RP.FromDate = DateFormat(FromDate.value);
            RP.ToDate = DateFormat(ToDate.value);
            RP.LabCatID = Number(txtLabCatID.value);
            RP.FromLabCode = txtFromLaborRP.value;
            RP.ToLabCode = txtToLaborRP.value;
            RP.LabClassID = Number(txtLaborClassID.value);
            Ajax.CallAsync({
                url: Url.Action("rptAttendanceSheet", "GeneralReports"),
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
        //$("#RDByShowContracts").prop("checked", "checked");
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        btnLaborClassRP.onclick = btnLaborClassRP_Click;
        btnLabCatRP.onclick = btnProjectRP_Click;
    }
    function btnLaborClassRP_Click() {
        sys.FindKey(Modules.LaborAssign, "btnSearchClass", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLaborClass", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtLaborClassID.value = result.LaborClassId.toString();
                    txtLaborClassRP.value = result.ClassCode.toString();
                    if (_ScreenLanguage == "ar") {
                        debugger;
                        txtLaborClass1RP.value = result.DescA;
                    }
                    else {
                        debugger;
                        txtLaborClass1RP.value = result.DescE;
                    }
                }
            });
        });
    }
    function btnProjectRP_Click() {
        sys.FindKey(Modules.AttendanceSheet, "btnLabCatRP", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProject", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtLabCatID.value = result.LaborCategoryId.toString();
                    txtLabCatRP.value = result.CategCode;
                    if (_ScreenLanguage == "ar") {
                        txtLabCat1RP.value = result.DescA;
                    }
                    else {
                        txtLabCat1RP.value = result.DescE;
                    }
                }
            });
        });
    }
})(AttendanceSheet || (AttendanceSheet = {}));
//# sourceMappingURL=AttendanceSheet.js.map