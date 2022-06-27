$(document).ready(() => {
    CustomerDbCr.InitalizeComponent();
});
namespace CustomerDbCr {
    const ControllerName: string = "CustomerDbCr";
    const GridInputClassName = "form-control gridIput";
    var columnWidth: string = "100px";
    const NumberColumnWidth = "50px";
    var sys: SystemTools = new SystemTools();
    var GridSales: JsGrid = new JsGrid();
    var GridProd: JsGrid = new JsGrid();
    var CodesTypes: Array<P_D_Status> = new Array<P_D_Status>();

 
    //var Master: PQ_GetSalesInvoice = new PQ_GetSalesInvoice();
    var Master: PQ_GetSalesDbCr = new PQ_GetSalesDbCr();
     var MasterDetails: M_D_CustomerBilling = new M_D_CustomerBilling();

    var P_TR_SalesDbCrMasterDetails: M_D_CustomerDbCr = new M_D_CustomerDbCr();

    //var DetailsSales: Array<PQ_GetSalesInvoiceDetail> = new Array<PQ_GetSalesInvoiceDetail>();
    var DetailsSales: Array<PQ_GetSalesDbCrDetail> = new Array<PQ_GetSalesDbCrDetail>();
    var DetailsAssignHeaderSales: PQ_GetSalesDbCrDetail = new PQ_GetSalesDbCrDetail();
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
    var txtTotalAmount: HTMLInputElement;
    var txtDiscountPrc: HTMLInputElement;
    var txtDiscount: HTMLInputElement;
    var txtTotalAmount: HTMLInputElement;
    var txtVatAmount: HTMLInputElement;
    var txtVatPrc: HTMLInputElement;
    var li2_AdvPrc: HTMLInputElement;
    var txtInvNo: HTMLInputElement;

    var btnSearchBill: HTMLButtonElement;
    var btnSearchProject: HTMLButtonElement;
    //var btnLoadProdution: HTMLButtonElement;
    var btnReopen: HTMLButtonElement;
    var btnCalc: HTMLButtonElement;

    //var btnAuthorize: HTMLButtonElement;
    
    var btnSearchInv: HTMLButtonElement;
     var InvoiceDetailId: number;
    var InvoiceId: number;
    var ProductionDetailId: number;
    var ProductionId: number;
    var ProjectPhaseItemId: number;
    var ProjectPhaseId: number;
    var Serial: number;
    var InvSerial: number;
    var invAdvAmount: number; 
    var invTotal: number; 
    var invAdvVat: number 
    var invadvDedPrc: number;
        
