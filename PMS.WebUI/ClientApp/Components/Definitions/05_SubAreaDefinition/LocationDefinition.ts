$(document).ready(() => {
    LocationDefinition.InitalizeComponent();
});

namespace LocationDefinition {
    var ControlerName: string = "LocationDefinition";
    var TableName: string = "P_D_Location";
    var FieldKey: string = "LocationId";

    var sys: SystemTools = new SystemTools();
    var Model: P_D_Location = new P_D_Location();
    var ajaxCall: AjaxCaller = new AjaxCaller();
    var dataSource: Array<P_D_Location> = new Array<P_D_Location>();
    var CatCode: P_D_SalesEngCateory = new P_D_SalesEngCateory();

    var Area: G_BRANCH = new G_BRANCH();
    var txtLocCode: HTMLInputElement;
    var butLocCode: HTMLButtonElement;
    var txtDescE: HTMLInputElement;
    var txtDescA: HTMLInputElement;
    var txtLocationId: HTMLInputElement;
    var txtRemarks: HTMLInputElement;
    var txtSalesEngineerId: HTMLInputElement;
    var butEngCode: HTMLButtonElement;
    var txtDescEEng: HTMLInputElement;
    var txtParentLocationId: HTMLInputElement;
    var butParentLocation: HTMLButtonElement;
    var txtDescEPa: HTMLInputElement;
    var chkIsDetail: HTMLInputElement;
    var SalesEngineerId: number;
    var ParentLocationId: number;
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
        ajaxCall.ControllerName = "LocationDefinition";
        SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;

        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(ClearForm);
        ControlsButtons.EditAction(() => { });
        ControlsButtons.SaveAction(
            () => {
                if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                    Insert();

                else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                    Update();

            }
        );

