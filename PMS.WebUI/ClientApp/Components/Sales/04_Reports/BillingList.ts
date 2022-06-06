$(document).ready(() => {
    BillingList.InitalizeComponent();
});
namespace BillingList {
    var sys: SystemTools = new SystemTools();
    //var Model: P_D_SalesEgineer = new P_D_SalesEgineer();
    //var ajaxCall: AjaxCaller = new AjaxCaller();
    //var Area: G_BRANCH = new G_BRANCH();
    //var CatCode: P_D_SalesEgineer = new P_D_SalesEgineer();
    //var Master: P_D_SalesCustomer = new P_D_SalesCustomer();
    //export var dataSource: Array<P_D_SalesEgineer> = new Array<P_D_SalesEgineer>();
    var txtCustomerCodeRP: HTMLInputElement;
    var txtCustomerIDRP: HTMLInputElement;
    var btnCustomerCodeRP: HTMLButtonElement;
    var txtCustomerNameRP: HTMLInputElement;
    
    
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;

    var txtSalesEngineerIdRP: HTMLInputElement;
    var txtSalesEngineerIdHRP: HTMLInputElement;
    var butEngCodeRP: HTMLButtonElement;
    var txtDescECatRP: HTMLInputElement;

    var txtLocation: HTMLInputElement;
    var txtLocationdsc: HTMLInputElement;
    var btnLocation: HTMLButtonElement;
    var txtLocationCod: HTMLInputElement;
    //Just put the elements IDs  
    //var Cust: P_D_SalesCustomerCategory = new P_D_SalesCustomerCategory();
    var txtCustomercCodeRP: HTMLInputElement;
    var btnCustomerCatRP: HTMLButtonElement;
    var txtCustomerName1RP: HTMLInputElement;
    var txtCustomercIDRP: HTMLInputElement;
    var txtCustomercIDRP: HTMLInputElement;

    var _ScreenLanguage: string;
    var _BranchCode: string;
    var _CompCode: string;
    //Initalize The Current Popup
    export function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        debugger
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        _CompCode = ClientSharedWork.Session.CompCode;
        _BranchCode = ClientSharedWork.Session.BranchCode;
        InitalizeControls();
        Clear();
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
        
        txtCustomercCodeRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomercCodeRP");
        txtCustomercIDRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomercIDRP");
        btnCustomerCatRP = DocumentActions.GetElementById<HTMLButtonElement>("btnCustomerCatRP");
        txtCustomerName1RP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerName1RP");
        

        txtLocation = DocumentActions.GetElementById<HTMLInputElement>("txtLocation");
        txtLocationCod = DocumentActions.GetElementById<HTMLInputElement>("txtLocationCod");
        txtLocationdsc = DocumentActions.GetElementById<HTMLInputElement>("txtLocationdsc");
        btnLocation = DocumentActions.GetElementById<HTMLButtonElement>("btnLocation");

        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");
        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");

       
        
    }
    function InitalizeEvents() {
        debugger
        btnCustomerCodeRP.onclick = btnCustomerCode_ClickedRP;
        butEngCodeRP.onclick = btnEng_Click;
        btnCustomerCatRP.onclick = btnCustomerCat_Click;
        btnLocation.onclick = btnLocation_Click;

    }

    //Print Current Report
    function Print() {

        let RP: ReportParameters = new ReportParameters();
        debugger;
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.Custid = Number(txtCustomerIDRP.value);
        RP.EngID = Number(txtSalesEngineerIdHRP.value);
        RP.LocId = Number(txtLocation.value);
        RP.CatID = Number(txtCustomercIDRP.value);
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);

        if (<boolean>$("#rpinvoice").prop("checked") ) { RP.TypeReport = 0; }
        else if (<boolean>$("#rpphase").prop("checked") ) { RP.TypeReport = 1; }

        if (<boolean>$("#rpZero").prop("checked")) { RP.Stat= 1; }
        else if (<boolean>$("#rp5").prop("checked")) { RP.Stat= 2; }
        else if (<boolean>$("#rp15").prop("checked")) { RP.Stat=3; }
        else if (<boolean>$("#rpAll").prop("checked")) { RP.Stat= 0; }
       
        Ajax.CallAsync({
            url: Url.Action("p_rptBillingList", "GeneralReports"),
            data: RP,
            success: (d) => {
                let result = d.result as string;
                window.open(result, "_blank");
            }
        })
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
        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.ContractList, "btnLocation", Condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getLocation", "ContractList"),
                data: { id: id },
                success: (d) => {
                    let Model = d.result as P_D_Location;
                    txtLocation.value = Model.LocationId.toString();
                    txtLocationCod.value = Model.LocCode.toString();
                    txtLocationdsc.value = _ScreenLanguage == "en" ? Model.DescE : Model.DescA
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
                    var Master = d.result as P_D_SalesCustomer;
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
        sys.FindKey(Modules.Customers, "btnCustomerCatRP", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("CustomerCode", "Customers"),
                data: { _id: id },
                success: (d) => {
                    var Cust = d.result as P_D_SalesCustomerCategory;
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
        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.Customers, "butEngCodeRP", Condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getSalesEng", "Customers"),
                data: { id: id },
                success: (d) => {
                    var CatCode = d.result as P_D_SalesEgineer;
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

   

}