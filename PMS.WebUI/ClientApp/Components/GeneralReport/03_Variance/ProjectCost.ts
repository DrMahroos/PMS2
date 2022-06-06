$(document).ready(() => {
    ProjectCost.InitalizeComponent();
});
namespace ProjectCost {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "ProjectCost";

    var categ: P_D_ScopeCategory = new P_D_ScopeCategory();
    var Model: P_D_Location = new P_D_Location();

    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;
    //---
    var txtFromProject: HTMLInputElement;
    var txtToProject: HTMLInputElement;
    //--
    var txtsiteEng: HTMLInputElement;
    var txtsiteEngCod: HTMLInputElement;
    var txtsiteEngDes: HTMLInputElement;
    var btnsiteEng: HTMLButtonElement;
    //--
    var txtSel: HTMLInputElement;
    var txtSelCod: HTMLInputElement;
    var txtSalDesc: HTMLInputElement;
    var btnSalesID: HTMLButtonElement;
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
    //var txtArea: HTMLInputElement;
    //var txtAreaCod: HTMLInputElement;
    //var txtAreaDes: HTMLInputElement;
    //var btnArea: HTMLButtonElement;
    //--
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
    var IsExecludeZero: HTMLInputElement;

  



    var RedNew: HTMLInputElement;
    var Redworking: HTMLInputElement;
    var RedHold: HTMLInputElement;
    var RedSuspended: HTMLInputElement;
    var Redfinish: HTMLInputElement;
    var RedAll: HTMLInputElement;

    var _CompCode: string;
    var _BranchCode: string;
    var _Condition : string 
    var btnPrint: HTMLInputElement;
    var _ScreenLanguage: string;

    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
    _Condition = "COMPCODE = " + _CompCode + " and BraCode  = " + _BranchCode
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


        
        txtFromProject = DocumentActions.GetElementById<HTMLInputElement>("txtFromProject");
        txtToProject = DocumentActions.GetElementById<HTMLInputElement>("txtToProject");

        txtsiteEng = DocumentActions.GetElementById<HTMLInputElement>("txtsiteEng");
        txtsiteEngCod = DocumentActions.GetElementById<HTMLInputElement>("txtsiteEngCod");
        txtsiteEngDes = DocumentActions.GetElementById<HTMLInputElement>("txtsiteEngDes");
        btnsiteEng = DocumentActions.GetElementById<HTMLButtonElement>("btnsiteEng");

        //txtSel = DocumentActions.GetElementById<HTMLInputElement>("txtSel");
        //txtSelCod = DocumentActions.GetElementById<HTMLInputElement>("txtSelCod");
        //txtSalDesc = DocumentActions.GetElementById<HTMLInputElement>("txtSalDesc");
        //btnSalesID = DocumentActions.GetElementById<HTMLButtonElement>("btnSalesID");

        txtCustClass = DocumentActions.GetElementById<HTMLInputElement>("txtCustClass");
        txtCustClassCod = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassCod");
        txtCustClassDes = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassDes");
        btnCustClassID = DocumentActions.GetElementById<HTMLButtonElement>("btnCustClassID");

        txtCust = DocumentActions.GetElementById<HTMLInputElement>("txtCust");
        txtCustCod = DocumentActions.GetElementById<HTMLInputElement>("txtCustCod");
        txtCustDes = DocumentActions.GetElementById<HTMLInputElement>("txtCustDes");
        btnCustID = DocumentActions.GetElementById<HTMLButtonElement>("btnCustID");


        //txtArea = DocumentActions.GetElementById<HTMLInputElement>("txtArea");
        //txtAreaCod = DocumentActions.GetElementById<HTMLInputElement>("txtAreaCod");
        //txtAreaDes = DocumentActions.GetElementById<HTMLInputElement>("txtAreaDes");
        //btnArea = DocumentActions.GetElementById<HTMLButtonElement>("btnArea");


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
        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");

