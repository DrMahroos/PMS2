$(document).ready(() => {
    WorkSchedule.InitalizeComponent();
});
namespace WorkSchedule {
    const ControllerName: string = "WorkSchedule";
    const GridInputClassName = "form-control gridIput";
    var columnWidth: string = "100px";
    const NumberColumnWidth = "50px";
    var sys: SystemTools = new SystemTools();
    var GridActivity: JsGrid = new JsGrid();
    var GridLaborClass: JsGrid = new JsGrid();
    var GridEquipClass: JsGrid = new JsGrid();
    var GridLabors: JsGrid = new JsGrid();
    var GridEquip: JsGrid = new JsGrid();
    var GridMaterial: JsGrid = new JsGrid();

    var _ScreenLanguage: string;
    var _CompCode: string;
    var _BranchCode: string;

    var ProjectID: number;
    var ProjectPhaseId: number;
    var CalenderId: number;
    var currentCalId: number;
    var activityId: number;
    var itemId: number;
    var ProjectPhaseItemActivId: number;
    var ScheduleActivId: number;
    class M_D_WorkSchdule {
        public sessionRecord: SessionRecord = new SessionRecord();
        public P_TR_EngSchedule: P_TR_EngSchedule = new P_TR_EngSchedule();
        public P_TR_EngScheduleActiv: Array<P_TR_EngScheduleActiv>;
    }
    var MasterDetails: M_D_WorkSchdule = new M_D_WorkSchdule();
    //var Master: P_TR_EngSchedule = new P_TR_EngSchedule();
    var Master: PQ_GetEngWorkSchdule = new PQ_GetEngWorkSchdule();

    var ActivityDataSource: Array<PQ_GetEngWorkSchduleActivity> = new Array<PQ_GetEngWorkSchduleActivity>();
    var DetailsActivity: Array<PQ_GetEngWorkSchduleActivity> = new Array<PQ_GetEngWorkSchduleActivity>();
    var DetailsAssignHeaderActivity: PQ_GetEngWorkSchduleActivity = new PQ_GetEngWorkSchduleActivity();
    var Tbl_DetailActivity: Array<P_TR_EngScheduleActiv> = new Array<P_TR_EngScheduleActiv>();
    var Tbl_DetailActivityobj: P_TR_EngScheduleActiv = new P_TR_EngScheduleActiv();

    var DetailsLaborClass: Array<PQ_GetEngWorkSchduleLaborClass> = new Array<PQ_GetEngWorkSchduleLaborClass>();
    var DetailsEquipClass: Array<PQ_GetEngWorkSchduleEquipClass> = new Array<PQ_GetEngWorkSchduleEquipClass>();
    var DetailsLabors: Array<PQ_GetEngWorkSchduleLabor> = new Array<PQ_GetEngWorkSchduleLabor>();
    var DetailsEquip: Array<PQ_GetEngWorkSchduleEquip> = new Array<PQ_GetEngWorkSchduleEquip>();
    var DetailsMaterial: Array<PQ_GetEngWorkSchduleMaterial> = new Array<PQ_GetEngWorkSchduleMaterial>();

    var txtTrNo: HTMLInputElement;
    var txtTrDate: HTMLInputElement;
    var txtWorkDescr: HTMLInputElement;
    var txtPrj_ProjectCode: HTMLInputElement;
    var txtPrj_DescE: HTMLInputElement;
    var txtPhase_CCCode: HTMLInputElement;
    var txtPhase_DescE: HTMLInputElement;
    var txtRemarks: HTMLInputElement;
    var txtCal_calenderCode: HTMLInputElement;
    var txtCal_DescE: HTMLInputElement;
    var txtStartTime: HTMLInputElement;
    var txtStartDateTime: HTMLInputElement;
    var txtEndTime: HTMLInputElement;
    var txtEndDateTime: HTMLInputElement;
    var txtProdHours: HTMLInputElement;
    var txtCalHours: HTMLInputElement;
    var txtOTHours: HTMLInputElement;
    var txtMaterialReqId: HTMLInputElement;
    var txtAssignLaborId: HTMLInputElement;
    var txtAssignEquipId: HTMLInputElement;
    var ChkStatus: HTMLInputElement;
    var ChkClose: HTMLInputElement;
    var btnSearchSchdule: HTMLButtonElement;
    var btnSearchProject: HTMLButtonElement;
    var btnSearchPhase: HTMLButtonElement;
    var btnSearchCalender: HTMLButtonElement;
    var btnAuthorize: HTMLButtonElement;
    var btnUnauthorized: HTMLButtonElement;
    var btnReopen: HTMLButtonElement;
    var btnFindAtcivity: HTMLButtonElement;
    var btnCalcRequirement: HTMLButtonElement;
    var btnCalcHours: HTMLButtonElement;

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

