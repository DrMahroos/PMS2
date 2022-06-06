$(document).ready(() => {
    ProjectWorking.InitalizeComponent();
});
namespace ProjectWorking {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "ProjectWorking";

    var categ: P_D_ScopeCategory = new P_D_ScopeCategory();
    var Model: P_D_SiteEngineer = new P_D_SiteEngineer();
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;
    var txtFromProject: HTMLInputElement;
    var txtToProject: HTMLInputElement;
    var txtArea: HTMLInputElement;
    var txtSel: HTMLInputElement;
    var txtCustClass: HTMLInputElement;
    var txtCust: HTMLInputElement;
    var txtScopeID: HTMLInputElement;
    var txtScopeCatID: HTMLInputElement;

    var txtSiteEngID: HTMLInputElement;
    var txtSiteEngCodeDes: HTMLInputElement;
    var txtSiteEngCode: HTMLInputElement;

    
    var txtAreaCod: HTMLInputElement;
    var txtSelCod: HTMLInputElement;
    var txtCustClassCod: HTMLInputElement;
    var txtCustCod: HTMLInputElement;
    var txtScopeCode: HTMLInputElement;
    var txtScopeCatCod: HTMLInputElement;


   
    var txtAreaDes: HTMLInputElement;
    var txtSalDesc: HTMLInputElement;
    var txtCustClassDes: HTMLInputElement;
    var txtCustIDDes: HTMLInputElement;
    var txtScopeCatDes: HTMLInputElement;
    var txtScopeCodeDes: HTMLInputElement;




    var btnArea: HTMLButtonElement;
    var btnSalesID: HTMLButtonElement;
    var btnCustClassID: HTMLButtonElement;
    var btnCustID: HTMLButtonElement;
    var btnScopeCatID: HTMLButtonElement;
    var butScope_Code: HTMLButtonElement;
    var btnSiteEngID: HTMLButtonElement;

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

       

