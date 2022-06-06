$(document).ready(function () {
    ProjectPhaseDistribution.InitalizeComponent();
});
var ProjectPhaseDistribution;
(function (ProjectPhaseDistribution) {
    var sys = new SystemTools();
    var ControllerName = "ProjectPhaseDistribution";
    var categ = new P_D_ScopeCategory();
    var Model = new P_D_SiteEngineer();
    var txtArea;
    var txtSel;
    var txtCustClass;
    var txtCust;
    var txtSiteEngID;
    var txtScopeID;
    var txtScopeCatID;
    var txtAreaDes;
    var txtSalDesc;
    var txtCustClassDes;
    var txtCustIDDes;
    var txtSiteEngCodeDes;
    var txtScopeCatDes;
    var txtScopeCodeDes;
    var txtAreaCod;
    var txtSelCod;
    var txtCustClassCod;
    var txtCustCod;
    var txtSiteEngCode;
    var txtScopeCode;
    var txtScopeCatCod;
    var btnArea;
    var btnSalesID;
    var btnCustClassID;
    var btnCustID;
    var btnSiteEngID;
    var btnScopeCatID;
    var butScope_Code;
    var RedSalEng;
    var RedScope;
    var RedAllProject;
    var RedNonRepair;
    var RedRepair;
    var RedNew;
    var Redworking;
    var RedHold;
    var RedSuspended;
    var Redfinish;
    var RedAll;
    var _CompCode;
    var _BranchCode;
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
    ProjectPhaseDistribution.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //---------- textID---------
        txtSiteEngID = DocumentActions.GetElementById("txtSiteEngID");
        txtSel = DocumentActions.GetElementById("txtSel");
        txtCustClass = DocumentActions.GetElementById("txtCustClass");
        txtCust = DocumentActions.GetElementById("txtCust");
        txtScopeCatID = DocumentActions.GetElementById("txtScopeCatID");
        txtScopeID = DocumentActions.GetElementById("txtScopeID");
        //---------- textDes---------
        txtSiteEngCodeDes = DocumentActions.GetElementById("txtSiteEngCodeDes");
        txtSalDesc = DocumentActions.GetElementById("txtSalDesc");
        txtCustClassDes = DocumentActions.GetElementById("txtCustClassDes");
        txtCustIDDes = DocumentActions.GetElementById("txtCustIDDes");
        txtScopeCatDes = DocumentActions.GetElementById("txtScopeCatDes");
        txtScopeCodeDes = DocumentActions.GetElementById("txtScopeCodeDes");
        //---------- textcood---------
        txtSiteEngCode = DocumentActions.GetElementById("txtSiteEngCode");
        txtSelCod = DocumentActions.GetElementById("txtSelCod");
        txtCustClassCod = DocumentActions.GetElementById("txtCustClassCod");
        txtCustCod = DocumentActions.GetElementById("txtCustCod");
        txtScopeCode = DocumentActions.GetElementById("txtScopeCode");
        txtScopeCatCod = DocumentActions.GetElementById("txtScopeCatCod");
        //---------- btn---------
        btnSalesID = DocumentActions.GetElementById("btnSalesID");
        btnCustClassID = DocumentActions.GetElementById("btnCustClassID");
        btnCustID = DocumentActions.GetElementById("btnCustID");
        btnSiteEngID = DocumentActions.GetElementById("btnSiteEngID");
        btnScopeCatID = DocumentActions.GetElementById("btnScopeCatID");
        butScope_Code = DocumentActions.GetElementById("butScope_Code");
        //---------- redeo---------
        RedSalEng = DocumentActions.GetElementById("RedSalEng");
        RedScope = DocumentActions.GetElementById("RedScope");
        RedAllProject = DocumentActions.GetElementById("RedAllProject");
        RedNonRepair = DocumentActions.GetElementById("RedNonRepair");
        RedRepair = DocumentActions.GetElementById("RedRepair");
        RedNew = DocumentActions.GetElementById("RedNew");
        Redworking = DocumentActions.GetElementById("Redworking");
        RedHold = DocumentActions.GetElementById("RedHold");
        RedSuspended = DocumentActions.GetElementById("RedSuspended");
        Redfinish = DocumentActions.GetElementById("Redfinish");
        RedAll = DocumentActions.GetElementById("RedAll");
        //--------------
        RedAll.checked = true;
        RedScope.checked = true;
        RedAllProject.checked = true;
    }
    function Clear() {
        RedAll.checked = true;
        RedScope.checked = true;
        RedAllProject.checked = true;
        txtArea.value = "";
        txtSel.value = "";
        txtCustClass.value = "";
        txtCust.value = "";
        txtAreaDes.value = "";
        txtSalDesc.value = "";
        txtCustClassDes.value = "";
        txtCustIDDes.value = "";
        txtSiteEngID.value = "";
        txtScopeCatID.value = "";
        txtScopeID.value = "";
        txtSiteEngCodeDes.value = "";
        txtScopeCatDes.value = "";
        txtScopeCodeDes.value = "";
    }
    function InitalizeEvents() {
        debugger;
        btnSalesID.onclick = btnSalesID_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;
        btnCustID.onclick = btnCustID_onclick;
        btnSiteEngID.onclick = btnSiteEngID_onclick;
        butScope_Code.onclick = butScope_Code_onclick;
        btnScopeCatID.onclick = btnScopeCatID_onclick;
        GeneralReports.OnPrint = Print;
    }
    function btnSiteEngID_onclick() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepProjectPhaseDis, "btnSiteEngID", Condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getSiteEngByid", ControllerName),
                data: { id: id },
                success: function (d) {
                    Model = d.result;
                    if (Model != null) {
                        txtSiteEngID.value = Model.SiteEngineerId.toString();
                        txtSiteEngCode.value = Model.EngCode.toString();
                        txtSiteEngCodeDes.value = _ScreenLanguage == "en" ? Model.DescE : Model.DescA;
                    }
                }
            });
        });
    }
    function btnSalesID_onclick() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepProjectDist, "btnSalesID", Condition, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger;
            Ajax.CallAsync({
                url: Url.Action("GetSalesCodeByID", "ProjectDistribution"),
                data: { id: _Id },
                success: function (d) {
                    var _result = d.result;
                    txtSel.value = _result.SalesEngineerId.toString();
                    txtSelCod.value = _result.EngCode.toString();
                    txtSalDesc.value = _ScreenLanguage == "en" ? _result.DescE : _result.DeacA;
                    ;
                }
            });
        });
    }
    function btnCustClassID_onclick() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepProjectDist, "btnCustClassID", "", function () {
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
    function btnCustID_onclick() {
        sys.FindKey(Modules.RepProjectDist, "btnCustID", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerById", "ProjectDistribution"),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtCust.value = result.CustomerID.toString();
                    txtCustCod.value = result.CustomerCode.toString();
                    txtCustIDDes.value = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? result.DescA : result.DescE;
                }
            });
        });
    }
    function butScope_Code_onclick() {
        sys.FindKey(Modules.RepProjectPhaseDis, "butScope_Code", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetScope", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtScopeCode.value = result.ScopeCode.toString();
                    txtScopeID.value = result.ScopeID.toString();
                    txtScopeCodeDes.value = _ScreenLanguage == "en" ? result.DescE : result.DescA;
                }
            });
        });
    }
    function btnScopeCatID_onclick() {
        sys.FindKey(Modules.RepProjectPhaseDis, "btnScopeCatID", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getScopeCategory", ControllerName),
                data: { id: id },
                success: function (d) {
                    categ = d.result;
                    txtScopeCatID.value = categ.ScopeCategoryID.toString();
                    txtScopeCatCod.value = categ.ScopeCategCode.toString();
                    txtScopeCatDes.value = _ScreenLanguage == "en" ? categ.DescE : categ.DescA;
                }
            });
        });
    }
    function Print() {
        debugger;
        var RP = new ReportParameters();
        // RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.SiteEngineerId = Number(txtSiteEngID.value);
        RP.ScopeCategoryID = Number(txtScopeCatID.value);
        RP.ScopeID = Number(txtScopeID.value);
        RP.EngID = Number(txtSel.value);
        RP.custClassID = Number(txtCustClass.value);
        RP.customerID = Number(txtCust.value);
        if ($("#RedNew").prop("checked") == true) {
            RP.Stat = 0;
        }
        else if ($("#Redworking").prop("checked") == true) {
            RP.Stat = 1;
        }
        else if ($("#RedHold").prop("checked") == true) {
            RP.Stat = 2;
        }
        else if ($("#RedSuspended").prop("checked") == true) {
            RP.Stat = 3;
        }
        else if ($("#Redfinish").prop("checked") == true) {
            RP.Stat = 5;
        }
        else if ($("#RedAll").prop("checked") == true) {
            RP.Stat = 6;
        }
        if ($("#RedNonRepair").prop("checked") == true) {
            RP.ISRepair = 0;
        }
        else if ($("#RedRepair").prop("checked") == true) {
            RP.ISRepair = 1;
        }
        else if ($("#RedAllProject").prop("checked") == true) {
            RP.ISRepair = null;
        }
        if ($("#RedScope").prop("checked") == true) {
            RP.TypeReport = 1;
            Ajax.CallAsync({
                url: Url.Action("rptProjectPhaseDistribution", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        else {
            RP.TypeReport = 2;
            Ajax.CallAsync({
                url: Url.Action("rptProjectPhaseDistribution", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
    }
})(ProjectPhaseDistribution || (ProjectPhaseDistribution = {}));
//# sourceMappingURL=ProjectPhaseDistribution.js.map