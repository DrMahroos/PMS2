$(document).ready(() => {
    OfferBillingSchedule.InitalizeComponent();
});
namespace OfferBillingSchedule {
    const ControllerName: string = "OfferBillingSchedule";
    var Grid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    const GridInputClassName = "form-control";
    var MasterDetails: M_D_OfferDefDetails = new M_D_OfferDefDetails(); 

    var DataSource: Array<P_Tr_SalesOfferBilling> = new Array<P_Tr_SalesOfferBilling>();
    var ReturnDataSource: P_Tr_SalesOfferBilling = new P_Tr_SalesOfferBilling();
    var Master: PQ_GetSalesOffer = new PQ_GetSalesOffer();
    var Details: Array<PQ_GetSlsOfferBilling> = new Array<PQ_GetSlsOfferBilling>();
    var DetailsAssignHeader: PQ_GetSlsOfferBilling = new PQ_GetSlsOfferBilling();
    var Tbl_DetailBilling: Array<PQ_GetSlsOfferBilling> = new Array<PQ_GetSlsOfferBilling>();

    var items: Array<PQ_Sales_SrchOfferItem> = new Array<PQ_Sales_SrchOfferItem>();
    var Grid: JsGrid = new JsGrid();
    var GridInst: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    const NumberColumnWidth = "50px"; 

    var txtTrNo: HTMLInputElement;
    var txtTrDate: HTMLInputElement;
    var txtDescA: HTMLInputElement;
    var txtDescL: HTMLInputElement;
    var txtcus_CustomerCode: HTMLInputElement;
    var txtSlsCust_DescA: HTMLInputElement;
    var txtTrSerial: HTMLInputElement;
    var txtDownPaymentPrc: HTMLInputElement;
    var txtDownPaymentAmount: HTMLInputElement;
    var txtWarrntyPaymentPrc: HTMLInputElement;
    var txtWarrntyPaymentAmount: HTMLInputElement;
    var txtInstalAmount: HTMLInputElement;
    var txtContractPrice: HTMLInputElement;
    var txtStatus: HTMLInputElement;
    var RdProductivity: HTMLInputElement;
    var RdInstallment: HTMLInputElement;
    var txtDiscountPrc: HTMLInputElement;
    var txtDiscountAmount: HTMLInputElement;
    var txtContractNetPrice: HTMLInputElement;
    var btnSerchOffer: HTMLButtonElement;
    var btnAuthorize: HTMLButtonElement;
    var btnApprove: HTMLButtonElement;
    var btnSendToCust: HTMLButtonElement;
    var btnCancel: HTMLButtonElement;
    var btnReject: HTMLButtonElement;
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
        InitalizeGrid();
        SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditAction(Edit);
        ControlsButtons.UndoAction(Undo);
        ControlsButtons.SaveAction(
            () => {
                if (ClientSharedWork.CurrentMode == ScreenModes.Add) {
                    
                    Insert();
                }
                else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                    Update();
            }
        );
        ControlsButtons.PrintAction(() => { });
        ControlsButtons.DeleteAction(() => { });
        
