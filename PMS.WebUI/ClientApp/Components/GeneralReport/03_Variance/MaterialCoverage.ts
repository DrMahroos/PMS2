$(document).ready(() => {
    MaterialCoverage.InitalizeComponent();
});
namespace MaterialCoverage {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "MaterialCoverage";

    var categ: P_D_ScopeCategory = new P_D_ScopeCategory();
    var Model: P_D_Location = new P_D_Location();

    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;
    //---
    var txtFromProject: HTMLInputElement;
    var txtToProject: HTMLInputElement;
    //--
    //var txtBranch: HTMLInputElement;
    //var txtBranchCod: HTMLInputElement;
    //var txtBranchDes: HTMLInputElement;
    //var btnBranch: HTMLButtonElement;
    //--
    var txtProjectEng: HTMLInputElement;
    var txtProjectEngCod: HTMLInputElement;
    var txtProjectEngDes: HTMLInputElement;
    var btnProjectEng: HTMLButtonElement;
    //--
    var txtSiet: HTMLInputElement;
    var txtSietCod: HTMLInputElement;
    var txtSietDesc: HTMLInputElement;
    var btnSietID: HTMLButtonElement;
    //--
    var txtCustClass: HTMLInputElement;
    var txtCustClassCod: HTMLInputElement;
    var txtCustClassDes: HTMLInputElement;
    var btnCustClassID: HTMLButtonElement;
    //--
    var txtCust: HTMLInputElement;
    var txtCustCod: HTMLInputElement;
    var txtCustDes: HTMLInputElement;
    var btnCustID: HTMLButtonElement;
    //--
    var txtArea: HTMLInputElement;
    var txtAreaCod: HTMLInputElement;
    var txtAreaDes: HTMLInputElement;
    var btnArea: HTMLButtonElement;
    //--
    var txtScopeCalID: HTMLInputElement;
    var txtScopeCalCod: HTMLInputElement;
    var txtScopeCalDes: HTMLInputElement;
    var btnScopeCalID: HTMLButtonElement;


    var txtScopeID: HTMLInputElement;
    var txtScopeCode: HTMLInputElement;
    var txtScopeDes: HTMLInputElement;
    var butScopeID: HTMLButtonElement;





    var txtFromeItem: HTMLInputElement;
    var txtToItem: HTMLInputElement;


