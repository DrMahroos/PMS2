$(document).ready(function () {
    LaborReport.InitalizeComponent();
});
var LaborReport;
(function (LaborReport) {
    var sys = new SystemTools();
    var ajaxCall = new AjaxCaller();
    var Area = new G_BRANCH();
    LaborReport.CatCode = new P_D_LaborCategory();
    var txtLaborCategoryIdRp = null;
    var txtLaborClassNameRp = null;
    var btnCategoryCodeRp;
    var txtLaborCategoryNameRp = null;
    var txtLaborClassIdRp = null;
    var btnClassCodeRp;
    var txtBraCodeRp = null;
    var txtBraCodeRp = null;
    var txtAreaNameRp = null;
    var btnAreaRp;
    var Master = new P_D_Labor();
    var laborCat = new P_D_LaborCategory();
    var laborClass = new P_D_LaborClass();
    //Just put the elements IDs  
    var LaborCatId;
    var LaborclassId;
    //Initalize The Current Popup
    function InitalizeComponent() {
        //SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        InitalizeControls();
        InitalizeEvents();
    }
    LaborReport.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtLaborCategoryIdRp = DocumentActions.GetElementById("txtLaborCategoryIdRp");
        txtLaborClassNameRp = DocumentActions.GetElementById("txtLaborClassNameRp");
        btnCategoryCodeRp = DocumentActions.GetElementById("btnCategoryCodeRp");
        txtLaborCategoryNameRp = DocumentActions.GetElementById("txtLaborCategoryNameRp");
        txtLaborClassIdRp = DocumentActions.GetElementById("txtLaborClassIdRp");
        btnClassCodeRp = DocumentActions.GetElementById("btnClassCodeRp");
        txtBraCodeRp = DocumentActions.GetElementById("txtBraCodeRp");
        txtAreaNameRp = DocumentActions.GetElementById("txtAreaNameRp");
        btnAreaRp = DocumentActions.GetElementById("btnAreaRp");
        txtLaborCategoryNameRp.value = "";
    }
    function InitalizeEvents() {
        debugger;
        btnCategoryCodeRp.onclick = btnCategoryCode_Click;
        btnClassCodeRp.onclick = btnClassCode_Click;
        btnAreaRp.onclick = btnBraCode_Click;
    }
    //Print Current Report
    function Print() {
        var rp = new ReportParameters();
        rp.CompCode = SharedSession.CurrentEnvironment.CompCode;
        rp.braCode = SharedSession.CurrentEnvironment.BranchCode;
        rp.CatID = LaborCatId;
        rp.bra = Number(txtBraCodeRp.value);
        rp.ClassID = LaborclassId;
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
            url: Url.Action("rptLabor", "GeneralReports"),
            data: rp,
            success: function (d) {
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
    function Clear() {
        txtLaborClassIdRp.value = "";
        txtLaborCategoryIdRp.value = "";
        txtLaborClassNameRp.value = "";
        txtLaborCategoryNameRp.value = "";
        $("#AllRp").prop("checked", "checked");
    }
    function btnBraCode_Click() {
        sys.FindKey(Modules.laborArea, "btnAreaRp", "COMP_CODE = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "LaborDefinition"),
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
        sys.FindKey(Modules.laborCategory, "btnCategoryCodeRp", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getLaborCategory", "LaborDefinition"),
                data: { id: id },
                success: function (d) {
                    laborCat = d.result;
                    LaborCatId = laborCat.LaborCategoryId;
                    txtLaborCategoryIdRp.value = laborCat.CategCode.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar")
                        txtLaborCategoryNameRp.value = laborCat.DescA.toString();
                    else
                        txtLaborCategoryNameRp.value = laborCat.DescE.toString();
                }
            });
        });
    }
    function btnClassCode_Click() {
        sys.FindKey(Modules.laborClass, "btnClassCodeRp", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getLaborClass", "LaborDefinition"),
                data: { id: id },
                success: function (d) {
                    laborClass = d.result;
                    LaborclassId = laborClass.LaborClassId;
                    txtLaborClassIdRp.value = laborClass.ClassCode.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar")
                        txtLaborClassNameRp.value = laborClass.DescA.toString();
                    else
                        txtLaborClassNameRp.value = laborClass.DescE.toString();
                }
            });
        });
    }
})(LaborReport || (LaborReport = {}));
//# sourceMappingURL=LaborReport.js.map