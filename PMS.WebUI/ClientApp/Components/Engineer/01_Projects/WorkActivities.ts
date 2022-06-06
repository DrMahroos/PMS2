$(document).ready(() => {
    WorkActivities.InitalizeComponent();
});
namespace WorkActivities {
    const ControllerName: string = "WorkActivities";
    const GridInputClassName = "form-control gridIput";
    var columnWidth: string = "100px";
    var wastvalue: Array<P_Control> = new Array<P_Control>();

    class M_D_Activites {
        public P_D_Activity: P_D_Activity;
        public P_D_ActivityIMaterial: Array<P_D_ActivityIMaterial>;
        public P_D_ActivityLaborClass: Array<P_D_ActivityLaborClass>;
        public P_D_ActivityEquipClass: Array<P_D_ActivityEquipClass>;
    }
    var MasterDetails: M_D_Activites = new M_D_Activites();
    var Master: P_D_Activity;

    var MaterialDataSource: Array<PQ_GetActivityMaterialClass> = new Array<PQ_GetActivityMaterialClass>();
    var DetailsMaterial: Array<PQ_GetActivityMaterialClass> = new Array<PQ_GetActivityMaterialClass>();
    var DetailsAssignHeaderMaterial: PQ_GetActivityMaterialClass = new PQ_GetActivityMaterialClass();
    var Tbl_DetailMaterial: Array<P_D_ActivityIMaterial> = new Array<P_D_ActivityIMaterial>();

    var LaborDataSource: Array<PQ_GetActivityLaborClass> = new Array<PQ_GetActivityLaborClass>();
    var DetailsLabor: Array<PQ_GetActivityLaborClass> = new Array<PQ_GetActivityLaborClass>();
    var DetailsAssignHeaderLabor: PQ_GetActivityLaborClass = new PQ_GetActivityLaborClass();
    var Tbl_DetailLabor: Array<P_D_ActivityLaborClass> = new Array<P_D_ActivityLaborClass>();

    var EquipDataSource: Array<PQ_GetActivityEquipmentClass> = new Array<PQ_GetActivityEquipmentClass>();
    var DetailsEquip: Array<PQ_GetActivityEquipmentClass> = new Array<PQ_GetActivityEquipmentClass>();
    var DetailsAssignHeaderEquip: PQ_GetActivityEquipmentClass = new PQ_GetActivityEquipmentClass();
    var Tbl_DetailEquipt: Array<P_D_ActivityEquipClass> = new Array<P_D_ActivityEquipClass>();

    var Master: P_D_Activity = new P_D_Activity();
    const NumberColumnWidth = "50px";

    var GridMaterial: JsGrid = new JsGrid();
    var GridLabor: JsGrid = new JsGrid();
    var GridEquipment: JsGrid = new JsGrid();

    var sys: SystemTools = new SystemTools();
    var uom: P_D_UOM = new P_D_UOM();
    var db: AjaxCaller = new AjaxCaller();

    var txtActivityCode: HTMLInputElement;
    var txtDescA: HTMLInputElement;
    var txtDescE: HTMLInputElement;
    var txtUomID: HTMLInputElement;
    var txtUomName: HTMLInputElement;
    var txtParentActivityID: HTMLInputElement;
    var txtParentActivityName: HTMLInputElement;
    var txtActivityLevel: HTMLInputElement;
    var txtRemarks: HTMLInputElement;
    var txtHourProduction: HTMLInputElement;
    var txtLaborProdRate: HTMLInputElement;
    var txtUnitPrice: HTMLInputElement;
    var txtDailyProd: HTMLInputElement;
    var ChkIsDetail: HTMLInputElement;
    var btnActCode: HTMLButtonElement;
    var btnUomID: HTMLButtonElement;
    var btnParentActivity: HTMLButtonElement;
    var btnMaterial: HTMLButtonElement;
    var btnLabor: HTMLButtonElement;
    var btnEquipt: HTMLButtonElement;

    var parentactivityId: number;
    var uomId: number;

    var h_ItemID: number;
    var h_LaborClassId: number;
    var h_EquipClassId: number;
    var _ScreenLanguage: string;
    var _CompCode: string;
    //var _BranchCode: string;

    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        //_BranchCode = SharedSession.CurrentEnvironment.BranchCode;

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
        ControlsButtons.PrintAction(() => {
            OpenReportsPopup("_ActivityReport");
        });
        ControlsButtons.DeleteAction(() => { });
        ControlsButtons.UndoAction(Undo);
        InitalizeGrid();
        
