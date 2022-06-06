$(document).ready(() => {
    BillOfMaterial.InitalizeComponent();
});
namespace BillOfMaterial {
    const ControllerName: string = "BillOfMaterial";
    var DataSource: Array<PPrc_Res_MaterialRequired_Result> = new Array<PPrc_Res_MaterialRequired_Result>();
    var Grid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    var txtProjectCode: HTMLInputElement;
    var txtProjectName: HTMLInputElement;
    var txtPhaseCode: HTMLInputElement;
    var txtPhaseName: HTMLInputElement;
    var btnSearchProject: HTMLButtonElement;
    var btnSearchPhase: HTMLButtonElement;
    var btnShowRequired: HTMLButtonElement;

    var ProjectId: number;
    var ProjectPhaseId: number;
    var _compCode: string;
    var _braCode: string;
    var _screenLang: string;
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

        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_compCode, _braCode, Modules.BillOfMaterial, "20");
        });

    }

    function InitalizeControls() {
        txtProjectCode = DocumentActions.GetElementById<HTMLInputElement>("txtProjectCode");
        txtProjectName = DocumentActions.GetElementById<HTMLInputElement>("txtProjectName");
        txtPhaseCode = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseCode");
        txtPhaseName = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseName");
        btnSearchProject = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchProject");
        btnSearchPhase = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchPhase");
        btnShowRequired = DocumentActions.GetElementById<HTMLButtonElement>("btnShowRequired");
    }

    function InitalizeEvents() {
        btnSearchProject.onclick = btnSearchProject_Cliked;
        btnSearchPhase.onclick = btnSearchPhase_Cliked;
        btnShowRequired.onclick = btnShowRequired_Cliked;
    }

    function Add() {

    }

    function Edit() {

    }

    function Navigate() {
        
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("Resm_Bill_material");
        Grid.ElementName = "parent";
        Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
        Grid.OnRefreshed = () => {
            $("#Billmaterial .jsgrid-edit-button").css("display", "none")
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
        Grid.Editing = SharedSession.CurrentPrivileges.EDIT;
        Grid.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        Grid.InsertionMode = JsGridInsertionMode.Binding;
        Grid.Columns = [
            { title: res.Resm_Bill_material_itemcode, name: "ItemCode", type: "label", width: "7.5%" },
            { title: res.Resm_Bill_material_itemdesc, visible: ClientSharedWork.Session.Language == "ar", name: "DescA", type: "label", width: "15.5%" },
            { title: res.Resm_Bill_material_unit, visible: ClientSharedWork.Session.Language == "en", name: "DescL", type: "label", width: "15.5%" },
            { title: res.Resm_Bill_material_totalrequired, name: "NetReqQty", type: "label", width: "7.5%" },
            { title: res.Resm_Bill_material_netissued, name: "NetIssQty", type: "label", width: "7.5%" },
            { title: res.Resm_Bill_material_remainqty, name: "RemainQty", type: "label", width: "7.5%" }
            //{ type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
        debugger
        //$("#Billmaterial .jsgrid-edit-button").css("display", "none")

    }

    function Insert() {
        
    }

    function Update() {
        
    }

    function btnSearchProject_Cliked() {
        
        sys.FindKey(Modules.BillOfMaterial, "btnSearchProject", "CompCode = " + _compCode + " and BraCode = " + _braCode + " and Status = 1", () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjectByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as P_TR_EngProject;
                    ProjectId = result.ProjectID;
                    txtProjectCode.value = result.ProjectCode;
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtProjectName.value = result.DescA;
                    }
                    else {
                        txtProjectName.value = result.DescL;
                    }
                }
            });
        })
    }

    function btnSearchPhase_Cliked() {
        
        sys.FindKey(Modules.BillOfMaterial, "btnSearchPhase", " Status = 1 and ProjectID = " + ProjectId, () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjectPhaseByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as P_TR_EngProjectPhase;
                    ProjectPhaseId = result.ProjectPhaseId;
                    txtPhaseCode.value = result.ProjectPhaseCode;
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtPhaseName.value = result.DescA;
                    }
                    else {
                        txtPhaseName.value = result.DescL
                    }
                }
            });
        })
    }

    function PPrc_Res_MaterialRequired(Projectid?: number, phaseID?: number) {
        
        Ajax.Callsync({
            url: Url.Action("PPrc_Res_MaterialRequired", ControllerName),
            data: { Projectid: Projectid, phaseID: phaseID },
            success: (d) => {
                
                DataSource = d.result as Array<PPrc_Res_MaterialRequired_Result>;
                Grid.DataSource = DataSource;
                Grid.Bind();
                debugger
                //$("#Billmaterial .jsgrid-edit-button").css("display", "none")

            }
        })
    }

    function btnShowRequired_Cliked() {
        
        if (isNaN(ProjectId)) {
            WorningMessage("يجب اختيار مشروع على الاقل", "You Should Choose Project at Least");
            return;
        }
        PPrc_Res_MaterialRequired(ProjectId, ProjectPhaseId);
    }
}