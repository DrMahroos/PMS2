$(document).ready(function () {
    ByItem.InitalizeComponent();
});
var ByItem;
(function (ByItem) {
    var sys = new SystemTools();
    var ControllerName = "ByItem";
    var categ = new P_D_ScopeCategory();
    var Model = new P_G_Region();
    //--
    var FromDate;
    var ToDate;
    var txtCustClass;
    var txtCustClassCod;
    var txtCustClassDes;
    var btnCustClassID;
    var txtScopeCalID;
    var txtScopeCalCod;
    var txtScopeCalDes;
    var btnScopeCalID;
    var txtScopeID;
    var txtScopeCode;
    var txtScopeDes;
    var butScopeID;
    var RedAllProject;
    var RedNewProjects;
    var RedAdditionalWork;
    var _CompCode;
    var _BranchCode;
    var btnPrint;
    var _ScreenLanguage;
    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
        //getbranchname();
    }
    ByItem.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //---------- textID---------
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtCustClass = DocumentActions.GetElementById("txtCustClass");
        txtCustClassCod = DocumentActions.GetElementById("txtCustClassCod");
        txtCustClassDes = DocumentActions.GetElementById("txtCustClassDes");
        btnCustClassID = DocumentActions.GetElementById("btnCustClassID");
        txtScopeCalID = DocumentActions.GetElementById("txtScopeCalID");
        txtScopeCalCod = DocumentActions.GetElementById("txtScopeCalCod");
        txtScopeCalDes = DocumentActions.GetElementById("txtScopeCalDes");
        btnScopeCalID = DocumentActions.GetElementById("btnScopeCalID");
        txtScopeID = DocumentActions.GetElementById("txtScopeID");
        txtScopeCode = DocumentActions.GetElementById("txtScopeCode");
        txtScopeDes = DocumentActions.GetElementById("txtScopeDes");
        butScopeID = DocumentActions.GetElementById("butScopeID");
        //---------- redeo---------
        RedAllProject = DocumentActions.GetElementById("RedAllProject");
        RedAllProject.checked = true;
        //--------------
    }
    function Clear() {
        RedAllProject.checked = true;
        txtCustClass.value = "";
        txtCustClassCod.value = "";
        txtCustClassDes.value = "";
        txtScopeCalID.value = "";
        txtScopeCalCod.value = "";
        txtScopeCalDes.value = "";
    }
    function InitalizeEvents() {
        btnScopeCalID.onclick = btnScopeCatID_onclick;
        butScopeID.onclick = butScopeID_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;
    }
    function btnScopeCatID_onclick() {
        sys.FindKey(Modules.ByItem, "btnScopeCatID", "" /* "CompCode = " + _CompCode*/, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getScopeCategory", ControllerName),
                data: { id: id },
                success: function (d) {
                    categ = d.result;
                    // if (categ != null) {
                    txtScopeCalID.value = categ.ScopeCategoryID.toString();
                    txtScopeCalCod.value = categ.ScopeCategCode.toString();
                    txtScopeCalDes.value = _ScreenLanguage == "en" ? categ.DescE : categ.DescA;
                    //}
                }
            });
        });
    }
    function butScopeID_onclick() {
        sys.FindKey(Modules.ByItem, "butScopeID", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetScope", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtScopeID.value = result.ScopeID.toString();
                    txtScopeCode.value = result.ScopeCode.toString();
                    txtScopeDes.value = _ScreenLanguage == "en" ? result.DescE : result.DescA;
                }
            });
        });
    }
    function btnCustClassID_onclick() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.ByItem, "btnCustClassID", "", function () {
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
    function Print() {
        debugger;
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
        RP.CatID = Number(txtCustClass.value);
        RP.ScopeCategoryID = Number(txtScopeCalID.value);
        RP.ScopeID = Number(txtScopeID.value);
        RP.REGION_CODE = 0;
        RP.braCode = "0";
        if (($("#RedNonRepair").prop("checked") == true)) {
            RP.ISRepair = 0;
        }
        else if (($("#RedRepair").prop("checked") == true)) {
            RP.ISRepair = 1;
        }
        else if (($("#RedAllProject").prop("checked") == true)) {
            RP.ISRepair = 3;
        }
        RP.GroupType = 1;
        Ajax.CallAsync({
            url: Url.Action("Rep_DSS_ProjectEvaluation", "GeneralReports"),
            data: RP,
            success: function (d) {
                debugger;
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(ByItem || (ByItem = {}));
//# sourceMappingURL=ByItem.js.map