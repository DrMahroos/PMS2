$(document).ready(() => {
    Prequalification.InitalizeComponent();
});
namespace Prequalification {
    const ControllerName: string = "Prequalification";
    var Model: P_D_SubCandidate = new P_D_SubCandidate();
    var Master: P_D_SubCandidate = new P_D_SubCandidate();
    var txtSubCandidateId: HTMLInputElement;
    var txtCandidateCode: HTMLInputElement;
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
    var chkVatType: HTMLButtonElement;
    var txtAreaName: HTMLInputElement;
    var Area: G_BRANCH = new G_BRANCH();
    var butCandidateCode: HTMLButtonElement;
    var DataSource: Array<PQ_GetEngSubCandidateScope> = new Array<PQ_GetEngSubCandidateScope>();
    var tbl_DataSource: Array<P_D_SubCandidateScope> = new Array<P_D_SubCandidateScope>();
    var Grid: JsGrid = new JsGrid();
    var sys: SystemTools = new SystemTools();
    var ajaxCall: AjaxCaller = new AjaxCaller();
    var old_CrNo: string;

    var DetailsAssignHeaderScope: P_D_Scope = new P_D_Scope();
    var columnWidth: string = "100px";
    class M_D_SubCandidateDetails {
        public P_SubCandidate: P_D_SubCandidate;
        public P_D_SubCandidateScope: Array<P_D_SubCandidateScope>;
    }
    var DetailsAssignHeaderCabdidateScope: PQ_GetEngSubCandidateScope = new PQ_GetEngSubCandidateScope();
    var DetailsSubCanditeScope: Array<PQ_GetEngSubCandidateScope> = new Array<PQ_GetEngSubCandidateScope>();
    const GridInputClassName = "form-control gridIput";
    var MasterDetails: M_D_SubCandidateDetails = new M_D_SubCandidateDetails();
    var AllSubCandidate: Array<P_D_SubCandidate> = new Array<P_D_SubCandidate>();
    //var return_row_scope: P_D_SubCandidateScope = new P_D_SubCandidateScope();
    var _ScreenLanguage: string;
    var _CompCode: string;
    var _BranchCode: string;

    export function InitalizeComponent() {
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
        ControlsButtons.EditAction(() => { });
        ControlsButtons.SaveAction(() => {
                if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                    Insert();
               else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                    Update();
            }
        );
       // ControlsButtons.DeleteAction(() => { });
        ControlsButtons.UndoAction(() => { });
        $("#H_Dropapproval").change(function () { DropapprovalChange(); });
        $("#ImageEditorButton").on("click", () => {

            sys.ImgPopup(_CompCode, _BranchCode, Modules.Prequalification, Master.SubContractorID.toString());
        });
    }

    function DropapprovalChange() {
        
        let _Val: number = Number($("#H_Dropapproval").val());
        if (_Val == 0) {

        }
        debugger
    }

    function InitalizeEvents()
    {
         butCandidateCode.onclick = butCandidateCode_Click;
        butBraCode.onclick = btnBraCode_Click;
        txtCandidateCode.onchange = CandidateCode_Changed;
            
     //    butBraCode.onclick = butCandidateCode_Click;
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
     

    function butCandidateCode_Click() {
        
        sys.FindKey(Modules.SubCandidate, "butCandidateCode", "CompCode = " + _CompCode, () => {
            let id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("SubCandidateList", ControllerName),
                data: { id: id },
                success: (d) => {
                    Model = d.result as P_D_SubCandidate;
                    txtCandidateCode.value = Model.CandidateCode.toString();
                    old_CrNo = Model.CrNo;
                    let _Index: number = Number(Model.SubContractorID);
                    let ind = GetIndexByUseId(Number(Model.SubContractorID), "P_D_SubCandidate", "SubContractorID")
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
                success: (d) => {
                    if (IsNullOrEmpty(d.result)) {
                        WorningMessage("الرمز خطأ، أعد المحاولة .... ", "Wrong Code , .. Retry .. ")
                        window.open(Url.Action(ControllerName + "Index", ControllerName), "_self");

                    }
                    Model = d.result as P_D_SubCandidate;
                    txtCandidateCode.value = Model[0].CandidateCode.toString();
                    old_CrNo = Model[0].CrNo;
                    let _Index: number = Number(Model[0].SubContractorID);
                    let ind = GetIndexByUseId(Number(Model[0].SubContractorID), "P_D_SubCandidate", "SubContractorID")
                    NavigateToSearchResultKey(Number(ind), Navigate);
                }
            });
        
    }
     
   
    function Add() {
        ClearGrid(Grid, new Array<Number>());
        DataSource = new Array<PQ_GetEngSubCandidateScope>();
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", "Prequalification"),
            success: (d) => {
                Model = d.result as P_D_SubCandidate;
                debugger
                old_CrNo = Model.CrNo;
                Display();
                getArea();
            }
        })
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
        debugger
        DocumentActions.RenderFromModel(Model);
        GetSubCandidateScopeList(Model.SubContractorID);
    }

