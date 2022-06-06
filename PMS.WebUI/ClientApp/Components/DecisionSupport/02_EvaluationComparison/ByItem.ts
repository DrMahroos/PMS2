$(document).ready(() => {
    ByItem.InitalizeComponent();
});
namespace ByItem {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "ByItem";

    var categ: P_D_ScopeCategory = new P_D_ScopeCategory();
    var Model: P_G_Region = new P_G_Region();

    //--
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;

    var txtCustClass: HTMLInputElement;
    var txtCustClassCod: HTMLInputElement;
    var txtCustClassDes: HTMLInputElement;
    var btnCustClassID: HTMLButtonElement;

        
    var txtScopeCalID: HTMLInputElement;
    var txtScopeCalCod: HTMLInputElement;
    var txtScopeCalDes: HTMLInputElement;
    var btnScopeCalID: HTMLButtonElement;

    var txtScopeID: HTMLInputElement;
    var txtScopeCode: HTMLInputElement;
    var txtScopeDes: HTMLInputElement;
    var butScopeID: HTMLButtonElement;

    var RedAllProject: HTMLInputElement;
    var RedNewProjects: HTMLInputElement;
    var RedAdditionalWork: HTMLInputElement;



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
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
      

        //getbranchname();
    }
    function InitalizeControls() {

        //---------- textID---------

       
        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");

        txtCustClass = DocumentActions.GetElementById<HTMLInputElement>("txtCustClass");
        txtCustClassCod = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassCod");
        txtCustClassDes = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassDes");
        btnCustClassID = DocumentActions.GetElementById<HTMLButtonElement>("btnCustClassID");
              

        txtScopeCalID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCalID");
        txtScopeCalCod = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCalCod");
        txtScopeCalDes = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCalDes");
        btnScopeCalID = DocumentActions.GetElementById<HTMLButtonElement>("btnScopeCalID");

        txtScopeID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeID");
        txtScopeCode = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCode");
        txtScopeDes = DocumentActions.GetElementById<HTMLInputElement>("txtScopeDes");
        butScopeID = DocumentActions.GetElementById<HTMLButtonElement>("butScopeID");

        //---------- redeo---------


        RedAllProject = DocumentActions.GetElementById<HTMLInputElement>("RedAllProject");
        RedAllProject.checked = true 

        //--------------
    }
    function Clear() {
        RedAllProject.checked = true 

        txtCustClass.value = "";
        txtCustClassCod.value = "";
        txtCustClassDes.value = "";
       
        
        txtScopeCalID.value = "";
        txtScopeCalCod.value = "";
        txtScopeCalDes.value = "";
    }
    function InitalizeEvents() {
        

        
        btnScopeCalID.onclick = btnScopeCatID_onclick;
        butScopeID.onclick = butScopeID_onclick;      
        btnCustClassID.onclick = btnCustClassID_onclick;

    }
    
    function btnScopeCatID_onclick() {
        
        sys.FindKey(Modules.ByItem, "btnScopeCatID", ""/* "CompCode = " + _CompCode*/, () => {
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

    function butScopeID_onclick() {
        
        sys.FindKey(Modules.ByItem, "butScopeID", "", () => {
            
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

    function btnCustClassID_onclick() {
        
        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;

        sys.FindKey(Modules.ByItem, "btnCustClassID", "", () => {
            
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

    function Print() {
        debugger
        let RP: ReportParameters = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;        
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;       
        RP.CatID = Number(txtCustClass.value);
        RP.ScopeCategoryID = Number(txtScopeCalID.value);
        RP.ScopeID = Number(txtScopeID.value);
        RP.REGION_CODE = 0;
        RP.braCode = "0";
        if (($("#RedNonRepair").prop("checked") == true)) {
            RP.ISRepair = 0;
        }
        else if (($("#RedRepair").prop("checked") == true)) {
            RP.ISRepair = 1;
        }
        else if (($("#RedAllProject").prop("checked") == true)) {
            RP.ISRepair = 3;

        }

        RP.GroupType =1


        Ajax.CallAsync({

            url: Url.Action("Rep_DSS_ProjectEvaluation", "GeneralReports"),
            data: RP,
            success: (d) => {
                debugger
                let result = d.result as string;
                window.open(result, "_blank");
            }


        })


    }
}
















