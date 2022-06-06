$(document).ready(() => {
    SalesPayTerms.InitalizeComponent();
});
namespace SalesPayTerms {

    var DataSource: Array<P_D_SalesPaymentTerms> = new Array<P_D_SalesPaymentTerms>();

    var Grid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();

    export function InitalizeComponent() {

        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();

        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditButton.disabled = true;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintButton.disabled = true;

        InitalizeGrid();
        ShowData();
    }

    function InitalizeGrid() {

        let res: any = GetResourceList("CustCat_");

        console.log(res);

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
            success: (d) => {
                DataSource = d.result as Array<P_D_SalesPaymentTerms>;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }


    function Insert(e: JsGridInsertEventArgs) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            let CustCat = e.Item as P_D_SalesPaymentTerms;
            for (let item of DataSource) {
                if (CustCat.PaymentCode == item.PaymentCode) {
                    WorningMessage("الرجاء عدم تكرار رقم التصنيف", "Please not repitition Site Eng Category No.");
                    return;
                }
            }
            CustCat.CompCode = Number(ClientSharedWork.Session.CompCode);

            Ajax.CallAsync({
                url: Url.Action("Insert", "SalesPayTerms"),
                data: CustCat,
                success: (d) => {
                    let result = d.result as ResponseResult;
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

    function Update(e: JsGridUpdateEventArgs) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            let CustCat = e.Item as P_D_SalesPaymentTerms;
            let _NewDS = DataSource;
            let _Index = _NewDS.indexOf(_NewDS.filter(x => x.PaymentId == CustCat.PaymentId)[0]);
            _NewDS.splice(_Index, 1);
            let _Index2 = _NewDS.filter(x => x.PaymentCode == CustCat.PaymentCode).length;
            if (_Index2 > 0) {
                WorningMessage("الرجاء عدم تكرار رقم الكود", "Pleas not repitition Code.");
                ShowData();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "SalesPayTerms"),
                data: CustCat,
                success: (d) => {

                    let result = d.result as ResponseResult;
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

    function Delete(e: JsGridDeleteEventArgs) {

        if (SharedSession.CurrentPrivileges.Remove == true) {
            let CustCat = e.Item as P_D_SalesPaymentTerms;
            Ajax.CallAsync({
                url: Url.Action("Delete", "SalesPayTerms"),
                data: CustCat,
                success: (d) => {
                    let result = d.result as ResponseResult;
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
}