$(document).ready(() => {
    ProjectRequirements.InitalizeComponent();
});
namespace ProjectRequirements {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "ProjectRequirements";
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;

    var txtBranchID: HTMLInputElement;
    var txtBranchRP: HTMLInputElement;
    var btnBranchRP: HTMLButtonElement;
    var txtBranch1RP: HTMLInputElement;
    


    var txtProjectID: HTMLInputElement;
    var txtProjectRP: HTMLInputElement;
    var btnProjectRP: HTMLButtonElement;
    var txtProject1RP: HTMLInputElement;


    var txtPhaseID: HTMLInputElement;
    var txtPhaseRP: HTMLInputElement;
    var btnPhaseRP: HTMLButtonElement;
    var txtPhase1RP: HTMLInputElement;


    var _ScreenLanguage: string;

    var Phase_Status: string;
    var Condition;
    var _CompCode;
    var _BranchCode;
    export function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
        debugger;
       _CompCode=  SharedSession.CurrentEnvironment.CompCode;
       _BranchCode= SharedSession.CurrentEnvironment.BranchCode;
        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
    }
    function InitalizeControls() {

        //txtBranchID = DocumentActions.GetElementById<HTMLInputElement>("txtBranchID");
        //txtBranchRP = DocumentActions.GetElementById<HTMLInputElement>("txtBranchRP");
        //btnBranchRP = DocumentActions.GetElementById<HTMLButtonElement>("btnBranchRP");
        //txtBranch1RP = DocumentActions.GetElementById<HTMLInputElement>("txtBranch1RP");



        txtProjectID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectID");
        txtProjectRP = DocumentActions.GetElementById<HTMLInputElement>("txtProjectRP");
        btnProjectRP = DocumentActions.GetElementById<HTMLButtonElement>("btnProjectRP");
        txtProject1RP = DocumentActions.GetElementById<HTMLInputElement>("txtProject1RP");

        txtPhaseID = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseID");
        txtPhaseRP = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseRP");
        btnPhaseRP = DocumentActions.GetElementById<HTMLButtonElement>("btnPhaseRP");
        txtPhase1RP = DocumentActions.GetElementById<HTMLInputElement>("txtPhase1RP");

       




    }
    function Clear() {
        debugger;
        //FromDate.value = DateFormat(new Date().toString());
        //ToDate.value = DateFormat(new Date().toString());

        txtBranchID.value = "";
        txtBranchRP.value = "";
        txtBranch1RP.value = "";


        txtProjectID.value = "";
        txtProjectRP.value = "";
        txtProject1RP.value = "";

        txtPhaseID.value = "";
        txtPhaseRP.value = "";
        txtPhase1RP.value = "";

      


    }
    function Print() {
        debugger

        let RP: ReportParameters = new ReportParameters();


        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.ProjectID = Number(txtProjectID.value);
        RP.Phaseid = Number(txtPhaseID.value);







        if (<boolean>$("#Rrd_phase").prop("checked")) {
            RP.TypeReport = 1;



            Ajax.CallAsync({
                url: Url.Action("rptRes_ProjectRequirements", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })

        }

        if (<boolean>$("#Rrd_yitem").prop("checked")) {
            RP.TypeReport = 2;

            Ajax.CallAsync({
                url: Url.Action("rptRes_ProjectRequirements", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }







    }


    function InitalizeEvents() {
        debugger
        $("#Rrd_phase").prop("checked", "checked");
        //btnBranchRP.onclick = btnBranchRP_Click;
        btnProjectRP.onclick = btnProjectRP_Click;
        btnPhaseRP.onclick = btnPhaseRP_Click;
        //btnCustomerClassRP.onclick = btnCustomerClassRP_Click;
        //btnCustomerRP.onclick = btnCustomerRP_Click;
        //btnAreaRP.onclick = btnAreaRP_Click;
        //btnScopeClassRP.onclick = btnScopeClassRP_Click;
        //btnScopeRP.onclick = btnScopeRP_Click;
    }


    function btnProjectRP_Click() {
        debugger;
        sys.FindKey(Modules.EquipmentMonitoring, "btnSearchProject", Condition, () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProjectEng", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as P_TR_EngProject;
                    txtProjectID.value = result.ProjectID.toString();
                    txtProjectRP.value = result.ProjectCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtProject1RP.value = result.DescA;
                    }
                    else {
                        txtProject1RP.value = result.DescL;
                    }

                }
            });
        })
    }

    function btnPhaseRP_Click() {
        debugger;
        sys.FindKey(Modules.EquipmentMonitoring, "btnSearchPhase", " ProjectID = " + txtProjectID.value , () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchPhase", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as PQ_GetEngProjectPhase;
                    txtPhaseID.value = result.ProjectPhaseId.toString();
                    txtPhaseRP.value = result.ProjectPhaseCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtPhase1RP.value = result.DescA;
                    }
                    else {
                        txtPhase1RP.value = result.DescL;
                    }

                }
            });
        })
    }


    
   




}