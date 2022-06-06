$(document).ready(() => {
    SiteEngineer.InitalizeComponent();
});

namespace SiteEngineer {

    var sys: SystemTools = new SystemTools();
    var Model: P_D_SiteEngineer = new P_D_SiteEngineer();
    var ajaxCall: AjaxCaller = new AjaxCaller();
    var grid: JsGrid = new JsGrid();
    var dataSource: Array<P_D_SiteEngineer> = new Array<P_D_SiteEngineer>();
    var CatCode: P_D_SiteEngCategory = new P_D_SiteEngCategory();
    var Nationalty: G_Nationality = new G_Nationality();
    var Area: G_BRANCH = new G_BRANCH();
    var txtSiteEngineerId: HTMLInputElement;
    var txtEngCode: HTMLInputElement;
    var txtDescE: HTMLInputElement;
    var txtMobile: HTMLInputElement;
    var txtDescA: HTMLInputElement;
    var txtTel1: HTMLInputElement;
    var txtSpeciality: HTMLInputElement;
    var txtCarPlateNo: HTMLInputElement;
    var txtBasicSalary: HTMLInputElement;
    var txtEmail: HTMLInputElement;
    var txtTotalAllow: HTMLInputElement;
    var txtSiteEngCategoryId: HTMLInputElement;
    //var txtCategCode: HTMLInputElement;
    var txtNationalityID: HTMLInputElement;
    var txtDescECat: HTMLInputElement;
    var txtRemarks: HTMLInputElement;
    var butEngCode: HTMLButtonElement;
    var btnArea: HTMLButtonElement;
    var butSiteEngCategoryId: HTMLButtonElement;
    var butNationalityID: HTMLButtonElement;
    var txtNationaltyName: HTMLInputElement;
    var txtBraCode: HTMLInputElement;
    var txtAreaName: HTMLInputElement;
    var PrintButton: HTMLButtonElement;
    var Nationalities: Array<G_Nationality>;

    var NatationalId: number;
    var BraCode: number;
    var SiteEngCategoryId: number;
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
        ajaxCall.ControllerName = "SiteEngineer";
        SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;

        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.EditAction(() => { });
        ControlsButtons.SaveAction(
            () => {
                if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                    Insert();
                else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                    Update();
            }
        );
        ControlsButtons.PrintAction(() => {
            
            OpenReportsPopup("_SiteEngReport");
        });

