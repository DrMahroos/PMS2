$(document).ready(() => {
    ProjectMasterPlan.InitalizeComponent();
});
namespace ProjectMasterPlan {
    const ControllerName: string = "ProjectMasterPlan";
    const TableName: string = "P_TR_EngProject";
    const FieldKey: string = "ProjectID";
    const JsGridcombobox: string = "combobox";
    const GridInputClassName = "form-control";
    const NumberColumnWidth = "50px";
    var columnWidth: string = "100px";

    var Master: P_TR_EngProject = new P_TR_EngProject();

    //  var MasterDetails: M_D_EngSpcDetails = new M_D_EngSpcDetails();
    var MasterDetails: M_D_EngDefDetails = new M_D_EngDefDetails();
    var MasterDetailsView: M_D_EngSpcDetailsView = new M_D_EngSpcDetailsView();

    var DataSourcePhase: Array<PQ_GetEngProjectPhase> = new Array<PQ_GetEngProjectPhase>();
    var PhaseObject: PQ_GetEngProjectPhase = new PQ_GetEngProjectPhase();
    var DataSourcItem: Array<PQ_GetEngProjectItem> = new Array<PQ_GetEngProjectItem>();
    var ItemObject: PQ_GetEngProjectItem = new PQ_GetEngProjectItem();
    var DataSourcActivity: Array<PQ_GetEngProjectActivity> = new Array<PQ_GetEngProjectActivity>();
    var ActivityObject: PQ_GetEngProjectActivity = new PQ_GetEngProjectActivity();

    var GridPhase: JsGrid = new JsGrid();
    var GridItem: JsGrid = new JsGrid();
    var GridActivity: JsGrid = new JsGrid();

    var _ScreenLanguage: string;
    var _CompCode: string;
    var _BranchCode: string;

    var sys: SystemTools = new SystemTools();
    var txtProjID: HTMLInputElement;
    var txtCalenderID: HTMLInputElement;

    var txtProjectCode: HTMLInputElement;
    var txtDescA: HTMLInputElement;
    var txtCalendercode: HTMLInputElement;
    var txtCalDescA: HTMLInputElement;
    var txtPhaseCode: HTMLInputElement;
    var txtBreakingStartTime: HTMLInputElement;
    var txtItemCode: HTMLInputElement;
    var txtBreakingEnd: HTMLInputElement;
    var txtStartDate: HTMLInputElement;
    var txtEndDate: HTMLInputElement;
    var btnProjectCode: HTMLButtonElement;
    var btnExportToExcel: HTMLButtonElement;
    var btnDraw: HTMLButtonElement;

    var btnPhases: HTMLButtonElement;
    var btnItems: HTMLButtonElement;
    var _Valid = [
        {
            Name_Ar: " البدايه الى البدايه",
            Name_En: "SS",
            Id: 1
        },
        {
            Name_Ar: "البدايه الى النهايه",
            Name_En: "SF",
            Id: 2
        },
        {
            Name_Ar: "النهايه الى اليدايه",
            Name_En: "FS",
            Id: 3
        },
        {
            Name_Ar: " النهايه الى النهايه",
            Name_En: "FF",
            Id: 4
        }
    ];
    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();

        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

