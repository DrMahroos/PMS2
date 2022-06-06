$(document).ready(() => {
    SalesEngCategory.InitalizeComponent();
});
namespace SalesEngCategory {
    var DataSource: Array<P_D_SalesEngCateory> = new Array<P_D_SalesEngCateory>();
    var Grid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    var _ScreenLanguage: string;
    var _CompCode: string;
    //var _BranchCode: string;


    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        //_BranchCode = SharedSession.CurrentEnvironment.BranchCode;

        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditButton.disabled = true;
        ControlsButtons.DeleteButton.disabled = true;
       ControlsButtons.PrintButton.disabled = false;
      
       ControlsButtons.PrintAction(() => { PrintCatEng() });
       InitalizeGrid();
      
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
            { title: res.SEngCat_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.SEngCat_DescE, name: "DescE", type: "text", width: "7.5%" },
            { title: res.SEngCat_Rate, name: "Rate", type: "number", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
        loadSalesCategory();
        
    }
   
    function loadSalesCategory() {
        Ajax.CallAsync({
            url: Url.Action("getSalesEngCateory", "SalesEngCategory"),
            success: (d) => {
                DataSource = d.result as Array<P_D_SalesEngCateory>;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }

    function Insert(e: JsGridInsertEventArgs) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            let Cat = e.Item as P_D_SalesEngCateory;
            let res: boolean = Validation(Cat);
            if (res == true)
                return;
                for (let item of DataSource) {
                    if (Cat.CategCode == item.CategCode) {
                        WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
                      
                        return;
                    }
                }
               
            Cat.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "SalesEngCategory"),
                data: Cat,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == true) {
                        MessageBox.Show("Data Saved", "Insert");
                    }
                    loadSalesCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للأضافة", "No permission for Adding");
        }
    }

    function Update(e: JsGridUpdateEventArgs) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            let Cat = e.Item as P_D_SalesEngCateory;
            let res: boolean = Validation(Cat);
            if (res == true)
                return;
            let _NewDS = DataSource;
            let _Index = _NewDS.indexOf(_NewDS.filter(x => x.SalesEngCategoryId == Cat.SalesEngCategoryId)[0]);
            _NewDS.splice(_Index, 1);
            let _Index2 = _NewDS.filter(x => x.CategCode == Cat.CategCode).length;
            if (_Index2 > 0) {
                WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
                loadSalesCategory();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "SalesEngCategory"),
                data: Cat,

                success: (d) => {

                    let result = d.result as ResponseResult;
                    if (result.ResponseData == 1) {
                        WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
                    }
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    loadSalesCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Editing");
        }
    }

    function Delete(e: JsGridDeleteEventArgs) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
           
            let Cat = e.Item as P_D_SalesEngCateory;
            
            Ajax.CallAsync({
                url: Url.Action("Delete", "SalesEngCategory"),
                data: Cat,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == true) {
                        MessageBox.Show("Data Deleted", "Delete");
                    }
                    else {
                        MessageBox.Show("the  " + Cat.SalesEngCategoryId+"use as FK in another Table", "Can't Delete");
                    }
                    loadSalesCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Deleting");
        }
    }
//   = PrintCatEng;
    function PrintCatEng() {
        
        
        Ajax.CallAsync({
            url: Url.Action("PrintCatEng", "PrintTransaction"),
           
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });

    }
    function Validation(Category: P_D_SalesEngCateory) {
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