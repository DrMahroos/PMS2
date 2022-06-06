$(document).ready(function () {
    MaterialCoverage.InitalizeComponent();
});
var MaterialCoverage;
(function (MaterialCoverage) {
    var sys = new SystemTools();
    var ControllerName = "MaterialCoverage";
    var categ = new P_D_ScopeCategory();
    var Model = new P_D_Location();
    var FromDate;
    var ToDate;
    //---
    var txtFromProject;
    var txtToProject;
    //--
    //var txtBranch: HTMLInputElement;
    //var txtBranchCod: HTMLInputElement;
    //var txtBranchDes: HTMLInputElement;
    //var btnBranch: HTMLButtonElement;
    //--
    var txtProjectEng;
    var txtProjectEngCod;
    var txtProjectEngDes;
    var btnProjectEng;
    //--
    var txtSiet;
    var txtSietCod;
    var txtSietDesc;
    var btnSietID;
    //--
    var txtCustClass;
    var txtCustClassCod;
    var txtCustClassDes;
    var btnCustClassID;
    //--
    var txtCust;
    var txtCustCod;
    var txtCustDes;
    var btnCustID;
    //--
    var txtArea;
    var txtAreaCod;
    var txtAreaDes;
    var btnArea;
    //--
    var txtScopeCalID;
    var txtScopeCalCod;
    var txtScopeCalDes;
    var btnScopeCalID;
    var txtScopeID;
    var txtScopeCode;
    var txtScopeDes;
    var butScopeID;
    var txtFromeItem;
    var txtToItem;
    var RedProject;
    var Reditem;
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
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
    }
    MaterialCoverage.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //---------- textID---------
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtFromProject = DocumentActions.GetElementById("txtFromProject");
        txtToProject = DocumentActions.GetElementById("txtToProject");
        //txtBranch = DocumentActions.GetElementById<HTMLInputElement>("txtBranch");
        //txtBranchCod = DocumentActions.GetElementById<HTMLInputElement>("txtBranchCod");
        //txtBranchDes = DocumentActions.GetElementById<HTMLInputElement>("txtBranchDes");
        //btnBranch = DocumentActions.GetElementById<HTMLButtonElement>("btnBranch");
        txtSiet = DocumentActions.GetElementById("txtSiet");
        txtSietCod = DocumentActions.GetElementById("txtSietCod");
        txtSietDesc = DocumentActions.GetElementById("txtSietDesc");
        btnSietID = DocumentActions.GetElementById("btnSietID");
        txtCustClass = DocumentActions.GetElementById("txtCustClass");
        txtCustClassCod = DocumentActions.GetElementById("txtCustClassCod");
        txtCustClassDes = DocumentActions.GetElementById("txtCustClassDes");
        btnCustClassID = DocumentActions.GetElementById("btnCustClassID");
        txtCust = DocumentActions.GetElementById("txtCust");
        txtCustCod = DocumentActions.GetElementById("txtCustCod");
        txtCustDes = DocumentActions.GetElementById("txtCustDes");
        btnCustID = DocumentActions.GetElementById("btnCustID");
        txtArea = DocumentActions.GetElementById("txtArea");
        txtAreaCod = DocumentActions.GetElementById("txtAreaCod");
        txtAreaDes = DocumentActions.GetElementById("txtAreaDes");
        btnArea = DocumentActions.GetElementById("btnArea");
        txtScopeCalID = DocumentActions.GetElementById("txtScopeCalID");
        txtScopeCalCod = DocumentActions.GetElementById("txtScopeCalCod");
        txtScopeCalDes = DocumentActions.GetElementById("txtScopeCalDes");
        btnScopeCalID = DocumentActions.GetElementById("btnScopeCalID");
        txtScopeID = DocumentActions.GetElementById("txtScopeID");
        txtScopeCode = DocumentActions.GetElementById("txtScopeCode");
        txtScopeDes = DocumentActions.GetElementById("txtScopeDes");
        butScopeID = DocumentActions.GetElementById("butScopeID");
        txtFromeItem = DocumentActions.GetElementById("txtFromeItem");
        txtToItem = DocumentActions.GetElementById("txtToItem");
        //---------- redeo---------
        RedProject = DocumentActions.GetElementById("RedProject");
        Reditem = DocumentActions.GetElementById("Reditem");
        RedNew = DocumentActions.GetElementById("RedNew");
        Redworking = DocumentActions.GetElementById("Redworking");
        RedHold = DocumentActions.GetElementById("RedHold");
        RedSuspended = DocumentActions.GetElementById("RedSuspended");
        Redfinish = DocumentActions.GetElementById("Redfinish");
        RedAll = DocumentActions.GetElementById("RedAll");
        //--------------
        RedAll.checked = true;
        RedProject.checked = true;
    }
    function Clear() {
        txtFromProject.value = "";
        txtToProject.value = "";
        txtArea.value = "";
        txtAreaCod.value = "";
        txtAreaDes.value = "";
        txtSiet.value = "";
        txtSietCod.value = "";
        txtSietDesc.value = "";
        txtCustClass.value = "";
        txtCustClassCod.value = "";
        txtCustClassDes.value = "";
        txtCust.value = "";
        txtCustCod.value = "";
        txtCustDes.value = "";
        //txtBranch.value = "";
        //txtBranchCod.value = "";
        //txtBranchDes.value = "";
        txtScopeCalID.value = "";
        txtScopeCalCod.value = "";
        txtScopeCalDes.value = "";
        txtScopeID.value = "";
        txtScopeCode.value = "";
        txtScopeDes.value = "";
        txtToItem.value = "";
        txtFromeItem.value = "";
        RedAll.checked = true;
        RedProject.checked = true;
    }
    function InitalizeEvents() {
        debugger;
        //btnBranch.onclick = btnBranch_onclick;
        btnSietID.onclick = btnSietID_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;
        btnCustID.onclick = btnCustID_onclick;
        butScopeID.onclick = butScope_onclick;
        btnScopeCalID.onclick = btnScopeCatID_onclick;
    }
    //function btnBranch_onclick() {
    //    sys.FindKey(Modules.RepMaterialCoverage, "btnBranch", "", () => {
    //        let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("GetBranchByID", ControllerName),
    //            data: { id: _Id },
    //            success: (d) => {
    //                let result = d.result as G_BRANCH;
    //                txtBranchCod.value = result.BRA_CODE.toString();
    //                txtBranchDes.value = _ScreenLanguage == "ar" ? result.BRA_DESC : result.BRA_DESCE; 2
    //            }
    //        });
    //    })
    //}
    function btnSietID_onclick() {
        sys.FindKey(Modules.RepMaterialCoverage, "btnSietID", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger;
            Ajax.CallAsync({
                url: Url.Action("GetSiteByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var _result = d.result;
                    txtSiet.value = _result.SiteEngineerId.toString();
                    txtSietCod.value = _result.EngCode.toString();
                    txtSietDesc.value = _ScreenLanguage == "en" ? _result.DescE : _result.DescA;
                }
            });
        });
    }
    function btnCustClassID_onclick() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepMaterialCoverage, "btnCustClassID", "", function () {
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
        sys.FindKey(Modules.RepMaterialCoverage, "btnCustID", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerById", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtCust.value = result.CustomerID.toString();
                    txtCustCod.value = result.CustomerCode.toString();
                    txtCustDes.value = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? result.DescA : result.DescE;
                }
            });
        });
    }
    function btnScopeCatID_onclick() {
        sys.FindKey(Modules.RepMaterialCoverage, "btnScopeCatID", "" /* "CompCode = " + _CompCode*/, function () {
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
    function butScope_onclick() {
        sys.FindKey(Modules.RepMaterialCoverage, "butScopeID", "", function () {
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
    function Print() {
        debugger;
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
        RP.FromProjCode = txtFromProject.value;
        RP.ToProjCode = txtToProject.value;
        RP.FromItemNo = txtFromeItem.value;
        RP.ToItemNo = txtToItem.value;
        RP.SiteEngineerId = Number(txtSiet.value);
        RP.custClassID = Number(txtCustClass.value);
        RP.customerID = Number(txtCust.value);
        RP.ScopeCategoryID = Number(txtScopeCalID.value);
        RP.ScopeID = Number(txtScopeID.value);
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
        if (RedProject.checked == true)
            RP.TypeReport = 1;
        else
            RP.TypeReport = 2;
        Ajax.CallAsync({
            url: Url.Action("P_rep_MaterialCoverage", "GeneralReports"),
            data: RP,
            success: function (d) {
                debugger;
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(MaterialCoverage || (MaterialCoverage = {}));
//# sourceMappingURL=MaterialCoverage.js.map