$(document).ready(() => {
    Production.InitalizeComponent();
});
namespace Production {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "Production";

    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;

    var txtsubcontrID: HTMLInputElement;
    var txtsubcontrRP: HTMLInputElement;
    var butsubcontrCode: HTMLButtonElement;
    var txtsubcontr1RP: HTMLInputElement;

    var txtprojectID: HTMLInputElement;
    var txtprojectRP: HTMLInputElement;
    var butprojectCode: HTMLButtonElement;
    var txtproject1RP: HTMLInputElement;

    var txtprojecphaseID: HTMLInputElement;
    var txtprojecphaseRP: HTMLInputElement;
    var butprojecphaseCode: HTMLButtonElement;
    var txtprojecphase1RP: HTMLInputElement;

    var txtcontactID: HTMLInputElement;
    var txtcontactRP: HTMLInputElement;
    var butcontactCode: HTMLButtonElement;
    var txtcontact1RP: HTMLInputElement;

    var txtsoID: HTMLInputElement;
    var txtwork_soRP: HTMLInputElement;
    var butwork_soCode: HTMLButtonElement;
    var txtwork_so1RP: HTMLInputElement;

    var _CompCode: string;
    var _BranchCode: string;
    var Condition: string;
    var SoCond: string;
    var ContCond: string;

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
        
        txtsubcontrID = DocumentActions.GetElementById<HTMLInputElement>("txtsubcontrID");
        txtsubcontrRP = DocumentActions.GetElementById<HTMLInputElement>("txtsubcontrRP");
        butsubcontrCode = DocumentActions.GetElementById<HTMLButtonElement>("butsubcontrCode");
        txtsubcontr1RP = DocumentActions.GetElementById<HTMLInputElement>("txtsubcontr1RP");

        txtprojectID = DocumentActions.GetElementById<HTMLInputElement>("txtprojectID");
        txtprojectRP = DocumentActions.GetElementById<HTMLInputElement>("txtprojectRP");
        butprojectCode = DocumentActions.GetElementById<HTMLButtonElement>("butprojectCode");
        txtproject1RP = DocumentActions.GetElementById<HTMLInputElement>("txtproject1RP");

        txtprojecphaseID = DocumentActions.GetElementById<HTMLInputElement>("txtprojecphaseID");
        txtprojecphaseRP = DocumentActions.GetElementById<HTMLInputElement>("txtprojecphaseRP");
        butprojecphaseCode = DocumentActions.GetElementById<HTMLButtonElement>("butprojecphaseCode");
        txtprojecphase1RP = DocumentActions.GetElementById<HTMLInputElement>("txtprojecphase1RP");

        txtcontactID = DocumentActions.GetElementById<HTMLInputElement>("txtcontactID");
        txtcontactRP = DocumentActions.GetElementById<HTMLInputElement>("txtcontactRP");
        butcontactCode = DocumentActions.GetElementById<HTMLButtonElement>("butcontactCode");
        txtcontact1RP = DocumentActions.GetElementById<HTMLInputElement>("txtcontact1RP");

        txtsoID = DocumentActions.GetElementById<HTMLInputElement>("txtsoID");
        txtwork_soRP = DocumentActions.GetElementById<HTMLInputElement>("txtwork_soRP");
        butwork_soCode = DocumentActions.GetElementById<HTMLButtonElement>("butwork_soCode");
        txtwork_so1RP = DocumentActions.GetElementById<HTMLInputElement>("txtwork_so1RP");

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

        txtprojecphaseID.value = "";
        txtprojecphaseRP.value = "";
        txtprojecphase1RP.value = "";

        txtcontactID.value = "";
        txtcontactRP.value = "";
        txtcontact1RP.value = "";

