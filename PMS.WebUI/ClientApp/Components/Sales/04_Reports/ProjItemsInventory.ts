$(document).ready(() => {
    ProjItemsInventory.InitalizeComponent();
});
namespace ProjItemsInventory {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "ProjItemsInventory";
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;
     
    var txtProjectID: HTMLInputElement;
    var txtProjectRP: HTMLInputElement;
    var btnProjectRP: HTMLButtonElement;
    var txtProject1RP: HTMLInputElement;
     
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
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
       _CompCode=  SharedSession.CurrentEnvironment.CompCode;
       _BranchCode= SharedSession.CurrentEnvironment.BranchCode;
        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
    }
    function InitalizeControls() {
        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");
        txtProjectID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectID");
        txtProjectRP = DocumentActions.GetElementById<HTMLInputElement>("txtProjectRP");
        btnProjectRP = DocumentActions.GetElementById<HTMLButtonElement>("btnProjectRP");
        txtProject1RP = DocumentActions.GetElementById<HTMLInputElement>("txtProject1RP");
        
    }
    function Clear() {
        debugger;
       
        txtProjectID.value = "";
        txtProjectRP.value = "";
        txtProject1RP.value = "";
 
      


    }
    function Print() {
        debugger
        if (txtProjectID.value == "") {
            WorningMessage("يجب اختيار مشروع ", "Select Project");
            return;
        }
        let RP: ReportParameters = new ReportParameters();


        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.ProjectID = Number(txtProjectID.value);
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
            Ajax.CallAsync({
                url: Url.Action("Rpt_ProjectItemsInventory", "GeneralReports"),
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
       
        btnProjectRP.onclick = btnProjectRP_Click;
      
    }


    function btnProjectRP_Click() {
        debugger;
        sys.FindKey(Modules.ProjItemsInventory, "btnSearchProject", Condition, () => {
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

   

    
   




}