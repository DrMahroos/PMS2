$(document).ready(function () {
    ProductionComparison.InitalizeComponent();
});
var ProductionComparison;
(function (ProductionComparison) {
    var sys = new SystemTools();
    var ControllerName = "ProductionComparis";
    var categ = new P_D_ScopeCategory();
    var Model = new P_G_Region();
    //--
    var txtyer;
    var txtCustClass;
    var txtCustClassCod;
    var txtCustClassDes;
    var btnCustClassID;
    //--
    var txtRegionID;
    //var txtRegionCode: HTMLInputElement;
    var txtRegionDes;
    var btnRegionID;
    //--
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
        InitalizeEvents();
        //getbranchname();
    }
    ProductionComparison.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //---------- textID---------
        debugger;
        txtRegionID = DocumentActions.GetElementById("txtRegionID");
        txtRegionDes = DocumentActions.GetElementById("txtRegionDes");
        //txtRegionCode = DocumentActions.GetElementById<HTMLInputElement>("txtRegionCode");
        btnRegionID = DocumentActions.GetElementById("btnRegionID");
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
        //RedBySalesPrice = DocumentActions.GetElementById<HTMLInputElement>("RedBySalesPrice");
        //RedByStdPrice = DocumentActions.GetElementById<HTMLInputElement>("RedByStdPrice");
        RedAllProject = DocumentActions.GetElementById("RedAllProject");
        txtyer = DocumentActions.GetElementById("txtyer");
        //--------------
        txtyer.value = SharedSession.CurrentEnvironment.CurrentYear.toString();
        RedAllProject.checked = true;
    }
    function Clear() {
        txtyer.value = SharedSession.CurrentEnvironment.CurrentYear.toString();
        RedAllProject.checked = true;
        txtCustClass.value = "";
        txtCustClassCod.value = "";
        txtCustClassDes.value = "";
        txtRegionID.value = "";
        txtRegionDes.value = "";
        txtScopeCalID.value = "";
        txtScopeCalCod.value = "";
        txtScopeCalDes.value = "";
        txtScopeID.value = "";
        txtScopeCode.value = "";
        txtScopeDes.value = "";
    }
    function InitalizeEvents() {
        btnCustClassID.onclick = btnCustClassID_onclick;
        butScopeID.onclick = butScopeID_onclick;
        btnScopeCalID.onclick = btnScopeCatID_onclick;
        btnRegionID.onclick = btnRegionID_onclick;
    }
    function btnRegionID_onclick() {
        debugger;
        sys.FindKey(Modules.ProductionComparis, "btnRegionID", "COMP_CODE = " + _CompCode, function () {
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
        sys.FindKey(Modules.ProductionComparis, "btnCustClassID", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerClassById", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    debugger;
                    var result = d.result;
                    if (result != null) {
                        txtCustClass.value = result.CustomerCategoryID.toString();
                        txtCustClassCod.value = result.CustomerCatCode.toString();
                        txtCustClassDes.value = _ScreenLanguage == "en" ? result.DescE : result.DescA;
                    }
                }
            });
        });
    }
    function btnScopeCatID_onclick() {
        sys.FindKey(Modules.ProductionComparis, "btnScopeCatID", "" /* "CompCode = " + _CompCode*/, function () {
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
        sys.FindKey(Modules.ProductionComparis, "butScopeID", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetScope", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    if (result != null) {
                        txtScopeID.value = result.ScopeID.toString();
                        txtScopeCode.value = result.ScopeCode;
                        txtScopeDes.value = _ScreenLanguage == "en" ? result.DescE : result.DescA;
                    }
                }
            });
        });
    }
    function Print() {
        debugger;
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.yearID = Number(txtyer.value);
        RP.REGION_CODE = Number(txtRegionID.value);
        RP.custClassID = Number(txtCustClass.value);
        RP.ScopeCategoryID = Number(txtScopeCalID.value);
        RP.ScopeID = Number(txtScopeID.value);
        if (($("#RedNonRepair").prop("checked") == true)) {
            RP.ISRepair = 0;
        }
        else if (($("#RedRepair").prop("checked") == true)) {
            RP.ISRepair = 1;
        }
        else if (($("#RedAllProject").prop("checked") == true)) {
            RP.ISRepair = 3;
        }
        Ajax.CallAsync({
            url: Url.Action("DSS_ProductionBranch", "GeneralReports"),
            data: RP,
            success: function (d) {
                debugger;
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(ProductionComparison || (ProductionComparison = {}));
//# sourceMappingURL=ProductionComparison.js.map