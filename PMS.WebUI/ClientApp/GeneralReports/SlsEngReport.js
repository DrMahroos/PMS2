$(document).ready(function () {
    SlsEngReport.InitalizeComponent();
});
var SlsEngReport;
(function (SlsEngReport) {
    var sys = new SystemTools();
    var Model = new P_D_SalesEgineer();
    var ajaxCall = new AjaxCaller();
    var Area = new G_BRANCH();
    SlsEngReport.dataSource = new Array();
    SlsEngReport.CatCode = new P_D_SalesEngCateory();
    var txtSalesEngCategoryIdRp;
    var txtCategCodeRp = null;
    var butSalesEngCategor;
    var txtBraCodeRp = null;
    var txtAreaNameRp;
    var btnAreaRp;
    //Just put the elements IDs  
    var SLsEngCode;
    //Initalize The Current Popup
    function InitalizeComponent() {
        //SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        InitalizeControls();
        InitalizeEvents();
    }
    SlsEngReport.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtSalesEngCategoryIdRp = DocumentActions.GetElementById("txtSalesEngCategoryIdRp");
        txtCategCodeRp = DocumentActions.GetElementById("txtCategCodeRp");
        butSalesEngCategor = DocumentActions.GetElementById("butSalesEngCategor");
        txtBraCodeRp = DocumentActions.GetElementById("txtBraCodeRp");
        txtAreaNameRp = DocumentActions.GetElementById("txtAreaNameRp");
        btnAreaRp = DocumentActions.GetElementById("btnAreaRp");
        txtBraCodeRp.value = "";
    }
    function InitalizeEvents() {
        debugger;
        butSalesEngCategor.onclick = btnCategoryCode_Click;
        btnAreaRp.onclick = btnBraCode_Click;
    }
    //Print Current Report
    function Print() {
        var rp = new ReportParameters();
        rp.CompCode = SharedSession.CurrentEnvironment.CompCode;
        rp.braCode = SharedSession.CurrentEnvironment.BranchCode;
        rp.CatID = SLsEngCode;
        rp.bra = Number(txtBraCodeRp.value);
        if ($("#ActiveRp").prop("checked")) {
            rp.Active = 1;
        }
        else if ($("#NoActiveRp").prop("checked")) {
            rp.Active = 0;
        }
        else if ($("#AllRp").prop("checked")) {
            rp.Active = null;
        }
        ;
        Ajax.CallAsync({
            url: Url.Action("rptSalesEng", "GeneralReports"),
            data: rp,
            success: function (d) {
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
    function Clear() {
        txtAreaNameRp.value = "";
        txtSalesEngCategoryIdRp.value = "";
        txtCategCodeRp.value = "";
        txtBraCodeRp.value = "";
        $("#AllRp").prop("checked", "checked");
    }
    function btnBraCode_Click() {
        sys.FindKey(Modules.SalesEngineer, "btnAreaRp", "COMP_CODE = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "SalesEngineer"),
                data: { id: id },
                success: function (d) {
                    Area = d.result;
                    txtBraCodeRp.value = Area.BRA_CODE.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar")
                        txtAreaNameRp.value = Area.BRA_DESCL.toString();
                    else
                        txtAreaNameRp.value = Area.BRA_DESC.toString();
                }
            });
        });
    }
    function btnCategoryCode_Click() {
        sys.FindKey(Modules.SalesEngineer, "butSalesEngCategor", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getCategoryCode", "SalesEngineer"),
                data: { id: id },
                success: function (d) {
                    SlsEngReport.CatCode = d.result;
                    SLsEngCode = SlsEngReport.CatCode.SalesEngCategoryId;
                    txtSalesEngCategoryIdRp.value = SlsEngReport.CatCode.CategCode.toString();
                    txtCategCodeRp.value = SlsEngReport.CatCode.DescA.toString();
                }
            });
        });
    }
})(SlsEngReport || (SlsEngReport = {}));
//# sourceMappingURL=SlsEngReport.js.map