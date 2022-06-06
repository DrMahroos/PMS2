$(document).ready(() => {
    Evaluation.InitalizeComponent();
});
namespace Evaluation {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "Evaluation";

    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;

    var txtSubContrRP: HTMLInputElement;
    var txtSubContrID: HTMLInputElement;
    var butSubContrCodeRP: HTMLButtonElement;
    var txtSubContr1RP: HTMLInputElement;

    var txtEnginerID: HTMLInputElement;
    var txtEnginerRP: HTMLInputElement;
    var butEnginerRPCode: HTMLButtonElement;
    var txtEnginer1RP: HTMLInputElement;

    var txtContactRP: HTMLInputElement;
    var butContactRP: HTMLButtonElement;
    var txtContact1RP: HTMLInputElement;
    var _CompCode: string;
    var _BranchCode: string;
    var Condition;


    var txtProjectID: HTMLInputElement;
    var txtProjectRP: HTMLInputElement;
    var btnProjectRP: HTMLButtonElement;
    var txtProject1RP: HTMLInputElement;


    export function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
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
        txtSubContrID = DocumentActions.GetElementById<HTMLInputElement>("txtSubContrID");
        txtSubContrRP = DocumentActions.GetElementById<HTMLInputElement>("txtSubContrRP");
        butSubContrCodeRP = DocumentActions.GetElementById<HTMLButtonElement>("butSubContrCodeRP");
        txtSubContr1RP = DocumentActions.GetElementById<HTMLInputElement>("txtSubContr1RP");
        txtEnginerID = DocumentActions.GetElementById<HTMLInputElement>("txtEnginerID");
        txtEnginerRP = DocumentActions.GetElementById<HTMLInputElement>("txtEnginerRP");
        butEnginerRPCode = DocumentActions.GetElementById<HTMLButtonElement>("butEnginerRPCode");
        txtEnginer1RP = DocumentActions.GetElementById<HTMLInputElement>("txtEnginer1RP");

        txtContactRP = DocumentActions.GetElementById<HTMLInputElement>("txtContactRP");
        butContactRP = DocumentActions.GetElementById<HTMLButtonElement>("butContactRP");
        txtContact1RP = DocumentActions.GetElementById<HTMLInputElement>("txtContact1RP");


        txtProjectID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectID");
        txtProjectRP = DocumentActions.GetElementById<HTMLInputElement>("txtProjectRP");
        btnProjectRP = DocumentActions.GetElementById<HTMLButtonElement>("btnProjectRP");
        txtProject1RP = DocumentActions.GetElementById<HTMLInputElement>("txtProject1RP");



    }
    function Clear() {

        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());

        txtSubContrRP.value = "";
        txtSubContr1RP.value = "";

        txtEnginerRP.value = "";
        txtEnginer1RP.value = "";

        txtContactRP.value = "";
        txtContact1RP.value = "";

        txtProjectID.value = "";
        txtProjectRP.value = "";
        txtProject1RP.value = "";
    }
    function Print() {
        debugger;
        let RP: ReportParameters = new ReportParameters();


        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        RP.SubID = Number(txtSubContrID.value);
        RP.EngID = Number(txtEnginerID.value);
        RP.ContrId = Number(txtContactRP.value);
        RP.ProjectID = Number(txtProjectID.value);
        if ($("#RdBySub").prop("checked")) {
            Ajax.CallAsync({
                url: Url.Action("rpt_ENG_Evaluation_BYSub", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }
        else if ($("#RdByEngineer").prop("checked")) {
            Ajax.CallAsync({
                url: Url.Action("rpt_ENG_Evaluation_BYENG", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }


        else if ($("#RdByScope").prop("checked")) {
            Ajax.CallAsync({
                url: Url.Action("rpt_ENG_Evaluation_BYScope", "GeneralReports"),
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

        butSubContrCodeRP.onclick = butsubcontrRP_Click;
        butEnginerRPCode.onclick = butEnginerRPCode_Click;
        butContactRP.onclick = butContactRP_Click;
        btnProjectRP.onclick = btnProjectRP_Click;
    }

    function butsubcontrRP_Click() {

        sys.FindKey(Modules.Evaluation, "butSubContrCodeRP", "", () => {

            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSubContractorByID", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as P_D_SubContractor;
                    txtSubContrID.value = result.SubContractorID.toString();
                    txtSubContrRP.value = result.SubContractorCode.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtSubContr1RP.value = result.DescA;
                    }
                    else {
                        txtSubContr1RP.value = result.DescE;
                    }

                }
            });
        })
    }

    function butEnginerRPCode_Click() {

        sys.FindKey(Modules.Evaluation, "butEnginerRPCode", Condition, () => {

            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSiteEngineer", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as P_D_SiteEngineer;
                    txtEnginerRP.value = result.EngCode.toString();
                    txtEnginerID.value = result.SiteEngineerId.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtEnginer1RP.value = result.DescA;
                    }
                    else {
                        txtEnginer1RP.value = result.DescE;
                    }

                }
            });
        })
    }

    function butContactRP_Click() {

        sys.FindKey(Modules.Evaluation, "butContactRP", "", () => {

            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEngSubContract", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as PQ_GetEngSubContract;
                    txtContactRP.value = result.SubContractId.toString();



                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtContact1RP.value = result.DescA.toString();
                    }
                    else {
                        txtContact1RP.value = result.DescE.toString();
                    }

                }
            });
        })
    }

    function btnProjectRP_Click() {
        debugger;
        sys.FindKey(Modules.Evaluation, "btnProjectRP", Condition, () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProjectEng", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as P_TR_EngProject;
                    txtProjectID.value = result.ProjectID.toString();
                    txtProjectRP.value = result.ProjectCode.toString();

                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
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