$(document).ready(() => {
    ScopeClassandCat.InitalizeComponent();
});
namespace ScopeClassandCat {
    var DataSource: Array<P_D_ScopeCategory> = new Array<P_D_ScopeCategory>();
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
        getScopeCategory();
    }
    
    function InitalizeGrid() {
        let res: any = GetResourceList("ScopClassCat_")
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
            { title: res.ScopClassCat_ScopeCategCode, name: "ScopeCategCode", type: "text", width: "7.5%" },
            { title: res.ScopClassCat_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.ScopClassCat_DescE, name: "DescE", type: "text", width: "7.5%" },
            { type: "control", width: "7%", }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }

    function getScopeCategory() {
        Ajax.CallAsync({
            url: Url.Action("getScopeCategory", "ScopeClassandCat"),
            success: (d) => {
                DataSource = d.result as Array<P_D_ScopeCategory>;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }

    function Insert(e: JsGridInsertEventArgs) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            let ScopCat = e.Item as P_D_ScopeCategory;
            for (var item of DataSource) {
                if (ScopCat.ScopeCategCode == item.ScopeCategCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repeted");
                    return;
                }
            }
            ScopCat.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "ScopeClassandCat"),
                data: ScopCat,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    getScopeCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للاضافة", "No permission for Inserting");
        }
    }

    function Update(e: JsGridUpdateEventArgs) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            let ScopCat = e.Item as P_D_ScopeCategory;
            let _NewDS = DataSource;
            let _Index = _NewDS.indexOf(_NewDS.filter(x => x.ScopeCategoryID == ScopCat.ScopeCategoryID)[0]);
            _NewDS.splice(_Index, 1);
            let _Index2 = _NewDS.filter(x => x.ScopeCategCode == ScopCat.ScopeCategCode).length;
            if (_Index2 > 0) {
                WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
                getScopeCategory();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "ScopeClassandCat"),
                data: ScopCat,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    getScopeCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Updating");
        }
    }

    function Delete(e: JsGridDeleteEventArgs) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            let ScopCat = e.Item as P_D_ScopeCategory;
            Ajax.CallAsync({
                url: Url.Action("Delete", "ScopeClassandCat"),
                data: ScopCat,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                        WorningMessage("لا يمكن حذف هذا العنصر لانة مرتبط ببعض البيانات الاخرى", "Cann't Delete This Item Beacuase It Used In Other Labor Info");
                    }
                    getScopeCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Deleting");
        }
    }
}