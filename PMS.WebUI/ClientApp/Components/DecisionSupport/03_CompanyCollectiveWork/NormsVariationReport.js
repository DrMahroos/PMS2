$(document).ready(function () {
    NormsVariationReport.InitalizeComponent();
});
var NormsVariationReport;
(function (NormsVariationReport) {
    var sys = new SystemTools();
    var ControllerName = "NormsVariationRep";
    var Model = new P_G_Region();
    var txtRegionID;
    var txtRegionDes;
    var txtRegionCode;
    var btnRegionID;
    var FromDate;
    var ToDate;
    var txtBranch;
    var txtBranchCod;
    var txtBranchDes;
    var btnBranch;
    var txtActivityID;
    var txtActivityCod;
    var txtActivityDes;
    var btnActivityID;
    var RedAllProject;
    var RedNonRepair;
    var RedRepair;
    var RedByBranch;
    var RedByScope;
    var _CompCode;
    var _BranchCode;
    var btnPrint;
    var _ScreenLanguage;
    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
    }
    NormsVariationReport.InitalizeComponent = InitalizeComponent;
    ;
    function InitalizeControls() {
        txtRegionID = DocumentActions.GetElementById("txtRegionID");
        txtRegionDes = DocumentActions.GetElementById("txtRegionDes");
        txtRegionCode = DocumentActions.GetElementById("txtRegionCode");
        btnRegionID = DocumentActions.GetElementById("btnRegionID");
        txtBranch = DocumentActions.GetElementById("txtBranch");
        txtBranchCod = DocumentActions.GetElementById("txtBranchCod");
        txtBranchDes = DocumentActions.GetElementById("txtBranchDes");
        btnBranch = DocumentActions.GetElementById("btnBranch");
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtActivityID = DocumentActions.GetElementById("txtActivityID");
        txtActivityCod = DocumentActions.GetElementById("txtActivityCod");
        txtActivityDes = DocumentActions.GetElementById("txtActivityDes");
        btnActivityID = DocumentActions.GetElementById("btnActivityID");
        RedAllProject = DocumentActions.GetElementById("RedAllProject");
        RedNonRepair = DocumentActions.GetElementById("RedNonRepair");
        RedRepair = DocumentActions.GetElementById("RedRepair");
        RedByBranch = DocumentActions.GetElementById("RedByBranch");
        RedByScope = DocumentActions.GetElementById("RedByScope");
    }
    function Clear() {
        txtRegionDes.value = "";
        txtRegionCode.value = "";
        btnRegionID.value = "";
        txtBranch.value = "";
        txtBranchCod.value = "";
        txtBranchDes.value = "";
        txtActivityID.value = "";
        txtActivityCod.value = "";
        txtActivityDes.value = "";
    }
    function InitalizeEvents() {
        btnRegionID.onclick = btnRegionID_onclick;
        btnBranch.onclick = btnBranch_onclick;
        btnActivityID.onclick = btnActivityID_onclick;
    }
    function btnRegionID_onclick() {
        debugger;
        sys.FindKey(Modules.NormsVariationRep, "btnRegionID", "COMP_CODE = " + _CompCode, function () {
            var _id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getRegionByid", ControllerName),
                data: { id: _id },
                success: function (d) {
                    Model = d.result;
                    if (Model != null) {
                        txtRegionID.value = Model.REGION_CODE.toString();
                        txtRegionDes.value = _ScreenLanguage == "en" ? Model.DESCE : Model.DESCA;
                    }
                }
            });
        });
    }
    function btnBranch_onclick() {
        sys.FindKey(Modules.ByCustomerClass, "btnBranch", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetBranchByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtBranchCod.value = result.BRA_CODE.toString();
                    txtBranchDes.value = _ScreenLanguage == "ar" ? result.BRA_DESC : result.BRA_DESCE;
                    2;
                }
            });
        });
    }
    function btnActivityID_onclick() {
        sys.FindKey(Modules.NormsVariationRep, "btnActivityID", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getActvitybyid", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtActivityID.value = result.ActivityID.toString();
                    txtActivityCod.value = result.ActivityCode;
                    txtActivityDes.value = _ScreenLanguage == "ar" ? result.DescA : result.DescE;
                    2;
                }
            });
        });
    }
})(NormsVariationReport || (NormsVariationReport = {}));
//# sourceMappingURL=NormsVariationReport.js.map