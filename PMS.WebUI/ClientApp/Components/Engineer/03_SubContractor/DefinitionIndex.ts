$(document).ready(() => {
    Definition.InitalizeComponent();
});
namespace Definition {
    const GridInputClassName = "form-control gridIput";
    var columnWidth: string = "100px";
    const ControllerName: string = "Definition";
    var Model: P_D_SubContractor = new P_D_SubContractor();
    var Master: P_D_SubContractor = new P_D_SubContractor();
    var DetailsAssignHeaderSubContractorScope: PQ_GetEngSubContractorScope = new PQ_GetEngSubContractorScope();
    var DetailsSubContractorScope: Array<PQ_GetEngSubContractorScope> = new Array<PQ_GetEngSubContractorScope>();
    var txtSubContractorId: HTMLInputElement;
    var txtSubContractorCode: HTMLInputElement;
    var txtDescA: HTMLInputElement;
    var txtDescE: HTMLInputElement;
    var txtSubContractorCode: HTMLInputElement;
    var txtCrNo: HTMLInputElement;
    var txtContactPerson: HTMLInputElement;
    var txtChamberNo: HTMLInputElement;
    var txtTel1: HTMLInputElement;
    var txtTel2: HTMLInputElement;
    var txtVatNo: HTMLInputElement;
    var txtContractLimit: HTMLInputElement;
    var txtMobile: HTMLInputElement;
    var txtSpecialty: HTMLInputElement;
    var txtEmail: HTMLInputElement;
    var txtSubContractorAddress: HTMLInputElement;
    var txtRemarks: HTMLInputElement;
    var txtBraCode: HTMLInputElement;
    var butBraCode: HTMLButtonElement;
    var txtAreaName: HTMLInputElement;
    var txtCandidateCode: HTMLInputElement;
    var chkVatType: HTMLInputElement;
    var butSubContractorCode: HTMLButtonElement;
    var Area: G_BRANCH = new G_BRANCH();
    var old_CrNo: string;
    var AllSubContractors: Array<P_D_SubContractor> = new Array<P_D_SubContractor>();
    var DataSource: Array<PQ_GetEngSubContractorScope> = new Array<PQ_GetEngSubContractorScope>();
    var tbl_DataSource: Array<P_D_SubContractorScope> = new Array<P_D_SubContractorScope>();
    var Grid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    var ajaxCall: AjaxCaller = new AjaxCaller();
    var scoupid: number;
    class M_D_SubContractorDetails {
        public P_D_SubContractor: P_D_SubContractor;
        public P_D_SubContractorScope: Array<P_D_SubContractorScope>;
    }
    var MasterDetails: M_D_SubContractorDetails = new M_D_SubContractorDetails();
    var _ScreenLanguage: string;
    var _CompCode: string;
    var _BranchCode: string;

