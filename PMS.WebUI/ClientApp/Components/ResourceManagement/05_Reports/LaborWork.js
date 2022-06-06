$(document).ready(function () {
    LaborWork.InitalizeComponent();
});
var LaborWork;
(function (LaborWork) {
    var sys = new SystemTools();
    var ControllerName = "LaborWork";
    var FromDate;
    var ToDate;
    var txtFromProjectRP;
    var txtToProjectRP;
    var txtProjectEngineerID;
    var txtProjectEngineerRP;
    var btnProjectEngineerRP;
    var txtProjectEngineer1RP;
    var txtAreaID;
    var txtAreaRP;
    var btnAreaRP;
    var txtArea1RP;
    var txtScopeCatID;
    var txtScopeCatRP;
    var btnScopeCatRP;
    var txtScopeCat1RP;
    var txtScopeID;
    var txtScopeRP;
    var btnScopeRP;
    var txtScope1RP;
    var txtLaborClassID;
    var txtLaborClassRP;
    var btnLaborClassRP;
    var txtLaborClass1RP;
    var txtLaborCategoryID;
    var txtLaborCategoryRP;
    var btnLaborCategoryRP;
    var txtLaborCategory1RP;
    var txtFromLaborRP;
    var txtToLaborRP;
    var _ScreenLanguage;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();
    }
    LaborWork.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtFromProjectRP = DocumentActions.GetElementById("txtFromProjectRP");
        txtToProjectRP = DocumentActions.GetElementById("txtToProjectRP");
        txtProjectEngineerID = DocumentActions.GetElementById("txtProjectEngineerID");
        txtProjectEngineerRP = DocumentActions.GetElementById("txtProjectEngineerRP");
        btnProjectEngineerRP = DocumentActions.GetElementById("btnProjectEngineerRP");
        txtProjectEngineer1RP = DocumentActions.GetElementById("txtProjectEngineer1RP");
        txtAreaID = DocumentActions.GetElementById("txtAreaID");
        txtAreaRP = DocumentActions.GetElementById("txtAreaRP");
        btnAreaRP = DocumentActions.GetElementById("btnAreaRP");
        txtArea1RP = DocumentActions.GetElementById("txtArea1RP");
        txtScopeCatID = DocumentActions.GetElementById("txtScopeCatID");
        txtScopeCatRP = DocumentActions.GetElementById("txtScopeCatRP");
        btnScopeCatRP = DocumentActions.GetElementById("btnScopeCatRP");
        txtScopeCat1RP = DocumentActions.GetElementById("txtScopeCat1RP");
        txtScopeID = DocumentActions.GetElementById("txtScopeID");
        txtScopeRP = DocumentActions.GetElementById("txtScopeRP");
        btnScopeRP = DocumentActions.GetElementById("btnScopeRP");
        txtScope1RP = DocumentActions.GetElementById("txtScope1RP");
        txtLaborClassID = DocumentActions.GetElementById("txtLaborClassID");
        txtLaborClassRP = DocumentActions.GetElementById("txtLaborClassRP");
        btnLaborClassRP = DocumentActions.GetElementById("btnLaborClassRP");
        txtLaborClass1RP = DocumentActions.GetElementById("txtLaborClass1RP");
        txtLaborCategoryID = DocumentActions.GetElementById("txtLaborCategoryID");
        txtLaborCategoryRP = DocumentActions.GetElementById("txtLaborCategoryRP");
        btnLaborCategoryRP = DocumentActions.GetElementById("btnLaborCategoryRP");
        txtLaborCategory1RP = DocumentActions.GetElementById("txtLaborCategory1RP");
        txtFromLaborRP = DocumentActions.GetElementById("txtFromLaborRP");
        txtToLaborRP = DocumentActions.GetElementById("txtToLaborRP");
    }
    function Clear() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtFromProjectRP.value = "";
        txtToProjectRP.value = "";
        txtProjectEngineerID.value = "";
        txtProjectEngineerRP.value = "";
        txtProjectEngineer1RP.value = "";
        txtAreaID.value = "";
        txtAreaRP.value = "";
        txtArea1RP.value = "";
        txtScopeCatID.value = "";
        txtScopeCatRP.value = "";
        txtScopeCat1RP.value = "";
        txtScopeID.value = "";
        txtScopeRP.value = "";
        txtScope1RP.value = "";
        txtLaborClassID.value = "";
        txtLaborClassRP.value = "";
        txtLaborClass1RP.value = "";
        txtLaborCategoryID.value = "";
        txtLaborCategoryRP.value = "";
        txtLaborCategory1RP.value = "";
        //txtFromLaborID.value = "";
        txtFromLaborRP.value = "";
        txtToLaborRP.value = "";
    }
    function Print() {
        debugger;
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        RP.FromProjCode = (txtFromProjectRP.value);
        RP.ToProjCode = (txtToProjectRP.value);
        RP.EngID = Number(txtProjectEngineerID.value);
        RP.scopeClassId = Number(txtScopeCatID.value);
        RP.ScopeID = Number(txtScopeID.value);
        RP.LabClassID = Number(txtLaborClassID.value);
        RP.LabCatID = Number(txtLaborCategoryID.value);
        RP.FromLabCode = (txtFromLaborRP.value);
        RP.ToLabCode = (txtToLaborRP.value);
        if (DateFormat(FromDate.value) == "NaN-NaN-NaN" || DateFormat(ToDate.value) == "NaN-NaN-NaN") {
            MessageBox.Show(" you must select Date", "Info");
            return;
        }
        else if (DateFormat(FromDate.value) > DateFormat(ToDate.value)) {
            MessageBox.Show(" From date  is largethan To Date", "Info");
            return;
        }
        else {
            if ($("#radio_Labourwork").prop("checked")) {
                RP.TypeReport = 1;
                Ajax.CallAsync({
                    url: Url.Action("rptRes_LaborWork_print", "GeneralReports"),
                    data: RP,
                    success: function (d) {
                        debugger;
                        var result = d.result;
                        window.open(result, "_blank");
                    }
                });
            }
            if ($("#radio_LabourBounus").prop("checked")) {
                RP.TypeReport = 2;
                Ajax.CallAsync({
                    url: Url.Action("rptRes_LaborWork_print", "GeneralReports"),
                    data: RP,
                    success: function (d) {
                        debugger;
                        var result = d.result;
                        window.open(result, "_blank");
                    }
                });
            }
        }
    }
    function InitalizeEvents() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        $("#radio_Labourwork").prop("checked", "checked");
        btnProjectEngineerRP.onclick = btnProjectEngineerRP_Click;
        // btnAreaRP.onclick = btnAreaRP_Click;
        btnScopeCatRP.onclick = btnScopeCatRP_Click;
        btnScopeRP.onclick = btnScopeRP_Click;
        btnLaborClassRP.onclick = btnLaborClassRP_Click;
        btnLaborCategoryRP.onclick = btnLaborCategoryRP_Click;
    }
    function btnProjectEngineerRP_Click() {
        debugger;
        sys.FindKey(Modules.LateandAbsence, "butEng_Code", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProjectEng", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtProjectEngineerID.value = result.SiteEngineerId.toString();
                    txtProjectEngineerRP.value = result.EngCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtProjectEngineer1RP.value = result.DescA;
                    }
                    else {
                        txtProjectEngineer1RP.value = result.DescE;
                    }
                }
            });
        });
    }
    //function btnAreaRP_Click() {
    //    debugger;
    //    sys.FindKey(Modules.LaborWork, "btnAreaRP", "", () => {
    //        debugger;
    //        let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("GetArea", ControllerName),
    //            data: { id: _Id },
    //            success: (d) => {
    //                let result = d.result as G_BRANCH;
    //                txtAreaID.value = result.BRA_CODE.toString();
    //                txtAreaRP.value = result.BRA_CODE.toString();
    //                if (_ScreenLanguage == "ar") {
    //                    txtArea1RP.value = result.BRA_DESCL.toString();
    //                }
    //                else {
    //                    txtArea1RP.value = result.BRA_DESCE.toString();
    //                }
    //            }
    //        });
    //    })
    //}
    function btnScopeCatRP_Click() {
        debugger;
        sys.FindKey(Modules.LaborWork, "btnScopeCatRP", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSearchScopCat", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    debugger;
                    var result = d.result;
                    txtScopeCatID.value = result.ScopeCategoryID.toString();
                    txtScopeCatRP.value = result.ScopeCategCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtScopeCat1RP.value = result.DescA;
                    }
                    else {
                        txtScopeCat1RP.value = result.DescE;
                    }
                }
            });
        });
    }
    function btnScopeRP_Click() {
        debugger;
        sys.FindKey(Modules.LaborWork, "btnScopeRP", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetScope", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtScopeID.value = result.ScopeID.toString();
                    txtScopeRP.value = result.ScopeCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtScope1RP.value = result.DescA.toString();
                    }
                    else {
                        txtScope1RP.value = result.DescE.toString();
                    }
                }
            });
        });
    }
    function btnLaborClassRP_Click() {
        debugger;
        sys.FindKey(Modules.LaborAssign, "btnSearchClass", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLaborClass", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtLaborClassID.value = result.LaborClassId.toString();
                    txtLaborClassRP.value = result.ClassCode.toString();
                    if (_ScreenLanguage == "ar") {
                        debugger;
                        txtLaborClass1RP.value = result.DescA;
                    }
                    else {
                        debugger;
                        txtLaborClass1RP.value = result.DescE;
                    }
                }
            });
        });
    }
    function btnLaborCategoryRP_Click() {
        debugger;
        sys.FindKey(Modules.LaborMonitoring, "butCategCode", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchLaborCategory", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtLaborCategoryID.value = result.LaborCategoryId.toString();
                    txtLaborCategoryRP.value = result.CategCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtLaborCategory1RP.value = result.DescA;
                    }
                    else {
                        txtLaborCategory1RP.value = result.DescE;
                    }
                }
            });
        });
    }
})(LaborWork || (LaborWork = {}));
//# sourceMappingURL=LaborWork.js.map