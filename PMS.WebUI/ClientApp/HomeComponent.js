$(document).ready(function () {
    HomeComponent.InitalizeComponent();
    $("#spnFav").css("display", "none");
});
var HomeComponent;
(function (HomeComponent) {
    var btn_ar;
    var btn_eng;
    var sys = new SystemTools();
    var lblUSER_NAME;
    var btnCategories;
    var btnVendors;
    var btnUnits;
    var btnSpecs;
    var btnStores;
    var btnUnitGroup;
    var btnItems;
    var btnPriceList;
    var btnCustomers;
    var btnTransfer;
    var SelectSession;
    var systemEnv = new SystemEnvironment();
    function InitalizeComponent() {
        //------------------------------------------------------NewSession---------------------------------------
        //---------------------------------------------
        Ajax.Callsync({
            url: Url.Action("GetSystemProperties", "Home"),
            success: function (d) {
                systemEnv = JSON.parse(d.result);
            }
        });
        document.cookie = "PMS_systemProperties=" + JSON.stringify(systemEnv).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
        SharedSession.CurrentEnvironment = systemEnv;
        var lang = SharedSession.CurrentEnvironment.Language;
        if (lang == "en") {
            $("#main-menu").removeClass("sm-rtl");
        }
        var _SubSys = SharedSession.CurrentEnvironment.SubSystemCode;
        if (_SubSys == "DEF") {
            try {
                DocumentActions.GetElementById("btnSalesEngCategory").onclick = function () { OpenView("SalesEngCategory", Modules.SalesEngCategory); };
                DocumentActions.GetElementById("btnSalesEngineer").onclick = function () { OpenView("SalesEngineer", Modules.SalesEngineer); };
                DocumentActions.GetElementById("btnSiteEngCategory").onclick = function () { OpenView("SiteEngCategory", Modules.SiteEngCategory); };
                DocumentActions.GetElementById("btnSiteEngineer").onclick = function () { OpenView("SiteEngineer", Modules.SiteEngineer); };
                DocumentActions.GetElementById("btnLaborDefinition").onclick = function () { OpenView("LaborDefinition", Modules.LaborDefinition); };
                DocumentActions.GetElementById("btnUnProductionreasons").onclick = function () { OpenView("UnProductionreasons", Modules.UnProductionreasons); };
                DocumentActions.GetElementById("btnEquipmentCategory").onclick = function () { OpenView("EquipmentCategory", Modules.EquipmentCategory); };
                DocumentActions.GetElementById("btnEquipmentDefinition").onclick = function () { OpenView("EquipmentDefinition", Modules.EquipmentDefinition); };
                DocumentActions.GetElementById("btnExpensesCategory").onclick = function () { OpenView("ExpensesCategory", Modules.ExpensesCategory); };
                DocumentActions.GetElementById("btnExpenses").onclick = function () { OpenView("Expenses", Modules.Expenses); };
                DocumentActions.GetElementById("btnUnitsOfMeasure").onclick = function () { OpenView("UnitsOfMeasure", Modules.UnitsOfMeasure); };
                DocumentActions.GetElementById("btnNationality").onclick = function () { OpenView("Nationality", Modules.Nationality); };
                DocumentActions.GetElementById("btnScopeDefinition").onclick = function () { OpenView("ScopeDefinition", Modules.ScopeDefinition); };
                DocumentActions.GetElementById("btnScopeClassandCat").onclick = function () { OpenView("ScopeClassandCat", Modules.ScopeClassandCat); };
                DocumentActions.GetElementById("btnCalendarDefinition").onclick = function () { OpenView("CalendarDefinition", Modules.CalendarDefinition); };
                DocumentActions.GetElementById("btnLocationDefinition").onclick = function () { OpenView("LocationDefinition", Modules.LocationDefinition); };
                DocumentActions.GetElementById("btnPeriodManagement").onclick = function () { OpenView("PeriodManagement", Modules.PeriodManagement); };
                DocumentActions.GetElementById("btnLaborCategory").onclick = function () { OpenView("LaborCategory", Modules.LaborCategory); };
                DocumentActions.GetElementById("btnLaborClass").onclick = function () { OpenView("LaborClass", Modules.LaborClass); };
                DocumentActions.GetElementById("btnLaborAbsenceReasons").onclick = function () { OpenView("LaborAbsenceReasons", Modules.LaborAbsenceReasons); };
                DocumentActions.GetElementById("btnLaborOvertimetypes").onclick = function () { OpenView("LaborOvertimetypes", Modules.LaborOvertimetypes); };
                DocumentActions.GetElementById("btnUnProductioncategory").onclick = function () { OpenView("UnProductioncategory", Modules.UnProductioncategory); };
                DocumentActions.GetElementById("btnSystemSetting").onclick = function () { OpenView("SystemSetting", Modules.SystemSetting); };
                DocumentActions.GetElementById("btnUsersSetting").onclick = function () { OpenView("UsersSetting", Modules.UsersSetting); };
            }
            catch (e) { }
        }
        if (_SubSys == "SLS") {
            try {
                DocumentActions.GetElementById("btnCustomerCategory").onclick = function () { OpenView("CustomerCategory", Modules.CustomerCategory); };
                DocumentActions.GetElementById("btnCustomers").onclick = function () { OpenView("Customers", Modules.Customers); };
                DocumentActions.GetElementById("btnCustomerRespItems").onclick = function () { OpenView("CustomerRespItems", Modules.CustomerRespItems); };
                DocumentActions.GetElementById("btnCompanyRespItem").onclick = function () { OpenView("CompanyRespItem", Modules.CompanyRespItem); };
                DocumentActions.GetElementById("btnSalesItemLibrary").onclick = function () { OpenView("SalesItemLibrary", Modules.SalesItemLibrary); };
                DocumentActions.GetElementById("btnSalesItemPlan").onclick = function () { OpenView("SalesItemPlan", Modules.SalesItemPlan); };
                DocumentActions.GetElementById("btnActivityPrice").onclick = function () { OpenView("ActivityPrice", Modules.ActivityPrice); };
                //DocumentActions.GetElementById<HTMLInputElement>("btnIssueProduction").onclick = () => { OpenView("IssueProduction", Modules.IssueProduction); }
                DocumentActions.GetElementById("btnCustomerBilling").onclick = function () { OpenView("CustomerBilling", Modules.CustomerBilling); };
                DocumentActions.GetElementById("btnCustomerDbCr").onclick = function () { OpenView("CustomerDbCr", Modules.CustomerDbCr); };
                DocumentActions.GetElementById("btnSalesManBonus").onclick = function () { OpenReportsPopup(Modules.SalesManBonus); };
                DocumentActions.GetElementById("btnOfferDefinition").onclick = function () { OpenView("OfferDefinition", Modules.OfferDefinition); };
                DocumentActions.GetElementById("btnOfferSpecification").onclick = function () { OpenView("OfferSpecification", Modules.OfferSpecification); };
                DocumentActions.GetElementById("btnOfferCostEstimation").onclick = function () { OpenView("OfferCostEstimation", Modules.OfferCostEstimation); };
                DocumentActions.GetElementById("btnOfferBillingSchedule").onclick = function () { OpenView("OfferBillingSchedule", Modules.OfferBillingSchedule); };
                DocumentActions.GetElementById("btnStartOfWork").onclick = function () { OpenView("StartOfWork", Modules.StartOfWork); };
                DocumentActions.GetElementById("btnSalesPaymentTerms").onclick = function () { OpenView("SalesPaymentTerms", Modules.SalesPaymentTerms); };
                //popup  reports
                DocumentActions.GetElementById("btnContractList").onclick = function () { OpenReportsPopup(Modules.ContractList); };
                DocumentActions.GetElementById("btnOfferList").onclick = function () { OpenReportsPopup(Modules.OfferList); };
                DocumentActions.GetElementById("btnSalesmanActivity").onclick = function () { OpenReportsPopup(Modules.SalesmanActivity); };
                DocumentActions.GetElementById("btnProductionVsBilling").onclick = function () { OpenReportsPopup(Modules.ProductionVsBilling); };
                DocumentActions.GetElementById("btnProjItemsInventory").onclick = function () { OpenReportsPopup(Modules.ProjItemsInventory); };
                DocumentActions.GetElementById("btnBillingList").onclick = function () { OpenReportsPopup(Modules.BillingList); };
                DocumentActions.GetElementById("btnCRMReport").onclick = function () { OpenReportsPopup(Modules.CRMReport); };
                DocumentActions.GetElementById("btnTaxInvoicelist").onclick = function () { OpenReportsPopup(Modules.TaxInvoicelist); };
            }
            catch (e) { }
        }
        if (_SubSys == "ENG") {
            try {
                DocumentActions.GetElementById("btnProjectDefination").onclick = function () { OpenView("ProjectDefination", Modules.ProjectDefination); };
                DocumentActions.GetElementById("btnProjectvaliation").onclick = function () { OpenView("Projectvaliation", Modules.Projectvaliation); };
                DocumentActions.GetElementById("btnProjectSpecification").onclick = function () { OpenView("ProjectSpecification", Modules.ProjectSpecification); };
                DocumentActions.GetElementById("btnWorkActivities").onclick = function () { OpenView("WorkActivities", Modules.WorkActivities); };
                DocumentActions.GetElementById("btnProjectMasterPlan").onclick = function () { OpenView("ProjectMasterPlan", Modules.ProjectMasterPlan); };
                DocumentActions.GetElementById("btnProjectChange").onclick = function () { OpenView("ProjectChange", Modules.ProjectChange); };
                DocumentActions.GetElementById("btnWorkSchedule").onclick = function () { OpenView("WorkSchedule", Modules.WorkSchedule); };
                DocumentActions.GetElementById("btnOpProductionEntry").onclick = function () { OpenView("OpProductionEntry", Modules.OpProductionEntry); };
                DocumentActions.GetElementById("btnOpProjectExpenses").onclick = function () { OpenView("OpProjectExpenses", Modules.OpProjectExpenses); };
                DocumentActions.GetElementById("btnIssueProduction").onclick = function () { OpenView("IssueProduction", Modules.IssueProduction); };
                DocumentActions.GetElementById("btnPrequalification").onclick = function () { OpenView("Prequalification", Modules.Prequalification); };
                DocumentActions.GetElementById("btnDefinition").onclick = function () { OpenView("Definition", Modules.Definition); };
                DocumentActions.GetElementById("btnSubContContract").onclick = function () { OpenView("SubContContract", Modules.SubContContract); };
                DocumentActions.GetElementById("btnServiceOrder").onclick = function () { OpenView("ServiceOrder", Modules.ServiceOrder); };
                DocumentActions.GetElementById("btnProductionEntry").onclick = function () { OpenView("ProductionEntry", Modules.ProductionEntry); };
                DocumentActions.GetElementById("btnSubContractorListing").onclick = function () { OpenReportsPopup(Modules.SubContractorListing); };
                DocumentActions.GetElementById("btnSubContrActivity").onclick = function () { OpenReportsPopup(Modules.SubContrActivity); };
                DocumentActions.GetElementById("btnProduction").onclick = function () { OpenReportsPopup(Modules.Production); };
                DocumentActions.GetElementById("btnEvaluation").onclick = function () { OpenReportsPopup(Modules.Evaluation); };
                //DocumentActions.GetElementById<HTMLInputElement>("btnLaborSchedule").onclick = () => { OpenReportsPopup(Modules.LaborSchedule); }
                //DocumentActions.GetElementById<HTMLInputElement>("btnLaborScheduleUtz").onclick = () => { OpenReportsPopup(Modules.LaborScheduleUtz); }
                DocumentActions.GetElementById("btnProjectExpensesRep").onclick = function () { OpenReportsPopup(Modules.ProjectExpensesRep); };
                DocumentActions.GetElementById("btnProjectStatus").onclick = function () { OpenReportsPopup(Modules.ProjectStatus); };
                DocumentActions.GetElementById("btnProjectProgress").onclick = function () { OpenReportsPopup(Modules.ProjectProgress); };
                DocumentActions.GetElementById("btnPeriodBudget").onclick = function () { OpenView("PeriodBudget", Modules.PeriodBudget); };
                DocumentActions.GetElementById("btnPrepare").onclick = function () { OpenView("Prepare", Modules.Prepare); };
                DocumentActions.GetElementById("btnBudgetRequirements").onclick = function () { OpenReportsPopup(Modules.BudgetRequirements); };
                DocumentActions.GetElementById("btnMonthBudgetByEng").onclick = function () { OpenReportsPopup(Modules.MonthBudgetByEng); };
                DocumentActions.GetElementById("btnMonthBudgetForBranch").onclick = function () { OpenReportsPopup(Modules.MonthBudgetForBranch); };
                DocumentActions.GetElementById("btnProdvsprogress").onclick = function () { OpenReportsPopup(Modules.Prodvsprogress); };
                //if (_SubSys == "RES") {
                //    try {
                DocumentActions.GetElementById("btnBillOfMaterial").onclick = function () { OpenView("BillOfMaterial", Modules.BillOfMaterial); };
                DocumentActions.GetElementById("btnMaterialMonitoring").onclick = function () { OpenView("MaterialMonitoring", Modules.MaterialMonitoring); };
                DocumentActions.GetElementById("btnMaterialRequest").onclick = function () { OpenView("MaterialRequest", Modules.MaterialRequest); };
                DocumentActions.GetElementById("btnMaterialIssuance").onclick = function () { OpenView("MaterialIssuance", Modules.MaterialIssuance); };
                DocumentActions.GetElementById("btnMaterialReturn").onclick = function () { OpenView("MaterialReturn", Modules.MaterialReturn); };
                DocumentActions.GetElementById("btnMaterialList").onclick = function () { OpenView("MaterialList", Modules.MaterialList); };
                DocumentActions.GetElementById("btnEquipmentMonitoring").onclick = function () { OpenView("EquipmentMonitoring", Modules.EquipmentMonitoring); };
                DocumentActions.GetElementById("btnEquipmentRequest").onclick = function () { OpenView("EquipmentRequest", Modules.EquipmentRequest); };
                DocumentActions.GetElementById("btnEquipmentAssign").onclick = function () { OpenView("EquipmentAssign", Modules.EquipmentAssign); };
                DocumentActions.GetElementById("btnLaborMonitoring").onclick = function () { OpenView("LaborMonitoring", Modules.LaborMonitoring); };
                DocumentActions.GetElementById("btnLaborRequest").onclick = function () { OpenView("LaborRequest", Modules.LaborRequest); };
                DocumentActions.GetElementById("btnLaborAssign").onclick = function () { OpenView("LaborAssign", Modules.LaborAssign); };
                DocumentActions.GetElementById("btnOverTimeSheet").onclick = function () { OpenView("OverTimeSheet", Modules.OverTimeSheet); };
                DocumentActions.GetElementById("btnLateandAbsence").onclick = function () { OpenView("LateandAbsence", Modules.LateandAbsence); };
                DocumentActions.GetElementById("btnProjectRequirements").onclick = function () { OpenReportsPopup(Modules.ProjectRequirements); };
                DocumentActions.GetElementById("btnUnprodHour").onclick = function () { OpenReportsPopup(Modules.UnprodHour); };
                DocumentActions.GetElementById("btnMaterialUsage").onclick = function () { OpenReportsPopup(Modules.MaterialUsage); };
                DocumentActions.GetElementById("btnMaterialUsageproject").onclick = function () { OpenReportsPopup(Modules.MaterialUsageproject); };
                DocumentActions.GetElementById("btnMaterialUsageSummary").onclick = function () { OpenReportsPopup(Modules.MaterialUsageSummary); };
                DocumentActions.GetElementById("btnRepMaterialCoverage").onclick = function () { OpenReportsPopup(Modules.RepMaterialCoverage); };
                //;
                DocumentActions.GetElementById("btnLaborSchedule").onclick = function () { OpenReportsPopup(Modules.LaborSchedule); };
                DocumentActions.GetElementById("btnLaborMovement").onclick = function () { OpenReportsPopup(Modules.LaborMovement); };
                DocumentActions.GetElementById("btnLaborWork").onclick = function () { OpenReportsPopup(Modules.LaborWork); };
                DocumentActions.GetElementById("btnAttendanceSheet").onclick = function () { OpenReportsPopup(Modules.AttendanceSheet); };
                DocumentActions.GetElementById("btnEquipmentmovement").onclick = function () { OpenReportsPopup(Modules.Equipmentmovement); };
                DocumentActions.GetElementById("btnEquipmentutilization").onclick = function () { OpenReportsPopup(Modules.Equipmentutilization); };
                DocumentActions.GetElementById("btnLaborutilization").onclick = function () { OpenReportsPopup(Modules.Laborutilization); };
                DocumentActions.GetElementById("btnProdvsprogress").onclick = function () { OpenReportsPopup(Modules.Prodvsprogress); };
                //    } catch (e) { }
                //}
            }
            catch (e) { }
        }
        if (_SubSys == "REP") {
            try {
                DocumentActions.GetElementById("btnRepProjectDist").onclick = function () { OpenReportsPopup(Modules.RepProjectDist); };
                DocumentActions.GetElementById("btnRepProjectPhaseDis").onclick = function () { OpenReportsPopup(Modules.RepProjectPhaseDis); };
                DocumentActions.GetElementById("btnRepProjectWorking").onclick = function () { OpenReportsPopup(Modules.RepProjectWorking); };
                DocumentActions.GetElementById("btnRepProjectFollowUp").onclick = function () { OpenReportsPopup(Modules.RepProjectFollowUp); };
                //DocumentActions.GetElementById<HTMLInputElement>("btnRepProjectBandFollow").onclick = () => { OpenReportsPopup(Modules.RepProjectBandFollow) };
                DocumentActions.GetElementById("btnRepLaborEvaluation").onclick = function () { OpenReportsPopup(Modules.RepLaborEvaluation); };
                DocumentActions.GetElementById("btnRepSiteEngineerBonus").onclick = function () { OpenReportsPopup(Modules.RepSiteEngineerBonus); };
                DocumentActions.GetElementById("btnRepProjectEvaluation").onclick = function () { OpenReportsPopup(Modules.RepProjectEvaluation); };
                DocumentActions.GetElementById("btnRepProjectCost").onclick = function () { OpenReportsPopup(Modules.RepProjectCost); };
                DocumentActions.GetElementById("btnRepProjectCostVarian").onclick = function () { OpenReportsPopup(Modules.RepProjectCostVarian); };
                DocumentActions.GetElementById("btnRepLaborCostVariance").onclick = function () { OpenReportsPopup(Modules.RepLaborCostVariance); };
                DocumentActions.GetElementById("btnRepEquipCostVariance").onclick = function () { OpenReportsPopup(Modules.RepEquipCostVariance); };
            }
            catch (e) {
            }
        }
        if (_SubSys == "DSS") {
            try {
                DocumentActions.GetElementById("btnSalesComparison").onclick = function () { OpenReportsPopup(Modules.SalesComparison); };
                DocumentActions.GetElementById("btnProductionComparis").onclick = function () { OpenReportsPopup(Modules.ProductionComparis); };
                DocumentActions.GetElementById("btnIncomeComparison").onclick = function () { OpenReportsPopup(Modules.IncomeComparison); };
                DocumentActions.GetElementById("btnMonthBudgetForComp").onclick = function () { OpenReportsPopup(Modules.MonthBudgetForComp); };
                DocumentActions.GetElementById("btnDirectCostComparis").onclick = function () { OpenReportsPopup(Modules.DirectCostComparis); };
                DocumentActions.GetElementById("btnByScopeCategory").onclick = function () { OpenReportsPopup(Modules.ByScopeCategory); };
                DocumentActions.GetElementById("btnEC_ByScope").onclick = function () { OpenReportsPopup(Modules.EC_ByScope); };
                DocumentActions.GetElementById("btnByCustomerClass").onclick = function () { OpenReportsPopup(Modules.ByCustomerClass); };
                DocumentActions.GetElementById("btnByBranch").onclick = function () { OpenReportsPopup(Modules.ByBranch); };
                DocumentActions.GetElementById("btnByProject").onclick = function () { OpenReportsPopup(Modules.ByProject); };
                DocumentActions.GetElementById("btnByItem").onclick = function () { OpenReportsPopup(Modules.ByItem); };
                DocumentActions.GetElementById("btnC_ByScopeCategory").onclick = function () { OpenReportsPopup(Modules.C_ByScopeCategory); };
                DocumentActions.GetElementById("btnCC_ByScope").onclick = function () { OpenReportsPopup(Modules.CC_ByScope); };
                DocumentActions.GetElementById("btnNormsVariationRep").onclick = function () { OpenReportsPopup(Modules.NormsVariationRep); };
                DocumentActions.GetElementById("btnSubContractorWork").onclick = function () { OpenReportsPopup(Modules.SubContractorWork); };
                DocumentActions.GetElementById("btnProjectBillingSteaus").onclick = function () { OpenReportsPopup(Modules.ProjectBillingSteaus); };
            }
            catch (e) {
            }
        }
        ApplyModules();
        var _CompCode = SharedSession.CurrentEnvironment.CompCode;
        var _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        var _DashBoardPeriodinSec = GetSessiontimeout(Number(_CompCode), Number(_BranchCode));
        $('#idSession').val(_DashBoardPeriodinSec.toString());
        $('#SelectSession option[value=1]').prop('selected', 'selected').change();
        SelectSession = document.getElementById('SelectSession');
        SelectSession.onchange = OutSessionTimer;
    }
    HomeComponent.InitalizeComponent = InitalizeComponent;
    function OpenView(controllerName, moduleCode) {
        ;
        SharedSession.CurrentEnvironment.ModuleCode = moduleCode;
        ClientSharedWork.Session.Modulecode = moduleCode;
        Ajax.Callsync({
            url: Url.Action("CallFunc_GetPrivilage", "ClientTools"),
            success: function (d) {
                if (d.result == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {
                    var result = JSON.parse(d.result);
                    if (result == null) {
                        MessageBox.Show("Access denied", controllerName);
                        return;
                    }
                    if (result.Access == true) {
                        var dataCookie = d.result;
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
    HomeComponent.OpenView = OpenView;
    function OpenReportsPopup(moduleCode) {
        SharedSession.CurrentEnvironment.ModuleCode = moduleCode;
        ClientSharedWork.Session.Modulecode = moduleCode;
        //
        Ajax.CallAsync({
            url: Url.Action("CallFunc_GetPrivilage", "ClientTools"),
            success: function (d) {
                if (d.result == undefined) {
                    window.open(Url.Action("LoginIndex", "Login"), "_self");
                    return;
                }
                else {
                    var result = JSON.parse(d.result);
                    if (result == null) {
                        MessageBox.Show("Access denied", "GeneralReports");
                        return;
                    }
                    //
                    if (result.Access == true) {
                        var opt = {
                            url: Url.Action(moduleCode, "GeneralReports"),
                            success: function (d) {
                                var result = d;
                                $("#ReportPopupBody").html(result);
                                $("#ReportsPopupDialog").modal("show");
                                $('#ReportsPopupDialog').modal({
                                    refresh: true
                                });
                                systemEnv.ScreenLanguage = sessionStorage.getItem("temp_lang");
                                //
                                var val = $("#rpTitle").text();
                                $("#TitleSpan").html(val);
                                var screenName = moduleCode.replace(/([A-Z])/g, ' $1').trim(); //add space before capital letters
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
    HomeComponent.OpenReportsPopup = OpenReportsPopup;
    function SwitchAppLanguage() {
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
                $("#menTransactions").text("الحركات");
                $("#menCustomer").text("العملاء");
                $("#menCaher").text("الكاشير");
                $("#menReports").text("التقارير");
                $("#menClose").text("إغلاق");
                btn_ar.style.display = "none";
                btn_eng.style.display = "block";
            }
            else if (SharedSession.CurrentEnvironment.Language == "en") {
                $("#menSales").text("Sales");
                $("#menTransactions").text("Transactions");
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
    HomeComponent.SwitchAppLanguage = SwitchAppLanguage;
    function ApplyModules() {
        var lis = document.getElementsByClassName("liItem");
        var obj = [document.getElementById('liItem')];
        var modules = new Array();
        var compCode = SharedSession.CurrentEnvironment.CompCode;
        var branchCode = SharedSession.CurrentEnvironment.BranchCode;
        var UserCode = SharedSession.CurrentEnvironment.UserCode;
        var SystemCode = SharedSession.CurrentEnvironment.SystemCode;
        var SubSystemCode = SharedSession.CurrentEnvironment.SubSystemCode;
        SharedSession.CurrentEnvironment.ModuleCode = "";
        ClientSharedWork.Session.Modulecode = "";
        Ajax.Callsync({
            url: Url.Action("CallFunc_PrivilageUser", "ClientTools"),
            success: function (d) {
                //;
                modules = JSON.parse(d.result);
            }
        });
        //;
        var li;
        for (var i = 0; i < modules.length; i++) {
            var singleUserModule = modules[i];
            if (singleUserModule.MODULE_CODE.substring(0, 5) == "Note_") {
                li = document.getElementById(singleUserModule.MODULE_CODE);
            }
            else {
                li = document.getElementById("btn" + singleUserModule.MODULE_CODE);
            }
            if (li != null) {
                if (singleUserModule != null) {
                    if (singleUserModule.Access === false)
                        li.style.display = "none";
                    if (singleUserModule.AVAILABLE === false)
                        li.style.display = "none";
                }
                else {
                    var key = li.getAttribute("key");
                    li.style.display = "";
                    li.className = "liItem";
                }
            }
            else {
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
            document.getElementById("hImageEditor").innerText = "الصورة";
            document.getElementById("hPrint").innerText = "طباعة";
            document.getElementById("hDelete").innerText = "حذف";
            document.getElementById("hRefresh").innerText = "تحديث";
            document.getElementById("hUndo").innerText = "تراجع";
            document.getElementById("hSave").innerText = "حفظ";
            document.getElementById("hEdit").innerText = "تعديل";
            document.getElementById("hAdd").innerText = "إضافة";
            document.getElementById("hHome").innerText = "رئيسية";
        }
        else {
            document.getElementById("hImageEditor").innerText = "Image editor";
            document.getElementById("hPrint").innerText = "Print";
            document.getElementById("hDelete").innerText = "Delete";
            document.getElementById("hRefresh").innerText = "Refresh";
            document.getElementById("hUndo").innerText = "Undo";
            document.getElementById("hSave").innerText = "Save";
            document.getElementById("hEdit").innerText = "Edit";
            document.getElementById("hAdd").innerText = "Add";
            document.getElementById("hHome").innerText = "Home";
        }
    }
    function LoadCssFile() {
        $(document).ready(function () {
            var body = document.getElementsByTagName("head")[0]; // as HTMLBodyElement;
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
            debugger;
            window.open(Url.Action("Logout", "Home"), "_self");
        }
    }
})(HomeComponent || (HomeComponent = {}));
//# sourceMappingURL=HomeComponent.js.map