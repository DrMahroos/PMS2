$(document).ready(() => {
    ProjectStatus.InitalizeComponent();


});
namespace ProjectStatus {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "ProjectStatus";

    var ToDate: HTMLInputElement;

    var txtFromProject: HTMLInputElement;
    var txtToProject: HTMLInputElement;


    var txtSalesCodeID: HTMLInputElement;
    var txtProjectCode: HTMLInputElement;
    var butSalesCode: HTMLButtonElement;
    var txtSalesDescription: HTMLInputElement;

    var CustomerCategoryID: HTMLInputElement;
    var CustomerCatCode: HTMLInputElement;
    var butCustomerClass: HTMLButtonElement;
    var txtCustomerClassDescription: HTMLInputElement;

    var CustomerID: HTMLInputElement;
    var CustomerCode: HTMLInputElement;
    var btnCustomer: HTMLButtonElement;
    var CustomerDescription: HTMLInputElement;


    var _ScreenLanguage: string;


    export function InitalizeComponent() {

        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;

        InitalizeControls();
        //FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        InitalizeEvents();
    }
    function InitalizeControls() {

        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");
        txtFromProject = DocumentActions.GetElementById<HTMLInputElement>("txtFromProject");
        txtToProject = DocumentActions.GetElementById<HTMLInputElement>("txtToProject");

        txtSalesCodeID = DocumentActions.GetElementById<HTMLInputElement>("txtSalesCodeID");
        txtProjectCode = DocumentActions.GetElementById<HTMLInputElement>("txtProjectCode");
        butSalesCode = DocumentActions.GetElementById<HTMLButtonElement>("butSalesCode");
        txtSalesDescription = DocumentActions.GetElementById<HTMLInputElement>("txtSalesDescription");

        CustomerCategoryID = DocumentActions.GetElementById<HTMLInputElement>("CustomerCategoryID");
        CustomerCatCode = DocumentActions.GetElementById<HTMLInputElement>("CustomerCatCode");
        butCustomerClass = DocumentActions.GetElementById<HTMLButtonElement>("butCustomerClass");
        txtCustomerClassDescription = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerClassDescription");

        CustomerID = DocumentActions.GetElementById<HTMLInputElement>("CustomerID");
        CustomerCode = DocumentActions.GetElementById<HTMLInputElement>("CustomerCode");
        btnCustomer = DocumentActions.GetElementById<HTMLButtonElement>("btnCustomer");
        CustomerDescription = DocumentActions.GetElementById<HTMLInputElement>("CustomerDescription");


    }
    function InitalizeEvents() {
        debugger

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
        debugger
        if (txtFromProject.value == "" && txtToProject.value == "") {
            MessageBox.Show("You Must Select From Project And To Project ", "Info");
            return;
        }
        let RP: ReportParameters = new ReportParameters();
        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;

        RP.Custid = Number(CustomerID.value);
        RP.EngID = Number(txtSalesCodeID.value);
        RP.CatID = Number(CustomerCategoryID.value);
        RP.ToDate = DateFormat(ToDate.value);
        RP.ToProjCode = txtToProject.value;
        RP.FromProjCode = txtFromProject.value;
        debugger
        Ajax.CallAsync({
            url: Url.Action("rptEngProjectStatus", "GeneralReports"),
            data: RP,
            success: (d) => {
                debugger
                let result = d.result as string;
                window.open(result, "_blank");
            }
        })






    }



    function butSalesCodeRP_Click() {
        debugger;
        sys.FindKey(Modules.ProjectStatus, "butSalesCode", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;

            Ajax.CallAsync({
                url: Url.Action("GetSalesCodeByID", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    debugger;
                    let result = d.result as P_D_SalesEgineer;
                    txtSalesCodeID.value = result.SalesEngineerId.toString();
                    txtProjectCode.value = result.EngCode;
                    txtSalesDescription.value = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? result.DeacA : result.DescE;

                }
            });
        })
    }

    function butCustomerClass_onclick() {
        debugger;
        sys.FindKey(Modules.ProjectStatus, "butCustomerClass", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerClassById", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as P_D_SalesCustomerCategory;
                    CustomerCategoryID.value = result.CustomerCategoryID.toString();
                    CustomerCatCode.value = result.CustomerCatCode;
                    txtCustomerClassDescription.value = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? result.DescA : result.DescE;


                }
            });
        })
    }

    function btnCustomer_onclick() {
        debugger;
        sys.FindKey(Modules.ProjectStatus, "btnCustomer", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerById", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_SalesCustomer;
                    CustomerID.value = result.CustomerID.toString();
                    CustomerCode.value = result.CustomerCode.toString();
                    CustomerDescription.value = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? result.DescA : result.DescE;


                }
            });
        })
    }

}