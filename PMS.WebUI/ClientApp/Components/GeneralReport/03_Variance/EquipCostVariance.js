$(document).ready(function () {
    EquipCostVariance.InitalizeComponent();
});
var EquipCostVariance;
(function (EquipCostVariance) {
    var sys = new SystemTools();
    var ControllerName = "EquipCostVariance";
    var categ = new P_D_ScopeCategory();
    var Model = new P_D_Location();
    var FromDate;
    var ToDate;
    //---
    var txtFromProject;
    var txtToProject;
    //--
    //var txtArea: HTMLInputElement;
    //var txtAreaCod: HTMLInputElement;
    //var txtAreaDes: HTMLInputElement;
    //var btnArea: HTMLButtonElement;
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
    //--
    var txtScopeCalID;
    var txtScopeCalCod;
    var txtScopeCalDes;
    var btnScopeCalID;
    var txtScopeID;
    var txtScopeCode;
    var txtScopeDes;
    var butScopeID;
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
    var IsExecludeZero;
    var _CompCode;
    var _BranchCode;
    var btnPrint;
    var _ScreenLanguage;
    var Condition;
    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
    function InitalizeComponent() {
        debugger;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        //getbranchname();
    }
    EquipCostVariance.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //---------- textID---------
        debugger;
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtFromProject = DocumentActions.GetElementById("txtfromproject");
        txtToProject = DocumentActions.GetElementById("txttoproject");
        //txtArea = DocumentActions.GetElementById<HTMLInputElement>("txtArea");
        //txtAreaCod = DocumentActions.GetElementById<HTMLInputElement>("txtAreaCod");
        //txtAreaDes = DocumentActions.GetElementById<HTMLInputElement>("txtAreaDes");
        //btnArea = DocumentActions.GetElementById<HTMLButtonElement>("btnArea"); 
        txtProjectEng = DocumentActions.GetElementById("txtProjectEng");
        txtProjectEngCod = DocumentActions.GetElementById("txtProjectEngCod");
        txtProjectEngDes = DocumentActions.GetElementById("txtProjectEngDes");
        btnProjectEng = DocumentActions.GetElementById("btnProjectEng");
        //txtSel = DocumentActions.GetElementById<HTMLInputElement>("txtSel");
        //txtSelCod = DocumentActions.GetElementById<HTMLInputElement>("txtSelCod");
        //txtSalDesc = DocumentActions.GetElementById<HTMLInputElement>("txtSalDesc");
        //btnSalesID = DocumentActions.GetElementById<HTMLButtonElement>("btnSalesID");
        txtCustClass = DocumentActions.GetElementById("txtCustClass");
        txtCustClassCod = DocumentActions.GetElementById("txtCustClassCod");
        txtCustClassDes = DocumentActions.GetElementById("txtCustClassDes");
        btnCustClassID = DocumentActions.GetElementById("btnCustClassID");
        txtCust = DocumentActions.GetElementById("txtCust");
        txtCustCod = DocumentActions.GetElementById("txtCustCod");
        txtCustDes = DocumentActions.GetElementById("txtCustDes");
        btnCustID = DocumentActions.GetElementById("btnCustID");
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
        RedNew = DocumentActions.GetElementById("RedNew");
        Redworking = DocumentActions.GetElementById("Redworking");
        RedHold = DocumentActions.GetElementById("RedHold");
        RedSuspended = DocumentActions.GetElementById("RedSuspended");
        Redfinish = DocumentActions.GetElementById("Redfinish");
        RedAll = DocumentActions.GetElementById("RedAll");
        IsExecludeZero = DocumentActions.GetElementById("IsExecludeZero");
        //--------------
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtFromProject.value = "1";
        txtToProject.value = "999999";
        RedAll.checked = true;
        RedPhase.checked = true;
        IsExecludeZero.checked = true;
        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
    }
    function Clear() {
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtFromProject.value = "1";
        txtToProject.value = "999999";
        RedAll.checked = true;
        RedPhase.checked = true;
        IsExecludeZero.checked = true;
        txtProjectEng.value = "";
        txtProjectEngCod.value = "";
        txtProjectEngDes.value = "";
        //txtSel.value = "";
        //txtSelCod.value = "";
        //txtSalDesc.value = "";
        txtCustClass.value = "";
        txtCustClassCod.value = "";
        txtCustClassDes.value = "";
        txtCust.value = "";
        txtCustCod.value = "";
        txtCustDes.value = "";
        txtScopeCalID.value = "";
        txtScopeCalCod.value = "";
        txtScopeCalDes.value = "";
        txtScopeID.value = "";
        txtScopeCode.value = "";
        txtScopeDes.value = "";
    }
    function InitalizeEvents() {
        debugger;
        //btnArea.onclick = btnArea_onclick;
        btnProjectEng.onclick = btnProjectEng_onclick;
        //btnSalesID.onclick = btnSalesID_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;
        btnCustID.onclick = btnCustID_onclick;
        butScopeID.onclick = butScope_onclick;
        btnScopeCalID.onclick = btnScopeCatID_onclick;
        //btnPrint.onclick = Print;
    }
    //function btnArea_onclick() {
    //    sys.FindKey(Modules.RepEquipCostVariance, "btnArea", "", () => {
    //        let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("GetBranchByID", "BudgetRequirements"),
    //            data: { id: _Id },
    //            success: (d) => {
    //                let result = d.result as G_BRANCH;
    //                txtArea.value = result.BRA_CODE.toString();
    //                txtAreaDes.value = _ScreenLanguage == "ar" ? result.BRA_DESC : result.BRA_DESCE; 2
    //            }
    //        });
    //    })
    //}
    function btnProjectEng_onclick() {
        sys.FindKey(Modules.RepEquipCostVariance, "btnProjectEng", Condition, function () {
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
    //function btnSalesID_onclick() {
    //    sys.FindKey(Modules.RepEquipCostVariance, "btnSalesID", Condition, () => {
    //        let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        debugger
    //        Ajax.CallAsync({
    //            url: Url.Action("GetSalesCodeByID", ControllerName),
    //            data: { id: _Id },
    //            success: (d) => {
    //                let _result = d.result as P_D_SalesEgineer;
    //                txtSel.value = _result.SalesEngineerId.toString();
    //                txtSelCod.value = _result.EngCode.toString();
    //                txtSalDesc.value = _ScreenLanguage == "en" ? _result.DescE : _result.DeacA;;
    //            }
    //        });
    //    })
    //}
    function btnCustClassID_onclick() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepEquipCostVariance, "btnCustClassID", "", function () {
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
        sys.FindKey(Modules.RepEquipCostVariance, "btnCustID", "", function () {
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
        sys.FindKey(Modules.RepEquipCostVariance, "btnScopeCatID", "" /* "CompCode = " + _CompCode*/, function () {
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
        sys.FindKey(Modules.RepEquipCostVariance, "butScope_Code", "", function () {
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
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
        RP.FromProjCode = txtFromProject.value;
        RP.ToProjCode = txtToProject.value;
        RP.SiteEngineerId = Number(txtProjectEng.value);
        RP.ScopeCategoryID = Number(txtScopeCalID.value);
        RP.ScopeID = Number(txtScopeID.value);
        RP.CatID = Number(txtCustClass.value);
        RP.Custid = Number(txtCust.value);
        if (($("#RedNew").prop("checked") == true)) {
            RP.Stat = 0;
        }
        else if (($("#Redworking").prop("checked") == true)) {
            RP.Stat = 1;
        }
        else if (($("#RedHold").prop("checked") == true)) {
            RP.Stat = 2;
        }
        else if (($("#RedSuspended").prop("checked") == true)) {
            RP.Stat = 3;
        }
        else if (($("#Redfinish").prop("checked") == true)) {
            RP.Stat = 5;
        }
        else if (($("#RedAll").prop("checked") == true)) {
            RP.Stat = 6;
        }
        if ($("#IsExecludeZero").prop("checked") == true) {
            RP.IsExecludeZero = 1;
        }
        else {
            RP.IsExecludeZero = 0;
        }
        if (($("#RedProject").prop("checked") == true)) {
            RP.TypeReport = 1;
            Ajax.CallAsync({
                url: Url.Action("repEquipmentVariance", "GeneralReports"),
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
                url: Url.Action("repEquipmentVariance", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
    }
})(EquipCostVariance || (EquipCostVariance = {}));
//# sourceMappingURL=EquipCostVariance.js.map