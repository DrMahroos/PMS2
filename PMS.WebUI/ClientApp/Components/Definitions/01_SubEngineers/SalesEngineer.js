$(document).ready(function () {
    SalesEngineer.InitalizeComponent();
});
var SalesEngineer;
(function (SalesEngineer) {
    var sys = new SystemTools();
    var Model = new P_D_SalesEgineer();
    var ajaxCall = new AjaxCaller();
    var grid = new JsGrid();
    var dataSource = new Array();
    var CatCode = new P_D_SalesEngCateory();
    var Nationalty = new G_Nationality();
    var Area = new G_BRANCH();
    var txtSalesEngineerId;
    var txtEngCode;
    var txtDescE;
    var txtMobile;
    var txtDeacA;
    var txtTel1;
    var txtSpeciality;
    var txtCarPlateNo;
    var txtBasicSalary;
    var txtEmail;
    var txtTotalAllow;
    var txtCatCode;
    var txtCategCode;
    var txtNationalityCode;
    var txtRemarks;
    var butEngCode;
    var btnArea;
    var butSalesEngCategoryId;
    var butNationalityID;
    var txtNationaltyName;
    var txtBraCode;
    var txtAreaName;
    var Nationalities;
    var SetInterval;
    var btnSlsCat;
    var txtBraCodeRp;
    var txtAreaNameRp;
    var btnAreaRp;
    var PrintReport;
    var EngId;
    ClientSharedWork.Session["DisableMenu"] = "True";
    var _ScreenLanguage;
    var _CompCode;
    var _BranchCode;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        ControlsButtons.AddButton.disabled = false;
        ControlsButtons.EditButton.disabled = false;
        ControlsButtons.DeleteButton.disabled = false;
        ControlsButtons.PrintButton.disabled = false;
        InitalizeControls();
        InitalizeEvents();
        ajaxCall.ControllerName = "SalesEngineer";
        SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.EditAction(function () { });
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        //  ControlsButtons.PrintAction(() => { });
        ControlsButtons.DeleteAction(Delete);
        ControlsButtons.UndoAction(function () { });
        ControlsButtons.PrintAction(function () {
            OpenReportsPopup("_SlsEngReport");
        });
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.SalesEngineer, Model.SalesEngineerId.toString());
        });
        //dataSource = Ajax.Call<Array<P_D_SalesEgineer>>({ url: Url.Action("getSalesEngineer", "SalesEngineer") });
    }
    SalesEngineer.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtSalesEngineerId = DocumentActions.GetElementById("txtSalesEngineerId");
        txtEngCode = DocumentActions.GetElementById("txtEngCode");
        txtDescE = DocumentActions.GetElementById("txtDescE");
        txtMobile = DocumentActions.GetElementById("txtMobile");
        txtDeacA = DocumentActions.GetElementById("txtDeacA");
        txtTel1 = DocumentActions.GetElementById("txtTel1");
        txtSpeciality = DocumentActions.GetElementById("txtSpeciality");
        txtCarPlateNo = DocumentActions.GetElementById("txtCarPlateNo");
        txtBasicSalary = DocumentActions.GetElementById("txtBasicSalary");
        txtRemarks = DocumentActions.GetElementById("txtRemarks");
        txtEmail = DocumentActions.GetElementById("txtEmail");
        txtTotalAllow = DocumentActions.GetElementById("txtTotalAllow");
        txtCatCode = DocumentActions.GetElementById("txtCatCode");
        txtCategCode = DocumentActions.GetElementById("txtCategCode");
        txtNationalityCode = DocumentActions.GetElementById("txtNationalityCode");
        butEngCode = DocumentActions.GetElementById("butEngCode");
        butSalesEngCategoryId = DocumentActions.GetElementById("butSalesEngCategoryId");
        butNationalityID = DocumentActions.GetElementById("butNationalityID");
        txtNationaltyName = DocumentActions.GetElementById("txtNationaltyName");
        txtBraCode = DocumentActions.GetElementById("txtBraCode");
        txtAreaName = DocumentActions.GetElementById("txtAreaName");
        btnArea = DocumentActions.GetElementById("btnArea");
        btnSlsCat = DocumentActions.GetElementById("btnSlsCat");
        btnAreaRp = DocumentActions.GetElementById("btnAreaRp");
    }
    function InitalizeEvents() {
        butEngCode.onclick = btnEngCode_Click;
        butSalesEngCategoryId.onclick = btnCategoryCode_Click;
        butNationalityID.onclick = btnNationalty_Click;
        btnArea.onclick = btnBraCode_Click;
    }
    function btnEngCode_Click() {
        sys.FindKey(Modules.SalesEngineer, "butEngCode", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getEngCode", "SalesEngineer"),
                data: { id: id },
                success: function (d) {
                    Model = d.result;
                    txtEngCode.value = Model.EngCode.toString();
                    var _Index = Number(Model.SalesEngineerId);
                    var ind = GetIndexByUseId(Number(Model.SalesEngineerId), "P_D_SalesEgineer", "SalesEngineerId");
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });
        });
    }
    function btnCategoryCode_Click() {
        debugger;
        sys.FindKey(Modules.SalesEngineer, "butSalesEngCategoryId", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getCategoryCode", "SalesEngineer"),
                data: { id: id },
                success: function (d) {
                    CatCode = d.result;
                    $("#txtSalesEngCategoryId").val(id);
                    txtCatCode.value = CatCode.CategCode;
                    txtCategCode.value = _ScreenLanguage == "ar" ? CatCode.DescA : CatCode.DescE;
                }
            });
        });
    }
    function btnNationalty_Click() {
        sys.FindKey(Modules.Nationalty, "butNationalityID", "COMP_CODE = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getNationalty", "SalesEngineer"),
                data: { id: id },
                success: function (d) {
                    Nationalty = d.result;
                    $("#txtNationalityID").val(Nationalty.NationalityID);
                    txtNationalityCode.value = Nationalty.NationalityCode.toString();
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
        sys.FindKey(Modules.SalesEngineer, "btnArea", "COMP_CODE = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "SalesEngineer"),
                data: { id: id },
                success: function (d) {
                    Area = d.result;
                    txtBraCode.value = Area.BRA_CODE.toString();
                    if (_ScreenLanguage == "ar") {
                        txtAreaName.value = Area.BRA_DESC.toString();
                    }
                    else {
                        txtAreaName.value = Area.BRA_DESCL.toString();
                    }
                }
            });
        });
    }
    function Add() {
        ResetFeilds();
    }
    function ResetFeilds() {
        ClearItem();
    }
    function Insert() {
        Model = new P_D_SalesEgineer();
        Assign();
        ClearItem();
        Ajax.Callsync({
            url: Url.Action("Insert", "SalesEngineer"),
            data: Model,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    Model = result.ResponseData;
                    var msgAr = "تم الحفظ بنجاح ";
                    var msgEn = "Data Saved Successfully.";
                    ConfirmMessage(msgEn, msgEn, "Confirm", "Confirm", function () {
                        var ind = GetIndexByUseId(Model.SalesEngineerId, "P_D_SalesEgineer", "SalesEngineerId", "");
                        NavigateToSearchResultKey(Number(ind), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Insert");
            }
        });
    }
    function Assign() {
        Model = DocumentActions.AssignToModel(Model);
    }
    function Update() {
        Assign();
        debugger;
        Ajax.CallAsync({
            url: Url.Action("Update", "SalesEngineer"),
            data: Model,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    Model = result.ResponseData;
                    var msg = ReturnMsg("تم حفظ البيانات  ", "Data Saved  ") + Model.EngCode;
                    MessageBox.Show(msg, "Update", function () {
                        var ind = GetIndexByUseId(Number(Model.SalesEngineerId), "P_D_SalesEgineer", "SalesEngineerId");
                        NavigateToSearchResultKey(Number(ind), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Update");
            }
        });
    }
    function Delete() {
        Assign();
        ajaxCall.Delete(Model, function (result) {
            txtSalesEngineerId.value = "";
            ClearItem();
        });
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", "SalesEngineer"),
            success: function (d) {
                Model = d.result;
                Display();
                getCatCategory();
                getArea();
                getNationality();
            }
        });
    }
    function getCatCategory() {
        Ajax.CallAsync({
            url: Url.Action("getCategoryCode", "SalesEngineer"),
            data: { id: Number(Model.SalesEngCategoryId) },
            success: function (d) {
                CatCode = d.result;
                txtCatCode.value = CatCode.CategCode;
                if (_ScreenLanguage == "ar")
                    txtCategCode.value = CatCode.DescA.toString();
                else
                    txtCategCode.value = CatCode.DescE.toString();
            }
        });
    }
    function getEngCode() {
        Ajax.CallAsync({
            url: Url.Action("getEngCode", "SalesEngineer"),
            data: { id: Number(txtEngCode.value) },
            success: function (d) {
                var laborClass = d.result;
                if (_ScreenLanguage == "ar")
                    txtEngCode.value = laborClass.DeacA.toString();
                else
                    txtEngCode.value = laborClass.DescE.toString();
            }
        });
    }
    function getNationality() {
        Ajax.CallAsync({
            url: Url.Action("getNationalty", "SalesEngineer"),
            data: { id: Number(Model.NationalityID) },
            success: function (d) {
                Nationalty = d.result;
                txtNationalityCode.value = Nationalty.NationalityCode;
                if (Nationalty == null) {
                    txtNationaltyName.value = "";
                }
                else {
                    if (_ScreenLanguage == "ar")
                        txtNationaltyName.value = Nationalty.DescA.toString();
                    else
                        txtNationaltyName.value = Nationalty.DescL.toString();
                }
            }
        });
    }
    function getArea() {
        Ajax.CallAsync({
            url: Url.Action("getArea", "SalesEngineer"),
            data: { id: Number(Model.BraCode) },
            success: function (d) {
                Area = d.result;
                txtBraCode.value = Area.BRA_CODE.toString();
                if (Area == null) {
                    txtAreaName.value = "";
                }
                else {
                    if (_ScreenLanguage == "ar")
                        txtAreaName.value = Area.BRA_DESC.toString();
                    else
                        txtAreaName.value = Area.BRA_DESCE.toString();
                }
            }
        });
    }
    function Display() {
        DocumentActions.RenderFromModel(Model);
    }
    function ClearItem() {
        txtEngCode.value = "";
        txtAreaName.value = "";
        //txtDescECat.value = "";
        txtCatCode.value = "";
        txtNationaltyName.value = "";
        txtSalesEngineerId.value = "";
        txtDescE.value = "";
        txtCategCode.value = "";
        txtBraCode.value = "";
        txtNationalityCode.value = "";
    }
    function PrintSlsEng() {
        if (Model == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("PrintSlsEng", "PrintTransaction"),
            data: { Active: Number(Model.IsActive) },
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
    function ReturnMsg(msg_Ar, msg_En) {
        var _Result = "";
        switch (SharedSession.CurrentEnvironment.ScreenLanguage) {
            case "ar":
                _Result = msg_Ar;
                break;
            case "en":
                _Result = msg_En;
                break;
        }
        return _Result;
    }
})(SalesEngineer || (SalesEngineer = {}));
//# sourceMappingURL=SalesEngineer.js.map