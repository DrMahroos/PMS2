$(document).ready(function () {
    Projectvaliation.InitalizeComponent();
});
var Projectvaliation;
(function (Projectvaliation) {
    var ControllerName = "Projectvaliation";
    var GridItems = new JsGrid();
    var GridActivities = new JsGrid();
    var sys = new SystemTools();
    var GridInputClassName = "form-control";
    var NumberColumnWidth = "50px";
    var columnWidth = "100px";
    var Master = new PQ_GetEngVariation();
    var MasterDetails = new M_D_EngVariation();
    var DetailsItems = new Array();
    var DetailsAssignHeaderItems = new PQ_GetEngVariationItem();
    var Tbl_DetailItems = new Array();
    var DetailsActivities = new Array();
    var Ppro_Details = new Array();
    var FilterDataSourceChild = new Array();
    var DetailsAssignHeaderActivities = new PQ_GetEngVariationActivity();
    var Tbl_DetailActivity = new Array();
    var ActivitiesList = new Array();
    var txtTrNo;
    var txtTrDate;
    var txtProj_ProjectCode;
    var txtProj_DescL;
    var txtVariationDescr;
    var txtRemarks;
    var txtRefNo;
    var txtRefDate;
    var txtVariationValue;
    var ChkAuthorize;
    var ChkIsSalesApprove;
    var txtItemCode;
    var txtItemName;
    var txtItemProgQty;
    var txtItemProdQty;
    var txtTotalItemProdQty;
    var txtNewItemPrdQty;
    var btnSearchTrNo;
    var btnSearchProject;
    var btnGeneratActivity;
    var btnprintActivity;
    // Grid Items Variables
    var ItemID = 0;
    var ProjectPhaseItemId = 0;
    var VariationId = 0;
    var VariationItemId = 0;
    var VariationGridItemId = 0;
    // Grid Activities Variables
    var ActivityID = 0;
    var ProjectPhaseId = 0;
    var ProjectPhaseItemActivId = 0;
    var VariationActivId = 0;
    var ProjectID = 0;
    var MasterProjectPhaseId = 0;
    var selectedItemId = 0;
    var _ScreenLang;
    var _CompCode;
    var _BraCode;
    var Condition;
    var Num_id;
    function InitalizeComponent() {
        //debugger;
        var ModuleCode1 = SharedSession.CurrentPrivileges.MODULE_CODE;
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        //debugger
        var ModuleCode2 = SharedSession.CurrentPrivileges.MODULE_CODE;
        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BraCode = SharedSession.CurrentEnvironment.BranchCode;
        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BraCode;
        //debugger
        var ModuleCode = SharedSession.CurrentPrivileges.MODULE_CODE;
        InitalizeControls();
        InitalizeEvents();
        InitalizeGrid();
        SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.AddButton.disabled = false;
        ControlsButtons.EditAction(Edit);
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add) {
                Insert(false);
            }
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update(false);
        });
        ControlsButtons.PrintAction(PrintVariationSum);
        ControlsButtons.DeleteAction(function () { });
        ControlsButtons.UndoAction(Undo);
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BraCode, Modules.ProjectChange, Master.VariationId.toString());
        });
    }
    Projectvaliation.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById("txtTrNo");
        txtTrDate = DocumentActions.GetElementById("txtTrDate");
        txtProj_ProjectCode = DocumentActions.GetElementById("txtProj_ProjectCode");
        txtProj_DescL = DocumentActions.GetElementById("txtProj_DescL");
        txtVariationDescr = DocumentActions.GetElementById("txtVariationDescr");
        txtRemarks = DocumentActions.GetElementById("txtRemarks");
        txtRefNo = DocumentActions.GetElementById("txtRefNo");
        txtRefDate = DocumentActions.GetElementById("txtRefDate");
        txtVariationValue = DocumentActions.GetElementById("txtVariationValue");
        ChkAuthorize = DocumentActions.GetElementById("ChkAuthorize");
        ChkIsSalesApprove = DocumentActions.GetElementById("ChkIsSalesApprove");
        txtItemCode = DocumentActions.GetElementById("txtItemCode");
        txtItemName = DocumentActions.GetElementById("txtItemName");
        txtItemProgQty = DocumentActions.GetElementById("txtItemProgQty");
        txtItemProdQty = DocumentActions.GetElementById("txtItemProdQty");
        txtTotalItemProdQty = DocumentActions.GetElementById("txtTotalItemProdQty");
        txtNewItemPrdQty = DocumentActions.GetElementById("txtNewItemPrdQty");
        btnSearchTrNo = DocumentActions.GetElementById("btnSearchTrNo");
        btnSearchProject = DocumentActions.GetElementById("btnSearchProject");
        btnGeneratActivity = DocumentActions.GetElementById("btnGeneratActivity");
        btnprintActivity = DocumentActions.GetElementById("btnprintActivity");
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
        var res = GetResourceList("Project_eng");
        GridItems.ElementName = "GridItems";
        GridItems.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridItems.OnRefreshed = function () {
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
                headerTemplate: function () {
                    var txt = CreateElement("checkbox", GridInputClassName, " ", " ", "IsNew", " ");
                    txt.id = "h_IsNew";
                    txt.disabled = false;
                    txt.onchange = function (e) {
                        var h_IsNew = document.getElementById("h_IsNew");
                        if (h_IsNew.checked == true) {
                            $("#h_LineCode").removeAttr("disabled");
                        }
                        else {
                            $("#h_LineCode").attr("disabled", "disabled");
                        }
                    };
                    return HeaderTemplateNew(res.Project_eng_Isnew, txt);
                }
            },
            {
                title: res.Project_eng_lineCode, name: "LineCode", width: "3%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "LineCode", " ");
                    txt.id = "h_LineCode";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Project_eng_lineCode, txt);
                }
            },
            {
                name: "itm_ItemCode", width: "5.0%", css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var btnFindItems = DocumentActions.CreateElement("button");
                    btnFindItems = DocumentActions.CreateElement("button");
                    btnFindItems.className = "btn btn-primary btn-block addable editable";
                    btnFindItems.innerText = _ScreenLang == "ar" ? "كود الصنف" : "Item Code";
                    btnFindItems.id = "btnFindItems";
                    btnFindItems.type = "button";
                    btnFindItems.onclick = function (e) {
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
                title: res.Project_eng_ItemNameAr, css: "ColumPadding", name: "DescA", width: "15%",
                headerTemplate: function () {
                    //let txt = CreateElement("textarea", GridInputClassName, " ", " ", "itm_DescA", " ");
                    var txt = DocumentActions.CreateElement("textarea");
                    txt.className = GridInputClassName;
                    txt.style.height = "35px";
                    txt.id = "h_itm_DescA";
                    return HeaderTemplateNew(res.Project_eng_ItemNameAr, txt);
                }
            },
            {
                title: res.Project_eng_ItemNameEn, css: "ColumPadding", name: "DescE", width: "15%",
                headerTemplate: function () {
                    //let txt = CreateElement("label", GridInputClassName, " ", " ", "itm_DescL", " ");
                    var txt = DocumentActions.CreateElement("textarea");
                    txt.className = GridInputClassName;
                    txt.style.height = "35px";
                    txt.id = "h_itm_DescL";
                    return HeaderTemplateNew(res.Project_eng_ItemNameEn, txt);
                }
            },
            {
                title: res.Project_eng_uom, css: "ColumPadding", name: "uom_UomCode", width: "3.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "uom_UomCode", " ");
                    txt.disabled = true;
                    txt.id = "h_uom_UomCode";
                    return HeaderTemplateNew(res.Project_eng_uom, txt);
                }
            },
            {
                title: res.Project_eng_UnitPrice, css: "ColumPadding", name: "UnitPrice", width: "3.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "UnitPrice", " ");
                    txt.id = "h_UnitPrice";
                    return HeaderTemplateNew(res.Project_eng_UnitPrice, txt);
                }
            },
            {
                title: res.Project_eng_oldqty, css: "ColumPadding", name: "OrgItemQty", width: "3.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "OrgItemQty", " ");
                    txt.disabled = true;
                    txt.id = "h_OrgItemQty";
                    return HeaderTemplateNew(res.Project_eng_oldqty, txt);
                }
            },
            {
                title: res.Project_eng_newqty, css: "ColumPadding", name: "ItemQty", width: "3.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ItemQty", " ");
                    txt.disabled = false;
                    txt.id = "h_ItemQty";
                    txt.onkeyup = function (e) {
                        calculation();
                    };
                    return HeaderTemplateNew(res.Project_eng_newqty, txt);
                }
            },
            {
                title: res.Project_eng_DiffQty, css: "ColumPadding", name: "Diff", width: "3.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Diff", " ");
                    txt.disabled = true;
                    txt.id = "h_Diff";
                    return HeaderTemplateNew(res.Project_eng_DiffQty, txt);
                }
            },
            {
                title: res.Project_eng_Total, css: "ColumPadding", name: "Total", width: "3.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Total", " ");
                    txt.disabled = true;
                    txt.id = "h_Total";
                    return HeaderTemplateNew(res.Project_eng_Total, txt);
                }
            },
            {
                title: "BillQty", css: "ColumPadding", name: "BilledQty", width: "3.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "BillQty", " ");
                    txt.disabled = true;
                    txt.id = "h_BilledQty";
                    return HeaderTemplateNew("BillQty", txt);
                }
            }, {
                title: "ProdQty", css: "ColumPadding", name: "ProdQty", width: "3.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ProdQty", " ");
                    txt.disabled = true;
                    txt.id = "h_ProdQty";
                    return HeaderTemplateNew("ProdQty", txt);
                }
            },
            {
                title: "ProgressQty", css: "ColumPadding", name: "ProgressQty", width: "3.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ProgressQty", " ");
                    txt.disabled = true;
                    txt.id = "h_ProgressQty";
                    return HeaderTemplateNew("ProgressQty", txt);
                }
            },
            {
                title: "#", name: "btnAddItem", visible: true, width: "3.0%",
                headerTemplate: function () {
                    var btn = DocumentActions.CreateElement("button");
                    btn.className = TransparentButton + " addable editable";
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemGrid";
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddItemInGridItems();
                    };
                    return btn;
                },
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton + "addable editable";
                    btn.style.fontSize = "24px";
                    btn.type = "button";
                    btn.style.color = "red";
                    btn.name = DetailsItems.indexOf(item).toString();
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        var index = Number(e.currentTarget.name);
                        DetailsItems.splice(index, 1);
                        BindDataGridItems();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter,
                width: "2.0%",
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "20px";
                    btn.type = "button";
                    btn.style.color = "forestgreen";
                    btn.name = DetailsItems.indexOf(item).toString();
                    btn.onclick = function (e) {
                        //edit
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        debugger;
                        DetailsAssignHeaderItems = new PQ_GetEngVariationItem();
                        ItemID = item.ItemID;
                        ProjectPhaseItemId = item.ProjectPhaseItemId;
                        VariationId = item.VariationId;
                        VariationGridItemId = item.VariationItemId;
                        var index = Number(e.currentTarget.name);
                        DetailsItems.splice(index, 1);
                        BindDataGridItems();
                        //ReIndexingGrid();
                        debugger;
                        if (item.IsNew == true) {
                            $('#h_IsNew').attr("checked", "checked");
                        }
                        else {
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
                        //ragab
                        FillInputText("h_BilledQty", item.BilledQty.toString());
                        FillInputText("h_ProdQty", item.ProdQty.toString());
                        FillInputText("h_ProgressQty", item.ProgressQty.toString());
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
                headerTemplate: function () {
                    var btnFindActivity = DocumentActions.CreateElement("button");
                    btnFindActivity = DocumentActions.CreateElement("button");
                    btnFindActivity.className = "btn btn-primary btn-block addable editable";
                    btnFindActivity.innerText = _ScreenLang == "ar" ? "الانشطة" : "Activity";
                    btnFindActivity.id = "btnFindActivity";
                    btnFindActivity.type = "button";
                    btnFindActivity.onclick = function (e) {
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
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Act_DescA", " ");
                    txt.disabled = true;
                    txt.id = "h_Act_DescA";
                    return HeaderTemplateNew(res.Project_eng_ActName, txt);
                }
            },
            {
                title: res.Project_eng_ActName, visible: _ScreenLang == "en", css: "ColumPadding", name: "Act_DescE", width: "20.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Act_DescE", " ");
                    txt.disabled = true;
                    txt.id = "h_Act_DescE";
                    return HeaderTemplateNew(res.Project_eng_ActName, txt);
                }
            },
            {
                title: res.Project_eng_uom, css: "ColumPadding", name: "uom_UomCode", width: "3.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "uom_UomCode", " ");
                    txt.disabled = true;
                    txt.id = "h_Actuom_UomCode";
                    return HeaderTemplateNew(res.Project_eng_uom, txt);
                }
            },
            {
                title: res.Project_eng_oldqty, css: "ColumPadding", name: "Old_ActivQty", width: "3.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Old_ActivQty", " ");
                    txt.disabled = true;
                    txt.id = "h_Old_ActivQty";
                    return HeaderTemplateNew(res.Project_eng_oldqty, txt);
                }
            },
            {
                title: res.Project_eng_newqty, css: "ColumPadding", name: "ActivQty", width: "3.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ActivQty", " ");
                    txt.disabled = false;
                    txt.id = "h_ActivQty";
                    txt.onkeyup = function (e) {
                        calculationneweffqty();
                    };
                    return HeaderTemplateNew(res.Project_eng_newqty, txt);
                }
            },
            {
                title: res.Project_eng_OldProductionPrc, css: "ColumPadding", name: "OldProductionPrc", width: "5.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "OldProductionPrc", " ");
                    txt.disabled = true;
                    txt.id = "h_OldProductionPrc";
                    return HeaderTemplateNew("Old Prod.Prc", txt);
                }
            },
            {
                title: res.Project_eng_ProductionPrc, css: "ColumPadding", name: "ProductionPrc", width: "5.5%",
                headerTemplate: function () {
                    var txt = CreateElement("number", GridInputClassName, " ", " ", "ProductionPrc", " ");
                    txt.disabled = false;
                    txt.id = "h_ProductionPrc";
                    txt.onkeyup = function (e) {
                        calculationneweffqty();
                    };
                    return HeaderTemplateNew(res.Project_eng_ProductionPrc, txt);
                }
            },
            {
                title: "TotProdQty", css: "ColumPadding", name: "TotProdQty", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "TotProdQty", " ");
                    txt.disabled = true;
                    txt.id = "h_TotProdQty";
                    return HeaderTemplateNew("TotProdQty", txt);
                }
            },
            {
                title: "UnderProdQty", css: "ColumPadding", name: "UnderProdQty", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "UnderProdQty", " ");
                    txt.disabled = true;
                    txt.id = "h_UnderProdQty";
                    return HeaderTemplateNew("UnderProd.Qty", txt);
                }
            },
            {
                title: "OldEffItemQty", css: "ColumPadding", name: "OldEffItemQty", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "OldEffItemQty", " ");
                    txt.disabled = true;
                    txt.id = "h_OldEffItemQty";
                    return HeaderTemplateNew("OldEff.ItemQty", txt);
                }
            },
            {
                title: "NewEffItemQty", css: "ColumPadding", name: "NewEffItemQty", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "NewEffItemQty", " ");
                    txt.disabled = true;
                    txt.id = "h_NewEffItemQty";
                    return HeaderTemplateNew("NewEff.ItemQty", txt);
                }
            },
            {
                title: "#", name: "btnAddItem", visible: true, width: "2.0%",
                headerTemplate: function () {
                    var btn = DocumentActions.CreateElement("button");
                    btn.className = TransparentButton + " editable";
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemGridAct";
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        if (Number($("#h_OldEffItemQty").val()) != Number($("#h_NewEffItemQty").val())) {
                            WorningMessage("   كمية البند الناتجة من المعادلة الحالية تختلف عن كمية البند السابقة", "New Effective Item Qty should be equal to Old Effective Item");
                            //return;
                        }
                        AddItemInGridActivity();
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
                    btn.name = DetailsActivities.indexOf(item).toString();
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        debugger;
                        var index = Number(e.currentTarget.name);
                        DetailsActivities.splice(index, 1);
                        BindDataGridIActivity();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter,
                width: "2.0%",
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "20px";
                    btn.type = "button";
                    btn.style.color = "forestgreen";
                    //debugger;
                    btn.name = ActivitiesList.indexOf(item).toString();
                    btn.onclick = function (e) {
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
                        //if (Number(txtNewItemPrdQty.value) != DetailsAssignHeaderItems.ItemQty) {
                        //    WorningMessage("   ", "New item ProdQty = Item Prod Qty");
                        //    return;
                        //}
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
                        var index = Number(e.currentTarget.name);
                        ActivitiesList.splice(index, 1);
                        //BindDataGridIActivity();
                        var ind2 = DetailsActivities.filter(function (c) { return c.VariationActivId == item.VariationActivId; });
                        var ss = DetailsActivities.indexOf(ind2[0]);
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
                        if (!IsNullOrEmpty(item.NewEffItemQty.toString())) {
                            FillInputText("h_NewEffItemQty", item.NewEffItemQty.toString());
                        }
                        if (!IsNullOrEmpty(item.OldEffItemQty.toString())) {
                            FillInputText("h_OldEffItemQty", item.OldEffItemQty.toString());
                        }
                        if (!IsNullOrEmpty(item.UnderProdQty.toString())) {
                            FillInputText("h_UnderProdQty", item.UnderProdQty.toString());
                        }
                        if (!IsNullOrEmpty(item.TotProdQty.toString())) {
                            FillInputText("h_TotProdQty", item.TotProdQty.toString());
                        }
                        //FillInputText("h_ActRemarks", item.Remarks);
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
        if (!CheckTotals()) {
            ChkAuthorize.checked = false;
        }
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
        ClearGrid(GridActivities, new Array());
        ClearGrid(GridItems, new Array());
        DetailsItems = new Array();
        DetailsAssignHeaderItems = new PQ_GetEngVariationItem();
        Tbl_DetailItems = new Array();
        DetailsActivities = new Array();
        FilterDataSourceChild = new Array();
        DetailsAssignHeaderActivities = new PQ_GetEngVariationActivity();
        Tbl_DetailActivity = new Array();
        ActivitiesList = new Array();
    }
    function Display() {
        DocumentActions.RenderFromModel(Master);
        LoadVariatedItems(Master.VariationId);
        LoadVariatedActivity(Master.VariationId);
        ProjectID = Master.ProjectID;
        ProjectPhaseId = Master.ProjectPhaseId;
        if (ChkAuthorize.checked == true && ChkIsSalesApprove.checked == true) {
            ControlsButtons.EditButton.disabled = true;
        }
        else {
            ControlsButtons.EditButton.disabled = false;
        }
    }
    function CalcVariateValue() {
        //debugger
        var _Total = 0;
        for (var _i = 0, DetailsItems_1 = DetailsItems; _i < DetailsItems_1.length; _i++) {
            var item = DetailsItems_1[_i];
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
        DocumentActions.AssignToModel(Master);
        MasterDetails.P_TR_EngVariation = Master;
        MasterDetails.P_TR_EngVariation.VariationId = Master.VariationId;
        //AssignDetails
        MasterDetails.P_TR_EngVariationItemDetail = DetailsItems;
        for (var _i = 0, DetailsItems_2 = DetailsItems; _i < DetailsItems_2.length; _i++) {
            var variation = DetailsItems_2[_i];
            variation.VariationId = Master.VariationId;
            variation.itm_DescA = "";
            variation.itm_DescL = "";
            Tbl_DetailItems.push(variation);
        }
        MasterDetails.P_TR_EngVariationActivityDetial = DetailsActivities;
        for (var _a = 0, DetailsActivities_1 = DetailsActivities; _a < DetailsActivities_1.length; _a++) {
            var variationAct = DetailsActivities_1[_a];
            variationAct.VariationId = Master.VariationId;
            variationAct.Act_DescA = "";
            variationAct.Act_DescE = "";
            //variationAct.VariationItemId == 0 ? variationAct.VariationItemId = null : variationAct.VariationItemId = variationAct.VariationItemId;
            Tbl_DetailActivity.push(variationAct);
        }
    }
    function Insert(generate) {
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
        Master.ProjectPhaseId = null; //Number(GetPhaseId(ProjectID));
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BraCode);
        Master.VariationId = 0;
        MasterDetails.P_TR_EngVariation.TrNo = null;
        var session = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        var func = "InsertMasterDetail";
        if (generate)
            func = "InsertMasterDetailAndGenerate";
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_EngVariation", func),
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
                    //let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    WorningMessage("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    //MessageBox.Show(msg, "Update", () => {
                    //    debugger;
                    var _Index = GetIndexByUseId(result.Response, "PQ_GetEngVariation", "VariationId", "CompCode = " + _CompCode + " and BraCode = " + _BraCode);
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
    function Update(generate) {
        Assign();
        //if (ValidationPrc() == false)
        //    return;
        //debugger
        Master.ProjectID = ProjectID;
        Master.ProjectPhaseId = null; //Number(GetPhaseId(ProjectID));
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BraCode);
        var session = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        var func = "UpdateMasterDetail";
        if (generate)
            func = "UpdateMasterDetailAndGenerate";
        //debugger
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_EngVariation", func),
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
                    WorningMessage("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    var _Index = GetIndexByUseId(result.Response, "PQ_GetEngVariation", "VariationId", "CompCode = " + _CompCode + " and BraCode = " + _BraCode);
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
    function ValidationPrc() {
        var _Result = true;
        //check on total persentage
        //debugger
        //Get All Activity
        var DataSourceChild = new Array();
        //DataSourceChild = Ajax.Call({ url: Url.Action("LoadVariatedActivity", ControllerName), data: { id: Master.VariationId } }) as Array<PQ_GetEngVariationActivity>;
        DataSourceChild = DetailsActivities;
        //debugger
        if (DetailsItems.filter(function (x) { return x.VariationItemId == 0; }).length > 0) {
            WorningMessage("يجب حفظ الحركة أولا، يوجد اصناف غير محفوظة ", "You have new items, you  should saved and then complete the ativities  ");
            _Result = false;
            return _Result;
        }
        var ProdPrc = 0;
        // for it  of items 
        for (var _i = 0, DetailsItems_3 = DetailsItems; _i < DetailsItems_3.length; _i++) {
            var itm = DetailsItems_3[_i];
            FilterDataSourceChild = DataSourceChild.filter(function (x) { return x.VariationItemId == itm.VariationItemId; });
            // load item activity 
            ProdPrc = 0;
            for (var _a = 0, FilterDataSourceChild_1 = FilterDataSourceChild; _a < FilterDataSourceChild_1.length; _a++) {
                var act = FilterDataSourceChild_1[_a];
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
    function CheckTotals() {
        var _Result = true;
        var DataSourceChild = new Array();
        DataSourceChild = DetailsActivities;
        //debugger
        if (DetailsItems.filter(function (x) { return x.VariationItemId == 0; }).length > 0) {
            WorningMessage("يجب حفظ الحركة أولا، يوجد اصناف غير محفوظة ", "You have new items, you  should saved and then complete the ativities  ");
            _Result = false;
            return _Result;
        }
        var oldProd = 0;
        var newProd = 0;
        // for it  of items 
        for (var _i = 0, DetailsItems_4 = DetailsItems; _i < DetailsItems_4.length; _i++) {
            var itm = DetailsItems_4[_i];
            oldProd = Number((Number(itm.ProdQty) + Number(itm.ProgressQty)).toFixed(2));
            FilterDataSourceChild = DataSourceChild.filter(function (x) { return x.VariationItemId == itm.VariationItemId; });
            // load item activity 
            newProd = 0;
            for (var _a = 0, FilterDataSourceChild_2 = FilterDataSourceChild; _a < FilterDataSourceChild_2.length; _a++) {
                var act = FilterDataSourceChild_2[_a];
                newProd += Number(act.NewEffItemQty.toFixed(2));
            }
            newProd = Number(newProd.toFixed(2));
            if (oldProd != newProd) {
                WorningMessage(" اوزان  غير صحيحة البند رقم " + itm.LineCode, "incorrect activity weight line no " + itm.LineCode);
                _Result = false;
                break;
            }
        }
        //end check on total persentage
        return _Result;
    }
    function FillInputText(_TextID, _Data) {
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
        var ProdQty = Number($('#h_ProdQty').val()) + Number($('#h_ProgressQty').val());
        if (Number($('#h_ItemQty').val()) < Number($('#h_BilledQty').val()) || Number($('#h_ItemQty').val()) < ProdQty) {
            WorningMessage(" ProdQty + ProgressQty الكمية الجديدة لا يمكن أن تكون أقل من  أقل من بيل", "New Qty can not be less that : ProdQty + ProgressQty or  Less than BillQty ");
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
        DetailsAssignHeaderItems.BilledQty = Number($('#h_BilledQty').val());
        DetailsAssignHeaderItems.ProdQty = Number($('#h_ProdQty').val());
        DetailsAssignHeaderItems.ProgressQty = Number($('#h_ProgressQty').val());
        DetailsItems.push(DetailsAssignHeaderItems);
        BindDataGridItems();
        CalcVariateValue();
        VariationGridItemId = 0;
    }
    function AddItemInGridActivity() {
        DetailsAssignHeaderActivities = new PQ_GetEngVariationActivity();
        DetailsAssignHeaderActivities.ActivityID = ActivityID;
        DetailsAssignHeaderActivities.ProjectPhaseId = ProjectPhaseId;
        DetailsAssignHeaderActivities.ProjectPhaseItemActivId = ProjectPhaseItemActivId;
        DetailsAssignHeaderActivities.VariationActivId = VariationActivId;
        DetailsAssignHeaderActivities.VariationItemId = VariationItemId;
        DetailsAssignHeaderActivities.ActivQty = Number($('#h_ActivQty').val());
        DetailsAssignHeaderActivities.Act_ActivityCode = $('#btnFindActivity').text();
        DetailsAssignHeaderActivities.Act_DescA = $('#h_Act_DescA').val();
        DetailsAssignHeaderActivities.Act_DescE = $('#h_Act_DescE').val();
        DetailsAssignHeaderActivities.OldProductionPrc = Number($('#h_OldProductionPrc').val());
        DetailsAssignHeaderActivities.Old_ActivQty = Number($('#h_Old_ActivQty').val());
        DetailsAssignHeaderActivities.ProductionPrc = Number($('#h_ProductionPrc').val());
        //ragab
        DetailsAssignHeaderActivities.NewEffItemQty = Number($('#h_NewEffItemQty').val());
        DetailsAssignHeaderActivities.OldEffItemQty = Number($('#h_OldEffItemQty').val());
        DetailsAssignHeaderActivities.TotProdQty = Number($('#h_TotProdQty').val());
        DetailsAssignHeaderActivities.UnderProdQty = Number($('#h_UnderProdQty').val());
        //DetailsAssignHeaderActivities.Remarks = $('#h_ActRemarks').val();
        DetailsAssignHeaderActivities.uom_UomCode = $('#h_Actuom_UomCode').val();
        DetailsActivities.push(DetailsAssignHeaderActivities);
        ActivitiesList.push(DetailsAssignHeaderActivities);
        var resut = 0;
        for (var i = 0; i < ActivitiesList.length; i++) {
            resut += ActivitiesList[i].NewEffItemQty;
        }
        $('#txtNewItemPrdQty').val(resut.toFixed(3));
        BindDataGridIActivityFiltered();
        ////ProjectPhaseItemActivId = null;
        VariationActivId = 0;
    }
    function PProc_EngVariationLoadItem(id) {
        //ragab
        Ajax.Callsync({
            url: Url.Action("GetProjectItem_New", ControllerName),
            data: { trID: id },
            success: function (d) {
                var result = d.result;
                $('#h_BilledQty').val(result.BilledQty);
                $('#h_ProdQty').val(result.ProdQty);
                $('#h_ProgressQty').val(result.ProgQty);
            }
        });
    }
    function btnFindItems_onclick() {
        var isNew = $('#h_IsNew').prop('checked');
        //debugger;
        if (isNew == false) {
            sys.FindKey(Modules.ProjectChange, "btnFindItems", "ProjectID = " + ProjectID, function () {
                var id = ClientSharedWork.SearchDataGrid.SelectedKey;
                Num_id = id;
                Ajax.CallAsync({
                    url: Url.Action("GetProjectItem", ControllerName),
                    data: { id: id },
                    success: function (d) {
                        var result = d.result;
                        if (result != null) {
                            ItemID = result.ItemID;
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
                PProc_EngVariationLoadItem(Num_id);
            });
        }
        else if (isNew == true) {
            sys.FindKey(Modules.SalesItemLibrary, "btnFindItems", "IsDetail = 1", function () {
                var id = ClientSharedWork.SearchDataGrid.SelectedKey;
                Ajax.CallAsync({
                    url: Url.Action("GetSalesItem", ControllerName),
                    data: { id: id },
                    success: function (d) {
                        var result = d.result;
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
        var diff = (Number($('#h_ItemQty').val()) - Number($('#h_OrgItemQty').val()));
        $('#h_Diff').val(diff.toFixed(2));
        var total = (Number($('#h_Diff').val()) * Number($('#h_UnitPrice').val()));
        $('#h_Total').val(total.toFixed(2));
    }
    function btnFindActivity_onclick() {
        if (txtItemCode.value == "" && txtItemName.value == "") {
            WorningMessage("يجب اختيار عنصر اولا قبل اختيار النشاط", "You Should Choose Item Befor Select Activity");
            return;
        }
        sys.FindKey(Modules.ProjectChange, "btnFindActivity", "", function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetActivity", ControllerName),
                data: { id: id },
                success: function (d) {
                    var result = d.result;
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
        sys.FindKey(Modules.ProjectChange, "btnSearchProject", Condition, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProject", ControllerName),
                data: { id: id },
                success: function (d) {
                    var result = d.result;
                    ProjectID = result.ProjectID;
                    //MasterProjectPhaseId = result.ProjectPhaseId;
                    txtProj_ProjectCode.value = result.ProjectCode;
                    if (_ScreenLang == "ar") {
                        txtProj_DescL.value = result.DescA;
                    }
                    else {
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
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                var result = d.result;
                ProjectID = result[0].ProjectID;
                //MasterProjectPhaseId = result.ProjectPhaseId;
                txtProj_ProjectCode.value = result[0].ProjectCode;
                if (_ScreenLang == "ar") {
                    txtProj_DescL.value = result[0].DescA;
                }
                else {
                    txtProj_DescL.value = result[0].DescL;
                }
                NewData();
            }
        });
    }
    function GetPhaseId(projectId) {
        //debugger;
        var phase = Ajax.Call({ url: Url.Action("GetPhaseId", ControllerName), data: { projectId: projectId } });
        return phase.ProjectPhaseId;
    }
    function btnSearchTrNo_Clicked() {
        sys.FindKey(Modules.ProjectChange, "btnSearchTrNo", "CompCode = " + _CompCode + " and BraCode = " + _BraCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetVariation", ControllerName),
                data: { id: id },
                success: function (d) {
                    Master = d.result;
                    var Index = GetIndexByUseId(Number(Master.VariationId), "PQ_GetEngVariation", "VariationId", "CompCode = " + _CompCode + " and BraCode = " + _BraCode);
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
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                Master = d.result;
                var Index = GetIndexByUseId(Number(Master.VariationId), "PQ_GetEngVariation", "VariationId", "CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                NavigateToSearchResultKey(Number(Index), Navigate);
            }
        });
    }
    function LoadVariatedItems(id) {
        Ajax.Callsync({
            url: Url.Action("LoadVariatedItems", ControllerName),
            data: { id: id },
            success: function (d) {
                //debugger
                DetailsItems = d.result;
                GridItems.DataSource = DetailsItems;
                for (var _i = 0, DetailsItems_5 = DetailsItems; _i < DetailsItems_5.length; _i++) {
                    var itm = DetailsItems_5[_i];
                    itm.Diff = Number((itm.ItemQty - itm.OrgItemQty).toFixed(2));
                    itm.Total = Number((itm.Diff * itm.UnitPrice).toFixed(2));
                }
                GridItems.Bind();
                CalcVariateValue();
            }
        });
    }
    function LoadVariatedActivity(id) {
        Ajax.Callsync({
            url: Url.Action("LoadVariatedActivity", ControllerName),
            data: { id: id },
            success: function (d) {
                DetailsActivities = d.result;
                for (var _i = 0, DetailsActivities_2 = DetailsActivities; _i < DetailsActivities_2.length; _i++) {
                    var itm = DetailsActivities_2[_i];
                    //itm.NewEffItemQty = (DetailsAssignHeaderItems.ProdQty + DetailsAssignHeaderItems.ProgressQty) * DetailsActivities[length].ProductionPrc * DetailsAssignHeaderItems.ItemQty / (100 * DetailsAssignHeaderItems.);
                }
                GridActivities.DataSource = DetailsActivities;
                GridActivities.Bind();
            }
        });
    }
    function btnGeneratActivity_Clicked() {
        /*debugger*/ ;
        if (ClientSharedWork.CurrentMode == ScreenModes.Add) {
            Insert(true);
        }
        else {
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
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
    function PrintVariationSum() {
        Ajax.CallAsync({
            url: Url.Action("PrintVariationSum", "PrintTransaction"),
            data: { TrID: Number(Master.VariationId) },
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
    function ItemOnRowDoubleClicked() {
        //ragab
        var selectedItem = GridItems.SelectedItem;
        VariationItemId = selectedItem.VariationItemId;
        if (VariationItemId == 0) {
            WorningMessage("يجب  حفظ الاصناف قبل ادخال الانشطة ", "You Should save Items to view and edit Activities");
            return;
        }
        ProjectPhaseItemActivId = null;
        VariationActivId = 0;
        txtItemCode.value = selectedItem.LineCode;
        txtItemName.value = selectedItem.DescE;
        txtItemProgQty.value = selectedItem.ProgressQty == null ? '0' : selectedItem.ProgressQty.toFixed(3);
        txtItemProdQty.value = selectedItem.ProdQty == null ? '0' : selectedItem.ProdQty.toFixed(3);
        txtTotalItemProdQty.value = (Number(txtItemProgQty.value) + Number(txtItemProdQty.value)).toFixed(3);
        debugger;
        ActivitiesList = DetailsActivities.filter(function (x) { return x.VariationItemId == VariationItemId; });
        GridActivities.DataSource = ActivitiesList;
        GridActivities.Bind();
        var resut = 0;
        for (var i = 0; i < ActivitiesList.length; i++) {
            resut += ActivitiesList[i].NewEffItemQty;
        }
        $('#txtNewItemPrdQty').val(resut.toFixed(3));
        //if (ActivitiesList.length==0) {
        //    //WorningMessage("يجب  اضافة الانشطة    ", "You Should Add Activities ");
        //}
        //else {
        ////let UnderProdQty: number = ActivitiesList[length].UnderProdQty == null ? 0 : ActivitiesList[length].UnderProdQty;
        ////let resut1: number = (selectedItem.ProdQty + Number(UnderProdQty));
        ////let h_ProductionPrc = ActivitiesList[length].ProductionPrc == null ? 0 : ActivitiesList[length].ProductionPrc;
        ////let h_ActivQty = ActivitiesList[length].ActivQty == null ? 0 : ActivitiesList[length].ActivQty;
        ////let NewItemQty = selectedItem.ItemQty == null ? 0 : selectedItem.ItemQty;
        ////    //let resut2: number = (resut1 + h_ProductionPrc) / (100 * h_ActivQty);
        ////    let resut2: number = (resut1 * h_ProductionPrc) * (NewItemQty) / (100 * h_ActivQty);
        ////    $('#txtNewItemPrdQty').val(resut2);
        //}
    }
    function calculationneweffqty() {
        var selectedItem = GridItems.SelectedItem;
        var h_ProdQty = Number($('#h_TotProdQty').val()) == null ? 0 : Number($('#h_TotProdQty').val());
        var h_UnderProdQty = Number($('#h_UnderProdQty').val()) == null ? 0 : Number($('#h_UnderProdQty').val());
        var resut1 = (h_ProdQty + h_UnderProdQty);
        var h_ActivQty = Number($('#h_ActivQty').val()) == null ? 0 : Number($('#h_ActivQty').val());
        var h_ProductionPrc = Number($('#h_ProductionPrc').val()) == null ? 0 : Number($('#h_ProductionPrc').val());
        var NewItemQty = selectedItem.ItemQty == null ? 0 : selectedItem.ItemQty;
        var resut2 = (resut1 * h_ProductionPrc) * (NewItemQty) / (100 * h_ActivQty);
        $('#h_NewEffItemQty').val(resut2.toFixed(2));
    }
})(Projectvaliation || (Projectvaliation = {}));
//# sourceMappingURL=Projectvaliation.js.map