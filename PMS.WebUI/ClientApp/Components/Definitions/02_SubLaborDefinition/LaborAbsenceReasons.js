$(document).ready(function () {
    LaborAbsenceReasons.InitalizeComponent();
});
var LaborAbsenceReasons;
(function (LaborAbsenceReasons) {
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
        getLaborAbsenceType();
    }
    LaborAbsenceReasons.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("LabAbs_");
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
            { title: res.LabAbs_AbsCode, name: "AbsCode", type: "text", width: "7.5%" },
            { title: res.LabAbs_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.LabAbs_DescE, name: "DescE", type: "text", width: "7.5%" },
            { title: res.LabAbs_Remarks, name: "Remarks", type: "text", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    function getLaborAbsenceType() {
        Ajax.CallAsync({
            url: Url.Action("getLaborAbsenceType", "LaborAbsenceReasons"),
            success: function (d) {
                DataSource = d.result;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }
    function Insert(e) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            var LabAbcens = e.Item;
            for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
                var item = DataSource_1[_i];
                if (LabAbcens.AbsCode == item.AbsCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repetead");
                    return;
                }
            }
            LabAbcens.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "LaborAbsenceReasons"),
                data: LabAbcens,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    getLaborAbsenceType();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للاضافة", "No permission for Inserting");
        }
    }
    function Update(e) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            var LabAbcens_1 = e.Item;
            var _NewDS = DataSource;
            var _Index = _NewDS.indexOf(_NewDS.filter(function (x) { return x.LaborAbsenceTypeID == LabAbcens_1.LaborAbsenceTypeID; })[0]);
            _NewDS.splice(_Index, 1);
            var _Index2 = _NewDS.filter(function (x) { return x.AbsCode == LabAbcens_1.AbsCode; }).length;
            if (_Index2 > 0) {
                WorningMessage("الرجاء عدم تكرار رقم الكود", "Pleas not repetition Code.");
                getLaborAbsenceType();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "LaborAbsenceReasons"),
                data: LabAbcens_1,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    getLaborAbsenceType();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Updating");
        }
    }
    function Delete(e) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            var LabAbcens = e.Item;
            Ajax.CallAsync({
                url: Url.Action("Delete", "LaborAbsenceReasons"),
                data: LabAbcens,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        WorningMessage("لا يمكن حذف هذا العنصر لانة مرتبط ببعض بيانات العمال الاخرى", "Cann't Delete This Item Beacuase It Used In Other Labor Info");
                    }
                    getLaborAbsenceType();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Deleting");
        }
    }
})(LaborAbsenceReasons || (LaborAbsenceReasons = {}));
//# sourceMappingURL=LaborAbsenceReasons.js.map