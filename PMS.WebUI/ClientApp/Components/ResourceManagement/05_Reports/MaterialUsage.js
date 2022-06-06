$(document).ready(function () {
    MaterialUsage.InitalizeComponent();
});
var MaterialUsage;
(function (MaterialUsage) {
    var sys = new SystemTools();
    var ControllerName = "MaterialUsage";
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
    var txtCustomerClassID;
    var txtCustomerClassRP;
    var btnCustomerClassRP;
    var txtCustomerClass1RP;
    var txtCustomerID;
    var txtCustomerRP;
    var btnCustomerRP;
    var txtCustomer1RP;
    var txtScopeClassID;
    var txtScopeClassRP;
    var btnScopeClassRP;
    var txtScopeClass1RP;
    var txtScopeID;
    var txtScopeRP;
    var btnScopeRP;
    var txtScope1RP;
    var txtitemcodeID;
    var txtitemcodeRP;
    var btnitemcodeRP;
    var txtitemcode1RP;
    var txtMaterialCatID;
    var txtMaterialCatRP;
    var btnMaterialCatRP;
    var txtMaterialCat1RP;
    //var FromMat: HTMLInputElement;
    //var ToMat: HTMLInputElement;
    var _ScreenLanguage;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
    }
    MaterialUsage.InitalizeComponent = InitalizeComponent;
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
        txtCustomerClassID = DocumentActions.GetElementById("txtCustomerClassID");
        txtCustomerClassRP = DocumentActions.GetElementById("txtCustomerClassRP");
        btnCustomerClassRP = DocumentActions.GetElementById("btnCustomerClassRP");
        txtCustomerClass1RP = DocumentActions.GetElementById("txtCustomerClass1RP");
        txtCustomerID = DocumentActions.GetElementById("txtCustomerID");
        txtCustomerRP = DocumentActions.GetElementById("txtCustomerRP");
        btnCustomerRP = DocumentActions.GetElementById("btnCustomerRP");
        txtCustomer1RP = DocumentActions.GetElementById("txtCustomer1RP");
        txtScopeClassID = DocumentActions.GetElementById("txtScopeClassID");
        txtScopeClassRP = DocumentActions.GetElementById("txtScopeClassRP");
        btnScopeClassRP = DocumentActions.GetElementById("btnScopeClassRP");
        txtScopeClass1RP = DocumentActions.GetElementById("txtScopeClass1RP");
        txtScopeID = DocumentActions.GetElementById("txtScopeID");
        txtScopeRP = DocumentActions.GetElementById("txtScopeRP");
        btnScopeRP = DocumentActions.GetElementById("btnScopeRP");
        txtScope1RP = DocumentActions.GetElementById("txtScope1RP");
        txtitemcodeID = DocumentActions.GetElementById("txtitemcodeID");
        txtitemcodeRP = DocumentActions.GetElementById("txtitemcodeRP");
        btnitemcodeRP = DocumentActions.GetElementById("btnitemcodeRP");
        txtitemcode1RP = DocumentActions.GetElementById("txtitemcode1RP");
        txtMaterialCatID = DocumentActions.GetElementById("txtMaterialCatID");
        txtMaterialCatRP = DocumentActions.GetElementById("txtMaterialCatRP");
        btnMaterialCatRP = DocumentActions.GetElementById("btnMaterialCatRP");
        txtMaterialCat1RP = DocumentActions.GetElementById("txtMaterialCat1RP");
        //FromMat = DocumentActions.GetElementById<HTMLInputElement>("FromMat");
        //ToMat = DocumentActions.GetElementById<HTMLInputElement>("ToMat");
    }
    function Clear() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtitemcodeID.value = "";
        txtitemcodeRP.value = "";
        txtitemcode1RP.value = "";
        txtProjectID.value = "";
        txtProjectRP.value = "";
        txtProject1RP.value = "";
        txtCustomerClassID.value = "";
        txtCustomerClassRP.value = "";
        txtCustomerClass1RP.value = "";
        txtCustomerID.value = "";
        txtCustomerRP.value = "";
        txtCustomer1RP.value = "";
        txtScopeClassID.value = "";
        txtScopeClassRP.value = "";
        txtScopeClass1RP.value = "";
        txtScopeID.value = "";
        txtScopeRP.value = "";
        txtScope1RP.value = "";
        txtitemcodeID.value = "";
        txtitemcodeRP.value = "";
        txtitemcode1RP.value = "";
        txtMaterialCatID.value = "";
        txtMaterialCatRP.value = "";
        txtMaterialCat1RP.value = "";
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
        else if ((txtitemcodeID.value) == "") {
            MessageBox.Show("there is empty input you must select item code", "Info");
        }
        else {
            RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
            RP.FromDate = DateFormat(FromDate.value);
            RP.ToDate = DateFormat(ToDate.value);
            RP.ItemId = Number(txtitemcodeID.value);
            RP.ProjectID = Number(txtProjectID.value);
            RP.custClassID = Number(txtCustomerClassID.value);
            RP.customerID = Number(txtCustomerID.value);
            RP.scopeClassId = Number(txtScopeClassID.value);
            RP.ScopeID = Number(txtScopeID.value);
            if ($("#RAD_summary").prop("checked")) {
                RP.TypeReport = 1;
                Ajax.CallAsync({
                    url: Url.Action("rptRes_MaterialUsage", "GeneralReports"),
                    data: RP,
                    success: function (d) {
                        debugger;
                        var result = d.result;
                        window.open(result, "_blank");
                    }
                });
            }
            if ($("#RAD_Detail").prop("checked")) {
                RP.TypeReport = 2;
                Ajax.CallAsync({
                    url: Url.Action("rptRes_MaterialUsage", "GeneralReports"),
                    data: RP,
                    success: function (d) {
                        debugger;
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
        $("#RAD_summary").prop("checked", "checked");
        btnProjectRP.onclick = btnProjectRP_Click; //-----
        btnCustomerClassRP.onclick = btnCustomerClassRP_Click;
        btnCustomerRP.onclick = btnCustomerRP_Click;
        btnScopeClassRP.onclick = btnScopeClassRP_Click;
        btnScopeRP.onclick = btnScopeRP_Click;
        btnitemcodeRP.onclick = btnitemcodeRP_Click; //-----
        //btnMaterialCatRP.onclick = btnMaterialCatRP_Click;  //-----
        //btnAreaRP.onclick = btnAreaRP_Click;
    }
    function btnProjectRP_Click() {
        debugger;
        sys.FindKey(Modules.LaborMonitoring, "butProj_Code", "", function () {
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
    function btnCustomerClassRP_Click() {
        debugger;
        sys.FindKey(Modules.MaterialUsage, "btnCustomerClassRP", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerClass", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtCustomerClassID.value = result.CustomerCategoryID.toString();
                    txtCustomerClassRP.value = result.CustomerCatCode.toString();
                    if (_ScreenLanguage == "ar") {
                        debugger;
                        txtCustomerClass1RP.value = result.DescA;
                    }
                    else {
                        debugger;
                        txtCustomerClass1RP.value = result.DescE;
                    }
                }
            });
        });
    }
    function btnCustomerRP_Click() {
        debugger;
        sys.FindKey(Modules.MaterialUsage, "btnCustomerRP", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomer", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtCustomerID.value = result.CustomerID.toString();
                    txtCustomerRP.value = result.CustomerCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtCustomer1RP.value = result.DescA.toString();
                    }
                    else {
                        txtCustomer1RP.value = result.DescE.toString();
                    }
                }
            });
        });
    }
    function btnScopeClassRP_Click() {
        debugger;
        sys.FindKey(Modules.MaterialUsage, "btnScopeClassRP", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetScopeClass", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    debugger;
                    var result = d.result;
                    txtScopeClassID.value = result.ScopeCategoryID.toString();
                    txtScopeClassRP.value = result.ScopeCategCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtScopeClass1RP.value = result.DescA;
                    }
                    else {
                        txtScopeClass1RP.value = result.DescE;
                    }
                }
            });
        });
    }
    function btnScopeRP_Click() {
        debugger;
        sys.FindKey(Modules.MaterialUsage, "btnScopeRP", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetScope", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtScopeID.value = result.ScopeID.toString();
                    txtScopeRP.value = result.ScopeCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtScope1RP.value = result.DescA.toString();
                    }
                    else {
                        txtScope1RP.value = result.DescE.toString();
                    }
                }
            });
        });
    }
    function btnitemcodeRP_Click() {
        debugger;
        sys.FindKey(Modules.MaterialUsage, "btnItemCodeRP", "", function () {
            debugger;
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
})(MaterialUsage || (MaterialUsage = {}));
//# sourceMappingURL=MaterialUsage.js.map