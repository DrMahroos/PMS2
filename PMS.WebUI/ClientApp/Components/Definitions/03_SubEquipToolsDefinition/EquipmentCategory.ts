$(document).ready(() => {
    EquipmentCategory.InitalizeComponent();

});
namespace EquipmentCategory {
    let ControllerName: string = "EquipmentCategory";
    var DataSource: Array<P_D_EquipmentClass> = new Array<P_D_EquipmentClass>();
    var ccc: string = "disabled";
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

        InitalizeGrid();

        ControlsButtons.PrintButton.disabled = false;
        ControlsButtons.PrintAction(() => { PrintEuqipClas() });
        LoadData();
    } 
    
    function InitalizeGrid() { 
        let res: any = GetResourceList("EqCat_");
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
            { title: res.EqCat_ClassCode , name: "ClassCode", type: "text", width: "7.5%" },
            { title: res.EqCat_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.EqCat_DescE, name: "DescE", type: "text", width: "7.5%" },
            { title: res.EqCat_DeprRate, name: "DeprRate", type: "text", width: "7.5%" },
            { title: res.EqCat_HourDeprCost, name: "HourDeprCost", type: "text", width: "7.5%" },
            { title: res.EqCat_HourOprCost, name: "HourOprCost", type: "text", width: "7.5%" },
            { title: res.EqCat_HourCost, css: "ccc", name: "HourCost", type: "label", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }

    function Insert(e: JsGridInsertEventArgs) {
        
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            let Equipment = e.Item as P_D_EquipmentClass;
            Equipment.CompCode = Number(_CompCode);
            for (var item of DataSource) {
                if (Equipment.ClassCode == item.ClassCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repeat");
                    return;
                }
            }
            Equipment.HourCost = Number(Equipment.HourDeprCost) + Number(Equipment.HourOprCost);
            Ajax.CallAsync({
                url: Url.Action("Insert", ControllerName),
                data: Equipment,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == true) {
                        WorningMessage("تم الحفظ بنجاح", "Successfully saved", "الاضافه", "Insert");
                        DataSource.push(Equipment);
                        BindDataGrids();
                    } else {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للأضافة", "No permission for Adding");
        }
    }

    function Update(e: JsGridUpdateEventArgs) {
        let Equipment = e.Item as P_D_EquipmentClass;
        if (Visibility(Equipment) == false)
            return;
        let _NewDS = DataSource;
        let _Index = _NewDS.indexOf(_NewDS.filter(x => x.EquipClassId == Equipment.EquipClassId)[0]);
        _NewDS.splice(_Index, 1);
        let _Index2 = _NewDS.filter(x => x.ClassCode == Equipment.ClassCode).length;
        if (_Index2 > 0) {
            WorningMessage("الرجاء عدم تكرار كود المعدة", "Pleas not repetition Equipment No.");
            LoadData();
            return false;
        }
        Equipment.HourCost = Number(Equipment.HourDeprCost) + Number(Equipment.HourOprCost);
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            Ajax.CallAsync({
                url: Url.Action("Update", ControllerName),
                data: Equipment,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == true) {
                        WorningMessage("تم الحفظ بنجاح", "Successfully saved", "التعديل", "Update");
                        BindDataGrids();
                        LoadData();
                    }
                    else {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Editing", "خطأ", "Error");
        }
    }

    function Delete(e: JsGridDeleteEventArgs) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            let Equipment = e.Item as P_D_EquipmentClass;
            Ajax.CallAsync({
                url: Url.Action("Delete", ControllerName),
                data: Equipment,
                success: (d) => {
                    
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                        WorningMessage("لا يمكن حذف هذا العنصر لانة مرتيط ببعض المعدات الاخرى", "Cannot Delete This Item Because It Related With Other Equipment", "تنبية");
                        LoadData();
                    }
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Delete", "خطأ", "Error");
        }
    }

    function LoadData() {
        Ajax.CallAsync({
            url: Url.Action("GetEquipmentClass", ControllerName),
            success: (d) => {
                DataSource = d.result;
                BindDataGrids();
            }
        })
    }

    function BindDataGrids() {
        Grid.DataSource = DataSource;
        Grid.Bind();
    }

    function Visibility(Equipment: P_D_EquipmentClass): boolean {
        let _EQCode = Equipment.CompCode;
        let _ExpName = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? Equipment.DescA : Equipment.DescE;
        if (IsNullOrEmpty(_EQCode.toString()) || IsNullOrEmpty(_ExpName)) {
            return false;
        } else {
            return true;
        }
    }
    function PrintEuqipClas() {
        

        if (DataSource == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("PrintEuqipClas", "PrintTransaction"),
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });

    } 


}




//$(document).ready(() => {

//    var treeView: TreeViwe = new TreeViwe();
//    //var spanEle: HTMLSpanElement = DocumentActions.GetElementById<HTMLSpanElement>("selectedId");
//    var btnActivityId: HTMLButtonElement = DocumentActions.GetElementById<HTMLButtonElement>("btnActivityId");
//    var inputCode: HTMLInputElement = DocumentActions.GetElementById<HTMLInputElement>("code");
//    var inputName: HTMLInputElement = DocumentActions.GetElementById<HTMLInputElement>("name");
//    //treeView.CreateTreeView("FillTreeView", "Home", "treeViewElement", "selectedId");

//    btnActivityId.onclick = btnTreeSearch_onclick;
//    
//    function btnTreeSearch_onclick() {
//        let sys: SystemTools = new SystemTools();
//        sys.FindTree("WorkActivities", "btnActivityId", "CompCode = " + 1, true);
//        $('#btn_Seleted_Data').click(function (event): void {
//            console.log(event);
//            inputCode.value = $('#txt_treeName').val();
//            inputName.value = $('#txt_treeCode').val();
//        });


//    }

//});