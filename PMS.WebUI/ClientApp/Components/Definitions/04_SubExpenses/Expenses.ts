$(document).ready(() => {
    Expenses.InitalizeComponent();
});
namespace Expenses {
    var DataSource: Array<P_D_Expences> = new Array<P_D_Expences>();
    var Grid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    var Master: P_D_Expences = new P_D_Expences();
    var categ: P_D_ExpencesCategory = new P_D_ExpencesCategory();
    var txtExpCatID: HTMLInputElement;
    var txtExpCatName: HTMLInputElement;
    var btnSearchExpenceCat: HTMLButtonElement;
    var ExpCatID: number;
    var _ScreenLanguage: string;
    var _CompCode: string;
    var _BranchCode: string;
    
    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

        InitalizeControls();
        InitalizeEvents();
        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditButton.disabled = true;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintButton.disabled = false;
        ControlsButtons.PrintAction(() => { PrintExpenses() });
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;        
        InitalizeGrid();
        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.Expences, Master.ExpencesID.toString());
        });
    }
    
    function InitalizeControls() {
        txtExpCatID = DocumentActions.GetElementById<HTMLInputElement>("txtExpCatID");
        txtExpCatName = DocumentActions.GetElementById<HTMLInputElement>("txtExpCatName");
        btnSearchExpenceCat = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchExpenceCat");
    }

    function InitalizeEvents() {
        btnSearchExpenceCat.onclick = btnSearchExpenceCat_Click;
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("Expens_")
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
            { title: res.Expens_ExpCode, name: "ExpCode", type: "text", width: "7.5%" },
            { title: res.Expens_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.Expens_DescE, name: "DescE", type: "text", width: "7.5%" },
            { title: res.Expens_AccountNo, name: "AccountNo", type: "text", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    
    function getExpences_ByCatID(catid: number) {
        Ajax.CallAsync({
            url: Url.Action("getExpences_ByCatID", "Expenses"),
            data: { catID: catid },
            success: (d) => {
                DataSource = d.result as Array<P_D_Expences>;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }

    function Insert(e: JsGridInsertEventArgs) {
        if (IsNullOrEmpty(txtExpCatID.value)) {
            WorningMessage("يجب اختيار فئة قبل الحفظ", "");
            return;
        }
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            let Expens = e.Item as P_D_Expences;
            
            for (var item of DataSource) {
                if (Expens.ExpCode == item.ExpCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repeted");
                    return;
                }
            }
            Expens.ExpCatID = ExpCatID;
            Expens.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "Expenses"),
                data: Expens,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    getExpences_ByCatID(Number(Master.ExpCatID));
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للاضافة", "No permission for Inserting");
        }
    }

    function Update(e: JsGridUpdateEventArgs) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            let Expens = e.Item as P_D_Expences;
            let _NewDS = DataSource;
            let _Index = _NewDS.indexOf(_NewDS.filter(x => x.ExpencesID == Expens.ExpencesID)[0]);
            _NewDS.splice(_Index, 1);
            let _Index2 = _NewDS.filter(x => x.ExpCode == Expens.ExpCode).length;
            if (_Index2 > 0) {
                WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
                getExpences_ByCatID(Number(Master.ExpCatID));
                return;
            }
            Expens.ExpCatID = ExpCatID;
            Ajax.CallAsync({
                url: Url.Action("Update", "Expenses"),
                data: Expens,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                    getExpences_ByCatID(Number(Master.ExpCatID));
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للتعديل", "No permission for Updating");
        }
    }

    function Delete(e: JsGridDeleteEventArgs) {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            let Expens = e.Item as P_D_Expences;
            Ajax.CallAsync({
                url: Url.Action("Delete", "Expenses"),
                data: Expens,
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

    function btnSearchExpenceCat_Click() {
        sys.FindKey(Modules.Expences, "btnSearchExpenceCat", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getExpencesCategory", "Expenses"),
                data: { id: id },
                success: (d) => {
                    categ = d.result as P_D_ExpencesCategory;
                    ExpCatID = categ.ExpCatID;
                    txtExpCatID.value = categ.ExpCatCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtExpCatName.value = categ.DescA.toString();
                    } else {
                        txtExpCatName.value = categ.DescE.toString();
                    }

                    getExpences_ByCatID(id);
                    let ind: string = GetIndexByUseId(id, "P_D_ExpencesCategory", "ExpCatID");
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });

        })
    }

    function Display() {
        DocumentActions.RenderFromModel(Master);
        ExpCatID = Master.ExpCatID;
    }

    function getCategoryName(id: number) {
        Ajax.CallAsync({
            url: Url.Action("getExpencesCategory", "Expenses"),
            data: { id: id },
            success: (d) => {
                categ = d.result as P_D_ExpencesCategory;
                txtExpCatID.value = categ.ExpCatCode.toString();
                if (_ScreenLanguage == "ar") {
                    txtExpCatName.value = categ.DescA.toString();
                } else {
                    txtExpCatName.value = categ.DescE.toString();
                }

            }
        })
    }

    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", "Expenses"),
            success: (d) => {
                Master = d.result as P_D_Expences;
                Display();
                getCategoryName(Master.ExpCatID);
                getExpences_ByCatID(Master.ExpCatID);
            }
        })
    }

    function PrintExpenses() {
        
        if (DataSource == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("PrintExpenses", "PrintTransaction"),
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });
    }
}