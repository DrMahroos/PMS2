$(document).ready(() => {
    OfferSpecification.InitalizeComponent();
});
namespace OfferSpecification {
    const ControllerName: string = "OfferSpecification";
    const TableName: string = "P_TR_SalesOffer";
    const FieldKey: string = "OfferID";
    const JsGridcombobox: string = "combobox";
    var columnWidth: string = "70px";
    //------------------------Parent
    const GridInputClassName = "form-control gridIput";
    const NumberColumnWidth = "50px";
    var _OfferItemId: number = 0;
    var DetailsAssignHeader: PQ_GetSlsOfferStageItem = new PQ_GetSlsOfferStageItem();
    var _OfferStageId: number = 0;
    //------------------------

    var MasterDetails: M_D_OfferSpecification = new M_D_OfferSpecification();
    var MasterDetailsView: M_D_OfferSpecificationView = new M_D_OfferSpecificationView();
    var Master: P_TR_SalesOffer = new P_TR_SalesOffer();
    var ActPK = { OfferItemId: "", OfferStageId: "", OfferID: "" };
    var _Authorize: boolean = false;

    //var Details: Array<PQ_GetSlsOfferActivity> = new Array<PQ_GetSlsOfferActivity>();
    var DetailsAssignHeaderDetails: PQ_GetSlsOfferActivity = new PQ_GetSlsOfferActivity();
    var DataSourceChild: Array<PQ_GetSlsOfferActivity> = new Array<PQ_GetSlsOfferActivity>();
    var FilterDataSourceChild: Array<PQ_GetSlsOfferActivity> = new Array<PQ_GetSlsOfferActivity>();
    var newDataSourceChild: Array<PQ_GetSlsOfferActivity> = new Array<PQ_GetSlsOfferActivity>();
    var Tbl_DetailBilling: Array<P_Tr_SalesOfferStageItemActivity> = new Array<P_Tr_SalesOfferStageItemActivity>();

    var DataSourceParent: Array<PQ_GetSlsOfferStageItem> = new Array<PQ_GetSlsOfferStageItem>();

    var Activity: Array<P_D_Activity> = new Array<P_D_Activity>();

    var GridParent: JsGrid = new JsGrid();
    var GridChild: JsGrid = new JsGrid();

    var sys: SystemTools = new SystemTools();

