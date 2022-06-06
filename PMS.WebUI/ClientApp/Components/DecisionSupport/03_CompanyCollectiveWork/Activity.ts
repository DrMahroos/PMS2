$(document).ready(() => {
    Activity.InitalizeComponent();
});
namespace Activity {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "Activity";

    var categ: P_D_ScopeCategory = new P_D_ScopeCategory();
    var Model: P_G_Region = new P_G_Region();

    //--
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;

    var txtCustClass: HTMLInputElement;
    var txtCustClassCod: HTMLInputElement;
    var txtCustClassDes: HTMLInputElement;
    var btnCustClassID: HTMLButtonElement;
    
   
    //--
    var txtRegionID: HTMLInputElement;
    var txtRegionCode: HTMLInputElement;
    var txtRegionDes: HTMLInputElement;
    var btnRegionID: HTMLButtonElement;
    //--
    
    var RedAllProject: HTMLInputElement;
    var RedNonRepair: HTMLInputElement;
    var RedRepair: HTMLInputElement; 

    var RedByBranch: HTMLInputElement;
    var RedByScope: HTMLInputElement;

    var _CompCode: string;
    var _BranchCode: string;
    var btnPrint: HTMLInputElement;
    var _ScreenLanguage: string;

    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

    export function InitalizeComponent() {
        
        GeneralReports.OnClear = Clear;
        //GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;

        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();


        //getbranchname();
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

        
        //---------- redeo---------


        RedAllProject = DocumentActions.GetElementById<HTMLInputElement>("RedAllProject");
        RedNonRepair = DocumentActions.GetElementById<HTMLInputElement>("RedNonRepair");
        RedRepair = DocumentActions.GetElementById<HTMLInputElement>("RedRepair");
        RedByBranch = DocumentActions.GetElementById<HTMLInputElement>("RedByBranch");
        RedByScope = DocumentActions.GetElementById<HTMLInputElement>("RedByScope");
        //--------------
    }

    function Clear() {
        

        txtCustClass.value = "";
        txtCustClassCod.value = "";
        txtCustClassDes.value = "";
        txtRegionID.value = "";
        txtRegionDes.value = "";
        txtRegionCode.value = "";
  
    }

    function InitalizeEvents() {
        

        
        btnRegionID.onclick = btnRegionID_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;

    }

    function btnRegionID_onclick() {
        debugger
        sys.FindKey(Modules.ByActivity, "btnRegionID", "COMP_CODE = " + _CompCode, () => {
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

        sys.FindKey(Modules.ByActivity, "btnCustClassID", "", () => {
            
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

}


