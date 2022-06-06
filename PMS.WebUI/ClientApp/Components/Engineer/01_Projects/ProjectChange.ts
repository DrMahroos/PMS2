$(document).ready(() => {
    ProjectChange.InitalizeComponent();
});
namespace ProjectChange {
    const ControllerName: string = "ProjectChange";
    var GridItems: JsGrid = new JsGrid();
    var GridActivities: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    const GridInputClassName = "form-control";
    const NumberColumnWidth = "50px";
    var columnWidth: string = "100px";
    var Master: PQ_GetEngVariation = new PQ_GetEngVariation();
    var MasterDetails: M_D_EngVariation = new M_D_EngVariation();

    var DetailsItems: Array<PQ_GetEngVariationItem> = new Array<PQ_GetEngVariationItem>();
    var DetailsAssignHeaderItems: PQ_GetEngVariationItem = new PQ_GetEngVariationItem();
    var Tbl_DetailItems: Array<P_TR_EngVariationItem> = new Array<P_TR_EngVariationItem>();

    var DetailsActivities: Array<PQ_GetEngVariationActivity> = new Array<PQ_GetEngVariationActivity>();
    var FilterDataSourceChild: Array<PQ_GetEngVariationActivity> = new Array<PQ_GetEngVariationActivity>();
    var DetailsAssignHeaderActivities: PQ_GetEngVariationActivity = new PQ_GetEngVariationActivity();
    var Tbl_DetailActivity: Array<P_TR_EngVariationActivity> = new Array<P_TR_EngVariationActivity>();

    var ActivitiesList: Array<PQ_GetEngVariationActivity> = new Array<PQ_GetEngVariationActivity>();

    var txtTrNo: HTMLInputElement;
    var txtTrDate: HTMLInputElement;
    var txtProj_ProjectCode: HTMLInputElement;
    var txtProj_DescL: HTMLInputElement;
    var txtVariationDescr: HTMLInputElement;
    var txtRemarks: HTMLInputElement;
    var txtRefNo: HTMLInputElement;
    var txtRefDate: HTMLInputElement;
    var txtVariationValue: HTMLInputElement;
    var ChkAuthorize: HTMLInputElement;
    var ChkIsSalesApprove: HTMLInputElement;
    var txtItemCode: HTMLInputElement;
    var txtItemName: HTMLInputElement;
    var btnSearchTrNo: HTMLButtonElement;
    var btnSearchProject: HTMLButtonElement;
    var btnGeneratActivity: HTMLButtonElement;
    var btnprintActivity: HTMLButtonElement;
    // Grid Items Variables
    var ItemID: number = 0;
    var ProjectPhaseItemId: number = 0;
    var VariationId: number = 0;
    var VariationItemId: number = 0;
    var VariationGridItemId: number = 0;

    // Grid Activities Variables
    var ActivityID: number = 0;
    var ProjectPhaseId: number = 0;
    var ProjectPhaseItemActivId: number = 0;
    var VariationActivId: number = 0;

    var ProjectID: number = 0;
    var MasterProjectPhaseId: number = 0;
    var selectedItemId: number = 0;

