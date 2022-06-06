$(document).ready(() => {
    MaterialReturn.InitalizeComponent();
});
namespace MaterialReturn {
    var sys: SystemTools = new SystemTools();
    var Grid: JsGrid = new JsGrid();
    const ControllerName: string = "MaterialReturn";
    const GridInputClassName = "form-control gridIput";
    var columnWidth: string = "100px";
    const NumberColumnWidth = "50px";

    var Master: PQ_GetResMaterialReturned = new PQ_GetResMaterialReturned();
    var DetailsReturn: Array<PQ_GetResMaterialReturnedDetails> = new Array<PQ_GetResMaterialReturnedDetails>();

    var txtTrNo: HTMLInputElement;
    var ReqMat_TrNo: HTMLInputElement;
    var txtPrj_ProjectCode: HTMLInputElement;
    var txtPrj_DescE: HTMLInputElement;
    var txtPhase_ProjectPhaseCode: HTMLInputElement;
    var txtPhase_DescE: HTMLInputElement;
    var txtRemarks: HTMLInputElement;
    var txtTrDate: HTMLInputElement;
    var btnSearchReturnedNo: HTMLButtonElement;

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
        ControlsButtons.PrintAction(() => { PrintMaterialReturn(); });
        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_compCode, _braCode, Modules.MaterialReturn, Master.ReturnMaterialId.toString());
        });
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("Resm_Bill_material");
        Grid.ElementName = "parent";
        Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
        Grid.OnRefreshed = () => {
            $("#parent .jsgrid-edit-button").css("display", "none")
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
            { title: res.Resm_Bill_material_itemdesc, name: "itm_DescL", visible: ClientSharedWork.Session.ScreenLanguage == "en", type: "text", width: "15%" },
            { title: res.Resm_Bill_material_unit, name: "uom_DescA", visible: ClientSharedWork.Session.ScreenLanguage == "ar", type: "text", width: "7.5%" },
            { title: res.Resm_Bill_material_unit, name: "uom_DescE", visible: ClientSharedWork.Session.ScreenLanguage == "en", type: "text", width: "7.5%" },
            { title: res.Resm_Bill_material_ReturnQty, name: "ReturndQty", type: "text", width: "7.5%" },
            { title: res.Resm_Bill_material_unitcost, name: "UnitCost", type: "text", width: "7.5%" },
            { title: res.Resm_Bill_material_total, name: "Total", type: "text", width: "7.5%" }//,
            //{ type: "control", width: "7%" }
        ];
        Grid.DataSource = DetailsReturn;
        Grid.Bind();
    }

    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById<HTMLInputElement>("txtTrNo");
        ReqMat_TrNo = DocumentActions.GetElementById<HTMLInputElement>("ReqMat_TrNo");
        txtPrj_ProjectCode = DocumentActions.GetElementById<HTMLInputElement>("txtPrj_ProjectCode");
        txtPrj_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPrj_DescE");
        txtPhase_ProjectPhaseCode = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_ProjectPhaseCode");
        txtPhase_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_DescE");
        txtRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtRemarks");
        txtTrDate = DocumentActions.GetElementById<HTMLInputElement>("txtTrDate");
        btnSearchReturnedNo = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchReturnedNo");
    }

    function InitalizeEvents() {
        btnSearchReturnedNo.onclick = btnSearchReturnedNo_Clicked;
    }

    function PrintMaterialReturn() {

        
        Ajax.CallAsync({
            url: Url.Action("PrintMaterialReturn", "PrintTransaction"),
            data: { TrID: Number(Master.ReturnMaterialId) },
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
                
                Master = d.result as PQ_GetResMaterialReturned;
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

    function Display() {
        
        DocumentActions.RenderFromModel(Master);
        LoadDetails(Master.ReturnMaterialId);
    }

    function LoadDetails(id: number) {
        Ajax.Callsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: id },
            success: (d) => {
                DetailsReturn = d.result as Array<PQ_GetResMaterialReturnedDetails>;
                for (var itm of DetailsReturn) {
                    itm.Total = itm.ReturndQty * itm.UnitCost;
                }
                Grid.DataSource = DetailsReturn;
                Grid.Bind();
            }
        })
    }

    function btnSearchReturnedNo_Clicked() {
        
        let Condition: string = "CompCode = " + _compCode + " and BraCode = " + _braCode;
        sys.FindKey(Modules.MaterialReturn, "btnSearchReturnedNo", Condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetRequestById", ControllerName),
                data: { id: id },
                success: (d) => {
                    Master = d.result as PQ_GetResMaterialReturned;
                    let _Index = GetIndexByUseId(Master.ReturnMaterialId, "PQ_GetResMaterialReturned", "ReturnMaterialId", "CompCode = " + _compCode + " and BraCode = " + _braCode);
                    NavigateToSearchResultKey(Number(_Index), Navigate);
                }
            });
        });
    }
}