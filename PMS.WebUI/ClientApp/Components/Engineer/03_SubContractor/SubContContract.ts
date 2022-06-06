$(document).ready(() => {
    SubContContract.InitalizeComponent();
});
namespace SubContContract {
    const ControllerName: string = "SubContContract";
    var txtSubContractId: HTMLInputElement;
    var txtTrNo: HTMLInputElement;
    var txtTrDate: HTMLInputElement;
    var butTrNo: HTMLButtonElement;
    var txtStartDate: HTMLInputElement;
    var txtEndDate: HTMLInputElement;
    var txtSubContractorID: HTMLInputElement;
    var txtSc_Code: HTMLInputElement;
    var txtSc_Desc: HTMLInputElement;
    var butSc_Code: HTMLButtonElement;
    var txtSc_Limit: HTMLInputElement;
    var txtDescA: HTMLInputElement;
    var ChkIsBlank: HTMLInputElement;
    var ChkIsApproved: HTMLInputElement;
    var ChkIsClosed: HTMLInputElement;
    var txtProjectID: HTMLInputElement;
    var txtProj_Code: HTMLInputElement;
    var butProj_Code: HTMLButtonElement;
    var txtProjectPhaseId: HTMLInputElement;
    var txtPhase_Code: HTMLInputElement;
    var butPhase_Code: HTMLButtonElement;
    var txtScopeID: HTMLInputElement;
    var txtScope_Code: HTMLInputElement;
    var butScope_Code: HTMLButtonElement;
    var txtScope_Desc: HTMLInputElement;
    var txtTotalAmount: HTMLInputElement;
    var txtTot_IssueSo: HTMLInputElement;
    var txtTot_FinishSo: HTMLInputElement;
    var txtTot_OpenSo: HTMLInputElement;
    // specifications model and Terms
    var txtTechnical: HTMLInputElement;
    var txtTerms: HTMLInputElement;
    var txtPenalty: HTMLInputElement;

    // contact info
    var txtLaborRemarks: HTMLInputElement;
    var txtMaterialRemarks: HTMLInputElement;
    var txtEquipmentRemarks: HTMLInputElement;
    var txtDuration: HTMLInputElement;
    var txtWarrantyPeriod: HTMLInputElement;
    var txtDownpaymentPrc: HTMLInputElement;
    var txtWarranlyPrc: HTMLInputElement;

    var ChkISMaterialIncluded: HTMLInputElement;
    var ChkISFlexQty: HTMLInputElement;

    var Master: PQ_GetEngSubContract = new PQ_GetEngSubContract();
    //var Model: PQ_GetEngSubContract = new PQ_GetEngSubContract();
     
    var tbl_DataSource: Array<PQ_GetEngSubContractActivity> = new Array<PQ_GetEngSubContractActivity>();
    var MasterDetails: M_D_SubContract = new M_D_SubContract();
    var DetailsSubContract: PQ_GetEngSubContractActivity = new PQ_GetEngSubContractActivity();
    const GridInputClassName = "form-control gridIput";
    //var AllSubContract: Array<PQ_GetEngSubContract> = new Array<PQ_GetEngSubContract>();
    var dataSource: Array<PQ_GetEngSubContractActivity> = new Array<PQ_GetEngSubContractActivity>();
    var Grid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    //var ajaxCall: AjaxCaller = new AjaxCaller();
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
        
        //ajaxCall.ControllerName = "SubContContract";
        InitalizephaseGrid();
         
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
        ControlsButtons.UndoAction(() => { });
        ControlsButtons.PrintAction(() => { PrintSubContract(); });
        //$("#ImageEditorButton").on("click", () => {

