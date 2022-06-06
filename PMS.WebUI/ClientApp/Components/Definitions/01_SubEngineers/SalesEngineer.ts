$(document).ready(() => {
    SalesEngineer.InitalizeComponent();
});
namespace SalesEngineer {
    var sys: SystemTools = new SystemTools();
    var Model: P_D_SalesEgineer = new P_D_SalesEgineer();
    var ajaxCall: AjaxCaller = new AjaxCaller();
    var grid: JsGrid = new JsGrid();
    var dataSource: Array<P_D_SalesEgineer> = new Array<P_D_SalesEgineer>();
    var CatCode: P_D_SalesEngCateory = new P_D_SalesEngCateory();
    var Nationalty: G_Nationality = new G_Nationality();
    var Area: G_BRANCH = new G_BRANCH();
    var txtSalesEngineerId: HTMLInputElement;
    var txtEngCode: HTMLInputElement;
    var txtDescE: HTMLInputElement;
    var txtMobile: HTMLInputElement;
    var txtDeacA: HTMLInputElement;
    var txtTel1: HTMLInputElement;
    var txtSpeciality: HTMLInputElement;
    var txtCarPlateNo: HTMLInputElement;
    var txtBasicSalary: HTMLInputElement;
    var txtEmail: HTMLInputElement;
    var txtTotalAllow: HTMLInputElement;
    var txtCatCode: HTMLInputElement;
    var txtCategCode: HTMLInputElement;
    var txtNationalityCode: HTMLInputElement;
    var txtRemarks: HTMLInputElement;
    var butEngCode: HTMLButtonElement;
    var btnArea: HTMLButtonElement;
    var butSalesEngCategoryId: HTMLButtonElement;
    var butNationalityID: HTMLButtonElement;
    var txtNationaltyName: HTMLInputElement;
    var txtBraCode: HTMLInputElement;
    var txtAreaName: HTMLInputElement;
    var Nationalities: Array<G_Nationality>;
    var SetInterval: any;
    var btnSlsCat: HTMLButtonElement;
    var txtBraCodeRp: HTMLInputElement;
    var txtAreaNameRp: HTMLInputElement;
    var btnAreaRp: HTMLButtonElement;
    var PrintReport: HTMLButtonElement;
    var EngId: number;
    ClientSharedWork.Session["DisableMenu"] = "True";
    var _ScreenLanguage: string;
    var _CompCode: string;
    var _BranchCode: string;
    
    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

