$(document).ready(function () {
    PeriodManagement.InitalizeComponent();
});
var PeriodManagement;
(function (PeriodManagement) {
    var Master = new P_G_Period();
    var DataSource = new Array();
    var Details = new Array();
    var DetailsAssignHeader = new P_G_Period();
    var Tbl_DetailBilling = new Array();
    var MasterDetails = new M_D_Period();
    var Grid = new JsGrid();
    var sys = new SystemTools();
    var ControllerName = "PeriodManagement";
    var GridInputClassName = "form-control gridIput";
    var NumberColumnWidth = "50px";
    var btnAreacode;
    var txtBraname;
    var txtYearID;
    var txtAreacode;
    var Periodid;
    var _compCode;
    var _braCode;
    var _yearid;
    var _Lang;
    var Closed;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _Lang = SharedSession.CurrentEnvironment.ScreenLanguage;
        ControlsButtons.AddButton.disabled = false;
        ControlsButtons.EditButton.disabled = false;
        ControlsButtons.DeleteButton.disabled = false;
        ControlsButtons.PrintButton.disabled = true;
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.EditAction(function () { });
        ControlsButtons.UndoAction(function () { });
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        InitalizeGrid();
        InitalizeControls();
        InitalizeEvents();
        _compCode = Number(SharedSession.CurrentEnvironment.CompCode);
        _braCode = Number(SharedSession.CurrentEnvironment.BranchCode);
        _yearid = Number(ClientSharedWork.Session.CurrentYear);
        txtYearID.value = ClientSharedWork.Session.CurrentYear;
        txtAreacode.value = SharedSession.CurrentEnvironment.BranchCode;
        ;
        GetBranchName(Number(txtAreacode.value));
        LoadDetails(Number(txtYearID.value), Number(txtAreacode.value), Number(_compCode));
        //$("#ImageEditorButton").on("click", () => {
        //    sys.ImgPopup(_compCode, _braCode, Modules.Prepare, Master.PeriodID.toString());
        //});
    }
    PeriodManagement.InitalizeComponent = InitalizeComponent;
    function InitalizeGrid() {
        var res = GetResourceList("PManag_");
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
        Grid.ConfirmDeleteing = false;
        Grid.InsertionMode = JsGridInsertionMode.Binding;
        Grid.Inserting = false;
        Grid.Columns = [
            //{
            //    title: res.PManag_btnClc, name: "", type: "Label", width: "5%",
            //    headerTemplate: (): HTMLElement => {
            //        let ptnclc = CreateElement("label", GridInputClassName, " ", " ", "btnClc", " ");
            //        ptnclc.disabled = true;
            //        return HeaderTemplateNew(res.PManag_btnClc, ptnclc);
            //    },
            //    itemTemplate: (index: string, item: P_G_Period): HTMLButtonElement => {
            //        let btnClc = DocumentActions.CreateElement<HTMLButtonElement>("button");
            //        btnClc.className = "btn  btn-warning";
            //        btnClc.type = "button";
            //        btnClc.id = (item.PeriodID).toString();
            //        btnClc.onclick = (e) => {
            //            btnClc_onclick(item.PeriodID);
            //        };
            //        btnClc.innerText = "Calculate"
            //        return btnClc;
            //    }
            //},
            {
                title: res.PManag_btnOpen, name: "", type: "Label", width: "5%",
                headerTemplate: function () {
                    var btnopen = CreateElement("label", GridInputClassName, " ", " ", "btnOpen", " ");
                    btnopen.disabled = true;
                    return HeaderTemplateNew(res.PManag_btnOpen, btnopen);
                },
                itemTemplate: function (index, item) {
                    var btnOpen = DocumentActions.CreateElement("button");
                    btnOpen.className = "btn  btn-warning";
                    btnOpen.type = "button";
                    btnOpen.id = "btnOpen" + (item.PeriodID).toString();
                    btnOpen.disabled = (item.Closed == false) || (SharedSession.CurrentPrivileges.CUSTOM2 == false);
                    btnOpen.onclick = function (e) {
                        if (item.Closed == false) {
                            WorningMessage("الفترة مفتوحة بالفعل", "Period already Opened");
                            return;
                        }
                        btnOpen_onclick(item.PeriodID);
                    };
                    btnOpen.innerText = "Open";
                    return btnOpen;
                }
            },
            {
                title: res.PManag_btnClose, name: "", type: "Label", width: "5%",
                headerTemplate: function () {
                    var ptnclose = CreateElement("label", GridInputClassName, " ", " ", "btnClose", " ");
                    ptnclose.disabled = true;
                    return HeaderTemplateNew(res.PManag_btnClose, ptnclose);
                },
                itemTemplate: function (index, item) {
                    var btnClose = DocumentActions.CreateElement("button");
                    btnClose.className = "btn  btn-warning";
                    btnClose.type = "button";
                    btnClose.id = "btnOpen" + (item.PeriodID).toString();
                    btnClose.disabled = (item.Closed == true) || (SharedSession.CurrentPrivileges.CUSTOM1 == false);
                    btnClose.onclick = function (e) {
                        if (item.Closed == true) {
                            WorningMessage("الفترة مغلقة بالفعل", "Period already Closed");
                            return;
                        }
                        btnClose_onclick(item.PeriodID);
                    };
                    btnClose.innerText = "Close";
                    return btnClose;
                }
            },
            {
                title: res.PManag_PeriodCode, name: "PeriodCode", type: "Label", width: "3%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "PeriodCode", " ");
                    txt.id = "h_periodcode";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.PManag_PeriodCode, txt);
                }
            },
            {
                title: res.PManag_DescA, visible: _Lang == "ar", name: "DescA", type: "Label", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_DescA";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.PManag_DescA, txt);
                }
            },
            {
                title: res.PManag_DescE, visible: _Lang == "en", name: "DescE", type: "Label", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescE", " ");
                    txt.id = "h_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.PManag_DescE, txt);
                }
            },
            {
                title: res.PManag_FromDate, name: "FromDate", type: "Label", width: "6%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "FromDate", " ");
                    txt.id = "h_FromDate";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.PManag_FromDate, txt);
                }
            },
            {
                title: res.PManag_ToDate, name: "ToDate", type: "Label", width: "6%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ToDate", " ");
                    txt.id = "h_ToDate";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.PManag_ToDate, txt);
                }
            },
            {
                title: res.PManag_closed, name: "Closed", type: "Label", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "Closed", " ");
                    txt.id = "h_Closed";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.PManag_closed, txt);
                }
            },
            {
                title: res.PManag_closed, name: "ProdBudget", type: "Label", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ProdBudget", " ");
                    txt.id = "h_ProdBudget";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.PManag_ProdBudget, txt);
                }
            },
            {
                title: res.PManag_MPOH, name: "StdProdOHMaterial", type: "Label", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "StdProdOHMaterial", " ");
                    txt.id = "h_StdProdOHMaterial";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.PManag_MPOH, txt);
                }
            },
            {
                title: res.PManag_LPOH, name: "StdProdOHLabor", type: "Label", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "StdProdOHLabor", " ");
                    txt.id = "h_StdProdOHLabor";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.PManag_LPOH, txt);
                }
            },
            {
                title: res.PManag_EPOH, name: "StdProdOHEquip", type: "Label", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "StdProdOHEquip", " ");
                    txt.id = "h_StdProdOHEquip";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.PManag_EPOH, txt);
                }
            },
            {
                title: res.PManag_SPOH, name: "StdProdOHSubContractor", type: "Label", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "StdProdOHSubContractor", " ");
                    txt.id = "h_StdProdOHSubContractor";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.PManag_SPOH, txt);
                }
            },
            {
                title: res.PManag_ExPOH, name: "StdProdOHExpenses", type: "Label", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "StdProdOHExpenses", " ");
                    txt.id = "h_StdProdOHExpenses";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.PManag_ExPOH, txt);
                }
            },
            {
                title: res.PManag_MOH, name: "StdOHMaterial", type: "Label", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "StdOHMaterial", " ");
                    txt.id = "h_StdOHMaterial";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.PManag_MOH, txt);
                }
            },
            {
                title: res.PManag_LOH, name: "StdOHLabor", type: "Label", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "StdOHLabor", " ");
                    txt.id = "h_StdOHLabor";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.PManag_LOH, txt);
                }
            },
            {
                title: res.PManag_EOH, name: "StdOHEquip", type: "Label", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "StdOHEquip", " ");
                    txt.id = "h_StdOHEquip";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.PManag_EOH, txt);
                }
            },
            {
                title: res.PManag_SOH, name: "StdOHSubContractor", type: "Label", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "StdOHSubContractor", " ");
                    txt.id = "h_StdOHSubContractor";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.PManag_SOH, txt);
                }
            },
            {
                title: res.PManag_ExOH, name: "StdOHExpenses", type: "Label", width: "5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "StdOHExpenses", " ");
                    txt.id = "h_StdOHExpenses";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.PManag_ExOH, txt);
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
                //    itemTemplate: (s: string, item: P_G_Period): HTMLButtonElement => {
                //        let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                //        btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                //        btn.className = TransparentButton + "editable";
                //        btn.style.fontSize = "24px";
                //        btn.type = "button";
                //        btn.style.color = "red";
                //        btn.name = Details.indexOf(item).toString();
                //        btn.onclick = (e) => {
                //            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                //                WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                //                return;
                //            }
                //            let index = Number((e.currentTarget as HTMLButtonElement).name);
                //            Details.splice(index, 1);
                //        };
                //        return btn;
                //    },
            },
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.type = "button";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.name = Details.indexOf(item).toString();
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        //Edit
                        debugger;
                        Periodid = item.PeriodID;
                        closed = item.Closed;
                        var index = Number(e.currentTarget.name);
                        Details.splice(index, 1);
                        Grid.DataSource = Details;
                        Grid.Bind();
                        FillInputText('h_closed', item.Closed);
                        FillInputText('h_periodcode', item.PeriodCode);
                        FillInputText('h_DescA', item.DescA);
                        FillInputText('h_DescE', item.DescE);
                        FillInputText('h_FromDate', item.FromDate);
                        FillInputText('h_ToDate', item.ToDate);
                        FillInputText('h_ProdBudget', item.ProdBudget);
                        FillInputText('h_StdProdOHMaterial', item.StdProdOHMaterial);
                        FillInputText('h_StdProdOHLabor', item.StdProdOHLabor);
                        FillInputText('h_StdProdOHEquip', item.StdProdOHEquip);
                        FillInputText('h_StdProdOHExpenses', item.StdProdOHExpenses);
                        FillInputText('h_StdProdOHSubContractor', item.StdProdOHSubContractor);
                        FillInputText('h_StdOHMaterial', item.StdOHMaterial);
                        FillInputText('h_StdOHLabor', item.StdOHLabor);
                        FillInputText('h_StdOHEquip', item.StdOHEquip);
                        FillInputText('h_StdOHExpenses', item.StdOHExpenses);
                        FillInputText('h_StdOHSubContractor', item.StdOHSubContractor);
                    };
                    return btn;
                }
            }
        ];
        Grid.DataSource = Details;
        Grid.Bind();
    }
    function InitalizeControls() {
        btnAreacode = DocumentActions.GetElementById("btnAreacode");
        txtYearID = DocumentActions.GetElementById("txtYearID");
        txtBraname = DocumentActions.GetElementById("txtBraname");
        txtAreacode = DocumentActions.GetElementById("txtAreacode");
    }
    function InitalizeEvents() {
        btnAreacode.onclick = btnAreacode_Click;
    }
    function AddItemInGrid() {
        if ($('#h_periodcode').val() == " " || IsNullOrEmpty($('#h_periodcode').val())) {
            WorningMessage("لايمكن اضافة فترات", "Can not Add new record");
            return;
        }
        DetailsAssignHeader = new P_G_Period();
        DetailsAssignHeader.CompCode = _compCode;
        DetailsAssignHeader.BraCode = _braCode;
        DetailsAssignHeader.YearID = _yearid;
        DetailsAssignHeader.PeriodID = Periodid;
        DetailsAssignHeader.PeriodCode = Number($('#h_periodcode').val());
        DetailsAssignHeader.DescA = $('#h_DescA').val();
        DetailsAssignHeader.DescE = $('#h_DescE').val();
        DetailsAssignHeader.FromDate = $('#h_FromDate').val();
        DetailsAssignHeader.ToDate = $('#h_ToDate').val();
        DetailsAssignHeader.Closed = closed;
        DetailsAssignHeader.ProdBudget = Number($('#h_ProdBudget').val());
        DetailsAssignHeader.StdProdOHMaterial = Number($('#h_StdProdOHMaterial').val());
        DetailsAssignHeader.StdProdOHLabor = Number($('#h_StdProdOHLabor').val());
        DetailsAssignHeader.StdProdOHEquip = Number($('#h_StdProdOHEquip').val());
        DetailsAssignHeader.StdProdOHExpenses = Number($('#h_StdProdOHExpenses').val());
        DetailsAssignHeader.StdProdOHSubContractor = Number($('#h_StdProdOHSubContractor').val());
        DetailsAssignHeader.StdOHMaterial = Number($('#h_StdOHMaterial').val());
        DetailsAssignHeader.StdOHLabor = Number($('#h_StdOHLabor').val());
        DetailsAssignHeader.StdOHEquip = Number($('#h_StdOHEquip').val());
        DetailsAssignHeader.StdOHExpenses = Number($('#h_StdOHExpenses').val());
        DetailsAssignHeader.StdOHSubContractor = Number($('#h_StdOHSubContractor').val());
        Details.unshift(DetailsAssignHeader);
        Grid.DataSource = Details;
        Grid.Bind();
    }
    function btnClose_onclick(id) {
        //Master.Closed = true;
        Ajax.Callsync({
            url: Url.Action("MonthClose", ControllerName),
            data: { PeriodId: id },
            success: function (d) {
                debugger;
                var _Result = d.result;
                if (_Result.ResponseState == true) {
                    if (_Result.ResponseData == 0)
                        LoadDetails(Number(txtYearID.value), Number(_braCode), Number(_compCode));
                    else
                        WorningMessage("لا يمكن اغلاق الفترة يوجد مشاريع بانتاجية غير صحية بعدد " + _Result.ResponseData, "Can not Close Period , there are projects with wrong production count: " + _Result.ResponseData);
                }
                else {
                    WorningMessage(_Result.ResponseMessage, _Result.ResponseMessage);
                }
            }
        });
    }
    function btnAreacode_Click() {
        //debugger;
        sys.FindKey(Modules.PeriodManagement, "btnAreacode", "COMP_CODE = " + _compCode + " and user_Code = '" + SharedSession.CurrentEnvironment.UserCode + "' and [execute]=1", function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "PeriodManagement"),
                data: { id: id },
                success: function (d) {
                    var Area = d.result;
                    txtAreacode.value = Area.BRA_CODE.toString();
                    _Lang == "ar" ? txtBraname.value = Area.BRA_DESC : txtBraname.value = Area.BRA_DESCE;
                    _braCode = Area.BRA_CODE;
                    LoadDetails(Number(txtYearID.value), Number(txtAreacode.value), Number(_compCode));
                }
            });
        });
    }
    function btnClc_onclick(id) {
        Ajax.CallAsync({
            url: Url.Action("MonthCalcProdCost", ControllerName),
            data: { PeriodId: id },
            success: function (d) {
                var _Result = d.result;
                if (_Result.ResponseState == true) {
                    Grid.Refresh;
                    LoadDetails(Number(txtYearID.value), Number(_compCode), Number(_braCode));
                }
                else {
                    WorningMessage(_Result.ResponseMessage, _Result.ResponseMessage);
                }
            }
        });
    }
    function btnOpen_onclick(id) {
        var row = Details.filter(function (x) { return x.PeriodID == id; });
        row[0].Closed = false;
        Ajax.CallAsync({
            url: Url.Action("Open", ControllerName),
            data: row[0],
            success: function (d) {
                LoadDetails(Number(txtYearID.value), Number(_braCode), Number(_compCode));
            }
        });
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
    function Display() {
        txtYearID.value = ClientSharedWork.Session.CurrentYear;
        txtAreacode.value = _braCode.toString();
        GetBranchName(Number(txtAreacode.value));
        //DocumentActions.RenderFromModel(Master);
        LoadDetails(Number(txtYearID.value), (_braCode), (_compCode));
        ClientSharedWork.CurrentMode = ScreenModes.Query;
        //if (Master.Closed == true) {
        //    ControlsButtons.EditButton.disabled = true;
        //} else {
        //    ControlsButtons.EditButton.disabled = false;
        //}
    }
    function LoadDetails(yearid, bracode, compcode) {
        // send br , comp , year 
        Ajax.Callsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { yearid: yearid, bracode: bracode, compcode: compcode },
            success: function (d) {
                Details = d.result;
                for (var _i = 0, Details_1 = Details; _i < Details_1.length; _i++) {
                    var item = Details_1[_i];
                    item.FromDate = DateFormat(item.FromDate);
                    item.ToDate = DateFormat(item.ToDate);
                    if (item.Closed == true) {
                        item.Closed = true;
                    }
                    else {
                        item.Closed = false;
                    }
                }
                Grid.DataSource = Details;
                Grid.Bind();
            }
        });
    }
    function CalcTotal() {
        /* sum of 5 next col */
        for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
            var item = DataSource_1[_i];
            item.Total = Number((item.EquipmentCost + item.ExpensesCost + item.LabourCost + item.MaterialCost + item.SubContractorCost).toFixed(2));
        }
    }
    function Update() {
        //Assign();
        debugger;
        Ajax.Callsync({
            url: Url.Action("Update", ControllerName),
            data: { JsonData: JSON.stringify(Details) },
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    WorningMessage("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    Display();
                    //let _Index = GetIndexByUseId(result.ResponseData, "P_G_Period", "PeriodID");
                    //NavigateToSearchResultKey(Number(_Index), Navigate);
                }
                else
                    WorningMessage("خطأ في التعديل   ", "Data Not Updated . ");
            }
        });
        //LoadDetails(_yearid, _braCode, _compCode);
    }
    function Assign() {
        debugger;
        DocumentActions.AssignToModel(Master);
        MasterDetails.P_G_Period = Master;
        MasterDetails.P_G_Period.PeriodID = Master.PeriodID;
        //AssignDetails
        MasterDetails.P_G_PeriodDetail = Details;
        for (var _i = 0, Details_2 = Details; _i < Details_2.length; _i++) {
            var per = Details_2[_i];
            //per.PeriodID = Master.PeriodID;
            per.CompCode = Number(_compCode);
            per.BraCode = Number(txtAreacode.value);
            per.YearID = Number(txtYearID.value);
            //per.DescA = per.DescA;
            per.DescE = per.DescE;
            Tbl_DetailBilling.push(per);
        }
    }
    function GetBranchName(id) {
        Ajax.CallAsync({
            url: Url.Action("getArea", ControllerName),
            data: { id: id },
            success: function (d) {
                var result = d.result;
                txtBraname.value = result.BRA_DESCE;
            }
        });
    }
    function FillInputText(_TextID, _Data) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }
})(PeriodManagement || (PeriodManagement = {}));
//# sourceMappingURL=PeriodManagement.js.map