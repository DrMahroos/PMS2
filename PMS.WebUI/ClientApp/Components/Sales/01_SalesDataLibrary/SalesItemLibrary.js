$(document).ready(function () {
    SalesItemLibrary.InitalizeComponent();
});
var SalesItemLibrary;
(function (SalesItemLibrary) {
    var ControllerName = "SalesItemLibrary";
    var TableName = "P_D_SalesItems";
    var FieldKey = "ItemID";
    var GridInputClassName = "form-control gridIput";
    var columnWidth = "100px";
    var NumberColumnWidth = "50px";
    var sys = new SystemTools();
    var Master = new PQ_GetSalesItem();
    var txtItemCode;
    var txtDescE;
    var txtDescA;
    var txtTechDescE;
    var txtTechDescA;
    var txtParentItemCode;
    var txtDescAPa;
    var txtUomCode;
    var txtUomName;
    var txtScopeCode;
    var txtScopeName;
    var txtItemLevel;
    var txtStdPrice;
    var txtMinUnitPrice;
    var txtUnitPrice;
    var ChkIsActive;
    var ChkIsDetail;
    var ChkIsEditable;
    var btnCode;
    var btnUomID;
    var btnSearchScop;
    var btnSearchParent;
    var parentid;
    var uomId;
    var scopId;
    var _ScreenLang;
    var _CompCode;
    var _BraCode;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BraCode = SharedSession.CurrentEnvironment.BranchCode;
        InitalizeControls();
        InitalizeEvents();
        SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.UndoAction(function () { });
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                SaveNewData();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.EditAction(function () { });
        //ControlsButtons.DeleteAction(Delete);
        ControlsButtons.UndoAction(Clear);
        ControlsButtons.PrintAction(function () { OpenReportsPopup("_SLsItemReport"); });
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BraCode, Modules.SalesItemLibrary, Master.ItemID.toString());
        });
    }
    SalesItemLibrary.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        // Initialize TextBoxs 
        txtItemCode = DocumentActions.GetElementById("txtItemCode");
        txtDescE = DocumentActions.GetElementById("txtDescE");
        txtDescA = DocumentActions.GetElementById("txtDescA");
        txtTechDescE = DocumentActions.GetElementById("txtTechDescE");
        txtTechDescA = DocumentActions.GetElementById("txtTechDescA");
        txtParentItemCode = DocumentActions.GetElementById("txtParentItemCode");
        txtDescAPa = DocumentActions.GetElementById("txtDescAPa");
        txtUomCode = DocumentActions.GetElementById("txtUomCode");
        txtUomName = DocumentActions.GetElementById("txtUomName");
        txtScopeCode = DocumentActions.GetElementById("txtScopeCode");
        txtScopeName = DocumentActions.GetElementById("txtScopeName");
        txtItemLevel = DocumentActions.GetElementById("txtItemLevel");
        txtStdPrice = DocumentActions.GetElementById("txtStdPrice");
        txtMinUnitPrice = DocumentActions.GetElementById("txtMinUnitPrice");
        txtUnitPrice = DocumentActions.GetElementById("txtUnitPrice");
        ChkIsActive = DocumentActions.GetElementById("ChkIsActive");
        ChkIsDetail = DocumentActions.GetElementById("ChkIsDetail");
        ChkIsEditable = DocumentActions.GetElementById("ChkIsEditable");
        btnCode = DocumentActions.GetElementById("btnCode");
        btnUomID = DocumentActions.GetElementById("btnUomID");
        btnSearchScop = DocumentActions.GetElementById("btnSearchScop");
        btnSearchParent = DocumentActions.GetElementById("btnSearchParent");
    }
    function InitalizeEvents() {
        btnCode.onclick = btnCode_Clicked;
        btnUomID.onclick = btnUomID_Clicked;
        btnSearchScop.onclick = btnScopeID_Clicked;
        btnSearchParent.onclick = btnParentItemID_Click;
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
    function Display() {
        DocumentActions.RenderFromModel(Master);
        uomId = Master.UomID;
        parentid = Master.ParentItemID;
        scopId = Master.ScopeID;
        txtParentItemCode.value = "";
        txtDescAPa.value = "";
        if (Master.ParentItemID != null) {
            getParentItemID();
        }
    }
    function Assign() {
        DocumentActions.AssignToModel(Master);
    }
    function Add() {
        txtItemLevel.value = "1";
        ChkIsDetail.checked = true;
        ChkIsActive.checked = true;
    }
    function SaveNewData() {
        Master = new PQ_GetSalesItem();
        Assign();
        if (Number(txtUnitPrice.value) < Number(txtMinUnitPrice.value)) {
            WorningMessage("سعر البيع يجب ان يكون اكبر من أقل سعر بيع", "Sales price should be greater than Min. Sales price");
            return;
        }
        var _Count = Ajax.Call({ url: Url.Action("GetCountItemSysByCode", ControllerName), data: { Code: Master.ItemCode } });
        if (_Count > 0) {
            WorningMessage("كود الصنف يجب ان لا يكون مكرر علي مستوي الشركه", "item Code should not be repeated for the company ");
            return;
        }
        if (txtParentItemCode.value != "") {
            UpdateParent();
        }
        //check if there parentitem add 1 to txtItemLevel
        if ($("#txtParentItemCode").text() != "") {
            var NewLevel = Number(txtItemLevel.value) + 1;
            txtItemLevel.value = NewLevel.toString();
            Master.ItemLevel = NewLevel;
        }
        Master.CompCode = Number(_CompCode);
        Master.UomID = uomId;
        Master.ParentItemID = parentid;
        Master.ScopeID = scopId;
        Ajax.CallAsync({
            url: Url.Action("Insert", ControllerName),
            data: Master,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var _itm = result.ResponseData;
                    WorningMessage("تم الحفظ برقم ", "Data Saved. ", "ادخال", "Insert ");
                    var _Index = GetIndexByUseId(result.ResponseData.ItemID, "PQ_GetSalesItem", "ItemID", "CompCode = " + _CompCode);
                    NavigateToSearchResultKey(Number(_Index), Navigate);
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Insert");
            }
        });
    }
    function Update() {
        if (txtParentItemCode.value != "") {
            UpdateParent();
        }
        Assign();
        if (Number(txtUnitPrice.value) < Number(txtMinUnitPrice.value)) {
            WorningMessage("سعر البيع يجب ان يكون اكبر من أقل سعر بيع", "Sales price should be greater than Min. Sales price");
            return;
        }
        Master.UomID = uomId;
        Master.ParentItemID = parentid;
        Master.ScopeID = scopId;
        Master.CompCode = Number(_CompCode);
        Ajax.CallAsync({
            url: Url.Action("Update", ControllerName),
            data: Master,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var _itm = result.ResponseData;
                    WorningMessage("تم الحفظ برقم ", "Data Saved. ", "تعديل", "Edit ");
                    var _Index = GetIndexByUseId(result.ResponseData.ItemID, "PQ_GetSalesItem", "ItemID", "CompCode = " + _CompCode);
                    NavigateToSearchResultKey(Number(_Index), Navigate);
                }
            }
        });
    }
    function GetMasterById(id) {
        var _Master = Ajax.Call({
            url: Url.Action("GetByID", ControllerName),
            data: { id: id },
        });
        return _Master;
    }
    function getScope() {
        Ajax.CallAsync({
            url: Url.Action("ScopeList", ControllerName),
            data: { id: Number(Master.ScopeID) },
            success: function (d) {
                var scope = d.result;
                scopId = scope.ScopeID;
                txtScopeCode.value = scope.ScopeCode.toString();
                if (_ScreenLang == "ar")
                    txtScopeName.value = scope.DescA;
                else
                    txtScopeName.value = scope.DescE;
            }
        });
    }
    function getUom() {
        Ajax.CallAsync({
            url: Url.Action("UomList", ControllerName),
            data: { id: Number(Master.UomID) },
            success: function (d) {
                var _uom = d.result;
                txtUomCode.value = _uom.UomCode.toString();
                if (_ScreenLang == "ar")
                    txtUomName.value = _uom.DescA.toString();
                else
                    txtUomName.value = _uom.DescE.toString();
            }
        });
    }
    function getParentItemID() {
        Ajax.CallAsync({
            url: Url.Action("GetParentById", ControllerName),
            data: { id: Number(Master.ParentItemID) },
            success: function (d) {
                var parent = d.result;
                txtParentItemCode.value = parent.ItemCode.toString();
                txtDescAPa.value = _ScreenLang == "ar" ? parent.DescA.toString() : txtDescAPa.value = parent.DescE.toString();
                ;
            }
        });
    }
    function btnCode_Clicked() {
        sys.FindKey(Modules.SalesItemLibrary, "btnCode", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSalesItems", ControllerName),
                data: { id: id },
                success: function (d) {
                    Master = d.result;
                    var Index = GetIndexByUseId(Number(Master.ItemID), "PQ_GetSalesItem", "ItemID", "CompCode = " + _CompCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }
    function btnUomID_Clicked() {
        sys.FindKey(Modules.SalesItemLibrary, "btnUomID", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("UomList", ControllerName),
                data: { id: id },
                success: function (d) {
                    var uom = d.result;
                    uomId = uom.UomID;
                    txtUomCode.value = uom.UomCode;
                    if (_ScreenLang == "ar")
                        txtUomName.value = uom.DescA.toString();
                    else
                        txtUomName.value = uom.DescE.toString();
                }
            });
        });
    }
    function btnScopeID_Clicked() {
        sys.FindKey(Modules.SalesItemLibrary, "btnScopeID", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("ScopeList", ControllerName),
                data: { id: id },
                success: function (d) {
                    var scope = d.result;
                    scopId = scope.ScopeID;
                    txtScopeCode.value = scope.ScopeCode.toString();
                    if (_ScreenLang == "ar")
                        txtScopeName.value = scope.DescA.toString();
                    else
                        txtScopeName.value = scope.DescE.toString();
                }
            });
        });
    }
    function btnParentItemID_Click() {
        sys.FindKey(Modules.SalesItemLibrary, "btnParentItemID", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetParentById", ControllerName),
                data: { id: id },
                success: function (d) {
                    var result = d.result;
                    if (result.ItemCode == null) {
                        txtDescAPa.value = "";
                    }
                    parentid = result.ItemID;
                    txtItemLevel.value = (result.ItemLevel + 1).toString();
                    txtParentItemCode.value = result.ItemCode;
                    txtDescAPa.value = _ScreenLang == "ar" ? result.DescA : txtDescAPa.value = result.DescE;
                }
            });
        });
    }
    function Clear() {
        //txtUomID.value = "";
        //txtUomName.value = "";
        //txtScopeID.value = "";
        //txtScopeName.value = "";
        //txtParentItemID.value = "";
        //txtDescAPa.value = "";
    }
    function UpdateParent() {
        Assign();
        Ajax.CallAsync({
            url: Url.Action("UpdateParent", ControllerName),
            data: { parentid: parentid },
            success: function (d) {
                var result = d.result;
            }
        });
    }
})(SalesItemLibrary || (SalesItemLibrary = {}));
//# sourceMappingURL=SalesItemLibrary.js.map