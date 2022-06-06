$(document).ready(() => {
    LaborAssign.InitalizeComponent();
});

namespace LaborAssign {
    const ControllerName: string = "LaborAssign";
    var Master: PQ_GetResRequestLabours = new PQ_GetResRequestLabours();
    const GridInputClassName = "form-control gridIput";
    var columnWidth: string = "100px";
    const NumberColumnWidth = "50px";
    var MasterDetails: M_D_LaborAssign = new M_D_LaborAssign();

    var LabourDatasource: Array<PQ_GetResLabourAssign> = new Array<PQ_GetResLabourAssign>();
    var DetailsAssignHeaderLabors: PQ_GetResLabourAssign = new PQ_GetResLabourAssign();
    var Tbl_DetailLabors: Array<P_TR_EngScheduleLabor> = new Array<P_TR_EngScheduleLabor>();

    var ClassDatasource: Array<PQ_GetEngWorkSchduleLaborClass> = new Array<PQ_GetEngWorkSchduleLaborClass>();
    var FreeLaborDatasource: Array<PProc_ResGetFreeLabor_Result> = new Array<PProc_ResGetFreeLabor_Result>();
    var newFreeLaborDataSource: Array<PProc_ResGetFreeLabor_Result> = new Array<PProc_ResGetFreeLabor_Result>();

    var GridLabours: JsGrid = new JsGrid();
    var GridClass: JsGrid = new JsGrid();
    var GridFree: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    var txtTrNo: HTMLInputElement;
    var txtRequestLabourId: HTMLInputElement;
    var txtScheduleId: HTMLInputElement;
    var txtPrj_ProjectCode: HTMLInputElement;
    var txtPrj_DescE: HTMLInputElement;
    var txtPhase_ProjectPhaseCode: HTMLInputElement;
    var txtPhase_DescE: HTMLInputElement;
    var txtStartDateTime: HTMLInputElement;
    var txtEndDateTime: HTMLInputElement;
    var txtStartTime: HTMLInputElement;
    var txtEndTime: HTMLInputElement;
    var txtSearchStartDateTime: HTMLInputElement;
    var txtSearchEndDateTime: HTMLInputElement;
    var txtSearchClass: HTMLInputElement;
    var txtSearchCode: HTMLInputElement;
    var txtSearchDataSource: HTMLInputElement;
    var btnSearchRequested: HTMLButtonElement;
    var btnSearchCode: HTMLButtonElement;
    var btnSearchClass: HTMLButtonElement;
    var btnLoad: HTMLButtonElement;

    var _compCode: string;
    var _braCode: string;
    var _screenLang: string;
    var laborClassId: number;
    var laborCategoryId: number;
    var LaborID: number;
    var ScheduleId: number;
    var ScheduleLaborId: number;
    var _HourCost: number;
    var currentDate: string;
    var PlaneDate: string;
    var SearchFlag: number;
    SearchFlag = 0;
    var _Status = [
        {
            Name_Ar: "داخل المشروع ",
            Name_En: "Assign",
            Id: 0
        },
        {
            Name_Ar: "غادر",
            Name_En: "Leave",
            Id: 1
        }
    ];

    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _compCode = SharedSession.CurrentEnvironment.CompCode;
        _braCode = SharedSession.CurrentEnvironment.BranchCode;
        _screenLang = SharedSession.CurrentEnvironment.ScreenLanguage;

        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditButton.disabled = false;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.PrintButton.disabled = false;

