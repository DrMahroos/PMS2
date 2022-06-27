$(document).ready(() => {
     
    TaxInvoicelist.InitalizeComponent();
});
 
namespace TaxInvoicelist {
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

    var txtCustomerCode: HTMLInputElement;
    var txtCustomerID: HTMLInputElement;
    var btnCustomer: HTMLButtonElement;
    var txtCustomerName: HTMLInputElement;
    //var txtCustomercIDRP: HTMLInputElement;
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;
    var txtSalesEngineerIdRP: HTMLInputElement;

    var txtSalesEngineerIdHRP: HTMLInputElement;
    var butEngCodeRP: HTMLButtonElement;
    var txtDescECatRP: HTMLInputElement;
    var txtBraCodeRP: HTMLInputElement = null;
    var txtAreaNameRP: HTMLInputElement;
    var btnAreaRP: HTMLButtonElement;
    var txtProjectID: HTMLInputElement;
    var txtProjectRP: HTMLInputElement;
    var btnProjectRP: HTMLButtonElement;
    var txtProject1RP: HTMLInputElement;

    var txttoProjectID: HTMLInputElement;
    var txttoProjectRP: HTMLInputElement;
    var btntoProjectRP: HTMLButtonElement;
    var txttoProject1RP: HTMLInputElement;

        
    var redDownpayment: HTMLInputElement;
    var redCrdb: HTMLInputElement;
    var redProgress: HTMLInputElement;
     //Just put the elements IDs  
    var Cust: P_D_SalesCustomerCategory = new P_D_SalesCustomerCategory();
    
    var _ScreenLanguage: string;
    var _BranchCode: string;
    var _CompCode: string;
    var Condition: string;
    //Initalize The Current Popup
    export function InitalizeComponent() {
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
    function InitalizeControls() {

        txtCustomerCodeRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerCodeRP");
        txtCustomerIDRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerIDRP");
        btnCustomerCodeRP = DocumentActions.GetElementById<HTMLButtonElement>("btnCustomerCodeRP");
        txtCustomerNameRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerNameRP");

        txtCustomerCode = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerCode");
        txtCustomerID = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerID");
        btnCustomer = DocumentActions.GetElementById<HTMLButtonElement>("btnCustomer");
        txtCustomerName = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerName");

        txtSalesEngineerIdHRP = DocumentActions.GetElementById<HTMLInputElement>("txtSalesEngineerIdHRP");
        txtSalesEngineerIdRP = DocumentActions.GetElementById<HTMLInputElement>("txtSalesEngineerIdRP");
        butEngCodeRP = DocumentActions.GetElementById<HTMLButtonElement>("butEngCodeRP");
        txtDescECatRP = DocumentActions.GetElementById<HTMLInputElement>("txtDescECatRP");
        txtBraCodeRP = DocumentActions.GetElementById<HTMLInputElement>("txtBraCodeRP");
        txtAreaNameRP = DocumentActions.GetElementById<HTMLInputElement>("txtAreaNameRP");
        btnAreaRP = DocumentActions.GetElementById<HTMLButtonElement>("btnAreaRP");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");
        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        txtCustomerID = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerID");

        txtProjectID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectID");
        txtProjectRP = DocumentActions.GetElementById<HTMLInputElement>("txtProjectRP");
        btnProjectRP = DocumentActions.GetElementById<HTMLButtonElement>("btnProjectRP");
        txtProject1RP = DocumentActions.GetElementById<HTMLInputElement>("txtProject1RP");

        txttoProjectID = DocumentActions.GetElementById<HTMLInputElement>("txttoProjectID");
        txttoProjectRP = DocumentActions.GetElementById<HTMLInputElement>("txttoProjectRP");
        btntoProjectRP = DocumentActions.GetElementById<HTMLButtonElement>("btntoProjectRP");
        txttoProject1RP = DocumentActions.GetElementById<HTMLInputElement>("txttoProject1RP");

        redProgress = DocumentActions.GetElementById<HTMLInputElement>("redProgress");
        redDownpayment = DocumentActions.GetElementById<HTMLInputElement>("redDownpayment");
        redCrdb = DocumentActions.GetElementById<HTMLInputElement>("redCrdb");
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
        sys.FindKey(Modules.TaxInvoicelist, "btnCustomerCodeRP", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
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
    function btnCustomer_Clicked() {
        sys.FindKey(Modules.TaxInvoicelist, "btnCustomer", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByID", "Customers"),
                data: { id: id },
                success: (d) => {
                    Master = d.result as P_D_SalesCustomer;
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

        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.TaxInvoicelist, "butEngCodeRP", Condition, () => {
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
    function ToProjectRP_Click() {
         sys.FindKey(Modules.TaxInvoicelist, "btntoSearchProject", Condition, () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProjectEng", "ProjItemsInventory"),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as P_TR_EngProject;
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
        })
    }
    function FromProjectRP_Click() {
         sys.FindKey(Modules.TaxInvoicelist, "btnSearchProject", Condition, () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProjectEng", "ProjItemsInventory"),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as P_TR_EngProject;
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
        })
    }

    //Print Current Report
    function Print() {

        let RP: ReportParameters = new ReportParameters();
       

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
        else if (redCrdb.checked == true) {
            RP.GroupType =3;
        }
        Ajax.CallAsync({
            //CRMReport
            url: Url.Action("rptSlsinvoices", "GeneralReports"),
            data: RP,
            success: (d) => {

                let result = d.result as string;
                window.open(result, "_blank");
            }
        })
    }
}