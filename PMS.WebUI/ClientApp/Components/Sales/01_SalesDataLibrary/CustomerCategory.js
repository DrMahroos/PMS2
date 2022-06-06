$(document).ready(function () {
    CustomerCategory.InitalizeComponent();
});
var CustomerCategory;
(function (CustomerCategory) {
    var dataSource = new Array();
    var CustomersGrid = new JsGrid();
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
    CustomerCategory.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("CustCat_");
        CustomersGrid.ElementName = "GridCustomers";
        CustomersGrid.Inserting = SharedSession.CurrentPrivileges.AddNew;
        CustomersGrid.OnRefreshed = function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        CustomersGrid.Editing = SharedSession.CurrentPrivileges.EDIT;
        CustomersGrid.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        CustomersGrid.InsertionMode = JsGridInsertionMode.Binding;
        CustomersGrid.OnItemInserting = Insert;
        CustomersGrid.OnItemUpdating = Update;
        CustomersGrid.OnItemDeleting = Delete;
        CustomersGrid.Columns = [
            { title: res.CustCat_Code, name: "CustomerCatCode", type: "text", width: "2.5%" },
            { title: res.CustCat_DescA, name: "DescA", type: "text", width: "12.5%" },
            { title: res.CustCat_DescE, name: "DescE", type: "text", width: "12.5%" },
            { title: res.CustCat_Remarks, name: "Remarks", type: "text", width: "2.5%" },
            { type: "control", width: "7%" }
        ];
        CustomersGrid.DataSource = dataSource;
        CustomersGrid.Bind();
        loadCustomerCategories();
    }
    function loadCustomerCategories() {
        Ajax.CallAsync({
            url: Url.Action("getCustomerCategories", "CustomerCategory"),
            success: function (d) {
                dataSource = d.result;
                CustomersGrid.DataSource = dataSource;
                CustomersGrid.Bind();
            }
        });
    }
    function Insert(e) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            var CustCat = e.Item;
            CustCat.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "CustomerCategory"),
                data: CustCat,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    loadCustomerCategories();
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
            var CustCat = e.Item;
            Ajax.CallAsync({
                url: Url.Action("Update", "CustomerCategory"),
                data: CustCat,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    loadCustomerCategories();
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
            var CustCat = e.Item;
            Ajax.CallAsync({
                url: Url.Action("Delete", "CustomerCategory"),
                data: CustCat,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                    }
                    loadCustomerCategories();
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
})(CustomerCategory || (CustomerCategory = {}));
//# sourceMappingURL=CustomerCategory.js.map