$(document).ready(() => {
    SubContractorActivity.InitalizeComponent();
});
namespace SubContractorActivity {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "SubContractorActivity";
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;

    var txtsubcontrID: HTMLInputElement;
    var txtsubcontrRP: HTMLInputElement;
    var butsubcontrRP: HTMLButtonElement;
    var txtsubcontr1RP: HTMLInputElement;

    var txtprojectID: HTMLInputElement;
    var txtprojectRP: HTMLInputElement;
    var butprojectRP: HTMLButtonElement;
    var txtproject1RP: HTMLInputElement;

    var txtphaseRPID: HTMLInputElement;
    var txtphaseRP: HTMLInputElement;
    var butphaseRP: HTMLButtonElement;
    var txtphase1RP: HTMLInputElement;

    var txtenginerRPID: HTMLInputElement;
    var txtenginerRP: HTMLInputElement;
    var butenginerRP: HTMLButtonElement;
    var txtenginer1RP: HTMLInputElement;

    var txtContactRPID: HTMLInputElement;
    var txtContactRP: HTMLInputElement;
    var butContactRP: HTMLButtonElement;
    var txtContact1RP: HTMLInputElement;

    var txtscopeRPID: HTMLInputElement;
    var txtscopeRP: HTMLInputElement;
    var butscopeRP: HTMLButtonElement;
    var txtscope1RP: HTMLInputElement;
    var _ScreenLanguage: string;

    var _CompCode: string;
    var _BranchCode: string;
    var Condition;


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

        txtsubcontrID = DocumentActions.GetElementById<HTMLInputElement>("txtsubcontrID");
        txtsubcontrRP = DocumentActions.GetElementById<HTMLInputElement>("txtsubcontrRP");
        butsubcontrRP = DocumentActions.GetElementById<HTMLButtonElement>("butsubcontrRP");
        txtsubcontr1RP = DocumentActions.GetElementById<HTMLInputElement>("txtsubcontr1RP");

        txtprojectID = DocumentActions.GetElementById<HTMLInputElement>("txtprojectID");
        txtprojectRP = DocumentActions.GetElementById<HTMLInputElement>("txtprojectRP");
        butprojectRP = DocumentActions.GetElementById<HTMLButtonElement>("butprojectRP");
        txtproject1RP = DocumentActions.GetElementById<HTMLInputElement>("txtproject1RP");

        txtphaseRPID = DocumentActions.GetElementById<HTMLInputElement>("txtphaseRPID");
        txtphaseRP = DocumentActions.GetElementById<HTMLInputElement>("txtphaseRP");
        butphaseRP = DocumentActions.GetElementById<HTMLButtonElement>("butphaseRP");
        txtphase1RP = DocumentActions.GetElementById<HTMLInputElement>("txtphase1RP");

        txtenginerRPID = DocumentActions.GetElementById<HTMLInputElement>("txtenginerRPID");
        txtenginerRP = DocumentActions.GetElementById<HTMLInputElement>("txtenginerRP");
        butenginerRP = DocumentActions.GetElementById<HTMLButtonElement>("butenginerRP");
        txtenginer1RP = DocumentActions.GetElementById<HTMLInputElement>("txtenginer1RP");

        txtContactRPID = DocumentActions.GetElementById<HTMLInputElement>("txtContactRPID");
        txtContactRP = DocumentActions.GetElementById<HTMLInputElement>("txtContactRP");
        butContactRP = DocumentActions.GetElementById<HTMLButtonElement>("butContactRP");
        txtContact1RP = DocumentActions.GetElementById<HTMLInputElement>("txtContact1RP");