    var ChkStatus: HTMLInputElement;
    var txtTrDate: HTMLInputElement;
    var txtItemId: HTMLInputElement;
    var txtItemName: HTMLInputElement;
    var btnTr: HTMLButtonElement;
    //var btnComputePro: HTMLButtonElement;
    var btnBuild: HTMLButtonElement;
    var activityId: number;
    var OfferStageItemActivityId: number;
    var _ScreenLang: string;
    var _CompCode: string;
    var _BraCode: string;
    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BraCode = SharedSession.CurrentEnvironment.BranchCode;
        InitalizeControls();
        InitalizeEvent();
        InitalizeGridParent();
        InitalizeGrid();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(New);
        ControlsButtons.EditAction(Edit)
        ControlsButtons.UndoAction(Undo)
        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.SaveAction(() => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                return;
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.PrintAction(Print);


        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_CompCode, _BraCode, Modules.OfferDefinition, Master.OfferID.toString());
        });


    }

    //------------------------
    function InitalizeGridParent() {
        let res: any = GetResourceList("OffStagI_");
        GridParent.ElementName = "GridParentSpecification";
        GridParent.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridParent.InsertionMode = JsGridInsertionMode.Binding;
        GridParent.OnRowDoubleClicked = GridParent_OnRowDoubleClicked;
        GridParent.Columns = [
            {
                name: "LineCode", width: "6%",
                headerTemplate: (): HTMLElement => {
                    let txt = DocumentActions.CreateElement<HTMLElement>("label");
                    txt.id = "h_LineCode"
                    return HeaderTemplate("OffStagI_Ser", txt);
                }
            },
            //{
            //    name: "ItemID", /*visible: false,*/ width: "0%",
            //    headerTemplate: (): HTMLElement => {
            //        let txt = CreateElement("label", GridInputClassName, " ", " ", "ItemID", " ");
            //        txt.id = "h_ItemID"
            //        txt.hidden = true;
            //        return HeaderTemplate("", txt);
            //    }
            //},
            {
                name: "ItemCode", /*visible: false,*/ width: "10%",
                headerTemplate: (): HTMLElement => {
                    let txt = DocumentActions.CreateElement<HTMLElement>("label");//CreateElement("label", GridInputClassName, " ", " ", "ItemID", " ");
                    txt.id = "h_ItemCode";
                    return HeaderTemplate("OffSpec_Item_ItemCode", txt);
                }
            },
            {
                name: "DescA", title: res.OffStagI_ItemName, visible: _ScreenLang == "ar", width: "40%",
                headerTemplate: (): HTMLElement => {
                    let txt: HTMLElement = DocumentActions.CreateElement<HTMLElement>("label");
                    txt.id = "h_Item_DescA";
                    return HeaderTemplate("OffStagI_ItemName", txt);
                }
            },
            {
                name: "DescE", title: res.OffStagI_ItemName, visible: _ScreenLang == "en", width: "40%",
                headerTemplate: (): HTMLElement => {
                    let txt: HTMLElement = DocumentActions.CreateElement<HTMLElement>("label");
                    txt.id = "h_Item_DescE";
                    return HeaderTemplate("OffStagI_ItemName", txt);
                }
            },
            {
                name: "TechDescA", title: res.OffStagI_ItemName, visible: _ScreenLang == "ar", width: "20%",
                headerTemplate: (): HTMLElement => {
                    let txt: HTMLElement = DocumentActions.CreateElement<HTMLElement>("label");
                    txt.id = "h_TechDescA";
                    return HeaderTemplate("OffStagI_TechDescA", txt);
                }
            },
            {
                name: "TechDescE", title: res.OffStagI_ItemName, visible: _ScreenLang == "en", width: "20%",
                headerTemplate: (): HTMLElement => {
                    let txt: HTMLElement = DocumentActions.CreateElement<HTMLElement>("label");
                    txt.id = "h_TechDescE";
                    return HeaderTemplate("OffStagI_TechDescE", txt);
                }
            },
            {
                name: "IsFixedSystem", title: res.OffStagI_Fixed, width: "5%",
                headerTemplate: (): HTMLElement => {
                    let txt: HTMLElement = DocumentActions.CreateElement<HTMLElement>("label");
                    txt.id = "h_IsFixedSystem";
                    return HeaderTemplate("OffStagI_Fixed", txt);
                }
            },
            //{
            //    title: res.OffStagI_Fixed, name: "IsFixedSystem", width: "5%",
            //    headerTemplate: (): HTMLElement => {
            //        let txt = CreateElement("checkbox", GridInputClassName, " ", " ", "IsFixedSystem", " ");
            //        txt.id = "h_IsFixedSystem";
            //        txt.disabled = true;
            //        return HeaderTemplate("OffStagI_Fixed", txt);
            //    }
            //},
            {
                title: res.OffStagI_UOM, name: "Uom_UomCode", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt: HTMLElement = DocumentActions.CreateElement<HTMLElement>("label");
                    txt.id = "h_Uom_UomCode";
                    return HeaderTemplate("OffStagI_UOM", txt);
                }
            },
            {
                title: res.OffStagI_Qty, name: "Qty", width: "8%",
                headerTemplate: (): HTMLElement => {
                    let txt = DocumentActions.CreateElement<HTMLElement>("label");//CreateElement("label", GridInputClassName, " ", " ", "Qty", " ");
                    txt.id = "h_Qty";
                    txt.onkeyup = (e) => {
                        CalcTotal();
                    };
                    return HeaderTemplate("OffStagI_Qty", txt);
                }
            },
            {
                title: res.OffStagI_UnitPrice, name: "UnitPrice", width: "8%",
                headerTemplate: (): HTMLElement => {
                    let txt = DocumentActions.CreateElement<HTMLElement>("label");//CreateElement("label", GridInputClassName, " ", " ", "UnitPrice", " ");
                    txt.id = "h_UnitPrice";
                    txt.onkeyup = (e) => {
                        CalcTotal();
                    };
                    return HeaderTemplate("OffStagI_UnitPrice", txt);
                }
            },
            {
                name: "calc_total", title: res.OffStagI_Total, width: "9%",
                headerTemplate: (): HTMLElement => {
                    let txt: HTMLElement = DocumentActions.CreateElement<HTMLElement>("label");
                    txt.id = "h_calc_total";
                    return HeaderTemplate("OffStagI_Total", txt);
                }
            },
            {
                name: "IsOfferItem", title: res.OffStagI_IsOfferItem, width: "7%",
                headerTemplate: (): HTMLElement => {
                    let txt: HTMLElement = DocumentActions.CreateElement<HTMLElement>("label");
                    txt.id = "h_IsOfferItem";
                    return HeaderTemplate("OffStagI_IsOfferItem", txt);
                }
            },
            //{
            //    title: res.OffStagI_IsOfferItem, name: "IsOfferItem", width: "8%",
            //    headerTemplate: (): HTMLElement => {
            //        let txt = CreateElement("checkbox", GridInputClassName, " ", " ", "IsOfferItem", " ");
            //        txt.id = "h_IsOfferItem";
            //        txt.disabled = true;
            //        return HeaderTemplate("OffStagI_IsOfferItem", txt);
            //    }
            //},
            {
                title: res.OffStagI_Remarks, name: "Remarks", width: "15%",
                headerTemplate: (): HTMLElement => {
                    let txt = DocumentActions.CreateElement<HTMLElement>("label");//CreateElement("label", GridInputClassName, " ", " ", "Remarks", " ");
                    txt.id = "h_Remarks";
                    return HeaderTemplate("OffStagI_Remarks", txt);
                }
                //},
                //{
                //    title: "#", name: "btnAddItem", visible: true, width: NumberColumnWidth,
                //    headerTemplate: (): HTMLElement => {
                //        let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                //        btn.className = TransparentButton + "editable";
                //        btn.type = "button";
                //        btn.style.fontSize = "25px";
                //        btn.style.color = "forestgreen";
                //        btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                //        btn.id = "btnAddItemGrid";
                //        btn.onclick = (e) => {
                //            AddItemInGrid();
                //            _OfferItemId = 0;

                //        };
                //        return btn;
                //    },
                //    itemTemplate: (s: string, item: PQ_GetSlsOfferStageItem): HTMLButtonElement => {
                //        let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                //        btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                //        btn.className = TransparentButton + "editable";
                //        btn.style.fontSize = "20px";
                //        btn.style.color = "forestgreen";
                //        btn.style.width = NumberColumnWidth;
                //        btn.name = DataSourceParent.indexOf(item).toString();
                //        btn.onclick = (e) => {
                //            let index = Number((e.currentTarget as HTMLButtonElement).name);
                //            DataSourceParent.splice(index, 1);
                //            GridParent.DataSource = DataSourceParent;
                //            GridParent.Bind()

                //            _OfferItemId = item.OfferItemId;
                //            _OfferStageId = item.OfferStageId;
                //            FillInputText("h_LineCode", item.LineCode.toString());
                //            FillInputText("h_ItemID", item.ItemID.toString());

                //            //FillInputText("btnFindSalesItem", item.Item_ItemCode.toString());
                //            //FillInputText("h_Item_DescA", item.Item_DescA.toString());
                //            //FillInputText("h_Item_DescE", item.Item_DescE.toString());

                //            item.IsFixedSystem == true ? $('#h_IsFixedSystem').attr('checked', 'checked') : $('#h_IsFixedSystem').removeAttr('checked');
                //            FillInputText("h_Uom_UomCode", item.Uom_UomCode.toString());
                //            FillInputText("h_Qty", item.Qty.toString());
                //            FillInputText("h_UnitPrice", item.UnitPrice.toString());
                //            item.IsOfferItem == true ? $('#h_IsOfferItem').attr('checked', 'checked') : $('#h_IsOfferItem').removeAttr('checked');
                //            FillInputText("h_calc_total", item.calc_total.toString());
                //            FillInputText("h_Remarks", item.Remarks.toString());
                //        };
                //        return btn;
                //    }
            }
        ];
        GridParent.DataSource = DataSourceParent;
        GridParent.Bind();
    }

    function AddItemInGrid() {
        DetailsAssignHeader = new PQ_GetSlsOfferStageItem();
        DetailsAssignHeader.LineCode = $('#h_LineCode').val();
        DetailsAssignHeader.ItemID = Number($('#h_ItemID').text());

        //DetailsAssignHeader.Item_ItemCode = $('#btnFindSalesItem').text();
        //DetailsAssignHeader.Item_DescA = $('#h_Item_DescA').text();
        //DetailsAssignHeader.Item_DescE = $('#h_Item_DescE').text();

        DetailsAssignHeader.IsFixedSystem = $('#h_IsFixedSystem').prop('checked');
        DetailsAssignHeader.Qty = Number($('#h_Qty').val());
        DetailsAssignHeader.Uom_UomCode = $('#h_Uom_UomCode').text();
        DetailsAssignHeader.UnitPrice = Number($('#h_UnitPrice').val());
        DetailsAssignHeader.IsOfferItem = $('#h_IsOfferItem').prop('checked');
        DetailsAssignHeader.Remarks = $('#h_Remarks').val();
        DetailsAssignHeader.calc_total = Number($('#h_calc_total').text());
        if (_OfferItemId == 0) {
            return;
            //Insert();
        } else {
            UpdateItem()
        }
    }

    function UpdateItem() {
        //if (Validation() == false) {
        //    WorningMessage("الرجاء استكمال البيانات", "Please complete Data");
        //    return;
        //}
        debugger
        DetailsAssignHeader.OfferItemId = _OfferItemId;
        DetailsAssignHeader.OfferID = Master.OfferID;
        DetailsAssignHeader.OfferStageId = _OfferStageId;
        Ajax.CallAsync({
            url: Url.Action("UpdateStageItem", "OfferDefinition"),
            data: DetailsAssignHeader,
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    WorningMessage("تم التعديل بنجاح", "Successfully saved", "Update", "تعديل");
                    DataSourceParent.push(DetailsAssignHeader);
                    GridParent.DataSource = DataSourceParent;
                    GridParent.Bind()
                    //SumTotal();
                } else {
                    MessageBox.Show(result.ResponseMessage, "Update");
                }
            }
        });
    }

    function Undo() {

    }
    function CalcTotal() {
        let _Qty: Number = IsNullOrEmpty($('#h_Qty').val()) ? 0 : Number($('#h_Qty').val());
        let _Price: Number = IsNullOrEmpty($('#h_UnitPrice').val()) ? 0 : Number($('#h_UnitPrice').val());
        let _Result: number = Number(_Qty) * Number(_Price);
        $('#h_calc_total').text(_Result);
    }

    function GetResourceList(Sourcekey: string): any {
        var result = Ajax.Call<any>({
            url: Url.Action("GetResourceNames", "ClientTools"),
            data: { _prefix: Sourcekey },
            success: (d) => {
                result = JSON.parse(d.result) as any;
            }
        });
        return result;
    }

    function FillInputText(_TextID: string, _Data: string) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }

    function GridParent_OnRowDoubleClicked() {
        debugger;
        var _Items: PQ_GetSlsOfferStageItem = GridParent.SelectedItem as PQ_GetSlsOfferStageItem;
        ActPK.OfferItemId = _Items.OfferItemId.toString();
        ActPK.OfferStageId = _Items.OfferStageId.toString();
        ActPK.OfferID = _Items.OfferID.toString();
        txtItemId.value = _Items.ItemCode;
        txtItemName.value = _Items.DescE;
        newDataSourceChild = DataSourceChild.filter(items => items.OfferID == _Items.OfferID && items.OfferItemId == _Items.OfferItemId);
        GridChild.DataSource = newDataSourceChild;
        GridChild.Bind();
    }
    //------------------------

    function InitalizeControls() {
        txtItemId = document.getElementById("txtItemId") as HTMLInputElement;
        txtItemName = document.getElementById("txtItemName") as HTMLInputElement;
        ChkStatus = document.getElementById("ChkStatus") as HTMLInputElement;
        txtTrDate = document.getElementById("txtTrDate") as HTMLInputElement;
        btnTr = document.getElementById("btnTr") as HTMLButtonElement;
        //btnComputePro = document.getElementById("btnComputePro") as HTMLButtonElement;
        btnBuild = document.getElementById("btnBuild") as HTMLButtonElement;
    }

    function InitalizeEvent() {
        btnTr.onclick = btnTr_onclick;
        //btnComputePro.onclick = btnComputePro_onclick;
        btnBuild.onclick = btnBuild_onclick
        ChkStatus.onchange = ValidationPrc;
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("OffSpec_");
        // New 
        GridChild.ElementName = "GridChild";
        GridChild.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridChild.OnRefreshed = () => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridChild.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridChild.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridChild.InsertionMode = JsGridInsertionMode.Binding;
        GridChild.OnItemInserting = () => { };
        GridChild.OnItemUpdating = () => { };
        GridChild.OnItemDeleting = () => { };
        GridChild.Columns = [
            {
                title: res.OffSpec_ACT, name: "Act_ActivityCode", width: columnWidth, css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let btnFindAtcivity: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindAtcivity = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindAtcivity.className = "btn btn-primary btn-block addable editable";
                    btnFindAtcivity.innerText = _ScreenLang == "ar" ? "الانشطة" : "Activity";
                    btnFindAtcivity.id = "btnFindAtcivity";
                    btnFindAtcivity.type = "button";
                    btnFindAtcivity.onclick = (e) => {
                        btnFindAtcivity_onclick();
                    };
                    return HeaderTemplate("OffSpec_ACT", btnFindAtcivity);
                },
                itemTemplate: (index: string, item: PQ_GetSlsOfferActivity): HTMLElement => {
                    let lbl = DocumentActions.CreateElement<HTMLLabelElement>("label");
                    lbl.innerText = item.Act_ActivityCode;
                    return lbl;
                }
            },
            {
                title: res.OffSpec_Act_DescA, visible: _ScreenLang == "ar", css: "ColumPadding", name: "Act_DescA", width: "12%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Act_DescA", " ");
                    txt.id = "h_Act_DescA"
                    txt.disabled = true;
                    return HeaderTemplate("OffSpec_Act_DescA", txt);
                }
            },
            {
                title: res.OffSpec_Act_DescE, visible: _ScreenLang == "en", css: "ColumPadding", name: "Act_DescE", width: "12%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Act_DescE", " ");
                    txt.id = "h_Act_DescE"
                    txt.disabled = true;
                    return HeaderTemplate("OffSpec_Act_DescE", txt);
                }
            },
            {
                title: res.OffSpec_UOM, css: "ColumPadding", name: "Uom_UomCode", width: "4%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Uom_UomCode", " ");
                    txt.id = "h_UOM"
                    txt.disabled = true;
                    return HeaderTemplate("OffSpec_UOM", txt);
                }
            },
            {
                title: res.OffSpec_Qty, css: "ColumPadding", name: "Qty", width: "3%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Qty", " ");
                    txt.disabled = false;
                    txt.id = "h_SecQty";
                    return HeaderTemplate("OffSpec_Qty", txt);
                }

            },
            {
                title: res.OffSpec_ProductionIncluded, css: "ColumPadding", name: "ProductionIncluded", width: "4%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateListYesOrNo();
                    txt.disabled = false;
                    txt.id = "h_ProductionIncluded";
                    return HeaderTemplate("OffSpec_ProductionIncluded", txt);
                }
            },
            {
                title: res.OffSpec_ProductionPrc, css: "ColumPadding", name: "ProductionPrc", width: "3%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ProductionPrc", " ");
                    txt.disabled = false;
                    txt.id = "h_ProductionPrc";
                    return HeaderTemplate("OffSpec_ProductionPrc", txt);
                }
            },
            {
                title: res.OffSpec_Remarks, css: "ColumPadding", name: "Remarks", width: "8.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Remarks", " ");
                    txt.disabled = false;
                    txt.id = "h_SecRemarks"
                    return HeaderTemplate("OffSpec_Remarks", txt);
                }
            },
            {
                title: "#", name: "btnAddItem", visible: true, width: NumberColumnWidth,
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton + "editable";
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
                        
                        AddItemActivityInGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GetSlsOfferActivity): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.style.fontSize = "24px";
                    btn.type = "button";
                    btn.style.color = "red";
                    btn.name = newDataSourceChild.indexOf(item).toString();
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        debugger;
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        
                        let data: P_Tr_SalesOfferStageItemActivity = newDataSourceChild[index];

                        let newIndex: number = 0;
                        for (var i = 0; i < DataSourceChild.length; i++) {
                            if (DataSourceChild[i].OfferStageItemActivityId == data.OfferStageItemActivityId) {
                                newIndex = i;
                                break;
                            }
                        }

                        DeleteActivity(data);
                        newDataSourceChild.splice(index, 1);
                        DataSourceChild.splice(newIndex, 1);
                        GridChild.DataSource = newDataSourceChild;
                        GridChild.Bind();
                        //BindDataGrids();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            }
            ,
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: (s: string, item: PQ_GetSlsOfferActivity): HTMLButtonElement => {

                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.style.fontSize = "20px";
                    btn.type = "button";
                    btn.style.color = "forestgreen";
                    btn.name = newDataSourceChild.indexOf(item).toString();
                    btn.onclick = (e) => {
                        debugger;
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        if (($("#h_Act_DescE").text() != "")) {
                            WorningMessage("يوجد سجل اخر تحت التعديل ", "Please Update the Current Record First");
                            return;
                        }
                        debugger;
                        DetailsAssignHeaderDetails = new PQ_GetSlsOfferActivity();
                        activityId = item.ActivityID;
                        ActPK.OfferID = item.OfferID.toString();
                        ActPK.OfferItemId = item.OfferItemId.toString();
                        ActPK.OfferStageId = item.OfferStageId.toString();
                        debugger;
                        OfferStageItemActivityId = item.OfferStageItemActivityId;

                        DetailsAssignHeaderDetails.OfferStageItemActivityId = item.OfferStageItemActivityId;
                        DetailsAssignHeaderDetails.Act_ActivityCode = item.Act_ActivityCode;
                        DetailsAssignHeaderDetails.Act_DescA = item.Act_DescA;
                        DetailsAssignHeaderDetails.Act_DescE = item.Act_DescE;
                        DetailsAssignHeaderDetails.Uom_UomCode = item.Uom_UomCode;

                        DetailsAssignHeaderDetails.Qty = item.Qty;
                        DetailsAssignHeaderDetails.ProductionIncluded = item.ProductionIncluded;
                        DetailsAssignHeaderDetails.ProductionPrc = item.ProductionPrc;
                        DetailsAssignHeaderDetails.Remarks = item.Remarks;

                        let index = Number((e.currentTarget as HTMLButtonElement).name);

                        let data: P_Tr_SalesOfferStageItemActivity = newDataSourceChild[index];
                        debugger;
                        let newIndex: number = 0;
                        for (var i = 0; i < DataSourceChild.length; i++) {
                            if (DataSourceChild[i].OfferStageItemActivityId == data.OfferStageItemActivityId) {
                                newIndex = i;
                                break;
                            }
                        }
                        debugger;
                        newDataSourceChild.splice(index, 1);
                        DataSourceChild.splice(newIndex, 1);
                        GridChild.DataSource = newDataSourceChild;
                        GridChild.Bind();
                        //BindDataGrids();
                        //ReIndexingGrid();
                        
                        DetailsAssignHeaderDetails.ActivityID = activityId;
                        DetailsAssignHeaderDetails.OfferID = Number(ActPK.OfferID);
                        DetailsAssignHeaderDetails.OfferItemId = Number(ActPK.OfferItemId);
                        DetailsAssignHeaderDetails.OfferStageId = Number(ActPK.OfferStageId);
                        DetailsAssignHeaderDetails.OfferStageItemActivityId = OfferStageItemActivityId;


                        $('#btnFindAtcivity').text(DetailsAssignHeaderDetails.Act_ActivityCode);
                        FillInputText("h_Act_DescA", DetailsAssignHeaderDetails.Act_DescA);
                        FillInputText("h_Act_DescE", DetailsAssignHeaderDetails.Act_DescE);
                        FillInputText("h_UOM", DetailsAssignHeaderDetails.Uom_UomCode);
                        FillInputText("h_SecQty", DetailsAssignHeaderDetails.Qty.toString());
                        //$("#h_ProductionIncluded option:selected").val(DetailsAssignHeaderDetails.ProductionIncluded);
                        $("#h_ProductionIncluded option:selected").text(DetailsAssignHeaderDetails.ProductionIncluded);
                        FillInputText("h_ProductionPrc", DetailsAssignHeaderDetails.ProductionPrc.toString());
                        FillInputText("h_SecRemarks", DetailsAssignHeaderDetails.Remarks.toString());
                    };
                    return btn;
                }
            }
        ];
        GridChild.DataSource = DataSourceChild;
        GridChild.Bind();
    }

    function btnBuild_onclick() {
        AjaxApi.CallAsyncApi({
            type: "GET",
            async: false,
            url: sys.apiUrl("P_TR_SalesOffer", "BuildOfferActivity"),
            data: { OfferId: Master.OfferID },
            success: (d) => {
                
                if (d == 1) {
                    WorningMessage("Build Successfully", "Build Successfully", "Build", "Build");
                }
                
                Display();
            }
        });

    }

    function DeleteActivity(entity: P_Tr_SalesOfferStageItemActivity) {
        //let ItemAct = e.Item as P_Tr_SalesOfferStageItemActivity;
        
        Ajax.CallAsync({
            url: Url.Action("DeleteActivity", ControllerName),
            data: entity,
            success: (d) => {
                
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    //WorningMessage("تم الحذف بنجاح", "Successfully Delete", "الحذف", "Delete");
                    //DataSourceParent.splice(e.ItemIndex, 1);
                    GridChild.DataSource = newDataSourceChild;
                    GridChild.Bind();
                }
            }
        });
    }

    function AddItemActivityInGrid() {
        debugger;
        if (activityId == null) {
            WorningMessage("يجب اختيار نشاط", "Please Choose Activity To Insert");
            return;
        }
        debugger;
        DetailsAssignHeaderDetails = new PQ_GetSlsOfferActivity();
        DetailsAssignHeaderDetails.ActivityID = activityId;
        DetailsAssignHeaderDetails.OfferID = Number(ActPK.OfferID);
        DetailsAssignHeaderDetails.OfferItemId = Number(ActPK.OfferItemId);
        DetailsAssignHeaderDetails.OfferStageId = Number(ActPK.OfferStageId);
        DetailsAssignHeaderDetails.OfferStageItemActivityId = OfferStageItemActivityId;
        DetailsAssignHeaderDetails.Act_ActivityCode = $('#btnFindAtcivity').text();
        DetailsAssignHeaderDetails.Act_DescA = $('#h_Act_DescA').val();
        DetailsAssignHeaderDetails.Act_DescE = $('#h_Act_DescE').val();
        DetailsAssignHeaderDetails.Uom_UomCode = $('#h_UOM').val();
        DetailsAssignHeaderDetails.Qty = $('#h_SecQty').val();
        DetailsAssignHeaderDetails.ProductionIncluded = Boolean($('#h_ProductionIncluded').val());
        DetailsAssignHeaderDetails.ProductionPrc = $('#h_ProductionPrc').val();
        DetailsAssignHeaderDetails.Remarks = $('#h_SecRemarks').val();
        // Check Activity Repeated
        for (var itm of newDataSourceChild) {
            if (itm.ActivityID == activityId) {
                WorningMessage("لا يمكن تكرار النشاط", "Activity Cannot Repeated");
                return;
            }
        }
        if (IsNullOrEmpty(ActPK.OfferID) && IsNullOrEmpty(ActPK.OfferItemId) && IsNullOrEmpty(ActPK.OfferStageId)) {
            WorningMessage("يجب اختيار عنصر اولا", "Please Choose Item From The First Grid");
            return;
        }
        debugger;
        if (isNaN(OfferStageItemActivityId) || OfferStageItemActivityId == null) {
            debugger;
            Ajax.CallAsync({
                url: Url.Action("InsetrActivity", "OfferSpecification"),
                data: DetailsAssignHeaderDetails,
                success: (d) => {
                    debugger;
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == true) {
                        //WorningMessage("تم الحفظ بنجاح", "Successfully saved", "الاضافه", "Insert");
                        let _ACT = result.ResponseData as PQ_GetSlsOfferActivity;
                        //newDataSourceChild.push(_ACT);
                        DataSourceChild.push(_ACT);
                        GridChild.DataSource = newDataSourceChild;
                        GridChild.Bind();
                        debugger;
                        //OfferStageItemActivityId = _ACT.OfferStageItemActivityId;
                        OfferStageItemActivityId = null;
                    } else {
                        MessageBox.Show(result.ResponseMessage, "Insert");
                    }
                }
            });
        } else {
            debugger;
            Ajax.CallAsync({
                url: Url.Action("UpdateActivity", ControllerName),
                data: DetailsAssignHeaderDetails,
                success: (d) => {
                    debugger;
                    let result = d.result as ResponseResult;
                    if (result.ResponseState == true) {
                        //WorningMessage("تم التعديل بنجاح", "Successfully Edit", "التعديل", "Update");
                        GridChild.DataSource = newDataSourceChild;
                        GridChild.Bind();
                        OfferStageItemActivityId = null;
                    }
                    else {
                        MessageBox.Show(result.ResponseMessage, "Update");
                    }
                }
            });
        }
        DataSourceChild.unshift(DetailsAssignHeaderDetails);

        newDataSourceChild.unshift(DetailsAssignHeaderDetails);
        GridChild.DataSource = newDataSourceChild;
        GridChild.Bind();
    }

    function btnComputePro_onclick() {

        let _ItemAct: Array<P_Tr_SalesOfferStageItemActivity> = new Array<P_Tr_SalesOfferStageItemActivity>();
        AjaxApi.CallsyncApi({
            type: "GET",
            url: sys.apiUrl("P_TR_SalesOffer", "GetItemActivity"),
            data: { OfferId: Master.OfferID },
            success: (d) => {
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    _ItemAct = result.Response;
                }
            }
        });
        for (var item of DataSourceParent) {
            let _TotalItem = item.Qty * item.UnitPrice;
            let _Act = _ItemAct.filter(x => x.OfferItemId = item.OfferItemId);
            let _TotalAct: number = 0;
            for (var itemAct of _Act) {
                _TotalAct += itemAct.Qty * itemAct.UnitPrice;
            }
            if (_TotalItem != _TotalAct) {
                _Authorize = false;
                WorningMessage("Please make sure total items equal total item activity", "الرجاء التأكد اجمالي الصناف يساوي اجمالي انشطة الاصناف");
                break;
            } else {
                _Authorize = true;
            }
        }
        if (_Authorize == true)
            WorningMessage("Authorize Successfully", "Authorize Successfully");
    }

    function btnTr_onclick() {

        sys.FindKey(Modules.OfferSpecification, "btnTr", "CompCode = " + _CompCode + " and BraCode = " + _BraCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            let _Index = GetIndexByUseId(id, TableName, FieldKey, " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
            NavigateToSearchResultKey(Number(_Index), Navigate);
        })
    }

    function Navigate() {
        debugger
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {
                Master = d.result;
                Display();
            }
        })
    }

    function Display() {
        debugger;
        DocumentActions.RenderFromModel(Master);
        txtTrDate.value = DateFormat(Master.TrDate);
        LoadDetails(Master.OfferID);
        ClearGrid(GridChild, DataSourceChild);
        txtItemId.value = "";
        txtItemName.value = "";
        $("#ChkStatus").attr("disabled", "disabled");
        debugger
        if (Master.Status < 5) {
            ChkStatus.checked = false;
            ControlsButtons.EditButton.disabled = false;

        } else if (Master.Status >= 5) {
            ControlsButtons.EditButton.disabled = true;
            ChkStatus.checked = true;
        }

    }

    function LoadDetails(id: number) {
        
        AjaxApi.CallAsyncApi({
            url: sys.apiUrl("P_TR_SalesOffer", "GetOfferSpicifactionDetails"),
            data: { id: id },
            success: (d) => {
                
                let result = d as BaseResponse;
                if (result.IsSuccess) {
                    DataSourceParent = result.Response.PQ_GetSlsOfferStageItem as Array<PQ_GetSlsOfferStageItem>;
                    DataSourceChild = result.Response.PQ_GetSlsOfferActivity as Array<PQ_GetSlsOfferActivity>

                    GridParent.DataSource = DataSourceParent;
                    GridParent.Bind();
                }
            }
        })
    }

    function Validation(): boolean {
        var _Result: boolean = true;
        if (DataSourceParent.length == 0 || DataSourceChild.length == 0) {
            _Result = false;
        }
        return _Result;
    }

    function Update() {
        debugger;
        Assign();
        if (ChkStatus.checked == true) {
            Master.Status = 5;
        }
        Ajax.Callsync({
            url: Url.Action("UpdateOffer", "OfferSpecification"),
            async: false,
            data: Master,
            success: (d) => {
                debugger;
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Update", () => {
                        //Display();
                        debugger;
                        let _Index = GetIndexByUseId(result.ResponseData.OfferID, "P_TR_SalesOffer", "OfferID", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        })
    }

    function Assign() {
        //AssignMaster
        debugger;
        DocumentActions.AssignToModel<P_TR_SalesOffer>(Master);
        MasterDetails.P_TR_SalesOffer = Master as P_TR_SalesOffer;
        //AssignDetails
        MasterDetails.P_Tr_SalesOfferStageItem = DataSourceParent as Array<P_Tr_SalesOfferStageItem>;
        MasterDetails.P_Tr_SalesOfferStageItemActivity = DataSourceChild as Array<P_Tr_SalesOfferStageItemActivity>;
    }

    function New() {
        ClearGrid(GridParent, DataSourceParent);
        ClearGrid(GridChild, DataSourceChild);
    }

    //function BindDataGrids() {
    //    
    //    GridChild.DataSource = DataSourceChild;
    //    GridChild.Bind();
    //}

    function Print() {
        if (Master == null)
            return;
        debugger
        Ajax.CallAsync({
            url: Url.Action("PrintOfferSpecification", "PrintTransaction"),
            data: { TrID: Master.OfferID },
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        })
    }

    function Edit() {
        $('#btnBuild').removeAttr('disabled');
        if (Master.Status == 4 && SharedSession.CurrentPrivileges.CUSTOM1 == true) {
            $("#ChkStatus").removeAttr("disabled");
        } else {
            $("#ChkStatus").attr("disabled", "disabled");
        }
    }

    function GetMasterById(id: number): P_TR_SalesOffer {
        let _Master = Ajax.Call<P_TR_SalesOffer>({
            url: Url.Action("GetByID", ControllerName),
            data: { id: id },
        });
        return _Master;
    }

    function btnFindAtcivity_onclick() {
        
        sys.FindKey(Modules.OfferSpecification, "btnFindAtcivity", "CompCode = " + _CompCode + " and IsDetail =" + 1, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            debugger;
            AjaxApi.CallAsyncApi({
                type: "GET",
                url: sys.apiUrl("P_TR_SalesOffer", "SearchActivity"),
                data: { id: id },
                success: (d) => {
                    debugger;
                    let result = d as BaseResponse;
                    if (result.IsSuccess) {
                        let active = result.Response as PQ_SrchActivity;
                        activityId = active.ActivityID;
                        $('#btnFindAtcivity').text(active.ActivityCode);
                        $('#h_Act_DescE').val(active.DescE);
                        $('#h_UOM').val(active.Uom_Code);
                        $('#h_UnitPrice').val(active.UnitPrice);
                    }
                }
            });
        });
    }

    function ValidationPrc(): boolean {
        
        var _Result: boolean = true;
        //check on total persentage
        debugger
        let ProdPrc: number = 0;
        // for it  of items 
        for (var itm of DataSourceParent) {
            
            FilterDataSourceChild = DataSourceChild.filter(x => x.OfferID == itm.OfferID && x.OfferItemId == itm.OfferItemId);
            // load item activity 
            ProdPrc = 0;
            for (var act of FilterDataSourceChild) {
                if (act.ProductionIncluded == true) {
                    ProdPrc += Number(act.ProductionPrc);
                }
            }
            if (ProdPrc != 100) {
                WorningMessage("اجمالي نسبة الانتاج يجب ان يساوي 100 في البند رقم " + itm.LineCode, "Total percent must be equal 100 line no " + itm.LineCode);
                ChkStatus.checked = false;
                _Result = false;
                break;
            }
        }
        //end check on total persentage
        return _Result;
    }
}