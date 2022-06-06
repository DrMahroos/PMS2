$(document).ready(() => {
    ProjectProgress.InitalizeComponent();
});
namespace ProjectProgress {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "ProjectProgress";
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;

    var txtProjID: HTMLInputElement;
    var txtProjCode: HTMLInputElement;
    var btnProjCode: HTMLButtonElement;
    var txtProjDesc: HTMLInputElement;



    var txtPhaseID: HTMLInputElement;
    var txtPhaseCode: HTMLInputElement;
    var btnPhaseCode: HTMLButtonElement;
    var txtPhaseDesc: HTMLInputElement;


    var _ScreenLanguage: string;


    export function InitalizeComponent() {
        debugger

        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;

        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
    }
    function InitalizeControls() {

        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");
        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");

        txtProjID = DocumentActions.GetElementById<HTMLInputElement>("txtProjID");
        txtProjCode = DocumentActions.GetElementById<HTMLInputElement>("txtProjCode");
        btnProjCode = DocumentActions.GetElementById<HTMLButtonElement>("btnProjCode");
        txtProjDesc = DocumentActions.GetElementById<HTMLInputElement>("txtProjDesc");



        txtPhaseID = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseID");
        txtPhaseCode = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseCode");
        btnPhaseCode = DocumentActions.GetElementById<HTMLButtonElement>("btnPhaseCode");
        txtPhaseDesc = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseDesc");




    }
    function Clear() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());

        txtProjID.value = "";
        txtProjCode.value = "";
        txtProjDesc.value = "";


        txtPhaseID.value = "";
        txtPhaseCode.value = "";
        txtPhaseDesc.value = "";


    }
    function Print() {
        debugger
        if (txtProjCode.value == "") {
            MessageBox.Show("You Must Select From Project ", "Info");
            return;
        }

        let RP: ReportParameters = new ReportParameters();

        if ($("#byprojitem").prop("checked") == false && $("#byactivity").prop("checked") == false) {
            MessageBox.Show("You Must Select", "Info");
            return;
        }

        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;

        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.ProjectID = Number(txtProjID.value);
        RP.Phaseid = Number(txtPhaseID.value);
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);




        debugger
        if ($("#byprojitem").prop("checked") == true) {
            RP.TypeReport = 2;
            Ajax.CallAsync({
                url: Url.Action("rptEngProgressItem", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }

        if ($("#byactivity").prop("checked") == true) {
            RP.TypeReport = 1;
            Ajax.CallAsync({
                url: Url.Action("rptEngProgressItem", "GeneralReports"),
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

        btnProjCode.onclick = btnProjCode_onclick;
        btnPhaseCode.onclick = btnPhaseCode_onclick;
        txtProjCode.onchange = txtSearchProject_Clicked;


    }

    function btnProjCode_onclick() {
        debugger;
        sys.FindKey(Modules.ProjectProgress, "btnProjCode", "CompCode = " + ClientSharedWork.Session.CompCode + " and BraCode=" + ClientSharedWork.Session.BranchCode, () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjCodeByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    debugger;
                    let result = d.result as P_TR_EngProject;
                    txtProjID.value = result.ProjectID.toString();
                    txtProjCode.value = result.ProjectCode;

                    if (_ScreenLanguage == "ar") {
                        txtProjDesc.value = result.DescA;
                    }
                    else {
                        txtProjDesc.value = result.DescL;
                    }

                }
            });
        })
    }




    function txtSearchProject_Clicked() {
        debugger;

        let code = txtProjCode.value;
        Ajax.CallAsync({
            url: Url.Action("getProjectsCode", ControllerName),
            data: { code, comp: SharedSession.CurrentEnvironment.CompCode, bra: SharedSession.CurrentEnvironment.BranchCode },
            success: (d) => {
                debugger;
                let result = d.result as P_TR_EngProject;
                if (result != null) {
                    // txtProjectCode.value = result.ProjectCode;
                    txtProjID.value = result.ProjectID.toString();
                    if (_ScreenLanguage == "ar") {
                        txtProjDesc.value = result.DescA;
                    }
                    else {
                        txtProjDesc.value = result.DescL;
                    }
                }
                else {
                    WorningMessage(" الكود غير موجود ", " The code does not exist ");
                }
            }
        });

    }



    function btnPhaseCode_onclick() {
        debugger;
        if (txtProjID.value == "" || txtProjID.value == " ") {
            WorningMessage("يجب اختيار المشروع اولا", "Select project First");
            return;
        }
        sys.FindKey(Modules.ProjectProgress, "btnPhaseCode", " Projectid = " + txtProjID.value , () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetPhaseCodeById", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as P_TR_EngProjectPhase;
                    txtPhaseID.value = result.ProjectPhaseId.toString();
                    txtPhaseCode.value = result.ProjectPhaseCode;

                    if (_ScreenLanguage == "ar") {
                        txtPhaseDesc.value = result.DescA;
                    }
                    else {
                        txtPhaseDesc.value = result.DescL;
                    }

                }
            });
        })
    }


}