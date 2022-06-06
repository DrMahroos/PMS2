$(document).ready(() => {
    LaborMovement.InitalizeComponent();
});
namespace LaborMovement {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "LaborMovement";

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



    var txtFromLaborID: HTMLInputElement;
    var txtFromLaborRP: HTMLInputElement;
    var btnFromLaborRP: HTMLButtonElement;
    var txtFromLabor1RP: HTMLInputElement;




    var txtToLaborID: HTMLInputElement;
    var txtToLaborRP: HTMLInputElement;
    var btnToLaborRP: HTMLButtonElement;
    var txtToLabor1RP: HTMLInputElement;



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


        //txtFromLaborID = DocumentActions.GetElementById<HTMLInputElement>("txtFromLaborID");
        txtFromLaborRP = DocumentActions.GetElementById<HTMLInputElement>("txtFromLaborRP");
        //btnFromLaborRP = DocumentActions.GetElementById<HTMLButtonElement>("btnFromLaborRP");
        //txtFromLabor1RP = DocumentActions.GetElementById<HTMLInputElement>("txtFromLabor1RP");


        //txtToLaborID = DocumentActions.GetElementById<HTMLInputElement>("txtToLaborID");
        txtToLaborRP = DocumentActions.GetElementById<HTMLInputElement>("txtToLaborRP");
        //btnToLaborRP = DocumentActions.GetElementById<HTMLButtonElement>("btnToLaborRP");
        //txtToLabor1RP = DocumentActions.GetElementById<HTMLInputElement>("txtToLabor1RP");


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

        //txtFromLaborID.value = "";
        txtFromLaborRP.value = "";
        //txtFromLabor1RP.value = "";

        //txtToLaborID.value = "";
        txtToLaborRP.value = "";
        //txtToLabor1RP.value = "";


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

        else {

            debugger;
            RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
            RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
            RP.FromDate = DateFormat(FromDate.value);
            RP.ToDate = DateFormat(ToDate.value);
            RP.LabClassID = Number(txtLaborClassID.value);
            RP.LabCatID = Number(txtLaborCategoryID.value);
            RP.FromLabCode = (txtFromLaborRP.value).toString();
            RP.ToLabCode = (txtToLaborRP.value).toString();
            debugger;


            if (<boolean>$("#ByLabor").prop("checked")) {
                RP.TypeReport = 1;



                Ajax.CallAsync({
                    url: Url.Action("rptRes_LaborMovement_print", "GeneralReports"),
                    data: RP,
                    success: (d) => {
                        debugger
                        let result = d.result as string;
                        window.open(result, "_blank");
                    }
                })

            }

            if (<boolean>$("#FreeLAbor").prop("checked")) {
                RP.TypeReport = 2;

                Ajax.CallAsync({
                    url: Url.Action("rptRes_LaborMovement_print", "GeneralReports"),
                    data: RP,
                    success: (d) => {
                        debugger
                        let result = d.result as string;
                        window.open(result, "_blank");
                    }
                })
            }







            //if ($("#ByLabor").prop("checked", "checked")) {
            //    RP.TypeReport = 1;


            //    Ajax.CallAsync({
            //        url: Url.Action("rptRes_LaborMovement_print", "GeneralReports"),
            //        data: RP,
            //        success: (d) => {
            //            debugger
            //            let result = d.result as string;
            //            window.open(result, "_blank");
            //        }
            //    })

            //}

            //else if ($("#FreeLAbor").prop("checked", "checked")) {
            //    RP.TypeReport = 2;

            //    debugger;
            //    Ajax.CallAsync({
            //        url: Url.Action("rptRes_LaborMovement_print", "GeneralReports"),
            //        data: RP,
            //        success: (d) => {
            //            debugger
            //            let result = d.result as string;
            //            window.open(result, "_blank");
            //        }
            //    })

            //}

        }

    }

    function InitalizeEvents() {
        debugger
        //$("#RDByShowContracts").prop("checked", "checked");
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
        btnLaborClassRP.onclick = btnLaborClassRP_Click;
        btnLaborCategoryRP.onclick = btnLaborCategoryRP_Click;
        btnFromLaborRP.onclick = btnFromLaborRP_Click;
        btnToLaborRP.onclick = btnToLaborRP_Click;
    }


    function btnLaborClassRP_Click() {
        debugger;
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
        debugger;
        sys.FindKey(Modules.LaborMonitoring, "butCategCode", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchLaborCategory", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as P_D_LaborCategory;
                    txtLaborCategoryID.value = result.LaborCategoryId.toString();
                    txtLaborCategoryRP.value = result.CategCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtLaborCategory1RP.value = result.DescA;
                    }
                    else {
                        txtLaborCategory1RP.value = result.DescE;
                    }

                }
            });
        })
    }
    function btnFromLaborRP_Click() {
        debugger;
        sys.FindKey(Modules.LaborRequest, "butShowFree", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchFromLabor", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_Labor;
                    txtFromLaborID.value = result.LaborID.toString();
                    txtFromLaborRP.value = result.LaborCode;

                    if (_ScreenLanguage == "ar") {
                        txtFromLabor1RP.value = result.DescA;
                    }
                    else {
                        txtFromLabor1RP.value = result.DescE;
                    }

                }
            });
        })
    }
    function btnToLaborRP_Click() {
        debugger;
        sys.FindKey(Modules.LaborRequest, "butShowFree", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSearchToLabor", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    debugger;
                    let result = d.result as P_D_Labor;
                    txtToLaborID.value = result.LaborID.toString();
                    txtToLaborRP.value = result.LaborCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtToLabor1RP.value = result.DescA;
                    }
                    else {
                        txtToLabor1RP.value = result.DescE;
                    }

                }
            });
        })
    }



}