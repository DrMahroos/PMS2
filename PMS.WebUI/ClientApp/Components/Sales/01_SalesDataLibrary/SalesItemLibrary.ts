$(document).ready(() => {
    SalesItemLibrary.InitalizeComponent();
});
namespace SalesItemLibrary {
    const ControllerName: string = "SalesItemLibrary";
    const TableName: string = "P_D_SalesItems";
    const FieldKey: string = "ItemID";
    const GridInputClassName = "form-control gridIput";
    var columnWidth: string = "100px";
    const NumberColumnWidth = "50px";
    var sys: SystemTools = new SystemTools(); 
    var Master: PQ_GetSalesItem = new PQ_GetSalesItem();

    var txtItemCode: HTMLInputElement;
    var txtDescE: HTMLInputElement;
    var txtDescA: HTMLInputElement;
    var txtTechDescE: HTMLInputElement;
    var txtTechDescA: HTMLInputElement;
    var txtParentItemCode: HTMLInputElement;
    var txtDescAPa: HTMLInputElement;
    var txtUomCode: HTMLInputElement;
    var txtUomName: HTMLInputElement;
    var txtScopeCode: HTMLInputElement;
    var txtScopeName: HTMLInputElement;
    var txtItemLevel: HTMLInputElement;
    var txtStdPrice: HTMLInputElement;
    var txtMinUnitPrice: HTMLInputElement;
    var txtUnitPrice: HTMLInputElement;
    var ChkIsActive: HTMLInputElement;
    var ChkIsDetail: HTMLInputElement;
    var ChkIsEditable: HTMLInputElement;
    var btnCode: HTMLButtonElement;
    var btnUomID: HTMLButtonElement;
    var btnSearchScop: HTMLButtonElement;
    var btnSearchParent: HTMLButtonElement;

