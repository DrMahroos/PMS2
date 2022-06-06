$(document).ready(function () {
    UnitsOfMeasure.InitalizeComponent();
});
var UnitsOfMeasure;
(function (UnitsOfMeasure) {
    var DataSource = new Array();
    var Grid = new JsGrid();
    var sys = new SystemTools();
    //var _ScreenLanguage: string;
    var _CompCode;
    //var _BranchCode: string;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        //_ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        //_BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditButton.disabled = true;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintButton.disabled = true;
        InitalizeGrid();
        getUnitOfMeasure();
    }
    UnitsOfMeasure.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("UnitMeasre_");
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
        Grid.InsertionMode = JsGridInsertionMode.Binding;
        Grid.OnItemInserting = Insert;
        Grid.OnItemUpdating = Update;
        Grid.OnItemDeleting = Delete;
        Grid.Columns = [
            { title: res.UnitMeasre_UomCode, name: "UomCode", type: "text", width: "7.5%" },
            { title: res.UnitMeasre_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.UnitMeasre_DescE, name: "DescE", type: "text", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    function getUnitOfMeasure() {
        Ajax.CallAsync({
            url: Url.Action("getUnitOfMeasure", "UnitsOfMeasure"),
            success: function (d) {
                DataSource = d.result;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }
    function Insert(e) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            var uom = e.Item;
            for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
                var item = DataSource_1[_i];
                if (uom.UomCode == item.UomCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repeted");
                    return;
                }
            }
            uom.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "UnitsOfMeasure"),
                data: uom,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    getUnitOfMeasure();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية لاضافة", "No permission for Inserting");
        }
    }
    function Update(e) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            var uom_1 = e.Item;
            var _NewDS = DataSource;
            var _Index = _NewDS.indexOf(_NewDS.filter(function (x) { return x.UomID == uom_1.UomID; })[0]);
            _NewDS.splice(_Index, 1);
            var _Index2 = _NewDS.filter(function (x) { return x.UomCode == uom_1.UomCode; }).length;
            if (_Index2 > 0) {
                WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
                getUnitOfMeasure();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "UnitsOfMeasure"),
                data: uom_1,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    getUnitOfMeasure();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Updating");
        }
    }
    function Delete(e) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            var uom = e.Item;
            Ajax.CallAsync({
                url: Url.Action("Delete", "UnitsOfMeasure"),
                data: uom,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                        WorningMessage("لا يمكن حذف هذا العنصر لانة مرتبط ببعض البيانات الاخرى", "Cann't Delete This Item Beacuase It Used In Other Labor Info");
                    }
                    getUnitOfMeasure();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Deleting");
        }
    }
})(UnitsOfMeasure || (UnitsOfMeasure = {}));
//# sourceMappingURL=UnitsOfMeasure.js.map