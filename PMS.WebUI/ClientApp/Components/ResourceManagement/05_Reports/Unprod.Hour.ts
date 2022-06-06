$(document).ready(() => {
    Unprod.Hour.InitalizeComponent();
});
namespace Unprod.Hour {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "UnprodHour";
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;


    var txtFromProjectRP: HTMLInputElement;
    var txtToProjectRP: HTMLInputElement;
    
    var txtProjectEngineerID: HTMLInputElement;
    var txtProjectEngineerRP: HTMLInputElement;
    var btnProjectEngineerRP: HTMLButtonElement;
    var txtProjectEngineer1RP: HTMLInputElement;
    
    var txtScopeCatID: HTMLInputElement;
    var txtScopeCatRP: HTMLInputElement;
    var btnScopeCatRP: HTMLButtonElement;
    var txtScopeCat1RP: HTMLInputElement;
    
    var txtScopeID: HTMLInputElement;
    var txtScopeRP: HTMLInputElement;
    var btnScopeRP: HTMLButtonElement;
    var txtScope1RP: HTMLInputElement;
    
    var txtCustomerCatID: HTMLInputElement;
    var txtCustomerCatRP: HTMLInputElement;
    var btnCustomerCatRP: HTMLButtonElement;
    var txtCustomerCat1RP: HTMLInputElement;

    var txtCustomerID: HTMLInputElement;
    var txtCustomerRP: HTMLInputElement;
    var btnCustomerRP: HTMLButtonElement;
    var txtCustomer1RP: HTMLInputElement;
    
    var txtUnProdCatID: HTMLInputElement;
    var txtUnProdCatRP: HTMLInputElement;
    var btnUnProdCatRP: HTMLButtonElement;
    var txtUnProdCat1RP: HTMLInputElement;
    
    var txtUnProdReasonID: HTMLInputElement;
    var txtUnProdReasonRP: HTMLInputElement;
    var btnUnProdReasonRP: HTMLButtonElement;
    var txtUnProdReason1RP: HTMLInputElement;
    

    var _ScreenLanguage: string;

    var _CompCode: string;
    var _BranchCode: string;
    var Condition;
    
    export function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;

