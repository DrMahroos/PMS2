$(document).ready(() => {
    CustomerBilling.InitalizeComponent();
});
namespace CustomerBilling {
    const ControllerName: string = "CustomerBilling";
    const GridInputClassName = "form-control gridIput";
    var columnWidth: string = "100px";
    const NumberColumnWidth = "50px";
    var sys: SystemTools = new SystemTools();
    var GridSales: JsGrid = new JsGrid();
    var GridProd: JsGrid = new JsGrid();

    var Master: PQ_GetSalesInvoice = new PQ_GetSalesInvoice();
    var MasterDetails: M_D_CustomerBilling = new M_D_CustomerBilling();

    var DetailsSales: Array<PQ_GetSalesInvoiceDetail> = new Array<PQ_GetSalesInvoiceDetail>();
    var DetailsAssignHeaderSales: PQ_GetSalesInvoiceDetail = new PQ_GetSalesInvoiceDetail();
    var Tbl_DetailSales: Array<P_TR_SalesInvoiceDetail> = new Array<P_TR_SalesInvoiceDetail>();

    //var DetailsProd: Array<PQ_GetSalesInvoiceProd> = new Array<PQ_GetSalesInvoiceProd>();
    //var DetailsAssignHeaderProd: PQ_GetSalesInvoiceProd = new PQ_GetSalesInvoiceProd();
    //var Tbl_DetailProd: Array<P_TR_SalesInvoiceProd> = new Array<P_TR_SalesInvoiceProd>();
    var SetInterval: any;
    var txtTrNo: HTMLInputElement;
    var txtProjectID: HTMLInputElement;
    var txtCust_CustomerCode: HTMLInputElement;
    var txtProjCode: HTMLInputElement;
    var txtProj_DescL: HTMLInputElement;
    var txtCust_DescE: HTMLInputElement;
    var txtTrDate: HTMLInputElement;
    var txtRefCode: HTMLInputElement;
    var txtFromDate: HTMLInputElement;
    var txtToDate: HTMLInputElement;
    var ChkStatus: HTMLInputElement;
    var ChkIsFinal: HTMLInputElement;
    var txtTotalAmount: HTMLInputElement;
    var txtDiscountPrc: HTMLInputElement;
    var txtDiscount: HTMLInputElement;
    var txtNetAmount: HTMLInputElement;
    var txtVatAmount: HTMLInputElement;
    var txtVatPrc: HTMLInputElement;
    var li2_AdvPrc: HTMLInputElement;

    var btnSearchBill: HTMLButtonElement;
    var btnSearchProject: HTMLButtonElement;
    var btnLoadProdution: HTMLButtonElement;
    var btnCalc: HTMLButtonElement;

    //var btnAuthorize: HTMLButtonElement;
    var btnSearchBill: HTMLButtonElement;
    var btnReopen: HTMLButtonElement;
    var InvoiceDetailId: number;
    var InvoiceId: number;
    var ProductionDetailId: number;
    var ProductionId: number;
    var ProjectPhaseItemId: number;
    var ProjectPhaseId: number;
    var itemID: number;
    var customerId: number;
    var ProjectID: number;
    var Proj_ProjectCode: string;
    var _ScreenLang: string;
    var _CompCode: string;
    var _BraCode: string;
    var _LoginUser: string;
    var ChkDownpayment: HTMLInputElement;
    var txtRemarks: HTMLInputElement;
    var txtDoNo: HTMLInputElement;


    var l1_InvoiceAmount: HTMLInputElement;
    var l1_InvoiceVat: HTMLInputElement;
    var l1_InvoiceNetVAT: HTMLInputElement;


    var li2_AdvAmount: HTMLInputElement;
    var li2_AdvVat: HTMLInputElement;
    var li2_AdvNet: HTMLInputElement;

    var li3TaxableTotalAmount: HTMLInputElement;
    var li3TaxableTotalVAT: HTMLInputElement;
    var li3TaxableTotalNetVAT: HTMLInputElement;

    var li4RetentionAmount: HTMLInputElement;
    var li4ayablemount: HTMLInputElement;

    var li5AdvanceConsumPrc: HTMLInputElement;
    var li5UsedAmount: HTMLInputElement;
    var li5RemainAmount: HTMLInputElement;



