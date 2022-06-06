$(document).ready(() => {
    LaborCategory.InitalizeComponent();
});
namespace LaborCategory {

    var DataSource: Array<P_D_LaborCategory> = new Array<P_D_LaborCategory>();
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
        loadLabCategory();
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("LabCat_");
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
            { title: res.LabCat_CategCode, name: "CategCode", type: "text", width: "7.5%" },
            { title: res.LabCat_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.LabCat_DescE, name: "DescE", type: "text", width: "7.5%" },
            { title: res.LabCat_BonusRate, name: "BonusRate", type: "number", width: "7.5%" },
            { title: res.LabCat_Remarks, name: "Remarks", type: "text", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }

    function loadLabCategory() {
        Ajax.CallAsync({
            url: Url.Action("getLaborCategory", "LaborCategory"),
            success: (d) => {
                DataSource = d.result as Array<P_D_LaborCategory>;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }

    function Insert(e: JsGridInsertEventArgs) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            let LabCat = e.Item as P_D_LaborCategory;
            for (var item of DataSource) {
                if (LabCat.CategCode == item.CategCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repetead");
                    return;
                }
            }
            LabCat.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "LaborCategory"),
                data: LabCat,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    loadLabCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للاضافة", "No permission for Inserting");
        }
    }

    function Update(e: JsGridUpdateEventArgs) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            let LabCat = e.Item as P_D_LaborCategory;
            let _NewDS = DataSource;
            let _Index = _NewDS.indexOf(_NewDS.filter(x => x.LaborCategoryId == LabCat.LaborCategoryId)[0]);
            _NewDS.splice(_Index, 1);
            let _Index2 = _NewDS.filter(x => x.CategCode == LabCat.CategCode).length;
            if (_Index2 > 0) {
                WorningMessage("الرجاء عدم تكرار رقم الكود", "Pleas not repetition Code.");
                loadLabCategory();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "LaborCategory"),
                data: LabCat,
                success: (d) => {

                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    loadLabCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Updating");
        }
    }

    function Delete(e: JsGridDeleteEventArgs) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            let LabCat = e.Item as P_D_LaborCategory;
            Ajax.CallAsync({
                url: Url.Action("Delete", "LaborCategory"),
                data: LabCat,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false)
                        WorningMessage("لا يمكن حذف هذا العنصر لانة مرتبط ببعض بيانات العمال الاخرى", "Cann't Delete This Item Beacuase It Used In Other Labor Info");

                    loadLabCategory();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Deleting");
        }
    }
}