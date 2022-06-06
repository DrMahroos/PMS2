$(document).ready(function () {
    SalesComparison.InitalizeComponent();
});
var SalesComparison;
(function (SalesComparison) {
    var sys = new SystemTools();
    var ControllerName = "SalesComparison";
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
    //var txtScopeCalID: HTMLInputElement;
    //var txtScopeCalCod: HTMLInputElement;
    //var txtScopeCalDes: HTMLInputElement;
    //var btnScopeCalID: HTMLButtonElement;
    //var txtScopeID: HTMLInputElement;
    //var txtScopeCode: HTMLInputElement;
    //var txtScopeDes: HTMLInputElement;
    //var butScopeID: HTMLButtonElement;
    //var RedContractPrice: HTMLInputElement;
    //var RedProductionValue: HTMLInputElement;
    //var RedAllProject: HTMLInputElement;
    //var RedNewProjects: HTMLInputElement;
    //var RedAdditionalWork: HTMLInputElement;
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
    SalesComparison.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        //---------- textID---------
        txtRegionID = DocumentActions.GetElementById("txtRegionID");
        txtRegionDes = DocumentActions.GetElementById("txtRegionDes");
        //txtRegionCode = DocumentActions.GetElementById<HTMLInputElement>("txtRegionCode");
        btnRegionID = DocumentActions.GetElementById("btnRegionID");
        txtCustClass = DocumentActions.GetElementById("txtCustClass");
        txtCustClassCod = DocumentActions.GetElementById("txtCustClassCod");
        txtCustClassDes = DocumentActions.GetElementById("txtCustClassDes");
        btnCustClassID = DocumentActions.GetElementById("btnCustClassID");
        txtyer = DocumentActions.GetElementById("txtyer");
        //txtScopeCalID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCalID");
        //txtScopeCalCod = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCalCod");
        //txtScopeCalDes = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCalDes");
        //btnScopeCalID = DocumentActions.GetElementById<HTMLButtonElement>("btnScopeCalID");
        //txtScopeID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeID");
        //txtScopeCode = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCode");
        //txtScopeDes = DocumentActions.GetElementById<HTMLInputElement>("txtScopeDes");
        //butScopeID = DocumentActions.GetElementById<HTMLButtonElement>("butScopeID");
        ////---------- redeo---------
        //RedContractPrice = DocumentActions.GetElementById<HTMLInputElement>("RedContractPrice");
        //RedProductionValue = DocumentActions.GetElementById<HTMLInputElement>("RedProductionValue");
        //RedAllProject = DocumentActions.GetElementById<HTMLInputElement>("RedAllProject");
        //--------------
        txtyer.value = SharedSession.CurrentEnvironment.CurrentYear.toString();
    }
    function Clear() {
        txtyer.value = SharedSession.CurrentEnvironment.CurrentYear.toString();
        txtCustClass.value = "";
        txtCustClassCod.value = "";
        txtCustClassDes.value = "";
        txtRegionID.value = "";
        txtRegionDes.value = "";
        //txtScopeCalID.value = "";
        //txtScopeCalCod.value = "";
        //txtScopeCalDes.value = "";
        //txtScopeID.value = "";
        //txtScopeCode.value = "";
        //txtScopeDes.value = "";
    }
    function InitalizeEvents() {
        btnCustClassID.onclick = btnCustClassID_onclick;
        //butScopeID.onclick = butScopeID_onclick;
        //btnScopeCalID.onclick = btnScopeCatID_onclick;
        btnRegionID.onclick = btnRegionID_onclick;
    }
    function btnRegionID_onclick() {
        debugger;
        sys.FindKey(Modules.SalesComparison, "btnRegionID", "COMP_CODE = " + _CompCode, function () {
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
        sys.FindKey(Modules.SalesComparison, "btnCustClassID", "", function () {
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
    //function btnScopeCatID_onclick() {
    //    sys.FindKey(Modules.SalesComparison, "btnScopeCatID", ""/* "CompCode = " + _CompCode*/, () => {
    //        let id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("getScopeCategory", ControllerName),
    //            data: { id: id },
    //            success: (d) => {
    //                categ = d.result as P_D_ScopeCategory;
    //                // if (categ != null) {
    //                txtScopeCalID.value = categ.ScopeCategoryID.toString();
    //                txtScopeCalCod.value = categ.ScopeCategCode.toString();
    //                txtScopeCalDes.value = _ScreenLanguage == "en" ? categ.DescE : categ.DescA;
    //                //}
    //            }
    //        });
    //    })
    //}
    //function butScopeID_onclick() {
    //    sys.FindKey(Modules.SalesComparison, "butScopeID", "", () => {
    //        let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("GetEngSubContractorScope", ControllerName),
    //            data: { id: _Id },
    //            success: (d) => {
    //                let result = d.result as PQ_GetEngSubContractorScope;
    //                txtScopeID.value = result.ScopeId.toString();
    //                txtScopeCode.value = result.ScopeCode.toString();
    //                txtScopeDes.value = _ScreenLanguage == "en" ? result.DescE : result.DescA;
    //            }
    //        });
    //    })
    //}
    function Print() {
        debugger;
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.yearID = Number(txtyer.value);
        RP.REGION_CODE = Number(txtRegionID.value);
        RP.custClassID = Number(txtCustClass.value);
        Ajax.CallAsync({
            url: Url.Action("DSS_SalesBranch", "GeneralReports"),
            data: RP,
            success: function (d) {
                debugger;
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
})(SalesComparison || (SalesComparison = {}));
//# sourceMappingURL=SalesComparison.js.map