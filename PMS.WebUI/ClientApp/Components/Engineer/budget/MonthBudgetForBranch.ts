$(document).ready(() => {
    MonthBudgetForBranch.InitalizeComponent();
});
namespace MonthBudgetForBranch {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "MonthBudgetForBranch";


    var txtBraID: HTMLInputElement;
    var txtBraRP: HTMLInputElement;
    var btnBraRP: HTMLButtonElement;
    var txtBra1RP: HTMLInputElement;




    var txtYearID: HTMLInputElement;



    var txtMonthID: HTMLInputElement;

    
    var _ScreenLanguage: string;

    

    export function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
        txtYearID.value = SharedSession.CurrentEnvironment.CurrentYear;
        txtBraRP.value = SharedSession.CurrentEnvironment.BranchCode;
        getbranchname();
    }
    function InitalizeControls() {

        txtBraID = DocumentActions.GetElementById<HTMLInputElement>("txtBraID");
        txtBraRP = DocumentActions.GetElementById<HTMLInputElement>("txtBraRP");
        btnBraRP = DocumentActions.GetElementById<HTMLButtonElement>("btnBraRP");
        txtBra1RP = DocumentActions.GetElementById<HTMLInputElement>("txtBra1RP");



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
        
        
        txtBraID.value = "";
        txtBraRP.value = "";
        txtBra1RP.value = "";
        
        txtYearID.value = "";
        
        txtMonthID.value = "";
        

    }
    function Print() {
        debugger
        let RP: ReportParameters = new ReportParameters();
        
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = Number(txtBraRP.value).toString();
        RP.yearID = Number(txtYearID.value);
        RP.Monid = (txtMonthID.value);

        

        Ajax.CallAsync({
            url: Url.Action("rptEng_MonthBudgetForBranch", "GeneralReports"),
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
        btnBraRP.onclick = btnEngRP_Click;
    }

    function btnEngRP_Click() {
        
   
        sys.FindKey(Modules.SubCandidate, "butBraCode", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetBranchByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as G_BRANCH;
                    txtBraID.value = result.BRA_CODE.toString();
                    txtBraRP.value = result.BRA_CODE.toString();
                    if (_ScreenLanguage == "ar") {
                        txtBra1RP.value = result.BRA_DESCL;
                    }
                    else {
                        txtBra1RP.value = result.BRA_DESCE;
                    }

                }
            });
        })


    }


    function getbranchname()
    {

        let _Id = SharedSession.CurrentEnvironment.BranchCode;
        Ajax.CallAsync({
            url: Url.Action("GetBranchByID", ControllerName),
            data: { id: _Id },
            success: (d) => {
                
                let result = d.result as G_BRANCH;
                txtBraID.value = result.BRA_CODE.toString();
                txtBraRP.value = result.BRA_CODE.toString();
                if (_ScreenLanguage == "ar") {
                    txtBra1RP.value = result.BRA_DESCL;
                }
                else {
                    txtBra1RP.value = result.BRA_DESCE;
                }

            }
        });
    }




}