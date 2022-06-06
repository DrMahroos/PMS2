$(document).ready(() => {
    SalesPaymentTerms.InitalizeComponent();
});
namespace SalesPaymentTerms {
    var DataSource: Array<P_D_SalesPaymentTerms> = new Array<P_D_SalesPaymentTerms>();

    var Grid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    var _ScreenLang: string;
    var _CompCode: string;
    var _BraCode: string;
    export function InitalizeComponent() {
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

    function InitalizeGrid() {
        let res: any = GetResourceList("SalPayT_");
        Grid.ElementName = "Grid";
        Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
        Grid.OnRefreshed = () => {
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
            success: (d) => {
                DataSource = d.result as Array<P_D_SalesPaymentTerms>;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }


    function Insert(e: JsGridInsertEventArgs) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            let SlsRes = e.Item as P_D_SalesPaymentTerms;
            SlsRes.CompCode = Number(_CompCode);
            for (let item of DataSource) {
                if (SlsRes.PaymentCode == item.PaymentCode) {
                    WorningMessage("الرجاء عدم تكرار رقم التصنيف", "Please Enter not repeated Code");
                    return;
                }
            }
            Ajax.CallAsync({
                url: Url.Action("Insert", "SalesPaymentTerms"),
                data: SlsRes,
                success: (d) => {
                    let result = d.result as ResponseResult;
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

    function Update(e: JsGridUpdateEventArgs) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            let SlsRes = e.Item as P_D_SalesPaymentTerms;
            let _NewDS = DataSource;
            let _Index = _NewDS.indexOf(_NewDS.filter(x => x.PaymentId == SlsRes.PaymentId)[0]);
            _NewDS.splice(_Index, 1);
            let _Index2 = _NewDS.filter(x => x.PaymentCode == SlsRes.PaymentCode).length;
            if (_Index2 > 0) {
                WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
                loadSalesResponsibilities();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "SalesPaymentTerms"),
                data: SlsRes,
                success: (d) => {

                    let result = d.result as ResponseResult;
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

    function Delete(e: JsGridDeleteEventArgs) {

        if (SharedSession.CurrentPrivileges.Remove == true) {
            let SlsRes = e.Item as P_D_SalesPaymentTerms;
            Ajax.CallAsync({
                url: Url.Action("Delete", "SalesPaymentTerms"),
                data: SlsRes,
                success: (d) => {
                    let result = d.result as ResponseResult;
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
}