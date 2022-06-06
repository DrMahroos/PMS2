$(document).ready(() => {
    EquipmentRequest.InitalizeComponent();
});

namespace EquipmentRequest {
    const ControllerName: string = "EquipmentRequest";
    var Master: PQ_GetResRequestEquipment = new PQ_GetResRequestEquipment();
    var DataSource: Array<PQ_GetEngWorkSchduleEquipClass> = new Array<PQ_GetEngWorkSchduleEquipClass>();

    var GridParent: JsGrid = new JsGrid();
    var GridChild: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();

    var txtTrNo: HTMLInputElement;
    var txtWorkDescr: HTMLInputElement;
    var txtPrj_ProjectCode: HTMLInputElement;
    var txtPrj_DescE: HTMLInputElement;
    var txtPhase_ProjectPhaseCode: HTMLInputElement;
    var txtPhase_DescE: HTMLInputElement;
    var txtTrDate: HTMLInputElement;
    var txtStartDateTime: HTMLInputElement;
    var txtEndDateTime: HTMLInputElement;
    var ChkStatus: HTMLInputElement;
    var btnSearchRequest: HTMLButtonElement;
    //var btnSearchSchdule: HTMLButtonElement;
    var _compCode: string;
    var _braCode: string;
    var _screenLang: string;

    var ScheduleId: number;
    var schd_ProjectID: number;
    var schd_ProjectPhaseId: number;
    export function InitalizeComponent() {
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
        ControlsButtons.SaveAction(
            () => {
                if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                    Insert();
                else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                    Update();
            }
        );
        ControlsButtons.UndoAction(() => { });

        ControlsButtons.PrintAction(() => { PPrnt_Res_EquipmentRequest(); });
        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_compCode, _braCode, Modules.EquipmentRequest, Master.RequestEquipmentId.toString());
        });
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("ResM_Mat_EquipRequest");
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
        txtTrNo = DocumentActions.GetElementById<HTMLInputElement>("txtTrNo");
        txtWorkDescr = DocumentActions.GetElementById<HTMLInputElement>("txtWorkDescr");
        txtPrj_ProjectCode = DocumentActions.GetElementById<HTMLInputElement>("txtPrj_ProjectCode");
        txtPrj_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPrj_DescE");
        txtPhase_ProjectPhaseCode = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_ProjectPhaseCode");
        txtPhase_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_DescE");
        txtTrDate = DocumentActions.GetElementById<HTMLInputElement>("txtTrDate");
        txtStartDateTime = DocumentActions.GetElementById<HTMLInputElement>("txtStartDateTime");
        txtEndDateTime = DocumentActions.GetElementById<HTMLInputElement>("txtEndDateTime");
        ChkStatus = DocumentActions.GetElementById<HTMLInputElement>("ChkStatus");
        btnSearchRequest = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchRequest");
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
                
                Master = d.result as PQ_GetResRequestEquipment;
                Display();
            }
        })
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
        
        sys.FindKey(Modules.EquipmentRequest, "btnSearchRequest", "CompCode = " + _compCode + " and BraCode = " + _braCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEquipRequest", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    Master = d.result as PQ_GetResRequestEquipment;
                    let Index = GetIndexByUseId(Number(Master.RequestEquipmentId), "PQ_GetResRequestEquipment", "RequestEquipmentId", "CompCode = " + _compCode + " and BraCode = " + _braCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }

    function btnSearchSchdule_Clicked() {
        
        sys.FindKey(Modules.EquipmentRequest, "btnSearchSchdule", "CompCode = " + _compCode + " and BraCode = " + _braCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEngSchedule", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    let schadule = d.result as PQ_GetEngWorkSchdule;
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

    function LoadDetails(schduleId: number) {
        
        Ajax.CallAsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: schduleId },
            success: (d) => {
                
                DataSource = d.result as Array<PQ_GetEngWorkSchduleEquipClass>;
                GridParent.DataSource = DataSource;
                GridParent.Bind();
            }
        })
    }
}