$(document).ready(function () {
    BillingList.InitalizeComponent();
});
var BillingList;
(function (BillingList) {
    var sys = new SystemTools();
    //var Model: P_D_SalesEgineer = new P_D_SalesEgineer();
    //var ajaxCall: AjaxCaller = new AjaxCaller();
    //var Area: G_BRANCH = new G_BRANCH();
    //var CatCode: P_D_SalesEgineer = new P_D_SalesEgineer();
    //var Master: P_D_SalesCustomer = new P_D_SalesCustomer();
    //export var dataSource: Array<P_D_SalesEgineer> = new Array<P_D_SalesEgineer>();
    var txtCustomerCodeRP;
    var txtCustomerIDRP;
    var btnCustomerCodeRP;
    var txtCustomerNameRP;
    var FromDate;
    var ToDate;
    var txtSalesEngineerIdRP;
    var txtSalesEngineerIdHRP;
    var butEngCodeRP;
    var txtDescECatRP;
    var txtLocation;
    var txtLocationdsc;
    var btnLocation;
    var txtLocationCod;
    //Just put the elements IDs  
    //var Cust: P_D_SalesCustomerCategory = new P_D_SalesCustomerCategory();
    var txtCustomercCodeRP;
    var btnCustomerCatRP;
    var txtCustomerName1RP;
    var txtCustomercIDRP;
    var txtCustomercIDRP;
    var _ScreenLanguage;
    var _BranchCode;
    var _CompCode;
    //Initalize The Current Popup
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        debugger;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        _CompCode = ClientSharedWork.Session.CompCode;
        _BranchCode = ClientSharedWork.Session.BranchCode;
        InitalizeControls();
        Clear();
        InitalizeEvents();
    }
    BillingList.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtCustomerCodeRP = DocumentActions.GetElementById("txtCustomerCodeRP");
        txtCustomerIDRP = DocumentActions.GetElementById("txtCustomerIDRP");
        btnCustomerCodeRP = DocumentActions.GetElementById("btnCustomerCodeRP");
        txtCustomerNameRP = DocumentActions.GetElementById("txtCustomerNameRP");
        txtSalesEngineerIdHRP = DocumentActions.GetElementById("txtSalesEngineerIdHRP");
        txtSalesEngineerIdRP = DocumentActions.GetElementById("txtSalesEngineerIdRP");
        butEngCodeRP = DocumentActions.GetElementById("butEngCodeRP");
        txtDescECatRP = DocumentActions.GetElementById("txtDescECatRP");
        txtCustomercCodeRP = DocumentActions.GetElementById("txtCustomercCodeRP");
        txtCustomercIDRP = DocumentActions.GetElementById("txtCustomercIDRP");
        btnCustomerCatRP = DocumentActions.GetElementById("btnCustomerCatRP");
        txtCustomerName1RP = DocumentActions.GetElementById("txtCustomerName1RP");
        txtLocation = DocumentActions.GetElementById("txtLocation");
        txtLocationCod = DocumentActions.GetElementById("txtLocationCod");
        txtLocationdsc = DocumentActions.GetElementById("txtLocationdsc");
        btnLocation = DocumentActions.GetElementById("btnLocation");
        ToDate = DocumentActions.GetElementById("ToDate");
        FromDate = DocumentActions.GetElementById("FromDate");
    }
    function InitalizeEvents() {
        debugger;
        btnCustomerCodeRP.onclick = btnCustomerCode_ClickedRP;
        butEngCodeRP.onclick = btnEng_Click;
        btnCustomerCatRP.onclick = btnCustomerCat_Click;
        btnLocation.onclick = btnLocation_Click;
    }
    //Print Current Report
    function Print() {
        var RP = new ReportParameters();
        debugger;
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.Custid = Number(txtCustomerIDRP.value);
        RP.EngID = Number(txtSalesEngineerIdHRP.value);
        RP.LocId = Number(txtLocation.value);
        RP.CatID = Number(txtCustomercIDRP.value);
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        if ($("#rpinvoice").prop("checked")) {
            RP.TypeReport = 0;
        }
        else if ($("#rpphase").prop("checked")) {
            RP.TypeReport = 1;
        }
        if ($("#rpZero").prop("checked")) {
            RP.Stat = 1;
        }
        else if ($("#rp5").prop("checked")) {
            RP.Stat = 2;
        }
        else if ($("#rp15").prop("checked")) {
            RP.Stat = 3;
        }
        else if ($("#rpAll").prop("checked")) {
            RP.Stat = 0;
        }
        Ajax.CallAsync({
            url: Url.Action("p_rptBillingList", "GeneralReports"),
            data: RP,
            success: function (d) {
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
    function Clear() {
        debugger;
        $("#rpAll").attr('checked', 'true');
        $("#rpphase").attr('checked', 'true');
        txtCustomerCodeRP.value = "";
        txtCustomerIDRP.value = "";
        txtCustomerNameRP.value = "";
        txtSalesEngineerIdHRP.value = "";
        txtSalesEngineerIdRP.value = "";
        txtDescECatRP.value = "";
        txtCustomercCodeRP.value = "";
        txtCustomercIDRP.value = "";
        txtCustomerName1RP.value = "";
        txtLocation.value = "";
        txtLocationCod.value = "";
        txtLocationdsc.value = "";
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
    }
    function btnLocation_Click() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.ContractList, "btnLocation", Condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getLocation", "ContractList"),
                data: { id: id },
                success: function (d) {
                    var Model = d.result;
                    txtLocation.value = Model.LocationId.toString();
                    txtLocationCod.value = Model.LocCode.toString();
                    txtLocationdsc.value = _ScreenLanguage == "en" ? Model.DescE : Model.DescA;
                }
            });
        });
    }
    function btnCustomerCode_ClickedRP() {
        sys.FindKey(Modules.Customers, "btnCustomerCodeRP", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByID", "Customers"),
                data: { id: id },
                success: function (d) {
                    var Master = d.result;
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
    function btnCustomerCat_Click() {
        debugger;
        sys.FindKey(Modules.Customers, "btnCustomerCatRP", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("CustomerCode", "Customers"),
                data: { _id: id },
                success: function (d) {
                    var Cust = d.result;
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
    function btnEng_Click() {
        debugger;
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.Customers, "butEngCodeRP", Condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getSalesEng", "Customers"),
                data: { id: id },
                success: function (d) {
                    var CatCode = d.result;
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
})(BillingList || (BillingList = {}));
//# sourceMappingURL=BillingList.js.map