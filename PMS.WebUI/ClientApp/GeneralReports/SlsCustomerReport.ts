$(document).ready(() => {
    SlsCustomerReport.InitalizeComponent();
});
namespace SlsCustomerReport {
    var sys: SystemTools = new SystemTools();
    var Model: P_D_SalesEgineer = new P_D_SalesEgineer();
    var ajaxCall: AjaxCaller = new AjaxCaller();
    var Area: G_BRANCH = new G_BRANCH();
    var CatCode: P_D_SalesEgineer = new P_D_SalesEgineer();
    var Master: P_D_SalesCustomer = new P_D_SalesCustomer();
    export var dataSource: Array<P_D_SalesEgineer> = new Array<P_D_SalesEgineer>();
    var txtCustomerCodeRP: HTMLInputElement;
    var txtCustomerIDRP  : HTMLInputElement;
    var btnCustomerCodeRP: HTMLButtonElement;
    var txtCustomerNameRP: HTMLInputElement;
    var txtCustomerID: HTMLInputElement;
    var txtCustomerCodeRP2: HTMLInputElement;
    var txtCustomerIDRP2  : HTMLInputElement;
    var btnCustomerCodeRP2: HTMLButtonElement;
    var txtCustomerNameRP2: HTMLInputElement;
    var txtCustomercIDRP: HTMLInputElement;
    
    var txtSalesEngineerIdRP: HTMLInputElement;
    
    var txtSalesEngineerIdHRP: HTMLInputElement;
    var butEngCodeRP : HTMLButtonElement;
    var txtDescECatRP: HTMLInputElement;
    var txtBraCodeRP: HTMLInputElement=null;
    var txtAreaNameRP: HTMLInputElement;
    var btnAreaRP: HTMLButtonElement;
    //Just put the elements IDs  
    var Cust: P_D_SalesCustomerCategory = new P_D_SalesCustomerCategory();
     var txtCustomercCodeRP: HTMLInputElement;
    var  btnCustomerCatRP   : HTMLButtonElement;
    var  txtCustomerName1RP: HTMLInputElement;
    //Initalize The Current Popup
    export function InitalizeComponent() {
        
        //SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        InitalizeControls();
        InitalizeEvents();
        
    }
    function InitalizeControls() {

        txtCustomerCodeRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerCodeRP");
        txtCustomerIDRP   = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerIDRP");
        btnCustomerCodeRP = DocumentActions.GetElementById<HTMLButtonElement>("btnCustomerCodeRP");
        txtCustomerNameRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerNameRP");

        txtCustomerCodeRP2 = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerCodeRP2");
        txtCustomerIDRP2 = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerIDRP2");
        btnCustomerCodeRP2 = DocumentActions.GetElementById<HTMLButtonElement>("btnCustomerCodeRP2");
        txtCustomerNameRP2 = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerNameRP2");
        txtSalesEngineerIdHRP = DocumentActions.GetElementById<HTMLInputElement>("txtSalesEngineerIdHRP");
        txtSalesEngineerIdRP = DocumentActions.GetElementById<HTMLInputElement>("txtSalesEngineerIdRP");
        butEngCodeRP = DocumentActions.GetElementById<HTMLButtonElement>("butEngCodeRP");
        txtDescECatRP = DocumentActions.GetElementById<HTMLInputElement>("txtDescECatRP");
        txtCustomercIDRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomercIDRP");
         txtBraCodeRP = DocumentActions.GetElementById<HTMLInputElement>("txtBraCodeRP");
        txtAreaNameRP = DocumentActions.GetElementById<HTMLInputElement>("txtAreaNameRP");
        btnAreaRP = DocumentActions.GetElementById<HTMLButtonElement>("btnAreaRP");
      
        txtCustomercCodeRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomercCodeRP");
        btnCustomerCatRP = DocumentActions.GetElementById<HTMLButtonElement>("btnCustomerCatRP");
        txtCustomerName1RP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerName1RP");
       // txtBraCodeRP.value = "";
        txtCustomerID = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerID");
    }
    function InitalizeEvents() {
        debugger
        btnCustomerCodeRP.onclick = btnCustomerCode_ClickedRP;
        btnCustomerCodeRP2.onclick = btnCustomerCode_ClickedRP2;
        butEngCodeRP.onclick = btnEng_Click;
        btnCustomerCatRP.onclick = btnCustomerCat_Click;
        btnAreaRP.onclick = btnBraCode_Click;
    }
   
    //Print Current Report
    function Print() {
        let RP: ReportParameters = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;

        if (<boolean>$("#RDCustList").prop("checked")) {
            RP.FromCustNo = Number(txtCustomerCodeRP.value);
            RP.ToCustNo = Number(txtCustomerCodeRP2.value);
            RP.EngID = Number(txtSalesEngineerIdHRP.value);
            RP.bra = Number(txtBraCodeRP.value);
            RP.CatID = Number(txtCustomercIDRP.value);
            if (<boolean>$("#ActiveRP").prop("checked")) { RP.Active = 1; }
            else if (<boolean>$("#NoActiveRP").prop("checked")) { RP.Active = 0; }
            else if (<boolean>$("#AllRP").prop("checked")) { RP.Active = null; };

            if (<boolean>$("#TempRP").prop("checked")) { RP.Temp = 1; }
            else if (<boolean>$("#NoTempRP").prop("checked")) { RP.Temp = 0; }
            else if (<boolean>$("#AllTempRP").prop("checked")) { RP.Temp = null; };

            Ajax.CallAsync({
                url: Url.Action("rptSlsCustList", "GeneralReports"),
                data: RP,
                success: (d) => {
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }
        if (<boolean>$("#RDCustCard").prop("checked")) {
            
            RP.Custid = Number(txtCustomerID.value);
            Ajax.CallAsync({
                url: Url.Action("rptSlsCustCard", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }
        
         
    }
    function Clear() {
        txtAreaNameRP.value = "";
      txtBraCodeRP.value = "";
      $("#AllRP").prop("checked", "checked");
       }
   
    function btnBraCode_Click() {
        sys.FindKey(Modules.Customers, "btnAreaRP", "COMP_CODE = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "SalesEngineer"),
                data: { id: id },
                success: (d) => {
                    Area = d.result as G_BRANCH;
                 txtBraCodeRP.value = Area.BRA_CODE.toString();
                 txtAreaNameRP.value = Area.BRA_DESC.toString();
                }
            });
        });
    }
   function btnCustomerCode_ClickedRP() {
        sys.FindKey(Modules.Customers, "btnCustomerCodeRP", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByID", "Customers"),
                data: { id: id },
                success: (d) => {
                    Master = d.result as P_D_SalesCustomer;
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
        sys.FindKey(Modules.Customers, "btnCustomerCodeRP2", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByID", "Customers"),
                data: { id: id },
                success: (d) => {
                    Master = d.result as P_D_SalesCustomer;
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
        
        sys.FindKey(Modules.Customers, "butEngCodeRP", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getSalesEng", "Customers"),
                data: { id: id },
                success: (d) => {
                    CatCode = d.result as P_D_SalesEgineer;
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
        sys.FindKey(Modules.Customers, "btnCustomerCatRP", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("CustomerCode", "Customers"),
                data: { _id: id },
                success: (d) => {
                    Cust = d.result as P_D_SalesCustomerCategory;
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

}