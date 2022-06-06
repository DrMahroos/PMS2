$(document).ready(function () {
    Nationality.InitalizeComponent();
});
var Nationality;
(function (Nationality_1) {
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
        getNationality();
    }
    Nationality_1.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("Nationalty_");
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
            { title: res.Nationalty_NationalityCode, name: "NationalityCode", type: "text", width: "7.5%" },
            { title: res.Nationalty_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.Nationalty_DescL, name: "DescL", type: "text", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    function getNationality() {
        Ajax.CallAsync({
            url: Url.Action("getNationality", "Nationality"),
            success: function (d) {
                DataSource = d.result;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }
    function Insert(e) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            var Nationality_2 = e.Item;
            for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
                var item = DataSource_1[_i];
                if (Nationality_2.NationalityCode == item.NationalityCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repeted");
                    return;
                }
            }
            Nationality_2.COMP_CODE = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "Nationality"),
                data: Nationality_2,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    getNationality();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للاضافة", "No permission for Inserting");
        }
    }
    function Update(e) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            var Nationality_3 = e.Item;
            var _NewDS = DataSource;
            var _Index = _NewDS.indexOf(_NewDS.filter(function (x) { return x.NationalityID == Nationality_3.NationalityID; })[0]);
            _NewDS.splice(_Index, 1);
            var _Index2 = _NewDS.filter(function (x) { return x.NationalityCode == Nationality_3.NationalityCode; }).length;
            if (_Index2 > 0) {
                WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
                getNationality();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "Nationality"),
                data: Nationality_3,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    getNationality();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Updating");
        }
    }
    function Delete(e) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            var Nationality_4 = e.Item;
            Ajax.CallAsync({
                url: Url.Action("Delete", "Nationality"),
                data: Nationality_4,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                        WorningMessage("لا يمكن حذف هذا العنصر لانة مرتبط ببعض البيانات الاخرى", "Cann't Delete This Item Beacuase It Used In Other Labor Info");
                    }
                    getNationality();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Deleting");
        }
    }
})(Nationality || (Nationality = {}));
//# sourceMappingURL=Nationality.js.map