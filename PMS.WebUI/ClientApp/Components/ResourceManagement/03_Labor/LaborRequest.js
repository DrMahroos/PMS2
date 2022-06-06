$(document).ready(function () {
    LaborRequest.InitalizeComponent();
});
var LaborRequest;
(function (LaborRequest) {
    var ControllerName = "LaborRequest";
    var Master = new PQ_GetResRequestLabours();
    var LaborClassDataSource = new Array();
    //var DetailsLabour: Array<PQ_GetSalesInvoiceDetail> = new Array<PQ_GetSalesInvoiceDetail>();
    //var DetailsAssignHeaderLabour: PQ_GetSalesInvoiceDetail = new PQ_GetSalesInvoiceDetail();
    //var Tbl_DetailLabour: Array<P_TR_SalesInvoiceDetail> = new Array<P_TR_SalesInvoiceDetail>();
    var txtRequestLabourId;
    var txtTrNo;
    var txtScheduleId;
    var txtWorkDescr;
    var txtPrj_ProjectCode;
    var txtPrj_DescE;
    var txtPhase_ProjectPhaseCode;
    var txtTrDate;
    var txtStartDateTime;
    var txtEndDateTime;
    var ChkStatus;
    var btnSearchRequest;
    var btnSearchScdule;
    var _compCode;
    var _braCode;
    var _screenLang;
    var dataSource = new Array();
    var GridParent = new JsGrid();
    var GridChild = new JsGrid();
    var sys = new SystemTools();
    var ajaxCall = new AjaxCaller();
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _compCode = ClientSharedWork.Session.CompCode;
        _braCode = ClientSharedWork.Session.BranchCode;
        _screenLang = ClientSharedWork.Session.ScreenLanguage;
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
        ControlsButtons.PrintAction(function () { PPrnt_Res_LaborRequest(); });
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_compCode, _braCode, Modules.LaborRequest, Master.RequestLabourId.toString());
        });
    }
    LaborRequest.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtRequestLabourId = DocumentActions.GetElementById("txtRequestLabourId");
        txtTrNo = DocumentActions.GetElementById("txtTrNo");
        txtScheduleId = DocumentActions.GetElementById("txtScheduleId");
        txtWorkDescr = DocumentActions.GetElementById("txtWorkDescr");
        txtPrj_ProjectCode = DocumentActions.GetElementById("txtPrj_ProjectCode");
        txtPrj_DescE = DocumentActions.GetElementById("txtPrj_DescE");
        txtPhase_ProjectPhaseCode = DocumentActions.GetElementById("txtPhase_ProjectPhaseCode");
        txtTrDate = DocumentActions.GetElementById("txtTrDate");
        txtStartDateTime = DocumentActions.GetElementById("txtStartDateTime");
        txtEndDateTime = DocumentActions.GetElementById("txtEndDateTime");
        ChkStatus = DocumentActions.GetElementById("ChkStatus");
        btnSearchRequest = DocumentActions.GetElementById("btnSearchRequest");
        btnSearchScdule = DocumentActions.GetElementById("btnSearchScdule");
    }
    function InitalizeEvents() {
        btnSearchRequest.onclick = btnSearchRequest_Click;
        txtTrNo.onchange = SearchRequest_Changed;
        //butSch_TrNo.onclick = butSchedule_Code_Click;
        //butProj_Code.onclick = butProj_Code_Click;
        //butProjectPhaseCode.onclick = butProjectPhaseCode_Click;
        //butSiteEngineer_Code.onclick = butSiteEngineer_Code_Click;
        //butShowFree.onclick = butShowFree_Click;
    }
    function InitalizeGrid() {
        var res = GetResourceList("ResM_Mat_laborrequest");
        GridParent.ElementName = "GridParent";
        GridParent.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridParent.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridParent.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridParent.InsertionMode = JsGridInsertionMode.Binding;
        GridParent.Columns = [
            { title: res.ResM_Mat_laborrequest_labclass, name: "LClass_CalssCode", width: "7.5%" },
            { title: res.ResM_Mat_laborrequest_classname, name: "LClass_DescA", visible: ClientSharedWork.Session.ScreenLanguage == "ar", width: "11.5%" },
            { title: res.ResM_Mat_laborrequest_classname, name: "LClass_DescE", visible: ClientSharedWork.Session.ScreenLanguage == "en", width: "11.5%" },
            { title: res.ResM_Mat_laborrequest_requiredhrs, name: "RequiredHrs", width: "7.5%" },
            { title: res.ResM_Mat_laborrequest_reqlabor, name: "RequiredNo", width: "7.5%" },
            { title: res.ResM_Mat_laborrequest_assigned, name: "AssignedLab", width: "7.5%" },
            { title: res.ResM_Mat_laborrequest_remain, name: "RemainLab", width: "7.5%" }
        ];
        GridParent.DataSource = dataSource;
        GridParent.Bind();
    }
    function PPrnt_Res_LaborRequest() {
        Ajax.CallAsync({
            url: Url.Action("PrintLaborRequest", "PrintTransaction"),
            data: { TrID: Number(Master.RequestLabourId) },
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
    function Display() {
        DocumentActions.RenderFromModel(Master);
        if (!IsNullOrEmpty(txtTrDate.value)) {
            txtTrDate.value = DateFormat(Master.TrDate);
        }
        if (!IsNullOrEmpty(Master.StartDateTime)) {
            debugger;
            txtStartDateTime.value = DateTimeFormat(Master.StartDateTime);
        }
        if (!IsNullOrEmpty(Master.EndDateTime)) {
            txtEndDateTime.value = DateTimeFormat(Master.EndDateTime);
        }
        LoadDetails(Master.ScheduleId);
    }
    function Edit() {
    }
    function Insert() {
    }
    function Update() {
    }
    function butSchedule_Code_Click() {
        // where Schedule.satus = 0 mean not related to request
        sys.FindKey(Modules.LaborRequest, "butSchedule_Code", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEngScheduleByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    //txtSch_TrNo.value = result.ScheduleId.toString();
                    //txtWorkDescr.value = result.WorkDescr.toString();
                    //txtProj_Code.value = result.Prj_ProjectCode.toString();
                    //txtProj_Desc.value = result.Prj_DescE.toString();
                    //txtProjectPhaseCode.value = result.Phase_ProjectPhaseCode.toString();
                    //txtPhase_Desc.value = result.Phase_DescE.toString();
                    //txtSiteEngineer_Code.value = result.Eng_EngCode.toString();
                    //txtSiteEngineer_Desc.value = result.Eng_DescE.toString();
                }
            });
        });
    }
    function LoadDetails(id) {
        Ajax.CallAsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: id },
            success: function (d) {
                dataSource = d.result;
                GridParent.DataSource = dataSource;
                GridParent.Bind();
            }
        });
    }
    function btnSearchRequest_Click() {
        sys.FindKey(Modules.LaborRequest, "btnSearchRequest", "CompCode = " + _compCode + " and BraCode = " + _braCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLaborRequest", ControllerName),
                data: { id: id },
                success: function (d) {
                    Master = d.result;
                    var Index = GetIndexByUseId(Number(Master.RequestLabourId), "PQ_GetResRequestLabours", "RequestLabourId");
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }
    function SearchRequest_Changed() {
        var trno = Number(txtTrNo.value);
        Ajax.Callsync({
            url: Url.Action("getRequestLabourViewByNo", "FindByNo"),
            data: { trno: trno },
            success: function (d) {
                debugger;
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                Master = d.result;
                var Index = GetIndexByUseId(Master.RequestLabourId, "PQ_GetResRequestLabours", "RequestLabourId");
                NavigateToSearchResultKey(Number(Index), Navigate);
            }
        });
    }
})(LaborRequest || (LaborRequest = {}));
//# sourceMappingURL=LaborRequest.js.map