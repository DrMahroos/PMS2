$(document).ready(function () {
    MaterialList.InitalizeComponent();
});
var MaterialList;
(function (MaterialList) {
    var txtCatID;
    var txtCatCode;
    var txtCatDesc;
    var butCatCode;
    var txtitmcode;
    var txtDescr;
    var butView;
    var Master = new I_D_Category();
    var Model = new I_D_Category();
    var M_D_itemDetails = /** @class */ (function () {
        function M_D_itemDetails() {
        }
        return M_D_itemDetails;
    }());
    var MasterDetails = new M_D_itemDetails();
    var tbl_DataSource = new Array();
    var DetailsItem = new IQ_GetItemList();
    var ControllerName = "MaterialList";
    var dataSource = new Array();
    var OrgdataSource = new Array();
    var GridParent = new JsGrid();
    var sys = new SystemTools();
    var GridInputClassName = "form-control gridIput";
    var AllCategory = new Array();
    var _itemid;
    var _createdby;
    var _createdAt;
    var _updatedby;
    var _updatedat;
    var _compCode;
    function InitalizeComponent() {
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
        ControlsButtons.EditAction(function () { });
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.UndoAction(function () { });
    }
    MaterialList.InitalizeComponent = InitalizeComponent;
    function Add() {
        ClearGrid(GridParent, new Array());
        dataSource = new Array();
    }
    function InitalizeControls() {
        txtCatID = DocumentActions.GetElementById("txtCatID");
        txtCatDesc = DocumentActions.GetElementById("txtDescA");
        txtCatCode = DocumentActions.GetElementById("txtCatCode");
        butCatCode = DocumentActions.GetElementById("butCatCode");
        AllCategory = Ajax.Call({ url: Url.Action("GetAllCategryMaster", ControllerName) });
        txtitmcode = DocumentActions.GetElementById("txtitmCode");
        txtDescr = DocumentActions.GetElementById("txtitmDesc");
        butView = DocumentActions.GetElementById("butview");
        $("#ModelPreview").val(12);
        _compCode = 0;
    }
    function InitalizeEvents() {
        butCatCode.onclick = butCatCode_Click;
        butView.onclick = Display;
    }
    function butCatCode_Click() {
        sys.FindKey(Modules.MaterialList, "butCatCode", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCategoryByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    Model = d.result;
                    txtCatCode.value = Model.CatCode;
                    txtCatDesc.value = Model.DescL;
                    var _Index = Number(Model.CatID);
                    //let ind = GetIndexByUseId(Number(Model.CatID), "I_D_Category", "CatID")
                    //NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });
        });
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
    function GetItemDetailsList(CatID) {
        var srchDesc = txtDescr.value.toLowerCase();
        var srchitm = txtitmcode.value.toLowerCase();
        Ajax.Callsync({
            url: Url.Action("GetItemDetailsList", ControllerName),
            data: { id: CatID, itmcode: srchitm, itmdscr: srchDesc },
            success: function (d) {
                debugger;
                OrgdataSource = d.result;
                dataSource = OrgdataSource.filter(function (x) { return (x.CatID == CatID || CatID == 0) && (x.ItemCode.toLowerCase().indexOf(srchitm) >= 0 || srchitm == "") && (x.DescL.toLowerCase().indexOf(srchDesc) >= 0 || srchDesc == ""); });
                GridParent.DataSource = dataSource;
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
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Insert", function () {
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
        });
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
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    debugger;
                    SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم الحفظ بنجاح  ", "Data Saved Successfuly. ");
                    MessageBox.Show(msg, "Insert", function () {
                        var Catagory = result.ResponseData;
                        var Catagory_Index = GetIndexByUseId(result.ResponseData, "I_D_Category", "CatID");
                        //NavigateToSearchResultKey(Number(Catagory_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Insert");
            }
        });
    }
    function Assign() {
        Master = DocumentActions.AssignToModel(Model);
        MasterDetails.I_D_Category = Master;
        // Make Category Id take last of AllCategory   
        MasterDetails.I_D_Category.CatID = 0;
        // assign Details
        MasterDetails.I_Item = dataSource;
        for (var _i = 0, dataSource_1 = dataSource; _i < dataSource_1.length; _i++) {
            var itm = dataSource_1[_i];
            itm.CatID = Master.CatID;
            tbl_DataSource.push(itm);
        }
    }
    function AssignUpdate() {
        Master = DocumentActions.AssignToModel(Model);
        MasterDetails.I_D_Category = Master;
        //MasterDetails.I_D_Category.CatID = Master.CatID;
        // assign Details
        MasterDetails.I_Item = dataSource;
        //for (var itm of dataSource) {
        //    itm.CatID = Master.CatID; 
        //    tbl_DataSource.push(itm);
        //}
    }
    function InitalizeGrid() {
        var res = GetResourceList("Resm_Material");
        GridParent.ElementName = "GridParent";
        GridParent.Inserting = SharedSession.CurrentPrivileges.AddNew;
        GridParent.OnRefreshed = function () {
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
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ItemCode", " ");
                    txt.id = "h_ItemCode";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Resm_Material_Materiallistmatcode, txt);
                }
            },
            {
                title: GetResourceByName("Resm_Material_Materiallistdesca"),
                name: "DescA", width: "18.5%", css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescA", " ");
                    txt.id = "h_DescA";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Resm_Material_Materiallistdesca, txt);
                }
            },
            {
                title: GetResourceByName("Resm_Material_Materiallistdescb"),
                name: "DescL", width: "18.5%", css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescL", " ");
                    txt.id = "h_DescL";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Resm_Material_Materiallistdescb, txt);
                }
            },
            {
                title: GetResourceByName("Resm_Material_Materiallistunit"),
                name: "Uom_Code", width: "10.5%", css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var btnFindUnit = DocumentActions.CreateElement("button");
                    btnFindUnit = DocumentActions.CreateElement("button");
                    btnFindUnit.className = "btn btn-primary btn-block addable editable";
                    btnFindUnit.innerText = ClientSharedWork.Session.ScreenLanguage == "ar" ? " الوحدات" : "Load Units";
                    btnFindUnit.id = "btnFindUnit";
                    btnFindUnit.type = "button";
                    btnFindUnit.onclick = function (e) {
                        btnFindUnit_onclick();
                    };
                    return HeaderTemplateNew(res.Resm_Material_Materiallistunit, btnFindUnit);
                }
            },
            {
                title: GetResourceByName("Resm_Material_Materiallistcost"),
                name: "GlobalCost", width: "9.5%", css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "GlobalCost", " ");
                    txt.id = "h_GlobalCost";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Resm_Material_Materiallistcost, txt);
                }
            },
            {
                title: GetResourceByName("Resm_Fld_categorycode"),
                name: "CatCode", width: "10.5%", css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var btnFindCatGrid = DocumentActions.CreateElement("button");
                    btnFindCatGrid = DocumentActions.CreateElement("button");
                    btnFindCatGrid.className = "btn btn-primary btn-block addable editable";
                    btnFindCatGrid.innerText = ClientSharedWork.Session.ScreenLanguage == "ar" ? " الفئة" : "Category";
                    btnFindCatGrid.id = "btnFindCatGrid";
                    btnFindCatGrid.type = "button";
                    btnFindCatGrid.onclick = function (e) {
                        btnFindCatGrid_onclick();
                    };
                    return HeaderTemplateNew("Category", btnFindCatGrid);
                }
            },
            {
                title: "#", name: "btnAddItem", width: "50px",
                headerTemplate: function () {
                    var btn = DocumentActions.CreateElement("button");
                    btn.className = TransparentButton + " addable editable";
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemInGrid";
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddItemInGrid();
                    };
                    return btn;
                },
                // HANDLE DELETE Row in Grid
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.type = "button";
                    btn.className = TransparentButton + " addable editable";
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.name = dataSource.indexOf(item).toString();
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        var index_id = e.currentTarget.id;
                        var index = Number(e.currentTarget.name);
                        dataSource.splice(index, 1);
                        GridParent.DataSource = dataSource;
                        GridParent.Bind();
                        //ReIndexingGrid();
                    };
                    return btn;
                }
            },
            // edit to Grid 
            {
                css: JsGridHeaderCenter,
                width: "50px",
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.type = "button";
                    btn.className = TransparentButton + " addable editable";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.name = dataSource.indexOf(item).toString();
                    btn.onclick = function (e) {
                        var index = Number(e.currentTarget.name);
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
                        $("#btnFindUnit").text(item.Uom_Code);
                        $('#h_UnitId').val(item.UomID.toString());
                        $("#btnFindCatGrid").text(item.CatCode);
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
            WorningMessage("لايمكن اضافة اصناف", "Adding items are not permitted");
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
        sys.FindKey(Modules.MaterialList, "btnFindUnit", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetUnitByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    $('#btnFindUnit').text(result.UomCode);
                    $('#h_UnitId').val(result.UomID);
                }
            });
        });
    }
    function btnFindCatGrid_onclick() {
        sys.FindKey(Modules.MaterialList, "butCatCode", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCategoryByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    $('#btnFindCatGrid').text(result.CatCode);
                    $('#h_CatID').val(result.CatID);
                }
            });
        });
    }
})(MaterialList || (MaterialList = {}));
//# sourceMappingURL=MaterialList.js.map