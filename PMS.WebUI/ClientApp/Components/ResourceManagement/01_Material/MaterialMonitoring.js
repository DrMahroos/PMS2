$(document).ready(function () {
    MaterialMonitoring.InitalizeComponent();
});
var MaterialMonitoring;
(function (MaterialMonitoring) {
    var ControllerName = "MaterialMonitoring";
    var sys = new SystemTools();
    var Grid = new JsGrid();
    var Child = new JsGrid();
    var GridInputClassName = "form-control gridIput";
    var columnWidth = "100px";
    var NumberColumnWidth = "50px";
    var DataSource = new Array();
    var childDataSource = new Array();
    //var Master: PQ_GetEngWorkSchduleMaterial = new PQ_GetEngWorkSchduleMaterial();
    var txtSchduleTrNo;
    var txtSchaduleName;
    var txtServiceTrNo;
    var txtServiceName;
    var txtProjectCode;
    var txtProjectName;
    var txtPhaseCode;
    var txtPhaseName;
    var RdServiceOrder;
    var RdScahdule;
    var txtSubContractor;
    var txtSubContractorName;
    var txtSiteEngCode;
    var txtSiteEngName;
    var btnSearchSchadule;
    var btnSearchServiceOrder;
    var btnShowData;
    var _compCode;
    var _braCode;
    var _screenLang;
    var ScheduleId;
    var SubServiceOrderId;
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
        //NavigatorComponent.InitalizeComponent();
        //ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.UndoAction(function () { });
        RdScahdule.checked = true;
        $('#btnSearchServiceOrder').attr('disabled', 'disabled');
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_compCode, _braCode, Modules.MaterialMonitoring, "10");
        });
    }
    MaterialMonitoring.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("Resm_Material");
        Grid.ElementName = "parent";
        Grid.OnRefreshed = function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        //Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
        Grid.Editing = SharedSession.CurrentPrivileges.EDIT;
        Grid.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        Grid.InsertionMode = JsGridInsertionMode.Binding;
        Grid.Columns = [
            { title: res.Resm_Material_Materiallistmatcode, name: "itm_ItemCode", type: "label", width: "7.5%" },
            { title: res.Resm_Material_desc, name: "itm_DescA", visible: ClientSharedWork.Session.ScreenLanguage == "ar", type: "label", width: "15%" },
            { title: res.Resm_Material_desc, name: "itm_DescL", visible: ClientSharedWork.Session.ScreenLanguage == "en", type: "label", width: "15%" },
            { title: res.Resm_Material_Materiallistunit, name: "uom_UomCode", type: "label", width: "7.5%" },
            { title: res.Resm_Material_SechQty, name: "SchedQty", type: "label", width: "7.5%" },
            { title: res.Resm_Material_ReqQty, name: "ReqQty", type: "label", width: "7.5%" },
            { title: res.Resm_Material_issuedQty, name: "IssuedQty", type: "label", width: "7.5%" },
            { title: res.Resm_Material_returnQty, name: "ReturnQty", type: "label", width: "7.5%" },
            { title: res.Resm_Material_balanceQty, name: "BalanceQty", type: "label", width: "7.5%" } //,
            //{ type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
        Child.ElementName = "Child";
        Child.Inserting = SharedSession.CurrentPrivileges.AddNew;
        Child.OnRefreshed = function () {
            $("#Child .jsgrid-edit-button").css("display", "none");
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        Child.Inserting = SharedSession.CurrentPrivileges.AddNew;
        Child.Editing = SharedSession.CurrentPrivileges.EDIT;
        Child.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        Child.InsertionMode = JsGridInsertionMode.Binding;
        Child.Columns = [
            { title: res.Resm_Material_ReqNo, name: "ReqTrNo", type: "text", width: "7.5%" },
            { title: res.Resm_Material_Reqdate, name: "TrDate", type: "text", width: "15%" },
            { title: res.Resm_Material_issueNo, name: "Issue_no", type: "text", width: "7.5%" },
            { title: res.Resm_Material_returnNo, name: "Ret_No", type: "text", width: "7.5%" },
            { title: res.Resm_Material_trdate, name: "Tr_Date", type: "text", width: "7.5%" },
            { title: res.Resm_Material_status, name: "tr_status", type: "text", width: "7.5%" },
            //{ type: "control", width: "7%" }
        ];
        Child.DataSource = childDataSource;
        Child.Bind();
    }
    function InitalizeControls() {
        txtSchduleTrNo = DocumentActions.GetElementById("txtSchduleTrNo");
        txtSchaduleName = DocumentActions.GetElementById("txtSchaduleName");
        txtServiceTrNo = DocumentActions.GetElementById("txtServiceTrNo");
        txtServiceName = DocumentActions.GetElementById("txtServiceName");
        txtProjectCode = DocumentActions.GetElementById("txtProjectCode");
        txtProjectName = DocumentActions.GetElementById("txtProjectName");
        txtPhaseCode = DocumentActions.GetElementById("txtPhaseCode");
        txtPhaseName = DocumentActions.GetElementById("txtPhaseName");
        RdServiceOrder = DocumentActions.GetElementById("RdServiceOrder");
        RdScahdule = DocumentActions.GetElementById("RdScahdule");
        txtSubContractor = DocumentActions.GetElementById("txtSubContractor");
        txtSubContractorName = DocumentActions.GetElementById("txtSubContractorName");
        txtSiteEngCode = DocumentActions.GetElementById("txtSiteEngCode");
        txtSiteEngName = DocumentActions.GetElementById("txtSiteEngName");
        btnSearchSchadule = DocumentActions.GetElementById("btnSearchSchadule");
        btnSearchServiceOrder = DocumentActions.GetElementById("btnSearchServiceOrder");
        btnShowData = DocumentActions.GetElementById("btnShowData");
    }
    function InitalizeEvents() {
        btnSearchSchadule.onclick = btnSearchSchadule_Clicked;
        btnSearchServiceOrder.onclick = btnSearchServiceOrder_Clicked;
        btnShowData.onclick = btnShowData_Clicked;
        RdServiceOrder.onchange = schaduleTypeChange;
        RdScahdule.onchange = schaduleTypeChange;
    }
    function Add() {
    }
    function Edit() {
    }
    function Insert() {
    }
    function Update() {
    }
    function Display() {
        //DocumentActions.RenderFromModel(Master);
        //LoadDetails(Master.ReturnMaterialId);
    }
    function btnSearchSchadule_Clicked() {
        sys.FindKey(Modules.MaterialMonitoring, "btnSearchSchadule", "CompCode = " + _compCode + " and BraCode = " + _braCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEngScheduleSearch", ControllerName),
                data: { id: id },
                success: function (d) {
                    var schadule = d.result;
                    txtSchduleTrNo.value = schadule.TrNo.toString();
                    txtSchaduleName.value = schadule.WorkDescr;
                    ScheduleId = schadule.ScheduleId;
                    txtProjectCode.value = schadule.Prj_ProjectCode;
                    txtPhaseCode.value = schadule.Phase_ProjectPhaseCode;
                    if (_screenLang == "ar") {
                        txtProjectName.value = schadule.Prj_DescA;
                        txtPhaseName.value = schadule.Phase_DescA;
                    }
                    else {
                        txtProjectName.value = schadule.Prj_DescE;
                        txtPhaseName.value = schadule.Phase_DescE;
                    }
                    btnShowData_Clicked();
                }
            });
        });
    }
    function btnSearchServiceOrder_Clicked() {
        sys.FindKey(Modules.MaterialMonitoring, "btnSearchServiceOrder", "CompCode = " + ClientSharedWork.Session.CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetServiceOrder", ControllerName),
                data: { id: id },
                success: function (d) {
                    var service = d.result;
                    SubServiceOrderId = service.SubServiceOrderId;
                    txtProjectCode.value = service.Proj_ProjectCode;
                    txtServiceTrNo.value = service.TrNo.toString();
                    txtProjectCode.value = service.Proj_ProjectCode;
                    txtPhaseCode.value = service.Phase_ProjectPhaseCode;
                    txtSubContractor.value = service.Sc_Code.toString();
                    txtSiteEngCode.value = service.Eng_EngCode;
                    if (_screenLang == "ar") {
                        txtServiceName.value = service.DescA;
                        txtProjectName.value = service.Proj_DescA;
                        txtPhaseName.value = service.Phase_DescA;
                        txtSubContractorName.value = service.Sc_DescA;
                        txtSiteEngName.value = service.Eng_DescA;
                    }
                    else {
                        txtServiceName.value = service.DescE;
                        txtProjectName.value = service.Proj_DescE;
                        txtPhaseName.value = service.Phase_DescL;
                        txtSubContractorName.value = service.Sc_DescE;
                        txtSiteEngName.value = service.Eng_DescE;
                    }
                    btnShowData_Clicked();
                }
            });
        });
    }
    function schaduleTypeChange() {
        if (RdScahdule.checked == true) {
            $('#btnSearchServiceOrder').attr('disabled', 'disabled');
            $('#btnSearchSchadule').removeAttr('disabled');
        }
        else if (RdServiceOrder.checked == true) {
            $('#btnSearchSchadule').attr('disabled', 'disabled');
            $('#btnSearchServiceOrder').removeAttr('disabled');
        }
        txtSchduleTrNo.value = "";
        txtSchaduleName.value = "";
        txtServiceTrNo.value = "";
        txtServiceName.value = "";
        txtProjectCode.value = "";
        txtProjectName.value = "";
        txtPhaseCode.value = "";
        txtPhaseName.value = "";
        txtSubContractor.value = "";
        txtSubContractorName.value = "";
        txtSiteEngCode.value = "";
        txtSiteEngName.value = "";
        DataSource = null;
        childDataSource = null;
        ClearGrid(Grid, DataSource);
        ClearGrid(Child, childDataSource);
    }
    function LoadDetailsSchdule(schaduleId) {
        Ajax.Callsync({
            url: Url.Action("LoadDetailsSchdule", ControllerName),
            data: { id: schaduleId },
            success: function (d) {
                DataSource = d.result;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }
    function LoadDetailsSchduleRequest(schaduleId) {
        debugger;
        Ajax.Callsync({
            url: Url.Action("GetDetailsSchduleRequest", ControllerName),
            data: { schaduleId: schaduleId, SubServiceOrderId: 0 },
            success: function (d) {
                childDataSource = d.result;
                //let _DataSource : PQ_GetResRequestMaterialMontoring =new PQ_GetResRequestMaterialMontoring;
                //for (var item of result) {
                //    _DataSource.ScheduleId = item.ScheduleId;
                //    _DataSource.SubServiceOrderId = item.SubServiceOrderId;
                //    _DataSource.TrNo = item.ReqTrNo;
                //    _DataSource.TrDate = DateFormat(item.TrDate);
                //    _DataSource.IssuedQty = item.Issue_no;
                //    _DataSource.ReturnQty = item.Ret_No;
                //    //_DataSource.TrDate = DateFormat(item.Tr_Date);
                //    _DataSource.Status = Number(item.tr_status);
                //    childDataSource.push(_DataSource)
                //}
                //childDataSource = d.result as Array<PQ_GetResRequestMaterialMontoring>;
                for (var _i = 0, childDataSource_1 = childDataSource; _i < childDataSource_1.length; _i++) {
                    var itm = childDataSource_1[_i];
                    itm.TrDate = DateFormat(itm.TrDate);
                    itm.Tr_Date = DateFormat(itm.Tr_Date);
                }
                Child.DataSource = childDataSource;
                Child.Bind();
            }
        });
    }
    function LoadDetailsService(serviceId) {
        Ajax.Callsync({
            url: Url.Action("LoadDetailsService", ControllerName),
            data: { id: serviceId },
            success: function (d) {
                DataSource = d.result;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }
    function LoadDetailsServiceRequest(serviceId) {
        Ajax.Callsync({
            url: Url.Action("GetDetailsSchduleRequest", ControllerName),
            data: { schaduleId: 0, SubServiceOrderId: serviceId },
            success: function (d) {
                childDataSource = d.result;
                for (var _i = 0, childDataSource_2 = childDataSource; _i < childDataSource_2.length; _i++) {
                    var itm = childDataSource_2[_i];
                    itm.TrDate = DateFormat(itm.TrDate);
                    itm.Tr_Date = DateFormat(itm.Tr_Date);
                }
                Child.DataSource = childDataSource;
                Child.Bind();
            }
        });
        //Ajax.Callsync({
        //    url: Url.Action("LoadDetailsServiceRequest", ControllerName),
        //    data: { id: serviceId },
        //    success: (d) => {
        //        childDataSource = d.result as Array<PQ_GetResRequestMaterialMontoring>;
        //        Child.DataSource = childDataSource;
        //        for (var itm of childDataSource) {
        //            itm.TrDate = DateFormat(itm.TrDate);
        //        }
        //        Child.Bind();
        //    }
        //})
    }
    function btnShowData_Clicked() {
        debugger;
        DataSource = new Array();
        childDataSource = new Array();
        ClearGrid(Grid, DataSource);
        ClearGrid(Child, childDataSource);
        if (txtSchduleTrNo.value != "" || txtSchaduleName.value != "") {
            LoadDetailsSchdule(ScheduleId);
            LoadDetailsSchduleRequest(ScheduleId);
        }
        else if (txtServiceTrNo.value != "" || txtServiceName.value != "") {
            LoadDetailsService(SubServiceOrderId);
            LoadDetailsServiceRequest(SubServiceOrderId);
        }
    }
})(MaterialMonitoring || (MaterialMonitoring = {}));
//# sourceMappingURL=MaterialMonitoring.js.map