        txtsoID.value = "";
        txtwork_soRP.value = "";
        txtwork_so1RP.value = "";

    }

    function Print() {

        
        let RP: ReportParameters = new ReportParameters();

        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        if (Number(txtsubcontrRP.value) == 0) {
            MessageBox.Show("You Must Select subcontr", "Info");
            return;
        }
       
        RP.SubID = Number(txtsubcontrID.value);
        RP.ContrId = Number(txtcontactID.value);
        RP.SoId = Number(txtsoID.value);
        RP.ProjectID = Number(txtprojectID.value);
        RP.Phaseid = Number(txtprojecphaseID.value);
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);


     

        if (<boolean>$("#RDByShowProject").prop("checked")) {
            RP.TypeReport = 1;
            Ajax.CallAsync({
                url: Url.Action("rptSlsProduction", "GeneralReports"),
                data: RP,
                success: (d) => {
                    
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }

        if (<boolean>$("#RDByShowPhase").prop("checked")) {
            RP.TypeReport = 2;
            Ajax.CallAsync({
                url: Url.Action("rptSlsProduction", "GeneralReports"),
                data: RP,
                success: (d) => {
                    
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }

        if (<boolean>$("#RDByShowActivity").prop("checked")) {
            RP.TypeReport = 3;
            Ajax.CallAsync({
                url: Url.Action("rptSlsProduction", "GeneralReports"),
                data: RP,
                success: (d) => {
                    
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })
        }



    }

    function InitalizeEvents() {
        

        $("#RDByShowProject").prop("checked", "checked");
        butsubcontrCode.onclick = butsubcontrCode_Click;
        butprojectCode.onclick = butprojectCode_Click;
        butprojecphaseCode.onclick = butprojecphaseCode_Click;
        butcontactCode.onclick = butcontactCode_Click;
        butwork_soCode.onclick = butwork_soCode_Click;

    }

    function butsubcontrCode_Click() {
        
        sys.FindKey(Modules.Production, "butsubcontrCode", "", () => {
            
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSubContractorByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    

                    let result = d.result as P_D_SubContractor;
                    if (result.SubContractorCode == null) {
                        txtsubcontrRP.value = ""
                    }
                    else {
                        txtsubcontrRP.value = result.SubContractorCode.toString();
                    }
                    //txtsubcontrRP.value = result.SubContractorCode.toString();
                    txtsubcontrID.value = result.SubContractorID.toString();

                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtsubcontr1RP.value = result.DescA;
                    }
                    else {
                        txtsubcontr1RP.value = result.DescE;
                    }


                }
            });
        })
    }

    function butprojectCode_Click() {
        ;
        sys.FindKey(Modules.ServiceOrder, "btnSearchProject", Condition, () => {
            ;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProject", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    ;
                    let result = d.result as P_TR_EngProject;
                    txtprojectRP.value = result.ProjectCode.toString();
                    txtprojectID.value = result.ProjectID.toString();

                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtproject1RP.value = result.DescA;
                    }
                    else {
                        txtproject1RP.value = result.DescL;
                    }

                }
            });
        })
    }

    function butprojecphaseCode_Click() {
        ;
        if (txtprojectID.value == "" || txtprojectID.value == " ") {
            WorningMessage("يجب ادخال رقم المشروع", "Project must be Selected")
            return;
        }
         else 
                
        
          sys.FindKey(Modules.ServiceOrder, "btnSearchProjPhase", "ProjectID = " + txtprojectID.value, () => {
            ;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
             Ajax.CallAsync({
                url: Url.Action("GetSrchProjectPhase", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    ;
                    let result = d.result as P_TR_EngProjectPhase;
                    txtprojecphaseRP.value = result.ProjectPhaseCode.toString();
                    txtprojecphaseID.value = result.ProjectPhaseId.toString();

                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtprojecphase1RP.value = result.DescA;
                    }
                    else {
                        txtprojecphase1RP.value = result.DescL;
                    }

                }
             });
          })
        
    }

    function butcontactCode_Click() {
        ;
        ContCond = Condition;
        
        if (txtsubcontrID.value != "") {
            ContCond = ContCond + "and SubContractorID= " + txtsubcontrID.value
        }
        sys.FindKey(Modules.SubContract, "butTrNo", ContCond, () => {
            ;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchContract", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    ;

                    let result = d.result as PQ_GetEngSubContract;
                    txtcontactRP.value = result.TrNo.toString();
                    txtcontactID.value = result.SubContractId.toString();

                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtcontact1RP.value = result.DescA;
                    }
                    else {
                        txtcontact1RP.value = result.DescE;
                    }
                    if (txtsubcontrID.value == "") {
                        txtsubcontrRP.value = result.Sc_Code.toString();
                    
                    
                        txtsubcontrID.value = result.SubContractorID.toString();

                        if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                            txtsubcontr1RP.value = result.Sc_DescA;
                        }
                        else {
                            txtsubcontr1RP.value = result.Sc_DescE;
                        }
                    }

                }
            });
        })
    }

    function butwork_soCode_Click() {
        ;
        SoCond = Condition;
        if (txtcontactID.value != "") {
            SoCond = SoCond + "and SubContractId= " + txtcontactID.value
        }
        if (txtsubcontrID.value != "") {
            SoCond = SoCond + "and SubContractorID= " + txtsubcontrID.value
        }

        sys.FindKey(Modules.ServiceOrder, "btnSearchOrder", SoCond, () => {
            ;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchSubServiceOrder", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    ;
                    let result = d.result as PQ_GetEngSubServiceOrder;
                    txtwork_soRP.value = result.TrNo.toString();
                    txtsoID.value = result.SubServiceOrderId.toString();

                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtwork_so1RP.value = result.Proj_DescA;
                    }
                    else {
                        txtwork_so1RP.value = result.Proj_DescE;
                    }
                    if (txtsubcontrID.value == "") {
                        txtsubcontrRP.value = result.Sc_Code.toString();


                        txtsubcontrID.value = result.SubContractorID.toString();

                        if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                            txtsubcontr1RP.value = result.Sc_DescA;
                        }
                        else {
                            txtsubcontr1RP.value = result.Sc_DescE;
                        }
                    }

                }
            });
        })
    }
}