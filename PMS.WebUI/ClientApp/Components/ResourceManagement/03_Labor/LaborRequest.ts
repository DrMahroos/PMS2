$(document).ready(() => {
    LaborRequest.InitalizeComponent();
});

namespace LaborRequest {
    const ControllerName: string = "LaborRequest";
    var Master: PQ_GetResRequestLabours = new PQ_GetResRequestLabours();
    var LaborClassDataSource: Array<PQ_GetEngWorkSchduleLaborClass> = new Array<PQ_GetEngWorkSchduleLaborClass>();

    //var DetailsLabour: Array<PQ_GetSalesInvoiceDetail> = new Array<PQ_GetSalesInvoiceDetail>();
    //var DetailsAssignHeaderLabour: PQ_GetSalesInvoiceDetail = new PQ_GetSalesInvoiceDetail();
    //var Tbl_DetailLabour: Array<P_TR_SalesInvoiceDetail> = new Array<P_TR_SalesInvoiceDetail>();

    var txtRequestLabourId: HTMLInputElement;
    var txtTrNo: HTMLInputElement;
    var txtScheduleId: HTMLInputElement;
    var txtWorkDescr: HTMLInputElement;
    var txtPrj_ProjectCode: HTMLInputElement;
    var txtPrj_DescE: HTMLInputElement;
    var txtPhase_ProjectPhaseCode: HTMLInputElement;
    var txtTrDate: HTMLInputElement;
    var txtStartDateTime: HTMLInputElement;
    var txtEndDateTime: HTMLInputElement;
    var ChkStatus: HTMLInputElement;

    var btnSearchRequest: HTMLButtonElement;
    var btnSearchScdule: HTMLButtonElement;

    var _compCode: string;
    var _braCode: string;
    var _screenLang: string;

    var dataSource: Array<PQ_GetEngWorkSchduleLaborClass> = new Array<PQ_GetEngWorkSchduleLaborClass>();
    var GridParent: JsGrid = new JsGrid();
    var GridChild: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    var ajaxCall: AjaxCaller = new AjaxCaller();

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
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
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

        ControlsButtons.PrintAction(() => { PPrnt_Res_LaborRequest(); });
        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_compCode, _braCode, Modules.LaborRequest, Master.RequestLabourId.toString());
        });
    }

    function InitalizeControls() {
        txtRequestLabourId = DocumentActions.GetElementById<HTMLInputElement>("txtRequestLabourId");
        txtTrNo = DocumentActions.GetElementById<HTMLInputElement>("txtTrNo");
        txtScheduleId = DocumentActions.GetElementById<HTMLInputElement>("txtScheduleId");
        txtWorkDescr = DocumentActions.GetElementById<HTMLInputElement>("txtWorkDescr");
        txtPrj_ProjectCode = DocumentActions.GetElementById<HTMLInputElement>("txtPrj_ProjectCode");
        txtPrj_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPrj_DescE");
        txtPhase_ProjectPhaseCode = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_ProjectPhaseCode");
        txtTrDate = DocumentActions.GetElementById<HTMLInputElement>("txtTrDate");
        txtStartDateTime = DocumentActions.GetElementById<HTMLInputElement>("txtStartDateTime");
        txtEndDateTime = DocumentActions.GetElementById<HTMLInputElement>("txtEndDateTime");
        ChkStatus = DocumentActions.GetElementById<HTMLInputElement>("ChkStatus");

        btnSearchRequest = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchRequest");
        btnSearchScdule = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchScdule");
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
        let res: any = GetResourceList("ResM_Mat_laborrequest");
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
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });

    }


    function Navigate() {

        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {

                Master = d.result as PQ_GetResRequestLabours;
                Display();
            }
        })
    }

    function Add() {

    }

    function Display() {

        DocumentActions.RenderFromModel(Master);
        if (!IsNullOrEmpty(txtTrDate.value)) {
            txtTrDate.value = DateFormat(Master.TrDate);
        }
        if (!IsNullOrEmpty(Master.StartDateTime)) {
            debugger

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
        sys.FindKey(Modules.LaborRequest, "butSchedule_Code", "", () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEngScheduleByID", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as PQ_SrcSchdule;
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
        })

    }

    function LoadDetails(id: number) {

        Ajax.CallAsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: id },
            success: (d) => {

                dataSource = d.result as Array<PQ_GetEngWorkSchduleLaborClass>;
                GridParent.DataSource = dataSource;
                GridParent.Bind();
            }
        });
    }

    function btnSearchRequest_Click() {

        sys.FindKey(Modules.LaborRequest, "btnSearchRequest", "CompCode = " + _compCode + " and BraCode = " + _braCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLaborRequest", ControllerName),
                data: { id: id },
                success: (d) => {

                    Master = d.result as PQ_GetResRequestLabours;
                    let Index = GetIndexByUseId(Number(Master.RequestLabourId), "PQ_GetResRequestLabours", "RequestLabourId");
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
                success: (d) => {
                    debugger
                    if (IsNullOrEmpty(d.result)) {
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");

                    }
                    Master = d.result as PQ_GetResRequestLabours;
                    let Index = GetIndexByUseId(Master.RequestLabourId, "PQ_GetResRequestLabours", "RequestLabourId");
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        
    }
}