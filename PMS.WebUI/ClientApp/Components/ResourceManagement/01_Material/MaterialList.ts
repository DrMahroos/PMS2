$(document).ready(() => {
    MaterialList.InitalizeComponent();
});

namespace MaterialList {
    var txtCatID: HTMLInputElement;
    var txtCatCode: HTMLInputElement;
    var txtCatDesc: HTMLInputElement;
    var butCatCode: HTMLButtonElement;
    var txtitmcode: HTMLInputElement;
    var txtDescr: HTMLInputElement;
    var butView: HTMLButtonElement;
    var Master: I_D_Category = new I_D_Category();
    var Model: I_D_Category = new I_D_Category();
    class M_D_itemDetails {
        public I_D_Category: I_D_Category;
        public I_Item: Array<I_Item>;
    }
    var MasterDetails: M_D_itemDetails = new M_D_itemDetails();
    var tbl_DataSource: Array<IQ_GetItemList> = new Array<IQ_GetItemList>();
    var DetailsItem: IQ_GetItemList = new IQ_GetItemList();
    const ControllerName: string = "MaterialList";
    var dataSource: Array<IQ_GetItemList> = new Array<IQ_GetItemList>();
    var OrgdataSource: Array<IQ_GetItemList> = new Array<IQ_GetItemList>();
    var GridParent: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    const GridInputClassName = "form-control gridIput";
    var AllCategory: Array<I_D_Category> = new Array<I_D_Category>();
    var _itemid: number;
    var _createdby: string;
    var _createdAt: string;
    var _updatedby: string;
    var _updatedat: string;
    var _compCode: number;
    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        ControlsButtons.AddButton.disabled = false;
        ControlsButtons.EditButton.disabled = false;
        ControlsButtons.DeleteButton.disabled = false;
        ControlsButtons.PrintButton.disabled = false;
        InitalizeControls();
        InitalizeEvents(); 
        InitalizeGrid();
        SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
        //NavigatorComponent.InitalizeComponent();
        //ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.EditAction(() => { });
        ControlsButtons.SaveAction(
            () => {
                if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                    Insert();
                else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                    Update();
            }
        );
        ControlsButtons.UndoAction(() => { });
     
    }
    function Add() {
        ClearGrid(GridParent, new Array<Number>());
        dataSource = new Array<IQ_GetItemList>();
    }
    function InitalizeControls() {
        txtCatID = DocumentActions.GetElementById<HTMLInputElement>("txtCatID");
        txtCatDesc = DocumentActions.GetElementById<HTMLInputElement>("txtDescA");
        txtCatCode = DocumentActions.GetElementById<HTMLInputElement>("txtCatCode");
        butCatCode = DocumentActions.GetElementById<HTMLButtonElement>("butCatCode");
        AllCategory = Ajax.Call<Array<I_D_Category>>({ url: Url.Action("GetAllCategryMaster", ControllerName) });
        txtitmcode = DocumentActions.GetElementById<HTMLInputElement>("txtitmCode");
        txtDescr = DocumentActions.GetElementById<HTMLInputElement>("txtitmDesc");
        butView = DocumentActions.GetElementById<HTMLButtonElement>("butview");
        $("#ModelPreview").val(12); 
        _compCode = 0; 
    }

    function InitalizeEvents() {
        butCatCode.onclick = butCatCode_Click;
        butView.onclick = Display; 
    }

    function butCatCode_Click() {
        
        sys.FindKey(Modules.MaterialList, "butCatCode", "", () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCategoryByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    Model = d.result as I_D_Category;
                    txtCatCode.value = Model.CatCode;
                    txtCatDesc.value = Model.DescL; 
                    let _Index: number = Number(Model.CatID);

                    //let ind = GetIndexByUseId(Number(Model.CatID), "I_D_Category", "CatID")
                    //NavigateToSearchResultKey(Number(ind), Navigate);

                }
            });
        })
    }

    //function Navigate() {
        
    //    Ajax.CallAsync({
    //        url: Url.Action("GetByIndex", ControllerName),
    //        success: (d) => {
    //            Model = d.result as I_D_Category;;
    //            Display();
    //        }
    //    })
    //}

    function Display() {
        debugger;
        DocumentActions.RenderFromModel(Model);
        GetItemDetailsList(Model.CatID);
        
    }

    function GetItemDetailsList(CatID: number) {
        var srchDesc = txtDescr.value.toLowerCase();
        var srchitm = txtitmcode.value.toLowerCase();
        Ajax.Callsync({
            url: Url.Action("GetItemDetailsList", ControllerName),
            data: { id: CatID, itmcode: srchitm, itmdscr: srchDesc  },
            success: (d) => {
                debugger;
                OrgdataSource = d.result
                dataSource = OrgdataSource.filter(x => (x.CatID == CatID || CatID == 0) && (x.ItemCode.toLowerCase().indexOf(srchitm) >= 0 || srchitm == "") && (x.DescL.toLowerCase().indexOf(srchDesc) >= 0 || srchDesc == ""));
                GridParent.DataSource = dataSource
                GridParent.Bind();
            }
        });
    }

    function Update() {
        
        AssignUpdate();
        Master.CompCode = Number(ClientSharedWork.Session.CompCode);
        Ajax.CallAsync({
            url: Url.Action("Update", ControllerName),
            data: { JsonData: JSON.stringify(MasterDetails) },
            success: (d) => {
                
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Insert", () => {
                        
                        Display();
                        $("#ModelPreview").val(12); 
                        //let _Index = GetIndexByUseId(result.ResponseData, "I_D_Category", "CatID");
                        //NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
                else {
                    MessageBox.Show(result.ResponseMessage, "Insert");
                }
            }
        })
    }
    function Insert() {
        
        Model = new I_D_Category();
        Assign();
        // check for details
        Model.CompCode = Number(ClientSharedWork.Session.CompCode);
        Ajax.CallAsync({
            url: Url.Action("Insert", ControllerName),
            data: {
                JsonData: JSON.stringify(MasterDetails)
            },
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    debugger
                    SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم الحفظ بنجاح  ", "Data Saved Successfuly. ");
                    MessageBox.Show(msg, "Insert", () => {
                        let Catagory = result.ResponseData as I_D_Category;
                        let Catagory_Index = GetIndexByUseId(result.ResponseData, "I_D_Category", "CatID");
                        //NavigateToSearchResultKey(Number(Catagory_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Insert");
            }
        });
    }

    function Assign() {
        
        Master = DocumentActions.AssignToModel<I_D_Category>(Model);
        MasterDetails.I_D_Category = Master as I_D_Category;
        // Make Category Id take last of AllCategory   
         MasterDetails.I_D_Category.CatID = 0;
        // assign Details
        
        MasterDetails.I_Item = dataSource as Array<I_Item>;
        for (var itm of dataSource) {
            itm.CatID = Master.CatID;
            tbl_DataSource.push(itm);
        }

    }

    function AssignUpdate() {
        
        Master = DocumentActions.AssignToModel<I_D_Category>(Model);
        

        MasterDetails.I_D_Category = Master as I_D_Category;
        //MasterDetails.I_D_Category.CatID = Master.CatID;

        // assign Details
        
        MasterDetails.I_Item = dataSource as Array<I_Item>;
        //for (var itm of dataSource) {
        //    itm.CatID = Master.CatID; 
        //    tbl_DataSource.push(itm);
        //}

    }




    function InitalizeGrid() {
        let res: any = GetResourceList("Resm_Material");
        GridParent.ElementName = "GridParent";
        GridParent.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridParent.OnRefreshed = () => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
            }
            else {
                $(".editable").removeAttr("disabled");
                $(".addable").removeAttr("disabled");
            }
        };
        GridParent.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridParent.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridParent.InsertionMode = JsGridInsertionMode.Binding;
        GridParent.Columns = [
            {
                title: GetResourceByName("Resm_Material_Materiallistmatcode"), 
                name: "ItemCode", width: "10.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ItemCode", " ");
                    txt.id = "h_ItemCode"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Resm_Material_Materiallistmatcode, txt);
                }
            }
            ,
            {
                title: GetResourceByName("Resm_Material_Materiallistdesca"),
                name: "DescA", width: "18.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_DescA"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Resm_Material_Materiallistdesca, txt);
                }
            }
            ,
            {
                title: GetResourceByName("Resm_Material_Materiallistdescb"),
                name: "DescL", width: "18.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescL", " ");
                    txt.id = "h_DescL"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Resm_Material_Materiallistdescb, txt);
                }
            }
            ,
            {
                title: GetResourceByName("Resm_Material_Materiallistunit"),
                name: "Uom_Code", width: "10.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let btnFindUnit: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindUnit = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindUnit.className = "btn btn-primary btn-block addable editable";
                    btnFindUnit.innerText = ClientSharedWork.Session.ScreenLanguage == "ar" ? " الوحدات" : "Load Units";
                    btnFindUnit.id = "btnFindUnit";
                    btnFindUnit.type = "button";
                    btnFindUnit.onclick = (e) => {
                        btnFindUnit_onclick();
                    };
                    return HeaderTemplateNew(res.Resm_Material_Materiallistunit, btnFindUnit);
                }

            },
            {
                title: GetResourceByName("Resm_Material_Materiallistcost"),
                name: "GlobalCost", width: "9.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "GlobalCost", " ");
                    txt.id = "h_GlobalCost"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Resm_Material_Materiallistcost, txt);
                }
            }
            ,
            {
                title: GetResourceByName("Resm_Fld_categorycode"),
                name: "CatCode", width: "10.5%", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let btnFindCatGrid: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindCatGrid = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindCatGrid.className = "btn btn-primary btn-block addable editable";
                    btnFindCatGrid.innerText = ClientSharedWork.Session.ScreenLanguage == "ar" ? " الفئة" : "Category";
                    btnFindCatGrid.id = "btnFindCatGrid";
                    btnFindCatGrid.type = "button";
                    btnFindCatGrid.onclick = (e) => {
                        btnFindCatGrid_onclick();
                    };
                    return HeaderTemplateNew("Category", btnFindCatGrid);
                }

            }
            ,
            {
                title: "#", name: "btnAddItem",  width: "50px",
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton + " addable editable";
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemInGrid";
                    btn.onclick = (e) => {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        
                        AddItemInGrid();
                    };
                    return btn;
                },
                // HANDLE DELETE Row in Grid
                itemTemplate: (s: string, item: IQ_GetItemList): HTMLButtonElement => {
                    let btn: HTMLInputElement = DocumentActions.CreateElement<HTMLInputElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.type = "button";
                    btn.className = TransparentButton + " addable editable";
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";

                    btn.name = dataSource.indexOf(item).toString();
                    btn.onclick = (e) => {
                        
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        let index_id = (e.currentTarget as HTMLButtonElement).id;
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        dataSource.splice(index, 1);
                        GridParent.DataSource = dataSource;
                        GridParent.Bind();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            }
            ,
            // edit to Grid 
            {
                css: JsGridHeaderCenter,
                width: "50px",
                itemTemplate: (s: string, item: IQ_GetItemList): HTMLButtonElement => {

                    let btn: HTMLInputElement = DocumentActions.CreateElement<HTMLInputElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.type = "button";
                    btn.className = TransparentButton + " addable editable";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.name = dataSource.indexOf(item).toString();
                    btn.onclick = (e) => {

                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        dataSource.splice(index, 1);
                        GridParent.DataSource = dataSource;
                        GridParent.Bind();
                        //ReIndexingGrid();
                        _itemid = item.ItemID; 
                        _createdby = item.CreatedBy;
                        _createdAt = item.CreatedAt;
                        _updatedby = item.UpdatedBy; 
                        _updatedat = item.UpdatedAt;
                        _compCode = item.CompCode;
                        
                        $("#btnFindUnit").text(item.Uom_Code)
                        $('#h_UnitId').val(item.UomID.toString());
                        $("#btnFindCatGrid").text(item.CatCode)
                        $('#h_CatId').val(item.CatID.toString());
                        $("#h_ItemCode").val(item.ItemCode.toString());
                        $("#h_DescA").val(item.DescA.toString());
                        $("#h_DescL").val(item.DescL);
                        $("#h_GlobalCost").val(item.GlobalCost.toString());                     
                    };
                    return btn;
                }
            }
            //,
            //{ title: res.Resm_Material_Materiallistmatcode, name: "ItemCode", type: "text", width: "7.5%" },
            //{ title: res.Resm_Material_Materiallistdesca, name: "DescA", type: "text", width: "7.5%" },
            //{ title: res.Resm_Material_Materiallistdescb, name: "DescL", type: "text", width: "7.5%" },
            //{ title: res.Resm_Material_Materiallistunit, name: "UomID", type: "number", width: "7.5%" },
            //{ title: res.Resm_Material_Materiallistcost, name: "UnitPrice", type: "number", width: "7.5%" },
            //{ type: "control", width: "3%" }
        ];
        GridParent.DataSource = dataSource;
        GridParent.Bind();
    }
    function AddItemInGrid() {
        if (_compCode == 0) {
            WorningMessage("لايمكن اضافة اصناف", "Adding items are not permitted")
            return;
        }
        DetailsItem = new IQ_GetItemList();
        DetailsItem.ItemID = _itemid; 
        DetailsItem.CreatedBy = _createdby;
        DetailsItem.CreatedAt = _createdAt;
        DetailsItem.UpdatedBy = _updatedby;
        DetailsItem.UpdatedAt = _updatedat;
        DetailsItem.CompCode = _compCode;
        DetailsItem.ItemCode = $('#h_ItemCode').val();
        DetailsItem.DescA = $('#h_DescA').val();
        DetailsItem.DescL = $('#h_DescL').val();
        DetailsItem.UomID = Number($('#h_UnitId').val());
        DetailsItem.Uom_Code = $('#btnFindUnit').text();
        DetailsItem.GlobalCost = $('#h_GlobalCost').val();
        DetailsItem.CatID = Number($('#h_CatID').val());
        DetailsItem.CatCode = $('#btnFindCatGrid').text();     
        dataSource.unshift(DetailsItem);
        GridParent.DataSource = dataSource;
        GridParent.Bind();
        _compCode = 0; 
    }

    function btnFindUnit_onclick() {
        
        sys.FindKey(Modules.MaterialList, "btnFindUnit", "", () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetUnitByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as I_D_UOM;
                    $('#btnFindUnit').text(result.UomCode);
                    $('#h_UnitId').val(result.UomID);
                }
            });
        })
    }
    function btnFindCatGrid_onclick() {
           sys.FindKey(Modules.MaterialList, "butCatCode", "", () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCategoryByID", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as I_D_Category;
                    $('#btnFindCatGrid').text(result.CatCode);
                    $('#h_CatID').val(result.CatID);
                }
            });
        })
    }
}