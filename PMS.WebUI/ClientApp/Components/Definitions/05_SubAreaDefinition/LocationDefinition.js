$(document).ready(function () {
    LocationDefinition.InitalizeComponent();
});
var LocationDefinition;
(function (LocationDefinition) {
    var ControlerName = "LocationDefinition";
    var TableName = "P_D_Location";
    var FieldKey = "LocationId";
    var sys = new SystemTools();
    var Model = new P_D_Location();
    var ajaxCall = new AjaxCaller();
    var dataSource = new Array();
    var CatCode = new P_D_SalesEngCateory();
    var Area = new G_BRANCH();
    var txtLocCode;
    var butLocCode;
    var txtDescE;
    var txtDescA;
    var txtLocationId;
    var txtRemarks;
    var txtSalesEngineerId;
    var butEngCode;
    var txtDescEEng;
    var txtParentLocationId;
    var butParentLocation;
    var txtDescEPa;
    var chkIsDetail;
    var SalesEngineerId;
    var ParentLocationId;
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
        ajaxCall.ControllerName = "LocationDefinition";
        SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(ClearForm);
        ControlsButtons.EditAction(function () { });
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.PrintAction(function () { PrintRpt(); });
        ControlsButtons.DeleteAction(Delete);
        ControlsButtons.UndoAction(ClearForm);
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.LocationDefinition, Model.LocationId.toString());
        });
    }
    LocationDefinition.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtLocationId = DocumentActions.GetElementById("txtLocationId");
        txtLocCode = DocumentActions.GetElementById("txtLocCode");
        txtDescE = DocumentActions.GetElementById("txtDescE");
        butLocCode = DocumentActions.GetElementById("butLocCode");
        txtDescA = DocumentActions.GetElementById("txtDescA");
        txtRemarks = DocumentActions.GetElementById("txtRemarks");
        txtParentLocationId = DocumentActions.GetElementById("txtParentLocationId");
        butEngCode = DocumentActions.GetElementById("butEngCode");
        butParentLocation = DocumentActions.GetElementById("butParentLocation");
        txtDescEPa = DocumentActions.GetElementById("txtDescEPa");
        chkIsDetail = DocumentActions.GetElementById("chkIsDetail");
        txtSalesEngineerId = DocumentActions.GetElementById("txtSalesEngineerId");
        txtDescEEng = DocumentActions.GetElementById("txtDescEEng");
        butEngCode = DocumentActions.GetElementById("butEngCode");
    }
    function InitalizeEvents() {
        butLocCode.onclick = btnLocCode_Click;
        butEngCode.onclick = btnEngCode_Click;
        butParentLocation.onclick = btnPLoc_Click;
    }
    function btnLocCode_Click() {
        sys.FindKey(Modules.LocationDefinition, "butLocCode", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode, function () {
            debugger;
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            var Index = GetIndexByUseId(Number(id), TableName, FieldKey, "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
            NavigateToSearchResultKey(Number(Index), Navigate);
        });
    }
    function btnEngCode_Click() {
        sys.FindKey(Modules.LocationDefinition, "butEngCode", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getEngCode", ControlerName),
                data: { id: id },
                success: function (d) {
                    var _SalesEgineerResult = d.result;
                    SalesEngineerId = _SalesEgineerResult.SalesEngineerId;
                    txtSalesEngineerId.value = _SalesEgineerResult.EngCode;
                    if (_ScreenLanguage == "ar") {
                        txtDescEEng.value = _SalesEgineerResult.DeacA;
                    }
                    else {
                        txtDescEEng.value = _SalesEgineerResult.DescE;
                    }
                }
            });
        });
    }
    function btnPLoc_Click() {
        sys.FindKey(Modules.LocationDefinition, "butParentLocation", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLoctionById", ControlerName),
                data: { id: id },
                success: function (d) {
                    var result = d.result;
                    ParentLocationId = result.LocationId;
                    txtParentLocationId.value = result.LocCode;
                    if (_ScreenLanguage == "ar") {
                        txtDescEPa.value = result.DescA;
                    }
                    else {
                        txtDescEPa.value = result.DescE;
                    }
                }
            });
        });
    }
    function Insert() {
        Model = new P_D_Location();
        Assign();
        Model.SalesEngineerId = SalesEngineerId;
        Model.ParentLocationId = ParentLocationId;
        Model.CompCode = Number(_CompCode);
        Model.BraCode = Number(_BranchCode);
        debugger;
        var res = check();
        console.log(res);
        if (res != "") {
            MessageBox.Show("الكود موجود من قبل", "");
            return;
        }
        Ajax.Callsync({
            url: Url.Action("Insert", ControlerName),
            data: Model,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var res_1 = result.ResponseData;
                    var msg1 = ReturnMsg(" ادخال   ", "Insert  ");
                    var msg = ReturnMsg("تم الحفظ بنجاح ", "Data Saved Successfully.");
                    MessageBox.Show(msg, msg1, function () {
                        Model.LocationId = res_1.LocationId;
                        var _Index = GetIndexByUseId(Number(Model.LocationId), TableName, FieldKey);
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
    function check() {
        debugger;
        var xresult = "";
        Ajax.Callsync({
            url: Url.Action("Getrepet", ControlerName),
            data: {
                code: Model.LocCode
            },
            success: function (d) {
                var result = d;
                xresult = result;
            }
        });
        return xresult;
    }
    function Update() {
        Model = new P_D_Location;
        Assign();
        if (loccodebeforupdate != txtLocCode.value) {
            var res2 = check();
            if (res2) {
                MessageBox.Show("الكود موجود من قبل", "");
                return;
            }
        }
        if (Model.LocationId == Number(txtParentLocationId.value)) {
            WorningMessage("LocationId==ParentLocationId من فضلك لايمكن ان  ", "Plesea Not LocationId==ParentLocationId");
            txtParentLocationId.value = "";
            txtDescEPa.value = "";
            return;
        }
        Model.SalesEngineerId = SalesEngineerId;
        Model.ParentLocationId = ParentLocationId;
        Model.BraCode = Number(_BranchCode);
        Ajax.CallAsync({
            url: Url.Action("Update", ControlerName),
            data: Model,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var res_2 = result.ResponseData;
                    var msg = ReturnMsg("تم حفظ البيانات  ", "Data Saved . ") + res_2.LocCode.toString();
                    var msg1 = ReturnMsg(" تعديل   ", "Edit  ");
                    txtLocationId.value = res_2.LocationId.toString();
                    MessageBox.Show(msg, msg1, function () {
                        Model.LocationId = res_2.LocationId;
                        var _Index = GetIndexByUseId(Number(Model.LocationId), TableName, FieldKey);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
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
            Model.ParentLocationId = Model.ParentLocationId;
            ClearForm();
        });
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControlerName),
            success: function (d) {
                Model = d.result;
                Display();
            }
        });
    }
    function GetLoactionCode(LocationId) {
        var _Result = Ajax.Call({
            url: Url.Action("GetLocationByCode", ControlerName),
            data: { Code: LocationId }
        });
        txtParentLocationId.value = _Result.LocCode;
        txtDescEPa.value = _Result.DescE;
    }
    function GetEng(endId) {
        var _Result = Ajax.Call({
            url: Url.Action("getEngCode", ControlerName),
            data: { id: Number(endId) }
        });
        txtSalesEngineerId.value = _Result.EngCode;
        txtDescEEng.value = _Result.DescE;
    }
    var loccodebeforupdate = "";
    function Display() {
        DocumentActions.RenderFromModel(Model);
        loccodebeforupdate = Model.LocCode;
        if (Model.SalesEngineerId != null) {
            GetEng(Model.SalesEngineerId);
            if (Model.ParentLocationId != null) {
                GetLoactionCode(Model.ParentLocationId);
            }
            txtLocCode.value = Model.LocCode;
            txtDescA.value = Model.DescA;
            txtDescE.value = Model.DescE;
        }
    }
    function PrintRpt() {
        if (Model == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("PrintDefLocation", "PrintTransaction"),
            data: { bra: Number(Model.BraCode) },
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
    function ClearForm() {
        butLocCode.value = "";
        txtLocationId.value = "";
        txtSalesEngineerId.value = "";
        txtDescEEng.value = "";
        txtParentLocationId.value = "";
        txtDescEPa.value = "";
    }
})(LocationDefinition || (LocationDefinition = {}));
//# sourceMappingURL=LocationDefinition.js.map