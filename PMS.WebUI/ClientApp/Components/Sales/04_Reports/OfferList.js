$(document).ready(function () {
    OfferList.InitalizeComponent();
});
var OfferList;
(function (OfferList) {
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
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
    }
    OfferList.InitalizeComponent = InitalizeComponent;
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
        // txtBraCodeRP.value = "";
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
        if ($("#rpNew").prop("checked")) {
            RP.Stat = 0;
        }
        else if ($("#rpApproved").prop("checked")) {
            RP.Stat = 1;
        }
        else if ($("#rpSpecification").prop("checked")) {
            RP.Stat = 5;
        }
        else if ($("#rpBillingterms").prop("checked")) {
            RP.Stat = 2;
        }
        else if ($("#rpCostEstimation").prop("checked")) {
            RP.Stat = 6;
        }
        else if ($("#rpSendTocustomer").prop("checked")) {
            RP.Stat = 3;
        }
        else if ($("#rpContracted").prop("checked")) {
            RP.Stat = 4;
        }
        else if ($("#rpCanceled").prop("checked")) {
            RP.Stat = 10;
        }
        else if ($("#rpRejected").prop("checked")) {
            RP.Stat = 11;
        }
        else if ($("#StartWork").prop("checked")) {
            RP.Stat = 8;
        }
        else if ($("#AllRP").prop("checked")) {
            RP.Stat = 12;
        }
        ;
        Ajax.CallAsync({
            url: Url.Action("rptSlsOffer", "GeneralReports"),
            data: RP,
            success: function (d) {
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
    function Clear() {
        //debugger;
        txtLocationCod.value = "";
        txtLocationdsc.value = "";
        txtCustomerCodeRP.value = "";
        txtSalesEngineerIdHRP.value = "";
        txtLocation.value = "";
        txtCustomercIDRP.value = "";
        txtSalesEngineerIdRP.value = "";
        txtCustomerIDRP.value = "";
        btnCustomerCodeRP.value = "";
        txtCustomerNameRP.value = "";
        txtDescECatRP.value = "";
        txtCustomercIDRP.value = "";
        txtCustomercCodeRP.value = "";
        txtCustomerName1RP.value = "";
        txtCustomerID.value = "";
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
})(OfferList || (OfferList = {}));
//# sourceMappingURL=OfferList.js.map