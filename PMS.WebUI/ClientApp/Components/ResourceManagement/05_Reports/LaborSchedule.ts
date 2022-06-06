

$(document).ready(() => {

    LaborSchedule.InitalizeComponent();
});
namespace LaborSchedule {

    var sys: SystemTools = new SystemTools();
    const ControllerName: string = "LaborSchedule";

    var FromDate: HTMLInputElement;
    var ToDate: HTMLInputElement;


    var txtFromProjectRP: HTMLInputElement;
    var txtToProjectRP: HTMLInputElement;

    var txtProjID: HTMLInputElement;
    var txtProjCode: HTMLInputElement;
    var btnProjCode: HTMLButtonElement;
    var txtProjDesc: HTMLInputElement;

    var txtProjectEngineerID: HTMLInputElement;
    var txtProjectEngineerRP: HTMLInputElement;
    var btnProjectEngineerRP: HTMLButtonElement;
    var txtProjectEngineer1RP: HTMLInputElement;

    var txtSiteEngineerId: HTMLInputElement;
    var txtSiteEngineer_Code: HTMLInputElement;
    var butSiteEngineer_Code: HTMLButtonElement;
    var txtSiteEngineer_Desc: HTMLInputElement;

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
    var _BranchCode: string;
    var Condition: string;
    var _CompCode: string;
    export function InitalizeComponent() {
        GeneralReports.OnClear = Clear;
        GeneralReports.OnPrint = Print;
        _ScreenLanguage = ClientSharedWork.Session.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

        Condition = " CompCode = " + _CompCode + " and BraCode = " + _BranchCode;

        InitalizeControls();
        InitalizeEvents();

    }
    function InitalizeControls() {

        FromDate = DocumentActions.GetElementById<HTMLInputElement>("FromDate");
        ToDate = DocumentActions.GetElementById<HTMLInputElement>("ToDate");


        txtFromProjectRP = DocumentActions.GetElementById<HTMLInputElement>("txtFromProjectRP");
        txtToProjectRP = DocumentActions.GetElementById<HTMLInputElement>("txtToProjectRP");

        txtProjID = DocumentActions.GetElementById<HTMLInputElement>("txtProjID");
        txtProjCode = DocumentActions.GetElementById<HTMLInputElement>("txtProjCode");
        btnProjCode = DocumentActions.GetElementById<HTMLButtonElement>("btnProjCode");
        txtProjDesc = DocumentActions.GetElementById<HTMLInputElement>("txtProjDesc");


        txtSiteEngineerId = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngineerId");
        txtSiteEngineer_Code = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngineer_Code");
        butSiteEngineer_Code = DocumentActions.GetElementById<HTMLButtonElement>("butSiteEngineer_Code");
        txtSiteEngineer_Desc = DocumentActions.GetElementById<HTMLInputElement>("txtSiteEngineer_Desc");

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
    


    function InitalizeEvents() {
        debugger
        FromDate.value = DateFormat(new Date().toString());
        ToDate.value = DateFormat(new Date().toString());
     
        btnProjCode.onclick = btnProjCode_onclick;
        btnProjectEngineerRP.onclick = btnProjectEngineerRP_Click;
        //btnScopeCatRP.onclick = btnScopeCatRP_Click;
       // btnScopeRP.onclick = btnScopeRP_Click;
        btnLaborClassRP.onclick = btnLaborClassRP_Click;
        btnLaborCategoryRP.onclick = btnLaborCategoryRP_Click;
        //butSiteEngineer_Code.onclick = butSiteEngineer_Code_Click;

        
       


    }



    function btnProjCode_onclick() {
        debugger;
        sys.FindKey(Modules.LaborSchedule, "btnProjCode", Condition, () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetProjCodeByID", "ProjectExpenses"),
                data: { id: _Id },
                success: (d) => {
                    debugger;
                    let result = d.result as P_TR_EngProject;
                    txtProjID.value = result.ProjectID.toString();
                    txtProjCode.value = result.ProjectCode;
                    if (_ScreenLanguage == "ar") {
                        txtProjDesc.value = result.DescA;
                    }
                    else {
                        txtProjDesc.value = result.DescL;
                    }

                }
            });
        })
    }

    function btnProjectEngineerRP_Click() {
        debugger;
        sys.FindKey(Modules.LaborSchedule, "butEng_Code", Condition, () => {
            debugger;
            let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
            Ajax.CallAsync({
                url: Url.Action("GetSrchProjectEng",ControllerName),
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
    //function btnScopeCatRP_Click() {
    //    debugger;
    //    sys.FindKey(Modules.LaborSchedule, "btnScopeCatRP", "", () => {
    //        debugger;
    //        let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("GetSearchScopCat", ControllerName),
    //            data: { id: _Id },
    //            success: (d) => {
    //                debugger;
    //                let result = d.result as P_D_ScopeCategory;
    //                txtScopeCatID.value = result.ScopeCategoryID.toString();
    //                txtScopeCatRP.value = result.ScopeCategCode.toString();
    //                if (_ScreenLanguage == "ar") {
    //                    txtScopeCat1RP.value = result.DescA;
    //                }
    //                else {
    //                    txtScopeCat1RP.value = result.DescE;
    //                }

    //            }
    //        });
    //    })
    //}
    //function btnScopeRP_Click() {
    //    debugger;
    //    sys.FindKey(Modules.LaborSchedule, "btnScopeRP", "", () => {
    //        debugger;
    //        let _Id = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("GetScope", ControllerName),
    //            data: { id: _Id },
    //            success: (d) => {
    //                let result = d.result as P_D_Scope;
    //                txtScopeID.value = result.ScopeID.toString();
    //                txtScopeRP.value = result.ScopeCode.toString();

    //                if (_ScreenLanguage == "ar") {
    //                    txtScope1RP.value = result.DescA.toString();
    //                }
    //                else {
    //                    txtScope1RP.value = result.DescE.toString();
    //                }

    //            }
    //        });
    //    })
    //}     //function butSiteEngineer_Code_Click() {

    //    sys.FindKey(Modules.LaborMonitoring, "butSiteEngineer_Code", Condition , () => {
    //        let _Id: number = ClientSharedWork.SearchDataGrid.SelectedKey;
    //        Ajax.CallAsync({
    //            url: Url.Action("GetSiteEngineerByID", ControllerName),
    //            data: { id: _Id },
    //            success: (d) => {

    //                let SiteEng = d.result as P_D_SiteEngineer;
    //                txtSiteEngineerId.value = SiteEng.SiteEngineerId.toString();
    //                txtSiteEngineer_Code.value = SiteEng.EngCode.toString();
    //                if (ClientSharedWork.Session.ScreenLanguage == "ar") {
    //                    txtSiteEngineer_Desc.value = SiteEng.DescA;
    //                }
    //                else {
    //                    txtSiteEngineer_Desc.value = SiteEng.DescE;
    //                }

    //            }
    //        });
    //    })
    //}
    function btnLaborClassRP_Click() {
        debugger;
        sys.FindKey(Modules.LaborSchedule, "btnSearchClass", "", () => {
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
        sys.FindKey(Modules.LaborSchedule, "butCategCode", "", () => {
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
   
    function Print() {
        debugger
        let RP: ReportParameters = new ReportParameters();

        RP.CompCode = SharedSession.CurrentEnvironment.CompCode;
        RP.braCode = SharedSession.CurrentEnvironment.BranchCode;
        RP.FromDate = DateFormat(FromDate.value);
        RP.ToDate = DateFormat(ToDate.value);
        RP.LabClassID = Number(txtLaborClassID.value);
        RP.LabCatID = Number(txtLaborCategoryID.value);
        RP.FromLabCode = (txtFromLaborRP.value);
        RP.ToLabCode = (txtToLaborRP.value);
        RP.ProjectID = Number(txtProjID.value);
        RP.EngID = Number(txtProjectEngineerID.value);
        //RP.SiteEngineerId = Number(txtSiteEngineerId);     
        // RP.FromProjCode = (txtFromProjectRP.value);
        // RP.ToProjCode = (txtToProjectRP.value);      
        //RP.scopeClassId = Number(txtScopeCatID.value);
        //RP.ScopeID = Number(txtScopeID.value);


        if (DateFormat(FromDate.value) == "NaN-NaN-NaN" || DateFormat(ToDate.value) == "NaN-NaN-NaN") {
            MessageBox.Show(" you must select Date", "Info");
            return;
        }
        else if (DateFormat(FromDate.value) > DateFormat(ToDate.value)) {
            MessageBox.Show(" From date  is largethan To Date", "Info");
            return;
        }
        else {



            Ajax.CallAsync({
                url: Url.Action("LabourMovementByProject", "GeneralReports"),
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