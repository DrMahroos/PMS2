$(document).ready(function () {
    BillOfMaterial.InitalizeComponent();
});
var BillOfMaterial;
(function (BillOfMaterial) {
    var ControllerName = "BillOfMaterial";
    var DataSource = new Array();
    var Grid = new JsGrid();
    var sys = new SystemTools();
    var txtProjectCode;
    var txtProjectName;
    var txtPhaseCode;
    var txtPhaseName;
    var btnSearchProject;
    var btnSearchPhase;
    var btnShowRequired;
    var ProjectId;
    var ProjectPhaseId;
    var _compCode;
    var _braCode;
    var _screenLang;
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
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_compCode, _braCode, Modules.BillOfMaterial, "20");
        });
    }
    BillOfMaterial.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtProjectCode = DocumentActions.GetElementById("txtProjectCode");
        txtProjectName = DocumentActions.GetElementById("txtProjectName");
        txtPhaseCode = DocumentActions.GetElementById("txtPhaseCode");
        txtPhaseName = DocumentActions.GetElementById("txtPhaseName");
        btnSearchProject = DocumentActions.GetElementById("btnSearchProject");
        btnSearchPhase = DocumentActions.GetElementById("btnSearchPhase");
        btnShowRequired = DocumentActions.GetElementById("btnShowRequired");
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
        var res = GetResourceList("Resm_Bill_material");
        Grid.ElementName = "parent";
        Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
        Grid.OnRefreshed = function () {
            $("#Billmaterial .jsgrid-edit-button").css("display", "none");
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
        debugger;
        //$("#Billmaterial .jsgrid-edit-button").css("display", "none")
    }
    function Insert() {
    }
    function Update() {
    }
    function btnSearchProject_Cliked() {
        sys.FindKey(Modules.BillOfMaterial, "btnSearchProject", "CompCode = " + _compCode + " and BraCode = " + _braCode + " and Status = 1", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjectByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
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
        });
    }
    function btnSearchPhase_Cliked() {
        sys.FindKey(Modules.BillOfMaterial, "btnSearchPhase", " Status = 1 and ProjectID = " + ProjectId, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjectPhaseByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    ProjectPhaseId = result.ProjectPhaseId;
                    txtPhaseCode.value = result.ProjectPhaseCode;
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        txtPhaseName.value = result.DescA;
                    }
                    else {
                        txtPhaseName.value = result.DescL;
                    }
                }
            });
        });
    }
    function PPrc_Res_MaterialRequired(Projectid, phaseID) {
        Ajax.Callsync({
            url: Url.Action("PPrc_Res_MaterialRequired", ControllerName),
            data: { Projectid: Projectid, phaseID: phaseID },
            success: function (d) {
                DataSource = d.result;
                Grid.DataSource = DataSource;
                Grid.Bind();
                debugger;
                //$("#Billmaterial .jsgrid-edit-button").css("display", "none")
            }
        });
    }
    function btnShowRequired_Cliked() {
        if (isNaN(ProjectId)) {
            WorningMessage("يجب اختيار مشروع على الاقل", "You Should Choose Project at Least");
            return;
        }
        PPrc_Res_MaterialRequired(ProjectId, ProjectPhaseId);
    }
})(BillOfMaterial || (BillOfMaterial = {}));
//# sourceMappingURL=BillOfMaterial.js.map