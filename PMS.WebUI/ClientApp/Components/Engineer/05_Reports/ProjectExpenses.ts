$(document).ready(() => {
    debugger;
    ProjectExpenses.InitalizeComponent();
});
namespace ProjectExpenses {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "ProjectExpenses";
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

    var txtCatID: HTMLInputElement;
    var txtCatCode: HTMLInputElement;
    var btnCatCode: HTMLButtonElement;
    var txtCatDesc: HTMLInputElement;



    var txtExpCodeID: HTMLInputElement;
    var txtExpCode: HTMLInputElement;
    var btnExpCodeCode: HTMLButtonElement;
    var txtExpCodeDesc: HTMLInputElement;

    var txtExpCodeRPID: HTMLInputElement;
    var txtExpCodeRP: HTMLInputElement;
    var butExpCodeRP: HTMLButtonElement;
    var txtExpCodeDesc: HTMLInputElement;

    var txtscopeRPID: HTMLInputElement;
    var txtscopeRP: HTMLInputElement;
    var butscopeRP: HTMLButtonElement;
    var txtscope1RP: HTMLInputElement;
    var _ScreenLanguage: string;


    var _CompCode: string;
    var _BranchCode: string;
    var Condition: string;


    export function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
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

        txtProjID = DocumentActions.GetElementById<HTMLInputElement>("txtProjID");
        txtProjCode = DocumentActions.GetElementById<HTMLInputElement>("txtProjCode");
        btnProjCode = DocumentActions.GetElementById<HTMLButtonElement>("btnProjCode");
        txtProjDesc = DocumentActions.GetElementById<HTMLInputElement>("txtProjDesc");

        txtPhaseID = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseID");
        txtPhaseCode = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseCode");
        btnPhaseCode = DocumentActions.GetElementById<HTMLButtonElement>("btnPhaseCode");
        txtPhaseDesc = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseDesc");

        txtCatID = DocumentActions.GetElementById<HTMLInputElement>("txtCatID");
        txtCatCode = DocumentActions.GetElementById<HTMLInputElement>("txtCatCode");
        btnCatCode = DocumentActions.GetElementById<HTMLButtonElement>("btnCatCode");
        txtCatDesc = DocumentActions.GetElementById<HTMLInputElement>("txtCatDesc");

        txtExpCodeID = DocumentActions.GetElementById<HTMLInputElement>("txtExpCodeID");
        txtExpCode = DocumentActions.GetElementById<HTMLInputElement>("txtExpCode");
        btnExpCodeCode = DocumentActions.GetElementById<HTMLButtonElement>("btnExpCodeCode");
        txtExpCodeDesc = DocumentActions.GetElementById<HTMLInputElement>("txtExpCodeDesc");



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

        txtCatID.value = "";
        txtCatCode.value = "";
        txtCatDesc.value = "";

        txtExpCodeID.value = "";
        txtExpCode.value = "";
        txtExpCodeDesc.value = "";


    }
    function Print() {
        debugger



        if (txtProjCode.value == "") {
            MessageBox.Show("You Must Select From Project ", "Info");
            return;
        }




        let RP: ReportParameters = new ReportParameters();





        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        if ($("#txtsummary").prop("checked") == false && $("#txtdetail").prop("checked") == false) {
            MessageBox.Show("You Must Select", "Info");
            return;
        }


        RP.ProjectID = Number(txtProjID.value);
        RP.Phaseid = Number(txtPhaseID.value);
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        RP.CatID = Number(txtCatID.value);
        RP.ExpID = Number(txtExpCodeID.value)




        if ($("#txtsummary").prop("checked") == true) {
            RP.TypeReport = 1;
            Ajax.CallAsync({
                url: Url.Action("rptEngExpensesSummary", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }

        if ($("#txtdetail").prop("checked") == true) {
            RP.TypeReport = 2;
            Ajax.CallAsync({
                url: Url.Action("rptEngExpensesSummary", "GeneralReports"),
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
        $("#RDByShowContracts").prop("checked", "checked");

        btnProjCode.onclick = btnProjCode_onclick;
        btnPhaseCode.onclick = btnPhaseCode_onclick;
        btnCatCode.onclick = btnCatCode_onclick;
        btnExpCodeCode.onclick = btnExpCodeCode_onclick;
        txtProjCode.onchange = txtSearchProject_Clicked;
    }




    function btnProjCode_onclick() {
        debugger;
        sys.FindKey(Modules.ProjectExpenses, "btnProjCode", Condition, () => {
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
        if (txtProjCode.value == "") {
            MessageBox.Show("You Must Select From Project ", "Info");
            return;
        }
        sys.FindKey(Modules.ProjectExpenses, "btnPhaseCode", "ProjectID =" + Number(txtProjID.value), () => {
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

    function btnCatCode_onclick() {

        debugger;
        sys.FindKey(Modules.ProjectExpenses, "btnCatCode", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCatCodeById", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_ExpencesCategory;
                    txtCatID.value = result.ExpCatID.toString();
                    txtCatCode.value = result.ExpCatCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtCatDesc.value = result.DescA;
                    }
                    else {
                        txtCatDesc.value = result.DescE;
                    }

                }
            });
        })
    }

    function btnExpCodeCode_onclick() {


        debugger;
        sys.FindKey(Modules.EngExpences, "btnFindExpences", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetExpCodeById", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_Expences;
                    txtExpCodeID.value = result.ExpencesID.toString();
                    txtExpCode.value = result.ExpCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtExpCodeDesc.value = result.DescA.toString();
                    }
                    else {
                        txtExpCodeDesc.value = result.DescE.toString();
                    }

                }
            });
        })
    }


}