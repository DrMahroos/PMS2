$(document).ready(function () {
    debugger;
    SalesmanActivity.InitalizeComponent();
});
var SalesmanActivity;
(function (SalesmanActivity) {
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
    var _ScreenLanguage;
    var _BranchCode;
    var _CompCode;
    //Initalize The Current Popup
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        _CompCode = ClientSharedWork.Session.CompCode;
        _BranchCode = ClientSharedWork.Session.BranchCode;
        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
    }
    SalesmanActivity.InitalizeComponent = InitalizeComponent;
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
        //btnAreaRP.onclick = btnBraCode_Click;
    }
    function Clear() {
        //debugger;
        txtAreaNameRP.value = "";
        txtBraCodeRP.value = "";
        txtCustomerCodeRP.value = "";
        txtSalesEngineerIdHRP.value = "";
        txtBraCodeRP.value = "";
        txtCustomercIDRP.value = "";
        txtSalesEngineerIdRP.value = "";
        txtDescECatRP.value = "";
        txtCustomerNameRP.value = "";
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
    //function btnBraCode_Click() {
    //    sys.FindKey(Modules.Customers, "btnAreaRP", "COMP_CODE = " + ClientSharedWork.Session.CompCode, () => {
    //        let id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("getArea", "SalesEngineer"),
    //            data: { id: id },
    //            success: (d) => {
    //                Area = d.result as G_BRANCH;
    //                txtBraCodeRP.value = Area.BRA_CODE.toString();
    //                if (_ScreenLanguage == "ar")
    //                    txtAreaNameRP.value = Area.BRA_DESCL.toString();
    //                else
    //                    txtAreaNameRP.value = Area.BRA_DESC.toString();
    //            }
    //        });
    //    });
    //}
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
    //Print Current Report
    function Print() {
        var RP = new ReportParameters();
        debugger;
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.Custid = Number(txtCustomerIDRP.value);
        RP.EngID = Number(txtSalesEngineerIdHRP.value);
        RP.CatID = Number(txtCustomercIDRP.value);
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        Ajax.CallAsync({
            url: Url.Action("rptSlsEngineerActivity", "GeneralReports"),
            data: RP,
            success: function (d) {
                debugger;
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(SalesmanActivity || (SalesmanActivity = {}));
//# sourceMappingURL=SalesmanActivity.js.map