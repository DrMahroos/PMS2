$(document).ready(() => {
    OverTimeSheet.InitalizeComponent();
});

namespace OverTimeSheet {
    var txtOverTimeID: HTMLInputElement;
    var txtTrNo: HTMLInputElement;
    var butTrNo: HTMLButtonElement;
    var txtTrDate: HTMLInputElement;
    var txtSiteEngineerId: HTMLInputElement;
    var txtEng_Code: HTMLInputElement;
    var btnSearchLaborOT: HTMLButtonElement;
    var txtEng_Desc: HTMLInputElement;
    var txtFromDate: HTMLInputElement;
    var txtToDate: HTMLInputElement;
    var txtProjectID: HTMLInputElement;
    var txtPrj_ProjectCode: HTMLInputElement;
    var butProj_Code: HTMLButtonElement;
    var btnSearchSchdule: HTMLButtonElement;
    var txtPrj_DescE: HTMLInputElement;
    var txtRemarks: HTMLInputElement;
    var ChkStatus: HTMLInputElement;
    var txtWorkDescr: HTMLInputElement;
    var txtPhase_ProjectPhaseCode: HTMLInputElement;
    var txtPhase_DescE: HTMLInputElement;
    var txtOTHourcostgrid: number;
    //var txtEndDateTime: HTMLInputElement;
    //var OTHourCost: number;
    const ControllerName: string = "OverTimeSheet";
    const GridInputClassName = "form-control gridIput";

    var Master: PQ_GetResLabourOverTime = new PQ_GetResLabourOverTime();
    //var Model: PQ_GetResLabourOverTime = new PQ_GetResLabourOverTime();
    class M_D_ResOverTime {
        public P_TR_ResOverTime: P_TR_ResOverTime;
        public P_TR_ResOverTimeLabour: Array<P_TR_ResOverTimeLabour>;
    }

    var MasterDetails: M_D_ResOverTime = new M_D_ResOverTime();
    var UpdMasterDetails: M_D_ResOverTime = new M_D_ResOverTime();
    var DetailsOverTime: PQ_GetResLabourOverTimeDetail = new PQ_GetResLabourOverTimeDetail();
    var dataSource: Array<PQ_GetResLabourOverTimeDetail> = new Array<PQ_GetResLabourOverTimeDetail>();
    var tbl_DataSource: Array<PQ_GetResLabourOverTimeDetail> = new Array<PQ_GetResLabourOverTimeDetail>();

    var GridParent: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();

    var _ScreenLang;
    var _CompCode;
    var _BranchCode;
    var schd_ProjectID: number;
    var schd_ProjectPhaseId: number;
    var ScheduleId: number;
    var OverTimeLabourID: number;

    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();

        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

        ControlsButtons.AddButton.disabled = false;
        ControlsButtons.EditButton.disabled = false;
        ControlsButtons.DeleteButton.disabled = false;
        ControlsButtons.PrintButton.disabled = false;

        InitalizeControls();
        InitalizeEvents();
        InitalizeGrid();

        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.UndoAction(Undo);
        ControlsButtons.SaveAction(
            () => {
                if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                    Insert();
                else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                    Update();
            }
        );

