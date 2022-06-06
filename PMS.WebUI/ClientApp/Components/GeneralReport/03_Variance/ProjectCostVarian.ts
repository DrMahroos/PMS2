$(document).ready(() => {
    ProjectCostVarian.InitalizeComponent();
});
namespace ProjectCostVarian {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "ProjectCostVarian";

    var categ: P_D_ScopeCategory = new P_D_ScopeCategory();
    var Model: P_D_Location = new P_D_Location();

    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement; 
    var txtFromProject: HTMLInputElement;
    var txtToProject: HTMLInputElement; 
    var txtProjectEng: HTMLInputElement;
    var txtProjectEngCod: HTMLInputElement;
    var txtProjectEngDes: HTMLInputElement;
    var btnProjectEng: HTMLButtonElement; 
    var txtCustClass: HTMLInputElement;
    var txtCustClassCod: HTMLInputElement;
    var txtCustClassDes: HTMLInputElement;
    var btnCustClassID: HTMLButtonElement; 
    var txtCust: HTMLInputElement;
    var txtCustCod: HTMLInputElement;
    var txtCustDes: HTMLInputElement;
    var btnCustID: HTMLButtonElement; 
    var txtScopeCalID: HTMLInputElement;
    var txtScopeCalCod: HTMLInputElement;
    var txtScopeCalDes: HTMLInputElement;
    var btnScopeCalID: HTMLButtonElement; 
    var txtScopeID: HTMLInputElement;
    var txtScopeCode: HTMLInputElement;
    var txtScopeDes: HTMLInputElement;
    var butScopeID: HTMLButtonElement; 
    var RedProject: HTMLInputElement;
    var RedPhase: HTMLInputElement; 
   
    var RedNew: HTMLInputElement;
    var Redworking: HTMLInputElement;
    var RedHold: HTMLInputElement;
    var RedSuspended: HTMLInputElement;
    var Redfinish: HTMLInputElement;
    var RedAll: HTMLInputElement;
    var IsExecludeZero: HTMLInputElement;

    var _CompCode: string;
    var _BranchCode: string;
    var btnPrint: HTMLInputElement;
    var _ScreenLanguage: string;

    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

    export function InitalizeComponent() {
        debugger
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;

        InitalizeControls();

        InitalizeEvents();

        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());

