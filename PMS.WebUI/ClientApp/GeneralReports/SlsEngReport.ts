$(document).ready(() => {
    SlsEngReport.InitalizeComponent();
});
namespace SlsEngReport {
    var sys: SystemTools = new SystemTools();
    var Model: P_D_SalesEgineer = new P_D_SalesEgineer();
    var ajaxCall: AjaxCaller = new AjaxCaller();
    var Area: G_BRANCH = new G_BRANCH();
   
    export var dataSource: Array<P_D_SalesEgineer> = new Array<P_D_SalesEgineer>();
    export var CatCode: P_D_SalesEngCateory = new P_D_SalesEngCateory();

    var txtSalesEngCategoryIdRp: HTMLInputElement;
    var txtCategCodeRp: HTMLInputElement=null;
    var butSalesEngCategor: HTMLButtonElement;
    var txtBraCodeRp: HTMLInputElement=null;
    var txtAreaNameRp: HTMLInputElement;
    var btnAreaRp: HTMLButtonElement;
    //Just put the elements IDs  
    var SLsEngCode: number;
   
    //Initalize The Current Popup
    export function InitalizeComponent() {
        
        //SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        InitalizeControls();
        InitalizeEvents();
        
    }
    function InitalizeControls() {
        txtSalesEngCategoryIdRp = DocumentActions.GetElementById<HTMLInputElement>("txtSalesEngCategoryIdRp");
        txtCategCodeRp = DocumentActions.GetElementById<HTMLInputElement>("txtCategCodeRp");
        butSalesEngCategor = DocumentActions.GetElementById<HTMLButtonElement>("butSalesEngCategor");
        txtBraCodeRp = DocumentActions.GetElementById<HTMLInputElement>("txtBraCodeRp");
        txtAreaNameRp = DocumentActions.GetElementById<HTMLInputElement>("txtAreaNameRp");
        btnAreaRp = DocumentActions.GetElementById<HTMLButtonElement>("btnAreaRp");
        txtBraCodeRp.value = "";
    }
    function InitalizeEvents() {
        debugger
     
        butSalesEngCategor.onclick = btnCategoryCode_Click;
       
        btnAreaRp.onclick = btnBraCode_Click;
    }
   
    //Print Current Report
    function Print() {
       
        let rp: ReportParameters = new ReportParameters();
        
        rp.CompCode = SharedSession.CurrentEnvironment.CompCode;
        rp.braCode = SharedSession.CurrentEnvironment.BranchCode;
       
        rp.CatID = SLsEngCode;
        rp.bra = Number(txtBraCodeRp.value);
        if (<boolean>$("#ActiveRp").prop("checked")) { rp.Active = 1; }
        else if (<boolean>$("#NoActiveRp").prop("checked")) { rp.Active = 0; }
        else if (<boolean>$("#AllRp").prop("checked")) { rp.Active = null; };
      
          Ajax.CallAsync({
              url: Url.Action("rptSalesEng", "GeneralReports"),
            data: rp,
            success: (d) => {
                let result = d.result as string;
                window.open(result, "_blank");
            }
        })
    }
    function Clear() {
        txtAreaNameRp.value = "";
      
       txtSalesEngCategoryIdRp.value = "";
       
       txtCategCodeRp.value = "";
      txtBraCodeRp.value = "";
      $("#AllRp").prop("checked", "checked");
       }
   
    function btnBraCode_Click() {
        sys.FindKey(Modules.SalesEngineer, "btnAreaRp", "COMP_CODE = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "SalesEngineer"),
                data: { id: id },
                success: (d) => {
                    Area = d.result as G_BRANCH;
                    txtBraCodeRp.value = Area.BRA_CODE.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar")
                        txtAreaNameRp.value = Area.BRA_DESCL.toString();
                    else
                        txtAreaNameRp.value = Area.BRA_DESC.toString();
                }
            });
        });
    }
    function btnCategoryCode_Click() {
     
        sys.FindKey(Modules.SalesEngineer, "butSalesEngCategor", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getCategoryCode", "SalesEngineer"),
                data: { id: id },
                success: (d) => {
                    
                    CatCode = d.result as P_D_SalesEngCateory;
                    SLsEngCode = CatCode.SalesEngCategoryId;
                  txtSalesEngCategoryIdRp.value = CatCode.CategCode.toString();
                   txtCategCodeRp.value = CatCode.DescA.toString();
                }
            });
        });
    }
}