$(document).ready(function () {
    WorkSchedule.InitalizeComponent();
});
var WorkSchedule;
(function (WorkSchedule) {
    var ControllerName = "WorkSchedule";
    var GridInputClassName = "form-control gridIput";
    var columnWidth = "100px";
    var NumberColumnWidth = "50px";
    var sys = new SystemTools();
    var GridActivity = new JsGrid();
    var GridLaborClass = new JsGrid();
    var GridEquipClass = new JsGrid();
    var GridLabors = new JsGrid();
    var GridEquip = new JsGrid();
    var GridMaterial = new JsGrid();
    var _ScreenLanguage;
    var _CompCode;
    var _BranchCode;
    var ProjectID;
    var ProjectPhaseId;
    var CalenderId;
    var currentCalId;
    var activityId;
    var itemId;
    var ProjectPhaseItemActivId;
    var ScheduleActivId;
    var M_D_WorkSchdule = /** @class */ (function () {
        function M_D_WorkSchdule() {
            this.sessionRecord = new SessionRecord();
            this.P_TR_EngSchedule = new P_TR_EngSchedule();
        }
        return M_D_WorkSchdule;
    }());
    var MasterDetails = new M_D_WorkSchdule();
    //var Master: P_TR_EngSchedule = new P_TR_EngSchedule();
    var Master = new PQ_GetEngWorkSchdule();
    var ActivityDataSource = new Array();
    var DetailsActivity = new Array();
    var DetailsAssignHeaderActivity = new PQ_GetEngWorkSchduleActivity();
    var Tbl_DetailActivity = new Array();
    var Tbl_DetailActivityobj = new P_TR_EngScheduleActiv();
    var DetailsLaborClass = new Array();
    var DetailsEquipClass = new Array();
    var DetailsLabors = new Array();
    var DetailsEquip = new Array();
    var DetailsMaterial = new Array();
    var txtTrNo;
    var txtTrDate;
    var txtWorkDescr;
    var txtPrj_ProjectCode;
    var txtPrj_DescE;
    var txtPhase_CCCode;
    var txtPhase_DescE;
    var txtRemarks;
    var txtCal_calenderCode;
    var txtCal_DescE;
    var txtStartTime;
    var txtStartDateTime;
    var txtEndTime;
    var txtEndDateTime;
    var txtProdHours;
    var txtCalHours;
    var txtOTHours;
    var txtMaterialReqId;
    var txtAssignLaborId;
    var txtAssignEquipId;
    var ChkStatus;
    var ChkClose;
    var btnSearchSchdule;
    var btnSearchProject;
    var btnSearchPhase;
    var btnSearchCalender;
    var btnAuthorize;
    var btnUnauthorized;
    var btnReopen;
    var btnFindAtcivity;
    var btnCalcRequirement;
    var btnCalcHours;
    function InitalizeComponent() {
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
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.DeleteAction(function () { });
        ControlsButtons.UndoAction(Undo);
        ControlsButtons.PrintAction(function () { PWorkSchedule(); });
        InitalizeGrid();
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.WorkSchedule, Master.ScheduleId.toString());
        });
        btnAuthorize.hidden = true;
        ScheduleActivId = 0;
    }
    WorkSchedule.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        // Grid Activity
        var res = GetResourceList("work_");
        GridActivity.ElementName = "GridActivity";
        GridActivity.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridActivity.OnRefreshed = function () {
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
        GridActivity.OnItemInserting = function () { };
        GridActivity.OnItemUpdating = function () { };
        GridActivity.OnItemDeleting = function () { };
        GridActivity.Columns = [
            {
                title: res.work_item, name: "", width: columnWidth, css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var btnFindAtcivity = DocumentActions.CreateElement("button");
                    btnFindAtcivity = DocumentActions.CreateElement("button");
                    btnFindAtcivity.className = "btn btn-primary btn-block addable editable";
                    btnFindAtcivity.innerText = _ScreenLanguage == "ar" ? "الانشطة" : "Activity";
                    btnFindAtcivity.id = "btnFindAtcivity";
                    btnFindAtcivity.type = "button";
                    btnFindAtcivity.onclick = function (e) {
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
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ActivityID", " ");
                    txt.id = "h_ActivityID";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_ActCode, txt);
                }
            },
            {
                title: res.work_ActCode, name: "Act_ActivityCode", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Act_ActivityCode", " ");
                    txt.id = "h_Act_ActivityCode";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_ActCode, txt);
                }
            },
            {
                title: res.work_ActivityName, visible: _ScreenLanguage == "ar", name: "Act_DescA", width: "40.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Act_DescA", " ");
                    txt.id = "h_Act_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_ActivityName, txt);
                }
            },
            {
                title: res.work_ActivityName, visible: _ScreenLanguage == "en", name: "Act_DescE", width: "40.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Act_DescE", " ");
                    txt.id = "h_Act_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_ActivityName, txt);
                }
            },
            {
                title: res.work_UOM, name: "Act_UomCode", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Act_UomCode", " ");
                    txt.id = "h_Act_UomCode";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_UOM, txt);
                }
            },
            {
                title: res.work_SchTarget, name: "DailyProd", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DailyProd", " ");
                    txt.id = "h_DailyProd";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_SchTarget, txt);
                }
            },
            {
                title: res.work_availqty, name: "AvailQty", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "AvailQty", " ");
                    txt.id = "h_AvailQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_availqty, txt);
                }
            },
            {
                title: res.work_Sched, name: "SchedQty", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "SchedQty", " ");
                    txt.id = "h_SchedQty";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.work_Sched, txt);
                }
            },
            {
                title: res.work_finishqty, name: "FinishQty", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "FinishQty", " ");
                    txt.id = "h_FinishQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_finishqty, txt);
                }
            },
            {
                title: res.work_activityqty, name: "ActivQty", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ActivQty", " ");
                    txt.id = "h_ActivQty";
                    txt.onkeyup = function (e) {
                        Calculation();
                    };
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_activityqty, txt);
                }
            },
            {
                title: res.work_scqty, visible: false, name: "TotSchedQty", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "TotSchedQty", " ");
                    txt.id = "h_TotSchedQty";
                    txt.onkeyup = function (e) {
                        Calculation();
                    };
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_scqty, txt);
                }
            },
            {
                title: res.work_producedbefore, visible: false, name: "ProdBeforeQty", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ProdBeforeQty", " ");
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
                headerTemplate: function () {
                    var btn = DocumentActions.CreateElement("button");
                    btn.className = TransparentButton;
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemActivityGrid";
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddItemInActivityGrid();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.name = DetailsActivity.indexOf(item).toString();
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        var index = Number(e.currentTarget.name);
                        DetailsActivity.splice(index, 1);
                        BindDataGridActivity();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.name = DetailsActivity.indexOf(item).toString();
                    btn.onclick = function (e) {
                        debugger;
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        debugger;
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
                        var index = Number(e.currentTarget.name);
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
        GridLaborClass.OnRefreshed = function () {
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
        GridLaborClass.OnItemInserting = function () { };
        GridLaborClass.OnItemUpdating = function () { };
        GridLaborClass.OnItemDeleting = function () { };
        GridLaborClass.Columns = [
            {
                //Ali**  Reresourse Name
                title: res.Fld_ClassCode, name: "LClass_CalssCode", width: "10%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "LClass_CalssCode", " ");
                    txt.id = "h_LClass_CalssCode";
                    txt.disabled = true;
                    return HeaderTemplate("Fld_ClassCode", txt);
                }
            },
            {
                title: res.work_laborclass, visible: _ScreenLanguage == "ar", name: "LClass_DescA", width: "15.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "LClass_DescA", " ");
                    txt.id = "h_LClass_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_laborclass, txt);
                }
            },
            {
                title: res.work_laborclass, visible: _ScreenLanguage == "en", name: "LClass_DescE", width: "15.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "LClass_DescE", " ");
                    txt.id = "h_LClass_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_laborclass, txt);
                }
            },
            {
                title: res.work_laborno, name: "RequiredNo", width: "10%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "RequiredNo", " ");
                    txt.id = "h_RequiredNo";
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
        GridEquipClass.OnRefreshed = function () {
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
        GridEquipClass.OnItemInserting = function () { };
        GridEquipClass.OnItemUpdating = function () { };
        GridEquipClass.OnItemDeleting = function () { };
        GridEquipClass.Columns = [
            {
                //Ali**  Reresourse Name
                title: res.Fld_ClassCode, name: "Class_ClassCode", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Class_ClassCode", " ");
                    txt.id = "h_Class_ClassCode";
                    txt.disabled = true;
                    return HeaderTemplate("Fld_ClassCode", txt);
                }
            },
            {
                title: res.work_classdec, visible: _ScreenLanguage == "ar", name: "Class_DescA", width: "20.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Class_DescA", " ");
                    txt.id = "h_Class_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_classdec, txt);
                }
            },
            {
                title: res.work_classdec, visible: _ScreenLanguage == "en", name: "Class_DescE", width: "20.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Class_DescE", " ");
                    txt.id = "h_Class_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_classdec, txt);
                }
            },
            {
                title: res.work_equipno, name: "RequiredNo", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "RequiredNo", " ");
                    txt.id = "h_EquipRequiredNo";
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
        GridLabors.OnRefreshed = function () {
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
        GridLabors.OnItemInserting = function () { };
        GridLabors.OnItemUpdating = function () { };
        GridLabors.OnItemDeleting = function () { };
        GridLabors.Columns = [
            {
                title: res.work_labor, name: "Lab_LabCode", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Lab_LabCode", " ");
                    txt.id = "h_Lab_LabCode";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_labor, txt);
                }
            },
            {
                title: res.work_labor_name, visible: _ScreenLanguage == "ar", name: "Lab_DescA", width: "15.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Lab_DescA", " ");
                    txt.id = "h_Lab_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_labor_name, txt);
                }
            },
            {
                title: res.work_classdec, visible: _ScreenLanguage == "en", name: "Lab_DescE", width: "15.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Lab_DescE", " ");
                    txt.id = "h_Lab_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_classdec, txt);
                }
            },
            {
                title: res.work_joindate, name: "AssigneDate", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "AssigneDate", " ");
                    txt.id = "h_AssigneDate";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_joindate, txt);
                }
            },
            {
                title: res.work_exp_leave_date, name: "ExpLeaveDate", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ExpLeaveDate", " ");
                    txt.id = "h_ExpLeaveDate";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_exp_leave_date, txt);
                }
            },
            {
                title: res.work_leave_date, name: "LeaveDate", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "LeaveDate", " ");
                    txt.id = "h_LabLeaveDate";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_leave_date, txt);
                }
            },
            {
                title: res.work_Eq_HourCost, name: "HourCost", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "HourCost", " ");
                    txt.id = "h_HourCost";
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
        GridEquip.OnRefreshed = function () {
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
        GridEquip.OnItemInserting = function () { };
        GridEquip.OnItemUpdating = function () { };
        GridEquip.OnItemDeleting = function () { };
        GridEquip.Columns = [
            {
                title: res.work_equipcode, name: "eq_EquipCode", width: "7.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "eq_EquipCode", " ");
                    txt.id = "h_eq_EquipCode";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_equipcode, txt);
                }
            },
            {
                title: res.work_equipname, visible: _ScreenLanguage == "ar", name: "eq_DescA", width: "30.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "eq_DescA", " ");
                    txt.id = "h_eq_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_equipname, txt);
                }
            },
            {
                title: res.work_equipname, visible: _ScreenLanguage == "en", name: "Eq_DescE", width: "30.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Eq_DescE", " ");
                    txt.id = "h_Eq_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_equipname, txt);
                }
            },
            {
                title: res.work_joindate, name: "AssigneDate", width: "7.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "AssigneDate", " ");
                    txt.id = "h_EquipAssigneDate";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_joindate, txt);
                }
            },
            {
                title: res.work_exp_leave_date, name: "ExpLeaveDate", width: "7.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ExpLeaveDate", " ");
                    txt.id = "h_EquipExpLeaveDate";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_exp_leave_date, txt);
                }
            },
            {
                title: res.work_leave_date, name: "LeaveDate", width: "7.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "LeaveDate", " ");
                    txt.id = "h_LeaveDate";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_leave_date, txt);
                }
            },
            {
                title: res.work_Eq_HourCost, name: "Eq_HourCost", width: "7.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Eq_HourCost", " ");
                    txt.id = "h_Eq_HourCost";
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
        GridMaterial.OnRefreshed = function () {
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
        GridMaterial.OnItemInserting = function () { };
        GridMaterial.OnItemUpdating = function () { };
        GridMaterial.OnItemDeleting = function () { };
        GridMaterial.Columns = [
            {
                title: res.work_Itm_ItemCode, name: "Itm_ItemCode", width: "7.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Itm_ItemCode", " ");
                    txt.id = "h_Itm_ItemCode";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_Itm_ItemCode, txt);
                }
            },
            {
                title: res.work_Itm_Desc, visible: _ScreenLanguage == "ar", name: "Itm_DescA", width: "40.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Itm_DescA", " ");
                    txt.id = "h_Itm_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_Itm_Desc, txt);
                }
            },
            {
                title: res.work_Itm_Desc, visible: _ScreenLanguage == "en", name: "Itm_DescE", width: "40.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Itm_DescE", " ");
                    txt.id = "h_Itm_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_Itm_Desc, txt);
                }
            },
            {
                title: res.work_UOM, visible: _ScreenLanguage == "ar", name: "Uom_DescA", width: "30.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Uom_DescA", " ");
                    txt.id = "h_Uom_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_UOM, txt);
                }
            },
            {
                title: res.work_UOM, visible: _ScreenLanguage == "en", name: "Uom_DescE", width: "10.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Uom_DescE", " ");
                    txt.id = "h_Uom_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_UOM, txt);
                }
            },
            {
                title: res.work_PlanQty, name: "SchedQty", width: "7.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "SchedQty", " ");
                    txt.id = "h_MatSchedQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_PlanQty, txt);
                }
            },
            {
                title: res.work_ReqQty, name: "ReqQty", width: "7.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ReqQty", " ");
                    txt.id = "h_MatReqQty";
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
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "IssuedQty", " ");
                    txt.id = "h_IssuedQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_IssuedQty, txt);
                }
            },
            {
                title: res.work_ReturnQty, name: "ReturnQty", width: "7.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ReturnQty", " ");
                    txt.id = "h_ReturnQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_ReturnQty, txt);
                }
            },
            {
                title: res.work_BalanceQty, name: "BalanceQty", width: "7.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "BalanceQty", " ");
                    txt.id = "h_BalanceQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_BalanceQty, txt);
                }
            }
        ];
        GridMaterial.DataSource = DetailsMaterial;
        GridMaterial.Bind();
    }
    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById("txtTrNo");
        txtTrDate = DocumentActions.GetElementById("txtTrDate");
        txtWorkDescr = DocumentActions.GetElementById("txtWorkDescr");
        txtPrj_ProjectCode = DocumentActions.GetElementById("txtPrj_ProjectCode");
        txtPrj_DescE = DocumentActions.GetElementById("txtPrj_DescE");
        txtPhase_CCCode = DocumentActions.GetElementById("txtPhase_CCCode");
        txtPhase_DescE = DocumentActions.GetElementById("txtPhase_DescE");
        txtRemarks = DocumentActions.GetElementById("txtRemarks");
        txtCal_calenderCode = DocumentActions.GetElementById("txtCal_calenderCode");
        txtCal_DescE = DocumentActions.GetElementById("txtCal_DescE");
        txtStartTime = DocumentActions.GetElementById("txtStartTime");
        txtStartDateTime = DocumentActions.GetElementById("txtStartDateTime");
        txtEndTime = DocumentActions.GetElementById("txtEndTime");
        txtEndDateTime = DocumentActions.GetElementById("txtEndDateTime");
        txtProdHours = DocumentActions.GetElementById("txtProdHours");
        txtOTHours = DocumentActions.GetElementById("txtOTHours");
        txtCalHours = DocumentActions.GetElementById("txtCalHours");
        txtMaterialReqId = DocumentActions.GetElementById("txtMaterialReqId");
        txtAssignLaborId = DocumentActions.GetElementById("txtAssignLaborId");
        txtAssignEquipId = DocumentActions.GetElementById("txtAssignEquipId");
        ChkStatus = DocumentActions.GetElementById("ChkStatus");
        ChkClose = DocumentActions.GetElementById("ChkClose");
        btnSearchSchdule = DocumentActions.GetElementById("btnSearchSchdule");
        btnSearchProject = DocumentActions.GetElementById("btnSearchProject");
        btnSearchPhase = DocumentActions.GetElementById("btnSearchPhase");
        btnSearchCalender = DocumentActions.GetElementById("btnSearchCalender");
        btnAuthorize = DocumentActions.GetElementById("btnAuthorize");
        btnUnauthorized = DocumentActions.GetElementById("btnUnauthorized");
        btnReopen = DocumentActions.GetElementById("btnReopen");
        btnFindAtcivity = DocumentActions.GetElementById("btnFindAtcivity");
        btnCalcRequirement = DocumentActions.GetElementById("btnCalcRequirement");
        btnCalcHours = DocumentActions.GetElementById("btnCalcHours");
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
        DocumentActions.AssignToModel(Master);
        MasterDetails.P_TR_EngSchedule = Master;
        MasterDetails.P_TR_EngSchedule.ScheduleId = Master.ScheduleId;
        //AssignDetails
        MasterDetails.P_TR_EngScheduleActiv = DetailsActivity;
        for (var _i = 0, DetailsActivity_1 = DetailsActivity; _i < DetailsActivity_1.length; _i++) {
            var Act = DetailsActivity_1[_i];
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
        }
        else if (Master.Status == 1) {
            ChkClose.checked = false;
            ChkStatus.checked = true;
        }
        else if (Master.Status == 2) {
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
    function FillInputText(_TextID, _Data) {
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
            success: function (d) {
                Master = d.result;
                Display();
            }
        });
    }
    function Add() {
        debugger;
        ChkStatus.checked = false;
        ChkClose.checked = false;
        txtAssignLaborId.value = "";
        txtAssignEquipId.value = "";
        txtMaterialReqId.value = "";
        txtOTHours.value = "0";
        txtCalHours.value = "0";
        txtProdHours.value = "0";
        var currentDt = new Date();
        var NextDt = new Date();
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
    function NewData() {
        ClearGrid(GridActivity, DetailsActivity = new Array());
        ClearGrid(GridEquip, new Array());
        ClearGrid(GridEquipClass, new Array());
        ClearGrid(GridLaborClass, new Array());
        ClearGrid(GridLabors, new Array());
        ClearGrid(GridMaterial, new Array());
    }
    function Insert() {
        debugger;
        btnCalcHours_Clicked();
        Assign();
        if (CheckDate(Number(_CompCode), Number(_BranchCode), txtTrDate.value) == false) {
            WorningMessage("غير مسموح بهذا التاريخ", "This Date is not allowed");
            return;
        }
        var session = GetSessionRecord();
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
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Insert", function () {
                        debugger;
                        var _Index = GetIndexByUseId(result.Response, "PQ_GetEngWorkSchdule", "ScheduleId", " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
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
        ChkStatus.disabled = !SharedSession.CurrentPrivileges.CUSTOM1;
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
        }
        else {
            Master.Status = 0;
            MasterDetails.P_TR_EngSchedule.Status = 0;
        }
        var session = GetSessionRecord();
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
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess == true) {
                    if (ClientSharedWork.CurrentMode == ScreenModes.Edit) {
                        var msg = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                        MessageBox.Show(msg, "Update", function () { });
                        ClientSharedWork.SwitchModes(ScreenModes.Query);
                    }
                    debugger;
                    var _Index = GetIndexByUseId(result.Response, "PQ_GetEngWorkSchdule", "ScheduleId", " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
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
            success: function (d) {
                var url = d.result;
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
        for (var _i = 0, DetailsActivity_2 = DetailsActivity; _i < DetailsActivity_2.length; _i++) {
            var itm = DetailsActivity_2[_i];
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
            " and AvaL_Qty > 0", function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getActivity", ControllerName),
                data: { id: id },
                success: function (d) {
                    var result = d.result;
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
        sys.FindKey(Modules.WorkSchedule, "btnSearchSchdule", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getEngSchedule", ControllerName),
                data: { id: id },
                success: function (d) {
                    MasterDetails = d.result;
                    Master = d.result;
                    var Index = GetIndexByUseId(Number(Master.ScheduleId), "PQ_GetEngWorkSchdule", "ScheduleId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }
    function trNo_onchange() {
        var trno;
        trno = Number(txtTrNo.value);
        Ajax.CallAsync({
            url: Url.Action("getEngScheduleViewByNo", 'FindByNo'),
            data: { trno: trno },
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                MasterDetails = d.result;
                Master = d.result;
                var Index = GetIndexByUseId(Number(Master.ScheduleId), "PQ_GetEngWorkSchdule", "ScheduleId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                NavigateToSearchResultKey(Number(Index), Navigate);
            }
        });
    }
    function btnSearchProject_Clicked() {
        sys.FindKey(Modules.WorkSchedule, "btnSearchProject", "CompCode= " + _CompCode + " and BraCode = " + _BranchCode + " and Status = 1", function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getProject", ControllerName),
                data: { id: id },
                success: function (d) {
                    var result = d.result;
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
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                var result = d.result;
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
        sys.FindKey(Modules.WorkSchedule, "btnSearchPhase", "ProjectID =" + ProjectID + " and Status = 1", function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getProjectPhase", ControllerName),
                data: { id: id },
                success: function (d) {
                    var result = d.result;
                    ProjectPhaseId = result.ProjectPhaseId;
                    CalenderId = result.CalenderId;
                    GetCalendar(CalenderId);
                    var currentDt = new Date();
                    var NextDt = new Date();
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
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    ProjectPhaseId = 0;
                    CalenderId = 0;
                    txtCal_calenderCode.value = "";
                    txtCal_DescE.value = "";
                    txtMaterialReqId.value = "";
                    var currentDt_1 = new Date();
                    var NextDt_1 = new Date();
                    txtStartDateTime.value = "";
                    txtEndDateTime.value = "";
                    txtStartTime.value = "";
                    txtEndTime.value = "";
                    txtPhase_CCCode.value = "";
                    txtPhase_DescE.value = "";
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    return;
                }
                var result = d.result;
                ProjectPhaseId = result[0].ProjectPhaseId;
                CalenderId = result[0].CalenderId;
                GetCalendar(CalenderId);
                var currentDt = new Date();
                var NextDt = new Date();
                txtStartDateTime.value = DateFormat(new Date(currentDt.setDate(NextDt.getDate() + 1)).toString());
                txtEndDateTime.value = DateFormat(new Date(currentDt.setDate(NextDt.getDate() + 1)).toString());
                txtPhase_CCCode.value = result[0].ProjectPhaseCode;
                txtPhase_DescE.value = result[0].DescL;
                NewData();
            }
        });
    }
    function btnSearchCalender_Clicked() {
        sys.FindKey(Modules.WorkSchedule, "btnSearchCalender", "", function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getProjectCalender", ControllerName),
                data: { id: id },
                success: function (d) {
                    var result = d.result;
                    CalenderId = result.CalenderID;
                    txtCal_calenderCode.value = result.Calendercode;
                    txtCal_DescE.value = result.DescE;
                }
            });
        });
    }
    function getLabors(id) {
        Ajax.CallAsync({
            url: Url.Action("getLabors", ControllerName),
            data: { id: id },
            success: function (d) {
                DetailsLabors = d.result;
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
    function getLaborClasses(id) {
        Ajax.CallAsync({
            url: Url.Action("getLaborClasses", ControllerName),
            data: { id: id },
            success: function (d) {
                DetailsLaborClass = d.result;
                GridLaborClass.DataSource = DetailsLaborClass;
                GridLaborClass.Bind();
            }
        });
    }
    function getEquipment(id) {
        Ajax.CallAsync({
            url: Url.Action("getEquipment", ControllerName),
            data: { id: id },
            success: function (d) {
                DetailsEquip = d.result;
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
    function getEquipmentClasses(id) {
        Ajax.CallAsync({
            url: Url.Action("getEquipmentClasses", ControllerName),
            data: { id: id },
            success: function (d) {
                DetailsEquipClass = d.result;
                GridEquipClass.DataSource = DetailsEquipClass;
                GridEquipClass.Bind();
            }
        });
    }
    function getMaterial(id) {
        Ajax.CallAsync({
            url: Url.Action("getMaterial", ControllerName),
            data: { id: id },
            success: function (d) {
                DetailsMaterial = d.result;
                GridMaterial.DataSource = DetailsMaterial;
                GridMaterial.Bind();
            }
        });
    }
    function getActivities(id) {
        Ajax.CallAsync({
            url: Url.Action("getActivities", ControllerName),
            data: { id: id },
            success: function (d) {
                DetailsActivity = d.result;
                GridActivity.DataSource = DetailsActivity;
                GridActivity.Bind();
            }
        });
    }
    function Calculation() {
        var result = Number($('#h_ActivQty').val())
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
        var _Index = GetIndexByUseId(Master.ScheduleId, "PQ_GetEngWorkSchdule", "ScheduleId", " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
        NavigateToSearchResultKey(Number(_Index), Navigate);
    }
    function workSchdule_Authorize(id) {
        //Assign();
        Ajax.Callsync({
            url: Url.Action("workSchdule_Authorize", ControllerName),
            data: { _Id: id },
            success: function (d) {
                //Display();
            }
        });
        //Display();
    }
    function workSchdule_Reopen() {
        workSchdule_open(Master.ScheduleId);
        var _Index = GetIndexByUseId(Master.ScheduleId, "PQ_GetEngWorkSchdule", "ScheduleId", " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
        NavigateToSearchResultKey(Number(_Index), Navigate);
    }
    function workSchdule_open(id) {
        Ajax.Callsync({
            url: Url.Action("workSchdule_Reopen", ControllerName),
            data: { _Id: id },
            success: function (d) {
                //alert(d);
            }
        });
    }
    function btnUnAuthorize_Clicked() {
        debugger;
        MessageBox.Ask("Free Resources attached and Not Produced activities. Prevent any additional operation over the Schedule", "Work Schedule Close Worning .. ", function () {
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
    function workSchdule_UnAuthorize(id) {
        debugger;
        //Assign();
        Ajax.Callsync({
            url: Url.Action("workSchdule_UnAuthorize", ControllerName),
            data: { _Id: id },
            success: function (d) {
                //Display();
            }
        });
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
        var _Index = GetIndexByUseId(Master.ScheduleId, "PQ_GetEngWorkSchdule", "ScheduleId", " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
        NavigateToSearchResultKey(Number(_Index), Navigate);
    }
    function workSchdule_Requirements(id) {
        debugger;
        Ajax.Callsync({
            url: Url.Action("workSchdule_Requirements", ControllerName),
            data: { _Id: id },
            success: function (d) {
                // Display();
            }
        });
        //Display();
    }
    function btnCalcHours_Clicked() {
        debugger;
        var frm = txtStartDateTime.value + " " + txtStartTime.value;
        var todate = txtEndDateTime.value + " " + txtEndTime.value;
        var clcid = CalenderId.toString(); //Master.CalenderId.toString(); //currentCalId.toString();
        Ajax.Callsync({
            url: Url.Action("GetHourProd", ControllerName),
            data: { from: frm, to: todate, calcId: clcid },
            success: function (d) {
                debugger;
                var result = d.result;
                txtCalHours.value = result;
                txtProdHours.value = (Number(txtCalHours.value) + Number(txtOTHours.value)).toFixed(2);
            }
        });
    }
    function OTHours_Change() {
        txtProdHours.value = (Number(txtCalHours.value) + Number(txtOTHours.value)).toFixed(2);
    }
    function GetCalendar(id) {
        Ajax.CallAsync({
            url: Url.Action("getProjectCalender", ControllerName),
            data: { id: id },
            success: function (d) {
                var result = d.result;
                txtCal_calenderCode.value = result.Calendercode;
                txtCal_DescE.value = result.DescE;
                txtStartTime.value = TimeFormat(result.StartTime);
                txtEndTime.value = TimeFormat(result.EndTime);
            }
        });
    }
})(WorkSchedule || (WorkSchedule = {}));
//# sourceMappingURL=WorkSchedule.js.map