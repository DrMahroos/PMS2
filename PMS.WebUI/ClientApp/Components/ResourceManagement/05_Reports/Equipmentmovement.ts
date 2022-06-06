$(document).ready(() => {
    Equipmentmovement.InitalizeComponent();
});
namespace Equipmentmovement {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "Equipmentmovement";
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;


    var txtFromProjectRP: HTMLInputElement;
    var txtToProjectRP: HTMLInputElement;


    var txtEquipmentClassID: HTMLInputElement;
    var txtEquipmentClassRP: HTMLInputElement;
    var btnEquipmentClassRP: HTMLButtonElement;
    var txtEquipmentClass1RP: HTMLInputElement;


    var txtFromEquipmentID: HTMLInputElement;
    var txtFromEquipmentRP: HTMLInputElement;
    var btnFromEquipmentRP: HTMLButtonElement;
    var txtFromEquipment1RP: HTMLInputElement;



    var txtToEquipmentID: HTMLInputElement;
    var txtToEquipmentRP: HTMLInputElement;
    var btnToEquipmentRP: HTMLButtonElement;
    var txtToEquipment1RP: HTMLInputElement;


    var txtCustomerCatID: HTMLInputElement;
    var txtCustomerCatRP: HTMLInputElement;
    var btnCustomerCatRP: HTMLButtonElement;
    var txtCustomerCat1RP: HTMLInputElement;

    var txtCustomerID: HTMLInputElement;
    var txtCustomerRP: HTMLInputElement;
    var btnCustomerRP: HTMLButtonElement;
    var txtCustomer1RP: HTMLInputElement;

    var txtEquipClassID: HTMLInputElement;
    var txtEquipClassRP: HTMLInputElement;
    var btnEquipClassRP: HTMLButtonElement;
    var txtEquipClass1RP: HTMLInputElement;


    var txtFromEquipRP: HTMLButtonElement;
    var txtToEquipRP: HTMLInputElement;
    

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


        txtFromProjectRP = DocumentActions.GetElementById<HTMLInputElement>("txtFromProjectRP");
        txtToProjectRP = DocumentActions.GetElementById<HTMLInputElement>("txtToProjectRP");



        txtEquipmentClassID = DocumentActions.GetElementById<HTMLInputElement>("txtEquipmentClassID");
        txtEquipmentClassRP = DocumentActions.GetElementById<HTMLInputElement>("txtEquipmentClassRP");
        btnEquipmentClassRP = DocumentActions.GetElementById<HTMLButtonElement>("btnEquipmentClassRP");
        txtEquipmentClass1RP = DocumentActions.GetElementById<HTMLInputElement>("txtEquipmentClass1RP");


        txtFromEquipmentID = DocumentActions.GetElementById<HTMLInputElement>("txtFromEquipmentID");
        txtFromEquipmentRP = DocumentActions.GetElementById<HTMLInputElement>("txtFromEquipmentRP");
        btnFromEquipmentRP = DocumentActions.GetElementById<HTMLButtonElement>("btnFromEquipmentRP");
        txtFromEquipment1RP = DocumentActions.GetElementById<HTMLInputElement>("txtFromEquipment1RP");

        txtToEquipmentID = DocumentActions.GetElementById<HTMLInputElement>("txtToEquipmentID");
        txtToEquipmentRP = DocumentActions.GetElementById<HTMLInputElement>("txtToEquipmentRP");
        btnToEquipmentRP = DocumentActions.GetElementById<HTMLButtonElement>("btnToEquipmentRP");
        txtToEquipment1RP = DocumentActions.GetElementById<HTMLInputElement>("txtToEquipment1RP");


        txtCustomerCatID = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerCatID");
        txtCustomerCatRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerCatRP");
        btnCustomerCatRP = DocumentActions.GetElementById<HTMLButtonElement>("btnCustomerCatRP");
        txtCustomerCat1RP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerCat1RP");

        txtCustomerID = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerID");
        txtCustomerRP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomerRP");
        btnCustomerRP = DocumentActions.GetElementById<HTMLButtonElement>("btnCustomerRP");
        txtCustomer1RP = DocumentActions.GetElementById<HTMLInputElement>("txtCustomer1RP");



        txtEquipClassID = DocumentActions.GetElementById<HTMLInputElement>("txtEquipClassID");
        txtEquipClassRP = DocumentActions.GetElementById<HTMLInputElement>("txtEquipClassRP");
        btnEquipClassRP = DocumentActions.GetElementById<HTMLButtonElement>("btnEquipClassRP");
        txtEquipClass1RP = DocumentActions.GetElementById<HTMLInputElement>("txtEquipClass1RP");


