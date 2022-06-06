$(document).ready(function () {
    EquipmentDefinition.InitalizeComponent();
});
var EquipmentDefinition;
(function (EquipmentDefinition) {
    var ControllerName = "EquipmentDefinition";
    var TableName = "P_D_Equipment";
    var FieldKey = "EquimentID";
    var ActionName = {
        Insert: "Insert",
        Update: "Update",
        Delete: "Delete",
        GetByID: "GetByID"
    };
    var Master;
    var sys = new SystemTools();
    var Area = new G_BRANCH();
    var ProjectPhase = new PQ_GetEngProjectPhase();
    var txtEquipcode;
    var txtEquipClassId;
    var txtEquipClassName;
    var txtDescA;
    var txtDescE;
    var txtPurchaseCost;
    var txtPurchaseDate;
    var txtModel;
    var txtMake;
    var txtMakeType;
    var txtWaranty;
    var txtMaintNotes;
    var txtPlateNo;
    var txtChasisNo;
    var txtEffeciencyPrc;
    var txtHourOprCost;
    var txtHourDeprCost;
    var txtStartServiceDate;
    var txtOutOFServiceDate;
    var txtRemarks;
    var txtProjectID;
    var txtPhaseId;
    var txtHourCost;
    var txtBraCode;
    var txtAreaName;
    var chkIsActive;
    var btnEquipClassId;
    var btnEqClassNo;
    var btnEqArea;
    var EquipClassId;
    var _ScreenLanguage;
    var _CompCode;
    var _BranchCode;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        InitalizeControls();
        InitalizeEvents();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(New);
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.UndoAction(Undo);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.PrintAction(function () {
            OpenReportsPopup("_EquipmentReport");
        });
        ControlsButtons.DeleteAction(Delete);
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.EquipmentDefinition, Master.EquimentID.toString());
        });
    }
    EquipmentDefinition.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtEquipcode = DocumentActions.GetElementById("txtEquipcode");
        txtEquipClassId = DocumentActions.GetElementById("txtEquipClassId");
        txtEquipClassName = DocumentActions.GetElementById("txtEquipClassName");
        txtDescA = DocumentActions.GetElementById("txtDescA");
        txtDescE = DocumentActions.GetElementById("txtDescE");
        txtPurchaseCost = DocumentActions.GetElementById("txtPurchaseCost");
        txtPurchaseDate = DocumentActions.GetElementById("txtPurchaseDate");
        txtModel = DocumentActions.GetElementById("txtModel");
        txtMake = DocumentActions.GetElementById("txtMake");
        txtMakeType = DocumentActions.GetElementById("txtMakeType");
        txtWaranty = DocumentActions.GetElementById("txtWaranty");
        txtMaintNotes = DocumentActions.GetElementById("txtMaintNotes");
        txtPlateNo = DocumentActions.GetElementById("txtPlateNo");
        txtChasisNo = DocumentActions.GetElementById("txtChasisNo");
        txtEffeciencyPrc = DocumentActions.GetElementById("txtEffeciencyPrc");
        txtHourOprCost = DocumentActions.GetElementById("txtHourOprCost");
        txtHourDeprCost = DocumentActions.GetElementById("txtHourDeprCost");
        txtStartServiceDate = DocumentActions.GetElementById("txtStartServiceDate");
        txtOutOFServiceDate = DocumentActions.GetElementById("txtOutOFServiceDate");
        txtRemarks = DocumentActions.GetElementById("txtRemarks");
        txtProjectID = DocumentActions.GetElementById("txtProjectID");
        txtPhaseId = DocumentActions.GetElementById("txtPhaseId");
        txtHourCost = DocumentActions.GetElementById("txtHourCost");
        txtBraCode = DocumentActions.GetElementById("txtBraCode");
        txtAreaName = DocumentActions.GetElementById("txtAreaName");
        chkIsActive = DocumentActions.GetElementById("chkIsActive");
        btnEquipClassId = DocumentActions.GetElementById("btnEquipClassId");
        btnEqClassNo = DocumentActions.GetElementById("btnEqClassNo");
        btnEqArea = DocumentActions.GetElementById("btnEqArea");
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
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == true) {
                        ClientSharedWork.SwitchModes(ScreenModes.Query);
                        var _Data = result.ResponseData;
                        var _Id = _Data.EquimentID;
                        WorningMessage("تم الحفظ بنجاح", "Successfully saved", "الاضافه", "Insert");
                        var _Index = GetIndexByUseId(_Id, TableName, FieldKey, " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    }
                    else {
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
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == true) {
                        ClientSharedWork.SwitchModes(ScreenModes.Query);
                        var _Data = result.ResponseData;
                        var _Id = _Data.EquimentID;
                        Master = GetMasterById(_Id);
                        WorningMessage("تم التعديل بنجاح", "Successfully Edit", "التعديل", "Update");
                        Display();
                    }
                    else {
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
                success: function (d) {
                    var result = d.result;
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
        DocumentActions.AssignToModel(Master);
    }
    function FindTr() {
        sys.FindKey(Modules.EquipmentDefinition, "btnEqClassNo", "CompCode = " + _CompCode, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            var _Index = GetIndexByUseId(_Id, TableName, FieldKey);
            NavigateToSearchResultKey(Number(_Index), Navigate);
        });
    }
    function FindEquipClass() {
        sys.FindKey(Modules.EquipmentDefinition, "btnEquipClassId", "CompCode = " + _CompCode, function () {
            var Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            var _Result = Ajax.Call({ url: Url.Action("GetEquipmentClassByuseId", ControllerName), data: { Id: Id }, });
            EquipClassId = _Result[0].EquipClassId;
            txtEquipClassId.value = _Result[0].ClassCode.toString();
            txtEquipClassName.value = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? _Result[0].DescA : _Result[0].DescE;
        });
    }
    function FindArea() {
        sys.FindKey(Modules.EquipmentDefinition, "btnEqArea", "COMP_CODE = " + _CompCode, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            var area;
            txtBraCode.value = _Id;
            getArea();
        });
    }
    function getArea() {
        Ajax.CallAsync({
            url: Url.Action("getArea", "LaborDefinition"),
            data: { id: Number(txtBraCode.value) },
            success: function (d) {
                Area = d.result;
                txtBraCode.value = Area.BRA_CODE.toString();
                txtAreaName.value = Area.BRA_DESCE.toString();
            }
        });
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: function (d) {
                Master = d.result;
                Display();
                getArea();
            }
        });
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
        }
        else {
            txtProjectID.value = "";
            txtPhaseId.value = "";
        }
        Master.OutOFServiceDate = DateFormat(Master.OutOFServiceDate);
        Master.StartServiceDate = DateFormat(Master.StartServiceDate);
    }
    function GetProjectAndPhase(ProjectId) {
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
    function ValidateData() {
        if (!IsNullOrEmpty(Master.Equipcode)) {
            return false;
        }
        else {
            return true;
        }
    }
    function GetMasterById(_Id) {
        var _Master = Ajax.Call({
            url: Url.Action(ActionName.GetByID, ControllerName),
            data: { _Id: _Id },
        });
        return _Master;
    }
    function Calc() {
        txtHourCost.value = (Number(txtHourOprCost.value) + Number(txtHourDeprCost.value)).toFixed(2).toString();
    }
    function GetEquipCode(id) {
        Ajax.CallAsync({
            url: Url.Action("GetEquipCode", ControllerName),
            data: { id: id },
            success: function (d) {
                var code = d.result;
                txtEquipClassId.value = code.ClassCode;
                if (_ScreenLanguage == "ar") {
                    txtEquipClassName.value = code.DescA;
                }
                else {
                    txtEquipClassName.value = code.DescE;
                }
            }
        });
    }
})(EquipmentDefinition || (EquipmentDefinition = {}));
//# sourceMappingURL=EquipmentDefinition.js.map