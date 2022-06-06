$(document).ready(() => {
    ProjectPhaseDistribution.InitalizeComponent();
});
namespace ProjectPhaseDistribution {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "ProjectPhaseDistribution";

    var categ: P_D_ScopeCategory = new P_D_ScopeCategory();
    var Model: P_D_SiteEngineer = new P_D_SiteEngineer();
    var txtArea: HTMLInputElement;
    var txtSel: HTMLInputElement;
    var txtCustClass: HTMLInputElement;
    var txtCust: HTMLInputElement;
    var txtSiteEngID: HTMLInputElement;
    var txtScopeID: HTMLInputElement;
    var txtScopeCatID: HTMLInputElement;
   
    

    var txtAreaDes: HTMLInputElement;
    var txtSalDesc: HTMLInputElement;
    var txtCustClassDes: HTMLInputElement;
    var txtCustIDDes: HTMLInputElement;
    var txtSiteEngCodeDes: HTMLInputElement;
    var txtScopeCatDes: HTMLInputElement;
    var txtScopeCodeDes: HTMLInputElement;
   


    var txtAreaCod: HTMLInputElement;
    var txtSelCod: HTMLInputElement;
    var txtCustClassCod: HTMLInputElement;
    var txtCustCod: HTMLInputElement;
    var txtSiteEngCode: HTMLInputElement;
    var txtScopeCode: HTMLInputElement;
    var txtScopeCatCod: HTMLInputElement;

    var btnArea: HTMLButtonElement;
    var btnSalesID: HTMLButtonElement;
    var btnCustClassID: HTMLButtonElement;
    var btnCustID: HTMLButtonElement;
    var btnSiteEngID: HTMLButtonElement;
    var btnScopeCatID: HTMLButtonElement;
    var butScope_Code: HTMLButtonElement;


    var RedSalEng: HTMLInputElement;
    var RedScope: HTMLInputElement;


    var RedAllProject: HTMLInputElement;
    var RedNonRepair: HTMLInputElement;
    var RedRepair: HTMLInputElement;



    var RedNew: HTMLInputElement;
    var Redworking: HTMLInputElement;
    var RedHold: HTMLInputElement;
    var RedSuspended: HTMLInputElement;
    var Redfinish: HTMLInputElement;
    var RedAll: HTMLInputElement;

    var _CompCode: string;
    var _BranchCode: string;
    
    var _ScreenLanguage: string;

    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

    export function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();

        InitalizeEvents();

