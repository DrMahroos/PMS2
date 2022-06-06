$(document).ready(function () {
    LaborSchedule.InitalizeComponent();
});
var LaborSchedule;
(function (LaborSchedule) {
    var sys = new SystemTools();
    var ControllerName = "LaborSchedule";
    var FromDate;
    var ToDate;
    var txtFromProjectRP;
    var txtToProjectRP;
    var txtProjID;
    var txtProjCode;
    var btnProjCode;
    var txtProjDesc;
    var txtProjectEngineerID;
    var txtProjectEngineerRP;
    var btnProjectEngineerRP;
    var txtProjectEngineer1RP;
    var txtSiteEngineerId;
    var txtSiteEngineer_Code;
    var butSiteEngineer_Code;
    var txtSiteEngineer_Desc;
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
    var _BranchCode;
    var Condition;
    var _CompCode;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        InitalizeControls();
        InitalizeEvents();
    }
    LaborSchedule.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtFromProjectRP = DocumentActions.GetElementById("txtFromProjectRP");
        txtToProjectRP = DocumentActions.GetElementById("txtToProjectRP");
        txtProjID = DocumentActions.GetElementById("txtProjID");
        txtProjCode = DocumentActions.GetElementById("txtProjCode");
        btnProjCode = DocumentActions.GetElementById("btnProjCode");
        txtProjDesc = DocumentActions.GetElementById("txtProjDesc");
        txtSiteEngineerId = DocumentActions.GetElementById("txtSiteEngineerId");
        txtSiteEngineer_Code = DocumentActions.GetElementById("txtSiteEngineer_Code");
        butSiteEngineer_Code = DocumentActions.GetElementById("butSiteEngineer_Code");
        txtSiteEngineer_Desc = DocumentActions.GetElementById("txtSiteEngineer_Desc");
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
    function InitalizeEvents() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        btnProjCode.onclick = btnProjCode_onclick;
        btnProjectEngineerRP.onclick = btnProjectEngineerRP_Click;
        //btnScopeCatRP.onclick = btnScopeCatRP_Click;
        // btnScopeRP.onclick = btnScopeRP_Click;
        btnLaborClassRP.onclick = btnLaborClassRP_Click;
        btnLaborCategoryRP.onclick = btnLaborCategoryRP_Click;
        //butSiteEngineer_Code.onclick = butSiteEngineer_Code_Click;
    }
    function btnProjCode_onclick() {
        debugger;
        sys.FindKey(Modules.LaborSchedule, "btnProjCode", Condition, function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjCodeByID", "ProjectExpenses"),
                data: { id: _Id },
                success: function (d) {
                    debugger;
                    var result = d.result;
                    txtProjID.value = result.ProjectID.toString();
                    txtProjCode.value = result.ProjectCode;
                    if (_ScreenLanguage == "ar") {
                        txtProjDesc.value = result.DescA;
                    }
                    else {
                        txtProjDesc.value = result.DescL;
                    }
                }
            });
        });
    }
    function btnProjectEngineerRP_Click() {
        debugger;
        sys.FindKey(Modules.LaborSchedule, "butEng_Code", Condition, function () {
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
    //function btnScopeCatRP_Click() {
    //    debugger;
    //    sys.FindKey(Modules.LaborSchedule, "btnScopeCatRP", "", () => {
    //        debugger;
    //        let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("GetSearchScopCat", ControllerName),
    //            data: { id: _Id },
    //            success: (d) => {
    //                debugger;
    //                let result = d.result as P_D_ScopeCategory;
    //                txtScopeCatID.value = result.ScopeCategoryID.toString();
    //                txtScopeCatRP.value = result.ScopeCategCode.toString();
    //                if (_ScreenLanguage == "ar") {
    //                    txtScopeCat1RP.value = result.DescA;
    //                }
    //                else {
    //                    txtScopeCat1RP.value = result.DescE;
    //                }
    //            }
    //        });
    //    })
    //}
    //function btnScopeRP_Click() {
    //    debugger;
    //    sys.FindKey(Modules.LaborSchedule, "btnScopeRP", "", () => {
    //        debugger;
    //        let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("GetScope", ControllerName),
    //            data: { id: _Id },
    //            success: (d) => {
    //                let result = d.result as P_D_Scope;
    //                txtScopeID.value = result.ScopeID.toString();
    //                txtScopeRP.value = result.ScopeCode.toString();
    //                if (_ScreenLanguage == "ar") {
    //                    txtScope1RP.value = result.DescA.toString();
    //                }
    //                else {
    //                    txtScope1RP.value = result.DescE.toString();
    //                }
    //            }
    //        });
    //    })
    //}     //function butSiteEngineer_Code_Click() {
    //    sys.FindKey(Modules.LaborMonitoring, "butSiteEngineer_Code", Condition , () => {
    //        let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("GetSiteEngineerByID", ControllerName),
    //            data: { id: _Id },
    //            success: (d) => {
    //                let SiteEng = d.result as P_D_SiteEngineer;
    //                txtSiteEngineerId.value = SiteEng.SiteEngineerId.toString();
    //                txtSiteEngineer_Code.value = SiteEng.EngCode.toString();
    //                if (ClientSharedWork.Session.ScreenLanguage == "ar") {
    //                    txtSiteEngineer_Desc.value = SiteEng.DescA;
    //                }
    //                else {
    //                    txtSiteEngineer_Desc.value = SiteEng.DescE;
    //                }
    //            }
    //        });
    //    })
    //}
    function btnLaborClassRP_Click() {
        debugger;
        sys.FindKey(Modules.LaborSchedule, "btnSearchClass", "", function () {
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
        sys.FindKey(Modules.LaborSchedule, "butCategCode", "", function () {
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
    function Print() {
        debugger;
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        RP.LabClassID = Number(txtLaborClassID.value);
        RP.LabCatID = Number(txtLaborCategoryID.value);
        RP.FromLabCode = (txtFromLaborRP.value);
        RP.ToLabCode = (txtToLaborRP.value);
        RP.ProjectID = Number(txtProjID.value);
        RP.EngID = Number(txtProjectEngineerID.value);
        //RP.SiteEngineerId = Number(txtSiteEngineerId);     
        // RP.FromProjCode = (txtFromProjectRP.value);
        // RP.ToProjCode = (txtToProjectRP.value);      
        //RP.scopeClassId = Number(txtScopeCatID.value);
        //RP.ScopeID = Number(txtScopeID.value);
        if (DateFormat(FromDate.value) == "NaN-NaN-NaN" || DateFormat(ToDate.value) == "NaN-NaN-NaN") {
            MessageBox.Show(" you must select Date", "Info");
            return;
        }
        else if (DateFormat(FromDate.value) > DateFormat(ToDate.value)) {
            MessageBox.Show(" From date  is largethan To Date", "Info");
            return;
        }
        else {
            Ajax.CallAsync({
                url: Url.Action("LabourMovementByProject", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
    }
})(LaborSchedule || (LaborSchedule = {}));
//# sourceMappingURL=LaborSchedule.js.map