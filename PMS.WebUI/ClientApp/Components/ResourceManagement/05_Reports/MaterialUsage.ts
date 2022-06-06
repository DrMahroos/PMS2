$(document).ready(() => {
    MaterialUsage.InitalizeComponent();
});
namespace MaterialUsage {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "MaterialUsage";


    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;


    //var txtitemcodeID: HTMLInputElement;
    //var txtitemcodeRP: HTMLInputElement;
    //var btnitemcodeRP: HTMLButtonElement;
    //var txtitemcode1RP: HTMLInputElement;




    var txtProjectID: HTMLInputElement;
    var txtProjectRP: HTMLInputElement;
    var btnProjectRP: HTMLButtonElement;
    var txtProject1RP: HTMLInputElement;


    var txtCustomerClassID: HTMLInputElement;
    var txtCustomerClassRP: HTMLInputElement;
    var btnCustomerClassRP: HTMLButtonElement;
    var txtCustomerClass1RP: HTMLInputElement;

    var txtCustomerID: HTMLInputElement;
    var txtCustomerRP: HTMLInputElement;
    var btnCustomerRP: HTMLButtonElement;
    var txtCustomer1RP: HTMLInputElement;


    var txtScopeClassID: HTMLInputElement;
    var txtScopeClassRP: HTMLInputElement;
    var btnScopeClassRP: HTMLButtonElement;
    var txtScopeClass1RP: HTMLInputElement;



    var txtScopeID: HTMLInputElement;
    var txtScopeRP: HTMLInputElement;
    var btnScopeRP: HTMLButtonElement;
    var txtScope1RP: HTMLInputElement;


    var txtitemcodeID: HTMLInputElement;
    var txtitemcodeRP: HTMLInputElement;
    var btnitemcodeRP: HTMLButtonElement;
    var txtitemcode1RP: HTMLInputElement;


    var txtMaterialCatID: HTMLInputElement;
    var txtMaterialCatRP: HTMLInputElement;
    var btnMaterialCatRP: HTMLButtonElement;
    var txtMaterialCat1RP: HTMLInputElement;


    //var FromMat: HTMLInputElement;
    //var ToMat: HTMLInputElement;


    var _ScreenLanguage: string;


