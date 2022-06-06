$(document).ready(() => {
    OnProductionEntry.InitalizeComponent();
});
namespace OnProductionEntry {
    const ControllerName: string = "OpProductionEntry";
    const GridInputClassName = "form-control gridIput";
    var columnWidth: string = "100px";
    const NumberColumnWidth = "50px";
    var sys: SystemTools = new SystemTools();
    var GridActivity: JsGrid = new JsGrid();
    var GridEquipment: JsGrid = new JsGrid();
    var GridLabor: JsGrid = new JsGrid();
    var itmID: number = 0;
    var ProductionActivId: number = 0;
    var activeID: number = 0;
    var LaborID: number = 0;
    var equipID: number = 0;
    var reasonID: number = 0;
    var schduleID: number = 0;
    var CalenderId: number = 0;
    var projectID: number = 0;
    var projectPhaseID: number = 0;
    //var calenderID: number = 0;
    var schdId: number = 0;
    var schdActId: number = 0;
    var projPhaseItmId: number = 0;

    var _ScreenLanguage: string;
    var _CompCode: string;
    var _BranchCode: string;
    var frm: string;
    var todate: string;
    var Hourcost: number; 
    var ProdLaborID: number = 0; 
    let _authorizeStatus: number = 3;//1 = stats authorize true //2 = stats Unauthorize false // 3 = Master.status

    class M_D_Productions {
        public sessionRecord: SessionRecord = new SessionRecord();
        public P_Tr_EngProduction: P_Tr_EngProduction = new P_Tr_EngProduction();
        public P_TR_EngProductionActiv: Array<P_TR_EngProductionActiv>;
        public P_TR_EngProductionEquip: Array<P_TR_EngProductionEquip>;
        public P_TR_EngProductionLabour: Array<P_TR_EngProductionLabour>;
    }
    var MasterDetails: M_D_Productions = new M_D_Productions();
    var Master: PQ_GetEngProduction = new PQ_GetEngProduction();

    var ActivityDataSource: Array<PQ_GetEngproductionActivity> = new Array<PQ_GetEngproductionActivity>();
    var DetailsActivity: Array<PQ_GetEngproductionActivity> = new Array<PQ_GetEngproductionActivity>();
    var DetailsAssignHeaderActivity: PQ_GetEngproductionActivity = new PQ_GetEngproductionActivity();
    var Tbl_DetailActivity: Array<P_TR_EngProductionActiv> = new Array<P_TR_EngProductionActiv>();

    var EquipDataSource: Array<PQ_GetEngProductionEquipment> = new Array<PQ_GetEngProductionEquipment>();
    var DetailsEquip: Array<PQ_GetEngProductionEquipment> = new Array<PQ_GetEngProductionEquipment>();
    var DetailsAssignHeaderEquip: PQ_GetEngProductionEquipment = new PQ_GetEngProductionEquipment();
    var Tbl_DetailEquip: Array<P_TR_EngProductionEquip> = new Array<P_TR_EngProductionEquip>();

    var LaborDataSource: Array<PQ_GetEngProductionLabour> = new Array<PQ_GetEngProductionLabour>();
    var DetailsLabor: Array<PQ_GetEngProductionLabour> = new Array<PQ_GetEngProductionLabour>();
    var DetailsAssignHeaderLabor: PQ_GetEngProductionLabour = new PQ_GetEngProductionLabour();
    var Tbl_DetailLabor: Array<P_TR_EngProductionLabour> = new Array<P_TR_EngProductionLabour>();

    var txtTrNo: HTMLInputElement;
    var txtTrDate: HTMLInputElement;
    var txtScheduleId: HTMLInputElement;
    var txtSchduleName: HTMLInputElement;
    var txtWorkDescr: HTMLInputElement;
    var txtProj_DescE: HTMLInputElement;
    var txtPhase_DescE: HTMLInputElement;
    var txtUnp_ReasonCode: HTMLInputElement;
    var txtUnp_DescE: HTMLInputElement;
    var txtStarttime: HTMLInputElement;
    var txtStartDate: HTMLInputElement;
    var txtEndTime: HTMLInputElement;
    var txtEndDate: HTMLInputElement;
    var txtWorkHours: HTMLInputElement;
    var txtTotalunProdHours: HTMLInputElement;
    var ChkStatus: HTMLInputElement;

