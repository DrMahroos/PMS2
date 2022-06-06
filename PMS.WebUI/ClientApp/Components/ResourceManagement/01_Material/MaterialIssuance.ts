$(document).ready(() => {
    MaterialIssuance.InitalizeComponent();
});
namespace MaterialIssuance {
    var sys: SystemTools = new SystemTools();
    var Grid: JsGrid = new JsGrid();
    const ControllerName: string = "MaterialIssuance";
    const GridInputClassName = "form-control gridIput";
    var columnWidth: string = "100px";
    const NumberColumnWidth = "50px";

    var Master: PQ_GetResMaterialIssue = new PQ_GetResMaterialIssue();
    var DetailsMaterial: Array<PQ_GetResMaterialIssueDetails> = new Array<PQ_GetResMaterialIssueDetails>();

    var txtTrNo: HTMLInputElement;
    var txtReqMat_TrNo: HTMLInputElement;
    var txtPrj_ProjectCode: HTMLInputElement;
    var txtPrj_DescE: HTMLInputElement;
    var txtPhase_ProjectPhaseCode: HTMLInputElement;
    var txtPhase_DescE: HTMLInputElement;
    var txtRemarks: HTMLInputElement;
    var txtTrDate: HTMLInputElement;

    var btnSearchIssueNo: HTMLButtonElement;

    var RequestId: number;
    var ScheduleId: number;
    var SubServiceOrderId: number;
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
        ControlsButtons.PrintAction(() => { PrintMaterialIssuance(); });
        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_compCode, _braCode, Modules.MaterialIssuance, Master.IssueMaterialId.toString());
        });
    }

    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById<HTMLInputElement>("txtTrNo");
        txtReqMat_TrNo = DocumentActions.GetElementById<HTMLInputElement>("txtReqMat_TrNo");
        txtPrj_ProjectCode = DocumentActions.GetElementById<HTMLInputElement>("txtPrj_ProjectCode");
        txtPrj_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPrj_DescE");
        txtPhase_ProjectPhaseCode = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_ProjectPhaseCode");
        txtPhase_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_DescE");
        txtRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtRemarks");
        txtTrDate = DocumentActions.GetElementById<HTMLInputElement>("txtTrDate");

        btnSearchIssueNo = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchIssueNo");
    }

    function InitalizeEvents() {
        btnSearchIssueNo.onclick = btnSearchIssueNo_Clicked;
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("Resm_Bill_material");
        Grid.ElementName = "parent";
        Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
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
            //{ type: "control", width: "7%" }
        ];
        
        Grid.DataSource = DetailsMaterial;
        Grid.Bind();
    }

    function PrintMaterialIssuance() {

        
        Ajax.CallAsync({
            url: Url.Action("PrintMaterialIssuance", "PrintTransaction"),
            data: { TrID: Number(Master.IssueMaterialId) },
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
                
                Master = d.result as PQ_GetResMaterialIssue;
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

    function btnSearchIssueNo_Clicked() {
        
        let Condition: string = "CompCode = " + _compCode + " and BraCode = " + _braCode;
        sys.FindKey(Modules.MaterialIssuance, "btnSearchIssueNo", Condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;

            Ajax.Callsync({
                url: Url.Action("GetRequestById", ControllerName),
                data: { id: id },
                success: (d) => {
                    debugger;
                    Master = d.result as PQ_GetResMaterialIssue;
                    let _Index = GetIndexByUseId(Master.IssueMaterialId, "PQ_GetResMaterialIssue", "IssueMaterialId", "CompCode = " + _compCode + " and BraCode = " + _braCode);
                    NavigateToSearchResultKey(Number(_Index), Navigate);
                }
            });
        });
    }

    function LoadDetails(id: number) {
        
        Ajax.Callsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: id },
            success: (d) => {
                
                DetailsMaterial = d.result as Array<PQ_GetResMaterialIssueDetails>;
                Grid.DataSource = DetailsMaterial;
                for (var itm of DetailsMaterial) {
                    itm.Total =  Number((itm.IssuedQty * itm.UnitCost).toFixed(2));
                }
                Grid.Bind();
            }
        })
    }

    function Display() {
        
        DocumentActions.RenderFromModel(Master);
        LoadDetails(Master.IssueMaterialId);
    }
}