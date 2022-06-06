$(document).ready(function () {
    SalesPayTerms.InitalizeComponent();
});
var SalesPayTerms;
(function (SalesPayTerms) {
    var DataSource = new Array();
    var Grid = new JsGrid();
    var sys = new SystemTools();
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditButton.disabled = true;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintButton.disabled = true;
        InitalizeGrid();
        ShowData();
    }
    SalesPayTerms.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("CustCat_");
        console.log(res);
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
            { title: res.CustCat_Code, name: "PaymentCode", type: "text", width: "7.5%" },
            { title: res.CustCat_DescE, name: "DescE", type: "text", width: "7.5%" },
            { title: res.CustCat_DescA, name: "DescA", type: "text", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    function ShowData() {
        Ajax.CallAsync({
            url: Url.Action("getSalesResponsibilities", "SalesPayTerms"),
            success: function (d) {
                DataSource = d.result;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }
    function Insert(e) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            var CustCat = e.Item;
            for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
                var item = DataSource_1[_i];
                if (CustCat.PaymentCode == item.PaymentCode) {
                    WorningMessage("الرجاء عدم تكرار رقم التصنيف", "Please not repitition Site Eng Category No.");
                    return;
                }
            }
            CustCat.CompCode = Number(ClientSharedWork.Session.CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "SalesPayTerms"),
                data: CustCat,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    ShowData();
                }
            });
        }
        else {
            if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                MessageBox.Show("لا يوجد صلاحية للأضافة", "خطأ");
            }
            else {
                MessageBox.Show("No permission for Adding", "Error");
            }
        }
    }
    function Update(e) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            var CustCat_1 = e.Item;
            var _NewDS = DataSource;
            var _Index = _NewDS.indexOf(_NewDS.filter(function (x) { return x.PaymentId == CustCat_1.PaymentId; })[0]);
            _NewDS.splice(_Index, 1);
            var _Index2 = _NewDS.filter(function (x) { return x.PaymentCode == CustCat_1.PaymentCode; }).length;
            if (_Index2 > 0) {
                WorningMessage("الرجاء عدم تكرار رقم الكود", "Pleas not repitition Code.");
                ShowData();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "SalesPayTerms"),
                data: CustCat_1,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    ShowData();
                }
            });
        }
        else {
            if (ClientSharedWork.Session.ScreenLanguage == "ar") {
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
                url: Url.Action("Delete", "SalesPayTerms"),
                data: CustCat,
                success: function (d) {
                    var result = d.result;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                    }
                    ShowData();
                }
            });
        }
        else {
            if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                MessageBox.Show("لا يوجد صلاحية للحذف", "خطأ");
            }
            else {
                MessageBox.Show("No permission for Deleting", "Error");
            }
        }
    }
})(SalesPayTerms || (SalesPayTerms = {}));
//# sourceMappingURL=SalesPayTerms.js.map