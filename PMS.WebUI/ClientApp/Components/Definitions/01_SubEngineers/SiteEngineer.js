$(document).ready(function () {
    SiteEngineer.InitalizeComponent();
});
var SiteEngineer;
(function (SiteEngineer) {
    var sys = new SystemTools();
    var Model = new P_D_SiteEngineer();
    var ajaxCall = new AjaxCaller();
    var grid = new JsGrid();
    var dataSource = new Array();
    var CatCode = new P_D_SiteEngCategory();
    var Nationalty = new G_Nationality();
    var Area = new G_BRANCH();
    var txtSiteEngineerId;
    var txtEngCode;
    var txtDescE;
    var txtMobile;
    var txtDescA;
    var txtTel1;
    var txtSpeciality;
    var txtCarPlateNo;
    var txtBasicSalary;
    var txtEmail;
    var txtTotalAllow;
    var txtSiteEngCategoryId;
    //var txtCategCode: HTMLInputElement;
    var txtNationalityID;
    var txtDescECat;
    var txtRemarks;
    var butEngCode;
    var btnArea;
    var butSiteEngCategoryId;
    var butNationalityID;
    var txtNationaltyName;
    var txtBraCode;
    var txtAreaName;
    var PrintButton;
    var Nationalities;
    var NatationalId;
    var BraCode;
    var SiteEngCategoryId;
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
        ajaxCall.ControllerName = "SiteEngineer";
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
        ControlsButtons.PrintAction(function () {
            OpenReportsPopup("_SiteEngReport");
        });
        ControlsButtons.DeleteAction(Delete);
        ControlsButtons.UndoAction(function () { });
        dataSource = Ajax.Call({ url: Url.Action("getSiteEngineer", "SiteEngineer") });
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.SalesEngineer, Model.SiteEngineerId.toString());
        });
    }
    SiteEngineer.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtSiteEngineerId = DocumentActions.GetElementById("txtSiteEngineerId");
        txtEngCode = DocumentActions.GetElementById("txtEngCode");
        txtDescE = DocumentActions.GetElementById("txtDescE");
        txtMobile = DocumentActions.GetElementById("txtMobile");
        txtDescA = DocumentActions.GetElementById("txtDescA");
        txtTel1 = DocumentActions.GetElementById("txtTel1");
        txtSpeciality = DocumentActions.GetElementById("txtSpeciality");
        txtCarPlateNo = DocumentActions.GetElementById("txtCarPlateNo");
        txtBasicSalary = DocumentActions.GetElementById("txtBasicSalary");
        txtRemarks = DocumentActions.GetElementById("txtRemarks");
        txtEmail = DocumentActions.GetElementById("txtEmail");
        txtTotalAllow = DocumentActions.GetElementById("txtTotalAllow");
        txtSiteEngCategoryId = DocumentActions.GetElementById("txtSiteEngCategoryId");
        //txtCategCode = DocumentActions.GetElementById<HTMLInputElement>("txtCategCode");
        txtNationalityID = DocumentActions.GetElementById("txtNationalityID");
        butEngCode = DocumentActions.GetElementById("butEngCode");
        butSiteEngCategoryId = DocumentActions.GetElementById("butSiteEngCategoryId");
        butNationalityID = DocumentActions.GetElementById("butNationalityID");
        txtDescECat = DocumentActions.GetElementById("txtDescECat");
        txtNationaltyName = DocumentActions.GetElementById("txtNationaltyName");
        txtBraCode = DocumentActions.GetElementById("txtBraCode");
        txtAreaName = DocumentActions.GetElementById("txtAreaName");
        btnArea = DocumentActions.GetElementById("btnArea");
    }
    function InitalizeEvents() {
        butEngCode.onclick = btnEngCode_Click;
        butSiteEngCategoryId.onclick = btnCategoryCode_Click;
        butNationalityID.onclick = btnNationalty_Click;
        btnArea.onclick = btnBraCode_Click;
    }
    /**
     * Events
     */
    function btnEngCode_Click() {
        sys.FindKey(Modules.SiteEngineer, "butEngCode", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getEngCode", "SiteEngineer"),
                data: { id: id },
                success: function (d) {
                    Model = d.result;
                    txtEngCode.value = Model.EngCode.toString();
                    var _Index = Number(Model.SiteEngineerId);
                    var ind = GetIndexByUseId(Number(Model.SiteEngineerId), "P_D_SiteEngineer", "SiteEngineerId");
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });
        });
    }
    function btnCategoryCode_Click() {
        sys.FindKey(Modules.SiteEngineer, "butSiteEngCategoryId", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getCategoryCode", "SiteEngineer"),
                data: { id: id },
                success: function (d) {
                    var CatCode = d.result;
                    SiteEngCategoryId = CatCode.SiteEngCategoryId;
                    txtSiteEngCategoryId.value = CatCode.CategCode.toString();
                    if (_ScreenLanguage == "en") {
                        txtDescECat.value = CatCode.DescE.toString();
                    }
                    else {
                        txtDescECat.value = CatCode.DescA.toString();
                    }
                }
            });
        });
    }
    function btnNationalty_Click() {
        sys.FindKey(Modules.Nationalty, "butNationalityID", "COMP_CODE = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getNationalty", "SiteEngineer"),
                data: { id: id },
                success: function (d) {
                    Nationalty = d.result;
                    NatationalId = Nationalty.NationalityID;
                    txtNationalityID.value = Nationalty.NationalityCode.toString();
                    if (_ScreenLanguage == "en") {
                        txtNationaltyName.value = Nationalty.DescL.toString();
                    }
                    else {
                        txtNationaltyName.value = Nationalty.DescA.toString();
                    }
                }
            });
        });
    }
    function btnBraCode_Click() {
        sys.FindKey(Modules.SiteEngineer, "btnArea", "COMP_CODE = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "SiteEngineer"),
                data: { id: id },
                success: function (d) {
                    Area = d.result;
                    BraCode = Area.BRA_CODE;
                    txtBraCode.value = Area.BRA_CODE.toString();
                    if (_ScreenLanguage == "en") {
                        txtAreaName.value = Area.BRA_DESCE.toString();
                    }
                    else {
                        txtAreaName.value = Area.BRA_DESC.toString();
                    }
                }
            });
        });
    }
    /**
     * Fixed Functions
     */
    function Add() {
        ResetFeilds();
        Model.IsActive = true;
    }
    function ResetFeilds() {
        //txtTrDate.value = DateFormat(new Date().toString());
        //txtMemberCode.value = "";
        txtEngCode.value = "";
        txtAreaName.value = "";
        txtDescECat.value = "";
        txtSiteEngCategoryId.value = "";
        txtNationaltyName.value = "";
        txtDescE.value = "";
        //txtCategCode.value = "";
        txtBraCode.value = "";
        txtNationalityID.value = "";
    }
    function Insert() {
        Model = new P_D_SiteEngineer();
        Assign();
        Model.NationalityID = NatationalId;
        Model.BraCode = BraCode;
        Model.SiteEngCategoryId = SiteEngCategoryId;
        Model.IsActive = true;
        for (var i = 0; i < dataSource.length; i++) {
            if (Model.EngCode == dataSource[i].EngCode) {
                WorningMessage("الرجاء عدم تكرار رقم التصنيف", "Please not Repetition Site Eng Category No.");
                return;
            }
        }
        Model.CompCode = Number(_CompCode);
        Ajax.CallAsync({
            url: Url.Action("Insert", "SiteEngineer"),
            data: Model,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم الحفظ بنجاح  ", "Data Saved Successfuly. ");
                    MessageBox.Show(msg, "Insert", function () {
                        var _SalEng = result.ResponseData;
                        var _Index = GetIndexByUseId(_SalEng.SiteEngineerId, "P_D_SiteEngineer", "SiteEngineerId");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
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
        Model.NationalityID = NatationalId;
        Model.BraCode = BraCode;
        Model.SiteEngCategoryId = SiteEngCategoryId;
        Ajax.CallAsync({
            url: Url.Action("Update", "SiteEngineer"),
            data: Model,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Insert", function () {
                        var _SalEng = result.ResponseData;
                        var _Index = GetIndexByUseId(_SalEng.SiteEngineerId, "P_D_SiteEngineer", "SiteEngineerId");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Update");
            }
        });
    }
    function Delete() {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            Ajax.CallAsync({
                url: Url.Action("Delete", "SiteEngineer"),
                data: Model,
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
    //function Delete() {
    //    Assign();
    //    ajaxCall.Delete<P_D_SiteEngineer>(Model, (result) => {
    //        txtSiteEngineerId.value = "";
    //        ResetFeilds();
    //    });
    //}
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", "SiteEngineer"),
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
            url: Url.Action("getCategoryCode", "SiteEngineer"),
            data: { id: Number(Model.SiteEngCategoryId) },
            success: function (d) {
                var CatCode = d.result;
                txtSiteEngCategoryId.value = CatCode.CategCode.toString();
                if (_ScreenLanguage == "ar") {
                    txtDescECat.value = CatCode.DescA.toString();
                }
                else {
                    txtDescECat.value = CatCode.DescE.toString();
                }
            }
        });
    }
    //function getEngCategory() {
    //    
    //    Ajax.CallAsync({
    //        url: Url.Action("getEngCategory", "SiteEngineer"),
    //        data: { id: Number(txtSiteEngCategoryId.value) },
    //        success: (d) => {
    //            let CatCode = d.result as P_D_SiteEngCategory;
    //            //txtSiteEngCategoryId.value = CatCode.CategCode.toString();
    //            txtDescECat.value = CatCode.DescE.toString();
    //        }
    //    })
    //}
    function getEngCode() {
        Ajax.CallAsync({
            url: Url.Action("getEngCode", "SiteEngineer"),
            data: { id: Number(Model.SiteEngCategoryId) },
            success: function (d) {
                var code = d.result;
                txtSiteEngCategoryId.value = code.EngCode;
                if (_ScreenLanguage == "ar") {
                    txtEngCode.value = code.DescA.toString();
                }
                else {
                    txtEngCode.value = code.DescE.toString();
                }
            }
        });
    }
    function getNationality() {
        Ajax.CallAsync({
            url: Url.Action("getNationalty", "SiteEngineer"),
            data: { id: Number(Model.NationalityID) },
            success: function (d) {
                Nationalty = d.result;
                txtNationalityID.value = Nationalty.NationalityCode;
                if (_ScreenLanguage == "ar") {
                    txtNationaltyName.value = Nationalty.DescA.toString();
                }
                else {
                    txtNationaltyName.value = Nationalty.DescL.toString();
                }
            }
        });
    }
    function getArea() {
        Ajax.CallAsync({
            url: Url.Action("getArea", "SiteEngineer"),
            data: { id: Number(Model.BraCode) },
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
    }
    function Display() {
        DocumentActions.RenderFromModel(Model);
        NatationalId = Model.NationalityID;
        BraCode = Model.BraCode;
        SiteEngCategoryId = Model.SiteEngCategoryId;
    }
    function PrintSteEng() {
        if (Model == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("PrintSiteEng", "PrintTransaction"),
            data: { Active: Number(Model.IsActive) },
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
    function OpenReportsPopup(moduleCode) {
        var opt = {
            url: Url.Action("_SiteEngReport", "GeneralReports"),
            success: function (d) {
                var result = d;
                $("#ReportPopupBody").html(result);
                $("#ReportsPopupDialog").modal("show");
                $('#ReportsPopupDialog').modal({
                    refresh: true
                });
                var val = $("#rpTitle").text();
                $("#TitleSpanRep").html(val);
            }
        };
        Ajax.CallAsync(opt);
    }
    SiteEngineer.OpenReportsPopup = OpenReportsPopup;
})(SiteEngineer || (SiteEngineer = {}));
//# sourceMappingURL=SiteEngineer.js.map