        //getbranchname();
    }
    function InitalizeControls() {

        //---------- textID---------

         txtSiteEngID = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngID");
        txtSel = DocumentActions.GetElementById<HTMLInputElement>("txtSel");
        txtCustClass = DocumentActions.GetElementById<HTMLInputElement>("txtCustClass");
        txtCust = DocumentActions.GetElementById<HTMLInputElement>("txtCust");
        txtScopeCatID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCatID");
        txtScopeID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeID");

        //---------- textDes---------

          txtSiteEngCodeDes = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngCodeDes");
        txtSalDesc = DocumentActions.GetElementById<HTMLInputElement>("txtSalDesc");
        txtCustClassDes = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassDes");
        txtCustIDDes = DocumentActions.GetElementById<HTMLInputElement>("txtCustIDDes");
        txtScopeCatDes = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCatDes");
        txtScopeCodeDes = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCodeDes");

        //---------- textcood---------

         txtSiteEngCode = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngCode");
        txtSelCod = DocumentActions.GetElementById<HTMLInputElement>("txtSelCod");
        txtCustClassCod = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassCod");
        txtCustCod = DocumentActions.GetElementById<HTMLInputElement>("txtCustCod");
        txtScopeCode = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCode");
        txtScopeCatCod = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCatCod");


        //---------- btn---------

         btnSalesID = DocumentActions.GetElementById<HTMLButtonElement>("btnSalesID");
        btnCustClassID = DocumentActions.GetElementById<HTMLButtonElement>("btnCustClassID");
        btnCustID = DocumentActions.GetElementById<HTMLButtonElement>("btnCustID");


        btnSiteEngID = DocumentActions.GetElementById<HTMLButtonElement>("btnSiteEngID");
        btnScopeCatID = DocumentActions.GetElementById<HTMLButtonElement>("btnScopeCatID");
        butScope_Code = DocumentActions.GetElementById<HTMLButtonElement>("butScope_Code");

        //---------- redeo---------

        RedSalEng = DocumentActions.GetElementById<HTMLInputElement>("RedSalEng");
        RedScope = DocumentActions.GetElementById<HTMLInputElement>("RedScope");
        
        RedAllProject = DocumentActions.GetElementById<HTMLInputElement>("RedAllProject");
        RedNonRepair = DocumentActions.GetElementById<HTMLInputElement>("RedNonRepair");
        RedRepair = DocumentActions.GetElementById<HTMLInputElement>("RedRepair");


        RedNew = DocumentActions.GetElementById<HTMLInputElement>("RedNew");
        Redworking = DocumentActions.GetElementById<HTMLInputElement>("Redworking");
        RedHold = DocumentActions.GetElementById<HTMLInputElement>("RedHold");
        RedSuspended = DocumentActions.GetElementById<HTMLInputElement>("RedSuspended");
        Redfinish = DocumentActions.GetElementById<HTMLInputElement>("Redfinish");
        RedAll = DocumentActions.GetElementById<HTMLInputElement>("RedAll");
        

        //--------------
        RedAll.checked = true;
        RedScope.checked = true; 
        RedAllProject.checked = true; 
    }
    function Clear() {
        
        RedAll.checked = true;
        RedScope.checked = true;
        RedAllProject.checked = true; 

        txtArea.value = "";
        txtSel.value = "";
        txtCustClass.value = "";
        txtCust.value = "";

        txtAreaDes.value = "";
        txtSalDesc.value = "";
        txtCustClassDes.value = "";
        txtCustIDDes.value = "";


        txtSiteEngID.value = "";
        txtScopeCatID.value = "";
        txtScopeID.value = "";

        txtSiteEngCodeDes.value = "";
        txtScopeCatDes.value = "";
        txtScopeCodeDes.value = "";
      


    }


    function InitalizeEvents() {
        debugger
         btnSalesID.onclick = btnSalesID_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;
        btnCustID.onclick = btnCustID_onclick;
        btnSiteEngID.onclick = btnSiteEngID_onclick;
        butScope_Code.onclick = butScope_Code_onclick;
        btnScopeCatID.onclick = btnScopeCatID_onclick;
        
        GeneralReports.OnPrint = Print;
    }

 

    function btnSiteEngID_onclick() {
        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepProjectPhaseDis, "btnSiteEngID", Condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getSiteEngByid", ControllerName),
                data: { id: id },

                success: (d) => {
                    
                    Model = d.result as P_D_SiteEngineer;
                    if (Model != null) {
                        txtSiteEngID.value = Model.SiteEngineerId.toString();
                        txtSiteEngCode.value = Model.EngCode.toString();
                        txtSiteEngCodeDes.value = _ScreenLanguage == "en" ? Model.DescE : Model.DescA;
                    }
                    
                }
            });
        });
    }


    function btnSalesID_onclick() {
        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepProjectDist, "btnSalesID", Condition, () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger
            Ajax.CallAsync({
                url: Url.Action("GetSalesCodeByID", "ProjectDistribution"),
                data: { id: _Id },
                success: (d) => {
                    

                    let _result = d.result as P_D_SalesEgineer;
                    txtSel.value = _result.SalesEngineerId.toString();
                    txtSelCod.value = _result.EngCode.toString();
                    txtSalDesc.value = _ScreenLanguage == "en" ? _result.DescE : _result.DeacA;;

                }
            });
        })
    }

    function btnCustClassID_onclick() {
        
        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;

        sys.FindKey(Modules.RepProjectDist, "btnCustClassID", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerClassById", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    debugger
                    let result = d.result as P_D_SalesCustomerCategory;
                    txtCustClass.value = result.CustomerCategoryID.toString();
                    txtCustClassCod.value = result.CustomerCatCode.toString();
                    txtCustClassDes.value = _ScreenLanguage == "en" ? result.DescE : result.DescA;




                }
            });
        })

    }


    function btnCustID_onclick() {
        
        sys.FindKey(Modules.RepProjectDist, "btnCustID", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerById", "ProjectDistribution"),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_SalesCustomer;
                    txtCust.value = result.CustomerID.toString();
                    txtCustCod.value = result.CustomerCode.toString();
                    txtCustIDDes.value = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? result.DescA : result.DescE;


                }
            });
        })
    }

    function butScope_Code_onclick() {
        
        sys.FindKey(Modules.RepProjectPhaseDis, "butScope_Code", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetScope", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_Scope;
                    txtScopeCode.value = result.ScopeCode.toString();
                    txtScopeID.value = result.ScopeID.toString();
                    txtScopeCodeDes.value = _ScreenLanguage == "en" ? result.DescE : result.DescA;
                   

                }
            });
        })
    }

    

    function btnScopeCatID_onclick() {
        sys.FindKey(Modules.RepProjectPhaseDis, "btnScopeCatID", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getScopeCategory", ControllerName),
                data: { id: id },
                success: (d) => {
                    categ = d.result as P_D_ScopeCategory;
                    txtScopeCatID.value = categ.ScopeCategoryID.toString();
                    txtScopeCatCod.value = categ.ScopeCategCode.toString();
                    txtScopeCatDes.value = _ScreenLanguage == "en" ? categ.DescE : categ.DescA;

                   
                      
                }
            });

        })
    }

    function Print() {
        debugger


        let RP: ReportParameters = new ReportParameters();

        // RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.SiteEngineerId = Number(txtSiteEngID.value);
        RP.ScopeCategoryID = Number(txtScopeCatID.value);
        RP.ScopeID = Number(txtScopeID.value);
        RP.EngID = Number(txtSel.value);
        RP.custClassID = Number(txtCustClass.value);
        RP.customerID = Number(txtCust.value);
        if ($("#RedNew").prop("checked") == true) {
            RP.Stat = 0;
        }
        else if ($("#Redworking").prop("checked") == true) {
            RP.Stat = 1;
        }
        else if ($("#RedHold").prop("checked") == true) {
            RP.Stat = 2;
        }
        else if ($("#RedSuspended").prop("checked") == true) {
            RP.Stat = 3;
        }
        else if ($("#Redfinish").prop("checked") == true) {
            RP.Stat = 5;
        }
        else if ($("#RedAll").prop("checked") == true) {
            RP.Stat = 6;
        }

        if ($("#RedNonRepair").prop("checked") == true) {
            RP.ISRepair = 0;
        }
        else if ($("#RedRepair").prop("checked") == true) {
            RP.ISRepair = 1;
        }
        else if ($("#RedAllProject").prop("checked") == true) {
            RP.ISRepair = null;
            
        }


        if ($("#RedScope").prop("checked") == true) {
            RP.TypeReport = 1;

            Ajax.CallAsync({

                url: Url.Action("rptProjectPhaseDistribution", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }
        else {
            RP.TypeReport = 2;
            Ajax.CallAsync({

                url: Url.Action("rptProjectPhaseDistribution", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            });
        }
    }
}
