        ControlsButtons.DeleteAction(() => { });
        ControlsButtons.UndoAction(Undo);
        ControlsButtons.PrintAction(() => { PWorkSchedule(); });
        InitalizeGrid();
        $("#ImageEditorButton").on("click", () => {

            sys.ImgPopup(_CompCode, _BranchCode, Modules.WorkSchedule, Master.ScheduleId.toString());
        });
        btnAuthorize.hidden = true;
        ScheduleActivId=0;
    }

    function InitalizeGrid() {
        // Grid Activity
        let res: any = GetResourceList("work_");
        GridActivity.ElementName = "GridActivity";
        GridActivity.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridActivity.OnRefreshed = () => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridActivity.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridActivity.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridActivity.InsertionMode = JsGridInsertionMode.Binding;
        GridActivity.OnItemInserting = () => { };
        GridActivity.OnItemUpdating = () => { };
        GridActivity.OnItemDeleting = () => { };
        GridActivity.Columns = [
            {
                title: res.work_item, name: "", width: columnWidth, css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let btnFindAtcivity: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindAtcivity = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindAtcivity.className = "btn btn-primary btn-block addable editable";
                    btnFindAtcivity.innerText = _ScreenLanguage == "ar" ? "الانشطة" : "Activity";
                    btnFindAtcivity.id = "btnFindAtcivity";
                    btnFindAtcivity.type = "button";
                    btnFindAtcivity.onclick = (e) => {
                        btnFindAtcivity_onclick();
                    };
                    return HeaderTemplateNew(res.work_item, btnFindAtcivity);
                }
                //},
                //itemTemplate: (index: string, item: PQ_GetEngWorkSchduleActivity): HTMLElement => {
                //    let lbl = DocumentActions.CreateElement<HTMLLabelElement>("label");
                //    lbl.innerText = item.ActivityID.toString();
                //    return lbl;
                //}
            },
            {
                title: res.work_ActCode, visible: false, name: "ActivityID", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ActivityID", " ");
                    txt.id = "h_ActivityID"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_ActCode, txt);
                }
            },
            {
                title: res.work_ActCode, name: "Act_ActivityCode", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Act_ActivityCode", " ");
                    txt.id = "h_Act_ActivityCode"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_ActCode, txt);
                }
            },
            {
                title: res.work_ActivityName, visible: _ScreenLanguage == "ar", name: "Act_DescA", width: "40.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Act_DescA", " ");
                    txt.id = "h_Act_DescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_ActivityName, txt);
                }
            },
            {
                title: res.work_ActivityName, visible: _ScreenLanguage == "en", name: "Act_DescE", width: "40.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Act_DescE", " ");
                    txt.id = "h_Act_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_ActivityName, txt);
                }
            },
            {
                title: res.work_UOM, name: "Act_UomCode", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Act_UomCode", " ");
                    txt.id = "h_Act_UomCode"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_UOM, txt);
                }
            },
            {
                title: res.work_SchTarget, name: "DailyProd", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DailyProd", " ");
                    txt.id = "h_DailyProd"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_SchTarget, txt);
                }
            },
            {
                title: res.work_availqty, name: "AvailQty", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "AvailQty", " ");
                    txt.id = "h_AvailQty"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_availqty, txt);
                }
            },            
            {
                title: res.work_Sched, name: "SchedQty", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "SchedQty", " ");
                    txt.id = "h_SchedQty"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.work_Sched, txt);
                }
            },
            {
                title: res.work_finishqty, name: "FinishQty", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "FinishQty", " ");
                    txt.id = "h_FinishQty"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_finishqty, txt);
                }
            },
            {
                title: res.work_activityqty, name: "ActivQty", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ActivQty", " ");
                    txt.id = "h_ActivQty";
                    txt.onkeyup = (e) => {
                        Calculation();
                    }
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_activityqty, txt);
                }
            },
            {
                title: res.work_scqty, visible: false, name: "TotSchedQty", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "TotSchedQty", " ");
                    txt.id = "h_TotSchedQty";
                    txt.onkeyup = (e) => {
                        Calculation();
                    }
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_scqty, txt);
                }
            },
            {
                title: res.work_producedbefore, visible: false, name: "ProdBeforeQty", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ProdBeforeQty", " ");
                    txt.id = "h_ProdBeforeQty";
                    //txt.onkeyup = (e) => {
                    //    Calculation();
                    //}
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_producedbefore, txt);
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
                itemTemplate: (s: string, item: PQ_GetEngWorkSchduleActivity): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.name = DetailsActivity.indexOf(item).toString();
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsActivity.splice(index, 1);
                        BindDataGridActivity();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            }
            ,
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: (s: string, item: PQ_GetEngWorkSchduleActivity): HTMLButtonElement => {

                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.name = DetailsActivity.indexOf(item).toString();
                    btn.onclick = (e) => {
                        debugger
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        debugger
                        DetailsAssignHeaderActivity = new PQ_GetEngWorkSchduleActivity();
                        DetailsAssignHeaderActivity.ItemId = item.ItemId;
                        activityId = item.ActivityID;
                        ScheduleActivId = item.ScheduleActivId;
                        ProjectPhaseItemActivId = item.ProjectPhaseItemActivId;
                        //DetailsAssignHeaderActivity.ActivityID = item.ActivityID;
                        DetailsAssignHeaderActivity.Act_ActivityCode = item.Act_ActivityCode;
                        DetailsAssignHeaderActivity.Act_DescA = item.Act_DescA;
                        DetailsAssignHeaderActivity.Act_DescE = item.Act_DescE;
                        DetailsAssignHeaderActivity.Act_UomCode = item.Act_UomCode;
                        DetailsAssignHeaderActivity.AvailQty = item.AvailQty;
                        DetailsAssignHeaderActivity.SchedQty = item.SchedQty;
                        DetailsAssignHeaderActivity.FinishQty = item.FinishQty;
                        DetailsAssignHeaderActivity.ActivQty = item.ActivQty;
                        DetailsAssignHeaderActivity.TotSchedQty = item.TotSchedQty;
                        DetailsAssignHeaderActivity.ProdBeforeQty = item.ProdBeforeQty;
                        DetailsAssignHeaderActivity.DailyProd = item.DailyProd;

                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsActivity.splice(index, 1);
                        BindDataGridActivity();
                        //ReIndexingGrid();
                        
                        $('#btnFindAtcivity').text(DetailsAssignHeaderActivity.ItemId.toString());
                        DetailsAssignHeaderActivity.ActivityID = activityId;
                        //activityId = DetailsAssignHeaderActivity.ActivityID;
                        FillInputText("h_Act_ActivityCode", DetailsAssignHeaderActivity.Act_ActivityCode);
                        FillInputText("h_Act_DescA", DetailsAssignHeaderActivity.Act_DescA);
                        FillInputText("h_Act_DescE", DetailsAssignHeaderActivity.Act_DescE);
                        FillInputText("h_Act_UomCode", DetailsAssignHeaderActivity.Act_UomCode);
                        FillInputText("h_AvailQty", DetailsAssignHeaderActivity.AvailQty.toString());
                        FillInputText("h_SchedQty", DetailsAssignHeaderActivity.SchedQty.toString());
                        FillInputText("h_FinishQty", DetailsAssignHeaderActivity.FinishQty.toString());
                        FillInputText("h_ActivQty", DetailsAssignHeaderActivity.ActivQty.toString());
                        FillInputText("h_TotSchedQty", DetailsAssignHeaderActivity.TotSchedQty.toString());
                        FillInputText("h_ProdBeforeQty", DetailsAssignHeaderActivity.ProdBeforeQty.toString());
                        FillInputText("h_DailyProd", DetailsAssignHeaderActivity.DailyProd.toString());
                    };
                    return btn;
                }
            }
        ];
        GridActivity.DataSource = DetailsActivity;
        GridActivity.Bind();

        // Grid Labor Classes
        GridLaborClass.ElementName = "GridLaborClass";
        GridLaborClass.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridLaborClass.OnRefreshed = () => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridLaborClass.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridLaborClass.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridLaborClass.InsertionMode = JsGridInsertionMode.Binding;
        GridLaborClass.OnItemInserting = () => { };
        GridLaborClass.OnItemUpdating = () => { };
        GridLaborClass.OnItemDeleting = () => { };
        GridLaborClass.Columns = [
            {
                //Ali**  Reresourse Name
                title: res.Fld_ClassCode, name: "LClass_CalssCode", width: "10%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "LClass_CalssCode", " ");
                    txt.id = "h_LClass_CalssCode"
                    txt.disabled = true;
                    return HeaderTemplate("Fld_ClassCode", txt);
                }
            },
            {
                title: res.work_laborclass, visible: _ScreenLanguage == "ar", name: "LClass_DescA", width: "15.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "LClass_DescA", " ");
                    txt.id = "h_LClass_DescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_laborclass, txt);
                }
            },
            {
                title: res.work_laborclass, visible: _ScreenLanguage == "en", name: "LClass_DescE", width: "15.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "LClass_DescE", " ");
                    txt.id = "h_LClass_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_laborclass, txt);
                }
            },
            {
                title: res.work_laborno, name: "RequiredNo", width: "10%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "RequiredNo", " ");
                    txt.id = "h_RequiredNo"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_laborno, txt);
                }
            }
        ];
        GridLaborClass.DataSource = DetailsLaborClass;
        GridLaborClass.Bind();

        //Grid Equipment Class
        GridEquipClass.ElementName = "GridEquipClasses";
        GridEquipClass.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridEquipClass.OnRefreshed = () => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridEquipClass.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridEquipClass.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridEquipClass.InsertionMode = JsGridInsertionMode.Binding;
        GridEquipClass.OnItemInserting = () => { };
        GridEquipClass.OnItemUpdating = () => { };
        GridEquipClass.OnItemDeleting = () => { };
        GridEquipClass.Columns = [
            {
                //Ali**  Reresourse Name
                title: res.Fld_ClassCode, name: "Class_ClassCode", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Class_ClassCode", " ");
                    txt.id = "h_Class_ClassCode"
                    txt.disabled = true;
                    return HeaderTemplate("Fld_ClassCode", txt);
                }
            },
            {
                title: res.work_classdec, visible: _ScreenLanguage == "ar", name: "Class_DescA", width: "20.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Class_DescA", " ");
                    txt.id = "h_Class_DescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_classdec, txt);
                }
            },
            {
                title: res.work_classdec, visible: _ScreenLanguage == "en", name: "Class_DescE", width: "20.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Class_DescE", " ");
                    txt.id = "h_Class_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_classdec, txt);
                }
            },
            {
                title: res.work_equipno, name: "RequiredNo", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "RequiredNo", " ");
                    txt.id = "h_EquipRequiredNo"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_equipno, txt);
                }
            }
        ];
        GridEquipClass.DataSource = DetailsEquipClass;
        GridEquipClass.Bind();

        //Grid Labors
        GridLabors.ElementName = "GridLabors";
        GridLabors.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridLabors.OnRefreshed = () => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridLabors.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridLabors.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridLabors.InsertionMode = JsGridInsertionMode.Binding;
        GridLabors.OnItemInserting = () => { };
        GridLabors.OnItemUpdating = () => { };
        GridLabors.OnItemDeleting = () => { };
        GridLabors.Columns = [
            {
                title: res.work_labor, name: "Lab_LabCode", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Lab_LabCode", " ");
                    txt.id = "h_Lab_LabCode"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_labor, txt);
                }
            },
            {
                title: res.work_labor_name, visible: _ScreenLanguage == "ar", name: "Lab_DescA", width: "15.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Lab_DescA", " ");
                    txt.id = "h_Lab_DescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_labor_name, txt);
                }
            },
            {
                title: res.work_classdec, visible: _ScreenLanguage == "en", name: "Lab_DescE", width: "15.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Lab_DescE", " ");
                    txt.id = "h_Lab_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_classdec, txt);
                }
            },
            {
                title: res.work_joindate, name: "AssigneDate", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "AssigneDate", " ");
                    txt.id = "h_AssigneDate"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_joindate, txt);
                }
            },
            {
                title: res.work_exp_leave_date, name: "ExpLeaveDate", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ExpLeaveDate", " ");
                    txt.id = "h_ExpLeaveDate"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_exp_leave_date, txt);
                }
            },
            {
                title: res.work_leave_date, name: "LeaveDate", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "LeaveDate", " ");
                    txt.id = "h_LabLeaveDate"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_leave_date, txt);
                }
            },
            {
                title: res.work_Eq_HourCost, name: "HourCost", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "HourCost", " ");
                    txt.id = "h_HourCost"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_Eq_HourCost, txt);
                }
            }
        ];
        GridLabors.DataSource = DetailsLabors;
        GridLabors.Bind();

        //Grid Equipment
        GridEquip.ElementName = "GridEquipment";
        GridEquip.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridEquip.OnRefreshed = () => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridEquip.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridEquip.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridEquip.InsertionMode = JsGridInsertionMode.Binding;
        GridEquip.OnItemInserting = () => { };
        GridEquip.OnItemUpdating = () => { };
        GridEquip.OnItemDeleting = () => { };
        GridEquip.Columns = [
            {
                title: res.work_equipcode, name: "eq_EquipCode", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "eq_EquipCode", " ");
                    txt.id = "h_eq_EquipCode"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_equipcode, txt);
                }
            },
            {
                title: res.work_equipname, visible: _ScreenLanguage == "ar", name: "eq_DescA", width: "30.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "eq_DescA", " ");
                    txt.id = "h_eq_DescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_equipname, txt);
                }
            },
            {
                title: res.work_equipname, visible: _ScreenLanguage == "en", name: "Eq_DescE", width: "30.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Eq_DescE", " ");
                    txt.id = "h_Eq_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_equipname, txt);
                }
            },
            {
                title: res.work_joindate, name: "AssigneDate", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "AssigneDate", " ");
                    txt.id = "h_EquipAssigneDate"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_joindate, txt);
                }
            },
            {
                title: res.work_exp_leave_date, name: "ExpLeaveDate", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ExpLeaveDate", " ");
                    txt.id = "h_EquipExpLeaveDate"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_exp_leave_date, txt);
                }
            },
            {
                title: res.work_leave_date, name: "LeaveDate", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "LeaveDate", " ");
                    txt.id = "h_LeaveDate"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_leave_date, txt);
                }
            },
            {
                title: res.work_Eq_HourCost, name: "Eq_HourCost", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Eq_HourCost", " ");
                    txt.id = "h_Eq_HourCost"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_Eq_HourCost, txt);
                }
            }
        ];
        GridEquip.DataSource = DetailsEquip;
        GridEquip.Bind();

        //Grid Material
        GridMaterial.ElementName = "GridMaterial";
        GridMaterial.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridMaterial.OnRefreshed = () => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridMaterial.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridMaterial.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridMaterial.InsertionMode = JsGridInsertionMode.Binding;
        GridMaterial.OnItemInserting = () => { };
        GridMaterial.OnItemUpdating = () => { };
        GridMaterial.OnItemDeleting = () => { };
        GridMaterial.Columns = [
            {
                title: res.work_Itm_ItemCode, name: "Itm_ItemCode", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Itm_ItemCode", " ");
                    txt.id = "h_Itm_ItemCode"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_Itm_ItemCode, txt);
                }
            },
            {
                title: res.work_Itm_Desc, visible: _ScreenLanguage == "ar", name: "Itm_DescA", width: "40.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Itm_DescA", " ");
                    txt.id = "h_Itm_DescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_Itm_Desc, txt);
                }
            },
            {
                title: res.work_Itm_Desc, visible: _ScreenLanguage == "en", name: "Itm_DescE", width: "40.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Itm_DescE", " ");
                    txt.id = "h_Itm_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_Itm_Desc, txt);
                }
            },
            {
                title: res.work_UOM, visible: _ScreenLanguage == "ar", name: "Uom_DescA", width: "30.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Uom_DescA", " ");
                    txt.id = "h_Uom_DescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_UOM, txt);
                }
            },
            {
                title: res.work_UOM, visible: _ScreenLanguage == "en", name: "Uom_DescE", width: "10.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Uom_DescE", " ");
                    txt.id = "h_Uom_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_UOM, txt);
                }
            },
            {
                title: res.work_PlanQty, name: "SchedQty", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "SchedQty", " ");
                    txt.id = "h_MatSchedQty"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_PlanQty, txt);
                }
            },
            {
                title: res.work_ReqQty, name: "ReqQty", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ReqQty", " ");
                    txt.id = "h_MatReqQty"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_ReqQty, txt);
                }
            },
   
            //{
            //    title: res.work_ReqQty, name: "ReqQty", width: "7.5%",
            //    headerTemplate: (): HTMLElement => {
            //        let txt = CreateElement("label", GridInputClassName, " ", " ", "ReqQty", " ");
            //        txt.id = "h_MatReqQty"
            //        txt.disabled = true;
            //        return HeaderTemplateNew(res.work_ReqQty", txt);
            //    }
            //},
            {
                title: res.work_IssuedQty, name: "IssuedQty", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "IssuedQty", " ");
                    txt.id = "h_IssuedQty"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_IssuedQty, txt);
                }
            },
            {
                title: res.work_ReturnQty, name: "ReturnQty", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ReturnQty", " ");
                    txt.id = "h_ReturnQty"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_ReturnQty, txt);
                }
            },
            {
                title: res.work_BalanceQty, name: "BalanceQty", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "BalanceQty", " ");
                    txt.id = "h_BalanceQty"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_BalanceQty, txt);
                }
            }
        ];
        GridMaterial.DataSource = DetailsMaterial;
        GridMaterial.Bind();
    }

    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById<HTMLInputElement>("txtTrNo");
        txtTrDate = DocumentActions.GetElementById<HTMLInputElement>("txtTrDate");
        txtWorkDescr = DocumentActions.GetElementById<HTMLInputElement>("txtWorkDescr");
        txtPrj_ProjectCode = DocumentActions.GetElementById<HTMLInputElement>("txtPrj_ProjectCode");
        txtPrj_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPrj_DescE");
        txtPhase_CCCode = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_CCCode");
        txtPhase_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_DescE");
        txtRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtRemarks");
        txtCal_calenderCode = DocumentActions.GetElementById<HTMLInputElement>("txtCal_calenderCode");
        txtCal_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtCal_DescE");
        txtStartTime = DocumentActions.GetElementById<HTMLInputElement>("txtStartTime");
        txtStartDateTime = DocumentActions.GetElementById<HTMLInputElement>("txtStartDateTime");
        txtEndTime = DocumentActions.GetElementById<HTMLInputElement>("txtEndTime");
        txtEndDateTime = DocumentActions.GetElementById<HTMLInputElement>("txtEndDateTime");
        txtProdHours = DocumentActions.GetElementById<HTMLInputElement>("txtProdHours");
        txtOTHours = DocumentActions.GetElementById<HTMLInputElement>("txtOTHours");
        txtCalHours = DocumentActions.GetElementById<HTMLInputElement>("txtCalHours");
        txtMaterialReqId = DocumentActions.GetElementById<HTMLInputElement>("txtMaterialReqId");
        txtAssignLaborId = DocumentActions.GetElementById<HTMLInputElement>("txtAssignLaborId");
        txtAssignEquipId = DocumentActions.GetElementById<HTMLInputElement>("txtAssignEquipId");
        ChkStatus = DocumentActions.GetElementById<HTMLInputElement>("ChkStatus");
        ChkClose = DocumentActions.GetElementById<HTMLInputElement>("ChkClose");
        btnSearchSchdule = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchSchdule");
        btnSearchProject = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchProject");
        btnSearchPhase = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchPhase");
        btnSearchCalender = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchCalender");
        btnAuthorize = DocumentActions.GetElementById<HTMLButtonElement>("btnAuthorize");
        btnUnauthorized = DocumentActions.GetElementById<HTMLButtonElement>("btnUnauthorized");
        btnReopen = DocumentActions.GetElementById<HTMLButtonElement>("btnReopen");
        btnFindAtcivity = DocumentActions.GetElementById<HTMLButtonElement>("btnFindAtcivity");
        btnCalcRequirement = DocumentActions.GetElementById<HTMLButtonElement>("btnCalcRequirement");
        btnCalcHours = DocumentActions.GetElementById<HTMLButtonElement>("btnCalcHours");
    }

    function InitalizeEvents() {
        btnSearchProject.onclick = btnSearchProject_Clicked;
        btnSearchPhase.onclick = btnSearchPhase_Clicked;
        btnSearchCalender.onclick = btnSearchCalender_Clicked;
        btnSearchSchdule.onclick = btnSearchSchdule_Clicked;
        btnAuthorize.onclick = btnAuthorize_Clicked;
        btnUnauthorized.onclick = btnUnAuthorize_Clicked;
        btnReopen.onclick = workSchdule_Reopen;
        btnCalcRequirement.onclick = btnRequirements_Clicked;
        btnCalcHours.onclick = btnCalcHours_Clicked;
        txtOTHours.onchange = OTHours_Change;
        txtTrNo.onchange = trNo_onchange;
        txtPrj_ProjectCode.onchange = SearchProject_Changed;
        txtPhase_CCCode.onchange = SearchPhase_Changed;
    }

    function Assign() {
        
        //AssignMaster
        //Master = new P_TR_EngSchedule();
        DocumentActions.AssignToModel<PQ_GetEngWorkSchdule>(Master);
        MasterDetails.P_TR_EngSchedule = Master as PQ_GetEngWorkSchdule;
        MasterDetails.P_TR_EngSchedule.ScheduleId = Master.ScheduleId;
        
        //AssignDetails
        MasterDetails.P_TR_EngScheduleActiv = DetailsActivity as Array<PQ_GetEngWorkSchduleActivity>;
        for (var Act of DetailsActivity) {
            Act.ScheduleId = Master.ScheduleId;
            Tbl_DetailActivity.push(Act);
        }
    }

    function Display() {
        //debugger;
        DocumentActions.RenderFromModel(Master);
        txtTrDate.value = DateFormat(Master.TrDate);
        txtStartDateTime.value = DateFormat(Master.StartDateTime);
        txtEndDateTime.value = DateFormat(Master.EndDateTime);
        txtStartTime.value = TimeFormat(Master.StartDateTime);
        txtEndTime.value = TimeFormat(Master.EndDateTime);
        getActivities(Master.ScheduleId);
        getLabors(Master.ScheduleId);
        getLaborClasses(Master.ScheduleId);
        getEquipment(Master.ScheduleId);
        getEquipmentClasses(Master.ScheduleId);
        getMaterial(Master.ScheduleId);
        CalenderId = Master.CalenderId;
        ProjectPhaseId = Master.ProjectPhaseId;
        ProjectID = Master.ProjectID;
        if (Master.Status == 0) {
            ChkClose.checked = false;
            ChkStatus.checked = false;
        } else if (Master.Status == 1) {
            ChkClose.checked = false;
            ChkStatus.checked = true;
        } else if (Master.Status == 2) {
            ChkClose.checked = true;
            ChkStatus.checked = true;
        }
        //debugger;
        $("#btnUnauthorized").css('cursor', 'no-drop');
        $("#ChkStatus").attr("disabled", "disabled");
        $("#ChkClose").attr("disabled", "disabled");
        $("#btnReopen").css('cursor', 'no-drop');
        $("#btnReopen").css('backgroundColor', '#0B6D8A');
        $('#btnAuthorize').attr('disabled', 'disabled'); 
        if (Master.Status == 1) {
            ControlsButtons.EditButton.disabled = true;
            $('#btnAuthorize').attr('disabled', 'disabled');
            if (SharedSession.CurrentPrivileges.CUSTOM2 == true) {
                $('#btnUnauthorized').removeAttr('disabled');
                $("#btnUnauthorized").css('cursor', 'pointer');
                $("#btnUnauthorized").css('backgroundColor', 'red');
            }
            else {
                $('#btnUnauthorized').attr('disabled', 'disabled');
                $("#btnUnauthorized").css('backgroundColor', '#0B6D8A');
                

            }
        }
        if (Master.Status == 2) {
            ControlsButtons.EditButton.disabled = true;
            $('#btnAuthorize').attr('disabled', 'disabled');            
            $('#btnUnauthorized').attr('disabled', 'disabled');
            $("#btnUnauthorized").css('backgroundColor', '#0B6D8A');
            if (SharedSession.CurrentPrivileges.CUSTOM3 == true) {
                $('#btnReopen').removeAttr('disabled');
                $("#btnReopen").css('cursor', 'pointer');
                $("#btnReopen").css('backgroundColor', 'red');
            }
            else {
                $('#btnReopen').attr('disabled', 'disabled');   
                $("#btnReopen").css('backgroundColor', '#0B6D8A');
            }
        }
        if (Master.Status == 0) {
            $('#btnUnauthorized').attr('disabled', 'disabled');
            $("#btnUnauthorized").css('backgroundColor', '#0B6D8A');
            $('#btnAuthorize').attr('disabled', 'disabled');
            ControlsButtons.EditButton.disabled = !SharedSession.CurrentPrivileges.EDIT;
            
        }
    }

    function FillInputText(_TextID: string, _Data: string) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }

    function BindDataGridActivity() {
        GridActivity.DataSource = DetailsActivity;
        GridActivity.Bind();
    }

    function BindDataGridLaborClass() {
        GridLaborClass.DataSource = DetailsLaborClass;
        GridLaborClass.Bind();
    }

    function BindDataGridEquipClass() {
        GridEquipClass.DataSource = DetailsEquipClass;
        GridEquipClass.Bind();
    }

    function BindDataGridLabors() {
        GridLabors.DataSource = DetailsLabors;
        GridLabors.Bind();
    }

    function BindDataGridEquip() {
        GridEquip.DataSource = DetailsEquip;
        GridEquip.Bind();
    }

    function Navigate() {
        
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {
                
                Master = d.result as PQ_GetEngWorkSchdule;
                Display();
            }
        })
    }

    function Add() {
        debugger;
        ChkStatus.checked = false;
        ChkClose.checked = false;
        txtAssignLaborId.value = "";
        txtAssignEquipId.value = "";
        txtMaterialReqId.value = "";
        txtOTHours.value = "0"; 
        txtCalHours.value = "0"
        txtProdHours.value ="0"
        let currentDt = new Date();
        let NextDt = new Date();
        //Ali**
        //btnAuthorize.disabled = true;
        //btnUnauthorized.disabled = true;
        
        $('#btnCalcRequirement').attr('disabled', 'disabled');
        //$("ChkClose").prop("disabled", true);
        //$("ChkStatus").prop("disabled", true);
        //$("btnAuthorize").prop("disabled", true);
        $("#btnUnauthorized").attr("disabled", "disabled");
        $("#btnUnauthorized").css('backgroundColor', '#0B6D8A');
        //$('#btnAuthorize').attr('disabled', 'disabled');
        $("#ChkClose").attr("disabled", "disabled");
        $("#ChkStatus").attr("disabled", "disabled");
        //Ali/>
        txtTrDate.value = DateFormat(new Date(currentDt.setDate(NextDt.getDate() + 1)).toString());
        NewData();
    }
    function NewData(){
        ClearGrid(GridActivity, DetailsActivity = new Array<PQ_GetEngWorkSchduleActivity>());
        ClearGrid(GridEquip, new Array<number>());
        ClearGrid(GridEquipClass, new Array<number>());
        ClearGrid(GridLaborClass, new Array<number>());
        ClearGrid(GridLabors, new Array<number>());
        ClearGrid(GridMaterial, new Array<number>());
    }
    function Insert() {
        debugger;
        btnCalcHours_Clicked();
        Assign();
        if (CheckDate(Number(_CompCode), Number(_BranchCode), txtTrDate.value) == false) {
            WorningMessage("غير مسموح بهذا التاريخ", "This Date is not allowed");
            return;
        }
        var session: SessionRecord = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        Master.Status = 0;
        MasterDetails.P_TR_EngSchedule.Status = 0;
        MasterDetails.P_TR_EngSchedule.RequestEquipmentId = null;
        MasterDetails.P_TR_EngSchedule.RequestLabourId = null;
        MasterDetails.P_TR_EngSchedule.RequestMaterialId = null;
        Master.RequestEquipmentId = null;
        Master.RequestLabourId = null; 
        Master.RequestMaterialId = null;
        MasterDetails.P_TR_EngSchedule.ProjectID = ProjectID;
        MasterDetails.P_TR_EngSchedule.ProjectPhaseId = ProjectPhaseId;
        MasterDetails.P_TR_EngSchedule.CalenderId = CalenderId;
        MasterDetails.P_TR_EngSchedule.StartDateTime = txtStartDateTime.value + " " + txtStartTime.value;
        MasterDetails.P_TR_EngSchedule.EndDateTime = txtEndDateTime.value + " " + txtEndTime.value;
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BranchCode);
        MasterDetails.P_TR_EngSchedule.CompCode = Number(_CompCode);
        MasterDetails.P_TR_EngSchedule.BraCode = Number(_BranchCode);
        MasterDetails.P_TR_EngSchedule.CreatedAt = DateFormat((new Date()).toString());
        MasterDetails.P_TR_EngSchedule.CreatedBy = SharedSession.CurrentEnvironment.UserCode;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_Tr_EngSchedule", "InsertMasterDetail"),
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
                    MessageBox.Show(msg, "Insert", () => {
                        debugger;
                        let _Index = GetIndexByUseId(result.Response, "PQ_GetEngWorkSchdule", "ScheduleId", " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);

                    });
                }
                else {
                    MessageBox.Show(result.Response, "Insert");
                }
            }
        });

        //Ajax.CallAsync({
        //    url: Url.Action("Insert", ControllerName),
        //    data: { JsonData: JSON.stringify(MasterDetails) },
        //    success: (d) => {
                
        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            ClientSharedWork.SwitchModes(ScreenModes.Query);
        //            let msg: string = ReturnMsg("تم الحفظ  ", "Data Saved Successfully");
        //            MessageBox.Show(msg, "Insert", () => {
                        
        //                //Display();
        //                let _Index = GetIndexByUseId(result.ResponseData, "PQ_GetEngWorkSchdule", "ScheduleId", " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
        //                NavigateToSearchResultKey(Number(_Index), Navigate)
        //            });
        //        }
        //        else
        //            MessageBox.Show(result.ResponseMessage, "Insert");
        //    }
        //});
    }

    function Edit() {
        ChkStatus.disabled = !SharedSession.CurrentPrivileges.CUSTOM1
        
        //$('#btnAuthorize').removeAttr('disabled');
        //$('#btnAuthorize').addClass('editable');
        $('#btnCalcRequirement').removeAttr('disabled');
        $('#btnCalcRequirement').addClass('editable');
        ChkClose.disabled = true;

    }

    function Update() {
        debugger;
        btnCalcHours_Clicked();
        Assign();
        if (CheckDate(Number(_CompCode), Number(_BranchCode), txtTrDate.value) == false) {
            WorningMessage("غير مسموح بهذا التاريخ", "This Date is not allowed");
            return;
        }
        if (ChkStatus.checked == true) {
            if (ChkClose.checked == true) {
                Master.Status = 2;
                MasterDetails.P_TR_EngSchedule.Status = 2;
            }
            else {
                Master.Status = 1;
                MasterDetails.P_TR_EngSchedule.Status = 1;
            }
        } else {
            Master.Status = 0;
            MasterDetails.P_TR_EngSchedule.Status = 0;
        }
        var session: SessionRecord = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        MasterDetails.P_TR_EngSchedule.StartDateTime = txtStartDateTime.value + " " + txtStartTime.value;
        MasterDetails.P_TR_EngSchedule.EndDateTime = txtEndDateTime.value + " " + txtEndTime.value;
        Master.CompCode = Number(_CompCode);
        MasterDetails.P_TR_EngSchedule.UpdatedAt = DateFormat((new Date()).toString());
        MasterDetails.P_TR_EngSchedule.UpdatedBy = SharedSession.CurrentEnvironment.UserCode;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_EngSchedule", "UpdateMasterDetail"),
            data: JSON.stringify(MasterDetails),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: (d) => {
                debugger;
                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    if (ClientSharedWork.CurrentMode == ScreenModes.Edit) {

                        let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                        MessageBox.Show(msg, "Update", () => { });
                        ClientSharedWork.SwitchModes(ScreenModes.Query);
                    }
                        debugger;
                        let _Index = GetIndexByUseId(result.Response, "PQ_GetEngWorkSchdule", "ScheduleId", " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);                        
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                       
                    //});
                }
                else 
                    MessageBox.Show(result.Response, "Insert");
            }
        });
        //Ajax.Callsync({
        //    url: Url.Action("Update", ControllerName),
        //    data: { JsonData: JSON.stringify(MasterDetails) },
        //    success: (d) => {
        //        debugger;
        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            ClientSharedWork.SwitchModes(ScreenModes.Query);
        //            let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
        //            MessageBox.Show(msg, "Insert", () => {
                        
        //                Display();
        //                let _Index = GetIndexByUseId(result.ResponseData, "PQ_GetEngWorkSchdule", "ScheduleId", " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
        //                NavigateToSearchResultKey(Number(_Index), Navigate);
        //            });
        //        }
        //    }
        //})
    }

    function Undo() {

    }

    function PWorkSchedule() {
        
        Ajax.CallAsync({
            url: Url.Action("printWorkSchedule", "PrintTransaction"),
            data: { TrNo: Number(Master.ScheduleId) },
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });
    }

    function AddItemInActivityGrid() {
        if ($('#h_Act_ActivityCode').val() == "" || $('#h_Act_ActivityCode').val() == " ") {
            return;
        }
        if ($("#h_SchedQty").val() == "" || $("#h_SchedQty").val() <= 0) {
            WorningMessage("يجب ادخال الكمية المراد انجازها", "Please Enter Schdule Qty");
            return;
        }

        for (var itm of DetailsActivity) {
            if (itm.ProjectPhaseItemActivId == ProjectPhaseItemActivId) {
                WorningMessage("لا يمكن تكرار النشاط", "Activity is already Selected");
                return;
            }
        }

        if (Number($('#h_SchedQty').val()) > Number($('#h_AvailQty').val())) {
            WorningMessage("الكمية المراد انجازها لا تتخطى الكمية المتاحة", "Schdule Qty Must Be Smaller Than Or Equal Available Qty");
            return;
        }
        DetailsAssignHeaderActivity = new PQ_GetEngWorkSchduleActivity();
        DetailsAssignHeaderActivity.ActivityID = activityId;
        DetailsAssignHeaderActivity.ItemId = itemId;
        DetailsAssignHeaderActivity.ScheduleActivId = ScheduleActivId;
        DetailsAssignHeaderActivity.ProjectPhaseItemActivId = ProjectPhaseItemActivId;
        DetailsAssignHeaderActivity.Act_ActivityCode = $('#h_Act_ActivityCode').val();
        DetailsAssignHeaderActivity.Act_DescA = $('#h_Act_DescA').val();
        DetailsAssignHeaderActivity.Act_DescE = $('#h_Act_DescE').val();
        DetailsAssignHeaderActivity.Act_UomCode = $('#h_Act_UomCode').val();
        DetailsAssignHeaderActivity.AvailQty = Number($('#h_AvailQty').val());
        DetailsAssignHeaderActivity.SchedQty = Number($('#h_SchedQty').val());
        DetailsAssignHeaderActivity.FinishQty = Number($('#h_FinishQty').val());
        DetailsAssignHeaderActivity.ActivQty = Number($('#h_ActivQty').val());
        DetailsAssignHeaderActivity.TotSchedQty = Number($('#h_TotSchedQty').val());
        //DetailsAssignHeaderActivity.TotSchedQty = Number($('#h_TotSchedQty').val());
        DetailsAssignHeaderActivity.ProdBeforeQty = Number($('#h_ProdBeforeQty').val());
        DetailsAssignHeaderActivity.DailyProd = Number($('#h_DailyProd').val());
        DetailsActivity.unshift(DetailsAssignHeaderActivity);
        BindDataGridActivity();
        ScheduleActivId = 0;
    }

    function btnFindAtcivity_onclick() {
        
        if (isNaN(ProjectPhaseId)) {
            WorningMessage("يجب اختيار مرحلة المشروع", "You Should Choose Project Phase First");
            return;
        }
        sys.FindKey(Modules.WorkSchedule, "btnFindAtcivity", "ProjectPhaseId = " + ProjectPhaseId +
            " and AvaL_Qty > 0", () => {
            
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getActivity", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    let result = d.result as PQ_GetEngProjectActivity;
                    //$('#btnFindAtcivity').text(result.ItemID);
                    itemId = result.ItemID;
                    activityId = result.ActivityID;
                                            
                    ProjectPhaseItemActivId = result.ProjectPhaseItemActivId;
                    $('#h_ActivityID').val(result.ActivityID);
                    $('#h_FinishQty').val(0);
                    $('#h_Act_ActivityCode').val(result.act_ActivityCode);
                    $('#h_Act_DescA').val(result.act_DescA);
                    $('#h_Act_DescE').val(result.act_DescE);
                    $('#h_Act_UomCode').val(result.UOM_UomCode);

                    $('#h_ActivQty').val(result.ActivQty);
                    $('#h_TotSchedQty').val(result.SchedQty + result.SCon_Qty);
                    $('#h_ProdBeforeQty').val(result.TotalProdQty);
                    $('#h_DailyProd').val(result.DailyProd);
                    $('#h_AvailQty').val(result.ActivQty - (result.SchedQty + result.SCon_Qty + result.TotalProdQty));
                }
            });
        });
    }

    function btnSearchSchdule_Clicked() {
        
        sys.FindKey(Modules.WorkSchedule, "btnSearchSchdule", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getEngSchedule", ControllerName),
                data: { id: id },
                success: (d) => {
                    MasterDetails = d.result as M_D_WorkSchdule;
                    Master = d.result as PQ_GetEngWorkSchdule;
                    let Index = GetIndexByUseId(Number(Master.ScheduleId), "PQ_GetEngWorkSchdule", "ScheduleId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }
    function trNo_onchange() {
        var trno: number;
        trno = Number(txtTrNo.value);
        
        Ajax.CallAsync({
            url: Url.Action("getEngScheduleViewByNo", 'FindByNo'),
            data: { trno: trno },
            success: (d) => {
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");

                }
                MasterDetails = d.result as M_D_WorkSchdule;
                Master = d.result as PQ_GetEngWorkSchdule;
                let Index = GetIndexByUseId(Number(Master.ScheduleId), "PQ_GetEngWorkSchdule", "ScheduleId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                NavigateToSearchResultKey(Number(Index), Navigate);
            }
        });
    }
    function btnSearchProject_Clicked() {
        
        sys.FindKey(Modules.WorkSchedule, "btnSearchProject", "CompCode= " + _CompCode + " and BraCode = " + _BranchCode + " and Status = 1", () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getProject", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    let result = d.result as P_TR_EngProject;
                    ProjectID = result.ProjectID;
                    txtPrj_ProjectCode.value = result.ProjectCode;
                    txtPrj_DescE.value = result.DescL;


                    ProjectPhaseId = null;
                    txtPhase_CCCode.value = "";
                    txtPhase_DescE.value = "";
                }
            });
        });
    }
    function SearchProject_Changed() {

        var Pno = Number(txtPrj_ProjectCode.value);
       
            Ajax.CallAsync({
                url: Url.Action("getProjectTableByno", "FindByNo"),
                data: { Pno: Pno },
                success: (d) => {
                    if (IsNullOrEmpty(d.result)) {
                        
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");

                    }
                    let result = d.result as P_TR_EngProject;
                    ProjectID = result[0].ProjectID;
                    txtPrj_ProjectCode.value = result[0].ProjectCode;
                    txtPrj_DescE.value = result[0].DescL;

                    ProjectPhaseId = null;          
                    txtPhase_CCCode.value = "";
                    txtPhase_DescE.value = "";
                }
            });
        
    }

    function btnSearchPhase_Clicked() {
        if (isNaN(ProjectID)) {
            WorningMessage("يجب اختيار المشروع", "You Should Choose Project  First");
            return;
        }
        sys.FindKey(Modules.WorkSchedule, "btnSearchPhase", "ProjectID =" + ProjectID + " and Status = 1", () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getProjectPhase", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    let result = d.result as P_TR_EngProjectPhase;
                    ProjectPhaseId = result.ProjectPhaseId;
                    CalenderId = result.CalenderId;
                    
                    GetCalendar(CalenderId);
                    let currentDt = new Date();
                    let NextDt = new Date();
                    txtStartDateTime.value = DateFormat(new Date(currentDt.setDate(NextDt.getDate() + 1)).toString());
                    txtEndDateTime.value = DateFormat(new Date(currentDt.setDate(NextDt.getDate() + 1)).toString());

                    txtPhase_CCCode.value = result.ProjectPhaseCode;
                    txtPhase_DescE.value = result.DescL;
                    NewData();
                }
            });
        });
    }
    function SearchPhase_Changed() {
        if (isNaN(ProjectID)) {
            WorningMessage("يجب اختيار المشروع", "You Should Choose Project  First");
            return;
        }
        var PhaseNo = txtPhase_CCCode.value;
            Ajax.CallAsync({
                url: Url.Action("getProjectPhasetableByno", "FindByNo"),
                data: { ProjectId: ProjectID, PhaseNo: PhaseNo },
                success: (d) => {
                    if (IsNullOrEmpty(d.result)) {
                        ProjectPhaseId = 0;
                        CalenderId = 0;
                        txtCal_calenderCode.value = "";
                        txtCal_DescE.value = "";
                        txtMaterialReqId.value = "";
                        let currentDt = new Date();
                        let NextDt = new Date();
                        txtStartDateTime.value = "";
                        txtEndDateTime.value = "";
                        txtStartTime.value = "";
                        txtEndTime.value = "";
                        txtPhase_CCCode.value = "";
                        txtPhase_DescE.value = "";
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        return;

                    }
                    let result = d.result as P_TR_EngProjectPhase;
                    ProjectPhaseId = result[0].ProjectPhaseId;
                    CalenderId = result[0].CalenderId;

                    GetCalendar(CalenderId);
                    let currentDt = new Date();
                    let NextDt = new Date();
                    txtStartDateTime.value = DateFormat(new Date(currentDt.setDate(NextDt.getDate() + 1)).toString());
                    txtEndDateTime.value = DateFormat(new Date(currentDt.setDate(NextDt.getDate() + 1)).toString());

                    txtPhase_CCCode.value = result[0].ProjectPhaseCode;
                    txtPhase_DescE.value = result[0].DescL;
                    NewData();
                }
            });
      
    }
    function btnSearchCalender_Clicked() {
        
        sys.FindKey(Modules.WorkSchedule, "btnSearchCalender", "", () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getProjectCalender", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    let result = d.result as P_D_Calender;
                    CalenderId = result.CalenderID;
                    txtCal_calenderCode.value = result.Calendercode;
                    txtCal_DescE.value = result.DescE;
                }
            });
        });
    }

    function getLabors(id: number) {
        
        Ajax.CallAsync({
            url: Url.Action("getLabors", ControllerName),
            data: { id: id },
            success: (d) => {
                
                DetailsLabors = d.result as Array<PQ_GetEngWorkSchduleLabor>;
                for (var i = 0; i < DetailsLabors.length; i++) {
                    DetailsLabors[i].AssigneDate = DateFormat(DetailsLabors[i].AssigneDate);
                    DetailsLabors[i].ExpLeaveDate = DateFormat(DetailsLabors[i].ExpLeaveDate);
                    DetailsLabors[i].LeaveDate = DateFormat(DetailsLabors[i].LeaveDate);
                }
                GridLabors.DataSource = DetailsLabors;
                GridLabors.Bind();
            }
        });
    }

    function getLaborClasses(id: number) {
        
        Ajax.CallAsync({
            url: Url.Action("getLaborClasses", ControllerName),
            data: { id: id },
            success: (d) => {
                
                DetailsLaborClass = d.result as Array<PQ_GetEngWorkSchduleLaborClass>;
                GridLaborClass.DataSource = DetailsLaborClass;
                GridLaborClass.Bind();
            }
        });
    }

    function getEquipment(id: number) {
        
        Ajax.CallAsync({
            url: Url.Action("getEquipment", ControllerName),
            data: { id: id },
            success: (d) => {
                
                DetailsEquip = d.result as Array<PQ_GetEngWorkSchduleEquip>;
                for (var i = 0; i < DetailsEquip.length; i++) {
                    DetailsEquip[i].AssigneDate = DateFormat(DetailsEquip[i].AssigneDate);
                    DetailsEquip[i].ExpLeaveDate = DateFormat(DetailsEquip[i].ExpLeaveDate);
                    DetailsEquip[i].LeaveDate = DateFormat(DetailsEquip[i].LeaveDate);
                }
                GridEquip.DataSource = DetailsEquip;
                GridEquip.Bind();
            }
        });
    }

    function getEquipmentClasses(id: number) {
        
        Ajax.CallAsync({
            url: Url.Action("getEquipmentClasses", ControllerName),
            data: { id: id },
            success: (d) => {
                
                DetailsEquipClass = d.result as Array<PQ_GetEngWorkSchduleEquipClass>;
                GridEquipClass.DataSource = DetailsEquipClass;
                GridEquipClass.Bind();
            }
        });
    }

    function getMaterial(id: number) {
        
        Ajax.CallAsync({
            url: Url.Action("getMaterial", ControllerName),
            data: { id: id },
            success: (d) => {
                
                DetailsMaterial = d.result as Array<PQ_GetEngWorkSchduleMaterial>;
                GridMaterial.DataSource = DetailsMaterial;
                GridMaterial.Bind();
            }
        });
    }

    function getActivities(id: number) {
        
        Ajax.CallAsync({
            url: Url.Action("getActivities", ControllerName),
            data: { id: id },
            success: (d) => {
                
                DetailsActivity = d.result as Array<PQ_GetEngWorkSchduleActivity>;
                GridActivity.DataSource = DetailsActivity;
                GridActivity.Bind();
            }
        });
    }

    function Calculation(): number {
        let result = Number($('#h_ActivQty').val())
            - Number($('#h_TotSchedQty').val()) - Number($('#h_ProdBeforeQty').val());
        //$('#h_AvailQty').val(result);
        return result;
    }

    function btnAuthorize_Clicked() {
        debugger;
        ChkStatus.checked = true;
        $("#btnAuthorize").attr("disabled", "disabled");
        run_waitMe();
         
        //Update();
        btnRequirements_Clicked();
       
        workSchdule_Authorize(Master.ScheduleId);
        
        ClientSharedWork.SwitchModes(ScreenModes.Query);
        let _Index = GetIndexByUseId(Master.ScheduleId, "PQ_GetEngWorkSchdule", "ScheduleId", " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
        NavigateToSearchResultKey(Number(_Index), Navigate);
    }

    function workSchdule_Authorize(id: number) {
        
        //Assign();
        Ajax.Callsync({
            url: Url.Action("workSchdule_Authorize", ControllerName),
            data: { _Id: id },
            success: (d) => {
                
                //Display();
            }
        })
        //Display();
    }
    function workSchdule_Reopen() {
         
         workSchdule_open(Master.ScheduleId);
        let _Index = GetIndexByUseId(Master.ScheduleId, "PQ_GetEngWorkSchdule", "ScheduleId", " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
        NavigateToSearchResultKey(Number(_Index), Navigate);
    }
    function workSchdule_open(id: number) {
        
         
        Ajax.Callsync({
            url: Url.Action("workSchdule_Reopen", ControllerName),
            data: { _Id: id },
            success: (d) => {

                //alert(d);
            }
        })
 
    }
    function btnUnAuthorize_Clicked() {
        debugger;
        MessageBox.Ask("Free Resources attached and Not Produced activities. Prevent any additional operation over the Schedule", "Work Schedule Close Worning .. ", () => {

            $("#btnUnauthorized").attr("disabled", "disabled");
            $("#btnUnauthorized").css('backgroundColor', '#0B6D8A');
            
            ChkClose.checked = true;
            Update();
        });
        



        //workSchdule_UnAuthorize(Master.ScheduleId);
        ////ClientSharedWork.SwitchModes(ScreenModes.Query);
        //let _Index = GetIndexByUseId(Master.ScheduleId, "PQ_GetEngWorkSchdule", "ScheduleId", " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
        //NavigateToSearchResultKey(Number(_Index), Navigate);
    }

    function workSchdule_UnAuthorize(id: number) {
        debugger
        //Assign();
        Ajax.Callsync({
            url: Url.Action("workSchdule_UnAuthorize", ControllerName),
            data: { _Id: id },
            success: (d) => {
                
                //Display();
            }
        })
       Display();
    }

    function btnRequirements_Clicked() {
        debugger;
        btnCalcHours_Clicked();
        if (txtProdHours.value == "0") {
            WorningMessage("ساعات الانتاج يجب ان تزيد عن الصفر", "Production hours must exceed zero");
            return;
        }
        Update();
        
        workSchdule_Requirements(Master.ScheduleId);
        
        ClientSharedWork.SwitchModes(ScreenModes.Query);
        let _Index = GetIndexByUseId(Master.ScheduleId, "PQ_GetEngWorkSchdule", "ScheduleId", " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
        NavigateToSearchResultKey(Number(_Index), Navigate);
    }

    function workSchdule_Requirements(id: number) {
        debugger
        Ajax.Callsync({
            url: Url.Action("workSchdule_Requirements", ControllerName),
            data: { _Id: id },
            success: (d) => {
                
                // Display();
            }
        })
        //Display();
    }

    function btnCalcHours_Clicked() {
        debugger;
        let frm: string = txtStartDateTime.value + " " + txtStartTime.value;
        let todate: string = txtEndDateTime.value + " " + txtEndTime.value;
        let clcid: string = CalenderId.toString(); //Master.CalenderId.toString(); //currentCalId.toString();
        Ajax.Callsync({
            url: Url.Action("GetHourProd", ControllerName),
            data: { from: frm, to: todate, calcId: clcid },
            success: (d) => {
                debugger;
                let result = d.result as string;
                txtCalHours.value = result; 
                txtProdHours.value = (Number(txtCalHours.value) + Number( txtOTHours.value)).toFixed(2) ;
                
            }
        });
    }
    function OTHours_Change() {
        txtProdHours.value = (Number(txtCalHours.value) + Number(txtOTHours.value)).toFixed(2);
    }
    function GetCalendar(id: number) {
        
        Ajax.CallAsync({
            url: Url.Action("getProjectCalender", ControllerName),
            data: { id: id },
            success: (d) => {
                
                let result = d.result as P_D_Calender;
                txtCal_calenderCode.value = result.Calendercode;
                txtCal_DescE.value = result.DescE;
                txtStartTime.value = TimeFormat(result.StartTime);
                txtEndTime.value = TimeFormat(result.EndTime);
            }
        });
    }
}