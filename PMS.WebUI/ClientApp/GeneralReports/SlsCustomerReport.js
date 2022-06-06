$(document).ready(function () {
    SlsCustomerReport.InitalizeComponent();
});
var SlsCustomerReport;
(function (SlsCustomerReport) {
    var sys = new SystemTools();
    var Model = new P_D_SalesEgineer();
    var ajaxCall = new AjaxCaller();
    var Area = new G_BRANCH();
    var CatCode = new P_D_SalesEgineer();
    var Master = new P_D_SalesCustomer();
    SlsCustomerReport.dataSource = new Array();
    var txtCustomerCodeRP;
    var txtCustomerIDRP;
    var btnCustomerCodeRP;
    var txtCustomerNameRP;
    var txtCustomerID;
    var txtCustomerCodeRP2;
    var txtCustomerIDRP2;
    var btnCustomerCodeRP2;
    var txtCustomerNameRP2;
    var txtCustomercIDRP;
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
    //Initalize The Current Popup
    function InitalizeComponent() {
        //SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        InitalizeControls();
        InitalizeEvents();
    }
    SlsCustomerReport.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtCustomerCodeRP = DocumentActions.GetElementById("txtCustomerCodeRP");
        txtCustomerIDRP = DocumentActions.GetElementById("txtCustomerIDRP");
        btnCustomerCodeRP = DocumentActions.GetElementById("btnCustomerCodeRP");
        txtCustomerNameRP = DocumentActions.GetElementById("txtCustomerNameRP");
        txtCustomerCodeRP2 = DocumentActions.GetElementById("txtCustomerCodeRP2");
        txtCustomerIDRP2 = DocumentActions.GetElementById("txtCustomerIDRP2");
        btnCustomerCodeRP2 = DocumentActions.GetElementById("btnCustomerCodeRP2");
        txtCustomerNameRP2 = DocumentActions.GetElementById("txtCustomerNameRP2");
        txtSalesEngineerIdHRP = DocumentActions.GetElementById("txtSalesEngineerIdHRP");
        txtSalesEngineerIdRP = DocumentActions.GetElementById("txtSalesEngineerIdRP");
        butEngCodeRP = DocumentActions.GetElementById("butEngCodeRP");
        txtDescECatRP = DocumentActions.GetElementById("txtDescECatRP");
        txtCustomercIDRP = DocumentActions.GetElementById("txtCustomercIDRP");
        txtBraCodeRP = DocumentActions.GetElementById("txtBraCodeRP");
        txtAreaNameRP = DocumentActions.GetElementById("txtAreaNameRP");
        btnAreaRP = DocumentActions.GetElementById("btnAreaRP");
        txtCustomercCodeRP = DocumentActions.GetElementById("txtCustomercCodeRP");
        btnCustomerCatRP = DocumentActions.GetElementById("btnCustomerCatRP");
        txtCustomerName1RP = DocumentActions.GetElementById("txtCustomerName1RP");
        // txtBraCodeRP.value = "";
        txtCustomerID = DocumentActions.GetElementById("txtCustomerID");
    }
    function InitalizeEvents() {
        debugger;
        btnCustomerCodeRP.onclick = btnCustomerCode_ClickedRP;
        btnCustomerCodeRP2.onclick = btnCustomerCode_ClickedRP2;
        butEngCodeRP.onclick = btnEng_Click;
        btnCustomerCatRP.onclick = btnCustomerCat_Click;
        btnAreaRP.onclick = btnBraCode_Click;
    }
    //Print Current Report
    function Print() {
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        if ($("#RDCustList").prop("checked")) {
            RP.FromCustNo = Number(txtCustomerCodeRP.value);
            RP.ToCustNo = Number(txtCustomerCodeRP2.value);
            RP.EngID = Number(txtSalesEngineerIdHRP.value);
            RP.bra = Number(txtBraCodeRP.value);
            RP.CatID = Number(txtCustomercIDRP.value);
            if ($("#ActiveRP").prop("checked")) {
                RP.Active = 1;
            }
            else if ($("#NoActiveRP").prop("checked")) {
                RP.Active = 0;
            }
            else if ($("#AllRP").prop("checked")) {
                RP.Active = null;
            }
            ;
            if ($("#TempRP").prop("checked")) {
                RP.Temp = 1;
            }
            else if ($("#NoTempRP").prop("checked")) {
                RP.Temp = 0;
            }
            else if ($("#AllTempRP").prop("checked")) {
                RP.Temp = null;
            }
            ;
            Ajax.CallAsync({
                url: Url.Action("rptSlsCustList", "GeneralReports"),
                data: RP,
                success: function (d) {
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        if ($("#RDCustCard").prop("checked")) {
            RP.Custid = Number(txtCustomerID.value);
            Ajax.CallAsync({
                url: Url.Action("rptSlsCustCard", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
    }
    function Clear() {
        txtAreaNameRP.value = "";
        txtBraCodeRP.value = "";
        $("#AllRP").prop("checked", "checked");
    }
    function btnBraCode_Click() {
        sys.FindKey(Modules.Customers, "btnAreaRP", "COMP_CODE = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "SalesEngineer"),
                data: { id: id },
                success: function (d) {
                    Area = d.result;
                    txtBraCodeRP.value = Area.BRA_CODE.toString();
                    txtAreaNameRP.value = Area.BRA_DESC.toString();
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
                    //txtCustomerIDRP.value = Master.CustomerID.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar")
                        txtCustomerNameRP.value = Master.DescA.toString();
                    else
                        txtCustomerNameRP.value = Master.DescE.toString();
                }
            });
        });
    }
    function btnCustomerCode_ClickedRP2() {
        sys.FindKey(Modules.Customers, "btnCustomerCodeRP2", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByID", "Customers"),
                data: { id: id },
                success: function (d) {
                    Master = d.result;
                    txtCustomerCodeRP2.value = Master.CustomerCode.toString();
                    //  txtCustomerIDRP2.value = Master.CustomerID.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar")
                        txtCustomerNameRP2.value = Master.DescA.toString();
                    else
                        txtCustomerNameRP2.value = Master.DescE.toString();
                }
            });
        });
    }
    function btnEng_Click() {
        sys.FindKey(Modules.Customers, "butEngCodeRP", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getSalesEng", "Customers"),
                data: { id: id },
                success: function (d) {
                    CatCode = d.result;
                    txtSalesEngineerIdRP.value = CatCode.EngCode.toString();
                    txtSalesEngineerIdHRP.value = CatCode.SalesEngineerId.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar")
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
                    if (ClientSharedWork.Session.ScreenLanguage == "ar")
                        txtCustomerName1RP.value = Cust.DescA;
                    else
                        txtCustomerName1RP.value = Cust.DescE;
                }
            });
        });
    }
})(SlsCustomerReport || (SlsCustomerReport = {}));
//# sourceMappingURL=SlsCustomerReport.js.map