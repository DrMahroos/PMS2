$(document).ready(function () {
    ProjectCost.InitalizeComponent();
});
var ProjectCost;
(function (ProjectCost) {
    var sys = new SystemTools();
    var ControllerName = "ProjectCost";
    var categ = new P_D_ScopeCategory();
    var Model = new P_D_Location();
    var FromDate;
    var ToDate;
    //---
    var txtFromProject;
    var txtToProject;
    //--
    var txtsiteEng;
    var txtsiteEngCod;
    var txtsiteEngDes;
    var btnsiteEng;
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
    //var txtArea: HTMLInputElement;
    //var txtAreaCod: HTMLInputElement;
    //var txtAreaDes: HTMLInputElement;
    //var btnArea: HTMLButtonElement;
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
    var IsExecludeZero;
    var RedNew;
    var Redworking;
    var RedHold;
    var RedSuspended;
    var Redfinish;
    var RedAll;
    var _CompCode;
    var _BranchCode;
    var _Condition;
    var btnPrint;
    var _ScreenLanguage;
    _CompCode = SharedSession.CurrentEnvironment.CompCode;
    _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
    _Condition = "COMPCODE = " + _CompCode + " and BraCode  = " + _BranchCode;
    function InitalizeComponent() {
        debugger;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        //getbranchname();
    }
    ProjectCost.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //---------- textID---------
        txtFromProject = DocumentActions.GetElementById("txtFromProject");
        txtToProject = DocumentActions.GetElementById("txtToProject");
        txtsiteEng = DocumentActions.GetElementById("txtsiteEng");
        txtsiteEngCod = DocumentActions.GetElementById("txtsiteEngCod");
        txtsiteEngDes = DocumentActions.GetElementById("txtsiteEngDes");
        btnsiteEng = DocumentActions.GetElementById("btnsiteEng");
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
        //txtArea = DocumentActions.GetElementById<HTMLInputElement>("txtArea");
        //txtAreaCod = DocumentActions.GetElementById<HTMLInputElement>("txtAreaCod");
        //txtAreaDes = DocumentActions.GetElementById<HTMLInputElement>("txtAreaDes");
        //btnArea = DocumentActions.GetElementById<HTMLButtonElement>("btnArea");
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
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtFromProject.value = "1";
        txtToProject.value = "999999";
        IsExecludeZero.checked = true;
        RedAll.checked = true;
        RedPhase.checked = true;
    }
    function Clear() {
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        debugger;
        txtFromProject.value = "1";
        txtToProject.value = "999999";
        IsExecludeZero.checked = true;
        RedAll.checked = true;
        RedPhase.checked = true;
        txtsiteEng.value = "";
        txtsiteEngCod.value = "";
        txtsiteEngDes.value = "";
        //txtSel.value = "";
        //txtSelCod.value = "";
        //txtSalDesc.value = "";
        txtCustClass.value = "";
        txtCustClassCod.value = "";
        txtCustClassDes.value = "";
        txtCust.value = "";
        txtCustCod.value = "";
        txtCustDes.value = "";
        //txtArea.value = "";
        //txtAreaCod.value = "";
        //txtAreaDes.value = "";
        txtScopeCalID.value = "";
        txtScopeCalCod.value = "";
        txtScopeCalDes.value = "";
        txtScopeID.value = "";
        txtScopeCode.value = "";
        txtScopeDes.value = "";
    }
    function InitalizeEvents() {
        debugger;
        btnsiteEng.onclick = btnsiteEng_onclick;
        //btnSalesID.onclick = btnSalesID_onclick;
        btnCustClassID.onclick = btnCustClassID_onclick;
        btnCustID.onclick = btnCustID_onclick;
        butScopeID.onclick = butScope_onclick;
        btnScopeCalID.onclick = btnScopeCatID_onclick;
        //btnArea.onclick = btnArea_onclick;
        //btnPrint.onclick = Print;
    }
    //function btnArea_onclick() {
    //    sys.FindKey(Modules.RepProjectCost, "btnArea", _Condition, () => {
    //        let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("GetLocationByID", ControllerName),
    //            data: { id: _Id },
    //            success: (d) => {
    //                let result = d.result as P_D_Location;
    //                txtAreaCod.value = result.LocCode.toString();
    //                txtAreaDes.value = _ScreenLanguage == "ar" ? result.DescA : result.DescE; 
    //            }
    //        });
    //    })
    //}
    function btnsiteEng_onclick() {
        debugger;
        sys.FindKey(Modules.RepProjectCost, "btnsiteEng", _Condition, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getsiteEngByid", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    if (result != null) {
                        txtsiteEng.value = result.SiteEngineerId.toString();
                        txtsiteEngCod.value = result.EngCode;
                        txtsiteEngDes.value = _ScreenLanguage == "ar" ? result.DescA : result.DescE;
                    }
                }
            });
        });
    }
    function btnCustClassID_onclick() {
        var Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.RepProjectCost, "btnCustClassID", "", function () {
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
        sys.FindKey(Modules.RepProjectCost, "btnCustID", "", function () {
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
        sys.FindKey(Modules.RepProjectCost, "btnScopeCatID", "" /* "CompCode = " + _CompCode*/, function () {
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
        sys.FindKey(Modules.RepProjectCost, "butScope_Code", "", function () {
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
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
        RP.FromProjCode = txtFromProject.value;
        RP.ToProjCode = txtToProject.value;
        RP.SiteEngineerId = Number(txtsiteEng.value);
        RP.custClassID = Number(txtCustClass.value);
        RP.customerID = Number(txtCust.value);
        RP.scopeClassId = Number(txtScopeCalID.value);
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
        if ($("#IsExecludeZero").prop("checked") == true) {
            RP.IsExecludeZero = 1;
        }
        else {
            RP.IsExecludeZero = 0;
        }
        if ($("#RedPhase").prop("checked") == true) {
            RP.TypeReport = 1;
            Ajax.CallAsync({
                url: Url.Action("P_rep_ProjectCost", "GeneralReports"),
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
                url: Url.Action("P_rep_ProjectCost", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
    }
})(ProjectCost || (ProjectCost = {}));
//# sourceMappingURL=ProjectCost.js.map