        //getbranchname();
    }
    function InitalizeControls() {

        //---------- textID---------
        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");
        txtArea = DocumentActions.GetElementById<HTMLInputElement>("txtArea");
        txtSel = DocumentActions.GetElementById<HTMLInputElement>("txtSel");
        txtCustClass = DocumentActions.GetElementById<HTMLInputElement>("txtCustClass");
        txtCust = DocumentActions.GetElementById<HTMLInputElement>("txtCust");
        txtScopeCatID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCatID");
        txtScopeID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeID");

        txtSiteEngID = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngID");
        txtSiteEngCodeDes = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngCodeDes");
        txtSiteEngCode = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngCode");

        txtFromProject = DocumentActions.GetElementById<HTMLInputElement>("txtFromProject");
        txtToProject = DocumentActions.GetElementById<HTMLInputElement>("txtToProject");
        //---------- textDes---------
       
        txtAreaDes = DocumentActions.GetElementById<HTMLInputElement>("txtAreaDes");
        txtSalDesc = DocumentActions.GetElementById<HTMLInputElement>("txtSalDesc");
        txtCustClassDes = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassDes");
        txtCustIDDes = DocumentActions.GetElementById<HTMLInputElement>("txtCustIDDes");
        txtScopeCatDes = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCatDes");
        txtScopeCodeDes = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCodeDes");

        //---------- textcood---------

       
        txtAreaCod = DocumentActions.GetElementById<HTMLInputElement>("txtAreaCod");
        txtSelCod = DocumentActions.GetElementById<HTMLInputElement>("txtSelCod");
        txtCustClassCod = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassCod");
        txtCustCod = DocumentActions.GetElementById<HTMLInputElement>("txtCustCod");
        txtScopeCode = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCode");
        txtScopeCatCod = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCatCod");

        
        //---------- btn---------

        btnArea = DocumentActions.GetElementById<HTMLButtonElement>("btnArea");
        btnSalesID = DocumentActions.GetElementById<HTMLButtonElement>("btnSalesID");
        btnCustClassID = DocumentActions.GetElementById<HTMLButtonElement>("btnCustClassID");
        btnCustID = DocumentActions.GetElementById<HTMLButtonElement>("btnCustID");
        btnScopeCatID = DocumentActions.GetElementById<HTMLButtonElement>("btnScopeCatID");
        butScope_Code = DocumentActions.GetElementById<HTMLButtonElement>("butScope_Code");
        btnSiteEngID = DocumentActions.GetElementById<HTMLButtonElement>("btnSiteEngID");

       


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
        RedAllProject.checked = true;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtFromProject.value = "1";
        txtToProject.value = "999999"; 
    }
    function Clear() {
        
        RedAll.checked = true;
        RedAllProject.checked = true;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtFromProject.value = "1";
        txtToProject.value = "999999"; 

        txtArea.value = "";
        txtSel.value = "";
        txtCustClass.value = "";
        txtCust.value = "";

        txtAreaDes.value = "";
        txtSalDesc.value = "";
        txtCustClassDes.value = "";
        txtCustIDDes.value = "";


      
        txtScopeCatID.value = "";
        txtScopeID.value = "";

      
        txtScopeCatDes.value = "";
        txtScopeCodeDes.value = "";
        //txtSiteEngCode.value = "";
        //txtSiteEngCodeDes.value = "";
        //txtSiteEngID.value = "";


    }


    function InitalizeEvents() {
        debugger
       
        btnSalesID.onclick = btnSalesID_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;
        btnCustID.onclick = btnCustID_onclick;
        butScope_Code.onclick = butScope_Code_onclick;
        btnScopeCatID.onclick = btnScopeCatID_onclick;
        btnSiteEngID.onclick = btnSiteEngID_onclick;
         
    }

   

   
    function btnSalesID_onclick() {
        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepProjectWorking, "btnSalesID", Condition, () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger
            Ajax.CallAsync({
                url: Url.Action("GetSalesCodeByID", ControllerName),
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
        
       

        sys.FindKey(Modules.RepProjectWorking, "btnCustClassID", "", () => {
            
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
        
        sys.FindKey(Modules.RepProjectWorking, "btnCustID", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerById",ControllerName),
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

    function btnScopeCatID_onclick() {
        
        sys.FindKey(Modules.RepProjectWorking, "btnScopeCatID",""/* "CompCode = " + _CompCode*/, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
           
                url: Url.Action("getScopeCategory", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    categ = d.result as P_D_ScopeCategory;
                   // if (categ != null) {
                          txtScopeCatID.value = categ.ScopeCategoryID.toString();
                          txtScopeCatCod.value = categ.ScopeCategCode.toString();
                          txtScopeCatDes.value = _ScreenLanguage == "en" ? categ.DescE : categ.DescA;
                    //}
                    
                 
                    
                }
            });

        })
    }

    function butScope_Code_onclick() {
        
        sys.FindKey(Modules.RepProjectWorking, "butScope_Code", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetScope", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_Scope;
                    txtScopeID.value = result.ScopeID.toString();
                    txtScopeCode.value = result.ScopeCode.toString();
                    txtScopeCodeDes.value = _ScreenLanguage == "en" ? result.DescE : result.DescA;


                }
            });
        })
    }

    function btnSiteEngID_onclick() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepProjectWorking, "btnSiteEngID", Condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger
            Ajax.CallAsync({
                url: Url.Action("getSiteEngByid", "ProjectWorking"),
                data: { id: Number(id) },

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

    function Print() {
        debugger


        let RP: ReportParameters = new ReportParameters();

        // RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.FromProjCode = txtFromProject.value;
        RP.ToProjCode = txtToProject.value;
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
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
            debugger;
             
            RP.ISRepair = 3;

        }
        

            Ajax.CallAsync({

                url: Url.Action("rptProjectWorking", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        
       





        
    }


    
}
