    var btnSearchTrNo: HTMLButtonElement;
    var btnSerchSchdule: HTMLButtonElement;
    var btnSearchUnprodReasons: HTMLButtonElement;
    var btnAutohrize: HTMLButtonElement;
    var btnunauthorized: HTMLButtonElement;
    var btnLoadActivity: HTMLButtonElement;
    var ChkIsCloseScheduel: HTMLInputElement;
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
        ControlsButtons.PrintAction(() => { pOnProductionEntry(); });
        InitalizeGrid();
        $("#ImageEditorButton").on("click", () => {

            sys.ImgPopup(_CompCode, _BranchCode, Modules.OpProductionEntry, Master.ProductionId.toString());
        });
    }

    function InitalizeGrid() {
        // Grid Activity
        let res: any = GetResourceList("Prod_");
        GridActivity.ElementName = "GridProductionActivity";
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
                title: res.Prod_Item, name: "Itm_Code", width: "19.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Itm_Code", " ");
                    txt.id = "h_Itm_Code"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Item, txt);
                }
            },
            {
                title: res.Prod_ActCode, name: "Act_Code", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Act_Code", " ");
                    txt.id = "h_Act_Code"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_ActCode, txt);
                }
            },
            {
                title: res.work_ActivityName, visible: _ScreenLanguage == "ar", name: "Act_DescA", width: "25.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Act_DescA", " ");
                    txt.id = "h_Act_DescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.work_ActivityName, txt);
                }
            },
            {
                title: res.Prod_ActivityName, visible: _ScreenLanguage == "en", name: "Act_DescE", width: "20.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Act_DescE", " ");
                    txt.id = "h_Act_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_ActivityName, txt);
                }
            },
            {
                title: res.Prod_ScheduleQty, name: "schAct_SchedQty", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "schAct_SchedQty", " ");
                    txt.id = "h_schAct_SchedQty"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_ScheduleQty, txt);
                }
            },
            {
                title: res.Prod_ProdBeforeQty, name: "ProdBeforeQty", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ProdBeforeQty", " ");
                    txt.id = "h_ProdBeforeQty"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_ProdBeforeQty, txt);
                }
            },
            {
                title: res.Prod_FinishQty, name: "FinishQty", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "FinishQty", " ");
                    txt.id = "h_FinishQty"
                    txt.onkeyup = (e) => {
                        Calculation();
                    }
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Prod_FinishQty, txt);
                }
            },
            {
                title: res.Prod_RemainQty, name: "RemainQty", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "RemainQty", " ");
                    txt.id = "h_RemainQty"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_RemainQty, txt);
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
                itemTemplate: (s: string, item: PQ_GetEngproductionActivity): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.type = "button";
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
                itemTemplate: (s: string, item: PQ_GetEngproductionActivity): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.type = "button";
                    btn.name = DetailsActivity.indexOf(item).toString();
                    btn.onclick = (e) => {
                        //edit
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
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
        GridLabor.OnRefreshed = () => {
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
        GridLabor.OnItemInserting = () => { };
        GridLabor.OnItemUpdating = () => { };
        GridLabor.OnItemDeleting = () => { };
        GridLabor.Columns = [
            {
                title: res.Prod_Lab_Code, name: "Lab_Code", width: "10%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Lab_Code", " ");
                    txt.id = "h_Lab_Code"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Lab_Code, txt);
                }
            },
            {
                title: res.Prod_Lab_DescA, visible: _ScreenLanguage == "ar", name: "Lab_DescA", width: "15.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Lab_DescA", " ");
                    txt.id = "h_Lab_DescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Lab_DescA, txt);
                }
            },
            {
                title: res.Prod_Lab_DescA, visible: _ScreenLanguage == "en", name: "Lab_DescE", width: "15.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Lab_DescE", " ");
                    txt.id = "h_Lab_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Lab_DescA, txt);
                }
            },
            {
                title: res.Prod_Class_Code, name: "Class_Code", width: "15.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Class_Code", " ");
                    txt.id = "h_Class_Code"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Class_Code, txt);
                }
            },
            {
                title: res.Prod_Class_DescA, visible: _ScreenLanguage == "ar", name: "Class_DescA", width: "15.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Class_DescA", " ");
                    txt.id = "h_Class_DescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Class_DescA, txt);
                }
            },
            {
                title: res.Prod_Class_DescA, visible: _ScreenLanguage == "en", name: "Class_DescE", width: "15.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Class_DescE", " ");
                    txt.id = "h_Class_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Class_DescA, txt);
                }
            },
            {
                title: res.Prod_EstHours, name: "EstHours", width: "10%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "EstHours", " ");
                    txt.id = "h_EstHours"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_EstHours, txt);
                }
            },
            {
                title: res.Prod_WorkHours, name: "WorkHours", width: "10%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "WorkHours", " ");
                    txt.id = "h_WorkHours"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Prod_WorkHours, txt);
                }
            },
            {
                title: res.Prod_UnProdHours, name: "UnProdHours", width: "10%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "UnProdHours", " ");
                    txt.id = "h_UnProdHours"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Prod_UnProdHours, txt);
                }
            }
            ,
            {
                title: "#", name: "btnAddItem", visible: true, width: NumberColumnWidth,
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton;
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemLaborGrid";
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }

                        btnAddItemLaborGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GetEngProductionLabour): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.name = DetailsLabor.indexOf(item).toString();
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsLabor.splice(index, 1);
                        BindDataGridLabor();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            }
            ,
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: (s: string, item: PQ_GetEngProductionLabour): HTMLButtonElement => {

                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.type = "button";
                    btn.name = DetailsLabor.indexOf(item).toString();
                    btn.onclick = (e) => {

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
                        
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
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
        GridEquipment.OnRefreshed = () => {
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
        GridEquipment.OnItemInserting = () => { };
        GridEquipment.OnItemUpdating = () => { };
        GridEquipment.OnItemDeleting = () => { };
        GridEquipment.Columns = [
            {
                title: res.Prod_Equip_Code, name: "Equip_Code", width: "10%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Equip_Code", " ");
                    txt.id = "h_Equip_Code"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Equip_Code, txt);
                }
            },
            {
                title: res.Prod_Equip_Desc, visible: _ScreenLanguage == "ar", name: "Equip_DescA", width: "15.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Equip_DescA", " ");
                    txt.id = "h_Equip_DescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Equip_Desc, txt);
                }
            },
            {
                title: res.Prod_Equip_Desc, visible: _ScreenLanguage == "en", name: "Equip_DescE", width: "15.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Equip_DescE", " ");
                    txt.id = "h_Equip_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_Equip_Desc, txt);
                }
            },
            {
                title: res.Prod_HourCost, name: "HourCost", width: "10%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "HourCost", " ");
                    txt.id = "h_EquipHourCost"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_HourCost, txt);
                }
            },
            {
                title: res.Prod_EstHours, name: "EstHours", width: "10%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "EstHours", " ");
                    txt.id = "h_EquipEstHours"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Prod_EstHours, txt);
                }
            },
            {
                title: res.Prod_WorkHours, name: "WorkHours", width: "10%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "WorkHours", " ");
                    txt.id = "h_EquipWorkHours"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Prod_WorkHours, txt);
                }
            },
            {
                title: res.Prod_UnProdHours, name: "UnProdHours", width: "10%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "UnProdHours", " ");
                    txt.id = "h_EquipUnProdHours"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Prod_UnProdHours, txt);
                }
            }
            ,
            {
                title: "#", name: "btnAddItem", visible: true, width: NumberColumnWidth,
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton;
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemEquipGrid";
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }

                        btnAddItemEquipGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GetEngProductionEquipment): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.name = DetailsEquip.indexOf(item).toString();
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsEquip.splice(index, 1);
                        BindDataGridEquip();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            }
            ,
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: (s: string, item: PQ_GetEngProductionEquipment): HTMLButtonElement => {

                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.type = "button";
                    btn.name = DetailsEquip.indexOf(item).toString();
                    btn.onclick = (e) => {

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

                        let index = Number((e.currentTarget as HTMLButtonElement).name);
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
                        $("#h_EquipEstHours").val(item.EstHours);//--
                        $("#h_EquipWorkHours").val(item.WorkHours);//--
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
        txtTrNo = DocumentActions.GetElementById<HTMLInputElement>("txtTrNo");
        txtTrDate = DocumentActions.GetElementById<HTMLInputElement>("txtTrDate");
        txtScheduleId = DocumentActions.GetElementById<HTMLInputElement>("txtScheduleId");
        txtSchduleName = DocumentActions.GetElementById<HTMLInputElement>("txtSchduleName");
        txtWorkDescr = DocumentActions.GetElementById<HTMLInputElement>("txtWorkDescr");
        txtProj_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtProj_DescE");
        txtPhase_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtPhase_DescE");
        txtUnp_ReasonCode = DocumentActions.GetElementById<HTMLInputElement>("txtUnp_ReasonCode");
        txtUnp_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtUnp_DescE");
        txtStarttime = DocumentActions.GetElementById<HTMLInputElement>("txtStarttime");
        txtStartDate = DocumentActions.GetElementById<HTMLInputElement>("txtStartDate");
        txtEndTime = DocumentActions.GetElementById<HTMLInputElement>("txtEndTime");
        txtEndDate = DocumentActions.GetElementById<HTMLInputElement>("txtEndDate");
        txtWorkHours = DocumentActions.GetElementById<HTMLInputElement>("txtWorkHours");
        txtTotalunProdHours = DocumentActions.GetElementById<HTMLInputElement>("txtTotalunProdHours");
        btnSearchTrNo = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchTrNo");
        btnSerchSchdule = DocumentActions.GetElementById<HTMLButtonElement>("btnSerchSchdule");
        btnSearchUnprodReasons = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchUnprodReasons");
        btnAutohrize = DocumentActions.GetElementById<HTMLButtonElement>("btnAutohrize");
        btnunauthorized = DocumentActions.GetElementById<HTMLButtonElement>("btnunauthorized");
        btnLoadActivity = DocumentActions.GetElementById<HTMLButtonElement>("btnLoadActivity");
        ChkIsCloseScheduel = DocumentActions.GetElementById<HTMLInputElement>("ChkIsCloseScheduel");
        ChkStatus = DocumentActions.GetElementById<HTMLInputElement>("ChkStatus");
        btnCalcHours = DocumentActions.GetElementById<HTMLButtonElement>("btnCalcHours");
    }

    function InitalizeEvents() {
        txtScheduleId.onchange = SerchSchdule_Changed;
        txtTrNo.onchange = SearchTrNo_onCahnged;
        txtTotalunProdHours.onkeyup = txtTotalunProdHours_Change;
        btnSerchSchdule.onclick = btnSerchSchdule_Clicked;
        btnSearchUnprodReasons.onclick = btnSearchUnprodReasons_Clicked;
        btnAutohrize.onclick = ProductionAuthorize_Clicked;
        btnunauthorized.onclick = btnunauthorized_onclick;
        btnLoadActivity.onclick = LoadAllDetails;//PProc_EngLoadProductionActivity;
        btnSearchTrNo.onclick = btnSearchTrNo_Clicked;
        btnCalcHours.onclick = btnCalcHours_Clicked;
    }

    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {
                debugger;
                Master = d.result as PQ_GetEngProduction;
                Display();
            }
        })
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
        debugger
        if (Master.Sc_Status == 1 && Master.Status == 1 && SharedSession.CurrentPrivileges.CUSTOM2 == true) {
            $("#btnunauthorized").removeAttr("disabled");
            $("#btnunauthorized").css('cursor', 'pointer');
            $("#btnunauthorized").css('backgroundColor', 'red');
        } else {
            $("#btnunauthorized").attr("disabled", "disabled");
            $("#btnunauthorized").css('backgroundColor', '#0B6D8A');

        }

        if (Master.Status == 0 && Master.Sc_Status == 1) {
            $("#EditButton").removeAttr("disabled");
            
        }
        else {
            $("#EditButton").attr("disabled", "disabled")
            
        }
        if (Master.Sc_Status == 1) 
            $("#effects").css('backgroundColor', '#FFFFFF');
        else 
            $("#effects").css('backgroundColor', '#E2E6E6');
    }

    function Assign() {
        //AssignMaster
        DocumentActions.AssignToModel<P_Tr_EngProduction>(Master);
        Master.StartDateTime = DateTimeFormat($("#txtStartDate").val() + " " + $("#txtStarttime").val());
        Master.EndDateTime = DateTimeFormat($("#txtEndDate").val() + " " + $("#txtEndTime").val());
        MasterDetails.P_Tr_EngProduction = Master as P_Tr_EngProduction;
        MasterDetails.P_Tr_EngProduction.ProductionId = Master.ProductionId;;

        //AssignDetails
        MasterDetails.P_TR_EngProductionActiv = DetailsActivity as Array<PQ_GetEngproductionActivity>;
        for (var Act of DetailsActivity) {
            Act.ProductionId = Master.ProductionId;
            Tbl_DetailActivity.push(Act);
        }

        MasterDetails.P_TR_EngProductionEquip = DetailsEquip as Array<PQ_GetEngProductionEquipment>;
        for (var equip of DetailsEquip) {
            equip.ProductionId = Master.ProductionId;
            //test
            Tbl_DetailEquip.push(equip);
        }
        debugger
        MasterDetails.P_TR_EngProductionLabour = DetailsLabor as Array<PQ_GetEngProductionLabour>;
        for (var labor of DetailsLabor) {
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
        ClearGrid(GridActivity, new Array<PQ_GetEngproductionActivity>());
        ClearGrid(GridEquipment, new Array<PQ_GetEngProductionEquipment>());
        ClearGrid(GridLabor, new Array<PQ_GetEngProductionLabour>());
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
        debugger
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
        var session: SessionRecord = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        debugger
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_Tr_EngProduction", "InsertMasterDetail"),
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
                        let _Index = GetIndexByUseId(result.Response, "PQ_GetEngProduction", "ProductionId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
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
        var session: SessionRecord = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        if (_authorizeStatus == 1) {
            MasterDetails.P_Tr_EngProduction.Status = 1;
            Master.Status = 1;
        } else if (_authorizeStatus == 2) {
            MasterDetails.P_Tr_EngProduction.Status = 2;
            Master.Status = 2;
        } else {
            MasterDetails.P_Tr_EngProduction.Status = 0;
            Master.Status = 0;
        }

        debugger
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_Tr_EngProduction", "UpdateMasterDetail"),
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
                        _authorizeStatus = 0;
                        let _Index = GetIndexByUseId(result.Response, "PQ_GetEngProduction", "ProductionId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
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
            $("#btnAutohrize").removeAttr("disabled")

        } else {
            $("#btnAutohrize").attr("disabled", "disabled");
        }
    }

    function Undo() {

    }

    function pOnProductionEntry() {

        Ajax.CallAsync({
            url: Url.Action("printOpProductionEntry", "PrintTransaction"),
            data: { TrNo: Number(Master.ProductionId) },
            success: (d) => {
                let url = d.result as string;
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

    function FillInputText(_TextID: string, _Data: string) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }

    function GetProdActivity(id: number) {

        Ajax.CallAsync({
            url: Url.Action("GetProdActivity", ControllerName),
            data: { id: id },
            success: (d) => {

                DetailsActivity = d.result as Array<PQ_GetEngproductionActivity>;
                GridActivity.DataSource = DetailsActivity;
                GridActivity.Bind();
            }
        });
    }

    function GetProdEquipment(id: number) {

        Ajax.CallAsync({
            url: Url.Action("GetProdEquipment", ControllerName),
            data: { id: id },
            success: (d) => {

                DetailsEquip = d.result as Array<PQ_GetEngProductionEquipment>;
                GridEquipment.DataSource = DetailsEquip;
                GridEquipment.Bind();
                txtTotalunProdHours_Change();
            }
        });
    }

    function GetProdLabor(id: number) {

        Ajax.CallAsync({
            url: Url.Action("GetProdLabor", ControllerName),
            data: { id: id },
            success: (d) => {

                DetailsLabor = d.result as Array<PQ_GetEngProductionLabour>;
                GridLabor.DataSource = DetailsLabor;
                GridLabor.Bind();
            }
        });
    }

    function Calculation() {
        let result: number = 0;
        result = (Number($('#h_schAct_SchedQty').val()) - Number($('#h_FinishQty').val()) - Number($('#h_ProdBeforeQty').val()));
        $('#h_RemainQty').val(result);
    }

    function AddItemInActivityGrid() {
        DetailsAssignHeaderActivity = new PQ_GetEngproductionActivity();

        let code = $('#h_Itm_Code').val();
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
        let _UnProd: number = Number($("#h_UnProdHours").val());
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

        let _UnProd: number = Number($("#h_EquipUnProdHours").val());
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
        sys.FindKey(Modules.ProductionEntry, "btnSerchSchdule", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode + " and Status = 1 and ScheduleId not in (select ScheduleId from p_tr_engproduction where status =0 and BraCode = " + _BranchCode + ")", () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getEngSchedule", ControllerName),
                data: { id: id },
                success: (d) => {
                    let result = d.result as PQ_GetEngWorkSchdule;
                    txtScheduleId.value = result.TrNo.toString();
                    if (_ScreenLanguage == "ar") {
                        //txtSchduleName.value = result.WorkDescr;
                        txtWorkDescr.value = result.WorkDescr;
                    } else {
                        //txtSchduleName.value = result.WorkDescr;
                        txtWorkDescr.value = result.WorkDescr;
                    }

                    txtStartDate.value = DateFormat(result.StartDateTime);
                    let dd = TimeFormat(result.StartDateTime);
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
                success: (d) => {


                    if (IsNullOrEmpty(d.result)) {
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");

                    }
                    let result = d.result as PQ_GetEngWorkSchdule;
                    txtScheduleId.value = result.TrNo.toString();
                    if (_ScreenLanguage == "ar") {
                        //txtSchduleName.value = result.WorkDescr;
                        txtWorkDescr.value = result.WorkDescr;
                    } else {
                        //txtSchduleName.value = result.WorkDescr;
                        txtWorkDescr.value = result.WorkDescr;
                    }

                    txtStartDate.value = DateFormat(result.StartDateTime);
                    let dd = TimeFormat(result.StartDateTime);
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
        let condition = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.ProductionEntry, "btnSearchTrNo", condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getProduction", ControllerName),
                data: { id: id },
                success: (d) => {
                    MasterDetails = d.result as M_D_Productions;
                    Master = d.result as PQ_GetEngProduction;
                    let Index = GetIndexByUseId(Number(Master.ProductionId), "PQ_GetEngProduction", "ProductionId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }
    function SearchTrNo_onCahnged() {
        let condition = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        var trno = Number(txtTrNo.value);
            Ajax.CallAsync({
                url: Url.Action("getEngProductionViewByNo", "FindByNo"),
                data: { trno: trno },
                success: (d) => {

                    if (IsNullOrEmpty(d.result)) {
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");

                    }
                    Master = d.result as PQ_GetEngProduction;
                    let Index = GetIndexByUseId(Number(Master.ProductionId), "PQ_GetEngProduction", "ProductionId", "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
       
    }

    function btnSearchUnprodReasons_Clicked() {

        sys.FindKey(Modules.ProductionEntry, "btnSearchUnprodReasons", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getUnprodReasons", ControllerName),
                data: { id: id },
                success: (d) => {
                    let result = d.result as P_D_UnProdReason;
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
            success: (d) => {
                let result = d.result;
                DetailsActivity = new Array<PQ_GetEngproductionActivity>();
                for (var item of result) {
                    let _Act: PQ_GetEngproductionActivity = new PQ_GetEngproductionActivity();
                    _Act = item as PQ_GetEngproductionActivity;
                    _Act.RemainQty = 0;
                    _Act.ActivityID = item.ActivityId;
                    DetailsActivity.push(_Act);
                }
                GridActivity.DataSource = DetailsActivity;
                GridActivity.Bind();
            }
        })
    }

    function PProc_EngLoadProductionEquipment() {

        Ajax.Callsync({
            url: Url.Action("LoadProductionEquipment", ControllerName),
            data: { id: schduleID, StartDateTime: frm, EndDatetime: todate },
            success: (d) => {

                DetailsEquip = d.result as Array<PQ_GetEngProductionEquipment>;
                if (txtTotalunProdHours.value != "" || txtTotalunProdHours.value != null) {
                    for (var item of DetailsEquip) {
                        item.UnProdHours = Number(txtTotalunProdHours.value);
                    }
                }
                GridEquipment.DataSource = DetailsEquip;
                GridEquipment.Bind();
            }
        })
    }

    function PProc_EngLoadProductionLabor() {

        Ajax.Callsync({
            url: Url.Action("LoadProductionLabor", ControllerName),
            data: { id: schduleID, StartDateTime: frm, EndDatetime: todate },
            success: (d) => {
                debugger
                DetailsLabor = d.result as Array<PQ_GetEngProductionLabour>;
                if (txtTotalunProdHours.value != "" || txtTotalunProdHours.value != null) {
                    for (var item of DetailsLabor) {
                        item.UnProdHours = Number(txtTotalunProdHours.value);
                    }
                }
                GridLabor.DataSource = DetailsLabor;
                GridLabor.Bind();
            }
        })
    }

    function ProductionAuthorize_Clicked() {
        if (DetailsActivity.length == 0 || DetailsLabor.length == 0) {
            WorningMessage("يجب ادخال انشطة و عمال ", "Can not accept feeding without activities / or wothout Labours ")
             
            return; 
        }
        _authorizeStatus = 1;
        $("#btnAutohrize").attr("disabled", "disabled");
        run_waitMe();
        Update();
        Ajax.Callsync({
            url: Url.Action("ProductionAuthorize", ControllerName),
            data: { id: Master.ProductionId },
            success: (d) => {
                let result = d.result as string;
            }
        })
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
            success: (d) => {
                let result = d.result as string;
            }
        })

    }

    function GetSchduleTrNo(schduleId: number) {

        Ajax.CallAsync({
            url: Url.Action("GetSchduleTrNo", ControllerName),
            data: { id: schduleId },
            success: (d) => {


                let result = d.result as P_TR_EngSchedule;
                txtScheduleId.value = result.TrNo.toString();
            }
        })
    }

    function btnCalcHours_Clicked() {

        if (CalenderId == 0) {
            WorningMessage("يجب اختيار جدول عمل اولا", "you should select schedule");
            return;
        }
        let frm: string = txtStartDate.value + " " + txtStarttime.value;
        let todate: string = txtEndDate.value + " " + txtEndTime.value;
        let clcid: string = CalenderId.toString(); //Master.CalenderId.toString(); //currentCalId.toString();
        Ajax.CallAsync({
            url: Url.Action("GetHourProd", "WorkSchedule"),
            data: { from: frm, to: todate, calcId: clcid },
            success: (d) => {

                let result = d.result as string;
                txtWorkHours.value = result;
            }
        });
    }
}