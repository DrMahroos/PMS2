$(document).ready(() => {
    MaterialMonitoring.InitalizeComponent();
});
namespace MaterialMonitoring {
    const ControllerName: string = "MaterialMonitoring";
    var sys: SystemTools = new SystemTools();
    var Grid: JsGrid = new JsGrid();
    var Child: JsGrid = new JsGrid();
    const GridInputClassName = "form-control gridIput";
    var columnWidth: string = "100px";
    const NumberColumnWidth = "50px";

    var DataSource: Array<PQ_GetResRequestMaterialMontoring> = new Array<PQ_GetResRequestMaterialMontoring>();
    var childDataSource: Array<PProc_ResGetMaterialissueReturn_Result> = new Array<PProc_ResGetMaterialissueReturn_Result>();
    //var Master: PQ_GetEngWorkSchduleMaterial = new PQ_GetEngWorkSchduleMaterial();

    var txtSchduleTrNo: HTMLInputElement;
    var txtSchaduleName: HTMLInputElement;
    var txtServiceTrNo: HTMLInputElement;
    var txtServiceName: HTMLInputElement;
    var txtProjectCode: HTMLInputElement;
    var txtProjectName: HTMLInputElement;
    var txtPhaseCode: HTMLInputElement;
    var txtPhaseName: HTMLInputElement;
    var RdServiceOrder: HTMLInputElement;
    var RdScahdule: HTMLInputElement;
    var txtSubContractor: HTMLInputElement;
    var txtSubContractorName: HTMLInputElement;
    var txtSiteEngCode: HTMLInputElement;
    var txtSiteEngName: HTMLInputElement;
    var btnSearchSchadule: HTMLButtonElement;
    var btnSearchServiceOrder: HTMLButtonElement;
    var btnShowData: HTMLButtonElement;

