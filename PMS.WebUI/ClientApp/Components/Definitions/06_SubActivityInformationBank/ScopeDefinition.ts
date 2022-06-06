$(document).ready(() => {
    ScopeDefinition.InitalizeComponent();
});
namespace ScopeDefinition {

    var DataSource: Array<P_D_Scope> = new Array<P_D_Scope>();
    var Grid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    var Master: P_D_Scope = new P_D_Scope();
    var categ: P_D_ScopeCategory = new P_D_ScopeCategory();
    var txtScopeCategoryID: HTMLInputElement;
    var txtScopeCategoryName: HTMLInputElement;
    var btnSearchScopCat: HTMLButtonElement;
    var txtScopeCategorycod: HTMLInputElement;
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
        ControlsButtons.PrintAction(() => { PrintScope() });
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        InitalizeGrid();
        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.Prepare, Master.ScopeID.toString());
        });
    }
    
    function InitalizeControls() {
        txtScopeCategoryID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCategoryID");
        txtScopeCategoryName = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCategoryName");
        btnSearchScopCat = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchScopCat");
        txtScopeCategorycod = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCategorycod");
    }

    function InitalizeEvents() {
        btnSearchScopCat.onclick = btnSearchScopCat_Click;
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("ScopDef_");
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
            { title: res.ScopDef_ScopeCode, name: "ScopeCode", type: "text", width: "7.5%" },
            { title: res.ScopDef_DescA, name: "DescA", type: "text", width: "7.5%" },
            { title: res.ScopDef_DescE, name: "DescE", type: "text", width: "7.5%" },
            { type: "control", width: "7%" }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }

    function getScopeCategory_ByCatID(catid: number) {
        Ajax.CallAsync({
            url: Url.Action("getScopeCategory_ByCatID", "ScopeDefinition"),
            data: { catID: catid },
            success: (d) => {
                DataSource = d.result as Array<P_D_Scope>;
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }

    function Insert(e: JsGridInsertEventArgs) {
        if (IsNullOrEmpty(txtScopeCategoryID.value)) {
            WorningMessage("يجب اختيار فئة قبل الحفظ", "You Should Choose Category First");
            return;
        }
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            let Scop = e.Item as P_D_Scope;
            for (var item of DataSource) {
                if (Scop.ScopeCode == item.ScopeCode) {
                    WorningMessage("لا يمكن تكرار الكود", "Code Cannot Repeted");
                    return;
                }
            }
            Scop.ScopeCategoryID = Number(txtScopeCategoryID.value);
            Scop.CompCode = Number(_CompCode);
            Ajax.CallAsync({
                url: Url.Action("Insert", "ScopeDefinition"),
                data: Scop,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                    getScopeCategory_ByCatID(Number(txtScopeCategoryID.value));
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للاضافة", "No permission for Inserting");
        }
    }

    function Update(e: JsGridUpdateEventArgs) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            let Scop = e.Item as P_D_Scope;
            let _NewDS = DataSource;
            let _Index = _NewDS.indexOf(_NewDS.filter(x => x.ScopeID == Scop.ScopeID)[0]);
            _NewDS.splice(_Index, 1);
            let _Index2 = _NewDS.filter(x => x.ScopeCode == Scop.ScopeCode).length;
            if (_Index2 > 0) {
                WorningMessage("ارجو ادخال رمز غير مكرر", "Please Enter not repeated Code");
                getScopeCategory_ByCatID(Number(txtScopeCategoryID.value));
                return;
            }
            Ajax.CallAsync({
                url: Url.Action("Update", "ScopeDefinition"),
                data: Scop,
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
            let Scop = e.Item as P_D_Scope;
            Ajax.CallAsync({
                url: Url.Action("Delete", "ScopeDefinition"),
                data: Scop,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        //MessageBox.Show(result.ResponseMessage, "Delete");
                        WorningMessage("لا يمكن حذف هذا العنصر لانة مرتبط ببعض البيانات الاخرى", "Cann't Delete This Item Beacuase It Used In Other Labor Info");
                        Navigate();
                    }
                }
            });
        }
        else {
            if (_ScreenLanguage == "ar") {
                MessageBox.Show("لا يوجد صلاحية للحذف", "خطأ");
            }
            else {
                MessageBox.Show("No permission for Deleting", "Error");
            }
        }
    }

    function btnSearchScopCat_Click() {
        sys.FindKey(Modules.ScopeDefinition, "btnSearchScopCat", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getScopeCategory", "ScopeDefinition"),
                data: { id: id },
                success: (d) => {
                    categ = d.result as P_D_ScopeCategory;
                    txtScopeCategoryID.value = categ.ScopeCategoryID.toString();
                    txtScopeCategoryName.value = categ.DescA.toString();
                    getScopeCategory_ByCatID(id);
                    txtScopeCategorycod.value = categ.ScopeCategCode;
                    
                    let ind: string = GetIndexByUseId(id, "P_D_ScopeCategory", "ScopeCategoryID");
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });

        })
    }

    function Display() {
        DocumentActions.RenderFromModel(Master);
        getCategoryName(Number(txtScopeCategoryID.value));
        getScopeCategory_ByCatID(Number(txtScopeCategoryID.value));
    }

    function getCategoryName(id: number) {
        Ajax.CallAsync({
            url: Url.Action("getScopeCategory", "ScopeDefinition"),
            data: { id: id },
            success: (d) => {
                categ = d.result as P_D_ScopeCategory;
                txtScopeCategoryName.value = categ.DescA.toString();
            }
        })
    }

    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", "ScopeDefinition"),
            success: (d) => {
                Master = d.result as P_D_Scope;
                Display();
            }
        })
    }

    function PrintScope() {
        
        if (DataSource == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("PrintScope", "PrintTransaction"),
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });
    }
}