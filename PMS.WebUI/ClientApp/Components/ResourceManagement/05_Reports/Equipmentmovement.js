$(document).ready(function () {
    Equipmentmovement.InitalizeComponent();
});
var Equipmentmovement;
(function (Equipmentmovement) {
    var sys = new SystemTools();
    var ControllerName = "Equipmentmovement";
    var FromDate;
    var ToDate;
    var txtFromProjectRP;
    var txtToProjectRP;
    var txtEquipmentClassID;
    var txtEquipmentClassRP;
    var btnEquipmentClassRP;
    var txtEquipmentClass1RP;
    var txtFromEquipmentID;
    var txtFromEquipmentRP;
    var btnFromEquipmentRP;
    var txtFromEquipment1RP;
    var txtToEquipmentID;
    var txtToEquipmentRP;
    var btnToEquipmentRP;
    var txtToEquipment1RP;
    var txtCustomerCatID;
    var txtCustomerCatRP;
    var btnCustomerCatRP;
    var txtCustomerCat1RP;
    var txtCustomerID;
    var txtCustomerRP;
    var btnCustomerRP;
    var txtCustomer1RP;
    var txtEquipClassID;
    var txtEquipClassRP;
    var btnEquipClassRP;
    var txtEquipClass1RP;
    var txtFromEquipRP;
    var txtToEquipRP;
    var _ScreenLanguage;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
    }
    Equipmentmovement.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtFromProjectRP = DocumentActions.GetElementById("txtFromProjectRP");
        txtToProjectRP = DocumentActions.GetElementById("txtToProjectRP");
        txtEquipmentClassID = DocumentActions.GetElementById("txtEquipmentClassID");
        txtEquipmentClassRP = DocumentActions.GetElementById("txtEquipmentClassRP");
        btnEquipmentClassRP = DocumentActions.GetElementById("btnEquipmentClassRP");
        txtEquipmentClass1RP = DocumentActions.GetElementById("txtEquipmentClass1RP");
        txtFromEquipmentID = DocumentActions.GetElementById("txtFromEquipmentID");
        txtFromEquipmentRP = DocumentActions.GetElementById("txtFromEquipmentRP");
        btnFromEquipmentRP = DocumentActions.GetElementById("btnFromEquipmentRP");
        txtFromEquipment1RP = DocumentActions.GetElementById("txtFromEquipment1RP");
        txtToEquipmentID = DocumentActions.GetElementById("txtToEquipmentID");
        txtToEquipmentRP = DocumentActions.GetElementById("txtToEquipmentRP");
        btnToEquipmentRP = DocumentActions.GetElementById("btnToEquipmentRP");
        txtToEquipment1RP = DocumentActions.GetElementById("txtToEquipment1RP");
        txtCustomerCatID = DocumentActions.GetElementById("txtCustomerCatID");
        txtCustomerCatRP = DocumentActions.GetElementById("txtCustomerCatRP");
        btnCustomerCatRP = DocumentActions.GetElementById("btnCustomerCatRP");
        txtCustomerCat1RP = DocumentActions.GetElementById("txtCustomerCat1RP");
        txtCustomerID = DocumentActions.GetElementById("txtCustomerID");
        txtCustomerRP = DocumentActions.GetElementById("txtCustomerRP");
        btnCustomerRP = DocumentActions.GetElementById("btnCustomerRP");
        txtCustomer1RP = DocumentActions.GetElementById("txtCustomer1RP");
        txtEquipClassID = DocumentActions.GetElementById("txtEquipClassID");
        txtEquipClassRP = DocumentActions.GetElementById("txtEquipClassRP");
        btnEquipClassRP = DocumentActions.GetElementById("btnEquipClassRP");
        txtEquipClass1RP = DocumentActions.GetElementById("txtEquipClass1RP");
        txtFromEquipRP = DocumentActions.GetElementById("txtFromEquipRP");
        txtToEquipRP = DocumentActions.GetElementById("txtToEquipRP");
    }
    function Clear() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtFromProjectRP.value = "";
        txtToProjectRP.value = "";
        txtEquipmentClassID.value = "";
        txtEquipmentClassRP.value = "";
        txtEquipmentClass1RP.value = "";
        txtFromEquipmentID.value = "";
        txtFromEquipmentRP.value = "";
        txtFromEquipment1RP.value = "";
        txtToEquipmentID.value = "";
        txtToEquipmentRP.value = "";
        txtToEquipment1RP.value = "";
        txtCustomerCatID.value = "";
        txtCustomerCatRP.value = "";
        txtCustomerCat1RP.value = "";
        txtCustomerID.value = "";
        txtCustomerRP.value = "";
        txtCustomer1RP.value = "";
        txtEquipClassID.value = "";
        txtEquipClassRP.value = "";
        txtEquipClass1RP.value = "";
        txtFromEquipRP.value = "";
        txtToEquipRP.value = "";
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
            RP.EquipClassID = Number(txtEquipmentClassID.value);
            RP.FromEquipCode = txtFromEquipmentID.value;
            RP.ToEquipCode = txtToEquipmentID.value;
            Ajax.CallAsync({
                url: Url.Action("rptEquipmentmovement", "GeneralReports"),
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
        //$("#RDByShowContracts").prop("checked", "checked");
        btnEquipmentClassRP.onclick = btnEquipmentClassRP_Click;
        btnFromEquipmentRP.onclick = btnFromEquipmentRP_Click;
        btnToEquipmentRP.onclick = btnToEquipmentRP_Click;
    }
    function btnEquipmentClassRP_Click() {
        debugger;
        sys.FindKey(Modules.EquipmentAssign, "btnSearchClass", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchEquipmentClass", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtEquipmentClassID.value = result.EquipClassId.toString();
                    txtEquipmentClassRP.value = result.ClassCode;
                    if (_ScreenLanguage == "ar") {
                        txtEquipmentClass1RP.value = result.DescA;
                    }
                    else {
                        txtEquipmentClass1RP.value = result.DescE;
                    }
                }
            });
        });
    }
    function btnFromEquipmentRP_Click() {
        debugger;
        sys.FindKey(Modules.Equipmentmovement, "btnFromEquipmentRP", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSearchFromEquipment", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    debugger;
                    var result = d.result;
                    txtFromEquipmentID.value = result.EquimentID.toString();
                    txtFromEquipmentRP.value = result.Equipcode;
                    if (_ScreenLanguage == "ar") {
                        txtFromEquipment1RP.value = result.DescA;
                    }
                    else {
                        txtFromEquipment1RP.value = result.DescE;
                    }
                }
            });
        });
    }
    function btnToEquipmentRP_Click() {
        debugger;
        sys.FindKey(Modules.Equipmentmovement, "btnToEquipmentRP", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetToEquipment", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtToEquipmentID.value = result.EquimentID.toString();
                    txtToEquipmentRP.value = result.Equipcode;
                    if (_ScreenLanguage == "ar") {
                        txtToEquipment1RP.value = result.DescA.toString();
                    }
                    else {
                        txtToEquipment1RP.value = result.DescE.toString();
                    }
                }
            });
        });
    }
})(Equipmentmovement || (Equipmentmovement = {}));
//# sourceMappingURL=Equipmentmovement.js.map