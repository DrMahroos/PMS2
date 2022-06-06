$(document).ready(function () {
    TaxInvoicelist.InitalizeComponent();
});
var TaxInvoicelist;
(function (TaxInvoicelist) {
    var sys = new SystemTools();
    var Model = new P_D_SalesEgineer();
    //var ajaxCall: AjaxCaller = new AjaxCaller();
    var Area = new G_BRANCH();
    var CatCode = new P_D_SalesEgineer();
    var Master = new P_D_SalesCustomer();
    var txtCustomerCodeRP;
    var txtCustomerIDRP;
    var btnCustomerCodeRP;
    var txtCustomerNameRP;
    var txtCustomerCode;
    var txtCustomerID;
    var btnCustomer;
    var txtCustomerName;
    //var txtCustomercIDRP: HTMLInputElement;
    var FromDate;
    var ToDate;
    var txtSalesEngineerIdRP;
    var txtSalesEngineerIdHRP;
    var butEngCodeRP;
    var txtDescECatRP;
    var txtBraCodeRP = null;
    var txtAreaNameRP;
    var btnAreaRP;
    var txtProjectID;
    var txtProjectRP;
    var btnProjectRP;
    var txtProject1RP;
    var txttoProjectID;
    var txttoProjectRP;
    var btntoProjectRP;
    var txttoProject1RP;
    var redDownpayment;
    var redProgress;
    //Just put the elements IDs  
    var Cust = new P_D_SalesCustomerCategory();
    var _ScreenLanguage;
    var _BranchCode;
    var _CompCode;
    var Condition;
    //Initalize The Current Popup
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        _CompCode = ClientSharedWork.Session.CompCode;
        _BranchCode = ClientSharedWork.Session.BranchCode;
        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
    }
    TaxInvoicelist.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtCustomerCodeRP = DocumentActions.GetElementById("txtCustomerCodeRP");
        txtCustomerIDRP = DocumentActions.GetElementById("txtCustomerIDRP");
        btnCustomerCodeRP = DocumentActions.GetElementById("btnCustomerCodeRP");
        txtCustomerNameRP = DocumentActions.GetElementById("txtCustomerNameRP");
        txtCustomerCode = DocumentActions.GetElementById("txtCustomerCode");
        txtCustomerID = DocumentActions.GetElementById("txtCustomerID");
        btnCustomer = DocumentActions.GetElementById("btnCustomer");
        txtCustomerName = DocumentActions.GetElementById("txtCustomerName");
        txtSalesEngineerIdHRP = DocumentActions.GetElementById("txtSalesEngineerIdHRP");
        txtSalesEngineerIdRP = DocumentActions.GetElementById("txtSalesEngineerIdRP");
        butEngCodeRP = DocumentActions.GetElementById("butEngCodeRP");
        txtDescECatRP = DocumentActions.GetElementById("txtDescECatRP");
        txtBraCodeRP = DocumentActions.GetElementById("txtBraCodeRP");
        txtAreaNameRP = DocumentActions.GetElementById("txtAreaNameRP");
        btnAreaRP = DocumentActions.GetElementById("btnAreaRP");
        ToDate = DocumentActions.GetElementById("ToDate");
        FromDate = DocumentActions.GetElementById("FromDate");
        txtCustomerID = DocumentActions.GetElementById("txtCustomerID");
        txtProjectID = DocumentActions.GetElementById("txtProjectID");
        txtProjectRP = DocumentActions.GetElementById("txtProjectRP");
        btnProjectRP = DocumentActions.GetElementById("btnProjectRP");
        txtProject1RP = DocumentActions.GetElementById("txtProject1RP");
        txttoProjectID = DocumentActions.GetElementById("txttoProjectID");
        txttoProjectRP = DocumentActions.GetElementById("txttoProjectRP");
        btntoProjectRP = DocumentActions.GetElementById("btntoProjectRP");
        txttoProject1RP = DocumentActions.GetElementById("txttoProject1RP");
        redProgress = DocumentActions.GetElementById("redProgress");
        redDownpayment = DocumentActions.GetElementById("redDownpayment");
    }
    function InitalizeEvents() {
        btnCustomerCodeRP.onclick = btnCustomerCode_ClickedRP;
        btnCustomer.onclick = btnCustomer_Clicked;
        butEngCodeRP.onclick = btnEng_Click;
        btnProjectRP.onclick = FromProjectRP_Click;
        btntoProjectRP.onclick = ToProjectRP_Click;
    }
    function Clear() {
        //
        txtAreaNameRP.value = "";
        txtBraCodeRP.value = "";
        txtCustomerCodeRP.value = "";
        txtSalesEngineerIdHRP.value = "";
        txtBraCodeRP.value = "";
        txtSalesEngineerIdRP.value = "";
        txtDescECatRP.value = "";
        txtCustomerNameRP.value = "";
        txtCustomerIDRP.value = "";
        btnCustomerCodeRP.value = "";
        txtCustomerNameRP.value = "";
        txtDescECatRP.value = "";
        txtCustomerID.value = "";
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
    }
    function btnCustomerCode_ClickedRP() {
        sys.FindKey(Modules.TaxInvoicelist, "btnCustomerCodeRP", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
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
    function btnCustomer_Clicked() {
        sys.FindKey(Modules.TaxInvoicelist, "btnCustomer", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByID", "Customers"),
                data: { id: id },
                success: function (d) {
                    Master = d.result;
                    txtCustomerCode.value = Master.CustomerCode.toString();
                    txtCustomerID.value = Master.CustomerID.toString();
                    if (_ScreenLanguage == "ar")
                        txtCustomerName.value = Master.DescA.toString();
                    else
                        txtCustomerName.value = Master.DescE.toString();
                }
            });
        });
    }
    function btnEng_Click() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.TaxInvoicelist, "butEngCodeRP", Condition, function () {
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
    function ToProjectRP_Click() {
        sys.FindKey(Modules.TaxInvoicelist, "btntoSearchProject", Condition, function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProjectEng", "ProjItemsInventory"),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txttoProjectID.value = result.ProjectID.toString();
                    txttoProjectRP.value = result.ProjectCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txttoProject1RP.value = result.DescA;
                    }
                    else {
                        txttoProject1RP.value = result.DescL;
                    }
                }
            });
        });
    }
    function FromProjectRP_Click() {
        sys.FindKey(Modules.TaxInvoicelist, "btnSearchProject", Condition, function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProjectEng", "ProjItemsInventory"),
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
    //Print Current Report
    function Print() {
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.CatID = Number(txtCustomerIDRP.value);
        RP.Custid = Number(txtCustomerID.value);
        RP.EngID = Number(txtSalesEngineerIdHRP.value);
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        RP.FromProjCode = txtProjectRP.value;
        RP.ToProjCode = txttoProjectRP.value;
        if (redProgress.checked == true) {
            RP.GroupType = 2;
        }
        else if (redDownpayment.checked == true) {
            RP.GroupType = 1;
        }
        Ajax.CallAsync({
            //CRMReport
            url: Url.Action("rptSlsinvoices", "GeneralReports"),
            data: RP,
            success: function (d) {
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(TaxInvoicelist || (TaxInvoicelist = {}));
//# sourceMappingURL=TaxInvoicelist.js.map