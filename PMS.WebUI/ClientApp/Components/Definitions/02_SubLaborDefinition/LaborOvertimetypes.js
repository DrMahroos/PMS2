$(document).ready(function () {
    LaborOvertimetypes.InitalizeComponent();
});
var LaborOvertimetypes;
(function (LaborOvertimetypes) {
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
        getLaborOverTimeType();
    }
    LaborOvertimetypes.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("LabOvTime_");
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
            { title: res.LabOvTime_OverTimeCode, name: "OverTimeCode", type: "text", width: "7.5%" },
            { title: res.LabOvTime_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.LabOvTime_DescE, name: "DescE", type: "text", width: "7.5%" },
            { title: res.LabOvTime_Rate, name: "Rate", type: "number", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    function getLaborOverTimeType() {
        Ajax.CallAsync({
            url: Url.Action("getLaborOverTimeType", "LaborOvertimetypes"),
            success: function (d) {
                DataSource = d.result;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }
    function Insert(e) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            var LabOver = e.Item;
            for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
                var item = DataSource_1[_i];
                if (LabOver.OverTimeCode == item.OverTimeCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repetead");
                    return;
                }
            }
            LabOver.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "LaborOvertimetypes"),
                data: LabOver,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    getLaborOverTimeType();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للاضافة", "No permission for Inserting");
        }
    }
    function Update(e) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            var LabOver_1 = e.Item;
            var _NewDS = DataSource;
            var _Index = _NewDS.indexOf(_NewDS.filter(function (x) { return x.LaborOverTimeTypeID == LabOver_1.LaborOverTimeTypeID; })[0]);
            _NewDS.splice(_Index, 1);
            var _Index2 = _NewDS.filter(function (x) { return x.OverTimeCode == LabOver_1.OverTimeCode; }).length;
            if (_Index2 > 0) {
                WorningMessage("الرجاء عدم تكرار رقم الكود", "Pleas not repetition Code.");
                getLaborOverTimeType();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "LaborOvertimetypes"),
                data: LabOver_1,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    getLaborOverTimeType();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Updating");
        }
    }
    function Delete(e) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            var LabOver = e.Item;
            Ajax.CallAsync({
                url: Url.Action("Delete", "LaborOvertimetypes"),
                data: LabOver,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                    }
                    getLaborOverTimeType();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Deleting");
        }
    }
})(LaborOvertimetypes || (LaborOvertimetypes = {}));
//# sourceMappingURL=LaborOvertimetypes.js.map