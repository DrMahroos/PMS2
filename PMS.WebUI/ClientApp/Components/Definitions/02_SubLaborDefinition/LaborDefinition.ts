$(document).ready(() => {
    LaborDefinition.InitalizeComponent();
});
namespace LaborDefinition {
    var DataSource: Array<P_D_Labor> = new Array<P_D_Labor>();
    var Grid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    var Master: P_D_Labor = new P_D_Labor();
    var laborCat: P_D_LaborCategory = new P_D_LaborCategory();
    var laborClass: P_D_LaborClass = new P_D_LaborClass();
    var Nationalty: G_Nationality = new G_Nationality();
    var Area: G_BRANCH = new G_BRANCH();
    var ProjectPhase: PQ_GetEngProjectPhase = new PQ_GetEngProjectPhase();

    const ControllerName: string = "LaborDefinition";
    var txtLaborCode: HTMLInputElement;
    var txtDescE: HTMLInputElement;
    var txtDescA: HTMLInputElement;
    var txtBasicSalary: HTMLInputElement;
    var txtTotalAllow: HTMLInputElement;
    var txtLaborCategoryId: HTMLInputElement;
    var txtLaborCategoryName: HTMLInputElement;
    var txtLaborClassId: HTMLInputElement;
    var txtLaborClassName: HTMLInputElement;
    var txtBraCode: HTMLInputElement;
    var txtAreaName: HTMLInputElement;
    var txtNationalityID: HTMLInputElement;
    var txtNationaltyName: HTMLInputElement;
    var txtRemarks: HTMLInputElement;
    var txtMobile: HTMLInputElement;
    var txtTel1: HTMLInputElement;
    var txtEmail: HTMLInputElement;
    var txtCarPlateNo: HTMLInputElement;
    var txtProjectID: HTMLInputElement;
    var txtPhaseId: HTMLInputElement;
    var chkIsActive: HTMLInputElement;
    var btnSearchLaborCode: HTMLButtonElement;
    var btnCategoryCode: HTMLButtonElement;
    var btnClassCode: HTMLButtonElement;
    var btnBraCode: HTMLButtonElement;
    var btnNationalty: HTMLButtonElement;
    var BraCode: number;
    var NationalityID: number;
    var LaborClassId: number;
    var LaborCategoryId: number;
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
        SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.SaveAction(
            () => {
                if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                    Insert();
                else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                    Update();
            }
        );
        ControlsButtons.DeleteAction(Delete);
        ControlsButtons.UndoAction(Undo);
        debugger
        ControlsButtons.PrintAction(() => { OpenReportsPopup("_LaborReport"); });
        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.Labor, Master.LaborID.toString());
        });
    }

    function InitalizeControls() {
        txtLaborCode = DocumentActions.GetElementById<HTMLInputElement>("txtLaborCode");
        txtDescE = DocumentActions.GetElementById<HTMLInputElement>("txtDescE");
        txtDescA = DocumentActions.GetElementById<HTMLInputElement>("txtDescA");
        txtBasicSalary = DocumentActions.GetElementById<HTMLInputElement>("txtBasicSalary");
        txtTotalAllow = DocumentActions.GetElementById<HTMLInputElement>("txtTotalAllow");
        txtLaborCategoryId = DocumentActions.GetElementById<HTMLInputElement>("txtLaborCategoryId");
        txtLaborCategoryName = DocumentActions.GetElementById<HTMLInputElement>("txtLaborCategoryName");
        txtLaborClassId = DocumentActions.GetElementById<HTMLInputElement>("txtLaborClassId");
        txtLaborClassName = DocumentActions.GetElementById<HTMLInputElement>("txtLaborClassName");
        txtBraCode = DocumentActions.GetElementById<HTMLInputElement>("txtBraCode");
        txtAreaName = DocumentActions.GetElementById<HTMLInputElement>("txtAreaName");
        txtNationalityID = DocumentActions.GetElementById<HTMLInputElement>("txtNationalityID");
        txtNationaltyName = DocumentActions.GetElementById<HTMLInputElement>("txtNationaltyName");
        txtRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtRemarks");
        txtMobile = DocumentActions.GetElementById<HTMLInputElement>("txtMobile");
        txtTel1 = DocumentActions.GetElementById<HTMLInputElement>("txtTel1");
        txtEmail = DocumentActions.GetElementById<HTMLInputElement>("txtEmail");
        txtCarPlateNo = DocumentActions.GetElementById<HTMLInputElement>("txtCarPlateNo");
        txtProjectID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectID");
        txtPhaseId = DocumentActions.GetElementById<HTMLInputElement>("txtPhaseId");
        chkIsActive = DocumentActions.GetElementById<HTMLInputElement>("chkIsActive");
        btnSearchLaborCode = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchLaborCode");
        btnCategoryCode = DocumentActions.GetElementById<HTMLButtonElement>("btnCategoryCode");
        btnClassCode = DocumentActions.GetElementById<HTMLButtonElement>("btnClassCode");
        btnBraCode = DocumentActions.GetElementById<HTMLButtonElement>("btnBraCode");
        btnNationalty = DocumentActions.GetElementById<HTMLButtonElement>("btnNationalty");
    }

    function InitalizeEvents() {
        btnSearchLaborCode.onclick = btnSearchLaborCode_Click;
        btnCategoryCode.onclick = btnCategoryCode_Click;
        btnClassCode.onclick = btnClassCode_Click;
        btnNationalty.onclick = btnNationalty_Click;
        btnBraCode.onclick = btnBraCode_Click;
    }

    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", "LaborDefinition"),
            success: (d) => {
                Master = d.result as P_D_Labor;
                Display();
            }
        })
    }

    function getCatCategory() {
        Ajax.CallAsync({
            url: Url.Action("getLaborCategory", "LaborDefinition"),
            data: { id: Number(Master.LaborCategoryId) },
            success: (d) => {
                laborCat = d.result as P_D_LaborCategory;
                txtLaborCategoryId.value = laborCat.CategCode;
                if (_ScreenLanguage == "ar") {
                    txtLaborCategoryName.value = laborCat.DescA.toString();
                } else {
                    txtLaborCategoryName.value = laborCat.DescE.toString();
                }

            }
        })
    }

    function getCatClass() {
        Ajax.CallAsync({
            url: Url.Action("getLaborClass", "LaborDefinition"),
            data: { id: Number(Master.LaborClassId) },
            success: (d) => {
                laborClass = d.result as P_D_LaborClass;
                txtLaborClassId.value = laborClass.ClassCode;
                if (_ScreenLanguage == "ar") {
                    txtLaborClassName.value = laborClass.DescA.toString();
                } else {
                    txtLaborClassName.value = laborClass.DescE.toString();
                }
            }
        })
    }

    function getNationality() {
        Ajax.CallAsync({
            url: Url.Action("getNationalty", "LaborDefinition"),
            data: { id: Number(Master.NationalityID) },
            success: (d) => {
                Nationalty = d.result as G_Nationality;
                txtNationalityID.value = Nationalty.NationalityCode;
                if (_ScreenLanguage == "ar") {
                    txtNationaltyName.value = Nationalty.DescA
                } else {
                    txtNationaltyName.value = Nationalty.DescL;
                }
            }
        })
    }

    function getArea() {
        Ajax.CallAsync({
            url: Url.Action("getArea", "LaborDefinition"),
            data: { id: Number(Master.BraCode) },
            success: (d) => {
                Area = d.result as G_BRANCH;
                txtBraCode.value = Area.BRA_CODE.toString();
                if (_ScreenLanguage == "ar") {
                    txtAreaName.value = Area.BRA_DESC.toString();
                } else {
                    txtAreaName.value = Area.BRA_DESCE.toString();
                }
            }
        })
    }

    function GetProjectAndPhase(ProjectId: number) {
        ////debugger;
        ////ProjectPhase = Ajax.Call({ url: Url.Action("GetProjectAndPhase", ControllerName), data: { ProjectId: ProjectId } });
        ////debugger;
        ////if (ProjectPhase != null) {
        ////    txtProjectID.value = ProjectPhase.EngProj_ProjectCode;
        ////    txtPhaseId.value = ProjectPhase.ProjectPhaseCode;
        ////} else {
        ////    txtProjectID.value = "";
        ////    txtPhaseId.value = "";
        ////}
    }

    function Delete() {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            Ajax.CallAsync({
                url: Url.Action("Delete", "LaborDefinition"),
                data: Master,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == false) {
                        MessageBox.Show(result.ResponseMessage, "Delete");
                    }
                }
            });
        }
        else {
            WorningMessage("لا يوجد صلاحية للحذف", "No permission for Delete", "خطأ", "Error");
        }
    }

    function Add() {
        chkIsActive.checked = true;
        txtLaborCategoryId.value = "";
        txtLaborCategoryName.value = "";
        txtLaborClassId.value = "";
        txtLaborClassName.value = "";
        txtBraCode.value = "";
        txtAreaName.value = "";
        txtNationalityID.value = "";
        txtNationaltyName.value = "";
    }

    function Insert() {
        Master = new P_D_Labor();
        Assign();
        Master.BraCode = BraCode;
        Master.NationalityID = NationalityID;
        Master.LaborClassId = LaborClassId;
        Master.LaborCategoryId = LaborCategoryId;
        Master.CompCode = Number(_CompCode);
        Ajax.CallAsync({
            url: Url.Action("Insert", "LaborDefinition"),
            data: Master,
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم الحفظ بنجاح  ", "Data Saved Successfuly. ");
                    MessageBox.Show(msg, "ادخال بيانات جديدة", () => {
                        Display();
                        let _Index = GetIndexByUseId(result.ResponseData.LaborID, "P_D_Labor", "LaborID");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        })
    }

    function Update() {
        Assign();
        Master.BraCode = BraCode;
        Master.NationalityID = NationalityID;
        Master.LaborClassId = LaborClassId;
        Master.LaborCategoryId = LaborCategoryId;
        Master.CompCode = Number(_CompCode);
        Ajax.CallAsync({
            url: Url.Action("Update", "LaborDefinition"),
            data: Master,
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Insert", () => {
                        let _Index = GetIndexByUseId(result.ResponseData.LaborID, "P_D_Labor", "LaborID");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        })
    }

    function Display() {
        debugger;
        DocumentActions.RenderFromModel(Master);
        BraCode = Master.BraCode;
        NationalityID = Master.NationalityID;
        LaborClassId = Master.LaborClassId;
        LaborCategoryId = Master.LaborCategoryId;
        debugger;
        if (Master.ProjectID != null) {
            GetProjectAndPhase(Master.ProjectID);
        } else {
            txtProjectID.value = "";
            txtPhaseId.value = "";
        }
        getCatCategory();
        getCatClass();
        getNationality();
        getArea();
       
    }

    function Assign() {
        Master = DocumentActions.AssignToModel<P_D_Labor>(Master);
    }

    function Edit() {

    }

    function Undo() {
        txtLaborCategoryId.value = "";
        txtLaborCategoryName.value = "";
        txtLaborClassId.value = "";
        txtLaborClassName.value = "";
        txtBraCode.value = "";
        txtAreaName.value = "";
        txtNationalityID.value = "";
        txtNationaltyName.value = "";
    }

    function btnSearchLaborCode_Click() {
        sys.FindKey(Modules.Labor, "btnSearchLaborCode", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getLaborCode", "LaborDefinition"),
                data: { id: id },
                success: (d) => {
                    Master = d.result as P_D_Labor;
                    txtLaborCode.value = Master.LaborCode.toString();
                    let _Index: number = Number(d.result);
                    NavigateToSearchResultKey(Number(Master.LaborID), Navigate);
                }
            });
        });
    }

    function btnCategoryCode_Click() {
        sys.FindKey(Modules.laborCategory, "btnCategoryCode", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger
            Ajax.CallAsync({
                url: Url.Action("getLaborCategory", "LaborDefinition"),
                data: { id: id },
                success: (d) => {
                    debugger
                    laborCat = d.result as P_D_LaborCategory;
                    LaborCategoryId = laborCat.LaborCategoryId;
                    txtLaborCategoryId.value = laborCat.CategCode;
                    txtLaborCategoryName.value = _ScreenLanguage == "ar" ? laborCat.DescA : laborCat.DescE;
                }
            });
        });
    }

    function btnClassCode_Click() {
        sys.FindKey(Modules.laborClass, "btnClassCode", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getLaborClass", "LaborDefinition"),
                data: { id: id },
                success: (d) => {
                    laborClass = d.result as P_D_LaborClass;
                    LaborClassId = laborClass.LaborClassId;
                    txtLaborClassId.value = laborClass.ClassCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtLaborClassName.value = laborClass.DescA.toString();
                    } else {
                        txtLaborClassName.value = laborClass.DescE.toString();
                    }
                }
            });
        });
    }

    function btnNationalty_Click() {
        sys.FindKey(Modules.Nationalty, "btnNationalty", "COMP_CODE = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getNationalty", "LaborDefinition"),
                data: { id: id },
                success: (d) => {
                    Nationalty = d.result as G_Nationality;
                    NationalityID = Nationalty.NationalityID;
                    txtNationalityID.value = Nationalty.NationalityCode.toString();
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
        sys.FindKey(Modules.laborArea, "btnLaborArea", "COMP_CODE = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "LaborDefinition"),
                data: { id: id },
                success: (d) => {
                    Area = d.result as G_BRANCH;
                    BraCode = Area.BRA_CODE;
                    txtBraCode.value = Area.BRA_CODE.toString();
                    if (_ScreenLanguage == "ar") {
                        txtAreaName.value = Area.BRA_DESC.toString();
                    } else {
                        txtAreaName.value = Area.BRA_DESCE.toString();
                    }
                }
            });
        });
    }

}