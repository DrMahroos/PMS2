$(document).ready(() => {
    AttendanceSheet.InitalizeComponent();
});
namespace AttendanceSheet {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "AttendanceSheet";

    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;


    var txtLaborClassID: HTMLInputElement;
    var txtLaborClassRP: HTMLInputElement;
    var btnLaborClassRP: HTMLButtonElement;
    var txtLaborClass1RP: HTMLInputElement;


    var txtFromLaborRP: HTMLButtonElement;
    var txtToLaborRP: HTMLInputElement;


    var txtLabCatID: HTMLInputElement;
    var txtLabCatRP: HTMLInputElement;
    var btnLabCatRP: HTMLButtonElement;
    var txtLabCat1RP: HTMLInputElement;


    //var date: string;

   

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



        txtLaborClassID = DocumentActions.GetElementById<HTMLInputElement>("txtLaborClassID");
        txtLaborClassRP = DocumentActions.GetElementById<HTMLInputElement>("txtLaborClassRP");
        btnLaborClassRP = DocumentActions.GetElementById<HTMLButtonElement>("btnLaborClassRP");
        txtLaborClass1RP = DocumentActions.GetElementById<HTMLInputElement>("txtLaborClass1RP");

        txtFromLaborRP = DocumentActions.GetElementById<HTMLInputElement>("txtFromLaborRP");
        txtToLaborRP = DocumentActions.GetElementById<HTMLInputElement>("txtToLaborRP");

        txtLabCatID = DocumentActions.GetElementById<HTMLInputElement>("txtLabCatID");
        txtLabCatRP = DocumentActions.GetElementById<HTMLInputElement>("txtLabCatRP");
        btnLabCatRP = DocumentActions.GetElementById<HTMLButtonElement>("btnLabCatRP");
        txtLabCat1RP = DocumentActions.GetElementById<HTMLInputElement>("txtLabCat1RP");




    }
    function Clear() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());


        txtLaborClassID.value = "";
        txtLaborClassRP.value = "";
        txtLaborClass1RP.value = "";


        txtFromLaborRP.value = "";
        txtToLaborRP.value = "";


        txtLabCatID.value = "";
        txtLabCatRP.value = "";
        txtLabCat1RP.value = "";




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
                 RP.LabCatID = Number(txtLabCatID.value);
                 RP.FromLabCode = txtFromLaborRP.value;
                 RP.ToLabCode = txtToLaborRP.value;
                 RP.LabClassID = Number(txtLaborClassID.value);
                
                 
                 Ajax.CallAsync({
                     url: Url.Action("rptAttendanceSheet", "GeneralReports"),
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
        //$("#RDByShowContracts").prop("checked", "checked");
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        btnLaborClassRP.onclick = btnLaborClassRP_Click;
        btnLabCatRP.onclick = btnProjectRP_Click;
    }


    function btnLaborClassRP_Click() {

        sys.FindKey(Modules.LaborAssign, "btnSearchClass", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLaborClass", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_LaborClass;
                    txtLaborClassID.value = result.LaborClassId.toString();
                    txtLaborClassRP.value = result.ClassCode.toString();

                    if (_ScreenLanguage == "ar") {
                        debugger
                        txtLaborClass1RP.value = result.DescA;
                    }
                    else {
                        debugger
                        txtLaborClass1RP.value = result.DescE;
                    }

                }
            });
        })

    }
    function btnProjectRP_Click() {

        sys.FindKey(Modules.AttendanceSheet, "btnLabCatRP", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProject", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as P_D_LaborCategory;
                    txtLabCatID.value = result.LaborCategoryId.toString();
                    txtLabCatRP.value = result.CategCode;

                    if (_ScreenLanguage == "ar") {
                        txtLabCat1RP.value = result.DescA;
                    }
                    else {
                        txtLabCat1RP.value = result.DescE;
                    }

                }
            });
        })


    }

}