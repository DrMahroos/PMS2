$(document).ready(function () {
    Activity.InitalizeComponent();
});
var Activity;
(function (Activity) {
    var sys = new SystemTools();
    var ControllerName = "Activity";
    var categ = new P_D_ScopeCategory();
    var Model = new P_G_Region();
    //--
    var FromDate;
    var ToDate;
    var txtCustClass;
    var txtCustClassCod;
    var txtCustClassDes;
    var btnCustClassID;
    //--
    var txtRegionID;
    var txtRegionCode;
    var txtRegionDes;
    var btnRegionID;
    //--
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
        //GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
        //getbranchname();
    }
    Activity.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //---------- textID---------
        txtRegionID = DocumentActions.GetElementById("txtRegionID");
        txtRegionDes = DocumentActions.GetElementById("txtRegionDes");
        txtRegionCode = DocumentActions.GetElementById("txtRegionCode");
        btnRegionID = DocumentActions.GetElementById("btnRegionID");
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtCustClass = DocumentActions.GetElementById("txtCustClass");
        txtCustClassCod = DocumentActions.GetElementById("txtCustClassCod");
        txtCustClassDes = DocumentActions.GetElementById("txtCustClassDes");
        btnCustClassID = DocumentActions.GetElementById("btnCustClassID");
        //---------- redeo---------
        RedAllProject = DocumentActions.GetElementById("RedAllProject");
        RedNonRepair = DocumentActions.GetElementById("RedNonRepair");
        RedRepair = DocumentActions.GetElementById("RedRepair");
        RedByBranch = DocumentActions.GetElementById("RedByBranch");
        RedByScope = DocumentActions.GetElementById("RedByScope");
        //--------------
    }
    function Clear() {
        txtCustClass.value = "";
        txtCustClassCod.value = "";
        txtCustClassDes.value = "";
        txtRegionID.value = "";
        txtRegionDes.value = "";
        txtRegionCode.value = "";
    }
    function InitalizeEvents() {
        btnRegionID.onclick = btnRegionID_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;
    }
    function btnRegionID_onclick() {
        debugger;
        sys.FindKey(Modules.ByActivity, "btnRegionID", "COMP_CODE = " + _CompCode, function () {
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
    function btnCustClassID_onclick() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.ByActivity, "btnCustClassID", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerClassById", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    debugger;
                    var result = d.result;
                    txtCustClass.value = result.CustomerCategoryID.toString();
                    txtCustClassCod.value = result.CustomerCatCode.toString();
                    txtCustClassDes.value = _ScreenLanguage == "en" ? result.DescE : result.DescA;
                }
            });
        });
    }
})(Activity || (Activity = {}));
//# sourceMappingURL=Activity.js.map