        ControlsButtons.PrintAction(() => { PrintOverTime(); });
        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.OverTimeSheet, Master.OverTimeID.toString());
        });
    }

    function InitalizeControls() {
        txtOverTimeID = DocumentActions.GetElementById<HTMLInputElement>("txtOverTimeID");
        txtTrNo = DocumentActions.GetElementById<HTMLInputElement>("txtTrNo");
        butTrNo = DocumentActions.GetElementById<HTMLButtonElement>("butTrNo");
        txtTrDate = DocumentActions.GetElementById<HTMLInputElement>("txtTrDate");
        txtPhase_ProjectPhaseCode = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_ProjectPhaseCode");
        //Site Engineer
        txtSiteEngineerId = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngineerId");
        txtEng_Code = DocumentActions.GetElementById<HTMLInputElement>("txtEng_Code");
        btnSearchLaborOT = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchLaborOT");
        btnSearchSchdule = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchSchdule");
        txtEng_Desc = DocumentActions.GetElementById<HTMLInputElement>("txtEng_Desc");
        //Project
        txtProjectID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectID");
        txtPrj_ProjectCode = DocumentActions.GetElementById<HTMLInputElement>("txtPrj_ProjectCode");
        butProj_Code = DocumentActions.GetElementById<HTMLButtonElement>("butProj_Code");
        txtPrj_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPrj_DescE");
        txtPhase_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_DescE");
        txtFromDate = DocumentActions.GetElementById<HTMLInputElement>("txtFromDate");
        txtToDate = DocumentActions.GetElementById<HTMLInputElement>("txtToDate");
        txtRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtRemarks");
        ChkStatus = DocumentActions.GetElementById<HTMLInputElement>("ChkStatus");
        txtWorkDescr = DocumentActions.GetElementById<HTMLInputElement>("txtWorkDescr");
    }

    function InitalizeEvents() {
        //butTrNo.onclick = butTrNo_Click;
        btnSearchLaborOT.onclick = btnSearchLaborOT_Click;
        btnSearchSchdule.onclick = btnSearchSchdule_Click;
        //butProj_Code.onclick = butProj_Code_Click;
        txtTrNo.onchange = SearchLaborOT_Changed;
        txtWorkDescr.onchange = SearchSchdule_Changed;
        ChkStatus.onchange = Opentr; 
    }

    function Undo() {

    }

    function InitalizeGrid() {
        let res: any = GetResourceList("ResM_Materiallabor");
        GridParent.ElementName = "GridParent";
        GridParent.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridParent.OnRefreshed = () => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridParent.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridParent.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridParent.InsertionMode = JsGridInsertionMode.Binding;
        GridParent.Columns = [
            {
                title: res.ResM_Materiallabor_labor,
                name: "Labor_Code", width: "10.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let btnFindLabor: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindLabor = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindLabor.className = "btn btn-primary btn-block addable editable";
                    btnFindLabor.innerText = _ScreenLang == "ar" ? " العمال" : "Load Labor";
                    btnFindLabor.id = "btnFindLabor";
                    btnFindLabor.type = "button";
                    btnFindLabor.onclick = (e) => {
                        btnFindLabor_onclick();
                    };
                    return HeaderTemplateNew(res.ResM_Materiallabor_labor, btnFindLabor);
                }

            },
            {
                title: res.ResM_Materiallabor_Laborname, visible: _ScreenLang == "ar",
                name: "Labor_DescA", width: "25.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Labor_DescA", " ");
                    txt.id = "h_Labor_DescA"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ResM_Materiallabor_Laborname, txt);
                }
            }
            ,
            {
                title: res.ResM_Materiallabor_Laborname, visible: _ScreenLang == "en",
                name: "Labor_DescE", width: "20.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Labor_DescE", " ");
                    txt.id = "h_Labor_DescE"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ResM_Materiallabor_Laborname, txt);
                }
            }
            ,
            {
                title: res.ResM_Materiallabor_overtime,
                name: "OTType_Code", width: "10.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let btnFindOverTimeType: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindOverTimeType = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindOverTimeType.className = "btn btn-primary btn-block addable editable";
                    btnFindOverTimeType.innerText = _ScreenLang == "ar" ? " انواع الوقت" : "Load Types";
                    btnFindOverTimeType.id = "btnFindOverTimeType";
                    btnFindOverTimeType.type = "button";
                    btnFindOverTimeType.onclick = (e) => {
                        btnFindOverTimeType_onclick();
                    };
                    return HeaderTemplateNew(res.ResM_Materiallabor_overtime, btnFindOverTimeType);
                }

            }
            ,
            {
                title: res.ResM_Materiallabor_overtimedesc, visible: _ScreenLang == "ar",
                name: "OTType_DescA", width: "12.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "OTType_DescA", " ");
                    txt.id = "h_OTType_DescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ResM_Materiallabor_overtimedesc, txt);
                }

            }

            ,
            {
                title: res.ResM_Materiallabor_overtimedesc, visible: _ScreenLang == "ar",
                name: "OTHourcost", width: "12.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "OTHourcost", " ");
                    txt.id = "h_OTHourcost"
                    txt.disabled = true;
                    txt.hidden = true;

                    return HeaderTemplateNew(res.ResM_Materiallabor_overtimedesc, txt);
                }
            }
            ,
            {
                title: res.ResM_Materiallabor_overtimedesc, visible: _ScreenLang == "en",
                name: "OTType_DescE", width: "20.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "OTType_DescE", " ");
                    txt.id = "h_OTType_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ResM_Materiallabor_overtimedesc, txt);
                }
            }
            ,
            {
                title: res.ResM_Materiallabor_startdate,
                name: "StartDate", width: "11.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("date", GridInputClassName, " ", " ", "StartDate", " ");
                    txt.id = "h_StartDate"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ResM_Materiallabor_startdate, txt);
                }
            }
            ,
            {
                title: res.ResM_Materiallabor_hours,
                name: "OverTimeHours", width: "8.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "OverTimeHours", " ");
                    txt.id = "h_OverTimeHours"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ResM_Materiallabor_hours, txt);
                }
            }
            ,

            {
                title: res.ResM_Materiallabor_remarks,
                name: "Remarks", width: "20.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Remarks", " ");
                    txt.id = "h_Remarks"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.ResM_Materiallabor_remarks, txt);
                }
            }
            ,
            {
                title: "#", name: "btnAddItem", width: "50px",
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton + " addable editable";
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemInGrid";
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }

                        AddItemInOverTimeGrid();
                    };
                    return btn;
                },
                // HANDLE DELETE Row in Grid
                itemTemplate: (s: string, item: PQ_GetResLabourOverTimeDetail): HTMLButtonElement => {
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
                        dataSource.splice(index, 1);
                        GridParent.DataSource = dataSource;
                        GridParent.Bind();
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
                itemTemplate: (s: string, item: PQ_GetResLabourOverTimeDetail): HTMLButtonElement => {

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
                        GridParent.DataSource = dataSource;
                        GridParent.Bind();
                        //ReIndexingGrid();

                        OverTimeLabourID = item.OverTimeLabourID;
                        txtOTHourcostgrid = item.OTHourCost;
                        $("#btnFindLabor").text(item.Labor_Code);
                        $('#h_LaborID').val(item.LaborID.toString());
                        if (_ScreenLang == "ar") {
                            $("#h_Labor_DescA").val(item.Labor_DescA.toString());
                        }
                        else {
                            $("#h_Labor_DescE").val(item.Labor_DescE.toString());
                        }
                        $("#btnFindOverTimeType").text(item.OTType_Code);
                        $('#h_OverTimeTypeID').val(item.LaborOverTimeTypeID.toString());
                        if (_ScreenLang == "ar") {
                            $("#h_OTType_DescA").val(item.OTType_DescA.toString());
                        }
                        else {
                            $("#h_OTType_DescE").val(item.OTType_DescE.toString());
                        }
                        $("#h_OverTimeRate").val(item.OverTimeRate.toString());
                        $("#h_StartDate").val(item.StartDate);
                        $("#h_OverTimeHours").val(item.OverTimeHours.toString());
                        $("#h_Remarks").val(item.Remarks.toString());
                    };
                    return btn;
                }
            }
        ];
        GridParent.DataSource = dataSource;
        GridParent.Bind();
    }

    function PrintOverTime() {


        Ajax.CallAsync({
            url: Url.Action("PrintOverTime", "PrintTransaction"),
            data: { TrID: Number(Master.OverTimeID) },
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });

    }

    function Add() {
        txtWorkDescr.value = "";
        ChkStatus.checked = false;
        ClearGrid(GridParent, new Array<Number>());
        dataSource = new Array<PQ_GetResLabourOverTimeDetail>();
        ChkStatus.disabled = !SharedSession.CurrentPrivileges.CUSTOM1;
    }

    function Edit() {
        ChkStatus.disabled = !SharedSession.CurrentPrivileges.CUSTOM1;
    }

    function Insert() {
        debugger;
        Master = new PQ_GetResLabourOverTime();
        Assign();
        if (CheckDate(_CompCode, _BranchCode, DateFormat(txtTrDate.value)) == false) {
            WorningMessage("غير مسموح بهذا التاريخ", "This Date is not allowed");
            return;
        }
        // check for details
        MasterDetails.P_TR_ResOverTime.ProjectID = schd_ProjectID;
        MasterDetails.P_TR_ResOverTime.SiteEngineerId = null;
        MasterDetails.P_TR_ResOverTime.TrNo = null;
        //MasterDetails.P_TR_ResOverTime.ScheduleId = ScheduleId;
        //Master.ScheduleId = ScheduleId;
        MasterDetails.P_TR_ResOverTime.ScheduleId = ScheduleId;
        MasterDetails.P_TR_ResOverTime.TrDate = DateTimeFormatWithoutT(txtTrDate.value);
        MasterDetails.P_TR_ResOverTime.CreatedAt = DateFormat(new Date().toString());
        MasterDetails.P_TR_ResOverTime.CreatedBy = ClientSharedWork.Session.UserCode;
        MasterDetails.P_TR_ResOverTime.UpdatedBy = ClientSharedWork.Session.UserCode;
        //txtOTHourcostgrid = $('#h_OTHourcost').val();
        //MasterDetails.P_TR_ResOverTime.FromDate = null;
        //MasterDetails.P_TR_ResOverTime.ToDate = null;
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BranchCode);
        let _Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        MasterDetails.P_TR_ResOverTime.OverTimeID = 0;
        Ajax.Callsync({
            url: Url.Action("Insert", ControllerName),
            data: { JsonData: JSON.stringify(MasterDetails) },
            success: (d) => {
                debugger;
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {

                    SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم الحفظ بنجاح  ", "Data Saved Successfuly. ");
                    MessageBox.Show(msg, "Insert", () => {

                        let OverTime = result.ResponseData as PQ_GetResLabourOverTime;
                        let OverTime_Index = GetIndexByUseId(result.ResponseData, "PQ_GetResLabourOverTime", "OverTimeID", _Condition);
                        NavigateToSearchResultKey(Number(OverTime_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Insert");
            }
        });
    }

    function Update() {
        debugger
        AssignUpdate();
        UpdMasterDetails.P_TR_ResOverTime.CompCode = Number(_CompCode);
        if (CheckDate(_CompCode, _BranchCode, DateFormat(txtTrDate.value)) == false) {
            WorningMessage("غير مسموح بهذا التاريخ", "This Date is not allowed");
            return;
        }
        let _Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        Ajax.CallAsync({
            url: Url.Action("Update", ControllerName),
            data: { JsonData: JSON.stringify(UpdMasterDetails) },
            success: (d) => {
                debugger;
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Insert", () => {

                        Display();
                        let _Index = GetIndexByUseId(result.ResponseData, "PQ_GetResLabourOverTime", "OverTimeID", _Condition);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
                else {
                    MessageBox.Show(result.ResponseMessage, "Insert");
                }
            }
        })
    }

    function Assign() {
        debugger;
        DocumentActions.AssignToModel<PQ_GetResLabourOverTime>(Master);
        MasterDetails.P_TR_ResOverTime = Master as P_TR_ResOverTime;
        MasterDetails.P_TR_ResOverTime.OverTimeID = Number(Master.OverTimeID);

        if (ChkStatus.checked == true) {
            Master.Status = 1;
        }
        else {
            Master.Status = 0;
        }
        // Assign Details
        debugger;
        MasterDetails.P_TR_ResOverTimeLabour = dataSource as Array<P_TR_ResOverTimeLabour>;
        for (var itm of dataSource) {
            itm.OverTimeID = Number(MasterDetails.P_TR_ResOverTime.OverTimeID);
            //itm.OTHourCost = Number(txtOTHourcostgrid);
            tbl_DataSource.push(itm);
        }

    }
    
    function AssignUpdate() {
        debugger;

        Master = DocumentActions.AssignToModel<PQ_GetResLabourOverTime>(Master);
        ChkStatus.checked ? Master.Status = 1 : Master.Status = 0;
        var NewMaster = new P_TR_ResOverTime(); 
        NewMaster.BraCode = Master.BraCode; 
        NewMaster.CompCode = Master.CompCode; 
        NewMaster.CreatedAt = Master.CreatedAt; 
        NewMaster.CreatedAt = Master.CreatedAt; 
        NewMaster.FromDate = Master.FromDate; 
        NewMaster.OverTimeID = Master.OverTimeID; 
        NewMaster.ProjectID = Master.ProjectID; 
        NewMaster.Remarks = Master.Remarks; 
        NewMaster.ScheduleId = Master.ScheduleId; 
        NewMaster.SiteEngineerId = Master.SiteEngineerId; 
        NewMaster.Status = Master.Status; 
        NewMaster.ToDate = Master.ToDate; 
        NewMaster.TrDate = Master.TrDate; 
        NewMaster.TrNo = Master.TrNo; 
        NewMaster.UpdatedAt = Master.UpdatedAt; 
        NewMaster.UpdatedBy = Master.UpdatedBy; 
        
       
        
        
        UpdMasterDetails.P_TR_ResOverTime = NewMaster as P_TR_ResOverTime;
        // assign Details
        
        UpdMasterDetails.P_TR_ResOverTimeLabour = dataSource as Array<P_TR_ResOverTimeLabour>;
        for (var itm of dataSource) {            
            itm.OverTimeID = Master.OverTimeID;
            itm.OTHourCost = Number(txtOTHourcostgrid);
            tbl_DataSource.push(itm);
        }
    }

    function butTrNo_Click() {
        let _Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.OverTimeSheet, "butTrNo", _Condition, () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetResLabourOverTimeByID", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    Master = d.result as PQ_GetResLabourOverTime;
                    txtTrNo.value = Master.TrNo.toString();
                    let _Index: number = Number(Master.OverTimeID);
                    let ind = GetIndexByUseId(Number(Master.OverTimeID), "PQ_GetResLabourOverTime", "OverTimeID", _Condition)
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });
        })
    }

    function Navigate() {

        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {

                Master = d.result as PQ_GetResLabourOverTime;
                Display();
            }
        })
    }

    function Display() {
        debugger
        DocumentActions.RenderFromModel(Master);
        if (Master.Status == 1)
            ControlsButtons.EditButton.disabled = true;
        else
            ControlsButtons.EditButton.disabled = !SharedSession.CurrentPrivileges.EDIT;

        if (Master.Status == 1 && SharedSession.CurrentPrivileges.CUSTOM2) {

            ChkStatus.disabled = false;

        } else
            ChkStatus.disabled = true;

        GetLabourOverTimeDetailsList(Master.OverTimeID);
        txtTrDate.value = DateFormat(Master.TrDate);
        txtFromDate.value = DateFormat(Master.FromDate);
        txtToDate.value = DateFormat(Master.ToDate);
        ScheduleId = Master.ScheduleId;
    }

    function GetLabourOverTimeDetailsList(OverTimeID: number) {
        Ajax.CallAsync({
            url: Url.Action("GetLabourOverTimeDetailsList", ControllerName),
            data: { id: OverTimeID },
            success: (d) => {

                dataSource = d.result as Array<PQ_GetResLabourOverTimeDetail>;
                for (var i = 0; i < dataSource.length; i++) {
                    dataSource[i].StartDate = DateFormat(dataSource[i].StartDate);
                }
                GridParent.DataSource = dataSource;
                GridParent.Bind();
            }
        });
    }
    function Opentr() {
        if (ClientSharedWork.CurrentMode == ScreenModes.Query && Master.Status == 1 && ChkStatus.checked == false)
            Update();
    }
    function btnSearchLaborOT_Click() {

        let _Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.OverTimeSheet, "btnSearchLaborOT", _Condition, () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLabourOverTime", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    MasterDetails = d.result as M_D_ResOverTime;
                    Master = d.result as PQ_GetResLabourOverTime;
                    let _Index = GetIndexByUseId(Number(Master.OverTimeID), "PQ_GetResLabourOverTime", "OverTimeID", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                    NavigateToSearchResultKey(Number(_Index), Navigate);
                }
            });
        })
    }
    function SearchLaborOT_Changed() {
        var trno = Number(txtTrNo.value);

       
             Ajax.CallAsync({
                 url: Url.Action("getOverTimeViewByNo", "FindByNo"),
                 data: { trno: trno },
                success: (d) => {
                    if (IsNullOrEmpty(d.result)) {
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");

                    }
                    MasterDetails = d.result as M_D_ResOverTime;
                    Master = d.result as PQ_GetResLabourOverTime;
                    let _Index = GetIndexByUseId(Number(Master.OverTimeID), "PQ_GetResLabourOverTime", "OverTimeID", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                    NavigateToSearchResultKey(Number(_Index), Navigate);
                }
            });
       
    }

    function btnSearchSchdule_Click() {

        sys.FindKey(Modules.OverTimeSheet, "btnSearchSchdule", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getEngSchedule", ControllerName),
                data: { id: id },
                success: (d) => {
                    debugger;
                    let schadule = d.result as PQ_GetEngWorkSchdule;
                    ScheduleId = schadule.ScheduleId;
                    txtWorkDescr.value = schadule.TrNo.toString();
                    txtPrj_ProjectCode.value = schadule.Prj_ProjectCode;
                    txtPrj_DescE.value = schadule.Prj_DescE;
                    txtPhase_ProjectPhaseCode.value = schadule.Phase_ProjectPhaseCode;
                    txtPhase_DescE.value = schadule.Phase_DescE;
                    txtFromDate.value = DateFormat(schadule.StartDateTime);
                    txtToDate.value = DateFormat(schadule.EndDateTime);
                    schd_ProjectID = schadule.ProjectID;
                    //schd_siteengid = schadule.id
                    schd_ProjectPhaseId = schadule.ProjectPhaseId;
                    dataSource = new Array<PQ_GetResLabourOverTimeDetail>()
                    ClearGrid(GridParent, dataSource);
                }
            });
        });
    }
    function SearchSchdule_Changed() {
        var trno = Number(txtWorkDescr.value);

        
            Ajax.CallAsync({
                url: Url.Action("getEngScheduleViewByNo", "FindByNo"),
                data: { trno: trno },
                success: (d) => {
                    debugger;
                    if (IsNullOrEmpty(d.result)) {
                        let schadule = d.result as PQ_GetEngWorkSchdule;
                        ScheduleId = 0;
                        txtWorkDescr.value = "";
                        txtPrj_ProjectCode.value = "";
                        txtPrj_DescE.value = "";
                        txtPhase_ProjectPhaseCode.value = "";
                        txtPhase_DescE.value = "";
                        txtFromDate.value = "";
                        txtToDate.value = "";
                        schd_ProjectID = 0;
                        //schd_siteengid = schadule.id
                        schd_ProjectPhaseId = 0;
                        dataSource = new Array<PQ_GetResLabourOverTimeDetail>()
                        ClearGrid(GridParent, dataSource);
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        return;
                    }
                    let schadule = d.result as PQ_GetEngWorkSchdule;
                    ScheduleId = schadule.ScheduleId;
                    txtWorkDescr.value = schadule.TrNo.toString();
                    txtPrj_ProjectCode.value = schadule.Prj_ProjectCode;
                    txtPrj_DescE.value = schadule.Prj_DescE;
                    txtPhase_ProjectPhaseCode.value = schadule.Phase_ProjectPhaseCode;
                    txtPhase_DescE.value = schadule.Phase_DescE;
                    txtFromDate.value = DateFormat(schadule.StartDateTime);
                    txtToDate.value = DateFormat(schadule.EndDateTime);
                    schd_ProjectID = schadule.ProjectID;
                    //schd_siteengid = schadule.id
                    schd_ProjectPhaseId = schadule.ProjectPhaseId;
                    dataSource = new Array<PQ_GetResLabourOverTimeDetail>()
                    ClearGrid(GridParent, dataSource);
                }
            });
        
    }

    function butProj_Code_Click() {
        let _Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.OverTimeSheet, "butProj_Code", _Condition, () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjectByID", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    Master = d.result as PQ_GetResLabourOverTime;
                    let Index = GetIndexByUseId(Number(Master.OverTimeID), "PQ_GetResLabourOverTime", "OverTimeID", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        })
    }

    function AddItemInOverTimeGrid() {

        DetailsOverTime = new PQ_GetResLabourOverTimeDetail();
        DetailsOverTime.OTHourCost = txtOTHourcostgrid;
        DetailsOverTime.OverTimeLabourID = OverTimeLabourID;
        DetailsOverTime.Labor_Code = $('#btnFindLabor').text();
        DetailsOverTime.LaborID = Number($('#h_LaborID').val());
        DetailsOverTime.Labor_DescA = $('#h_Labor_DescA').val();
        DetailsOverTime.Labor_DescE = $('#h_Labor_DescE').val();
        DetailsOverTime.OTType_Code = $('#btnFindOverTimeType').text();
        DetailsOverTime.LaborOverTimeTypeID = Number($('#h_OverTimeTypeID').val());
        DetailsOverTime.OverTimeRate = $('#h_OverTimeRate').val();
        DetailsOverTime.OTType_DescA = $('#h_OTType_DescA').val();
        DetailsOverTime.OTType_DescE = $('#h_OTType_DescE').val();
        let ST_Date = $('#h_StartDate').val();
        //let SDate = new Date(DateTimeFormat(Model.ToDate));
        //let Hs_SDate = (SDate.getHours() < 10 ? '0' + SDate.getHours() : SDate.getHours());
        //let Ms_SDate = (SDate.getMonth() < 10 ? '0' + SDate.getMonth() : SDate.getMonth());
        let headerToDate = DateFormat(Master.ToDate);

        //let F_Date = new Date(DateTimeFormat(Model.FromDate));
        //let HF_Date = (F_Date.getHours() < 10 ? '0' + F_Date.getHours() : F_Date.getHours());
        //let MF_Date = (F_Date.getMonth() < 10 ? '0' + F_Date.getMonth() : F_Date.getMonth());
        let headerFromDate = DateFormat(Master.FromDate);  // HF_Date + ':' + MF_Date;

        //if (ST_Date > headerToDate || ST_Date < headerFromDate) {
        //    //SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
        //    WorningMessage("التاريخ يجب ان يكون بين من والى كما فوق  ", "StartDate must be between FromDate to ToDate as in header");
        //    return;
        //}
        DetailsOverTime.StartDate = $('#h_StartDate').val();
        DetailsOverTime.OverTimeHours = $('#h_OverTimeHours').val();
        DetailsOverTime.Remarks = $('#h_Remarks').val();
        // check if item found in Grid 
        //for (var i = 0; i < DataSource.length; i++) {
        //    if (DataSource[i].ScopeId == DetailsAssignHeaderCabdidateScope.ScopeId) {
        //        WorningMessage("موجود برجاء اختيار اخر  ", "Scope Found before Please Select another Scope ");
        //        return;
        //    }
        //}
        dataSource.unshift(DetailsOverTime);
        GridParent.DataSource = dataSource;
        GridParent.Bind();
    }

    function btnFindLabor_onclick() {

        if (isNaN(ScheduleId)) {
            WorningMessage("يجب اختيار سكادول اولا", "You Should choose Schadule First");
            return;
        }
        sys.FindKey(Modules.OverTimeSheet, "btnFindLabor", " ScheduleId = " + ScheduleId, () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLaborByID", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as PQ_GetEngWorkSchduleLabor;

                    //overtimehourcost = result.Lab_HourCost
                    debugger;
                    txtOTHourcostgrid = result.Lab_HourCost; 
                    $('#btnFindLabor').text(result.Lab_LabCode);
                    $('#h_LaborID').val(result.LaborID);
                    if (_ScreenLang == "ar") {
                        $("#h_Labor_DescA").val(result.Lab_DescA.toString());
                    }
                    else {
                        $("#h_Labor_DescE").val(result.Lab_DescE.toString());
                    }
                    //$('#h_OverTimeHours').val(result.);
                }
            });
        })
    }

    function btnFindOverTimeType_onclick() {

        sys.FindKey(Modules.OverTimeSheet, "btnFindOverTimeType", "", () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetOverTimeTypeByID", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as P_D_LaborOverTimeType;
                    $('#btnFindOverTimeType').text(result.OverTimeCode);
                    $('#h_OverTimeTypeID').val(result.LaborOverTimeTypeID);
                    if (_ScreenLang == "ar") {
                        $("#h_OTType_DescA").val(result.DescA.toString());
                    }
                    else {
                        $("#h_OTType_DescE").val(result.DescE.toString());
                    }
                    $('#h_OverTimeRate').val(result.Rate);
                }
            });
        })
    }
}