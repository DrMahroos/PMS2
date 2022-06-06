$(document).ready(() => {
    LaborWork.InitalizeComponent();
});
namespace LaborWork {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "LaborWork";
    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;


    var txtFromProjectRP: HTMLInputElement;
    var txtToProjectRP: HTMLInputElement;


    var txtProjectEngineerID: HTMLInputElement;
    var txtProjectEngineerRP: HTMLInputElement;
    var btnProjectEngineerRP: HTMLButtonElement;
    var txtProjectEngineer1RP: HTMLInputElement;


    var txtAreaID: HTMLInputElement;
    var txtAreaRP: HTMLInputElement;
    var btnAreaRP: HTMLButtonElement;
    var txtArea1RP: HTMLInputElement;


    var txtScopeCatID: HTMLInputElement;
    var txtScopeCatRP: HTMLInputElement;
    var btnScopeCatRP: HTMLButtonElement;
    var txtScopeCat1RP: HTMLInputElement;



    var txtScopeID: HTMLInputElement;
    var txtScopeRP: HTMLInputElement;
    var btnScopeRP: HTMLButtonElement;
    var txtScope1RP: HTMLInputElement;



    var txtLaborClassID: HTMLInputElement;
    var txtLaborClassRP: HTMLInputElement;
    var btnLaborClassRP: HTMLButtonElement;
    var txtLaborClass1RP: HTMLInputElement;


    var txtLaborCategoryID: HTMLInputElement;
    var txtLaborCategoryRP: HTMLInputElement;
    var btnLaborCategoryRP: HTMLButtonElement;
    var txtLaborCategory1RP: HTMLInputElement;

    
    var txtFromLaborRP: HTMLInputElement;
    var txtToLaborRP: HTMLInputElement;

    

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



        txtProjectEngineerID = DocumentActions.GetElementById<HTMLInputElement>("txtProjectEngineerID");
        txtProjectEngineerRP = DocumentActions.GetElementById<HTMLInputElement>("txtProjectEngineerRP");
        btnProjectEngineerRP = DocumentActions.GetElementById<HTMLButtonElement>("btnProjectEngineerRP");
        txtProjectEngineer1RP = DocumentActions.GetElementById<HTMLInputElement>("txtProjectEngineer1RP");


        txtAreaID = DocumentActions.GetElementById<HTMLInputElement>("txtAreaID");
        txtAreaRP = DocumentActions.GetElementById<HTMLInputElement>("txtAreaRP");
        btnAreaRP = DocumentActions.GetElementById<HTMLButtonElement>("btnAreaRP");
        txtArea1RP = DocumentActions.GetElementById<HTMLInputElement>("txtArea1RP");

        txtScopeCatID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCatID");
        txtScopeCatRP = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCatRP");
        btnScopeCatRP = DocumentActions.GetElementById<HTMLButtonElement>("btnScopeCatRP");
        txtScopeCat1RP = DocumentActions.GetElementById<HTMLInputElement>("txtScopeCat1RP");

        txtScopeID = DocumentActions.GetElementById<HTMLInputElement>("txtScopeID");
        txtScopeRP = DocumentActions.GetElementById<HTMLInputElement>("txtScopeRP");
        btnScopeRP = DocumentActions.GetElementById<HTMLButtonElement>("btnScopeRP");
        txtScope1RP = DocumentActions.GetElementById<HTMLInputElement>("txtScope1RP");
        
        txtLaborClassID = DocumentActions.GetElementById<HTMLInputElement>("txtLaborClassID");
        txtLaborClassRP = DocumentActions.GetElementById<HTMLInputElement>("txtLaborClassRP");
        btnLaborClassRP = DocumentActions.GetElementById<HTMLButtonElement>("btnLaborClassRP");
        txtLaborClass1RP = DocumentActions.GetElementById<HTMLInputElement>("txtLaborClass1RP");
        
