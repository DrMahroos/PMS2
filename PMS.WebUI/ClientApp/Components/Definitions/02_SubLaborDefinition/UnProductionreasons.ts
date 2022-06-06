$(document).ready(() => {
    UnProductionreasons.InitalizeComponent();
});
namespace UnProductionreasons {

    var DataSource: Array<P_D_UnProdReason> = new Array<P_D_UnProdReason>();
    var Grid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    var Master: P_D_UnProdReason = new P_D_UnProdReason();
    var categ: P_D_UnProdCategory = new P_D_UnProdCategory();
    var txtUnProdCategoryID: HTMLInputElement;
    var txtcatName: HTMLInputElement;
    var btnsearchCategory: HTMLButtonElement;
    var _ScreenLanguage: string;
    var _CompCode: string;
    //var _BranchCode: string;

    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();  
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        //_BranchCode = SharedSession.CurrentEnvironment.BranchCode;

        InitalizeControls();
        InitalizeEvents();
        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditButton.disabled = true;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintButton.disabled = false;
        ControlsButtons.PrintAction(() => { PrintUnProd() });
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        InitalizeGrid();
    }
    
    function InitalizeControls () {
        txtUnProdCategoryID = DocumentActions.GetElementById<HTMLInputElement>("txtUnProdCategoryID");
        txtcatName = DocumentActions.GetElementById<HTMLInputElement>("txtcatName");
        btnsearchCategory = DocumentActions.GetElementById<HTMLButtonElement>("btnsearchCategory");
    }

    function InitalizeEvents() {
        btnsearchCategory.onclick = btnsearchCategory_Click;
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("UnProdRes_")
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
            { title: res.UnProdRes_ReasonCode, name: "ReasonCode", type: "text", width: "7.5%" },
            { title: res.UnProdRes_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.UnProdRes_DescE, name: "DescE", type: "text", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    
    function getProdReason_ByCatID(catid: number) {
        Ajax.CallAsync({
            url: Url.Action("getProdReason_ByCatID", "UnProductionreasons"),
            data: { catID: catid },
            success: (d) => {
                DataSource = d.result as Array<P_D_UnProdReason>;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }

    function Insert(e: JsGridInsertEventArgs) {
        if (IsNullOrEmpty(txtUnProdCategoryID.value)) {
            WorningMessage("يجب اختيار فئة قبل الحفظ", "You Should Choose Category Befor Save");
            return;
        }
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            let UnProdReason = e.Item as P_D_UnProdReason;
            for (var item of DataSource) {
                if (UnProdReason.ReasonCode == item.ReasonCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repetead");
                    return;
                }
            }
            UnProdReason.UnProdCategoryID = Number(txtUnProdCategoryID.value);
            UnProdReason.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "UnProductionreasons"),
                data: UnProdReason,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    getProdReason_ByCatID(Number(txtUnProdCategoryID.value));
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للاضافة", "No permission for Inserting");
        }
    }

    function Update(e: JsGridUpdateEventArgs) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            let UnProdReason = e.Item as P_D_UnProdReason;
            let _NewDS = DataSource;
            let _Index = _NewDS.indexOf(_NewDS.filter(x => x.UnProdReasonId == UnProdReason.UnProdReasonId)[0]);
            _NewDS.splice(_Index, 1);
            let _Index2 = _NewDS.filter(x => x.ReasonCode == UnProdReason.ReasonCode).length;
            if (_Index2 > 0) {
                WorningMessage("الرجاء عدم تكرار رقم الكود", "Pleas not repetition Code.");
                getProdReason_ByCatID(Number(txtUnProdCategoryID.value));
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "UnProductionreasons"),
                data: UnProdReason,
                success: (d) => {

                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Updating");
        }
    }

    function Delete(e: JsGridDeleteEventArgs) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            let UnProdReason = e.Item as P_D_UnProdReason;
            Ajax.CallAsync({
                url: Url.Action("Delete", "UnProductionreasons"),
                data: UnProdReason,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                    }
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Deleting");
        }
    }
    
    function btnsearchCategory_Click() {
        sys.FindKey(Modules.prodCategory, "btnsearchCategory", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getProdReason", "UnProductionreasons"),
                data: { id: id },
                success: (d) => {
                    categ = d.result as P_D_UnProdCategory;
                    txtUnProdCategoryID.value = categ.UnProdCategoryID.toString();
                    txtcatName.value = categ.DescA.toString();
                    getProdReason_ByCatID(id);
                    let _Index: string = GetIndexByUseId(id, "P_D_UnProdCategory", "UnProdCategoryID");
                    NavigateToSearchResultKey(Number(_Index), Navigate);
                }
            });

        })
    }

    function Display() {
        DocumentActions.RenderFromModel(Master);
    }

    function getCategoryName(id: number) {
        Ajax.CallAsync({
            url: Url.Action("getProdReason", "UnProductionreasons"),
            data: { id: id },
            success: (d) => {
                categ = d.result as P_D_UnProdCategory;
                txtcatName.value = categ.DescA.toString();
            }
        })
    }

    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", "UnProductionreasons"),
            success: (d) => {
                Master = d.result as P_D_UnProdReason;
                Display();
                getCategoryName(Master.UnProdCategoryID);
                getProdReason_ByCatID(Master.UnProdCategoryID);
            }
        })
    }

    function PrintUnProd() {
        
        if (DataSource == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("PrintUnProd", "PrintTransaction"),
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });
    }
}