        InitalizeControls();
        InitalizeEvents();
        InitalizeGrid();

        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.EditAction(Edit);
        ControlsButtons.SaveAction(() => {
            debugger
            if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();

        });
        ControlsButtons.UndoAction(() => { });
        ControlsButtons.PrintAction(() => { });
        $("#ImageEditorButton").on("click", () => {

            sys.ImgPopup(_CompCode, _BranchCode, Modules.ProjectMasterPlan, Master.ProjectID.toString());
        });
    }

    function InitalizeControls() {
        txtProjID = DocumentActions.GetElementById<HTMLInputElement>("txtProjID");
        txtProjectCode = document.getElementById("txtProjectCode") as HTMLInputElement;
        txtDescA = document.getElementById("txtDescA") as HTMLInputElement;
        txtPhaseCode = document.getElementById("txtPhaseCode") as HTMLInputElement;
        txtBreakingStartTime = document.getElementById("txtBreakingStartTime") as HTMLInputElement;
        txtItemCode = document.getElementById("txtItemCode") as HTMLInputElement;
        txtBreakingEnd = document.getElementById("txtBreakingEnd") as HTMLInputElement;
        txtStartDate = document.getElementById("txtStartDate") as HTMLInputElement;
        txtEndDate = document.getElementById("txtEndDate") as HTMLInputElement;
        btnProjectCode = document.getElementById("btnProjectCode") as HTMLButtonElement;
        btnExportToExcel = document.getElementById("btnExportToExcel") as HTMLButtonElement;
        btnDraw = document.getElementById("btnDraw") as HTMLButtonElement;
        btnPhases = DocumentActions.GetElementById<HTMLButtonElement>("btnPhases");
        btnItems = DocumentActions.GetElementById<HTMLButtonElement>("btnItems");
    }

    function InitalizeEvents() {
        btnProjectCode.onclick = btnProjectCode_onclick;
        txtProjectCode.onchange = ProjectCode_onChange ;

        //  btnCalendercode.onclick = btnCalendercode_onclick;
        //btnExportToExcel.onclick = btnExportToExcel_onclick;
        //btnDraw.onclick = btnDraw_onclick;
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("Project_eng");
        GridPhase.ElementName = "GridPhase";
        GridPhase.OnRefreshed = () => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridPhase.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridPhase.InsertionMode = JsGridInsertionMode.Internal;
        GridPhase.OnRowDoubleClicked = ItemOnRowDoubleClicked;
        GridPhase.OnItemEditing = EditGrid;
        GridPhase.OnItemUpdating = EditGrid;
        GridPhase.Columns = [
            {
                title: res.Project_eng_phaseno, css: "ColumPadding", name: "ProjectPhaseCode", width: "10%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ProjectPhaseCode", " ");
                    txt.className = GridInputClassName;
                    txt.disabled = true;
                    txt.id = "h_ProjectPhaseCode";
                    return HeaderTemplateNew(res.Project_eng_phaseno, txt);
                }
            },
            {
                title: res.Project_eng_PhaseDesc, css: "ColumPadding", name: "DescL", width: "17.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescL", " ");
                    txt.className = GridInputClassName;
                    txt.disabled = true;
                    txt.id = "h_DescL";
                    return HeaderTemplateNew(res.Project_eng_PhaseDesc, txt);
                }
            },
            {
                title: res.Project_eng_Relationphase, css: "ColumPadding", name: "RelProjectPhaseId", width: "10.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "RelProjectPhaseId", " ");
                    txt.className = GridInputClassName;
                    txt.disabled = true;
                    txt.id = "h_RelProjectPhaseId";
                    return HeaderTemplateNew(res.Project_eng_Relationphase, txt);
                }
            },
            //{
            //    title: res.Project_eng_Lag, css: "ColumPadding", name: "RelationDelay", width: "7%",
            //    headerTemplate: (): HTMLElement => {
            //        let txt = CreateElement("text", GridInputClassName, " ", " ", "RelationDelay", " ");
            //        txt.className = GridInputClassName;
            //        txt.id = "h_RelationDelay";
            //        return HeaderTemplateNew(res.Project_eng_Lag, txt);
            //    }
            //},
            {
                title: res.Project_eng_Duration, css: "ColumPadding", name: "Deuration", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Deuration", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_Deuration";
                    return HeaderTemplateNew(res.Project_eng_Duration, txt);
                }
            },
            {
                title: res.Project_eng_StartDate, css: "ColumPadding", name: "StartDate", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("datetime-local", GridInputClassName, " ", " ", "StartDate", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_StartDate";
                    return HeaderTemplateNew(res.Project_eng_StartDate, txt);
                }
            },
            {
                title: res.Project_eng_EndDate, css: "ColumPadding", name: "EndDate", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("datetime-local", GridInputClassName, " ", " ", "EndDate", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_EndDate";
                    return HeaderTemplateNew(res.Project_eng_EndDate, txt);
                }
            },
            {
                title: "#", name: "btnAddItem", width: NumberColumnWidth,
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton;//+ " addable editable";
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnGridPhase";
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "please select edit mode first");
                            return;
                        }
                        AddPhaseGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GetEngProjectPhase): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "20px";
                    btn.type = "button";
                    btn.style.color = "forestgreen";
                    btn.name = DataSourcePhase.indexOf(item).toString();
                    btn.onclick = (e) => {
                        //edit phase
                        debugger
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "please select edit mode first");
                            return;
                        }

                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DataSourcePhase.splice(index, 1);
                        GridPhase.DataSource = DataSourcePhase;
                        GridPhase.Bind();
                        debugger
                        PhaseObject = new PQ_GetEngProjectPhase();
                        PhaseObject = item as PQ_GetEngProjectPhase;

                        FillInputText("h_ProjectPhaseCode", item.ProjectPhaseCode);
                        FillInputText("h_DescL", item.DescL);
                        FillInputText("h_RelProjectPhaseId", item.ProjectPhaseId);
                        //FillInputText("h_RelationDelay", item.RelationDelay);
                        FillInputText("h_Deuration", item.Deuration.toString());
                        FillInputText("h_StartDate", DateTimeFormat(item.StartDate));
                        FillInputText("h_EndDate", DateTimeFormat(item.EndDate));

                    };
                    return btn;
                }
            }
        ];
        GridPhase.DataSource = DataSourcePhase;
        GridPhase.Bind();

        GridItem.ElementName = "GridItem";
        GridItem.OnRefreshed = () => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridItem.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridItem.InsertionMode = JsGridInsertionMode.Internal;
        GridItem.OnRowDoubleClicked = ItemOnRowDoubleClickedActivity;
        GridItem.Columns = [
            {
                title: res.Project_eng_lineCode, name: "LineCode", type: "text", width: "6.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "LineCode", " ");
                    txt.className = GridInputClassName;
                    txt.disabled = true;
                    txt.id = "h_LineCode";
                    return HeaderTemplateNew(res.Project_eng_lineCode, txt);
                }
            },
            {
                name: "SlsITm_ItemCode", type: "number", width: "6.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "SlsITm_ItemCode", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_Item_ProjectPhaseCode";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Project_eng_ItemSer, txt);
                }
            },
            {
                title: res.Project_eng_ItemDescription, name: "SlsITm_DescE", type: "text", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "SlsITm_DescE", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_SlsITm_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Project_eng_ItemDescription, txt);
                }
            },
            {
                title: res.Project_eng_ItemQty, name: "ItemQty", type: "number", width: "5.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ItemQty", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_ItemQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Project_eng_ItemQty, txt);
                }
            },
            {
                title: "ProdactionQty", name: "ProdQty", type: "number", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ProdQty", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_ProdQty";
                    return HeaderTemplateNew("Prodaction Qty", txt);
                }
            },
            {
                title: res.Project_eng_Lag, name: "RelationDelay", type: "number", width: "3.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "RelationDelay", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_Item_RelationDelay";
                    return HeaderTemplateNew(res.Project_eng_Lag, txt);
                }
            },
            {
                title: "RelationType", name: "RelationType", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateDropdownList(_Valid, "Name_Ar", "Name_En", "Id", false);
                    txt.id = "h_Item_RelationType";
                    return HeaderTemplateNew("Relation Type", txt);
                },
                itemTemplate: (s: string, item: PQ_GetEngProjectItem): HTMLSelectElement => {
                    let txt = CreateDropdownList(_Valid, "Name_Ar", "Name_En", "Id", false);
                    txt.disabled = true;
                    txt.name = "RelationType";
                    //txt.value = item.RelationType.toString();
                    return txt;
                }
            },
            {
                title: res.Project_eng_Duration, name: "Deuration", type: "number", width: "4.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Deuration", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_Item_Deuration";
                    return HeaderTemplateNew(res.Project_eng_Duration, txt);
                }
            },//
            {
                title: res.Project_eng_StartDate, name: "StartDate", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("datetime-local", GridInputClassName, " ", " ", "StartDate", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_Item_StartDate";
                    return HeaderTemplateNew(res.Project_eng_StartDate, txt);
                }
            },
            {
                title: res.Project_eng_EndDate, name: "EndDate", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("datetime-local", GridInputClassName, " ", " ", "EndDate", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_Item_EndDate";
                    return HeaderTemplateNew(res.Project_eng_EndDate, txt);
                }
            },
            {
                title: "#", name: "btnAddItem", width: NumberColumnWidth,
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton;//+ " addable editable";
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnGridPhase";
                    btn.onclick = (e) => {
                        //add item
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "please select edit mode first");
                            return;
                        }
                        AddItemGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GetEngProjectItem): HTMLButtonElement => {

                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "20px";
                    btn.type = "button";
                    btn.style.color = "forestgreen";
                    btn.name = DataSourcItem.indexOf(item).toString();
                    btn.onclick = (e) => {
                        //edit item
                        debugger
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "please select edit mode first");
                            return;
                        }

                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DataSourcItem.splice(index, 1);
                        GridItem.DataSource = DataSourcItem;
                        GridItem.Bind();
                        debugger
                        ItemObject = new PQ_GetEngProjectItem();
                        ItemObject = item as PQ_GetEngProjectItem;

                        FillInputText("h_LineCode", item.LineCode);
                        FillInputText("h_Item_ProjectPhaseCode", item.SlsITm_ItemCode);
                        FillInputText("h_SlsITm_DescE", item.SlsITm_DescE);
                        FillInputText("h_ItemQty", item.ItemQty);
                        FillInputText("h_ProdQty", item.ProdQty);
                        FillInputText("h_Item_RelationDelay", item.RelationDelay);
                        $("#h_Item_RelationType").val(item.RelationType);
                        //FillInputText("h_Item_h_RelationType", item.RelationType);
                        //FillInputText("h_Item_Deuration", item.Deuration);

                        FillInputText("h_Item_StartDate", DateTimeFormat(item.StartDate));
                        FillInputText("h_Item_EndDate", DateTimeFormat(item.EndDate));

                    };
                    return btn;
                }
            }
        ];
        GridItem.DataSource = DataSourcItem;
        GridItem.Bind();

        GridActivity.ElementName = "GridActivity";
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
        GridActivity.InsertionMode = JsGridInsertionMode.Internal;
        GridActivity.Columns = [
            {
                title: "Serial", name: "Serial", type: "text", width: "6.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Serial", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_Serial";
                    txt.disabled = true;
                    return HeaderTemplateNew("Serial", txt);
                }
            },
            {
                title: res.Project_eng_ActCode, name: "act_ActivityCode", type: "text", width: "6.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "act_ActivityCode", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_act_ActivityCode";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Project_eng_lineCode, txt);
                }
            },
            {
                title: res.Project_eng_ActDesc, name: "act_DescE", type: "text", width: "11%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "act_DescE", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_act_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Project_eng_ActDesc, txt);
                }
            },
            {
                title: res.Project_eng_ActQty, name: "ActivQty", type: "number", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ActivQty", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_ActivQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Project_eng_ActQty, txt);
                }
            },
            {
                title: res.Project_eng_RelationActivity, name: "TotalProdQty", type: "number", width: "6.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "TotalProdQty", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_TotalProdQty";
                    return HeaderTemplateNew(res.Project_eng_RelationActivity, txt);
                }
            },
            {
                title: "RelationDelay", name: "RelationDelay", type: "number", width: "7%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "RelationDelay", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_Act_RelationDelay";
                    return HeaderTemplateNew("RelationDelay", txt);
                }
            },
            {
                title: "RelationType", name: "RelationType", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateDropdownList(_Valid, "Name_Ar", "Name_En", "Id", false);
                    txt.id = "h_RelationType";
                    return HeaderTemplateNew("Relation Type", txt);
                },
                itemTemplate: (s: string, item: PQ_GetEngProjectActivity): HTMLSelectElement => {
                    let txt = CreateDropdownList(_Valid, "Name_Ar", "Name_En", "Id", false);
                    txt.disabled = true;
                    txt.name = "RelationType";
                    //txt.value = item.RelationType.toString();
                    return txt;
                }
            },
            {
                title: res.Project_eng_Duration, name: "Deuration", type: "number", width: "5.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "Deuration", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_Act_Deuration";
                    return HeaderTemplateNew(res.Project_eng_Duration, txt);
                }
            },
            {
                title: res.Project_eng_StartDate, name: "StartDate", type: "text", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("datetime-local", GridInputClassName, " ", " ", "StartDate", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_Act_StartDate";
                    return HeaderTemplateNew(res.Project_eng_StartDate, txt);
                }
            },
            {
                title: res.Project_eng_EndDate, name: "datetime-local", type: "text", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("datetime-local", GridInputClassName, " ", " ", "EndDate", " ");
                    txt.className = GridInputClassName;
                    txt.id = "h_Act_EndDate";
                    return HeaderTemplateNew(res.Project_eng_EndDate, txt);
                }
            },
            {
                title: "#", name: "btnAddItem", width: NumberColumnWidth,
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton;//+ " addable editable";
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnGridPhase";
                    btn.onclick = (e) => {
                        debugger
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "please select edit mode first");
                            return;
                        }
                        AddActivityGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GetEngProjectActivity): HTMLButtonElement => {

                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "20px";
                    btn.type = "button";
                    btn.style.color = "forestgreen";
                    btn.name = DataSourcActivity.indexOf(item).toString();
                    btn.onclick = (e) => {
                        //edit activity
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "please select edit mode first");
                            return;
                        }
                        debugger
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DataSourcActivity.splice(index, 1);
                        GridActivity.DataSource = DataSourcActivity;
                        GridActivity.Bind();

                        ActivityObject = new PQ_GetEngProjectActivity();
                        ActivityObject = item as PQ_GetEngProjectActivity;

                        FillInputText("h_Serial", item.Serial);
                        FillInputText("h_act_ActivityCode", item.act_ActivityCode);
                        FillInputText("h_act_DescE", item.act_DescE);
                        FillInputText("h_ActivQty", item.ActivQty);
                        FillInputText("h_TotalProdQty", item.TotalProdQty);
                        FillInputText("h_Act_RelationDelay", item.RelationDelay);
                        $("#h_Act_RelationType").val(ActivityObject.RelationType);
                        FillInputText("h_Act_Deuration", item.Deuration);
                        FillInputText("h_Act_StartDate", DateTimeFormat(item.StartDate));
                        FillInputText("h_Act_EndDate", DateTimeFormat(item.EndDate));
                    };
                    return btn;
                }
            }
        ];
        GridActivity.DataSource = DataSourcActivity;
        GridActivity.Bind();
    }

    function AddPhaseGrid() {
        debugger
        let _Code: string = $("#h_ProjectPhaseCode").val();
        if (IsNullOrEmpty(_Code.trim())) {
            return;
        }

        PhaseObject.ProjectPhaseCode = $("#h_ProjectPhaseCode").val();
        PhaseObject.DescL = $("#h_DescL").val()
        PhaseObject.ProjectPhaseId = Number($("#h_RelProjectPhaseId").val());

        PhaseObject.Deuration = Number($("#h_Deuration").val());
        PhaseObject.StartDate = DateTimeFormatWithoutT($("#h_StartDate").val());
        PhaseObject.EndDate = DateTimeFormatWithoutT($("#h_EndDate").val());

        let _AssigneDate = DateFormat($("#h_StartDate").val());
        let _ExpLeaveDate = DateFormat($("#h_EndDate").val());

        if (_AssigneDate <= DateFormat(Master.StartDate) || _ExpLeaveDate >= DateFormat(Master.EndDate)) {
            WorningMessage(" يجب ان يكون التاريخ بين الفتره من تاريخ الي تاريخ", "must be date between from date to date");
            return;
        }

        DataSourcePhase.unshift(PhaseObject);
        GridPhase.DataSource = DataSourcePhase;
        GridPhase.Bind();
        PhaseObject = new PQ_GetEngProjectPhase();
    }

    function AddItemGrid() {
        let _ICode: string = $("#h_Item_ProjectPhaseCode").val();
        if (IsNullOrEmpty(_ICode.trim())) {
            return;
        }

        if (IsNullOrEmpty(txtPhaseCode.value)) {
            WorningMessage("", "Please select Phase")
            return;
        }

        ItemObject.SlsITm_ItemCode = $("#h_Item_ProjectPhaseCode").val();
        ItemObject.LineCode = $("#h_LineCode").val();
        ItemObject.SlsITm_DescE = $("#h_SlsITm_DescE").val();
        ItemObject.ItemQty = Number($("#h_ItemQty").val());
        ItemObject.ProdQty = Number($("#h_ProdQty").val());
        ItemObject.RelationDelay = Number($("#h_Item_RelationDelay").val());
        ItemObject.RelationType = Number($("#h_Item_RelationType").val());
        //ItemObject.Deuration = Number($("#h_Item_Deuration").val());
        ItemObject.StartDate = DateTimeFormatWithoutT($("#h_Item_StartDate").val());
        ItemObject.EndDate = DateTimeFormatWithoutT($("#h_Item_EndDate").val());

        let _AssigneDate = DateFormat($("#h_Item_StartDate").val());
        let _ExpLeaveDate = DateFormat($("#h_Item_EndDate").val());
        let SDate: string = (DataSourcePhase.filter(x => x.ProjectPhaseCode == txtPhaseCode.value)[0]).StartDate;
        let EDate: string = (DataSourcePhase.filter(x => x.ProjectPhaseCode == txtPhaseCode.value)[0]).EndDate;

        if (_AssigneDate <= DateFormat(SDate) || _ExpLeaveDate >= DateFormat(EDate)) {
            WorningMessage(" يجب ان يكون التاريخ بين الفتره من تاريخ الي تاريخ", "must be date between from date to date");
            return;
        }

        DataSourcItem.unshift(ItemObject);
        GridItem.DataSource = DataSourcItem;
        GridItem.Bind();
        PhaseObject = new PQ_GetEngProjectPhase();
    }

    function AddActivityGrid() {
        let _ICode: string = $("#h_act_ActivityCode").val();
        if (IsNullOrEmpty(_ICode.trim())) {
            return;
        }

        if (IsNullOrEmpty(txtItemCode.value)) {
            WorningMessage("", "Please select Item")
            return;
        }

        ActivityObject.act_ActivityCode = _ICode;
        ActivityObject.act_DescE = $("#h_act_DescE").val();
        ActivityObject.ActivQty = Number($("#h_ActivQty").val());
        ActivityObject.TotalProdQty = Number($("#h_TotalProdQty").val());
        ActivityObject.RelationDelay = Number($("#h_Act_RelationDelay").val());
        ActivityObject.RelationType = Number($("#h_Act_RelationType").val());
        ActivityObject.Deuration = Number($("#h_Act_Deuration").val());
        ActivityObject.StartDate = DateTimeFormatWithoutT($("#h_Act_StartDate").val());
        ActivityObject.EndDate = DateTimeFormatWithoutT($("#h_Act_EndDate").val());

        let _AssigneDate = DateFormat($("#h_Act_StartDate").val());
        let _ExpLeaveDate = DateFormat($("#h_Act_Item_EndDate").val());
        let SDate: string = (DataSourcItem.filter(x => x.SlsITm_ItemCode == txtItemCode.value)[0]).StartDate;
        let EDate: string = (DataSourcItem.filter(x => x.SlsITm_ItemCode == txtItemCode.value)[0]).EndDate;

        if (_AssigneDate <= DateFormat(SDate) || _ExpLeaveDate >= DateFormat(EDate)) {
            WorningMessage(" يجب ان يكون التاريخ بين الفتره من تاريخ الي تاريخ", "must be date between from date to date");
            return;
        }

        DataSourcActivity.unshift(ActivityObject);
        GridActivity.DataSource = DataSourcActivity;
        GridActivity.Bind();
        PhaseObject = new PQ_GetEngProjectPhase();
    }

    function Assign() {
        //AssignMaster
        DocumentActions.AssignToModel<P_TR_EngProject>(Master);
        //AssignDetails
        MasterDetails.P_TR_EngProject = Master as P_TR_EngProject;
        MasterDetails.P_TR_EngProjectPhase = DataSourcePhase as Array<P_TR_EngProjectPhase>;
        MasterDetails.P_TR_EngProjectItem = DataSourcItem as Array<P_TR_EngProjectItem>;
        MasterDetails.P_TR_EngProjectActivity = DataSourcActivity as Array<P_TR_EngProjectActivity>;
    }

    function Update() {
        Assign();

        debugger
        //$.ajax({
        //    type: "POST",
        //    url: sys.apiUrl("P_TR_EngProject", "Update"),
        //    data: JSON.stringify(MasterDetails.P_TR_EngProjectActivity),
        //    headers: {
        //        'Accept': 'application/json; charset=utf-8',
        //        'Content-Type': 'application/json'
        //    },
        //    cache: false,
        //    async: false,
        //    success: (d) => {

        //    }
        //})

        Ajax.CallAsync({
            url: Url.Action("Update", ControllerName),
            data: { JsonData: JSON.stringify(MasterDetails) },
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Update", () => {
                        //Display();
                        let _Index = GetIndexByUseId(Number(result.ResponseData), TableName, FieldKey, " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        })
    }

    function EditGrid() {
        debugger
    }

    function ItemOnRowDoubleClicked() {
        debugger
        let selectedItem: PQ_GetEngProjectPhase = GridPhase.SelectedItem as PQ_GetEngProjectPhase;
        let DataSourcItemNew: Array<PQ_GetEngProjectItem> = new Array<PQ_GetEngProjectItem>();
        DataSourcItemNew = DataSourcItem.filter(X => X.ProjectPhaseId == selectedItem.ProjectPhaseId);
        GridItem.DataSource = DataSourcItemNew;
        GridItem.Bind();
        txtPhaseCode.value = selectedItem.ProjectPhaseCode;/*DataSourcItemNew[0].ProjectPhaseId.toString();*/
        txtBreakingStartTime.value = selectedItem.DescL;
    }

    function ItemOnRowDoubleClickedActivity() {
        debugger
        let selectedItem: PQ_GetEngProjectItem = GridItem.SelectedItem as PQ_GetEngProjectItem;
        let DataSourcActivityNew: Array<PQ_GetEngProjectActivity> = new Array<PQ_GetEngProjectActivity>();
        DataSourcActivityNew = DataSourcActivity.filter(X => X.ProjectPhaseId == selectedItem.ProjectPhaseId);
        GridActivity.DataSource = DataSourcActivityNew;
        GridActivity.Bind();
        txtItemCode.value = selectedItem.SlsITm_ItemCode;
        txtBreakingEnd.value = selectedItem.SlsITm_DescE;
    }

    function btnProjectCode_onclick() {
        let Condition: string = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        sys.FindKey(Modules.ProjectMasterPlan, "btnProjectCode", Condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            let _Index = GetIndexByUseId(Number(id), TableName, FieldKey, " CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
            NavigateToSearchResultKey(Number(_Index), Navigate)

            //txtStartDate.value=ta 
            //let _EngProject: P_TR_EngProject = Ajax.Call({ url: Url.Action("GetProjCodeByID", "ProjectMasterPlanController"), data: { catID: id } }) as P_TR_EngProject;
            //txtProjID.value = _EngProject.ProjectID.toString();
            //txtProjectCode.value = _EngProject.ProjectCode;
            //txtDescA.value = _ScreenLanguage = "ar" ? _EngProject.DescA : _EngProject.DescL;
        });
    }

    function ProjectCode_onChange() {
        let Condition: string = "CompCode = " + _CompCode + " and BraCode = " + _BranchCode;
        var Pno = Number(txtProjectCode.value);

        Ajax.Callsync({
            url: Url.Action("getProjectTableByno", 'FindByNo'),
            data: { Pno: Pno },
            success: (d) => {
                debugger
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                debugger
                let Project = d.result as Array<P_TR_EngProject>;
                let Index = GetIndexByUseId(Number(Project[0].ProjectID), TableName, FieldKey, "CompCode = " + _CompCode + " and BraCode = " + _BranchCode);
                NavigateToSearchResultKey(Number(Index), Navigate);
            }
        });
             
        
           
       
    }

    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {
                Master = d.result /*as PQ_GetEngProject*/;
                Display();
            }
        })
    }

    function Display() {
        debugger
        //alert(Master.StartDate);
        if (!IsNullOrEmpty(Master.StartDate))
            Master.StartDate = DateFormat(Master.StartDate);

        if (!IsNullOrEmpty(Master.EndDate))
            Master.EndDate = DateFormat(Master.EndDate);

        DocumentActions.RenderFromModel(Master);

        LoadDetails(Master.ProjectID);


    }

    function LoadDetails(id: number) {
        debugger
        Ajax.Callsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: id/*, txtStartDate: txtStartDate.value, txtEndDate: txtEndDate.value*/ },
            success: (d) => {
                DataSourcePhase = d.PQ_GetEngProjectPhase as Array<PQ_GetEngProjectPhase>;
                DataSourcItem = d.PQ_GetEngProjectItem as Array<PQ_GetEngProjectItem>;
                DataSourcActivity = d.PQ_GetEngProjectActivity as Array<PQ_GetEngProjectActivity>;
            }
        })

        for (var ProjectPhases of DataSourcePhase) {
            if (!IsNullOrEmpty(ProjectPhases.StartDate) && !IsNullOrEmpty(ProjectPhases.EndDate)) {
                ProjectPhases.StartDate = DateTimeFormatWithoutT(ProjectPhases.StartDate);
                var StartDatenew = DateTimeFormat(ProjectPhases.StartDate);
                ProjectPhases.EndDate = DateTimeFormatWithoutT(ProjectPhases.EndDate);
                var EndDatenew = DateTimeFormat(ProjectPhases.EndDate);
            }
            else {
                ProjectPhases.StartDate = null;
                var StartDatenew = DateTimeFormat(ProjectPhases.StartDate);
                ProjectPhases.EndDate = null;
                var EndDatenew = DateTimeFormat(ProjectPhases.EndDate);


            }

            Ajax.Callsync({
                url: Url.Action("GetHourProd", ControllerName),
                data: { from: StartDatenew, to: EndDatenew, calcId: 0 },
                success: (d) => {
                    ProjectPhases.Deuration = d.result as number;
                }
            });
        }

        for (var itemsPHASE of DataSourcItem) {
            
            if (!IsNullOrEmpty(itemsPHASE.StartDate) && !IsNullOrEmpty(itemsPHASE.EndDate)) {

                itemsPHASE.StartDate = DateTimeFormatWithoutT(itemsPHASE.StartDate);
                var StartDatenew = DateTimeFormat(itemsPHASE.StartDate);
                itemsPHASE.EndDate = DateTimeFormatWithoutT(itemsPHASE.EndDate);
                var EndDatenew = DateTimeFormat(itemsPHASE.EndDate);
            }
            else {
                itemsPHASE.StartDate = null;
                var StartDatenew = DateTimeFormat(itemsPHASE.StartDate);
                itemsPHASE.EndDate = null;
                var EndDatenew = DateTimeFormat(itemsPHASE.EndDate);
            }

            Ajax.Callsync({
                url: Url.Action("GetHourProd", ControllerName),
                data: { from: StartDatenew, to: EndDatenew, calcId: 0 },
                success: (d) => {
                   // itemsPHASE.Deuration = d.result as number;
                }
            });
        }

        for (var ItemsACTIVITY of DataSourcActivity) {

            if (!IsNullOrEmpty(ItemsACTIVITY.StartDate) && !IsNullOrEmpty(ItemsACTIVITY.EndDate)) {

                ItemsACTIVITY.StartDate = DateTimeFormatWithoutT(ItemsACTIVITY.StartDate);
                var StartDatenew = DateTimeFormat(ItemsACTIVITY.StartDate);
                ItemsACTIVITY.EndDate = DateTimeFormatWithoutT(ItemsACTIVITY.EndDate);
                var EndDatenew = DateTimeFormat(ItemsACTIVITY.EndDate);
            }
            else {
                ItemsACTIVITY.StartDate = null;
                var StartDatenew = DateTimeFormat(ItemsACTIVITY.StartDate);
                ItemsACTIVITY.EndDate = null;
                var EndDatenew = DateTimeFormat(ItemsACTIVITY.EndDate);
            }

            Ajax.Callsync({
                url: Url.Action("GetHourProd", ControllerName),
                data: { from: StartDatenew, to: EndDatenew, calcId: 0 },
                success: (d) => {
                    ItemsACTIVITY.Deuration = d.result as number;
                }
            });
        }


        //        let aa: string = Ajax.Call<string>({ url: Url.Action("MonthCalcDuration", "ProjectMasterPlan"), data: { From: "2018-03-24", To: "2018-03-29", CalcId: "2" } });
        //res = Ajax.Call<boolean>({ url: Url.Action("chechDate", "ClientTools"), data: { comCode: comCode, braCode: braCode, date: date } });
        //"2018-03-24"
        //"2018-03-29"
        //2

        GridPhase.DataSource = DataSourcePhase;
        GridPhase.Bind();
        GridItem.DataSource = DataSourcItem;
        GridItem.Bind();
        GridActivity.DataSource = DataSourcActivity;
        GridActivity.Bind();

        //$(".jsgrid-update-button").keyup(logKey);
        //function logKey(e) {
        //    //if (e.value >= txtStartDate.value && e.value <= txtEndDate.value) {
        //    alert("eeee");

        //}
    }

    function Edit() {
        debugger
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
            $(".jsgrid-insert-mode-button").attr("disabled", "disabled")
            $(".jsgrid-edit-button").attr("disabled", "disabled")
            $(".jsgrid-delete-button").attr("disabled", "disabled")
            //ClientSharedWork.SwitchModes(ScreenModes.Query);
        }
    }

    function GetMasterById(id: number): PQ_GetEngProject {
        let _Master = Ajax.Call<PQ_GetEngProject>({
            url: Url.Action("GetByID", ControllerName),
            data: { id: id },
        });
        return _Master;
    }

    function FillInputText(_TextID: string, _Data: any) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }
}