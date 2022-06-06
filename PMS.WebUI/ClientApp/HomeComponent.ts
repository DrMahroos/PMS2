$(document).ready(() => {
    HomeComponent.InitalizeComponent();
    $("#spnFav").css("display", "none");
});

namespace HomeComponent {
    var btn_ar: HTMLButtonElement;
    var btn_eng: HTMLButtonElement;
    var sys: SystemTools = new SystemTools();
    var lblUSER_NAME: HTMLLabelElement;
    var btnCategories: HTMLInputElement;
    var btnVendors: HTMLInputElement;
    var btnUnits: HTMLInputElement;
    var btnSpecs: HTMLInputElement;
    var btnStores: HTMLInputElement;
    var btnUnitGroup: HTMLInputElement;
    var btnItems: HTMLInputElement;
    var btnPriceList: HTMLInputElement;
    var btnCustomers: HTMLInputElement;
    var btnTransfer: HTMLInputElement;
    var SelectSession: HTMLSelectElement;

    var systemEnv: SystemEnvironment = new SystemEnvironment();

    export function InitalizeComponent() {
        //------------------------------------------------------NewSession---------------------------------------
         
      
        //---------------------------------------------
        Ajax.Callsync({
            url: Url.Action("GetSystemProperties", "Home"),
            success: (d) => {
                systemEnv = JSON.parse(d.result) as SystemEnvironment;
            }
        });
        document.cookie = "PMS_systemProperties=" + JSON.stringify(systemEnv).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
        SharedSession.CurrentEnvironment = systemEnv;
       
        let lang: string = SharedSession.CurrentEnvironment.Language;
        if (lang == "en") {
            $("#main-menu").removeClass("sm-rtl");
        }

        let _SubSys = SharedSession.CurrentEnvironment.SubSystemCode;
        if (_SubSys == "DEF") {
            try {
                DocumentActions.GetElementById<HTMLInputElement>("btnSalesEngCategory").onclick = () => { OpenView("SalesEngCategory", Modules.SalesEngCategory); }
                DocumentActions.GetElementById<HTMLInputElement>("btnSalesEngineer").onclick = () => { OpenView("SalesEngineer", Modules.SalesEngineer); }
                DocumentActions.GetElementById<HTMLInputElement>("btnSiteEngCategory").onclick = () => { OpenView("SiteEngCategory", Modules.SiteEngCategory); }
                DocumentActions.GetElementById<HTMLInputElement>("btnSiteEngineer").onclick = () => { OpenView("SiteEngineer", Modules.SiteEngineer); }
                DocumentActions.GetElementById<HTMLInputElement>("btnLaborDefinition").onclick = () => { OpenView("LaborDefinition", Modules.LaborDefinition); }
                DocumentActions.GetElementById<HTMLInputElement>("btnUnProductionreasons").onclick = () => { OpenView("UnProductionreasons", Modules.UnProductionreasons); }
                DocumentActions.GetElementById<HTMLInputElement>("btnEquipmentCategory").onclick = () => { OpenView("EquipmentCategory", Modules.EquipmentCategory); }
                DocumentActions.GetElementById<HTMLInputElement>("btnEquipmentDefinition").onclick = () => { OpenView("EquipmentDefinition", Modules.EquipmentDefinition); }
                DocumentActions.GetElementById<HTMLInputElement>("btnExpensesCategory").onclick = () => { OpenView("ExpensesCategory", Modules.ExpensesCategory); }
                DocumentActions.GetElementById<HTMLInputElement>("btnExpenses").onclick = () => { OpenView("Expenses", Modules.Expenses); }
                DocumentActions.GetElementById<HTMLInputElement>("btnUnitsOfMeasure").onclick = () => { OpenView("UnitsOfMeasure", Modules.UnitsOfMeasure); }
                DocumentActions.GetElementById<HTMLInputElement>("btnNationality").onclick = () => { OpenView("Nationality", Modules.Nationality); }
                DocumentActions.GetElementById<HTMLInputElement>("btnScopeDefinition").onclick = () => { OpenView("ScopeDefinition", Modules.ScopeDefinition); }
                DocumentActions.GetElementById<HTMLInputElement>("btnScopeClassandCat").onclick = () => { OpenView("ScopeClassandCat", Modules.ScopeClassandCat); }
                
                DocumentActions.GetElementById<HTMLInputElement>("btnCalendarDefinition").onclick = () => { OpenView("CalendarDefinition", Modules.CalendarDefinition); }
                DocumentActions.GetElementById<HTMLInputElement>("btnLocationDefinition").onclick = () => { OpenView("LocationDefinition", Modules.LocationDefinition); }
                DocumentActions.GetElementById<HTMLInputElement>("btnPeriodManagement").onclick = () => { OpenView("PeriodManagement", Modules.PeriodManagement); }
                DocumentActions.GetElementById<HTMLInputElement>("btnLaborCategory").onclick = () => { OpenView("LaborCategory", Modules.LaborCategory); }
                DocumentActions.GetElementById<HTMLInputElement>("btnLaborClass").onclick = () => { OpenView("LaborClass", Modules.LaborClass); }
                DocumentActions.GetElementById<HTMLInputElement>("btnLaborAbsenceReasons").onclick = () => { OpenView("LaborAbsenceReasons", Modules.LaborAbsenceReasons); }
                DocumentActions.GetElementById<HTMLInputElement>("btnLaborOvertimetypes").onclick = () => { OpenView("LaborOvertimetypes", Modules.LaborOvertimetypes); }
                DocumentActions.GetElementById<HTMLInputElement>("btnUnProductioncategory").onclick = () => { OpenView("UnProductioncategory", Modules.UnProductioncategory); }
                DocumentActions.GetElementById<HTMLInputElement>("btnSystemSetting").onclick = () => { OpenView("SystemSetting", Modules.SystemSetting); }
                DocumentActions.GetElementById<HTMLInputElement>("btnUsersSetting").onclick = () => { OpenView("UsersSetting", Modules.UsersSetting); }
            } catch (e) { }
        }

        if (_SubSys == "SLS") {
            try {
                DocumentActions.GetElementById<HTMLInputElement>("btnCustomerCategory").onclick = () => { OpenView("CustomerCategory", Modules.CustomerCategory); }
                DocumentActions.GetElementById<HTMLInputElement>("btnCustomers").onclick = () => { OpenView("Customers", Modules.Customers); }
                DocumentActions.GetElementById<HTMLInputElement>("btnCustomerRespItems").onclick = () => { OpenView("CustomerRespItems", Modules.CustomerRespItems); }
                DocumentActions.GetElementById<HTMLInputElement>("btnCompanyRespItem").onclick = () => { OpenView("CompanyRespItem", Modules.CompanyRespItem); }
                DocumentActions.GetElementById<HTMLInputElement>("btnSalesItemLibrary").onclick = () => { OpenView("SalesItemLibrary", Modules.SalesItemLibrary); }
                DocumentActions.GetElementById<HTMLInputElement>("btnSalesItemPlan").onclick = () => { OpenView("SalesItemPlan", Modules.SalesItemPlan); }
                DocumentActions.GetElementById<HTMLInputElement>("btnActivityPrice").onclick = () => { OpenView("ActivityPrice", Modules.ActivityPrice); }
                //DocumentActions.GetElementById<HTMLInputElement>("btnIssueProduction").onclick = () => { OpenView("IssueProduction", Modules.IssueProduction); }
                DocumentActions.GetElementById<HTMLInputElement>("btnCustomerBilling").onclick = () => { OpenView("CustomerBilling", Modules.CustomerBilling); }
                DocumentActions.GetElementById<HTMLInputElement>("btnCustomerDbCr").onclick = () => { OpenView("CustomerDbCr", Modules.CustomerDbCr); }
                DocumentActions.GetElementById<HTMLInputElement>("btnSalesManBonus").onclick = () => { OpenReportsPopup( Modules.SalesManBonus); }
                DocumentActions.GetElementById<HTMLInputElement>("btnOfferDefinition").onclick = () => { OpenView("OfferDefinition", Modules.OfferDefinition); }
                DocumentActions.GetElementById<HTMLInputElement>("btnOfferSpecification").onclick = () => { OpenView("OfferSpecification", Modules.OfferSpecification); }
                DocumentActions.GetElementById<HTMLInputElement>("btnOfferCostEstimation").onclick = () => { OpenView("OfferCostEstimation", Modules.OfferCostEstimation); }
                DocumentActions.GetElementById<HTMLInputElement>("btnOfferBillingSchedule").onclick = () => { OpenView("OfferBillingSchedule", Modules.OfferBillingSchedule); }
                DocumentActions.GetElementById<HTMLInputElement>("btnStartOfWork").onclick = () => { OpenView("StartOfWork", Modules.StartOfWork); }
                DocumentActions.GetElementById<HTMLInputElement>("btnSalesPaymentTerms").onclick = () => { OpenView("SalesPaymentTerms", Modules.SalesPaymentTerms); }
              
                //popup  reports
                
                DocumentActions.GetElementById<HTMLInputElement>("btnContractList").onclick = () => { OpenReportsPopup(Modules.ContractList); }
                DocumentActions.GetElementById<HTMLInputElement>("btnOfferList").onclick = () => { OpenReportsPopup(Modules.OfferList); }
                DocumentActions.GetElementById<HTMLInputElement>("btnSalesmanActivity").onclick = () => { OpenReportsPopup(Modules.SalesmanActivity); }
                DocumentActions.GetElementById<HTMLInputElement>("btnProductionVsBilling").onclick = () => { OpenReportsPopup(Modules.ProductionVsBilling); }
                DocumentActions.GetElementById<HTMLInputElement>("btnProjItemsInventory").onclick = () => { OpenReportsPopup(Modules.ProjItemsInventory); }
                DocumentActions.GetElementById<HTMLInputElement>("btnBillingList").onclick = () => { OpenReportsPopup(Modules.BillingList); }
                DocumentActions.GetElementById<HTMLInputElement>("btnCRMReport").onclick = () => { OpenReportsPopup(Modules.CRMReport); }
                DocumentActions.GetElementById<HTMLInputElement>("btnTaxInvoicelist").onclick = () => { OpenReportsPopup(Modules.TaxInvoicelist); }

                
            } catch (e) { }
        }

        if (_SubSys == "ENG") {
            try {
                DocumentActions.GetElementById<HTMLInputElement>("btnProjectDefination").onclick = () => { OpenView("ProjectDefination", Modules.ProjectDefination); }
                DocumentActions.GetElementById<HTMLInputElement>("btnProjectvaliation").onclick = () => { OpenView("Projectvaliation", Modules.Projectvaliation); }
 
                DocumentActions.GetElementById<HTMLInputElement>("btnProjectSpecification").onclick = () => { OpenView("ProjectSpecification", Modules.ProjectSpecification); }
                DocumentActions.GetElementById<HTMLInputElement>("btnWorkActivities").onclick = () => { OpenView("WorkActivities", Modules.WorkActivities); }
                DocumentActions.GetElementById<HTMLInputElement>("btnProjectMasterPlan").onclick = () => { OpenView("ProjectMasterPlan", Modules.ProjectMasterPlan); }
                DocumentActions.GetElementById<HTMLInputElement>("btnProjectChange").onclick = () => { OpenView("ProjectChange", Modules.ProjectChange); }
                DocumentActions.GetElementById<HTMLInputElement>("btnWorkSchedule").onclick = () => { OpenView("WorkSchedule", Modules.WorkSchedule); }
                DocumentActions.GetElementById<HTMLInputElement>("btnOpProductionEntry").onclick = () => { OpenView("OpProductionEntry", Modules.OpProductionEntry); }
                DocumentActions.GetElementById<HTMLInputElement>("btnOpProjectExpenses").onclick = () => { OpenView("OpProjectExpenses", Modules.OpProjectExpenses); }
                DocumentActions.GetElementById<HTMLInputElement>("btnIssueProduction").onclick = () => { OpenView("IssueProduction", Modules.IssueProduction); }
                DocumentActions.GetElementById<HTMLInputElement>("btnPrequalification").onclick = () => { OpenView("Prequalification", Modules.Prequalification); }
                DocumentActions.GetElementById<HTMLInputElement>("btnDefinition").onclick = () => { OpenView("Definition", Modules.Definition); }
                DocumentActions.GetElementById<HTMLInputElement>("btnSubContContract").onclick = () => { OpenView("SubContContract", Modules.SubContContract); }
                DocumentActions.GetElementById<HTMLInputElement>("btnServiceOrder").onclick = () => { OpenView("ServiceOrder", Modules.ServiceOrder); }
                DocumentActions.GetElementById<HTMLInputElement>("btnProductionEntry").onclick = () => { OpenView("ProductionEntry", Modules.ProductionEntry); }
                DocumentActions.GetElementById<HTMLInputElement>("btnSubContractorListing").onclick = () => { OpenReportsPopup(Modules.SubContractorListing); }
                DocumentActions.GetElementById<HTMLInputElement>("btnSubContrActivity").onclick = () => { OpenReportsPopup(Modules.SubContrActivity); }
                DocumentActions.GetElementById<HTMLInputElement>("btnProduction").onclick = () => { OpenReportsPopup(Modules.Production); }
                DocumentActions.GetElementById<HTMLInputElement>("btnEvaluation").onclick = () => { OpenReportsPopup(Modules.Evaluation); }
                //DocumentActions.GetElementById<HTMLInputElement>("btnLaborSchedule").onclick = () => { OpenReportsPopup(Modules.LaborSchedule); }
                //DocumentActions.GetElementById<HTMLInputElement>("btnLaborScheduleUtz").onclick = () => { OpenReportsPopup(Modules.LaborScheduleUtz); }
                DocumentActions.GetElementById<HTMLInputElement>("btnProjectExpensesRep").onclick = () => { OpenReportsPopup(Modules.ProjectExpensesRep); }
                DocumentActions.GetElementById<HTMLInputElement>("btnProjectStatus").onclick = () => { OpenReportsPopup(Modules.ProjectStatus); }
                DocumentActions.GetElementById<HTMLInputElement>("btnProjectProgress").onclick = () => { OpenReportsPopup(Modules.ProjectProgress); }
                DocumentActions.GetElementById<HTMLInputElement>("btnPeriodBudget").onclick = () => { OpenView("PeriodBudget", Modules.PeriodBudget); }
                DocumentActions.GetElementById<HTMLInputElement>("btnPrepare").onclick = () => { OpenView("Prepare", Modules.Prepare); }
                DocumentActions.GetElementById<HTMLInputElement>("btnBudgetRequirements").onclick = () => { OpenReportsPopup(Modules.BudgetRequirements); }
                DocumentActions.GetElementById<HTMLInputElement>("btnMonthBudgetByEng").onclick = () => { OpenReportsPopup(Modules.MonthBudgetByEng); }
                DocumentActions.GetElementById<HTMLInputElement>("btnMonthBudgetForBranch").onclick = () => { OpenReportsPopup(Modules.MonthBudgetForBranch); }
                DocumentActions.GetElementById<HTMLInputElement>("btnProdvsprogress").onclick = () => { OpenReportsPopup(Modules.Prodvsprogress); }
               

                //if (_SubSys == "RES") {
                //    try {
                DocumentActions.GetElementById<HTMLInputElement>("btnBillOfMaterial").onclick = () => { OpenView("BillOfMaterial", Modules.BillOfMaterial) };
                DocumentActions.GetElementById<HTMLInputElement>("btnMaterialMonitoring").onclick = () => { OpenView("MaterialMonitoring", Modules.MaterialMonitoring) };
                DocumentActions.GetElementById<HTMLInputElement>("btnMaterialRequest").onclick = () => { OpenView("MaterialRequest", Modules.MaterialRequest) };
                DocumentActions.GetElementById<HTMLInputElement>("btnMaterialIssuance").onclick = () => { OpenView("MaterialIssuance", Modules.MaterialIssuance) };
                DocumentActions.GetElementById<HTMLInputElement>("btnMaterialReturn").onclick = () => { OpenView("MaterialReturn", Modules.MaterialReturn) };
                DocumentActions.GetElementById<HTMLInputElement>("btnMaterialList").onclick = () => { OpenView("MaterialList", Modules.MaterialList) };
                DocumentActions.GetElementById<HTMLInputElement>("btnEquipmentMonitoring").onclick = () => { OpenView("EquipmentMonitoring", Modules.EquipmentMonitoring) };
                DocumentActions.GetElementById<HTMLInputElement>("btnEquipmentRequest").onclick = () => { OpenView("EquipmentRequest", Modules.EquipmentRequest) };
                DocumentActions.GetElementById<HTMLInputElement>("btnEquipmentAssign").onclick = () => { OpenView("EquipmentAssign", Modules.EquipmentAssign) };
                DocumentActions.GetElementById<HTMLInputElement>("btnLaborMonitoring").onclick = () => { OpenView("LaborMonitoring", Modules.LaborMonitoring) };
                DocumentActions.GetElementById<HTMLInputElement>("btnLaborRequest").onclick = () => { OpenView("LaborRequest", Modules.LaborRequest) };
                DocumentActions.GetElementById<HTMLInputElement>("btnLaborAssign").onclick = () => { OpenView("LaborAssign", Modules.LaborAssign) };
                DocumentActions.GetElementById<HTMLInputElement>("btnOverTimeSheet").onclick = () => { OpenView("OverTimeSheet", Modules.OverTimeSheet) };
                DocumentActions.GetElementById<HTMLInputElement>("btnLateandAbsence").onclick = () => { OpenView("LateandAbsence", Modules.LateandAbsence) };
                DocumentActions.GetElementById<HTMLInputElement>("btnProjectRequirements").onclick = () => { OpenReportsPopup(Modules.ProjectRequirements) };
                DocumentActions.GetElementById<HTMLInputElement>("btnUnprodHour").onclick = () => { OpenReportsPopup(Modules.UnprodHour) };
                DocumentActions.GetElementById<HTMLInputElement>("btnMaterialUsage").onclick = () => { OpenReportsPopup(Modules.MaterialUsage) };
                DocumentActions.GetElementById<HTMLInputElement>("btnMaterialUsageproject").onclick = () => { OpenReportsPopup(Modules.MaterialUsageproject) };
                DocumentActions.GetElementById<HTMLInputElement>("btnMaterialUsageSummary").onclick = () => { OpenReportsPopup(Modules.MaterialUsageSummary) };
                DocumentActions.GetElementById<HTMLInputElement>("btnRepMaterialCoverage").onclick = () => { OpenReportsPopup(Modules.RepMaterialCoverage) };
                //;
                DocumentActions.GetElementById<HTMLInputElement>("btnLaborSchedule").onclick = () => { OpenReportsPopup(Modules.LaborSchedule); }

                DocumentActions.GetElementById<HTMLInputElement>("btnLaborMovement").onclick = () => { OpenReportsPopup(Modules.LaborMovement) };
                DocumentActions.GetElementById<HTMLInputElement>("btnLaborWork").onclick = () => { OpenReportsPopup(Modules.LaborWork) };
                DocumentActions.GetElementById<HTMLInputElement>("btnAttendanceSheet").onclick = () => { OpenReportsPopup(Modules.AttendanceSheet) };
                DocumentActions.GetElementById<HTMLInputElement>("btnEquipmentmovement").onclick = () => { OpenReportsPopup(Modules.Equipmentmovement) };
                DocumentActions.GetElementById<HTMLInputElement>("btnEquipmentutilization").onclick = () => { OpenReportsPopup(Modules.Equipmentutilization) };
                DocumentActions.GetElementById<HTMLInputElement>("btnLaborutilization").onclick = () => { OpenReportsPopup(Modules.Laborutilization) };
                DocumentActions.GetElementById<HTMLInputElement>("btnProdvsprogress").onclick = () => { OpenReportsPopup(Modules.Prodvsprogress) };
                //    } catch (e) { }
                //}
            } catch (e) { }

        }

 

        if (_SubSys == "REP") {
            try {
                DocumentActions.GetElementById<HTMLInputElement>("btnRepProjectDist").onclick = () => { OpenReportsPopup(Modules.RepProjectDist) };
                DocumentActions.GetElementById<HTMLInputElement>("btnRepProjectPhaseDis").onclick = () => { OpenReportsPopup(Modules.RepProjectPhaseDis) };
                DocumentActions.GetElementById<HTMLInputElement>("btnRepProjectWorking").onclick = () => { OpenReportsPopup(Modules.RepProjectWorking) };
                DocumentActions.GetElementById<HTMLInputElement>("btnRepProjectFollowUp").onclick = () => { OpenReportsPopup(Modules.RepProjectFollowUp) };
                //DocumentActions.GetElementById<HTMLInputElement>("btnRepProjectBandFollow").onclick = () => { OpenReportsPopup(Modules.RepProjectBandFollow) };

                DocumentActions.GetElementById<HTMLInputElement>("btnRepLaborEvaluation").onclick = () => { OpenReportsPopup(Modules.RepLaborEvaluation) };
                DocumentActions.GetElementById<HTMLInputElement>("btnRepSiteEngineerBonus").onclick = () => { OpenReportsPopup(Modules.RepSiteEngineerBonus) };
                DocumentActions.GetElementById<HTMLInputElement>("btnRepProjectEvaluation").onclick = () => { OpenReportsPopup(Modules.RepProjectEvaluation) };
                DocumentActions.GetElementById<HTMLInputElement>("btnRepProjectCost").onclick = () => { OpenReportsPopup(Modules.RepProjectCost) };
                DocumentActions.GetElementById<HTMLInputElement>("btnRepProjectCostVarian").onclick = () => { OpenReportsPopup(Modules.RepProjectCostVarian) };
                
                DocumentActions.GetElementById<HTMLInputElement>("btnRepLaborCostVariance").onclick = () => { OpenReportsPopup(Modules.RepLaborCostVariance) };
                DocumentActions.GetElementById<HTMLInputElement>("btnRepEquipCostVariance").onclick = () => { OpenReportsPopup(Modules.RepEquipCostVariance) };

            } catch (e) {

            }
        }


        if (_SubSys == "DSS") {
            try {
                DocumentActions.GetElementById<HTMLInputElement>("btnSalesComparison").onclick = () => { OpenReportsPopup(Modules.SalesComparison) };
                DocumentActions.GetElementById<HTMLInputElement>("btnProductionComparis").onclick = () => { OpenReportsPopup(Modules.ProductionComparis) };
                DocumentActions.GetElementById<HTMLInputElement>("btnIncomeComparison").onclick = () => { OpenReportsPopup(Modules.IncomeComparison) };
                DocumentActions.GetElementById<HTMLInputElement>("btnMonthBudgetForComp").onclick = () => { OpenReportsPopup(Modules.MonthBudgetForComp); }
                DocumentActions.GetElementById<HTMLInputElement>("btnDirectCostComparis").onclick = () => { OpenReportsPopup(Modules.DirectCostComparis) };
                DocumentActions.GetElementById<HTMLInputElement>("btnByScopeCategory").onclick = () => { OpenReportsPopup(Modules.ByScopeCategory) };
                DocumentActions.GetElementById<HTMLInputElement>("btnEC_ByScope").onclick = () => { OpenReportsPopup(Modules.EC_ByScope) };
                DocumentActions.GetElementById<HTMLInputElement>("btnByCustomerClass").onclick = () => { OpenReportsPopup(Modules.ByCustomerClass) };
                DocumentActions.GetElementById<HTMLInputElement>("btnByBranch").onclick = () => { OpenReportsPopup(Modules.ByBranch) };
                DocumentActions.GetElementById<HTMLInputElement>("btnByProject").onclick = () => { OpenReportsPopup(Modules.ByProject) };
                DocumentActions.GetElementById<HTMLInputElement>("btnByItem").onclick = () => { OpenReportsPopup(Modules.ByItem) };
                DocumentActions.GetElementById<HTMLInputElement>("btnC_ByScopeCategory").onclick = () => { OpenReportsPopup(Modules.C_ByScopeCategory) };
                DocumentActions.GetElementById<HTMLInputElement>("btnCC_ByScope").onclick = () => { OpenReportsPopup(Modules.CC_ByScope) };
                DocumentActions.GetElementById<HTMLInputElement>("btnNormsVariationRep").onclick = () => { OpenReportsPopup(Modules.NormsVariationRep) };
                DocumentActions.GetElementById<HTMLInputElement>("btnSubContractorWork").onclick = () => { OpenReportsPopup(Modules.SubContractorWork) };
                DocumentActions.GetElementById<HTMLInputElement>("btnProjectBillingSteaus").onclick = () => { OpenReportsPopup(Modules.ProjectBillingSteaus) };

            } catch (e) {

            }
        }

        ApplyModules();
        let _CompCode = SharedSession.CurrentEnvironment.CompCode;
        let _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

        let _DashBoardPeriodinSec = GetSessiontimeout(Number(_CompCode), Number(_BranchCode));
         $('#idSession').val(_DashBoardPeriodinSec.toString());
        $('#SelectSession option[value=1]').prop('selected', 'selected').change();
        SelectSession = document.getElementById('SelectSession') as HTMLSelectElement;
        SelectSession.onchange = OutSessionTimer;
    }
    export function OpenView(controllerName: string, moduleCode: string) {
        ;
        SharedSession.CurrentEnvironment.ModuleCode = moduleCode;
        ClientSharedWork.Session.Modulecode = moduleCode;
        Ajax.Callsync({
            url: Url.Action("CallFunc_GetPrivilage", "ClientTools"),
            success: (d) => {
                 
                if (d.result == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {
                    let result = JSON.parse(d.result) as UserPrivilege;
                    if (result == null) {
                        MessageBox.Show("Access denied", controllerName);
                        return;
                    }
                    if (result.Access == true) {

                        let dataCookie: string = d.result;
                        $("#spnFav").css("display", "inline-block");

                        SharedSession.CurrentPrivileges = result;
                        SharedSession.CurrentPrivileges.MODULE_CODE = moduleCode;

                        systemEnv.ScreenLanguage = sessionStorage.getItem("temp_lang");

                        //  document.cookie = "PMS_systemProperties=" + JSON.stringify(systemEnv).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                        document.cookie = "PMS_Privilage=" + JSON.stringify(dataCookie).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
                        //SharedSession.CurrentPrivileges = GetPrivileges();
                        var x = Url.Action(controllerName + "Index", controllerName);
                        window.open(Url.Action(controllerName + "Index", controllerName), "_self");
                    }
                    else {
                        MessageBox.Show("Access denied", controllerName);
                    }
                }
            }
        });
    }
    export function OpenReportsPopup(moduleCode: string) {
        SharedSession.CurrentEnvironment.ModuleCode = moduleCode;
        ClientSharedWork.Session.Modulecode = moduleCode;
        //
        Ajax.CallAsync({
            url: Url.Action("CallFunc_GetPrivilage", "ClientTools"),
            success: (d) => {
                
                if (d.result == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {

                    let result = JSON.parse(d.result) as UserPrivilege;
                    if (result == null) {
                        MessageBox.Show("Access denied", "GeneralReports");
                        return;
                    }
                    //
                    if (result.Access == true) {
                        let opt: JQueryAjaxSettings = {
                            url: Url.Action(moduleCode, "GeneralReports"),
                            success: (d) => {
                                let result = d as string;
                                $("#ReportPopupBody").html(result);
                                $("#ReportsPopupDialog").modal("show");
                                $('#ReportsPopupDialog').modal({
                                    refresh: true
                                });
                                systemEnv.ScreenLanguage = sessionStorage.getItem("temp_lang");
                                //
                                var val = $("#rpTitle").text();
                                $("#TitleSpan").html(val);
                                let screenName = moduleCode.replace(/([A-Z])/g, ' $1').trim();//add space before capital letters
                                $("#TitleSpanRep").html(screenName);
                            }
                        };
                        Ajax.CallAsync(opt);
                    }
                    else {
                        MessageBox.Show("Access denied", "GeneralReports");
                    }
                }
            }
        });
    }
    export function SwitchAppLanguage() {
        if (SharedSession.CurrentEnvironment.Language == "ar") {
            btn_ar.style.display = "none";
            btn_eng.style.display = "block";
        }
        else {
            btn_ar.style.display = "block";
            btn_eng.style.display = "none";
        }
        if (SharedSession.CurrentPrivileges == null || SharedSession.CurrentPrivileges.MODULE_CODE == Modules.Home) {
            if (SharedSession.CurrentEnvironment.Language == "ar") {
                $("#menSales").text("مبيعات");
                $("#menTransactions").text("الحركات")
                $("#menCustomer").text("العملاء");
                $("#menCaher").text("الكاشير");
                $("#menReports").text("التقارير");
                $("#menClose").text("إغلاق");
                btn_ar.style.display = "none";
                btn_eng.style.display = "block";
            }
            else if (SharedSession.CurrentEnvironment.Language == "en") {
                $("#menSales").text("Sales");
                $("#menTransactions").text("Transactions")
                $("#menCustomer").text("Customers");
                $("#menCaher").text("Casher");
                $("#menReports").text("Reports");
                $("#menClose").text("Close");
                btn_ar.style.display = "block";
                btn_eng.style.display = "none";
            }
        }
        else {
            AssignLanguage();
            if (ControlsButtons.AssignLanguageAction != null)
                ControlsButtons.AssignLanguageAction();
        }
    }

    function ApplyModules() {
        var lis = document.getElementsByClassName("liItem");
        let obj = [document.getElementById('liItem')];
        let modules: Array<UserPrivilege> = new Array<UserPrivilege>();
        let compCode = SharedSession.CurrentEnvironment.CompCode;
        let branchCode = SharedSession.CurrentEnvironment.BranchCode;
        let UserCode = SharedSession.CurrentEnvironment.UserCode;
        let SystemCode = SharedSession.CurrentEnvironment.SystemCode;
        let SubSystemCode = SharedSession.CurrentEnvironment.SubSystemCode;
        SharedSession.CurrentEnvironment.ModuleCode = "";
        ClientSharedWork.Session.Modulecode = "";
        

        Ajax.Callsync({
            url: Url.Action("CallFunc_PrivilageUser", "ClientTools"),
            success: (d) => {
                //;
                modules = JSON.parse(d.result) as Array<UserPrivilege>;
            }
        });
        //;
        let li;
        for (var i = 0; i < modules.length; i++) {
            let singleUserModule: UserPrivilege = modules[i];
            if (singleUserModule.MODULE_CODE.substring(0, 5) == "Note_") {
                li = document.getElementById(singleUserModule.MODULE_CODE) as HTMLLIElement;
            }
            else {
                li = document.getElementById("btn" + singleUserModule.MODULE_CODE) as HTMLLIElement;
            }
            if (li != null) {
                if (singleUserModule != null) {
                    if (singleUserModule.Access === false)
                        li.style.display = "none";
                    if (singleUserModule.AVAILABLE === false)
                        li.style.display = "none";
                }
                else {
                    let key: string = li.getAttribute("key");
                    li.style.display = "";
                    li.className = "liItem";
                }
            } else {

                // Enable  this line for debuging of module codes are correct \
                //console.log(singleUserModule.MODULE_CODE)
                alert(singleUserModule.MODULE_CODE);
            }
        }
    }
    //function ApplyModules() {
    //    
    //    var lis = document.getElementsByClassName("liItem");
    //    let modules: Array<UserPrivilege> = new Array<UserPrivilege>();
    //    Ajax.Callsync({
    //        url: Url.Action("CallFunc_PrivilageUser", "ClientTools"),
    //        success: (d) => {
    //            modules = JSON.parse(d.result) as Array<UserPrivilege>;
    //        }
    //    });
    //    for (var i = 0; i < modules.length; i++) {
    //        
    //        let singleUserModule: UserPrivilege = modules[i];
    //        for (var index = 0; index < lis.length; index++) {
    //            let li = lis.item(index) as HTMLLIElement;
    //            if (li.title == singleUserModule.MODULE_CODE) {
    //                if (singleUserModule != null) {
    //                    if (singleUserModule.Access === false) // disable if false
    //                        li.style.display = "none";
    //                    if (singleUserModule.AVAILABLE === false)// hide if false 
    //                        li.style.display = "none";
    //                }
    //                else {
    //                    let key: string = li.getAttribute("key");
    //                    li.style.display = "";
    //                    li.className = "liItem";
    //                }
    //                break;
    //            }
    //        }
    //    }
    //}
    function AssignLanguage() {
        if (SharedSession.CurrentEnvironment.Language == "ar") {
            (document.getElementById("hImageEditor") as HTMLSpanElement).innerText = "الصورة";
            (document.getElementById("hPrint") as HTMLSpanElement).innerText = "طباعة";
            (document.getElementById("hDelete") as HTMLSpanElement).innerText = "حذف";
            (document.getElementById("hRefresh") as HTMLSpanElement).innerText = "تحديث";
            (document.getElementById("hUndo") as HTMLSpanElement).innerText = "تراجع";
            (document.getElementById("hSave") as HTMLSpanElement).innerText = "حفظ";
            (document.getElementById("hEdit") as HTMLSpanElement).innerText = "تعديل";
            (document.getElementById("hAdd") as HTMLSpanElement).innerText = "إضافة";
            (document.getElementById("hHome") as HTMLSpanElement).innerText = "رئيسية";
        }
        else {
            (document.getElementById("hImageEditor") as HTMLSpanElement).innerText = "Image editor";
            (document.getElementById("hPrint") as HTMLSpanElement).innerText = "Print";
            (document.getElementById("hDelete") as HTMLSpanElement).innerText = "Delete";
            (document.getElementById("hRefresh") as HTMLSpanElement).innerText = "Refresh";
            (document.getElementById("hUndo") as HTMLSpanElement).innerText = "Undo";
            (document.getElementById("hSave") as HTMLSpanElement).innerText = "Save";
            (document.getElementById("hEdit") as HTMLSpanElement).innerText = "Edit";
            (document.getElementById("hAdd") as HTMLSpanElement).innerText = "Add";
            (document.getElementById("hHome") as HTMLSpanElement).innerText = "Home";
        }
    }
    function LoadCssFile() {
        $(document).ready(() => {
            let body = document.getElementsByTagName("head")[0];// as HTMLBodyElement;
            body.insertAdjacentHTML("afterbegin", "<script src='/ClientApp/SystemTools.js'></script>");
        });
    }
    function btn_ar_Click() {
        SharedSession.CurrentEnvironment.Language = "ar";
        SwitchAppLanguage();
    }
    function btn_eng_Click() {
        SharedSession.CurrentEnvironment.Language = "en";
        SwitchAppLanguage();
    }

    function OutSessionTimer() {
        if (SelectSession.value == '2') {
            //LogoutUserApi();
            debugger
            window.open(Url.Action("Logout", "Home"), "_self");
        }
    }
}

