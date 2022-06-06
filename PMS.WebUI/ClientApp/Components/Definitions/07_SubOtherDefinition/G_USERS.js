$(document).ready(function () {
    Users.InitalizeComponent();
});
var Users;
(function (Users) {
    var ControllerName = "UsersSetting";
    var DataSource = new Array();
    var Grid = new JsGrid();
    var GridSubSystems = new JsGrid();
    var GridUserBranch = new JsGrid();
    var sys = new SystemTools();
    var Master = new G_USERS();
    //var MasterDetUser: MasterDetailsUsers = new MasterDetailsUsers();
    var _UserDetails = new G_USER_MODULE();
    var __UserDetailsArray = new Array();
    var Details = new Array();
    var FilterDatasource = new Array();
    var DetailsSubSystems = new Array();
    var __UserSubSystemsArray = new Array();
    var DetailsUserBranch = new Array();
    var __UserBranchDetailsArray = new Array();
    var view = new GQ_GetUserModule;
    var MasterDetailsUsers = /** @class */ (function () {
        function MasterDetailsUsers() {
            this.sessionRecord = new SessionRecord();
            this.G_USERS = new G_USERS();
        }
        return MasterDetailsUsers;
    }());
    var MasterDetails = new MasterDetailsUsers();
    var CurrentEnv;
    var CurrentPrev;
    var condation;
    var txtUSER_CODE;
    var txtUSER_NAME;
    var txtUSER_PASSWORD;
    var txtcopyFrom;
    var chkUSER_ACTIVE;
    var chkKeepRelation;
    var btnSearchUserCode;
    var btnCopyFrom;
    var btnAddToGrid;
    var txtcustom1;
    var txtcustom2;
    var txtcustom3;
    var txtcustom4;
    var txtcustom5;
    var txtcustom6;
    var txtcustom7;
    var txtcustom8;
    var txtcustom9;
    var txtmodulcode;
    var txtCity;
    var txtDepartmentName;
    var txtJobTitle;
    var chkcustom1;
    var chkcustom2;
    var chkcustom3;
    var chkcustom4;
    var chkcustom5;
    var chkcustom6;
    var chkcustom7;
    var chkcustom8;
    var chkcustom9;
    var chkexcute;
    var chkadd;
    var chkedit;
    var chkdelete;
    var chkview;
    var chkprint;
    var chkviewImg;
    var chkEditImg;
    var _ScreenLanguage;
    var _CompCode;
    var _BranchCode;
    function InitalizeComponent() {
        SharedSession.CurrentPrivileges = CurrentPrev = GetPrivileges();
        SharedSession.CurrentEnvironment = CurrentEnv = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        condation = "CompCode = " + CurrentEnv.CompCode + " And system_code = '" + CurrentEnv.SystemCode + "' And sub_system_code = '" + CurrentEnv.SubSystemCode + "'";
        localStorage.setItem("TableName", "GQ_SrchUserCompSystem");
        localStorage.setItem("ModelCount", condation);
        InitalizeControls();
        InitalizeEvents();
        InitalizeGrid();
        InitalizeGrid_Sub_Systems();
        InitalizeGrid_Sub_Branch_Grid();
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddButton.disabled = false;
        ControlsButtons.EditButton.disabled = false;
        ControlsButtons.DeleteButton.disabled = true;
        ControlsButtons.AddAction(Add);
        ControlsButtons.UndoAction(restControles);
        ControlsButtons.EditAction(Edit);
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                Insert();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                Update();
        });
        ControlsButtons.PrintAction(function () { PrintUser(); });
        ControlsButtons.DeleteAction(function () { });
        ControlsButtons.UndoAction(function () { });
    }
    Users.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        txtUSER_CODE = DocumentActions.GetElementById("txtUSER_CODE");
        txtUSER_NAME = DocumentActions.GetElementById("txtUSER_NAME");
        txtUSER_PASSWORD = DocumentActions.GetElementById("txtUSER_PASSWORD");
        chkUSER_ACTIVE = DocumentActions.GetElementById("chkUSER_ACTIVE");
        chkKeepRelation = DocumentActions.GetElementById("chkKeepRelation");
        txtcopyFrom = DocumentActions.GetElementById("txtcopyFrom");
        btnSearchUserCode = DocumentActions.GetElementById("btnSearchUserCode");
        btnCopyFrom = DocumentActions.GetElementById("btnCopyFrom");
        btnAddToGrid = DocumentActions.GetElementById("btnAddToGrid");
        chkcustom1 = DocumentActions.GetElementById("chkcustom1");
        chkcustom2 = DocumentActions.GetElementById("chkcustom2");
        chkcustom3 = DocumentActions.GetElementById("chkcustom3");
        chkcustom4 = DocumentActions.GetElementById("chkcustom4");
        chkcustom5 = DocumentActions.GetElementById("chkcustom5");
        chkcustom6 = DocumentActions.GetElementById("chkcustom6");
        chkcustom7 = DocumentActions.GetElementById("chkcustom7");
        chkcustom8 = DocumentActions.GetElementById("chkcustom8");
        chkcustom9 = DocumentActions.GetElementById("chkcustom9");
        txtcustom1 = DocumentActions.GetElementById("txtcustom1");
        txtcustom2 = DocumentActions.GetElementById("txtcustom2");
        txtcustom3 = DocumentActions.GetElementById("txtcustom3");
        txtcustom4 = DocumentActions.GetElementById("txtcustom4");
        txtcustom5 = DocumentActions.GetElementById("txtcustom5");
        txtcustom6 = DocumentActions.GetElementById("txtcustom6");
        txtcustom7 = DocumentActions.GetElementById("txtcustom7");
        txtcustom8 = DocumentActions.GetElementById("txtcustom8");
        txtcustom9 = DocumentActions.GetElementById("txtcustom9");
        txtmodulcode = DocumentActions.GetElementById("txtmodulcode");
        chkexcute = DocumentActions.GetElementById("chkexcute");
        chkadd = DocumentActions.GetElementById("chkadd");
        chkedit = DocumentActions.GetElementById("chkedit");
        chkdelete = DocumentActions.GetElementById("chkdelete");
        chkview = DocumentActions.GetElementById("chkview");
        chkprint = DocumentActions.GetElementById("chkprint");
        chkviewImg = DocumentActions.GetElementById("chkviewImg");
        chkEditImg = DocumentActions.GetElementById("chkEditImg");
        txtCity = DocumentActions.GetElementById("txtCity");
        txtDepartmentName = DocumentActions.GetElementById("txtDepartmentName");
        txtJobTitle = DocumentActions.GetElementById("txtJobTitle");
    }
    function InitalizeEvents() {
        btnSearchUserCode.onclick = btnSearchUserCode_Click;
        btnCopyFrom.onclick = btnCopyFrom_Click;
        btnAddToGrid.onclick = btnAddToGrid_Click;
        // txtClicked
        txtcustom1.onclick = txtcustom1_Clicked;
        txtcustom2.onclick = txtcustom2_Clicked;
        txtcustom3.onclick = txtcustom3_Clicked;
        txtcustom4.onclick = txtcustom4_Clicked;
        txtcustom5.onclick = txtcustom5_Clicked;
        txtcustom6.onclick = txtcustom6_Clicked;
        txtcustom7.onclick = txtcustom7_Clicked;
        txtcustom8.onclick = txtcustom8_Clicked;
        txtcustom9.onclick = txtcustom9_Clicked;
    }
    function EditingBranch(e) {
        // تعديل فى الجريد
        if (ClientSharedWork.CurrentMode == ScreenModes.Query == true) {
            GridUserBranch.SwitchEditing();
            WorningMessage("يجب اختيار وضع التعديل لاتمام عملية التعديل", "Select Update mode to edit");
            return;
        }
    }
    function EditingSubSystem(e) {
        // تعديل فى الجريد
        if (ClientSharedWork.CurrentMode == ScreenModes.Query == true) {
            GridSubSystems.SwitchEditing();
            WorningMessage("يجب اختيار وضع التعديل لاتمام عملية التعديل", "Select Update mode to edit");
            return;
        }
    }
    function Editing(e) {
        // تعديل فى الجريد
        if (ClientSharedWork.CurrentMode == ScreenModes.Query == true) {
            Grid.SwitchEditing();
            WorningMessage("يجب اختيار وضع التعديل لاتمام عملية التعديل", "Select Update mode to edit");
            return;
        }
        view = e.Item;
        if (view.CUSTOM1 == true) {
            $('#txtcustom1').toggleClass('txtclicked');
        }
        if (view.CUSTOM2 == true) {
            $('#txtcustom2').toggleClass('txtclicked');
        }
        if (view.CUSTOM3 == true) {
            $('#txtcustom3').toggleClass('txtclicked');
        }
        if (view.CUSTOM4 == true) {
            $('#txtcustom4').toggleClass('txtclicked');
        }
        if (view.CUSTOM5 == true) {
            $('#txtcustom5').toggleClass('txtclicked');
        }
        if (view.CUSTOM6 == true) {
            $('#txtcustom6').toggleClass('txtclicked');
        }
        if (view.CUSTOM7 == true) {
            $('#txtcustom7').toggleClass('txtclicked');
        }
        if (view.CUSTOM8 == true) {
            $('#txtcustom8').toggleClass('txtclicked');
        }
        if (view.CUSTOM9 == true) {
            $('#txtcustom9').toggleClass('txtclicked');
        }
        txtmodulcode.value = view.MODULE_DESCA;
        chkexcute.checked = view.EXECUTE;
        chkadd.checked = view.CREATE;
        chkedit.checked = view.EDIT;
        chkdelete.checked = view.DELETE;
        chkview.checked = view.VIEW;
        chkprint.checked = view.PRINT;
        chkviewImg.checked = view.ViewImages;
        chkEditImg.checked = view.EditImages;
        txtcustom1.value = view.CUSTOM1_DESC;
        chkcustom1.checked = view.CUSTOM1;
        txtcustom2.value = view.CUSTOM2_DESC;
        chkcustom2.checked = view.CUSTOM2;
        txtcustom3.value = view.CUSTOM3_DESC;
        chkcustom3.checked = view.CUSTOM3;
        txtcustom4.value = view.CUSTOM4_DESC;
        chkcustom4.checked = view.CUSTOM4;
        txtcustom5.value = view.CUSTOM5_DESC;
        chkcustom5.checked = view.CUSTOM5;
        txtcustom6.value = view.CUSTOM6_DESC;
        chkcustom6.checked = view.CUSTOM6;
        txtcustom7.value = view.CUSTOM7_DESC;
        chkcustom7.checked = view.CUSTOM7;
        txtcustom8.value = view.CUSTOM8_DESC;
        chkcustom8.checked = view.CUSTOM8;
        txtcustom9.value = view.CUSTOM9_DESC;
        chkcustom9.checked = view.CUSTOM9;
        // Validation On Fields (Custom 1 - 9)
        if (view.M_CUSTOM1 == false /*&& view.CUSTOM1 == true*/) {
            view.CUSTOM1 = false;
            chkcustom1.checked = false;
            //txtcustom1_Clicked();
            $('#txtcustom1').removeClass('txtclicked');
            txtcustom1.disabled = true;
        }
        if (view.M_CUSTOM2 == false /*&& view.CUSTOM2 == true*/) {
            view.CUSTOM2 = false;
            chkcustom2.checked = false;
            $('#txtcustom2').removeClass('txtclicked');
            //txtcustom2_Clicked();
            txtcustom2.disabled = true;
        }
        if (view.M_CUSTOM3 == false /*&& view.CUSTOM3 == true*/) {
            view.CUSTOM3 = false;
            chkcustom3.checked = false;
            $('#txtcustom3').removeClass('txtclicked');
            //txtcustom3_Clicked();
            txtcustom3.disabled = true;
        }
        if (view.M_CUSTOM4 == false /*&& view.CUSTOM4 == true*/) {
            view.CUSTOM4 = false;
            chkcustom4.checked = false;
            $('#txtcustom4').removeClass('txtclicked');
            //txtcustom4_Clicked();
            txtcustom4.disabled = true;
        }
        if (view.M_CUSTOM5 == false /*&& view.CUSTOM5 == true*/) {
            view.CUSTOM5 = false;
            chkcustom5.checked = false;
            $('#txtcustom5').removeClass('txtclicked');
            //txtcustom5_Clicked();
            txtcustom5.disabled = true;
        }
        if (view.M_CUSTOM6 == false /*&& view.CUSTOM6 == true*/) {
            view.CUSTOM6 = false;
            chkcustom6.checked = false;
            $('#txtcustom6').removeClass('txtclicked');
            //txtcustom6_Clicked();
            txtcustom6.disabled = true;
        }
        if (view.M_CUSTOM7 == false /*&& view.CUSTOM7 == true*/) {
            view.CUSTOM7 = false;
            chkcustom7.checked = false;
            $('#txtcustom7').removeClass('txtclicked');
            //txtcustom7_Clicked();
            txtcustom7.disabled = true;
        }
        if (view.M_CUSTOM8 == false /*&& view.CUSTOM8 == true*/) {
            view.CUSTOM8 = false;
            chkcustom8.checked = false;
            $('#txtcustom8').removeClass('txtclicked');
            //txtcustom8_Clicked();
            txtcustom8.disabled = true;
        }
        if (view.M_CUSTOM9 == false /*&& view.CUSTOM9 == true*/) {
            view.CUSTOM9 = false;
            chkcustom9.checked = false;
            $('#txtcustom9').removeClass('txtclicked');
            //txtcustom9_Clicked();
            txtcustom9.disabled = true;
        }
        if (view.M_CREATE == false) {
            view.CREATE = false;
            chkadd.checked = false;
            chkadd.disabled = true;
            chkadd.readOnly = true;
        }
        if (view.M_EDIT == false) {
            view.EDIT = false;
            chkedit.checked = false;
            chkedit.disabled = true;
            chkedit.readOnly = true;
        }
        if (view.M_DELETE == false) {
            view.DELETE = false;
            chkdelete.checked = false;
            chkdelete.disabled = true;
            chkdelete.readOnly = true;
        }
        if (view.M_VIEW == false) {
            view.VIEW = false;
            chkview.checked = false;
            chkview.disabled = true;
            chkview.readOnly = true;
        }
        if (view.M_PRINT == false) {
            view.PRINT = false;
            chkprint.checked = false;
            chkprint.disabled = true;
            chkprint.readOnly = true;
        }
        if (view.ViewImages == false) {
            view.PRINT = false;
            chkviewImg.checked = false;
            chkviewImg.disabled = true;
            chkviewImg.readOnly = true;
        }
        if (view.EditImages == false) {
            view.PRINT = false;
            chkEditImg.checked = false;
            chkEditImg.disabled = true;
            chkEditImg.readOnly = true;
        }
        var index;
        // حذف الصف بعد الضغط علية
        index = Details.indexOf(view);
        Details.splice(index, 1);
        index = FilterDatasource.indexOf(view);
        FilterDatasource.splice(index, 1);
        Grid.DataSource = FilterDatasource;
        Grid.Bind();
        //ReIndexingGrid();
    }
    ;
    function InitalizeGrid_Sub_Systems() {
        var res = GetResourceList("URS_");
        // Sub Systems Grid
        GridSubSystems.ElementName = "SubSystemsGrid";
        //GridUserBranch.Inserting = CurrentPrev.AddNew;
        GridSubSystems.OnRefreshed = function () {
            //debugger;
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $("SubSystemsGrid.editable").attr("disabled", "disabled");
            }
            else {
                $("SubSystemsGrid.editable").removeAttr("disabled");
            }
        };
        $("SubSystemsGrid.addable").attr("disabled", "disabled");
        GridSubSystems.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridSubSystems.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridSubSystems.InsertionMode = JsGridInsertionMode.Binding;
        GridSubSystems.OnRowDoubleClicked = FilterUserModuleBySubSystem;
        GridSubSystems.Inserting = false;
        GridSubSystems.OnItemEditing = EditingSubSystem;
        GridSubSystems.OnItemDeleting = function () { };
        GridSubSystems.Columns = [
            { type: "control", width: "2px", deleteButton: false },
            { title: res.URS_UserCode, name: "USER_CODE", type: "label", visible: false, width: "2px" },
            { title: res.URS_SYSTEMCODE, name: "SYSTEM_CODE", type: "label", visible: false, width: "2px" },
            { title: res.URS_SUBSYSTEM, name: "SUB_SYSTEM_CODE", type: "label", width: "2px" },
            { title: "Description", name: "SUB_SYSTEM_DESCE", visible: _ScreenLanguage == "en", type: "label", width: "2px" },
            { title: "الاسم", name: "SUB_SYSTEM_DESCA", visible: _ScreenLanguage == "ar", type: "label", width: "2px" },
            { title: res.URS_EXECUTE, name: "EXECUTE", type: "checkbox", width: "2px" },
            { title: res.URS_FILTER, name: "FILTER_STRING", type: "label", visible: false, width: "2px" }
        ];
        GridSubSystems.DataSource = DetailsSubSystems;
        GridSubSystems.Bind();
    }
    function InitalizeGrid_Sub_Branch_Grid() {
        var res = GetResourceList("URS_");
        // Sub Branch Grid
        GridUserBranch.ElementName = "UserBranchGrid";
        //GridUserBranch.Inserting = CurrentPrev.AddNew;
        GridUserBranch.OnRefreshed = function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $("UserBranchGrid.editable").attr("disabled", "disabled");
            }
            else {
                $("UserBranchGrid.editable").removeAttr("disabled");
            }
        };
        $("UserBranchGrid.addable").attr("disabled", "disabled");
        GridUserBranch.Editing = SharedSession.CurrentPrivileges.EDIT;
        GridUserBranch.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        GridUserBranch.InsertionMode = JsGridInsertionMode.Binding;
        GridUserBranch.Inserting = false;
        GridUserBranch.OnItemEditing = EditingBranch;
        GridUserBranch.OnItemDeleting = function () { };
        GridUserBranch.Columns = [
            { type: "control", title: " ", width: "5%", deleteButton: false },
            { title: res.URS_UserCode, name: "USER_CODE", type: "label", visible: false, width: "5%" },
            { title: "Code", name: "BRA_CODE", type: "label", width: "10%" },
            { title: "الفرع", name: "BRA_DESCL", visible: _ScreenLanguage == "ar", type: "label", width: "20%" },
            { title: "Branch Name En", name: "BRA_DESCE", visible: _ScreenLanguage == "en", type: "label", width: "20%" },
            { title: res.URS_EXECUTE, name: "EXECUTE", type: "checkbox", width: "10%" },
            { title: res.URS_Add, name: "CREATE", type: "checkbox", width: "10%" },
            { title: res.URS_Edit, name: "EDIT", type: "checkbox", width: "10%" },
            { title: res.URS_Delete, name: "DELETE", type: "checkbox", width: "10%" },
            { title: res.URS_Print, name: "PRINT", type: "checkbox", width: "10%" },
        ];
        GridUserBranch.DataSource = DetailsUserBranch;
        GridUserBranch.Bind();
    }
    function InitalizeGrid() {
        var res = GetResourceList("URS_");
        Grid.ElementName = "grid";
        Grid.Inserting = CurrentPrev.AddNew;
        Grid.OnRefreshed = function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Query) {
                $("grid.editable").attr("disabled", "disabled");
            }
            else {
                $("grid.editable").removeAttr("disabled");
            }
        };
        $("grid.addable").attr("disabled", "disabled");
        Grid.Editing = SharedSession.CurrentPrivileges.EDIT;
        Grid.ConfirmDeleteing = SharedSession.CurrentPrivileges.Remove;
        Grid.InsertionMode = JsGridInsertionMode.Binding;
        Grid.Inserting = false;
        Grid.OnItemEditing = Editing;
        Grid.OnItemDeleting = function () { };
        Grid.Columns = [
            { type: "control", width: "4%", deleteButton: false },
            { title: res.URS_Screen, name: "MODULE_DESCA", visible: _ScreenLanguage == "ar", css: 'text-align: right', type: "label", width: "15%" },
            { title: res.URS_Screen, name: "MODULE_DESCE", visible: _ScreenLanguage == "en", css: 'text-align: left', type: "label", width: "15%" },
            { title: res.URS_Operate, name: "EXECUTE", type: "checkbox", width: "5%" },
            { title: res.URS_Add, name: "CREATE", type: "checkbox", width: "5%" },
            { title: res.URS_Edit, name: "EDIT", type: "checkbox", width: "5%" },
            { title: res.URS_Delete, name: "DELETE", type: "checkbox", width: "5%" },
            { title: res.URS_Show, name: "VIEW", type: "checkbox", width: "5%" },
            { title: res.URS_Print, name: "PRINT", type: "checkbox", width: "5%" },
            { title: "ViewImages", name: "ViewImages", type: "checkbox", width: "8%" },
            { title: "EditImages", name: "EditImages", type: "checkbox", width: "8%" },
            { title: res.URS_CUSTOM1_DESC, name: "CUSTOM1_DESC", type: "label", width: "10%" },
            { title: res.URS_CUSTOM1, name: "CUSTOM1", type: "checkbox", width: "5%" },
            { title: res.URS_CUSTOM2_DESC, name: "CUSTOM2_DESC", type: "label", width: "10%" },
            { title: res.URS_CUSTOM2, name: "CUSTOM2", type: "checkbox", width: "5%" },
            { title: res.URS_CUSTOM3_DESC, name: "CUSTOM3_DESC", type: "label", width: "10%" },
            { title: res.URS_CUSTOM3, name: "CUSTOM3", type: "checkbox", width: "5%" },
            { title: res.URS_CUSTOM4_DESC, name: "CUSTOM4_DESC", type: "label", width: "10%" },
            { title: res.URS_CUSTOM4, name: "CUSTOM4", type: "checkbox", width: "5%" },
            { title: res.URS_CUSTOM5_DESC, name: "CUSTOM5_DESC", type: "label", width: "10%" },
            { title: res.URS_CUSTOM5, name: "CUSTOM5", type: "checkbox", width: "5%" },
            { title: res.URS_CUSTOM6_DESC, name: "CUSTOM6_DESC", type: "label", width: "10%" },
            { title: res.URS_CUSTOM6, name: "CUSTOM6", type: "checkbox", width: "5%" },
            { title: res.URS_CUSTOM7_DESC, name: "CUSTOM7_DESC", type: "label", width: "10%" },
            { title: res.URS_CUSTOM7, name: "CUSTOM7", type: "checkbox", width: "5%" },
            { title: res.URS_CUSTOM8_DESC, name: "CUSTOM8_DESC", type: "label", width: "10%" },
            { title: res.URS_CUSTOM8, name: "CUSTOM8", type: "checkbox", width: "5%" },
            { title: res.URS_CUSTOM9_DESC, name: "CUSTOM9_DESC", type: "label", width: "10%" },
            { title: res.URS_CUSTOM9, name: "CUSTOM9", width: "5%", type: "checkbox" }
        ];
        Grid.DataSource = Details;
        Grid.Bind();
    }
    function btnSearchUserCode_Click() {
        sys.FindKey(Modules.UsersSetting, "btnSearchUserCode", " CompCode = " + CurrentEnv.CompCode /*"SYSTEM_CODE= '" + CurrentEnv.SystemCode + "' and SUB_SYSTEM_CODE='" + CurrentEnv.SubSystemCode*/ /* + "' and CompCode = " + CurrentEnv.CompCode*/, function () {
            debugger;
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetByuserCode", ControllerName),
                data: { userCode: id },
                success: function (d) {
                    var result = d.result;
                    debugger;
                    txtUSER_CODE.value = result.USER_CODE;
                    txtUSER_NAME.value = result.USER_NAME;
                    txtcopyFrom.value = result.ManagedBy;
                    txtUSER_PASSWORD.value = result.USER_PASSWORD;
                    chkUSER_ACTIVE.checked = result.USER_ACTIVE;
                    chkKeepRelation.checked = result.LoginUrl;
                    //debugger;
                    var index = GetIndexByUseCode(result.USER_CODE, "G_USERS", "USER_CODE", " CompCode = " + CurrentEnv.CompCode);
                    NavigateToSearchResultKey(Number(index), Navigate);
                }
            });
        });
    }
    function btnCopyFrom_Click() {
        debugger;
        sys.FindKey(Modules.UsersSetting, "btnSearchUserCode", "CompCode = " + SharedSession.CurrentEnvironment.CompCode + " and USER_TYPE= 2", function () {
            var id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                type: "Get",
                url: sys.apiUrl("G_USERS", "GetByuserCode"),
                data: { userCode: id },
                success: function (d) {
                    debugger;
                    var res = d;
                    if (res.IsSuccess) {
                        Master = res.Response;
                        txtcopyFrom.value = Master.USER_CODE;
                    }
                }
            });
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
    function Insert() {
        debugger;
        if (txtUSER_CODE.value == "") {
            WorningMessage("ادخل كود المستخدم", "Please Enter UserCode");
            return;
        }
        else if (txtUSER_NAME.value == "") {
            WorningMessage("ادخل اسم المستخدم", "Please Insert UserName");
            return;
        }
        else if (txtUSER_PASSWORD.value == "") {
            WorningMessage("ادخل كلمة السر المستخدم", "Please Insert Password");
            return;
        }
        Master = new G_USERS();
        Assign();
        MasterDetails.G_USERS.USER_CODE = txtUSER_CODE.value;
        MasterDetails.G_USERS.USER_ACTIVE = true;
        MasterDetails.G_USERS.USER_PASSWORD = txtUSER_PASSWORD.value;
        MasterDetails.G_USERS.USER_NAME = txtUSER_NAME.value;
        MasterDetails.G_USERS.CompCode = Number(CurrentEnv.CompCode);
        MasterDetails.G_USERS.ManagedBy = txtcopyFrom.value;
        var session = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        debugger;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("G_USERS", "Insert"),
            data: JSON.stringify(MasterDetails),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم الحفظ بنجاح  ", "Data Saved Successfuly. ");
                    MessageBox.Show(msg, "Insert", function () {
                        debugger;
                        var _Index = GetIndexByUseCode(result.Response, "G_USERS", "USER_CODE", "CompCode = " + _CompCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                        //LoadDetails(Master.ProjectID);
                    });
                }
            }
        });
    }
    function Update() {
        debugger;
        Assign();
        MasterDetails.G_USERS.USER_CODE = txtUSER_CODE.value;
        //MasterDetails.G_USERS.USER_ACTIVE = true;
        MasterDetails.G_USERS.USER_PASSWORD = txtUSER_PASSWORD.value;
        MasterDetails.G_USERS.USER_NAME = txtUSER_NAME.value;
        MasterDetails.G_USERS.CompCode = Number(CurrentEnv.CompCode);
        MasterDetails.G_USERS.ManagedBy = txtcopyFrom.value;
        MasterDetails.G_USERS.LoginUrl = chkKeepRelation.checked;
        var session = GetSessionRecord();
        MasterDetails.sessionRecord = session;
        //AssignTrDetails();
        //AssignDetails();
        debugger;
        AjaxApi.CallsyncApi({
            type: "Post",
            url: sys.apiUrl("G_USERS", "Update"),
            data: JSON.stringify(MasterDetails),
            headers: {
                'Accept': 'application/json; charset=utf-8',
                'Content-Type': 'application/json'
            },
            success: function (d) {
                debugger;
                var result = d;
                if (result.IsSuccess == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var msg = ReturnMsg("تم التعديل بنجاح  ", "Data Updated Successfuly. ");
                    MessageBox.Show(msg, "Update", function () {
                        debugger;
                        var _Index = GetIndexByUseCode(result.Response, "G_USERS", "USER_CODE", "CompCode = " + _CompCode);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
                        //LoadDetails(Master.ProjectID);
                    });
                }
            }
        });
    }
    function Display() {
        //debugger;
        DocumentActions.RenderFromModel(Master);
        txtUSER_NAME.value = Master.USER_NAME;
        txtcopyFrom.value = Master.ManagedBy;
        txtUSER_PASSWORD.value = Master.USER_PASSWORD;
        chkUSER_ACTIVE.checked = Master.USER_ACTIVE;
        getDetails();
        LoadSubSystemDetails();
        LoadUserBranchDetails();
    }
    function getDetails() {
        //debugger;
        var _userCode = txtUSER_CODE.value;
        var _systemCode = CurrentEnv.SystemCode;
        var _subSystem = CurrentEnv.SubSystemCode;
        var _avail = true;
        Ajax.CallAsync({
            type: "Get",
            url: sys.apiUrl("G_USERS", "getDetails"),
            data: { userCode: _userCode, systemCode: _systemCode, avail: _avail },
            success: function (d) {
                //debugger;
                var res = d;
                if (res.IsSuccess) {
                    Details = res.Response;
                    FilterDatasource = Details.filter(function (x) { return x.MODULE_CODE == x.MODULE_CODE; });
                    Grid.DataSource = Details;
                    Grid.Bind();
                }
            }
        });
    }
    function LoadSubSystemDetails() {
        var _userCode = txtUSER_CODE.value;
        Ajax.CallAsync({
            url: Url.Action("LoadSubSystemDetails", ControllerName),
            data: { userCode: _userCode },
            success: function (d) {
                //debugger;
                DetailsSubSystems = d.result;
                GridSubSystems.DataSource = DetailsSubSystems;
                GridSubSystems.Bind();
            }
        });
    }
    function LoadUserBranchDetails() {
        var _userCode = txtUSER_CODE.value;
        Ajax.CallAsync({
            url: Url.Action("LoadUserBranchDetails", ControllerName),
            data: { userCode: _userCode },
            success: function (d) {
                //debugger;
                DetailsUserBranch = d.result;
                GridUserBranch.DataSource = DetailsUserBranch;
                GridUserBranch.Bind();
            }
        });
    }
    function Assign() {
        //debugger;
        Master = DocumentActions.AssignToModel(Master);
        if (chkUSER_ACTIVE.checked == true)
            Master.USER_ACTIVE = true;
        else
            Master.USER_ACTIVE = false;
        MasterDetails.G_USERS = Master;
        MasterDetails.G_USERS.USER_CODE = Master.USER_CODE;
        ;
        //AssignDetails
        MasterDetails.G_USER_MODULE = Details;
        for (var _i = 0, Details_1 = Details; _i < Details_1.length; _i++) {
            var Act = Details_1[_i];
            Act.USER_CODE = Master.USER_CODE;
            __UserDetailsArray.push(Act);
        }
        MasterDetails.G_USER_BRANCH = DetailsUserBranch;
        for (var _a = 0, DetailsUserBranch_1 = DetailsUserBranch; _a < DetailsUserBranch_1.length; _a++) {
            var bra = DetailsUserBranch_1[_a];
            Act.USER_CODE = Master.USER_CODE;
            __UserBranchDetailsArray.push(bra);
        }
        MasterDetails.G_USER_SUB_SYSTEM = DetailsSubSystems;
        for (var _b = 0, DetailsSubSystems_1 = DetailsSubSystems; _b < DetailsSubSystems_1.length; _b++) {
            var sys = DetailsSubSystems_1[_b];
            Act.USER_CODE = Master.USER_CODE;
            __UserSubSystemsArray.push(sys);
        }
    }
    function Add() {
        chkUSER_ACTIVE.checked = true;
        chkKeepRelation.checked = true;
        txtUSER_CODE.value = "";
        txtUSER_NAME.value = "";
        txtUSER_PASSWORD.value = "";
        ClearGrid(Grid, Details);
    }
    function ClearGrid(_Grid, arr) {
        if (_Grid === void 0) { _Grid = new JsGrid(); }
        arr = new Array();
        _Grid.DataSource = arr;
        _Grid.Bind();
    }
    function Edit() {
    }
    function AssignTrDetails() {
        __UserDetailsArray = new Array();
        for (var _i = 0, Details_2 = Details; _i < Details_2.length; _i++) {
            var _Row = Details_2[_i];
            _UserDetails = new G_USER_MODULE;
            var _Serial = 1 + Number(__UserDetailsArray.length);
            _UserDetails.CREATE = _Row.CREATE;
            _UserDetails.CUSTOM1 = _Row.CUSTOM1;
            _UserDetails.CUSTOM2 = _Row.CUSTOM2;
            _UserDetails.CUSTOM3 = _Row.CUSTOM3;
            _UserDetails.CUSTOM4 = _Row.CUSTOM4;
            _UserDetails.CUSTOM5 = _Row.CUSTOM5;
            _UserDetails.CUSTOM6 = _Row.CUSTOM6;
            _UserDetails.CUSTOM7 = _Row.CUSTOM7;
            _UserDetails.CUSTOM8 = _Row.CUSTOM8;
            _UserDetails.CUSTOM9 = _Row.CUSTOM9;
            _UserDetails.DELETE = _Row.DELETE;
            _UserDetails.EDIT = _Row.EDIT;
            _UserDetails.EditImages = _Row.EditImages;
            _UserDetails.EXECUTE = _Row.EXECUTE;
            _UserDetails.MODULE_CODE = _Row.MODULE_CODE;
            _UserDetails.PRINT = _Row.PRINT;
            _UserDetails.SUB_SYSTEM_CODE = _Row.SUB_SYSTEM_CODE;
            _UserDetails.SYSTEM_CODE = _Row.SYSTEM_CODE;
            _UserDetails.USER_CODE = _Row.USER_CODE;
            _UserDetails.VIEW = _Row.VIEW;
            _UserDetails.ViewImages = _Row.ViewImages;
            __UserDetailsArray.push(_UserDetails);
        }
    }
    function AssignDetails() {
        var result = true;
        var index = __UserDetailsArray.indexOf(__UserDetailsArray.filter(function (f) { return f.USER_CODE == null; })[0]);
        if (index >= 0)
            __UserDetailsArray.splice(index, 1);
        for (var _i = 0, __UserDetailsArray_1 = __UserDetailsArray; _i < __UserDetailsArray_1.length; _i++) {
            var row = __UserDetailsArray_1[_i];
            result = Ajax.Call({
                url: Url.Action("AssignDetails", "Users"),
                data: row
            });
            if (result == false) {
                break;
            }
        }
        return result;
    }
    function ReturnMsg(msg_Ar, msg_En) {
        var _Result = "";
        switch (SharedSession.CurrentEnvironment.ScreenLanguage) {
            case "ar":
                _Result = msg_Ar;
                break;
            case "en":
                _Result = msg_En;
                break;
        }
        return _Result;
    }
    function btnAddToGrid_Click() {
        if (txtmodulcode.value == "") {
            WorningMessage("يجب اختيار شاشة معينة للتعديل عليها", "");
            return;
        }
        view.MODULE_DESCA = txtmodulcode.value;
        view.EXECUTE = chkexcute.checked;
        view.CREATE = chkadd.checked;
        view.EDIT = chkedit.checked;
        view.DELETE = chkdelete.checked;
        view.VIEW = chkview.checked;
        view.PRINT = chkprint.checked;
        view.ViewImages = chkviewImg.checked;
        view.EditImages = chkEditImg.checked;
        //view.ViewImages = 
        //view.EditImages = 
        view.CUSTOM1_DESC = txtcustom1.value;
        view.CUSTOM1 = chkcustom1.checked;
        view.CUSTOM2_DESC = txtcustom2.value;
        view.CUSTOM2 = chkcustom2.checked;
        view.CUSTOM3_DESC = txtcustom3.value;
        view.CUSTOM3 = chkcustom3.checked;
        view.CUSTOM4_DESC = txtcustom4.value;
        view.CUSTOM4 = chkcustom4.checked;
        view.CUSTOM5_DESC = txtcustom5.value;
        view.CUSTOM5 = chkcustom5.checked;
        view.CUSTOM6_DESC = txtcustom6.value;
        view.CUSTOM6 = chkcustom6.checked;
        view.CUSTOM7_DESC = txtcustom7.value;
        view.CUSTOM7 = chkcustom7.checked;
        view.CUSTOM8_DESC = txtcustom8.value;
        view.CUSTOM8 = chkcustom8.checked;
        view.CUSTOM9_DESC = txtcustom9.value;
        view.CUSTOM9 = chkcustom9.checked;
        FilterDatasource.unshift(view);
        Details.unshift(view);
        Grid.DataSource = FilterDatasource;
        Grid.Bind();
        restControles();
    }
    function txtcustom1_Clicked() {
        $('#txtcustom1').toggleClass('txtclicked');
        if (chkcustom1.checked == true) {
            chkcustom1.checked = false;
        }
        else {
            chkcustom1.checked = true;
        }
    }
    function txtcustom2_Clicked() {
        $('#txtcustom2').toggleClass('txtclicked');
        if (chkcustom2.checked == true) {
            chkcustom2.checked = false;
        }
        else {
            chkcustom2.checked = true;
        }
    }
    function txtcustom3_Clicked() {
        $('#txtcustom3').toggleClass('txtclicked');
        if (chkcustom3.checked == true) {
            chkcustom3.checked = false;
        }
        else {
            chkcustom3.checked = true;
        }
    }
    function txtcustom4_Clicked() {
        $('#txtcustom4').toggleClass('txtclicked');
        if (chkcustom4.checked == true) {
            chkcustom4.checked = false;
        }
        else {
            chkcustom4.checked = true;
        }
    }
    function txtcustom5_Clicked() {
        $('#txtcustom5').toggleClass('txtclicked');
        if (chkcustom5.checked == true) {
            chkcustom5.checked = false;
        }
        else {
            chkcustom5.checked = true;
        }
    }
    function txtcustom6_Clicked() {
        $('#txtcustom6').toggleClass('txtclicked');
        if (chkcustom6.checked == true) {
            chkcustom6.checked = false;
        }
        else {
            chkcustom6.checked = true;
        }
    }
    function txtcustom7_Clicked() {
        $('#txtcustom7').toggleClass('txtclicked');
        if (chkcustom7.checked == true) {
            chkcustom7.checked = false;
        }
        else {
            chkcustom7.checked = true;
        }
    }
    function txtcustom8_Clicked() {
        $('#txtcustom8').toggleClass('txtclicked');
        if (chkcustom8.checked == true) {
            chkcustom8.checked = false;
        }
        else {
            chkcustom8.checked = true;
        }
    }
    function txtcustom9_Clicked() {
        $('#txtcustom9').toggleClass('txtclicked');
        if (chkcustom9.checked == true) {
            chkcustom9.checked = false;
        }
        else {
            chkcustom9.checked = true;
        }
    }
    function restControles() {
        if (chkexcute.checked == true || chkadd.checked == true || chkedit.checked == true || chkdelete.checked == true || chkview.checked == true || chkprint.checked == true || chkviewImg.checked == true || chkEditImg.checked == true) {
            chkexcute.checked = false;
            chkadd.checked = false;
            chkedit.checked = false;
            chkdelete.checked = false;
            chkview.checked = false;
            chkprint.checked = false;
            chkviewImg.checked = false;
            chkEditImg.checked = false;
        }
        txtcustom1.disabled = false;
        txtcustom2.disabled = false;
        txtcustom3.disabled = false;
        txtcustom4.disabled = false;
        txtcustom5.disabled = false;
        txtcustom6.disabled = false;
        txtcustom7.disabled = false;
        txtcustom8.disabled = false;
        txtcustom9.disabled = false;
        $('#txtcustom1').removeClass('txtclicked');
        $('#txtcustom2').removeClass('txtclicked');
        $('#txtcustom3').removeClass('txtclicked');
        $('#txtcustom4').removeClass('txtclicked');
        $('#txtcustom5').removeClass('txtclicked');
        $('#txtcustom6').removeClass('txtclicked');
        $('#txtcustom7').removeClass('txtclicked');
        $('#txtcustom8').removeClass('txtclicked');
        $('#txtcustom9').removeClass('txtclicked');
        txtmodulcode.value = "";
        txtcustom1.value = "";
        txtcustom2.value = "";
        txtcustom3.value = "";
        txtcustom4.value = "";
        txtcustom5.value = "";
        txtcustom6.value = "";
        txtcustom7.value = "";
        txtcustom8.value = "";
        txtcustom9.value = "";
    }
    function PrintUser() {
        debugger;
        if (Master == null)
            return;
        Ajax.CallAsync({
            url: Url.Action("PrintUser", "PrintTransaction"),
            data: { UserCode: Master.USER_CODE },
            success: function (d) {
                var url = d.result;
                window.open(url, "_blank");
            }
        });
    }
    function FilterUserModuleBySubSystem() {
        debugger;
        var selectedItem = GridSubSystems.SelectedItem;
        FilterDatasource = Details.filter(function (x) { return x.SUB_SYSTEM_CODE == selectedItem.SUB_SYSTEM_CODE; });
        Grid.DataSource = FilterDatasource;
        Grid.Bind();
    }
})(Users || (Users = {}));
//# sourceMappingURL=G_USERS.js.map