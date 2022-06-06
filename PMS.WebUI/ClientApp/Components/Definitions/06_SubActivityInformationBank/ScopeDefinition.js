$(document).ready(function () {
    ScopeDefinition.InitalizeComponent();
});
var ScopeDefinition;
(function (ScopeDefinition) {
    var DataSource = new Array();
    var Grid = new JsGrid();
    var sys = new SystemTools();
    var Master = new P_D_Scope();
    var categ = new P_D_ScopeCategory();
    var txtScopeCategoryID;
    var txtScopeCategoryName;
    var btnSearchScopCat;
    var txtScopeCategorycod;
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
        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditButton.disabled = true;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintButton.disabled = false;
        ControlsButtons.PrintAction(function () { PrintScope(); });
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        InitalizeGrid();
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.Prepare, Master.ScopeID.toString());
        });
    }
    ScopeDefinition.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtScopeCategoryID = DocumentActions.GetElementById("txtScopeCategoryID");
        txtScopeCategoryName = DocumentActions.GetElementById("txtScopeCategoryName");
        btnSearchScopCat = DocumentActions.GetElementById("btnSearchScopCat");
        txtScopeCategorycod = DocumentActions.GetElementById("txtScopeCategorycod");
    }
    function InitalizeEvents() {
        btnSearchScopCat.onclick = btnSearchScopCat_Click;
    }
    function InitalizeGrid() {
        var res = GetResourceList("ScopDef_");
        Grid.ElementName = "Grid";
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
        Grid.Editing = SharedSession.CurrentPrivileges.EDIT;
        Grid.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        ;
        Grid.InsertionMode = JsGridInsertionMode.Binding;
        Grid.OnItemInserting = Insert;
        Grid.OnItemUpdating = Update;
        Grid.OnItemDeleting = Delete;
        Grid.Columns = [
            { title: res.ScopDef_ScopeCode, name: "ScopeCode", type: "text", width: "7.5%" },
            { title: res.ScopDef_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.ScopDef_DescE, name: "DescE", type: "text", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    function getScopeCategory_ByCatID(catid) {
        Ajax.CallAsync({
            url: Url.Action("getScopeCategory_ByCatID", "ScopeDefinition"),
            data: { catID: catid },
            success: function (d) {
                DataSource = d.result;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }
    function Insert(e) {
        if (IsNullOrEmpty(txtScopeCategoryID.value)) {
            WorningMessage("يجب اختيار فئة قبل الحفظ", "You Should Choose Category First");
            return;
        }
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            var Scop = e.Item;
            for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
                var item = DataSource_1[_i];
                if (Scop.ScopeCode == item.ScopeCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repeted");
                    return;
                }
            }
            Scop.ScopeCategoryID = Number(txtScopeCategoryID.value);
            Scop.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "ScopeDefinition"),
                data: Scop,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    getScopeCategory_ByCatID(Number(txtScopeCategoryID.value));
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للاضافة", "No permission for Inserting");
        }
    }
    function Update(e) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            var Scop_1 = e.Item;
            var _NewDS = DataSource;
            var _Index = _NewDS.indexOf(_NewDS.filter(function (x) { return x.ScopeID == Scop_1.ScopeID; })[0]);
            _NewDS.splice(_Index, 1);
            var _Index2 = _NewDS.filter(function (x) { return x.ScopeCode == Scop_1.ScopeCode; }).length;
            if (_Index2 > 0) {
                WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
                getScopeCategory_ByCatID(Number(txtScopeCategoryID.value));
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "ScopeDefinition"),
                data: Scop_1,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Updating");
        }
    }
    function Delete(e) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            var Scop = e.Item;
            Ajax.CallAsync({
                url: Url.Action("Delete", "ScopeDefinition"),
                data: Scop,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        //MessageBox.Show(result.ResponseMessage, "Delete");
                        WorningMessage("لا يمكن حذف هذا العنصر لانة مرتبط ببعض البيانات الاخرى", "Cann't Delete This Item Beacuase It Used In Other Labor Info");
                        Navigate();
                    }
                }
            });
        }
        else {
            if (_ScreenLanguage == "ar") {
                MessageBox.Show("لا يوجد صلاحية للحذف", "خطأ");
            }
            else {
                MessageBox.Show("No permission for Deleting", "Error");
            }
        }
    }
    function btnSearchScopCat_Click() {
        sys.FindKey(Modules.ScopeDefinition, "btnSearchScopCat", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getScopeCategory", "ScopeDefinition"),
                data: { id: id },
                success: function (d) {
                    categ = d.result;
                    txtScopeCategoryID.value = categ.ScopeCategoryID.toString();
                    txtScopeCategoryName.value = categ.DescA.toString();
                    getScopeCategory_ByCatID(id);
                    txtScopeCategorycod.value = categ.ScopeCategCode;
                    var ind = GetIndexByUseId(id, "P_D_ScopeCategory", "ScopeCategoryID");
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });
        });
    }
    function Display() {
        DocumentActions.RenderFromModel(Master);
        getCategoryName(Number(txtScopeCategoryID.value));
        getScopeCategory_ByCatID(Number(txtScopeCategoryID.value));
    }
    function getCategoryName(id) {
        Ajax.CallAsync({
            url: Url.Action("getScopeCategory", "ScopeDefinition"),
            data: { id: id },
            success: function (d) {
                categ = d.result;
                txtScopeCategoryName.value = categ.DescA.toString();
            }
        });
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", "ScopeDefinition"),
            success: function (d) {
                Master = d.result;
                Display();
            }
        });
    }
    function PrintScope() {
        if (DataSource == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("PrintScope", "PrintTransaction"),
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
})(ScopeDefinition || (ScopeDefinition = {}));
//# sourceMappingURL=ScopeDefinition.js.map