    function GetSubCandidateScopeList(CandidateID: number) {
        
        Ajax.CallAsync({
            url: Url.Action("getSubCandidateScopeList", ControllerName),
            data: { id: CandidateID },
            success: (d) => {
                
                DataSource = d.result as Array<PQ_GetEngSubCandidateScope>;
                for (var i = 0; i < DataSource.length; i++) {
                    DataSource[i].ApplayDate = DateFormat(DataSource[i].ApplayDate);
                    DataSource[i].ApprovalDate = DataSource[i].ApprovalDate == null? "" : DateFormat(DataSource[i].ApprovalDate);
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
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    debugger
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم الحفظ بنجاح  ", "Data Saved Successfuly. ");
                    MessageBox.Show(msg, "Insert", () => {
                        let SubCandidate = result.ResponseData as P_D_SubCandidate;
                        let SubCandidate_Index = GetIndexByUseId(result.ResponseData , "P_D_SubCandidate", "SubContractorID");
                        NavigateToSearchResultKey(Number(SubCandidate_Index), Navigate);
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Insert");
            }
        });
    }
    function Assign() {
        
        Master = DocumentActions.AssignToModel<P_D_SubCandidate>(Model);
        MasterDetails.P_SubCandidate = Master as P_D_SubCandidate;
        MasterDetails.P_SubCandidate.SubContractorID = 0;

        // assign Details
        
        MasterDetails.P_D_SubCandidateScope = DataSource as Array<P_D_SubCandidateScope>;
        for (var itm of DataSource) {
            itm.CandidateID = Master.SubContractorID;
            //itm.IsApproved = if(itm.IsApproved == "NO") ?false : true; 
            tbl_DataSource.push(itm);
        }
    }
    function AssignUpdate() {
        
        Master = DocumentActions.AssignToModel<P_D_SubCandidate>(Model);
        MasterDetails.P_SubCandidate = Master as P_D_SubCandidate;
        MasterDetails.P_SubCandidate.SubContractorID = Master.SubContractorID;

        // assign Details
        
        MasterDetails.P_D_SubCandidateScope = DataSource as Array<P_D_SubCandidateScope>;
        for (var itm of DataSource) {
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
            success: (d) => {
                
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let msg: string = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Insert", () => {
                        
                        Display();
                        let _Index = GetIndexByUseId(result.ResponseData, "P_D_SubCandidate", "SubContractorID");
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                    });
                }
            }
        })
    }
    function InitalizeControls()
    {
        txtSubCandidateId = DocumentActions.GetElementById<HTMLInputElement>("txtSubCandidateId");
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
        butCandidateCode = DocumentActions.GetElementById<HTMLButtonElement>("butCandidateCode");
        txtAreaName = DocumentActions.GetElementById<HTMLInputElement>("txtAreaName");
        chkVatType = DocumentActions.GetElementById<HTMLInputElement>("chkVatType");
        AllSubCandidate = Ajax.Call<Array<P_D_SubCandidate>>({ url: Url.Action("getAllSubCandidate", ControllerName) });
    }
    function AddItem(e: JsGridInsertEventArgs) {
        let DS = e.Item as PQ_GetEngSubCandidateScope;
        DataSource.push(DS);
        Grid.DataSource = DataSource;
        Grid.Bind();
    }

    function InitalizephaseGrid() {
        let res: any = GetResourceList("Pre_");
        Grid.ElementName = "preqalifications";
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
        Grid.OnItemInserting = AddItem;
        //Grid.OnItemInserting = Insert;
        //Grid.OnItemUpdating = Update;
        //Grid.OnItemDeleting = Delete;
        Grid.Columns = [
            {
                title: res.pre_Scope, name: "ScopeID", css: JsGridHeaderCenter,
                headerTemplate: (): HTMLElement => {
                    let btnFindScope: HTMLInputElement = DocumentActions.CreateElement<HTMLInputElement>("button");
                    btnFindScope = DocumentActions.CreateElement<HTMLInputElement>("button");
                    btnFindScope.className = "btn btn-primary btn-block addable editable";
                    btnFindScope.innerText = _ScreenLanguage == "ar" ? "تحميل المعدات" : "Loading Scops";
                    btnFindScope.id = "btnFindScope";
                    btnFindScope.type = "button";
                    btnFindScope.onclick = (e) => {
                        btnFindScope_onclick();
                    };
                    return HeaderTemplateNew(res.pre_Scope, btnFindScope);
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
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Pre_apllydate, txt);
                }
            },
            {
                title: res.Pre_approvdate, name: "ApprovalDate", width: "9.5%",
                headerTemplate: (): HTMLElement => {
                    let txt = CreateElement("Date", GridInputClassName, " ", " ", "ApprovalDate", " ");
                    txt.id = "h_ApprovalDate"
                    txt.disabled = false;
                    return HeaderTemplateNew(res.Pre_approvdate, txt);
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
                // HANDLE DELETE Row in Grid
                itemTemplate: (s: string, item: PQ_GetEngSubCandidateScope): HTMLButtonElement => {
                    let btn: HTMLInputElement = DocumentActions.CreateElement<HTMLInputElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-remove'></i>";
                    btn.type = "button";
                    btn.className = TransparentButton + " addable";
                    btn.style.fontSize = "24px";
                    btn.style.color = "red";

                    btn.name = DataSource.indexOf(item).toString();
                    btn.onclick = (e) => {
                        
                        if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                            WorningMessage("يجب اختيار وضع التعديل اولا ", "Please Select Edit Mode First");
                            return;
                        }
                        let index_id = (e.currentTarget as HTMLButtonElement).id;
                        let index = Number((e.currentTarget as HTMLButtonElement).name);
                        DataSource.splice(index, 1);
                        BindDetailsSubCanditeScope();
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
                itemTemplate: (s: string, item: PQ_GetEngSubCandidateScope): HTMLButtonElement => {

                    let btn: HTMLInputElement = DocumentActions.CreateElement<HTMLInputElement>("button");
                    btn.innerHTML = "<i class='glyphicon glyphicon-pencil'></i>";
                    btn.type = "button";
                    btn.className = TransparentButton + " addable editable";
                    btn.style.fontSize = "20px";
                    btn.style.color = "forestgreen";
                    btn.name = DataSource.indexOf(item).toString();
                    btn.onclick = (e) => {
                            //DetailsAssignHeaderCabdidateScope = new PQ_GetEngSubCandidateScope();
                            //DetailsAssignHeaderCabdidateScope.ScopeId = item.ScopeId;
                            //DetailsAssignHeaderCabdidateScope.ApplayDate = item.ApplayDate;
                            //DetailsAssignHeaderCabdidateScope.ApprovalDate = item.ApprovalDate;
                            //DetailsAssignHeaderCabdidateScope.IsApproved = item.IsApproved;
                            //DetailsAssignHeaderCabdidateScope.ScopeCode = item.ScopeCode;
                        //DetailsAssignHeaderCabdidateScope.DescE = item.DescE;
                        
                            let index = Number((e.currentTarget as HTMLButtonElement).name);
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

    function AddItemInSubCandidteGrid()
    {
        debugger;
        DetailsAssignHeaderCabdidateScope = new PQ_GetEngSubCandidateScope();
        if (IsNullOrEmpty($('#h_ScopeCode').val()) || $('#h_ScopeCode').val() == " ") {
            WorningMessage("يجب اختيار عنصر", "You Should Choose Scope");
            return;
        }
        let id: number = Number($('#btnFindScope').text());
        DetailsAssignHeaderCabdidateScope.ScopeId = id;
        DetailsAssignHeaderCabdidateScope.ApplayDate = $('#h_ApplayDate').val();
        DetailsAssignHeaderCabdidateScope.ApprovalDate = $('#h_ApprovalDate').val();
        
        var isApprove: string = $('#H_Dropapproval').val();
        if (isApprove == "0")
        {
            DetailsAssignHeaderCabdidateScope.IsApproved = false
           
        }
        else
        {
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
                    $('#h_ApplayDate').val(DateFormat(new Date().toString()));
                }
            });
        })
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
        let element = document.createElement("Select") as HTMLSelectElement;
        element.className = "form-control input-sm";
        //let langu = SharedSession.CurrentEnvironment.ScreenLanguage;
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