$(document).ready(function () {
    SiteEngReport.InitalizeComponent();
});
var SiteEngReport;
(function (SiteEngReport) {
    var sys = new SystemTools();
    var ajaxCall = new AjaxCaller();
    var Area = new G_BRANCH();
    SiteEngReport.CatCode = new P_D_SiteEngCategory();
    var txtSiteEngCategoryIdRp = null;
    var txtDescECatRp = null;
    var butSiteEngCategoryIdRp;
    var txtBraCodeRp = null;
    var txtAreaNameRp = null;
    var btnAreaRp;
    //Just put the elements IDs  
    var SiteEngCode;
    //Initalize The Current Popup
    function InitalizeComponent() {
        //SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        InitalizeControls();
        InitalizeEvents();
    }
    SiteEngReport.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtSiteEngCategoryIdRp = DocumentActions.GetElementById("txtSiteEngCategoryIdRp");
        txtDescECatRp = DocumentActions.GetElementById("txtDescECatRp");
        butSiteEngCategoryIdRp = DocumentActions.GetElementById("butSiteEngCategoryIdRp");
        txtBraCodeRp = DocumentActions.GetElementById("txtBraCodeRp");
        txtAreaNameRp = DocumentActions.GetElementById("txtAreaNameRp");
        btnAreaRp = DocumentActions.GetElementById("btnAreaRp");
        txtBraCodeRp.value = "";
    }
    function InitalizeEvents() {
        debugger;
        butSiteEngCategoryIdRp.onclick = btnCategoryCode_Click;
        btnAreaRp.onclick = btnBraCode_Click;
    }
    //Print Current Report
    function Print() {
        var rp = new ReportParameters();
        rp.CompCode = SharedSession.CurrentEnvironment.CompCode;
        rp.braCode = SharedSession.CurrentEnvironment.BranchCode;
        rp.CatID = SiteEngCode;
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
            url: Url.Action("rptSiteEng", "GeneralReports"),
            data: rp,
            success: function (d) {
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
    function Clear() {
        txtAreaNameRp.value = "";
        txtSiteEngCategoryIdRp.value = "";
        txtDescECatRp.value = "";
        txtBraCodeRp.value = "";
        $("#AllRp").prop("checked", "checked");
    }
    function btnBraCode_Click() {
        sys.FindKey(Modules.SiteEngineer, "btnAreaRp", "COMP_CODE = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "SiteEngineer"),
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
        sys.FindKey(Modules.SiteEngineer, "butSiteEngCategoryIdRp", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getCategoryCode", "SiteEngineer"),
                data: { id: id },
                success: function (d) {
                    var CatCode = d.result;
                    SiteEngCode = CatCode.SiteEngCategoryId;
                    txtSiteEngCategoryIdRp.value = CatCode.CategCode.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar")
                        txtDescECatRp.value = CatCode.DescA.toString();
                    else
                        txtDescECatRp.value = CatCode.DescE.toString();
                }
            });
        });
    }
})(SiteEngReport || (SiteEngReport = {}));
//# sourceMappingURL=SiteEngReport.js.map