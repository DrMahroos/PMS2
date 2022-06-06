$(document).ready(function () {
    debugger;
    Prodvsprogress.InitalizeComponent();
});
var Prodvsprogress;
(function (Prodvsprogress) {
    var sys = new SystemTools();
    var ControllerName = "ProjectExpenses";
    var FromDate;
    var ToDate;
    var txtSalesEngineerId;
    var txtSalesEngineercode;
    var butEngCode;
    var btnPrint;
    var txtDescESalesEngineer;
    var all;
    var ProdNo;
    var Bydiff;
    var ByPhase;
    var ByProjects;
    var MatchingProduction;
    var txtSiteEngid = null;
    var txtSiteEngcode = null;
    var txtDescE = null;
    var butSiteEng;
    var _ScreenLanguage;
    var _CompCode;
    var _BranchCode;
    var Condition;
    var SiteEngCode;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = btPrint;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
    }
    Prodvsprogress.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        ToDate = DocumentActions.GetElementById("ToDate");
        FromDate = DocumentActions.GetElementById("FromDate");
        ByPhase = DocumentActions.GetElementById("ByPhase");
        ByProjects = DocumentActions.GetElementById("ByProject");
        all = DocumentActions.GetElementById("all");
        ProdNo = DocumentActions.GetElementById("ProdNo");
        Bydiff = DocumentActions.GetElementById("Bydiff");
        MatchingProduction = DocumentActions.GetElementById("MatchingProduction");
        txtSalesEngineerId = DocumentActions.GetElementById("txtSalesEngineerId");
        txtSalesEngineercode = DocumentActions.GetElementById("txtSalesEngineercode");
        butEngCode = DocumentActions.GetElementById("butEngCode");
        txtDescESalesEngineer = DocumentActions.GetElementById("txtDescESalesEngineer");
        txtSiteEngid = DocumentActions.GetElementById("txtSiteEngid");
        txtSiteEngcode = DocumentActions.GetElementById("txtSiteEngcode");
        txtDescE = DocumentActions.GetElementById("txtDescE");
        butSiteEng = DocumentActions.GetElementById("butSiteEng");
        btnPrint = DocumentActions.GetElementById("btnPrint");
    }
    function Clear() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtSalesEngineerId.value = "";
        txtSalesEngineercode.value = "";
        txtSiteEngcode.value = "";
        txtDescE.value = "";
    }
    function InitalizeEvents() {
        debugger;
        butEngCode.onclick = btnSalesEng_Click;
        butSiteEng.onclick = btnSiteEng_Click;
        btnPrint.onclick = btPrint;
        ByPhase.checked = true;
        all.checked = true;
    }
    function btnSiteEng_Click() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.Prodvsprogress, "butSiteEng", Condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getEngCode", "SiteEngineer"),
                data: { id: id },
                success: function (d) {
                    debugger;
                    var CatCode = d.result;
                    SiteEngCode = CatCode.SiteEngCategoryId;
                    txtSiteEngcode.value = CatCode.EngCode;
                    if (ClientSharedWork.Session.ScreenLanguage == "ar")
                        txtDescE.value = CatCode.DescA.toString();
                    else
                        txtDescE.value = CatCode.DescE.toString();
                }
            });
        });
    }
    function btnSalesEng_Click() {
        debugger;
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.Prodvsprogress, "butEngCode", Condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getSalesEng", "Customers"),
                data: { id: id },
                success: function (d) {
                    var CatCode = d.result;
                    txtSalesEngineerId.value = CatCode.EngCode.toString();
                    txtSalesEngineercode.value = CatCode.SalesEngineerId.toString();
                    if (_ScreenLanguage == "ar")
                        txtDescESalesEngineer.value = CatCode.DeacA.toString();
                    else
                        txtDescESalesEngineer.value = CatCode.DescE.toString();
                }
            });
        });
    }
    function btPrint() {
        debugger;
        //if (txtSiteEngcode.value == ""&&txtSalesEngineercode.value == "") {
        //    MessageBox.Show("You Must Select Site Engineer Or Sales Engineer", "Info");
        //    return;
        //}
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        RP.SiteEngineerId = Number(txtSiteEngcode.value);
        RP.SalsEngId = Number(txtSalesEngineercode.value);
        if (ByPhase.checked == true) {
            RP.GroupType = 0;
        }
        else if (ByProjects.checked == true) {
            RP.GroupType = 1;
        }
        else {
            RP.GroupType = 2;
        }
        if (all.checked == true) {
            RP.TypeReport = 0;
        }
        else if (ProdNo.checked == true) {
            RP.TypeReport = 1;
        }
        else if (Bydiff.checked == true) {
            RP.TypeReport = 2;
        }
        else {
            RP.TypeReport = 3;
        }
        Ajax.CallAsync({
            url: Url.Action("Rep_eng_ProductionVSPRogress", "GeneralReports"),
            data: RP,
            success: function (d) {
                debugger;
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(Prodvsprogress || (Prodvsprogress = {}));
//# sourceMappingURL=Prodvsprogress.js.map