    export function InitalizeComponent() {
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
        ControlsButtons.EditAction(() => { });
        ControlsButtons.SaveAction(
            () => {
                 if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                    Update();
            }
        );
        ControlsButtons.UndoAction(() => { });
        $("#ImageEditorButton").on("click", () => {

            sys.ImgPopup(_CompCode, _BranchCode, Modules.Definition, Master.SubContractorID.toString());
        });
    }

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
            success: (d) => {
                
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Insert", () => {
                        
                        Display();
                        let _Index = GetIndexByUseId(result.ResponseData, "P_D_SubContractor", "SubContractorID");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        })
    }

    function AssignUpdate() {
        
        Master = DocumentActions.AssignToModel<P_D_SubContractor>(Model);
        MasterDetails.P_D_SubContractor = Master as P_D_SubContractor;
        MasterDetails.P_D_SubContractor.SubContractorID = Master.SubContractorID;

        // assign Details
        
        MasterDetails.P_D_SubContractorScope = DataSource as Array<P_D_SubContractorScope>;
        for (var itm of DataSource) {
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
        sys.FindKey(Modules.SubContractor, "butSubContractorCode", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getSubContractor", ControllerName),
                data: { id: id },
                success: (d) => {
                    
                    Model = d.result as P_D_SubContractor;
                    txtSubContractorCode.value = Model.SubContractorCode.toString();
                    old_CrNo = Model.CrNo;
                    let _Index: number = Number(Model.SubContractorID);
                    let ind = GetIndexByUseId(Number(Model.SubContractorID), "P_D_SubContractor", "SubContractorID")
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });
        });
    }
    function SubContractorCode_Changed() {
        var code = Number(txtSubContractorCode.value);
            Ajax.CallAsync({
                url: Url.Action("getSubcontractorbyCode", "FindByNo"),
                data: {code:code },
                success: (d) => {
                    if (IsNullOrEmpty(d.result)) {
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");

                    }
                    Model = d.result as P_D_SubContractor;
                    txtSubContractorCode.value = Model[0].SubContractorCode.toString();
                    old_CrNo = Model[0].CrNo;
                    let _Index: number = Number(Model[0].SubContractorID);
                    let ind = GetIndexByUseId(Number(Model[0].SubContractorID), "P_D_SubContractor", "SubContractorID")
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });
        
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {
                Model = d.result as P_D_SubContractor;
                old_CrNo = Model.CrNo;
                Display();
                getCandidateCode(Model.CandidateID);
                getArea();
               
            }
        })
    }

    function getCandidateCode(CandidateID: number) {
        Ajax.CallAsync({
            url: Url.Action("getCandidateCode", ControllerName),
            data: { CandidateID: CandidateID },
            success: (d) => {
                
                let model = d.result as P_D_SubCandidate;
                txtCandidateCode.value = model.CandidateCode.toString();
            }
        });

    }

    function getArea() {
        Ajax.CallAsync({
            url: Url.Action("getArea", ControllerName),
            data: { id: Number(txtBraCode.value) },
            success: (d) => {
                Area = d.result as G_BRANCH;
                txtAreaName.value = Area.BRA_DESC.toString();
            }
        })
    }

    function Display() {
        DocumentActions.RenderFromModel(Model);
        GetSubContractorScopeList(Model.SubContractorID);
    }

    function GetSubContractorScopeList(SubContractorID: number) {

        Ajax.CallAsync({
            url: Url.Action("GetSubContractorScopeList", ControllerName),
            data: { id: SubContractorID },
            success: (d) => {
                
                DataSource = d.result as Array<PQ_GetEngSubContractorScope>;
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
        
        sys.FindKey(Modules.SubCandidate, "butBraCode", "COMP_CODE = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("getArea", ControllerName),
                data: { id: id },
                success: (d) => {
                    Area = d.result as G_BRANCH;
                    txtBraCode.value = Area.BRA_CODE.toString();
                    txtAreaName.value = Area.BRA_DESC.toString();
                }
            });
        });
    }
     

    function InitalizeControls() {
        txtSubContractorId = DocumentActions.GetElementById<HTMLInputElement>("txtSubContractorId");
        txtCandidateCode = DocumentActions.GetElementById<HTMLInputElement>("txtCandidateCode");
        txtDescA = DocumentActions.GetElementById<HTMLInputElement>("txtDescA");
        txtDescE = DocumentActions.GetElementById<HTMLInputElement>("txtDescE");
        txtSubContractorCode = DocumentActions.GetElementById<HTMLInputElement>("txtSubContractorCode");
        txtCrNo = DocumentActions.GetElementById<HTMLInputElement>("txtCrNo");
        txtContactPerson = DocumentActions.GetElementById<HTMLInputElement>("txtContactPerson");
        txtChamberNo = DocumentActions.GetElementById<HTMLInputElement>("txtChamberNo");
        txtTel1 = DocumentActions.GetElementById<HTMLInputElement>("txtTel1");
        txtTel2 = DocumentActions.GetElementById<HTMLInputElement>("txtTel2");
        txtVatNo = DocumentActions.GetElementById<HTMLInputElement>("txtVatNo");
        txtContractLimit = DocumentActions.GetElementById<HTMLInputElement>("txtContractLimit");
        txtMobile = DocumentActions.GetElementById<HTMLInputElement>("txtMobile");
        txtSpecialty = DocumentActions.GetElementById<HTMLInputElement>("txtSpecialty");
        txtEmail = DocumentActions.GetElementById<HTMLInputElement>("txtEmail");
        txtSubContractorAddress = DocumentActions.GetElementById<HTMLInputElement>("txtSubContractorAddress");
        txtRemarks = DocumentActions.GetElementById<HTMLInputElement>("txtRemarks");
        txtBraCode = DocumentActions.GetElementById<HTMLInputElement>("txtBraCode");
        butBraCode = DocumentActions.GetElementById<HTMLButtonElement>("butBraCode");
        butSubContractorCode = DocumentActions.GetElementById<HTMLButtonElement>("butSubContractorCode");
        txtAreaName = DocumentActions.GetElementById<HTMLInputElement>("txtAreaName");
        chkVatType = DocumentActions.GetElementById<HTMLInputElement>("chkVatType");
        AllSubContractors = Ajax.Call<Array<P_D_SubContractor>>({ url: Url.Action("getAllSubContractor", ControllerName) });
    }

    function InitalizephaseGrid() {
        let res: any = GetResourceList("Pre_");
        Grid.ElementName = "sub_definations";
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
                title: res.Act_Scope, visible: false, name: "ScopeID", width: columnWidth, css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let btnFindScope: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindScope = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btnFindScope.className = "btn btn-primary btn-block addable editable";
                    btnFindScope.innerText = _ScreenLanguage == "ar" ? "تحميل المعدات" : "Loading Scops";
                    btnFindScope.id = "btnFindScope";
                    btnFindScope.type = "button";
                    btnFindScope.onclick = (e) => {
                       // btnFindScope_onclick();
                    };
                    return HeaderTemplateNew(res.Act_Scope, btnFindScope);
                },

            },
            {
                title: res.Pre_scopcode, name: "ScopeCode", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "ScopeCode", " ");
                    txt.id = "h_ScopeCode"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Pre_scopcode, txt);
                }
            },
            {
                title: res.Pre_scopdesc, name: "DescE", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("label", GridInputClassName, " ", " ", "DescE", " ");
                    txt.id = "h_DescE"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Pre_scopdesc, txt);
                }
            },
            {
                title: res.Pre_apllydate, name: "ApplayDate", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("Date", GridInputClassName, " ", " ", "ApplayDate", " ");
                    txt.id = "h_ApplayDate"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Pre_apllydate, txt);
                }
            },
            {
                title: res.Pre_approvdate, name: "ApprovalDate", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("Date", GridInputClassName, " ", " ", "ApprovalDate", " ");
                    txt.id = "h_ApprovalDate"
                    txt.disabled = true;
                    return HeaderTemplateNew(res.Pre_approvdate, txt);
                }
            }
            ,
            {
                title: res.Pre_limit, name: "ContractLimit", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("text", GridInputClassName, " ", " ", "ContractLimit", " ");
                    txt.id = "h_ContractLimit"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Pre_limit, txt);
                }
            }

            ,
            {
                title: res.Pre_approval, name: "IsApproved", width: "7.5%",
                headerTemplate: (): HTMLElement => {
                    let SelectList = CreateListYesOrNo();
                    SelectList.id = "H_Dropapproval";
                    return HeaderTemplateNew(res.Pre_approval, SelectList);
                },
                itemTemplate: (index: string, item: PQ_GetEngSubCandidateScope): HTMLElement => {
                    let lbl = DocumentActions.CreateElement<HTMLLabelElement>("label");
                    lbl.innerText = item.IsApproved == true ? "Yes" : "No";
                    return lbl;
                }
            }

            ,
            {
                title: "#", name: "btnAddItem", visible: true, width: "50px",
                headerTemplate: (): HTMLElement => {
                    let btn: HTMLButtonElement = DocumentActions.CreateElement<HTMLButtonElement>("button");
                    btn.className = TransparentButton + "editable";
                    btn.type = "button";
                    btn.style.fontSize = "25px";
                    btn.style.color = "forestgreen";
                    btn.innerHTML = "<span class='glyphicon glyphicon-plus'></span>";
                    btn.id = "btnAddItemSubCandidateGrid";
                    btn.onclick = (e) => {
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
                itemTemplate: (s: string, item: PQ_GetEngSubContractorScope): HTMLButtonElement => {

                    let btn: HTMLInputElement = DocumentActions.CreateElement<HTMLInputElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.type = "button";
                    btn.className = TransparentButton + " editable";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.name = DataSource.indexOf(item).toString();
                    btn.onclick = (e) => {
                        
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
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
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
            }
            ,
            // edit to Grid 
            {
                
            }

        ];
        Grid.DataSource = DataSource;
        Grid.Bind();
    }
    function btnFindScope_onclick() {
        
        sys.FindKey(Modules.SalesItemLibrary, "btnFindScope", "", () => {
            let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("findScope", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    
                    let result = d.result as P_D_Scope;
                    $('#btnFindScope').text(result.ScopeID);
                    $('#h_ScopeCode').val(result.ScopeCode);
                    $('#h_DescE').val(result.DescE);
                    var date1: Date = new Date();
                    var date2: string = date1.toLocaleDateString();
                    $('#h_ApplayDate').val(Date.parse(date2));
                }
            });
        })
    }

    function AddItemInSubCandidteGrid() {
        
        DetailsAssignHeaderSubContractorScope = new PQ_GetEngSubContractorScope();
        //let id: number = Number($('#btnFindScope').text());
        DetailsAssignHeaderSubContractorScope.ScopeId = scoupid;
        DetailsAssignHeaderSubContractorScope.ApplayDate = $('#h_ApplayDate').val();
        DetailsAssignHeaderSubContractorScope.ApprovalDate = $('#h_ApprovalDate').val();
        DetailsAssignHeaderSubContractorScope.ContractLimit = $('#h_ContractLimit').val();
        
        var isApprove: string = $('#H_Dropapproval').val();
        if (isApprove == "0") {
            DetailsAssignHeaderSubContractorScope.IsApproved = false

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

    function CreateListYesOrNo(): HTMLSelectElement {
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
        let element = document.createElement("select") as HTMLSelectElement;
        element.className = "form-control input-sm";
        switch (ClientSharedWork.Session.Language) {
            case "ar":
                for (var item of offDay) {
                    element.options.add(new Option(item.Name_Ar, item.Id.toString()));
                }
                break;
            case "en":
                for (var item of offDay) {
                    element.options.add(new Option(item.Name_En, item.Id.toString()));
                }
                break;
        }
        return element;
    }

}