    var parentid: number;
    var uomId: number;
    var scopId: number;
    var _ScreenLang: string;
    var _CompCode: string;
    var _BraCode: string;
    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BraCode = SharedSession.CurrentEnvironment.BranchCode;
        InitalizeControls()
        InitalizeEvents();
        SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.UndoAction(() => { });
        ControlsButtons.SaveAction(() => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                SaveNewData();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.EditAction(() => { });
        //ControlsButtons.DeleteAction(Delete);
        ControlsButtons.UndoAction(Clear);
        ControlsButtons.PrintAction(() => { OpenReportsPopup("_SLsItemReport"); });


        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_CompCode, _BraCode, Modules.SalesItemLibrary, Master.ItemID.toString());
        });

    }

    function InitalizeControls() {
        // Initialize TextBoxs 
        txtItemCode = DocumentActions.GetElementById<HTMLInputElement>("txtItemCode");
        txtDescE = DocumentActions.GetElementById<HTMLInputElement>("txtDescE");
        txtDescA = DocumentActions.GetElementById<HTMLInputElement>("txtDescA");
        txtTechDescE = DocumentActions.GetElementById<HTMLInputElement>("txtTechDescE");
        txtTechDescA = DocumentActions.GetElementById<HTMLInputElement>("txtTechDescA");
        txtParentItemCode = DocumentActions.GetElementById<HTMLInputElement>("txtParentItemCode");
        txtDescAPa = DocumentActions.GetElementById<HTMLInputElement>("txtDescAPa");
        txtUomCode = DocumentActions.GetElementById<HTMLInputElement>("txtUomCode");
        txtUomName = DocumentActions.GetElementById<HTMLInputElement>("txtUomName");
        txtScopeCode = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCode");
        txtScopeName = DocumentActions.GetElementById<HTMLInputElement>("txtScopeName");
        txtItemLevel = DocumentActions.GetElementById<HTMLInputElement>("txtItemLevel");
        txtStdPrice = DocumentActions.GetElementById<HTMLInputElement>("txtStdPrice");
        txtMinUnitPrice = DocumentActions.GetElementById<HTMLInputElement>("txtMinUnitPrice");
        txtUnitPrice = DocumentActions.GetElementById<HTMLInputElement>("txtUnitPrice");
        ChkIsActive = DocumentActions.GetElementById<HTMLInputElement>("ChkIsActive");
        ChkIsDetail = DocumentActions.GetElementById<HTMLInputElement>("ChkIsDetail");
        ChkIsEditable = DocumentActions.GetElementById<HTMLInputElement>("ChkIsEditable");

        btnCode = DocumentActions.GetElementById<HTMLButtonElement>("btnCode");
        btnUomID = DocumentActions.GetElementById<HTMLButtonElement>("btnUomID");
        btnSearchScop = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchScop");
        btnSearchParent = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchParent");
    }

    function InitalizeEvents() {
        btnCode.onclick = btnCode_Clicked;
        btnUomID.onclick = btnUomID_Clicked;
        btnSearchScop.onclick = btnScopeID_Clicked;
        btnSearchParent.onclick = btnParentItemID_Click;
    }

    function Navigate() {
        
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {
                Master = d.result as PQ_GetSalesItem;
                Display();
            }
        })
    }

    function Display() {
        
        DocumentActions.RenderFromModel(Master);
        uomId = Master.UomID;
        parentid = Master.ParentItemID;
        scopId = Master.ScopeID;
        txtParentItemCode.value = "";
        txtDescAPa.value = "";
        if (Master.ParentItemID != null) {
            getParentItemID();
        }
    }

    function Assign() {
        DocumentActions.AssignToModel<PQ_GetSalesItem>(Master);
    }

    function Add() {
        
        txtItemLevel.value = "1";
        ChkIsDetail.checked = true;
        ChkIsActive.checked = true;
    }

    function SaveNewData() {
        
        Master = new PQ_GetSalesItem();
        Assign();
        if (Number(txtUnitPrice.value) < Number(txtMinUnitPrice.value)) {
            WorningMessage("سعر البيع يجب ان يكون اكبر من أقل سعر بيع", "Sales price should be greater than Min. Sales price");
            return;
        }
        let _Count = Ajax.Call({ url: Url.Action("GetCountItemSysByCode", ControllerName), data: { Code: Master.ItemCode } });
        if (_Count > 0) {
            WorningMessage("كود الصنف يجب ان لا يكون مكرر علي مستوي الشركه", "item Code should not be repeated for the company ");
            return;
        }
        if (txtParentItemCode.value != "") {
            
            UpdateParent();
        }
        //check if there parentitem add 1 to txtItemLevel
        if ($("#txtParentItemCode").text() != "") {
            let NewLevel = Number(txtItemLevel.value) + 1;
            txtItemLevel.value = NewLevel.toString();
            Master.ItemLevel = NewLevel;
        }
        Master.CompCode = Number(_CompCode);
        Master.UomID = uomId;
        Master.ParentItemID = parentid;
        Master.ScopeID = scopId;
        
        Ajax.CallAsync({
            url: Url.Action("Insert", ControllerName),
            data: Master,
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let _itm = result.ResponseData as number;
                    WorningMessage("تم الحفظ برقم ", "Data Saved. ", "ادخال", "Insert ");
                    let _Index = GetIndexByUseId(result.ResponseData.ItemID, "PQ_GetSalesItem", "ItemID", "CompCode = " + _CompCode);
                    NavigateToSearchResultKey(Number(_Index), Navigate);
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Insert");
            }
        });
    }

    function Update() {
        
        if (txtParentItemCode.value != "") {
            UpdateParent();
        }
        Assign();
        if (Number(txtUnitPrice.value) < Number(txtMinUnitPrice.value)) {
            WorningMessage("سعر البيع يجب ان يكون اكبر من أقل سعر بيع", "Sales price should be greater than Min. Sales price");
            return;
        }
        Master.UomID = uomId;
        Master.ParentItemID = parentid;
        Master.ScopeID = scopId;
        Master.CompCode = Number(_CompCode);
        Ajax.CallAsync({
            url: Url.Action("Update", ControllerName),
            data: Master,
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let _itm = result.ResponseData as number;
                    WorningMessage("تم الحفظ برقم ", "Data Saved. ", "تعديل", "Edit ");
                    
                    let _Index = GetIndexByUseId(result.ResponseData.ItemID, "PQ_GetSalesItem", "ItemID", "CompCode = " + _CompCode);
                    NavigateToSearchResultKey(Number(_Index), Navigate);}
            }
        })
    }

    function GetMasterById(id: number): P_D_SalesItems {
        let _Master = Ajax.Call<P_D_SalesItems>({
            url: Url.Action("GetByID", ControllerName),
            data: { id: id },
        });
        return _Master;
    }

    function getScope() {
        
        Ajax.CallAsync({
            url: Url.Action("ScopeList", ControllerName),
            data: { id: Number(Master.ScopeID) },
            success: (d) => {
                
                let scope = d.result as P_D_Scope;
                scopId = scope.ScopeID;
                txtScopeCode.value = scope.ScopeCode.toString();
                if (_ScreenLang == "ar")
                    txtScopeName.value = scope.DescA;
                else
                    txtScopeName.value = scope.DescE;
            }
        })
    }

    function getUom() {
        Ajax.CallAsync({
            url: Url.Action("UomList", ControllerName),
            data: { id: Number(Master.UomID) },
            success: (d) => {
                let _uom = d.result as P_D_UOM;
                txtUomCode.value = _uom.UomCode.toString();
                if (_ScreenLang == "ar")
                    txtUomName.value = _uom.DescA.toString();
                else
                    txtUomName.value = _uom.DescE.toString();
            }
        })
    }

    function getParentItemID() {
        Ajax.CallAsync({
            url: Url.Action("GetParentById", ControllerName),
            data: { id: Number(Master.ParentItemID) },
            success: (d) => {
                let parent = d.result as P_D_SalesItems;
                txtParentItemCode.value = parent.ItemCode.toString();
                txtDescAPa.value = _ScreenLang == "ar" ? parent.DescA.toString() : txtDescAPa.value = parent.DescE.toString();;
            }
        })
    }

    function btnCode_Clicked() {
        
        sys.FindKey(Modules.SalesItemLibrary, "btnCode", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSalesItems", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    Master = d.result as PQ_GetSalesItem;
                    let Index = GetIndexByUseId(Number(Master.ItemID), "PQ_GetSalesItem", "ItemID", "CompCode = " + _CompCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }

    function btnUomID_Clicked() {
        sys.FindKey(Modules.SalesItemLibrary, "btnUomID", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("UomList", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    let uom = d.result as P_D_UOM;
                    uomId = uom.UomID;
                    txtUomCode.value = uom.UomCode;
                    if (_ScreenLang == "ar")
                        txtUomName.value = uom.DescA.toString();
                    else
                        txtUomName.value = uom.DescE.toString();
                }
            });
        });
    }

    function btnScopeID_Clicked() {
        sys.FindKey(Modules.SalesItemLibrary, "btnScopeID", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("ScopeList", ControllerName),
                data: { id: id },
                success: (d) => {
                    let scope = d.result as P_D_Scope;
                    scopId = scope.ScopeID;
                    txtScopeCode.value = scope.ScopeCode.toString();
                    if (_ScreenLang == "ar")
                        txtScopeName.value = scope.DescA.toString();
                    else
                        txtScopeName.value = scope.DescE.toString();
                }
            });
        });
    }

    function btnParentItemID_Click() {
        sys.FindKey(Modules.SalesItemLibrary, "btnParentItemID", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            
            Ajax.CallAsync({
                url: Url.Action("GetParentById", ControllerName),
                data: { id: id },
                success: (d) => {
                    let result = d.result as P_D_SalesItems;
                    if (result.ItemCode == null) {
                        txtDescAPa.value = "";
                    }
                    parentid = result.ItemID;
                    txtItemLevel.value = (result.ItemLevel + 1).toString();
                    txtParentItemCode.value = result.ItemCode;
                    txtDescAPa.value = _ScreenLang == "ar" ? result.DescA : txtDescAPa.value = result.DescE;
                }
            });

        });
    }

    function Clear() {
        //txtUomID.value = "";
        //txtUomName.value = "";
        //txtScopeID.value = "";
        //txtScopeName.value = "";
        //txtParentItemID.value = "";
        //txtDescAPa.value = "";
    }

    function UpdateParent() {
        Assign();
        Ajax.CallAsync({
            url: Url.Action("UpdateParent", ControllerName),
            data: { parentid: parentid },
            success: (d) => {
                let result = d.result as ResponseResult;
            }
        });
    }
}