    var _compCode: string;
    var _braCode: string;
    var _screenLang: string;
    var ScheduleId: number;
    var SubServiceOrderId: number;
    export function InitalizeComponent() {
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
        ControlsButtons.SaveAction(
            () => {
                if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                    Insert();
                else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                    Update();
            }
        );
        ControlsButtons.UndoAction(() => { });
        RdScahdule.checked = true;
        $('#btnSearchServiceOrder').attr('disabled', 'disabled');
        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_compCode, _braCode, Modules.MaterialMonitoring, "10");
        });
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("Resm_Material");
        Grid.ElementName = "parent";
        Grid.OnRefreshed = () => {
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
            { title: res.Resm_Material_balanceQty, name: "BalanceQty", type: "label", width: "7.5%" }//,
            //{ type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();

        Child.ElementName = "Child";
        Child.Inserting = SharedSession.CurrentPrivileges.AddNew;
        Child.OnRefreshed = () => {
            $("#Child .jsgrid-edit-button").css("display", "none")
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
        txtSchduleTrNo = DocumentActions.GetElementById<HTMLInputElement>("txtSchduleTrNo");
        txtSchaduleName = DocumentActions.GetElementById<HTMLInputElement>("txtSchaduleName");
        txtServiceTrNo = DocumentActions.GetElementById<HTMLInputElement>("txtServiceTrNo");
        txtServiceName = DocumentActions.GetElementById<HTMLInputElement>("txtServiceName");
        txtProjectCode = DocumentActions.GetElementById<HTMLInputElement>("txtProjectCode");
        txtProjectName = DocumentActions.GetElementById<HTMLInputElement>("txtProjectName");
        txtPhaseCode = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseCode");
        txtPhaseName = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseName");
        RdServiceOrder = DocumentActions.GetElementById<HTMLInputElement>("RdServiceOrder");
        RdScahdule = DocumentActions.GetElementById<HTMLInputElement>("RdScahdule");
        txtSubContractor = DocumentActions.GetElementById<HTMLInputElement>("txtSubContractor");
        txtSubContractorName = DocumentActions.GetElementById<HTMLInputElement>("txtSubContractorName");
        txtSiteEngCode = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngCode");
        txtSiteEngName = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngName");
        btnSearchSchadule = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchSchadule");
        btnSearchServiceOrder = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchServiceOrder");
        btnShowData = DocumentActions.GetElementById<HTMLButtonElement>("btnShowData");
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

        sys.FindKey(Modules.MaterialMonitoring, "btnSearchSchadule", "CompCode = " + _compCode + " and BraCode = " + _braCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEngScheduleSearch", ControllerName),
                data: { id: id },
                success: (d) => {

                    let schadule = d.result as PQ_GetEngWorkSchdule;
                    txtSchduleTrNo.value = schadule.TrNo.toString();
                    txtSchaduleName.value = schadule.WorkDescr;
                    ScheduleId = schadule.ScheduleId;
                    txtProjectCode.value = schadule.Prj_ProjectCode;
                    txtPhaseCode.value = schadule.Phase_ProjectPhaseCode;
                    if (_screenLang == "ar") {
                        txtProjectName.value = schadule.Prj_DescA;
                        txtPhaseName.value = schadule.Phase_DescA;

                    } else {
                        txtProjectName.value = schadule.Prj_DescE;
                        txtPhaseName.value = schadule.Phase_DescE;
                    }
                    btnShowData_Clicked();
                }
            });
        });
    }

    function btnSearchServiceOrder_Clicked() {

        sys.FindKey(Modules.MaterialMonitoring, "btnSearchServiceOrder", "CompCode = " + ClientSharedWork.Session.CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetServiceOrder", ControllerName),
                data: { id: id },
                success: (d) => {

                    let service = d.result as PQ_GetEngSubServiceOrder;
                    SubServiceOrderId = service.SubServiceOrderId
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

                    } else {
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
        } else if (RdServiceOrder.checked == true) {
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
        DataSource = null
        childDataSource = null
        ClearGrid(Grid, DataSource);
        ClearGrid(Child, childDataSource);
    }

    function LoadDetailsSchdule(schaduleId: number) {

        Ajax.Callsync({
            url: Url.Action("LoadDetailsSchdule", ControllerName),
            data: { id: schaduleId },
            success: (d) => {

                DataSource = d.result as Array<PQ_GetResRequestMaterialMontoring>;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        })
    }

    function LoadDetailsSchduleRequest(schaduleId: number) {
        debugger
        Ajax.Callsync({
            url: Url.Action("GetDetailsSchduleRequest", ControllerName),
            data: { schaduleId: schaduleId, SubServiceOrderId: 0 },
            success: (d) => {
                childDataSource = d.result as Array<PProc_ResGetMaterialissueReturn_Result>;
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
                for (var itm of childDataSource) {
                    itm.TrDate = DateFormat(itm.TrDate);
                    itm.Tr_Date = DateFormat(itm.Tr_Date);
                }
                Child.DataSource = childDataSource;
                Child.Bind();
            }
        })
    }

    function LoadDetailsService(serviceId: number) {
        Ajax.Callsync({
            url: Url.Action("LoadDetailsService", ControllerName),
            data: { id: serviceId },
            success: (d) => {
                DataSource = d.result as Array<PQ_GetResRequestMaterialMontoring>;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        })
    }

    function LoadDetailsServiceRequest(serviceId: number) {
        Ajax.Callsync({
            url: Url.Action("GetDetailsSchduleRequest", ControllerName),
            data: { schaduleId: 0, SubServiceOrderId: serviceId },
            success: (d) => {
                childDataSource = d.result as Array<PProc_ResGetMaterialissueReturn_Result>;
                for (var itm of childDataSource) {
                    itm.TrDate = DateFormat(itm.TrDate);
                    itm.Tr_Date = DateFormat(itm.Tr_Date);
                }
                Child.DataSource = childDataSource;
                Child.Bind();
            }
        })
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
        debugger
        DataSource = new Array<PQ_GetResRequestMaterialMontoring>();
        childDataSource = new Array<PProc_ResGetMaterialissueReturn_Result>();
        ClearGrid<PQ_GetResRequestMaterialMontoring>(Grid, DataSource)
        ClearGrid<PProc_ResGetMaterialissueReturn_Result>(Child, childDataSource)

        if (txtSchduleTrNo.value != "" || txtSchaduleName.value != "") {
            LoadDetailsSchdule(ScheduleId);
            LoadDetailsSchduleRequest(ScheduleId);
        }
        else if (txtServiceTrNo.value != "" || txtServiceName.value != "") {
            LoadDetailsService(SubServiceOrderId);
            LoadDetailsServiceRequest(SubServiceOrderId);
        }
    }
}