        wastvalue = Ajax.Call<Array<P_Control>>({ url: Url.Action("getWasteValue", ControllerName) });
        $('#h_WastPrc').val(wastvalue[0].MaterialWastPrc);
    }

    function InitalizeControls() {
        txtActivityCode = DocumentActions.GetElementById<HTMLInputElement>("txtActivityCode");
        txtDescA = DocumentActions.GetElementById<HTMLInputElement>("txtDescA");
        txtDescE = DocumentActions.GetElementById<HTMLInputElement>("txtDescE");
        txtUomID = DocumentActions.GetElementById<HTMLInputElement>("txtUomID");
        txtUomName = DocumentActions.GetElementById<HTMLInputElement>("txtUomName");
        txtParentActivityID = DocumentActions.GetElementById<HTMLInputElement>("txtParentActivityID");
        txtParentActivityName = DocumentActions.GetElementById<HTMLInputElement>("txtParentActivityName");
        txtActivityLevel = DocumentActions.GetElementById<HTMLInputElement>("txtActivityLevel");
        txtRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtRemarks");
        txtHourProduction = DocumentActions.GetElementById<HTMLInputElement>("txtHourProduction");
        txtLaborProdRate = DocumentActions.GetElementById<HTMLInputElement>("txtLaborProdRate");
        txtUnitPrice = DocumentActions.GetElementById<HTMLInputElement>("txtUnitPrice");
        txtDailyProd = DocumentActions.GetElementById<HTMLInputElement>("txtDailyProd");
        ChkIsDetail = DocumentActions.GetElementById<HTMLInputElement>("ChkIsDetail");
        btnActCode = DocumentActions.GetElementById<HTMLButtonElement>("btnActCode");
        btnUomID = DocumentActions.GetElementById<HTMLButtonElement>("btnUomID");
        btnParentActivity = DocumentActions.GetElementById<HTMLButtonElement>("btnParentActivity");
        btnMaterial = DocumentActions.GetElementById<HTMLButtonElement>("btnMaterial");
        btnLabor = DocumentActions.GetElementById<HTMLButtonElement>("btnLabor");
        btnEquipt = DocumentActions.GetElementById<HTMLButtonElement>("btnEquipt");
    }

    function InitalizeEvents() {
        btnUomID.onclick = btnUomID_Clicked;
        btnActCode.onclick = btnActCode_Clicked;
        btnParentActivity.onclick = btnParentActivity_Clicked;
        txtHourProduction.onkeyup = CalcDailyQty;
        //txtParentActivityID.onchange = disableControls;
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("Act_");
        // GridMaterial
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
        GridMaterial.OnItemUpdating =  () => { };
        GridMaterial.OnItemDeleting =  () => { };
        GridMaterial.Columns = [
            {
                title: res.Act_ItemCode, name: "ItemCode", width: columnWidth, css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let btnFindMaterial: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindMaterial = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindMaterial.className = "btn btn-primary btn-block addable editable";
                    btnFindMaterial.innerText = _ScreenLanguage == "ar" ? "تحميل المواد" : "Loading Material";
                    btnFindMaterial.id = "btnFindMaterial";
                    btnFindMaterial.type = "button";
                    btnFindMaterial.onclick = (e) => {
                        btnFindMaterial_onclick();
                    };
                    return HeaderTemplateNew(res.Act_ItemCode, btnFindMaterial);
                },
                itemTemplate: (index: string, item: PQ_GetActivityMaterialClass): HTMLElement => {
                    let lbl = DocumentActions.CreateElement<HTMLLabelElement>("label");
                    lbl.innerText = item.ItemCode.toString();
                    return lbl;
                }
            },
            {
                title: res.Act_ItemName, visible: _ScreenLanguage == "ar", name: "DescA", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_MatDescA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Act_ItemName, txt);
                }
            },
            {
                title: res.Act_ItemName, visible: _ScreenLanguage == "en", name: "DescL", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescL", " ");
                    txt.id = "h_MatDescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Act_ItemName, txt);
                }
            },
            {
                title: res.Act_Unit, visible: _ScreenLanguage == "ar", name: "Unit_descA", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Unit_descA", " ");
                    txt.id = "h_Unit_descA"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Act_Unit, txt);
                }
            },
            {
                title: res.Act_Unit, visible: _ScreenLanguage == "en", name: "Unit_descE", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Unit_descE", " ");
                    txt.id = "h_Unit_descE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Act_Unit, txt);
                }
            },
            {
                title: res.Act_ProdQty, name: "ProdQty", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ProdQty", " ");
                    txt.id = "h_ProdQty";
                    txt.disabled = false;
                    txt.onkeyup = (e) => {
                        
                        calcWastQty();
                    };
                    return HeaderTemplateNew(res.Act_ProdQty, txt);
                }
            },
            {
                title: res.Act_WastPrc, name: "WastPrc", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "WastPrc", " ");
                    txt.id = "h_WastPrc"
                    txt.disabled = false;
                    txt.onkeyup = (e) => {
                        
                        calcWastQty();
                    };
                    return HeaderTemplateNew(res.Act_WastPrc, txt);
                }
            },
            {
                title: res.Act_WastQty, name: "WastQty", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "WastQty", " ");
                    txt.id = "h_WastQty"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Act_WastQty, txt);
                }
            },
            {
                title: res.Act_ReqQty, name: "ReqQty", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ReqQty", " ");
                    txt.id = "h_ReqQty"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Act_ReqQty, txt);
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
                    btn.id = "btnAddItemMaterialGrid";
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        
                        AddItemInMaterialGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GetActivityMaterialClass): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "24px";
                    btn.type = "button";
                    btn.style.color = "red";
                    btn.name = DetailsMaterial.indexOf(item).toString();
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsMaterial.splice(index, 1);
                        BindDataMaterialGrids();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            }
            ,
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: (s: string, item: PQ_GetActivityMaterialClass): HTMLButtonElement => {

                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.type = "button";
                    btn.name = DetailsMaterial.indexOf(item).toString();
                    btn.onclick = (e) => {
                        
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        DetailsAssignHeaderMaterial = new PQ_GetActivityMaterialClass();
                        h_ItemID = item.ItemID;
                        DetailsAssignHeaderMaterial.ItemCode = item.ItemCode;
                        DetailsAssignHeaderMaterial.DescA = item.DescA;
                        DetailsAssignHeaderMaterial.DescL = item.DescL;
                        DetailsAssignHeaderMaterial.Unit_descA = item.Unit_descA;
                        DetailsAssignHeaderMaterial.Unit_descE = item.Unit_descE;
                        DetailsAssignHeaderMaterial.ProdQty = item.ProdQty;
                        DetailsAssignHeaderMaterial.WastPrc = item.WastPrc;
                        DetailsAssignHeaderMaterial.WastQty = item.WastQty;
                        DetailsAssignHeaderMaterial.ReqQty = item.ReqQty;

                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsMaterial.splice(index, 1);
                        BindDataMaterialGrids();
                        //ReIndexingGrid();
                        
                        DetailsAssignHeaderMaterial.ItemID = h_ItemID;
                        $('#btnFindMaterial').text(DetailsAssignHeaderMaterial.ItemCode);
                        FillInputText("h_MatDescA", DetailsAssignHeaderMaterial.DescA);
                        FillInputText("h_MatDescE", DetailsAssignHeaderMaterial.DescL);
                        FillInputText("h_Unit_descA", DetailsAssignHeaderMaterial.Unit_descA);
                        FillInputText("h_Unit_descE", DetailsAssignHeaderMaterial.Unit_descE);
                        FillInputText("h_ProdQty", DetailsAssignHeaderMaterial.ProdQty.toString());
                        FillInputText("h_WastPrc", DetailsAssignHeaderMaterial.WastPrc.toString());
                        FillInputText("h_WastQty", DetailsAssignHeaderMaterial.WastQty.toString());
                        FillInputText("h_ReqQty", DetailsAssignHeaderMaterial.ReqQty.toString());
                    };
                    return btn;
                }
            }
        ];
        GridMaterial.DataSource = DetailsMaterial;
        GridMaterial.Bind();

        // GridLabor Classes
        GridLabor.ElementName = "GridLabor";
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
        GridLabor.OnItemInserting = InsertLaborRow;
        GridLabor.OnItemUpdating = () => { };
        GridLabor.OnItemDeleting = () => { };
        GridLabor.Columns = [
            {
                title: res.Act_LaborClass, name: "LaborClassId", width: columnWidth, css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let btnFindMaterial: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindMaterial = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindMaterial.className = "btn btn-primary btn-block addable editable";
                    btnFindMaterial.innerText = _ScreenLanguage == "ar" ? "تحميل المواد" : "Loading Labor";
                    btnFindMaterial.id = "btnFindLabor";
                    btnFindMaterial.type = "button";
                    btnFindMaterial.onclick = (e) => {
                        btnFindLabor_onclick();
                    };
                    return HeaderTemplateNew(res.Act_LaborClass, btnFindMaterial);
                },
                itemTemplate: (index: string, item: PQ_GetActivityLaborClass): HTMLElement => {
                    let lbl = DocumentActions.CreateElement<HTMLLabelElement>("label");
                    lbl.innerText = item.ClassCode.toString();
                    return lbl;
                }
            },
            {
                title: res.Act_LaborClassName, visible: _ScreenLanguage == "ar", name: "DescA", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_LaborDescA"
                    txt.disabled = true;
                    txt.hidden = _ScreenLanguage == "en";
                    return HeaderTemplateNew(res.Act_LaborClassName, txt);
                }
            },
            {
                title: res.Act_LaborClassName, visible: _ScreenLanguage == "en", name: "DescE", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescE", " ");
                    txt.id = "h_LaborDescE"
                    txt.disabled = true;
                    txt.hidden = _ScreenLanguage == "ar";
                    return HeaderTemplateNew(res.Act_LaborClassName, txt);
                }
            },
            {
                title: res.Act_NoOfLabors, name: "NoOfLabors", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "NoOfLabors", " ");
                    txt.id = "h_NoOfLabors"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Act_NoOfLabors, txt);
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
                    btn.id = "btnAddItemLaborGrid";
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddItemInLaborGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GetActivityLaborClass): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.type = "button";
                    btn.name = DetailsLabor.indexOf(item).toString();
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsLabor.splice(index, 1);
                        BindDataLaborGrids();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: (s: string, item: PQ_GetActivityLaborClass): HTMLButtonElement => {

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
                        DetailsAssignHeaderLabor = new PQ_GetActivityLaborClass();
                        h_LaborClassId = item.LaborClassId;
                        DetailsAssignHeaderLabor.ClassCode = item.ClassCode;
                        DetailsAssignHeaderLabor.DescA = item.DescA;
                        DetailsAssignHeaderLabor.DescE = item.DescE;
                        DetailsAssignHeaderLabor.NoOfLabors = item.NoOfLabors;

                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsLabor.splice(index, 1);
                        BindDataLaborGrids();
                        //ReIndexingGrid();
                        
                        DetailsAssignHeaderLabor.LaborClassId = h_LaborClassId;
                        $('#btnFindLabor').text(DetailsAssignHeaderLabor.ClassCode);
                        FillInputText("h_LaborDescA", DetailsAssignHeaderLabor.DescA);
                        FillInputText("h_LaborDescE", DetailsAssignHeaderLabor.DescE);
                        FillInputText("h_NoOfLabors", DetailsAssignHeaderLabor.NoOfLabors.toString());
                    };
                    return btn;
                }
            }
        ];
        GridLabor.DataSource = DetailsLabor;
        GridLabor.Bind();

        //GridEquipment
        GridEquipment.ElementName = "GridEquipment";
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
                title: res.Act_EquipClassName, name: "EquipClassId", width: columnWidth, css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let btnFindMaterial: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindMaterial = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindMaterial.className = "btn btn-primary btn-block addable editable";
                    btnFindMaterial.innerText = _ScreenLanguage == "ar" ? "تحميل المعدات" : "Loading Equip";
                    btnFindMaterial.id = "btnFindEquip";
                    btnFindMaterial.type = "button";
                    btnFindMaterial.onclick = (e) => {
                        btnFindEquip_onclick();
                    };
                    return HeaderTemplateNew(res.Act_EquipClassName, btnFindMaterial);
                },
                itemTemplate: (index: string, item: PQ_GetActivityEquipmentClass): HTMLElement => {
                    let lbl = DocumentActions.CreateElement<HTMLLabelElement>("label");
                    lbl.innerText = item.ClassCode.toString();
                    return lbl;
                }
            },
            {
                title: res.Act_EquipName, visible: _ScreenLanguage == "ar", name: "DescA", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_EquipDescA"
                    txt.disabled = true;
                    txt.hidden = _ScreenLanguage == "en";
                    return HeaderTemplateNew(res.Act_EquipName, txt);
                }
            },
            {
                title: res.Act_EquipName, visible: _ScreenLanguage == "en", name: "DescE", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescE", " ");
                    txt.id = "h_EquipDescE"
                    txt.disabled = true;
                    txt.hidden = _ScreenLanguage == "ar";
                    return HeaderTemplateNew(res.Act_EquipName, txt);
                }
            },
            {
                title: res.Act_NoOfEquipments, name: "NoOfEquipments", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "NoOfEquipments", " ");
                    txt.id = "h_NoOfEquipments"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Act_NoOfEquipments, txt);
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
                    btn.id = "btnAddItemEquipGrid";
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        
                        AddItemInEquipGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GetActivityEquipmentClass): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.type = "button";
                    btn.name = DetailsEquip.indexOf(item).toString();
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsEquip.splice(index, 1);
                        BindDataEquipGrids();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: (s: string, item: PQ_GetActivityEquipmentClass): HTMLButtonElement => {

                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.type = "button";
                    btn.name = DetailsEquip.indexOf(item).toString();
                    btn.onclick = (e) => {
                        
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        DetailsAssignHeaderEquip = new PQ_GetActivityEquipmentClass();
                        h_EquipClassId = item.EquipClassId;
                        DetailsAssignHeaderEquip.ClassCode = item.ClassCode;
                        DetailsAssignHeaderEquip.DescA = item.DescA;
                        DetailsAssignHeaderEquip.DescE = item.DescE;
                        DetailsAssignHeaderEquip.NoOfEquipments = item.NoOfEquipments;

                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsEquip.splice(index, 1);
                        BindDataEquipGrids();
                        //ReIndexingGrid();
                        
                        DetailsAssignHeaderEquip.EquipClassId = h_EquipClassId;
                        $('#btnFindEquip').text(DetailsAssignHeaderEquip.ClassCode);
                        FillInputText("h_EquipDescA", DetailsAssignHeaderEquip.DescA);
                        FillInputText("h_EquipDescE", DetailsAssignHeaderEquip.DescE);
                        FillInputText("h_NoOfEquipments", DetailsAssignHeaderEquip.NoOfEquipments.toString());
                    };
                    return btn;
                }
            }
        ];
        GridEquipment.DataSource = DetailsEquip;
        GridEquipment.Bind();
    }

    function Navigate() {
        
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {
                
                Master = d.result as P_D_Activity;
                Display();
            }
        })
    }

    function Add() {
        txtUomID.value = "";
        txtUomName.value = "";
        txtParentActivityID.value = "";
        txtParentActivityName.value = "";
        txtActivityLevel.value = "1";
        ClearGrid(GridMaterial, MaterialDataSource);
        ClearGrid(GridLabor, LaborDataSource);
        ClearGrid(GridEquipment, EquipDataSource);

        // New 
        
        $('#h_WastPrc').val(wastvalue[0].MaterialWastPrc);
        $('#h_ProdQty').val(0);
        ChkIsDetail.checked = true;
        txtDailyProd.value = "";
        //MasterDetails.P_D_Activity.IsDetail = 1;
        ////////////////////
    }

    function ClearGrid<T>(_Grid: JsGrid = new JsGrid(), arr: Array<T>) {
        arr = new Array();
        _Grid.DataSource = arr;
        _Grid.Bind();
    }

    function Insert() {
        
        if (Number(txtHourProduction.value) <= 0 || IsNullOrEmpty(txtHourProduction.value)) {
            WorningMessage("ساعات الانتاج لا يمكن ان تكون بصفر", "Hour Production Must Not Equal Zero Or Null");
            return;
        }
        if (IsNullOrEmpty(txtParentActivityID.value)) {
            Master.IsDetail = 0;
        }
        Assign();
        Master.IsDetail = 1;
        MasterDetails.P_D_Activity.IsDetail = 1;
        Master.ParentActivityID = parentactivityId;
        Master.UomID = uomId;
        Ajax.CallAsync({
            url: Url.Action("Insert", ControllerName),
            data: { JsonData: JSON.stringify(MasterDetails) },
            success: (d) => {
                
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);              
                    let msg: string = ReturnMsg("تم الحفظ  ", "Data Saved");
                    MessageBox.Show(msg, "Insert", () => {
                        
                        //Display();
                        let _Index = GetIndexByUseId(result.ResponseData, "P_D_Activity", "ActivityID");
                        NavigateToSearchResultKey(Number(_Index), Navigate)
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Insert");
            }
        });
    }
   
    function Update() {
        debugger
        if (Number(txtHourProduction.value) <= 0 || IsNullOrEmpty(txtHourProduction.value)) {
            WorningMessage("ساعات الانتاج لا يمكن ان تكون بصفر", "Hour Production Must Not Equal Zero Or Null");
            return;
        }
        Assign();
        Master.UomID = uomId;
        Master.CompCode = Number(_CompCode);
        Ajax.CallAsync({
            url: Url.Action("Update", ControllerName),
            data: { JsonData: JSON.stringify(MasterDetails) },
            success: (d) => {
                debugger;
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Insert", () => {
                        
                        Display();
                        let _Index = GetIndexByUseId(result.ResponseData, "P_D_Activity", "ActivityID");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        })
    }

    function Display() {
        
        DocumentActions.RenderFromModel(Master);
        txtDailyProd.value =( Number(txtHourProduction.value) * 8).toString();
        getUom();
        if (Master.IsDetail == 1) {
            //chkIsDetail.disabled = true;
            getMaterial(Master.ActivityID);
            getLaborClassess(Master.ActivityID);
            getEquipment(Master.ActivityID);
            activeControls();
            getParent(Number(Master.ParentActivityID));
            uomId = Master.UomID;
            parentactivityId = Master.ParentActivityID;
            ChkIsDetail.checked = true;
        }
        else {
            //chkIsDetail.disabled = true;
            getParent(Number(Master.ParentActivityID));
            disableControls();
            ClearGrid(GridMaterial, MaterialDataSource);
            ClearGrid(GridLabor, LaborDataSource);
            ClearGrid(GridEquipment, EquipDataSource);
        }
    }

    function activeControls() {
        
        $('#btnMaterial').removeAttr('disabled');
        $('#btnLabor').removeAttr('disabled');
        $('#btnEquipt').removeAttr('disabled');
        $('#txtHourProduction').removeAttr('disabled');
        $('#txtLaborProdRate').removeAttr('disabled');
        $('#txtUnitPrice').removeAttr('disabled');
    }

    function disableControls() {
        $('#btnMaterial').attr('disabled', 'disabled');
        $('#btnLabor').attr('disabled', 'disabled');
        $('#btnEquipt').attr('disabled', 'disabled');
        $('#btnFindMaterial').attr('disabled', 'disabled');
        $('#btnFindLabor').attr('disabled', 'disabled');
        $('#btnFindEquip').attr('disabled', 'disabled');
        //$('#txtHourProduction').removeClass('editable');
        //$('#txtLaborProdRate').removeClass('editable');
        //$('#txtUnitPrice').removeClass('editable');
        $('#txtDailyProd').removeClass('editable');
        //$('#txtHourProduction').attr('disabled', 'disabled');
        txtHourProduction.value = "";
        //$('#txtLaborProdRate').attr('disabled', 'disabled');
        txtLaborProdRate.value = "";
        //$('#txtUnitPrice').attr('disabled', 'disabled');
        txtUnitPrice.value = "";
        $('#txtDailyProd').attr('disabled', 'disabled');
        txtDailyProd.value = "";
    }

    function Assign() {
        
        //AssignMaster
        //Master = new P_D_Activity();
        DocumentActions.AssignToModel<P_D_Activity>(Master);
        MasterDetails.P_D_Activity = Master as P_D_Activity;
        MasterDetails.P_D_Activity.ActivityID = Master.ActivityID;;
       
        
        //AssignDetails
        MasterDetails.P_D_ActivityEquipClass = DetailsEquip as Array<PQ_GetActivityEquipmentClass>;
        for (var equip of DetailsEquip) {
            equip.ActivityID = Master.ActivityID;
            Tbl_DetailEquipt.push(equip);
        }

        MasterDetails.P_D_ActivityIMaterial = DetailsMaterial as Array<PQ_GetActivityMaterialClass>;
        for (var material of DetailsMaterial) {
            material.ActivityID = Master.ActivityID;
            Tbl_DetailMaterial.push(material);
        }

        MasterDetails.P_D_ActivityLaborClass = DetailsLabor as Array<PQ_GetActivityLaborClass>;
        for (var labor of DetailsLabor) {
            labor.ActivityID = Master.ActivityID;
            Tbl_DetailLabor.push(labor);
        }
    }
    
    function Edit() {
        $('#h_WastPrc').val(wastvalue[0].MaterialWastPrc);
        $('#h_ProdQty').val(0);
        if (Master.IsDetail == 0) {
            disableControls();
        }
    }

    function Undo() {
        txtUomID.value = "";
        txtUomName.value = "";
        txtParentActivityID.value = "";
        txtParentActivityName.value = "";
    }

    function btnUomID_Clicked() {
        sys.FindKey(Modules.WorkActivities, "btnUomID", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("UomList", ControllerName),
                data: { id: id },
                success: (d) => {
                    uom = d.result as P_D_UOM;
                    uomId = uom.UomID;
                    txtUomID.value = uom.UomCode;
                    txtUomName.value = uom.DescE.toString();
                }
            });
        });
    }

    function btnActCode_Clicked() {
        sys.FindKey(Modules.WorkActivities, "btnActCode", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("activityList", ControllerName),
                data: { id: id },
                success: (d) => {
                    Master = d.result as P_D_Activity;
                    txtActivityCode.value = Master.ActivityCode.toString();
                    let index: string = GetIndexByUseId(id, "P_D_Activity", "ActivityID");
                    NavigateToSearchResultKey(Number(index), Navigate);
                }
            });
        });
    }

    function btnParentActivity_Clicked() {
        sys.FindKey(Modules.WorkActivities, "btnParentActivity", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("activityList", ControllerName),
                data: { id: id },
                success: (d) => {
                    let _Master = d.result as P_D_Activity;
                    parentactivityId = _Master.ActivityID;
                    txtParentActivityID.value = _Master.ActivityCode.toString();
                    txtParentActivityName.value = _Master.DescE.toString();
                    txtActivityLevel.value = (Master.ActivityLevel + 1).toString();
                    disableControls();
                }
            });
        });
    }

    function getUom() {
        Ajax.CallAsync({
            url: Url.Action("UomList", ControllerName),
            data: { id: Number(Master.UomID) },
            success: (d) => {
                let _uom = d.result as P_D_UOM;
                txtUomID.value = _uom.UomCode;
                txtUomName.value = _uom.DescE;
            }
        })
    }

    function getParent(parentid: number) {
        
        Ajax.CallAsync({
            url: Url.Action("getParent", ControllerName),
            data: { _id: Number(Master.ParentActivityID) },
            success: (d) => {
                
                let master = d.result as P_D_Activity;
                if (master != null) {
                    txtParentActivityID.value = master.ActivityCode;
                    txtParentActivityName.value = master.DescE;
                }
            }
        })
    }

    function InsertMaterialRow(e: JsGridInsertEventArgs) {
        
        let detalisMaterial: PQ_GetActivityMaterialClass = new PQ_GetActivityMaterialClass();
        detalisMaterial = e.Item;
        //let actitvityID: number = Number(Master.ActivityID);
        //detalisMaterial.ActivityID = actitvityID;
        DetailsMaterial.unshift(detalisMaterial);
        GridMaterial.DataSource = DetailsMaterial;
        GridMaterial.Bind();
    }

    function InsertLaborRow(e: JsGridInsertEventArgs) {
        
        let detalisLabor: PQ_GetActivityLaborClass = new PQ_GetActivityLaborClass();
        detalisLabor = e.Item;
        //let actitvityID: number = Number(Master.ActivityID);
        //detalisLabor.ActivityID = actitvityID;
        DetailsLabor.unshift(detalisLabor);
        GridLabor.DataSource = DetailsLabor;
        GridLabor.Bind();
    }

    function getMaterial(activity_id: number) {
        Ajax.CallAsync({
            url: Url.Action("getMaterial", ControllerName),
            data: { id: activity_id },
            success: (d) => {
                DetailsMaterial = d.result as Array<PQ_GetActivityMaterialClass>;
                GridMaterial.DataSource = DetailsMaterial;
                GridMaterial.Bind();
            }
        });
    }

    function getLaborClassess(activity_id: number) {
        Ajax.CallAsync({
            url: Url.Action("getLaborClassess", ControllerName),
            data: { id: activity_id },
            success: (d) => {
                DetailsLabor = d.result as Array<PQ_GetActivityLaborClass>;
                GridLabor.DataSource = DetailsLabor;
                GridLabor.Bind();
            }
        });
    }

    function getEquipment(activity_id: number) {
        Ajax.CallAsync({
            url: Url.Action("getEquip", ControllerName),
            data: { id: activity_id },
            success: (d) => {
                DetailsEquip = d.result as Array<PQ_GetActivityEquipmentClass>;
                GridEquipment.DataSource = DetailsEquip;
                GridEquipment.Bind();
            }
        });
    }

    function FillInputText(_TextID: string, _Data: string) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }

    function BindDataMaterialGrids() {
        
        GridMaterial.DataSource = DetailsMaterial;
        GridMaterial.Bind();
    }

    function BindDataLaborGrids() {
        GridLabor.DataSource = DetailsLabor;
        GridLabor.Bind();
    }

    function BindDataEquipGrids() {
        GridEquipment.DataSource = DetailsEquip;
        GridEquipment.Bind();
    }

    function AddItemInMaterialGrid() {
        
        let test: string = $('#h_MatDescE').val();
        if (test == " ") {
            WorningMessage("يجب اضافة بيانات اولا", "You Should Add Record Data To Insert In Grid");
            return;
        }
        let code: string = $('#btnFindMaterial').text();
        for (var itm of DetailsMaterial) {
            if (code == itm.ItemCode) {
                WorningMessage("لا يمكن تكرار نفس العنصر ", "This item is Exist in The Grid");
                return;
            }
        }

        DetailsAssignHeaderMaterial = new PQ_GetActivityMaterialClass();
        DetailsAssignHeaderMaterial.ItemID = h_ItemID;
        DetailsAssignHeaderMaterial.ItemCode = $('#btnFindMaterial').text();
        DetailsAssignHeaderMaterial.DescA = $('#h_MatDescA').val();
        DetailsAssignHeaderMaterial.DescL = $('#h_MatDescE').val();
        DetailsAssignHeaderMaterial.Unit_descA = $('#h_Unit_descA').val();
        DetailsAssignHeaderMaterial.Unit_descE = $('#h_Unit_descE').val();
        DetailsAssignHeaderMaterial.ProdQty = $('#h_ProdQty').val();
        DetailsAssignHeaderMaterial.WastPrc = $('#h_WastPrc').val();
        DetailsAssignHeaderMaterial.WastQty = $('#h_WastQty').val();
        DetailsAssignHeaderMaterial.ReqQty = $('#h_ReqQty').val();
        DetailsMaterial.unshift(DetailsAssignHeaderMaterial);
        BindDataMaterialGrids();
    }

    function AddItemInLaborGrid() {
        
        let test: string = $('#h_LaborDescE').val();
        if (test == " ") {
            WorningMessage("يجب اضافة بيانات اولا", "You Should Add Record Data To Insert In Grid");
            return;
        }
        let code: string = $('#btnFindLabor').text();
        for (var itm of DetailsLabor) {
            if (code == itm.ClassCode) {
                WorningMessage("لا يمكن تكرار نفس العنصر ", "This item is Exist in The Grid");
                return;
            }
        }
        DetailsAssignHeaderLabor = new PQ_GetActivityLaborClass();
        DetailsAssignHeaderLabor.LaborClassId = h_LaborClassId;
        DetailsAssignHeaderLabor.ClassCode = $('#btnFindLabor').text();
        DetailsAssignHeaderLabor.DescA = $('#h_LaborDescA').val();
        DetailsAssignHeaderLabor.DescE = $('#h_LaborDescE').val();
        DetailsAssignHeaderLabor.NoOfLabors = $('#h_NoOfLabors').val();
        DetailsLabor.unshift(DetailsAssignHeaderLabor);
        BindDataLaborGrids();
    }

    function AddItemInEquipGrid() {
        
        let test: string = $('#h_EquipDescE').val();
        if (test == " ") {
            WorningMessage("يجب اضافة بيانات اولا", "You Should Add Record Data To Insert In Grid");
            return;
        }
        let code: string = $('#btnFindEquip').text();
        for (var itm of DetailsEquip) {
            if (code == itm.ClassCode) {
                WorningMessage("لا يمكن تكرار نفس العنصر ", "This item is Exist in The Grid");
                return;
            }
        }
        DetailsAssignHeaderEquip = new PQ_GetActivityEquipmentClass();
        DetailsAssignHeaderEquip.EquipClassId = h_EquipClassId;
        DetailsAssignHeaderEquip.ClassCode = $('#btnFindEquip').text();
        DetailsAssignHeaderEquip.DescA = $('#h_EquipDescA').val();
        DetailsAssignHeaderEquip.DescE = $('#h_EquipDescE').val();
        DetailsAssignHeaderEquip.NoOfEquipments = $('#h_NoOfEquipments').val();
        DetailsEquip.unshift(DetailsAssignHeaderEquip);
        BindDataEquipGrids();
    }

    function btnFindMaterial_onclick() {
        
        sys.FindKey(Modules.WorkActivities, "btnFindMaterial", "CompCode = " + _CompCode , () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            
            Ajax.CallAsync({
                url: Url.Action("findMaterial", ControllerName),
                data: { id: _Id},
                success: (d) => {
                    
                    let result = d.result as IQ_SrchItem;
                    h_ItemID = result.ItemID;
                    $('#h_WastPrc').val(wastvalue[0].MaterialWastPrc);
                    $('#btnFindMaterial').text(result.ItemCode);
                    $('#h_MatDescA').val(result.DescA);
                    $('#h_Unit_descA').val(result.Unit_descA);
                    $('#h_MatDescE').val(result.DescL);
                    $('#h_Unit_descE').val(result.Unit_descE);
                }
            });
        })
    }

    function btnFindLabor_onclick() {
        
        sys.FindKey(Modules.WorkActivities, "btnFindLabor", "" , () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("findLabor", ControllerName),
                data: { id: _Id},
                success: (d) => {
                    
                    let result = d.result as P_D_LaborClass;
                    h_LaborClassId = result.LaborClassId;
                    $('#btnFindLabor').text(result.ClassCode);
                    $('#h_LaborDescA').val(result.DescA);
                    $('#h_LaborDescE').val(result.DescE);
                    $('#h_NoOfLabors').val(1);
                }
            });
        })
    }

    function btnFindEquip_onclick() {
        
        sys.FindKey(Modules.WorkActivities, "btnFindEquip", "" , () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("findEquip", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as P_D_EquipmentClass;
                    h_EquipClassId = result.EquipClassId;
                    $('#btnFindEquip').text(result.ClassCode);
                    $('#h_EquipDescA').val(result.DescA);
                    $('#h_EquipDescE').val(result.DescE);
                    $('#h_NoOfEquipments').val(1);
                }
            });
        })
    }

    // Calculations
    function calcWastQty() {
        
        let result: number = (Number($('#h_ProdQty').val()) * Number($('#h_WastPrc').val())) / 100;
        $('#h_WastQty').val(result);
        let res: number = Number($('#h_ProdQty').val()) + Number($('#h_WastQty').val());
        $('#h_ReqQty').val(res);
    }

    function CalcDailyQty() {
        txtDailyProd.value = (Number(txtHourProduction.value) * 8).toString();
    }
    export function OpenReportsPopup(moduleCode: string) {

        let opt: JQueryAjaxSettings = {
            url: Url.Action("_ActivityReport", "GeneralReports"),
            success: (d) => {
                
                let result = d as string;
                $("#ReportPopupBody").html(result);
                $("#ReportsPopupDialog").modal("show");
                $('#ReportsPopupDialog').modal({
                    refresh: true
                });

                var val = $("#rpTitle").text();
                $("#TitleSpanRep").html(val);
            }
        };
        Ajax.CallAsync(opt);

    }
}