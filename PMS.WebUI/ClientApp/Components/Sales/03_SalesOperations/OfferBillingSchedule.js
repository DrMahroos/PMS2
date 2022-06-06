$(document).ready(function () {
    OfferBillingSchedule.InitalizeComponent();
});
var OfferBillingSchedule;
(function (OfferBillingSchedule) {
    var ControllerName = "OfferBillingSchedule";
    var Grid = new JsGrid();
    var sys = new SystemTools();
    var GridInputClassName = "form-control";
    var MasterDetails = new M_D_OfferDefDetails();
    var DataSource = new Array();
    var ReturnDataSource = new P_Tr_SalesOfferBilling();
    var Master = new PQ_GetSalesOffer();
    var Details = new Array();
    var DetailsAssignHeader = new PQ_GetSlsOfferBilling();
    var Tbl_DetailBilling = new Array();
    var items = new Array();
    var Grid = new JsGrid();
    var GridInst = new JsGrid();
    var sys = new SystemTools();
    var NumberColumnWidth = "50px";
    var txtTrNo;
    var txtTrDate;
    var txtDescA;
    var txtDescL;
    var txtcus_CustomerCode;
    var txtSlsCust_DescA;
    var txtTrSerial;
    var txtDownPaymentPrc;
    var txtDownPaymentAmount;
    var txtWarrntyPaymentPrc;
    var txtWarrntyPaymentAmount;
    var txtInstalAmount;
    var txtContractPrice;
    var txtStatus;
    var RdProductivity;
    var RdInstallment;
    var txtDiscountPrc;
    var txtDiscountAmount;
    var txtContractNetPrice;
    var btnSerchOffer;
    var btnAuthorize;
    var btnApprove;
    var btnSendToCust;
    var btnCancel;
    var btnReject;
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
        InitalizeGrid();
        SharedSession.CurrentEnvironment.ScreenLanguage = SharedSession.CurrentEnvironment.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.AddButton.disabled = true;
        ControlsButtons.EditAction(Edit);
        ControlsButtons.UndoAction(Undo);
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add) {
                Insert();
            }
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.PrintAction(function () { });
        ControlsButtons.DeleteAction(function () { });
        InitalizeEvents();
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BraCode, Modules.OfferDefinition, Master.OfferID.toString());
        });
    }
    OfferBillingSchedule.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtTrNo = DocumentActions.GetElementById("txtTrNo");
        txtTrDate = DocumentActions.GetElementById("txtTrDate");
        txtDescA = DocumentActions.GetElementById("txtDescA");
        txtDescL = DocumentActions.GetElementById("txtDescL");
        txtcus_CustomerCode = DocumentActions.GetElementById("txtcus_CustomerCode");
        txtSlsCust_DescA = DocumentActions.GetElementById("txtSlsCust_DescA");
        txtTrSerial = DocumentActions.GetElementById("txtTrSerial");
        txtDownPaymentPrc = DocumentActions.GetElementById("txtDownPaymentPrc");
        txtDownPaymentAmount = DocumentActions.GetElementById("txtDownPaymentAmount");
        txtWarrntyPaymentPrc = DocumentActions.GetElementById("txtWarrntyPaymentPrc");
        txtWarrntyPaymentAmount = DocumentActions.GetElementById("txtWarrntyPaymentAmount");
        txtContractPrice = DocumentActions.GetElementById("txtContractPrice");
        txtInstalAmount = DocumentActions.GetElementById("txtInstalAmount");
        txtStatus = DocumentActions.GetElementById("txtStatus");
        RdProductivity = DocumentActions.GetElementById("RdProductivity");
        RdInstallment = DocumentActions.GetElementById("RdInstallment");
        txtDiscountPrc = DocumentActions.GetElementById("txtDiscountPrc");
        txtDiscountAmount = DocumentActions.GetElementById("txtDiscountAmount");
        txtContractNetPrice = DocumentActions.GetElementById("txtContractNetPrice");
        btnSerchOffer = DocumentActions.GetElementById("btnSerchOffer");
        btnAuthorize = DocumentActions.GetElementById("btnAuthorize");
        btnApprove = document.getElementById("btnApprove");
        btnSendToCust = document.getElementById("btnSendToCust");
        btnCancel = document.getElementById("btnCancel");
        btnReject = document.getElementById("btnReject");
    }
    function InitalizeGrid() {
        var res = GetResourceList("Fld_");
        Grid.ElementName = "Grid";
        Grid.Inserting = SharedSession.CurrentPrivileges.AddNew;
        Grid.OnRefreshed = function () {
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
        Grid.OnItemInserting = function () { };
        Grid.OnItemUpdating = function () { };
        Grid.OnItemDeleting = function () { };
        Grid.Columns = [
            {
                title: res.Fld_Serial, name: "Serial", width: "2.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Serial", " ");
                    txt.id = "h_Serial";
                    txt.disabled = false;
                    return HeaderTemplate("Fld_Serial", txt);
                }
            },
            {
                title: res.Fld_PayDescA, css: "ColumPadding", name: "PayDescA", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "PayDescA", " ");
                    txt.id = "h_PayDescA";
                    txt.disabled = false;
                    return HeaderTemplate("Fld_PayDescA", txt);
                }
            },
            {
                title: res.Fld_PayDescE, css: "ColumPadding", name: "PayDescE", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "PayDescE", " ");
                    txt.disabled = false;
                    txt.id = "h_PayDescE";
                    return HeaderTemplate("Fld_PayDescE", txt);
                }
            },
            {
                title: res.Fld_OfferItemId, visible: RdProductivity.checked, css: "ColumPadding", name: "ItemCode", width: "7.5%",
                headerTemplate: function () {
                    var Select = CreateDropdownList(items, "ItemCode", "ItemCode", "OfferItemId", true);
                    Select.id = "h_OfferItemId";
                    Select.onchange = function (e) {
                        getItemInfo();
                    };
                    return HeaderTemplate("Fld_OfferItemId", Select);
                }
            },
            {
                title: res.Fld_ItemDesc, visible: RdProductivity.checked, css: "ColumPadding", name: "DescE", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescE", " ");
                    txt.disabled = true;
                    txt.id = "h_ItemDesc";
                    return HeaderTemplate("Fld_ItemDesc", txt);
                }
            },
            {
                title: res.Fld_Prodprc, visible: RdProductivity.checked, css: "ColumPadding", name: "ProductionPrc", width: "4.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Prodprc", " ");
                    txt.disabled = false;
                    txt.id = "h_Prodprc";
                    return HeaderTemplate("Fld_Prodprc", txt);
                }
            },
            {
                title: res.Fld_DueDate, css: "ColumPadding", name: "DueDate", width: "7.5%",
                headerTemplate: function () {
                    var txt = CreateElement("date", GridInputClassName, " ", " ", "DueDate", " ");
                    txt.disabled = false;
                    txt.id = "h_DueDate";
                    return HeaderTemplate("Fld_DueDate", txt);
                }
            },
            {
                title: res.Fld_DuePrc, css: "ColumPadding", name: "DuePrc", width: "4.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DuePrc", " ");
                    txt.disabled = false;
                    txt.id = "h_DuePrc";
                    txt.onkeyup = function (e) {
                        clacDuePrc();
                    };
                    return HeaderTemplate("Fld_DuePrc", txt);
                }
            },
            {
                title: res.Fld_DueAmount, css: "ColumPadding", name: "DueAmount", width: "5.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DueAmount", " ");
                    txt.disabled = false;
                    txt.id = "h_DueAmount";
                    return HeaderTemplate("Fld_DueAmount", txt);
                }
            },
            {
                title: res.Fld_Remarks, css: "ColumPadding", name: "Remarks", width: "11.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Remarks", " ");
                    txt.disabled = false;
                    txt.id = "h_Remarks";
                    return HeaderTemplate("Fld_Remarks", txt);
                }
            },
            {
                title: "#", name: "btnAddItem", visible: true, width: NumberColumnWidth,
                headerTemplate: function () {
                    var btn = DocumentActions.CreateElement("button");
                    btn.className = TransparentButton + "editable";
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
                        AddItemInGrid();
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
                    btn.name = Details.indexOf(item).toString();
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        var index = Number(e.currentTarget.name);
                        Details.splice(index, 1);
                        BindDataGrids();
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
                    btn.type = "button";
                    btn.style.color = "forestgreen";
                    btn.name = Details.indexOf(item).toString();
                    btn.onclick = function (e) {
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
                        var index = Number(e.currentTarget.name);
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
            success: function (d) {
                Master = d.result;
                Display();
            }
        });
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
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Update", function () {
                        Display();
                        var _Index = GetIndexByUseId(result.ResponseData, "P_TR_SalesOffer", "OfferID", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        });
    }
    function Edit() {
        items = Ajax.Call({ url: Url.Action("getItems", ControllerName), data: { offerId: Master.OfferID } });
        if (Master.PaymentMethod == 1) {
            RdProductivity.checked = true;
        }
        else {
            RdInstallment.checked = true;
        }
        if (SharedSession.CurrentPrivileges.CUSTOM1 == true) {
            $("#btnAuthorize").removeAttr("disabled");
        }
        else {
            $("#btnAuthorize").attr("disabled", "disabled");
        }
        $('#RdProductivity').removeAttr('disabled');
        $('#RdInstallment').removeAttr('disabled');
    }
    function Undo() {
    }
    function AddItemInGrid() {
        DetailsAssignHeader = new PQ_GetSlsOfferBilling();
        var check = $('#h_PayDescA').val();
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
    function FillInputText(_TextID, _Data) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }
    function BindDataGrids() {
        Grid.DataSource = Details;
        Grid.Bind();
    }
    function getItemInfo() {
        var itm = items.filter(function (x) { return x.OfferItemId == $('#h_OfferItemId').val(); });
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
        }
        else {
            ControlsButtons.EditButton.disabled = true;
        }
    }
    function Assign() {
        DocumentActions.AssignToModel(Master);
        MasterDetails.P_TR_SalesOffer = Master;
        MasterDetails.P_TR_SalesOffer.OfferID = Master.OfferID;
        ;
        //AssignDetails
        MasterDetails.P_Tr_SalesOfferBilling = Details;
        for (var _i = 0, Details_1 = Details; _i < Details_1.length; _i++) {
            var bill = Details_1[_i];
            bill.OfferID = Master.OfferID;
            bill.DueDate = IsNullOrEmpty(bill.DueDate) ? null : DateFormat(bill.DueDate);
            Tbl_DetailBilling.push(bill);
        }
    }
    function getPaymentMethod() {
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
    function LoadDetails(id) {
        Ajax.CallAsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: id },
            success: function (d) {
                Details = d.result;
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
        sys.FindKey(Modules.OfferBillingSchedule, "btnSerchOffer", "CompCode = " + _CompCode + " and BraCode = " + _BraCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("LoadData", ControllerName),
                data: { id: id },
                success: function (d) {
                    Master = d.result;
                    var index = GetIndexByUseId(id, "PQ_GetSalesOffer", "OfferID", " CompCode = " + _CompCode + " and BraCode = " + _BraCode);
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
        }
        else if (Master.PaymentMethod == 2) {
            RdInstallment.checked = true;
            InitalizeGrid();
            BindDataGrids();
        }
    }
    function validation() {
        var sum = 0;
        for (var i = 0; i < Details.length; i++) {
            sum += Number(Details[i].DueAmount);
        }
        return sum;
    }
    function clacDuePrc() {
        var res = Number(((Number(txtInstalAmount.value) * Number($('#h_DuePrc').val())) / 100).toFixed(2));
        $('#h_DueAmount').val(res);
    }
    function CalcDiscountAmount() {
        // CalcDiscountAmount
        if (txtDiscountPrc.value != "") {
            var res = Number((Number(txtDiscountPrc.value) * Number(txtContractPrice.value)) / 100);
            txtDiscountAmount.value = res.toFixed(2).toString();
            // CalcContractNet
            var net = Number(txtContractPrice.value) - Number(txtDiscountAmount.value);
            txtContractNetPrice.value = net.toString();
        }
    }
})(OfferBillingSchedule || (OfferBillingSchedule = {}));
//# sourceMappingURL=OfferBillingSchedule.js.map