        txtFromEquipRP = DocumentActions.GetElementById<HTMLButtonElement>("txtFromEquipRP");
        txtToEquipRP = DocumentActions.GetElementById<HTMLInputElement>("txtToEquipRP");



    }
    function Clear() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());

        txtFromProjectRP.value = "";
        txtToProjectRP.value = "";

        txtEquipmentClassID.value = "";
        txtEquipmentClassRP.value = "";
        txtEquipmentClass1RP.value = "";


        txtFromEquipmentID.value = "";
        txtFromEquipmentRP.value = "";
        txtFromEquipment1RP.value = "";

        txtToEquipmentID.value = "";
        txtToEquipmentRP.value = "";
        txtToEquipment1RP.value = "";

        txtCustomerCatID.value = "";
        txtCustomerCatRP.value = "";
        txtCustomerCat1RP.value = "";

        txtCustomerID.value = "";
        txtCustomerRP.value = "";
        txtCustomer1RP.value = "";

        txtEquipClassID.value = "";
        txtEquipClassRP.value = "";
        txtEquipClass1RP.value = "";


        txtFromEquipRP.value = "";
        txtToEquipRP.value = "";

        
         

    }
    function Print() {
        debugger
        let RP: ReportParameters = new ReportParameters();

        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        if (DateFormat(FromDate.value) == "NaN-NaN-NaN" || DateFormat(ToDate.value) == "NaN-NaN-NaN") {
            MessageBox.Show(" you must select Date", "Info");
            return;
        }
        else if (DateFormat(FromDate.value) > DateFormat(ToDate.value)) {
            MessageBox.Show(" From date  is largethan To Date", "Info");
            return;
        }
        else {

            RP.FromDate = DateFormat(FromDate.value);
            RP.ToDate = DateFormat(ToDate.value);
            RP.EquipClassID = Number(txtEquipmentClassID.value);
            RP.FromEquipCode = txtFromEquipmentID.value;
            RP.ToEquipCode = txtToEquipmentID.value;




            Ajax.CallAsync({
                url: Url.Action("rptEquipmentmovement", "GeneralReports"),
                data: RP,
                success: (d) => {
                    debugger
                    let result = d.result as string;
                    window.open(result, "_blank");
                }
            })

        }
        }
    function InitalizeEvents() {
        debugger
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        //$("#RDByShowContracts").prop("checked", "checked");
        btnEquipmentClassRP.onclick = btnEquipmentClassRP_Click;
        btnFromEquipmentRP.onclick = btnFromEquipmentRP_Click;
        btnToEquipmentRP.onclick = btnToEquipmentRP_Click;
        
    }
    function btnEquipmentClassRP_Click() {
        debugger;
        sys.FindKey(Modules.EquipmentAssign, "btnSearchClass", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchEquipmentClass", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as P_D_EquipmentClass;
                    txtEquipmentClassID.value = result.EquipClassId.toString();
                    txtEquipmentClassRP.value = result.ClassCode;

                    if (_ScreenLanguage == "ar") {
                        txtEquipmentClass1RP.value = result.DescA;
                    }
                    else {
                        txtEquipmentClass1RP.value = result.DescE;
                    }

                }
            });
        })
    }
    function btnFromEquipmentRP_Click() {
        debugger;
        sys.FindKey(Modules.Equipmentmovement, "btnFromEquipmentRP", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSearchFromEquipment", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    debugger;
                    let result = d.result as P_D_Equipment;
                    txtFromEquipmentID.value = result.EquimentID.toString();
                    txtFromEquipmentRP.value = result.Equipcode;
                    if (_ScreenLanguage == "ar") {
                        txtFromEquipment1RP.value = result.DescA;
                    }
                    else {
                        txtFromEquipment1RP.value = result.DescE;
                    }

                }
            });
        })

       
    }
    function btnToEquipmentRP_Click() {
        debugger;
        sys.FindKey(Modules.Equipmentmovement, "btnToEquipmentRP", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetToEquipment", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_Equipment;
                    txtToEquipmentID.value = result.EquimentID.toString();
                    txtToEquipmentRP.value = result.Equipcode;

                    if (_ScreenLanguage == "ar") {
                        txtToEquipment1RP.value = result.DescA.toString();
                    }
                    else {
                        txtToEquipment1RP.value = result.DescE.toString();
                    }

                }
            });
        })
    }
   
    


}