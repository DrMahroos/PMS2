$(document).ready(function () {
    WorkActivities.InitalizeComponent();
});
var WorkActivities;
(function (WorkActivities) {
    var ControllerName = "WorkActivities";
    var GridInputClassName = "form-control gridIput";
    var columnWidth = "100px";
    var wastvalue = new Array();
    var M_D_Activites = /** @class */ (function () {
        function M_D_Activites() {
        }
        return M_D_Activites;
    }());
    var MasterDetails = new M_D_Activites();
    var Master;
    var MaterialDataSource = new Array();
    var DetailsMaterial = new Array();
    var DetailsAssignHeaderMaterial = new PQ_GetActivityMaterialClass();
    var Tbl_DetailMaterial = new Array();
    var LaborDataSource = new Array();
    var DetailsLabor = new Array();
    var DetailsAssignHeaderLabor = new PQ_GetActivityLaborClass();
    var Tbl_DetailLabor = new Array();
    var EquipDataSource = new Array();
    var DetailsEquip = new Array();
    var DetailsAssignHeaderEquip = new PQ_GetActivityEquipmentClass();
    var Tbl_DetailEquipt = new Array();
    var Master = new P_D_Activity();
    var NumberColumnWidth = "50px";
    var GridMaterial = new JsGrid();
    var GridLabor = new JsGrid();
    var GridEquipment = new JsGrid();
    var sys = new SystemTools();
    var uom = new P_D_UOM();
    var db = new AjaxCaller();
    var txtActivityCode;
    var txtDescA;
    var txtDescE;
    var txtUomID;
    var txtUomName;
    var txtParentActivityID;
    var txtParentActivityName;
    var txtActivityLevel;
    var txtRemarks;
    var txtHourProduction;
    var txtLaborProdRate;
    var txtUnitPrice;
    var txtDailyProd;
    var ChkIsDetail;
    var btnActCode;
    var btnUomID;
    var btnParentActivity;
    var btnMaterial;
    var btnLabor;
    var btnEquipt;
    var parentactivityId;
    var uomId;
    var h_ItemID;
    var h_LaborClassId;
    var h_EquipClassId;
    var _ScreenLanguage;
    var _CompCode;
    //var _BranchCode: string;
    function InitalizeComponent() {
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
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.PrintAction(function () {
            OpenReportsPopup("_ActivityReport");
        });
        ControlsButtons.DeleteAction(function () { });
        ControlsButtons.UndoAction(Undo);
        InitalizeGrid();
        wastvalue = Ajax.Call({ url: Url.Action("getWasteValue", ControllerName) });
        $('#h_WastPrc').val(wastvalue[0].MaterialWastPrc);
    }
    WorkActivities.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtActivityCode = DocumentActions.GetElementById("txtActivityCode");
        txtDescA = DocumentActions.GetElementById("txtDescA");
        txtDescE = DocumentActions.GetElementById("txtDescE");
        txtUomID = DocumentActions.GetElementById("txtUomID");
        txtUomName = DocumentActions.GetElementById("txtUomName");
        txtParentActivityID = DocumentActions.GetElementById("txtParentActivityID");
        txtParentActivityName = DocumentActions.GetElementById("txtParentActivityName");
        txtActivityLevel = DocumentActions.GetElementById("txtActivityLevel");
        txtRemarks = DocumentActions.GetElementById("txtRemarks");
        txtHourProduction = DocumentActions.GetElementById("txtHourProduction");
        txtLaborProdRate = DocumentActions.GetElementById("txtLaborProdRate");
        txtUnitPrice = DocumentActions.GetElementById("txtUnitPrice");
        txtDailyProd = DocumentActions.GetElementById("txtDailyProd");
        ChkIsDetail = DocumentActions.GetElementById("ChkIsDetail");
        btnActCode = DocumentActions.GetElementById("btnActCode");
        btnUomID = DocumentActions.GetElementById("btnUomID");
        btnParentActivity = DocumentActions.GetElementById("btnParentActivity");
        btnMaterial = DocumentActions.GetElementById("btnMaterial");
        btnLabor = DocumentActions.GetElementById("btnLabor");
        btnEquipt = DocumentActions.GetElementById("btnEquipt");
    }
    function InitalizeEvents() {
        btnUomID.onclick = btnUomID_Clicked;
        btnActCode.onclick = btnActCode_Clicked;
        btnParentActivity.onclick = btnParentActivity_Clicked;
        txtHourProduction.onkeyup = CalcDailyQty;
        //txtParentActivityID.onchange = disableControls;
    }
    function InitalizeGrid() {
        var res = GetResourceList("Act_");
        // GridMaterial
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
                title: res.Act_ItemCode, name: "ItemCode", width: columnWidth, css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var btnFindMaterial = DocumentActions.CreateElement("button");
                    btnFindMaterial = DocumentActions.CreateElement("button");
                    btnFindMaterial.className = "btn btn-primary btn-block addable editable";
                    btnFindMaterial.innerText = _ScreenLanguage == "ar" ? "تحميل المواد" : "Loading Material";
                    btnFindMaterial.id = "btnFindMaterial";
                    btnFindMaterial.type = "button";
                    btnFindMaterial.onclick = function (e) {
                        btnFindMaterial_onclick();
                    };
                    return HeaderTemplateNew(res.Act_ItemCode, btnFindMaterial);
                },
                itemTemplate: function (index, item) {
                    var lbl = DocumentActions.CreateElement("label");
                    lbl.innerText = item.ItemCode.toString();
                    return lbl;
                }
            },
            {
                title: res.Act_ItemName, visible: _ScreenLanguage == "ar", name: "DescA", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_MatDescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Act_ItemName, txt);
                }
            },
            {
                title: res.Act_ItemName, visible: _ScreenLanguage == "en", name: "DescL", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescL", " ");
                    txt.id = "h_MatDescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Act_ItemName, txt);
                }
            },
            {
                title: res.Act_Unit, visible: _ScreenLanguage == "ar", name: "Unit_descA", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Unit_descA", " ");
                    txt.id = "h_Unit_descA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Act_Unit, txt);
                }
            },
            {
                title: res.Act_Unit, visible: _ScreenLanguage == "en", name: "Unit_descE", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Unit_descE", " ");
                    txt.id = "h_Unit_descE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Act_Unit, txt);
                }
            },
            {
                title: res.Act_ProdQty, name: "ProdQty", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ProdQty", " ");
                    txt.id = "h_ProdQty";
                    txt.disabled = false;
                    txt.onkeyup = function (e) {
                        calcWastQty();
                    };
                    return HeaderTemplateNew(res.Act_ProdQty, txt);
                }
            },
            {
                title: res.Act_WastPrc, name: "WastPrc", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "WastPrc", " ");
                    txt.id = "h_WastPrc";
                    txt.disabled = false;
                    txt.onkeyup = function (e) {
                        calcWastQty();
                    };
                    return HeaderTemplateNew(res.Act_WastPrc, txt);
                }
            },
            {
                title: res.Act_WastQty, name: "WastQty", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "WastQty", " ");
                    txt.id = "h_WastQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Act_WastQty, txt);
                }
            },
            {
                title: res.Act_ReqQty, name: "ReqQty", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ReqQty", " ");
                    txt.id = "h_ReqQty";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Act_ReqQty, txt);
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
                    btn.id = "btnAddItemMaterialGrid";
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddItemInMaterialGrid();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "24px";
                    btn.type = "button";
                    btn.style.color = "red";
                    btn.name = DetailsMaterial.indexOf(item).toString();
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        var index = Number(e.currentTarget.name);
                        DetailsMaterial.splice(index, 1);
                        BindDataMaterialGrids();
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
                    btn.name = DetailsMaterial.indexOf(item).toString();
                    btn.onclick = function (e) {
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
                        var index = Number(e.currentTarget.name);
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
        GridLabor.OnItemInserting = InsertLaborRow;
        GridLabor.OnItemUpdating = function () { };
        GridLabor.OnItemDeleting = function () { };
        GridLabor.Columns = [
            {
                title: res.Act_LaborClass, name: "LaborClassId", width: columnWidth, css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var btnFindMaterial = DocumentActions.CreateElement("button");
                    btnFindMaterial = DocumentActions.CreateElement("button");
                    btnFindMaterial.className = "btn btn-primary btn-block addable editable";
                    btnFindMaterial.innerText = _ScreenLanguage == "ar" ? "تحميل المواد" : "Loading Labor";
                    btnFindMaterial.id = "btnFindLabor";
                    btnFindMaterial.type = "button";
                    btnFindMaterial.onclick = function (e) {
                        btnFindLabor_onclick();
                    };
                    return HeaderTemplateNew(res.Act_LaborClass, btnFindMaterial);
                },
                itemTemplate: function (index, item) {
                    var lbl = DocumentActions.CreateElement("label");
                    lbl.innerText = item.ClassCode.toString();
                    return lbl;
                }
            },
            {
                title: res.Act_LaborClassName, visible: _ScreenLanguage == "ar", name: "DescA", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_LaborDescA";
                    txt.disabled = true;
                    txt.hidden = _ScreenLanguage == "en";
                    return HeaderTemplateNew(res.Act_LaborClassName, txt);
                }
            },
            {
                title: res.Act_LaborClassName, visible: _ScreenLanguage == "en", name: "DescE", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescE", " ");
                    txt.id = "h_LaborDescE";
                    txt.disabled = true;
                    txt.hidden = _ScreenLanguage == "ar";
                    return HeaderTemplateNew(res.Act_LaborClassName, txt);
                }
            },
            {
                title: res.Act_NoOfLabors, name: "NoOfLabors", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "NoOfLabors", " ");
                    txt.id = "h_NoOfLabors";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Act_NoOfLabors, txt);
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
                        AddItemInLaborGrid();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.type = "button";
                    btn.name = DetailsLabor.indexOf(item).toString();
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        var index = Number(e.currentTarget.name);
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
                        DetailsAssignHeaderLabor = new PQ_GetActivityLaborClass();
                        h_LaborClassId = item.LaborClassId;
                        DetailsAssignHeaderLabor.ClassCode = item.ClassCode;
                        DetailsAssignHeaderLabor.DescA = item.DescA;
                        DetailsAssignHeaderLabor.DescE = item.DescE;
                        DetailsAssignHeaderLabor.NoOfLabors = item.NoOfLabors;
                        var index = Number(e.currentTarget.name);
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
                title: res.Act_EquipClassName, name: "EquipClassId", width: columnWidth, css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var btnFindMaterial = DocumentActions.CreateElement("button");
                    btnFindMaterial = DocumentActions.CreateElement("button");
                    btnFindMaterial.className = "btn btn-primary btn-block addable editable";
                    btnFindMaterial.innerText = _ScreenLanguage == "ar" ? "تحميل المعدات" : "Loading Equip";
                    btnFindMaterial.id = "btnFindEquip";
                    btnFindMaterial.type = "button";
                    btnFindMaterial.onclick = function (e) {
                        btnFindEquip_onclick();
                    };
                    return HeaderTemplateNew(res.Act_EquipClassName, btnFindMaterial);
                },
                itemTemplate: function (index, item) {
                    var lbl = DocumentActions.CreateElement("label");
                    lbl.innerText = item.ClassCode.toString();
                    return lbl;
                }
            },
            {
                title: res.Act_EquipName, visible: _ScreenLanguage == "ar", name: "DescA", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_EquipDescA";
                    txt.disabled = true;
                    txt.hidden = _ScreenLanguage == "en";
                    return HeaderTemplateNew(res.Act_EquipName, txt);
                }
            },
            {
                title: res.Act_EquipName, visible: _ScreenLanguage == "en", name: "DescE", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescE", " ");
                    txt.id = "h_EquipDescE";
                    txt.disabled = true;
                    txt.hidden = _ScreenLanguage == "ar";
                    return HeaderTemplateNew(res.Act_EquipName, txt);
                }
            },
            {
                title: res.Act_NoOfEquipments, name: "NoOfEquipments", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "NoOfEquipments", " ");
                    txt.id = "h_NoOfEquipments";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Act_NoOfEquipments, txt);
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
                        AddItemInEquipGrid();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.type = "button";
                    btn.name = DetailsEquip.indexOf(item).toString();
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        var index = Number(e.currentTarget.name);
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
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.type = "button";
                    btn.name = DetailsEquip.indexOf(item).toString();
                    btn.onclick = function (e) {
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
                        var index = Number(e.currentTarget.name);
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
            success: function (d) {
                Master = d.result;
                Display();
            }
        });
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
    function ClearGrid(_Grid, arr) {
        if (_Grid === void 0) { _Grid = new JsGrid(); }
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
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم الحفظ  ", "Data Saved");
                    MessageBox.Show(msg, "Insert", function () {
                        //Display();
                        var _Index = GetIndexByUseId(result.ResponseData, "P_D_Activity", "ActivityID");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Insert");
            }
        });
    }
    function Update() {
        debugger;
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
            success: function (d) {
                debugger;
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Insert", function () {
                        Display();
                        var _Index = GetIndexByUseId(result.ResponseData, "P_D_Activity", "ActivityID");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        });
    }
    function Display() {
        DocumentActions.RenderFromModel(Master);
        txtDailyProd.value = (Number(txtHourProduction.value) * 8).toString();
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
        DocumentActions.AssignToModel(Master);
        MasterDetails.P_D_Activity = Master;
        MasterDetails.P_D_Activity.ActivityID = Master.ActivityID;
        ;
        //AssignDetails
        MasterDetails.P_D_ActivityEquipClass = DetailsEquip;
        for (var _i = 0, DetailsEquip_1 = DetailsEquip; _i < DetailsEquip_1.length; _i++) {
            var equip = DetailsEquip_1[_i];
            equip.ActivityID = Master.ActivityID;
            Tbl_DetailEquipt.push(equip);
        }
        MasterDetails.P_D_ActivityIMaterial = DetailsMaterial;
        for (var _a = 0, DetailsMaterial_1 = DetailsMaterial; _a < DetailsMaterial_1.length; _a++) {
            var material = DetailsMaterial_1[_a];
            material.ActivityID = Master.ActivityID;
            Tbl_DetailMaterial.push(material);
        }
        MasterDetails.P_D_ActivityLaborClass = DetailsLabor;
        for (var _b = 0, DetailsLabor_1 = DetailsLabor; _b < DetailsLabor_1.length; _b++) {
            var labor = DetailsLabor_1[_b];
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
        sys.FindKey(Modules.Uom, "btnUomID", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("UomList", ControllerName),
                data: { id: id },
                success: function (d) {
                    uom = d.result;
                    uomId = uom.UomID;
                    txtUomID.value = uom.UomCode;
                    txtUomName.value = uom.DescE.toString();
                }
            });
        });
    }
    function btnActCode_Clicked() {
        sys.FindKey(Modules.WorkActivities, "btnActCode", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("activityList", ControllerName),
                data: { id: id },
                success: function (d) {
                    Master = d.result;
                    txtActivityCode.value = Master.ActivityCode.toString();
                    var index = GetIndexByUseId(id, "P_D_Activity", "ActivityID");
                    NavigateToSearchResultKey(Number(index), Navigate);
                }
            });
        });
    }
    function btnParentActivity_Clicked() {
        sys.FindKey(Modules.ActivityDefinition, "btnParentActivity", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("activityList", ControllerName),
                data: { id: id },
                success: function (d) {
                    var _Master = d.result;
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
            success: function (d) {
                var _uom = d.result;
                txtUomID.value = _uom.UomCode;
                txtUomName.value = _uom.DescE;
            }
        });
    }
    function getParent(parentid) {
        Ajax.CallAsync({
            url: Url.Action("getParent", ControllerName),
            data: { _id: Number(Master.ParentActivityID) },
            success: function (d) {
                var master = d.result;
                if (master != null) {
                    txtParentActivityID.value = master.ActivityCode;
                    txtParentActivityName.value = master.DescE;
                }
            }
        });
    }
    function InsertMaterialRow(e) {
        var detalisMaterial = new PQ_GetActivityMaterialClass();
        detalisMaterial = e.Item;
        //let actitvityID: number = Number(Master.ActivityID);
        //detalisMaterial.ActivityID = actitvityID;
        DetailsMaterial.unshift(detalisMaterial);
        GridMaterial.DataSource = DetailsMaterial;
        GridMaterial.Bind();
    }
    function InsertLaborRow(e) {
        var detalisLabor = new PQ_GetActivityLaborClass();
        detalisLabor = e.Item;
        //let actitvityID: number = Number(Master.ActivityID);
        //detalisLabor.ActivityID = actitvityID;
        DetailsLabor.unshift(detalisLabor);
        GridLabor.DataSource = DetailsLabor;
        GridLabor.Bind();
    }
    function getMaterial(activity_id) {
        Ajax.CallAsync({
            url: Url.Action("getMaterial", ControllerName),
            data: { id: activity_id },
            success: function (d) {
                DetailsMaterial = d.result;
                GridMaterial.DataSource = DetailsMaterial;
                GridMaterial.Bind();
            }
        });
    }
    function getLaborClassess(activity_id) {
        Ajax.CallAsync({
            url: Url.Action("getLaborClassess", ControllerName),
            data: { id: activity_id },
            success: function (d) {
                DetailsLabor = d.result;
                GridLabor.DataSource = DetailsLabor;
                GridLabor.Bind();
            }
        });
    }
    function getEquipment(activity_id) {
        Ajax.CallAsync({
            url: Url.Action("getEquip", ControllerName),
            data: { id: activity_id },
            success: function (d) {
                DetailsEquip = d.result;
                GridEquipment.DataSource = DetailsEquip;
                GridEquipment.Bind();
            }
        });
    }
    function FillInputText(_TextID, _Data) {
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
        var test = $('#h_MatDescE').val();
        if (test == " ") {
            WorningMessage("يجب اضافة بيانات اولا", "You Should Add Record Data To Insert In Grid");
            return;
        }
        var code = $('#btnFindMaterial').text();
        for (var _i = 0, DetailsMaterial_2 = DetailsMaterial; _i < DetailsMaterial_2.length; _i++) {
            var itm = DetailsMaterial_2[_i];
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
        var test = $('#h_LaborDescE').val();
        if (test == " ") {
            WorningMessage("يجب اضافة بيانات اولا", "You Should Add Record Data To Insert In Grid");
            return;
        }
        var code = $('#btnFindLabor').text();
        for (var _i = 0, DetailsLabor_2 = DetailsLabor; _i < DetailsLabor_2.length; _i++) {
            var itm = DetailsLabor_2[_i];
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
        var test = $('#h_EquipDescE').val();
        if (test == " ") {
            WorningMessage("يجب اضافة بيانات اولا", "You Should Add Record Data To Insert In Grid");
            return;
        }
        var code = $('#btnFindEquip').text();
        for (var _i = 0, DetailsEquip_2 = DetailsEquip; _i < DetailsEquip_2.length; _i++) {
            var itm = DetailsEquip_2[_i];
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
        sys.FindKey(Modules.ActivityDefinition, "btnFindMaterial", "CompCode = " + _CompCode, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("findMaterial", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    h_ItemID = result.ItemID;
                    $('#h_WastPrc').val(wastvalue[0].MaterialWastPrc);
                    $('#btnFindMaterial').text(result.ItemCode);
                    $('#h_MatDescA').val(result.DescA);
                    $('#h_Unit_descA').val(result.Unit_descA);
                    $('#h_MatDescE').val(result.DescL);
                    $('#h_Unit_descE').val(result.Unit_descE);
                }
            });
        });
    }
    function btnFindLabor_onclick() {
        sys.FindKey(Modules.ActivityDefinition, "btnFindLabor", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("findLabor", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    h_LaborClassId = result.LaborClassId;
                    $('#btnFindLabor').text(result.ClassCode);
                    $('#h_LaborDescA').val(result.DescA);
                    $('#h_LaborDescE').val(result.DescE);
                    $('#h_NoOfLabors').val(1);
                }
            });
        });
    }
    function btnFindEquip_onclick() {
        sys.FindKey(Modules.ActivityDefinition, "btnFindEquip", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("findEquip", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    h_EquipClassId = result.EquipClassId;
                    $('#btnFindEquip').text(result.ClassCode);
                    $('#h_EquipDescA').val(result.DescA);
                    $('#h_EquipDescE').val(result.DescE);
                    $('#h_NoOfEquipments').val(1);
                }
            });
        });
    }
    // Calculations
    function calcWastQty() {
        var result = (Number($('#h_ProdQty').val()) * Number($('#h_WastPrc').val())) / 100;
        $('#h_WastQty').val(result);
        var res = Number($('#h_ProdQty').val()) + Number($('#h_WastQty').val());
        $('#h_ReqQty').val(res);
    }
    function CalcDailyQty() {
        txtDailyProd.value = (Number(txtHourProduction.value) * 8).toString();
    }
    function OpenReportsPopup(moduleCode) {
        var opt = {
            url: Url.Action("_ActivityReport", "GeneralReports"),
            success: function (d) {
                var result = d;
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
    WorkActivities.OpenReportsPopup = OpenReportsPopup;
})(WorkActivities || (WorkActivities = {}));
//# sourceMappingURL=WorkActivities.js.map