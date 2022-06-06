$(document).ready(function () {
    MaterialUsageproject.InitalizeComponent();
});
var MaterialUsageproject;
(function (MaterialUsageproject) {
    var sys = new SystemTools();
    var ControllerName = "MaterialUsageproject";
    var FromDate;
    var ToDate;
    var txtProjectID;
    var txtProjectRP;
    var btnProjectRP;
    var txtProject1RP;
    var txtitemcodeID;
    var txtitemcodeRP;
    var btnitemcodeRP;
    var txtitemcode1RP;
    var txtMaterialCatID;
    var txtMaterialCatRP;
    var btnMaterialCatRP;
    var txtMaterialCat1RP;
    var _ScreenLanguage;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
    }
    MaterialUsageproject.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtProjectID = DocumentActions.GetElementById("txtProjectID");
        txtProjectRP = DocumentActions.GetElementById("txtProjectRP");
        btnProjectRP = DocumentActions.GetElementById("btnProjectRP");
        txtProject1RP = DocumentActions.GetElementById("txtProject1RP");
        txtitemcodeID = DocumentActions.GetElementById("txtitemcodeID");
        txtitemcodeRP = DocumentActions.GetElementById("txtitemcodeRP");
        btnitemcodeRP = DocumentActions.GetElementById("btnitemcodeRP");
        txtitemcode1RP = DocumentActions.GetElementById("txtitemcode1RP");
        txtMaterialCatID = DocumentActions.GetElementById("txtMaterialCatID");
        txtMaterialCatRP = DocumentActions.GetElementById("txtMaterialCatRP");
        btnMaterialCatRP = DocumentActions.GetElementById("btnMaterialCatRP");
        txtMaterialCat1RP = DocumentActions.GetElementById("txtMaterialCat1RP");
    }
    function Clear() {
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtProjectID.value = "";
        txtProjectRP.value = "";
        txtProject1RP.value = "";
        txtitemcodeID.value = "";
        txtitemcodeRP.value = "";
        txtitemcode1RP.value = "";
        txtMaterialCatID.value = "";
        txtMaterialCatRP.value = "";
        txtMaterialCat1RP.value = "";
    }
    function Print() {
        //debugger
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        RP.ItemId = Number(txtitemcodeID.value);
        RP.itemCatID = Number(txtMaterialCatID.value);
        RP.ProjectID = Number(txtProjectID.value);
        if (DateFormat(FromDate.value) == "NaN-NaN-NaN" || DateFormat(ToDate.value) == "NaN-NaN-NaN") {
            MessageBox.Show(" you must select Date", "Info");
            return;
        }
        else if (DateFormat(FromDate.value) > DateFormat(ToDate.value)) {
            MessageBox.Show(" From date  is largethan To Date", "Info");
            return;
        }
        else if ((txtProjectID.value) == "") {
            MessageBox.Show("there is empty input you must select Project", "Info");
        }
        else {
            if ($("#RID_summary").prop("checked")) {
                RP.TypeReport = 1;
                Ajax.CallAsync({
                    url: Url.Action("rptRes_MaterialUsageproject", "GeneralReports"),
                    data: RP,
                    success: function (d) {
                        //debugger
                        var result = d.result;
                        window.open(result, "_blank");
                    }
                });
            }
            if ($("#RID_Detail").prop("checked")) {
                RP.TypeReport = 2;
                Ajax.CallAsync({
                    url: Url.Action("rptRes_MaterialUsageproject", "GeneralReports"),
                    data: RP,
                    success: function (d) {
                        //debugger
                        var result = d.result;
                        window.open(result, "_blank");
                    }
                });
            }
        }
    }
    function InitalizeEvents() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        $("#RID_summary").prop("checked", "checked");
        btnProjectRP.onclick = btnProjectRP_Click;
        btnitemcodeRP.onclick = btnitemcodeRP_Click;
        btnMaterialCatRP.onclick = btnMaterialCatRP_Click;
    }
    function btnProjectRP_Click() {
        //
        sys.FindKey(Modules.LaborMonitoring, "butProj_Code", "", function () {
            //
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
    function btnitemcodeRP_Click() {
        sys.FindKey(Modules.MaterialUsageproject, "btnitemcodeRP", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetItemCodeSearch", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtitemcodeID.value = result.ItemID.toString();
                    txtitemcodeRP.value = result.ItemCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtitemcode1RP.value = result.DescA.toString();
                    }
                    else {
                        txtitemcode1RP.value = result.DescL.toString();
                    }
                }
            });
        });
    }
    function btnMaterialCatRP_Click() {
        sys.FindKey(Modules.MaterialList, "butCatCode", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchMatCode", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtMaterialCatID.value = result.CatID.toString();
                    txtMaterialCatRP.value = result.CatCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtMaterialCat1RP.value = result.DescA;
                    }
                    else {
                        txtMaterialCat1RP.value = result.DescL;
                    }
                }
            });
        });
    }
})(MaterialUsageproject || (MaterialUsageproject = {}));
//# sourceMappingURL=MaterialUsageproject.js.map