    var RedProject: HTMLInputElement;
    var Reditem: HTMLInputElement;

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
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());


    }
    function InitalizeControls() {

        //---------- textID---------


        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");

        txtFromProject = DocumentActions.GetElementById<HTMLInputElement>("txtFromProject");
        txtToProject = DocumentActions.GetElementById<HTMLInputElement>("txtToProject");

        //txtBranch = DocumentActions.GetElementById<HTMLInputElement>("txtBranch");
        //txtBranchCod = DocumentActions.GetElementById<HTMLInputElement>("txtBranchCod");
        //txtBranchDes = DocumentActions.GetElementById<HTMLInputElement>("txtBranchDes");
        //btnBranch = DocumentActions.GetElementById<HTMLButtonElement>("btnBranch");

        txtSiet = DocumentActions.GetElementById<HTMLInputElement>("txtSiet");
        txtSietCod = DocumentActions.GetElementById<HTMLInputElement>("txtSietCod");
        txtSietDesc = DocumentActions.GetElementById<HTMLInputElement>("txtSietDesc");
        btnSietID = DocumentActions.GetElementById<HTMLButtonElement>("btnSietID");

        txtCustClass = DocumentActions.GetElementById<HTMLInputElement>("txtCustClass");
        txtCustClassCod = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassCod");
        txtCustClassDes = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassDes");
        btnCustClassID = DocumentActions.GetElementById<HTMLButtonElement>("btnCustClassID");

        txtCust = DocumentActions.GetElementById<HTMLInputElement>("txtCust");
        txtCustCod = DocumentActions.GetElementById<HTMLInputElement>("txtCustCod");
        txtCustDes = DocumentActions.GetElementById<HTMLInputElement>("txtCustDes");
        btnCustID = DocumentActions.GetElementById<HTMLButtonElement>("btnCustID");




        txtArea = DocumentActions.GetElementById<HTMLInputElement>("txtArea");
        txtAreaCod = DocumentActions.GetElementById<HTMLInputElement>("txtAreaCod");
        txtAreaDes = DocumentActions.GetElementById<HTMLInputElement>("txtAreaDes");
        btnArea = DocumentActions.GetElementById<HTMLButtonElement>("btnArea");



        txtScopeCalID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCalID");
        txtScopeCalCod = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCalCod");
        txtScopeCalDes = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCalDes");
        btnScopeCalID = DocumentActions.GetElementById<HTMLButtonElement>("btnScopeCalID");


        txtScopeID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeID");
        txtScopeCode = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCode");
        txtScopeDes = DocumentActions.GetElementById<HTMLInputElement>("txtScopeDes");
        butScopeID = DocumentActions.GetElementById<HTMLButtonElement>("butScopeID");


        txtFromeItem = DocumentActions.GetElementById<HTMLInputElement>("txtFromeItem");
        txtToItem = DocumentActions.GetElementById<HTMLInputElement>("txtToItem");


        //---------- redeo---------

        RedProject = DocumentActions.GetElementById<HTMLInputElement>("RedProject");
        Reditem = DocumentActions.GetElementById<HTMLInputElement>("Reditem");

        RedNew = DocumentActions.GetElementById<HTMLInputElement>("RedNew");
        Redworking = DocumentActions.GetElementById<HTMLInputElement>("Redworking");
        RedHold = DocumentActions.GetElementById<HTMLInputElement>("RedHold");
        RedSuspended = DocumentActions.GetElementById<HTMLInputElement>("RedSuspended");
        Redfinish = DocumentActions.GetElementById<HTMLInputElement>("Redfinish");
        RedAll = DocumentActions.GetElementById<HTMLInputElement>("RedAll");

        //--------------
        RedAll.checked = true; 
        RedProject.checked = true; 
    }
    function Clear() {
        
        txtFromProject.value = "";
        txtToProject.value = "";
        txtArea.value = "";
        txtAreaCod.value = "";
        txtAreaDes.value = "";
        txtSiet.value = "";
        txtSietCod.value = "";
        txtSietDesc.value = "";
        txtCustClass.value = "";
        txtCustClassCod.value = "";
        txtCustClassDes.value = "";
        txtCust.value = "";
        txtCustCod.value = "";
        txtCustDes.value = "";
        //txtBranch.value = "";
        //txtBranchCod.value = "";
        //txtBranchDes.value = "";
        txtScopeCalID.value = "";
        txtScopeCalCod.value = "";
        txtScopeCalDes.value = "";
        txtScopeID.value = "";
        txtScopeCode.value = "";
        txtScopeDes.value = "";
        txtToItem.value = "";
        txtFromeItem.value = "";
        RedAll.checked = true; 
        RedProject.checked = true; 
    }

    function InitalizeEvents() {
        debugger
        //btnBranch.onclick = btnBranch_onclick;
        btnSietID.onclick = btnSietID_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;
        btnCustID.onclick = btnCustID_onclick;
        butScopeID.onclick = butScope_onclick;
        btnScopeCalID.onclick = btnScopeCatID_onclick;


    }

    //function btnBranch_onclick() {
        


    //    sys.FindKey(Modules.RepMaterialCoverage, "btnBranch", "", () => {
            
    //        let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("GetBranchByID", ControllerName),
    //            data: { id: _Id },
    //            success: (d) => {
                    
    //                let result = d.result as G_BRANCH;
    //                txtBranchCod.value = result.BRA_CODE.toString();
    //                txtBranchDes.value = _ScreenLanguage == "ar" ? result.BRA_DESC : result.BRA_DESCE; 2

    //            }
    //        });
    //    })
    //}

    function btnSietID_onclick() {
        
        sys.FindKey(Modules.RepMaterialCoverage, "btnSietID", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger
            Ajax.CallAsync({
                url: Url.Action("GetSiteByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    

                    let _result = d.result as P_D_SiteEngineer;
                    txtSiet.value = _result.SiteEngineerId.toString();
                    txtSietCod.value = _result.EngCode.toString();
                    txtSietDesc.value = _ScreenLanguage == "en" ? _result.DescE : _result.DescA;

                }
            });
        })
    }

    function btnCustClassID_onclick() {
        
        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;

        sys.FindKey(Modules.RepMaterialCoverage, "btnCustClassID", "", () => {
            
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
        
        sys.FindKey(Modules.RepMaterialCoverage, "btnCustID", "", () => {
            
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
        
        sys.FindKey(Modules.RepMaterialCoverage, "btnScopeCatID", ""/* "CompCode = " + _CompCode*/, () => {
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
        
        sys.FindKey(Modules.RepMaterialCoverage, "butScopeID", "", () => {
            
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


        
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
        RP.FromProjCode = txtFromProject.value;
        RP.ToProjCode = txtToProject.value;
        RP.FromItemNo = txtFromeItem.value;
        RP.ToItemNo = txtToItem.value;
        RP.SiteEngineerId = Number(txtSiet.value);
        RP.custClassID = Number(txtCustClass.value);
        RP.customerID = Number(txtCust.value);
        RP.ScopeCategoryID = Number(txtScopeCalID.value);
        RP.ScopeID = Number(txtScopeID.value);

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
        if (RedProject.checked == true)
            RP.TypeReport = 1;
        else RP.TypeReport = 2;

        Ajax.CallAsync({
            url: Url.Action("P_rep_MaterialCoverage", "GeneralReports"),
            data: RP,
            success: (d) => {
                debugger
                let result = d.result as string;
                window.open(result, "_blank");
            }
        });

    }
}




















