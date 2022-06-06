$(document).ready(function () {
    UnProductioncategory.InitalizeComponent();
});
var UnProductioncategory;
(function (UnProductioncategory) {
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
        getUnProdCategory();
    }
    UnProductioncategory.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("UnProdCat_");
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
            { title: res.UnProdCat_CategCode, name: "CategCode", type: "text", width: "7.5%" },
            { title: res.UnProdCat_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.UnProdCat_DescE, name: "DescE", type: "text", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    function getUnProdCategory() {
        Ajax.CallAsync({
            url: Url.Action("getUnProdCategory", "UnProductioncategory"),
            success: function (d) {
                DataSource = d.result;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }
    function Insert(e) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            var UnProdCategory = e.Item;
            for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
                var item = DataSource_1[_i];
                if (UnProdCategory.CategCode == item.CategCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repetead");
                    return;
                }
            }
            UnProdCategory.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "UnProductioncategory"),
                data: UnProdCategory,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    getUnProdCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للاضافة", "No permission for Inserting");
        }
    }
    function Update(e) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            var UnProdCategory_1 = e.Item;
            var _NewDS = DataSource;
            var _Index = _NewDS.indexOf(_NewDS.filter(function (x) { return x.UnProdCategoryID == UnProdCategory_1.UnProdCategoryID; })[0]);
            _NewDS.splice(_Index, 1);
            var _Index2 = _NewDS.filter(function (x) { return x.CategCode == UnProdCategory_1.CategCode; }).length;
            if (_Index2 > 0) {
                WorningMessage("الرجاء عدم تكرار رقم الكود", "Pleas not repetition Code.");
                getUnProdCategory();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "UnProductioncategory"),
                data: UnProdCategory_1,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    getUnProdCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Updating");
        }
    }
    function Delete(e) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            var UnProdCategory = e.Item;
            Ajax.CallAsync({
                url: Url.Action("Delete", "UnProductioncategory"),
                data: UnProdCategory,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                        WorningMessage("لا يمكن حذف هذا العنصر لانة مرتبط ببعض بيانات العمال الاخرى", "Cann't Delete This Item Beacuase It Used In Other Labor Info");
                    }
                    getUnProdCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Deleting");
        }
    }
})(UnProductioncategory || (UnProductioncategory = {}));
//# sourceMappingURL=UnProductioncategory.js.map