$(document).ready(function () {
    Equipmentwork.InitalizeComponent();
});
var Equipmentwork;
(function (Equipmentwork) {
    var sys = new SystemTools();
    var ControllerName = "Equipmentwork";
    var FromDate;
    var ToDate;
    var txtFromProjectRP;
    var txtToProjectRP;
    var txtEquipClassID;
    var txtEquipClassRP;
    var btnEquipClassRP;
    var txtEquipClass1RP;
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
    Equipmentwork.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        FromDate = DocumentActions.GetElementById("FromDate");
        ToDate = DocumentActions.GetElementById("ToDate");
        txtEquipClassID = DocumentActions.GetElementById("txtEquipClassID");
        txtEquipClassRP = DocumentActions.GetElementById("txtEquipClassRP");
        btnEquipClassRP = DocumentActions.GetElementById("btnEquipClassRP");
        txtEquipClass1RP = DocumentActions.GetElementById("txtEquipClass1RP");
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
        txtFromLaborRP = DocumentActions.GetElementById("txtFromLaborRP");
        txtToLaborRP = DocumentActions.GetElementById("txtToLaborRP");
    }
    function Clear() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtEquipClassID.value = "";
        txtEquipClassRP.value = "";
        txtEquipClass1RP.value = "";
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
        //txtFromLaborID.value = "";
        txtFromLaborRP.value = "";
        txtToLaborRP.value = "";
    }
    function Print() {
        debugger;
        var RP = new ReportParameters();
        if (DateFormat(FromDate.value) == "NaN-NaN-NaN" || DateFormat(ToDate.value) == "NaN-NaN-NaN") {
            MessageBox.Show(" you must select Date", "Info");
            return;
        }
        else if (DateFormat(FromDate.value) > DateFormat(ToDate.value)) {
            MessageBox.Show(" From date  is largethan To Date", "Info");
            return;
        }
        else {
            RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
            RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
            RP.FromDate = DateFormat(FromDate.value);
            RP.ToDate = DateFormat(ToDate.value);
            RP.FromProjCode = (txtFromProjectRP.value);
            RP.ToProjCode = (txtToProjectRP.value);
            RP.EngID = Number(txtProjectEngineerID.value);
            RP.scopeClassId = Number(txtScopeCatID.value);
            RP.ScopeID = Number(txtScopeID.value);
            RP.EquipClassID = Number(txtEquipClassID.value);
            RP.FromEquipCode = (txtFromLaborRP.value);
            RP.ToEquipCode = (txtToLaborRP.value);
            Ajax.CallAsync({
                url: Url.Action("rptRes_EquipmentWORK_print", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
    }
    function InitalizeEvents() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        //$("#RDByShowContracts").prop("checked", "checked");
        btnProjectEngineerRP.onclick = btnProjectEngineerRP_Click;
        //btnAreaRP.onclick = btnAreaRP_Click;
        btnScopeCatRP.onclick = btnScopeCatRP_Click;
        btnScopeRP.onclick = btnScopeRP_Click;
        btnEquipClassRP.onclick = btnEquipClassRP_Click;
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
    //    sys.FindKey(Modules.Equipmentutilization, "btnAreaRP", "", () => {
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
        sys.FindKey(Modules.Equipmentutilization, "btnScopeCatRP", "", function () {
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
        sys.FindKey(Modules.Equipmentutilization, "btnScopeRP", "", function () {
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
    function btnEquipClassRP_Click() {
        sys.FindKey(Modules.EquipmentMonitoring, "btnSearchClass", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEquipmentClass", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtEquipClassID.value = result.EquipClassId.toString();
                    txtEquipClassRP.value = result.ClassCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtEquipClass1RP.value = result.DescA.toString();
                    }
                    else {
                        txtEquipClass1RP.value = result.DescE.toString();
                    }
                }
            });
        });
    }
})(Equipmentwork || (Equipmentwork = {}));
//# sourceMappingURL=Equipmentwork.js.map