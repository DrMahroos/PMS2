$(document).ready(function () {
    Production.InitalizeComponent();
});
var Production;
(function (Production) {
    var sys = new SystemTools();
    var ControllerName = "Production";
    var FromDate;
    var ToDate;
    var txtsubcontrID;
    var txtsubcontrRP;
    var butsubcontrCode;
    var txtsubcontr1RP;
    var txtprojectID;
    var txtprojectRP;
    var butprojectCode;
    var txtproject1RP;
    var txtprojecphaseID;
    var txtprojecphaseRP;
    var butprojecphaseCode;
    var txtprojecphase1RP;
    var txtcontactID;
    var txtcontactRP;
    var butcontactCode;
    var txtcontact1RP;
    var txtsoID;
    var txtwork_soRP;
    var butwork_soCode;
    var txtwork_so1RP;
    var _CompCode;
    var _BranchCode;
    var Condition;
    var SoCond;
    var ContCond;
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
    Production.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        ToDate = DocumentActions.GetElementById("ToDate");
        FromDate = DocumentActions.GetElementById("FromDate");
        txtsubcontrID = DocumentActions.GetElementById("txtsubcontrID");
        txtsubcontrRP = DocumentActions.GetElementById("txtsubcontrRP");
        butsubcontrCode = DocumentActions.GetElementById("butsubcontrCode");
        txtsubcontr1RP = DocumentActions.GetElementById("txtsubcontr1RP");
        txtprojectID = DocumentActions.GetElementById("txtprojectID");
        txtprojectRP = DocumentActions.GetElementById("txtprojectRP");
        butprojectCode = DocumentActions.GetElementById("butprojectCode");
        txtproject1RP = DocumentActions.GetElementById("txtproject1RP");
        txtprojecphaseID = DocumentActions.GetElementById("txtprojecphaseID");
        txtprojecphaseRP = DocumentActions.GetElementById("txtprojecphaseRP");
        butprojecphaseCode = DocumentActions.GetElementById("butprojecphaseCode");
        txtprojecphase1RP = DocumentActions.GetElementById("txtprojecphase1RP");
        txtcontactID = DocumentActions.GetElementById("txtcontactID");
        txtcontactRP = DocumentActions.GetElementById("txtcontactRP");
        butcontactCode = DocumentActions.GetElementById("butcontactCode");
        txtcontact1RP = DocumentActions.GetElementById("txtcontact1RP");
        txtsoID = DocumentActions.GetElementById("txtsoID");
        txtwork_soRP = DocumentActions.GetElementById("txtwork_soRP");
        butwork_soCode = DocumentActions.GetElementById("butwork_soCode");
        txtwork_so1RP = DocumentActions.GetElementById("txtwork_so1RP");
    }
    function Clear() {
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        txtsubcontrID.value = "";
        txtsubcontrRP.value = "";
        txtsubcontr1RP.value = "";
        txtprojectID.value = "";
        txtprojectRP.value = "";
        txtproject1RP.value = "";
        txtprojecphaseID.value = "";
        txtprojecphaseRP.value = "";
        txtprojecphase1RP.value = "";
        txtcontactID.value = "";
        txtcontactRP.value = "";
        txtcontact1RP.value = "";
        txtsoID.value = "";
        txtwork_soRP.value = "";
        txtwork_so1RP.value = "";
    }
    function Print() {
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        if (Number(txtsubcontrRP.value) == 0) {
            MessageBox.Show("You Must Select subcontr", "Info");
            return;
        }
        RP.SubID = Number(txtsubcontrID.value);
        RP.ContrId = Number(txtcontactID.value);
        RP.SoId = Number(txtsoID.value);
        RP.ProjectID = Number(txtprojectID.value);
        RP.Phaseid = Number(txtprojecphaseID.value);
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        if ($("#RDByShowProject").prop("checked")) {
            RP.TypeReport = 1;
            Ajax.CallAsync({
                url: Url.Action("rptSlsProduction", "GeneralReports"),
                data: RP,
                success: function (d) {
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        if ($("#RDByShowPhase").prop("checked")) {
            RP.TypeReport = 2;
            Ajax.CallAsync({
                url: Url.Action("rptSlsProduction", "GeneralReports"),
                data: RP,
                success: function (d) {
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
        if ($("#RDByShowActivity").prop("checked")) {
            RP.TypeReport = 3;
            Ajax.CallAsync({
                url: Url.Action("rptSlsProduction", "GeneralReports"),
                data: RP,
                success: function (d) {
                    var result = d.result;
                    window.open(result, "_blank");
                }
            });
        }
    }
    function InitalizeEvents() {
        $("#RDByShowProject").prop("checked", "checked");
        butsubcontrCode.onclick = butsubcontrCode_Click;
        butprojectCode.onclick = butprojectCode_Click;
        butprojecphaseCode.onclick = butprojecphaseCode_Click;
        butcontactCode.onclick = butcontactCode_Click;
        butwork_soCode.onclick = butwork_soCode_Click;
    }
    function butsubcontrCode_Click() {
        sys.FindKey(Modules.Production, "butsubcontrCode", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSubContractorByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    if (result.SubContractorCode == null) {
                        txtsubcontrRP.value = "";
                    }
                    else {
                        txtsubcontrRP.value = result.SubContractorCode.toString();
                    }
                    //txtsubcontrRP.value = result.SubContractorCode.toString();
                    txtsubcontrID.value = result.SubContractorID.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtsubcontr1RP.value = result.DescA;
                    }
                    else {
                        txtsubcontr1RP.value = result.DescE;
                    }
                }
            });
        });
    }
    function butprojectCode_Click() {
        ;
        sys.FindKey(Modules.ServiceOrder, "btnSearchProject", Condition, function () {
            ;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProject", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    ;
                    var result = d.result;
                    txtprojectRP.value = result.ProjectCode.toString();
                    txtprojectID.value = result.ProjectID.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtproject1RP.value = result.DescA;
                    }
                    else {
                        txtproject1RP.value = result.DescL;
                    }
                }
            });
        });
    }
    function butprojecphaseCode_Click() {
        ;
        if (txtprojectID.value == "" || txtprojectID.value == " ") {
            WorningMessage("يجب ادخال رقم المشروع", "Project must be Selected");
            return;
        }
        else
            sys.FindKey(Modules.ServiceOrder, "btnSearchProjPhase", "ProjectID = " + txtprojectID.value, function () {
                ;
                var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
                Ajax.CallAsync({
                    url: Url.Action("GetSrchProjectPhase", ControllerName),
                    data: { id: _Id },
                    success: function (d) {
                        ;
                        var result = d.result;
                        txtprojecphaseRP.value = result.ProjectPhaseCode.toString();
                        txtprojecphaseID.value = result.ProjectPhaseId.toString();
                        if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                            txtprojecphase1RP.value = result.DescA;
                        }
                        else {
                            txtprojecphase1RP.value = result.DescL;
                        }
                    }
                });
            });
    }
    function butcontactCode_Click() {
        ;
        ContCond = Condition;
        if (txtsubcontrID.value != "") {
            ContCond = ContCond + "and SubContractorID= " + txtsubcontrID.value;
        }
        sys.FindKey(Modules.SubContract, "butTrNo", ContCond, function () {
            ;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchContract", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    ;
                    var result = d.result;
                    txtcontactRP.value = result.TrNo.toString();
                    txtcontactID.value = result.SubContractId.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtcontact1RP.value = result.DescA;
                    }
                    else {
                        txtcontact1RP.value = result.DescE;
                    }
                    if (txtsubcontrID.value == "") {
                        txtsubcontrRP.value = result.Sc_Code.toString();
                        txtsubcontrID.value = result.SubContractorID.toString();
                        if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                            txtsubcontr1RP.value = result.Sc_DescA;
                        }
                        else {
                            txtsubcontr1RP.value = result.Sc_DescE;
                        }
                    }
                }
            });
        });
    }
    function butwork_soCode_Click() {
        ;
        SoCond = Condition;
        if (txtcontactID.value != "") {
            SoCond = SoCond + "and SubContractId= " + txtcontactID.value;
        }
        if (txtsubcontrID.value != "") {
            SoCond = SoCond + "and SubContractorID= " + txtsubcontrID.value;
        }
        sys.FindKey(Modules.ServiceOrder, "btnSearchOrder", SoCond, function () {
            ;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchSubServiceOrder", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    ;
                    var result = d.result;
                    txtwork_soRP.value = result.TrNo.toString();
                    txtsoID.value = result.SubServiceOrderId.toString();
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtwork_so1RP.value = result.Proj_DescA;
                    }
                    else {
                        txtwork_so1RP.value = result.Proj_DescE;
                    }
                    if (txtsubcontrID.value == "") {
                        txtsubcontrRP.value = result.Sc_Code.toString();
                        txtsubcontrID.value = result.SubContractorID.toString();
                        if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                            txtsubcontr1RP.value = result.Sc_DescA;
                        }
                        else {
                            txtsubcontr1RP.value = result.Sc_DescE;
                        }
                    }
                }
            });
        });
    }
})(Production || (Production = {}));
//# sourceMappingURL=Production.js.map