        //getbranchname();
    }
    function InitalizeControls() {

        //---------- textID---------


        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");

        txtFromProject = DocumentActions.GetElementById<HTMLInputElement>("txtFromProject");
        txtToProject = DocumentActions.GetElementById<HTMLInputElement>("txtToProject");

        txtProjectEng = DocumentActions.GetElementById<HTMLInputElement>("txtProjectEng");
        txtProjectEngCod = DocumentActions.GetElementById<HTMLInputElement>("txtProjectEngCod");
        txtProjectEngDes = DocumentActions.GetElementById<HTMLInputElement>("txtProjectEngDes");
        btnProjectEng = DocumentActions.GetElementById<HTMLButtonElement>("btnProjectEng");

        
        txtCustClass = DocumentActions.GetElementById<HTMLInputElement>("txtCustClass");
        txtCustClassCod = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassCod");
        txtCustClassDes = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassDes");
        btnCustClassID = DocumentActions.GetElementById<HTMLButtonElement>("btnCustClassID");

        txtCust = DocumentActions.GetElementById<HTMLInputElement>("txtCust");
        txtCustCod = DocumentActions.GetElementById<HTMLInputElement>("txtCustCod");
        txtCustDes = DocumentActions.GetElementById<HTMLInputElement>("txtCustDes");
        btnCustID = DocumentActions.GetElementById<HTMLButtonElement>("btnCustID");

       


        txtScopeCalID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCalID");
        txtScopeCalCod = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCalCod");
        txtScopeCalDes = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCalDes");
        btnScopeCalID = DocumentActions.GetElementById<HTMLButtonElement>("btnScopeCalID");


        txtScopeID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeID");
        txtScopeCode = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCode");
        txtScopeDes = DocumentActions.GetElementById<HTMLInputElement>("txtScopeDes");
        butScopeID = DocumentActions.GetElementById<HTMLButtonElement>("butScopeID");

        //---------- redeo---------

        RedProject = DocumentActions.GetElementById<HTMLInputElement>("RedProject");
        RedPhase = DocumentActions.GetElementById<HTMLInputElement>("RedPhase");



       

        RedNew = DocumentActions.GetElementById<HTMLInputElement>("RedNew");
        Redworking = DocumentActions.GetElementById<HTMLInputElement>("Redworking");
        RedHold = DocumentActions.GetElementById<HTMLInputElement>("RedHold");
        RedSuspended = DocumentActions.GetElementById<HTMLInputElement>("RedSuspended");
        Redfinish = DocumentActions.GetElementById<HTMLInputElement>("Redfinish");
        RedAll = DocumentActions.GetElementById<HTMLInputElement>("RedAll");
        IsExecludeZero = DocumentActions.GetElementById<HTMLInputElement>("IsExecludeZero");
        //--------------
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
       
        txtFromProject.value = "1";
        txtToProject.value = "999999";
        RedAll.checked = true;
        RedPhase.checked = true; 
        IsExecludeZero.checked = true;
    }
    function Clear() {
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        
        IsExecludeZero.checked = true;
        txtFromProject.value = "1";
        txtToProject.value = "999999";
        RedAll.checked = true;
        RedPhase.checked = true; 
        txtProjectEng.value = "";
        txtProjectEngCod.value = "";
        txtProjectEngDes.value = "";
      
        txtCustClass.value = "";
        txtCustClassCod.value = "";
        txtCustClassDes.value = "";
        txtCust.value = "";
        txtCustCod.value = "";
        txtCustDes.value = "";
     
        txtScopeCalID.value = "";
        txtScopeCalCod.value = "";
        txtScopeCalDes.value = "";
        txtScopeID.value = "";
        txtScopeCode.value = "";
        txtScopeDes.value = "";
    }

    function InitalizeEvents() {
        debugger
        btnProjectEng.onclick = btnProjectEng_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;
        btnCustID.onclick = btnCustID_onclick;
        butScopeID.onclick = butScope_onclick;
        btnScopeCalID.onclick = btnScopeCatID_onclick;
    }

    function btnProjectEng_onclick() {
        


        sys.FindKey(Modules.RepProjectCostVarian, "btnProjectEng", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getProjectEngByid", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as P_D_SiteEngineer;
                    if (result != null) {

                        
                        txtProjectEng.value = result.SiteEngineerId.toString();
                        txtProjectEngCod.value = result.EngCode;
                        txtProjectEngDes.value = _ScreenLanguage == "ar" ? result.DescA : result.DescE;
                    }
                }
            });
        })
    }

    function btnCustClassID_onclick() {
        
        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;

        sys.FindKey(Modules.RepProjectCostVarian, "btnCustClassID", "", () => {
            
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
        
        sys.FindKey(Modules.RepProjectCostVarian, "btnCustID", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerById", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_SalesCustomer;
                    txtCust.value = result.CustomerID.toString();
                    txtCustCod.value = result.CustomerCode.toString();
                    txtCustDes.value = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? result.DescA : result.DescE;


                }
            });
        })
    }                                                         
                                                                                           
    function btnScopeCatID_onclick() {
       
        sys.FindKey(Modules.RepProjectCostVarian, "btnScopeCatID", "", () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({

                url: Url.Action("getScopeCategory", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    categ = d.result as P_D_ScopeCategory;
                    // if (categ != null) {
                    txtScopeCalID.value = categ.ScopeCategoryID.toString();
                    txtScopeCalCod.value = categ.ScopeCategCode.toString();
                    txtScopeCalDes.value = _ScreenLanguage == "en" ? categ.DescE : categ.DescA;
                    //}



                }
            });

        })
    }                                                     
                                                                                           
    function butScope_onclick() {

        sys.FindKey(Modules.RepProjectCostVarian, "butScope_Code", "", () => {

            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetScope", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_Scope;
                    txtScopeID.value = result.ScopeID.toString();
                    txtScopeCode.value = result.ScopeCode.toString();
                    txtScopeDes.value = _ScreenLanguage == "en" ? result.DescE : result.DescA;


                }
            });
        })
    }                                                          
                                                                                             
    function Print() {                                                                     
        debugger                                                                           
                                                                                           
                                                                                           
        let RP: ReportParameters = new ReportParameters();
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;                                                      
        RP.FromProjCode = txtFromProject.value;                                         
        RP.ToProjCode = txtToProject.value;                                            
        RP.SiteEngineerId = Number(txtProjectEng.value);                                        
        RP.ScopeCategoryID = Number(txtScopeCalID.value);
        RP.ScopeID = Number(txtScopeID.value);                                                              
        RP.CatID = Number(txtCustClass.value);                                                                     
        RP.customerID = Number(txtCust.value);

                                          
        if (($("#RedNew").prop("checked") == true)) {                                  
            RP.Stat = 0;
        }
        else if (($("#Redworking").prop("checked") == true)) {
            RP.Stat = 1;
        }
        else if (($("#RedHold").prop("checked") == true)) {
            RP.Stat = 2;
        }
        else if (($("#RedSuspended").prop("checked") == true)) {
            RP.Stat = 3;
        }
        else if (($("#Redfinish").prop("checked") == true)) {
            RP.Stat = 5;
        }
        else if (($("#RedAll").prop("checked") == true)) {
            RP.Stat = 6;
        }
        if ($("#IsExecludeZero").prop("checked") == true) {
            RP.IsExecludeZero = 1;
        }

        else {
            RP.IsExecludeZero = 0;
        }
        


        if (($("#RedbyProject").prop("checked") == true)) {
            RP.TypeReport = 1;

            Ajax.CallAsync({

                url: Url.Action("repProjectCostVariance", "GeneralReports"),
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

                url: Url.Action("repProjectCostVariance", "GeneralReports"),
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
