        txtLaborCategoryID = DocumentActions.GetElementById<HTMLInputElement>("txtLaborCategoryID");
        txtLaborCategoryRP = DocumentActions.GetElementById<HTMLInputElement>("txtLaborCategoryRP");
        btnLaborCategoryRP = DocumentActions.GetElementById<HTMLButtonElement>("btnLaborCategoryRP");
        txtLaborCategory1RP = DocumentActions.GetElementById<HTMLInputElement>("txtLaborCategory1RP");

        
        txtFromLaborRP = DocumentActions.GetElementById<HTMLInputElement>("txtFromLaborRP");
        txtToLaborRP = DocumentActions.GetElementById<HTMLInputElement>("txtToLaborRP");


    }
    function Clear() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());

        txtFromProjectRP.value = "";
        txtToProjectRP.value = "";

        txtProjectEngineerID.value = "";
        txtProjectEngineerRP.value = "";
        txtProjectEngineer1RP.value = "";

        txtAreaID.value = "";
        txtAreaRP.value = "";
        txtArea1RP.value = "";

        txtScopeCatID.value = "";
        txtScopeCatRP.value = "";
        txtScopeCat1RP.value = "";

        txtScopeID.value = "";
        txtScopeRP.value = "";
        txtScope1RP.value = "";

        txtLaborClassID.value = "";
        txtLaborClassRP.value = "";
        txtLaborClass1RP.value = "";

        txtLaborCategoryID.value = "";
        txtLaborCategoryRP.value = "";
        txtLaborCategory1RP.value = "";

        //txtFromLaborID.value = "";
        txtFromLaborRP.value = "";
        txtToLaborRP.value = "";


     
        

    }
    function Print() {
        debugger
        let RP: ReportParameters = new ReportParameters();

        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;

        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        RP.FromProjCode = (txtFromProjectRP.value);
        RP.ToProjCode = (txtToProjectRP.value);
        RP.EngID = Number(txtProjectEngineerID.value);
        RP.scopeClassId = Number(txtScopeCatID.value);
        RP.ScopeID = Number(txtScopeID.value);
        RP.LabClassID = Number(txtLaborClassID.value);
        RP.LabCatID = Number(txtLaborCategoryID.value);
        RP.FromLabCode = (txtFromLaborRP.value);
        RP.ToLabCode = (txtToLaborRP.value);

        if (DateFormat(FromDate.value) == "NaN-NaN-NaN" || DateFormat(ToDate.value) == "NaN-NaN-NaN") {
            MessageBox.Show(" you must select Date", "Info");
            return;
        }
        else if (DateFormat(FromDate.value) > DateFormat(ToDate.value)) {
            MessageBox.Show(" From date  is largethan To Date", "Info");
            return;
        }
        else {


            if (<boolean>$("#radio_Labourwork").prop("checked")) {
                RP.TypeReport = 1;
                Ajax.CallAsync({
                    url: Url.Action("rptRes_LaborWork_print", "GeneralReports"),
                    data: RP,
                    success: (d) => {
                        debugger
                        let result = d.result as string;
                        window.open(result, "_blank");
                    }
                })
            }

            if (<boolean>$("#radio_LabourBounus").prop("checked")) {
                RP.TypeReport = 2;
                Ajax.CallAsync({
                    url: Url.Action("rptRes_LaborWork_print", "GeneralReports"),
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
        $("#radio_Labourwork").prop("checked", "checked");
        btnProjectEngineerRP.onclick = btnProjectEngineerRP_Click;
       // btnAreaRP.onclick = btnAreaRP_Click;
        btnScopeCatRP.onclick = btnScopeCatRP_Click;
        btnScopeRP.onclick = btnScopeRP_Click;
        btnLaborClassRP.onclick = btnLaborClassRP_Click;
        btnLaborCategoryRP.onclick = btnLaborCategoryRP_Click;
       
        
    }

    function btnProjectEngineerRP_Click() {
        debugger;
        sys.FindKey(Modules.LateandAbsence, "butEng_Code", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProjectEng", ControllerName),
                data: { id: _Id },
                success: (d) => {

                    let result = d.result as P_D_SiteEngineer;
                    txtProjectEngineerID.value = result.SiteEngineerId.toString();
                    txtProjectEngineerRP.value = result.EngCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtProjectEngineer1RP.value = result.DescA;
                    }
                    else {
                        txtProjectEngineer1RP.value = result.DescE;
                    }

                }
            });
        })
    }
    //function btnAreaRP_Click() {
    //    debugger;
    //    sys.FindKey(Modules.LaborWork, "btnAreaRP", "", () => {
    //        debugger;
    //        let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("GetArea", ControllerName),
    //            data: { id: _Id },
    //            success: (d) => {
    //                let result = d.result as G_BRANCH;
    //                txtAreaID.value = result.BRA_CODE.toString();
    //                txtAreaRP.value = result.BRA_CODE.toString();

    //                if (_ScreenLanguage == "ar") {
    //                    txtArea1RP.value = result.BRA_DESCL.toString();
    //                }
    //                else {
    //                    txtArea1RP.value = result.BRA_DESCE.toString();
    //                }

    //            }
    //        });
    //    })
    //}
    function btnScopeCatRP_Click() {
        debugger;
        sys.FindKey(Modules.LaborWork, "btnScopeCatRP", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSearchScopCat", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    debugger;
                    let result = d.result as P_D_ScopeCategory;
                    txtScopeCatID.value = result.ScopeCategoryID.toString();
                    txtScopeCatRP.value = result.ScopeCategCode.toString();
                    if (_ScreenLanguage == "ar") {
                        txtScopeCat1RP.value = result.DescA;
                    }
                    else {
                        txtScopeCat1RP.value = result.DescE;
                    }

                }
            });
        })
    }
    function btnScopeRP_Click() {
        debugger;
        sys.FindKey(Modules.LaborWork, "btnScopeRP", "", () => {
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
 
    
}