    var _ScreenLang: string;
    var _CompCode: string;
    var _BraCode: string;
    var Condition;
    export function InitalizeComponent() {
        //debugger;
        let ModuleCode1 = SharedSession.CurrentPrivileges.MODULE_CODE;
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        //debugger
        let ModuleCode2 = SharedSession.CurrentPrivileges.MODULE_CODE;
        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BraCode = SharedSession.CurrentEnvironment.BranchCode;
        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BraCode;
        //debugger
        let ModuleCode = SharedSession.CurrentPrivileges.MODULE_CODE;

        InitalizeControls();
        InitalizeEvents();
        InitalizeGrid();
        SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.AddButton.disabled = false;
        ControlsButtons.EditAction(Edit);

        ControlsButtons.SaveAction(() => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add) {

                Insert(false);
            }
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update(false);
        });
        ControlsButtons.PrintAction(PrintVariationSum);
        ControlsButtons.DeleteAction(() => { });
        ControlsButtons.UndoAction(Undo);
        $("#ImageEditorButton").on("click", () => {

            sys.ImgPopup(_CompCode, _BraCode, Modules.ProjectChange, Master.VariationId.toString());
        });


    }

    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById<HTMLInputElement>("txtTrNo");
        txtTrDate = DocumentActions.GetElementById<HTMLInputElement>("txtTrDate");
        txtProj_ProjectCode = DocumentActions.GetElementById<HTMLInputElement>("txtProj_ProjectCode");
        txtProj_DescL = DocumentActions.GetElementById<HTMLInputElement>("txtProj_DescL");
        txtVariationDescr = DocumentActions.GetElementById<HTMLInputElement>("txtVariationDescr");
        txtRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtRemarks");
        txtRefNo = DocumentActions.GetElementById<HTMLInputElement>("txtRefNo");
        txtRefDate = DocumentActions.GetElementById<HTMLInputElement>("txtRefDate");
        txtVariationValue = DocumentActions.GetElementById<HTMLInputElement>("txtVariationValue");
        ChkAuthorize = DocumentActions.GetElementById<HTMLInputElement>("ChkAuthorize");
        ChkIsSalesApprove = DocumentActions.GetElementById<HTMLInputElement>("ChkIsSalesApprove");
        txtItemCode = DocumentActions.GetElementById<HTMLInputElement>("txtItemCode");
        txtItemName = DocumentActions.GetElementById<HTMLInputElement>("txtItemName");
        btnSearchTrNo = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchTrNo");
        btnSearchProject = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchProject");
        btnGeneratActivity = DocumentActions.GetElementById<HTMLButtonElement>("btnGeneratActivity");
        btnprintActivity = DocumentActions.GetElementById<HTMLButtonElement>("btnprintActivity");
    }

    function InitalizeEvents() {
        btnSearchTrNo.onclick = btnSearchTrNo_Clicked;
        btnSearchProject.onclick = btnSearchProject_Clicked;
        btnGeneratActivity.onclick = btnGeneratActivity_Clicked;
        btnprintActivity.onclick = PrintVariationDet;
        ChkAuthorize.onchange = ChkAuthorize_OnChange;
        txtTrNo.onchange = SearchTrNo_OnChange;
        txtProj_ProjectCode.onchange = SearchProject_Changed;
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("Project_eng");
        GridItems.ElementName = "GridItems";
        GridItems.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridItems.OnRefreshed = () => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridItems.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridItems.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridItems.InsertionMode = JsGridInsertionMode.Binding;
        GridItems.OnRowDoubleClicked = ItemOnRowDoubleClicked;
        GridItems.Columns = [
            {
                title: res.Project_eng_Isnew, name: "IsNew", width: "3%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("checkbox", GridInputClassName, " ", " ", "IsNew", " ");
                    txt.id = "h_IsNew"
                    txt.disabled = false;
                    txt.onchange = (e) => {
                        let h_IsNew = document.getElementById("h_IsNew") as HTMLInputElement;
                        if (h_IsNew.checked == true) {
                            $("#h_LineCode").removeAttr("disabled");
                        } else {
                            $("#h_LineCode").attr("disabled", "disabled");
                        }
                    }
                    return HeaderTemplateNew(res.Project_eng_Isnew, txt);
                }
            },
            {
                title: res.Project_eng_lineCode, name: "LineCode", width: "3%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "LineCode", " ");
                    txt.id = "h_LineCode"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Project_eng_lineCode, txt);
                }
            },
            {
                name: "itm_ItemCode", width: "5.0%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let btnFindItems: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindItems = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindItems.className = "btn btn-primary btn-block addable editable";
                    btnFindItems.innerText = _ScreenLang == "ar" ? "كود الصنف" : "Item Code";
                    btnFindItems.id = "btnFindItems";
                    btnFindItems.type = "button";
                    btnFindItems.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        btnFindItems_onclick();
                    };
                    return HeaderTemplateNew(res.Project_eng_ItemCode, btnFindItems);
                }
            },
            {
                title: res.Project_eng_ItemNameAr, css: "ColumPadding", name: "DescA", width: "20.5%",
                headerTemplate: (): HTMLElement => {
                    //let txt = CreateElement("textarea", GridInputClassName, " ", " ", "itm_DescA", " ");
                    let txt = DocumentActions.CreateElement<HTMLInputElement>("textarea");
                    txt.className = GridInputClassName;

                    txt.style.height = "35px";
                    txt.id = "h_itm_DescA";
                    return HeaderTemplateNew(res.Project_eng_ItemNameAr, txt);
                }
            },
            {
                title: res.Project_eng_ItemNameEn, css: "ColumPadding", name: "DescE", width: "20.5%",
                headerTemplate: (): HTMLElement => {
                    //let txt = CreateElement("label", GridInputClassName, " ", " ", "itm_DescL", " ");
                    let txt = DocumentActions.CreateElement<HTMLInputElement>("textarea");
                    txt.className = GridInputClassName;
                    txt.style.height = "35px";
                    txt.id = "h_itm_DescL";
                    return HeaderTemplateNew(res.Project_eng_ItemNameEn, txt);
                }
            },
            {
                title: res.Project_eng_uom, css: "ColumPadding", name: "uom_UomCode", width: "3.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "uom_UomCode", " ");
                    txt.disabled = true;
                    txt.id = "h_uom_UomCode";
                    return HeaderTemplateNew(res.Project_eng_uom, txt);
                }
            },
            {
                title: res.Project_eng_UnitPrice, css: "ColumPadding", name: "UnitPrice", width: "3.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "UnitPrice", " ");
                    txt.id = "h_UnitPrice";
                    return HeaderTemplateNew(res.Project_eng_UnitPrice, txt);
                }
            },
            {
                title: res.Project_eng_oldqty, css: "ColumPadding", name: "OrgItemQty", width: "3.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "OrgItemQty", " ");
                    txt.disabled = true;
                    txt.id = "h_OrgItemQty"
                    return HeaderTemplateNew(res.Project_eng_oldqty, txt);
                }
            },
            {
                title: res.Project_eng_newqty, css: "ColumPadding", name: "ItemQty", width: "3.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ItemQty", " ");
                    txt.disabled = false;
                    txt.id = "h_ItemQty";
                    txt.onkeyup = (e) => {

                        calculation();
                    }
                    return HeaderTemplateNew(res.Project_eng_newqty, txt);
                }
            },
            {
                title: res.Project_eng_DiffQty, css: "ColumPadding", name: "Diff", width: "3.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Diff", " ");
                    txt.disabled = true;
                    txt.id = "h_Diff";
                    return HeaderTemplateNew(res.Project_eng_DiffQty, txt);
                }
            },
            {
                title: res.Project_eng_Total, css: "ColumPadding", name: "Total", width: "3.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Total", " ");
                    txt.disabled = true;
                    txt.id = "h_Total";
                    return HeaderTemplateNew(res.Project_eng_Total, txt);
                }
            },
            {
                title: "#", name: "btnAddItem", visible: true, width: "3.0%",
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton + " addable editable";
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemGrid";
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }

                        AddItemInGridItems();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GetEngVariationItem): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton + "addable editable";
                    btn.style.fontSize = "24px";
                    btn.type = "button";
                    btn.style.color = "red";
                    btn.name = DetailsItems.indexOf(item).toString();
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsItems.splice(index, 1);
                        BindDataGridItems();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            }
            ,
            {
                css: JsGridHeaderCenter,
                width: "2.0%",
                itemTemplate: (s: string, item: PQ_GetEngVariationItem): HTMLButtonElement => {

                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "20px";
                    btn.type = "button";
                    btn.style.color = "forestgreen";
                    btn.name = DetailsItems.indexOf(item).toString();
                    btn.onclick = (e) => {
                        //edit
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }

                        debugger
                        DetailsAssignHeaderItems = new PQ_GetEngVariationItem();
                        ItemID = item.ItemID;
                        ProjectPhaseItemId = item.ProjectPhaseItemId;
                        VariationId = item.VariationId;
                        VariationGridItemId = item.VariationItemId;

                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsItems.splice(index, 1);
                        BindDataGridItems();
                        //ReIndexingGrid();
                        debugger
                        if (item.IsNew == true) {
                            $('#h_IsNew').attr("checked", "checked");
                        } else {
                            $('#h_IsNew').removeAttr("checked");
                        }
                        FillInputText("h_itm_DescA", item.DescA);
                        FillInputText("h_itm_DescL", item.DescE);
                        FillInputText("h_ItemQty", item.ItemQty.toString());
                        FillInputText("h_itm_DescA", item.itm_DescA);
                        //FillInputText("h_itm_DescL", item.itm_DescL);
                        FillInputText("btnFindItems", item.itm_ItemCode);
                        FillInputText("h_LineCode", item.LineCode);
                        FillInputText("h_OrgItemQty", item.OrgItemQty.toString());
                        FillInputText("h_Remarks", item.Remarks);
                        FillInputText("h_UnitPrice", item.UnitPrice.toString());
                        FillInputText("h_uom_DescA", item.uom_DescA);
                        FillInputText("h_uom_DescE", item.uom_DescE);
                        FillInputText("h_uom_UomCode", item.uom_UomCode);
                        FillInputText("h_Diff", item.Diff.toString());
                        FillInputText("h_Total", item.Total.toString());

                    };
                    return btn;
                }
            }
        ];
        GridItems.DataSource = DetailsItems;
        GridItems.Bind();

        GridActivities.ElementName = "GridActivity";
        GridActivities.Columns = [
            {
                name: "Act_ActivityCode", width: "3.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let btnFindActivity: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindActivity = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindActivity.className = "btn btn-primary btn-block addable editable";
                    btnFindActivity.innerText = _ScreenLang == "ar" ? "الانشطة" : "Activity";
                    btnFindActivity.id = "btnFindActivity";
                    btnFindActivity.type = "button";
                    btnFindActivity.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        btnFindActivity_onclick();
                    };
                    return HeaderTemplateNew(res.Project_eng_ActCode, btnFindActivity);
                }
            },
            {
                title: res.Project_eng_ActName, visible: _ScreenLang == "ar", css: "ColumPadding", name: "Act_DescA", width: "20.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Act_DescA", " ");
                    txt.disabled = true;
                    txt.id = "h_Act_DescA";
                    return HeaderTemplateNew(res.Project_eng_ActName, txt);
                }
            },
            {
                title: res.Project_eng_ActName, visible: _ScreenLang == "en", css: "ColumPadding", name: "Act_DescE", width: "20.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Act_DescE", " ");
                    txt.disabled = true;
                    txt.id = "h_Act_DescE";
                    return HeaderTemplateNew(res.Project_eng_ActName, txt);
                }
            },
            {
                title: res.Project_eng_uom, css: "ColumPadding", name: "uom_UomCode", width: "3.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "uom_UomCode", " ");
                    txt.disabled = true;
                    txt.id = "h_Actuom_UomCode";
                    return HeaderTemplateNew(res.Project_eng_uom, txt);
                }
            },
            {
                title: res.Project_eng_oldqty, css: "ColumPadding", name: "Old_ActivQty", width: "3.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Old_ActivQty", " ");
                    txt.disabled = true;
                    txt.id = "h_Old_ActivQty"
                    return HeaderTemplateNew(res.Project_eng_oldqty, txt);
                }
            },
            {
                title: res.Project_eng_newqty, css: "ColumPadding", name: "ActivQty", width: "3.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ActivQty", " ");
                    txt.disabled = false;
                    txt.id = "h_ActivQty"
                    return HeaderTemplateNew(res.Project_eng_newqty, txt);
                }
            },
            {
                title: res.Project_eng_OldProductionPrc, css: "ColumPadding", name: "OldProductionPrc", width: "5.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "OldProductionPrc", " ");
                    txt.disabled = true;
                    txt.id = "h_OldProductionPrc";
                    return HeaderTemplateNew(res.Project_eng_OldProductionPrc, txt);
                }
            },
            {
                title: res.Project_eng_ProductionPrc, css: "ColumPadding", name: "ProductionPrc", width: "5.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("number", GridInputClassName, " ", " ", "ProductionPrc", " ");
                    txt.disabled = false;
                    txt.id = "h_ProductionPrc";
                    txt.max = "100";
                    return HeaderTemplateNew(res.Project_eng_ProductionPrc, txt);
                }
            },
            {
                title: res.Project_eng_Remarks, css: "ColumPadding", name: "Remarks", width: "10.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Remarks", " ");
                    txt.disabled = false;
                    txt.id = "h_ActRemarks";
                    return HeaderTemplateNew(res.Project_eng_Remarks, txt);
                }
            },
            {
                title: "#", name: "btnAddItem", visible: true, width: "2.0%",
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton + " editable";
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemGridAct";
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }

                        AddItemInGridActivity();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GetEngVariationActivity): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "24px";
                    btn.type = "button";
                    btn.style.color = "red";
                    btn.name = DetailsActivities.indexOf(item).toString();
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        debugger;
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsActivities.splice(index, 1);
                        BindDataGridIActivity();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            }
            ,
            {
                css: JsGridHeaderCenter,
                width: "2.0%",
                itemTemplate: (s: string, item: PQ_GetEngVariationActivity): HTMLButtonElement => {

                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "20px";
                    btn.type = "button";
                    btn.style.color = "forestgreen";
                    //debugger;
                    btn.name = ActivitiesList.indexOf(item).toString();
                    btn.onclick = (e) => {
                        //edit
                        //debugger
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        if (txtItemCode.value == "") {
                            WorningMessage("يجب اختيار عنصر اولا ", "Please Select Item First");
                            return;
                        }
                        debugger;
                        //DetailsAssignHeaderActivities = new PQ_GetEngVariationActivity();
                        ActivityID = item.ActivityID;
                        //ProjectPhaseId = item.ProjectPhaseId;
                        ProjectPhaseItemActivId = item.ProjectPhaseItemActivId;
                        VariationActivId = item.VariationActivId;
                        VariationItemId = item.VariationItemId;
                        //DetailsAssignHeaderActivities.ActivQty = item.ActivQty;
                        //DetailsAssignHeaderActivities.Act_ActivityCode = item.Act_ActivityCode;
                        //DetailsAssignHeaderActivities.Act_DescA = item.Act_DescA;
                        //DetailsAssignHeaderActivities.Act_DescE = item.Act_DescE;
                        //DetailsAssignHeaderActivities.EstimatedEquip = item.EstimatedEquip;
                        //DetailsAssignHeaderActivities.EstimatedLabor = item.EstimatedLabor;
                        //DetailsAssignHeaderActivities.EstimatedMaterial = item.EstimatedMaterial;
                        //DetailsAssignHeaderActivities.EstimatedProfit = item.EstimatedProfit;
                        //DetailsAssignHeaderActivities.IsNew = item.IsNew;
                        //DetailsAssignHeaderActivities.OldProductionPrc = item.OldProductionPrc;
                        //DetailsAssignHeaderActivities.Old_ActivQty = item.Old_ActivQty;
                        //DetailsAssignHeaderActivities.ProductionPrc = item.ProductionPrc;
                        //DetailsAssignHeaderActivities.Remarks = item.Remarks;
                        //DetailsAssignHeaderActivities.StdUnitPrice = item.StdUnitPrice;
                        //DetailsAssignHeaderActivities.UnitPrice = item.UnitPrice;
                        //DetailsAssignHeaderActivities.uom_DescA = item.uom_DescA;
                        //DetailsAssignHeaderActivities.uom_DescE = item.uom_DescE;
                        //DetailsAssignHeaderActivities.uom_UomCode = item.uom_UomCode;

                        //debugger;
                        let index = Number((e.currentTarget as HTMLButtonElement).name);

                        ActivitiesList.splice(index, 1);
                        //BindDataGridIActivity();
                        let ind2: Array<PQ_GetEngVariationActivity> = DetailsActivities.filter(c => c.VariationActivId == item.VariationActivId);
                        let ss = DetailsActivities.indexOf(ind2[0]);
                        DetailsActivities.splice(ss, 1);
                        BindDataGridIActivityFiltered();
                        //ReIndexingGrid();
                        if (!IsNullOrEmpty(item.ActivQty.toString())) {
                            FillInputText("h_ActivQty", item.ActivQty.toString());
                        }
                        if (!IsNullOrEmpty(item.Act_ActivityCode.toString())) {
                            FillInputText("btnFindActivity", item.Act_ActivityCode);
                        }
                        FillInputText("h_Act_DescA", item.Act_DescA);
                        FillInputText("h_Act_DescE", item.Act_DescE);
                        if (!IsNullOrEmpty(item.OldProductionPrc.toString())) {
                            FillInputText("h_OldProductionPrc", item.OldProductionPrc.toString());
                        }
                        if (!IsNullOrEmpty(item.Old_ActivQty.toString())) {
                            FillInputText("h_Old_ActivQty", item.Old_ActivQty.toString());
                        }
                        if (!IsNullOrEmpty(item.ProductionPrc.toString())) {
                            FillInputText("h_ProductionPrc", item.ProductionPrc.toString());
                        }

                        FillInputText("h_ActRemarks", item.Remarks);
                        //if (!IsNullOrEmpty(item.StdUnitPrice.toString())) {
                        //    FillInputText("h_StdUnitPrice", item.StdUnitPrice.toString());
                        //}
                        //if (!IsNullOrEmpty(item.UnitPrice.toString())) {
                        //    FillInputText("h_ActUnitPrice", item.UnitPrice.toString());
                        //}
                        if (!IsNullOrEmpty(item.uom_UomCode.toString())) {
                            FillInputText("h_Actuom_UomCode", item.uom_UomCode);
                        }
                    };
                    return btn;
                }
            }
        ];
        GridActivities.DataSource = DetailsActivities;
        GridActivities.Bind();
    }

    function ChkAuthorize_OnChange() {
        if (!ValidationPrc()) {
            ChkAuthorize.checked = false;
        }
    }

    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {
                Master = d.result as PQ_GetEngVariation;
                Display();
            }
        })
    }

    function Add() {
        txtTrDate.value = DateFormat(new Date().toString());
        txtRefDate.value = DateFormat(new Date().toString());
        txtProj_ProjectCode.value = "";
        txtProj_DescL.value = "";
        ChkAuthorize.checked = false;
        ChkIsSalesApprove.checked = false;
        txtTrNo.value = "";
        txtVariationValue.value = "";
        NewData();

    }
    function NewData() {
        ClearGrid(GridActivities, new Array<PQ_GetEngVariationActivity>());
        ClearGrid(GridItems, new Array<PQ_GetEngVariationItem>());

        DetailsItems = new Array<PQ_GetEngVariationItem>();
        DetailsAssignHeaderItems = new PQ_GetEngVariationItem();
        Tbl_DetailItems = new Array<P_TR_EngVariationItem>();

        DetailsActivities = new Array<PQ_GetEngVariationActivity>();
        FilterDataSourceChild = new Array<PQ_GetEngVariationActivity>();
        DetailsAssignHeaderActivities = new PQ_GetEngVariationActivity();
        Tbl_DetailActivity = new Array<P_TR_EngVariationActivity>();

        ActivitiesList = new Array<PQ_GetEngVariationActivity>();
    }
    function Display() {
        DocumentActions.RenderFromModel(Master);
        LoadVariatedItems(Master.VariationId);
        LoadVariatedActivity(Master.VariationId);
        ProjectID = Master.ProjectID;
        ProjectPhaseId = Master.ProjectPhaseId;
        if (ChkAuthorize.checked == true && ChkIsSalesApprove.checked == true) {
            ControlsButtons.EditButton.disabled = true;
        } else {
            ControlsButtons.EditButton.disabled = false;
        }
    }

    function CalcVariateValue() {
        //debugger
        let _Total: number = 0;
        for (var item of DetailsItems) {
            _Total += item.UnitPrice * (item.ItemQty - item.OrgItemQty);
        }
        txtVariationValue.value = _Total.toFixed(2).toString();
    }

    function Edit() {

    }

    function Undo() {

    }

    function Assign() {
        //AssignMaster
        //Master = new P_TR_EngSchedule();
        DocumentActions.AssignToModel<PQ_GetEngVariation>(Master);
        MasterDetails.P_TR_EngVariation = Master as PQ_GetEngVariation;
        MasterDetails.P_TR_EngVariation.VariationId = Master.VariationId;
        //AssignDetails
        MasterDetails.P_TR_EngVariationItemDetail = DetailsItems as Array<PQ_GetEngVariationItem>;
        for (var variation of DetailsItems) {
            variation.VariationId = Master.VariationId;
            Tbl_DetailItems.push(variation);
        }

        MasterDetails.P_TR_EngVariationActivityDetial = DetailsActivities as Array<PQ_GetEngVariationActivity>;
        for (var variationAct of DetailsActivities) {
            variationAct.VariationId = Master.VariationId;
            //variationAct.VariationItemId == 0 ? variationAct.VariationItemId = null : variationAct.VariationItemId = variationAct.VariationItemId;
            Tbl_DetailActivity.push(variationAct);
        }
    }

    function Insert(generate: boolean) {
        debugger;
        Assign();
        //if (CheckDate(Number(_CompCode), Number(_BraCode), txtTrDate.value) == false) {
        //    WorningMessage("غير مسموح بهذا التاريخ", "This Date is not allowed");
        //    return;
        //}
        //if (ValidationPrc() == false)
        //    return;
        Master.TrNo = null;
        Master.ProjectID = ProjectID;
        debugger;
        Master.ProjectPhaseId = null;//Number(GetPhaseId(ProjectID));
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BraCode);
        Master.VariationId = 0;
        MasterDetails.P_TR_EngVariation.TrNo = null;
        var session: SessionRecord = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        var func = "InsertMasterDetail";
        if (generate)
            func = "InsertMasterDetailAndGenerate"
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_EngVariation", func),
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
                    //let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    WorningMessage("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    //MessageBox.Show(msg, "Update", () => {
                    //    debugger;
                    let _Index = GetIndexByUseId(result.Response, "PQ_GetEngVariation", "VariationId", "CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                    NavigateToSearchResultKey(Number(_Index), Navigate);

                    //});
                }
            }
        });
        //Ajax.CallAsync({
        //    url: Url.Action("Insert", ControllerName),
        //    data: { JsonData: JSON.stringify(MasterDetails) },
        //    success: (d) => {
        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            debugger;
        //            ClientSharedWork.SwitchModes(ScreenModes.Query);
        //            let msg: string = ReturnMsg("تم حفظ البيانات بنجاح  ", "Data Saved Successfuly. ");
        //            MessageBox.Show(msg, "Insert", () => {
        //                debugger;
        //                //Display();
        //                let _Index = GetIndexByUseId(result.ResponseData, "PQ_GetEngVariation", "VariationId", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
        //                NavigateToSearchResultKey(Number(_Index), Navigate);
        //            });
        //        }
        //    }
        //})
    }

    function Update(generate: boolean) {
        Assign();

        //if (ValidationPrc() == false)
        //    return;
        //debugger
        Master.ProjectID = ProjectID;
        Master.ProjectPhaseId = null;//Number(GetPhaseId(ProjectID));
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BraCode);
        var session: SessionRecord = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        var func = "UpdateMasterDetail";
        if (generate)
            func = "UpdateMasterDetailAndGenerate"
        //debugger
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_EngVariation", func),
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
                    let _Index = GetIndexByUseId(result.Response, "PQ_GetEngVariation", "VariationId", "CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                    NavigateToSearchResultKey(Number(_Index), Navigate);
                    //let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    //MessageBox.Show(msg, "Update", () => {
                    //    debugger;
                    //    let _Index = GetIndexByUseId(result.Response, "PQ_GetEngVariation", "VariationId", "CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                    //    NavigateToSearchResultKey(Number(_Index), Navigate);
                    //    //LoadDetails(Master.ProjectID);
                    //});
                }
            }
        });
        //Ajax.CallAsync({
        //    url: Url.Action("Update", ControllerName),
        //    data: { JsonData: JSON.stringify(MasterDetails) },
        //    success: (d) => {
        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            ClientSharedWork.SwitchModes(ScreenModes.Query);
        //            let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
        //            MessageBox.Show(msg, "Update", () => {
        //                //Display();
        //                let _Index = GetIndexByUseId(result.ResponseData, "PQ_GetEngVariation", "VariationId", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
        //                NavigateToSearchResultKey(Number(_Index), Navigate);
        //            });
        //        }
        //    }
        //})
    }

    function ValidationPrc(): boolean {
        var _Result: boolean = true;
        //check on total persentage
        //debugger
        //Get All Activity
        let DataSourceChild: Array<PQ_GetEngVariationActivity> = new Array<PQ_GetEngVariationActivity>();
        //DataSourceChild = Ajax.Call({ url: Url.Action("LoadVariatedActivity", ControllerName), data: { id: Master.VariationId } }) as Array<PQ_GetEngVariationActivity>;
        DataSourceChild = DetailsActivities as Array<PQ_GetEngVariationActivity>;
        //debugger
        if (DetailsItems.filter(x => x.VariationItemId == 0).length > 0) {
            WorningMessage("يجب حفظ الحركة أولا، يوجد اصناف غير محفوظة ", "You have new items, you  should saved and then complete the ativities  ");
            _Result = false;
            return _Result;
        }

        let ProdPrc: number = 0;
        // for it  of items 
        for (var itm of DetailsItems) {

            FilterDataSourceChild = DataSourceChild.filter(x => x.VariationItemId == itm.VariationItemId);
            // load item activity 
            ProdPrc = 0;
            for (var act of FilterDataSourceChild) {
                ProdPrc += Number(act.ProductionPrc);
            }

            if (ProdPrc != 100) {
                WorningMessage("اجمالي نسبة الانتاج يجب ان يساوي 100 في البند رقم " + itm.LineCode, "Total percent must be equal 100 line no " + itm.LineCode);
                _Result = false;
                break;
            }
        }
        //end check on total persentage
        return _Result;
    }

    function FillInputText(_TextID: string, _Data: string) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }

    function BindDataGridItems() {
        GridItems.DataSource = DetailsItems;
        GridItems.Bind();
    }

    function BindDataGridIActivity() {
        GridActivities.DataSource = DetailsActivities;
        GridActivities.Bind();
    }

    function BindDataGridIActivityFiltered() {
        GridActivities.DataSource = ActivitiesList;
        GridActivities.Bind();
    }

    function AddItemInGridItems() {
        DetailsAssignHeaderItems = new PQ_GetEngVariationItem();
        if (IsNullOrEmpty($('#h_LineCode').val())) {
            WorningMessage("يجب ادخال الكود", "Please Insert The Line Code");
            return;
        }
        //debugger
        DetailsAssignHeaderItems.ItemID = ItemID;
        DetailsAssignHeaderItems.ProjectPhaseItemId = ProjectPhaseItemId;
        DetailsAssignHeaderItems.VariationId = VariationId;

        DetailsAssignHeaderItems.DescA = $('#h_itm_DescA').val();
        DetailsAssignHeaderItems.DescE = $('#h_itm_DescL').val();
        DetailsAssignHeaderItems.IsNew = $('#h_IsNew').prop('checked') == true ? true : false;
        //if (DetailsAssignHeaderItems.IsNew == true) {
        //    DetailsAssignHeaderItems.VariationItemId = null;
        //}
        //else {
        DetailsAssignHeaderItems.VariationItemId = VariationGridItemId;
        //}
        DetailsAssignHeaderItems.ItemQty = Number($('#h_ItemQty').val());
        DetailsAssignHeaderItems.itm_DescA = $('#h_itm_DescA').val();
        DetailsAssignHeaderItems.itm_DescL = $('#h_itm_DescL').val();
        DetailsAssignHeaderItems.itm_ItemCode = $('#btnFindItems').text();
        DetailsAssignHeaderItems.LineCode = $('#h_LineCode').val();
        DetailsAssignHeaderItems.OrgItemQty = Number($('#h_OrgItemQty').val());
        DetailsAssignHeaderItems.Remarks = $('#h_Remarks').val();
        DetailsAssignHeaderItems.UnitPrice = $('#h_UnitPrice').val();
        DetailsAssignHeaderItems.uom_UomCode = $('#h_uom_UomCode').val();
        DetailsAssignHeaderItems.Diff = Number($('#h_Diff').val());
        DetailsAssignHeaderItems.Total = Number($('#h_Total').val());
        DetailsItems.push(DetailsAssignHeaderItems);
        BindDataGridItems();
        CalcVariateValue();
        VariationGridItemId = 0;
    }

    function AddItemInGridActivity() {
        //debugger
        DetailsAssignHeaderActivities = new PQ_GetEngVariationActivity();
        DetailsAssignHeaderActivities.ActivityID = ActivityID;
        DetailsAssignHeaderActivities.ProjectPhaseId = ProjectPhaseId;
        DetailsAssignHeaderActivities.ProjectPhaseItemActivId = ProjectPhaseItemActivId;
        DetailsAssignHeaderActivities.VariationActivId = VariationActivId;
        DetailsAssignHeaderActivities.VariationItemId = VariationItemId;

        DetailsAssignHeaderActivities.ActivQty = Number($('#h_ActivQty').val());
        DetailsAssignHeaderActivities.Act_ActivityCode = $('#btnFindActivity').text()
        DetailsAssignHeaderActivities.Act_DescA = $('#h_Act_DescA').val();
        DetailsAssignHeaderActivities.Act_DescE = $('#h_Act_DescE').val();
        DetailsAssignHeaderActivities.OldProductionPrc = Number($('#h_OldProductionPrc').val());
        DetailsAssignHeaderActivities.Old_ActivQty = Number($('#h_Old_ActivQty').val());
        DetailsAssignHeaderActivities.ProductionPrc = Number($('#h_ProductionPrc').val());
        DetailsAssignHeaderActivities.Remarks = $('#h_ActRemarks').val();
        DetailsAssignHeaderActivities.uom_UomCode = $('#h_Actuom_UomCode').val();
        DetailsActivities.push(DetailsAssignHeaderActivities);
        ActivitiesList.push(DetailsAssignHeaderActivities);
        BindDataGridIActivityFiltered();
        //ProjectPhaseItemActivId = null;
        VariationActivId = 0;
    }

    function btnFindItems_onclick() {
        let isNew: boolean = $('#h_IsNew').prop('checked');
        //debugger;
        if (isNew == false) {
            sys.FindKey(Modules.ProjectChange, "btnFindItems", "ProjectID = " + ProjectID, () => {
                let id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
                //debugger
                Ajax.CallAsync({
                    url: Url.Action("GetProjectItem", ControllerName),
                    data: { id: id },
                    success: (d) => {
                        let result = d.result as PQ_GetEngProjectItem;
                        if (result != null) {
                            ItemID = result.ItemID;
                            //debugger
                            ProjectPhaseItemId = result.ProjectPhaseItemId;
                            $('#h_LineCode').val(result.LineCode);
                            $('#btnFindItems').text(result.SlsITm_ItemCode);
                            $('#h_uom_UomCode').val(result.UomCode);
                            $('#h_UnitPrice').val(result.UnitPrice);
                            $('#h_OrgItemQty').val(result.ItemQty);
                            $('#h_ItemQty').val(result.ItemQty);
                            $('#h_itm_DescA').val(result.SlsITm_DescA);
                            $('#h_itm_DescL').val(result.SlsITm_DescE);
                        }
                    }
                });
            });
        }
        else if (isNew == true) {
            sys.FindKey(Modules.SalesItemLibrary, "btnFindItems", "IsDetail = 1", () => {

                let id = ClientSharedWork.SearchDataGrid.SelectedKey;
                Ajax.CallAsync({
                    url: Url.Action("GetSalesItem", ControllerName),
                    data: { id: id },
                    success: (d) => {

                        let result = d.result as PQ_GetSalesItem;
                        ProjectPhaseItemId = null;
                        ItemID = result.ItemID;
                        $('#h_LineCode').removeAttr('disabled');
                        $('#btnFindItems').text(result.ItemCode);
                        $('#h_uom_UomCode').val(result.UomCode);
                        $('#h_UnitPrice').val(result.UnitPrice);
                        $('#h_OrgItemQty').val(0);
                        $('#h_itm_DescA').val(result.DescA);
                        $('#h_itm_DescL').val(result.DescE);

                    }
                });
            });
        }
    }

    function calculation() {
        if (IsNullOrEmpty($('#h_ItemQty').val())) {
            $('#h_ItemQty').val(1);
        }
        let diff: number = (Number($('#h_ItemQty').val()) - Number($('#h_OrgItemQty').val()));
        $('#h_Diff').val(diff.toFixed(2));
        let total: number = (Number($('#h_Diff').val()) * Number($('#h_UnitPrice').val()));
        $('#h_Total').val(total.toFixed(2));
    }

    function btnFindActivity_onclick() {

        if (txtItemCode.value == "" && txtItemName.value == "") {
            WorningMessage("يجب اختيار عنصر اولا قبل اختيار النشاط", "You Should Choose Item Befor Select Activity");
            return;
        }
        sys.FindKey(Modules.ProjectChange, "btnFindActivity", "", () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetActivity", ControllerName),
                data: { id: id },
                success: (d) => {
                    let result = d.result as PQ_SrchActivity;
                    ActivityID = result.ActivityID;
                    $('#btnFindActivity').text(result.ActivityCode);
                    $('#h_Act_DescE').val(result.DescE);
                    $('#h_Act_DescA').val(result.DescA);
                    $('#h_Actuom_UomCode').val(result.Uom_Code);
                    $('#h_Old_ActivQty').val(0);
                }
            });
        });
    }

    function btnSearchProject_Clicked() {

        sys.FindKey(Modules.ProjectChange, "btnSearchProject", Condition, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProject", ControllerName),
                data: { id: id },
                success: (d) => {
                    let result = d.result as PQ_GetEngProject;
                    ProjectID = result.ProjectID;
                    //MasterProjectPhaseId = result.ProjectPhaseId;
                    txtProj_ProjectCode.value = result.ProjectCode;
                    if (_ScreenLang == "ar") {
                        txtProj_DescL.value = result.DescA;
                    } else {
                        txtProj_DescL.value = result.DescL;
                    }
                    NewData();
                }
            });
        });
    }
    function SearchProject_Changed() {

        var Pno = Number(txtProj_ProjectCode.value);
        Ajax.CallAsync({
            url: Url.Action("getProjectViewByno", "FindByNo"),
            data: { Pno: Pno },
            success: (d) => {

                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");

                }

                let result = d.result as PQ_GetEngProject;
                ProjectID = result[0].ProjectID;
                //MasterProjectPhaseId = result.ProjectPhaseId;
                txtProj_ProjectCode.value = result[0].ProjectCode;
                if (_ScreenLang == "ar") {
                    txtProj_DescL.value = result[0].DescA;
                } else {
                    txtProj_DescL.value = result[0].DescL;
                }
                NewData();
            }
        });

    }

    function GetPhaseId(projectId: number): number {
        //debugger;
        let phase: P_TR_EngProjectPhase = Ajax.Call<P_TR_EngProjectPhase>({ url: Url.Action("GetPhaseId", ControllerName), data: { projectId: projectId } });
        return phase.ProjectPhaseId;
    }

    function btnSearchTrNo_Clicked() {

        sys.FindKey(Modules.ProjectChange, "btnSearchTrNo", "CompCode = " + _CompCode + " and BraCode = " + _BraCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetVariation", ControllerName),
                data: { id: id },
                success: (d) => {

                    Master = d.result as PQ_GetEngVariation;
                    let Index = GetIndexByUseId(Number(Master.VariationId), "PQ_GetEngVariation", "VariationId", "CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }
    //eslam 
    function SearchTrNo_OnChange() {

        var trno = Number(txtTrNo.value);
        Ajax.CallAsync({
            url: Url.Action("getVariationViewByNo", "FindByNo"),
            data: { trno: trno },
            success: (d) => {
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");

                }
                Master = d.result as PQ_GetEngVariation;
                let Index = GetIndexByUseId(Number(Master.VariationId), "PQ_GetEngVariation", "VariationId", "CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                NavigateToSearchResultKey(Number(Index), Navigate);

            }
        });

    }

    function LoadVariatedItems(id: number) {
        Ajax.Callsync({
            url: Url.Action("LoadVariatedItems", ControllerName),
            data: { id: id },
            success: (d) => {
                //debugger
                DetailsItems = d.result as Array<PQ_GetEngVariationItem>;
                GridItems.DataSource = DetailsItems;
                for (var itm of DetailsItems) {
                    itm.Diff = Number((itm.ItemQty - itm.OrgItemQty).toFixed(2));
                    itm.Total = Number((itm.Diff * itm.UnitPrice).toFixed(2));
                }
                GridItems.Bind();
                CalcVariateValue();
            }
        });
    }

    function LoadVariatedActivity(id: number) {
        Ajax.Callsync({
            url: Url.Action("LoadVariatedActivity", ControllerName),
            data: { id: id },
            success: (d) => {
                DetailsActivities = d.result as Array<PQ_GetEngVariationActivity>;
                GridActivities.DataSource = DetailsActivities;
                GridActivities.Bind()
            }
        });
    }

    function btnGeneratActivity_Clicked() {
        /*debugger*/;
        if (ClientSharedWork.CurrentMode == ScreenModes.Add) {
            Insert(true);
        } else {
            Update(true);
        }
        //debugger;
        //Ajax.Callsync({
        //    url: Url.Action("PProc_EngBuildVarientActivity", ControllerName),
        //    data: { trID: Master.VariationId },
        //    success: (d) => {
        //        //alert('Activity Generated Successfuly');
        //        ClientSharedWork.SwitchModes(ScreenModes.Query);
        //        LoadVariatedActivity(Master.VariationId);
        //    }
        //});
    }
    function PrintVariationDet() {
        Ajax.CallAsync({
            url: Url.Action("PrintVariationDet", "PrintTransaction"),
            data: { TrID: Number(Master.VariationId) },
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });

    }
    function PrintVariationSum() {
        Ajax.CallAsync({
            url: Url.Action("PrintVariationSum", "PrintTransaction"),
            data: { TrID: Number(Master.VariationId) },
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });

    }


    function ItemOnRowDoubleClicked() {
        /*debugger*/;
        let selectedItem: PQ_GetEngVariationItem = GridItems.SelectedItem as PQ_GetEngVariationItem;
        VariationItemId = selectedItem.VariationItemId;
        if (VariationItemId == 0) {
            WorningMessage("يجب  حفظ الاصناف قبل ادخال الانشطة ", "You Should save Items to view and edit Activities");
            return;
        }
        ProjectPhaseItemActivId = null;
        VariationActivId = 0;

        txtItemCode.value = selectedItem.LineCode;
        txtItemName.value = selectedItem.DescE;

        //let ActivitiesList: Array<PQ_GetEngVariationActivity> = new Array<PQ_GetEngVariationActivity>();
        ActivitiesList = DetailsActivities.filter(x => x.VariationItemId == VariationItemId) as Array<PQ_GetEngVariationActivity>;
        GridActivities.DataSource = ActivitiesList;
        GridActivities.Bind()
    }
}