$(document).ready(function () {
    ProjectStatus.InitalizeComponent();
});
var ProjectStatus;
(function (ProjectStatus) {
    var sys = new SystemTools();
    var ControllerName = "ProjectStatus";
    var ToDate;
    var txtFromProject;
    var txtToProject;
    var txtSalesCodeID;
    var txtProjectCode;
    var butSalesCode;
    var txtSalesDescription;
    var CustomerCategoryID;
    var CustomerCatCode;
    var butCustomerClass;
    var txtCustomerClassDescription;
    var CustomerID;
    var CustomerCode;
    var btnCustomer;
    var CustomerDescription;
    var _ScreenLanguage;
    function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        //FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
    }
    ProjectStatus.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        ToDate = DocumentActions.GetElementById("ToDate");
        txtFromProject = DocumentActions.GetElementById("txtFromProject");
        txtToProject = DocumentActions.GetElementById("txtToProject");
        txtSalesCodeID = DocumentActions.GetElementById("txtSalesCodeID");
        txtProjectCode = DocumentActions.GetElementById("txtProjectCode");
        butSalesCode = DocumentActions.GetElementById("butSalesCode");
        txtSalesDescription = DocumentActions.GetElementById("txtSalesDescription");
        CustomerCategoryID = DocumentActions.GetElementById("CustomerCategoryID");
        CustomerCatCode = DocumentActions.GetElementById("CustomerCatCode");
        butCustomerClass = DocumentActions.GetElementById("butCustomerClass");
        txtCustomerClassDescription = DocumentActions.GetElementById("txtCustomerClassDescription");
        CustomerID = DocumentActions.GetElementById("CustomerID");
        CustomerCode = DocumentActions.GetElementById("CustomerCode");
        btnCustomer = DocumentActions.GetElementById("btnCustomer");
        CustomerDescription = DocumentActions.GetElementById("CustomerDescription");
    }
    function InitalizeEvents() {
        debugger;
        butSalesCode.onclick = butSalesCodeRP_Click;
        butCustomerClass.onclick = butCustomerClass_onclick;
        btnCustomer.onclick = btnCustomer_onclick;
    }
    function Clear() {
        ToDate.value = DateFormat(new Date().toString());
        txtFromProject.value = "";
        txtToProject.value = "";
        txtSalesCodeID.value = "";
        txtProjectCode.value = "";
        txtSalesDescription.value = "";
        CustomerCategoryID.value = "";
        CustomerCatCode.value = "";
        txtCustomerClassDescription.value = "";
        CustomerID.value = "";
        CustomerCode.value = "";
        CustomerDescription.value = "";
    }
    function Print() {
        debugger;
        if (txtFromProject.value == "" && txtToProject.value == "") {
            MessageBox.Show("You Must Select From Project And To Project ", "Info");
            return;
        }
        var RP = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.Custid = Number(CustomerID.value);
        RP.EngID = Number(txtSalesCodeID.value);
        RP.CatID = Number(CustomerCategoryID.value);
        RP.ToDate = DateFormat(ToDate.value);
        RP.ToProjCode = txtToProject.value;
        RP.FromProjCode = txtFromProject.value;
        debugger;
        Ajax.CallAsync({
            url: Url.Action("rptEngProjectStatus", "GeneralReports"),
            data: RP,
            success: function (d) {
                debugger;
                var result = d.result;
                window.open(result, "_blank");
            }
        });
    }
    function butSalesCodeRP_Click() {
        debugger;
        sys.FindKey(Modules.ProjectStatus, "butSalesCode", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSalesCodeByID", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    debugger;
                    var result = d.result;
                    txtSalesCodeID.value = result.SalesEngineerId.toString();
                    txtProjectCode.value = result.EngCode;
                    txtSalesDescription.value = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? result.DeacA : result.DescE;
                }
            });
        });
    }
    function butCustomerClass_onclick() {
        debugger;
        sys.FindKey(Modules.ProjectStatus, "butCustomerClass", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerClassById", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    CustomerCategoryID.value = result.CustomerCategoryID.toString();
                    CustomerCatCode.value = result.CustomerCatCode;
                    txtCustomerClassDescription.value = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? result.DescA : result.DescE;
                }
            });
        });
    }
    function btnCustomer_onclick() {
        debugger;
        sys.FindKey(Modules.ProjectStatus, "btnCustomer", "", function () {
            debugger;
            var _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerById", ControllerName),
                data: { id: _Id },
                success: function (d) {
                    var result = d.result;
                    CustomerID.value = result.CustomerID.toString();
                    CustomerCode.value = result.CustomerCode.toString();
                    CustomerDescription.value = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? result.DescA : result.DescE;
                }
            });
        });
    }
})(ProjectStatus || (ProjectStatus = {}));
//# sourceMappingURL=ProjectStatus.js.map