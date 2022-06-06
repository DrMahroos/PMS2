$(document).ready(() => {
    debugger;
    Prodvsprogress.InitalizeComponent();
});
namespace Prodvsprogress {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "ProjectExpenses";
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;


    var txtSalesEngineerId: HTMLInputElement;
    var txtSalesEngineercode: HTMLInputElement;
    var butEngCode: HTMLButtonElement;
    var btnPrint: HTMLButtonElement;
    var txtDescESalesEngineer: HTMLInputElement;
    var all: HTMLInputElement;
    var ProdNo: HTMLInputElement;
    var Bydiff: HTMLInputElement;
    var ByPhase: HTMLInputElement;
    var ByProjects: HTMLInputElement;
    var MatchingProduction: HTMLInputElement;
  
    var txtSiteEngid: HTMLInputElement = null;
    var txtSiteEngcode: HTMLInputElement = null;
    var txtDescE: HTMLInputElement = null;
    var butSiteEng: HTMLButtonElement;
    var _ScreenLanguage: string;


    var _CompCode: string;
    var _BranchCode: string;
    var Condition: string;
    var SiteEngCode: number;
 
    export function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = btPrint;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;

        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
       

       
        InitalizeEvents();
    }
    function InitalizeControls() {

        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");
        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ByPhase = DocumentActions.GetElementById<HTMLInputElement>("ByPhase");
        ByProjects = DocumentActions.GetElementById<HTMLInputElement>("ByProject");
        all = DocumentActions.GetElementById<HTMLInputElement>("all");
        ProdNo = DocumentActions.GetElementById<HTMLInputElement>("ProdNo");
        Bydiff = DocumentActions.GetElementById<HTMLInputElement>("Bydiff");
        MatchingProduction = DocumentActions.GetElementById<HTMLInputElement>("MatchingProduction");

        txtSalesEngineerId = DocumentActions.GetElementById<HTMLInputElement>("txtSalesEngineerId");
        txtSalesEngineercode = DocumentActions.GetElementById<HTMLInputElement>("txtSalesEngineercode");
        butEngCode = DocumentActions.GetElementById<HTMLButtonElement>("butEngCode");
        txtDescESalesEngineer = DocumentActions.GetElementById<HTMLInputElement>("txtDescESalesEngineer");

        txtSiteEngid = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngid");
        txtSiteEngcode = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngcode");
        txtDescE = DocumentActions.GetElementById<HTMLInputElement>("txtDescE");
        butSiteEng = DocumentActions.GetElementById<HTMLButtonElement>("butSiteEng");
        btnPrint = DocumentActions.GetElementById<HTMLButtonElement>("btnPrint");
    }
    function Clear() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());

         txtSalesEngineerId.value = "";
        txtSalesEngineercode.value = "";
 
       txtSiteEngcode.value = "";
       txtDescE.value = "";
 
    }
   

    function InitalizeEvents() {
        debugger
        butEngCode.onclick = btnSalesEng_Click;
        butSiteEng.onclick = btnSiteEng_Click;
        btnPrint.onclick = btPrint;
        ByPhase.checked = true;
        all.checked = true;
    }
 
    function btnSiteEng_Click() {
        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.Prodvsprogress, "butSiteEng", Condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getEngCode", "SiteEngineer"),
                data: { id: id },
                success: (d) => {
                    debugger;
                    let CatCode = d.result as P_D_SiteEngineer;
                    SiteEngCode = CatCode.SiteEngCategoryId;
                    txtSiteEngcode.value = CatCode.EngCode;
                     if (ClientSharedWork.Session.ScreenLanguage == "ar")
                        txtDescE.value = CatCode.DescA.toString();
                    else
                        txtDescE.value = CatCode.DescE.toString();
                }
            });
        });
    }

    function btnSalesEng_Click() {
        debugger;
        let Condition: string = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.Prodvsprogress, "butEngCode", Condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getSalesEng", "Customers"),
                data: { id: id },
                success: (d) => {
                    var CatCode = d.result as P_D_SalesEgineer;
                    txtSalesEngineerId.value = CatCode.EngCode.toString();
                    txtSalesEngineercode.value = CatCode.SalesEngineerId.toString();
                    if (_ScreenLanguage == "ar")
                        txtDescESalesEngineer.value = CatCode.DeacA.toString();
                    else
                        txtDescESalesEngineer.value = CatCode.DescE.toString();
                }
            });
        });
    }

    function btPrint() {
       
        debugger
        //if (txtSiteEngcode.value == ""&&txtSalesEngineercode.value == "") {
        //    MessageBox.Show("You Must Select Site Engineer Or Sales Engineer", "Info");
        //    return;
        //}
        let RP: ReportParameters = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        RP.SiteEngineerId = Number(txtSiteEngcode.value);
        RP.SalsEngId = Number(txtSalesEngineercode.value)

        if (ByPhase.checked == true) {
            RP.GroupType = 0;
        }
        else if (ByProjects.checked == true) {
            RP.GroupType = 1;
        }
        else {
            RP.GroupType = 2;
        }

        if (all.checked == true) {
            RP.TypeReport = 0;
        }
        else if (ProdNo.checked==true) {
            RP.TypeReport = 1; 
        }
        else if (Bydiff.checked == true) {
            RP.TypeReport = 2; 
        }
        else {
            RP.TypeReport = 3; 
        }

       
            Ajax.CallAsync({
                url: Url.Action("Rep_eng_ProductionVSPRogress", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
      
       







    }
 

}