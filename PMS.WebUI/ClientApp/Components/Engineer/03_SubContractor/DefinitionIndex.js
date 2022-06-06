$(document).ready(function () {
    Definition.InitalizeComponent();
});
var Definition;
(function (Definition) {
    var GridInputClassName = "form-control gridIput";
    var columnWidth = "100px";
    var ControllerName = "Definition";
    var Model = new P_D_SubContractor();
    var Master = new P_D_SubContractor();
    var DetailsAssignHeaderSubContractorScope = new PQ_GetEngSubContractorScope();
    var DetailsSubContractorScope = new Array();
    var txtSubContractorId;
    var txtSubContractorCode;
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
    var txtAreaName;
    var txtCandidateCode;
    var chkVatType;
    var butSubContractorCode;
    var Area = new G_BRANCH();
    var old_CrNo;
    var AllSubContractors = new Array();
    var DataSource = new Array();
    var tbl_DataSource = new Array();
    var Grid = new JsGrid();
    var sys = new SystemTools();
    var ajaxCall = new AjaxCaller();
    var scoupid;
    var M_D_SubContractorDetails = /** @class */ (function () {
        function M_D_SubContractorDetails() {
        }
        return M_D_SubContractorDetails;
    }());
    var MasterDetails = new M_D_SubContractorDetails();
    var _ScreenLanguage;
    var _CompCode;
    var _BranchCode;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        //_BranchCode = ClientSharedWork.Session.BranchCode;
        ControlsButtons.AddButton.disabled = false;
        ControlsButtons.EditButton.disabled = false;
        ControlsButtons.DeleteButton.disabled = false;
        ControlsButtons.PrintButton.disabled = false;
        InitalizeControls();
        InitalizeEvents();
        ajaxCall.ControllerName = "Definition";
        InitalizephaseGrid();
        SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        //ControlsButtons.AddAction(Add);
        ControlsButtons.EditAction(function () { });
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.UndoAction(function () { });
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.Definition, Master.SubContractorID.toString());
        });
    }
    Definition.InitalizeComponent = InitalizeComponent;
    function Update() {
        AssignUpdate();
        // check if crNo found before 
        for (var i = 0; i < AllSubContractors.length; i++) {
            if ((txtCrNo.value != old_CrNo) && (txtCrNo.value == AllSubContractors[i].CrNo)) {
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
                        var _Index = GetIndexByUseId(result.ResponseData, "P_D_SubContractor", "SubContractorID");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        });
    }
    function AssignUpdate() {
        Master = DocumentActions.AssignToModel(Model);
        MasterDetails.P_D_SubContractor = Master;
        MasterDetails.P_D_SubContractor.SubContractorID = Master.SubContractorID;
        // assign Details
        MasterDetails.P_D_SubContractorScope = DataSource;
        for (var _i = 0, DataSource_1 = DataSource; _i < DataSource_1.length; _i++) {
            var itm = DataSource_1[_i];
            itm.SubContractorID = Master.SubContractorID;
            //itm.IsApproved = if(itm.IsApproved == "NO") ?false : true; 
            tbl_DataSource.push(itm);
        }
    }
    function InitalizeEvents() {
        txtSubContractorCode.onchange = SubContractorCode_Changed;
        butSubContractorCode.onclick = butSubContractorCode_Click;
        butBraCode.onclick = btnBraCode_Click;
        //    butBraCode.onclick = butCandidateCode_Click;
    }
    function butSubContractorCode_Click() {
        sys.FindKey(Modules.SubContractor, "butSubContractorCode", "CompCode = " + _CompCode, function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getSubContractor", ControllerName),
                data: { id: id },
                success: function (d) {
                    Model = d.result;
                    txtSubContractorCode.value = Model.SubContractorCode.toString();
                    old_CrNo = Model.CrNo;
                    var _Index = Number(Model.SubContractorID);
                    var ind = GetIndexByUseId(Number(Model.SubContractorID), "P_D_SubContractor", "SubContractorID");
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });
        });
    }
    function SubContractorCode_Changed() {
        var code = Number(txtSubContractorCode.value);
        Ajax.CallAsync({
            url: Url.Action("getSubcontractorbyCode", "FindByNo"),
            data: { code: code },
            success: function (d) {
                if (IsNullOrEmpty(d.result)) {
                    WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ");
                    window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");
                }
                Model = d.result;
                txtSubContractorCode.value = Model[0].SubContractorCode.toString();
                old_CrNo = Model[0].CrNo;
                var _Index = Number(Model[0].SubContractorID);
                var ind = GetIndexByUseId(Number(Model[0].SubContractorID), "P_D_SubContractor", "SubContractorID");
                NavigateToSearchResultKey(Number(ind), Navigate);
            }
        });
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: function (d) {
                Model = d.result;
                old_CrNo = Model.CrNo;
                Display();
                getCandidateCode(Model.CandidateID);
                getArea();
            }
        });
    }
    function getCandidateCode(CandidateID) {
        Ajax.CallAsync({
            url: Url.Action("getCandidateCode", ControllerName),
            data: { CandidateID: CandidateID },
            success: function (d) {
                var model = d.result;
                txtCandidateCode.value = model.CandidateCode.toString();
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
        DocumentActions.RenderFromModel(Model);
        GetSubContractorScopeList(Model.SubContractorID);
    }
    function GetSubContractorScopeList(SubContractorID) {
        Ajax.CallAsync({
            url: Url.Action("GetSubContractorScopeList", ControllerName),
            data: { id: SubContractorID },
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
    function InitalizeControls() {
        txtSubContractorId = DocumentActions.GetElementById("txtSubContractorId");
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
        butSubContractorCode = DocumentActions.GetElementById("butSubContractorCode");
        txtAreaName = DocumentActions.GetElementById("txtAreaName");
        chkVatType = DocumentActions.GetElementById("chkVatType");
        AllSubContractors = Ajax.Call({ url: Url.Action("getAllSubContractor", ControllerName) });
    }
    function InitalizephaseGrid() {
        var res = GetResourceList("Pre_");
        Grid.ElementName = "sub_definations";
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
                title: res.Act_Scope, visible: false, name: "ScopeID", width: columnWidth, css: JsGridHeaderCenter,
                headerTemplate: function () {
                    var btnFindScope = DocumentActions.CreateElement("button");
                    btnFindScope = DocumentActions.CreateElement("button");
                    btnFindScope.className = "btn btn-primary btn-block addable editable";
                    btnFindScope.innerText = _ScreenLanguage == "ar" ? "تحميل المعدات" : "Loading Scops";
                    btnFindScope.id = "btnFindScope";
                    btnFindScope.type = "button";
                    btnFindScope.onclick = function (e) {
                        // btnFindScope_onclick();
                    };
                    return HeaderTemplateNew(res.Act_Scope, btnFindScope);
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
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Pre_apllydate, txt);
                }
            },
            {
                title: res.Pre_approvdate, name: "ApprovalDate", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("Date", GridInputClassName, " ", " ", "ApprovalDate", " ");
                    txt.id = "h_ApprovalDate";
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Pre_approvdate, txt);
                }
            },
            {
                title: res.Pre_limit, name: "ContractLimit", width: "9.5%",
                headerTemplate: function () {
                    var txt = CreateElement("text", GridInputClassName, " ", " ", "ContractLimit", " ");
                    txt.id = "h_ContractLimit";
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Pre_limit, txt);
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
            },
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
                // Handle Edit in Grid
                css: JsGridHeaderCenter,
                //width: "50px",
                itemTemplate: function (s, item) {
                    var btn = DocumentActions.CreateElement("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.type = "button";
                    btn.className = TransparentButton + " editable";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.name = DataSource.indexOf(item).toString();
                    btn.onclick = function (e) {
                        //if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                        //    WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                        //    return;
                        //}
                        DetailsAssignHeaderSubContractorScope = new PQ_GetEngSubContractorScope();
                        scoupid = item.ScopeId;
                        DetailsAssignHeaderSubContractorScope.ScopeId = item.ScopeId;
                        DetailsAssignHeaderSubContractorScope.ApplayDate = item.ApplayDate;
                        DetailsAssignHeaderSubContractorScope.ApprovalDate = item.ApprovalDate;
                        DetailsAssignHeaderSubContractorScope.IsApproved = item.IsApproved;
                        DetailsAssignHeaderSubContractorScope.ScopeCode = item.ScopeCode;
                        DetailsAssignHeaderSubContractorScope.DescE = item.DescE;
                        DetailsAssignHeaderSubContractorScope.ContractLimit = item.ContractLimit;
                        var index = Number(e.currentTarget.name);
                        DataSource.splice(index, 1);
                        Grid.DataSource = DataSource;
                        Grid.Bind();
                        //ReIndexingGrid();
                        $('#btnFindScope').text(DetailsAssignHeaderSubContractorScope.ScopeId.toString());
                        $("#h_ScopeCode").val(DetailsAssignHeaderSubContractorScope.ScopeCode.toString());
                        $("#h_DescE").val(DetailsAssignHeaderSubContractorScope.DescE.toString());
                        $("#h_ApplayDate").val(DetailsAssignHeaderSubContractorScope.ApplayDate);
                        $("#h_ApprovalDate").val(DetailsAssignHeaderSubContractorScope.ApprovalDate);
                        $("#h_ContractLimit").val(DetailsAssignHeaderSubContractorScope.ContractLimit);
                        if (DetailsAssignHeaderSubContractorScope.IsApproved == false) {
                            $("#H_Dropapproval").val("0");
                        }
                        else {
                            $("#H_Dropapproval").val("1");
                        }
                    };
                    return btn;
                }
                // HANDLE DELETE Row in Grid
                //itemTemplate: (s: string, item: PQ_GetEngSubContractorScope): HTMLButtonElement => {
                //    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                //    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                //    btn.className = TransparentButton + "editable";
                //    btn.style.fontSize = "24px";
                //    btn.style.color = "red";
                //    btn.name = DetailsSubContractorScope.indexOf(item).toString();
                //    btn.onclick = (e) => {
                //        
                //        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                //            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                //            return;
                //        }
                //        let index_id = (e.currentTarget as HTMLButtonElement).id;
                //        let index = Number((e.currentTarget as HTMLButtonElement).name);
                //        DataSource.splice(index, 1);
                //        Grid.DataSource = DataSource;
                //        Grid.Bind();
                //        //ReIndexingGrid();
                //    };
                //    return btn;
                //}
            },
            // edit to Grid 
            {}
        ];
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
                    $('#h_ApplayDate').val(Date.parse(date2));
                }
            });
        });
    }
    function AddItemInSubCandidteGrid() {
        DetailsAssignHeaderSubContractorScope = new PQ_GetEngSubContractorScope();
        //let id: number = Number($('#btnFindScope').text());
        DetailsAssignHeaderSubContractorScope.ScopeId = scoupid;
        DetailsAssignHeaderSubContractorScope.ApplayDate = $('#h_ApplayDate').val();
        DetailsAssignHeaderSubContractorScope.ApprovalDate = $('#h_ApprovalDate').val();
        DetailsAssignHeaderSubContractorScope.ContractLimit = $('#h_ContractLimit').val();
        var isApprove = $('#H_Dropapproval').val();
        if (isApprove == "0") {
            DetailsAssignHeaderSubContractorScope.IsApproved = false;
        }
        else {
            DetailsAssignHeaderSubContractorScope.IsApproved = true;
        }
        DetailsAssignHeaderSubContractorScope.ScopeCode = $('#h_ScopeCode').val();
        DetailsAssignHeaderSubContractorScope.DescE = $('#h_DescE').val();
        DataSource.unshift(DetailsAssignHeaderSubContractorScope);
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
        var element = document.createElement("select");
        element.className = "form-control input-sm";
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
})(Definition || (Definition = {}));
//# sourceMappingURL=DefinitionIndex.js.map