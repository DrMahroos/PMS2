$(document).ready(() => {
    ProjectDefination.InitalizeComponent();
});
namespace ProjectDefination {
    const ControllerName: string = "ProjectDefination";
    const TableName: string = "PQ_GetEngProject";
    const FieldKey: string = "ProjectID";
    const JsGridcombobox: string = "combobox";

    var Master: PQ_GetEngProject = new PQ_GetEngProject();
    var MasterDetails: M_D_EngDefDetails = new M_D_EngDefDetails();
    var MasterDetailsView: M_D_EngDefDetailsView = new M_D_EngDefDetailsView();

    var DataSourcePhase: Array<PQ_GetEngProjectPhase> = new Array<PQ_GetEngProjectPhase>();
    var DataSourceItem: Array<PQ_GetEngProjectItem> = new Array<PQ_GetEngProjectItem>();

    var _ScreenLanguage: string;
    var _CompCode: string;
    var _BranchCode: string;

    var _SiteEngineer: Array<P_D_SiteEngineer> = new Array<P_D_SiteEngineer>();
    var _Scope: Array<P_D_Scope> = new Array<P_D_Scope>();
    var _Calender: Array<P_D_Calender> = new Array<P_D_Calender>();
    var ProjPosted: boolean;

    var GridPhase: JsGrid = new JsGrid();
    var GridItem: JsGrid = new JsGrid();

    var sys: SystemTools = new SystemTools();

    var txtProjectCode: HTMLInputElement;
    var txtOfferTrNo: HTMLInputElement;
    var txtDescA: HTMLInputElement;
    var txtOfferTrSerial: HTMLInputElement;
    var txtDescL: HTMLInputElement;
    var txtContractRefNo: HTMLInputElement;
    var txtcust_CustomerCode: HTMLInputElement;
    var txtcust_DescA: HTMLInputElement;
    var txtCustomerAccCode: HTMLInputElement;
    var txtCustomerMobile: HTMLInputElement;
    var txtTotalAllow: HTMLInputElement;
    var txtCustomerContact: HTMLInputElement;
    var txtCustomerTel: HTMLInputElement;
    var txtEng_Code: HTMLInputElement;
    var txtEng_DescA: HTMLInputElement;
    var SelectStatus: HTMLSelectElement;
    var txtProjArea: HTMLInputElement;
    var txtLoc_DescA: HTMLInputElement;
    var txtProjectTermsCond: HTMLInputElement;
    var txtProjTechnicalSpecs: HTMLInputElement;
    var txtNationalityID: HTMLInputElement;
    var txtContractPrice: HTMLInputElement;
    var txtContractCode: HTMLInputElement;
    var txtDownPaymentPrc: HTMLInputElement;
    var txtDownPaymentAmount: HTMLInputElement;
    var txtContractDate: HTMLInputElement;
    var txtWarrntyPaymentPrc: HTMLInputElement;
    var txtWarrntyPaymentAmount: HTMLInputElement;
    var txtContractPeriod: HTMLInputElement;
    var txtContractDiscountPrc: HTMLInputElement;
    var txtContractAdditions: HTMLInputElement;
    var txtProjectNet: HTMLInputElement;
    var btnProjectCode: HTMLButtonElement;
    var btnStartWork: HTMLButtonElement;
    var btnSuspend: HTMLButtonElement;
    var btnStopped: HTMLButtonElement;
    var btnFinished: HTMLButtonElement;

    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();

        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

