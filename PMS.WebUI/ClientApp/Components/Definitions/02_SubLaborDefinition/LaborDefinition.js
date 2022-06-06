$(document).ready(function () {
    LaborDefinition.InitalizeComponent();
});
var LaborDefinition;
(function (LaborDefinition) {
    var DataSource = new Array();
    var Grid = new JsGrid();
    var sys = new SystemTools();
    var Master = new P_D_Labor();
    var laborCat = new P_D_LaborCategory();
    var laborClass = new P_D_LaborClass();
    var Nationalty = new G_Nationality();
    var Area = new G_BRANCH();
    var ProjectPhase = new PQ_GetEngProjectPhase();
    var ControllerName = "LaborDefinition";
    var txtLaborCode;
    var txtDescE;
    var txtDescA;
    var txtBasicSalary;
    var txtTotalAllow;
    var txtLaborCategoryId;
    var txtLaborCategoryName;
    var txtLaborClassId;
    var txtLaborClassName;
    var txtBraCode;
    var txtAreaName;
    var txtNationalityID;
    var txtNationaltyName;
    var txtRemarks;
    var txtMobile;
    var txtTel1;
    var txtEmail;
    var txtCarPlateNo;
    var txtProjectID;
    var txtPhaseId;
    var chkIsActive;
    var btnSearchLaborCode;
    var btnCategoryCode;
    var btnClassCode;
    var btnBraCode;
    var btnNationalty;
    var BraCode;
    var NationalityID;
    var LaborClassId;
    var LaborCategoryId;
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
        ControlsButtons.DeleteAction(Delete);
        ControlsButtons.UndoAction(Undo);
        debugger;
        ControlsButtons.PrintAction(function () { OpenReportsPopup("_LaborReport"); });
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.Labor, Master.LaborID.toString());
        });
    }
    LaborDefinition.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtLaborCode = DocumentActions.GetElementById("txtLaborCode");
        txtDescE = DocumentActions.GetElementById("txtDescE");
        txtDescA = DocumentActions.GetElementById("txtDescA");
        txtBasicSalary = DocumentActions.GetElementById("txtBasicSalary");
        txtTotalAllow = DocumentActions.GetElementById("txtTotalAllow");
        txtLaborCategoryId = DocumentActions.GetElementById("txtLaborCategoryId");
        txtLaborCategoryName = DocumentActions.GetElementById("txtLaborCategoryName");
        txtLaborClassId = DocumentActions.GetElementById("txtLaborClassId");
        txtLaborClassName = DocumentActions.GetElementById("txtLaborClassName");
        txtBraCode = DocumentActions.GetElementById("txtBraCode");
        txtAreaName = DocumentActions.GetElementById("txtAreaName");
        txtNationalityID = DocumentActions.GetElementById("txtNationalityID");
        txtNationaltyName = DocumentActions.GetElementById("txtNationaltyName");
        txtRemarks = DocumentActions.GetElementById("txtRemarks");
        txtMobile = DocumentActions.GetElementById("txtMobile");
        txtTel1 = DocumentActions.GetElementById("txtTel1");
        txtEmail = DocumentActions.GetElementById("txtEmail");
        txtCarPlateNo = DocumentActions.GetElementById("txtCarPlateNo");
        txtProjectID = DocumentActions.GetElementById("txtProjectID");
        txtPhaseId = DocumentActions.GetElementById("txtPhaseId");
        chkIsActive = DocumentActions.GetElementById("chkIsActive");
        btnSearchLaborCode = DocumentActions.GetElementById("btnSearchLaborCode");
        btnCategoryCode = DocumentActions.GetElementById("btnCategoryCode");
        btnClassCode = DocumentActions.GetElementById("btnClassCode");
        btnBraCode = DocumentActions.GetElementById("btnBraCode");
        btnNationalty = DocumentActions.GetElementById("btnNationalty");
    }
    function InitalizeEvents() {
        btnSearchLaborCode.onclick = btnSearchLaborCode_Click;
        btnCategoryCode.onclick = btnCategoryCode_Click;
        btnClassCode.onclick = btnClassCode_Click;
        btnNationalty.onclick = btnNationalty_Click;
        btnBraCode.onclick = btnBraCode_Click;
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", "LaborDefinition"),
            success: function (d) {
                Master = d.result;
                Display();
            }
        });
    }
    function getCatCategory() {
        Ajax.CallAsync({
            url: Url.Action("getLaborCategory", "LaborDefinition"),
            data: { id: Number(Master.LaborCategoryId) },
            success: function (d) {
                laborCat = d.result;
                txtLaborCategoryId.value = laborCat.CategCode;
                if (_ScreenLanguage == "ar") {
                    txtLaborCategoryName.value = laborCat.DescA.toString();
                }
                else {
                    txtLaborCategoryName.value = laborCat.DescE.toString();
                }
            }
        });
    }
    function getCatClass() {
        Ajax.CallAsync({
            url: Url.Action("getLaborClass", "LaborDefinition"),
            data: { id: Number(Master.LaborClassId) },
            success: function (d) {
                laborClass = d.result;
                txtLaborClassId.value = laborClass.ClassCode;
                if (_ScreenLanguage == "ar") {
                    txtLaborClassName.value = laborClass.DescA.toString();
                }
                else {
                    txtLaborClassName.value = laborClass.DescE.toString();
                }
            }
        });
    }
    function getNationality() {
        Ajax.CallAsync({
            url: Url.Action("getNationalty", "LaborDefinition"),
            data: { id: Number(Master.NationalityID) },
            success: function (d) {
                Nationalty = d.result;
                txtNationalityID.value = Nationalty.NationalityCode;
                if (_ScreenLanguage == "ar") {
                    txtNationaltyName.value = Nationalty.DescA;
                }
                else {
                    txtNationaltyName.value = Nationalty.DescL;
                }
            }
        });
    }
    function getArea() {
        Ajax.CallAsync({
            url: Url.Action("getArea", "LaborDefinition"),
            data: { id: Number(Master.BraCode) },
            success: function (d) {
                Area = d.result;
                txtBraCode.value = Area.BRA_CODE.toString();
                if (_ScreenLanguage == "ar") {
                    txtAreaName.value = Area.BRA_DESC.toString();
                }
                else {
                    txtAreaName.value = Area.BRA_DESCE.toString();
                }
            }
        });
    }
    function GetProjectAndPhase(ProjectId) {
        ////debugger;
        ////ProjectPhase = Ajax.Call({ url: Url.Action("GetProjectAndPhase", ControllerName), data: { ProjectId: ProjectId } });
        ////debugger;
        ////if (ProjectPhase != null) {
        ////    txtProjectID.value = ProjectPhase.EngProj_ProjectCode;
        ////    txtPhaseId.value = ProjectPhase.ProjectPhaseCode;
        ////} else {
        ////    txtProjectID.value = "";
        ////    txtPhaseId.value = "";
        ////}
    }
    function Delete() {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            Ajax.CallAsync({
                url: Url.Action("Delete", "LaborDefinition"),
                data: Master,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                    }
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Delete", "خطأ", "Error");
        }
    }
    function Add() {
        chkIsActive.checked = true;
        txtLaborCategoryId.value = "";
        txtLaborCategoryName.value = "";
        txtLaborClassId.value = "";
        txtLaborClassName.value = "";
        txtBraCode.value = "";
        txtAreaName.value = "";
        txtNationalityID.value = "";
        txtNationaltyName.value = "";
    }
    function Insert() {
        Master = new P_D_Labor();
        Assign();
        Master.BraCode = BraCode;
        Master.NationalityID = NationalityID;
        Master.LaborClassId = LaborClassId;
        Master.LaborCategoryId = LaborCategoryId;
        Master.CompCode = Number(_CompCode);
        Ajax.CallAsync({
            url: Url.Action("Insert", "LaborDefinition"),
            data: Master,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم الحفظ بنجاح  ", "Data Saved Successfuly. ");
                    MessageBox.Show(msg, "ادخال بيانات جديدة", function () {
                        Display();
                        var _Index = GetIndexByUseId(result.ResponseData.LaborID, "P_D_Labor", "LaborID");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        });
    }
    function Update() {
        Assign();
        Master.BraCode = BraCode;
        Master.NationalityID = NationalityID;
        Master.LaborClassId = LaborClassId;
        Master.LaborCategoryId = LaborCategoryId;
        Master.CompCode = Number(_CompCode);
        Ajax.CallAsync({
            url: Url.Action("Update", "LaborDefinition"),
            data: Master,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Insert", function () {
                        var _Index = GetIndexByUseId(result.ResponseData.LaborID, "P_D_Labor", "LaborID");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        });
    }
    function Display() {
        debugger;
        DocumentActions.RenderFromModel(Master);
        BraCode = Master.BraCode;
        NationalityID = Master.NationalityID;
        LaborClassId = Master.LaborClassId;
        LaborCategoryId = Master.LaborCategoryId;
        debugger;
        if (Master.ProjectID != null) {
            GetProjectAndPhase(Master.ProjectID);
        }
        else {
            txtProjectID.value = "";
            txtPhaseId.value = "";
        }
        getCatCategory();
        getCatClass();
        getNationality();
        getArea();
    }
    function Assign() {
        Master = DocumentActions.AssignToModel(Master);
    }
    function Edit() {
    }
    function Undo() {
        txtLaborCategoryId.value = "";
        txtLaborCategoryName.value = "";
        txtLaborClassId.value = "";
        txtLaborClassName.value = "";
        txtBraCode.value = "";
        txtAreaName.value = "";
        txtNationalityID.value = "";
        txtNationaltyName.value = "";
    }
    function btnSearchLaborCode_Click() {
        sys.FindKey(Modules.Labor, "btnSearchLaborCode", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getLaborCode", "LaborDefinition"),
                data: { id: id },
                success: function (d) {
                    Master = d.result;
                    txtLaborCode.value = Master.LaborCode.toString();
                    var _Index = Number(d.result);
                    NavigateToSearchResultKey(Number(Master.LaborID), Navigate);
                }
            });
        });
    }
    function btnCategoryCode_Click() {
        sys.FindKey(Modules.laborCategory, "btnCategoryCode", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger;
            Ajax.CallAsync({
                url: Url.Action("getLaborCategory", "LaborDefinition"),
                data: { id: id },
                success: function (d) {
                    debugger;
                    laborCat = d.result;
                    LaborCategoryId = laborCat.LaborCategoryId;
                    txtLaborCategoryId.value = laborCat.CategCode;
                    txtLaborCategoryName.value = _ScreenLanguage == "ar" ? laborCat.DescA : laborCat.DescE;
                }
            });
        });
    }
    function btnClassCode_Click() {
        sys.FindKey(Modules.laborClass, "btnClassCode", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getLaborClass", "LaborDefinition"),
                data: { id: id },
                success: function (d) {
                    laborClass = d.result;
                    LaborClassId = laborClass.LaborClassId;
                    txtLaborClassId.value = laborClass.ClassCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtLaborClassName.value = laborClass.DescA.toString();
                    }
                    else {
                        txtLaborClassName.value = laborClass.DescE.toString();
                    }
                }
            });
        });
    }
    function btnNationalty_Click() {
        sys.FindKey(Modules.Nationalty, "btnNationalty", "COMP_CODE = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getNationalty", "LaborDefinition"),
                data: { id: id },
                success: function (d) {
                    Nationalty = d.result;
                    NationalityID = Nationalty.NationalityID;
                    txtNationalityID.value = Nationalty.NationalityCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtNationaltyName.value = Nationalty.DescA.toString();
                    }
                    else {
                        txtNationaltyName.value = Nationalty.DescL.toString();
                    }
                }
            });
        });
    }
    function btnBraCode_Click() {
        sys.FindKey(Modules.laborArea, "btnLaborArea", "COMP_CODE = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "LaborDefinition"),
                data: { id: id },
                success: function (d) {
                    Area = d.result;
                    BraCode = Area.BRA_CODE;
                    txtBraCode.value = Area.BRA_CODE.toString();
                    if (_ScreenLanguage == "ar") {
                        txtAreaName.value = Area.BRA_DESC.toString();
                    }
                    else {
                        txtAreaName.value = Area.BRA_DESCE.toString();
                    }
                }
            });
        });
    }
})(LaborDefinition || (LaborDefinition = {}));
//# sourceMappingURL=LaborDefinition.js.map