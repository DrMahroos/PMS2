$(document).ready(() => {
    UnProductioncategory.InitalizeComponent();
});
namespace UnProductioncategory {

    var DataSource: Array<P_D_UnProdCategory> = new Array<P_D_UnProdCategory>();
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
        ControlsButtons.PrintButton.disabled = true;
        InitalizeGrid();
        getUnProdCategory();
    }
    
    function InitalizeGrid() {
        let res: any = GetResourceList("UnProdCat_")
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
        Grid.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;;
        Grid.InsertionMode = JsGridInsertionMode.Binding;
        Grid.OnItemInserting = Insert;
        Grid.OnItemUpdating = Update;
        Grid.OnItemDeleting = Delete;
        Grid.Columns = [
            { title: res.UnProdCat_CategCode, name: "CategCode", type: "text", width: "7.5%" },
            { title: res.UnProdCat_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.UnProdCat_DescE, name: "DescE", type: "text", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }

    function getUnProdCategory() {
        Ajax.CallAsync({
            url: Url.Action("getUnProdCategory", "UnProductioncategory"),
            success: (d) => {
                DataSource = d.result as Array<P_D_UnProdCategory>;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }

    function Insert(e: JsGridInsertEventArgs) {
        
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            let UnProdCategory = e.Item as P_D_UnProdCategory;
            for (var item of DataSource) {
                if (UnProdCategory.CategCode == item.CategCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repetead");
                    return;
                }
            }
            
            UnProdCategory.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "UnProductioncategory"),
                data: UnProdCategory,
                success: (d) => {
                    
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    getUnProdCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للاضافة", "No permission for Inserting");
        }
    }

    function Update(e: JsGridUpdateEventArgs) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            let UnProdCategory = e.Item as P_D_UnProdCategory;
            let _NewDS = DataSource;
            let _Index = _NewDS.indexOf(_NewDS.filter(x => x.UnProdCategoryID == UnProdCategory.UnProdCategoryID)[0]);
            _NewDS.splice(_Index, 1);
            let _Index2 = _NewDS.filter(x => x.CategCode == UnProdCategory.CategCode).length;
            if (_Index2 > 0) {
                WorningMessage("الرجاء عدم تكرار رقم الكود", "Pleas not repetition Code.");
                getUnProdCategory();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "UnProductioncategory"),
                data: UnProdCategory,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    getUnProdCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Updating");
        }
    }

    function Delete(e: JsGridDeleteEventArgs) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            let UnProdCategory = e.Item as P_D_UnProdCategory;
            Ajax.CallAsync({
                url: Url.Action("Delete", "UnProductioncategory"),
                data: UnProdCategory,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                        WorningMessage("لا يمكن حذف هذا العنصر لانة مرتبط ببعض بيانات العمال الاخرى", "Cann't Delete This Item Beacuase It Used In Other Labor Info");
                    }
                    getUnProdCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Deleting");
        }
    }
}