        ControlsButtons.PrintAction(() => { PrintRpt() });
        ControlsButtons.DeleteAction(Delete);
        ControlsButtons.UndoAction(ClearForm);
        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.LocationDefinition, Model.LocationId.toString());
        });
    }

    function InitalizeControls() {
        txtLocationId = DocumentActions.GetElementById<HTMLInputElement>("txtLocationId");
        txtLocCode = DocumentActions.GetElementById<HTMLInputElement>("txtLocCode");
        txtDescE = DocumentActions.GetElementById<HTMLInputElement>("txtDescE");
        butLocCode = DocumentActions.GetElementById<HTMLButtonElement>("butLocCode");
        txtDescA = DocumentActions.GetElementById<HTMLInputElement>("txtDescA");
        txtRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtRemarks");
        txtParentLocationId = DocumentActions.GetElementById<HTMLInputElement>("txtParentLocationId");
        butEngCode = DocumentActions.GetElementById<HTMLButtonElement>("butEngCode");
        butParentLocation = DocumentActions.GetElementById<HTMLButtonElement>("butParentLocation");
        txtDescEPa = DocumentActions.GetElementById<HTMLInputElement>("txtDescEPa");
        chkIsDetail = DocumentActions.GetElementById<HTMLInputElement>("chkIsDetail");
        txtSalesEngineerId = DocumentActions.GetElementById<HTMLInputElement>("txtSalesEngineerId");
        txtDescEEng = DocumentActions.GetElementById<HTMLInputElement>("txtDescEEng");
        butEngCode = DocumentActions.GetElementById<HTMLButtonElement>("butEngCode");
    }

    function InitalizeEvents() {
        butLocCode.onclick = btnLocCode_Click;
        butEngCode.onclick = btnEngCode_Click;
        butParentLocation.onclick = btnPLoc_Click;
    }

    function btnLocCode_Click() {
        sys.FindKey(Modules.LocationDefinition, "butLocCode", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode, () => {
            debugger
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            let Index = GetIndexByUseId(Number(id), TableName, FieldKey, "CompCode = " + _CompCode + " and BraCode = " + _BranchCode)
            NavigateToSearchResultKey(Number(Index), Navigate);
        });
    }

    function btnEngCode_Click() {
        sys.FindKey(Modules.LocationDefinition, "butEngCode", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getEngCode", ControlerName),
                data: { id: id },
                success: (d) => {
                    let _SalesEgineerResult = d.result as P_D_SalesEgineer;
                    SalesEngineerId = _SalesEgineerResult.SalesEngineerId;
                    txtSalesEngineerId.value = _SalesEgineerResult.EngCode;
                    if (_ScreenLanguage == "ar") {
                        txtDescEEng.value = _SalesEgineerResult.DeacA;
                    } else {
                        txtDescEEng.value = _SalesEgineerResult.DescE;
                    }
                }
            });
        });
    }

    function btnPLoc_Click() {
        sys.FindKey(Modules.LocationDefinition, "butParentLocation", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLoctionById", ControlerName),
                data: { id: id },
                success: (d) => {
                    let result = d.result as P_D_Location;
                    ParentLocationId = result.LocationId;
                    txtParentLocationId.value = result.LocCode;
                    if (_ScreenLanguage == "ar") {
                        txtDescEPa.value = result.DescA;
                    }
                    else {
                        txtDescEPa.value = result.DescE;
                    }
                }
            });
        });
    }

    function Insert() {
        
        Model = new P_D_Location();
        Assign();
        Model.SalesEngineerId = SalesEngineerId;
        Model.ParentLocationId = ParentLocationId;
        Model.CompCode = Number(_CompCode);
        Model.BraCode = Number(_BranchCode);
        debugger;
        let res = check();
        console.log(res)
        if (res != "")
        {
            MessageBox.Show("الكود موجود من قبل","");
            return;
        }
            
        Ajax.Callsync({
            url: Url.Action("Insert", ControlerName),
            data: Model,
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let res = result.ResponseData as P_D_Location;
                    let msg1: string = ReturnMsg(" ادخال   ", "Insert  ");
                    let msg = ReturnMsg("تم الحفظ بنجاح ", "Data Saved Successfully.");
                    MessageBox.Show(msg, msg1, () => {
                        Model.LocationId = res.LocationId;
                        let _Index = GetIndexByUseId(Number(Model.LocationId), TableName, FieldKey)
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Insert");
            }
        });
    }

    function Assign() {
        Model = DocumentActions.AssignToModel<P_D_Location>(Model);
       
    }
    function check()
    {
        debugger;
        var xresult: string = "";
        Ajax.Callsync({
            url: Url.Action("Getrepet", ControlerName),
            data: {
                code: Model.LocCode
            },
            success: (d) => {
                let result = d ;
                xresult = result;
            }
        });
        return xresult;
    }

    function Update() {
        Model = new P_D_Location;
        Assign();
        if (loccodebeforupdate != txtLocCode.value)
        {
            let res2 = check();
             if(res2)
             {
                MessageBox.Show("الكود موجود من قبل", "");
                return;
             }
        }
       



            if (Model.LocationId == Number(txtParentLocationId.value)) {
                WorningMessage("LocationId==ParentLocationId من فضلك لايمكن ان  ", "Plesea Not LocationId==ParentLocationId");
                txtParentLocationId.value = "";
                txtDescEPa.value = "";
                return;
            }
            Model.SalesEngineerId = SalesEngineerId;
            Model.ParentLocationId = ParentLocationId;
            Model.BraCode = Number(_BranchCode);
            Ajax.CallAsync({
                url: Url.Action("Update", ControlerName),
                data: Model,
                success: (d) => {
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == true) {
                        ClientSharedWork.SwitchModes(ScreenModes.Query);
                        let res = result.ResponseData as P_D_Location;
                        let msg: string = ReturnMsg("تم حفظ البيانات  ", "Data Saved . ") + res.LocCode.toString();
                        let msg1: string = ReturnMsg(" تعديل   ", "Edit  ");
                        txtLocationId.value = (res.LocationId as Number).toString();
                        MessageBox.Show(msg, msg1, () => {
                            Model.LocationId = res.LocationId;
                            let _Index = GetIndexByUseId(Number(Model.LocationId), TableName, FieldKey)
                            NavigateToSearchResultKey(Number(_Index), Navigate);
                        });
                    }
                    else
                        MessageBox.Show(result.ResponseMessage, "Update");
                }
            });
        
       
    }

    function Delete() {
        Assign();
        ajaxCall.Delete<P_D_Location>(Model, (result) => {
            Model.ParentLocationId = Model.ParentLocationId;
            ClearForm();
        });
    }

    function Navigate() {
        
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControlerName),
            success: (d) => {
                
                Model = d.result as P_D_Location;
                Display();
            }
        })
    }

    function GetLoactionCode(LocationId: number) {
        
        let _Result = Ajax.Call<P_D_Location>({
            url: Url.Action("GetLocationByCode", ControlerName),
            data: { Code: LocationId }
        });
        txtParentLocationId.value = _Result.LocCode;
        txtDescEPa.value = _Result.DescE;
    }

    function GetEng(endId: number) {
        
        let _Result = Ajax.Call<P_D_SalesEgineer>({
            url: Url.Action("getEngCode", ControlerName),
            data: { id: Number(endId) }
        });
        txtSalesEngineerId.value = _Result.EngCode;
        txtDescEEng.value = _Result.DescE;
    }
    var loccodebeforupdate = "";
    function Display() {
        
        DocumentActions.RenderFromModel(Model);
        loccodebeforupdate = Model.LocCode;
        if (Model.SalesEngineerId != null) {
            GetEng(Model.SalesEngineerId);
            
        if (Model.ParentLocationId != null) {
            GetLoactionCode(Model.ParentLocationId);
            

            }
        txtLocCode.value = Model.LocCode;
        txtDescA.value = Model.DescA;
        txtDescE.value = Model.DescE;
        }
      
    }
    function PrintRpt() {
        
        if (Model == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("PrintDefLocation", "PrintTransaction"),
            data: { bra: Number(Model.BraCode) },
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });

    }
    function ClearForm() {
        butLocCode.value = "";
        txtLocationId.value = "";
        txtSalesEngineerId.value = "";
        txtDescEEng.value = "";
        txtParentLocationId.value = "";
        txtDescEPa.value = "";

    }
}