        ControlsButtons.DeleteAction(Delete);
        ControlsButtons.UndoAction(() => { });
        dataSource = Ajax.Call<Array<P_D_SiteEngineer>>({ url: Url.Action("getSiteEngineer", "SiteEngineer") });
        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.SalesEngineer, Model.SiteEngineerId.toString());
        });
    }

    function InitalizeControls() {
        txtSiteEngineerId = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngineerId");
        txtEngCode = DocumentActions.GetElementById<HTMLInputElement>("txtEngCode");
        txtDescE = DocumentActions.GetElementById<HTMLInputElement>("txtDescE");
        txtMobile = DocumentActions.GetElementById<HTMLInputElement>("txtMobile");
        txtDescA = DocumentActions.GetElementById<HTMLInputElement>("txtDescA");
        txtTel1 = DocumentActions.GetElementById<HTMLInputElement>("txtTel1");
        txtSpeciality = DocumentActions.GetElementById<HTMLInputElement>("txtSpeciality");
        txtCarPlateNo = DocumentActions.GetElementById<HTMLInputElement>("txtCarPlateNo");
        txtBasicSalary = DocumentActions.GetElementById<HTMLInputElement>("txtBasicSalary");
        txtRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtRemarks");
        txtEmail = DocumentActions.GetElementById<HTMLInputElement>("txtEmail");
        txtTotalAllow = DocumentActions.GetElementById<HTMLInputElement>("txtTotalAllow");
        txtSiteEngCategoryId = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngCategoryId");
        //txtCategCode = DocumentActions.GetElementById<HTMLInputElement>("txtCategCode");
        txtNationalityID = DocumentActions.GetElementById<HTMLInputElement>("txtNationalityID");
        butEngCode = DocumentActions.GetElementById<HTMLButtonElement>("butEngCode");
        butSiteEngCategoryId = DocumentActions.GetElementById<HTMLButtonElement>("butSiteEngCategoryId");
        butNationalityID = DocumentActions.GetElementById<HTMLButtonElement>("butNationalityID");
        txtDescECat = DocumentActions.GetElementById<HTMLInputElement>("txtDescECat");

        txtNationaltyName = DocumentActions.GetElementById<HTMLInputElement>("txtNationaltyName");
        txtBraCode = DocumentActions.GetElementById<HTMLInputElement>("txtBraCode");
        txtAreaName = DocumentActions.GetElementById<HTMLInputElement>("txtAreaName");
        btnArea = DocumentActions.GetElementById<HTMLButtonElement>("btnArea");
    }

    function InitalizeEvents() {
        butEngCode.onclick = btnEngCode_Click;
        butSiteEngCategoryId.onclick  = btnCategoryCode_Click;
        butNationalityID.onclick = btnNationalty_Click;
        btnArea.onclick = btnBraCode_Click;
    }

    /**
     * Events
     */

    function btnEngCode_Click() {
        sys.FindKey(Modules.SiteEngineer, "butEngCode", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getEngCode", "SiteEngineer"),
                data: { id: id },
                success: (d) => {
                    Model = d.result as P_D_SiteEngineer;
                    txtEngCode.value = Model.EngCode.toString();
                    let _Index: number = Number(Model.SiteEngineerId);
                    let ind = GetIndexByUseId(Number(Model.SiteEngineerId), "P_D_SiteEngineer", "SiteEngineerId")
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });
        });
    }

    function btnCategoryCode_Click() {
        
        sys.FindKey(Modules.SiteEngineer, "butSiteEngCategoryId", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getCategoryCode", "SiteEngineer"),
                data: { id: id },
                success: (d) => {
                    
                    let CatCode = d.result as P_D_SiteEngCategory;
                    SiteEngCategoryId = CatCode.SiteEngCategoryId;
                    txtSiteEngCategoryId.value = CatCode.CategCode.toString();
                    if (_ScreenLanguage == "en") {
                        txtDescECat.value = CatCode.DescE.toString();
                    } else {
                        txtDescECat.value = CatCode.DescA.toString();
                    }
                }
            });
        });
    }

    function btnNationalty_Click() {
        sys.FindKey(Modules.Nationalty, "butNationalityID", "COMP_CODE = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getNationalty", "SiteEngineer"),
                data: { id: id },
                success: (d) => {
                    Nationalty = d.result as G_Nationality;
                    NatationalId = Nationalty.NationalityID;
                    txtNationalityID.value = Nationalty.NationalityCode.toString();
                    if (_ScreenLanguage == "en") {
                        txtNationaltyName.value = Nationalty.DescL.toString();
                    } else {
                        txtNationaltyName.value = Nationalty.DescA.toString();
                    }
                }
            });
        });
    }

    function btnBraCode_Click() {
        sys.FindKey(Modules.SiteEngineer, "btnArea", "COMP_CODE = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "SiteEngineer"),
                data: { id: id },
                success: (d) => {
                    Area = d.result as G_BRANCH;
                    BraCode = Area.BRA_CODE;
                    txtBraCode.value = Area.BRA_CODE.toString();
                    if (_ScreenLanguage == "en") {
                        txtAreaName.value = Area.BRA_DESCE.toString();
                    } else {
                        txtAreaName.value = Area.BRA_DESC.toString();
                    }

                }
            });
        });
    }
    /**
     * Fixed Functions
     */
   

    function Add() {
        ResetFeilds();
        Model.IsActive = true;
    }

    function ResetFeilds() {
        //txtTrDate.value = DateFormat(new Date().toString());
        //txtMemberCode.value = "";
        txtEngCode.value = "";
        txtAreaName.value = "";
        txtDescECat.value = "";
        txtSiteEngCategoryId.value = "";
        txtNationaltyName.value = "";
        txtDescE.value = "";
        //txtCategCode.value = "";
        txtBraCode.value = "";
        txtNationalityID.value = "";
    }

    function Insert() {
        
        Model = new P_D_SiteEngineer();
        Assign();
        Model.NationalityID = NatationalId;
        Model.BraCode = BraCode;
        Model.SiteEngCategoryId = SiteEngCategoryId;
        Model.IsActive = true;
        for (var i = 0; i < dataSource.length; i++) {
            if (Model.EngCode == dataSource[i].EngCode) {
                WorningMessage("الرجاء عدم تكرار رقم التصنيف", "Please not Repetition Site Eng Category No.");
                return;
            }
        }
        Model.CompCode = Number(_CompCode);
        Ajax.CallAsync({
            url: Url.Action("Insert", "SiteEngineer"),
            data: Model,
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم الحفظ بنجاح  ", "Data Saved Successfuly. ");
                    MessageBox.Show(msg, "Insert", () => {
                        let _SalEng = result.ResponseData as P_D_SiteEngineer;
                        let _Index = GetIndexByUseId(_SalEng.SiteEngineerId, "P_D_SiteEngineer", "SiteEngineerId");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Insert");
            }
        });
    }

    function Assign() {
        Model = DocumentActions.AssignToModel<P_D_SiteEngineer>(Model);
    }

    function Update() {
        Assign();
        Model.NationalityID = NatationalId;
        Model.BraCode = BraCode;
        Model.SiteEngCategoryId = SiteEngCategoryId;
        Ajax.CallAsync({
            url: Url.Action("Update", "SiteEngineer"),
            data: Model,
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Insert", () => {
                        let _SalEng = result.ResponseData as P_D_SiteEngineer;
                        let _Index = GetIndexByUseId(_SalEng.SiteEngineerId, "P_D_SiteEngineer", "SiteEngineerId");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Update");
            }
        });
    }

    function Delete() {
        if (SharedSession.CurrentPrivileges.Remove == true) {
            Ajax.CallAsync({
                url: Url.Action("Delete", "SiteEngineer"),
                data: Model,
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

    //function Delete() {
    //    Assign();
    //    ajaxCall.Delete<P_D_SiteEngineer>(Model, (result) => {
    //        txtSiteEngineerId.value = "";
    //        ResetFeilds();
    //    });
    //}

    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", "SiteEngineer"),
            success: (d) => {
                Model = d.result as P_D_SiteEngineer;
                Display();
                
                getCatCategory();
                getArea();
                getNationality();
            }
        })
    }

    function getCatCategory() {
            
            Ajax.CallAsync({
                url: Url.Action("getCategoryCode", "SiteEngineer"),
                data: { id: Number(Model.SiteEngCategoryId) },
                success: (d) => {
                    
                    let CatCode = d.result as P_D_SiteEngCategory;
                    txtSiteEngCategoryId.value = CatCode.CategCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtDescECat.value = CatCode.DescA.toString();
                    }
                    else {
                        txtDescECat.value = CatCode.DescE.toString();
                    }

                }
            })
    }

    //function getEngCategory() {
    //    
    //    Ajax.CallAsync({
    //        url: Url.Action("getEngCategory", "SiteEngineer"),
    //        data: { id: Number(txtSiteEngCategoryId.value) },
    //        success: (d) => {
    //            let CatCode = d.result as P_D_SiteEngCategory;
    //            //txtSiteEngCategoryId.value = CatCode.CategCode.toString();
    //            txtDescECat.value = CatCode.DescE.toString();
    //        }
    //    })
    //}


    function getEngCode() {
            Ajax.CallAsync({
                url: Url.Action("getEngCode", "SiteEngineer"),
                data: { id: Number(Model.SiteEngCategoryId) },
                success: (d) => {
                    let code = d.result as P_D_SiteEngineer;
                    txtSiteEngCategoryId.value = code.EngCode;
                    if (_ScreenLanguage == "ar") {
                        txtEngCode.value = code.DescA.toString();
                    } else {
                        txtEngCode.value = code.DescE.toString();
                    }
                    
                }
            })
        }

    function getNationality() {
            Ajax.CallAsync({
                url: Url.Action("getNationalty", "SiteEngineer"),
                data: { id: Number(Model.NationalityID) },
                success: (d) => {
                    Nationalty = d.result as G_Nationality;
                    txtNationalityID.value = Nationalty.NationalityCode;
                    if (_ScreenLanguage == "ar") {
                        txtNationaltyName.value = Nationalty.DescA.toString();
                    } else {
                        txtNationaltyName.value = Nationalty.DescL.toString();
                    }
                }
            })
        }

    function getArea() {
            Ajax.CallAsync({
                url: Url.Action("getArea", "SiteEngineer"),
                data: { id: Number(Model.BraCode) },
                success: (d) => {
                    Area = d.result as G_BRANCH;
                    txtBraCode.value = Area.BRA_CODE.toString();
                    if (_ScreenLanguage == "ar") {
                        txtAreaName.value = Area.BRA_DESC.toString();
                    }
                    else {
                        txtAreaName.value = Area.BRA_DESCL.toString();
                    }

                }
            })
        }

    function Display() {
        DocumentActions.RenderFromModel(Model);
        NatationalId = Model.NationalityID;
        BraCode = Model.BraCode;
        SiteEngCategoryId = Model.SiteEngCategoryId;
    }


    function PrintSteEng() {
        
        if (Model == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("PrintSiteEng", "PrintTransaction"),
            data: { Active: Number(Model.IsActive) },
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });

    }
 
    export function OpenReportsPopup(moduleCode: string) {

        let opt: JQueryAjaxSettings = {
            url: Url.Action("_SiteEngReport", "GeneralReports"),
            success: (d) => {
                
                let result = d as string;
                $("#ReportPopupBody").html(result);
                $("#ReportsPopupDialog").modal("show");
                $('#ReportsPopupDialog').modal({
                    refresh: true
                });

                var val = $("#rpTitle").text();
                $("#TitleSpanRep").html(val);
            }
        };
        Ajax.CallAsync(opt);

    }
}