        ControlsButtons.AddButton.disabled = false;
        ControlsButtons.EditButton.disabled = false;
        ControlsButtons.DeleteButton.disabled = false;
        ControlsButtons.PrintButton.disabled = false;
        InitalizeControls();
        InitalizeEvents();
        ajaxCall.ControllerName = "SalesEngineer";
        SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.EditAction(() => { });
        ControlsButtons.SaveAction(() => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        //  ControlsButtons.PrintAction(() => { });
        ControlsButtons.DeleteAction(Delete);
        ControlsButtons.UndoAction(() => { });
        ControlsButtons.PrintAction(() => {
            OpenReportsPopup("_SlsEngReport");
        });

        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.SalesEngineer, Model.SalesEngineerId.toString());
        });
        //dataSource = Ajax.Call<Array<P_D_SalesEgineer>>({ url: Url.Action("getSalesEngineer", "SalesEngineer") });
    }

    function InitalizeControls() {
        txtSalesEngineerId = DocumentActions.GetElementById<HTMLInputElement>("txtSalesEngineerId");
        txtEngCode = DocumentActions.GetElementById<HTMLInputElement>("txtEngCode");
        txtDescE = DocumentActions.GetElementById<HTMLInputElement>("txtDescE");
        txtMobile = DocumentActions.GetElementById<HTMLInputElement>("txtMobile");
        txtDeacA = DocumentActions.GetElementById<HTMLInputElement>("txtDeacA");
        txtTel1 = DocumentActions.GetElementById<HTMLInputElement>("txtTel1");
        txtSpeciality = DocumentActions.GetElementById<HTMLInputElement>("txtSpeciality");
        txtCarPlateNo = DocumentActions.GetElementById<HTMLInputElement>("txtCarPlateNo");
        txtBasicSalary = DocumentActions.GetElementById<HTMLInputElement>("txtBasicSalary");
        txtRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtRemarks");
        txtEmail = DocumentActions.GetElementById<HTMLInputElement>("txtEmail");
        txtTotalAllow = DocumentActions.GetElementById<HTMLInputElement>("txtTotalAllow");
        txtCatCode = DocumentActions.GetElementById<HTMLInputElement>("txtCatCode");
        txtCategCode = DocumentActions.GetElementById<HTMLInputElement>("txtCategCode");
        txtNationalityCode = DocumentActions.GetElementById<HTMLInputElement>("txtNationalityCode");
        butEngCode = DocumentActions.GetElementById<HTMLButtonElement>("butEngCode");
        butSalesEngCategoryId = DocumentActions.GetElementById<HTMLButtonElement>("butSalesEngCategoryId");
        butNationalityID = DocumentActions.GetElementById<HTMLButtonElement>("butNationalityID");
        txtNationaltyName = DocumentActions.GetElementById<HTMLInputElement>("txtNationaltyName");
        txtBraCode = DocumentActions.GetElementById<HTMLInputElement>("txtBraCode");
        txtAreaName = DocumentActions.GetElementById<HTMLInputElement>("txtAreaName");
        btnArea = DocumentActions.GetElementById<HTMLButtonElement>("btnArea");
        btnSlsCat = DocumentActions.GetElementById<HTMLButtonElement>("btnSlsCat");
        btnAreaRp = DocumentActions.GetElementById<HTMLButtonElement>("btnAreaRp");

    }

    function InitalizeEvents() {

        butEngCode.onclick = btnEngCode_Click;
        butSalesEngCategoryId.onclick = btnCategoryCode_Click;
        butNationalityID.onclick = btnNationalty_Click;
        btnArea.onclick = btnBraCode_Click;
    }

    function btnEngCode_Click() {
        sys.FindKey(Modules.SalesEngineer, "butEngCode", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getEngCode", "SalesEngineer"),
                data: { id: id },
                success: (d) => {
                    Model = d.result as P_D_SalesEgineer;
                    txtEngCode.value = Model.EngCode.toString();
                    let _Index: number = Number(Model.SalesEngineerId);
                    let ind = GetIndexByUseId(Number(Model.SalesEngineerId), "P_D_SalesEgineer", "SalesEngineerId")
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });
        });
    }

    function btnCategoryCode_Click() {
        debugger
        sys.FindKey(Modules.SalesEngineer, "butSalesEngCategoryId", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getCategoryCode", "SalesEngineer"),
                data: { id: id },
                success: (d) => {
                    
                    CatCode = d.result as P_D_SalesEngCateory;
                    $("#txtSalesEngCategoryId").val(id);
                    txtCatCode.value = CatCode.CategCode;
                    txtCategCode.value = _ScreenLanguage == "ar" ? CatCode.DescA : CatCode.DescE;
                }
            });
        });
    }

    function btnNationalty_Click() {
        sys.FindKey(Modules.Nationalty, "butNationalityID", "COMP_CODE = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getNationalty", "SalesEngineer"),
                data: { id: id },
                success: (d) => {
                    Nationalty = d.result as G_Nationality;
                    $("#txtNationalityID").val(Nationalty.NationalityID);
                    txtNationalityCode.value = Nationalty.NationalityCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtNationaltyName.value = Nationalty.DescA.toString();
                    } else {
                        txtNationaltyName.value = Nationalty.DescL.toString();
                    }

                }
            });
        });
    }

    function btnBraCode_Click() {
        sys.FindKey(Modules.SalesEngineer, "btnArea", "COMP_CODE = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "SalesEngineer"),
                data: { id: id },
                success: (d) => {
                    Area = d.result as G_BRANCH;
                    txtBraCode.value = Area.BRA_CODE.toString();
                    if (_ScreenLanguage == "ar") {
                        txtAreaName.value = Area.BRA_DESC.toString();
                    } else {
                        txtAreaName.value = Area.BRA_DESCL.toString();
                    }
                }
            });
        });
    }

    function Add() {
        ResetFeilds();
    }

    function ResetFeilds() {
        ClearItem();
    }

    function Insert() {
        Model = new P_D_SalesEgineer();
        Assign();
        ClearItem();
        Ajax.Callsync({
            url: Url.Action("Insert", "SalesEngineer"),
            data: Model,
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    Model = result.ResponseData as P_D_SalesEgineer;
                    let msgAr = "تم الحفظ بنجاح ";
                    let msgEn = "Data Saved Successfully.";
                    ConfirmMessage(msgEn, msgEn, "Confirm", "Confirm", () => {
                        let ind = GetIndexByUseId(Model.SalesEngineerId, "P_D_SalesEgineer", "SalesEngineerId", "")
                        NavigateToSearchResultKey(Number(ind), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Insert");
            }
        });
    }

    function Assign() {
        Model = DocumentActions.AssignToModel<P_D_SalesEgineer>(Model);
    }

    function Update() {
        Assign();
        debugger
        Ajax.CallAsync({
            url: Url.Action("Update", "SalesEngineer"),
            data: Model,
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    Model = result.ResponseData as P_D_SalesEgineer;
                    let msg: string = ReturnMsg("تم حفظ البيانات  ", "Data Saved  ") + Model.EngCode;
                    MessageBox.Show(msg, "Update", () => {
                        let ind = GetIndexByUseId(Number(Model.SalesEngineerId), "P_D_SalesEgineer", "SalesEngineerId")
                        NavigateToSearchResultKey(Number(ind), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Update");
            }
        });
    }

    function Delete() {
        Assign();
        ajaxCall.Delete<P_D_SalesEgineer>(Model, (result) => {
            txtSalesEngineerId.value = "";
            ClearItem();
        });
    }

    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", "SalesEngineer"),
            success: (d) => {
                Model = d.result as P_D_SalesEgineer;
                Display();
                getCatCategory();
                getArea();
                getNationality();
            }
        })
    }

    function getCatCategory() {
        
        Ajax.CallAsync({
            url: Url.Action("getCategoryCode", "SalesEngineer"),
            data: { id: Number(Model.SalesEngCategoryId) },
            success: (d) => {
                
                CatCode = d.result as P_D_SalesEngCateory;
                txtCatCode.value = CatCode.CategCode;
                if (_ScreenLanguage == "ar")
                    txtCategCode.value = CatCode.DescA.toString();
                else
                    txtCategCode.value = CatCode.DescE.toString();


            }
        })
    }

    function getEngCode() {
        Ajax.CallAsync({
            url: Url.Action("getEngCode", "SalesEngineer"),
            data: { id: Number(txtEngCode.value) },
            success: (d) => {
                var laborClass = d.result as P_D_SalesEgineer;
                if (_ScreenLanguage == "ar")
                    txtEngCode.value = laborClass.DeacA.toString();
                else
                    txtEngCode.value = laborClass.DescE.toString();
            }
        })
    }

    function getNationality() {
        Ajax.CallAsync({
            url: Url.Action("getNationalty", "SalesEngineer"),
            data: { id: Number(Model.NationalityID) },
            success: (d) => {
                Nationalty = d.result as G_Nationality;
                txtNationalityCode.value = Nationalty.NationalityCode;
                if (Nationalty == null) {
                    txtNationaltyName.value = "";
                }
                else {
                    if (_ScreenLanguage == "ar")
                        txtNationaltyName.value = Nationalty.DescA.toString();
                    else
                        txtNationaltyName.value = Nationalty.DescL.toString();
                }
            }
        })
    }

    function getArea() {
        
        Ajax.CallAsync({
            url: Url.Action("getArea", "SalesEngineer"),
            data: { id: Number(Model.BraCode) },
            success: (d) => {
                Area = d.result as G_BRANCH;
                txtBraCode.value = Area.BRA_CODE.toString();
                if (Area == null) {
                    txtAreaName.value = "";
                }
                else {
                    if (_ScreenLanguage == "ar")
                        txtAreaName.value = Area.BRA_DESC.toString();
                    else
                        txtAreaName.value = Area.BRA_DESCE.toString();
                }
            }
        })
    }

    function Display() {
        DocumentActions.RenderFromModel(Model);
    }

    function ClearItem() {
        txtEngCode.value = "";
        txtAreaName.value = "";
        //txtDescECat.value = "";
        txtCatCode.value = "";
        txtNationaltyName.value = "";
        txtSalesEngineerId.value = "";
        txtDescE.value = "";
        txtCategCode.value = "";
        txtBraCode.value = "";
        txtNationalityCode.value = "";
    }
    function PrintSlsEng() {
        
        if (Model == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("PrintSlsEng", "PrintTransaction"),
            data: { Active: Number(Model.IsActive) },
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });

    }

    function ReturnMsg(msg_Ar: string, msg_En: string): string {
        let _Result = "";
        switch (SharedSession.CurrentEnvironment.ScreenLanguage) {
            case "ar":
                _Result = msg_Ar
                break;
            case "en":
                _Result = msg_En
                break;
        }
        return _Result;
    }




}