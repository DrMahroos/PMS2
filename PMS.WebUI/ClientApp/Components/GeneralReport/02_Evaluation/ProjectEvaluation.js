$(document).ready(function () {
    ProjectEvaluation.InitalizeComponent();
});
var ProjectEvaluation;
(function (ProjectEvaluation) {
    var sys = new SystemTools();
    var ControllerName = "ProjectEvaluation";
    var categ = new P_D_ScopeCategory();
    var Model = new P_D_Location();
    var FromDate;
    var ToDate;
    //---
    var txtFromProject;
    var txtToProject;
    //--
    var txtBranch;
    var txtBranchCod;
    var txtBranchDes;
    var btnBranch;
    //--
    var txtProjectEng;
    var txtProjectEngCod;
    var txtProjectEngDes;
    var btnProjectEng;
    //--
    var txtSel;
    var txtSelCod;
    var txtSalDesc;
    var btnSalesID;
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
    var txtLocationID;
    var txtLocationCode;
    var txtLocationDes;
    var btnLocationID;
    //--
    var txtScopeCalID;
    var txtScopeCalCod;
    var txtScopeCalDes;
    var btnScopeCalID;
    var txtScopeID;
    var txtScopeCode;
    var txtScopeDes;
    var butScopeID;
    var ExcludeZero;
    var RedProject;
    var RedPhase;
    var RedAllProject;
    var RedNonRepair;
    var RedRepair;
    var RedNew;
    var Redworking;
    var RedHold;
    var RedSuspended;
    var Redfinish;
    var RedAll;
    var RedAllSuCont;
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
        txtFromProject.value = "0";
        txtToProject.value = "999999";
        RedAll.checked = true;
        RedAllProject.checked = true;
        RedProject.checked = true;
        ExcludeZero.checked = true;
        RedAllSuCont.checked = true;
    }
    ProjectEvaluation.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtFromProject = DocumentActions.GetElementById("txtFromProject");
        txtToProject = DocumentActions.GetElementById("txtToProject");
        //txtBranch = DocumentActions.GetElementById<HTMLInputElement>("txtBranch");
        //txtBranchCod = DocumentActions.GetElementById<HTMLInputElement>("txtBranchCod");
        //txtBranchDes = DocumentActions.GetElementById<HTMLInputElement>("txtBranchDes");
        //btnBranch = DocumentActions.GetElementById<HTMLButtonElement>("btnBranch");
        txtProjectEng = DocumentActions.GetElementById("txtProjectEng");
        txtProjectEngCod = DocumentActions.GetElementById("txtProjectEngCod");
        txtProjectEngDes = DocumentActions.GetElementById("txtProjectEngDes");
        btnProjectEng = DocumentActions.GetElementById("btnProjectEng");
        txtSel = DocumentActions.GetElementById("txtSel");
        txtSelCod = DocumentActions.GetElementById("txtSelCod");
        txtSalDesc = DocumentActions.GetElementById("txtSalDesc");
        btnSalesID = DocumentActions.GetElementById("btnSalesID");
        txtCustClass = DocumentActions.GetElementById("txtCustClass");
        txtCustClassCod = DocumentActions.GetElementById("txtCustClassCod");
        txtCustClassDes = DocumentActions.GetElementById("txtCustClassDes");
        btnCustClassID = DocumentActions.GetElementById("btnCustClassID");
        txtCust = DocumentActions.GetElementById("txtCust");
        txtCustCod = DocumentActions.GetElementById("txtCustCod");
        txtCustDes = DocumentActions.GetElementById("txtCustDes");
        btnCustID = DocumentActions.GetElementById("btnCustID");
        //txtLocationID = DocumentActions.GetElementById<HTMLInputElement>("txtLocationID");
        //txtLocationDes = DocumentActions.GetElementById<HTMLInputElement>("txtLocationDes");
        //txtLocationCode = DocumentActions.GetElementById<HTMLInputElement>("txtLocationCode");
        //btnLocationID = DocumentActions.GetElementById<HTMLButtonElement>("btnLocationID");
        txtScopeCalID = DocumentActions.GetElementById("txtScopeCalID");
        txtScopeCalCod = DocumentActions.GetElementById("txtScopeCalCod");
        txtScopeCalDes = DocumentActions.GetElementById("txtScopeCalDes");
        btnScopeCalID = DocumentActions.GetElementById("btnScopeCalID");
        txtScopeID = DocumentActions.GetElementById("txtScopeID");
        txtScopeCode = DocumentActions.GetElementById("txtScopeCode");
        txtScopeDes = DocumentActions.GetElementById("txtScopeDes");
        butScopeID = DocumentActions.GetElementById("butScopeID");
        //---------- redeo---------
        RedProject = DocumentActions.GetElementById("RedProject");
        RedPhase = DocumentActions.GetElementById("RedPhase");
        RedAllProject = DocumentActions.GetElementById("RedAllProject");
        RedNonRepair = DocumentActions.GetElementById("RedNonRepair");
        RedRepair = DocumentActions.GetElementById("RedRepair");
        RedNew = DocumentActions.GetElementById("RedNew");
        Redworking = DocumentActions.GetElementById("Redworking");
        RedHold = DocumentActions.GetElementById("RedHold");
        RedSuspended = DocumentActions.GetElementById("RedSuspended");
        Redfinish = DocumentActions.GetElementById("Redfinish");
        RedAll = DocumentActions.GetElementById("RedAll");
        ExcludeZero = DocumentActions.GetElementById("ExcludeZero");
        RedAllSuCont = DocumentActions.GetElementById("RedAllSuCont");
        //--------------
    }
    function Clear() {
        txtFromProject.value = "";
        txtToProject.value = "";
        txtProjectEng.value = "";
        txtProjectEngCod.value = "";
        txtProjectEngDes.value = "";
        txtSel.value = "";
        txtSelCod.value = "";
        txtSalDesc.value = "";
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
        RedAllSuCont.checked = true;
    }
    function InitalizeEvents() {
        debugger;
        // btnBranch.onclick = btnBranch_onclick;
        btnProjectEng.onclick = btnProjectEng_onclick;
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
    function btnProjectEng_onclick() {
        sys.FindKey(Modules.RepProjectEvaluation, "btnProjectEng", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getProjectEngByid", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    if (result != null) {
                        txtProjectEng.value = result.SiteEngineerId.toString();
                        txtProjectEngCod.value = result.EngCode;
                        txtProjectEngDes.value = _ScreenLanguage == "ar" ? result.DescA : result.DescE;
                    }
                }
            });
        });
    }
    function btnCustClassID_onclick() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepProjectEvaluation, "btnCustClassID", "", function () {
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
        sys.FindKey(Modules.RepProjectEvaluation, "btnCustID", "", function () {
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
        sys.FindKey(Modules.RepProjectEvaluation, "btnScopeCatID", "" /* "CompCode = " + _CompCode*/, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getScopeCategory", ControllerName),
                data: { id: id },
                success: function (d) {
                    debugger;
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
        sys.FindKey(Modules.RepProjectEvaluation, "butScope_Code", "", function () {
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
        // RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.SiteEngineerId = Number(txtProjectEng.value);
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value.toString();
        RP.FromProjCode = txtFromProject.value;
        RP.ToProjCode = txtToProject.value;
        RP.scopeClassId = Number(txtScopeCalID.value);
        RP.ScopeID = Number(txtScopeID.value);
        RP.custClassID = Number(txtCustClass.value);
        RP.customerID = Number(txtCust.value);
        if ($("#RedAllSuCont").prop("checked") == true) {
            RP.ItemId = 0;
        }
        else if ($("#RedinternalWork").prop("checked") == true) {
            RP.ItemId = 1;
        }
        else if ($("#RedSubWork").prop("checked") == true) {
            RP.ItemId = 2;
        }
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
        //----
        if ($("#RedNonRepair").prop("checked") == true) {
            RP.ISRepair = 0;
        }
        else if ($("#RedRepair").prop("checked") == true) {
            RP.ISRepair = 1;
        }
        else if ($("#RedAllProject").prop("checked") == true) {
            RP.ISRepair = 3;
        }
        //-----
        if ($("#ExcludeZero").prop("checked") == true) {
            RP.IsExecludeZero = 1;
        }
        else {
            RP.IsExecludeZero = 0;
        }
        //----
        if (($("#RedPhase").prop("checked") == true)) {
            RP.TypeReport = 1;
            Ajax.CallAsync({
                url: Url.Action("P_repProjectEvaluation", "GeneralReports"),
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
                url: Url.Action("P_repProjectEvaluation", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
    }
})(ProjectEvaluation || (ProjectEvaluation = {}));
//# sourceMappingURL=ProjectEvaluation.js.map