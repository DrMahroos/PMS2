$(document).ready(function () {
    EquipmentRequest.InitalizeComponent();
});
var EquipmentRequest;
(function (EquipmentRequest) {
    var ControllerName = "EquipmentRequest";
    var Master = new PQ_GetResRequestEquipment();
    var DataSource = new Array();
    var GridParent = new JsGrid();
    var GridChild = new JsGrid();
    var sys = new SystemTools();
    var txtTrNo;
    var txtWorkDescr;
    var txtPrj_ProjectCode;
    var txtPrj_DescE;
    var txtPhase_ProjectPhaseCode;
    var txtPhase_DescE;
    var txtTrDate;
    var txtStartDateTime;
    var txtEndDateTime;
    var ChkStatus;
    var btnSearchRequest;
    //var btnSearchSchdule: HTMLButtonElement;
    var _compCode;
    var _braCode;
    var _screenLang;
    var ScheduleId;
    var schd_ProjectID;
    var schd_ProjectPhaseId;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _compCode = SharedSession.CurrentEnvironment.CompCode;
        _braCode = SharedSession.CurrentEnvironment.BranchCode;
        _screenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditButton.disabled = true;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintButton.disabled = false;
        InitalizeControls();
        InitalizeEvents();
        InitalizeGrid();
        SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.UndoAction(function () { });
        ControlsButtons.PrintAction(function () { PPrnt_Res_EquipmentRequest(); });
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_compCode, _braCode, Modules.EquipmentRequest, Master.RequestEquipmentId.toString());
        });
    }
    EquipmentRequest.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("ResM_Mat_EquipRequest");
        GridParent.ElementName = "GridParent";
        GridParent.InsertionMode = JsGridInsertionMode.Binding;
        GridParent.Columns = [
            { title: res.ResM_Mat_EquipRequest_equipclass, name: "Class_ClassCode", type: "text", width: "7.5%" },
            { title: res.ResM_Mat_EquipRequest_classname, name: "Class_DescA", visible: _screenLang == "ar", type: "text", width: "11.5%" },
            { title: res.ResM_Mat_EquipRequest_classname, name: "Class_DescE", visible: _screenLang == "en", type: "text", width: "11.5%" },
            { title: res.ResM_Mat_EquipRequest_requiredhrs, name: "RequiredHrs", type: "text", width: "7.5%" },
            { title: res.ResM_Mat_EquipRequest_requiredEqup, name: "RequiredNo", type: "text", width: "7.5%" },
            { title: res.ResM_Mat_EquipRequest_assigned, name: "AssignedEq", type: "text", width: "7.5%" },
            { title: res.ResM_Mat_EquipRequest_remain, name: "RemainEq", type: "text", width: "7.5%" }
        ];
        GridParent.DataSource = DataSource;
        GridParent.Bind();
    }
    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById("txtTrNo");
        txtWorkDescr = DocumentActions.GetElementById("txtWorkDescr");
        txtPrj_ProjectCode = DocumentActions.GetElementById("txtPrj_ProjectCode");
        txtPrj_DescE = DocumentActions.GetElementById("txtPrj_DescE");
        txtPhase_ProjectPhaseCode = DocumentActions.GetElementById("txtPhase_ProjectPhaseCode");
        txtPhase_DescE = DocumentActions.GetElementById("txtPhase_DescE");
        txtTrDate = DocumentActions.GetElementById("txtTrDate");
        txtStartDateTime = DocumentActions.GetElementById("txtStartDateTime");
        txtEndDateTime = DocumentActions.GetElementById("txtEndDateTime");
        ChkStatus = DocumentActions.GetElementById("ChkStatus");
        btnSearchRequest = DocumentActions.GetElementById("btnSearchRequest");
        //btnSearchSchdule = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchSchdule");
    }
    function InitalizeEvents() {
        btnSearchRequest.onclick = btnSearchRequest_Clieked;
        //btnSearchSchdule.onclick = btnSearchSchdule_Clicked;
    }
    function PPrnt_Res_EquipmentRequest() {
        Ajax.CallAsync({
            url: Url.Action("PrintEquipmentRequest", "PrintTransaction"),
            data: { TrID: Number(Master.RequestEquipmentId) },
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: function (d) {
                Master = d.result;
                Display();
            }
        });
    }
    function Add() {
    }
    function Edit() {
    }
    function Insert() {
    }
    function Update() {
    }
    function btnSearchRequest_Clieked() {
        sys.FindKey(Modules.EquipmentRequest, "btnSearchRequest", "CompCode = " + _compCode + " and BraCode = " + _braCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEquipRequest", ControllerName),
                data: { id: id },
                success: function (d) {
                    Master = d.result;
                    var Index = GetIndexByUseId(Number(Master.RequestEquipmentId), "PQ_GetResRequestEquipment", "RequestEquipmentId", "CompCode = " + _compCode + " and BraCode = " + _braCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }
    function btnSearchSchdule_Clicked() {
        sys.FindKey(Modules.EquipmentRequest, "btnSearchSchdule", "CompCode = " + _compCode + " and BraCode = " + _braCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEngSchedule", ControllerName),
                data: { id: id },
                success: function (d) {
                    var schadule = d.result;
                    ScheduleId = schadule.ScheduleId;
                    txtWorkDescr.value = schadule.WorkDescr;
                    txtPrj_ProjectCode.value = schadule.Prj_ProjectCode;
                    txtPrj_DescE.value = schadule.Prj_DescE;
                    txtPhase_ProjectPhaseCode.value = schadule.Phase_ProjectPhaseCode;
                    txtPhase_DescE.value = schadule.Phase_DescE;
                    txtStartDateTime.value = DateFormat(schadule.StartDateTime);
                    txtEndDateTime.value = DateFormat(schadule.EndDateTime);
                    schd_ProjectID = schadule.ProjectID;
                    schd_ProjectPhaseId = schadule.ProjectPhaseId;
                }
            });
        });
    }
    function Display() {
        DocumentActions.RenderFromModel(Master);
        txtStartDateTime.value = DateTimeFormat(Master.StartDateTime);
        txtEndDateTime.value = DateTimeFormat(Master.EndDateTime);
        LoadDetails(Master.ScheduleId);
    }
    function LoadDetails(schduleId) {
        Ajax.CallAsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: schduleId },
            success: function (d) {
                DataSource = d.result;
                GridParent.DataSource = DataSource;
                GridParent.Bind();
            }
        });
    }
})(EquipmentRequest || (EquipmentRequest = {}));
//# sourceMappingURL=EquipmentRequest.js.map