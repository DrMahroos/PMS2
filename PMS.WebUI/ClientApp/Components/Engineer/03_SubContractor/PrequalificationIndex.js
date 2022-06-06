$(document).ready(function () {
    Prequalification.InitalizeComponent();
});
var Prequalification;
(function (Prequalification) {
    var ControllerName = "Prequalification";
    var Model = new P_D_SubCandidate();
    var Master = new P_D_SubCandidate();
    var txtSubCandidateId;
    var txtCandidateCode;
    var txtDescA;
    var txtDescE;
    var txtSubContractorCode;
    var txtCrNo;
    var txtContactPerson;
    var txtChamberNo;
    var txtTel1;
    var txtTel2;
    var txtVatNo;
    var txtContractLimit;
    var txtMobile;
    var txtSpecialty;
    var txtEmail;
    var txtSubContractorAddress;
    var txtRemarks;
    var txtBraCode;
    var butBraCode;
    var chkVatType;
    var txtAreaName;
    var Area = new G_BRANCH();
    var butCandidateCode;
    var DataSource = new Array();
    var tbl_DataSource = new Array();
    var Grid = new JsGrid();
    var sys = new SystemTools();
    var ajaxCall = new AjaxCaller();
    var old_CrNo;
    var DetailsAssignHeaderScope = new P_D_Scope();
    var columnWidth = "100px";
    var M_D_SubCandidateDetails = /** @class */ (function () {
        function M_D_SubCandidateDetails() {
        }
        return M_D_SubCandidateDetails;
    }());
    var DetailsAssignHeaderCabdidateScope = new PQ_GetEngSubCandidateScope();
    var DetailsSubCanditeScope = new Array();
    var GridInputClassName = "form-control gridIput";
    var MasterDetails = new M_D_SubCandidateDetails();
    var AllSubCandidate = new Array();
    //var return_row_scope: P_D_SubCandidateScope = new P_D_SubCandidateScope();
    var _ScreenLanguage;
    var _CompCode;
    var _BranchCode;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        ControlsButtons.AddButton.disabled = false;
        ControlsButtons.EditButton.disabled = false;
        ControlsButtons.DeleteButton.disabled = false;
        ControlsButtons.PrintButton.disabled = false;
        InitalizeControls();
        InitalizeEvents();
        ajaxCall.ControllerName = "Prequalification";
        InitalizephaseGrid();
        SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.EditAction(function () { });
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        // ControlsButtons.DeleteAction(() => { });
        ControlsButtons.UndoAction(function () { });
        $("#H_Dropapproval").change(function () { DropapprovalChange(); });
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.Prequalification, Master.SubContractorID.toString());
        });
    }
    Prequalification.InitalizeComponent = InitalizeComponent;
    function DropapprovalChange() {
        var _Val = Number($("#H_Dropapproval").val());
        if (_Val == 0) {
        }
        debugger;
    }
    function InitalizeEvents() {
        butCandidateCode.onclick = butCandidateCode_Click;
        butBraCode.onclick = btnBraCode_Click;
        txtCandidateCode.onchange = CandidateCode_Changed;
        //    butBraCode.onclick = butCandidateCode_Click;
    }
    function btnBraCode_Click() {
        sys.FindKey(Modules.SubCandidate, "butBraCode", "COMP_CODE = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", ControllerName),
                data: { id: id },
                success: function (d) {
                    Area = d.result;
                    txtBraCode.value = Area.BRA_CODE.toString();
                    txtAreaName.value = Area.BRA_DESC.toString();
                }
            });
        });
    }
    function butCandidateCode_Click() {
        sys.FindKey(Modules.SubCandidate, "butCandidateCode", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("SubCandidateList", ControllerName),
                data: { id: id },
                success: function (d) {
                    Model = d.result;
                    txtCandidateCode.value = Model.CandidateCode.toString();
                    old_CrNo = Model.CrNo;
                    var _Index = Number(Model.SubContractorID);
                    var ind = GetIndexByUseId(Number(Model.SubContractorID), "P_D_SubCandidate", "SubContractorID");
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });
        });
    }
    function CandidateCode_Changed() {
        var code = Number(txtCandidateCode.value);
        Ajax.CallAsync({
            url: Url.Action("getSubCandidatebyCode", "FindByNo"),
            data: { code: code },
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                Model = d.result;
                txtCandidateCode.value = Model[0].CandidateCode.toString();
                old_CrNo = Model[0].CrNo;
                var _Index = Number(Model[0].SubContractorID);
                var ind = GetIndexByUseId(Number(Model[0].SubContractorID), "P_D_SubCandidate", "SubContractorID");
                NavigateToSearchResultKey(Number(ind), Navigate);
            }
        });
    }
    function Add() {
        ClearGrid(Grid, new Array());
        DataSource = new Array();
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", "Prequalification"),
            success: function (d) {
                Model = d.result;
                debugger;
                old_CrNo = Model.CrNo;
                Display();
                getArea();
            }
        });
    }
    function getArea() {
        Ajax.CallAsync({
            url: Url.Action("getArea", ControllerName),
            data: { id: Number(txtBraCode.value) },
            success: function (d) {
                Area = d.result;
                txtAreaName.value = Area.BRA_DESC.toString();
            }
        });
    }
    function Display() {
        debugger;
        DocumentActions.RenderFromModel(Model);
        GetSubCandidateScopeList(Model.SubContractorID);
    }
    function GetSubCandidateScopeList(CandidateID) {
        Ajax.CallAsync({
            url: Url.Action("getSubCandidateScopeList", ControllerName),
            data: { id: CandidateID },
            success: function (d) {
                DataSource = d.result;
                for (var i = 0; i < DataSource.length; i++) {
                    DataSource[i].ApplayDate = DateFormat(DataSource[i].ApplayDate);
                    DataSource[i].ApprovalDate = DataSource[i].ApprovalDate == null ? "" : DateFormat(DataSource[i].ApprovalDate);
                }
                Grid.DataSource = DataSource;
                Grid.Bind();
            }
        });
    }
    function Insert() {
        Model = new P_D_SubCandidate();
        Assign();
        // check for details
        if (Master.ContractLimit == 0 || Master.ContractLimit == null) {
            WorningMessage("الرجاء ادخال  حد قيمة التعاقد", "Contract Limit must be entered ");
            return;
        }
        // check that SubCandidate code not repeted
        for (var i = 0; i < AllSubCandidate.length; i++) {
            if (Model.CrNo == AllSubCandidate[i].CrNo) {
                WorningMessage("الرجاء عدم تكرار رقم السجل التجارى", "Please not Repetition sub Candidate CrNo.");
                return;
            }
        }
        Model.CompCode = Number(_CompCode);
        Model.BraCode = Number(_BranchCode);
        Ajax.CallAsync({
            url: Url.Action("Insert", "Prequalification"),
            data: {
                JsonData: JSON.stringify(MasterDetails)
            },
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    debugger;
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم الحفظ بنجاح  ", "Data Saved Successfuly. ");
                    MessageBox.Show(msg, "Insert", function () {
                        var SubCandidate = result.ResponseData;
                        var SubCandidate_Index = GetIndexByUseId(result.ResponseData, "P_D_SubCandidate", "SubContractorID");
                        NavigateToSearchResultKey(Number(SubCandidate_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Insert");
            }
        });
    }
    function Assign() {
        Master = DocumentActions.AssignToModel(Model);
        MasterDetails.P_SubCandidate = Master;
        MasterDetails.P_SubCandidate.SubContractorID = 0;
        // assign Details
        MasterDetails.P_D_SubCandidateScope = DataSource;
        for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
            var itm = DataSource_1[_i];
            itm.CandidateID = Master.SubContractorID;
            //itm.IsApproved = if(itm.IsApproved == "NO") ?false : true; 
            tbl_DataSource.push(itm);
        }
    }
    function AssignUpdate() {
        Master = DocumentActions.AssignToModel(Model);
        MasterDetails.P_SubCandidate = Master;
        MasterDetails.P_SubCandidate.SubContractorID = Master.SubContractorID;
        // assign Details
        MasterDetails.P_D_SubCandidateScope = DataSource;
        for (var _i = 0, DataSource_2 = DataSource; _i < DataSource_2.length; _i++) {
            var itm = DataSource_2[_i];
            itm.CandidateID = Master.SubContractorID;
            //itm.IsApproved = if(itm.IsApproved == "NO") ?false : true; 
            tbl_DataSource.push(itm);
        }
    }
    function Update() {
        AssignUpdate();
        if (Master.ContractLimit == 0 || Master.ContractLimit == null) {
            WorningMessage("الرجاء ادخال  حد قيمة التعاقد", "Contract Limit must be entered ");
            return;
        }
        // check if crNo found before 
        for (var i = 0; i < AllSubCandidate.length; i++) {
            if ((txtCrNo.value != old_CrNo) && (txtCrNo.value == AllSubCandidate[i].CrNo.toString())) {
                WorningMessage("الرجاء عدم تكرار رقم السجل التجارى", "Please not Repetition sub Candidate CrNo.");
                return;
            }
        }
        //end of Check SubContractor
        Master.CompCode = Number(_CompCode);
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
                        var _Index = GetIndexByUseId(result.ResponseData, "P_D_SubCandidate", "SubContractorID");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        });
    }
    function InitalizeControls() {
        txtSubCandidateId = DocumentActions.GetElementById("txtSubCandidateId");
        txtCandidateCode = DocumentActions.GetElementById("txtCandidateCode");
        txtDescA = DocumentActions.GetElementById("txtDescA");
        txtDescE = DocumentActions.GetElementById("txtDescE");
        txtSubContractorCode = DocumentActions.GetElementById("txtSubContractorCode");
        txtCrNo = DocumentActions.GetElementById("txtCrNo");
        txtContactPerson = DocumentActions.GetElementById("txtContactPerson");
        txtChamberNo = DocumentActions.GetElementById("txtChamberNo");
        txtTel1 = DocumentActions.GetElementById("txtTel1");
        txtTel2 = DocumentActions.GetElementById("txtTel2");
        txtVatNo = DocumentActions.GetElementById("txtVatNo");
        txtContractLimit = DocumentActions.GetElementById("txtContractLimit");
        txtMobile = DocumentActions.GetElementById("txtMobile");
        txtSpecialty = DocumentActions.GetElementById("txtSpecialty");
        txtEmail = DocumentActions.GetElementById("txtEmail");
        txtSubContractorAddress = DocumentActions.GetElementById("txtSubContractorAddress");
        txtRemarks = DocumentActions.GetElementById("txtRemarks");
        txtBraCode = DocumentActions.GetElementById("txtBraCode");
        butBraCode = DocumentActions.GetElementById("butBraCode");
        butCandidateCode = DocumentActions.GetElementById("butCandidateCode");
        txtAreaName = DocumentActions.GetElementById("txtAreaName");
        chkVatType = DocumentActions.GetElementById("chkVatType");
        AllSubCandidate = Ajax.Call({ url: Url.Action("getAllSubCandidate", ControllerName) });
    }
    function AddItem(e) {
        var DS = e.Item;
        DataSource.push(DS);
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    function InitalizephaseGrid() {
        var res = GetResourceList("Pre_");
        Grid.ElementName = "preqalifications";
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
        Grid.OnItemInserting = AddItem;
        //Grid.OnItemInserting = Insert;
        //Grid.OnItemUpdating = Update;
        //Grid.OnItemDeleting = Delete;
        Grid.Columns = [
            {
                title: res.pre_Scope, name: "ScopeID", css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var btnFindScope = DocumentActions.CreateElement("button");
                    btnFindScope = DocumentActions.CreateElement("button");
                    btnFindScope.className = "btn btn-primary btn-block addable editable";
                    btnFindScope.innerText = _ScreenLanguage == "ar" ? "تحميل المعدات" : "Loading Scops";
                    btnFindScope.id = "btnFindScope";
                    btnFindScope.type = "button";
                    btnFindScope.onclick = function (e) {
                        btnFindScope_onclick();
                    };
                    return HeaderTemplateNew(res.pre_Scope, btnFindScope);
                },
            },
            {
                title: res.Pre_scopcode, name: "ScopeCode", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "ScopeCode", " ");
                    txt.id = "h_ScopeCode";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Pre_scopcode, txt);
                }
            },
            {
                title: res.Pre_scopdesc, name: "DescE", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("label", GridInputClassName, " ", " ", "DescE", " ");
                    txt.id = "h_DescE";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Pre_scopdesc, txt);
                }
            },
            {
                title: res.Pre_apllydate, name: "ApplayDate", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("Date", GridInputClassName, " ", " ", "ApplayDate", " ");
                    txt.id = "h_ApplayDate";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Pre_apllydate, txt);
                }
            },
            {
                title: res.Pre_approvdate, name: "ApprovalDate", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("Date", GridInputClassName, " ", " ", "ApprovalDate", " ");
                    txt.id = "h_ApprovalDate";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Pre_approvdate, txt);
                }
            },
            {
                title: res.Pre_approval, name: "IsApproved", width: "7.5%",
                headerTemplate: function () {
                    var SelectList = CreateListYesOrNo();
                    SelectList.id = "H_Dropapproval";
                    return HeaderTemplateNew(res.Pre_approval, SelectList);
                },
                itemTemplate: function (index, item) {
                    var lbl = DocumentActions.CreateElement("label");
                    lbl.innerText = item.IsApproved == true ? "Yes" : "No";
                    return lbl;
                }
            }
            //,
            //{
            //    title: res.Pre_approval, name: "IsApproved", width: "9.5%",
            //    headerTemplate: (): HTMLElement => {
            //        let txt = CreateElementDrop("Select", GridInputClassName, offDay,"IsApproved");
            //        txt.id = "h_IsApproved"
            //        txt.disabled = false;
            //        return HeaderTemplateNew(res.Pre_approval", txt);
            //    }
            //}
            ,
            {
                title: "#", name: "btnAddItem", visible: true, width: "50px",
                headerTemplate: function () {
                    var btn = DocumentActions.CreateElement("button");
                    btn.className = TransparentButton + "editable";
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemSubCandidateGrid";
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        AddItemInSubCandidteGrid();
                    };
                    return btn;
                },
                // HANDLE DELETE Row in Grid
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.type = "button";
                    btn.className = TransparentButton + " addable";
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";
                    btn.name = DataSource.indexOf(item).toString();
                    btn.onclick = function (e) {
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        var index_id = e.currentTarget.id;
                        var index = Number(e.currentTarget.name);
                        DataSource.splice(index, 1);
                        BindDetailsSubCanditeScope();
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
                    btn.name = DataSource.indexOf(item).toString();
                    btn.onclick = function (e) {
                        //DetailsAssignHeaderCabdidateScope = new PQ_GetEngSubCandidateScope();
                        //DetailsAssignHeaderCabdidateScope.ScopeId = item.ScopeId;
                        //DetailsAssignHeaderCabdidateScope.ApplayDate = item.ApplayDate;
                        //DetailsAssignHeaderCabdidateScope.ApprovalDate = item.ApprovalDate;
                        //DetailsAssignHeaderCabdidateScope.IsApproved = item.IsApproved;
                        //DetailsAssignHeaderCabdidateScope.ScopeCode = item.ScopeCode;
                        //DetailsAssignHeaderCabdidateScope.DescE = item.DescE;
                        var index = Number(e.currentTarget.name);
                        DataSource.splice(index, 1);
                        Grid.DataSource = DataSource;
                        Grid.Bind();
                        //ReIndexingGrid();
                        $('#btnFindScope').text(item.ScopeId.toString());
                        $("#h_ScopeCode").val(item.ScopeCode.toString());
                        $("#h_DescE").val(item.DescE.toString());
                        $("#h_ApplayDate").val(item.ApplayDate);
                        $("#h_ApprovalDate").val(item.ApprovalDate);
                        if (item.IsApproved == false) {
                            $("#H_Dropapproval").val("0");
                        }
                        else {
                            $("#H_Dropapproval").val("1");
                        }
                    };
                    return btn;
                }
            }
        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    function AddItemInSubCandidteGrid() {
        debugger;
        DetailsAssignHeaderCabdidateScope = new PQ_GetEngSubCandidateScope();
        if (IsNullOrEmpty($('#h_ScopeCode').val()) || $('#h_ScopeCode').val() == " ") {
            WorningMessage("يجب اختيار عنصر", "You Should Choose Scope");
            return;
        }
        var id = Number($('#btnFindScope').text());
        DetailsAssignHeaderCabdidateScope.ScopeId = id;
        DetailsAssignHeaderCabdidateScope.ApplayDate = $('#h_ApplayDate').val();
        DetailsAssignHeaderCabdidateScope.ApprovalDate = $('#h_ApprovalDate').val();
        var isApprove = $('#H_Dropapproval').val();
        if (isApprove == "0") {
            DetailsAssignHeaderCabdidateScope.IsApproved = false;
        }
        else {
            DetailsAssignHeaderCabdidateScope.IsApproved = true;
        }
        DetailsAssignHeaderCabdidateScope.ScopeCode = $('#h_ScopeCode').val();
        DetailsAssignHeaderCabdidateScope.DescE = $('#h_DescE').val();
        // check if item found in Grid 
        for (var i = 0; i < DataSource.length; i++) {
            if (DataSource[i].ScopeId == DetailsAssignHeaderCabdidateScope.ScopeId) {
                WorningMessage("موجود برجاء اختيار اخر  ", "Scope Found before Please Select another Scope ");
                return;
            }
        }
        // 
        DataSource.unshift(DetailsAssignHeaderCabdidateScope);
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    function btnFindScope_onclick() {
        sys.FindKey(Modules.SalesItemLibrary, "btnFindScope", "", function () {
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("findScope", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    $('#btnFindScope').text(result.ScopeID);
                    $('#h_ScopeCode').val(result.ScopeCode);
                    $('#h_DescE').val(result.DescE);
                    var date1 = new Date();
                    var date2 = date1.toLocaleDateString();
                    $('#h_ApplayDate').val(DateFormat(new Date().toString()));
                }
            });
        });
    }
    //function ReIndexingGrid() {
    //    for (var i = 0; i < DataSource.length; i++) {
    //        DataSource[i] = i + 1;
    //    }
    //}
    function BindDetailsSubCanditeScope() {
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    function CreateListYesOrNo() {
        var offDay = [
            {
                Name_Ar: "لا",
                Name_En: "No",
                Id: 0
            },
            {
                Name_Ar: "نعم",
                Name_En: "Yes",
                Id: 1
            },
        ];
        var element = document.createElement("Select");
        element.className = "form-control input-sm";
        //let langu = SharedSession.CurrentEnvironment.ScreenLanguage;
        switch (ClientSharedWork.Session.Language) {
            case "ar":
                for (var _i = 0, offDay_1 = offDay; _i < offDay_1.length; _i++) {
                    var item = offDay_1[_i];
                    element.options.add(new Option(item.Name_Ar, item.Id.toString()));
                }
                break;
            case "en":
                for (var _a = 0, offDay_2 = offDay; _a < offDay_2.length; _a++) {
                    var item = offDay_2[_a];
                    element.options.add(new Option(item.Name_En, item.Id.toString()));
                }
                break;
        }
        return element;
    }
})(Prequalification || (Prequalification = {}));
//# sourceMappingURL=PrequalificationIndex.js.map