        //    sys.ImgPopup(_CompCode, _BranchCode, Modules.SubContContract, Master.SubContractId.toString());
        //});
    }
    function Insert() {
        debugger;
        Master = new PQ_GetEngSubContract();
        Assign();
        // check for details
        if (Number(txtSc_Limit.value) < Number(txtTotalAmount.value) ){
            WorningMessage("قيمة العقد تتخطي حد المقاول", "Contract value exceeds SubContractor Limit");
        }
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BranchCode);
        var session: SessionRecord = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_SubContract", "InsertMasterDetail"),
            data: JSON.stringify(MasterDetails),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: (d) => {
                debugger;
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Update", () => {
                        debugger;


                        let SubContract_Index = GetIndexByUseId(result.Response, "PQ_GetEngSubContract", "SubContractId", "compCode = " + _CompCode + " and bracode = " + _BranchCode);
                        NavigateToSearchResultKey(Number(SubContract_Index), Navigate);


                    });
                }
                else
                    WorningMessage("خطأ في حفظ البيانات","Error in Saving ");
            }
        });
        //Ajax.CallAsync({
        //    url: Url.Action("Insert", ControllerName),
        //    data: {
        //        JsonData: JSON.stringify(MasterDetails)
        //    },
        //    success: (d) => {
        //        debugger;

        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            debugger
        //            ClientSharedWork.SwitchModes(ScreenModes.Query);
        //            let msg: string = ReturnMsg("تم الحفظ بنجاح  ", "Data Saved Successfuly. ");
        //            MessageBox.Show(msg, "Insert", () => {
        //                debugger;
        //                let SubContract = result.ResponseData as PQ_GetEngSubContract;
        //                let SubContract_Index = GetIndexByUseId(result.ResponseData, "PQ_GetEngSubContract", "SubContractId", "compCode = " + _CompCode + " and bracode = " + _BranchCode);
        //                NavigateToSearchResultKey(Number(SubContract_Index), Navigate);
        //            });
        //        }
        //        else
        //            MessageBox.Show(result.ResponseMessage, "Insert");
        //    }
        //});

    }

    function Assign() {
        
        Master = DocumentActions.AssignToModel<PQ_GetEngSubContract>(Master);
        if (ChkIsApproved.checked) {
            Master.Status = 2;
            Master.IsApproved = 1;
        }
    

        if (ChkIsClosed.checked) {
            Master.Status = 6;
            Master.IsClosed = 1;
            Master.IsApproved = 1;
        }
        if (ChkIsClosed.checked == false && ChkIsApproved.checked == false ){
            Master.Status = 0;
            Master.IsApproved = 0;
            Master.IsClosed = 0;
        }

        MasterDetails.P_TR_SubContract = Master as P_TR_SubContract;
        MasterDetails.P_TR_SubContract.SubContractId = 0;

        // assign Details
        
        MasterDetails.P_TR_SubContractActivity = dataSource as Array<P_TR_SubContractActivity>;
        for (var itm of dataSource) {
            itm.SubContractId = Master.SubContractId;
            //itm.IsApproved = if(itm.IsApproved == "NO") ?false : true; 
            tbl_DataSource.push(itm);
        }
    }

    function Update() {
        debugger;
        AssignUpdate();
        Master.CompCode = Number(_CompCode);
        var session: SessionRecord = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_SubContract", "UpdateMasterDetail"),
            data: JSON.stringify(MasterDetails),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: (d) => {
                debugger;
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    WorningMessage("تم التعديل بنجاح  ", "Data Updated Successfuly. ");

                    
                    Display();
                    let _Index = GetIndexByUseId(result.Response, "PQ_GetEngSubContract", "SubContractId", "compCode = " + _CompCode + " and bracode = " + _BranchCode);
                    NavigateToSearchResultKey(Number(_Index), Navigate);
                }
                else
                    WorningMessage("خطأ في حفظ البيانات", "Error in Saving ");
            }
        });
        //Ajax.CallAsync({
        //    url: Url.Action("Update", ControllerName),
        //    data: { JsonData: JSON.stringify(MasterDetails) },
        //    success: (d) => {
        //        debugger;
        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
        //            ClientSharedWork.SwitchModes(ScreenModes.Query);
        //            let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
        //            MessageBox.Show(msg, "Insert", () => {
                        
        //                Display();
        //                let _Index = GetIndexByUseId(result.ResponseData, "PQ_GetEngSubContract", "SubContractId", "compCode = " + _CompCode + " and bracode = " + _BranchCode);
        //                NavigateToSearchResultKey(Number(_Index), Navigate);
        //            });
        //        }
        //        else {
        //            MessageBox.Show(result.ResponseMessage, "Insert");
        //        }
        //    }
        //})

    }

    function AssignUpdate() {
        
        Master = DocumentActions.AssignToModel<PQ_GetEngSubContract>(Master);
        if (ChkIsApproved.checked) {
            Master.Status = 2;
            Master.IsClosed = 0;
            Master.IsApproved = 1;
        }


        if (ChkIsClosed.checked) {
            Master.Status = 6;
            Master.IsClosed = 1;
            Master.IsApproved = 1;
        }
        if (ChkIsClosed.checked == false && ChkIsApproved.checked == false ) {
            Master.Status = 0;
            Master.IsApproved = 0;
            Master.IsClosed = 0;
        }

        MasterDetails.P_TR_SubContract = Master as P_TR_SubContract;
        MasterDetails.P_TR_SubContract.SubContractId = Master.SubContractId;

        // assign Details
        
        MasterDetails.P_TR_SubContractActivity = dataSource as Array<P_TR_SubContractActivity>;
        for (var itm of dataSource) {
            itm.SubContractId = Master.SubContractId;
            //itm.IsApproved = if(itm.IsApproved == "NO") ?false : true; 
            tbl_DataSource.push(itm);
        }

    }

    function Edit() {
        debugger;
        if (Number(txtTotalAmount.value) > Number( Master.Sc_Limit)) {
            if (SharedSession.CurrentPrivileges.CUSTOM3 == true) {
                ChkIsApproved.disabled = false;
            } else {
                ChkIsApproved.disabled = true;
            }
        }
        else {
            if (SharedSession.CurrentPrivileges.CUSTOM1 == true) {
                ChkIsApproved.disabled = false;
            } else {
                ChkIsApproved.disabled = true;
            }
        }

        if (ChkIsBlank.checked) {
            butPhase_Code.disabled = true;
        }
        else {

            butPhase_Code.disabled = false;
        }
    }

    function Add() {
        ChkIsBlank.checked = true;
        ChkIsClosed.checked = false;
        ChkIsApproved.disabled = true 
        ChkIsClosed.disabled = true 
        ChkIsApproved.checked = false;
        
        //butPhase_Code.disabled = true;
        butScope_Code.disabled = true;
        
        ChkISMaterialIncluded.checked = false;
        ChkISFlexQty.checked = false;
        txtProjectID.value = null;
        txtProjectPhaseId.value = null;
        //butProj_Code.disabled = true
        NewData();
    }
    function NewData() {
        ClearGrid(Grid, new Array<Number>());
        dataSource = new Array<PQ_GetEngSubContractActivity>();
        txtTotalAmount.value = "0.00";
    }
    function InitalizeEvents() {
        butTrNo.onclick = butTrNo_Click;
        butSc_Code.onclick = butSc_Code_Click;
        butScope_Code.onclick = butScope_Code_Click;
        // butProj_Code.onclick = butProj_Code_Click;
        butPhase_Code.onclick = butPhase_Code_Click;
        ChkIsBlank.onchange = ChkIsBlank_OnChaneg;
        ChkIsClosed.onchange = ChkIsClosed_OnChaneg;
        txtTrNo.onchange = TrNo_Changed;
        txtSc_Code.onchange = Sc_Code_Changed;
        txtProj_Code.onchange = Project_Changed;
        txtPhase_Code.onchange = Phase_Code_Changed;
    }

    function but_ISMaterialIncluded_Click() {
        if (Master.ISMaterialIncluded) {

        }
    }

    function butTrNo_Click() {

        sys.FindKey(Modules.SubContract, "butTrNo", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSubContractById", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    Master = d.result as PQ_GetEngSubContract;
                    txtTrNo.value = Master.TrNo.toString();
                    let _Index: number = Number(Master.SubContractId);
                    let ind = GetIndexByUseId(Number(Master.SubContractId), "PQ_GetEngSubContract", "SubContractId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode)
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }

            });
        });
    }
    function TrNo_Changed() {


        var trno = Number(txtTrNo.value);
            Ajax.CallAsync({
                url: Url.Action("getSubContractViewByNo", "FindByNo"),
                data: { trno: trno },
                success: (d) => {
                    debugger
                    if (IsNullOrEmpty(d.result)) {
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");

                    }
                    Master = d.result as PQ_GetEngSubContract;
                    txtTrNo.value = Master.TrNo.toString();
                    let _Index: number = Number(Master.SubContractId);
                    let ind = GetIndexByUseId(Number(Master.SubContractId), "PQ_GetEngSubContract", "SubContractId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode)
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }

            });
        
    }

    function butSc_Code_Click() {
        
        sys.FindKey(Modules.SubContract, "butSc_Code", "", () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSubContractorByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as P_D_SubContractor;
                    txtSubContractorID.value = result.SubContractorID.toString();
                    txtSc_Code.value = result.SubContractorCode.toString();
                    txtSc_Limit.value = result.ContractLimit.toString();
                    if (_ScreenLanguage == "ar") {
                        txtSc_Desc.value = result.DescA;
                    }
                    else {
                        txtSc_Desc.value = result.DescE;
                    }
                    butScope_Code.disabled = false;
                }
            });
        })
    }
    function Sc_Code_Changed() {
        debugger
        var code = Number(txtSc_Code.value);
            Ajax.CallAsync({
                url: Url.Action("getSubcontractorbyCode", "FindByNo"),
                data: {code: code },
                success: (d) => {
                    debugger
                    if (IsNullOrEmpty(d.result)) {
                       
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");

                    }
                    debugger
                    let result = d.result as P_D_SubContractor;
                    txtSubContractorID.value = result[0].SubContractorID.toString();
                    txtSc_Code.value = result[0].SubContractorCode.toString();
                    txtSc_Limit.value = result[0].ContractLimit.toString();
                    if (_ScreenLanguage == "ar") {
                        txtSc_Desc.value = result[0].DescA;
                    }
                    else {
                        txtSc_Desc.value = result[0].DescE;
                    }
                    butScope_Code.disabled = false;
                }
            });
         
    }

    function butScope_Code_Click() {
        debugger
        sys.FindKey(Modules.SubContract, "butScope_Code", " IsApproved = 1 and SubContractorID = " + txtSubContractorID.value, () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetPQ_GetEngSubContractorScopeByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as PQ_GetEngSubContractorScope;
                    txtScopeID.value = result.ScopeId.toString();
                    txtScope_Code.value = result.ScopeCode;
                    if (_ScreenLanguage == "ar") {
                        txtScope_Desc.value = result.DescA;
                    }
                    else {
                        txtScope_Desc.value = result.DescE
                    }
                }
            });
        })
    }
    function Project_Changed() {

        var Pno = Number(txtProj_Code.value);

        Ajax.CallAsync({
            url: Url.Action("getProjectTableByno", "FindByNo"),
            data: { Pno: Pno },
            success: (d) => {
                if (IsNullOrEmpty(d.result)) {

                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");

                }
                let result = d.result as P_TR_EngProject;
                txtProjectID.value = result[0].ProjectID.toString();
                txtProj_Code.value = result[0].ProjectCode;

                txtProjectPhaseId.value = "";
                txtPhase_Code.value = "";
            }
        });

    }
    function butPhase_Code_Click() {
        debugger
        if (IsNullOrEmpty(txtScopeID.value))
            return;
        var cond = "ScopeID = " + txtScopeID.value + " and compCode = " + _CompCode + " and bracode = " + _BranchCode; 
        if (!IsNullOrEmpty(txtProjectID.value))
            cond = cond + " and ProjectID= " + txtProjectID.value; 

        sys.FindKey(Modules.SubContract, "butPhase_Code",cond , () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetPQ_SrchEngProjectPhaseByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as PQ_SrchEngProjectPhase;
                    
                    txtProjectPhaseId.value = result.ProjectPhaseId.toString();
                    txtPhase_Code.value = result.Phase_Code;
                    NewData();
                }
            });
        })
    }
    function Phase_Code_Changed() {
        debugger
      
        if (IsNullOrEmpty(txtProj_Code.value))
            return;
        if (IsNullOrEmpty(txtScopeID.value))
            return;
        var ScopeId = Number(txtScopeID.value);
        Ajax.Callsync({
            url: Url.Action("getProjectPhaseViewByScopeNo", "FindByNo"),
            data: { ProjectNo: txtProj_Code.value, PhaseNo: txtPhase_Code.value, ScopeId: ScopeId },
            success: (d) => {
                 
                if (IsNullOrEmpty(d.result)) {
                    
                    txtProjectPhaseId.value = "";
                    txtPhase_Code.value = "";
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                    return;

                }
                debugger
                let result = d.result as PQ_GetEngProjectPhase;
                txtProjectID.value = result[0].ProjectID.toString(); 
                txtProj_Code.value = result[0].EngProj_ProjectCode;
                txtProjectPhaseId.value = result[0].ProjectPhaseId.toString();
                txtPhase_Code.value = result[0].ProjectPhaseCode;
                NewData();
            }
        });
            
    }

    function ChkIsBlank_OnChaneg() {
        
        if (ChkIsBlank.checked) {
            //butProj_Code.disabled = true;
            butPhase_Code.disabled = true;
        } else {
            //butProj_Code.disabled = false;
            butPhase_Code.disabled = false;
        }
    }

    function ChkIsClosed_OnChaneg() {
        
        Update();
    }

    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {
                Master = d.result as PQ_GetEngSubContract;
                Display();
            }
        })
    }

    function Display() {
        
        DocumentActions.RenderFromModel(Master);
        //GetAllProjectPhaseByprojectId(Model.ProjectID);
        
        if (Master.TotalAmount != null) {
            txtTotalAmount.value = Number(Master.TotalAmount).toFixed(2);
        }
        GetSubContratDetailsList(Master.SubContractId);
        txtTrDate.value = DateFormat(Master.TrDate);
        
        if (Master.StartDate != null) {
            txtStartDate.value = DateFormat(Master.StartDate);
        }
        if (Master.EndDate != null) {
            txtEndDate.value = DateFormat(Master.EndDate);
        }
        // disable Project and Phase if 
        if (ChkIsBlank.checked) {
            //butProj_Code.disabled = true;
            butPhase_Code.disabled = true;
        } else {
            //butProj_Code.disabled = false;
            butPhase_Code.disabled = false;
        }
        
        ChkIsApproved.disabled = true;
        // show approve and disable according to status
       
        if (Master.Status == 2) {
            // no edit
            ControlsButtons.EditButton.disabled = true;
            if (SharedSession.CurrentPrivileges.CUSTOM2 ) {
                ChkIsClosed.disabled = false;
                $("#ChkIsClosed").css('cursor', 'pointer');
                $("#ChkIsClosed").css('backgroundColor', 'red');
            }
            else {
                ChkIsClosed.disabled = true;
                $("#ChkIsClosed").css('backgroundColor', '#0B6D8A');
                $("#ChkIsClosed").css('cursor', 'not-allowed');
            }
        } 
        if (Master.Status == 0) {
            if (SharedSession.CurrentPrivileges.EDIT == true)
                ControlsButtons.EditButton.disabled = false;
         
            ChkIsClosed.disabled = true;
            $("#ChkIsClosed").css('backgroundColor', '#0B6D8A');
            $("#ChkIsClosed").css('cursor', 'not-allowed');
            
        }
        if (Master.Status == 6) {
            ControlsButtons.EditButton.disabled = true;
            ChkIsClosed.disabled = true;
            $("#ChkIsClosed").css('backgroundColor', '#0B6D8A');
            $("#ChkIsClosed").css('cursor','not-allowed');
        }
        //    ChkIsClosed.checked = false;
        //    ChkIsApproved.checked = false;

        //} else if (Master.Status == 2) {
        //    ChkIsClosed.checked = false;
        //    ChkIsApproved.checked = true;
        //} else if (Master.Status == 6) {
        //    ChkIsClosed.checked = true;
        //    ChkIsApproved.checked = true;
        //}
       
    }

    function GetSubContratDetailsList(SubContractId: number) {
        Ajax.CallAsync({
            url: Url.Action("GetSubContractDetailsList", ControllerName),
            data: { id: SubContractId },
            success: (d) => {
                
                dataSource = d.result as Array<PQ_GetEngSubContractActivity>;
                for (var i = 0; i < dataSource.length; i++) {
                    dataSource[i].UnitPrice = Number(dataSource[i].UnitPrice).toFixed(2);
                    dataSource[i].TotAmount = (Number(dataSource[i].UnitPrice) * Number(dataSource[i].ContractQty)).toFixed(2);
                }
                Grid.DataSource = dataSource;
                Grid.Bind();
            }
        });

    }

    function InitalizeControls() {
        txtSubContractId = DocumentActions.GetElementById<HTMLInputElement>("txtSubContractId");
        txtTrNo = DocumentActions.GetElementById<HTMLInputElement>("txtTrNo");
        txtTrDate = DocumentActions.GetElementById<HTMLInputElement>("txtTrDate");
        butTrNo = DocumentActions.GetElementById<HTMLButtonElement>("butTrNo"); 

         
        txtStartDate = DocumentActions.GetElementById<HTMLInputElement>("txtStartDate");
        txtEndDate = DocumentActions.GetElementById<HTMLInputElement>("txtEndDate");

        txtSubContractorID = DocumentActions.GetElementById<HTMLInputElement>("txtSubContractorID");
        txtSc_Code = DocumentActions.GetElementById<HTMLInputElement>("txtSc_Code");
        txtSc_Desc = DocumentActions.GetElementById<HTMLInputElement>("txtSc_Desc");
        butSc_Code = DocumentActions.GetElementById<HTMLButtonElement>("butSc_Code");
        txtSc_Limit = DocumentActions.GetElementById<HTMLInputElement>("txtSc_Limit");
        txtDescA = DocumentActions.GetElementById<HTMLInputElement>("txtDescA");

        txtProjectID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectID");
        txtProj_Code = DocumentActions.GetElementById<HTMLInputElement>("txtProj_Code");
        butProj_Code = DocumentActions.GetElementById<HTMLButtonElement>("butProj_Code");

        txtProjectPhaseId = DocumentActions.GetElementById<HTMLInputElement>("txtProjectPhaseId");
        txtPhase_Code = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_Code");
        butPhase_Code = DocumentActions.GetElementById<HTMLButtonElement>("butPhase_Code");

        txtScopeID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeID");
        txtScope_Code = DocumentActions.GetElementById<HTMLInputElement>("txtScope_Code");
        butScope_Code = DocumentActions.GetElementById<HTMLButtonElement>("butScope_Code");
        txtScope_Desc = DocumentActions.GetElementById<HTMLInputElement>("txtScope_Desc");

        txtTotalAmount = DocumentActions.GetElementById<HTMLInputElement>("txtTotalAmount");

        txtTot_IssueSo = DocumentActions.GetElementById<HTMLInputElement>("txtTot_IssueSo");
        txtTot_FinishSo = DocumentActions.GetElementById<HTMLInputElement>("txtTot_FinishSo");
        txtTot_OpenSo = DocumentActions.GetElementById<HTMLInputElement>("txtTot_OpenSo");

        ChkISMaterialIncluded = DocumentActions.GetElementById<HTMLInputElement>("ChkIsBlank");
        ChkISFlexQty = DocumentActions.GetElementById<HTMLInputElement>("ChkISFlexQty");
        // specifications model and Terms
        txtTechnical = DocumentActions.GetElementById<HTMLInputElement>("txtTechnical");
        txtTerms = DocumentActions.GetElementById<HTMLInputElement>("txtTerms");
        txtPenalty = DocumentActions.GetElementById<HTMLInputElement>("txtPenalty");

        // contact info
        txtLaborRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtLaborRemarks");
        txtMaterialRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtMaterialRemarks");
        txtEquipmentRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtEquipmentRemarks");
        txtDuration = DocumentActions.GetElementById<HTMLInputElement>("txtDuration");
        txtWarrantyPeriod = DocumentActions.GetElementById<HTMLInputElement>("txtWarrantyPeriod");
        txtDownpaymentPrc = DocumentActions.GetElementById<HTMLInputElement>("txtDownpaymentPrc");
        txtWarranlyPrc = DocumentActions.GetElementById<HTMLInputElement>("txtWarranlyPrc");

        ChkIsBlank = DocumentActions.GetElementById<HTMLInputElement>("ChkIsBlank");
        ChkIsClosed = DocumentActions.GetElementById<HTMLInputElement>("ChkIsClosed");
        ChkIsApproved = DocumentActions.GetElementById<HTMLInputElement>("ChkIsApproved");
        //txtPhase_Desc = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_Desc");
        //txtRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtRemarks");
        //ChkStatus = DocumentActions.GetElementById<HTMLInputElement>("ChkStatus");
        //AllSubContract = Ajax.Call<Array<PQ_GetEngSubContract>>({ url: Url.Action("GetAllSubContractMaster", ControllerName) });

    }

    function InitalizephaseGrid() {
        let res: any = GetResourceList("Contr_");
        Grid.ElementName = "subcontrgrid";
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
        Grid.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        Grid.InsertionMode = JsGridInsertionMode.Binding;
        //Grid.OnItemInserting = Insert;
        //Grid.OnItemUpdating = Update;
        //Grid.OnItemDeleting = Delete;
        Grid.Columns = [
            {
                name: "Act_Code", width: "10.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let btnFindActivity: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindActivity = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindActivity.className = "btn btn-primary btn-block addable editable";
                    btnFindActivity.innerText = _ScreenLanguage == "ar" ? " الانشطه" : "Load Acts";
                    btnFindActivity.id = "btnFindActivity";
                    btnFindActivity.type = "button";
                    btnFindActivity.onclick = (e) => {
                        btnFindActivity_onclick();
                    };
                    return HeaderTemplateNew(res.Contr_act_code, btnFindActivity);
                }
            },
            {
                title: res.Contr_activityname, visible: _ScreenLanguage == "ar",
                name: "Act_DescA", width: "30.5%", css: JsGridHeaderLeft,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Act_DescA", " ");
                    txt.id = "h_Act_DescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Contr_activityname, txt);
                }
            }
            ,
            {
                title: res.Contr_activityname, visible: _ScreenLanguage == "en",
                name: "Act_DescE", width: "30.5%", css: JsGridHeaderLeft,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Act_DescE", " ");
                    txt.id = "h_Act_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Contr_activityname, txt);
                }
            },
            {
                title: res.Contr_unit,
                name: "Uom_Code", width: "10.5%", css: JsGridHeaderLeft,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Uom_Code", " ");
                    txt.id = "h_Uom_Code"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Contr_unit, txt);
                }
            }
            ,
            {
                title: res.Contr_price, name: "UnitPrice", width: "6.5%", css: JsGridHeaderRight,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "UnitPrice", " ");
                    txt.id = "h_UnitPrice"
                    txt.disabled = false;
                    txt.onkeyup = (e) => {
                        CalcTotalAmount();
                    }
                    return HeaderTemplateNew(res.Contr_price, txt);
                }
            }
            ,
            {
                title: res.Contr_qty, name: "ContractQty", width: "6.5%", css: JsGridHeaderRight,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ContractQty", " ");
                    txt.id = "h_ContractQty"
                    txt.disabled = false;
                    txt.onkeyup = (e) => {
                        CalcTotalAmount();
                    }
                    return HeaderTemplateNew(res.Contr_qty, txt);
                }
            } ,
            {
                title: res.Contr_ProjQty, name: "ProjQty", width: "6.5%", css: JsGridHeaderRight,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ProjQty", " ");
                    txt.id = "h_ProjQty"
                    txt.disabled = true;
                    txt.onkeyup = (e) => {
                        CalcTotalAmount();
                    }
                    return HeaderTemplateNew(res.Contr_ProjQty, txt);
                }
            }
            ,
            {
                title: res.Contr_Totamount, name: "TotAmount", width: "8.5%", css: JsGridHeaderRight,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "TotAmount", " ");
                    txt.id = "h_Totamount"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Contr_Totamount, txt);
                }
            }
            ,
            {
                title: res.Contr_SoQty, name: "SOQty", width: "8.5%", css: JsGridHeaderRight,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "SOQty", " ");
                    txt.id = "h_SOQty"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Contr_SoQty, txt);
                }
            }
            ,
            {
                title: res.Contr_Remarks, name: "Remarks", width: "22%", css: JsGridHeaderLeft,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Remarks", " ");
                    txt.id = "h_Remarks"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Contr_Remarks, txt);
                }
            }
            ,
            {
                title: "#", name: "btnAddItem", visible: true, width: "50px",
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton + " addable editable";
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemInSubContractGrid";
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        
                        AddItemInSubContractGrid();
                    };
                    return btn;
                },
                // HANDLE DELETE Row in Grid
                itemTemplate: (s: string, item: PQ_GetEngSubContractActivity): HTMLButtonElement => {
                    let btn: HTMLInputElement = DocumentActions.CreateElement<HTMLInputElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.type = "button";
                    btn.className = TransparentButton + " addable editable";
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";

                    btn.name = dataSource.indexOf(item).toString();
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        let index_id = (e.currentTarget as HTMLButtonElement).id;
                        let index = Number((e.currentTarget as HTMLButtonElement).name);

                        txtTotalAmount.value = (Number(txtTotalAmount.value) - Number(dataSource[index].TotAmount)).toFixed(2);
                        dataSource.splice(index, 1);
                        Grid.DataSource = dataSource;
                        Grid.Bind();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            }
            ,
            // edit to Grid 
            {
                css: JsGridHeaderCenter,
                width: "50px",
                itemTemplate: (s: string, item: PQ_GetEngSubContractActivity): HTMLButtonElement => {
                    let btn: HTMLInputElement = DocumentActions.CreateElement<HTMLInputElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.type = "button";
                    btn.className = TransparentButton + " addable editable";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.name = dataSource.indexOf(item).toString();
                    btn.onclick = (e) => {
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        dataSource.splice(index, 1);
                        Grid.DataSource = dataSource;
                        Grid.Bind();
                        $("#btnFindActivity").text(item.Act_Code)
                        $('#h_ActivityId').val(item.ActivityId.toString());
                        if (item.ProjectPhaseItemActivId != null) {
                            $('#h_ProjectPhaseItemActivId').val(item.ProjectPhaseItemActivId.toString());
                        }

                        if (_ScreenLanguage == "ar") {
                            $("#h_Act_DescA").val(item.Act_DescA.toString());
                        }
                        else {
                            $("#h_Act_DescE").val(item.Act_DescE.toString());
                        }
                        debugger;
                        $("#h_Uom_Code").val(item.Uom_Code.toString());
                        $("#h_UnitPrice").val(item.UnitPrice.toString());
                        $("#h_ContractQty").val(item.ContractQty);
                        $("#h_ProjQty").val(item.ProjQty);
                        $("#h_SOQty").val(item.SOQty);
                        $("#h_Totamount").val(item.TotAmount.toString());
                        $("#h_Remarks").val(item.Remarks);
                        // update total Amount 
                        txtTotalAmount.value =
                            (Number(txtTotalAmount.value) - Number(item.TotAmount)).toFixed(2);

                        //End Updte

                    };
                    return btn;
                }
            }
        ];
        Grid.DataSource = dataSource;
        Grid.Bind();
    }

    function CalcTotalAmount() {
        $('#h_Totamount').val(Number($('#h_UnitPrice').val()) * Number($('#h_ContractQty').val()));
    }

    function AddItemInSubContractGrid() {
        DetailsSubContract = new PQ_GetEngSubContractActivity();
        if ($('#h_Act_DescE').val() == " ") {
            WorningMessage("يجب اختيار نشاط", "Please Select Activity first");
            return;
        }
        if ($('#h_UnitPrice').val() == " ") {
            WorningMessage("يجب ادخال السعر", "Please Enter Unit Price");
            return;
        }
        debugger;
        if ((Number($('#h_ContractQty').val() > Number($('#h_ProjQty').val()))) && ChkIsBlank.checked == false) {
            WorningMessage("الكمية لا يجب ان تزيد عن المتبقى من المشروع", "Contract Qty Sholudn't Exceed Project remain Qty ");
            return;
        }
        
        DetailsSubContract.Act_Code = $('#btnFindActivity').text();
        DetailsSubContract.ActivityId = Number($('#h_ActivityId').val());
        DetailsSubContract.ProjectPhaseItemActivId = Number($('#h_ProjectPhaseItemActivId').val());
        DetailsSubContract.Act_DescA = $('#h_Act_DescA').val();
        DetailsSubContract.Act_DescE = $('#h_Act_DescE').val();
        DetailsSubContract.Uom_Code = $('#h_Uom_Code').val();
        DetailsSubContract.UnitPrice = $('#h_UnitPrice').val();
        
        DetailsSubContract.ContractQty = Number($('#h_ContractQty').val());
        DetailsSubContract.ProjQty = Number($('#h_ProjQty').val());
        DetailsSubContract.SOQty = Number($('#h_SOQty').val());
        DetailsSubContract.TotAmount = (Number(DetailsSubContract.UnitPrice) * Number(DetailsSubContract.ContractQty)).toFixed(2);
        DetailsSubContract.Remarks = $('#h_Remarks').val();

        txtTotalAmount.value = (txtTotalAmount.value == " ") ? Number(DetailsSubContract.TotAmount).toFixed(2) :
            (Number(txtTotalAmount.value) + Number(DetailsSubContract.TotAmount)).toFixed(2);

        // check if item found in Grid 
        //for (var i = 0; i < DataSource.length; i++) {
        //    if (DataSource[i].ScopeId == DetailsAssignHeaderCabdidateScope.ScopeId) {
        //        WorningMessage("موجود برجاء اختيار اخر  ", "Scope Found before Please Select another Scope ");
        //        return;
        //    }
        //}
        // 
        dataSource.unshift(DetailsSubContract);
        Grid.DataSource = dataSource;
        Grid.Bind();
        ChkIsBlank_OnChaneg();
    }

    function btnFindActivity_onclick() {
        if (ChkIsBlank.checked == true) {
            sys.FindKey(Modules.SubContract, "btnFindActivity", " IsDetail = 1  and CompCode = " + _CompCode, () => {
                let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
                Ajax.CallAsync({
                    url: Url.Action("GetPQ_SrchActivityByID", ControllerName),
                    data: { id: _Id },
                    success: (d) => {
                        debugger;
                        let result = d.result as PQ_SrchActivity;
                        $('#btnFindActivity').text(result.ActivityCode);
                        $('#h_ActivityId').val(result.ActivityID);
                        $('#h_Act_DescA').val(result.DescA);
                        $('#h_Act_DescE').val(result.DescE);
                        $('#h_Uom_Code').val(result.Uom_Code);
                        $('#h_UnitPrice').val(result.UnitPrice);
                        $('#h_ContractQty').val(0);
                        $('#h_ProjQty').val(0);
                        $('#h_SOQty').val(0);
                        $('#h_ProjectPhaseItemActivId').val(null);
                    }
                });
            })
        }
        else if (txtProjectPhaseId.value != "") {
            sys.FindKey(Modules.SubContract, "btnFindAct", " ProjectPhaseId = " + txtProjectPhaseId.value, () => {
                
                let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
                Ajax.CallAsync({
                    url: Url.Action("GetPQ_SrchEngProjectActivityByID", ControllerName),
                    data: { id: _Id },
                    success: (d) => {
                        
                        let result = d.result as PQ_SrchEngProjectActivity;
                        $('#btnFindActivity').text(result.Act_ActivityCode);
                        $('#h_ActivityId').val(result.ActivityID);
                        $('#h_ProjectPhaseItemActivId').val(result.ProjectPhaseItemActivId);
                        $('#h_Act_DescA').val(result.Act_DescA);
                        $('#h_Act_DescE').val(result.Act_DescE);
                        $('#h_Uom_Code').val(result.uom_Code);
                        $('#h_ContractQty').val(result.RemainQty);
                        $('#h_ProjQty').val(result.RemainQty);
                        $('#h_SOQty').val(0);
                    }
                });
            })
        }
        else {
            let msg: string = ReturnMsg("اختر مرحلة المشروع   ", "First Choose Project Phase  ");
            MessageBox.Show(msg, "Worrning", () => {
            });
        }
    }

    function PrintSubContract() {

        
        Ajax.CallAsync({
            url: Url.Action("printSubContContract", "PrintTransaction"),
            data: { TrNo: Number(Master.SubContractId) },
            success: (d) => {
                debugger
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });
    }
}