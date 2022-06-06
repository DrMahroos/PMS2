$(document).ready(function () {
    Evaluation.InitalizeComponent();
});
var Evaluation;
(function (Evaluation) {
    var sys = new SystemTools();
    var ControllerName = "Evaluation";
    var FromDate;
    var ToDate;
    var txtSubContrRP;
    var txtSubContrID;
    var butSubContrCodeRP;
    var txtSubContr1RP;
    var txtEnginerID;
    var txtEnginerRP;
    var butEnginerRPCode;
    var txtEnginer1RP;
    var txtContactRP;
    var butContactRP;
    var txtContact1RP;
    var _CompCode;
    var _BranchCode;
    var Condition;
    var txtProjectID;
    var txtProjectRP;
    var btnProjectRP;
    var txtProject1RP;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        InitalizeControls();
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
    }
    Evaluation.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        ToDate = DocumentActions.GetElementById("ToDate");
        FromDate = DocumentActions.GetElementById("FromDate");
        txtSubContrID = DocumentActions.GetElementById("txtSubContrID");
        txtSubContrRP = DocumentActions.GetElementById("txtSubContrRP");
        butSubContrCodeRP = DocumentActions.GetElementById("butSubContrCodeRP");
        txtSubContr1RP = DocumentActions.GetElementById("txtSubContr1RP");
        txtEnginerID = DocumentActions.GetElementById("txtEnginerID");
        txtEnginerRP = DocumentActions.GetElementById("txtEnginerRP");
        butEnginerRPCode = DocumentActions.GetElementById("butEnginerRPCode");
        txtEnginer1RP = DocumentActions.GetElementById("txtEnginer1RP");
        txtContactRP = DocumentActions.GetElementById("txtContactRP");
        butContactRP = DocumentActions.GetElementById("butContactRP");
        txtContact1RP = DocumentActions.GetElementById("txtContact1RP");
        txtProjectID = DocumentActions.GetElementById("txtProjectID");
        txtProjectRP = DocumentActions.GetElementById("txtProjectRP");
        btnProjectRP = DocumentActions.GetElementById("btnProjectRP");
        txtProject1RP = DocumentActions.GetElementById("txtProject1RP");
    }
    function Clear() {
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtSubContrRP.value = "";
        txtSubContr1RP.value = "";
        txtEnginerRP.value = "";
        txtEnginer1RP.value = "";
        txtContactRP.value = "";
        txtContact1RP.value = "";
        txtProjectID.value = "";
        txtProjectRP.value = "";
        txtProject1RP.value = "";
    }
    function Print() {
        debugger;
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        RP.SubID = Number(txtSubContrID.value);
        RP.EngID = Number(txtEnginerID.value);
        RP.ContrId = Number(txtContactRP.value);
        RP.ProjectID = Number(txtProjectID.value);
        if ($("#RdBySub").prop("checked")) {
            Ajax.CallAsync({
                url: Url.Action("rpt_ENG_Evaluation_BYSub", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        else if ($("#RdByEngineer").prop("checked")) {
            Ajax.CallAsync({
                url: Url.Action("rpt_ENG_Evaluation_BYENG", "GeneralReports"),
                data: RP,
                success: function (d) {
                    debugger;
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        else if ($("#RdByScope").prop("checked")) {
            Ajax.CallAsync({
                url: Url.Action("rpt_ENG_Evaluation_BYScope", "GeneralReports"),
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
        butSubContrCodeRP.onclick = butsubcontrRP_Click;
        butEnginerRPCode.onclick = butEnginerRPCode_Click;
        butContactRP.onclick = butContactRP_Click;
        btnProjectRP.onclick = btnProjectRP_Click;
    }
    function butsubcontrRP_Click() {
        sys.FindKey(Modules.Evaluation, "butSubContrCodeRP", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSubContractorByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtSubContrID.value = result.SubContractorID.toString();
                    txtSubContrRP.value = result.SubContractorCode.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtSubContr1RP.value = result.DescA;
                    }
                    else {
                        txtSubContr1RP.value = result.DescE;
                    }
                }
            });
        });
    }
    function butEnginerRPCode_Click() {
        sys.FindKey(Modules.Evaluation, "butEnginerRPCode", Condition, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSiteEngineer", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtEnginerRP.value = result.EngCode.toString();
                    txtEnginerID.value = result.SiteEngineerId.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtEnginer1RP.value = result.DescA;
                    }
                    else {
                        txtEnginer1RP.value = result.DescE;
                    }
                }
            });
        });
    }
    function butContactRP_Click() {
        sys.FindKey(Modules.Evaluation, "butContactRP", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEngSubContract", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtContactRP.value = result.SubContractId.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtContact1RP.value = result.DescA.toString();
                    }
                    else {
                        txtContact1RP.value = result.DescE.toString();
                    }
                }
            });
        });
    }
    function btnProjectRP_Click() {
        debugger;
        sys.FindKey(Modules.Evaluation, "btnProjectRP", Condition, function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProjectEng", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    txtProjectID.value = result.ProjectID.toString();
                    txtProjectRP.value = result.ProjectCode.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtProject1RP.value = result.DescA;
                    }
                    else {
                        txtProject1RP.value = result.DescL;
                    }
                }
            });
        });
    }
})(Evaluation || (Evaluation = {}));
//# sourceMappingURL=Evaluation.js.map