        AjaxApi.CallsyncApi({
            type: "GET",
            url: sys.apiUrl("P_TR_EngProject", "GetSiteEngineer"),
            data: { comCode: Number(_CompCode), BraCode: Number(_BranchCode) },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    let res = result.Response;
                    _SiteEngineer = result.Response.P_D_SiteEngineer;
                    _Scope = result.Response.P_D_Scope;
                    _Calender = result.Response.P_D_Calender;
                }
            }
        });

        //_SiteEngineer = Ajax.Call<Array<P_D_SiteEngineer>>({ url: Url.Action("GetSiteEngineer", ControllerName) });
        //_Scope = Ajax.Call<Array<P_D_Scope>>({ url: Url.Action("GetScop", ControllerName) });
        //_Calender = Ajax.Call<Array<P_D_Calender>>({ url: Url.Action("GetCalender", ControllerName) });

        InitalizeControls();
        InitalizeEvents();
        InitalizeGrid();
        actionControl();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(New);
        ControlsButtons.SaveAction(() => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                return;
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.UndoAction(Undo);
        ControlsButtons.DeleteAction(Delete);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.PrintAction(Print);

        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.ProjectDefination, Master.ProjectID.toString());
        });
    }

    function InsertPhase(e: JsGridInsertEventArgs) {
        debugger
        let Phase = e.Item as PQ_GetEngProjectPhase;
        Phase.Status = 0;
        Phase.CC_CODE = Master.ProjectCode + "-" + Phase.ProjectPhaseCode;
        Phase.Status_DescE = 'New';
        Phase.ISPosted = false; 
        Phase.IsMaintenanceWork = false;
        Phase.IsBonusIncluded = true;
        Phase.ToBeInvoiced = true;
        Phase.ProjectID = Master.ProjectID;
        if (Phase.ProjectPhaseCode.length != 2) {
            WorningMessage("رقم المرحلة يجب ان يكون رقمين ", "Code must be two digits");
        
            Phase = null;
            return;
        }

        for (var ph of DataSourcePhase) {
            if (ph.ProjectPhaseCode.toLowerCase() == Phase.ProjectPhaseCode.toLowerCase()) {
                WorningMessage("لا يمكن تكرار الكود", "Code cannot Repeated For the same Project");
                e.Item = null;
                Phase = null;
                return;
            }
        }

        DataSourcePhase.push(Phase);
        GridPhase.DataSource = DataSourcePhase;
        GridPhase.Bind();
        //$("#GridPhase .jsgrid-table .jsgrid-insert-row td input").eq(3).attr('type', 'date');
        //$("#GridPhase .jsgrid-table .jsgrid-insert-row td input").eq(4).attr('type', 'date');

        debugger;

        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_EngProject", "UpdatePhase"),
            data: JSON.stringify(Phase),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: (d) => {
                let result = d as BaseResponse;
                LoadDetails(Master.ProjectID);
            }
        });
    }

    function UpdatePhase(e: JsGridUpdateEventArgs) {
        debugger;
        let Phase = e.Item as P_TR_EngProjectPhase;
        Phase.Status = Master.Status;
        Phase.OfferID = Master.OfferID;
        Phase.OfferTrNo = Master.OfferTrNo;
        Phase.OfferTrSerial = Master.OfferTrSerial;
        debugger;
        AjaxApi.CallAsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_EngProject", "UpdatePhase"),
            data: JSON.stringify(Phase),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {

                }
            }
        });
    }

    function DeletePhase(e: JsGridDeleteEventArgs) {
        let Phase = e.Item as P_TR_EngProjectPhase;
        for (var itm of DataSourceItem) {
            if (itm.ProjectPhaseId == Phase.ProjectPhaseId) {
                WorningMessage("هذة الحالة مرتبطة ببعض العناصر الاخرى ولا يمكن حذفها", "The Phase " + Phase.ProjectPhaseCode + " is related to other items, cannot delet it");
                LoadPhases(Master.ProjectID);
                return;
            }
        }
        debugger;
        AjaxApi.CallAsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_EngProject", "DeletePhase"),
            data: JSON.stringify(Phase),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: (d) => {
                debugger;
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    GridPhase.DataSource = DataSourcePhase;
                    LoadPhases(Master.ProjectID);
                }
            }
        });

       
        //Ajax.CallAsync({
        //    url: Url.Action("DeletePhase", ControllerName),
        //    data: Phase,
        //    success: (d) => {
        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            MessageBox.Show("Data Deleted", "Delete");
        //        }
        //        else {
        //            MessageBox.Show("the  " + Phase.ProjectPhaseId + "use as FK in another Table", "Can't Delete");
        //            GridPhase.DataSource = DataSourcePhase;
        //            LoadPhases(Master.ProjectID);
        //        }
        //    }
        //});
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("ProjDef_");
        GridPhase.ElementName = "GridPhase";
        GridPhase.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridPhase.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridPhase.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridPhase.InsertionMode = JsGridInsertionMode.Binding;
        GridPhase.OnItemInserting = InsertPhase;
        GridPhase.OnItemUpdating = UpdatePhase;
        GridPhase.OnItemDeleting = DeletePhase;
        GridPhase.Columns = [
            { title: res.ProjDef_PhaseNo, validate: "required", name: "ProjectPhaseCode", type: "text", width: "4%" },
            { title: res.ProjDef_PhaseDescriptionA, validate: "required", name: "DescA", type: "text", width: "14%" },
            { title: res.ProjDef_PhaseDescriptionB, validate: "required", name: "DescL", type: "text", width: "14%" },
            { title: res.ProjDef_Enginer, validate: "required", name: "SiteEngineerId", type: "select", items: _SiteEngineer, valueField: "SiteEngineerId", textField: "DescE", width: "10%" },
            { title: res.ProjDef_Scope, validate: "required", name: "ScopeID", type: "select", items: _Scope, valueField: "ScopeID", textField: "DescE", width: "10%" },
            { title: res.ProjDef_Caleander, validate: "required", name: "CalenderId", type: "select", items: _Calender, valueField: "CalenderID", textField: "DescA", width: "10%" },
            //{ title: res.ProjDef_StartDate, name: "StartDate", type: "label", width: "7%" },
            //{ title: res.ProjDef_EndDate, name: "EndDate", type: "label", width: "7%" },
            { title: res.ProjDef_Status, name: "Status_DescE", type: "lable", width: "5%" },
            { type: "control", width: "3%" }
        ];
        BindGridPhase();

        GridItem.ElementName = "GridItem";
        GridItem.Columns = [
            { title: res.ProjDef_Itemser, validate: "required", name: "LineCode", type: "text", width: "7%" },
            { title: res.ProjDef_ItemNo, validate: "required", name: "SlsITm_ItemCode", type: "text", width: "7%" },//ItemNo
            { title: res.ProjDef_PhaseNo, validate: "required", name: "Phase_PhaseCode", type: "text", width: "7%" },//ProjectPhaseCode
            { title: res.ProjDef_ItemName, name: "SlsITm_DescE", type: "text", width: "40%", visible: _ScreenLanguage == "en" },
            { title: res.ProjDef_ItemName, name: "SlsITm_DescA", type: "text", width: "40%", visible: _ScreenLanguage == "ar" },
            { title: res.ProjDef_ContrQty, name: "ContrQty", type: "number", width: "7%" },
            { title: res.ProjDef_ItemQty, name: "ItemQty", type: "number", width: "7%" },
            { title: res.ProjDef_ProdQty, name: "ProdQty", type: "text", width: "7.%" },
            { title: res.ProjDef_BilledQty, name: "BilledQty", type: "text", width: "7%" },
            { title: res.ProjDef_UntilPrice, name: "UnitPrice", type: "text", width: "7%" },
            //{ title: res.ProjDef_ScopeName, name: "Scp_DescE", type: "text", width: "9%" },
            //{ title: res.ProjDef_Remark, name: "Remarks", type: "text", width: "7%" },
        ];
        GridItem.DataSource = DataSourceItem;
        GridItem.Bind();
    }

    function BindGridPhase() {
        GridPhase.DataSource = DataSourcePhase;
        GridPhase.Bind();
        $(".jsgrid-insert-mode-button").attr("disabled", "disabled")
        $(".jsgrid-edit-button").attr("disabled", "disabled")
        //$(".jsgrid-delete-button").attr("disabled", "disabled")
        if (Master.Status == 0) {
            $("#GridPhase .jsgrid-table .jsgrid-insert-row td input").eq(3).attr('disabled', 'disabled');
            $("#GridPhase .jsgrid-table .jsgrid-insert-row td input").eq(4).attr('disabled', 'disabled');
        } else {
            $("#GridPhase .jsgrid-table .jsgrid-insert-row td input").eq(3).attr('type', 'date');
            $("#GridPhase .jsgrid-table .jsgrid-insert-row td input").eq(4).attr('type', 'date');
        }
    }

    function InitalizeControls() {
        txtProjectCode = document.getElementById("txtProjectCode") as HTMLInputElement;
        txtOfferTrNo = document.getElementById("txtOfferTrNo") as HTMLInputElement;
        txtDescA = document.getElementById("txtDescA") as HTMLInputElement;
        txtOfferTrSerial = document.getElementById("txtOfferTrSerial") as HTMLInputElement;
        txtDescL = document.getElementById("txtDescL") as HTMLInputElement;
        txtContractRefNo = document.getElementById("txtContractRefNo") as HTMLInputElement;
        txtcust_CustomerCode = document.getElementById("txtcust_CustomerCode") as HTMLInputElement;
        txtcust_DescA = document.getElementById("txtcust_DescA") as HTMLInputElement;
        txtCustomerAccCode = document.getElementById("txtCustomerAccCode") as HTMLInputElement;
        txtCustomerMobile = document.getElementById("txtCustomerMobile") as HTMLInputElement;
        txtTotalAllow = document.getElementById("txtTotalAllow") as HTMLInputElement;
        txtCustomerContact = document.getElementById("txtCustomerContact") as HTMLInputElement;
        txtCustomerTel = document.getElementById("txtCustomerTel") as HTMLInputElement;
        txtEng_Code = document.getElementById("txtEng_Code") as HTMLInputElement;
        txtEng_DescA = document.getElementById("txtEng_DescA") as HTMLInputElement;
        SelectStatus = document.getElementById("SelectStatus") as HTMLSelectElement;
        txtProjArea = document.getElementById("txtProjArea") as HTMLInputElement;
        txtLoc_DescA = document.getElementById("txtLoc_DescA") as HTMLInputElement;
        txtProjectTermsCond = document.getElementById("txtProjectTermsCond") as HTMLInputElement;
        txtProjTechnicalSpecs = document.getElementById("txtProjTechnicalSpecs") as HTMLInputElement;
        txtNationalityID = document.getElementById("txtNationalityID") as HTMLInputElement;
        txtContractPrice = document.getElementById("txtContractPrice") as HTMLInputElement;
        txtContractCode = document.getElementById("txtContractCode") as HTMLInputElement;
        txtDownPaymentPrc = document.getElementById("txtDownPaymentPrc") as HTMLInputElement;
        txtDownPaymentAmount = document.getElementById("txtDownPaymentAmount") as HTMLInputElement;
        txtContractDate = document.getElementById("txtContractDate") as HTMLInputElement;
        txtWarrntyPaymentPrc = document.getElementById("txtWarrntyPaymentPrc") as HTMLInputElement;
        txtWarrntyPaymentAmount = document.getElementById("txtWarrntyPaymentAmount") as HTMLInputElement;
        txtContractPeriod = document.getElementById("txtContractPeriod") as HTMLInputElement;
        txtContractDiscountPrc = document.getElementById("txtContractDiscountPrc") as HTMLInputElement;
        txtContractAdditions = document.getElementById("txtContractAdditions") as HTMLInputElement;
        txtProjectNet = document.getElementById("txtProjectNet") as HTMLInputElement;
        btnProjectCode = document.getElementById("btnProjectCode") as HTMLButtonElement;
        btnStartWork = document.getElementById("btnStartWork") as HTMLButtonElement;
        btnSuspend = document.getElementById("btnSuspend") as HTMLButtonElement;
        btnStopped = document.getElementById("btnStopped") as HTMLButtonElement;
        btnFinished = document.getElementById("btnFinished") as HTMLButtonElement;
    }

    function InitalizeEvents() {
        txtProjectCode.onchange = ProjectCode_onChange;
        btnProjectCode.onclick = btnProjectCode_onclick;
        btnStartWork.onclick = btnStartWork_onclick;
        btnSuspend.onclick = btnSuspend_onclick;
        btnStopped.onclick = btnStopped_onclick;
        btnFinished.onclick = btnFinished_onclick;
        txtContractDiscountPrc.onchange = DiscountChange; 
    }

    function btnStartWork_onclick() {
        $("#SelectStatus").val("1");
        actionControl();
    }

    function btnSuspend_onclick() {
        $("#SelectStatus").val("3");
        actionControl();
    }

    function btnStopped_onclick() {
        $("#SelectStatus").val("2");
        actionControl();
    }

    function btnFinished_onclick() {
        $("#SelectStatus").val("5");
        actionControl();
    }

    function actionControl() {
        //debugger;
        btnFinished.disabled = true;
        btnSuspend.disabled = true;
        btnStopped.disabled = true;
        btnStartWork.disabled = true;

        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
            return;
        }
        if ($("#SelectStatus").val() == "1") {
            btnStopped.disabled = !SharedSession.CurrentPrivileges.CUSTOM3;
            btnSuspend.disabled = !SharedSession.CurrentPrivileges.CUSTOM3;
            btnFinished.disabled = !SharedSession.CurrentPrivileges.CUSTOM2;
        }

        if ($("#SelectStatus").val() == "0") {
            btnStopped.disabled = !SharedSession.CurrentPrivileges.CUSTOM3;
            btnStartWork.disabled = !SharedSession.CurrentPrivileges.CUSTOM1;
        }

        if ($("#SelectStatus").val() == "3") {
            btnStopped.disabled = !SharedSession.CurrentPrivileges.CUSTOM3;
            btnStartWork.disabled = !SharedSession.CurrentPrivileges.CUSTOM1;
        }
        if ($("#SelectStatus").val() == "2") {

            btnStartWork.disabled = !SharedSession.CurrentPrivileges.CUSTOM1;
        }
        if ($("#SelectStatus").val() == "5") {

            btnStartWork.disabled = !SharedSession.CurrentPrivileges.CUSTOM1;
        }
    }
    function DiscountChange() {
        txtContractDiscountPrc.value = Number(txtContractDiscountPrc.value).toFixed(2); 
        txtProjectNet.value = ((100-Number(txtContractDiscountPrc.value)) * (Number(txtContractPrice.value) + Number(txtContractAdditions.value)) / 100).toFixed(2);
        Master.ContractDiscountAmount = Number(txtContractDiscountPrc.value) * (Number(txtContractPrice.value) + Number(txtContractAdditions.value)) / 100;
    }
    //eslam
    function ProjectCode_onChange() {
         
            debugger
            
           var Pno = Number(txtProjectCode.value);

            Ajax.Callsync({
                url: Url.Action("getProjectViewByno", 'FindByNo'),
                data: { Pno: Pno },
                success: (d) => {
                    debugger
                    if (IsNullOrEmpty(d.result)) {
                        txtProjectCode.value = "";
                        
                        
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                         window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                        
                    }

                    let Project = d.result as PQ_GetEngProject;
                    
                    let Index = GetIndexByUseId(Number(Project[0].ProjectID), TableName, FieldKey, "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
                
            });

        
    }
    function btnProjectCode_onclick() {
        debugger
        let Condition: string = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.ProjectDefination, "btnProjectCode", Condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger
            let Index = GetIndexByUseId(Number(id), TableName, FieldKey, " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
            NavigateToSearchResultKey(Number(Index), Navigate);
        });
    }

    function btnCustCode_onclick() {
        let Condition: string = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode + "  and IsActive = 1 ";
        sys.FindKey(Modules.ProjectDefination, "btnCustCode", Condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            let _Customers = GetCustomersById(id) as P_D_SalesCustomer
            txtcust_CustomerCode.value = id;
            txtcust_DescA.value = _ScreenLanguage = "ar" ? _Customers.DescA : _Customers.DescE;
        });
    }

    function Navigate() {
        //debugger;
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {
                debugger;
                Master = d.result;
                Display();
            }
        })

    }

    function Update() {
        debugger;
        Assign();
        Ajax.Callsync({
            url: Url.Action("Update", ControllerName),
            data: { JsonData: JSON.stringify(MasterDetails) },
            success: (d) => {
                debugger;
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let id = result.ResponseData as number;
                    //Master = GetMasterById(id);
                    debugger;
                    let msg: string = ReturnMsg("تم الحفظ برقم ", "Data Saved With Trans NO. ") + Master.ProjectCode.toString();
                    MessageBox.Show(msg, "Update", () => {
                        Display();
                        let _Index = GetIndexByUseId(result.ResponseData, TableName, FieldKey, " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate)
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Update");
            }
        });
    }

    function New() {

    }

    function Undo() {

    }
    function Delete() {

        debugger;
        AjaxApi.CallAsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_EngProject", "Delete"),
            data: JSON.stringify(Master.ProjectID),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: (d) => {
                debugger;
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    MessageBox.Show("تم حذف المشروع", "Projectis delete");
                   debugger
                    //currents.   CurrentEnvironment.ModelCount = SharedSession.CurrentEnvironment.ModelCount-1;
                    
                    let _Index = ClientSharedWork.PageIndex - 1;
                    NavigateToSearchResultKey(Number(_Index), Navigate)
                }
                else 
                    MessageBox.Show("تعذر حذف المشروع", "Unable to delete project ");
            }
        });
    }
    function Edit() {
        debugger
        actionControl();
        if ((Master.Status == 0 || Master.Status == 1) && Master.ProjectID != 0) {
            $(".editable").removeAttr("disabled");
            $(".jsgrid-insert-mode-button").removeAttr("disabled")
            $(".jsgrid-edit-button").removeAttr("disabled")
            $(".jsgrid-delete-button").removeAttr("disabled")
            //gridphase
            $(".jsgrid-edit-button").removeAttr("disabled")
            $(".jsgrid-delete-button").removeAttr("disabled")
            $(".jsgrid-insert-button").removeAttr("disabled")
        } else {
            $(".editable").attr("disabled", "disabled");
            // Enable start and end date 

            $("#txtStartDate").removeAttr("disabled");
            $("#txtEndDate").removeAttr("disabled");

            $(".jsgrid-insert-mode-button").attr("disabled", "disabled")
            $(".jsgrid-edit-button").attr("disabled", "disabled")
            $(".jsgrid-delete-button").attr("disabled", "disabled")
            //ClientSharedWork.SwitchModes(ScreenModes.Query);
        }
    }

    function Print() {

    }

    function Display() {
        //debugger;
        DocumentActions.RenderFromModel(Master);
        txtContractDate.value = DateFormat(Master.ContractDate);
        LoadDetails(Master.ProjectID);        
        ProjPosted = Master.ISPosted;
        txtContractPrice.value = Master.ContractPrice.toString();
        txtContractAdditions.value = Master.ContractAdditions.toString();
        txtContractDiscountPrc.value = Master.ContractDiscountPrc.toString();
        let totalNet: number = (Number(txtContractPrice.value) + Number(txtContractAdditions.value)) * (100 - Number(txtContractDiscountPrc.value)) / 100;
        txtProjectNet.value = totalNet.toFixed(2)
        actionControl();
    }

    function LoadDetails(id: number) {
        AjaxApi.CallAsyncApi({
            type: "GET",
            url: sys.apiUrl("P_TR_EngProject", "LoadDetails"),
            data: { id: id },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    DataSourcePhase = result.Response.PQ_GetEngProjectPhase as Array<PQ_GetEngProjectPhase>;
                    DataSourceItem = result.Response.PQ_GetEngProjectItem as Array<PQ_GetEngProjectItem>;
                    for (var item of DataSourcePhase) {
                        item.StartDate = item.StartDate != null ? DateFormat(item.StartDate) : null;
                        item.EndDate = item.EndDate != null ? DateFormat(item.EndDate) : null;
                    }
                    BindGridPhase();
                    GridItem.DataSource = DataSourceItem;
                    GridItem.Bind();
                }
            }
        })
    }

    function LoadPhases(id: number) {
        AjaxApi.CallAsyncApi({
            type: "GET",
            url: sys.apiUrl("P_TR_EngProject", "LoadPhases"),
            data: { id: id },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    DataSourcePhase = result.Response.PQ_GetEngProjectPhase as Array<PQ_GetEngProjectPhase>;
                    for (var item of DataSourcePhase) {
                        item.StartDate = DateFormat(item.StartDate);
                        item.EndDate = DateFormat(item.EndDate);
                    }
                    GridPhase.DataSource = DataSourcePhase;
                    GridPhase.Bind();
                }
            }
        })
    }

    function Assign() {
        debugger;
        DocumentActions.AssignToModel<PQ_GetEngProject>(Master);
        MasterDetails.P_TR_EngProject = Master as PQ_GetEngProject;
        //MasterDetails.P_TR_EngProjectPhase = DataSourcePhase as Array<P_TR_EngProjectPhase>;
        //for (var item of MasterDetails.P_TR_EngProjectPhase) {
        //    if (Master.OfferID == 0) {
        //        item.OfferID = Master.OfferID;
        //        item.OfferTrNo = Master.OfferTrNo;
        //        item.OfferTrSerial = Master.OfferTrSerial;
        //    }

        //    item.IsMaintenanceWork = false;
        //    item.IsBonusIncluded = true;
        //    item.ToBeInvoiced = true;
        //    item.ProjectID = Master.ProjectID;
        //}
    }

    function Validation(): boolean {
        var _Result: boolean = true;

        return _Result;
    }

    function GetMasterById(id: number): PQ_GetEngProject {
        let _Master = Ajax.Call<PQ_GetEngProject>({
            url: Url.Action("GetByID", ControllerName),
            data: { id: id },
        });
        return _Master;
    }
    function Clear() {

    }
}