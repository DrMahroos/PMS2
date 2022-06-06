$(document).ready(() => {
    SalesManBonus.InitalizeComponent();
});
namespace SalesManBonus {
    const ControllerName: string = "SalesManBonus";
    
    var sys: SystemTools = new SystemTools();

    var YearID: HTMLInputElement;
    var PeriodID: HTMLInputElement;
    var ToPeriodID: HTMLInputElement;

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
        ToPeriodID.value = "01";
        InitalizeEvents();


        //getbranchname();
    }
    function InitalizeControls() {

        //---------- textID---------


        YearID = DocumentActions.GetElementById<HTMLInputElement>("txtLoginYear");
        PeriodID = DocumentActions.GetElementById<HTMLInputElement>("txtMonth");
        ToPeriodID = DocumentActions.GetElementById<HTMLInputElement>("txttoMonth");
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

        if (ToPeriodID.value < PeriodID.value) {
            WorningMessage("خطأ في اختيار الفترات", "Period Selection Error ");
            return;
        }
        let RP: ReportParameters = new ReportParameters();

        // RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = _BranchCode;
        RP.yearID = Number(YearID.value);
        RP.ProjectID = Number(PeriodID.value);
        RP.EngID = Number(ToPeriodID.value);


        Ajax.CallAsync({

            url: Url.Action("P_repSalesEngineerBonus", "GeneralReports"),
            data: RP,
            success: (d) => {
                debugger
                let result = d.result as string;
                window.open(result, "_blank");
            }
        })


    }


}