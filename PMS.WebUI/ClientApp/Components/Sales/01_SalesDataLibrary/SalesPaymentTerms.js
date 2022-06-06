$(document).ready(function () {
    SalesPaymentTerms.InitalizeComponent();
});
var SalesPaymentTerms;
(function (SalesPaymentTerms) {
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
    SalesPaymentTerms.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("SalPayT_");
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
            { title: res.SalPayT_PaymentCode, name: "PaymentCode", type: "text", width: "2.5%" },
            { title: res.SalPayT_DescA, name: "DescA", type: "text", width: "13.5%" },
            { title: res.SalPayT_DescE, name: "DescE", type: "text", width: "13.5%" },
            { title: res.SalPayT_Remarks, name: "Remarks", type: "text", width: "10.5%" },
            { type: "control", width: "2%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
        loadSalesResponsibilities();
    }
    function loadSalesResponsibilities() {
        Ajax.CallAsync({
            url: Url.Action("getSalesResponsibilities", "SalesPaymentTerms"),
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
            SlsRes.CompCode = Number(_CompCode);
            for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
                var item = DataSource_1[_i];
                if (SlsRes.PaymentCode == item.PaymentCode) {
                    WorningMessage("الرجاء عدم تكرار رقم التصنيف", "Please Enter not repeated Code");
                    return;
                }
            }
            Ajax.CallAsync({
                url: Url.Action("Insert", "SalesPaymentTerms"),
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
            var _Index = _NewDS.indexOf(_NewDS.filter(function (x) { return x.PaymentId == SlsRes_1.PaymentId; })[0]);
            _NewDS.splice(_Index, 1);
            var _Index2 = _NewDS.filter(function (x) { return x.PaymentCode == SlsRes_1.PaymentCode; }).length;
            if (_Index2 > 0) {
                WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
                loadSalesResponsibilities();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "SalesPaymentTerms"),
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
                url: Url.Action("Delete", "SalesPaymentTerms"),
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
})(SalesPaymentTerms || (SalesPaymentTerms = {}));
//# sourceMappingURL=SalesPaymentTerms.js.map