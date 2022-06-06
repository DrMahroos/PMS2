$(document).ready(() => {
    EquipmentDefinition.InitalizeComponent();
});
namespace EquipmentDefinition {

    let ControllerName: string = "EquipmentDefinition";
    const TableName: string = "P_D_Equipment";
    const FieldKey: string = "EquimentID";
    var ActionName = {
        Insert: "Insert",
        Update: "Update",
        Delete: "Delete",
        GetByID: "GetByID"

    }
    var Master: P_D_Equipment;
    var sys: SystemTools = new SystemTools();
    var Area: G_BRANCH = new G_BRANCH();
    var ProjectPhase: PQ_GetEngProjectPhase = new PQ_GetEngProjectPhase();

    var txtEquipcode: HTMLInputElement;
    var txtEquipClassId: HTMLInputElement;
    var txtEquipClassName: HTMLInputElement;
    var txtDescA: HTMLInputElement;
    var txtDescE: HTMLInputElement;
    var txtPurchaseCost: HTMLInputElement;
    var txtPurchaseDate: HTMLInputElement;
    var txtModel: HTMLInputElement;
    var txtMake: HTMLInputElement;
    var txtMakeType: HTMLInputElement;
    var txtWaranty: HTMLInputElement;
    var txtMaintNotes: HTMLInputElement;
    var txtPlateNo: HTMLInputElement;
    var txtChasisNo: HTMLInputElement;
    var txtEffeciencyPrc: HTMLInputElement;
    var txtHourOprCost: HTMLInputElement;
    var txtHourDeprCost: HTMLInputElement;
    var txtStartServiceDate: HTMLInputElement;
    var txtOutOFServiceDate: HTMLInputElement;
    var txtRemarks: HTMLInputElement;
    var txtProjectID: HTMLInputElement;
    var txtPhaseId: HTMLInputElement;
    var txtHourCost: HTMLInputElement;
    var txtBraCode: HTMLInputElement;
    var txtAreaName: HTMLInputElement;
    var chkIsActive: HTMLInputElement;
    var btnEquipClassId: HTMLButtonElement;
    var btnEqClassNo: HTMLButtonElement;
    var btnEqArea: HTMLButtonElement;
    var EquipClassId: number;
    var _ScreenLanguage: string;
    var _CompCode: string;
    var _BranchCode: string;

    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

        InitalizeControls();
        InitalizeEvents();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(New);
        ControlsButtons.SaveAction(() => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.UndoAction(Undo);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.PrintAction(() => {
            OpenReportsPopup("_EquipmentReport");
        });

        ControlsButtons.DeleteAction(Delete);
        $("#ImageEditorButton").on("click", () => {
            
            sys.ImgPopup(_CompCode, _BranchCode, Modules.EquipmentDefinition, Master.EquimentID.toString());
        });
    }

