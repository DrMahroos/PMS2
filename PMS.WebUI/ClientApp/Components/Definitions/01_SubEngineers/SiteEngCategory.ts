$(document).ready(() => {
    SiteEngCategory.InitalizeComponent();
});
namespace SiteEngCategory {
    var DataSource: Array<P_D_SiteEngCategory> = new Array<P_D_SiteEngCategory>();

    var Grid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    //var _ScreenLanguage: string;
    //var _CompCode: string;
    //var _BranchCode: string;

    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        //_ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        //_CompCode = SharedSession.CurrentEnvironment.CompCode;
        //_BranchCode = SharedSession.CurrentEnvironment.BranchCode;

        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditButton.disabled = true;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintButton.disabled = false;
        ControlsButtons.PrintAction(() => { PrintCatEng() });
        InitalizeGrid();
        load();
    }
    
    function InitalizeGrid() {
        let res: any = GetResourceList("SEngCat_");
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
       Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
       Grid.Editing = SharedSession.CurrentPrivileges.EDIT;
       Grid.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
       Grid.InsertionMode = JsGridInsertionMode.Binding;
       Grid.OnItemInserting = Insert;
       Grid.OnItemUpdating = Update;
       Grid.OnItemDeleting = Delete;
       Grid.Columns = [
            { title: res.SEngCat_CategCode, name: "CategCode", type: "text", width: "7.5%" },
            { title:res.SEngCat_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title:res.SEngCat_DescE , name: "DescE", type: "text", width: "7.5%" },
            { title:res.SEngCat_Rate, name: "Rate", type: "number", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
       
    }

    function load() {
        Ajax.CallAsync({
            url: Url.Action("Load", "SiteEngCategory"),
            success: (d) => {
                DataSource = d.result as Array<P_D_SiteEngCategory>;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }

    function Insert(e: JsGridInsertEventArgs) {
        
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            let Category = e.Item as P_D_SiteEngCategory;
            let res: boolean = Validation(Category);
            if (res == true)
                return;
            for (let item of DataSource) {
                if (Category.CategCode == item.CategCode) {
                    WorningMessage("الرجاء عدم تكرار رقم التصنيف", "Please not Repetition Site Eng Category No.");
                    return;
                }
            }

            Ajax.CallAsync({
                url: Url.Action("Insert", "SiteEngCategory"),
                data: Category,
                success: (d) => {
                    let msg: string = ReturnMsg("تم حفظ البيانات  ", "Data Saved  ");
                    let msg1: string = ReturnMsg(" ادخال   ", "Insert  ");
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == true) {
                        let res = result.ResponseData as P_D_SiteEngCategory;
                        MessageBox.Show(msg, msg1);
                        load();
                    }
                    else
                        MessageBox.Show(result.ResponseMessage, "Insert");
                }
            });

        }
        else {
            WorningMessage("لا يوجد صلاحية للأضافة", "No permission for Adding");
        }
    }

    function Update(e: JsGridUpdateEventArgs) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            let Cat = e.Item as P_D_SiteEngCategory;
            let res: boolean = Validation(Cat);
            if (res == true)
                return;
            let _NewDS = DataSource;
            let _Index = _NewDS.indexOf(_NewDS.filter(x => x.SiteEngCategoryId == Cat.SiteEngCategoryId)[0]);
            _NewDS.splice(_Index, 1);
            let _Index2 = _NewDS.filter(x => x.CategCode == Cat.CategCode).length;
            if (_Index2 > 0) {
                WorningMessage("الرجاء عدم تكرار رقم الكود", "Pleas not Repetition Code.");
                load();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "SiteEngCategory"),
                data: Cat,
                success: (d) => {
                    let msg: string = ReturnMsg("تم تعديل البيانات  ", "Data Saved  ");
                    let msg1: string = ReturnMsg(" تعديل   ", "update  ");
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == true) {

                        MessageBox.Show(msg, msg1);
                        load();
                    }
                    else
                        MessageBox.Show(result.ResponseMessage, "Update");
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Editing");
        }
    }

    function Delete(e: JsGridDeleteEventArgs) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            
            let Category = e.Item as P_D_SiteEngCategory;
            Ajax.CallAsync({
                url: Url.Action("Delete", "SiteEngCategory"),
                data: Category,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == true) {
                        let msg: string = ReturnMsg("تم حذف البيانات  ", "Data Delete  ");
                        let msg1: string = ReturnMsg(" حذف   ", "Delete  ");
                        MessageBox.Show(msg, msg1);
                        load();
                    }
                    else {
                        WorningMessage("لا يمكن الحذف لانه مرتبط ببيانات اخري", "Can't Delete because this item related another data");
                        load();
                    }
                }
            });
        }
        
    }
    function PrintCatEng() {


        Ajax.CallAsync({
            url: Url.Action("PrintCatSiteEng", "PrintTransaction"),

            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });

    }
    function Validation(Category: P_D_SiteEngCategory) {
        let res: boolean = false;
        if (IsNullOrEmpty(Category.CategCode)) {
            WorningMessage("يجب ادخال رقم التصنيف", "Site Eng Category Code Required");
            res = true;
        }
        else if (IsNullOrEmpty(Category.DescA)) {
            WorningMessage("يجب ادخال إسم التصنيف", "Site Eng Categorys Name Required");
            res = true;
        }
        return res;
    }
}