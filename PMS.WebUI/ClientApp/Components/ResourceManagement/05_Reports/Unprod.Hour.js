$(document).ready(function () {
    Unprod.Hour.InitalizeComponent();
});
var Unprod;
(function (Unprod) {
    var Hour;
    (function (Hour) {
        var sys = new SystemTools();
        var ControllerName = "UnprodHour";
        var FromDate;
        var ToDate;
        var txtFromProjectRP;
        var txtToProjectRP;
        var txtProjectEngineerID;
        var txtProjectEngineerRP;
        var btnProjectEngineerRP;
        var txtProjectEngineer1RP;
        var txtScopeCatID;
        var txtScopeCatRP;
        var btnScopeCatRP;
        var txtScopeCat1RP;
        var txtScopeID;
        var txtScopeRP;
        var btnScopeRP;
        var txtScope1RP;
        var txtCustomerCatID;
        var txtCustomerCatRP;
        var btnCustomerCatRP;
        var txtCustomerCat1RP;
        var txtCustomerID;
        var txtCustomerRP;
        var btnCustomerRP;
        var txtCustomer1RP;
        var txtUnProdCatID;
        var txtUnProdCatRP;
        var btnUnProdCatRP;
        var txtUnProdCat1RP;
        var txtUnProdReasonID;
        var txtUnProdReasonRP;
        var btnUnProdReasonRP;
        var txtUnProdReason1RP;
        var _ScreenLanguage;
        var _CompCode;
        var _BranchCode;
        var Condition;
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
        Hour.InitalizeComponent = InitalizeComponent;
        function InitalizeControls() {
            FromDate = DocumentActions.GetElementById("FromDate");
            ToDate = DocumentActions.GetElementById("ToDate");
            txtFromProjectRP = DocumentActions.GetElementById("txtFromProjectRP");
            txtToProjectRP = DocumentActions.GetElementById("txtToProjectRP");
            txtProjectEngineerID = DocumentActions.GetElementById("txtProjectEngineerID");
            txtProjectEngineerRP = DocumentActions.GetElementById("txtProjectEngineerRP");
            btnProjectEngineerRP = DocumentActions.GetElementById("btnProjectEngineerRP");
            txtProjectEngineer1RP = DocumentActions.GetElementById("txtProjectEngineer1RP");
            txtScopeCatID = DocumentActions.GetElementById("txtScopeCatID");
            txtScopeCatRP = DocumentActions.GetElementById("txtScopeCatRP");
            btnScopeCatRP = DocumentActions.GetElementById("btnScopeCatRP");
            txtScopeCat1RP = DocumentActions.GetElementById("txtScopeCat1RP");
            txtScopeID = DocumentActions.GetElementById("txtScopeID");
            txtScopeRP = DocumentActions.GetElementById("txtScopeRP");
            btnScopeRP = DocumentActions.GetElementById("btnScopeRP");
            txtScope1RP = DocumentActions.GetElementById("txtScope1RP");
            txtCustomerCatID = DocumentActions.GetElementById("txtCustomerCatID");
            txtCustomerCatRP = DocumentActions.GetElementById("txtCustomerCatRP");
            btnCustomerCatRP = DocumentActions.GetElementById("btnCustomerCatRP");
            txtCustomerCat1RP = DocumentActions.GetElementById("txtCustomerCat1RP");
            txtCustomerID = DocumentActions.GetElementById("txtCustomerID");
            txtCustomerRP = DocumentActions.GetElementById("txtCustomerRP");
            btnCustomerRP = DocumentActions.GetElementById("btnCustomerRP");
            txtCustomer1RP = DocumentActions.GetElementById("txtCustomer1RP");
            txtUnProdCatID = DocumentActions.GetElementById("txtUnProdCatID");
            txtUnProdCatRP = DocumentActions.GetElementById("txtUnProdCatRP");
            btnUnProdCatRP = DocumentActions.GetElementById("btnUnProdCatRP");
            txtUnProdCat1RP = DocumentActions.GetElementById("txtUnProdCat1RP");
            txtUnProdReasonID = DocumentActions.GetElementById("txtUnProdReasonID");
            txtUnProdReasonRP = DocumentActions.GetElementById("txtUnProdReasonRP");
            btnUnProdReasonRP = DocumentActions.GetElementById("btnUnProdReasonRP");
            txtUnProdReason1RP = DocumentActions.GetElementById("txtUnProdReason1RP");
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
            txtScopeCatID.value = "";
            txtScopeCatRP.value = "";
            txtScopeCat1RP.value = "";
            txtScopeID.value = "";
            txtScopeRP.value = "";
            txtScope1RP.value = "";
            txtCustomerCatID.value = "";
            txtCustomerCatRP.value = "";
            txtCustomerCat1RP.value = "";
            txtCustomerID.value = "";
            txtCustomerRP.value = "";
            txtCustomer1RP.value = "";
            txtUnProdCatID.value = "";
            txtUnProdCatRP.value = "";
            txtUnProdCat1RP.value = "";
            txtUnProdReasonID.value = "";
            txtUnProdReasonRP.value = "";
            txtUnProdReason1RP.value = "";
        }
        function Print() {
            debugger;
            var RP = new ReportParameters();
            RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
            RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
            RP.FromDate = DateFormat(FromDate.value);
            RP.ToDate = DateFormat(ToDate.value);
            RP.FromProjCode = Number(txtFromProjectRP.value).toString();
            RP.ToProjCode = Number(txtToProjectRP.value).toString();
            RP.EngID = Number(txtProjectEngineerID.value);
            RP.custClassID = Number(txtCustomerCatID.value);
            RP.customerID = Number(txtCustomerID.value);
            RP.scopeClassId = Number(txtScopeCatID.value);
            RP.ScopeID = Number(txtScopeID.value);
            RP.UnProdId = Number(txtUnProdCatID.value);
            RP.UnprodCatID = Number(txtUnProdReasonID.value);
            if (DateFormat(FromDate.value) == "NaN-NaN-NaN" || DateFormat(ToDate.value) == "NaN-NaN-NaN") {
                MessageBox.Show(" you must select Date", "Info");
            }
            else if (DateFormat(FromDate.value) > DateFormat(ToDate.value)) {
                MessageBox.Show(" From date  is largethan To Date", "Info");
            }
            else {
                if ($("#RAD_summarybyproject").prop("checked")) {
                    RP.TypeReport = 1;
                    Ajax.CallAsync({
                        url: Url.Action("rptRes_UnprodHour_print", "GeneralReports"),
                        data: RP,
                        success: function (d) {
                            debugger;
                            var result = d.result;
                            window.open(result, "_blank");
                        }
                    });
                }
                if ($("#RAD_detailseng").prop("checked")) {
                    RP.TypeReport = 2;
                    Ajax.CallAsync({
                        url: Url.Action("rptRes_UnprodHour_print", "GeneralReports"),
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
            $("#RAD_summarybyproject").prop("checked", "checked");
            btnProjectEngineerRP.onclick = btnProjectEngineerRP_Click;
            btnScopeCatRP.onclick = btnScopeCatRP_Click;
            btnScopeRP.onclick = btnScopeRP_Click;
            btnCustomerCatRP.onclick = btnCustomerCatRP_Click;
            btnCustomerRP.onclick = btnCustomerRP_Click;
            btnUnProdCatRP.onclick = btnUnProdCatRP_Click;
            btnUnProdReasonRP.onclick = btnUnProdReasonRP_Click;
        }
        function btnProjectEngineerRP_Click() {
            debugger;
            sys.FindKey(Modules.LateandAbsence, "butEng_Code", Condition, function () {
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
        function btnScopeCatRP_Click() {
            debugger;
            sys.FindKey(Modules.UnprodHour, "btnScopeCatRP", "", function () {
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
            sys.FindKey(Modules.UnprodHour, "btnScopeRP", "", function () {
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
        function btnCustomerCatRP_Click() {
            debugger;
            sys.FindKey(Modules.UnprodHour, "btnCustomerCatRP", "", function () {
                debugger;
                var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
                Ajax.CallAsync({
                    url: Url.Action("GetSrchCustomerCat", ControllerName),
                    data: { id: _Id },
                    success: function (d) {
                        var result = d.result;
                        txtCustomerCatID.value = result.CustomerCategoryID.toString();
                        txtCustomerCatRP.value = result.CustomerCatCode.toString();
                        if (_ScreenLanguage == "ar") {
                            txtCustomerCat1RP.value = result.DescA;
                        }
                        else {
                            txtCustomerCat1RP.value = result.DescE;
                        }
                    }
                });
            });
        }
        function btnCustomerRP_Click() {
            debugger;
            sys.FindKey(Modules.UnprodHour, "btnCustomerRP", "", function () {
                debugger;
                var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
                Ajax.CallAsync({
                    url: Url.Action("GetCustomer", ControllerName),
                    data: { id: _Id },
                    success: function (d) {
                        var result = d.result;
                        txtCustomerID.value = result.CustomerID.toString();
                        txtCustomerRP.value = result.CustomerCode.toString();
                        if (_ScreenLanguage == "ar") {
                            txtCustomer1RP.value = result.DescA.toString();
                        }
                        else {
                            txtCustomer1RP.value = result.DescE.toString();
                        }
                    }
                });
            });
        }
        function btnUnProdCatRP_Click() {
            debugger;
            sys.FindKey(Modules.UnprodHour, "btnUnProdCatRP", "", function () {
                debugger;
                var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
                Ajax.CallAsync({
                    url: Url.Action("GetUnProdCategory", ControllerName),
                    data: { id: _Id },
                    success: function (d) {
                        var result = d.result;
                        txtUnProdCatID.value = result.UnProdCategoryID.toString();
                        txtUnProdCatRP.value = result.CategCode.toString();
                        if (_ScreenLanguage == "ar") {
                            txtUnProdCat1RP.value = result.DescA.toString();
                        }
                        else {
                            txtUnProdCat1RP.value = result.DescE.toString();
                        }
                    }
                });
            });
        }
        function btnUnProdReasonRP_Click() {
            debugger;
            sys.FindKey(Modules.UnprodHour, "btnUnProdReasonRP", "", function () {
                debugger;
                var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
                Ajax.CallAsync({
                    url: Url.Action("GetUnProdReason", ControllerName),
                    data: { id: _Id },
                    success: function (d) {
                        var result = d.result;
                        txtUnProdReasonID.value = result.UnProdReasonId.toString();
                        txtUnProdReasonRP.value = result.ReasonCode.toString();
                        if (_ScreenLanguage == "ar") {
                            txtUnProdReason1RP.value = result.DescA.toString();
                        }
                        else {
                            txtUnProdReason1RP.value = result.DescE.toString();
                        }
                    }
                });
            });
        }
    })(Hour = Unprod.Hour || (Unprod.Hour = {}));
})(Unprod || (Unprod = {}));
//# sourceMappingURL=Unprod.Hour.js.map