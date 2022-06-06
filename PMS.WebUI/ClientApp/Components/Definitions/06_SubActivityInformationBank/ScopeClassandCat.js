$(document).ready(function () {
    ScopeClassandCat.InitalizeComponent();
});
var ScopeClassandCat;
(function (ScopeClassandCat) {
    var DataSource = new Array();
    var Grid = new JsGrid();
    var sys = new SystemTools();
    var _ScreenLanguage;
    var _CompCode;
    //var _BranchCode: string;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        //_BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditButton.disabled = true;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintButton.disabled = true;
        InitalizeGrid();
        getScopeCategory();
    }
    ScopeClassandCat.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("ScopClassCat_");
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
            { title: res.ScopClassCat_ScopeCategCode, name: "ScopeCategCode", type: "text", width: "7.5%" },
            { title: res.ScopClassCat_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.ScopClassCat_DescE, name: "DescE", type: "text", width: "7.5%" },
            { type: "control", width: "7%", }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    function getScopeCategory() {
        Ajax.CallAsync({
            url: Url.Action("getScopeCategory", "ScopeClassandCat"),
            success: function (d) {
                DataSource = d.result;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }
    function Insert(e) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            var ScopCat = e.Item;
            for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
                var item = DataSource_1[_i];
                if (ScopCat.ScopeCategCode == item.ScopeCategCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repeted");
                    return;
                }
            }
            ScopCat.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "ScopeClassandCat"),
                data: ScopCat,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    getScopeCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للاضافة", "No permission for Inserting");
        }
    }
    function Update(e) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            var ScopCat_1 = e.Item;
            var _NewDS = DataSource;
            var _Index = _NewDS.indexOf(_NewDS.filter(function (x) { return x.ScopeCategoryID == ScopCat_1.ScopeCategoryID; })[0]);
            _NewDS.splice(_Index, 1);
            var _Index2 = _NewDS.filter(function (x) { return x.ScopeCategCode == ScopCat_1.ScopeCategCode; }).length;
            if (_Index2 > 0) {
                WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
                getScopeCategory();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "ScopeClassandCat"),
                data: ScopCat_1,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    getScopeCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Updating");
        }
    }
    function Delete(e) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            var ScopCat = e.Item;
            Ajax.CallAsync({
                url: Url.Action("Delete", "ScopeClassandCat"),
                data: ScopCat,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                        WorningMessage("لا يمكن حذف هذا العنصر لانة مرتبط ببعض البيانات الاخرى", "Cann't Delete This Item Beacuase It Used In Other Labor Info");
                    }
                    getScopeCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Deleting");
        }
    }
})(ScopeClassandCat || (ScopeClassandCat = {}));
//# sourceMappingURL=ScopeClassandCat.js.map