    var vatPrc: number;
    var downpaymentPrc: number;
    var DiscountPrc: number;
    var UsedDownpayment: number;
    var AdvanceConsumPrc_: number;
    var AdvVatAmount: number;
    var warnteeprc: number;
    var RemainDownpayment: number;
    var MasterVatPrc: number;
    var AdvanceConsumption: number;
    var DownAmount: number;
    var Downused: number;
    var DownAmountPrc: number;
    var AdvAmount: number;
    var AdvVat: number;
    var AdvNet: number;
    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLang = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BraCode = SharedSession.CurrentEnvironment.BranchCode;
        _LoginUser = SharedSession.CurrentEnvironment.UserCode;
        InitalizeControls();
        InitalizeEvents();
        SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.Language;
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
        ControlsButtons.PrintAction(() => { PrintCustomerBilling(); });
        ControlsButtons.UndoAction(Undo);
        InitalizeGrid();
        //vatPrc = Ajax.Call<number>({ url: Url.Action("GetVatPrcFromPControl", ControllerName) });
        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_CompCode, _BraCode, Modules.CustomerBilling, Master.BillCode.toString());
        });
    }

    function PrintCustomerBilling() {
        Ajax.CallAsync({
            url: Url.Action("PrintCustomerBilling", "PrintTransaction"),
            data: { TrID: Number(Master.InvoiceId) },
            success: (d) => {
                let url = d.result as string;
                window.open(url, "_blank");
            }
        });


    }

    function InitalizeGrid() {
        // Grid Sales
        let res: any = GetResourceList("SMB_");
        GridSales.ElementName = "GridSales";
        GridSales.OnRefreshed = () => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridSales.Columns = [
            {
                title: res.SMB_LineCode, name: "LineCode", width: columnWidth, css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let btnFindItem: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindItem = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindItem.className = "btn btn-primary btn-block addable editable";
                    btnFindItem.innerText = _ScreenLang == "ar" ? "العناصر" : "Items";
                    btnFindItem.id = "btnFindItem";
                    btnFindItem.type = "button";
                    btnFindItem.onclick = (e) => {
                        btnFindItem_onclick();
                    };
                    return HeaderTemplate("SMB_LineCode", btnFindItem);
                },
                itemTemplate: (index: string, item: PQ_GetSalesInvoiceDetail): HTMLElement => {
                    let lbl = DocumentActions.CreateElement<HTMLLabelElement>("label");
                    lbl.innerText = item.LineCode;
                    return lbl;
                }
            },
            {
                title: res.SMB_itemdes, visible: _ScreenLang == "ar", name: "Itm_DescA", width: "45.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Itm_DescA", " ");
                    txt.id = "h_Itm_DescA"
                    txt.disabled = true;
                    return HeaderTemplate("SMB_itemdes", txt);
                }
            },
            {
                title: res.SMB_itemdes, visible: _ScreenLang == "en", name: "Itm_DescE", width: "45.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Itm_DescE", " ");
                    txt.id = "h_Itm_DescE"
                    txt.disabled = true;
                    return HeaderTemplate("SMB_itemdes", txt);
                }
            },
            {
                title: res.SMB_UomCode, name: "UomCode", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "UomCode", " ");
                    txt.id = "h_UomCode"
                    txt.disabled = true;
                    return HeaderTemplate("SMB_UomCode", txt);
                }
            },
            {
                title: res.SMB_ProjQty, name: "ItemQty", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ItemQty", " ");
                    txt.id = "h_ItemQty"
                    txt.disabled = true;
                    return HeaderTemplate("SMB_ProjQty", txt);
                }
            },
            {
                title: res.SMB_PrevBillQty, name: "PrevBillQty", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "PrevBillQty", " ");
                    txt.id = "h_PrevBillQty"
                    txt.disabled = true;
                    return HeaderTemplate("SMB_PrevBillQty", txt);
                }
            },
            {
                title: res.SMB_ProdQty, name: "ProdQty", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ProdQty", " ");
                    txt.id = "h_ProdQty"
                    txt.disabled = true;
                    return HeaderTemplate("SMB_ProdQty", txt);
                }
            },
            {
                title: res.SMB_BilledQty, name: "BillQty", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "BillQty", " ");
                    txt.id = "h_BillQty";
                    txt.onkeyup = (e) => {


                        CalcDiscAmount();
                        CalcUnitNetPrice();
                        CalcTotalForGrid();
                        CalcVat();
                        CalcItemNet()
                    }
                    txt.disabled = false;
                    return HeaderTemplate("SMB_BilledQty", txt);
                }
            },
            {
                title: res.SMB_UnitPrice, name: "UnitPrice", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "UnitPrice", " ");
                    txt.id = "h_UnitPrice";
                    txt.onkeyup = (e) => {
                        CalcDiscAmount();
                        CalcUnitNetPrice();
                        CalcTotalForGrid();
                        CalcVat();
                        CalcItemNet()
                    }
                    txt.disabled = true;
                    return HeaderTemplate("SMB_UnitPrice", txt);
                }
            },


            {
                title: "ItemDiscountPrc", name: "ItemDiscountPrc", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ItemDiscountPrc", " ");
                    txt.disabled = false;
                    txt.onkeyup = (e) => {
                        CalcDiscAmount();
                        CalcUnitNetPrice();
                        CalcTotalForGrid();
                        CalcVat();
                        CalcItemNet();

                    }
                    txt.id = "h_ItemDiscountPrc";
                    return HeaderTemplateNew("Disc PRc", txt);
                }
            },
            {
                title: "ItemDiscountAmt", name: "ItemDiscountAmt", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ItemDiscountAmt", " ");
                    txt.disabled = false;
                    txt.id = "h_ItemDiscountAmt";
                    txt.onkeyup = (e) => {

                        CalcItemDiscountPrc();
                        CalcDiscAmount();
                        CalcUnitNetPrice();
                        CalcTotalForGrid();
                        CalcVat();
                        CalcItemNet()

                    }
                    return HeaderTemplateNew("Disc Amount", txt);
                }
            },
            {
                title: "NetUnitPrice", name: "NetUnitPrice", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "NetUnitPrice", " ");
                    txt.disabled = true;
                    txt.id = "h_NetUnitPrice";
                    return HeaderTemplateNew("NetUnitPrice", txt);
                }
            },
            {
                title: res.SMB_total, name: "ItemTotal", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ItemTotal", " ");
                    txt.disabled = true;
                    txt.id = "h_ItemTotal"
                    return HeaderTemplate("SMB_total", txt);
                }
            },

            {
                title: "VatAmount", name: "ItemVatAmount", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ItemVatAmount", " ");
                    txt.disabled = true;
                    txt.onkeyup = (e) => {
                        CalcVat();


                    }
                    txt.id = "h_ItemVatAmount";
                    return HeaderTemplateNew("VatAmount", txt);
                }
            },
            {
                title: "TotalAVat", name: "ItemTotalAVat", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ItemTotalAVat", " ");
                    txt.disabled = true;
                    txt.id = "h_ItemTotalAVat";
                    return HeaderTemplateNew("TotalAVat", txt);
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
                    btn.id = "btnAddItemSalesGrid";
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }

                        AddItemInSalesGrid();
                        btnCalc_Clicked();


                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GetSalesInvoiceDetail): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.type = "button";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.name = DetailsSales.indexOf(item).toString();
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsSales.splice(index, 1);
                        BindDataGridSales();
                        //Calculationlien2();

                        //ReIndexingGrid();
                    };
                    return btn;
                }
            }
            ,
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: (s: string, item: PQ_GetSalesInvoiceDetail): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton;
                    btn.type = "button";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.name = DetailsSales.indexOf(item).toString();
                    btn.onclick = (e) => {

                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        DetailsAssignHeaderSales = new PQ_GetSalesInvoiceDetail();
                        InvoiceDetailId = item.InvoiceDetailId;
                        //InvoiceId = item.InvoiceId;
                        ProjectPhaseId = item.ProjectPhaseId;
                        ProjectPhaseItemId = item.ProjectPhaseItemId;
                        DetailsAssignHeaderSales.LineCode = item.LineCode;
                        DetailsAssignHeaderSales.Itm_DescA = item.Itm_DescA;
                        DetailsAssignHeaderSales.Itm_DescE = item.Itm_DescE;
                        DetailsAssignHeaderSales.Itm_ItemCode = item.Itm_ItemCode;
                        DetailsAssignHeaderSales.BillQty = item.BillQty;
                        DetailsAssignHeaderSales.ItemQty = item.ItemQty;
                        DetailsAssignHeaderSales.PrevBillQty = item.PrevBillQty;
                        DetailsAssignHeaderSales.ProdQty = item.ProdQty;
                        DetailsAssignHeaderSales.Serial = item.Serial;
                        DetailsAssignHeaderSales.UomCode = item.UomCode;
                        DetailsAssignHeaderSales.Remarks = item.Remarks;
                        DetailsAssignHeaderSales.uom_DescA = item.uom_DescA;
                        DetailsAssignHeaderSales.Uom_DescE = item.Uom_DescE;
                        DetailsAssignHeaderSales.Total = item.Total;
                        DetailsAssignHeaderSales.UnitPrice = item.UnitPrice;
                        DetailsAssignHeaderSales.ItemDiscountPrc = item.ItemDiscountPrc;
                        DetailsAssignHeaderSales.ItemDiscountAmt = item.ItemDiscountAmt;
                        DetailsAssignHeaderSales.NetUnitPrice = item.NetUnitPrice;
                        DetailsAssignHeaderSales.ItemVatAmount = item.ItemVatAmount;
                        DetailsAssignHeaderSales.ItemTotalAVat = item.ItemTotalAVat;
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DetailsSales.splice(index, 1);
                        BindDataGridSales();
                        DetailsAssignHeaderSales.InvoiceDetailId = InvoiceDetailId;
                        DetailsAssignHeaderSales.InvoiceId = InvoiceId;
                        DetailsAssignHeaderSales.ProjectPhaseId = ProjectPhaseId;
                        DetailsAssignHeaderSales.ProjectPhaseItemId = ProjectPhaseItemId;
                        FillInputText("btnFindItem", DetailsAssignHeaderSales.LineCode);
                        FillInputText("h_Itm_DescA", DetailsAssignHeaderSales.Itm_DescA);
                        FillInputText("h_Itm_DescE", DetailsAssignHeaderSales.Itm_DescE);
                        FillInputText("h_UomCode", DetailsAssignHeaderSales.UomCode);
                        FillInputText("h_ItemQty", DetailsAssignHeaderSales.ItemQty.toString());
                        FillInputText("h_PrevBillQty", DetailsAssignHeaderSales.PrevBillQty.toString());
                        FillInputText("h_ProdQty", DetailsAssignHeaderSales.ProdQty.toString());
                        FillInputText("h_BillQty", DetailsAssignHeaderSales.BillQty.toString());
                        FillInputText("h_UnitPrice", DetailsAssignHeaderSales.UnitPrice.toString());
                        FillInputText("h_ItemDiscountPrc", DetailsAssignHeaderSales.ItemDiscountPrc.toString());
                        FillInputText("h_ItemDiscountAmt", DetailsAssignHeaderSales.ItemDiscountAmt.toString());
                        FillInputText("h_NetUnitPrice", DetailsAssignHeaderSales.NetUnitPrice.toString());
                        FillInputText("h_ItemTotal", DetailsAssignHeaderSales.TotalItemNet.toString());
                        FillInputText("h_ItemVatAmount", DetailsAssignHeaderSales.ItemVatAmount.toString());
                        FillInputText("h_ItemTotalAVat", DetailsAssignHeaderSales.ItemTotalAVat.toString());
                        // btnCalc_Clicked();
                    };
                    return btn;
                }
            }
        ];
        GridSales.DataSource = DetailsSales;
        GridSales.Bind();
    }

    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById<HTMLInputElement>("txtTrNo");
        txtProjectID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectID");
        txtCust_CustomerCode = DocumentActions.GetElementById<HTMLInputElement>("txtCust_CustomerCode");
        txtProjCode = DocumentActions.GetElementById<HTMLInputElement>("txtProjCode");
        txtProj_DescL = DocumentActions.GetElementById<HTMLInputElement>("txtProj_DescL");
        txtCust_DescE = DocumentActions.GetElementById<HTMLInputElement>("txtCust_DescE");
        txtTrDate = DocumentActions.GetElementById<HTMLInputElement>("txtTrDate");
        txtRefCode = DocumentActions.GetElementById<HTMLInputElement>("txtRefCode");
        txtFromDate = DocumentActions.GetElementById<HTMLInputElement>("txtFromDate");
        txtToDate = DocumentActions.GetElementById<HTMLInputElement>("txtToDate");
        ChkStatus = DocumentActions.GetElementById<HTMLInputElement>("ChkStatus");
        ChkIsFinal = DocumentActions.GetElementById<HTMLInputElement>("ChkIsFinal");
        txtTotalAmount = DocumentActions.GetElementById<HTMLInputElement>("txtTotalAmount");
        txtDiscountPrc = DocumentActions.GetElementById<HTMLInputElement>("txtDiscountPrc");
        txtDiscount = DocumentActions.GetElementById<HTMLInputElement>("txtDiscount");
        txtNetAmount = DocumentActions.GetElementById<HTMLInputElement>("txtNetAmount");
        txtVatAmount = DocumentActions.GetElementById<HTMLInputElement>("txtVatAmount");
        txtVatPrc = DocumentActions.GetElementById<HTMLInputElement>("txtVatPrc");
        txtRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtRemarks");
        btnSearchBill = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchBill");
        btnSearchProject = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchProject");
        btnLoadProdution = DocumentActions.GetElementById<HTMLButtonElement>("btnLoadProdution");
        btnCalc = DocumentActions.GetElementById<HTMLButtonElement>("btnCalc");
        //btnAuthorize = DocumentActions.GetElementById<HTMLButtonElement>("btnAuthorize");
        btnSearchBill = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchBill");
        btnReopen = DocumentActions.GetElementById<HTMLButtonElement>("btnReopen");
        ChkDownpayment = DocumentActions.GetElementById<HTMLInputElement>("ChkDownpayment");
        li2_AdvPrc = DocumentActions.GetElementById<HTMLInputElement>("li2_AdvPrc");
        txtDoNo = DocumentActions.GetElementById<HTMLInputElement>("txtDoNo");


        l1_InvoiceAmount = DocumentActions.GetElementById<HTMLInputElement>("l1_InvoiceAmount");
        l1_InvoiceVat = DocumentActions.GetElementById<HTMLInputElement>("l1_InvoiceVat");
        l1_InvoiceNetVAT = DocumentActions.GetElementById<HTMLInputElement>("l1_InvoiceNetVAT");


        li2_AdvAmount = DocumentActions.GetElementById<HTMLInputElement>("li2_AdvAmount");
        li2_AdvVat = DocumentActions.GetElementById<HTMLInputElement>("li2_AdvVat");
        li2_AdvNet = DocumentActions.GetElementById<HTMLInputElement>("li2_AdvNet");


        li3TaxableTotalAmount = DocumentActions.GetElementById<HTMLInputElement>("li3TaxableTotalAmount");
        li3TaxableTotalVAT = DocumentActions.GetElementById<HTMLInputElement>("li3TaxableTotalVAT");
        li3TaxableTotalNetVAT = DocumentActions.GetElementById<HTMLInputElement>("li3TaxableTotalNetVAT");

        li4RetentionAmount = DocumentActions.GetElementById<HTMLInputElement>("li4RetentionAmount");
        li4ayablemount = DocumentActions.GetElementById<HTMLInputElement>("li4ayablemount");

        li5AdvanceConsumPrc = DocumentActions.GetElementById<HTMLInputElement>("li5AdvanceConsumPrc");
        li5UsedAmount = DocumentActions.GetElementById<HTMLInputElement>("li5UsedAmount");
        li5RemainAmount = DocumentActions.GetElementById<HTMLInputElement>("li5RemainAmount");
        $('#btnReopen').css('display', 'None');

    }

    function InitalizeEvents() {
        btnSearchProject.onclick = btnSearchProject_Clicked;
        txtTrNo.onchange = SearchBill_onchange;
        txtProjCode.onchange = SearchProject_onchange;
        //btnLoadProdution.onclick = btnLoadProdution_Clicked;
        btnSearchBill.onclick = btnSearchBill_Clicked;
        btnCalc.onclick = btnCalc_Clicked;
        ChkDownpayment.onclick = chkDownpayment_Clicked;
        txtDiscount.onkeyup = txtDiscount_onkeyup;
        txtDiscountPrc.onkeyup = txtDiscountPrc_onkeyup;
        li2_AdvAmount.onchange = AdvAmount_onchange;
        li4RetentionAmount.onchange = RetentionAmount_onchange;
        //btnAuthorize.hidden = true; 
        btnReopen.onclick = btnAuthorize_Clicked;
    }
    function SearchProject_onchange() {
        var reus: number = 0;
        let ProjCode = txtProjCode.value;
        Ajax.Callsync({
            url: Url.Action("GetProjectbaycode", ControllerName),
            data: { ProjCode: ProjCode, CompCode: _CompCode, BraCode: _BraCode },
            success: (d) => {

                let result = d.result as PQ_GetEngProject;
                if (result != null) {
                    if (result.VatType == null) {
                        WorningMessage("يجب تحديث بيانات العميل الضريبية، رقم تسجيل العميل " + result.cust_CustomerCode, "Customer Tax information must be completed, Reg. No: " + result.cust_CustomerCode);
                        return;
                    }
                    if (result.Status != 1 ) {
                        WorningMessage("حالة المشروع لا تسمح باصدار فاتورة " , "Project Status is not acceptable"  );
                        return;
                    }
                    ProjectID = result.ProjectID;
                    txtProjectID.value = result.ProjectID.toString();
                    txtProjCode.value = result.ProjectCode;
                    txtProj_DescL.value = _ScreenLang == "ar" ? result.DescA : result.DescL;
                    txtCust_CustomerCode.value = result.cust_CustomerCode.toString();
                    txtCust_DescE.value = _ScreenLang == "ar" ? result.DescA : result.cust_DescE;
                    customerId = result.CustomerID;
                    warnteeprc = result.WarrntyPaymentPrc;
                    DiscountPrc = result.ContractDiscountPrc == null ? 0 : result.ContractDiscountPrc ;
                    txtDiscountPrc.value = Number(DiscountPrc).toString();
                    vatPrc = result.VatPrc == null ? 0 : result.VatPrc;
                    if (result.VatPrc == null)
                        txtVatPrc.value = "0";
                    else
                        txtVatPrc.value = result.VatPrc.toString();
                    DetailsSales = new Array<PQ_GetSalesInvoiceDetail>();
                    ClearGrid(GridSales, DetailsSales);
                    GetAdvance(ProjectID);
                }
            }
        });
    }

    function SearchBill_onchange() {
        let trNo = Number(txtTrNo.value);
        Ajax.CallAsync({
            url: Url.Action("GetCustomerBillTrNo", ControllerName),
            data: { TrNo: trNo, CompCode: _CompCode, BraCode: _BraCode },
            success: (d) => {
                Master = d.result as PQ_GetSalesInvoice;
                if (Master != null) {
                    MasterDetails.P_TR_SalesInvoice = Master;
                    let Index = GetIndexByUseId(Number(Master.InvoiceId), "PQ_GetSalesInvoice", "InvoiceId", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                    var invoce = Number(Master.InvoiceId);
                } else {
                    WorningMessage("لا يوجد فاتورة بهذا الرقم ", "There is no invoice with this no");
                    txtTrNo.value = "";
                }
            }
        });
    }
    function chkDownpayment_Clicked() {
        if (txtProjCode.value > "0")
            GetAdvance(ProjectID);

        if (ChkDownpayment.checked == true) {
            $('#lien2').addClass('display_none');

            $('#lien5').removeClass('display_none');
            if (ClientSharedWork.CurrentMode == ScreenModes.Add) {
                li5UsedAmount.value = "0"
                li5AdvanceConsumPrc.value = "100";
            }
        }
        else {
            $('#lien2').removeClass('display_none');
            li5AdvanceConsumPrc.value = "0"
            $('#lien5').addClass('display_none');

        }
    }
    function txtDiscount_onkeyup() {
        //vatPrc = Number(txtVatPrc.value);
        //if (Number(txtDiscount.value) > Number(txtTotalAmount.value)) {
        //    txtDiscount.value = txtTotalAmount.value;
        //    txtDiscountPrc.value = "100";
        //    txtNetAmount.value = "0.00";
        //    return;
        //}
        //txtDiscountPrc.value = ((Number(txtDiscount.value) * 100) / Number(txtTotalAmount.value)).toFixed(2).toString();
        //txtNetAmount.value = (Number(txtTotalAmount.value) - Number(txtDiscount.value)).toFixed(2).toString();
        //// txtVatAmount.value = (((Number(txtNetAmount.value)) * (vatPrc)) / 100).toFixed(2);
    }

    function txtDiscountPrc_onkeyup() {
        //vatPrc = Number(txtVatPrc.value);
        //if (Number(txtDiscountPrc.value) > 100) {
        //    txtDiscount.value = (((100 * Number(txtTotalAmount.value)) / 100)).toFixed(2).toString();
        //    txtNetAmount.value = (Number(txtTotalAmount.value) - Number(txtDiscount.value)).toFixed(2).toString();
        //    return;
        //}
        //txtDiscount.value = (((Number(txtDiscountPrc.value) * Number(txtTotalAmount.value)) / 100)).toFixed(2).toString();
        //txtNetAmount.value = (Number(txtTotalAmount.value) - Number(txtDiscount.value)).toFixed(2).toString();
        ////txtVatAmount.value = (((Number(txtNetAmount.value)) * (vatPrc)) / 100).toFixed(2);
    }

    //function CalcDiscount() {
    //    let net: number = 0;
    //    if (txtDiscount.value != "") {
    //        //$('#txtDiscountPrc').attr('disabled', 'disabled');
    //        txtNetAmount.value = (Number(txtTotalAmount.value) - Number(txtDiscount.value)).toString();
    //    } else if (txtDiscountPrc.value != "") {
    //        $('#txtDiscount').attr('disabled', 'disabled');
    //        net = (Number(txtTotalAmount.value) * Number(txtDiscountPrc.value)) / 100;
    //        txtNetAmount.value = (Number(txtTotalAmount.value) - net).toString();
    //    } else if (txtDiscount.value == "" && txtDiscountPrc.value == "") {
    //        $('#txtDiscountPrc').removeAttr('disabled');
    //        $('#txtDiscount').removeAttr('disabled');
    //        txtNetAmount.value = txtTotalAmount.value;
    //    }
    //}

    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {

                Master = d.result as PQ_GetSalesInvoice;

                Display();
            }
        })
    }

    function btnFindItem_onclick() {

        let con: string = " CompCode = " + _CompCode + " and BraCode = " + _BraCode;
        if (ProjectID == null || ProjectID == 0) {
            WorningMessage("يجب اختيار مشروع اولا", "You Should Choose Project");
            return;
        }
        sys.FindKey(Modules.CustomerBilling, "btnFindItem", " ProjectID = " + ProjectID, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("SearchProjectItem", ControllerName),
                data: { id: id },
                success: (d) => {

                    let result = d.result as PQ_GetEngProjectItem;
                    if (result.ProjectPhaseId == 0 || result.ProjectPhaseId == null) {
                        WorningMessage("هذا البند غير مرتبط بمرحلة ، يجب ربطه من خلال مواصفات المشروع", "Item is not attached to phase , please update it in project specification");
                    }
                    else {
                        ProjectPhaseItemId = result.ProjectPhaseItemId;
                        ProjectPhaseId = result.ProjectPhaseId;
                        $('#btnFindItem').text(result.LineCode);
                        $('#h_Itm_DescA').val(result.SlsITm_DescA);
                        $('#h_Itm_DescE').val(result.SlsITm_DescE);
                        $('#h_UomCode').val(result.UomCode);
                        $('#h_ItemQty').val(result.ItemQty);
                        $('#h_PrevBillQty').val(result.BilledQty);
                        $('#h_ProdQty').val(result.ProdQty);
                        $('#h_BillQty').val(result.ProdQty - result.BilledQty);
                        $('#h_UnitPrice').val(result.UnitPrice);
                        $('#h_ItemDiscountPrc').val(DiscountPrc);
                        if (result.UnitPrice == 0) {
                            $('#h_ItemTotal').val(0);
                        } else if ((result.ProdQty - result.BilledQty == 0)) {
                            $('#h_ItemTotal').val(0);
                        } else {
                            $('#h_ItemTotal').val((result.UnitPrice * (1 - DiscountPrc / 100) * (result.ProdQty - result.BilledQty)).toFixed(2));
                        }
                        $('#h_ItemDiscountAmt').val((result.UnitPrice * DiscountPrc / 100).toFixed(2));
                        $('#h_NetUnitPrice').val((result.UnitPrice * (1 - DiscountPrc / 100)).toFixed(2));
                        $('#h_ItemVatAmount').val(((result.ProdQty - result.BilledQty) * result.UnitPrice * (1 - DiscountPrc / 100) * vatPrc / 100).toFixed(2));
                        $('#h_ItemTotalAVat').val(((result.ProdQty - result.BilledQty) * result.UnitPrice * (1 - DiscountPrc / 100) * (1 + vatPrc / 100)).toFixed(2));
                       

                    }
                }
            });
        });
    }


    function Display() {
        //debugger;
        DocumentActions.RenderFromModel(Master);
        customerId = Master.CustomerID;
        ProjectID = Master.ProjectID;
        InvoiceId = Master.InvoiceId;
        Proj_ProjectCode = Master.Proj_ProjectCode;




        txtDoNo.value = Master.DocNo;
        txtTrDate.value = DateFormat(Master.TrDate);
        txtFromDate.value = DateFormat(Master.FromDate) != null ? DateFormat(Master.FromDate) : null;
        txtToDate.value = DateFormat(Master.ToDate) != null ? DateFormat(Master.ToDate) : null;
        Master.Status == 1 ? ControlsButtons.EditButton.disabled = true : ControlsButtons.EditButton.disabled = false;
        LoadInvoiceDetails(Master.InvoiceId);
        txtProj_DescL.value = _ScreenLang == "ar" ? Master.Proj_DescA : Master.Proj_DescL;
        txtCust_DescE.value = _ScreenLang == "ar" ? Master.Cust_DescA : Master.Cust_DescE;
        ChkStatus.disabled = true;
        DiscountPrc = Master.DiscountPrc;
        MasterVatPrc = Master.VatPrc;
        warnteeprc = Master.RetentionPrc;
        
        l1_InvoiceAmount.value = Master.NetAmount.toFixed(2);
         l1_InvoiceNetVAT.value = (Master.NetAmount + Master.VatAmount).toFixed(2)
         li2_AdvNet.value = (Master.AdvDeduction + Master.AdvVatAmount).toFixed(2);
        li3TaxableTotalNetVAT.value = (Master.TaxableAmount - Master.NetTax).toFixed(2);
        if (SharedSession.CurrentPrivileges.CUSTOM2 == true && Master.Status == 1) {
            $('#btnReopen').css('display','inline');
            $('#btnReopen').removeAttr('disabled');
            $("#btnReopen").css('cursor', 'pointer');
            $("#btnReopen").css('backgroundColor', 'red');
        }
        else {
            $('#btnReopen').css('display','None');
            $('#btnReopen').attr('disabled', 'disabled');
            $("#btnReopen").css('cursor', 'no-drop');
            $("#btnReopen").css('backgroundColor', '#0B6D8A');
        }





        if (Master.IsDownpayment == true) {
            $('#ChkDownpayment').attr('checked', 'true');
            $('#lien2').addClass('display_none');

            $('#lien5').removeClass('display_none');
        }
        else {
            $('#ChkDownpayment').attr('checked', 'false');
            $('#lien2').removeClass('display_none');

            $('#lien5').addClass('display_none');

        }

        
    }

    function Add() {
        txtTrDate.value = DateFormat((new Date()).toString());

        var dt = new Date();
        //var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        //txtTime.value = time;
        ChkStatus.checked = false;
        ChkStatus.disabled = true;
        ChkDownpayment.checked = false;
        txtProjCode.disabled = false;

        ChkIsFinal.checked = false;
        ClearGrid(GridProd, new Array<string>());
        ClearGrid(GridSales, new Array<string>());
        $("#btnCalc").attr("disabled", "disabled");
        $('#lien5').addClass('display_none');
        $('#lien4').removeClass('display_none');
        $('#btnReopen').css('display', 'None');
        l1_InvoiceAmount.value = "";
        l1_InvoiceVat.value = "";
        l1_InvoiceNetVAT.value = "";

        li3TaxableTotalAmount.value = "";
        li3TaxableTotalVAT.value = "";
        li3TaxableTotalNetVAT.value = "";

        li4RetentionAmount.value = "";
        li4ayablemount.value = "";

        li5AdvanceConsumPrc.value = "";
        li5UsedAmount.value = "";
        li5RemainAmount.value = "";

        chkDownpayment_Clicked();

        //txtTrDate.value = DateFormat(GetCurrentDate().toString());
        //let now = GetCurrentDate();
        //let tim = (leadZero(now.getHours()) + ":" + leadZero(now.getMinutes()) + ":" + leadZero(now.getSeconds()));
        //SetInterval = setInterval(function () {
        //    let now = GetCurrentDate();
        //    let tim = (leadZero(now.getHours()) + ":" + leadZero(now.getMinutes()) + ":" + leadZero(now.getSeconds()));
        //    txtTime.value = tim;
        //}, 1000);


    }

    function Edit() {
        ChkStatus.disabled = !SharedSession.CurrentPrivileges.CUSTOM1;
        $('#btnReopen').css('display', 'None');
        if (ChkDownpayment.checked == false)
            GetAdvance(ProjectID);


    }

    function Insert() {
        // btnCalc_Clicked();
        Assign();
        let compCode: number = Number(_CompCode);
        let braCode: number = Number(_BraCode);
        let date: string = txtTrDate.value;
        if (CheckDate(compCode, braCode, date) == false) {
            WorningMessage("غير مسموح بهذا التاريخ", "This Date is not allowed");
            return;
        }
        Master.CustomerID = customerId;
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BraCode);



        if ($('#ChkDownpayment').is('checked')) {

            Master.IsDownpayment == true;
        } else {
            Master.IsDownpayment == false;
        }


        var session: SessionRecord = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        // New 
        debugger
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_SalesInvoice", "InsertMasterDetail"),
            data: JSON.stringify(MasterDetails),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: (d) => {

                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم الاضافة بنجاح  ", "Data Inserted Successfuly. ");
                    MessageBox.Show(msg, "Insert", () => {

                        let _Index = GetIndexByUseId(result.Response, "PQ_GetSalesInvoice", "InvoiceId", "CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                        if (Master.Status == 1) DownloadInvoicePdf();
                        
                     });
                }
            }
        });




        // Old
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
        //                //Master = result.ResponseData;
        //                let _Index = GetIndexByUseId(Number(result.ResponseData), "PQ_GetSalesInvoice", "InvoiceId", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
        //                NavigateToSearchResultKey(Number(_Index), Navigate)
        //            });
        //        }
        //        else
        //            MessageBox.Show(result.ResponseMessage, "Insert");
        //    }
        //});
    }

    function Update() {

        //btnCalc_Clicked();

        Assign();
        Master.CustomerID = customerId;
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BraCode);
        Master.TrTime = "";
        if ($('#ChkDownpayment').is('checked')) {

            Master.IsDownpayment == true;
        } else {
            Master.IsDownpayment == false;
        }

        var session: SessionRecord = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        // New 
        debugger

        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_SalesInvoice", "UpdateMasterDetail"),
            data: JSON.stringify(MasterDetails),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: (d) => {

                let result = d as BaseResponse;
                if (result.IsSuccess == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Update", () => {

                        let _Index = GetIndexByUseId(result.Response, "PQ_GetSalesInvoice", "InvoiceId", "CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                        if (Master.Status == 1) DownloadInvoicePdf();
                        //LoadDetails(Master.ProjectID);
                    });
                }
            }
        });

        // Old
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
        //                let _Index = GetIndexByUseId(Number(result.ResponseData), "PQ_GetSalesInvoice", "InvoiceId", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
        //                NavigateToSearchResultKey(Number(_Index), Navigate);
        //            });
        //        }
        //    }
        //})
    }

    function Undo() {

    }

    function Assign() {

        DocumentActions.AssignToModel<PQ_GetSalesInvoice>(Master);
        Master.RetentionPrc = warnteeprc;
        MasterDetails.P_TR_SalesInvoice = Master as P_TR_SalesInvoice;

        //AssignDetails
        //MasterDetails.P_TR_SalesInvoiceDetail = DetailsSales as Array<PQ_GetSalesInvoiceDetail>;

        var det: Array<P_TR_SalesInvoiceDetail> = new Array<P_TR_SalesInvoiceDetail>();
        for (var sls of DetailsSales) {

            var itm: P_TR_SalesInvoiceDetail = new P_TR_SalesInvoiceDetail();
            itm.BillQty = sls.BillQty;
            itm.InvoiceDetailId = sls.InvoiceDetailId;
            itm.InvoiceId = Master.InvoiceId;
            itm.ItemDiscountAmt = sls.ItemDiscountAmt;
            itm.ItemDiscountPrc = sls.ItemDiscountPrc;
            itm.ItemVatPrc = sls.ItemVatPrc;
            itm.PrevBillQty = Number(sls.PrevBillQty);
            itm.ProdQty = Number(sls.ProdQty);
            itm.ProjectPhaseItemId = sls.ProjectPhaseItemId;
            itm.Remarks = "";
            itm.Serial = Number(sls.Serial);
            itm.UnitPrice = sls.UnitPrice;
            itm.ItemVatAmount = sls.ItemVatAmount;

            itm.NetUnitPrice = sls.NetUnitPrice;
            itm.ItemTotal = sls.ItemTotal;
            itm.ItemTotalAVat = sls.ItemTotalAVat;
            det.push(itm);

        }
        MasterDetails.P_TR_SalesInvoiceDetail = det;
    }

    function AddItemInSalesGrid() {

        DetailsAssignHeaderSales = new PQ_GetSalesInvoiceDetail();
        for (var itm of DetailsSales) {
            if ($("#btnFindItem").text() == itm.LineCode) {
                WorningMessage("لا يمكن تكرار نفس العنصر", "Item Cannot Repeat ");
                return;
            }
        }
        if (ChkDownpayment.checked != true) {
            if ((Number($("#h_BillQty").val()) + Number($("#h_PrevBillQty").val()) > (Number($("#h_ItemQty").val())) * 1.15)) {
                WorningMessage("كمية الفاتورة تزيد عن نسبة الزيادة المسموح بها من كمية المشروع", "Bill Qty exceeds the permitted percentage of project Qty");
                return;
            }
        
       
            if ((Number($("#h_BillQty").val())) > ((Number($("#h_ProdQty").val())) - (Number($("#h_PrevBillQty").val())))) {
                WorningMessage("كمية الفاتورة اكبر من كمية الانتاج", " bill qty > Production Qty");
            }
        }

        //if (Number($("#h_InvQty").val()) > Number($("#h_ToBillQty").val())) {
        //    WorningMessage("كمية الفاتورة يجب ان لا تزيد عن كمية الانتاج", "Billed Qty Cannot Exceed Prod Qty");
        //    return;
        //}
        debugger
        DetailsAssignHeaderSales.InvoiceDetailId = InvoiceDetailId;
        DetailsAssignHeaderSales.InvoiceId = InvoiceId;
        DetailsAssignHeaderSales.ProjectPhaseId = ProjectPhaseId;
        DetailsAssignHeaderSales.ProjectPhaseItemId = ProjectPhaseItemId;

        DetailsAssignHeaderSales.LineCode = $('#btnFindItem').text();
        DetailsAssignHeaderSales.Itm_DescA = $('#h_Itm_DescA').val();
        DetailsAssignHeaderSales.Itm_DescE = $('#h_Itm_DescE').val();
        DetailsAssignHeaderSales.UomCode = $('#h_UomCode').val();
        DetailsAssignHeaderSales.ItemQty = Number($('#h_ItemQty').val());
        DetailsAssignHeaderSales.PrevBillQty = Number($('#h_PrevBillQty').val());
        DetailsAssignHeaderSales.ProdQty = Number($('#h_ProdQty').val());
        DetailsAssignHeaderSales.BillQty = Number($('#h_BillQty').val());
        DetailsAssignHeaderSales.UnitPrice = Number($('#h_UnitPrice').val());
        // DetailsAssignHeaderSales.TotalItemNet = Number($('#h_TotalItemNet').val());
        DetailsAssignHeaderSales.ItemTotal = Number($('#h_BillQty').val()) * Number($('#h_UnitPrice').val());
        DetailsAssignHeaderSales.ItemDiscountPrc = Number($('#h_ItemDiscountPrc').val());
        DetailsAssignHeaderSales.ItemDiscountAmt = Number($('#h_ItemDiscountAmt').val());
        DetailsAssignHeaderSales.NetUnitPrice = Number($('#h_NetUnitPrice').val());
        DetailsAssignHeaderSales.ItemVatAmount = Number($('#h_ItemVatAmount').val());
        DetailsAssignHeaderSales.ItemTotalAVat = Number($('#h_ItemTotalAVat').val());
        DetailsAssignHeaderSales.ItemVatPrc = vatPrc;
        DetailsSales.push(DetailsAssignHeaderSales);
        BindDataGridSales();
        InvoiceDetailId = 0;
        //btnCalc_Clicked();
    }

    function BindDataGridSales() {
        GridSales.DataSource = DetailsSales;
        GridSales.Bind();
    }


    function FillInputText(_TextID: string, _Data: string) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }

    //function LoadProdDetails(id: number) {
    //    DetailsProd = Ajax.Call<Array<PQ_GetSalesInvoiceProd>>({ url: Url.Action("LoadProdDetails", ControllerName), data: { id: id } });
    //    GridProd.DataSource = DetailsProd;
    //    GridProd.Bind();
    //}

    function LoadInvoiceDetails(id: number) {

        DetailsSales = Ajax.Call<Array<PQ_GetSalesInvoiceDetail>>({ url: Url.Action("LoadInvoiceDetails", ControllerName), data: { id: id } });
        //for (var i = 0; i < DetailsSales.length; i++) {
        //    DetailsSales[i].ItemTotalAVat = DetailsSales[i].ItemVatAmount + DetailsSales[i].ItemTotalAVat;
        //}
        GridSales.DataSource = DetailsSales;
        GridSales.Bind();
    }

    function btnSearchProject_Clicked() {
        var reus: number = 0;
        sys.FindKey(Modules.CustomerBilling, "btnSearchProject", "CompCode= " + _CompCode + " AND BRACODE = " + _BraCode +" and status = 1 ", () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.Callsync({
                url: Url.Action("GetProject", ControllerName),
                data: { id: id },
                success: (d) => {

                    let result = d.result as PQ_GetEngProject;
                    //reus = checkproject(result.ProjectID);
                    if (result.VatType == null) {
                        WorningMessage("يجب تحديث بيانات العميل الضريبية، رقم تسجيل العميل " + result.cust_CustomerCode, "Customer Tax information must be completed, Reg. No: " + result.cust_CustomerCode);
                        return;
                    }
                    //if (reus == 1) {
                    ProjectID = result.ProjectID;
                    txtProjectID.value = result.ProjectID.toString();
                    txtProjCode.value = result.ProjectCode;
                    txtProj_DescL.value = _ScreenLang == "ar" ? result.DescA : result.DescL;
                    txtCust_CustomerCode.value = result.cust_CustomerCode.toString();
                    txtCust_DescE.value = _ScreenLang == "ar" ? result.DescA : result.cust_DescE;
                    customerId = result.CustomerID;
                    warnteeprc = result.WarrntyPaymentPrc;
                    DiscountPrc = result.ContractDiscountPrc == null ? 0 : result.ContractDiscountPrc 

                    //if (result.ContractDiscountPrc == '' or result.ContractDiscountPrc=null)
                    txtDiscountPrc.value = Number(DiscountPrc).toString();
                    if (result.VatPrc == null)
                        txtVatPrc.value = "0";
                    else
                        txtVatPrc.value = result.VatPrc.toString();


                    DetailsSales = new Array<PQ_GetSalesInvoiceDetail>();
                    ClearGrid(GridSales, DetailsSales);
                    GetAdvance(ProjectID);
                    //}
                    //else {
                    //    let msg: string = ReturnMsg("هذا المشروع يوجد له فاتورة سابقه ", "This project has a previous invoice ");
                    //    MessageBox.Show(msg, "msg");
                    //}

                }
            });
        });
    }

    //function btnLoadProdution_Clicked() {
    //    Update();
    //    Ajax.CallAsync({
    //        url: Url.Action("LoadProdution", ControllerName),
    //        data: { invId: Master.InvoiceId, projId: Master.ProjectID },
    //        success: (d) => {

    //        }
    //    });
    //    LoadProdDetails(Master.InvoiceId);
    //}


    //function LoadProdutionList(projId: number) {
    //    debugger;
    //    let LoadedProductionList: Array<PQ_GetSalesFillInvoiceProd> = Ajax.Call<Array<PQ_GetSalesFillInvoiceProd>>({ url: Url.Action("LoadProdutionList", ControllerName), data: { projId: projId } });
    //    debugger;
    //    for (var itm of LoadedProductionList) {
    //        DetailsAssignHeaderProd = new PQ_GetSalesInvoiceProd();

    //        DetailsAssignHeaderProd.ItemID = itm.ItemID;
    //        DetailsAssignHeaderProd.LineCode = itm.LineCode;
    //        DetailsAssignHeaderProd.Itm_ItemCode = itm.Itm_ItemCode;
    //        DetailsAssignHeaderProd.Itm_DescA = itm.Itm_DescA;   
    //        DetailsAssignHeaderProd.Itm_DescE = itm.Itm_DescE;
    //        DetailsAssignHeaderProd.BilledQty = itm.BilledQty;
    //        DetailsAssignHeaderProd.ProductionDetailId = itm.ProductionDetailId;
    //        DetailsAssignHeaderProd.ProductionId = itm.ProductionId;
    //        DetailsAssignHeaderProd.Prod_FromDate = itm.Prod_FromDate;
    //        DetailsAssignHeaderProd.Prod_IsFinal = itm.Prod_IsFinal;
    //        DetailsAssignHeaderProd.Prod_ProductionId = itm.Prod_ProductionId;
    //        DetailsAssignHeaderProd.Prod_ProjectID = itm.Prod_ProjectID;
    //        DetailsAssignHeaderProd.Prod_RefCode = itm.Prod_RefCode;
    //        DetailsAssignHeaderProd.Prod_ToDate = itm.Prod_ToDate;
    //        DetailsAssignHeaderProd.Prod_TrDate = itm.Prod_TrDate;
    //        DetailsAssignHeaderProd.Prod_TrNo = itm.Prod_TrNo;
    //        DetailsAssignHeaderProd.Prod_WorkDiscription = itm.Prod_WorkDiscription;
    //        DetailsAssignHeaderProd.ProjectPhaseItemId = itm.ProjectPhaseItemId;
    //        DetailsAssignHeaderProd.Remarks = itm.Remarks;
    //        DetailsAssignHeaderProd.ToBillQty = itm.ToBillQty;
    //        DetailsAssignHeaderProd.Total = itm.total;
    //        DetailsAssignHeaderProd.UnitPrice = itm.UnitPrice;
    //        DetailsAssignHeaderProd.InvQty = itm.ToBillQty;
    //        DetailsAssignHeaderProd.InvoiceDetailId = null;

    //
    //        DetailsProd.unshift(DetailsAssignHeaderProd);
    //        GridProd.DataSource = DetailsProd;
    //        GridProd.Bind();
    //    }


    //}

    function btnAuthorize_Clicked() {

        let date: string = txtTrDate.value;
        if (CheckDate(Number(_CompCode), Number(_BraCode), date) == false) {
            WorningMessage("غير مسموح بهذا التاريخ", "This Date is not allowed");
            return;
        }

        //ChkStatus.checked = false;
        // Save 

        //AjaxApi.CallsyncApi({
        //    type: "Post",
        //    url: sys.apiUrl("P_TR_SalesInvoice", "UnAuthorize"),
        //    data: JSON.stringify(Master.InvoiceId),
        //    headers: {
        //        'Accept': 'application/json; charset=utf-8',
        //        'Content-Type': 'application/json'
        //    },
        //    success: (d) => {
        //
        //        let result = d as BaseResponse;
        //        if (result.IsSuccess == true) {

        //            let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
        //            MessageBox.Show(msg, "Update", () => {
        //        
        //                let _Index = GetIndexByUseId(result.Response, "PQ_GetSalesInvoice", "InvoiceId", "CompCode = " + _CompCode + " and BraCode = " + _BraCode);
        //                NavigateToSearchResultKey(Number(_Index), Navigate);
        //                //LoadDetails(Master.ProjectID);
        //            });
        //        }
        //    }
        //});
        Ajax.Callsync({
            url: Url.Action("UnAuthorize", ControllerName),
            data: { invId: Master.InvoiceId },
            success: (d) => {
                let msg: string = ReturnMsg("تم اعادة الفتح بنجاح  ", "Re Opened Successfuly. ");
                MessageBox.Show(msg, "ReOpen", () => {

                    let index = GetIndexByUseId(Master.InvoiceId, "PQ_GetSalesInvoice", "InvoiceId", "CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                    NavigateToSearchResultKey(Number(index), Navigate);
                   //LoadDetails(Master.ProjectID);
                });

             }
        });
        //Update();

    }

    function btnCalc_Clicked() {
        if (ClientSharedWork.CurrentMode == ScreenModes.Query)
            return;

        vatPrc = Number(txtVatPrc.value);
        let DiscTotal: number = 0;
        let ItemTotal: number = 0;
        let ItemNetTotal: number = 0;
        let VatTotal: number = 0;
        let NetafterAmount: number = 0;
        for (var itm of DetailsSales) {
            DiscTotal += Number(itm.BillQty) * Number(itm.ItemDiscountAmt);
            ItemTotal += Number(itm.BillQty) * Number(itm.UnitPrice);
            ItemNetTotal += Number(itm.BillQty) * Number(itm.NetUnitPrice);
            VatTotal += Number(itm.ItemVatAmount);

        }
        txtDiscount.value = DiscTotal.toFixed(2);

        txtTotalAmount.value = ItemTotal.toFixed(2);

        txtNetAmount.value = (ItemTotal - DiscTotal).toFixed(2);

        if (isNaN(VatTotal)) {
            VatTotal = 0;
        }
        // txtVatAmount.value = VatTotal.toFixed(2);


        NetafterAmount = Number(txtNetAmount.value) + VatTotal;
        //let vat: number = 0;
        //for (var itm of DetailsSales) {
        //    vat += Number(itm.ItemVatAmount);
        //}
        l1_InvoiceVat.value = VatTotal.toFixed(2);
        l1_InvoiceAmount.value = Number(txtNetAmount.value).toFixed(2);
        l1_InvoiceNetVAT.value = Number(NetafterAmount).toFixed(2);


        // 
        //  Advance Usage .. 
        // 
        if (ChkDownpayment.checked == true) {
            AdvAmount = 0
        } else {
            if (NetafterAmount * DownAmountPrc / 100 >= (DownAmount - Downused)) {
                AdvNet = (DownAmount - Downused);


            } else {
                AdvNet = NetafterAmount * DownAmountPrc / 100;

            }
        }
        AdvVat = AdvNet * vatPrc / (100 + vatPrc);
        AdvAmount = AdvNet * 100 / (100 + vatPrc);

        if (isNaN(AdvAmount)) { AdvAmount = 0; }
        li2_AdvAmount.value = AdvAmount.toFixed(2);

        if (isNaN(AdvVat)) { AdvVat = 0; }
        li2_AdvVat.value = AdvVat.toFixed(2);

        if (isNaN(AdvNet)) { AdvNet = 0; }
        li2_AdvNet.value = AdvNet.toFixed(2);

        //
        // calc taxable 
        //
        debugger;
        if (isNaN(ItemTotal)) { ItemTotal = 0; }
        li3TaxableTotalAmount.value = (ItemTotal - DiscTotal - AdvAmount).toFixed(2);

        if (isNaN(VatTotal)) { VatTotal = 0; }

        li3TaxableTotalVAT.value = (VatTotal - AdvVat).toFixed(2);

        li3TaxableTotalNetVAT.value = (ItemTotal - DiscTotal + VatTotal - AdvNet).toFixed(2);


        // 
        //if (isNaN(Downused)) { Downused = 0; }
        debugger;
        if (ChkDownpayment.checked == true && ClientSharedWork.CurrentMode == ScreenModes.Add) {
            Downused = 0;
            li5UsedAmount.value = "0"
            li5RemainAmount.value = (ItemTotal - DiscTotal + VatTotal - AdvNet).toFixed(2);


        }
        // Retention caculation 
        let RetentionAmount: number = 0;

        if (isNaN(warnteeprc) || ChkDownpayment.checked == true || ItemTotal - DiscTotal - AdvAmount ==0) {
            warnteeprc = 0;
            RetentionAmount = 0;
        }
        else {
            RetentionAmount = warnteeprc * NetafterAmount / 100;
        }

        if (isNaN(RetentionAmount)) { RetentionAmount = 0; }

        li4RetentionAmount.value = RetentionAmount.toString();

        let Payablemount: number = 0;
        Payablemount = ItemTotal - DiscTotal + VatTotal - AdvNet - RetentionAmount ;
        if (isNaN(Payablemount)) { Payablemount = 0; }

        li4ayablemount.value = Payablemount.toFixed(2);


        //li5RemainAmount.value = (ItemTotal - DiscTotal + VatTotal - AdvNet - Downused).toString();
        //else {
        //    //if (Downused == null) {
        //    //    li5UsedAmount.value = "0"
        //    //} else {
        //    //    li5UsedAmount.value = Downused.toString();
        //    //}
        //    //if (DownAmount == null) {
        //    //    li5RemainAmount.value = ""
        //    //} else {
        //    //    li5RemainAmount.value = DownAmount.toString();
        //    //}
        //    //if (DownAmountPrc == null) {
        //    //    li5RemainAmount.value = ""
        //    //} else {
        //    //    li5AdvanceConsumPrc.value = DownAmountPrc.toString();
        //    //}
        //}
    }
    function AdvAmount_onchange() {
        let DiscTotal: number = 0;
        let ItemTotal: number = 0;
        let ItemNetTotal: number = 0;
        let VatTotal: number = 0;
        let NetafterAmount: number = 0;
        AdvAmount = Number(li2_AdvAmount.value);
        VatTotal = Number(l1_InvoiceVat.value);
        DiscTotal = Number(txtDiscount.value);
        ItemTotal = Number(txtTotalAmount.value);
        vatPrc = Number(txtVatPrc.value);

        if (AdvAmount*(100+vatPrc) / 100 >= (DownAmount - Downused)) {
            WorningMessage("Entered amount is more than Remain downpayment", "المبلغ المدخل اكبر من  المتبقي  من الدفعة المقدمة");
             
            btnCalc_Clicked();

        } else {
             
            AdvVat = AdvAmount * vatPrc / (100);
            AdvNet = AdvVat + AdvAmount;

            

            
            li2_AdvAmount.value = AdvAmount.toFixed(2);

            
            li2_AdvVat.value = AdvVat.toFixed(2);

           
            li2_AdvNet.value = AdvNet.toFixed(2);

            //
            // calc taxable 
            //
            debugger;
           
            li3TaxableTotalAmount.value = (ItemTotal - DiscTotal - AdvAmount).toFixed(2);

            

            li3TaxableTotalVAT.value = (VatTotal - AdvVat).toFixed(2);

            li3TaxableTotalNetVAT.value = (ItemTotal - DiscTotal + VatTotal - AdvNet).toFixed(2);


            // 
            //if (isNaN(Downused)) { Downused = 0; }
            debugger;
            if (ChkDownpayment.checked == true && ClientSharedWork.CurrentMode == ScreenModes.Add) {
                Downused = 0;
                li5UsedAmount.value = "0"
                li5RemainAmount.value = (ItemTotal - DiscTotal + VatTotal - AdvNet).toFixed(2);


            }
            // Retention caculation 
            let RetentionAmount: number = 0;

            if (isNaN(warnteeprc) || ChkDownpayment.checked == true || ItemTotal - DiscTotal - AdvAmount == 0) {
                warnteeprc = 0;
                RetentionAmount = 0;
            }
            else {
                RetentionAmount = warnteeprc * NetafterAmount / 100;
            }

            if (isNaN(RetentionAmount)) { RetentionAmount = 0; }

            li4RetentionAmount.value = RetentionAmount.toString();

            let Payablemount: number = 0;
            Payablemount = ItemTotal - DiscTotal + VatTotal - AdvNet - RetentionAmount;
            if (isNaN(Payablemount)) { Payablemount = 0; }

            li4ayablemount.value = Payablemount.toFixed(2);

        }
    } 
    function RetentionAmount_onchange() {
                 // Retention caculation 
        let DiscTotal: number = 0;
        let ItemTotal: number = 0;
        let ItemNetTotal: number = 0;
        let VatTotal: number = 0;
        let NetafterAmount: number = 0;
        let RetentionAmount: number = 0;
        let AdvNet: number = 0;
        
        AdvAmount = Number(li2_AdvAmount.value);
        VatTotal = Number(l1_InvoiceVat.value);
        DiscTotal = Number(txtDiscount.value);
        ItemTotal = Number(txtTotalAmount.value);
        vatPrc = Number(txtVatPrc.value);
        AdvNet = Number(li2_AdvNet.value);
        RetentionAmount = Number(li4RetentionAmount.value);

        
        let Payablemount: number = 0;
        Payablemount = ItemTotal - DiscTotal + VatTotal - AdvNet - RetentionAmount;
        if (isNaN(Payablemount)) { Payablemount = 0; }

        li4ayablemount.value = Payablemount.toFixed(2);
    }

    function CalcTotalForGrid() {
        $('#h_ItemTotal').val((Number($("#h_BillQty").val()) * Number($("#h_NetUnitPrice").val())).toFixed(2));
    }
    function CalcDiscAmount() {

        $('#h_ItemDiscountAmt').val((Number($("#h_UnitPrice").val()) * Number($("#h_ItemDiscountPrc").val()) / 100).toFixed(2));
    }
    function CalcUnitNetPrice() {

        $('#h_NetUnitPrice').val((Number($("#h_UnitPrice").val()) - Number($("#h_ItemDiscountAmt").val())).toFixed(2));
    }
    function CalcVat() {
        var result = (Number($("#h_ItemTotal").val()) * Number($("#txtVatPrc").val()) / 100).toFixed(2);
        $('#h_ItemVatAmount').val(result);
    }

    function CalcItemDiscountPrc() {
        var result = (Number($("#h_ItemDiscountAmt").val()) / Number($("#h_UnitPrice").val()) * 100).toFixed(2);
        $('#h_ItemDiscountPrc').val(result);
    }
    function CalcItemNet() {
        var result = (Number($("#h_ItemTotal").val()) + Number($("#h_ItemVatAmount").val())).toFixed(2);
        $('#h_ItemTotalAVat').val(result);
    }
    function CalcTotal() {




    }
    function Calculationlien2() {

        let ItemNet: number = 0;

        for (var itm of DetailsSales) {
            ItemNet += Number(itm.ItemTotalAVat);
        }
        if (isNaN(ItemNet)) {
            ItemNet = 0;
        }
        if (ClientSharedWork.CurrentMode == ScreenModes.Add == true && Master.IsDownpayment == false) {
            let ressult1 = (ItemNet * AdvanceConsumPrc_ / 100);
            let ressult2 = (RemainDownpayment * 100) / (MasterVatPrc + 100);
            if (ressult1 > ressult2) {
                AdvanceConsumption = (RemainDownpayment * 100) / (MasterVatPrc + 100);
            }
            else {
                AdvanceConsumption = (ressult1 * AdvanceConsumPrc_ / 100);
            }
        }
    }
    function btnSearchBill_Clicked() {
        sys.FindKey(Modules.CustomerBilling, "btnSearchBill", "CompCode = " + _CompCode + " and BraCode = " + _BraCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerBill", ControllerName),
                data: { id: id },
                success: (d) => {
                    //MasterDetails = d.result as M_D_CustomerBilling;
                    Master = d.result as PQ_GetSalesInvoice;
                    MasterDetails.P_TR_SalesInvoice = Master;
                    let Index = GetIndexByUseId(Number(Master.InvoiceId), "PQ_GetSalesInvoice", "InvoiceId", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                    var invoce = Number(Master.InvoiceId);
                    //GetAdvance(Number(invoce));
                }
            });
        });
    }

    function GetAdvance(id: number) {
        // load advance invoice   From invoice header where projectid = selected projid and IsDownpayment = 1
        // if not found  then zeros 
        //DownAmount = NetAmount
        //Downused =  UsedDownpayment
        //DownAmountPrc = AdvanceConsumPrc
        DownAmountPrc = 0;
        DownAmount = 0;
        Downused = 0;
        Ajax.Callsync({
            url: Url.Action("LoadInvoiceByProject", ControllerName),
            data: { id: id/*, CompCode: _CompCode, LoginUser: _LoginUser */ },
            success: (d) => {

                var invList = d.result as Array<PQ_GetSalesInvoice>;
                var result_ = invList.filter(x => x.ProjectID == ProjectID && x.IsDownpayment == true && x.Status == 1);
                if (result_.length >= 1) {
                    DownAmountPrc = result_[0].AdvanceConsumPrc;
                    DownAmount = result_[0].DueAmount;
                    Downused = result_[0].UsedDownpayment;
                    if (ChkDownpayment.checked == true) {
                        WorningMessage("يوجد فاتورة دفعة مقدمة سابقا رقم : " + result_[0].TrNo.toString(), "There is another downpayment invoice No: " + result_[0].TrNo.toString());
                        ChkDownpayment.checked = false;

                    }


                }

            }
        });
        li2_AdvPrc.value = DownAmountPrc.toString();


    }
    function TimeFormat_(tim: Date): string {
        tim = new Date("2000-01-10T" + tim.toString());
        let x = tim.getHours();
        let time = (leadZero(tim.getHours()) + ":" + leadZero(tim.getMinutes()) + ":" + leadZero(tim.getSeconds()));
        return time;
    }
    function leadZero(_something) {
        if (parseInt(_something) < 10) return "0" + _something;
        return _something;
    }
    function checkproject(id: number) {
        var ret: number = 0;
        Ajax.CallAsync({
            url: Url.Action("LoadInvoiceByProject", ControllerName),
            data: { id: id },
            success: (d) => {
                debugger;
                var projectInvoice = d.result as Array<PQ_GetSalesInvoice>;
                if (projectInvoice.length > 0) {
                    ret = 0;
                }
                else {
                    ret = 1;
                }
            }

        })
        return ret;

    }
 
    function DownloadInvoicePdf() {
        debugger
        let rp: ReportParameters = new ReportParameters();
        rp.CompCode = _CompCode;
        rp.braCode = _BraCode;
        rp.BranchName = SharedSession.CurrentEnvironment.BranchName;
        rp.BranchNameEn = SharedSession.CurrentEnvironment.BranchNameEn;
        rp.CompanyName = SharedSession.CurrentEnvironment.CompanyName;
        rp.CompanyNameAr = SharedSession.CurrentEnvironment.CompanyNameAr;
        rp.SubSystemCode = SharedSession.CurrentEnvironment.SubSystemCode;
        rp.SystemCode = SharedSession.CurrentEnvironment.SystemCode;
        rp.UserCode = SharedSession.CurrentEnvironment.UserCode;
        rp.TrID = Number(Master.InvoiceId);


        //let _Data = 

        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("Reports_pdf", "rptInvoiceNote"),
            data: JSON.stringify(rp),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: (d) => {

                let result = d as BaseResponse;

            }
        });


    }
}