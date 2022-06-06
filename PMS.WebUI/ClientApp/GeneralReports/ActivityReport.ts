$(document).ready(() => {
    ActivityReport.InitalizeComponent();
});
namespace ActivityReport {
    var sys: SystemTools = new SystemTools();
    var ajaxCall: AjaxCaller = new AjaxCaller();
    var txtParentActivityIDRp: HTMLInputElement = null;
    var txtParentActivityNameRp: HTMLInputElement = null;
    var btnParentActivityRp: HTMLButtonElement;
    var activeId: number;
    
    export function InitalizeComponent() {
        
        SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        InitalizeControls();
        InitalizeEvents();

    }
    function InitalizeControls() {
        txtParentActivityIDRp = DocumentActions.GetElementById<HTMLInputElement>("txtParentActivityIDRp");
        txtParentActivityNameRp = DocumentActions.GetElementById<HTMLInputElement>("txtParentActivityNameRp");
        btnParentActivityRp = DocumentActions.GetElementById<HTMLButtonElement>("btnParentActivityRp");
        
    }
    function InitalizeEvents() {
      
        btnParentActivityRp.onclick = btnParentActivity_Clicked;
    }

    //Print Current Report
    function Print() {

        let rp: ReportParameters = new ReportParameters();
        
        rp.CompCode = SharedSession.CurrentEnvironment.CompCode;
        rp.braCode = SharedSession.CurrentEnvironment.BranchCode;

        rp.ActID = activeId;
       
       
        Ajax.CallAsync({
            url: Url.Action("rptActivity", "GeneralReports"),
            data: rp,
            success: (d) => {
                let result = d.result as string;
                window.open(result, "_blank");
            }
        })
    }
    function Clear() {
        txtParentActivityNameRp.value = "";

        txtParentActivityIDRp.value = "";


    }

    function btnParentActivity_Clicked() {
        
        sys.FindKey(Modules.WorkActivities, "btnParentActivityRp", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("activityList", "WorkActivities"),
                data: { id: id },
                success: (d) => {
                    let _Master = d.result as P_D_Activity;
                    activeId = _Master.ActivityID;
                    txtParentActivityIDRp.value = _Master.ActivityCode.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar")
                        txtParentActivityNameRp.value = _Master.DescA.toString();
                    else
                        txtParentActivityNameRp.value = _Master.DescE.toString();
                }
            });
        });
    }

}