    export function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        InitalizeControls();
        InitalizeEvents();


    }
    function InitalizeControls() {


        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");


        //txtitemcodeID = DocumentActions.GetElementById<HTMLInputElement>("txtitemcodeID");
        //txtitemcodeRP = DocumentActions.GetElementById<HTMLInputElement>("txtitemcodeRP");
        //btnitemcodeRP = DocumentActions.GetElementById<HTMLButtonElement>("btnitemcodeRP");
        //txtitemcode1RP = DocumentActions.GetElementById<HTMLInputElement>("txtitemcode1RP");


        txtProjectID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectID");
        txtProjectRP = DocumentActions.GetElementById<HTMLInputElement>("txtProjectRP");
        btnProjectRP = DocumentActions.GetElementById<HTMLButtonElement>("btnProjectRP");
        txtProject1RP = DocumentActions.GetElementById<HTMLInputElement>("txtProject1RP");



        txtCustomerClassID = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerClassID");
        txtCustomerClassRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerClassRP");
        btnCustomerClassRP = DocumentActions.GetElementById<HTMLButtonElement>("btnCustomerClassRP");
        txtCustomerClass1RP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerClass1RP");


        txtCustomerID = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerID");
        txtCustomerRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerRP");
        btnCustomerRP = DocumentActions.GetElementById<HTMLButtonElement>("btnCustomerRP");
        txtCustomer1RP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomer1RP");



        txtScopeClassID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeClassID");
        txtScopeClassRP = DocumentActions.GetElementById<HTMLInputElement>("txtScopeClassRP");
        btnScopeClassRP = DocumentActions.GetElementById<HTMLButtonElement>("btnScopeClassRP");
        txtScopeClass1RP = DocumentActions.GetElementById<HTMLInputElement>("txtScopeClass1RP");


        txtScopeID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeID");
        txtScopeRP = DocumentActions.GetElementById<HTMLInputElement>("txtScopeRP");
        btnScopeRP = DocumentActions.GetElementById<HTMLButtonElement>("btnScopeRP");
        txtScope1RP = DocumentActions.GetElementById<HTMLInputElement>("txtScope1RP");



        txtitemcodeID = DocumentActions.GetElementById<HTMLInputElement>("txtitemcodeID");
        txtitemcodeRP = DocumentActions.GetElementById<HTMLInputElement>("txtitemcodeRP");
        btnitemcodeRP = DocumentActions.GetElementById<HTMLButtonElement>("btnitemcodeRP");
        txtitemcode1RP = DocumentActions.GetElementById<HTMLInputElement>("txtitemcode1RP");


        txtMaterialCatID = DocumentActions.GetElementById<HTMLInputElement>("txtMaterialCatID");
        txtMaterialCatRP = DocumentActions.GetElementById<HTMLInputElement>("txtMaterialCatRP");
        btnMaterialCatRP = DocumentActions.GetElementById<HTMLButtonElement>("btnMaterialCatRP");
        txtMaterialCat1RP = DocumentActions.GetElementById<HTMLInputElement>("txtMaterialCat1RP");



        //FromMat = DocumentActions.GetElementById<HTMLInputElement>("FromMat");
        //ToMat = DocumentActions.GetElementById<HTMLInputElement>("ToMat");


    }
    function Clear() {
        debugger;


        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());


        txtitemcodeID.value = "";
        txtitemcodeRP.value = "";
        txtitemcode1RP.value = "";

        txtProjectID.value = "";
        txtProjectRP.value = "";
        txtProject1RP.value = "";



        txtCustomerClassID.value = "";
        txtCustomerClassRP.value = "";
        txtCustomerClass1RP.value = "";

        txtCustomerID.value = "";
        txtCustomerRP.value = "";
        txtCustomer1RP.value = "";




        txtScopeClassID.value = "";
        txtScopeClassRP.value = "";
        txtScopeClass1RP.value = "";


        txtScopeID.value = "";
        txtScopeRP.value = "";
        txtScope1RP.value = "";


        txtitemcodeID.value = "";
        txtitemcodeRP.value = "";
        txtitemcode1RP.value = "";

        txtMaterialCatID.value = "";
        txtMaterialCatRP.value = "";
        txtMaterialCat1RP.value = "";



        //FromMat.value = "";
        //ToMat.value = "";


    }
    function Print() {
        debugger
        let RP: ReportParameters = new ReportParameters();

        if (DateFormat(FromDate.value) == "NaN-NaN-NaN" || DateFormat(ToDate.value) == "NaN-NaN-NaN") {
            MessageBox.Show(" you must select Date", "Info");
            return;
        }
        else if (DateFormat(FromDate.value) > DateFormat(ToDate.value)) {
            MessageBox.Show(" From date  is largethan To Date", "Info");
            return;
        }
        else if ((txtitemcodeID.value) == "") {
            MessageBox.Show("there is empty input you must select item code", "Info");

        }
        else {


            RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
            RP.FromDate = DateFormat(FromDate.value);
            RP.ToDate = DateFormat(ToDate.value);
            RP.ItemId = Number(txtitemcodeID.value);
            RP.ProjectID = Number(txtProjectID.value);
            RP.custClassID = Number(txtCustomerClassID.value);
            RP.customerID = Number(txtCustomerID.value);
            RP.scopeClassId = Number(txtScopeClassID.value);
            RP.ScopeID = Number(txtScopeID.value);







            if (<boolean>$("#RAD_summary").prop("checked")) {
                RP.TypeReport = 1;

                Ajax.CallAsync({
                    url: Url.Action("rptRes_MaterialUsage", "GeneralReports"),
                    data: RP,
                    success: (d) => {
                        debugger
                        let result = d.result as string;
                        window.open(result, "_blank");
                    }
                })


            }

            if (<boolean>$("#RAD_Detail").prop("checked")) {
                RP.TypeReport = 2;

                Ajax.CallAsync({
                    url: Url.Action("rptRes_MaterialUsage", "GeneralReports"),
                    data: RP,
                    success: (d) => {
                        debugger
                        let result = d.result as string;
                        window.open(result, "_blank");
                    }
                })
            }


        }


    }

    function InitalizeEvents() {
        debugger

        FromDate.value = DateFormat(new Date().toString());

        ToDate.value = DateFormat(new Date().toString());
        $("#RAD_summary").prop("checked", "checked");
        btnProjectRP.onclick = btnProjectRP_Click; //-----
        btnCustomerClassRP.onclick = btnCustomerClassRP_Click;
        btnCustomerRP.onclick = btnCustomerRP_Click;
        btnScopeClassRP.onclick = btnScopeClassRP_Click;
        btnScopeRP.onclick = btnScopeRP_Click;
        btnitemcodeRP.onclick = btnitemcodeRP_Click;  //-----
        //btnMaterialCatRP.onclick = btnMaterialCatRP_Click;  //-----

        //btnAreaRP.onclick = btnAreaRP_Click;

    }




    function btnProjectRP_Click() {
        debugger;
        sys.FindKey(Modules.LaborMonitoring, "butProj_Code", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProject", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as P_TR_EngProject;
                    txtProjectID.value = result.ProjectID.toString();
                    txtProjectRP.value = result.ProjectCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtProject1RP.value = result.DescA;
                    }
                    else {
                        txtProject1RP.value = result.DescL;
                    }

                }
            });
        })
    }

    function btnCustomerClassRP_Click() {
        debugger;
        sys.FindKey(Modules.MaterialUsage, "btnCustomerClassRP", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomerClass", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_SalesCustomerCategory;
                    txtCustomerClassID.value = result.CustomerCategoryID.toString();
                    txtCustomerClassRP.value = result.CustomerCatCode.toString();

                    if (_ScreenLanguage == "ar") {
                        debugger
                        txtCustomerClass1RP.value = result.DescA;
                    }
                    else {
                        debugger
                        txtCustomerClass1RP.value = result.DescE;
                    }

                }
            });
        })
    }

    function btnCustomerRP_Click() {
        debugger;
        sys.FindKey(Modules.MaterialUsage, "btnCustomerRP", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetCustomer", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_SalesCustomer;
                    txtCustomerID.value = result.CustomerID.toString();
                    txtCustomerRP.value = result.CustomerCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtCustomer1RP.value = result.DescA.toString();
                    }
                    else {
                        txtCustomer1RP.value = result.DescE.toString();
                    }

                }
            });
        })
    }

    function btnScopeClassRP_Click() {
        debugger;

        sys.FindKey(Modules.MaterialUsage, "btnScopeClassRP", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetScopeClass", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    debugger;
                    let result = d.result as P_D_ScopeCategory;
                    txtScopeClassID.value = result.ScopeCategoryID.toString();
                    txtScopeClassRP.value = result.ScopeCategCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtScopeClass1RP.value = result.DescA;
                    }
                    else {
                        txtScopeClass1RP.value = result.DescE;
                    }

                }
            });
        })



    }

    function btnScopeRP_Click() {
        debugger;
        sys.FindKey(Modules.MaterialUsage, "btnScopeRP", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetScope", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_Scope;
                    txtScopeID.value = result.ScopeID.toString();
                    txtScopeRP.value = result.ScopeCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtScope1RP.value = result.DescA.toString();
                    }
                    else {
                        txtScope1RP.value = result.DescE.toString();
                    }

                }
            });
        })
    }

    function btnitemcodeRP_Click() {
        debugger;
        sys.FindKey(Modules.MaterialUsage, "btnItemCodeRP", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetItemCodeSearch", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as IQ_SrchItem;
                    txtitemcodeID.value = result.ItemID.toString();
                    txtitemcodeRP.value = result.ItemCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtitemcode1RP.value = result.DescA.toString();
                    }
                    else {
                        txtitemcode1RP.value = result.DescL.toString();
                    }

                }
            });
        })
    }

    
}