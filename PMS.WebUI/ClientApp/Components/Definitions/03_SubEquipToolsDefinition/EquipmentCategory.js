$(document).ready(function () {
    EquipmentCategory.InitalizeComponent();
});
var EquipmentCategory;
(function (EquipmentCategory) {
    var ControllerName = "EquipmentCategory";
    var DataSource = new Array();
    var ccc = "disabled";
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
        InitalizeGrid();
        ControlsButtons.PrintButton.disabled = false;
        ControlsButtons.PrintAction(function () { PrintEuqipClas(); });
        LoadData();
    }
    EquipmentCategory.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("EqCat_");
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
            { title: res.EqCat_ClassCode, name: "ClassCode", type: "text", width: "7.5%" },
            { title: res.EqCat_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.EqCat_DescE, name: "DescE", type: "text", width: "7.5%" },
            { title: res.EqCat_DeprRate, name: "DeprRate", type: "text", width: "7.5%" },
            { title: res.EqCat_HourDeprCost, name: "HourDeprCost", type: "text", width: "7.5%" },
            { title: res.EqCat_HourOprCost, name: "HourOprCost", type: "text", width: "7.5%" },
            { title: res.EqCat_HourCost, css: "ccc", name: "HourCost", type: "label", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    function Insert(e) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            var Equipment_1 = e.Item;
            Equipment_1.CompCode = Number(_CompCode);
            for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
                var item = DataSource_1[_i];
                if (Equipment_1.ClassCode == item.ClassCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repeat");
                    return;
                }
            }
            Equipment_1.HourCost = Number(Equipment_1.HourDeprCost) + Number(Equipment_1.HourOprCost);
            Ajax.CallAsync({
                url: Url.Action("Insert", ControllerName),
                data: Equipment_1,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == true) {
                        WorningMessage("تم الحفظ بنجاح", "Successfully saved", "الاضافه", "Insert");
                        DataSource.push(Equipment_1);
                        BindDataGrids();
                    }
                    else {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للأضافة", "No permission for Adding");
        }
    }
    function Update(e) {
        var Equipment = e.Item;
        if (Visibility(Equipment) == false)
            return;
        var _NewDS = DataSource;
        var _Index = _NewDS.indexOf(_NewDS.filter(function (x) { return x.EquipClassId == Equipment.EquipClassId; })[0]);
        _NewDS.splice(_Index, 1);
        var _Index2 = _NewDS.filter(function (x) { return x.ClassCode == Equipment.ClassCode; }).length;
        if (_Index2 > 0) {
            WorningMessage("الرجاء عدم تكرار كود المعدة", "Pleas not repetition Equipment No.");
            LoadData();
            return false;
        }
        Equipment.HourCost = Number(Equipment.HourDeprCost) + Number(Equipment.HourOprCost);
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            Ajax.CallAsync({
                url: Url.Action("Update", ControllerName),
                data: Equipment,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == true) {
                        WorningMessage("تم الحفظ بنجاح", "Successfully saved", "التعديل", "Update");
                        BindDataGrids();
                        LoadData();
                    }
                    else {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Editing", "خطأ", "Error");
        }
    }
    function Delete(e) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            var Equipment = e.Item;
            Ajax.CallAsync({
                url: Url.Action("Delete", ControllerName),
                data: Equipment,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                        WorningMessage("لا يمكن حذف هذا العنصر لانة مرتيط ببعض المعدات الاخرى", "Cannot Delete This Item Because It Related With Other Equipment", "تنبية");
                        LoadData();
                    }
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Delete", "خطأ", "Error");
        }
    }
    function LoadData() {
        Ajax.CallAsync({
            url: Url.Action("GetEquipmentClass", ControllerName),
            success: function (d) {
                DataSource = d.result;
                BindDataGrids();
            }
        });
    }
    function BindDataGrids() {
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    function Visibility(Equipment) {
        var _EQCode = Equipment.CompCode;
        var _ExpName = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? Equipment.DescA : Equipment.DescE;
        if (IsNullOrEmpty(_EQCode.toString()) || IsNullOrEmpty(_ExpName)) {
            return false;
        }
        else {
            return true;
        }
    }
    function PrintEuqipClas() {
        if (DataSource == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("PrintEuqipClas", "PrintTransaction"),
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
})(EquipmentCategory || (EquipmentCategory = {}));
//$(document).ready(() => {
//    var treeView: TreeViwe = new TreeViwe();
//    //var spanEle: HTMLSpanElement = DocumentActions.GetElementById<HTMLSpanElement>("selectedId");
//    var btnActivityId: HTMLButtonElement = DocumentActions.GetElementById<HTMLButtonElement>("btnActivityId");
//    var inputCode: HTMLInputElement = DocumentActions.GetElementById<HTMLInputElement>("code");
//    var inputName: HTMLInputElement = DocumentActions.GetElementById<HTMLInputElement>("name");
//    //treeView.CreateTreeView("FillTreeView", "Home", "treeViewElement", "selectedId");
//    btnActivityId.onclick = btnTreeSearch_onclick;
//    
//    function btnTreeSearch_onclick() {
//        let sys: SystemTools = new SystemTools();
//        sys.FindTree("WorkActivities", "btnActivityId", "CompCode = " + 1, true);
//        $('#btn_Seleted_Data').click(function (event): void {
//            console.log(event);
//            inputCode.value = $('#txt_treeName').val();
//            inputName.value = $('#txt_treeCode').val();
//        });
//    }
//});
//# sourceMappingURL=EquipmentCategory.js.map