$(document).ready(() => {
    debugger
    ProductionVsBilling.InitalizeComponent();
});
namespace ProductionVsBilling {
    debugger
    var sys: SystemTools = new SystemTools();
    var Model: P_D_SalesEgineer = new P_D_SalesEgineer();
    
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
    var txtFromProjCode: HTMLInputElement;
    var txtToProjCode: HTMLInputElement; 
    var _ScreenLanguage: string;
    export function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
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
        txtFromProjCode = DocumentActions.GetElementById<HTMLInputElement>("txtFromProjCode");
        txtToProjCode = DocumentActions.GetElementById<HTMLInputElement>("txtToProjCode");
        txtCustomercCodeRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomercCodeRP");
        btnCustomerCatRP = DocumentActions.GetElementById<HTMLButtonElement>("btnCustomerCatRP");
        txtCustomerName1RP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerName1RP");
        txtCustomerID = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerID");
        txtFromProjCode.value = "1"; 
        txtToProjCode.value = "999999";
    }
    function InitalizeEvents() {
        
        btnCustomerCodeRP.onclick = btnCustomerCode_ClickedRP;
        butEngCodeRP.onclick = btnEng_Click;
        btnCustomerCatRP.onclick = btnCustomerCat_Click;
       
    }

    function Print() {

        let RP: ReportParameters = new ReportParameters();
    
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

        if (<boolean>$("#RDProdVsBill").prop("checked")) {
            RP.TypeReport = 4;
            Ajax.CallAsync({
                url: Url.Action("rptSlsProductionBillt", "GeneralReports"),
                data: RP,
                success: (d) => {
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }


        if (<boolean>$("#RDProjBlanc").prop("checked")) {
           
            Ajax.CallAsync({
                url: Url.Action("rptSlsProductionProject", "GeneralReports"),
                data: RP,
                success: (d) => {
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }
        if (<boolean>$("#RDProdcutList").prop("checked")) {
            RP.TypeReport = 1;
            Ajax.CallAsync({
                url: Url.Action("rptSlsProdctionList", "GeneralReports"),
                data: RP,
                success: (d) => {
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }

        if (<boolean>$("#RDByCustomer").prop("checked")) {
            RP.TypeReport = 2;
            Ajax.CallAsync({
                url: Url.Action("rptSlsProdction", "GeneralReports"),
                data: RP,
                success: (d) => {
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }

        if (<boolean>$("#RDBillingList").prop("checked")) {
            RP.TypeReport = 3;
            Ajax.CallAsync({
                url: Url.Action("rptSlsProdctioninvoes", "GeneralReports"),
                data: RP,
                success: (d) => {
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }
       
        if (<boolean>$("#RDCustBlanc").prop("checked")) {

            Ajax.CallAsync({
                url: Url.Action("rptSlsProdctionCustomer", "GeneralReports"),
                data: RP,
                success: (d) => {
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
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
        sys.FindKey(Modules.Customers, "butEngCodeRP", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
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
        debugger;
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

}