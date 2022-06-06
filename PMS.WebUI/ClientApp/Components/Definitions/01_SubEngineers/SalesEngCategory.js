$(document).ready(function () {
    SalesEngCategory.InitalizeComponent();
});
var SalesEngCategory;
(function (SalesEngCategory) {
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
        ControlsButtons.PrintButton.disabled = false;
        ControlsButtons.PrintAction(function () { PrintCatEng(); });
        InitalizeGrid();
    }
    SalesEngCategory.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("SEngCat_");
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
        Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
        Grid.Editing = SharedSession.CurrentPrivileges.EDIT;
        Grid.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        Grid.InsertionMode = JsGridInsertionMode.Binding;
        Grid.OnItemInserting = Insert;
        Grid.OnItemUpdating = Update;
        Grid.OnItemDeleting = Delete;
        Grid.Columns = [
            { title: res.SEngCat_CategCode, name: "CategCode", type: "text", width: "7.5%" },
            { title: res.SEngCat_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.SEngCat_DescE, name: "DescE", type: "text", width: "7.5%" },
            { title: res.SEngCat_Rate, name: "Rate", type: "number", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
        loadSalesCategory();
    }
    function loadSalesCategory() {
        Ajax.CallAsync({
            url: Url.Action("getSalesEngCateory", "SalesEngCategory"),
            success: function (d) {
                DataSource = d.result;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }
    function Insert(e) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            var Cat = e.Item;
            var res = Validation(Cat);
            if (res == true)
                return;
            for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
                var item = DataSource_1[_i];
                if (Cat.CategCode == item.CategCode) {
                    WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
                    return;
                }
            }
            Cat.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "SalesEngCategory"),
                data: Cat,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == true) {
                        MessageBox.Show("Data Saved", "Insert");
                    }
                    loadSalesCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للأضافة", "No permission for Adding");
        }
    }
    function Update(e) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            var Cat_1 = e.Item;
            var res = Validation(Cat_1);
            if (res == true)
                return;
            var _NewDS = DataSource;
            var _Index = _NewDS.indexOf(_NewDS.filter(function (x) { return x.SalesEngCategoryId == Cat_1.SalesEngCategoryId; })[0]);
            _NewDS.splice(_Index, 1);
            var _Index2 = _NewDS.filter(function (x) { return x.CategCode == Cat_1.CategCode; }).length;
            if (_Index2 > 0) {
                WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
                loadSalesCategory();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "SalesEngCategory"),
                data: Cat_1,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseData == 1) {
                        WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
                    }
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    loadSalesCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Editing");
        }
    }
    function Delete(e) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            var Cat_2 = e.Item;
            Ajax.CallAsync({
                url: Url.Action("Delete", "SalesEngCategory"),
                data: Cat_2,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == true) {
                        MessageBox.Show("Data Deleted", "Delete");
                    }
                    else {
                        MessageBox.Show("the  " + Cat_2.SalesEngCategoryId + "use as FK in another Table", "Can't Delete");
                    }
                    loadSalesCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Deleting");
        }
    }
    //   = PrintCatEng;
    function PrintCatEng() {
        Ajax.CallAsync({
            url: Url.Action("PrintCatEng", "PrintTransaction"),
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
    function Validation(Category) {
        var res = false;
        if (IsNullOrEmpty(Category.CategCode)) {
            WorningMessage("يجب ادخال رقم التصنيف", "Site Eng Category Code Required");
            res = true;
        }
        else if (IsNullOrEmpty(Category.DescA)) {
            WorningMessage("يجب ادخال إسم التصنيف", "Site Eng Categorys Name Required");
            res = true;
        }
        return res;
    }
})(SalesEngCategory || (SalesEngCategory = {}));
//# sourceMappingURL=SalesEngCategory.js.map