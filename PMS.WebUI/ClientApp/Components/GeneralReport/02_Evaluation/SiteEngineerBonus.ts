$(document).ready(() => {
    SiteEngineerBonus.InitalizeComponent();
});
namespace SiteEngineerBonus {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "SiteEngineerBonus";



    var YearID: HTMLInputElement;
    var PeriodID: HTMLInputElement;


    var _CompCode: string;
    var _BranchCode: string;
    var btnPrint: HTMLInputElement;
    var _ScreenLanguage: string;

    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

    export function InitalizeComponent() {

        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;

        InitalizeControls();

        YearID.value = SharedSession.CurrentEnvironment.CurrentYear;
        PeriodID.value = "01";

        InitalizeEvents();


        //getbranchname();
    }
    function InitalizeControls() {

        //---------- textID---------


        YearID = DocumentActions.GetElementById<HTMLInputElement>("txtLoginYear");
        PeriodID = DocumentActions.GetElementById<HTMLInputElement>("txtMonth");

        //--------------
    }
    function Clear() {

        YearID.value = SharedSession.CurrentEnvironment.CurrentYear;
        PeriodID.value = "01";
    }

    function InitalizeEvents() {
        debugger

        btnPrint.onclick = Print;
    }




    function Print() {
        debugger


        let RP: ReportParameters = new ReportParameters();

        // RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = _BranchCode;
        RP.yearID = Number(YearID.value);
        RP.ProjectID = Number(PeriodID.value);



        Ajax.CallAsync({

            url: Url.Action("P_repSiteEngineerBonus", "GeneralReports"),
            data: RP,
            success: (d) => {
                debugger
                let result = d.result as string;
                window.open(result, "_blank");
            }
        })


    }


}
















