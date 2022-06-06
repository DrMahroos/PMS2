$(document).ready(function () {
    UnProductionreasons.InitalizeComponent();
});
var UnProductionreasons;
(function (UnProductionreasons) {
    var DataSource = new Array();
    var Grid = new JsGrid();
    var sys = new SystemTools();
    var Master = new P_D_UnProdReason();
    var categ = new P_D_UnProdCategory();
    var txtUnProdCategoryID;
    var txtcatName;
    var btnsearchCategory;
    var _ScreenLanguage;
    var _CompCode;
    //var _BranchCode: string;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        //_BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        InitalizeControls();
        InitalizeEvents();
        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditButton.disabled = true;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintButton.disabled = false;
        ControlsButtons.PrintAction(function () { PrintUnProd(); });
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        InitalizeGrid();
    }
    UnProductionreasons.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtUnProdCategoryID = DocumentActions.GetElementById("txtUnProdCategoryID");
        txtcatName = DocumentActions.GetElementById("txtcatName");
        btnsearchCategory = DocumentActions.GetElementById("btnsearchCategory");
    }
    function InitalizeEvents() {
        btnsearchCategory.onclick = btnsearchCategory_Click;
    }
    function InitalizeGrid() {
        var res = GetResourceList("UnProdRes_");
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
            { title: res.UnProdRes_ReasonCode, name: "ReasonCode", type: "text", width: "7.5%" },
            { title: res.UnProdRes_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.UnProdRes_DescE, name: "DescE", type: "text", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    function getProdReason_ByCatID(catid) {
        Ajax.CallAsync({
            url: Url.Action("getProdReason_ByCatID", "UnProductionreasons"),
            data: { catID: catid },
            success: function (d) {
                DataSource = d.result;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }
    function Insert(e) {
        if (IsNullOrEmpty(txtUnProdCategoryID.value)) {
            WorningMessage("يجب اختيار فئة قبل الحفظ", "You Should Choose Category Befor Save");
            return;
        }
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            var UnProdReason = e.Item;
            for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
                var item = DataSource_1[_i];
                if (UnProdReason.ReasonCode == item.ReasonCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repetead");
                    return;
                }
            }
            UnProdReason.UnProdCategoryID = Number(txtUnProdCategoryID.value);
            UnProdReason.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "UnProductionreasons"),
                data: UnProdReason,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    getProdReason_ByCatID(Number(txtUnProdCategoryID.value));
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للاضافة", "No permission for Inserting");
        }
    }
    function Update(e) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            var UnProdReason_1 = e.Item;
            var _NewDS = DataSource;
            var _Index = _NewDS.indexOf(_NewDS.filter(function (x) { return x.UnProdReasonId == UnProdReason_1.UnProdReasonId; })[0]);
            _NewDS.splice(_Index, 1);
            var _Index2 = _NewDS.filter(function (x) { return x.ReasonCode == UnProdReason_1.ReasonCode; }).length;
            if (_Index2 > 0) {
                WorningMessage("الرجاء عدم تكرار رقم الكود", "Pleas not repetition Code.");
                getProdReason_ByCatID(Number(txtUnProdCategoryID.value));
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "UnProductionreasons"),
                data: UnProdReason_1,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Updating");
        }
    }
    function Delete(e) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            var UnProdReason = e.Item;
            Ajax.CallAsync({
                url: Url.Action("Delete", "UnProductionreasons"),
                data: UnProdReason,
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
    function btnsearchCategory_Click() {
        sys.FindKey(Modules.prodCategory, "btnsearchCategory", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getProdReason", "UnProductionreasons"),
                data: { id: id },
                success: function (d) {
                    categ = d.result;
                    txtUnProdCategoryID.value = categ.UnProdCategoryID.toString();
                    txtcatName.value = categ.DescA.toString();
                    getProdReason_ByCatID(id);
                    var _Index = GetIndexByUseId(id, "P_D_UnProdCategory", "UnProdCategoryID");
                    NavigateToSearchResultKey(Number(_Index), Navigate);
                }
            });
        });
    }
    function Display() {
        DocumentActions.RenderFromModel(Master);
    }
    function getCategoryName(id) {
        Ajax.CallAsync({
            url: Url.Action("getProdReason", "UnProductionreasons"),
            data: { id: id },
            success: function (d) {
                categ = d.result;
                txtcatName.value = categ.DescA.toString();
            }
        });
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", "UnProductionreasons"),
            success: function (d) {
                Master = d.result;
                Display();
                getCategoryName(Master.UnProdCategoryID);
                getProdReason_ByCatID(Master.UnProdCategoryID);
            }
        });
    }
    function PrintUnProd() {
        if (DataSource == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("PrintUnProd", "PrintTransaction"),
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
})(UnProductionreasons || (UnProductionreasons = {}));
//# sourceMappingURL=UnProductionreasons.js.map