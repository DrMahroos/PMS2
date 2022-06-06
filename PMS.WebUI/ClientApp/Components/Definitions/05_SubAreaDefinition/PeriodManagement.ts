$(document).ready(() => {
    PeriodManagement.InitalizeComponent();
});
namespace PeriodManagement {
    var Master: P_G_Period = new P_G_Period();

    var DataSource: Array<P_G_Period> = new Array<P_G_Period>();
    var Details: Array<P_G_Period> = new Array<P_G_Period>();
    var DetailsAssignHeader: P_G_Period = new P_G_Period();
    var Tbl_DetailBilling: Array<P_G_Period> = new Array<P_G_Period>();

    var MasterDetails: M_D_Period = new M_D_Period();
    var Grid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "PeriodManagement";
    const GridInputClassName = "form-control gridIput";
    const NumberColumnWidth = "50px";
    var btnAreacode: HTMLButtonElement;
    var txtBraname: HTMLInputElement;
    var txtYearID: HTMLInputElement;
    var txtAreacode: HTMLInputElement;
    var Periodid: number;

    var _compCode: number;
    var _braCode: number;
    var _yearid: number; 
    var _Lang: string;
    var Closed: boolean; 

    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();

        
        _Lang = SharedSession.CurrentEnvironment.ScreenLanguage;

        ControlsButtons.AddButton.disabled = false;
        ControlsButtons.EditButton.disabled = false;
        ControlsButtons.DeleteButton.disabled = false;
        ControlsButtons.PrintButton.disabled = true;
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.EditAction(() => { });
        ControlsButtons.UndoAction(() => { });
        ControlsButtons.SaveAction(
            () => {
                if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                    Update();
            }
        );
        InitalizeGrid();
        InitalizeControls();
        InitalizeEvents();
        _compCode = Number(SharedSession.CurrentEnvironment.CompCode);

        _braCode = Number(SharedSession.CurrentEnvironment.BranchCode);
        _yearid = Number(ClientSharedWork.Session.CurrentYear);

