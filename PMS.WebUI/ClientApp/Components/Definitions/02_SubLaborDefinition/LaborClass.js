$(document).ready(function () {
    LaborClass.InitalizeComponent();
});
var LaborClass;
(function (LaborClass) {
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
        ControlsButtons.PrintAction(function () { PrintLobClas(); });
        InitalizeGrid();
        loadLaborClasses();
    }
    LaborClass.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("LabClass_");
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
            { title: res.LabClass_ClassCode, name: "ClassCode", type: "text", width: "7.5%" },
            { title: res.LabClass_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.LabClass_DescE, name: "DescE", type: "text", width: "7.5%" },
            { title: res.LabClass_HourCost, name: "HourCost", type: "number", width: "7.5%" },
            { title: res.LabClass_BonusAddFactor, name: "BonusAddFactor", type: "number", width: "7.5%" },
            { title: res.LabClass_BonusDedFactor, name: "BonusDedFactor", type: "number", width: "7.5%" },
            { title: res.LabClass_Remarks, name: "Remarks", type: "text", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    function loadLaborClasses() {
        Ajax.CallAsync({
            url: Url.Action("getLaborClasses", "LaborClass"),
            success: function (d) {
                DataSource = d.result;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }
    function Insert(e) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            var LabCat = e.Item;
            for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
                var item = DataSource_1[_i];
                if (LabCat.ClassCode == item.ClassCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repetead");
                    return;
                }
            }
            LabCat.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "LaborClass"),
                data: LabCat,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    loadLaborClasses();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للاضافة", "No permission for Inserting");
        }
    }
    function Update(e) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            var LabCat_1 = e.Item;
            var _NewDS = DataSource;
            var _Index = _NewDS.indexOf(_NewDS.filter(function (x) { return x.LaborClassId == LabCat_1.LaborClassId; })[0]);
            _NewDS.splice(_Index, 1);
            var _Index2 = _NewDS.filter(function (x) { return x.ClassCode == LabCat_1.ClassCode; }).length;
            if (_Index2 > 0) {
                WorningMessage("الرجاء عدم تكرار رقم الكود", "Pleas not repetition Code.");
                loadLaborClasses();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "LaborClass"),
                data: LabCat_1,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    loadLaborClasses();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Updating");
        }
    }
    function Delete(e) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            var LabCat = e.Item;
            Ajax.CallAsync({
                url: Url.Action("Delete", "LaborClass"),
                data: LabCat,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        WorningMessage("لا يمكن حذف هذا العنصر لانة مرتبط ببعض بيانات العمال الاخرى", "Cann't Delete This Item Beacuase It Used In Other Labor Info");
                    }
                    loadLaborClasses();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Deleting");
        }
    }
    function PrintLobClas() {
        if (DataSource == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("PrintLobClas", "PrintTransaction"),
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
})(LaborClass || (LaborClass = {}));
//# sourceMappingURL=LaborClass.js.map