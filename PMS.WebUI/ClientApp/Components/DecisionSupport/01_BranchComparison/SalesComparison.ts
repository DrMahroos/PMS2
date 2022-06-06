$(document).ready(() => {
    SalesComparison.InitalizeComponent();
});
namespace SalesComparison {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "SalesComparison";

    var categ: P_D_ScopeCategory = new P_D_ScopeCategory();
    var Model: P_G_Region = new P_G_Region();

       //--
    var txtyer: HTMLInputElement;

    var txtCustClass: HTMLInputElement;
    var txtCustClassCod: HTMLInputElement;
    var txtCustClassDes: HTMLInputElement;
    var btnCustClassID: HTMLButtonElement;
 
    //--
    var txtRegionID: HTMLInputElement;
    //var txtRegionCode: HTMLInputElement;
    var txtRegionDes: HTMLInputElement;
    var btnRegionID: HTMLButtonElement;
    //--
    //var txtScopeCalID: HTMLInputElement;
    //var txtScopeCalCod: HTMLInputElement;
    //var txtScopeCalDes: HTMLInputElement;
    //var btnScopeCalID: HTMLButtonElement;

    //var txtScopeID: HTMLInputElement;
    //var txtScopeCode: HTMLInputElement;
    //var txtScopeDes: HTMLInputElement;
    //var butScopeID: HTMLButtonElement;
        
    //var RedContractPrice: HTMLInputElement;
    //var RedProductionValue: HTMLInputElement;


    //var RedAllProject: HTMLInputElement;
    //var RedNewProjects: HTMLInputElement;
    //var RedAdditionalWork: HTMLInputElement;
    
    

    var _CompCode: string;
    var _BranchCode: string;
    var btnPrint: HTMLInputElement;
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
                              
        txtRegionID = DocumentActions.GetElementById<HTMLInputElement>("txtRegionID");
        txtRegionDes = DocumentActions.GetElementById<HTMLInputElement>("txtRegionDes");
        //txtRegionCode = DocumentActions.GetElementById<HTMLInputElement>("txtRegionCode");
        btnRegionID = DocumentActions.GetElementById<HTMLButtonElement>("btnRegionID");
        
        txtCustClass = DocumentActions.GetElementById<HTMLInputElement>("txtCustClass");
        txtCustClassCod = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassCod");
        txtCustClassDes = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassDes");
        btnCustClassID = DocumentActions.GetElementById<HTMLButtonElement>("btnCustClassID");

        txtyer = DocumentActions.GetElementById<HTMLInputElement>("txtyer");

        //txtScopeCalID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCalID");
        //txtScopeCalCod = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCalCod");
        //txtScopeCalDes = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCalDes");
        //btnScopeCalID = DocumentActions.GetElementById<HTMLButtonElement>("btnScopeCalID");
        
        //txtScopeID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeID");
        //txtScopeCode = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCode");
        //txtScopeDes = DocumentActions.GetElementById<HTMLInputElement>("txtScopeDes");
        //butScopeID = DocumentActions.GetElementById<HTMLButtonElement>("butScopeID");

        ////---------- redeo---------

        //RedContractPrice = DocumentActions.GetElementById<HTMLInputElement>("RedContractPrice");
        //RedProductionValue = DocumentActions.GetElementById<HTMLInputElement>("RedProductionValue");

       
        
        //RedAllProject = DocumentActions.GetElementById<HTMLInputElement>("RedAllProject");
    

        //--------------
        txtyer.value = SharedSession.CurrentEnvironment.CurrentYear.toString()
    }
    function Clear() {
        
        txtyer.value = SharedSession.CurrentEnvironment.CurrentYear.toString()
        txtCustClass.value = "";
        txtCustClassCod.value = "";
        txtCustClassDes.value = "";
        txtRegionID.value = "";
        txtRegionDes.value = "";
       
        //txtScopeCalID.value = "";
        //txtScopeCalCod.value = "";
        //txtScopeCalDes.value = "";
        //txtScopeID.value = "";
        //txtScopeCode.value = "";
        //txtScopeDes.value = "";
    }

    function InitalizeEvents() {
        
      
        btnCustClassID.onclick = btnCustClassID_onclick;
        //butScopeID.onclick = butScopeID_onclick;
        //btnScopeCalID.onclick = btnScopeCatID_onclick;

        btnRegionID.onclick = btnRegionID_onclick;
       
    }



    function btnRegionID_onclick() {
        debugger
        sys.FindKey(Modules.SalesComparison, "btnRegionID", "COMP_CODE = " + _CompCode, () => {
            let _id = ClientSharedWork.SearchDataGrid.SelectedKey;
            
            Ajax.CallAsync({
                url: Url.Action("getRegionByid", ControllerName),
                data: { id: _id },

                success: (d) => {
                    
                    Model = d.result as P_G_Region;
                    if (Model != null) {
                        txtRegionID.value = Model.REGION_CODE.toString();
                        txtRegionDes.value = _ScreenLanguage == "en" ? Model.DESCE : Model.DESCA;
                    }

                }
            });
        });
    }
      
    function btnCustClassID_onclick() {
        
        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;

        sys.FindKey(Modules.SalesComparison, "btnCustClassID", "", () => {
            
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

    //function btnScopeCatID_onclick() {
        
    //    sys.FindKey(Modules.SalesComparison, "btnScopeCatID", ""/* "CompCode = " + _CompCode*/, () => {
    //        let id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({

    //            url: Url.Action("getScopeCategory", ControllerName),
    //            data: { id: id },
    //            success: (d) => {
                    
    //                categ = d.result as P_D_ScopeCategory;
    //                // if (categ != null) {
    //                txtScopeCalID.value = categ.ScopeCategoryID.toString();
    //                txtScopeCalCod.value = categ.ScopeCategCode.toString();
    //                txtScopeCalDes.value = _ScreenLanguage == "en" ? categ.DescE : categ.DescA;
    //                //}



    //            }
    //        });

    //    })
    //}

    //function butScopeID_onclick() {
        
    //    sys.FindKey(Modules.SalesComparison, "butScopeID", "", () => {
            
    //        let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("GetEngSubContractorScope", ControllerName),
    //            data: { id: _Id },
    //            success: (d) => {
    //                let result = d.result as PQ_GetEngSubContractorScope;
    //                txtScopeID.value = result.ScopeId.toString();
    //                txtScopeCode.value = result.ScopeCode.toString();
    //                txtScopeDes.value = _ScreenLanguage == "en" ? result.DescE : result.DescA;


    //            }
    //        });
    //    })
    //}


    function Print() {
        debugger
        let RP: ReportParameters = new ReportParameters();

        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.yearID = Number(txtyer.value); 
        RP.REGION_CODE = Number( txtRegionID.value);
        RP.custClassID = Number(txtCustClass.value);
       

        Ajax.CallAsync({

            url: Url.Action("DSS_SalesBranch", "GeneralReports"),
            data: RP,
            success: (d) => {
                debugger
                let result = d.result as string;
                window.open(result, "_blank");
            }
        })
        

    }


}
















