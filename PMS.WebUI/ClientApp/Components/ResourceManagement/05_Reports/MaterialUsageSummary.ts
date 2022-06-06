$(document).ready(() => {
    MaterialUsageSummary.InitalizeComponent();
});
namespace MaterialUsageSummary {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "MaterialUsageSummary";


    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;


    //var txtitemcodeID: HTMLInputElement;
    //var txtitemcodeRP: HTMLInputElement;
    //var btnitemcodeRP: HTMLButtonElement;
    //var txtitemcode1RP: HTMLInputElement;




    var txtProjectID: HTMLInputElement;
    var txtProjectRP: HTMLInputElement;
    var btnProjectRP: HTMLButtonElement;
    var txtProject1RP: HTMLInputElement;


    var txtProjectEngineerID: HTMLInputElement;
    var txtProjectEngineerRP: HTMLInputElement;
    var btnProjectEngineerRP: HTMLButtonElement;
    var txtProjectEngineer1RP: HTMLInputElement;

    var txtPhaseID: HTMLInputElement;
    var txtPhaseRP: HTMLInputElement;
    var btnPhaseRP: HTMLButtonElement;
    var txtPhase1RP: HTMLInputElement;


    

    var _ScreenLanguage: string;
    var _BranchCode: string;
    var Condition: string;
    var _CompCode: string;

    export function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        InitalizeControls();
        InitalizeEvents();


    }
    function InitalizeControls() {


        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");


        //txtitemcodeID = DocumentActions.GetElementById<HTMLInputElement>("txtitemcodeID");
        //txtitemcodeRP = DocumentActions.GetElementById<HTMLInputElement>("txtitemcodeRP");
        //btnitemcodeRP = DocumentActions.GetElementById<HTMLButtonElement>("btnitemcodeRP");
        //txtitemcode1RP = DocumentActions.GetElementById<HTMLInputElement>("txtitemcode1RP");


        txtProjectID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectID");
        txtProjectRP = DocumentActions.GetElementById<HTMLInputElement>("txtProjectRP");
        btnProjectRP = DocumentActions.GetElementById<HTMLButtonElement>("btnProjectRP");
        txtProject1RP = DocumentActions.GetElementById<HTMLInputElement>("txtProject1RP");



        txtProjectEngineerID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectEngineerID");
        txtProjectEngineerRP = DocumentActions.GetElementById<HTMLInputElement>("txtProjectEngineerRP");
        btnProjectEngineerRP = DocumentActions.GetElementById<HTMLButtonElement>("btnProjectEngineerRP");
        txtProjectEngineer1RP = DocumentActions.GetElementById<HTMLInputElement>("txtProjectEngineer1RP");


        txtPhaseID = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseID");
        txtPhaseRP = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseRP");
        btnPhaseRP = DocumentActions.GetElementById<HTMLButtonElement>("btnPhaseRP");
        txtPhase1RP = DocumentActions.GetElementById<HTMLInputElement>("txtPhase1RP");


        //FromMat = DocumentActions.GetElementById<HTMLInputElement>("FromMat");
        //ToMat = DocumentActions.GetElementById<HTMLInputElement>("ToMat");


    }
    function Clear() {
        debugger;


        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());


         

        txtProjectID.value = "";
        txtProjectRP.value = "";
        txtProject1RP.value = "";

        txtPhaseID.value = "";
        txtPhaseRP.value = "";
        txtPhase1RP.value = "";

        txtProjectEngineerID.value = "";
        txtProjectEngineerRP.value = "";
        txtProjectEngineer1RP.value = "";

        //FromMat.value = "";
        //ToMat.value = "";


    }
    function Print() {
        debugger
        let RP: ReportParameters = new ReportParameters();

        if (DateFormat(FromDate.value) == "NaN-NaN-NaN" || DateFormat(ToDate.value) == "NaN-NaN-NaN") {
            MessageBox.Show(" you must select Date", "Info");
            return;
        }
        else if (DateFormat(FromDate.value) > DateFormat(ToDate.value)) {
            MessageBox.Show(" From date  is largethan To Date", "Info");
            return;
        }
       
        else {


            RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
            RP.FromDate = DateFormat(FromDate.value);
            RP.ToDate = DateFormat(ToDate.value);           
            RP.ProjectID = Number(txtProjectID.value);
            RP.Phaseid = Number(txtPhaseID.value);
            RP.EngID = Number(txtProjectEngineerID.value);
            RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
            

            if (<boolean>$("#RAD_Material").prop("checked")) {
                RP.TypeReport = 1;
            }
            else if (<boolean>$("#RAD_Trans").prop("checked")) {
                RP.TypeReport = 2;
            }
            Ajax.CallAsync({
                url: Url.Action("rptRes_MaterialUsageSummary", "GeneralReports"),
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

        FromDate.value = DateFormat(new Date().toString());

        ToDate.value = DateFormat(new Date().toString());
        $("#RAD_Material").prop("checked", "checked");
        btnProjectRP.onclick = btnProjectRP_Click; //-----
        btnProjectEngineerRP.onclick = btnProjectEngineerRP_Click;
        btnPhaseRP.onclick = btnPhaseRP_Click;        

    }
    function btnPhaseRP_Click() {
        if (txtProjectID.value == "") {
            WorningMessage("يجب اختيار مشروع ", "you must select project");
            return;
        }
        sys.FindKey(Modules.MaterialUsageSummary, "btnSearchPhase", " ProjectID = " + txtProjectID.value, () => {
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

    function btnProjectEngineerRP_Click() {
        debugger;
        sys.FindKey(Modules.MaterialUsageSummary, "butEng_Code", Condition, () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProjectEng", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as P_D_SiteEngineer;
                    txtProjectEngineerID.value = result.SiteEngineerId.toString();
                    txtProjectEngineerRP.value = result.EngCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtProjectEngineer1RP.value = result.DescA;
                    }
                    else {
                        txtProjectEngineer1RP.value = result.DescE;
                    }

                }
            });
        })
    }   

    function btnProjectRP_Click() {
        debugger;
        sys.FindKey(Modules.MaterialUsageSummary, "butProj_Code", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProject", ControllerName),
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

    
    
}