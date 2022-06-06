$(document).ready(function () {
    MaterialIssuance.InitalizeComponent();
});
var MaterialIssuance;
(function (MaterialIssuance) {
    var sys = new SystemTools();
    var Grid = new JsGrid();
    var ControllerName = "MaterialIssuance";
    var GridInputClassName = "form-control gridIput";
    var columnWidth = "100px";
    var NumberColumnWidth = "50px";
    var Master = new PQ_GetResMaterialIssue();
    var DetailsMaterial = new Array();
    var txtTrNo;
    var txtReqMat_TrNo;
    var txtPrj_ProjectCode;
    var txtPrj_DescE;
    var txtPhase_ProjectPhaseCode;
    var txtPhase_DescE;
    var txtRemarks;
    var txtTrDate;
    var btnSearchIssueNo;
    var RequestId;
    var ScheduleId;
    var SubServiceOrderId;
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
        ControlsButtons.PrintAction(function () { PrintMaterialIssuance(); });
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_compCode, _braCode, Modules.MaterialIssuance, Master.IssueMaterialId.toString());
        });
    }
    MaterialIssuance.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById("txtTrNo");
        txtReqMat_TrNo = DocumentActions.GetElementById("txtReqMat_TrNo");
        txtPrj_ProjectCode = DocumentActions.GetElementById("txtPrj_ProjectCode");
        txtPrj_DescE = DocumentActions.GetElementById("txtPrj_DescE");
        txtPhase_ProjectPhaseCode = DocumentActions.GetElementById("txtPhase_ProjectPhaseCode");
        txtPhase_DescE = DocumentActions.GetElementById("txtPhase_DescE");
        txtRemarks = DocumentActions.GetElementById("txtRemarks");
        txtTrDate = DocumentActions.GetElementById("txtTrDate");
        btnSearchIssueNo = DocumentActions.GetElementById("btnSearchIssueNo");
    }
    function InitalizeEvents() {
        btnSearchIssueNo.onclick = btnSearchIssueNo_Clicked;
    }
    function InitalizeGrid() {
        var res = GetResourceList("Resm_Bill_material");
        Grid.ElementName = "parent";
        Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
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
        Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
        Grid.Editing = SharedSession.CurrentPrivileges.EDIT;
        Grid.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        Grid.InsertionMode = JsGridInsertionMode.Binding;
        Grid.Columns = [
            { title: res.Resm_Bill_material_itemcode, name: "itm_ItemCode", type: "text", width: "7.5%" },
            { title: res.Resm_Bill_material_itemdesc, name: "itm_DescA", visible: ClientSharedWork.Session.ScreenLanguage == "ar", type: "text", width: "15%" },
            { title: res.Resm_Bill_material_itemdesc, name: "itm_DescE", visible: ClientSharedWork.Session.ScreenLanguage == "en", type: "text", width: "15%" },
            { title: res.Resm_Bill_material_unit, name: "uom_DescA", visible: ClientSharedWork.Session.ScreenLanguage == "ar", type: "text", width: "15%" },
            { title: res.Resm_Bill_material_unit, name: "uom_DescE", visible: ClientSharedWork.Session.ScreenLanguage == "en", type: "text", width: "15%" },
            { title: res.Resm_Bill_material_IssuedQty, name: "IssuedQty", type: "text", width: "7.5%" },
            { title: res.Resm_Bill_material_unitcost, name: "UnitCost", type: "text", width: "7.5%" },
            { title: res.Resm_Bill_material_total, name: "Total", type: "text", width: "7.5%" },
        ];
        Grid.DataSource = DetailsMaterial;
        Grid.Bind();
    }
    function PrintMaterialIssuance() {
        Ajax.CallAsync({
            url: Url.Action("PrintMaterialIssuance", "PrintTransaction"),
            data: { TrID: Number(Master.IssueMaterialId) },
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
    function btnSearchIssueNo_Clicked() {
        var Condition = "CompCode = " + _compCode + " and BraCode = " + _braCode;
        sys.FindKey(Modules.MaterialIssuance, "btnSearchIssueNo", Condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.Callsync({
                url: Url.Action("GetRequestById", ControllerName),
                data: { id: id },
                success: function (d) {
                    debugger;
                    Master = d.result;
                    var _Index = GetIndexByUseId(Master.IssueMaterialId, "PQ_GetResMaterialIssue", "IssueMaterialId", "CompCode = " + _compCode + " and BraCode = " + _braCode);
                    NavigateToSearchResultKey(Number(_Index), Navigate);
                }
            });
        });
    }
    function LoadDetails(id) {
        Ajax.Callsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: id },
            success: function (d) {
                DetailsMaterial = d.result;
                Grid.DataSource = DetailsMaterial;
                for (var _i = 0, DetailsMaterial_1 = DetailsMaterial; _i < DetailsMaterial_1.length; _i++) {
                    var itm = DetailsMaterial_1[_i];
                    itm.Total = Number((itm.IssuedQty * itm.UnitCost).toFixed(2));
                }
                Grid.Bind();
            }
        });
    }
    function Display() {
        DocumentActions.RenderFromModel(Master);
        LoadDetails(Master.IssueMaterialId);
    }
})(MaterialIssuance || (MaterialIssuance = {}));
//# sourceMappingURL=MaterialIssuance.js.map