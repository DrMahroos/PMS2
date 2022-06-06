$(document).ready(function () {
    Scope.InitalizeComponent();
});
var Scope;
(function (Scope) {
    var sys = new SystemTools();
    var ControllerName = "Scope";
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
    var txtScopeID;
    var txtScopeCode;
    var txtScopeDes;
    var butScopeID;
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
    Scope.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //---------- textID---------
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
        txtScopeID = DocumentActions.GetElementById("txtScopeID");
        txtScopeCode = DocumentActions.GetElementById("txtScopeCode");
        txtScopeDes = DocumentActions.GetElementById("txtScopeDes");
        butScopeID = DocumentActions.GetElementById("butScopeID");
        //---------- redeo---------
        RedAllProject = DocumentActions.GetElementById("RedAllProject");
        RedNonRepair = DocumentActions.GetElementById("RedNonRepair");
        RedRepair = DocumentActions.GetElementById("RedRepair");
        RedByBranch = DocumentActions.GetElementById("RedByBranch");
        RedByScope = DocumentActions.GetElementById("RedByScope");
        //--------------
    }
    function Clear() {
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
        debugger;
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
                    debugger;
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
    //var txtVendorID: HTMLInputElement;
    //var txtVendorCod: HTMLInputElement;
    //var btnVendorID: HTMLButtonElement;
    //var txtVendorDes: HTMLInputElement;
    //--
    //txtVendorID= DocumentActions.GetElementById<HTMLButtonElement>(" txtVendorID:");
    //txtVendorCod= DocumentActions.GetElementById<HTMLInputElement>(" txtVendorCod");
    //txtVendorDes = DocumentActions.GetElementById<HTMLInputElement>("txtVendorDes");
    //btnVendorID = DocumentActions.GetElementById<HTMLInputElement>(" btnVendorID:");
    //function btnVendorID_onclick() {
    //    
    //    sys.FindKey(Modules.ByCustomerClass, "btnBranch", "", () => {
    //        
    //        let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("GetVendorByID", ControllerName),
    //            data: { id: _Id },
    //            success: (d) => {
    //                
    //                let result = d.result as I_Pay_Vendor;
    //                txtVendorID.value = result.VendorID.toString();
    //                txtVendorCod.value = result.VendorCode;
    //                txtVendorDes.value = result.VendorCode; /*_ScreenLanguage == "ar" ? result.BRA_DESC : result.BRA_DESCE; 2*/
    //            }
    //        });
    //    })
    //}
    function Print() {
        debugger;
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = "";
        RP.FromDate = FromDate.value;
        RP.ToDate = ToDate.value;
        RP.REGION_CODE = Number(txtRegionID.value);
        RP.ScopeCategoryID = Number(txtScopeCalID.value);
        RP.ScopeID = Number(txtScopeID.value);
        if ($("#     RedNonRepair").prop("checked") == true) {
            RP.ISRepair = 0;
        }
        else if ($("#RedRepair").prop("checked") == true) {
            RP.ISRepair = 1;
        }
        else if ($("#RedAllProject").prop("checked") == true) {
            RP.ISRepair = null;
        }
        if (RedByBranch.checked)
            RP.GroupType = 1;
        else
            RP.GroupType = 2;
        Ajax.CallAsync({
            url: Url.Action("Rep_DSS_CollectiveWorkBYScope", "GeneralReports"),
            data: RP,
            success: function (d) {
                debugger;
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(Scope || (Scope = {}));
//# sourceMappingURL=Scope.js.map