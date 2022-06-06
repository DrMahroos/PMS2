$(document).ready(() => {
    CC_ByScope.InitalizeComponent();
});
namespace CC_ByScope {
    
    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "CC_ByScope";
    var categ: P_D_ScopeCategory = new P_D_ScopeCategory();
    var Model: P_G_Region = new P_G_Region();
    //-------
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;
    //-------
    var txtCustClass: HTMLInputElement;
    var txtCustClassCod: HTMLInputElement;
    var txtCustClassDes: HTMLInputElement;
    var btnCustClassID: HTMLButtonElement;
    //-------
    var txtRegionID: HTMLInputElement;
    var txtRegionCode: HTMLInputElement;
    var txtRegionDes: HTMLInputElement;
    var btnRegionID: HTMLButtonElement;
    //------
    var txtScopeCalID: HTMLInputElement;
    var txtScopeCalCod: HTMLInputElement;
    var txtScopeCalDes: HTMLInputElement;
    var btnScopeCalID: HTMLButtonElement;
    //-----
   
    //------
    var RedAllProject: HTMLInputElement;
    var RedNonRepair: HTMLInputElement;
    var RedRepair: HTMLInputElement;
    //-------
    var RedByBranch:HTMLInputElement;
    var RedByScope:HTMLInputElement;
    var btnPrint: HTMLInputElement;
    //-------
    var _CompCode: string;
    var _BranchCode: string;
    var _ScreenLanguage: string;
    //-------
    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

    export function InitalizeComponent() {
        
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        
        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();


        //getbranchname();
    }
    function InitalizeControls() {

        //---------- textID---------
        debugger;
       txtCustClass = DocumentActions.GetElementById<HTMLInputElement>("txtCustClass");
       txtCustClassCod = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassCod");
       txtCustClassDes = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassDes");
       btnCustClassID = DocumentActions.GetElementById<HTMLButtonElement>("btnCustClassID");

        txtRegionID = DocumentActions.GetElementById<HTMLInputElement>("txtRegionID");
        txtRegionDes = DocumentActions.GetElementById<HTMLInputElement>("txtRegionDes");
        txtRegionCode = DocumentActions.GetElementById<HTMLInputElement>("txtRegionCode");
        btnRegionID = DocumentActions.GetElementById<HTMLButtonElement>("btnRegionID");

        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");

        


        txtScopeCalID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCalID");
        txtScopeCalCod = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCalCod");
        txtScopeCalDes = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCalDes");
        btnScopeCalID = DocumentActions.GetElementById<HTMLButtonElement>("btnScopeCalID");

        //---------- redeo---------


        RedAllProject = DocumentActions.GetElementById<HTMLInputElement>("RedAllProject");
        RedNonRepair = DocumentActions.GetElementById<HTMLInputElement>("RedNonRepair");
        RedRepair = DocumentActions.GetElementById<HTMLInputElement>("RedRepair");

        RedByBranch = DocumentActions.GetElementById<HTMLInputElement>("RedByBranch");
        RedByScope = DocumentActions.GetElementById<HTMLInputElement>("RedByScope");
        
        //--------------
        RedAllProject.checked = true; 
        RedByBranch.checked = true; 
    }
    function Clear() {
        RedAllProject.checked = true;
        RedByBranch.checked = true; 

        txtCustClass.value = "";
        txtCustClassCod.value = "";
        txtCustClassDes.value = "";
        txtRegionID.value = "";
        txtRegionDes.value = "";
        txtRegionCode.value = "";
      
        txtScopeCalID.value = "";
        txtScopeCalCod.value = "";                                     
        txtScopeCalDes.value = "";                                    
    }                                                                 
    function InitalizeEvents() {                                       
        

        
        btnScopeCalID.onclick = btnScopeCatID_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;
        btnRegionID.onclick = btnRegionID_onclick;
        

    }
    
    function btnRegionID_onclick() {
        
        sys.FindKey(Modules.ByCustomerClass, "btnRegionID", "COMP_CODE = " + _CompCode, () => {
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

        sys.FindKey(Modules.ByScopeCategory, "btnCustClassID", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerClassById", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as P_D_SalesCustomerCategory;
                    txtCustClass.value = result.CustomerCategoryID.toString();
                    txtCustClassCod.value = result.CustomerCatCode.toString();
                    txtCustClassDes.value = _ScreenLanguage == "en" ? result.DescE : result.DescA;




                }
            });
        })

    }

    function btnScopeCatID_onclick() {
        
        sys.FindKey(Modules.ByCustomerClass, "btnScopeCatID", ""/* "CompCode = " + _CompCode*/, () => {
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


    


    function Print() {
        
        let RP: ReportParameters = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = "";
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
        RP.REGION_CODE = Number(txtRegionID.value);
        RP.ScopeCategoryID = Number(txtScopeCalID.value);
        RP.custClassID = Number(txtCustClass.value);


        if ($("#RedNonRepair").prop("checked") == true) {
        RP.ISRepair = 0; 
        }
        else if ($("#RedRepair").prop("checked") == true) {
        RP.ISRepair = 1;
        }
        else if ($("#RedAllProject").prop("checked") == true) {
            RP.ISRepair = 3;

        }
        RP.TypeReport = 1; 
       if (RedByBranch.checked)
            RP.GroupType = 1; 
        else 
            RP.GroupType = 2; 

        Ajax.CallAsync({

            url: Url.Action("Rep_DSS_CollectiveWorkBYScope", "GeneralReports"),
            data: RP,
            success: (d) => {
                debugger
                let result = d.result as string;
                window.open(result, "_blank");
            }


        })


    }
}

