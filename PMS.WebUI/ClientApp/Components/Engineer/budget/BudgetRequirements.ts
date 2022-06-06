$(document).ready(() => {
    BudgetRequirements.InitalizeComponent();
});
namespace BudgetRequirements {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "BudgetRequirements";
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;

    var txtBranchID: HTMLInputElement;
    var txtBranchRP: HTMLInputElement;
    var btnBranchRP: HTMLButtonElement;
    var txtBranch1RP: HTMLInputElement;



    var txtProjectID: HTMLInputElement;
    var txtYearID: HTMLInputElement;
    var btnProjectRP: HTMLButtonElement;
    var txtProject1RP: HTMLInputElement;


    var txtPhaseID: HTMLInputElement;
    var txtMonthID: HTMLInputElement;
    var btnPhaseRP: HTMLButtonElement;
    var txtPhase1RP: HTMLInputElement;


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
        txtBranchRP.value = SharedSession.CurrentEnvironment.BranchCode;

        getbranchname();
    }
    function InitalizeControls() {

        txtBranchID = DocumentActions.GetElementById<HTMLInputElement>("txtBranchID");
        txtBranchRP = DocumentActions.GetElementById<HTMLInputElement>("txtBranchRP");
        btnBranchRP = DocumentActions.GetElementById<HTMLButtonElement>("btnBranchRP");
        txtBranch1RP = DocumentActions.GetElementById<HTMLInputElement>("txtBranch1RP");



        txtProjectID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectID");
        txtYearID = DocumentActions.GetElementById<HTMLInputElement>("txtYearID");
        btnProjectRP = DocumentActions.GetElementById<HTMLButtonElement>("btnProjectRP");
        txtProject1RP = DocumentActions.GetElementById<HTMLInputElement>("txtProject1RP");

        txtPhaseID = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseID");
        txtMonthID = DocumentActions.GetElementById<HTMLInputElement>("txtMonthID");
        btnPhaseRP = DocumentActions.GetElementById<HTMLButtonElement>("btnPhaseRP");
        txtPhase1RP = DocumentActions.GetElementById<HTMLInputElement>("txtPhase1RP");






    }
    function Clear() {
        
        //FromDate.value = DateFormat(new Date().toString());
        //ToDate.value = DateFormat(new Date().toString());

        txtBranchID.value = "";
        txtBranchRP.value = "";
        txtBranch1RP.value = "";



        txtYearID.value = "";



        txtMonthID.value = "";



        IsLabor = 0;
        IsEquip = 0;
        IsMat = 0;

        $("#IsLaborID").prop("checked", "");
        $("#IsEquipID").prop("checked", "");
        $("#IsMatID").prop("checked", "");
    }
    function Print() {
        debugger
        let RP: ReportParameters = new ReportParameters();


        if (<boolean>$("#IsLaborID").prop("checked")) {
            IsLabor = 1;
        }
        else {
            IsLabor = 0;
        }
        if (<boolean>$("#IsEquipID").prop("checked")) {
            IsEquip = 1;
        }
        else {
            IsEquip = 0;
        }
        if (<boolean>$("#IsMatID").prop("checked")) {
            IsMat = 1;
        }
        else {
            IsMat = 0;
        }


        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = txtBranchID.value;
        RP.yearID = Number(txtYearID.value);
        RP.Monid = (txtMonthID.value);

        RP.IsLabor = IsLabor;
        RP.IsEquip = IsEquip;
        RP.IsMat = IsMat;


        Ajax.CallAsync({
            url: Url.Action("rptEng_BudgetRequirements", "GeneralReports"),
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
        $("#Rrd_phase").prop("checked", "checked");
        btnBranchRP.onclick = btnBranchRP_Click;
        
    }

    function btnBranchRP_Click() {
        
        sys.FindKey(Modules.SubCandidate, "butBraCode", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetBranchByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as G_BRANCH;
                    txtBranchID.value = result.BRA_CODE.toString();
                    txtBranchRP.value = result.BRA_CODE.toString();
                    if (_ScreenLanguage == "ar") {
                        txtBranch1RP.value = result.BRA_DESCL;
                    }
                    else {
                        txtBranch1RP.value = result.BRA_DESCE;
                    }

                }
            });
        })
    }
    function getbranchname() {
        let _Id = SharedSession.CurrentEnvironment.BranchCode;
        Ajax.CallAsync({
            url: Url.Action("GetBranchByID", ControllerName),
            data: { id: _Id },
            success: (d) => {
                let result = d.result as G_BRANCH;
                txtBranchID.value = result.BRA_CODE.toString();
                txtBranchRP.value = result.BRA_CODE.toString();
                txtBranch1RP.value = _ScreenLanguage == "ar" ? result.BRA_DESCL : txtBranch1RP.value = result.BRA_DESCE;
            }
        });

    }



}