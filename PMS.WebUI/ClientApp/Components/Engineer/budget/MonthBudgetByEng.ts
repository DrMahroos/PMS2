$(document).ready(() => {
    MonthBudgetByEng.InitalizeComponent();
});
namespace MonthBudgetByEng {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "MonthBudgetByEng";


    var txtEngID: HTMLInputElement;
    var txtEngRP: HTMLInputElement;
    var btnEngRP: HTMLButtonElement;
    var txtEng1RP: HTMLInputElement;



  
    var txtYearID: HTMLInputElement;
   

    
    var txtMonthID: HTMLInputElement;



    var IsLabor: number = 0;
    var IsEquip: number = 0;
    var IsMat: number = 0;


    var _ScreenLanguage: string;

    var Phase_Status: string;

    export function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
        txtYearID.value = SharedSession.CurrentEnvironment.CurrentYear;
        txtEngRP.value = SharedSession.CurrentEnvironment.BranchCode;
        getprojengname();
    }
    function InitalizeControls() {

        txtEngID = DocumentActions.GetElementById<HTMLInputElement>("txtEngID");
        txtEngRP = DocumentActions.GetElementById<HTMLInputElement>("txtEngRP");
        btnEngRP = DocumentActions.GetElementById<HTMLButtonElement>("btnEngRP");
        txtEng1RP = DocumentActions.GetElementById<HTMLInputElement>("txtEng1RP");



        //txtProjectID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectID");
        txtYearID = DocumentActions.GetElementById<HTMLInputElement>("txtYearID");
        //btnProjectRP = DocumentActions.GetElementById<HTMLButtonElement>("btnProjectRP");
        //txtProject1RP = DocumentActions.GetElementById<HTMLInputElement>("txtProject1RP");

        //txtPhaseID = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseID");
        txtMonthID = DocumentActions.GetElementById<HTMLInputElement>("txtMonthID");
        //btnPhaseRP = DocumentActions.GetElementById<HTMLButtonElement>("btnPhaseRP");
        //txtPhase1RP = DocumentActions.GetElementById<HTMLInputElement>("txtPhase1RP");






    }
    function Clear() {
        
        //FromDate.value = DateFormat(new Date().toString());
        //ToDate.value = DateFormat(new Date().toString());

        txtEngID.value = "";
        txtEngRP.value = "";
        txtEng1RP.value = "";



        txtYearID.value = "";



        txtMonthID.value = "";


        
    }
    function Print() {
        debugger
        let RP: ReportParameters = new ReportParameters();


       

        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = Number(txtEngRP.value).toString();
        RP.yearID = Number(txtYearID.value);
        RP.Monid = (txtMonthID.value);

        RP.EngID = Number(txtEngID.value);

        Ajax.CallAsync({
            url: Url.Action("rptEng_MonthBudgetByEng", "GeneralReports"),
            data: RP,
            success: (d) => {
                debugger
                let result = d.result as string;
                window.open(result, "_blank");
            }
        })
        

    }

    function InitalizeEvents() {
        debugger
        //$("#Rrd_phase").prop("checked", "checked");
        btnEngRP.onclick = btnEngRP_Click;
      
    }

    function btnEngRP_Click() {
        
        sys.FindKey(Modules.MonthBudgetByEng, "btnEng", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProjectEng", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as P_D_SiteEngineer;
                    txtEngID.value = result.SiteEngineerId.toString();
                    txtEngRP.value = result.EngCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtEng1RP.value = result.DescA;
                    }
                    else {
                        txtEng1RP.value = result.DescE;
                    }

                }
            });
        })
    }

    

    function getprojengname()
    {
        let _Id = SharedSession.CurrentEnvironment.BranchCode;
        Ajax.CallAsync({
            url: Url.Action("GetSrchProjectEng", ControllerName),
            data: { id: _Id },
            success: (d) => {

                let result = d.result as P_D_SiteEngineer;
                txtEngID.value = result.SiteEngineerId.toString();
                txtEngRP.value = result.EngCode.toString();

                if (_ScreenLanguage == "ar") {
                    txtEng1RP.value = result.DescA;
                }
                else {
                    txtEng1RP.value = result.DescE;
                }

            }
        });
    }

}