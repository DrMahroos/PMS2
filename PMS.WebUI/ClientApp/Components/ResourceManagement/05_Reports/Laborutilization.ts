$(document).ready(() => {
    Laborutilization.InitalizeComponent();
});
namespace Laborutilization {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "Laborutilization";

    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;


    var txtLaborClassID: HTMLInputElement;
    var txtLaborClassRP: HTMLInputElement;
    var btnLaborClassRP: HTMLButtonElement;
    var txtLaborClass1RP: HTMLInputElement;


    var txtLaborCategoryID: HTMLInputElement;
    var txtLaborCategoryRP: HTMLInputElement;
    var btnLaborCategoryRP: HTMLButtonElement;
    var txtLaborCategory1RP: HTMLInputElement;

    


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



        txtLaborCategoryID = DocumentActions.GetElementById<HTMLInputElement>("txtLaborCategoryID");
        txtLaborCategoryRP = DocumentActions.GetElementById<HTMLInputElement>("txtLaborCategoryRP");
        btnLaborCategoryRP = DocumentActions.GetElementById<HTMLButtonElement>("btnLaborCategoryRP");
        txtLaborCategory1RP = DocumentActions.GetElementById<HTMLInputElement>("txtLaborCategory1RP");




    }
    function Clear() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());


        txtLaborClassID.value = "";
        txtLaborClassRP.value = "";
        txtLaborClass1RP.value = "";


        txtLaborCategoryID.value = "";
        txtLaborCategoryRP.value = "";
        txtLaborCategory1RP.value = "";




    }
    function Print() {
        debugger
        //let RP: ReportParameters = new ReportParameters();

        //RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        //if (Number(txtsubcontrRP.value) == 0) {
        //    MessageBox.Show("You Must Select", "Info");
        //    return;
        //}
        ////RP.braCode = 'فرع 1';                                                        
        //RP.SubID = Number(txtsubcontrID.value);
        //RP.ContrNo = Number(txtContactRPID.value);
        //RP.Sono = Number();
        //RP.ProjectID = Number(txtprojectID.value);
        //RP.Phaseid = Number(txtphaseRPID.value);
        //RP.FromDate = DateFormat(FromDate.value);
        //RP.ToDate = DateFormat(ToDate.value);





        //if (<boolean>$("#RDByShowContracts").prop("checked")) {
        //    RP.TypeReport = 1;
        //    Ajax.CallAsync({
        //        url: Url.Action("rptSlsActivityContract", "GeneralReports"),
        //        data: RP,
        //        success: (d) => {
        //            debugger
        //            let result = d.result as string;
        //            window.open(result, "_blank");
        //        }
        //    })
        //}

        //if (<boolean>$("#RDByProductionEntry").prop("checked")) {
        //    RP.TypeReport = 2;
        //    Ajax.CallAsync({
        //        url: Url.Action("rptSlsActivityContract", "GeneralReports"),
        //        data: RP,
        //        success: (d) => {
        //            debugger
        //            let result = d.result as string;
        //            window.open(result, "_blank");
        //        }
        //    })
        //}

        //if (<boolean>$("#RDByServiceOrder").prop("checked")) {
        //    RP.TypeReport = 3;
        //    Ajax.CallAsync({
        //        url: Url.Action("rptSlsActivityContract", "GeneralReports"),
        //        data: RP,
        //        success: (d) => {
        //            debugger
        //            let result = d.result as string;
        //            window.open(result, "_blank");
        //        }
        //    })
        //}






    }

    function InitalizeEvents() {
        debugger
        //$("#RDByShowContracts").prop("checked", "checked");

        btnLaborClassRP.onclick = btnLaborClassRP_Click;
        btnLaborCategoryRP.onclick = btnLaborCategoryRP_Click;
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
    function btnLaborCategoryRP_Click() {

        sys.FindKey(Modules.LaborMonitoring, "butCategCode", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetLaborCategory", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_LaborCategory;
                    txtLaborCategoryID.value = result.LaborCategoryId.toString();
                    txtLaborCategoryRP.value = result.CategCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtLaborCategory1RP.value = result.DescA.toString();
                    }
                    else {
                        txtLaborCategory1RP.value = result.DescE.toString();
                    }

                }
            });
        })


    }

}