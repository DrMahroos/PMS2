$(document).ready(function () {
    SiteEngCategory.InitalizeComponent();
});
var SiteEngCategory;
(function (SiteEngCategory) {
    var DataSource = new Array();
    var Grid = new JsGrid();
    var sys = new SystemTools();
    //var _ScreenLanguage: string;
    //var _CompCode: string;
    //var _BranchCode: string;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        //_ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        //_CompCode = SharedSession.CurrentEnvironment.CompCode;
        //_BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditButton.disabled = true;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintButton.disabled = false;
        ControlsButtons.PrintAction(function () { PrintCatEng(); });
        InitalizeGrid();
        load();
    }
    SiteEngCategory.InitalizeComponent = InitalizeComponent;
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
    }
    function load() {
        Ajax.CallAsync({
            url: Url.Action("Load", "SiteEngCategory"),
            success: function (d) {
                DataSource = d.result;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }
    function Insert(e) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            var Category = e.Item;
            var res = Validation(Category);
            if (res == true)
                return;
            for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
                var item = DataSource_1[_i];
                if (Category.CategCode == item.CategCode) {
                    WorningMessage("الرجاء عدم تكرار رقم التصنيف", "Please not Repetition Site Eng Category No.");
                    return;
                }
            }
            Ajax.CallAsync({
                url: Url.Action("Insert", "SiteEngCategory"),
                data: Category,
                success: function (d) {
                    var msg = ReturnMsg("تم حفظ البيانات  ", "Data Saved  ");
                    var msg1 = ReturnMsg(" ادخال   ", "Insert  ");
                    var result = d.result;
                    if (result.ResponseState == true) {
                        var res_1 = result.ResponseData;
                        MessageBox.Show(msg, msg1);
                        load();
                    }
                    else
                        MessageBox.Show(result.ResponseMessage, "Insert");
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
            var _Index = _NewDS.indexOf(_NewDS.filter(function (x) { return x.SiteEngCategoryId == Cat_1.SiteEngCategoryId; })[0]);
            _NewDS.splice(_Index, 1);
            var _Index2 = _NewDS.filter(function (x) { return x.CategCode == Cat_1.CategCode; }).length;
            if (_Index2 > 0) {
                WorningMessage("الرجاء عدم تكرار رقم الكود", "Pleas not Repetition Code.");
                load();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "SiteEngCategory"),
                data: Cat_1,
                success: function (d) {
                    var msg = ReturnMsg("تم تعديل البيانات  ", "Data Saved  ");
                    var msg1 = ReturnMsg(" تعديل   ", "update  ");
                    var result = d.result;
                    if (result.ResponseState == true) {
                        MessageBox.Show(msg, msg1);
                        load();
                    }
                    else
                        MessageBox.Show(result.ResponseMessage, "Update");
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Editing");
        }
    }
    function Delete(e) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            var Category = e.Item;
            Ajax.CallAsync({
                url: Url.Action("Delete", "SiteEngCategory"),
                data: Category,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == true) {
                        var msg = ReturnMsg("تم حذف البيانات  ", "Data Delete  ");
                        var msg1 = ReturnMsg(" حذف   ", "Delete  ");
                        MessageBox.Show(msg, msg1);
                        load();
                    }
                    else {
                        WorningMessage("لا يمكن الحذف لانه مرتبط ببيانات اخري", "Can't Delete because this item related another data");
                        load();
                    }
                }
            });
        }
    }
    function PrintCatEng() {
        Ajax.CallAsync({
            url: Url.Action("PrintCatSiteEng", "PrintTransaction"),
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
})(SiteEngCategory || (SiteEngCategory = {}));
//# sourceMappingURL=SiteEngCategory.js.map