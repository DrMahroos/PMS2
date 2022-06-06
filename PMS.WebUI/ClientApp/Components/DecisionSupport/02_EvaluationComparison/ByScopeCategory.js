$(document).ready(function () {
    ByScopeCategory.InitalizeComponent();
});
var ByScopeCategory;
(function (ByScopeCategory) {
    var sys = new SystemTools();
    var ControllerName = "ByScopeCategory";
    var categ = new P_D_ScopeCategory();
    var Model = new P_G_Region();
    //--
    var FromDate;
    var ToDate;
    var txtCustClass;
    var txtCustClassCod;
    var txtCustClassDes;
    var btnCustClassID;
    var txtBranch;
    var txtBranchCod;
    var txtBranchDes;
    var btnBranch;
    //--
    var txtRegionID;
    var txtRegionCode;
    var txtRegionDes;
    var btnRegionID;
    //--
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
        InitalizeEvents();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        //getbranchname();
    }
    ByScopeCategory.InitalizeComponent = InitalizeComponent;
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
        txtBranch = DocumentActions.GetElementById("txtBranch");
        txtBranchCod = DocumentActions.GetElementById("txtBranchCod");
        txtBranchDes = DocumentActions.GetElementById("txtBranchDes");
        btnBranch = DocumentActions.GetElementById("btnBranch");
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
        txtRegionID.value = "";
        txtRegionDes.value = "";
        txtRegionCode.value = "";
        txtBranch.value = "";
        txtBranchCod.value = "";
        txtBranchDes.value = "";
        btnBranch.value = "";
    }
    function InitalizeEvents() {
        btnCustClassID.onclick = btnCustClassID_onclick;
        btnBranch.onclick = btnBranch_onclick;
        btnRegionID.onclick = btnRegionID_onclick;
    }
    function btnRegionID_onclick() {
        sys.FindKey(Modules.ByScopeCategory, "btnRegionID", "", function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getRegionByid", ControllerName),
                data: { id: id },
                success: function (d) {
                    debugger;
                    var result = d.result;
                    txtRegionID.value = result.REGION_CODE.toString();
                    txtRegionDes.value = _ScreenLanguage == "en" ? result.DESCE : result.DESCA;
                }
            });
        });
    }
    function btnBranch_onclick() {
        sys.FindKey(Modules.ByScopeCategory, "btnBranch", "", function () {
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
    function btnCustClassID_onclick() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.ByScopeCategory, "btnCustClassID", "", function () {
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
        RP.braCode = "";
        RP.REGION_CODE = 0;
        RP.CatID = 0;
        RP.ScopeCategoryID = 0;
        RP.ScopeID = 0;
        RP.ISRepair = 3;
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = txtBranchCod.value;
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
        RP.REGION_CODE = Number(txtRegionID.value);
        RP.CatID = Number(txtCustClass.value);
        if (($("#RedNonRepair").prop("checked") == true)) {
            RP.ISRepair = 0;
        }
        else if (($("#RedRepair").prop("checked") == true)) {
            RP.ISRepair = 1;
        }
        else if (($("#RedAllProject").prop("checked") == true)) {
            RP.ISRepair = 3;
        }
        RP.GroupType = 3;
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
})(ByScopeCategory || (ByScopeCategory = {}));
//# sourceMappingURL=ByScopeCategory.js.map