        InitalizeEvents();


        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_CompCode, _BraCode, Modules.OfferDefinition, Master.OfferID.toString());
        });


    }

    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById <HTMLInputElement>("txtTrNo");
        txtTrDate = DocumentActions.GetElementById<HTMLInputElement>("txtTrDate");
        txtDescA = DocumentActions.GetElementById<HTMLInputElement>("txtDescA");
        txtDescL = DocumentActions.GetElementById<HTMLInputElement>("txtDescL");
        txtcus_CustomerCode = DocumentActions.GetElementById<HTMLInputElement>("txtcus_CustomerCode");
        txtSlsCust_DescA = DocumentActions.GetElementById<HTMLInputElement>("txtSlsCust_DescA");
        txtTrSerial = DocumentActions.GetElementById<HTMLInputElement>("txtTrSerial");
        txtDownPaymentPrc = DocumentActions.GetElementById<HTMLInputElement>("txtDownPaymentPrc");
        txtDownPaymentAmount = DocumentActions.GetElementById<HTMLInputElement>("txtDownPaymentAmount");
        txtWarrntyPaymentPrc = DocumentActions.GetElementById<HTMLInputElement>("txtWarrntyPaymentPrc");
        txtWarrntyPaymentAmount = DocumentActions.GetElementById<HTMLInputElement>("txtWarrntyPaymentAmount");
        txtContractPrice = DocumentActions.GetElementById<HTMLInputElement>("txtContractPrice");
        txtInstalAmount = DocumentActions.GetElementById<HTMLInputElement>("txtInstalAmount");
        txtStatus = DocumentActions.GetElementById<HTMLInputElement>("txtStatus");
        RdProductivity = DocumentActions.GetElementById<HTMLInputElement>("RdProductivity");
        RdInstallment = DocumentActions.GetElementById<HTMLInputElement>("RdInstallment");
        txtDiscountPrc = DocumentActions.GetElementById<HTMLInputElement>("txtDiscountPrc");
        txtDiscountAmount = DocumentActions.GetElementById<HTMLInputElement>("txtDiscountAmount");
        txtContractNetPrice = DocumentActions.GetElementById<HTMLInputElement>("txtContractNetPrice");
        btnSerchOffer = DocumentActions.GetElementById<HTMLButtonElement>("btnSerchOffer");
        btnAuthorize = DocumentActions.GetElementById<HTMLButtonElement>("btnAuthorize");
        btnApprove = document.getElementById("btnApprove") as HTMLButtonElement;
        btnSendToCust = document.getElementById("btnSendToCust") as HTMLButtonElement;
        btnCancel = document.getElementById("btnCancel") as HTMLButtonElement;
        btnReject = document.getElementById("btnReject") as HTMLButtonElement;
    }

    function InitalizeGrid() {
        let res: any = GetResourceList("Fld_");
        Grid.ElementName = "Grid";
        Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
        Grid.OnRefreshed = () => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        Grid.Editing = SharedSession.CurrentPrivileges.EDIT;
        Grid.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        Grid.InsertionMode = JsGridInsertionMode.Binding;
        Grid.OnItemInserting = () => { };
        Grid.OnItemUpdating = () => { };
        Grid.OnItemDeleting = () => { };
        Grid.Columns = [
            {
                title: res.Fld_Serial, name: "Serial", width: "2.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Serial", " ");
                    txt.id = "h_Serial"
                    txt.disabled = false;
                    return HeaderTemplate("Fld_Serial", txt);
                }
            },
            {
                title: res.Fld_PayDescA, css: "ColumPadding", name: "PayDescA", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "PayDescA", " ");
                    txt.id = "h_PayDescA"
                    txt.disabled = false;
                    return HeaderTemplate("Fld_PayDescA", txt);
                }
            },
            {
                title: res.Fld_PayDescE, css: "ColumPadding", name: "PayDescE", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "PayDescE", " ");
                    txt.disabled = false;
                    txt.id = "h_PayDescE";
                    return HeaderTemplate("Fld_PayDescE", txt);
                }
            },
            {
                title: res.Fld_OfferItemId, visible: RdProductivity.checked, css: "ColumPadding", name: "ItemCode", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let Select = CreateDropdownList<PQ_Sales_SrchOfferItem>(items, "ItemCode", "ItemCode", "OfferItemId", true);
                    Select.id = "h_OfferItemId"
                    Select.onchange = (e) => {
                        getItemInfo();
                    }
                    return HeaderTemplate("Fld_OfferItemId", Select);
                }
            },
            {
                title: res.Fld_ItemDesc, visible: RdProductivity.checked, css: "ColumPadding", name: "DescE", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescE", " ");
                    txt.disabled = true;
                    txt.id = "h_ItemDesc";
                    return HeaderTemplate("Fld_ItemDesc", txt);
                }
            },
            {
                title: res.Fld_Prodprc, visible: RdProductivity.checked, css: "ColumPadding", name: "ProductionPrc", width: "4.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Prodprc", " ");
                    txt.disabled = false;
                    txt.id = "h_Prodprc";
                    return HeaderTemplate("Fld_Prodprc", txt);
                }
            },
            {
                title: res.Fld_DueDate, css: "ColumPadding", name: "DueDate", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("date", GridInputClassName, " ", " ", "DueDate", " ");
                    txt.disabled = false;
                    txt.id = "h_DueDate";
                    return HeaderTemplate("Fld_DueDate", txt);
                }
            },
            {
                title: res.Fld_DuePrc, css: "ColumPadding", name: "DuePrc", width: "4.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DuePrc", " ");
                    txt.disabled = false;
                    
                    txt.id = "h_DuePrc";
                    txt.onkeyup = (e) => {
                        clacDuePrc();
                    };
                    return HeaderTemplate("Fld_DuePrc", txt);
                }
            },
            {
                title: res.Fld_DueAmount, css: "ColumPadding", name: "DueAmount", width: "5.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DueAmount", " ");
                    txt.disabled = false;
                    txt.id = "h_DueAmount"
                    return HeaderTemplate("Fld_DueAmount", txt);
                }
            },
            {
                title: res.Fld_Remarks, css: "ColumPadding", name: "Remarks", width: "11.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Remarks", " ");
                    txt.disabled = false;
                    txt.id = "h_Remarks";
                    return HeaderTemplate("Fld_Remarks", txt);
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
                        
                        AddItemInGrid();
                    };
                    return btn;
                },
                itemTemplate: (s: string, item: PQ_GetSlsOfferBilling): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "24px";
                    btn.type = "button";
                    btn.style.color = "red";
                    btn.name = Details.indexOf(item).toString();
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        Details.splice(index, 1);
                        BindDataGrids();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            }
            ,
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: (s: string, item: PQ_GetSlsOfferBilling): HTMLButtonElement => {

                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton;
                    btn.style.fontSize = "20px";
                    btn.type = "button";
                    btn.style.color = "forestgreen";
                    btn.name = Details.indexOf(item).toString();
                    btn.onclick = (e) => {
                        
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        
                        DetailsAssignHeader = new PQ_GetSlsOfferBilling();
                        DetailsAssignHeader.Serial = item.Serial;
                        DetailsAssignHeader.PayDescA = item.PayDescA;
                        DetailsAssignHeader.PayDescE = item.PayDescE;
                        DetailsAssignHeader.OfferItemId = isNaN(item.OfferItemId) ? 0 : item.OfferItemId;
                        DetailsAssignHeader.ItemCode = item.ItemCode;
                        DetailsAssignHeader.DescA = item.DescA;
                        DetailsAssignHeader.DescE = item.DescE;
                        DetailsAssignHeader.ProductionPrc = item.ProductionPrc;
                        DetailsAssignHeader.DueDate = item.DueDate;
                        DetailsAssignHeader.DuePrc = item.DuePrc;
                        DetailsAssignHeader.DueAmount = item.DueAmount;
                        DetailsAssignHeader.Remarks = item.Remarks;

                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        Details.splice(index, 1);
                        BindDataGrids();
                        //ReIndexingGrid();
                        
                        FillInputText("h_Serial", DetailsAssignHeader.Serial.toString());
                        FillInputText("h_PayDescA", DetailsAssignHeader.PayDescA);
                        FillInputText("h_PayDescE", DetailsAssignHeader.PayDescE);
                        if (!IsNullOrEmpty(DetailsAssignHeader.OfferItemId.toString())) {
                            $('#h_OfferItemId option:selected').val(DetailsAssignHeader.OfferItemId.toString());
                        }
                        if (!IsNullOrEmpty(DetailsAssignHeader.ItemCode.toString())) {
                            $('#h_OfferItemId option:selected').text(DetailsAssignHeader.ItemCode.toString());
                        }
                        
                        FillInputText("h_ItemDesc", DetailsAssignHeader.DescE);
                        if (!IsNullOrEmpty(DetailsAssignHeader.ProductionPrc)) {
                            FillInputText("h_Prodprc", DetailsAssignHeader.ProductionPrc.toString());
                        }
                        FillInputText("h_DueDate", DetailsAssignHeader.DueDate);
                        FillInputText("h_DuePrc", DetailsAssignHeader.DuePrc.toString());
                        FillInputText("h_DueAmount", DetailsAssignHeader.DueAmount.toString());
                        FillInputText("h_Remarks", DetailsAssignHeader.Remarks.toString());
                    };
                    return btn;
                }
            }
        ];
        Grid.DataSource = Details;
        Grid.Bind();
    }

    function InitalizeEvents() {
        
        RdProductivity.onchange = InitalizeGrid;
        RdInstallment.onchange = InitalizeGrid;
        txtDownPaymentPrc.onkeyup = totalCalculation;
        txtDiscountPrc.onkeyup = CalcDiscountAmount;

        txtWarrntyPaymentPrc.onkeyup = totalWarentCalc;
        btnSerchOffer.onclick = btn_SearchOffer;
        btnAuthorize.onclick = btnAuthorize_onclick;
    }

    function btnAuthorize_onclick() {
        
        if (validation() != Number(txtInstalAmount.value)) {
            WorningMessage("مجموع الأقساط لا تساوي قيمة المشروع ", "Total Installment Amount Must Equals The Project Value ");
            //$('#btnAuthorize').attr('disabled','disabled');
            return;
        }
        $("#txtStatus").val("2");
    }
    
    function Navigate() {
        
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {
                
                Master = d.result as PQ_GetSalesOffer;
                Display();
            }
        })
    }

    function Add() {

    } 

    function Insert() {
        
        //Master = new PQ_GetSlsOfferBilling;
        //Assign();
        //AssignTrDetails();
        //AssignDetails();
        //Master.CompCode = Number(_CompCode);
        //Ajax.CallAsync({
        //    url: Url.Action("Insert", ControllerName),
        //    data: Master,
        //    success: (d) => {
        //        let result = d.result as ResponseResult;
        //        if (result.ResponseState == true) {
        //            ClientSharedWork.SwitchModes(ScreenModes.Query);
        //            let msg: string = ReturnMsg("تم الحفظ بنجاح  ", "Data Insert Successfuly. ");
        //            MessageBox.Show(msg, "Insert", () => {
        //                Display();
        //                let _Index = GetIndexByUseId(Master.OfferID, "P_TR_SalesOffer", "OfferID");
        //                NavigateToSearchResultKey(Number(_Index), Navigate);
        //            });
        //        }
        //    }
        //})
    }

    function Update() {
        
        Assign();
        if (validation() != Number(txtInstalAmount.value)) {
            WorningMessage("الكمية يجب ان تكون متساوية", "The Installment Amount Must Equal The Sum Of Due Amount");
            //$('#btnAuthorize').attr('disabled');
            return;
        }
        Master.PaymentMethod = getPaymentMethod();
        Master.TrDate = DateFormat(Master.TrDate);
        Master.CompCode = Number(_CompCode);
        Master.DownPaymentAmount = Number(Number(txtDownPaymentAmount.value).toFixed(2));
        Ajax.CallAsync({
            url: Url.Action("UpdateBilling", ControllerName),
            data: { JsonData: JSON.stringify(MasterDetails) },
            success: (d) => {
                let result = d.result as ResponseResult;
                
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Update", () => {
                        Display();
                        
                        let _Index = GetIndexByUseId(result.ResponseData, "P_TR_SalesOffer", "OfferID", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        })
    }

    function Edit() {
        
        items = Ajax.Call<Array<PQ_Sales_SrchOfferItem>>({ url: Url.Action("getItems", ControllerName), data: { offerId: Master.OfferID } });
        if (Master.PaymentMethod == 1) {
            RdProductivity.checked = true;
        } else {
            RdInstallment.checked = true;
        }
        if (SharedSession.CurrentPrivileges.CUSTOM1 == true) {
            $("#btnAuthorize").removeAttr("disabled");
        } else {
            $("#btnAuthorize").attr("disabled", "disabled");
        }
        $('#RdProductivity').removeAttr('disabled');
        $('#RdInstallment').removeAttr('disabled');
    }

    function Undo() {

    }

    function AddItemInGrid() {
        
        DetailsAssignHeader = new PQ_GetSlsOfferBilling();
        let check = $('#h_PayDescA').val();
        if (check == " ") {
            WorningMessage("لا يمكن اضافة بيانات فارغة", "Please Add Data to insert in to Grid");
            return;
        }
        DetailsAssignHeader.Serial = $('#h_Serial').val();
        DetailsAssignHeader.PayDescA = $('#h_PayDescA').val();
        DetailsAssignHeader.PayDescE = $('#h_PayDescE').val();
        DetailsAssignHeader.OfferItemId = $('#h_OfferItemId').val();
        DetailsAssignHeader.ItemCode = $('#h_OfferItemId option:selected').text();
        DetailsAssignHeader.DescE = $('#h_ItemDesc').val();
        DetailsAssignHeader.ProductionPrc = $('#h_Prodprc').val();
        DetailsAssignHeader.DueDate = $('#h_DueDate').val();
        DetailsAssignHeader.DuePrc = $('#h_DuePrc').val();
        DetailsAssignHeader.DueAmount = $('#h_DueAmount').val();
        DetailsAssignHeader.Remarks = $('#h_Remarks').val();
        Details.unshift(DetailsAssignHeader);
        BindDataGrids();
    }

    function FillInputText(_TextID: string, _Data: string) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }

    function BindDataGrids() {
        Grid.DataSource = Details;
        Grid.Bind();
    }

    function getItemInfo() {
        let itm: Array<PQ_Sales_SrchOfferItem> = items.filter(x => x.OfferItemId == $('#h_OfferItemId').val());
        $('#h_ItemDesc').val(itm[0].DescE);
    }

    function Display() {
        
        DocumentActions.RenderFromModel(Master);
        txtTrDate.value = DateFormat(Master.TrDate);
        calcInst();
        getRadioValue();
        LoadDetails(Number(Master.OfferID));
        
        if (Master.Status == 1 && SharedSession.CurrentPrivileges.EDIT == true) {
            ControlsButtons.EditButton.disabled = false;
        } else {
            ControlsButtons.EditButton.disabled = true;
        }
    }

    function Assign() {
        
        DocumentActions.AssignToModel<PQ_GetSalesOffer>(Master);
        MasterDetails.P_TR_SalesOffer = Master as PQ_GetSalesOffer;
        MasterDetails.P_TR_SalesOffer.OfferID = Master.OfferID;;

        
        //AssignDetails
        MasterDetails.P_Tr_SalesOfferBilling = Details as Array<PQ_GetSlsOfferBilling>;
        for (var bill of Details) {
            bill.OfferID = Master.OfferID;
            bill.DueDate = IsNullOrEmpty(bill.DueDate) ? null: DateFormat(bill.DueDate);
            Tbl_DetailBilling.push(bill);
        }
    }

    function getPaymentMethod(): number {
        
        if (RdProductivity.checked == true) {
            return 1;
        }
        else if (RdInstallment.checked == true) {
            return 2;
        }
    }

    function totalCalculation() {
        if (txtDownPaymentPrc.value != "") {
            txtDownPaymentAmount.value = ((Number(txtContractNetPrice.value) * Number(txtDownPaymentPrc.value)) / 100).toFixed(2).toString();
            txtInstalAmount.value = (Number(txtContractNetPrice.value) - Number(txtDownPaymentAmount.value)).toFixed(2).toString();
        }
    }

    function totalWarentCalc() {
        if (txtWarrntyPaymentPrc.value != "") {
            txtWarrntyPaymentAmount.value = ((Number(txtContractNetPrice.value) * Number(txtWarrntyPaymentPrc.value)) / 100).toFixed(2).toString();
        }
    }

    function LoadDetails(id: number) {
        
        Ajax.CallAsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: id },
            success: (d) => {
                
                Details = d.result as Array<PQ_GetSlsOfferBilling>;
                Grid.DataSource = Details;
                for (var i = 0; i < Details.length; i++) {
                    Details[i].DueDate = IsNullOrEmpty(Details[i].DueDate) ? null : DateFormat(Details[i].DueDate);
                }
                Grid.Bind();
                GridInst.DataSource = Details;
                GridInst.Bind();
            }
        });
    }

    function calcInst() {
        txtInstalAmount.value = (Number(txtContractNetPrice.value) - Number(txtDownPaymentAmount.value)).toFixed(2).toString();
    }

    function btn_SearchOffer() {
        
        sys.FindKey(Modules.OfferBillingSchedule, "btnSerchOffer", "CompCode = " + _CompCode + " and BraCode = " + _BraCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("LoadData", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    Master = d.result as PQ_GetSalesOffer;
                    
                    let index: string = GetIndexByUseId(id, "PQ_GetSalesOffer", "OfferID", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                    NavigateToSearchResultKey(Number(index), Navigate);
                }
            });
        });
    }

    function getRadioValue() {
        
        if (Master.PaymentMethod == 1) {
            RdProductivity.checked = true;
            InitalizeGrid();
            BindDataGrids();
        } else if (Master.PaymentMethod == 2) {
            RdInstallment.checked = true;
            InitalizeGrid();
            BindDataGrids();
        }
    }

    function validation(): number {
        
        var sum: number = 0;
        for (var i = 0; i < Details.length; i++) {
            sum += Number(Details[i].DueAmount);
        }
        return sum;
    }

    function clacDuePrc() {
        
        let res: number = Number(((Number(txtInstalAmount.value) * Number($('#h_DuePrc').val())) / 100).toFixed(2));
        $('#h_DueAmount').val(res);
    }

    function CalcDiscountAmount() {
        
        // CalcDiscountAmount
        if (txtDiscountPrc.value != "") {
            let res: number = Number((Number(txtDiscountPrc.value) * Number(txtContractPrice.value)) / 100);
            txtDiscountAmount.value = res.toFixed(2).toString();
            // CalcContractNet
            let net: number = Number(txtContractPrice.value) - Number(txtDiscountAmount.value);
            txtContractNetPrice.value = net.toString();
        }
    }
}