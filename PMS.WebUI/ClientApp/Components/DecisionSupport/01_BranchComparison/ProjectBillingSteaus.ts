$(document).ready(() => {
    ProjectBillingSteaus.InitalizeComponent();
});
namespace ProjectBillingSteaus {
    
    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "CC_ByScope";
    var categ: P_D_ScopeCategory = new P_D_ScopeCategory();
    var Model: P_G_Region = new P_G_Region();
    //-------
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;
    //-------
    
    //-------
    var txtRegionID: HTMLInputElement;
    var txtRegionCode: HTMLInputElement;
    var txtRegionDes: HTMLInputElement;
    var btnRegionID: HTMLButtonElement;
    var txtBranch: HTMLInputElement;
    var txtBranchCod: HTMLInputElement;
    var txtBranchDes: HTMLInputElement;
    var btnBranch: HTMLButtonElement;
    var btnPrintEXEL: HTMLButtonElement;
    var TypeReport: number=0;
    var _CompCode: string;
    var _BranchCode: string;
    var _ScreenLanguage: string;
    var REGION_CODE;
    //-------
    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

    export function InitalizeComponent() {
        
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = ChekPrint;
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
        btnPrintEXEL = DocumentActions.GetElementById<HTMLButtonElement>("btnPrintEXEL");

        txtBranch = DocumentActions.GetElementById<HTMLInputElement>("txtBranch");
        txtBranchCod = DocumentActions.GetElementById<HTMLInputElement>("txtBranchCod");
        txtBranchDes = DocumentActions.GetElementById<HTMLInputElement>("txtBranchDes");
        btnBranch = DocumentActions.GetElementById<HTMLButtonElement>("btnBranch");

        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");
        


        

        //---------- redeo---------

  
        
        //--------------
     }
    function Clear() {
 
       
        txtRegionID.value = "";
        txtRegionDes.value = "";
        txtRegionCode.value = "";
      
                                       
    }                                                                 
    function InitalizeEvents() {   
     
        btnRegionID.onclick = btnRegionID_onclick;
        btnBranch.onclick = btnBranch_onclick;
        btnPrintEXEL.onclick = btnPrintEXEL_onclick;

    }
    function btnBranch_onclick() {  
        sys.FindKey(Modules.ProjectBillingSteaus, "btnBranch", "REGION_CODE =" + REGION_CODE + " "   , () => {

            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetBranchByID", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as G_BRANCH;
                    txtBranchCod.value = result.BRA_CODE.toString();
                    txtBranchDes.value = _ScreenLanguage == "ar" ? result.BRA_DESC : result.BRA_DESCE; 2

                }
            });
        })
    }
    function btnRegionID_onclick() {
        
        sys.FindKey(Modules.ProjectBillingSteaus, "btnRegionID", "COMP_CODE = " + _CompCode, () => {
            let _id = ClientSharedWork.SearchDataGrid.SelectedKey;
            REGION_CODE = _id;
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

   
    function ChekPrint() {
        TypeReport = 1
        Print();
    }

  
    function btnPrintEXEL_onclick() {
        TypeReport = 3
        Print();
    }

    


    function Print() {
        
        let RP: ReportParameters = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
        RP.REGION_CODE = Number(txtRegionID.value);
        RP.braCode = txtBranchCod.value;
        RP.TypeReport = TypeReport;
  
       
        Ajax.CallAsync({

            url: Url.Action("Rep_DSS_BillingStatus", "GeneralReports"),
            data: RP,
            success: (d) => {
                 let result = d.result as string;
                window.open(result, "_blank");
            }


        })


    }
}

