$(document).ready(() => {
    LaborClass.InitalizeComponent();
});
namespace LaborClass {
    var DataSource: Array<P_D_LaborClass> = new Array<P_D_LaborClass>();
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
        ControlsButtons.PrintAction(() => { PrintLobClas() });
        InitalizeGrid();
        loadLaborClasses();
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("LabClass_");
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
            { title: res.LabClass_ClassCode, name: "ClassCode", type: "text", width: "7.5%" },
            { title: res.LabClass_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.LabClass_DescE, name: "DescE", type: "text", width: "7.5%" },
            { title: res.LabClass_HourCost, name: "HourCost", type: "number", width: "7.5%" },
            { title: res.LabClass_BonusAddFactor, name: "BonusAddFactor", type: "number", width: "7.5%" },
            { title: res.LabClass_BonusDedFactor, name: "BonusDedFactor", type: "number", width: "7.5%" },
            { title: res.LabClass_Remarks, name: "Remarks", type: "text", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }

    function loadLaborClasses() {
        Ajax.CallAsync({
            url: Url.Action("getLaborClasses", "LaborClass"),
            success: (d) => {
                DataSource = d.result as Array<P_D_LaborClass>;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }

    function Insert(e: JsGridInsertEventArgs) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            let LabCat = e.Item as P_D_LaborClass;
            for (var item of DataSource) {
                if (LabCat.ClassCode == item.ClassCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repetead");
                    return;
                }
            }
            LabCat.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "LaborClass"),
                data: LabCat,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    loadLaborClasses();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للاضافة", "No permission for Inserting");
        }
    }

    function Update(e: JsGridUpdateEventArgs) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            let LabCat = e.Item as P_D_LaborClass;
            let _NewDS = DataSource;
            let _Index = _NewDS.indexOf(_NewDS.filter(x => x.LaborClassId == LabCat.LaborClassId)[0]);
            _NewDS.splice(_Index, 1);
            let _Index2 = _NewDS.filter(x => x.ClassCode == LabCat.ClassCode).length;
            if (_Index2 > 0) {
                WorningMessage("الرجاء عدم تكرار رقم الكود", "Pleas not repetition Code.");
                loadLaborClasses();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "LaborClass"),
                data: LabCat,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    loadLaborClasses();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Updating");
        }
    }

    function Delete(e: JsGridDeleteEventArgs) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            let LabCat = e.Item as P_D_LaborClass;
            Ajax.CallAsync({
                url: Url.Action("Delete", "LaborClass"),
                data: LabCat,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        WorningMessage("لا يمكن حذف هذا العنصر لانة مرتبط ببعض بيانات العمال الاخرى", "Cann't Delete This Item Beacuase It Used In Other Labor Info");
                    }
                    loadLaborClasses();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Deleting");
        }
    }

    function PrintLobClas() {
        

        if (DataSource == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("PrintLobClas", "PrintTransaction"),
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });

    }
}