        InitalizeControls();
        InitalizeEvents();

    }
    function InitalizeControls() {

        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");


        txtFromProjectRP = DocumentActions.GetElementById<HTMLInputElement>("txtFromProjectRP");
        txtToProjectRP = DocumentActions.GetElementById<HTMLInputElement>("txtToProjectRP");



        txtProjectEngineerID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectEngineerID");
        txtProjectEngineerRP = DocumentActions.GetElementById<HTMLInputElement>("txtProjectEngineerRP");
        btnProjectEngineerRP = DocumentActions.GetElementById<HTMLButtonElement>("btnProjectEngineerRP");
        txtProjectEngineer1RP = DocumentActions.GetElementById<HTMLInputElement>("txtProjectEngineer1RP");


        txtScopeCatID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCatID");
        txtScopeCatRP = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCatRP");
        btnScopeCatRP = DocumentActions.GetElementById<HTMLButtonElement>("btnScopeCatRP");
        txtScopeCat1RP = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCat1RP");

        txtScopeID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeID");
        txtScopeRP = DocumentActions.GetElementById<HTMLInputElement>("txtScopeRP");
        btnScopeRP = DocumentActions.GetElementById<HTMLButtonElement>("btnScopeRP");
        txtScope1RP = DocumentActions.GetElementById<HTMLInputElement>("txtScope1RP");


        txtCustomerCatID = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerCatID");
        txtCustomerCatRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerCatRP");
        btnCustomerCatRP = DocumentActions.GetElementById<HTMLButtonElement>("btnCustomerCatRP");
        txtCustomerCat1RP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerCat1RP");

        txtCustomerID = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerID");
        txtCustomerRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerRP");
        btnCustomerRP = DocumentActions.GetElementById<HTMLButtonElement>("btnCustomerRP");
        txtCustomer1RP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomer1RP");

        txtUnProdCatID = DocumentActions.GetElementById<HTMLInputElement>("txtUnProdCatID");
        txtUnProdCatRP = DocumentActions.GetElementById<HTMLInputElement>("txtUnProdCatRP");
        btnUnProdCatRP = DocumentActions.GetElementById<HTMLButtonElement>("btnUnProdCatRP");
        txtUnProdCat1RP = DocumentActions.GetElementById<HTMLInputElement>("txtUnProdCat1RP");

        txtUnProdReasonID = DocumentActions.GetElementById<HTMLInputElement>("txtUnProdReasonID");
        txtUnProdReasonRP = DocumentActions.GetElementById<HTMLInputElement>("txtUnProdReasonRP");
        btnUnProdReasonRP = DocumentActions.GetElementById<HTMLButtonElement>("btnUnProdReasonRP");
        txtUnProdReason1RP = DocumentActions.GetElementById<HTMLInputElement>("txtUnProdReason1RP");


    }
    function Clear() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());

        txtFromProjectRP.value = "";
        txtToProjectRP.value = "";

        txtProjectEngineerID.value = "";
        txtProjectEngineerRP.value = "";
        txtProjectEngineer1RP.value = "";


        txtScopeCatID.value = "";
        txtScopeCatRP.value = "";
        txtScopeCat1RP.value = "";

        txtScopeID.value = "";
        txtScopeRP.value = "";
        txtScope1RP.value = "";

        txtCustomerCatID.value = "";
        txtCustomerCatRP.value = "";
        txtCustomerCat1RP.value = "";

        txtCustomerID.value = "";
        txtCustomerRP.value = "";
        txtCustomer1RP.value = "";


        txtUnProdCatID.value = "";
        txtUnProdCatRP.value = "";
        txtUnProdCat1RP.value = "";


        txtUnProdReasonID.value = "";
        txtUnProdReasonRP.value = "";
        txtUnProdReason1RP.value = "";


   
    }
    function Print() {
        debugger
        let RP: ReportParameters = new ReportParameters();

        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        RP.FromProjCode = Number(txtFromProjectRP.value).toString();
        RP.ToProjCode = Number(txtToProjectRP.value).toString();
        RP.EngID = Number(txtProjectEngineerID.value);
        RP.custClassID = Number(txtCustomerCatID.value);
        RP.customerID = Number(txtCustomerID.value);
        RP.scopeClassId = Number(txtScopeCatID.value);
        RP.ScopeID = Number(txtScopeID.value);
        RP.UnProdId    = Number(txtUnProdCatID.value);
        RP.UnprodCatID = Number(txtUnProdReasonID.value);
        if (DateFormat(FromDate.value) == "NaN-NaN-NaN" || DateFormat(ToDate.value) == "NaN-NaN-NaN") {
            MessageBox.Show(" you must select Date", "Info");
           
        }
        
        else if (DateFormat(FromDate.value) > DateFormat(ToDate.value)) {
            MessageBox.Show(" From date  is largethan To Date", "Info");
            
        }
        
        else {

        
        if (<boolean>$("#RAD_summarybyproject").prop("checked")) {
            RP.TypeReport = 1;
            Ajax.CallAsync({
                url: Url.Action("rptRes_UnprodHour_print", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }

        if (<boolean>$("#RAD_detailseng").prop("checked")) {
            RP.TypeReport = 2;
            Ajax.CallAsync({
                url: Url.Action("rptRes_UnprodHour_print", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }

       

        }




    }

    function InitalizeEvents() {
        debugger
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        $("#RAD_summarybyproject").prop("checked", "checked");
        btnProjectEngineerRP.onclick = btnProjectEngineerRP_Click;
        btnScopeCatRP.onclick = btnScopeCatRP_Click;
        btnScopeRP.onclick = btnScopeRP_Click;
        btnCustomerCatRP.onclick = btnCustomerCatRP_Click;
        btnCustomerRP.onclick = btnCustomerRP_Click;
        btnUnProdCatRP.onclick = btnUnProdCatRP_Click;
        btnUnProdReasonRP.onclick = btnUnProdReasonRP_Click;
        
     
    }

    function btnProjectEngineerRP_Click() {
        debugger;
        sys.FindKey(Modules.LateandAbsence, "butEng_Code", Condition, () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProjectEng", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as P_D_SiteEngineer;
                    txtProjectEngineerID.value = result.SiteEngineerId.toString();
                    txtProjectEngineerRP.value = result.EngCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtProjectEngineer1RP.value = result.DescA;
                    }
                    else {
                        txtProjectEngineer1RP.value = result.DescE;
                    }

                }
            });
        })
    }
  
    function btnScopeCatRP_Click() {
        debugger;
        sys.FindKey(Modules.UnprodHour, "btnScopeCatRP", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSearchScopCat", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    debugger;
                    let result = d.result as P_D_ScopeCategory;
                    txtScopeCatID.value = result.ScopeCategoryID.toString();
                    txtScopeCatRP.value = result.ScopeCategCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtScopeCat1RP.value = result.DescA;
                    }
                    else {
                        txtScopeCat1RP.value = result.DescE;
                    }

                }
            });
        })
    }
    function btnScopeRP_Click() {
        debugger;
        sys.FindKey(Modules.UnprodHour, "btnScopeRP", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetScope", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_Scope;
                    txtScopeID.value = result.ScopeID.toString();
                    txtScopeRP.value = result.ScopeCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtScope1RP.value = result.DescA.toString();
                    }
                    else {
                        txtScope1RP.value = result.DescE.toString();
                    }

                }
            });
        })
    }
    function btnCustomerCatRP_Click() {
        debugger;
        sys.FindKey(Modules.UnprodHour, "btnCustomerCatRP", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchCustomerCat", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_SalesCustomerCategory;
                    txtCustomerCatID.value = result.CustomerCategoryID.toString();
                    txtCustomerCatRP.value = result.CustomerCatCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtCustomerCat1RP.value = result.DescA;
                    }
                    else {
                        txtCustomerCat1RP.value = result.DescE;
                    }

                }
            });
        })
    }
    function btnCustomerRP_Click() {
        debugger;
        sys.FindKey(Modules.UnprodHour, "btnCustomerRP", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomer", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_SalesCustomer;
                    txtCustomerID.value = result.CustomerID.toString();
                    txtCustomerRP.value = result.CustomerCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtCustomer1RP.value = result.DescA.toString();
                    }
                    else {
                        txtCustomer1RP.value = result.DescE.toString();
                    }

                }
            });
        })
    }
    function btnUnProdCatRP_Click() {
        debugger;
        sys.FindKey(Modules.UnprodHour, "btnUnProdCatRP", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetUnProdCategory", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_UnProdCategory;
                    txtUnProdCatID.value = result.UnProdCategoryID.toString();
                    txtUnProdCatRP.value = result.CategCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtUnProdCat1RP.value = result.DescA.toString();
                    }
                    else {
                        txtUnProdCat1RP.value = result.DescE.toString();
                    }

                }
            });
        })
    }    
    function btnUnProdReasonRP_Click() {
        debugger;
        sys.FindKey(Modules.UnprodHour, "btnUnProdReasonRP", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetUnProdReason", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_UnProdReason;
                    txtUnProdReasonID.value = result.UnProdReasonId.toString();
                    txtUnProdReasonRP.value = result.ReasonCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtUnProdReason1RP.value = result.DescA.toString();
                    }
                    else {
                        txtUnProdReason1RP.value = result.DescE.toString();
                    }

                }
            });
        })
    }



}