        txtFromProject.value = "1"; 
        txtToProject.value = "999999";
        IsExecludeZero.checked = true;
        RedAll.checked = true;
        RedPhase.checked = true; 
        

        
    }
    function Clear() {
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        debugger
        txtFromProject.value = "1";
        txtToProject.value = "999999";
        IsExecludeZero.checked = true;
        RedAll.checked = true;
        RedPhase.checked = true; 
        txtsiteEng.value = "";
        txtsiteEngCod.value = "";
        txtsiteEngDes.value = "";
        //txtSel.value = "";
        //txtSelCod.value = "";
        //txtSalDesc.value = "";
        txtCustClass.value = "";
        txtCustClassCod.value = "";
        txtCustClassDes.value = "";
        txtCust.value = "";
        txtCustCod.value = "";
        txtCustDes.value = "";
        //txtArea.value = "";
        //txtAreaCod.value = "";
        //txtAreaDes.value = "";
        txtScopeCalID.value = ""; 
        txtScopeCalCod.value = "";
        txtScopeCalDes.value = "";
        txtScopeID.value = "";
        txtScopeCode.value = "";
        txtScopeDes.value = "";
    }

    function InitalizeEvents() {
        debugger
        btnsiteEng.onclick = btnsiteEng_onclick;
        //btnSalesID.onclick = btnSalesID_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;
        btnCustID.onclick = btnCustID_onclick;
        butScopeID.onclick = butScope_onclick;
        btnScopeCalID.onclick = btnScopeCatID_onclick;
        //btnArea.onclick = btnArea_onclick;
        //btnPrint.onclick = Print;
    }

    //function btnArea_onclick() {
        


    //    sys.FindKey(Modules.RepProjectCost, "btnArea", _Condition, () => {
            
    //        let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("GetLocationByID", ControllerName),
    //            data: { id: _Id },
    //            success: (d) => {
                    
    //                let result = d.result as P_D_Location;
    //                txtAreaCod.value = result.LocCode.toString();
    //                txtAreaDes.value = _ScreenLanguage == "ar" ? result.DescA : result.DescE; 

    //            }
    //        });
    //    })
    //}

    function btnsiteEng_onclick() {
        

        debugger;
        sys.FindKey(Modules.RepProjectCost, "btnsiteEng", _Condition, () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getsiteEngByid", ControllerName ),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as P_D_SiteEngineer;
                    if (result != null) {

                        
                        txtsiteEng.value = result.SiteEngineerId.toString();
                        txtsiteEngCod.value = result.EngCode;
                        txtsiteEngDes.value = _ScreenLanguage == "ar" ? result.DescA : result.DescE;
                    }
                }
            });
        })
    }
      
    function btnCustClassID_onclick() {
        
        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;

        sys.FindKey(Modules.RepProjectCost, "btnCustClassID", "", () => {
            
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
        
        sys.FindKey(Modules.RepProjectCost, "btnCustID", "", () => {
            
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
        
        sys.FindKey(Modules.RepProjectCost, "btnScopeCatID", ""/* "CompCode = " + _CompCode*/, () => {
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
        
        sys.FindKey(Modules.RepProjectCost, "butScope_Code", "", () => {
            
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

        // RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;     
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
        RP.FromProjCode = txtFromProject.value;
        RP.ToProjCode = txtToProject.value;
        RP.SiteEngineerId = Number(txtsiteEng.value);
        RP.custClassID = Number(txtCustClass.value);
        RP.customerID = Number(txtCust.value);
        RP.scopeClassId = Number(txtScopeCalID.value);
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
        
        if ($("#IsExecludeZero").prop("checked") == true) {
            RP.IsExecludeZero = 1;
        }

        else {
            RP.IsExecludeZero = 0;
        }
         

        if ($("#RedPhase").prop("checked") == true) {
            RP.TypeReport = 1;
            

            Ajax.CallAsync({

                url: Url.Action("P_rep_ProjectCost", "GeneralReports"),
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

                url: Url.Action("P_rep_ProjectCost", "GeneralReports"),
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
