    function InitalizeControls() {
        txtEquipcode = DocumentActions.GetElementById<HTMLInputElement>("txtEquipcode");
        txtEquipClassId = DocumentActions.GetElementById<HTMLInputElement>("txtEquipClassId");
        txtEquipClassName = DocumentActions.GetElementById<HTMLInputElement>("txtEquipClassName");
        txtDescA = DocumentActions.GetElementById<HTMLInputElement>("txtDescA");
        txtDescE = DocumentActions.GetElementById<HTMLInputElement>("txtDescE");
        txtPurchaseCost = DocumentActions.GetElementById<HTMLInputElement>("txtPurchaseCost");
        txtPurchaseDate = DocumentActions.GetElementById<HTMLInputElement>("txtPurchaseDate");
        txtModel = DocumentActions.GetElementById<HTMLInputElement>("txtModel");
        txtMake = DocumentActions.GetElementById<HTMLInputElement>("txtMake");
        txtMakeType = DocumentActions.GetElementById<HTMLInputElement>("txtMakeType");
        txtWaranty = DocumentActions.GetElementById<HTMLInputElement>("txtWaranty");
        txtMaintNotes = DocumentActions.GetElementById<HTMLInputElement>("txtMaintNotes");
        txtPlateNo = DocumentActions.GetElementById<HTMLInputElement>("txtPlateNo");
        txtChasisNo = DocumentActions.GetElementById<HTMLInputElement>("txtChasisNo");
        txtEffeciencyPrc = DocumentActions.GetElementById<HTMLInputElement>("txtEffeciencyPrc");
        txtHourOprCost = DocumentActions.GetElementById<HTMLInputElement>("txtHourOprCost");
        txtHourDeprCost = DocumentActions.GetElementById<HTMLInputElement>("txtHourDeprCost");
        txtStartServiceDate = DocumentActions.GetElementById<HTMLInputElement>("txtStartServiceDate");
        txtOutOFServiceDate = DocumentActions.GetElementById<HTMLInputElement>("txtOutOFServiceDate");
        txtRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtRemarks");
        txtProjectID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectID");
        txtPhaseId = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseId");
        txtHourCost = DocumentActions.GetElementById<HTMLInputElement>("txtHourCost");
        txtBraCode = DocumentActions.GetElementById<HTMLInputElement>("txtBraCode");
        txtAreaName = DocumentActions.GetElementById<HTMLInputElement>("txtAreaName");
        chkIsActive = DocumentActions.GetElementById<HTMLInputElement>("chkIsActive");
        btnEquipClassId = DocumentActions.GetElementById<HTMLButtonElement>("btnEquipClassId");
        btnEqClassNo = DocumentActions.GetElementById<HTMLButtonElement>("btnEqClassNo");
        btnEqArea = DocumentActions.GetElementById<HTMLButtonElement>("btnEqArea");
    }

    function InitalizeEvents() {
        btnEqClassNo.onclick = FindTr;
        btnEquipClassId.onclick = FindEquipClass;
        btnEqArea.onclick = FindArea;
        txtHourOprCost.onkeyup = Calc;
        txtHourDeprCost.onkeyup = Calc;
    }

    function Undo() {
        txtPurchaseDate.value = "";
        txtBraCode.value = "";
        txtAreaName.value = "";
    }

    function New() {
        Master = new P_D_Equipment();
        txtPurchaseDate.value = DateFormat(new Date().toString());
        txtEquipcode.value = "";
        txtEquipClassId.value = "";
        txtEquipClassName.value = "";
        txtProjectID.value = "";
        txtPhaseId.value = "";
        txtBraCode.value = "";
        txtAreaName.value = "";
        Master.IsActive = true;
    }

    function Edit() {

    }

    function Print() {

    }

