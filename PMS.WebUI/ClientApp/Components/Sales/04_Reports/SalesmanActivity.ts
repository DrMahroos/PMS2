$(document).ready(() => {
    debugger
    SalesmanActivity.InitalizeComponent();
});
namespace SalesmanActivity {
    var sys: SystemTools = new SystemTools();
    var Model: P_D_SalesEgineer = new P_D_SalesEgineer();
    //var ajaxCall: AjaxCaller = new AjaxCaller();
    var Area: G_BRANCH = new G_BRANCH();
    var CatCode: P_D_SalesEgineer = new P_D_SalesEgineer();
    var Master: P_D_SalesCustomer = new P_D_SalesCustomer();
    var txtCustomerCodeRP: HTMLInputElement;
    var txtCustomerIDRP: HTMLInputElement;
    var btnCustomerCodeRP: HTMLButtonElement;
    var txtCustomerNameRP: HTMLInputElement;
    var txtCustomerID: HTMLInputElement;
    var txtCustomercIDRP: HTMLInputElement;
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;
    var txtSalesEngineerIdRP: HTMLInputElement;

    var txtSalesEngineerIdHRP: HTMLInputElement;
    var butEngCodeRP: HTMLButtonElement;
    var txtDescECatRP: HTMLInputElement;
    var txtBraCodeRP: HTMLInputElement = null;
    var txtAreaNameRP: HTMLInputElement;
    var btnAreaRP: HTMLButtonElement;
    //Just put the elements IDs  
    var Cust: P_D_SalesCustomerCategory = new P_D_SalesCustomerCategory();
    var txtCustomercCodeRP: HTMLInputElement;
    var btnCustomerCatRP: HTMLButtonElement;
    var txtCustomerName1RP: HTMLInputElement;
    var _ScreenLanguage: string;
    var _BranchCode: string;
    var _CompCode: string;
    //Initalize The Current Popup
    export function InitalizeComponent() {
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
    function InitalizeControls() {

        txtCustomerCodeRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerCodeRP");
        txtCustomerIDRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerIDRP");
        btnCustomerCodeRP = DocumentActions.GetElementById<HTMLButtonElement>("btnCustomerCodeRP");
        txtCustomerNameRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerNameRP");
        txtSalesEngineerIdHRP = DocumentActions.GetElementById<HTMLInputElement>("txtSalesEngineerIdHRP");
        txtSalesEngineerIdRP = DocumentActions.GetElementById<HTMLInputElement>("txtSalesEngineerIdRP");
        butEngCodeRP = DocumentActions.GetElementById<HTMLButtonElement>("butEngCodeRP");
        txtDescECatRP = DocumentActions.GetElementById<HTMLInputElement>("txtDescECatRP");
        txtCustomercIDRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomercIDRP");
        txtBraCodeRP = DocumentActions.GetElementById<HTMLInputElement>("txtBraCodeRP");
        txtAreaNameRP = DocumentActions.GetElementById<HTMLInputElement>("txtAreaNameRP");
        btnAreaRP = DocumentActions.GetElementById<HTMLButtonElement>("btnAreaRP");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");
        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        txtCustomercCodeRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomercCodeRP");
        btnCustomerCatRP = DocumentActions.GetElementById<HTMLButtonElement>("btnCustomerCatRP");
        txtCustomerName1RP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerName1RP");
        // txtBraCodeRP.value = "";
        txtCustomerID = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerID");
    }
    function InitalizeEvents() {
        debugger
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
        sys.FindKey(Modules.Customers, "btnCustomerCodeRP", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByID", "Customers"),
                data: { id: id },
                success: (d) => {
                    Master = d.result as P_D_SalesCustomer;
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
        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.Customers, "butEngCodeRP", Condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getSalesEng", "Customers"),
                data: { id: id },
                success: (d) => {
                    CatCode = d.result as P_D_SalesEgineer;
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
        sys.FindKey(Modules.Customers, "btnCustomerCatRP", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("CustomerCode", "Customers"),
                data: { _id: id },
                success: (d) => {
                    Cust = d.result as P_D_SalesCustomerCategory;
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

        let RP: ReportParameters = new ReportParameters();

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
            success: (d) => {
                debugger
                let result = d.result as string;
                window.open(result, "_blank");
            }
        })
    }
}