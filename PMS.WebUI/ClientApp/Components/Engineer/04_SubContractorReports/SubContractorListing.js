$(document).ready(function () {
    SubContractorListing.InitalizeComponent();
});
var SubContractorListing;
(function (SubContractorListing) {
    var sys = new SystemTools();
    var Master = new P_D_SubContractor();
    var ControllerName = "SubContractorListing";
    var FromDate;
    var ToDate;
    var fromsubcontrID;
    var fromsubcontrCodeRP;
    var butfromsubcontrRP;
    var fromsubcontrNameRP;
    var tosubcontrID;
    var tosubcontrCodeRP;
    var buttosubcontrRP;
    var tosubcontrNameRP;
    var scopeCodeID;
    var scopeCodeRP;
    var butscopeRP;
    var scopeNameRP;
    var EvalutionformNameRP;
    var EvalutionformtoNameRP;
    var _ScreenLanguage;
    var _CompCode;
    var _BranchCode;
    function InitalizeComponent() {
        debugger;
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        //FromDate.value = DateFormat(new Date().toString());
        //ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
    }
    SubContractorListing.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        ToDate = DocumentActions.GetElementById("ToDate");
        FromDate = DocumentActions.GetElementById("FromDate");
        fromsubcontrID = DocumentActions.GetElementById("fromsubcontrID");
        fromsubcontrCodeRP = DocumentActions.GetElementById("fromsubcontrCodeRP");
        butfromsubcontrRP = DocumentActions.GetElementById("butfromsubcontrRP");
        fromsubcontrNameRP = DocumentActions.GetElementById("fromsubcontrNameRP");
        tosubcontrID = DocumentActions.GetElementById("tosubcontrID");
        tosubcontrCodeRP = DocumentActions.GetElementById("tosubcontrCodeRP");
        buttosubcontrRP = DocumentActions.GetElementById("buttosubcontrRP");
        tosubcontrNameRP = DocumentActions.GetElementById("tosubcontrNameRP");
        scopeCodeID = DocumentActions.GetElementById("scopeCodeID");
        scopeCodeRP = DocumentActions.GetElementById("scopeCodeRP");
        butscopeRP = DocumentActions.GetElementById("butscopeRP");
        scopeNameRP = DocumentActions.GetElementById("scopeNameRP");
    }
    function Clear() {
        debugger;
        //FromDate.value = DateFormat(new Date().toString());
        //ToDate.value = DateFormat(new Date().toString());
        fromsubcontrCodeRP.value = "";
        fromsubcontrNameRP.value = "";
        tosubcontrCodeRP.value = "";
        tosubcontrNameRP.value = "";
        scopeCodeRP.value = "";
        scopeNameRP.value = "";
    }
    function Print() {
        debugger;
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        if (Number(scopeCodeRP.value) == 0) {
            MessageBox.Show("You Must Select Scope", "Info");
            return;
        }
        RP.FromSubCode = fromsubcontrCodeRP.value;
        RP.ToSubCode = tosubcontrCodeRP.value;
        RP.ScopeID = Number(scopeCodeID.value);
        Ajax.CallAsync({
            url: Url.Action("rptSlsSubContractorListing", "GeneralReports"),
            data: RP,
            success: function (d) {
                debugger;
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
    function InitalizeEvents() {
        debugger;
        butfromsubcontrRP.onclick = butfromsubcontrRP_Click;
        buttosubcontrRP.onclick = buttosubcontrRP_Click;
        butscopeRP.onclick = butscopeRP_Click;
    }
    function butfromsubcontrRP_Click() {
        debugger;
        sys.FindKey(Modules.SubContractorListing, "butfromsubcontrRP", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSubContractorByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    debugger; /*P_TR_SubContract*/
                    var result = d.result;
                    fromsubcontrCodeRP.value = result.SubContractorCode.toString();
                    if (_ScreenLanguage == "ar") {
                        fromsubcontrNameRP.value = result.DescA;
                    }
                    else {
                        fromsubcontrNameRP.value = result.DescE;
                    }
                }
            });
        });
    }
    function buttosubcontrRP_Click() {
        debugger;
        sys.FindKey(Modules.SubContractorListing, "buttosubcontrRP", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetP_D_SubContractor", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    tosubcontrCodeRP.value = result.SubContractorID.toString();
                    if (_ScreenLanguage == "ar") {
                        tosubcontrNameRP.value = result.DescA.toString();
                    }
                    else {
                        tosubcontrNameRP.value = result.DescE.toString();
                    }
                }
            });
        });
    }
    function butscopeRP_Click() {
        debugger;
        sys.FindKey(Modules.SubContractorListing, "butscopeRP", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEngSubContractorScope", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    scopeCodeRP.value = result.ScopeCode.toString();
                    scopeCodeID.value = result.ScopeID.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        scopeNameRP.value = result.DescA.toString();
                    }
                    else {
                        scopeNameRP.value = result.DescE.toString();
                    }
                }
            });
        });
    }
})(SubContractorListing || (SubContractorListing = {}));
//# sourceMappingURL=SubContractorListing.js.map