        txtYearID.value = ClientSharedWork.Session.CurrentYear;
        txtAreacode.value = SharedSession.CurrentEnvironment.BranchCode;;
        GetBranchName(Number(txtAreacode.value));
        LoadDetails(Number(txtYearID.value), Number(txtAreacode.value), Number(_compCode));
        //$("#ImageEditorButton").on("click", () => {
        //    sys.ImgPopup(_compCode, _braCode, Modules.Prepare, Master.PeriodID.toString());
        //});
    }
    function InitalizeGrid() {
        let res: any = GetResourceList("PManag_");
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
                headerTemplate: (): HTMLElement => {
                    let btnopen = CreateElement("label", GridInputClassName, " ", " ", "btnOpen", " ");
                    btnopen.disabled = true;
                    return HeaderTemplateNew(res.PManag_btnOpen, btnopen);
                },
                itemTemplate: (index: string, item: P_G_Period): HTMLButtonElement => {
                    let btnOpen = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnOpen.className = "btn  btn-warning";
                    btnOpen.type = "button";

                    btnOpen.id = "btnOpen" + (item.PeriodID).toString();
                    btnOpen.disabled = (item.Closed == false) || (SharedSession.CurrentPrivileges.CUSTOM2 == false) ; 
                    btnOpen.onclick = (e) => {
                        if (item.Closed == false) {
                            WorningMessage("الفترة مفتوحة بالفعل", "Period already Opened");
                            return;
                        }
                        btnOpen_onclick(item.PeriodID);
                    };
                    btnOpen.innerText = "Open"
                    return btnOpen;
                }
            },
            {
                title: res.PManag_btnClose, name: "", type: "Label", width: "5%",
                headerTemplate: (): HTMLElement => {
                    let ptnclose = CreateElement("label", GridInputClassName, " ", " ", "btnClose", " ");
                    ptnclose.disabled = true;
                    return HeaderTemplateNew(res.PManag_btnClose, ptnclose);
                },
                itemTemplate: (index: string, item: P_G_Period): HTMLButtonElement => {
                    let btnClose = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnClose.className = "btn  btn-warning";
                    btnClose.type = "button";

                    btnClose.id = "btnOpen" + (item.PeriodID).toString();
                    btnClose.disabled = (item.Closed == true) || (SharedSession.CurrentPrivileges.CUSTOM1 == false); 
                    btnClose.onclick = (e) => {
                        if (item.Closed == true) {
                            WorningMessage("الفترة مغلقة بالفعل", "Period already Closed");
                            return;
                        }
                        btnClose_onclick(item.PeriodID);
                    };
                    btnClose.innerText = "Close"
                    return btnClose;
                }
            },
            {
                title: res.PManag_PeriodCode, name: "PeriodCode", type: "Label", width: "3%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "PeriodCode", " ");
                    txt.id = "h_periodcode";
                    txt.disabled = true;
                    
                    return HeaderTemplateNew(res.PManag_PeriodCode, txt);
                }
            },
            {
                title: res.PManag_DescA, visible: _Lang == "ar", name: "DescA", type: "Label", width: "5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_DescA";
                    txt.disabled = true;
                   
                    return HeaderTemplateNew(res.PManag_DescA, txt);
                }
            },
            {
                title: res.PManag_DescE, visible: _Lang == "en", name: "DescE", type: "Label", width: "5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescE", " ");
                    txt.id = "h_DescE";
                    txt.disabled = true;
                   
                    return HeaderTemplateNew(res.PManag_DescE, txt);
                }
            },
            {
                title: res.PManag_FromDate, name: "FromDate", type: "Label", width: "6%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "FromDate", " ");
                    txt.id = "h_FromDate";
                    txt.disabled = true;
                  
                    return HeaderTemplateNew(res.PManag_FromDate, txt);
                }
            },
            {
                title: res.PManag_ToDate,  name: "ToDate", type: "Label", width: "6%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ToDate", " ");
                    txt.id = "h_ToDate";
                    txt.disabled = true;
                   
                    return HeaderTemplateNew(res.PManag_ToDate, txt);
                }
            },
            {
                title: res.PManag_closed, name: "Closed", type: "Label", width: "5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "Closed", " ");
                    txt.id = "h_Closed";
                    txt.disabled = true;
                    

                    return HeaderTemplateNew(res.PManag_closed, txt);
                }
            },
            {
                title: res.PManag_closed, name: "ProdBudget", type: "Label", width: "5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ProdBudget", " ");
                    txt.id = "h_ProdBudget";
                    txt.disabled = false;


                    return HeaderTemplateNew(res.PManag_ProdBudget, txt);
                }
            },
           
            {
                title: res.PManag_MPOH,  name: "StdProdOHMaterial", type: "Label", width: "5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "StdProdOHMaterial", " ");
                    txt.id = "h_StdProdOHMaterial";
                    txt.disabled = false;
                    
                    return HeaderTemplateNew(res.PManag_MPOH, txt);
                }
            },
            {
                title: res.PManag_LPOH, name: "StdProdOHLabor", type: "Label", width: "5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "StdProdOHLabor", " ");
                    txt.id = "h_StdProdOHLabor";
                    txt.disabled = false;
                   
                    return HeaderTemplateNew(res.PManag_LPOH, txt);
                }
            },
            {
                title: res.PManag_EPOH,  name: "StdProdOHEquip", type: "Label", width: "5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "StdProdOHEquip", " ");
                    txt.id = "h_StdProdOHEquip";
                    txt.disabled = false;
                     
                    return HeaderTemplateNew(res.PManag_EPOH, txt);
                }
            },
            {
                title: res.PManag_SPOH, name: "StdProdOHSubContractor", type: "Label", width: "5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "StdProdOHSubContractor", " ");
                    txt.id = "h_StdProdOHSubContractor";
                    txt.disabled = false;
                    
                    return HeaderTemplateNew(res.PManag_SPOH, txt);
                }
            },
            {
                title: res.PManag_ExPOH, name: "StdProdOHExpenses", type: "Label", width: "5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "StdProdOHExpenses", " ");
                    txt.id = "h_StdProdOHExpenses";
                    txt.disabled = false;
                    
                    return HeaderTemplateNew(res.PManag_ExPOH, txt);
                }
            },
            {
                title: res.PManag_MOH,  name: "StdOHMaterial", type: "Label", width: "5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "StdOHMaterial", " ");
                    txt.id = "h_StdOHMaterial";
                    txt.disabled = false;
                    
                    return HeaderTemplateNew(res.PManag_MOH, txt);
                }
            },
            {
                title: res.PManag_LOH,name: "StdOHLabor", type: "Label", width: "5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "StdOHLabor", " ");
                    txt.id = "h_StdOHLabor";
                    txt.disabled = false;
                    
                    return HeaderTemplateNew(res.PManag_LOH, txt);
                }
            },
            {
                title: res.PManag_EOH,  name: "StdOHEquip", type: "Label", width: "5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "StdOHEquip", " ");
                    txt.id = "h_StdOHEquip";
                    txt.disabled = false;
                     
                    return HeaderTemplateNew(res.PManag_EOH, txt);
                }
            },
            {
                title: res.PManag_SOH,  name: "StdOHSubContractor", type: "Label", width: "5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "StdOHSubContractor", " ");
                    txt.id = "h_StdOHSubContractor";
                    txt.disabled = false;
                   
                    return HeaderTemplateNew(res.PManag_SOH, txt);
                }
            },
            {
                title: res.PManag_ExOH,  name: "StdOHExpenses", type: "Label", width: "5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "StdOHExpenses", " ");
                    txt.id = "h_StdOHExpenses";
                    txt.disabled = false;
                    
                    return HeaderTemplateNew(res.PManag_ExOH, txt);
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
            }
            ,
            {
                css: JsGridHeaderCenter,
                width: NumberColumnWidth,
                itemTemplate: (s: string, item: P_G_Period): HTMLButtonElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.className = TransparentButton + "editable";
                    btn.type = "button";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.name = Details.indexOf(item).toString();
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        //Edit
                        debugger
                        Periodid = item.PeriodID;
                        closed = item.Closed; 
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        Details.splice(index, 1);
                        Grid.DataSource = Details;
                        Grid.Bind();

                        FillInputText('h_closed', item.Closed);
                        FillInputText('h_periodcode',item.PeriodCode);
                        FillInputText('h_DescA',item.DescA);
                        FillInputText('h_DescE',item.DescE);
                        FillInputText('h_FromDate',item.FromDate);
                        FillInputText('h_ToDate', item.ToDate);
                        FillInputText('h_ProdBudget', item.ProdBudget);
                        FillInputText('h_StdProdOHMaterial',item.StdProdOHMaterial);
                        FillInputText('h_StdProdOHLabor',item.StdProdOHLabor);
                        FillInputText('h_StdProdOHEquip',item.StdProdOHEquip);
                        FillInputText('h_StdProdOHExpenses',item.StdProdOHExpenses);
                        FillInputText('h_StdProdOHSubContractor',item.StdProdOHSubContractor);
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
        btnAreacode = DocumentActions.GetElementById<HTMLButtonElement>("btnAreacode");
        txtYearID = DocumentActions.GetElementById<HTMLInputElement>("txtYearID");
        txtBraname = DocumentActions.GetElementById<HTMLInputElement>("txtBraname");
        txtAreacode = DocumentActions.GetElementById<HTMLInputElement>("txtAreacode");
    }

    function InitalizeEvents() {
        btnAreacode.onclick = btnAreacode_Click;
    }

    function AddItemInGrid() {
        if ($('#h_periodcode').val() == " " || IsNullOrEmpty($('#h_periodcode').val()) ) {
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

    function btnClose_onclick(id: number) {

        //Master.Closed = true;
        Ajax.Callsync({
            url: Url.Action("MonthClose", ControllerName),
            data: { PeriodId: id },
            success: (d) => {
                debugger;
                var _Result = d.result as ResponseResult;
                if (_Result.ResponseState == true) {
                    if (_Result.ResponseData == 0)
                        LoadDetails(Number(txtYearID.value), Number(_braCode), Number(_compCode));
                    else
                        WorningMessage("لا يمكن اغلاق الفترة يوجد مشاريع بانتاجية غير صحية بعدد " + _Result.ResponseData, "Can not Close Period , there are projects with wrong production count: " + _Result.ResponseData);
                } else {
                    WorningMessage(_Result.ResponseMessage, _Result.ResponseMessage);
                }
            }
        })
    }

    function btnAreacode_Click() {
        //debugger;
        sys.FindKey(Modules.PeriodManagement, "btnAreacode", "COMP_CODE = " + _compCode + " and user_Code = '" + SharedSession.CurrentEnvironment.UserCode+ "' and [execute]=1", () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", "PeriodManagement"),
                data: { id: id },
                success: (d) => {
                    let Area = d.result as G_BRANCH;
                    txtAreacode.value = Area.BRA_CODE.toString();
                    _Lang == "ar" ? txtBraname.value = Area.BRA_DESC : txtBraname.value = Area.BRA_DESCE;
                    _braCode = Area.BRA_CODE; 
                    LoadDetails(Number(txtYearID.value), Number(txtAreacode.value), Number(_compCode));
                }
            });
        });
    }

    function btnClc_onclick(id: number) {
        Ajax.CallAsync({
            url: Url.Action("MonthCalcProdCost", ControllerName),
            data: { PeriodId: id },
            success: (d) => {
                var _Result = d.result as ResponseResult;
                if (_Result.ResponseState == true) {
                    Grid.Refresh;
                    LoadDetails(Number(txtYearID.value), Number(_compCode), Number(_braCode));

                } else {
                    WorningMessage(_Result.ResponseMessage, _Result.ResponseMessage);
                }

            }

        })
    }

    function btnOpen_onclick(id: number) {

        let row: Array<P_G_Period> = Details.filter(x => x.PeriodID == id);
        row[0].Closed = false;
        Ajax.CallAsync({
            url: Url.Action("Open", ControllerName),
            data: row[0],
            success: (d) => {
                LoadDetails(Number(txtYearID.value), Number(_braCode), Number(_compCode));
            }
        });
    }

    function Navigate() {

        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),

            success: (d) => {

                Master = d.result as P_G_Period;
                Display();
            }
        })
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

    function LoadDetails(yearid: number, bracode: number, compcode: number) {
        // send br , comp , year 
        Ajax.Callsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { yearid: yearid, bracode: bracode, compcode: compcode },
            success: (d) => {
                
                Details = d.result as Array<P_G_Period>;
                for (var item of Details) {
                    item.FromDate = DateFormat(item.FromDate);
                    item.ToDate = DateFormat(item.ToDate);
                    if (item.Closed == true) {
                        item.Closed = true;
                    } else {
                        item.Closed =  false;
                    }
                }
                Grid.DataSource = Details;
                Grid.Bind();
            }
        })
    }

    function CalcTotal() {
        /* sum of 5 next col */

        for (var item of DataSource) {
            item.Total = Number((item.EquipmentCost + item.ExpensesCost + item.LabourCost + item.MaterialCost + item.SubContractorCost).toFixed(2));
        }
    }

    function Update() {

        //Assign();
        debugger;
        Ajax.Callsync({
            url: Url.Action("Update", ControllerName),
            data: { JsonData: JSON.stringify(Details) },
            success: (d) => {
                let result = d.result as ResponseResult;
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
        DocumentActions.AssignToModel<P_G_Period>(Master);
        MasterDetails.P_G_Period = Master as P_G_Period;
        MasterDetails.P_G_Period.PeriodID = Master.PeriodID;

        //AssignDetails
        MasterDetails.P_G_PeriodDetail = Details as Array<P_G_Period>;
        for (var per of Details) {
            //per.PeriodID = Master.PeriodID;
            per.CompCode = Number(_compCode);
            per.BraCode = Number(txtAreacode.value);
            per.YearID = Number(txtYearID.value);
            //per.DescA = per.DescA;
            per.DescE = per.DescE;
            Tbl_DetailBilling.push(per);
        }
    }

    function GetBranchName(id: number) {
        Ajax.CallAsync({
            url: Url.Action("getArea", ControllerName),
            data: { id: id },
            success: (d) => {

                let result: G_BRANCH = d.result as G_BRANCH;
                txtBraname.value = result.BRA_DESCE;
            }
        });
    }

    function FillInputText(_TextID: string, _Data: any) {
        $("#" + _TextID).text(_Data);
        $("#" + _TextID).val(_Data);
    }
}