        txtscopeRPID = DocumentActions.GetElementById<HTMLInputElement>("txtscopeRPID");
        txtscopeRP = DocumentActions.GetElementById<HTMLInputElement>("txtscopeRP");
        butscopeRP = DocumentActions.GetElementById<HTMLButtonElement>("butscopeRP");
        txtscope1RP = DocumentActions.GetElementById<HTMLInputElement>("txtscope1RP");

    }
    function Clear() {
        
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());

        txtsubcontrID.value = "";
        txtsubcontrRP.value = "";
        txtsubcontr1RP.value = "";

        txtprojectID.value = "";
        txtprojectRP.value = "";
        txtproject1RP.value = "";

        txtphaseRPID.value = "";
        txtphaseRP.value = "";
        txtphase1RP.value = "";

        txtenginerRPID.value = "";
        txtenginerRP.value = "";
        txtenginer1RP.value = "";

        txtContactRPID.value = "";
        txtContactRP.value = "";
        txtContact1RP.value = "";

        txtscopeRPID.value = "";
        txtscopeRP.value = "";
        txtscope1RP.value = "";

    }
    function Print() {
        debugger
        let RP: ReportParameters = new ReportParameters();

        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;

        if (Number(txtsubcontrRP.value) == 0) {
            MessageBox.Show("You Must Select subcontr ", "Info");
            return;
        }
                                                               
        RP.SubID = Number(txtsubcontrID.value);           
        RP.ContrNo = Number(txtContactRPID.value);
        RP.Sono = Number();
        RP.ProjectID = Number(txtprojectID.value);
        RP.Phaseid = Number(txtphaseRPID.value);
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
       
       



        if (<boolean>$("#RDByShowContracts").prop("checked")) {
            RP.TypeReport = 1;
            Ajax.CallAsync({
                url: Url.Action("rptSlsActivityContract", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }

        if (<boolean>$("#RDByProductionEntry").prop("checked")) {
            RP.TypeReport = 2;
            Ajax.CallAsync({
                url: Url.Action("rptSlsActivityContract", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }

        if (<boolean>$("#RDByServiceOrder").prop("checked")) {
            RP.TypeReport = 3;
            Ajax.CallAsync({
                url: Url.Action("rptSlsActivityContract", "GeneralReports"),
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
        butsubcontrRP.onclick  = butsubcontrRP_Click;
        butprojectRP.onclick = butprojectRP_Click;
        butphaseRP.onclick = butphaseRP_Click;
        butenginerRP.onclick = butenginerRP_Click;
        butContactRP.onclick = butContactRP_Click;
        butscopeRP.onclick = butscopeRP_Click;
    }

    function butsubcontrRP_Click() {

        sys.FindKey(Modules.SubContrActivity, "butsubcontrRP", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSubContractorByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as P_D_SubContractor;
                    txtsubcontrID.value = result.SubContractorID.toString();
                    txtsubcontrRP.value = result.SubContractorCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtsubcontr1RP.value = result.DescA;
                    }
                    else {
                        txtsubcontr1RP.value = result.DescE;
                    }

                }
            });
        })
    }

    function butprojectRP_Click() {

        sys.FindKey(Modules.ServiceOrder, "btnSearchProject", Condition, () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchEngProject", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as P_TR_EngProject;
                    txtprojectID.value = result.ProjectID.toString();
                    txtprojectRP.value = result.ProjectCode.toString();
                    
                    if (_ScreenLanguage == "ar") {
                        txtproject1RP.value = result.DescA;
                    }
                    else {
                        txtproject1RP.value = result.DescL;
                    }

                }
            });
        })
    }

    function butphaseRP_Click() {
        debugger;
        if (txtprojectID.value == "" || txtprojectID.value == " ") {
            WorningMessage("يجب ادخال رقم المشروع", "Project must be Selected")
        }
        else
        sys.FindKey(Modules.ServiceOrder, "btnSearchProjPhase", " ProjectID =" + txtprojectID.value, () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchEngPhase", ControllerName),
                data: { id: _Id },
                success: (d) => {                    
                    let result = d.result as P_TR_EngProjectPhase;
                    txtphaseRPID.value = result.ProjectPhaseId.toString();
                    txtphaseRP.value = result.ProjectPhaseCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtphase1RP.value = result.DescA;
                    }
                    else {
                        txtphase1RP.value = result.DescL;
                    }

                }
            });
        })
    }
    
    function butenginerRP_Click() {

        sys.FindKey(Modules.ServiceOrder, "btnSearchEngProject", Condition, () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSiteEngineer", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_SiteEngineer;
                    txtenginerRPID.value = result.SiteEngineerId.toString();
                    txtenginerRP.value = result.EngCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtenginer1RP.value = result.DescA.toString();
                    }
                    else {
                        txtenginer1RP.value = result.DescE.toString();
                    }

                }
            });
        })
    }

    function butContactRP_Click() {
        
        sys.FindKey(Modules.SubContract, "butTrNo", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEngSubContract", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as PQ_GetEngSubContract;
                    txtContactRP.value = result.TrNo.toString();
                    txtContactRPID.value = result.TrNo.toString();

                    if (_ScreenLanguage == "ar") {
                        txtContact1RP.value = result.DescA.toString();
                    }
                    else {
                        txtContact1RP.value = result.DescE.toString();
                    }

                }
            });
        })
    }

    function butscopeRP_Click() {
        
        sys.FindKey(Modules.SubContract, "butScope_Code", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEngSubContractorScope", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as PQ_GetEngSubContractorScope;
                    txtscopeRP.value = result.ScopeCode.toString();
                    txtscopeRPID.value = result.ScopeId.toString();

                    if (_ScreenLanguage == "ar") {
                        txtscope1RP.value = result.DescA.toString();
                    }
                    else {
                        txtscope1RP.value = result.DescE.toString();
                    }

                }
            });
        })
    }


}