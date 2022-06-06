$(document).ready(() => {
    LaborOvertimetypes.InitalizeComponent();
});
namespace LaborOvertimetypes {
    var DataSource: Array<P_D_LaborOverTimeType> = new Array < P_D_LaborOverTimeType>();
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
        getLaborOverTimeType();
    }
    
    function InitalizeGrid() {
        let res: any = GetResourceList("LabOvTime_")
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
            { title: res.LabOvTime_OverTimeCode, name: "OverTimeCode", type: "text", width: "7.5%" },
            { title: res.LabOvTime_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.LabOvTime_DescE, name: "DescE", type: "text", width: "7.5%" },
            { title: res.LabOvTime_Rate, name: "Rate", type: "number", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }

    function getLaborOverTimeType() {
        Ajax.CallAsync({
            url: Url.Action("getLaborOverTimeType", "LaborOvertimetypes"),
            success: (d) => {
                DataSource = d.result as Array<P_D_LaborOverTimeType>;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }

    function Insert(e: JsGridInsertEventArgs) {
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            let LabOver = e.Item as P_D_LaborOverTimeType;
            for (var item of DataSource) {
                if (LabOver.OverTimeCode == item.OverTimeCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repetead");
                    return;
                }
            }
            LabOver.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "LaborOvertimetypes"),
                data: LabOver,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    getLaborOverTimeType();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للاضافة", "No permission for Inserting");
        }
    }

    function Update(e: JsGridUpdateEventArgs) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            let LabOver = e.Item as P_D_LaborOverTimeType;
            let _NewDS = DataSource;
            let _Index = _NewDS.indexOf(_NewDS.filter(x => x.LaborOverTimeTypeID == LabOver.LaborOverTimeTypeID)[0]);
            _NewDS.splice(_Index, 1);
            let _Index2 = _NewDS.filter(x => x.OverTimeCode == LabOver.OverTimeCode).length;
            if (_Index2 > 0) {
                WorningMessage("الرجاء عدم تكرار رقم الكود", "Pleas not repetition Code.");
                getLaborOverTimeType();
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "LaborOvertimetypes"),
                data: LabOver,
                success: (d) => {

                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    getLaborOverTimeType();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Updating");
        }
    }

    function Delete(e: JsGridDeleteEventArgs) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            let LabOver = e.Item as P_D_LaborOverTimeType;
            Ajax.CallAsync({
                url: Url.Action("Delete", "LaborOvertimetypes"),
                data: LabOver,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                    }
                    getLaborOverTimeType();
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Deleting");
        }
    }
}