    function Insert() {
        Assign();
        Master.EquipClassId = EquipClassId;
        Master.IsActive = true;
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            Ajax.CallAsync({
                url: Url.Action(ActionName.Insert, ControllerName),
                data: Master,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == true) {
                        ClientSharedWork.SwitchModes(ScreenModes.Query);
                        let _Data: P_D_Equipment = result.ResponseData as P_D_Equipment;
                        let _Id = _Data.EquimentID as number;
                        WorningMessage("تم الحفظ بنجاح", "Successfully saved", "الاضافه", "Insert");
                        let _Index = GetIndexByUseId(_Id, TableName, FieldKey, " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    } else {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للأضافة", "No permission for Adding");
        }
    }

    function Update() {
        Assign();
        Master.EquipClassId = EquipClassId;
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            Ajax.CallAsync({
                url: Url.Action(ActionName.Update, ControllerName),
                data: Master,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == true) {
                        ClientSharedWork.SwitchModes(ScreenModes.Query);
                        let _Data: P_D_Equipment = result.ResponseData as P_D_Equipment;
                        let _Id = _Data.EquimentID as number;
                        Master = GetMasterById(_Id);
                        WorningMessage("تم التعديل بنجاح", "Successfully Edit", "التعديل", "Update");
                        Display();
                    } else {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للأضافة", "No permission for Adding");
        }
    }

    function Delete() {
        
        if (SharedSession.CurrentPrivileges.Remove == true) {
            Ajax.CallAsync({
                url: Url.Action("Delete", ControllerName),
                data: Master,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show("لا يمكن حذف هذا العنصر", "Delete");
                    }
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Delete", "خطأ", "Error");
        }
    }

    function Assign() {
        DocumentActions.AssignToModel<P_D_Equipment>(Master);
    }

    function FindTr() {
        sys.FindKey(Modules.EquipmentDefinition, "btnEqClassNo", "CompCode = " + _CompCode, () => {
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            let _Index = GetIndexByUseId(_Id, TableName, FieldKey);
            NavigateToSearchResultKey(Number(_Index), Navigate);
        });
    }

    function FindEquipClass() {
        sys.FindKey(Modules.EquipmentDefinition, "btnEquipClassId", "CompCode = " + _CompCode, () => {
            let Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            let _Result = Ajax.Call<P_D_EquipmentClass>({ url: Url.Action("GetEquipmentClassByuseId", ControllerName), data: { Id: Id }, });
            EquipClassId = _Result[0].EquipClassId;
            txtEquipClassId.value = _Result[0].ClassCode.toString();
            txtEquipClassName.value = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? _Result[0].DescA : _Result[0].DescE;
        });
    }

    function FindArea() {
        sys.FindKey(Modules.EquipmentDefinition, "btnEqArea", "COMP_CODE = " + _CompCode, () => {
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            
            let area: G_BRANCH;
            txtBraCode.value = _Id;
            getArea();
        });
    }

    function getArea() {
        
        Ajax.CallAsync({
            url: Url.Action("getArea", "LaborDefinition"),
            data: { id: Number(txtBraCode.value) },
            success: (d) => {
                
                Area = d.result as G_BRANCH;
                txtBraCode.value = Area.BRA_CODE.toString();
                txtAreaName.value = Area.BRA_DESCE.toString();
            }
        })
    }

    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {
                Master = d.result as P_D_Equipment;
                Display();
                getArea();
            }
        })
    }

    function Display() {
        DocumentActions.RenderFromModel(Master);
        Master.PurchaseDate = DateFormat(Master.PurchaseDate);
        txtProjectID.value = SharedPMS.GetProjectNo(1);
        txtPhaseId.value = SharedPMS.GetPhaseNo(Master.PhaseId);
        EquipClassId = Master.EquipClassId;
        GetEquipCode(Master.EquipClassId);
        if (Master.ProjectID != null) {
            GetProjectAndPhase(Master.ProjectID);
        } else {
            txtProjectID.value = "";
            txtPhaseId.value = "";
        }
        Master.OutOFServiceDate = DateFormat(Master.OutOFServiceDate);
        Master.StartServiceDate = DateFormat(Master.StartServiceDate);
    }

    function GetProjectAndPhase(ProjectId: number) {
        //debugger;
        //ProjectPhase = Ajax.Call({ url: Url.Action("GetProjectAndPhase", ControllerName), data: { ProjectId: ProjectId } });
        //debugger;
        //if (ProjectPhase != null) {
        //    txtProjectID.value = ProjectPhase.EngProj_ProjectCode;
        //    txtPhaseId.value = ProjectPhase.ProjectPhaseCode;
        //} else {
        //    txtProjectID.value = "";
        //    txtPhaseId.value = "";
        //}
    }

    function ValidateData(): boolean {
        if (!IsNullOrEmpty(Master.Equipcode)) {
            return false;
        } else {
            return true;
        }
    }

    function GetMasterById(_Id: number): P_D_Equipment {
        let _Master = Ajax.Call<P_D_Equipment>({
            url: Url.Action(ActionName.GetByID, ControllerName),
            data: { _Id: _Id },
        });
        return _Master;
    }

    function Calc() {
        txtHourCost.value = (Number(txtHourOprCost.value) + Number(txtHourDeprCost.value)).toFixed(2).toString();
    }

    function GetEquipCode(id: number) {
        Ajax.CallAsync({
            url: Url.Action("GetEquipCode", ControllerName),
            data: { id : id},
            success: (d) => {
                let code = d.result as P_D_EquipmentClass;
                txtEquipClassId.value = code.ClassCode;
                if (_ScreenLanguage == "ar") {
                    txtEquipClassName.value = code.DescA;
                } else {
                    txtEquipClassName.value = code.DescE;
                }

            }
        })
    }
}