    var itemID: number;
    var customerId: number;
    var ProjectID: number;
    var Proj_ProjectCode: string;
    var _ScreenLang: string;
    var _CompCode: string;
    var _BraCode: string;
    var _LoginUser: string;
     var txtRemarks: HTMLInputElement;
    var txtDoNo: HTMLInputElement; 
    var txtNetAmount: HTMLInputElement;
    var VatAmount: HTMLInputElement;
    var txtAdvDeduction: HTMLInputElement;
    var txtAdvVatAmount: HTMLInputElement;
    var txtTotAdv: HTMLInputElement;
    var txtTaxableAmount: HTMLInputElement;
    var txtNetTax: HTMLInputElement;
    var txtTotNet: HTMLInputElement;

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
        vatPrc = Ajax.Call<number>({ url: Url.Action("GetVatPrcFromPControl", ControllerName) });
        //$("#ImageEditorButton").on("click", () => {
        //    sys.ImgPopup(_CompCode, _BraCode, Modules.CustomerBilling, Master.cod.toString());
        //});
        GetCusType();
    }

    function PrintCustomerBilling() {
        Ajax.CallAsync({
            url: Url.Action("PrintCustomerDC", "PrintTransaction"),
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
                title: res.SMB_LineCode, name: "lineCode", width: columnWidth, css: JsGridHeaderCenter,
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
                itemTemplate: (index: string, item: PQ_GetSalesDbCrDetail): HTMLElement => {
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
                title: res.SMB_BilledQty, name: "BillQty", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "BillQty", " ");
                    txt.id = "h_BillQty";
                    txt.onkeyup = (e) => { 
                         
                    }
                    txt.disabled = true;
                    return HeaderTemplate("SMB_BilledQty", txt);
                }
            },
            {
                 title: "Bill Net Price", name: "UnitPrice", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "UnitPrice", " ");
                    txt.id = "h_BillNetPrice";
                    txt.onkeyup = (e) => {
                        
                    }
                    txt.disabled = true;
                    return HeaderTemplate("SMB_UnitPrice", txt);
                }
            }, 
            {
                title: "ItemTotalPrice", name: "ItemTotalprice", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ItemTotalprice", " ");
                    txt.disabled = true;
                    txt.onkeyup = (e) => {

                    }
                    txt.id = "h_ItemTotalprice";
                    return HeaderTemplateNew("ItemTotalPrice", txt);
                }
            },
            {
                
                title: "DiffQty", name: "DiffQty", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DiffQty", " ");
                    txt.disabled = true;
                    txt.onkeyup = (e) => {
                        CalctotalAdd();
                        CalcVat();
                        Calcnet();

                    }
                    txt.disabled = false;
                    txt.id = "h_DiffQty";
                    return HeaderTemplateNew("DiffQty", txt);
                }
            },

            {
                title: "UPriceAdd", name: "DiffPrice", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DiffPrice", " ");
                    txt.disabled = true;
                    txt.onkeyup = (e) => {
                        CalctotalAdd();
                        CalcVat();
                        Calcnet();

                    }
                    txt.id = "h_DiffPrice";
                    txt.disabled = false;

                    return HeaderTemplateNew("UPriceAdd", txt);
                }
            },
            {
                title: "Total Add", name: "ItemTotal", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ItemTotal", " ");
                    txt.disabled = true;
                    txt.onkeyup = (e) => {
                        
                    }
                    txt.id = "h_ItemTotal";
                    return HeaderTemplateNew("ItemTotal", txt);
                }
            },
            {
                title: "Vat Add", name: "ItemVatAmount", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ItemVatAmount", " ");
                    txt.disabled = true;
                    txt.onkeyup = (e) => {

                    }
                    txt.id = "h_ItemVatAmount";
                    return HeaderTemplateNew("Vat Add", txt);
                }
            },
            {
                title: "Net Add", name: "ItemTotalAVat", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ItemTotalAVat", " ");
                    txt.disabled = true;
                    txt.id = "h_ItemTotalAVat";
                    return HeaderTemplateNew("Net Add", txt);
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
                itemTemplate: (s: string, item: PQ_GetSalesDbCrDetail): HTMLButtonElement => {
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
                    };
                    return btn;
                }
            },
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: (s: string, item: PQ_GetSalesDbCrDetail): HTMLButtonElement => {
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
                        DetailsAssignHeaderSales = new PQ_GetSalesDbCrDetail();
                        InvoiceDetailId = item.InvoiceDetailId;
                        InvoiceId = item.InvoiceId;
                        ProjectPhaseId = item.ProjectPhaseId;
                        ProjectPhaseItemId = item.ProjectPhaseItemId;
                        DetailsAssignHeaderSales.LineCode = item.LineCode;
                        DetailsAssignHeaderSales.Itm_DescA = item.Itm_DescA;
                        DetailsAssignHeaderSales.Itm_DescE = item.Itm_DescE;
                        DetailsAssignHeaderSales.Itm_ItemCode = item.Itm_ItemCode;
                        DetailsAssignHeaderSales.BillQty = item.BillQty;
                        DetailsAssignHeaderSales.ItemQty = item.ItemQty;
                        DetailsAssignHeaderSales.Serial = item.Serial;
                        InvSerial = item.Serial;
                        Serial = item.InvSerial;
                        DetailsAssignHeaderSales.UomCode = item.UomCode;
                        DetailsAssignHeaderSales.Remarks = item.Remarks;
                        DetailsAssignHeaderSales.uom_DescA = item.uom_DescA;
                        DetailsAssignHeaderSales.Uom_DescE = item.Uom_DescE;
                        DetailsAssignHeaderSales.ItemTotal = item.ItemTotal;
                        DetailsAssignHeaderSales.UnitPrice = item.UnitPrice;
                        DetailsAssignHeaderSales.DiffPrice = item.DiffPrice;
                        DetailsAssignHeaderSales.DiffQty = item.DiffQty;
                        DetailsAssignHeaderSales.InvDiscountPrc = item.InvDiscountPrc;
                        DetailsAssignHeaderSales.InvDiscountAmt = item.InvDiscountAmt;                      
                        DetailsAssignHeaderSales.ItemVatAmount = item.ItemVatAmount;
                        DetailsAssignHeaderSales.ItemTotalAVat = item.ItemTotalAVat;
                        DetailsAssignHeaderSales.ItemTotalprice = item.ItemTotalprice;

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
                        FillInputText("h_BillQty", DetailsAssignHeaderSales.BillQty.toString());
                        FillInputText("h_BillNetPrice", DetailsAssignHeaderSales.UnitPrice.toString());

                        FillInputText("h_ItemTotalprice", DetailsAssignHeaderSales.ItemTotalprice.toString());
                        FillInputText("h_ItemVatAmount", DetailsAssignHeaderSales.ItemVatAmount.toString());
                        FillInputText("h_DiffQty", DetailsAssignHeaderSales.DiffQty.toString());
                        FillInputText("h_DiffPrice", DetailsAssignHeaderSales.DiffPrice.toString());
                        FillInputText("h_ItemTotal", DetailsAssignHeaderSales.ItemTotal.toString());
                        FillInputText("h_ItemTotalAVat", DetailsAssignHeaderSales.ItemTotalAVat.toString()); 
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
        VatAmount = DocumentActions.GetElementById<HTMLInputElement>("VatAmount");
        txtNetAmount = DocumentActions.GetElementById<HTMLInputElement>("txtNetAmount");
         txtInvNo = DocumentActions.GetElementById<HTMLInputElement>("txtInvNo");
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
        txtTotalAmount = DocumentActions.GetElementById<HTMLInputElement>("txtTotalAmount");
        txtDiscountPrc = DocumentActions.GetElementById<HTMLInputElement>("txtDiscountPrc");
        txtDiscount = DocumentActions.GetElementById<HTMLInputElement>("txtDiscount");
        txtVatAmount = DocumentActions.GetElementById<HTMLInputElement>("txtVatAmount");
        txtVatPrc = DocumentActions.GetElementById<HTMLInputElement>("txtVatPrc");
        txtRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtRemarks");

        txtAdvDeduction = DocumentActions.GetElementById<HTMLInputElement>("txtAdvDeduction");
        txtTotAdv = DocumentActions.GetElementById<HTMLInputElement>("txtTotAdv");
        txtTaxableAmount = DocumentActions.GetElementById<HTMLInputElement>("txtTaxableAmount");
        txtNetTax = DocumentActions.GetElementById<HTMLInputElement>("txtNetTax");
        txtTotNet = DocumentActions.GetElementById<HTMLInputElement>("txtTotNet");
        txtAdvVatAmount = DocumentActions.GetElementById<HTMLInputElement>("txtAdvVatAmount");
        
        btnSearchBill = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchBill");
        btnSearchInv = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchInv");
        btnSearchProject = DocumentActions.GetElementById<HTMLButtonElement>("btnSearchProject");
        //btnLoadProdution = DocumentActions.GetElementById<HTMLButtonElement>("btnLoadProdution");
         //btnAuthorize = DocumentActions.GetElementById<HTMLButtonElement>("btnAuthorize");
        btnReopen = DocumentActions.GetElementById<HTMLButtonElement>("btnReopen");
         li2_AdvPrc = DocumentActions.GetElementById<HTMLInputElement>("li2_AdvPrc");
        txtDoNo = DocumentActions.GetElementById<HTMLInputElement>("txtDoNo");
        $('#btnReopen').css('display', 'None');
     }

    function InitalizeEvents() { 
        btnSearchProject.onclick = btnSearchProject_Clicked;
        txtTrNo.onchange = SearchTR_onchange;
        txtInvNo.onchange = SearchBillonchange;
        txtProjCode.onchange = SearchProject_onchange;
        btnSearchBill.onclick = btnSearchBill_Clicked;
        btnSearchInv.onclick = btnSearchInv_Clicked;    
        btnReopen.onclick = btnAuthorize_Clicked;

     }
    function btnAuthorize_Clicked() {

        let date: string = txtTrDate.value;
        if (CheckDate(Number(_CompCode), Number(_BraCode), date) == false) {
            WorningMessage("غير مسموح بهذا التاريخ", "This Date is not allowed");
            return;
        }
        Ajax.Callsync({
            url: Url.Action("UnAuthorize", ControllerName),
            data: { invId: Master.InvoiceId },
            success: (d) => {
                let msg: string = ReturnMsg("تم اعادة الفتح بنجاح  ", "Re Opened Successfuly. ");
                MessageBox.Show(msg, "ReOpen", () => {

                    let index = GetIndexByUseId(Master.InvoiceId, "PQ_GetSalesDbCr", "InvoiceId", "CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                    NavigateToSearchResultKey(Number(index), Navigate);
                    //LoadDetails(Master.ProjectID);
                });

            }
        });
 

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
                   // txtDiscountPrc.value = Number(DiscountPrc).toString();
                    vatPrc = result.VatPrc == null ? 0 : result.VatPrc;
                    if (result.VatPrc == null)
                        txtVatPrc.value = "0";
                    else
                    txtVatPrc.value = result.VatPrc.toString();
                    DetailsSales = new Array<PQ_GetSalesDbCrDetail>();
                    ClearGrid(GridSales, DetailsSales);
                 }
            }
        });
    }

    function SearchTR_onchange() {
        let trNo = Number(txtTrNo.value);
        Ajax.CallAsync({
            url: Url.Action("GetP_TR_SalesDbCrTrNo", ControllerName),
            data: { TrNo: trNo, CompCode: _CompCode, BraCode: _BraCode },
            success: (d) => {
                Master = d.result as PQ_GetSalesDbCr;
                if (Master != null) {
                    P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr = Master;

                    
                    GetSalesInvoice(P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr.RefInvoiceid)

                    let Index = GetIndexByUseId(Number(Master.InvoiceId), "PQ_GetSalesDbCr", "InvoiceId", " compCode = " + _CompCode + " and braCode = " + _BraCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                   
                } else {
                    WorningMessage("لا يوجد فاتورة بهذا الرقم ", "There is no invoice with this no");
                    txtTrNo.value = "";
                }
            }
        });
    }
   
    

    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", "CustomerDbCr"),
            success: (d) => {
                 
                Master = d.result as PQ_GetSalesDbCr; 
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
                        $('#h_BillQty').val(result.BilledQty);
                        $('#h_BillNetPrice').val(result.UnitPrice);
                        if (result.UnitPrice == 0) {
                            $('#h_ItemTotalprice').val(0);
                        }
                        else {
                            $('#h_ItemTotalprice').val((result.UnitPrice * result.BilledQty).toFixed(2));
                        }

                        //$('#h_ItemVatAmount').val((result.).toFixed(2));
 
                         
                        

                    }
                }
            });
        });
    } 

    function Display() {
        debugger;
        DocumentActions.RenderFromModel(Master);
        $("#txtTrNo").val(Master.TrNo);
        //txtInvNo.value = Master.RefInvoiceid.toString();
        txtInvNo.disabled = true;
        btnSearchInv.disabled = true;
        customerId = Master.CustomerID;
        ProjectID = Master.ProjectID;
        InvoiceId = Master.InvoiceId;
        GetSalesInvoice(Master.RefInvoiceid);
        Proj_ProjectCode = Master.ProjCode;
        txtDoNo.value = Master.DocNo;
        txtTrDate.value = DateFormat(Master.TrDate);
        txtFromDate.value = DateFormat(Master.FromDate) != null ? DateFormat(Master.FromDate) : null;
        txtToDate.value = DateFormat(Master.ToDate) != null ? DateFormat(Master.ToDate) : null;
        Master.Status == 1 ? ControlsButtons.EditButton.disabled = true : ControlsButtons.EditButton.disabled = false;

        LoadInvoiceDetails(Master.InvoiceId);
        txtProj_DescL.value = _ScreenLang == "ar" ? Master.WorkDiscription : Master.WorkDiscription;
        txtCust_DescE.value = _ScreenLang == "ar" ? Master.Cust_DescA : Master.Cust_DescE;
        $("#txtTotAdv").val(Master.AdvDeduction + Master.AdvVatAmount);
        $("#txtTotNet").val(Master.TaxableAmount + Master.NetTax);
        ChkStatus.disabled = true;
        DiscountPrc = Master.DiscountPrc;
        MasterVatPrc = Master.VatPrc; 
        if (SharedSession.CurrentPrivileges.CUSTOM2 == true && Master.Status == 1) {
            $('#btnReopen').css('display', 'inline');
            $('#btnReopen').removeAttr('disabled');
            $("#btnReopen").css('cursor', 'pointer');
            $("#btnReopen").css('backgroundColor', 'red');
        }
        else {
            $('#btnReopen').css('display', 'None');
            $('#btnReopen').attr('disabled', 'disabled');
            $("#btnReopen").css('cursor', 'no-drop');
            $("#btnReopen").css('backgroundColor', '#0B6D8A');
        }

       
    }

    function Add() {
        txtTrDate.value = DateFormat((new Date()).toString());
        txtProjectID.value = "";
        invAdvAmount = 0;
        invTotal = 0;
        invAdvVat = 0;
        invadvDedPrc = 0;
        var dt = new Date();
        //var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
        //txtTime.value = time;
        ChkStatus.checked = false;
        ChkStatus.disabled = true;
        txtProjCode.disabled = false;
        ClearGrid(GridProd, new Array<string>());
        ClearGrid(GridSales, new Array<string>());
         $("#btnSearchInv").removeAttr("disabled");
          
    }

    function Edit() {
        ChkStatus.disabled = !SharedSession.CurrentPrivileges.CUSTOM1;

        txtInvNo.disabled = false;
        btnSearchInv.disabled = false;
     }

    function Insert() {
         btnCalc_Clicked();
        Assign();
        let compCode: number = Number(_CompCode);
        let braCode: number = Number(_BraCode);
        let date: string = txtTrDate.value;
        if (CheckDate(compCode, braCode, date) == false) {
            WorningMessage("غير مسموح بهذا التاريخ", "This Date is not allowed");
            return;
        }
        P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr.TrTime = "";

        Master.CustomerID = customerId;
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BraCode);
        P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr.CreatedAt = SharedSession.CurrentEnvironment.CurrentYear;
        P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr.CreatedBy = SharedSession.CurrentEnvironment.UserCode;
        P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr.TrNo = 0;
          
        var session: SessionRecord = GetSessionRecord();
        P_TR_SalesDbCrMasterDetails.sessionRecord = session;
        // New 
        debugger
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_SalesInvoice", "InsertMasterDetailSalesDbCr"),
            data: JSON.stringify(P_TR_SalesDbCrMasterDetails),
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

                        let _Index = GetIndexByUseId(result.Response, "PQ_GetSalesDbCr", "InvoiceId", " compCode = " + _CompCode + " and braCode = " + _BraCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                        if (Master.Status == 1) DownloadInvoicePdf();
                        
                    });
                }
            }
        });
         
 
    }

    function Update() {

        btnCalc_Clicked();

        Assign();
        Master.CustomerID = customerId;
        Master.CompCode = Number(_CompCode);
        Master.BraCode = Number(_BraCode);
        Master.TrTime = "";
        

        var session: SessionRecord = GetSessionRecord();
        P_TR_SalesDbCrMasterDetails.sessionRecord = session;
        P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr.UpdatedAt = SharedSession.CurrentEnvironment.CurrentYear;
        P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr.UpdatedBy = SharedSession.CurrentEnvironment.UserCode;
        // New 
        debugger

        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("P_TR_SalesInvoice", "UpdateMasterDetailSalesDbCr"),
            data: JSON.stringify(P_TR_SalesDbCrMasterDetails),
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

                        let _Index = GetIndexByUseId(result.Response, "PQ_GetSalesDbCr", "InvoiceId", " compCode = " + _CompCode + " and braCode = " + _BraCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                        if (Master.Status == 1) DownloadInvoicePdf();
                        //LoadDetails(Master.ProjectID);
                    });
                }
            }
        });
 
    }

    function Undo() {

    }

    function Assign() {

        DocumentActions.AssignToModel<P_TR_SalesDbCr>(Master);
        //Master.RetentionPrc = warnteeprc;
        P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr = Master as P_TR_SalesDbCr;
        P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr.TrType = 2;
        P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr.InvoiceTransCode = 1;
        if (P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr.TotalAmount > 0) {
            P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr.InvoiceTypeCode = 3;
        } else {
            P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr.InvoiceTypeCode = 2;

        }
        debugger
        if (P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr.DbReason == 0) {

            WorningMessage("Please select DbReason  ", "Please select DbReason  ");
            $("#ddDbReason").css("background-color:#ff5d5d")
                      return;
        } else {
            P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr.DbReason = Number( $("#ddDbReason").val());

        }
        //AssignDetails
        //MasterDetails.P_TR_SalesInvoiceDetail = DetailsSales as Array<PQ_GetSalesInvoiceDetail>;

        var det: Array<P_TR_SalesDbCrDetail> = new Array<P_TR_SalesDbCrDetail>();
        debugger
        var con = 1;
        for (var sls of DetailsSales) {

            var itm: P_TR_SalesDbCrDetail = new P_TR_SalesDbCrDetail();
            itm.BillQty = sls.BillQty;
            itm.InvoiceDetailId = sls.InvoiceDetailId;
            itm.InvoiceId = Master.InvoiceId;
            itm.InvDiscountAmt = sls.InvDiscountAmt;
            itm.InvDiscountPrc = sls.InvDiscountPrc;
            itm.ItemVatPrc = sls.ItemVatPrc;
            itm.ProjectPhaseItemId = sls.ProjectPhaseItemId;
            itm.Remarks = sls.Remarks;
            itm.Serial = con;
            itm.InvSerial = sls.InvSerial;
            itm.UnitPrice = sls.UnitPrice;
            itm.ItemVatAmount = sls.ItemVatAmount;
            itm.DiffPricePrc = sls.DiffPricePrc;
            itm.DiffPrice = sls.DiffPrice;
            itm.DiffQty = sls.DiffQty;
            itm.ItemTotal = sls.ItemTotal;
            itm.ItemTotalAVat = sls.ItemTotalAVat;

            con++
             det.push(itm);

        }

        P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCrDetail = det;

 
         
     }

    function AddItemInSalesGrid() {

        DetailsAssignHeaderSales = new PQ_GetSalesDbCrDetail();
        for (var itm of DetailsSales) {
            if ($("#btnFindItem").text() == itm.LineCode) {
                WorningMessage("لا يمكن تكرار نفس العنصر", "Item Cannot Repeat ");
                return;
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
        DetailsAssignHeaderSales.Serial = Serial ;
        DetailsAssignHeaderSales.InvSerial = InvSerial;
        DetailsAssignHeaderSales.LineCode = $('#btnFindItem').text();
        DetailsAssignHeaderSales.Itm_DescA = $('#h_Itm_DescA').val();
        DetailsAssignHeaderSales.Itm_DescE = $('#h_Itm_DescE').val();
        DetailsAssignHeaderSales.UomCode = $('#h_UomCode').val();
        DetailsAssignHeaderSales.BillQty = Number($('#h_BillQty').val());
        DetailsAssignHeaderSales.UnitPrice = Number($('#h_BillNetPrice').val());
        DetailsAssignHeaderSales.DiffQty = Number($('#h_DiffQty').val());
        DetailsAssignHeaderSales.DiffPrice = Number($('#h_DiffPrice').val());
        debugger;
        DetailsAssignHeaderSales.ItemTotalprice = Number($('#h_BillQty').val()) * Number($('#h_BillNetPrice').val() );
        DetailsAssignHeaderSales.ItemVatAmount = Number($('#h_ItemVatAmount').val());
        DetailsAssignHeaderSales.ItemTotalAVat = Number($('#h_ItemTotalAVat').val());
        DetailsAssignHeaderSales.ItemTotal = Number($('#h_ItemTotal').val());
        
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

    function LoadInvoiceDetails(id: number) {
        debugger
         
        var DetailsSales_ = Ajax.Call<Array<PQ_GetSalesDbCrDetail>>({ url: Url.Action("LoadInvoiceDetails", ControllerName), data: { id: id } });

        var det: Array<PQ_GetSalesDbCrDetail> = new Array<PQ_GetSalesDbCrDetail>();
        for (var sls of DetailsSales_) { 
            var itm: PQ_GetSalesDbCrDetail = new PQ_GetSalesDbCrDetail();
            itm.InvoiceId = Master.InvoiceId;
            itm.ProjectPhaseItemId = sls.ProjectPhaseItemId;
            itm.UnitPrice = sls.UnitPrice
            itm.InvDiscountAmt = sls.InvDiscountAmt;
            itm.InvDiscountPrc = sls.InvDiscountPrc;
            itm.BillQty = sls.BillQty;
            itm.Itm_ItemCode = sls.Itm_ItemCode;
            itm.Itm_DescE = sls.Itm_DescE;
            itm.Itm_DescA = sls.Itm_DescA;
            itm.ProjectPhaseId = sls.ProjectPhaseId;
            itm.InvoiceDetailId = sls.InvoiceDetailId;
            itm.LineCode = sls.LineCode;
            itm.ItemQty = sls.ItemQty;
            itm.Remarks = sls.Remarks;
            itm.UomCode = sls.UomCode;
            itm.Uom_DescE = sls.Uom_DescE;
            itm.uom_DescA = sls.uom_DescA;
            itm.ItemVatPrc = sls.ItemVatPrc;
            itm.ItemVatAmount = sls.ItemVatAmount;
            itm.ItemTotalprice = sls.BillQty * sls.UnitPrice;
            itm.ItemTotalAVat = sls.ItemTotalAVat;
            itm.InvSerial = sls.Serial;
            itm.Serial = sls.Serial;
            itm.DiffQty = sls.DiffQty;
            itm.DiffPrice = sls.DiffPrice;
            itm.DiffPricePrc = sls.DiffPricePrc;
            itm.ItemTotal = sls.ItemTotal;
             
           
   
            det.push(itm);
        }
         
        DetailsSales = det;
        GridSales.DataSource = DetailsSales;
        GridSales.Bind();
        btnCalc_Clicked();
    }
    function Display_src(invoiceMasterDetails: M_D_CustomerBillingMasterDetail) {
        //fill master
        //display inovice in CRDB 
       
        Master.ProjectID = invoiceMasterDetails.PQ_GetSalesInvoice.ProjectID;
        Master.ProjCode = invoiceMasterDetails.PQ_GetSalesInvoice.ProjCode;
        Master.Proj_DescA = invoiceMasterDetails.PQ_GetSalesInvoice.Proj_DescA;
        Master.Proj_DescL = invoiceMasterDetails.PQ_GetSalesInvoice.Proj_DescL;
        Master.BraCode = invoiceMasterDetails.PQ_GetSalesInvoice.BraCode;
        Master.CompCode = invoiceMasterDetails.PQ_GetSalesInvoice.CompCode;
        Master.CreatedAt = invoiceMasterDetails.PQ_GetSalesInvoice.CreatedAt;
        Master.FromDate = invoiceMasterDetails.PQ_GetSalesInvoice.FromDate;
        Master.ToDate = invoiceMasterDetails.PQ_GetSalesInvoice.ToDate;
        Master.CreatedBy = invoiceMasterDetails.PQ_GetSalesInvoice.CreatedBy;
        Master.CryptographicStamp = invoiceMasterDetails.PQ_GetSalesInvoice.CryptographicStamp;
        Master.CustomerID = invoiceMasterDetails.PQ_GetSalesInvoice.CustomerID;
        Master.Cust_DescA = invoiceMasterDetails.PQ_GetSalesInvoice.Cust_DescA;
        Master.Cust_DescE = invoiceMasterDetails.PQ_GetSalesInvoice.Cust_DescE;
        Master.Cust_CustomerCode = invoiceMasterDetails.PQ_GetSalesInvoice.Cust_CustomerCode;
        Master.Discount = invoiceMasterDetails.PQ_GetSalesInvoice.Discount;
        Master.DiscountPrc = invoiceMasterDetails.PQ_GetSalesInvoice.DiscountPrc;
        Master.DocNo = invoiceMasterDetails.PQ_GetSalesInvoice.DocUUID;
        Master.DocUUID = invoiceMasterDetails.PQ_GetSalesInvoice.DocNo;;
        Master.GlobalInvoiceCounter = invoiceMasterDetails.PQ_GetSalesInvoice.GlobalInvoiceCounter;
        Master.InvoiceId = invoiceMasterDetails.PQ_GetSalesInvoice.InvoiceId;
        Master.InvoiceTransCode = invoiceMasterDetails.PQ_GetSalesInvoice.InvoiceTransCode;
        Master.InvoiceTypeCode = invoiceMasterDetails.PQ_GetSalesInvoice.InvoiceTypeCode;
        Master.NetAmount = invoiceMasterDetails.PQ_GetSalesInvoice.NetAmount;
        Master.PrevInvoiceHash = invoiceMasterDetails.PQ_GetSalesInvoice.PrevInvoiceHash;
        Master.ProjCode = invoiceMasterDetails.PQ_GetSalesInvoice.ProjCode;
        Master.QRCode = invoiceMasterDetails.PQ_GetSalesInvoice.QRCode;
        Master.RefCode = invoiceMasterDetails.PQ_GetSalesInvoice.RefCode;
        Master.Remarks = invoiceMasterDetails.PQ_GetSalesInvoice.Remarks;
        Master.Status = 0;
        Master.TrNo = invoiceMasterDetails.PQ_GetSalesInvoice.TrNo;
        Master.TrTime = invoiceMasterDetails.PQ_GetSalesInvoice.TrTime;
        Master.TrDate = invoiceMasterDetails.PQ_GetSalesInvoice.TrDate;//txtTrDate.value;
        Master.VatAmount = invoiceMasterDetails.PQ_GetSalesInvoice.VatAmount;
        Master.VatPrc = invoiceMasterDetails.PQ_GetSalesInvoice.VatPrc;
        Master.WorkDiscription = invoiceMasterDetails.PQ_GetSalesInvoice.WorkDiscription;
        Master.TrType = invoiceMasterDetails.PQ_GetSalesInvoice.InvoiceTypeCode;
        Master.IsPosted = invoiceMasterDetails.PQ_GetSalesInvoice.IsPosted;
        Master.RefInvoiceid = invoiceMasterDetails.PQ_GetSalesInvoice.InvoiceId
        Master.PostRef = invoiceMasterDetails.PQ_GetSalesInvoice.RefCode;
        Master.TotalAmount = invoiceMasterDetails.PQ_GetSalesInvoice.TotalAmount; 

         // display master 
        debugger;
        DocumentActions.RenderFromModel(Master);
        $("#txtInvNo").val(invoiceMasterDetails.PQ_GetSalesInvoice.TrNo)
        $("#txtRefInvoiceid").val(invoiceMasterDetails.PQ_GetSalesInvoice.InvoiceId)

        invTotal = (invoiceMasterDetails.PQ_GetSalesInvoice.TotalAmount - invoiceMasterDetails.PQ_GetSalesInvoice.Discount)

        invAdvAmount = invoiceMasterDetails.PQ_GetSalesInvoice.AdvDeduction 
        invAdvVat = invoiceMasterDetails.PQ_GetSalesInvoice.AdvVatAmount

 


        invadvDedPrc = 0

        customerId = Master.CustomerID;
        ProjectID = Master.ProjectID;
        InvoiceId = Master.InvoiceId;
        Proj_ProjectCode = Master.ProjCode;
        txtDoNo.value = Master.DocNo;
        txtTrDate.value = DateFormat(Master.TrDate);
        txtFromDate.value = DateFormat(Master.FromDate) != null ? DateFormat(Master.FromDate) : null;
        txtToDate.value = DateFormat(Master.ToDate) != null ? DateFormat(Master.ToDate) : null;
        Master.Status == 1 ? ControlsButtons.EditButton.disabled = true : ControlsButtons.EditButton.disabled = false;
              
        txtProj_DescL.value = _ScreenLang == "ar" ? Master.WorkDiscription : Master.WorkDiscription;
        txtCust_DescE.value = _ScreenLang == "ar" ? Master.Cust_DescA : Master.Cust_DescE;
        ChkStatus.disabled = true;
        DiscountPrc = Master.DiscountPrc;
        MasterVatPrc = Master.VatPrc;

        LoadInvoiceDetails_src(Master.InvoiceId);
      
    }
    function LoadInvoiceDetails_src(id: number) {
        debugger

        var DetailsSales_ = Ajax.Call<Array<PQ_GetSalesInvoiceDetail>>({ url: Url.Action("LoadInvoiceDetailsser", ControllerName), data: { id: id } });

        var det: Array<PQ_GetSalesDbCrDetail> = new Array<PQ_GetSalesDbCrDetail>();
        for (var sls of DetailsSales_) {
            var itm: PQ_GetSalesDbCrDetail = new PQ_GetSalesDbCrDetail();
            itm.InvoiceId = Master.InvoiceId;
            itm.ProjectPhaseItemId = sls.ProjectPhaseItemId;
            itm.UnitPrice = sls.UnitPrice
            itm.InvDiscountAmt = sls.ItemDiscountAmt;
            itm.InvDiscountPrc = sls.ItemDiscountPrc;
            itm.BillQty = sls.BillQty;
            itm.Itm_ItemCode = sls.Itm_ItemCode;
            itm.Itm_DescE = sls.Itm_DescE;
            itm.Itm_DescA = sls.Itm_DescA;
            itm.ProjectPhaseId = sls.ProjectPhaseId;
            itm.InvoiceDetailId = sls.InvoiceDetailId;
            itm.LineCode = sls.LineCode;
            itm.ItemQty = sls.ItemQty;
            itm.Remarks = sls.Remarks;
            itm.UomCode = sls.UomCode;
            itm.Uom_DescE = sls.Uom_DescE;
            itm.uom_DescA = sls.uom_DescA;
            itm.ItemVatPrc = sls.ItemVatPrc;
            itm.ItemVatAmount = 0;

            if (itm.ItemVatAmount == null) {
                itm.ItemVatAmount = 0;
            }
            itm.ItemTotalprice = sls.ItemTotal;
            itm.ItemTotalAVat = sls.ItemTotalAVat;
            itm.InvSerial = sls.Serial;
            itm.Serial = sls.Serial;
            itm.DiffQty = 0;
            itm.DiffPrice = 0;
            itm.DiffPricePrc = 0;
            itm.ItemTotal = 0;



              
            det.push(itm);
        }

        DetailsSales = det;
        GridSales.DataSource = DetailsSales;
        GridSales.Bind();
        btnCalc_Clicked();

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
                    
                    ProjectID = result.ProjectID;
                    txtProjectID.value = result.ProjectID.toString();
                    txtProjCode.value = result.ProjectCode;
                    txtProj_DescL.value = _ScreenLang == "ar" ? result.DescA : result.DescL;
                    txtCust_CustomerCode.value = result.cust_CustomerCode.toString();
                    txtCust_DescE.value = _ScreenLang == "ar" ? result.DescA : result.cust_DescE;
                    customerId = result.CustomerID;
                    
                    if (result.VatPrc == null)
                        txtVatPrc.value = "0";
                    else
                        txtVatPrc.value = result.VatPrc.toString();


                    DetailsSales = new Array<PQ_GetSalesDbCrDetail>();
                    ClearGrid(GridSales, DetailsSales);
                      

                }
            });
        });
    }

   
    function btnCalc_Clicked() {
        if (ClientSharedWork.CurrentMode == ScreenModes.Query)
            return;


        debugger

        vatPrc = Number(txtVatPrc.value);
        let DiscTotal: number = 0;
        let ItemTotal: number = 0;
        let ItemTotalprice: number = 0;
        let ItemNetTotal: number = 0;
        let VatTotal: number = 0;
        let NetafterAmount: number = 0;
        debugger
        for (var itm of DetailsSales) {
            DiscTotal += Number(itm.BillQty) * Number(itm.InvDiscountAmt);
            ItemTotal += Number(itm.ItemTotal);
            ItemNetTotal += Number(itm.BillQty) * Number(itm.UnitPrice);
            VatTotal += Number(itm.ItemVatAmount);
            ItemTotalprice += Number(itm.ItemTotalprice);

        }

        txtTotalAmount.value = (ItemTotal).toFixed(2);
        if (isNaN(VatTotal)) {
            VatTotal = 0;
        }
        debugger
        VatAmount.value = VatTotal.toFixed(2);

        var totNetAmount = ItemTotal + VatTotal;
        txtNetAmount.value = Number(totNetAmount).toFixed(2);
        //alert(invAdvAmount);
        if (ItemTotal < 0 && invAdvAmount > 0) {
            //if (invAdvAmount > -ItemTotal) {
            //    txtAdvDeduction.value = (-ItemTotal).toFixed(2);
            //    txtAdvVatAmount.value = (-VatTotal).toFixed(2);

            //}
            //else {
            //    txtAdvDeduction.value = invAdvAmount.toFixed(2);
            //    txtAdvVatAmount.value = invAdvVat.toFixed(2);
            //}

            

            if (-ItemTotal - invTotal + invAdvAmount > 0 ) {
                txtAdvDeduction.value = (-ItemTotal - invTotal + invAdvAmount).toFixed(2);
                txtAdvVatAmount.value = (invAdvVat * (-ItemTotal - invTotal + invAdvAmount) / (invAdvAmount)).toFixed(2);

            }
            else {
                txtAdvDeduction.value = "0";
                txtAdvVatAmount.value = "0";
            }
        } else {
            txtAdvDeduction.value = "0";
            txtAdvVatAmount.value = "0";
        }
        txtTotAdv.value = (Number(txtAdvDeduction.value) + Number(txtAdvVatAmount.value)).toString()
        txtTaxableAmount.value = (Number(txtTotalAmount.value) + Number(txtAdvDeduction.value)).toString()
        txtNetTax.value = (Number(VatAmount.value) + Number(txtAdvVatAmount.value)).toString()
        txtTotNet.value = (Number(txtTaxableAmount.value) + Number(txtNetTax.value)).toString()
    }
     
    function CalctotalAdd() {

        //$('#h_TotalAdd').val((Number($("#h_BillQty").val()) * Number($("#h_DiffPrice").val()) + Number($("#h_DiffQty").val())) * (Number($("#h_BillNetPrice").val()) - DetailsAssignHeaderSales.InvDiscountAmt + Number($("#h_DiffPrice").val())).toFixed(2);
        debugger
        var h_BillQty = Number($("#h_BillQty").val());
        var h_DiffPrice = Number($("#h_DiffPrice").val());
        var h_DiffQty = Number($("#h_DiffQty").val());
        var h_BillNetPrice = Number($("#h_BillNetPrice").val());
 
        var result = (h_BillQty * h_DiffPrice + h_DiffQty * ((h_BillNetPrice - DetailsAssignHeaderSales.InvDiscountAmt ) + h_DiffPrice )).toFixed(2);
 

 
        $('#h_ItemTotal').val(result);
    }
     
    function CalcVat() {
        debugger
        var TotalAdd = Number($("#h_ItemTotal").val());
        var txtVatPrc = Number($("#txtVatPrc").val());

        var result = (txtVatPrc * TotalAdd / 100).toFixed(2);

        $('#h_ItemVatAmount').val(result);
    }

    function Calcnet() {
        var result = (Number($("#h_ItemTotal").val()) + Number($("#h_ItemVatAmount").val())).toFixed(2);
        $('#h_ItemTotalAVat').val(result);
    }

    function GetSalesInvoice(id: number) {

        Ajax.Callsync({
            url: Url.Action("GetCustomerBillMasterDetail", "CustomerBilling"),
            data: { id: id },
            success: (d) => {
                debugger
                let invoiceMasterDetails = d.result as M_D_CustomerBillingMasterDetail;

                invTotal = (invoiceMasterDetails.PQ_GetSalesInvoice.TotalAmount - invoiceMasterDetails.PQ_GetSalesInvoice.Discount)

                invAdvAmount = invoiceMasterDetails.PQ_GetSalesInvoice.AdvDeduction
                invAdvVat = invoiceMasterDetails.PQ_GetSalesInvoice.AdvVatAmount


           
                  
            }
        });

    }

    function btnSearchBill_Clicked() {
        //alert("hh")
        sys.FindKey(Modules.CustomerDbCr, "btnSearchDbCr", "CompCode = " + _CompCode + " and BraCode = " + _BraCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerBill", ControllerName),
                data: { id: id },
                success: (d) => {
                    P_TR_SalesDbCrMasterDetails = d.result as M_D_CustomerDbCr;
                    Master = d.result as PQ_GetSalesDbCr;
                    P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr = Master;


                    GetSalesInvoice(P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr.RefInvoiceid)

                



                    let Index = GetIndexByUseId(Number(Master.InvoiceId), "PQ_GetSalesDbCr", "InvoiceId", " compCode = " + _CompCode + " and braCode = " + _BraCode);
                    NavigateToSearchResultKey(Number(Index), Navigate);
                   

                }
            });
        });
    }

    function btnSearchInv_Clicked() {
        var con = "";
        if (txtProjectID.value != "" ) {
            con = "CompCode = " + _CompCode + " and BraCode = " + _BraCode + " and status = 1 and ProjectID = " + txtProjectID.value + " ";
        }
        else {
            con = "CompCode = " + _CompCode + " and BraCode = " + _BraCode + " and status = 1 ";
        }
        //alert(con);
        sys.FindKey(Modules.CustomerBilling, "btnSearchBill", con, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerBillMasterDetail", "CustomerBilling"),
                data: { id: id },
                success: (d) => {
                    debugger
                    let invoiceMasterDetails = d.result as M_D_CustomerBillingMasterDetail;
                    
                      
                    Display_src(invoiceMasterDetails);
                }
            });
        });
    }
    function SearchBillonchange() {
        debugger
        let trNo = Number(txtInvNo.value);

        Ajax.CallAsync({
            url: Url.Action("GetCustomerBillTrNo", ControllerName),
            data: { TrNo: trNo, CompCode: _CompCode, BraCode: _BraCode },
            success: (d) => {
                debugger
                let invoiceMasterDetails = d.result as M_D_CustomerBillingMasterDetail;
                if ( invoiceMasterDetails != null) {
                    //P_TR_SalesDbCrMasterDetails.P_TR_SalesDbCr = Master;
                    //let Index = GetIndexByUseId(Number(Master.InvoiceId), "PQ_GetSalesDbCr", "InvoiceId", " compCode = " + _CompCode + " and braCode = " + _BraCode);
                    // NavigateToSearchResultKey(Number(Index), Navigate);
                    Display_src(invoiceMasterDetails);
                     
                } else {
                    WorningMessage("لا يوجد فاتورة بهذا الرقم ", "There is no invoice with this no");
                    txtInvNo.value = "";
                }
            }
        });
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
            url: sys.apiUrl("Reports_pdf", "rptInvoiceDbCr"),
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

    function GetCusType() {
        Ajax.Callsync({
            url: Url.Action("GetCusType", "Customers"),
            data: { CusIDType: 'CusIDC' },
            success: (d) => {
                CodesTypes = d.result as Array<P_D_Status>;
                if (CodesTypes.length > 0) {
                    for (var i = 0; i < CodesTypes.length; i++) {
                        $('#ddDbReason').append('<option value="' + CodesTypes[i].StatusCode + '">' + (_ScreenLang == "ar" ? CodesTypes[i].DescA : CodesTypes[i].DescE) + '</option>');
                    }

                }
               
            }
        })

    }
}