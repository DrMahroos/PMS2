$(document).ready(function () {
    OnProductionEntry.InitalizeComponent();
});
var OnProductionEntry;
(function (OnProductionEntry) {
    var ControllerName = "OpProductionEntry";
    var GridInputClassName = "form-control gridIput";
    var columnWidth = "100px";
    var NumberColumnWidth = "50px";
    var sys = new SystemTools();
    var GridActivity = new JsGrid();
    var GridEquipment = new JsGrid();
    var GridLabor = new JsGrid();
    var itmID = 0;
    var ProductionActivId = 0;
    var activeID = 0;
    var LaborID = 0;
    var equipID = 0;
    var reasonID = 0;
    var schduleID = 0;
    var CalenderId = 0;
    var projectID = 0;
    var projectPhaseID = 0;
    //var calenderID: number = 0;
    var schdId = 0;
    var schdActId = 0;
    var projPhaseItmId = 0;
    var _ScreenLanguage;
    var _CompCode;
    var _BranchCode;
    var frm;
    var todate;
    var Hourcost;
    var ProdLaborID = 0;
    var _authorizeStatus = 3; //1 = stats authorize true //2 = stats Unauthorize false // 3 = Master.status
    var M_D_Productions = /** @class */ (function () {
        function M_D_Productions() {
            this.sessionRecord = new SessionRecord();
            this.P_Tr_EngProduction = new P_Tr_EngProduction();
        }
        return M_D_Productions;
    }());
    var MasterDetails = new M_D_Productions();
    var Master = new PQ_GetEngProduction();
    var ActivityDataSource = new Array();
    var DetailsActivity = new Array();
    var DetailsAssignHeaderActivity = new PQ_GetEngproductionActivity();
    var Tbl_DetailActivity = new Array();
    var EquipDataSource = new Array();
    var DetailsEquip = new Array();
    var DetailsAssignHeaderEquip = new PQ_GetEngProductionEquipment();
    var Tbl_DetailEquip = new Array();
    var LaborDataSource = new Array();
    var DetailsLabor = new Array();
    var DetailsAssignHeaderLabor = new PQ_GetEngProductionLabour();
    var Tbl_DetailLabor = new Array();
    var txtTrNo;
    var txtTrDate;
    var txtScheduleId;
    var txtSchduleName;
    var txtWorkDescr;
    var txtProj_DescE;
    var txtPhase_DescE;
    var txtUnp_ReasonCode;
    var txtUnp_DescE;
    var txtStarttime;
    var txtStartDate;
    var txtEndTime;
    var txtEndDate;
    var txtWorkHours;
    var txtTotalunProdHours;
    var ChkStatus;
    var btnSearchTrNo;
    var btnSerchSchdule;
    var btnSearchUnprodReasons;
    var btnAutohrize;
    var btnunauthorized;
    var btnLoadActivity;
    var ChkIsCloseScheduel;
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
        ControlsButtons.PrintAction(function () { pOnProductionEntry(); });
        InitalizeGrid();
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.OpProductionEntry, Master.ProductionId.toString());
        });
    }
    OnProductionEntry.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        // Grid Activity
        var res = GetResourceList("Prod_");
        GridActivity.ElementName = "GridProductionActivity";
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
                title: res.Prod_Item, name: "Itm_Code", width: "19.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Itm_Code", " ");
                    txt.id = "h_Itm_Code";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Item, txt);
                }
            },
            {
                title: res.Prod_ActCode, name: "Act_Code", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Act_Code", " ");
                    txt.id = "h_Act_Code";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_ActCode, txt);
                }
            },
            {
                title: res.work_ActivityName, visible: _ScreenLanguage == "ar", name: "Act_DescA", width: "25.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Act_DescA", " ");
                    txt.id = "h_Act_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_ActivityName, txt);
                }
            },
            {
                title: res.Prod_ActivityName, visible: _ScreenLanguage == "en", name: "Act_DescE", width: "20.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Act_DescE", " ");
                    txt.id = "h_Act_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_ActivityName, txt);
                }
            },
            {
                title: res.Prod_ScheduleQty, name: "schAct_SchedQty", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "schAct_SchedQty", " ");
                    txt.id = "h_schAct_SchedQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_ScheduleQty, txt);
                }
            },
            {
                title: res.Prod_ProdBeforeQty, name: "ProdBeforeQty", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ProdBeforeQty", " ");
                    txt.id = "h_ProdBeforeQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_ProdBeforeQty, txt);
                }
            },
            {
                title: res.Prod_FinishQty, name: "FinishQty", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "FinishQty", " ");
                    txt.id = "h_FinishQty";
                    txt.onkeyup = function (e) {
                        Calculation();
                    };
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Prod_FinishQty, txt);
                }
            },
            {
                title: res.Prod_RemainQty, name: "RemainQty", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "RemainQty", " ");
                    txt.id = "h_RemainQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_RemainQty, txt);
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
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.type = "button";
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
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.type = "button";
                    btn.name = DetailsActivity.indexOf(item).toString();
                    btn.onclick = function (e) {
                        //edit
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        var index = Number(e.currentTarget.name);
                        DetailsActivity.splice(index, 1);
                        BindDataGridActivity();
                        //ReIndexingGrid();
                        ProductionActivId = item.ProductionActivId;
                        itmID = item.ItemId;
                        activeID = item.ActivityID;
                        schdId = item.ScheduleId;
                        schdActId = item.ScheduleActivId;
                        projPhaseItmId = item.ProjectPhaseItemActivId;
                        FillInputText("h_Itm_DescA", item.Itm_DescA);
                        FillInputText("h_Itm_DescE", item.Itm_DescE);
                        FillInputText("h_Itm_Code", item.Itm_Code);
                        FillInputText("h_Act_Code", item.Act_Code);
                        FillInputText("h_Act_DescA", item.Act_DescA);
                        FillInputText("h_Act_DescE", item.Act_DescE);
                        FillInputText("h_schAct_SchedQty", item.schAct_SchedQty.toString());
                        FillInputText("h_ProdBeforeQty", item.ProdBeforeQty.toString());
                        FillInputText("h_FinishQty", item.FinishQty.toString());
                        FillInputText("h_RemainQty", item.RemainQty.toString());
                    };
                    return btn;
                }
            }
        ];
        GridActivity.DataSource = DetailsActivity;
        GridActivity.Bind();
        // Grid Labor
        GridLabor.ElementName = "Gridproductionlabors";
        GridLabor.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridLabor.OnRefreshed = function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridLabor.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridLabor.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridLabor.InsertionMode = JsGridInsertionMode.Binding;
        GridLabor.OnItemInserting = function () { };
        GridLabor.OnItemUpdating = function () { };
        GridLabor.OnItemDeleting = function () { };
        GridLabor.Columns = [
            {
                title: res.Prod_Lab_Code, name: "Lab_Code", width: "10%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Lab_Code", " ");
                    txt.id = "h_Lab_Code";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Lab_Code, txt);
                }
            },
            {
                title: res.Prod_Lab_DescA, visible: _ScreenLanguage == "ar", name: "Lab_DescA", width: "15.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Lab_DescA", " ");
                    txt.id = "h_Lab_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Lab_DescA, txt);
                }
            },
            {
                title: res.Prod_Lab_DescA, visible: _ScreenLanguage == "en", name: "Lab_DescE", width: "15.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Lab_DescE", " ");
                    txt.id = "h_Lab_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Lab_DescA, txt);
                }
            },
            {
                title: res.Prod_Class_Code, name: "Class_Code", width: "15.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Class_Code", " ");
                    txt.id = "h_Class_Code";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Class_Code, txt);
                }
            },
            {
                title: res.Prod_Class_DescA, visible: _ScreenLanguage == "ar", name: "Class_DescA", width: "15.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Class_DescA", " ");
                    txt.id = "h_Class_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Class_DescA, txt);
                }
            },
            {
                title: res.Prod_Class_DescA, visible: _ScreenLanguage == "en", name: "Class_DescE", width: "15.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Class_DescE", " ");
                    txt.id = "h_Class_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Class_DescA, txt);
                }
            },
            {
                title: res.Prod_EstHours, name: "EstHours", width: "10%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "EstHours", " ");
                    txt.id = "h_EstHours";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_EstHours, txt);
                }
            },
            {
                title: res.Prod_WorkHours, name: "WorkHours", width: "10%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "WorkHours", " ");
                    txt.id = "h_WorkHours";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Prod_WorkHours, txt);
                }
            },
            {
                title: res.Prod_UnProdHours, name: "UnProdHours", width: "10%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "UnProdHours", " ");
                    txt.id = "h_UnProdHours";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Prod_UnProdHours, txt);
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
                    btn.id = "btnAddItemLaborGrid";
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        btnAddItemLaborGrid();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.name = DetailsLabor.indexOf(item).toString();
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        var index = Number(e.currentTarget.name);
                        DetailsLabor.splice(index, 1);
                        BindDataGridLabor();
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
                    btn.className = TransparentButton;
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.type = "button";
                    btn.name = DetailsLabor.indexOf(item).toString();
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        Hourcost = item.HourCost;
                        ProdLaborID = item.ProductionLaborId;
                        DetailsAssignHeaderLabor = new PQ_GetEngProductionLabour();
                        DetailsAssignHeaderLabor.LaborID = item.LaborID;
                        DetailsAssignHeaderLabor.Lab_Code = item.Lab_Code;
                        DetailsAssignHeaderLabor.Lab_DescA = item.Lab_DescA;
                        DetailsAssignHeaderLabor.Lab_DescE = item.Lab_DescE;
                        DetailsAssignHeaderLabor.Class_Code = item.Class_Code;
                        DetailsAssignHeaderLabor.Class_DescA = item.Class_DescA;
                        DetailsAssignHeaderLabor.Class_DescE = item.Class_DescE;
                        DetailsAssignHeaderLabor.EstHours = item.EstHours;
                        DetailsAssignHeaderLabor.WorkHours = item.WorkHours;
                        DetailsAssignHeaderLabor.UnProdHours = item.UnProdHours;
                        var index = Number(e.currentTarget.name);
                        DetailsLabor.splice(index, 1);
                        BindDataGridLabor();
                        //ReIndexingGrid();
                        LaborID = DetailsAssignHeaderLabor.LaborID;
                        FillInputText("h_Lab_Code", DetailsAssignHeaderLabor.Lab_Code);
                        FillInputText("h_Lab_DescA", DetailsAssignHeaderLabor.Lab_DescA);
                        FillInputText("h_Lab_DescE", DetailsAssignHeaderLabor.Lab_DescE);
                        FillInputText("h_Class_Code", DetailsAssignHeaderLabor.Class_Code);
                        FillInputText("h_Class_DescA", DetailsAssignHeaderLabor.Class_DescA);
                        FillInputText("h_Class_DescE", DetailsAssignHeaderLabor.Class_DescE);
                        FillInputText("h_EstHours", DetailsAssignHeaderLabor.EstHours.toString());
                        FillInputText("h_WorkHours", DetailsAssignHeaderLabor.WorkHours.toString());
                        FillInputText("h_UnProdHours", DetailsAssignHeaderLabor.UnProdHours.toString());
                    };
                    return btn;
                }
            }
        ];
        GridLabor.DataSource = DetailsLabor;
        GridLabor.Bind();
        // Grid Equipment
        GridEquipment.ElementName = "Gridproductionequipment";
        GridEquipment.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridEquipment.OnRefreshed = function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridEquipment.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridEquipment.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridEquipment.InsertionMode = JsGridInsertionMode.Binding;
        GridEquipment.OnItemInserting = function () { };
        GridEquipment.OnItemUpdating = function () { };
        GridEquipment.OnItemDeleting = function () { };
        GridEquipment.Columns = [
            {
                title: res.Prod_Equip_Code, name: "Equip_Code", width: "10%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Equip_Code", " ");
                    txt.id = "h_Equip_Code";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Equip_Code, txt);
                }
            },
            {
                title: res.Prod_Equip_Desc, visible: _ScreenLanguage == "ar", name: "Equip_DescA", width: "15.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Equip_DescA", " ");
                    txt.id = "h_Equip_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Equip_Desc, txt);
                }
            },
            {
                title: res.Prod_Equip_Desc, visible: _ScreenLanguage == "en", name: "Equip_DescE", width: "15.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Equip_DescE", " ");
                    txt.id = "h_Equip_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Equip_Desc, txt);
                }
            },
            {
                title: res.Prod_HourCost, name: "HourCost", width: "10%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "HourCost", " ");
                    txt.id = "h_EquipHourCost";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_HourCost, txt);
                }
            },
            {
                title: res.Prod_EstHours, name: "EstHours", width: "10%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "EstHours", " ");
                    txt.id = "h_EquipEstHours";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_EstHours, txt);
                }
            },
            {
                title: res.Prod_WorkHours, name: "WorkHours", width: "10%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "WorkHours", " ");
                    txt.id = "h_EquipWorkHours";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Prod_WorkHours, txt);
                }
            },
            {
                title: res.Prod_UnProdHours, name: "UnProdHours", width: "10%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "UnProdHours", " ");
                    txt.id = "h_EquipUnProdHours";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Prod_UnProdHours, txt);
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
                    btn.id = "btnAddItemEquipGrid";
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        btnAddItemEquipGrid();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.name = DetailsEquip.indexOf(item).toString();
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        var index = Number(e.currentTarget.name);
                        DetailsEquip.splice(index, 1);
                        BindDataGridEquip();
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
                    btn.type = "button";
                    btn.name = DetailsEquip.indexOf(item).toString();
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        //DetailsAssignHeaderEquip = new PQ_GetEngProductionEquipment();
                        //DetailsAssignHeaderEquip.EquipmentID = item.EquipmentID;
                        //DetailsAssignHeaderEquip.Equip_Code = item.Equip_Code;
                        //DetailsAssignHeaderEquip.Equip_DescA = item.Equip_DescA;
                        //DetailsAssignHeaderEquip.Equip_DescE = item.Equip_DescE;
                        //DetailsAssignHeaderEquip.HourCost = item.HourCost;
                        //DetailsAssignHeaderEquip.EstHours = item.EstHours;
                        //DetailsAssignHeaderEquip.WorkHours = item.WorkHours;
                        //DetailsAssignHeaderEquip.UnProdHours = item.UnProdHours;
                        var index = Number(e.currentTarget.name);
                        DetailsEquip.splice(index, 1);
                        BindDataGridEquip();
                        //ReIndexingGrid();
                        debugger;
                        equipID = item.EquipmentID;
                        //item.ProductionequipId
                        //item.ProductionId
                        FillInputText("h_Equip_Code", item.Equip_Code);
                        FillInputText("h_Equip_DescA", item.Equip_DescA);
                        FillInputText("h_Equip_DescE", item.Equip_DescE);
                        $("#h_EquipHourCost").val(item.HourCost); //--
                        $("#h_EquipEstHours").val(item.EstHours); //--
                        $("#h_EquipWorkHours").val(item.WorkHours); //--
                        $("#h_EquipUnProdHours").val(item.UnProdHours);
                    };
                    return btn;
                }
            }
        ];
        GridEquipment.DataSource = DetailsEquip;
        GridEquipment.Bind();
    }
    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById("txtTrNo");
        txtTrDate = DocumentActions.GetElementById("txtTrDate");
        txtScheduleId = DocumentActions.GetElementById("txtScheduleId");
        txtSchduleName = DocumentActions.GetElementById("txtSchduleName");
        txtWorkDescr = DocumentActions.GetElementById("txtWorkDescr");
        txtProj_DescE = DocumentActions.GetElementById("txtProj_DescE");
        txtPhase_DescE = DocumentActions.GetElementById("txtPhase_DescE");
        txtUnp_ReasonCode = DocumentActions.GetElementById("txtUnp_ReasonCode");
        txtUnp_DescE = DocumentActions.GetElementById("txtUnp_DescE");
        txtStarttime = DocumentActions.GetElementById("txtStarttime");
        txtStartDate = DocumentActions.GetElementById("txtStartDate");
        txtEndTime = DocumentActions.GetElementById("txtEndTime");
        txtEndDate = DocumentActions.GetElementById("txtEndDate");
        txtWorkHours = DocumentActions.GetElementById("txtWorkHours");
        txtTotalunProdHours = DocumentActions.GetElementById("txtTotalunProdHours");
        btnSearchTrNo = DocumentActions.GetElementById("btnSearchTrNo");
        btnSerchSchdule = DocumentActions.GetElementById("btnSerchSchdule");
        btnSearchUnprodReasons = DocumentActions.GetElementById("btnSearchUnprodReasons");
        btnAutohrize = DocumentActions.GetElementById("btnAutohrize");
        btnunauthorized = DocumentActions.GetElementById("btnunauthorized");
        btnLoadActivity = DocumentActions.GetElementById("btnLoadActivity");
        ChkIsCloseScheduel = DocumentActions.GetElementById("ChkIsCloseScheduel");
        ChkStatus = DocumentActions.GetElementById("ChkStatus");
        btnCalcHours = DocumentActions.GetElementById("btnCalcHours");
    }
    function InitalizeEvents() {
        txtScheduleId.onchange = SerchSchdule_Changed;
        txtTrNo.onchange = SearchTrNo_onCahnged;
        txtTotalunProdHours.onkeyup = txtTotalunProdHours_Change;
        btnSerchSchdule.onclick = btnSerchSchdule_Clicked;
        btnSearchUnprodReasons.onclick = btnSearchUnprodReasons_Clicked;
        btnAutohrize.onclick = ProductionAuthorize_Clicked;
        btnunauthorized.onclick = btnunauthorized_onclick;
        btnLoadActivity.onclick = LoadAllDetails; //PProc_EngLoadProductionActivity;
        btnSearchTrNo.onclick = btnSearchTrNo_Clicked;
        btnCalcHours.onclick = btnCalcHours_Clicked;
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: function (d) {
                debugger;
                Master = d.result;
                Display();
            }
        });
    }
    function Display() {
        debugger;
        _authorizeStatus = 0;
        DocumentActions.RenderFromModel(Master);
        txtTrDate.value = DateFormat(Master.TrDate);
        txtStartDate.value = DateFormat(Master.StartDateTime);
        txtEndDate.value = DateFormat(Master.EndDateTime);
        txtStarttime.value = TimeFormat(Master.StartDateTime);
        txtEndTime.value = TimeFormat(Master.EndDateTime);
        schduleID = Master.ScheduleId;
        CalenderId = Master.CalenderId;
        projectID = Master.ProjectID;
        projectPhaseID = Master.ProjectPhaseId;
        reasonID = Master.UnProdReasonId;
        GetProdActivity(Master.ProductionId);
        GetProdLabor(Master.ProductionId);
        GetProdEquipment(Master.ProductionId);
        GetSchduleTrNo(Master.ScheduleId);
        $("#btnAutohrize").attr("disabled", "disabled");
        debugger;
        if (Master.Sc_Status == 1 && Master.Status == 1 && SharedSession.CurrentPrivileges.CUSTOM2 == true) {
            $("#btnunauthorized").removeAttr("disabled");
            $("#btnunauthorized").css('cursor', 'pointer');
            $("#btnunauthorized").css('backgroundColor', 'red');
        }
        else {
            $("#btnunauthorized").attr("disabled", "disabled");
            $("#btnunauthorized").css('backgroundColor', '#0B6D8A');
        }
        if (Master.Status == 0 && Master.Sc_Status == 1) {
            $("#EditButton").removeAttr("disabled");
        }
        else {
            $("#EditButton").attr("disabled", "disabled");
        }
        if (Master.Sc_Status == 1)
            $("#effects").css('backgroundColor', '#FFFFFF');
        else
            $("#effects").css('backgroundColor', '#E2E6E6');
    }
    function Assign() {
        //AssignMaster
        DocumentActions.AssignToModel(Master);
        Master.StartDateTime = DateTimeFormat($("#txtStartDate").val() + " " + $("#txtStarttime").val());
        Master.EndDateTime = DateTimeFormat($("#txtEndDate").val() + " " + $("#txtEndTime").val());
        MasterDetails.P_Tr_EngProduction = Master;
        MasterDetails.P_Tr_EngProduction.ProductionId = Master.ProductionId;
        ;
        //AssignDetails
        MasterDetails.P_TR_EngProductionActiv = DetailsActivity;
        for (var _i = 0, DetailsActivity_1 = DetailsActivity; _i < DetailsActivity_1.length; _i++) {
            var Act = DetailsActivity_1[_i];
            Act.ProductionId = Master.ProductionId;
            Tbl_DetailActivity.push(Act);
        }
        MasterDetails.P_TR_EngProductionEquip = DetailsEquip;
        for (var _a = 0, DetailsEquip_1 = DetailsEquip; _a < DetailsEquip_1.length; _a++) {
            var equip = DetailsEquip_1[_a];
            equip.ProductionId = Master.ProductionId;
            //test
            Tbl_DetailEquip.push(equip);
        }
        debugger;
        MasterDetails.P_TR_EngProductionLabour = DetailsLabor;
        for (var _b = 0, DetailsLabor_1 = DetailsLabor; _b < DetailsLabor_1.length; _b++) {
            var labor = DetailsLabor_1[_b];
            //test
            labor.ProductionId = Master.ProductionId;
            Tbl_DetailLabor.push(labor);
        }
    }
    function Add() {
        txtScheduleId.value = "";
        txtProj_DescE.value = "";
        txtPhase_DescE.value = "";
        txtUnp_ReasonCode.value = "";
        ChkStatus.checked = false;
        Master.Status = 0;
        txtUnp_DescE.value = "";
        txtWorkHours.value = "";
        txtTotalunProdHours.value = "";
        ClearGrid(GridActivity, new Array());
        ClearGrid(GridEquipment, new Array());
        ClearGrid(GridLabor, new Array());
        txtTrDate.value = DateFormat(new Date().toString());
        $("#effects").css('backgroundColor', '#FFFFFF');
        $("#btnunauthorized").attr("disabled", "disabled");
    }
    function Insert() {
        Master = new PQ_GetEngProduction();
        Assign();
        if (CheckDate(Number(_CompCode), Number(_BranchCode), txtTrDate.value) == false) {
            WorningMessage("غير مسموح بهذا التاريخ", "This Date is not allowed");
            return;
        }
        debugger;
        if ((txtTotalunProdHours.value == "" && txtUnp_ReasonCode.value != "") || (txtUnp_ReasonCode.value == "" && txtTotalunProdHours.value != "")) {
            WorningMessage("الرجاء ادخال سبب تأخير الانتاج وعدد ساعات الانتاج معا", "Must be enter Un Prod Reason with Un Prod.Hours together");
            return;
        }
        Master.UnProdReasonId = reasonID;
        Master.ScheduleId = schduleID;
        Master.CalenderId = CalenderId;
        Master.ProjectID = projectID;
        Master.ProjectPhaseId = projectPhaseID;
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BranchCode);
        Master.Status = 0;
        var session = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        debugger;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_Tr_EngProduction", "InsertMasterDetail"),
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
                    MessageBox.Show(msg, "Update", function () {
                        debugger;
                        var _Index = GetIndexByUseId(result.Response, "PQ_GetEngProduction", "ProductionId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                        //LoadDetails(Master.ProjectID);
                    });
                }
            }
        });
    }
    function Update() {
        Assign();
        if (CheckDate(Number(_CompCode), Number(_BranchCode), txtTrDate.value) == false) {
            WorningMessage("غير مسموح بهذا التاريخ", "This Date is not allowed");
            return;
        }
        if ((txtTotalunProdHours.value == "" && txtUnp_ReasonCode.value != "") || (txtUnp_ReasonCode.value == "" && txtTotalunProdHours.value != "")) {
            WorningMessage("الرجاء ادخال سبب تأخير الانتاج وعدد ساعات الانتاج معا", "Must be enter Un Prod Reason with Un Prod.Hours together");
            return;
        }
        Master.UnProdReasonId = reasonID;
        Master.ScheduleId = schduleID;
        Master.CalenderId = CalenderId;
        Master.ProjectID = projectID;
        Master.ProjectPhaseId = projectPhaseID;
        Master.CompCode = Number(ClientSharedWork.Session.CompCode);
        Master.BraCode = Number(ClientSharedWork.Session.BranchCode);
        MasterDetails.P_Tr_EngProduction.UpdatedAt = DateFormat((new Date()).toString());
        MasterDetails.P_Tr_EngProduction.UpdatedBy = SharedSession.CurrentEnvironment.UserCode;
        debugger;
        var session = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        if (_authorizeStatus == 1) {
            MasterDetails.P_Tr_EngProduction.Status = 1;
            Master.Status = 1;
        }
        else if (_authorizeStatus == 2) {
            MasterDetails.P_Tr_EngProduction.Status = 2;
            Master.Status = 2;
        }
        else {
            MasterDetails.P_Tr_EngProduction.Status = 0;
            Master.Status = 0;
        }
        debugger;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_Tr_EngProduction", "UpdateMasterDetail"),
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
                    MessageBox.Show(msg, "Update", function () {
                        debugger;
                        _authorizeStatus = 0;
                        var _Index = GetIndexByUseId(result.Response, "PQ_GetEngProduction", "ProductionId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                        //LoadDetails(Master.ProjectID);
                    });
                }
            }
        });
    }
    function Edit() {
        txtTotalunProdHours_Change();
        if (Master.Status == 0 && SharedSession.CurrentPrivileges.CUSTOM1 == true) {
            $("#btnAutohrize").removeAttr("disabled");
        }
        else {
            $("#btnAutohrize").attr("disabled", "disabled");
        }
    }
    function Undo() {
    }
    function pOnProductionEntry() {
        Ajax.CallAsync({
            url: Url.Action("printOpProductionEntry", "PrintTransaction"),
            data: { TrNo: Number(Master.ProductionId) },
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
    function BindDataGridActivity() {
        GridActivity.DataSource = DetailsActivity;
        GridActivity.Bind();
    }
    function BindDataGridEquip() {
        GridEquipment.DataSource = DetailsEquip;
        GridEquipment.Bind();
    }
    function BindDataGridLabor() {
        GridLabor.DataSource = DetailsLabor;
        GridLabor.Bind();
    }
    function FillInputText(_TextID, _Data) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }
    function GetProdActivity(id) {
        Ajax.CallAsync({
            url: Url.Action("GetProdActivity", ControllerName),
            data: { id: id },
            success: function (d) {
                DetailsActivity = d.result;
                GridActivity.DataSource = DetailsActivity;
                GridActivity.Bind();
            }
        });
    }
    function GetProdEquipment(id) {
        Ajax.CallAsync({
            url: Url.Action("GetProdEquipment", ControllerName),
            data: { id: id },
            success: function (d) {
                DetailsEquip = d.result;
                GridEquipment.DataSource = DetailsEquip;
                GridEquipment.Bind();
                txtTotalunProdHours_Change();
            }
        });
    }
    function GetProdLabor(id) {
        Ajax.CallAsync({
            url: Url.Action("GetProdLabor", ControllerName),
            data: { id: id },
            success: function (d) {
                DetailsLabor = d.result;
                GridLabor.DataSource = DetailsLabor;
                GridLabor.Bind();
            }
        });
    }
    function Calculation() {
        var result = 0;
        result = (Number($('#h_schAct_SchedQty').val()) - Number($('#h_FinishQty').val()) - Number($('#h_ProdBeforeQty').val()));
        $('#h_RemainQty').val(result);
    }
    function AddItemInActivityGrid() {
        DetailsAssignHeaderActivity = new PQ_GetEngproductionActivity();
        var code = $('#h_Itm_Code').val();
        if (code == " ") {
            WorningMessage("يجب اختيار نشاط اولا", "Please Insert Activity");
            return;
        }
        if (Number($('#h_FinishQty').val() < 0)) {
            WorningMessage("الكمية المنتهية يجب ان لا تقل عن 0", "Finished Qty Cannot Be Smaller Than Zero");
            return;
        }
        DetailsAssignHeaderActivity.ProductionActivId = ProductionActivId;
        DetailsAssignHeaderActivity.ItemId = itmID;
        DetailsAssignHeaderActivity.ActivityID = activeID;
        DetailsAssignHeaderActivity.ScheduleId = schdId;
        DetailsAssignHeaderActivity.ScheduleActivId = schdActId;
        DetailsAssignHeaderActivity.ProjectPhaseItemActivId = projPhaseItmId;
        DetailsAssignHeaderActivity.Itm_DescA = $('#h_Itm_DescA').val();
        DetailsAssignHeaderActivity.Itm_DescE = $('#h_Itm_DescE').val();
        DetailsAssignHeaderActivity.Itm_Code = $('#h_Itm_Code').val();
        DetailsAssignHeaderActivity.Act_Code = $('#h_Act_Code').val();
        DetailsAssignHeaderActivity.Act_DescA = $('#h_Act_DescA').val();
        DetailsAssignHeaderActivity.Act_DescE = $('#h_Act_DescE').val();
        DetailsAssignHeaderActivity.schAct_SchedQty = $('#h_schAct_SchedQty').val();
        DetailsAssignHeaderActivity.ProdBeforeQty = $('#h_ProdBeforeQty').val();
        DetailsAssignHeaderActivity.FinishQty = $('#h_FinishQty').val();
        DetailsAssignHeaderActivity.RemainQty = $('#h_RemainQty').val();
        DetailsActivity.unshift(DetailsAssignHeaderActivity);
        BindDataGridActivity();
    }
    function btnAddItemLaborGrid() {
        DetailsAssignHeaderLabor = new PQ_GetEngProductionLabour();
        if ($('#h_Lab_Code').val().trim() == "") {
            WorningMessage("يجب اختيار عامل اولا", "Please Insert Labor");
            return;
        }
        var _UnProd = Number($("#h_UnProdHours").val());
        if (_UnProd > Number(txtTotalunProdHours.value)) {
            WorningMessage(" ساعات الإنتاج يجب ان لا تزيد عن ساعات الانتاج في جدول العمال", "Un Prod. Hours must be Less than or equal to Un Prod. Hours in labor grid");
            return;
        }
        DetailsAssignHeaderLabor.LaborID = LaborID;
        DetailsAssignHeaderLabor.ProductionLaborId = ProdLaborID;
        DetailsAssignHeaderLabor.HourCost = Hourcost;
        DetailsAssignHeaderLabor.Lab_Code = $('#h_Lab_Code').val();
        DetailsAssignHeaderLabor.Lab_DescA = $('#h_Lab_DescA').val();
        DetailsAssignHeaderLabor.Lab_DescE = $('#h_Lab_DescE').val();
        DetailsAssignHeaderLabor.Class_Code = $('#h_Class_Code').val();
        DetailsAssignHeaderLabor.Class_DescA = $('#h_Class_DescA').val();
        DetailsAssignHeaderLabor.Class_DescE = $('#h_Class_DescE').val();
        DetailsAssignHeaderLabor.EstHours = $('#h_EstHours').val();
        DetailsAssignHeaderLabor.WorkHours = $('#h_WorkHours').val();
        DetailsAssignHeaderLabor.UnProdHours = $('#h_UnProdHours').val();
        DetailsLabor.unshift(DetailsAssignHeaderLabor);
        BindDataGridLabor();
    }
    function btnAddItemEquipGrid() {
        DetailsAssignHeaderEquip = new PQ_GetEngProductionEquipment();
        if ($('#h_Equip_Code').val().trim() == "" || $('#h_Equip_Code').val() == null) {
            WorningMessage("يجب اختيار معدة اولا", "Please Insert Equipment");
            return;
        }
        var _UnProd = Number($("#h_EquipUnProdHours").val());
        if (_UnProd > Number(txtTotalunProdHours.value)) {
            WorningMessage(" ساعات الإنتاج يجب ان لا تزيد عن ساعات الانتاج في جدول المعدات", "Un Prod. Hours must be Less than or equal to Un Prod. Hours in Equipment grid");
            return;
        }
        DetailsAssignHeaderEquip.EquipmentID = equipID;
        DetailsAssignHeaderEquip.Equip_Code = $('#h_Equip_Code').val();
        DetailsAssignHeaderEquip.Equip_DescA = $('#h_Equip_DescA').val();
        DetailsAssignHeaderEquip.Equip_DescE = $('#h_Equip_DescE').val();
        DetailsAssignHeaderEquip.HourCost = $('#h_EquipHourCost').val();
        DetailsAssignHeaderEquip.EstHours = $('#h_EquipEstHours').val();
        DetailsAssignHeaderEquip.WorkHours = $('#h_EquipWorkHours').val();
        DetailsAssignHeaderEquip.UnProdHours = $('#h_EquipUnProdHours').val();
        DetailsEquip.unshift(DetailsAssignHeaderEquip);
        BindDataGridEquip();
    }
    function txtTotalunProdHours_Change() {
        $('#h_EquipUnProdHours').val(txtTotalunProdHours.value);
        $('#h_UnProdHours').val(txtTotalunProdHours.value);
    }
    function btnSerchSchdule_Clicked() {
        debugger;
        sys.FindKey(Modules.ProductionEntry, "btnSerchSchdule", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode + " and Status = 1 and ScheduleId not in (select ScheduleId from p_tr_engproduction where status =0 and BraCode = " + _BranchCode + ")", function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getEngSchedule", ControllerName),
                data: { id: id },
                success: function (d) {
                    var result = d.result;
                    txtScheduleId.value = result.TrNo.toString();
                    if (_ScreenLanguage == "ar") {
                        //txtSchduleName.value = result.WorkDescr;
                        txtWorkDescr.value = result.WorkDescr;
                    }
                    else {
                        //txtSchduleName.value = result.WorkDescr;
                        txtWorkDescr.value = result.WorkDescr;
                    }
                    txtStartDate.value = DateFormat(result.StartDateTime);
                    var dd = TimeFormat(result.StartDateTime);
                    txtStarttime.value = TimeFormat(result.StartDateTime);
                    txtEndDate.value = DateFormat(result.EndDateTime);
                    txtEndTime.value = TimeFormat(result.EndDateTime);
                    schduleID = result.ScheduleId;
                    CalenderId = result.CalenderId;
                    $('#txtProj_DescE').val(result.Prj_ProjectCode);
                    $('#txtPhase_DescE').val(result.Phase_ProjectPhaseCode);
                    projectID = result.ProjectID;
                    projectPhaseID = result.ProjectPhaseId;
                    LoadAllDetails();
                }
            });
        });
    }
    //eslam
    function SerchSchdule_Changed() {
        debugger;
        var trno = Number(txtScheduleId.value);
        Ajax.CallAsync({
            url: Url.Action("getEngScheduleViewByNo", "FindByNo"),
            data: { trno: trno },
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                var result = d.result;
                txtScheduleId.value = result.TrNo.toString();
                if (_ScreenLanguage == "ar") {
                    //txtSchduleName.value = result.WorkDescr;
                    txtWorkDescr.value = result.WorkDescr;
                }
                else {
                    //txtSchduleName.value = result.WorkDescr;
                    txtWorkDescr.value = result.WorkDescr;
                }
                txtStartDate.value = DateFormat(result.StartDateTime);
                var dd = TimeFormat(result.StartDateTime);
                txtStarttime.value = TimeFormat(result.StartDateTime);
                txtEndDate.value = DateFormat(result.EndDateTime);
                txtEndTime.value = TimeFormat(result.EndDateTime);
                schduleID = result.ScheduleId;
                CalenderId = result.CalenderId;
                $('#txtProj_DescE').val(result.Prj_ProjectCode);
                $('#txtPhase_DescE').val(result.Phase_ProjectPhaseCode);
                projectID = result.ProjectID;
                projectPhaseID = result.ProjectPhaseId;
                LoadAllDetails();
            }
        });
    }
    function btnSearchTrNo_Clicked() {
        var condition = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.ProductionEntry, "btnSearchTrNo", condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getProduction", ControllerName),
                data: { id: id },
                success: function (d) {
                    MasterDetails = d.result;
                    Master = d.result;
                    var Index = GetIndexByUseId(Number(Master.ProductionId), "PQ_GetEngProduction", "ProductionId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }
    function SearchTrNo_onCahnged() {
        var condition = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        var trno = Number(txtTrNo.value);
        Ajax.CallAsync({
            url: Url.Action("getEngProductionViewByNo", "FindByNo"),
            data: { trno: trno },
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                Master = d.result;
                var Index = GetIndexByUseId(Number(Master.ProductionId), "PQ_GetEngProduction", "ProductionId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                NavigateToSearchResultKey(Number(Index), Navigate);
            }
        });
    }
    function btnSearchUnprodReasons_Clicked() {
        sys.FindKey(Modules.ProductionEntry, "btnSearchUnprodReasons", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getUnprodReasons", ControllerName),
                data: { id: id },
                success: function (d) {
                    var result = d.result;
                    txtUnp_ReasonCode.value = result.ReasonCode;
                    if (_ScreenLanguage == "ar") {
                        txtUnp_DescE.value = result.DescA;
                    }
                    else {
                        txtUnp_DescE.value = result.DescE;
                    }
                    reasonID = result.UnProdReasonId;
                }
            });
        });
    }
    function btnLoadActivity_Clicked() {
        // Load Details Normaly
        //GetProdActivity(Master.ProductionId);
        //GetProdLabor(Master.ProductionId);
        //GetProdEquipment(Master.ProductionId);
        // Load Details Using Stored Prosedures
    }
    function LoadAllDetails() {
        frm = txtStartDate.value + " " + txtStarttime.value;
        todate = txtEndDate.value + " " + txtEndTime.value;
        if (frm == " " || todate == " ") {
            WorningMessage("يجب ادخال التواريخ كاملة", "you Should Enter from and to date");
            return;
        }
        PProc_EngLoadProductionActivity();
        PProc_EngLoadProductionEquipment();
        PProc_EngLoadProductionLabor();
    }
    function PProc_EngLoadProductionActivity() {
        Ajax.Callsync({
            url: Url.Action("LoadProductionActivity", ControllerName),
            data: { id: schduleID },
            success: function (d) {
                var result = d.result;
                DetailsActivity = new Array();
                for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                    var item = result_1[_i];
                    var _Act = new PQ_GetEngproductionActivity();
                    _Act = item;
                    _Act.RemainQty = 0;
                    _Act.ActivityID = item.ActivityId;
                    DetailsActivity.push(_Act);
                }
                GridActivity.DataSource = DetailsActivity;
                GridActivity.Bind();
            }
        });
    }
    function PProc_EngLoadProductionEquipment() {
        Ajax.Callsync({
            url: Url.Action("LoadProductionEquipment", ControllerName),
            data: { id: schduleID, StartDateTime: frm, EndDatetime: todate },
            success: function (d) {
                DetailsEquip = d.result;
                if (txtTotalunProdHours.value != "" || txtTotalunProdHours.value != null) {
                    for (var _i = 0, DetailsEquip_2 = DetailsEquip; _i < DetailsEquip_2.length; _i++) {
                        var item = DetailsEquip_2[_i];
                        item.UnProdHours = Number(txtTotalunProdHours.value);
                    }
                }
                GridEquipment.DataSource = DetailsEquip;
                GridEquipment.Bind();
            }
        });
    }
    function PProc_EngLoadProductionLabor() {
        Ajax.Callsync({
            url: Url.Action("LoadProductionLabor", ControllerName),
            data: { id: schduleID, StartDateTime: frm, EndDatetime: todate },
            success: function (d) {
                debugger;
                DetailsLabor = d.result;
                if (txtTotalunProdHours.value != "" || txtTotalunProdHours.value != null) {
                    for (var _i = 0, DetailsLabor_2 = DetailsLabor; _i < DetailsLabor_2.length; _i++) {
                        var item = DetailsLabor_2[_i];
                        item.UnProdHours = Number(txtTotalunProdHours.value);
                    }
                }
                GridLabor.DataSource = DetailsLabor;
                GridLabor.Bind();
            }
        });
    }
    function ProductionAuthorize_Clicked() {
        if (DetailsActivity.length == 0 || DetailsLabor.length == 0) {
            WorningMessage("يجب ادخال انشطة و عمال ", "Can not accept feeding without activities / or wothout Labours ");
            return;
        }
        _authorizeStatus = 1;
        $("#btnAutohrize").attr("disabled", "disabled");
        run_waitMe();
        Update();
        Ajax.Callsync({
            url: Url.Action("ProductionAuthorize", ControllerName),
            data: { id: Master.ProductionId },
            success: function (d) {
                var result = d.result;
            }
        });
        Display();
    }
    function btnunauthorized_onclick() {
        _authorizeStatus = 2;
        $("#btnunauthorized").attr("disabled", "disabled");
        $("#btnunauthorized").css('backgroundColor', '#0B6D8A');
        run_waitMe();
        Update();
        Ajax.Callsync({
            url: Url.Action("ProductionAuthorize", ControllerName),
            data: { id: Master.ProductionId },
            success: function (d) {
                var result = d.result;
            }
        });
    }
    function GetSchduleTrNo(schduleId) {
        Ajax.CallAsync({
            url: Url.Action("GetSchduleTrNo", ControllerName),
            data: { id: schduleId },
            success: function (d) {
                var result = d.result;
                txtScheduleId.value = result.TrNo.toString();
            }
        });
    }
    function btnCalcHours_Clicked() {
        if (CalenderId == 0) {
            WorningMessage("يجب اختيار جدول عمل اولا", "you should select schedule");
            return;
        }
        var frm = txtStartDate.value + " " + txtStarttime.value;
        var todate = txtEndDate.value + " " + txtEndTime.value;
        var clcid = CalenderId.toString(); //Master.CalenderId.toString(); //currentCalId.toString();
        Ajax.CallAsync({
            url: Url.Action("GetHourProd", "WorkSchedule"),
            data: { from: frm, to: todate, calcId: clcid },
            success: function (d) {
                var result = d.result;
                txtWorkHours.value = result;
            }
        });
    }
})(OnProductionEntry || (OnProductionEntry = {}));
//# sourceMappingURL=OnProductionEntry.js.map