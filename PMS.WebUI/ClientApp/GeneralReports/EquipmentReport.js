$(document).ready(function () {
    EquipmentReport.InitalizeComponent();
});
var EquipmentReport;
(function (EquipmentReport) {
    var sys = new SystemTools();
    var Model = new P_D_SalesEgineer();
    var ajaxCall = new AjaxCaller();
    var Area = new G_BRANCH();
    var Class = new P_D_EquipmentClass();
    var txtEquipClassIdRp;
    var txtEquipClassNameRp = null;
    var btnEquipClassIdRp;
    var txtBraCodeRp = null;
    var txtAreaNameRp;
    var btnAreaRp;
    //Just put the elements IDs  
    var EquipId;
    //Initalize The Current Popup
    function InitalizeComponent() {
        //SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        InitalizeControls();
        InitalizeEvents();
    }
    EquipmentReport.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtEquipClassIdRp = DocumentActions.GetElementById("txtEquipClassIdRp");
        txtEquipClassNameRp = DocumentActions.GetElementById("txtEquipClassNameRp");
        btnEquipClassIdRp = DocumentActions.GetElementById("btnEquipClassIdRp");
        txtBraCodeRp = DocumentActions.GetElementById("txtBraCodeRp");
        txtAreaNameRp = DocumentActions.GetElementById("txtAreaNameRp");
        btnAreaRp = DocumentActions.GetElementById("btnAreaRp");
        txtBraCodeRp.value = "";
    }
    function InitalizeEvents() {
        debugger;
        btnEquipClassIdRp.onclick = btnCategoryCode_Click;
        btnAreaRp.onclick = btnBraCode_Click;
    }
    //Print Current Report
    function Print() {
        var rp = new ReportParameters();
        rp.CompCode = SharedSession.CurrentEnvironment.CompCode;
        rp.braCode = SharedSession.CurrentEnvironment.BranchCode;
        rp.CatID = EquipId;
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
            url: Url.Action("rptEquipment", "GeneralReports"),
            data: rp,
            success: function (d) {
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
    function Clear() {
        txtAreaNameRp.value = "";
        txtEquipClassIdRp.value = "";
        txtEquipClassNameRp.value = "";
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
        sys.FindKey(Modules.EquipmentDefinition, "btnEquipClassIdRp", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEquipmentClassByuseId", "EquipmentDefinition"),
                data: { id: id },
                success: function (d) {
                    Class = d.result;
                    EquipId = Class.EquipClassId;
                    txtEquipClassIdRp.value = Class[0].ClassCode;
                    if (ClientSharedWork.Session.ScreenLanguage == "ar")
                        txtEquipClassNameRp.value = Class[0].DescA;
                    else
                        txtEquipClassNameRp.value = Class[0].DescE;
                }
            });
        });
    }
})(EquipmentReport || (EquipmentReport = {}));
//# sourceMappingURL=EquipmentReport.js.map