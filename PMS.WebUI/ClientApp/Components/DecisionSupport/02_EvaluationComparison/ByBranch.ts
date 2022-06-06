$(document).ready(() => {
    ByBranch.InitalizeComponent();
});
namespace ByBranch {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "ByBranch";

    var categ: P_D_ScopeCategory = new P_D_ScopeCategory();
    var Model: P_G_Region = new P_G_Region();

    //--
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;

    var txtCustClass: HTMLInputElement;
    var txtCustClassCod: HTMLInputElement;
    var txtCustClassDes: HTMLInputElement;
    var btnCustClassID: HTMLButtonElement;


    var txtBranch: HTMLInputElement;
    var txtBranchCod: HTMLInputElement;
    var txtBranchDes: HTMLInputElement;
    var btnBranch: HTMLButtonElement;
    //--
    var txtRegionID: HTMLInputElement;
    var txtRegionCode: HTMLInputElement;
    var txtRegionDes: HTMLInputElement;
    var btnRegionID: HTMLButtonElement;
    //--

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
      
        InitalizeEvents();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        
    }
    function InitalizeControls() {

        //---------- textID---------

        txtRegionID = DocumentActions.GetElementById<HTMLInputElement>("txtRegionID");
        txtRegionDes = DocumentActions.GetElementById<HTMLInputElement>("txtRegionDes");
        txtRegionCode = DocumentActions.GetElementById<HTMLInputElement>("txtRegionCode");
        btnRegionID = DocumentActions.GetElementById<HTMLButtonElement>("btnRegionID");

        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");

        txtCustClass = DocumentActions.GetElementById<HTMLInputElement>("txtCustClass");
        txtCustClassCod = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassCod");
        txtCustClassDes = DocumentActions.GetElementById<HTMLInputElement>("txtCustClassDes");
        btnCustClassID = DocumentActions.GetElementById<HTMLButtonElement>("btnCustClassID");

        //txtBranch = DocumentActions.GetElementById<HTMLInputElement>("txtBranch");
        //txtBranchCod = DocumentActions.GetElementById<HTMLInputElement>("txtBranchCod");
        //txtBranchDes = DocumentActions.GetElementById<HTMLInputElement>("txtBranchDes");
        //btnBranch = DocumentActions.GetElementById<HTMLButtonElement>("btnBranch");


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
        txtRegionID.value = "";
        txtRegionDes.value = "";
        txtRegionCode.value = "";
        txtBranch.value = "";
        txtBranchCod.value = "";
        txtBranchDes.value = "";
        btnBranch.value = "";
        txtScopeCalID.value = "";
        txtScopeCalCod.value = "";
        txtScopeCalDes.value = "";
    }
    function InitalizeEvents() {
        


        btnScopeCalID.onclick = btnScopeCatID_onclick;
        butScopeID.onclick = butScopeID_onclick;
        btnRegionID.onclick = btnRegionID_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;

    }



    function btnRegionID_onclick() {

        sys.FindKey(Modules.ByScopeCategory, "btnRegionID", "", () => {

            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getRegionByid", ControllerName),
                data: { id: id },
                success: (d) => {
                    debugger
                    let result = d.result as P_G_Region;
                   
                    txtRegionCode.value = result.REGION_CODE.toString();
                    txtRegionDes.value = _ScreenLanguage == "en" ? result.DESCE   : result.DESCA;




                }
            });
            //AjaxApi.CallAsyncApi({
            //    url: sys.apiUrl("P_TR_EngProject", "GetRegion"),

            //    // url: sys.apiUrl("P_G_Region", "GetRegion"),
            //    data: { id: id },
            //    success: (d) => {
            //        debugger;
            //        let result = d as BaseResponse;
            //        if (result.IsSuccess) {
            //            debugger;
            //            Model = result.Response as P_G_Region;
            //            debugger;
            //            txtRegionCode.value = (Model.REGION_CODE).toString();
            //            debugger;
            //            txtRegionDes.value = _ScreenLanguage == "ar" ? Model.DESCA : Model.DESCE; 2
            //        }
            //    }
            //});

        });
    }
      
    function btnCustClassID_onclick() {
        
        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;

        sys.FindKey(Modules.ByBranch, "btnCustClassID", "", () => {
            
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

    function btnScopeCatID_onclick() {
        
        sys.FindKey(Modules.ByBranch, "btnScopeCatID", ""/* "CompCode = " + _CompCode*/, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({

                url: Url.Action("getScopeCategory", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    categ = d.result as P_D_ScopeCategory;
                     if (categ != null) {
                    txtScopeCalID.value = categ.ScopeCategoryID.toString();
                    txtScopeCalCod.value = categ.ScopeCategCode.toString();
                    txtScopeCalDes.value = _ScreenLanguage == "en" ? categ.DescE : categ.DescA;
                    }



                }
            });

        })
    }

    function butScopeID_onclick() {
        
        sys.FindKey(Modules.ByBranch, "butScopeID", "", () => {
            
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
        RP.braCode = ""
        RP.REGION_CODE = 0;
        RP.CatID = 0;
        RP.ScopeCategoryID = 0;
        RP.ScopeID = 0;
        RP.ISRepair = 3;
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
        RP.REGION_CODE = Number(txtRegionCode.value);
        RP.CatID = Number(txtCustClass.value);
        RP.ScopeCategoryID = Number(txtScopeCalID.value);
        RP.ScopeID = Number(txtScopeID.value);
        if ($("#RedNonRepair").prop("checked") == true) {
            RP.ISRepair = 0;
        }
        else if ($("#RedRepair").prop("checked") == true) {
            RP.ISRepair = 1;
        }
        else if ($("#RedAllProject").prop("checked") == true) {
            RP.ISRepair = 3;

        }

        RP.GroupType = 2


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
















