$(document).ready(() => {
    UnitsOfMeasure.InitalizeComponent();
});
namespace UnitsOfMeasure {

    var DataSource: Array<P_D_UOM> = new Array<P_D_UOM>();
    var Grid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    //var _ScreenLanguage: string;
    var _CompCode: string;
    //var _BranchCode: string;

    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        //_ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        //_BranchCode = SharedSession.CurrentEnvironment.BranchCode;

        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditButton.disabled = true;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintButton.disabled = true;
        InitalizeGrid();
        getUnitOfMeasure();
    }
    
    function InitalizeGrid() {
        let res: any = GetResourceList("UnitMeasre_")
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
            { title: res.UnitMeasre_UomCode, name: "UomCode", type: "text", width: "7.5%" },
            { title: res.UnitMeasre_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.UnitMeasre_DescE, name: "DescE", type: "text", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }

    function getUnitOfMeasure() {        
        Ajax.CallAsync({
            url: Url.Action("getUnitOfMeasure", "UnitsOfMeasure"),
            success: (d) => {
                DataSource = d.result as Array<P_D_UOM>;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }

    function Insert(e: JsGridInsertEventArgs) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            let uom = e.Item as P_D_UOM;
            for (var item of DataSource) {
                if (uom.UomCode == item.UomCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repeted");
                    return;
                }
            }
            uom.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "UnitsOfMeasure"),
                data: uom,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    getUnitOfMeasure();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية لاضافة", "No permission for Inserting");
        }
    }

    function Update(e: JsGridUpdateEventArgs) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            let uom = e.Item as P_D_UOM;
            let _NewDS = DataSource;
            let _Index = _NewDS.indexOf(_NewDS.filter(x => x.UomID == uom.UomID)[0]);
            _NewDS.splice(_Index, 1);
            let _Index2 = _NewDS.filter(x => x.UomCode == uom.UomCode).length;
            if (_Index2 > 0) {
                WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
                getUnitOfMeasure();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "UnitsOfMeasure"),
                data: uom,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    getUnitOfMeasure();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Updating");
        }
    }

    function Delete(e: JsGridDeleteEventArgs) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            let uom = e.Item as P_D_UOM;
            Ajax.CallAsync({
                url: Url.Action("Delete", "UnitsOfMeasure"),
                data: uom,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                        WorningMessage("لا يمكن حذف هذا العنصر لانة مرتبط ببعض البيانات الاخرى", "Cann't Delete This Item Beacuase It Used In Other Labor Info");
                    }
                    getUnitOfMeasure();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Deleting");
        }
    }
}