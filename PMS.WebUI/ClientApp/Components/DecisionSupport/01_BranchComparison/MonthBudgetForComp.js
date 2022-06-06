$(document).ready(function () {
    MonthBudgetForComp.InitalizeComponent();
});
var MonthBudgetForComp;
(function (MonthBudgetForComp) {
    var sys = new SystemTools();
    var ControllerName = "MonthBudgetForComp";
    var txtEngID;
    var txtEngRP;
    var btnEngRP;
    var txtEng1RP;
    var txtYearID;
    var txtMonthID;
    var _ScreenLanguage;
    var Phase_Status;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
        txtYearID.value = SharedSession.CurrentEnvironment.CurrentYear;
    }
    MonthBudgetForComp.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtEngID = DocumentActions.GetElementById("txtEngID");
        txtEngRP = DocumentActions.GetElementById("txtEngRP");
        btnEngRP = DocumentActions.GetElementById("btnEngRP");
        txtEng1RP = DocumentActions.GetElementById("txtEng1RP");
        //txtProjectID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectID");
        txtYearID = DocumentActions.GetElementById("txtYearID");
        //btnProjectRP = DocumentActions.GetElementById<HTMLButtonElement>("btnProjectRP");
        //txtProject1RP = DocumentActions.GetElementById<HTMLInputElement>("txtProject1RP");
        //txtPhaseID = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseID");
        txtMonthID = DocumentActions.GetElementById("txtMonthID");
        //btnPhaseRP = DocumentActions.GetElementById<HTMLButtonElement>("btnPhaseRP");
        //txtPhase1RP = DocumentActions.GetElementById<HTMLInputElement>("txtPhase1RP");
    }
    function Clear() {
        //FromDate.value = DateFormat(new Date().toString());
        //ToDate.value = DateFormat(new Date().toString());
        txtEngID.value = "";
        txtEngRP.value = "";
        txtEng1RP.value = "";
        txtYearID.value = "";
        txtMonthID.value = "";
    }
    function Print() {
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.yearID = Number(txtYearID.value);
        RP.Monid = (txtMonthID.value);
        Ajax.CallAsync({
            url: Url.Action("rptEng_MonthBudgetCompany", "GeneralReports"),
            data: RP,
            success: function (d) {
                debugger;
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
    function InitalizeEvents() {
        debugger;
        //$("#Rrd_phase").prop("checked", "checked");
        //  btnEngRP.onclick = btnEngRP_Click;
    }
    //function btnEngRP_Click() {
    //    
    //    sys.FindKey(Modules.LateandAbsence, "butEng_Code", "", () => {
    //        
    //        let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("GetSrchProjectEng", ControllerName),
    //            data: { id: _Id },
    //            success: (d) => {
    //                let result = d.result as P_D_SiteEngineer;
    //                txtEngID.value = result.SiteEngineerId.toString();
    //                txtEngRP.value = result.EngCode.toString();
    //                if (_ScreenLanguage == "ar") {
    //                    txtEng1RP.value = result.DescA;
    //                }
    //                else {
    //                    txtEng1RP.value = result.DescE;
    //                }
    //            }
    //        });
    //    })
    //}
})(MonthBudgetForComp || (MonthBudgetForComp = {}));
//# sourceMappingURL=MonthBudgetForComp.js.map