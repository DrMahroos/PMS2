$(document).ready(function () {
    SubContractorWork.InitalizeComponent();
});
var SubContractorWork;
(function (SubContractorWork) {
    var sys = new SystemTools();
    var ControllerName = "SubContractorWork";
    var categ = new P_D_ScopeCategory();
    var Model = new P_G_Region();
    //-------
    var FromDate;
    var ToDate;
    //-------
    var txtCustClass;
    var txtCustClassCod;
    var txtCustClassDes;
    var btnCustClassID;
    //-------
    var txtRegionID;
    var txtRegionCode;
    var txtRegionDes;
    var btnRegionID;
    //------
    var txtScopeCalID;
    var txtScopeCalCod;
    var txtScopeCalDes;
    var btnScopeCalID;
    //-----
    //------
    var RedAllProject;
    var RedNonRepair;
    var RedRepair;
    //-------
    var RedByBranch;
    var RedByScope;
    var btnPrint;
    //-------
    var _CompCode;
    var _BranchCode;
    var _ScreenLanguage;
    //-------
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
    SubContractorWork.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //---------- textID---------
        debugger;
        txtCustClass = DocumentActions.GetElementById("txtCustClass");
        txtCustClassCod = DocumentActions.GetElementById("txtCustClassCod");
        txtCustClassDes = DocumentActions.GetElementById("txtCustClassDes");
        btnCustClassID = DocumentActions.GetElementById("btnCustClassID");
        txtRegionID = DocumentActions.GetElementById("txtRegionID");
        txtRegionDes = DocumentActions.GetElementById("txtRegionDes");
        txtRegionCode = DocumentActions.GetElementById("txtRegionCode");
        btnRegionID = DocumentActions.GetElementById("btnRegionID");
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtScopeCalID = DocumentActions.GetElementById("txtScopeCalID");
        txtScopeCalCod = DocumentActions.GetElementById("txtScopeCalCod");
        txtScopeCalDes = DocumentActions.GetElementById("txtScopeCalDes");
        btnScopeCalID = DocumentActions.GetElementById("btnScopeCalID");
        //---------- redeo---------
        RedAllProject = DocumentActions.GetElementById("RedAllProject");
        RedNonRepair = DocumentActions.GetElementById("RedNonRepair");
        RedRepair = DocumentActions.GetElementById("RedRepair");
        RedByBranch = DocumentActions.GetElementById("RedByBranch");
        RedByScope = DocumentActions.GetElementById("RedByScope");
        //--------------
        RedAllProject.checked = true;
        RedByBranch.checked = true;
    }
    function Clear() {
        RedAllProject.checked = true;
        RedByBranch.checked = true;
        txtCustClass.value = "";
        txtCustClassCod.value = "";
        txtCustClassDes.value = "";
        txtRegionID.value = "";
        txtRegionDes.value = "";
        txtRegionCode.value = "";
        txtScopeCalID.value = "";
        txtScopeCalCod.value = "";
        txtScopeCalDes.value = "";
    }
    function InitalizeEvents() {
        btnScopeCalID.onclick = btnScopeCatID_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;
        btnRegionID.onclick = btnRegionID_onclick;
    }
    function btnRegionID_onclick() {
        sys.FindKey(Modules.ByCustomerClass, "btnRegionID", "COMP_CODE = " + _CompCode, function () {
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
        sys.FindKey(Modules.ByScopeCategory, "btnCustClassID", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerClassById", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtCustClass.value = result.CustomerCategoryID.toString();
                    txtCustClassCod.value = result.CustomerCatCode.toString();
                    txtCustClassDes.value = _ScreenLanguage == "en" ? result.DescE : result.DescA;
                }
            });
        });
    }
    function btnScopeCatID_onclick() {
        sys.FindKey(Modules.ByCustomerClass, "btnScopeCatID", "" /* "CompCode = " + _CompCode*/, function () {
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
    function Print() {
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = "";
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
        RP.REGION_CODE = Number(txtRegionID.value);
        RP.ScopeCategoryID = Number(txtScopeCalID.value);
        RP.custClassID = Number(txtCustClass.value);
        if ($("#RedNonRepair").prop("checked") == true) {
            RP.ISRepair = 0;
        }
        else if ($("#RedRepair").prop("checked") == true) {
            RP.ISRepair = 1;
        }
        else if ($("#RedAllProject").prop("checked") == true) {
            RP.ISRepair = 3;
        }
        if ($("#RedSummary").prop("checked") == true) {
            RP.TypeReport = 1;
        }
        else {
            RP.TypeReport = 2;
        }
        if (RedByBranch.checked)
            RP.GroupType = 1;
        else
            RP.GroupType = 2;
        if (RP.TypeReport == 1) {
            Ajax.CallAsync({
                url: Url.Action("Rep_DSS_SubContractorWorkSummary", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        else {
            Ajax.CallAsync({
                url: Url.Action("Rep_DSS_SubContractorWorkDetail", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
    }
})(SubContractorWork || (SubContractorWork = {}));
//# sourceMappingURL=SubContractorWork.js.map