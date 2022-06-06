$(document).ready(function () {
    ProjectWorking.InitalizeComponent();
});
var ProjectWorking;
(function (ProjectWorking) {
    var sys = new SystemTools();
    var ControllerName = "ProjectWorking";
    var categ = new P_D_ScopeCategory();
    var Model = new P_D_SiteEngineer();
    var FromDate;
    var ToDate;
    var txtFromProject;
    var txtToProject;
    var txtArea;
    var txtSel;
    var txtCustClass;
    var txtCust;
    var txtScopeID;
    var txtScopeCatID;
    var txtSiteEngID;
    var txtSiteEngCodeDes;
    var txtSiteEngCode;
    var txtAreaCod;
    var txtSelCod;
    var txtCustClassCod;
    var txtCustCod;
    var txtScopeCode;
    var txtScopeCatCod;
    var txtAreaDes;
    var txtSalDesc;
    var txtCustClassDes;
    var txtCustIDDes;
    var txtScopeCatDes;
    var txtScopeCodeDes;
    var btnArea;
    var btnSalesID;
    var btnCustClassID;
    var btnCustID;
    var btnScopeCatID;
    var butScope_Code;
    var btnSiteEngID;
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
    var btnPrint;
    var _ScreenLanguage;
    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
    function InitalizeComponent() {
        debugger;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
        //getbranchname();
    }
    ProjectWorking.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //---------- textID---------
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtArea = DocumentActions.GetElementById("txtArea");
        txtSel = DocumentActions.GetElementById("txtSel");
        txtCustClass = DocumentActions.GetElementById("txtCustClass");
        txtCust = DocumentActions.GetElementById("txtCust");
        txtScopeCatID = DocumentActions.GetElementById("txtScopeCatID");
        txtScopeID = DocumentActions.GetElementById("txtScopeID");
        txtSiteEngID = DocumentActions.GetElementById("txtSiteEngID");
        txtSiteEngCodeDes = DocumentActions.GetElementById("txtSiteEngCodeDes");
        txtSiteEngCode = DocumentActions.GetElementById("txtSiteEngCode");
        txtFromProject = DocumentActions.GetElementById("txtFromProject");
        txtToProject = DocumentActions.GetElementById("txtToProject");
        //---------- textDes---------
        txtAreaDes = DocumentActions.GetElementById("txtAreaDes");
        txtSalDesc = DocumentActions.GetElementById("txtSalDesc");
        txtCustClassDes = DocumentActions.GetElementById("txtCustClassDes");
        txtCustIDDes = DocumentActions.GetElementById("txtCustIDDes");
        txtScopeCatDes = DocumentActions.GetElementById("txtScopeCatDes");
        txtScopeCodeDes = DocumentActions.GetElementById("txtScopeCodeDes");
        //---------- textcood---------
        txtAreaCod = DocumentActions.GetElementById("txtAreaCod");
        txtSelCod = DocumentActions.GetElementById("txtSelCod");
        txtCustClassCod = DocumentActions.GetElementById("txtCustClassCod");
        txtCustCod = DocumentActions.GetElementById("txtCustCod");
        txtScopeCode = DocumentActions.GetElementById("txtScopeCode");
        txtScopeCatCod = DocumentActions.GetElementById("txtScopeCatCod");
        //---------- btn---------
        btnArea = DocumentActions.GetElementById("btnArea");
        btnSalesID = DocumentActions.GetElementById("btnSalesID");
        btnCustClassID = DocumentActions.GetElementById("btnCustClassID");
        btnCustID = DocumentActions.GetElementById("btnCustID");
        btnScopeCatID = DocumentActions.GetElementById("btnScopeCatID");
        butScope_Code = DocumentActions.GetElementById("butScope_Code");
        btnSiteEngID = DocumentActions.GetElementById("btnSiteEngID");
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
        RedAllProject.checked = true;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtFromProject.value = "1";
        txtToProject.value = "999999";
    }
    function Clear() {
        RedAll.checked = true;
        RedAllProject.checked = true;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtFromProject.value = "1";
        txtToProject.value = "999999";
        txtArea.value = "";
        txtSel.value = "";
        txtCustClass.value = "";
        txtCust.value = "";
        txtAreaDes.value = "";
        txtSalDesc.value = "";
        txtCustClassDes.value = "";
        txtCustIDDes.value = "";
        txtScopeCatID.value = "";
        txtScopeID.value = "";
        txtScopeCatDes.value = "";
        txtScopeCodeDes.value = "";
        //txtSiteEngCode.value = "";
        //txtSiteEngCodeDes.value = "";
        //txtSiteEngID.value = "";
    }
    function InitalizeEvents() {
        debugger;
        btnSalesID.onclick = btnSalesID_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;
        btnCustID.onclick = btnCustID_onclick;
        butScope_Code.onclick = butScope_Code_onclick;
        btnScopeCatID.onclick = btnScopeCatID_onclick;
        btnSiteEngID.onclick = btnSiteEngID_onclick;
    }
    function btnSalesID_onclick() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepProjectWorking, "btnSalesID", Condition, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger;
            Ajax.CallAsync({
                url: Url.Action("GetSalesCodeByID", ControllerName),
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
        sys.FindKey(Modules.RepProjectWorking, "btnCustClassID", "", function () {
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
        sys.FindKey(Modules.RepProjectWorking, "btnCustID", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerById", ControllerName),
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
    function btnScopeCatID_onclick() {
        sys.FindKey(Modules.RepProjectWorking, "btnScopeCatID", "" /* "CompCode = " + _CompCode*/, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getScopeCategory", ControllerName),
                data: { id: id },
                success: function (d) {
                    categ = d.result;
                    // if (categ != null) {
                    txtScopeCatID.value = categ.ScopeCategoryID.toString();
                    txtScopeCatCod.value = categ.ScopeCategCode.toString();
                    txtScopeCatDes.value = _ScreenLanguage == "en" ? categ.DescE : categ.DescA;
                    //}
                }
            });
        });
    }
    function butScope_Code_onclick() {
        sys.FindKey(Modules.RepProjectWorking, "butScope_Code", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetScope", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtScopeID.value = result.ScopeID.toString();
                    txtScopeCode.value = result.ScopeCode.toString();
                    txtScopeCodeDes.value = _ScreenLanguage == "en" ? result.DescE : result.DescA;
                }
            });
        });
    }
    function btnSiteEngID_onclick() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepProjectWorking, "btnSiteEngID", Condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger;
            Ajax.CallAsync({
                url: Url.Action("getSiteEngByid", "ProjectWorking"),
                data: { id: Number(id) },
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
    function Print() {
        debugger;
        var RP = new ReportParameters();
        // RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.FromProjCode = txtFromProject.value;
        RP.ToProjCode = txtToProject.value;
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
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
            debugger;
            RP.ISRepair = 3;
        }
        Ajax.CallAsync({
            url: Url.Action("rptProjectWorking", "GeneralReports"),
            data: RP,
            success: function (d) {
                debugger;
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(ProjectWorking || (ProjectWorking = {}));
//# sourceMappingURL=ProjectWorking.js.map