        InitalizeControls();
        InitalizeEvents();
        InitalizeGrid();

        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.SaveAction(() => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.PrintAction(() => { PrintLaborAssign(); });
        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_compCode, _braCode, Modules.LaborRequest, Master.RequestLabourId.toString());
        });
    }

    function InitalizeControls() {
        txtRequestLabourId = DocumentActions.GetElementById<HTMLInputElement>("txtRequestLabourId");
        txtScheduleId = DocumentActions.GetElementById<HTMLInputElement>("txtScheduleId");
        txtPrj_ProjectCode = DocumentActions.GetElementById<HTMLInputElement>("txtPrj_ProjectCode");
        txtPrj_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPrj_DescE");
        txtPhase_ProjectPhaseCode = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_ProjectPhaseCode");
        txtPhase_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_DescE");
        txtStartDateTime = DocumentActions.GetElementById<HTMLInputElement>("txtStartDateTime");
        txtEndDateTime = DocumentActions.GetElementById<HTMLInputElement>("txtStartDateTime");
        txtStartTime = DocumentActions.GetElementById<HTMLInputElement>("txtStartTime");
        txtEndTime = DocumentActions.GetElementById<HTMLInputElement>("txtEndTime");
        txtSearchStartDateTime = DocumentActions.GetElementById<HTMLInputElement>("txtSearchStartDateTime");
        txtSearchEndDateTime = DocumentActions.GetElementById<HTMLInputElement>("txtSearchEndDateTime");
        txtSearchClass = DocumentActions.GetElementById<HTMLInputElement>("txtSearchClass");
        txtSearchCode = DocumentActions.GetElementById<HTMLInputElement>("txtSearchCode");
        txtSearchDataSource = DocumentActions.GetElementById<HTMLInputElement>("txtSearchDataSource");
        btnSearchRequested = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchRequested");
        btnSearchCode = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchCode");
        btnSearchClass = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchClass");
        btnLoad = DocumentActions.GetElementById<HTMLButtonElement>("btnLoad");
        txtTrNo = DocumentActions.GetElementById<HTMLInputElement>("txtTrNo");
    }

    function InitalizeEvents() {
        btnSearchRequested.onclick = btnSearchRequest_Click;
        btnSearchClass.onclick = btnSearchClass_Click;
        btnSearchCode.onclick = btnSearchCode_Click;
        btnLoad.onclick = btnLoad_Click;
        txtSearchDataSource.onkeyup = txtSearchDataSource_Change;
        txtTrNo.onchange = SearchRequest_Changed;
    }

    function PrintLaborAssign() {
        Ajax.CallAsync({
            url: Url.Action("PrintLaborAssign", "PrintTransaction"),
            data: { TrID: Number(Master.RequestLabourId) },
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });

    }

    function txtSearchDataSource_Change() {
        
        SearchFlag = 0
        if (txtSearchDataSource.value != "") {
            
            SearchFlag = 1
            let search: string = txtSearchDataSource.value.toLowerCase(); 
            newFreeLaborDataSource = FreeLaborDatasource.filter(x => x.DescA.toLowerCase().search(search) >= 0 || x.DescE.toLowerCase().search(search) >= 0 || x.LaborCode.toLowerCase().search(search) >= 0);
            
            GridFree.DataSource = newFreeLaborDataSource;
            GridFree.Bind();
        } else {
            GridFree.DataSource = FreeLaborDatasource;
            GridFree.Bind();
        }
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("ResM_Materiallabor");
        GridLabours.ElementName = "GridLabours";
        GridLabours.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridLabours.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridLabours.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridLabours.InsertionMode = JsGridInsertionMode.Binding;
        GridLabours.Columns = [
            {
                title: res.ResM_Materiallabor_laborcode, name: "LaborCode", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "LaborCode", " ");
                    txt.id = "h_LaborCode";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ResM_Materiallabor_laborcode, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_name, visible: _screenLang == "ar", name: "DescA", width: "20.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ResM_Materiallabor_name, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_name, visible: _screenLang == "en", name: "DescE", width: "20.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescE", " ");
                    txt.id = "h_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ResM_Materiallabor_name, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_class, name: "LabourClass_ClassCode", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "LabourClass_ClassCode", " ");
                    txt.id = "h_LabourClass_ClassCode";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ResM_Materiallabor_class, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_assigndate, name: "AssigneDate", width: "14.3%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("datetime-local", GridInputClassName, " ", " ", "AssigneDate", " ");
                    txt.id = "h_AssigneDate";
                    txt.disabled = false;
                    txt.onchange = (e) => {
                        //if ($('#h_AssigneDate').val() < $("#txtStartDateTime").val()) {
                        //    $('#h_AssigneDate').val($("#txtStartDateTime").val());
                        //}
                    }
                    return HeaderTemplateNew(res.ResM_Materiallabor_assigndate, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_planeleavedate, name: "ExpLeaveDate", width: "14.3%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("datetime-local", GridInputClassName, " ", " ", "ExpLeaveDate", " ");
                    txt.id = "h_ExpLeaveDate";
                    txt.disabled = false;
                    txt.onchange = (e) => {
                        //if ($('#h_ExpLeaveDate').val() > $("#txtEndDateTime").val()) {
                        //    $('#h_ExpLeaveDate').val($("#txtEndDateTime").val());
                        //}
                    }
                    return HeaderTemplateNew(res.ResM_Materiallabor_planeleavedate, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_actualleavedate, name: "LeaveDate", width: "14.3%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("datetime-local", GridInputClassName, " ", " ", "LeaveDate", " ");
                    txt.id = "h_LeaveDate";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.ResM_Materiallabor_actualleavedate, txt);
                }
            },
            {
                title: res.ResM_Materiallabor_status, name: "Status", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    //let txt = CreateElement("label", GridInputClassName, " ", " ", "Status", " ");
                    let txt = CreateDropdownList(_Status, "Name_Ar", "Name_En", "Id", false);
                    txt.id = "h_Status";
                    txt.onchange = function (e) {
                        //ChangeDropDownStatus
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }

                        let _Status = $("#h_Status").val();
                        if (_Status == 0) {
                            $("#h_AssigneDate").removeAttr("disabled");
                            $("#h_ExpLeaveDate").removeAttr("disabled");
                            $("#h_LeaveDate").attr("disabled", "disabled");
                        } else if (_Status == 1) {
                            $("#h_AssigneDate").attr("disabled", "disabled");
                            $("#h_ExpLeaveDate").attr("disabled", "disabled");
                            $("#h_LeaveDate").removeAttr("disabled");
                            
                            $("#h_LeaveDate").val(DateTimeFormat(Master.EndDateTime));
                        }
                    }
                    return HeaderTemplateNew(res.ResM_Materiallabor_status, txt);
                },
                itemTemplate: (s: string, item: PQ_GetResEquipAssign): HTMLSelectElement => {
                    let txt = CreateDropdownList(_Status, "Name_Ar", "Name_En", "Id", false);
                    txt.disabled = true;
                    txt.id = "lblStatus"
                    txt.name = "Status";
                    txt.value = item.Status.toString();
                    return txt;
                }
            },
            {
                title: "#", name: "btnAddItem", visible: true, width: NumberColumnWidth,
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton;
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemActivityGrid";
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }

                        AddItemInActivityGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GetResLabourAssign): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.type = "button";
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.name = LabourDatasource.indexOf(item).toString();
                    btn.onclick = (e) => {
                        //remove
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        let labId = LabourDatasource[index].LaborID;
                        UpdateLaborProject_Phase(labId, null, null);
                        LabourDatasource.splice(index, 1);
                        BindDataGridLabors();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            }
            ,
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: (s: string, item: PQ_GetResLabourAssign): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "20px";
                    btn.type = "button";
                    btn.style.color = "forestgreen";
                    btn.name = LabourDatasource.indexOf(item).toString();
                    btn.onclick = (e) => {
                        //EDIT
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        if (item.Status == 1) {
                            return;
                        }
                        currentDate = DateTimeFormat(item.AssigneDate);
                        PlaneDate = DateTimeFormat(item.ExpLeaveDate);
                        LaborID = item.LaborID;
                        ScheduleId = item.ScheduleId;
                        ScheduleLaborId = item.ScheduleLaborId;
                        _HourCost = item.HourCost;

                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        LabourDatasource.splice(index, 1);
                        BindDataGridLabors();
                        FillInputText("h_LaborCode", item.LaborCode);
                        FillInputText("h_DescA", item.DescA);
                        FillInputText("h_DescE", item.DescE);
                        $('#h_AssigneDate').val(DateTimeFormat(item.AssigneDate));
                        FillInputText("h_ExpLeaveDate", DateTimeFormat(item.ExpLeaveDate));
                        FillInputText("h_LabourClass_ClassCode", item.LabourClass_ClassCode);
                        FillInputText("h_LeaveDate", DateTimeFormat(item.LeaveDate));
                        $("#h_Status").val(item.Status.toString())
                    };
                    return btn;
                }
            }
        ];
        GridLabours.DataSource = LabourDatasource;
        GridLabours.Bind();

        GridClass.ElementName = "GridClass";
        GridClass.Inserting = false; //SharedSession.CurrentPrivileges.AddNew;       
        GridClass.Editing = false; // SharedSession.CurrentPrivileges.EDIT;
        GridClass.ConfirmDeleteing = false;  // SharedSession.CurrentPrivileges.Remove;
        GridClass.InsertionMode = JsGridInsertionMode.Binding;
        GridClass.Columns = [
            { title: res.ResM_Materiallabor_labclass, name: "LClass_CalssCode", type: "text", width: "9.5%" },
            { title: res.ResM_Materiallabor_classname, name: "LClass_DescA", visible: _screenLang == "ar", type: "text", width: "9.5%" },
            { title: res.ResM_Materiallabor_classname, name: "LClass_DescE", visible: _screenLang == "en", type: "text", width: "9.5%" },
            { title: res.ResM_Materiallabor_requiredhrs, name: "LCass_HourCost", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_requiredlabors, name: "RequiredNo", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_assigned, name: "AssignedLab", type: "text", width: "7.5%" },
            { title: res.ResM_Materiallabor_remain, name: "RemainLab", type: "text", width: "7.5%" }
            //{ type: "control", width: "3%" }
        ];
        GridClass.DataSource = ClassDatasource;
        GridClass.Bind();

        GridFree.ElementName = "GridChildChild";
        GridFree.Inserting = false; //SharedSession.CurrentPrivileges.AddNew;
        GridFree.Editing = false; // SharedSession.CurrentPrivileges.EDIT;
        GridFree.ConfirmDeleteing = false; //  SharedSession.CurrentPrivileges.Remove;
        GridFree.OnRowDoubleClicked = FreeLaborsRowDoubleClicked;
        GridFree.InsertionMode = JsGridInsertionMode.Binding;
        GridFree.Columns = [
            { title: res.ResM_Materiallabor_classcode, name: "ClassCode", type: "label", width: "5%" },
            { title: res.ResM_Materiallabor_categorycode, name: "CategCode", type: "label", width: "7.5%" },
            { title: res.ResM_Materiallabor_laborcode, name: "LaborCode", type: "label", width: "7.5%" },
            { title: res.ResM_Materiallabor_Laborname, name: "DescA", type: "label", visible: _screenLang == "ar", width: "12%" },
            { title: res.ResM_Materiallabor_Laborname, name: "DescE", type: "label", visible: _screenLang == "en", width: "12%" },
            { title: res.ResM_Materiallabor_planeleavedate, name: "FreeDate", type: "label", width: "10%" },
            { title: "Busydate", name: "BusyDate", type: "label", width: "10%" },
        ];
        GridFree.DataSource = FreeLaborDatasource;
        GridFree.Bind();
    }

    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {
                Master = d.result as PQ_GetResRequestLabours;
                Display();
            }
        })
    }

    function Display() {
        DocumentActions.RenderFromModel(Master);
        txtSearchStartDateTime.value = DateTimeFormat(Master.StartDateTime)
        txtSearchEndDateTime.value = DateTimeFormat(Master.EndDateTime);
        txtStartTime.value = TimeFormat(Master.StartDateTime);
        txtEndTime.value = TimeFormat(Master.EndDateTime);
        GetLaborList(Number(Master.ScheduleId));
        GetClassesList(Number(Master.ScheduleId));
        newFreeLaborDataSource.splice(0);
        FreeLaborDatasource.splice(0);
        GridFree.DataSource = FreeLaborDatasource;
        GridFree.Bind();
    }

    function Add() {

    }

    function Edit() {

    }

    function Insert() {

    }

    function Update() {
        Assign();
        Master.CompCode = Number(_compCode);
        var session: SessionRecord = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_Tr_ResRequestLabour", "UpdateMasterDetail"),
            data: JSON.stringify(MasterDetails),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: (d) => {
                
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    WorningMessage("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    
                        
                         
                        let _Index = GetIndexByUseId(result.Response, "PQ_GetResRequestLabours", "RequestLabourId", " CompCode = " + _compCode + " and BraCode = " + _braCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                  
                }
            }
        });

        //Ajax.Callsync({
        //    url: Url.Action("Update", ControllerName),
        //    data: { JsonData: JSON.stringify(MasterDetails) },
        //    success: (d) => {
                
        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            ClientSharedWork.SwitchModes(ScreenModes.Query);
        //            let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
        //            MessageBox.Show(msg, "Update", () => {
                        
        //                Display();
        //                let _Index = GetIndexByUseId(result.ResponseData, "PQ_GetResRequestLabours", "RequestLabourId", " CompCode = " + _compCode + " and BraCode = " + _braCode);
        //                NavigateToSearchResultKey(Number(_Index), Navigate);
        //            });
        //        }
        //    }
        //})
    }

    function btnSearchRequest_Click() {
        
        sys.FindKey(Modules.LaborAssign, "btnSearchRequested", "CompCode = " + _compCode + " and BraCode = " + _braCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.Callsync({
                url: Url.Action("GetLaborRequest", ControllerName),
                data: { id: id },
                success: (d) => {
                    Master = d.result as PQ_GetResRequestLabours;
                    let Index = GetIndexByUseId(Number(Master.RequestLabourId), "PQ_GetResRequestLabours", "RequestLabourId", " CompCode = " + _compCode + " and BraCode = " + _braCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }
    function SearchRequest_Changed() {
        
        var trno = Number(txtTrNo.value);
            Ajax.Callsync({
                url: Url.Action("getRequestLabourViewByNo", "FindByNo"),
                data: { trno: trno },
                success: (d) => {
                    
                    if (IsNullOrEmpty(d.result)) {
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");

                    }
                    Master = d.result as PQ_GetResRequestLabours;
                    let Index = GetIndexByUseId(Master.RequestLabourId, "PQ_GetResRequestLabours", "RequestLabourId", " CompCode = " + _compCode + " and BraCode = " + _braCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
         
    }

    function btnSearchClass_Click() {
        sys.FindKey(Modules.LaborAssign, "btnSearchClass", "CompCode = " + _compCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLaborClass", ControllerName),
                data: { id: id },
                success: (d) => {
                    let laborClass: P_D_LaborClass = d.result as P_D_LaborClass;
                    laborClassId = laborClass.LaborClassId;
                    txtSearchClass.value = laborClass.ClassCode.toString();
                }
            });
        });
    }

    function btnSearchCode_Click() {
        sys.FindKey(Modules.LaborAssign, "btnSearchCode", "CompCode = " + _compCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLaborCategory", ControllerName),
                data: { id: id },
                success: (d) => {
                    let laborategory: P_D_LaborCategory = d.result as P_D_LaborCategory;
                    laborCategoryId = laborategory.LaborCategoryId;
                    txtSearchCode.value = laborategory.CategCode.toString();
                }
            });
        });
    }

    function GetLaborList(id: number) {
        LabourDatasource.splice(0);
       
        Tbl_DetailLabors.splice(0);
         //LabourDatasource = new Array<PQ_GetResLabourAssign>();
        
         //Tbl_DetailLabors =new Array<P_TR_EngScheduleLabor>();
        Ajax.CallAsync({
            url: Url.Action("GetLaborList", ControllerName),
            data: { id: id },
            success: (d) => {
                LabourDatasource = d.result as Array<PQ_GetResLabourAssign>;
                GridLabours.DataSource = LabourDatasource;
                for (var itm of LabourDatasource) {
                    itm.AssigneDate = itm.AssigneDate != null ? DateTimeFormatWithoutT(itm.AssigneDate) : itm.AssigneDate = null;
                    itm.ExpLeaveDate = itm.ExpLeaveDate != null ? DateTimeFormatWithoutT(itm.ExpLeaveDate) : itm.ExpLeaveDate = null;
                    itm.LeaveDate = itm.LeaveDate != null ? DateTimeFormatWithoutT(itm.LeaveDate) : itm.LeaveDate = null;
                }
                GridLabours.Bind();
            }
        });

    }

    function GetClassesList(id: number) {
        Ajax.CallAsync({
            url: Url.Action("GetClassesList", ControllerName),
            data: { id: id },
            success: (d) => {
                
                ClassDatasource = d.result as Array<PQ_GetEngWorkSchduleLaborClass>;
                GridClass.DataSource = ClassDatasource;
                GridClass.Bind();
            }
        });
    }

    function btnLoad_Click() {
        Ajax.CallAsync({
            url: Url.Action("PProc_ResGetFreeLabor", ControllerName),
            data: {
                bra: _compCode, FromDate: txtSearchStartDateTime.value,
                ToDate: txtSearchEndDateTime.value, Classid: laborClassId, Catid: laborCategoryId
            },
            success: (d) => {
                
                FreeLaborDatasource = d.result as Array<PProc_ResGetFreeLabor_Result>;
                for (var itm of FreeLaborDatasource) {
                    itm.FreeDate = DateTimeFormatWithoutT(itm.FreeDate);
                    itm.BusyDate = DateTimeFormatWithoutT(itm.BusyDate);
                }
                GridFree.DataSource = FreeLaborDatasource;
                GridFree.Bind();
            }
        })
    }

    function FreeLaborsRowDoubleClicked() {
        //
        let labors: PQ_GetResLabourAssign = new PQ_GetResLabourAssign();
        let currenLabor: PProc_ResGetFreeLabor_Result = GridFree.SelectedItem as PProc_ResGetFreeLabor_Result;
        let index = GridFree.SelectedIndex;
        labors.LabourClass_ClassCode = currenLabor.ClassCode;
        labors.LabourClass_DescA = currenLabor.class_descA;
        labors.LabourClass_DescE = currenLabor.Class_DescE;
        labors.DescA = currenLabor.DescA;
        labors.DescE = currenLabor.DescE;
        labors.HourCost = currenLabor.HourCost;
        labors.Status = 0;//currenLabor.IsActive == true ? 0 : 1;
        labors.LaborID = currenLabor.LaborID;
        labors.LaborCode = currenLabor.LaborCode;
        labors.ScheduleId = Master.ScheduleId;
        labors.LeaveDate = null;
        labors.AssigneDate = currenLabor.FreeDate;
        labors.ExpLeaveDate = currenLabor.BusyDate;
        labors.ScheduleLaborId = 0; 
        index = FreeLaborDatasource.indexOf(currenLabor);
        //
        //labors.AssigneDate = DateTimeFormatWithoutT($("#txtSearchStartDateTime").val());
        //labors.ExpLeaveDate = DateTimeFormatWithoutT($("#txtSearchEndDateTime").val());
        //
        LabourDatasource.push(labors);
        GridLabours.DataSource = LabourDatasource;
        GridLabours.Bind();
        //if ( SearchFlag == 0 )
            FreeLaborDatasource.splice(index, 1);
        //else 
        //    newFreeLaborDataSource.splice(index, 1);
        GridFree.DataSource = FreeLaborDatasource;
        GridFree.Bind();
        SearchFlag = 0
        // Update P_D_Labor
        let projectid: number = Master.ProjectID;
        let ProjectPhaseId: number = Master.ProjectPhaseId;
        UpdateLaborProject_Phase(currenLabor.LaborID, projectid, ProjectPhaseId);
    }

    function BindDataGridLabors() {
        GridLabours.DataSource = LabourDatasource;
        GridLabours.Bind();
    }

    function FillInputText(_TextID: string, _Data: string) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }

    function AddItemInActivityGrid() {
        DetailsAssignHeaderLabors = new PQ_GetResLabourAssign();
        DetailsAssignHeaderLabors.LaborID = LaborID;
        DetailsAssignHeaderLabors.ScheduleId = ScheduleId;
        DetailsAssignHeaderLabors.ScheduleLaborId = ScheduleLaborId;
        DetailsAssignHeaderLabors.LaborCode = $("#h_LaborCode").val();
        DetailsAssignHeaderLabors.LaborCode = $("#h_LaborCode").val();
        DetailsAssignHeaderLabors.DescA = $("#h_DescA").val();
        DetailsAssignHeaderLabors.DescE = $("#h_DescE").val();
        DetailsAssignHeaderLabors.LabourClass_ClassCode = $("#h_LabourClass_ClassCode").val();
        DetailsAssignHeaderLabors.HourCost = _HourCost;
        DetailsAssignHeaderLabors.Status = Number($("#h_Status").val());
        if (DetailsAssignHeaderLabors.Status == 0) {
            DetailsAssignHeaderLabors.AssigneDate = DateTimeFormatWithoutT($("#h_AssigneDate").val());
            DetailsAssignHeaderLabors.ExpLeaveDate = DateTimeFormatWithoutT($("#h_ExpLeaveDate").val());
            DetailsAssignHeaderLabors.LeaveDate = null;
        } else {
            DetailsAssignHeaderLabors.AssigneDate = DateTimeFormatWithoutT($("#h_AssigneDate").val());
            DetailsAssignHeaderLabors.ExpLeaveDate = DateTimeFormatWithoutT($("#h_ExpLeaveDate").val());

            if ($("#h_LeaveDate").val() == "") {
                DetailsAssignHeaderLabors.LeaveDate = null;
            } else {
                DetailsAssignHeaderLabors.LeaveDate = DateTimeFormatWithoutT($("#h_LeaveDate").val());
            }
        }
        //|| DateTimeFormatWithoutT($("#h_LeaveDate").val()) == "Invalid Date"
        
        if (DetailsAssignHeaderLabors.Status == 1 && (DetailsAssignHeaderLabors.LeaveDate == null || DetailsAssignHeaderLabors.LeaveDate == "")) {
            WorningMessage("الرجاء اضافة تاريخ المغادره في حالة ان الحاله غادر", "Please enter leave date in case status leave");
            return;
        }

        
        let _AssigneDate = DateFormat($("#h_AssigneDate").val());
        let _ExpLeaveDate = DateFormat($("#h_ExpLeaveDate").val());
        let _AssigneDateTime = TimeFormat($("#h_AssigneDate").val());
        let _ExpLeaveDateTime = TimeFormat($("#h_ExpLeaveDate").val());

        if (_AssigneDate < DateFormat(Master.StartDateTime) || (_AssigneDate == DateFormat(Master.StartDateTime) && _AssigneDateTime < TimeFormat(Master.StartDateTime))) {
            WorningMessage(" يجب ان يكون التاريخ بين الفتره من تاريخ الي تاريخ", "must be date between from date to date");
            return;
        }

        if (_ExpLeaveDate > DateFormat(Master.EndDateTime) || (_ExpLeaveDate == DateFormat(Master.EndDateTime) && _ExpLeaveDateTime > TimeFormat(Master.EndDateTime))) {
            WorningMessage(" يجب ان يكون التاريخ بين الفتره من تاريخ الي تاريخ", "must be date between from date to date");
            return;
        }

        if (Number($("#h_Status").val()) == 1) {
            UpdateLaborProject_Phase(DetailsAssignHeaderLabors.LaborID, null, null);
        }

        LabourDatasource.push(DetailsAssignHeaderLabors);
        GridLabours.DataSource = LabourDatasource;
        GridLabours.Bind();
    }

    function changeStatusAndLeaveDate(currLabor: PQ_GetResLabourAssign, index: number) {
        
        LabourDatasource.splice(index, 1);
        GridLabours.Bind();
        currLabor.Status = 1;
        currLabor.LeaveDate = DateFormat(new Date().toString());
        LabourDatasource.push(currLabor);
        GridLabours.DataSource = LabourDatasource;
        GridLabours.Bind();
    }

    function UpdateLaborProject_Phase(laborId: number, projectId: number, phaseId: number) {
        Ajax.Callsync({
            url: Url.Action("UpdateLabourProjectPhase", ControllerName),
            data: { id: laborId, projectid: projectId, ProjectPhaseId: phaseId },
            success: (d) => {

            }
        })
    }

    function Assign() {
        
        //AssignMaster
        //Master = new P_TR_EngSchedule();
        DocumentActions.AssignToModel<PQ_GetResRequestLabours>(Master);
        MasterDetails.P_Tr_ResRequestLabour = Master as PQ_GetResRequestLabours;
        MasterDetails.P_Tr_ResRequestLabour.RequestLabourId = Master.RequestLabourId;
        //AssignDetails
        MasterDetails.P_TR_EngScheduleLabor = LabourDatasource as Array<PQ_GetResLabourAssign>;
        for (var lab of LabourDatasource) {
            var NLab = new P_TR_EngScheduleLabor
            lab.ScheduleId = Number(Master.ScheduleId);
            NLab.AssigneDate = lab.AssigneDate; 
            NLab.ExpLeaveDate = lab.ExpLeaveDate; 
            NLab.HourCost = lab.HourCost;
            NLab.LaborID = lab.LaborID;
            NLab.LeaveDate = lab.LeaveDate;
            NLab.ScheduleId = lab.ScheduleId;
            NLab.ScheduleLaborId = lab.ScheduleLaborId;
            NLab.Status = lab.Status;

            
            //lab.Status =
            Tbl_DetailLabors.push(NLab);
        }
        MasterDetails.P_TR_EngScheduleLabor = Tbl_DetailLabors;
    }
}