$(document).ready(() => {
    SubContractorListing.InitalizeComponent();
});
namespace SubContractorListing {

    var sys: SystemTools = new SystemTools();
    var Master: P_D_SubContractor = new P_D_SubContractor();

    const ControllerName: string = "SubContractorListing";
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;


    var fromsubcontrID: HTMLButtonElement;
    var fromsubcontrCodeRP: HTMLInputElement;
    var butfromsubcontrRP: HTMLButtonElement;
    var fromsubcontrNameRP: HTMLInputElement;


    var tosubcontrID: HTMLButtonElement;
    var tosubcontrCodeRP: HTMLInputElement;
    var buttosubcontrRP: HTMLButtonElement;
    var tosubcontrNameRP: HTMLInputElement;

    var scopeCodeID: HTMLButtonElement;
    var scopeCodeRP: HTMLInputElement;
    var butscopeRP: HTMLButtonElement;
    var scopeNameRP: HTMLInputElement;


    var EvalutionformNameRP: HTMLInputElement;
    var EvalutionformtoNameRP: HTMLButtonElement;





    var _ScreenLanguage: string;
    var _CompCode: string;
    var _BranchCode: string;

    export function InitalizeComponent() {
        debugger
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;

        InitalizeControls();
        //FromDate.value = DateFormat(new Date().toString());
        //ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
    }
    function InitalizeControls() {

        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");
        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");

        fromsubcontrID = DocumentActions.GetElementById<HTMLInputElement>("fromsubcontrID");
        fromsubcontrCodeRP = DocumentActions.GetElementById<HTMLInputElement>("fromsubcontrCodeRP");
        butfromsubcontrRP = DocumentActions.GetElementById<HTMLButtonElement>("butfromsubcontrRP");
        fromsubcontrNameRP = DocumentActions.GetElementById<HTMLInputElement>("fromsubcontrNameRP");

        tosubcontrID = DocumentActions.GetElementById<HTMLInputElement>("tosubcontrID");
        tosubcontrCodeRP = DocumentActions.GetElementById<HTMLInputElement>("tosubcontrCodeRP");
        buttosubcontrRP = DocumentActions.GetElementById<HTMLButtonElement>("buttosubcontrRP");
        tosubcontrNameRP = DocumentActions.GetElementById<HTMLInputElement>("tosubcontrNameRP");

        scopeCodeID = DocumentActions.GetElementById<HTMLInputElement>("scopeCodeID");
        scopeCodeRP = DocumentActions.GetElementById<HTMLInputElement>("scopeCodeRP");
        butscopeRP = DocumentActions.GetElementById<HTMLButtonElement>("butscopeRP");
        scopeNameRP = DocumentActions.GetElementById<HTMLInputElement>("scopeNameRP");

       


    }
    function Clear() {
        debugger;
        //FromDate.value = DateFormat(new Date().toString());
        //ToDate.value = DateFormat(new Date().toString());

        fromsubcontrCodeRP.value = "";
        fromsubcontrNameRP.value = "";

        tosubcontrCodeRP.value = "";
        tosubcontrNameRP.value = "";

        scopeCodeRP.value = "";
        scopeNameRP.value = "";

       



    }
    function Print() {


        debugger
        let RP: ReportParameters = new ReportParameters();

        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        if (Number(scopeCodeRP.value) == 0) {
            MessageBox.Show("You Must Select Scope", "Info");
            return;
        }
        RP.FromSubCode = fromsubcontrCodeRP.value;
        RP.ToSubCode = tosubcontrCodeRP.value;
        RP.ScopeID = Number(scopeCodeID.value);      
        
        Ajax.CallAsync({
            url: Url.Action("rptSlsSubContractorListing", "GeneralReports"),
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

        butfromsubcontrRP.onclick = butfromsubcontrRP_Click;
        buttosubcontrRP.onclick = buttosubcontrRP_Click;
        butscopeRP.onclick = butscopeRP_Click;
    }

    function butfromsubcontrRP_Click() {
        debugger;
        sys.FindKey(Modules.SubContractorListing, "butfromsubcontrRP", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSubContractorByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    debugger; /*P_TR_SubContract*/
                    let result = d.result as P_D_SubContractor;
                    fromsubcontrCodeRP.value = result.SubContractorCode.toString();
                    if (_ScreenLanguage == "ar") {
                        fromsubcontrNameRP.value = result.DescA;
                    }
                    else {
                        fromsubcontrNameRP.value = result.DescE;
                    }

                }
            });
        })
    }

    function buttosubcontrRP_Click() {
        debugger;
        sys.FindKey(Modules.SubContractorListing, "buttosubcontrRP", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetP_D_SubContractor", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_SubContractor;
                    tosubcontrCodeRP.value = result.SubContractorID.toString();

                    if (_ScreenLanguage == "ar") {
                        tosubcontrNameRP.value = result.DescA.toString();
                    }
                    else {
                        tosubcontrNameRP.value = result.DescE.toString();
                    }

                }
            });
        })
    }


    function butscopeRP_Click() {
        debugger;
        sys.FindKey(Modules.SubContractorListing, "butscopeRP", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEngSubContractorScope", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_Scope;
                    scopeCodeRP.value = result.ScopeCode.toString();
                    scopeCodeID.value = result.ScopeID.toString();

                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        scopeNameRP.value = result.DescA.toString();
                    }
                    else {
                        scopeNameRP.value = result.DescE.toString();
                    }

                }
            });
        })
    }


}