$(document).ready(function () {
    CompanyRespItem.InitalizeComponent();
});
var CompanyRespItem;
(function (CompanyRespItem) {
    var ControlerName = "CompanyRespItem";
    var DataSource = new Array();
    var Grid = new JsGrid();
    var sys = new SystemTools();
    var _ScreenLang;
    var _CompCode;
    var _BraCode;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BraCode = SharedSession.CurrentEnvironment.BranchCode;
        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditButton.disabled = true;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintButton.disabled = true;
        InitalizeGrid();
    }
    CompanyRespItem.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("CustCat_");
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
            { title: res.CustCat_Code, name: "ResposibilityCode", type: "text", width: "7.5%" },
            { title: res.CustCat_DescE, name: "DescE", type: "text", width: "7.5%" },
            { title: res.CustCat_DescA, name: "DescA", type: "text", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
        loadSalesResponsibilities();
    }
    function loadSalesResponsibilities() {
        Ajax.CallAsync({
            url: Url.Action("getSalesResponsibilities", ControlerName),
            success: function (d) {
                DataSource = d.result;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }
    function Insert(e) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            var SlsRes = e.Item;
            SlsRes.IsCustomer = false;
            SlsRes.CompCode = Number(_CompCode);
            var newDataSource = DataSource.filter(function (x) { return x.IsCustomer == false && x.CompCode == Number(_CompCode); });
            for (var _i = 0, newDataSource_1 = newDataSource; _i < newDataSource_1.length; _i++) {
                var item = newDataSource_1[_i];
                if (SlsRes.ResposibilityCode == item.ResposibilityCode && item.IsCustomer == false) {
                    WorningMessage("الرجاء عدم تكرار رقم التصنيف", "Please not repitition Site Eng Category No.");
                    return;
                }
            }
            Ajax.CallAsync({
                url: Url.Action("Insert", ControlerName),
                data: SlsRes,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    loadSalesResponsibilities();
                }
            });
        }
        else {
            if (_ScreenLang == "ar") {
                MessageBox.Show("لا يوجد صلاحية للأضافة", "خطأ");
            }
            else {
                MessageBox.Show("No permission for Adding", "Error");
            }
        }
    }
    function Update(e) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            var SlsRes_1 = e.Item;
            var _NewDS = DataSource;
            var _Index = _NewDS.indexOf(_NewDS.filter(function (x) { return x.ReposibilityId == SlsRes_1.ReposibilityId; })[0]);
            _NewDS.splice(_Index, 1);
            var _Index2 = _NewDS.filter(function (x) { return x.ResposibilityCode == SlsRes_1.ResposibilityCode; }).length;
            if (_Index2 > 0) {
                WorningMessage("الرجاء عدم تكرار رقم الكود", "Pleas not repitition Code.");
                loadSalesResponsibilities();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", ControlerName),
                data: SlsRes_1,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    loadSalesResponsibilities();
                }
            });
        }
        else {
            if (_ScreenLang == "ar") {
                MessageBox.Show("لا يوجد صلاحية للتعديل", "خطأ");
            }
            else {
                MessageBox.Show("No permission for Editing", "Error");
            }
        }
    }
    function Delete(e) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            var SlsRes = e.Item;
            Ajax.CallAsync({
                url: Url.Action("Delete", ControlerName),
                data: SlsRes,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                    }
                    loadSalesResponsibilities();
                }
            });
        }
        else {
            if (_ScreenLang == "ar") {
                MessageBox.Show("لا يوجد صلاحية للحذف", "خطأ");
            }
            else {
                MessageBox.Show("No permission for Deleting", "Error");
            }
        }
    }
})(CompanyRespItem || (CompanyRespItem = {}));
//# sourceMappingURL=CompanyRespItem.js.map