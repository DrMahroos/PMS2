$(document).ready(function () {
    OfferCostEstimation.InitalizeComponent();
});
var OfferCostEstimation;
(function (OfferCostEstimation) {
    var ControllerName = "OfferCostEstimation";
    var GridInputClassName = "form-control gridIput";
    var columnWidth = "100px";
    var NumberColumnWidth = "50px";
    var M_D_CostEstimation = /** @class */ (function () {
        function M_D_CostEstimation() {
        }
        return M_D_CostEstimation;
    }());
    var MasterDetails = new M_D_CostEstimation();
    var Master = new P_TR_SalesOffer();
    var StgItmDataSource = new Array();
    var DetailsOffStageItem = new Array();
    var DetailsAssignHeaderStgItm = new PQ_GetSlsOfferStageItem();
    var Tbl_DetailStgItm = new Array();
    var OffActDataSource = new Array();
    var DetailsOffAct = new Array();
    var DetailsAssignHeaderOffAct = new PQ_GetSlsOfferActivity();
    var Tbl_DetailOffAct = new Array();
    var StandardRatio = new P_Control();
    var usedRation = new P_TR_SalesOffer();
    var GridOffStageItem = new JsGrid();
    var GridOffStageItemActivity = new JsGrid();
    var sys = new SystemTools();
    var txtStdOHLabor;
    var txtStdOHEquip;
    var txtStdOHMaterial;
    var txtStdProdOHLabor;
    var txtStdProdOHEquip;
    var txtStdProdOHMaterial;
    var txtUsedOHLaborPrc;
    var txtUsedProdOHLaborPrc;
    var txtUsedOHEquipPrc;
    var txtUsedProdOHEquipPrc;
    var txtUsedOHMaterialPrc;
    var txtUsedProdOHMaterialPrc;
    var txtTotalCost;
    var txtEstimatedMaterial;
    var txtEstimatedLabor;
    var txtEstimatedEquip;
    var txtEstimatedPOH;
    var txtEstimatedOH;
    var txtEstimatedProfit;
    var txtContractPrice;
    var txtProfitMarginPrcCalc;
    var txtTrDate;
    var txtProfitRetioPrcCalc;
    var ChkStatus;
    //var btnStandardRatio: HTMLButtonElement;
    var btnCostCalcolation;
    var btnSearchOffer;
    var btnCopy;
    var _ScreenLang;
    var _CompCode;
    var _BraCode;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BraCode = SharedSession.CurrentEnvironment.BranchCode;
        InitalizeControls();
        InitalizeEvents();
        InitalizeGrid();
        ControlsButtons.AddButton.disabled = true;
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(function () { });
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                return;
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Updates();
        });
        ControlsButtons.UndoAction(function () { });
        ControlsButtons.EditAction(Edit);
        ControlsButtons.PrintAction(function () { });
        StandardRatio = Ajax.Call({ url: Url.Action("getStandadRatios", ControllerName) });
        getStandadRatios();
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BraCode, Modules.OfferDefinition, Master.OfferID.toString());
        });
    }
    OfferCostEstimation.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtStdOHLabor = DocumentActions.GetElementById('txtStdOHLabor');
        txtStdOHEquip = DocumentActions.GetElementById('txtStdOHEquip');
        txtStdOHMaterial = DocumentActions.GetElementById('txtStdOHMaterial');
        txtStdProdOHLabor = DocumentActions.GetElementById('txtStdProdOHLabor');
        txtStdProdOHEquip = DocumentActions.GetElementById('txtStdProdOHEquip');
        txtStdProdOHMaterial = DocumentActions.GetElementById('txtStdProdOHMaterial');
        txtUsedOHLaborPrc = DocumentActions.GetElementById('txtUsedOHLaborPrc');
        txtUsedProdOHLaborPrc = DocumentActions.GetElementById('txtUsedProdOHLaborPrc');
        txtUsedOHEquipPrc = DocumentActions.GetElementById('txtUsedOHEquipPrc');
        txtUsedProdOHEquipPrc = DocumentActions.GetElementById('txtUsedProdOHEquipPrc');
        txtUsedOHMaterialPrc = DocumentActions.GetElementById('txtUsedOHMaterialPrc');
        txtUsedProdOHMaterialPrc = DocumentActions.GetElementById('txtUsedProdOHMaterialPrc');
        txtTotalCost = DocumentActions.GetElementById('txtTotalCost');
        txtEstimatedMaterial = DocumentActions.GetElementById('txtEstimatedMaterial');
        txtEstimatedLabor = DocumentActions.GetElementById('txtEstimatedLabor');
        txtEstimatedEquip = DocumentActions.GetElementById('txtEstimatedEquip');
        txtEstimatedPOH = DocumentActions.GetElementById('txtEstimatedPOH');
        txtEstimatedOH = DocumentActions.GetElementById('txtEstimatedOH');
        txtEstimatedProfit = DocumentActions.GetElementById('txtEstimatedProfit');
        txtContractPrice = DocumentActions.GetElementById('txtContractPrice');
        txtProfitMarginPrcCalc = DocumentActions.GetElementById('txtProfitMarginPrcCalc');
        txtTrDate = DocumentActions.GetElementById('txtTrDate');
        txtProfitRetioPrcCalc = DocumentActions.GetElementById('txtProfitRetioPrcCalc');
        ChkStatus = DocumentActions.GetElementById('ChkStatus');
        //btnStandardRatio = DocumentActions.GetElementById<HTMLButtonElement>('btnStandardRatio');
        btnCostCalcolation = DocumentActions.GetElementById('btnCostCalcolation');
        btnSearchOffer = DocumentActions.GetElementById('btnSearchOffer');
        btnCopy = DocumentActions.GetElementById('btnCopy');
    }
    function InitalizeEvents() {
        btnCostCalcolation.onclick = btnCostCalcolation_Clicked;
        btnSearchOffer.onclick = btnSearchOffer_Clicked;
        btnCopy.onclick = btnCopy_Clicked;
    }
    function InitalizeGrid() {
        // GridOffStageItem
        var res = GetResourceList("OffSpec_");
        GridOffStageItem.ElementName = "GridStage";
        GridOffStageItem.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridOffStageItem.OnRefreshed = function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridOffStageItem.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridOffStageItem.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridOffStageItem.InsertionMode = JsGridInsertionMode.Binding;
        GridOffStageItem.OnItemInserting = function () { };
        GridOffStageItem.OnItemUpdating = function () { };
        GridOffStageItem.OnItemDeleting = function () { };
        GridOffStageItem.OnRowSelected = getSecondDetailsByID;
        GridOffStageItem.Columns = [
            //{
            //    title: res.Cost_Serial"), name: "Serial", width: "9.5%",
            //    headerTemplate: (): HTMLElement => {
            //        let txt = CreateElement("label", GridInputClassName, " ", " ", "Serial", " ");
            //        txt.id = "h_Serial"
            //        txt.disabled = true;
            //        return HeaderTemplate("Cost_Serial", txt);
            //    }
            //},
            {
                title: res.Cost_ItemID, visible: false, name: "ItemID", width: "15.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ItemID", " ");
                    txt.id = "h_ItemID";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_ItemID", txt);
                }
            },
            //Ali**
            {
                title: res.Cost_LineCode, name: "LineCode", width: "15.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "LineCode", " ");
                    txt.id = "h_LineCode";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_LineCode", txt);
                }
            },
            //Ali** />
            {
                title: res.Cost_ItemID, name: "ItemCode", width: "15.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ItemCode", " ");
                    txt.id = "h_ItemID";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_ItemID", txt);
                }
            },
            {
                title: res.Cost_itm_DescA, visible: _ScreenLang == "ar", name: "DescA", width: "40.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_Item_DescA";
                    txt.disabled = true;
                    txt.hidden = _ScreenLang == "en";
                    return HeaderTemplate("Cost_itm_DescA", txt);
                }
            },
            {
                title: res.Cost_itm_DescA, visible: _ScreenLang == "en", name: "DescE", width: "40.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescE", " ");
                    txt.id = "h_Item_DescE";
                    txt.disabled = true;
                    txt.hidden = _ScreenLang == "ar";
                    return HeaderTemplate("Cost_itm_DescA", txt);
                }
            },
            {
                title: res.Cost_Qty, name: "Qty", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Qty", " ");
                    txt.id = "h_Qty";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_Qty", txt);
                }
            },
            {
                title: res.Cost_EstimatedMaterial, name: "EstimatedMaterial", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "EstimatedMaterial", " ");
                    txt.id = "h_EstimatedMaterial";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_EstimatedMaterial", txt);
                }
            },
            {
                title: res.Cost_EstimatedLabor, name: "EstimatedLabor", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "EstimatedLabor", " ");
                    txt.id = "h_EstimatedLabor";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_EstimatedLabor", txt);
                }
            },
            {
                title: res.Cost_EstimatedEquip, name: "EstimatedEquip", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "EstimatedEquip", " ");
                    txt.id = "h_EstimatedEquip";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_EstimatedEquip", txt);
                }
            },
            {
                title: res.Cost_OHcost, name: "EstimatedOH", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "EstimatedOH", " ");
                    txt.id = "h_EstimatedOH";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_OHcost", txt);
                }
            },
            {
                title: res.Cost_POHcost, name: "EstimatedPOH", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "EstimatedPOH", " ");
                    txt.id = "h_EstimatedPOH";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_POHcost", txt);
                }
            },
            {
                title: res.Cost_UnitPrice, name: "UnitPrice", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "UnitPrice", " ");
                    txt.id = "h_UnitPrice";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_UnitPrice", txt);
                }
            },
            {
                title: res.Cost_calc_total, name: "calc_total", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "calc_total", " ");
                    txt.id = "h_calc_total";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_calc_total", txt);
                }
            },
            {
                title: res.Cost_UnitCost, name: "UnitCost", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "UnitCost", " ");
                    txt.id = "h_UnitCost";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_UnitCost", txt);
                }
            }
        ];
        GridOffStageItem.DataSource = DetailsOffStageItem;
        GridOffStageItem.Bind();
        // Grid Offer Activity
        GridOffStageItemActivity.ElementName = "GridActivity";
        GridOffStageItemActivity.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridOffStageItemActivity.OnRefreshed = function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridOffStageItemActivity.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridOffStageItemActivity.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridOffStageItemActivity.InsertionMode = JsGridInsertionMode.Binding;
        GridOffStageItemActivity.OnItemInserting = function () { };
        GridOffStageItemActivity.OnItemUpdating = function () { };
        GridOffStageItemActivity.OnItemDeleting = function () { };
        GridOffStageItemActivity.Columns = [
            {
                title: res.Cost_Act_Code, name: "Act_ActivityCode", width: "13.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Act_ActivityCode", " ");
                    txt.id = "h_Act_ActivityCode";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_Act_Code", txt);
                }
            },
            {
                title: res.Cost_Act_DescA, visible: _ScreenLang == "ar", name: "Act_DescA", width: "35.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Act_DescA", " ");
                    txt.id = "h_Act_DescA";
                    txt.disabled = true;
                    txt.hidden = _ScreenLang == "en";
                    return HeaderTemplate("Cost_Act_DescA", txt);
                }
            },
            {
                title: res.Cost_Act_DescA, visible: _ScreenLang == "en", name: "Act_DescE", width: "35.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Act_DescE", " ");
                    txt.id = "h_Act_DescE";
                    txt.disabled = true;
                    txt.hidden = _ScreenLang == "ar";
                    return HeaderTemplate("Cost_Act_DescA", txt);
                }
            },
            {
                title: res.Cost_Qty, name: "Qty", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Qty", " ");
                    txt.id = "h_ActQty";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_Qty", txt);
                }
            },
            {
                title: res.Cost_UnitPrice, name: "UnitPrice", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "UnitPrice", " ");
                    txt.id = "h_ActUnitPrice";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_UnitPrice", txt);
                }
            },
            {
                title: res.Cost_EstimatedMaterial, name: "EstimatedMaterial", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "EstimatedMaterial", " ");
                    txt.id = "h_ActEstimatedMaterial";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_EstimatedMaterial", txt);
                }
            },
            {
                title: res.Cost_EstimatedLabor, name: "EstimatedLabor", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "EstimatedLabor", " ");
                    txt.id = "h_ActEstimatedLabor";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_EstimatedLabor", txt);
                }
            },
            {
                title: res.Cost_EstimatedEquip, name: "EstimatedEquip", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "EstimatedEquip", " ");
                    txt.id = "h_ActEstimatedEquip";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_EstimatedEquip", txt);
                }
            },
            {
                title: res.Cost_EstimatedOH, name: "EstimatedOH", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "EstimatedOH", " ");
                    txt.id = "h_ActEstimatedOH";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_EstimatedOH", txt);
                }
            },
            {
                title: res.Cost_EstimatedPOH, name: "EstimatedPOH", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "EstimatedPOH", " ");
                    txt.id = "h_ActEstimatedPOH";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_EstimatedPOH", txt);
                }
            },
            {
                title: res.Cost_ProductionIncluded, name: "ProductionIncluded", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ProductionIncluded", " ");
                    txt.id = "h_ActProductionIncluded";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_ProductionIncluded", txt);
                }
            },
            {
                title: res.Cost_ProductionPrc, name: "ProductionPrc", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ProductionPrc", " ");
                    txt.id = "h_ActProductionPrc";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_ProductionPrc", txt);
                }
            },
            {
                title: res.Cost_UnitCost, name: "UnitCost", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "UnitCost", " ");
                    txt.id = "h_ActUnitCost";
                    txt.disabled = true;
                    return HeaderTemplate("Cost_UnitCost", txt);
                }
            },
        ];
        var detailsact = new Array();
        detailsact = DetailsOffAct.filter(function (x) { return x.OfferItemId == DetailsOffStageItem[0].OfferItemId; });
        GridOffStageItemActivity.DataSource = detailsact;
        GridOffStageItemActivity.Bind();
    }
    function Edit() {
        if (Master.Status == 5 && SharedSession.CurrentPrivileges.CUSTOM1 == true)
            $("#ChkStatus").removeAttr("disabled");
        else
            $("#ChkStatus").attr("disabled", "disabled");
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: function (d) {
                //MasterDetails = d.result as M_D_CostEstimation;
                //MasterDetails.P_TR_SalesOffer = d.result as P_TR_SalesOffer;
                Master = d.result;
                Display();
            }
        });
    }
    function Display() {
        DocumentActions.RenderFromModel(Master);
        txtTrDate.value = DateFormat(Master.TrDate);
        totalCoast();
        loadSatgeItems(Master.OfferID);
        loadSatgeItemsActivity(Master.OfferID);
        $("#ChkStatus").attr("disabled", "disabled");
        if (Master.Status < 6 && SharedSession.CurrentPrivileges.EDIT == true) {
            ControlsButtons.EditButton.disabled = false;
            ChkStatus.checked = false;
        }
        else {
            ControlsButtons.EditButton.disabled = true;
            ChkStatus.checked = true;
        }
    }
    function FillInputText(_TextID, _Data) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }
    function BindDataStgItemsGrids() {
        GridOffStageItem.DataSource = DetailsOffStageItem;
        GridOffStageItem.Bind();
    }
    function BindDataOffStageItemActivity() {
        GridOffStageItemActivity.DataSource = DetailsOffAct;
        GridOffStageItemActivity.Bind();
    }
    function getStandadRatios() {
        txtStdOHLabor.value = StandardRatio.StdOHLabor.toString();
        txtStdOHEquip.value = StandardRatio.StdOHEquip.toString();
        txtStdOHMaterial.value = StandardRatio.StdOHMaterial.toString();
        txtStdProdOHEquip.value = StandardRatio.StdProdOHEquip.toString();
        txtStdProdOHLabor.value = StandardRatio.StdProdOHLabor.toString();
        txtStdProdOHMaterial.value = StandardRatio.StdProdOHMaterial.toString();
    }
    function btnFindItemID_onclick() {
        sys.FindKey(Modules.itmSearch, "btnFindItemID", "CompCode = " + _CompCode, function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("FindItem", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    $('#btnFindItemID').text(result.ItemID);
                    $('#h_Item_DescA').val(result.DescA);
                    $('#h_Item_DescE').val(result.DescL);
                }
            });
        });
    }
    function Updates() {
        Assign();
        //if (Master.Status != 3) {
        //    WorningMessage("لا يمكن التعديل", "Update Not Allowed");
        //    return;
        //}
        //Master.OHEquipPrc = Number(txtUsedOHEquipPrc.value);
        //Master.OHLaborPrc = Number(txtUsedOHLaborPrc.value);
        //Master.OHMaterialPrc = Number(txtUsedOHMaterialPrc.value);
        //Master.ProdOHEquipPrc = Number(txtUsedProdOHEquipPrc.value);
        //Master.ProdOHLaborPrc = Number(txtUsedProdOHLaborPrc.value);
        //Master.ProdOHMaterialPrc = Number(txtUsedProdOHMaterialPrc.value);
        Master.CompCode = Number(_CompCode);
        if (ChkStatus.checked == true) {
            //MasterDetails.P_TR_SalesOffer.Status = 6;
            Master.Status = 6;
            //ProccesCostCalc(Master.OfferID);
        }
        //update master  -- status
        Ajax.CallAsync({
            url: Url.Action("UpdateStatus", "OfferCostEstimation"),
            data: Master,
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Updated", function () {
                        Display();
                        var _Index = GetIndexByUseId(result.ResponseData.OfferID, "P_TR_SalesOffer", "OfferID", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        });
    }
    function Assign() {
        //AssignMaster
        DocumentActions.AssignToModel(Master);
        //MasterDetails.P_TR_SalesOffer = Master as P_TR_SalesOffer;
        //MasterDetails.P_TR_SalesOffer.OfferID = Master.OfferID;;
        ////AssignDetails
        //MasterDetails.P_Tr_SalesOfferStageItem = DetailsOffStageItem as Array<PQ_GetSlsOfferStageItem>;
        //for (var offStgItm of DetailsOffStageItem) {
        //    offStgItm.OfferID = Master.OfferID;
        //    Tbl_DetailStgItm.push(offStgItm);
        //}
        //MasterDetails.P_Tr_SalesOfferStageItemActivity = DetailsOffAct as Array<PQ_GetSlsOfferActivity>;
        //for (var offActitvity of DetailsOffAct) {
        //    offActitvity.OfferID = Master.OfferID;
        //    Tbl_DetailOffAct.push(offActitvity);
        //}
    }
    function totalCoast() {
        txtTotalCost.value = (Number(txtEstimatedMaterial.value) + Number(txtEstimatedLabor.value) +
            Number(txtEstimatedEquip.value) + Number(txtEstimatedPOH.value) + Number(txtEstimatedOH.value)).toFixed(2).toString();
        debugger;
        txtEstimatedProfit.value = (Number(txtContractPrice.value) - Number(txtTotalCost.value)).toFixed(2).toString();
        txtProfitMarginPrcCalc.value = (((Number(txtEstimatedProfit.value) / Number(txtTotalCost.value)) * 100)).toFixed(2).toString();
        txtProfitRetioPrcCalc.value = ((Number(txtEstimatedProfit.value) / Number(txtContractPrice.value)) * 100).toFixed(2).toString();
    }
    function btnCostCalcolation_Clicked() {
        ProccesCostCalc(Master.OfferID);
        //Display();
        ClientSharedWork.SwitchModes(ScreenModes.Query);
    }
    function ProccesCostCalc(offId) {
        Assign();
        Ajax.CallAsync({
            url: Url.Action("CostCalcolation", ControllerName),
            data: { _Id: offId },
            success: function (d) {
                var _Index = GetIndexByUseId(offId, "P_TR_SalesOffer", "OfferID", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                NavigateToSearchResultKey(Number(_Index), Navigate);
            }
        });
        //Display();
    }
    function btnSearchOffer_Clicked() {
        sys.FindKey(Modules.OfferDefinition, "btnSearchOffer", "CompCode = " + _CompCode + " and BraCode = " + _BraCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByID", ControllerName),
                data: { _OfferID: id },
                success: function (d) {
                    MasterDetails = d.result;
                    Master = d.result;
                    var Index = GetIndexByUseId(Number(Master.OfferID), "PQ_GetSalesOffer", "OfferID", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                }
            });
        });
    }
    function loadSatgeItems(id) {
        Ajax.CallAsync({
            url: Url.Action("loadSatgeItems", ControllerName),
            data: { id: id },
            success: function (d) {
                DetailsOffStageItem = d.result;
                GridOffStageItem.DataSource = DetailsOffStageItem;
                GridOffStageItem.Bind();
            }
        });
    }
    function loadSatgeItemsActivity(id) {
        Ajax.CallAsync({
            url: Url.Action("loadSatgeItemsActivity", ControllerName),
            data: { id: id },
            success: function (d) {
                DetailsOffAct = d.result;
                //let detailsact: Array<PQ_GetSlsOfferActivity> = new Array<PQ_GetSlsOfferActivity>();
                //detailsact = DetailsOffAct.filter(x => x.OfferItemId == DetailsOffStageItem[0].OfferItemId);
                GridOffStageItemActivity.DataSource = DetailsOffAct;
                GridOffStageItemActivity.Bind();
            }
        });
    }
    function getSecondDetailsByID() {
        var items = GridOffStageItem.SelectedItem;
        var offItmId = items.OfferItemId;
        var newDDetails = DetailsOffAct.filter(function (x) { return x.OfferItemId == offItmId; });
        GridOffStageItemActivity.DataSource = newDDetails;
        GridOffStageItemActivity.Bind();
    }
    function btnCopy_Clicked() {
        txtUsedOHLaborPrc.value = txtStdOHLabor.value;
        txtUsedOHEquipPrc.value = txtStdOHEquip.value;
        txtUsedOHMaterialPrc.value = txtStdOHMaterial.value;
        txtUsedProdOHMaterialPrc.value = txtStdProdOHMaterial.value;
        txtUsedProdOHEquipPrc.value = txtStdProdOHEquip.value;
        txtUsedProdOHLaborPrc.value = txtStdProdOHLabor.value;
    }
})(OfferCostEstimation || (OfferCostEstimation = {}));
//# sourceMappingURL=OfferCostEstimation.js.map