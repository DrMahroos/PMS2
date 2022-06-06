$(document).ready(() => {
    Equipmentwork.InitalizeComponent();
});
namespace Equipmentwork {

    var sys: SystemTools = new SystemTools();
    
    const ControllerName: string = "Equipmentwork";


    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;


    var txtFromProjectRP: HTMLInputElement;
    var txtToProjectRP: HTMLInputElement;


    var txtEquipClassID: HTMLInputElement;
    var txtEquipClassRP: HTMLInputElement;
    var btnEquipClassRP: HTMLButtonElement;
    var txtEquipClass1RP: HTMLInputElement;



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



        txtEquipClassID = DocumentActions.GetElementById<HTMLInputElement>("txtEquipClassID");
        txtEquipClassRP = DocumentActions.GetElementById<HTMLInputElement>("txtEquipClassRP");
        btnEquipClassRP = DocumentActions.GetElementById<HTMLButtonElement>("btnEquipClassRP");
        txtEquipClass1RP = DocumentActions.GetElementById<HTMLInputElement>("txtEquipClass1RP");

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


        txtFromLaborRP = DocumentActions.GetElementById<HTMLInputElement>("txtFromLaborRP");
        txtToLaborRP = DocumentActions.GetElementById<HTMLInputElement>("txtToLaborRP");


    }
    function Clear() {
        debugger;
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());


        txtEquipClassID.value = "";
        txtEquipClassRP.value = "";
        txtEquipClass1RP.value = "";

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


        //txtFromLaborID.value = "";
        txtFromLaborRP.value = "";
        txtToLaborRP.value = "";



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


            RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
            RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
            RP.FromDate = DateFormat(FromDate.value);
            RP.ToDate = DateFormat(ToDate.value);
            RP.FromProjCode = (txtFromProjectRP.value);
            RP.ToProjCode = (txtToProjectRP.value);
            RP.EngID = Number(txtProjectEngineerID.value);
            RP.scopeClassId = Number(txtScopeCatID.value);
            RP.ScopeID = Number(txtScopeID.value);
            RP.EquipClassID = Number(txtEquipClassID.value);
            RP.FromEquipCode = (txtFromLaborRP.value);
            RP.ToEquipCode = (txtToLaborRP.value);

            Ajax.CallAsync({
                url: Url.Action("rptRes_EquipmentWORK_print", "GeneralReports"),
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
        btnProjectEngineerRP.onclick = btnProjectEngineerRP_Click;
        //btnAreaRP.onclick = btnAreaRP_Click;
        btnScopeCatRP.onclick = btnScopeCatRP_Click;
        btnScopeRP.onclick = btnScopeRP_Click;
        btnEquipClassRP.onclick = btnEquipClassRP_Click;
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
    //    sys.FindKey(Modules.Equipmentutilization, "btnAreaRP", "", () => {
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
        sys.FindKey(Modules.Equipmentutilization, "btnScopeCatRP", "", () => {
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
        sys.FindKey(Modules.Equipmentutilization, "btnScopeRP", "", () => {
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
    function btnEquipClassRP_Click() {

        sys.FindKey(Modules.EquipmentMonitoring, "btnSearchClass", "", () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetEquipmentClass", ControllerName),
                data: { id: _Id },
                success: (d) => {
                    let result = d.result as P_D_EquipmentClass;
                    txtEquipClassID.value = result.EquipClassId.toString();
                    txtEquipClassRP.value = result.ClassCode.toString();

                    if (_ScreenLanguage == "ar") {
                        txtEquipClass1RP.value = result.DescA.toString();
                    }
                    else {
                        txtEquipClass1RP.value = result.DescE.toString();
                    }

                }
            });
        })


    }

}