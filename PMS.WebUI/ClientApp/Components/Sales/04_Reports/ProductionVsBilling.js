$(document).ready(function () {
    debugger;
    ProductionVsBilling.InitalizeComponent();
});
var ProductionVsBilling;
(function (ProductionVsBilling) {
    debugger;
    var sys = new SystemTools();
    var Model = new P_D_SalesEgineer();
    var Area = new G_BRANCH();
    var CatCode = new P_D_SalesEgineer();
    var Master = new P_D_SalesCustomer();
    var txtCustomerCodeRP;
    var txtCustomerIDRP;
    var btnCustomerCodeRP;
    var txtCustomerNameRP;
    var txtCustomerID;
    var txtCustomercIDRP;
    var FromDate;
    var ToDate;
    var txtSalesEngineerIdRP;
    var txtSalesEngineerIdHRP;
    var butEngCodeRP;
    var txtDescECatRP;
    var txtBraCodeRP = null;
    var txtAreaNameRP;
    var btnAreaRP;
    //Just put the elements IDs  
    var Cust = new P_D_SalesCustomerCategory();
    var txtCustomercCodeRP;
    var btnCustomerCatRP;
    var txtCustomerName1RP;
    var txtFromProjCode;
    var txtToProjCode;
    var _ScreenLanguage;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
    }
    ProductionVsBilling.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtCustomerCodeRP = DocumentActions.GetElementById("txtCustomerCodeRP");
        txtCustomerIDRP = DocumentActions.GetElementById("txtCustomerIDRP");
        btnCustomerCodeRP = DocumentActions.GetElementById("btnCustomerCodeRP");
        txtCustomerNameRP = DocumentActions.GetElementById("txtCustomerNameRP");
        txtSalesEngineerIdHRP = DocumentActions.GetElementById("txtSalesEngineerIdHRP");
        txtSalesEngineerIdRP = DocumentActions.GetElementById("txtSalesEngineerIdRP");
        butEngCodeRP = DocumentActions.GetElementById("butEngCodeRP");
        txtDescECatRP = DocumentActions.GetElementById("txtDescECatRP");
        txtCustomercIDRP = DocumentActions.GetElementById("txtCustomercIDRP");
        txtBraCodeRP = DocumentActions.GetElementById("txtBraCodeRP");
        txtAreaNameRP = DocumentActions.GetElementById("txtAreaNameRP");
        btnAreaRP = DocumentActions.GetElementById("btnAreaRP");
        ToDate = DocumentActions.GetElementById("ToDate");
        FromDate = DocumentActions.GetElementById("FromDate");
        txtFromProjCode = DocumentActions.GetElementById("txtFromProjCode");
        txtToProjCode = DocumentActions.GetElementById("txtToProjCode");
        txtCustomercCodeRP = DocumentActions.GetElementById("txtCustomercCodeRP");
        btnCustomerCatRP = DocumentActions.GetElementById("btnCustomerCatRP");
        txtCustomerName1RP = DocumentActions.GetElementById("txtCustomerName1RP");
        txtCustomerID = DocumentActions.GetElementById("txtCustomerID");
        txtFromProjCode.value = "1";
        txtToProjCode.value = "999999";
    }
    function InitalizeEvents() {
        btnCustomerCodeRP.onclick = btnCustomerCode_ClickedRP;
        butEngCodeRP.onclick = btnEng_Click;
        btnCustomerCatRP.onclick = btnCustomerCat_Click;
    }
    function Print() {
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        debugger;
        RP.Custid = Number(txtCustomerIDRP.value);
        RP.EngID = Number(txtSalesEngineerIdHRP.value);
        RP.CatID = Number(txtCustomercIDRP.value);
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        RP.FromProjCode = txtFromProjCode.value;
        RP.ToProjCode = txtToProjCode.value;
        if ($("#RDProdVsBill").prop("checked")) {
            RP.TypeReport = 4;
            Ajax.CallAsync({
                url: Url.Action("rptSlsProductionBillt", "GeneralReports"),
                data: RP,
                success: function (d) {
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        if ($("#RDProjBlanc").prop("checked")) {
            Ajax.CallAsync({
                url: Url.Action("rptSlsProductionProject", "GeneralReports"),
                data: RP,
                success: function (d) {
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        if ($("#RDProdcutList").prop("checked")) {
            RP.TypeReport = 1;
            Ajax.CallAsync({
                url: Url.Action("rptSlsProdctionList", "GeneralReports"),
                data: RP,
                success: function (d) {
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        if ($("#RDByCustomer").prop("checked")) {
            RP.TypeReport = 2;
            Ajax.CallAsync({
                url: Url.Action("rptSlsProdction", "GeneralReports"),
                data: RP,
                success: function (d) {
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        if ($("#RDBillingList").prop("checked")) {
            RP.TypeReport = 3;
            Ajax.CallAsync({
                url: Url.Action("rptSlsProdctioninvoes", "GeneralReports"),
                data: RP,
                success: function (d) {
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        if ($("#RDCustBlanc").prop("checked")) {
            Ajax.CallAsync({
                url: Url.Action("rptSlsProdctionCustomer", "GeneralReports"),
                data: RP,
                success: function (d) {
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
    }
    function Clear() {
        debugger;
        txtAreaNameRP.value = "";
        txtBraCodeRP.value = "";
        txtCustomerCodeRP.value = "";
        txtSalesEngineerIdHRP.value = "";
        txtBraCodeRP.value = "";
        txtCustomercIDRP.value = "";
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtToProjCode.value = "";
        txtFromProjCode.value = "";
        txtCustomerIDRP.value = "";
        btnCustomerCodeRP.value = "";
        txtCustomerNameRP.value = "";
        txtDescECatRP.value = "";
        txtCustomercIDRP.value = "";
        txtCustomercCodeRP.value = "";
        txtCustomerName1RP.value = "";
        txtCustomerID.value = "";
    }
    function btnCustomerCode_ClickedRP() {
        sys.FindKey(Modules.Customers, "btnCustomerCodeRP", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByID", "Customers"),
                data: { id: id },
                success: function (d) {
                    Master = d.result;
                    txtCustomerCodeRP.value = Master.CustomerCode.toString();
                    txtCustomerIDRP.value = Master.CustomerID.toString();
                    if (_ScreenLanguage == "ar")
                        txtCustomerNameRP.value = Master.DescA.toString();
                    else
                        txtCustomerNameRP.value = Master.DescE.toString();
                }
            });
        });
    }
    function btnEng_Click() {
        debugger;
        sys.FindKey(Modules.Customers, "butEngCodeRP", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getSalesEng", "Customers"),
                data: { id: id },
                success: function (d) {
                    CatCode = d.result;
                    txtSalesEngineerIdRP.value = CatCode.EngCode.toString();
                    txtSalesEngineerIdHRP.value = CatCode.SalesEngineerId.toString();
                    if (_ScreenLanguage == "ar")
                        txtDescECatRP.value = CatCode.DeacA.toString();
                    else
                        txtDescECatRP.value = CatCode.DescE.toString();
                }
            });
        });
    }
    function btnCustomerCat_Click() {
        debugger;
        sys.FindKey(Modules.Customers, "btnCustomerCatRP", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("CustomerCode", "Customers"),
                data: { _id: id },
                success: function (d) {
                    Cust = d.result;
                    txtCustomercCodeRP.value = Cust.CustomerCatCode.toString();
                    txtCustomercIDRP.value = Cust.CustomerCategoryID.toString();
                    if (_ScreenLanguage == "ar")
                        txtCustomerName1RP.value = Cust.DescA;
                    else
                        txtCustomerName1RP.value = Cust.DescE;
                }
            });
        });
    }
})(ProductionVsBilling || (ProductionVsBilling = {}));
//# sourceMappingURL=ProductionVsBilling.js.map