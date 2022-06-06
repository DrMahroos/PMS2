$(document).ready(function () {
    ContractList.InitalizeComponent();
});
var ContractList;
(function (ContractList) {
    var sys = new SystemTools();
    var Model = new P_D_SalesEgineer();
    //var ajaxCall: AjaxCaller = new AjaxCaller();
    var Area = new G_BRANCH();
    var CatCode = new P_D_SalesEgineer();
    var Master = new P_D_SalesCustomer();
    //export var dataSource: Array<P_D_SalesEgineer> = new Array<P_D_SalesEgineer>();
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
    var txtLocation;
    var txtLocationdsc;
    var btnLocation;
    var txtLocationCod;
    //Just put the elements IDs  
    var Cust = new P_D_SalesCustomerCategory();
    var txtCustomercCodeRP;
    var btnCustomerCatRP;
    var txtCustomerName1RP;
    var _ScreenLanguage;
    var _CompCode;
    var _BranchCode;
    //Initalize The Current Popup
    function InitalizeComponent() {
        debugger;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.Language;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
    }
    ContractList.InitalizeComponent = InitalizeComponent;
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
        txtLocation = DocumentActions.GetElementById("txtLocation");
        txtLocationCod = DocumentActions.GetElementById("txtLocationCod");
        txtLocationdsc = DocumentActions.GetElementById("txtLocationdsc");
        btnLocation = DocumentActions.GetElementById("btnLocation");
        ToDate = DocumentActions.GetElementById("ToDate");
        FromDate = DocumentActions.GetElementById("FromDate");
        txtCustomercCodeRP = DocumentActions.GetElementById("txtCustomercCodeRP");
        btnCustomerCatRP = DocumentActions.GetElementById("btnCustomerCatRP");
        txtCustomerName1RP = DocumentActions.GetElementById("txtCustomerName1RP");
        txtCustomerID = DocumentActions.GetElementById("txtCustomerID");
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
        debugger;
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.Custid = Number(txtCustomerIDRP.value);
        RP.EngID = Number(txtSalesEngineerIdHRP.value);
        RP.LocId = Number(txtLocation.value);
        RP.CatID = Number(txtCustomercIDRP.value);
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        Ajax.CallAsync({
            url: Url.Action("rptSlsContractList", "GeneralReports"),
            data: RP,
            success: function (d) {
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
    //onclick = "GeneralReports.Clear();"
    function Clear() {
        debugger;
        txtCustomercCodeRP.value = "";
        txtCustomerName1RP.value = "";
        txtCustomerCodeRP.value = "";
        txtCustomerNameRP.value = "";
        txtSalesEngineerIdRP.value = "";
        txtDescECatRP.value = "";
        txtLocation.value = "";
        txtLocationdsc.value = "";
        txtLocationCod.value = "";
        txtCustomerIDRP.value = "";
        txtSalesEngineerIdHRP.value = "";
        txtCustomercIDRP.value = "";
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
    }
    function btnLocation_Click() {
        debugger;
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
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.Customers, "butEngCodeRP", Condition, function () {
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
})(ContractList || (ContractList = {}));
//# sourceMappingURL=ContractList.js.map