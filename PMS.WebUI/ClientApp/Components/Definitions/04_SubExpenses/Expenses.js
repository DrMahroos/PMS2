$(document).ready(function () {
    Expenses.InitalizeComponent();
});
var Expenses;
(function (Expenses) {
    var DataSource = new Array();
    var Grid = new JsGrid();
    var sys = new SystemTools();
    var Master = new P_D_Expences();
    var categ = new P_D_ExpencesCategory();
    var txtExpCatID;
    var txtExpCatName;
    var btnSearchExpenceCat;
    var ExpCatID;
    var _ScreenLanguage;
    var _CompCode;
    var _BranchCode;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        InitalizeControls();
        InitalizeEvents();
        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditButton.disabled = true;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintButton.disabled = false;
        ControlsButtons.PrintAction(function () { PrintExpenses(); });
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        InitalizeGrid();
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.Expences, Master.ExpencesID.toString());
        });
    }
    Expenses.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtExpCatID = DocumentActions.GetElementById("txtExpCatID");
        txtExpCatName = DocumentActions.GetElementById("txtExpCatName");
        btnSearchExpenceCat = DocumentActions.GetElementById("btnSearchExpenceCat");
    }
    function InitalizeEvents() {
        btnSearchExpenceCat.onclick = btnSearchExpenceCat_Click;
    }
    function InitalizeGrid() {
        var res = GetResourceList("Expens_");
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
            { title: res.Expens_ExpCode, name: "ExpCode", type: "text", width: "7.5%" },
            { title: res.Expens_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.Expens_DescE, name: "DescE", type: "text", width: "7.5%" },
            { title: res.Expens_AccountNo, name: "AccountNo", type: "text", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    function getExpences_ByCatID(catid) {
        Ajax.CallAsync({
            url: Url.Action("getExpences_ByCatID", "Expenses"),
            data: { catID: catid },
            success: function (d) {
                DataSource = d.result;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }
    function Insert(e) {
        if (IsNullOrEmpty(txtExpCatID.value)) {
            WorningMessage("يجب اختيار فئة قبل الحفظ", "");
            return;
        }
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            var Expens = e.Item;
            for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
                var item = DataSource_1[_i];
                if (Expens.ExpCode == item.ExpCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repeted");
                    return;
                }
            }
            Expens.ExpCatID = ExpCatID;
            Expens.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "Expenses"),
                data: Expens,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    getExpences_ByCatID(Number(Master.ExpCatID));
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للاضافة", "No permission for Inserting");
        }
    }
    function Update(e) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            var Expens_1 = e.Item;
            var _NewDS = DataSource;
            var _Index = _NewDS.indexOf(_NewDS.filter(function (x) { return x.ExpencesID == Expens_1.ExpencesID; })[0]);
            _NewDS.splice(_Index, 1);
            var _Index2 = _NewDS.filter(function (x) { return x.ExpCode == Expens_1.ExpCode; }).length;
            if (_Index2 > 0) {
                WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
                getExpences_ByCatID(Number(Master.ExpCatID));
                return;
            }
            Expens_1.ExpCatID = ExpCatID;
            Ajax.CallAsync({
                url: Url.Action("Update", "Expenses"),
                data: Expens_1,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    getExpences_ByCatID(Number(Master.ExpCatID));
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Updating");
        }
    }
    function Delete(e) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            var Expens = e.Item;
            Ajax.CallAsync({
                url: Url.Action("Delete", "Expenses"),
                data: Expens,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                    }
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Deleting");
        }
    }
    function btnSearchExpenceCat_Click() {
        sys.FindKey(Modules.Expences, "btnSearchExpenceCat", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getExpencesCategory", "Expenses"),
                data: { id: id },
                success: function (d) {
                    categ = d.result;
                    ExpCatID = categ.ExpCatID;
                    txtExpCatID.value = categ.ExpCatCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtExpCatName.value = categ.DescA.toString();
                    }
                    else {
                        txtExpCatName.value = categ.DescE.toString();
                    }
                    getExpences_ByCatID(id);
                    var ind = GetIndexByUseId(id, "P_D_ExpencesCategory", "ExpCatID");
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });
        });
    }
    function Display() {
        DocumentActions.RenderFromModel(Master);
        ExpCatID = Master.ExpCatID;
    }
    function getCategoryName(id) {
        Ajax.CallAsync({
            url: Url.Action("getExpencesCategory", "Expenses"),
            data: { id: id },
            success: function (d) {
                categ = d.result;
                txtExpCatID.value = categ.ExpCatCode.toString();
                if (_ScreenLanguage == "ar") {
                    txtExpCatName.value = categ.DescA.toString();
                }
                else {
                    txtExpCatName.value = categ.DescE.toString();
                }
            }
        });
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", "Expenses"),
            success: function (d) {
                Master = d.result;
                Display();
                getCategoryName(Master.ExpCatID);
                getExpences_ByCatID(Master.ExpCatID);
            }
        });
    }
    function PrintExpenses() {
        if (DataSource == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("PrintExpenses", "PrintTransaction"),
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
})(Expenses || (Expenses = {}));
//# sourceMappingURL=Expenses.js.map