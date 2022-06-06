using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.WebUI.Controllers
{
    public static class Path
    {
        #region Definitions
        //01_Engineers
        public static string SalesEngCategory = "~/Views/Definitions/01_SubEngineers/SalesEngCategory/SalesEngCategoryIndex.cshtml";
        public static string SalesEngineer = "~/Views/Definitions/01_SubEngineers/SalesEngineer/SalesEngineerIndex.cshtml";
        public static string SiteEngCategory = "~/Views/Definitions/01_SubEngineers/SiteEngCategory/SiteEngCategoryIndex.cshtml";
        public static string SiteEngineer = "~/Views/Definitions/01_SubEngineers/SiteEngineer/SiteEngineerIndex.cshtml";
        //02_Labor Definition
        public static string LaborAbsenceReasons = "~/Views/Definitions/02_SubLaborDefinition/LaborAbsenceReasons/LaborAbsenceReasonsIndex.cshtml";
        public static string LaborCategory = "~/Views/Definitions/02_SubLaborDefinition/LaborCategory/LaborCategoryIndex.cshtml";
        public static string LaborClass = "~/Views/Definitions/02_SubLaborDefinition/LaborClass/LaborClassIndex.cshtml";
        public static string LaborDefinition = "~/Views/Definitions/02_SubLaborDefinition/LaborDefinition/LaborDefinitionIndex.cshtml";
        public static string LaborOvertimetypes = "~/Views/Definitions/02_SubLaborDefinition/LaborOvertimetypes/LaborOvertimetypesIndex.cshtml";
        public static string UnProductioncategory = "~/Views/Definitions/02_SubLaborDefinition/UnProductioncategory/UnProductioncategoryIndex.cshtml";
        public static string UnProductionreasons = "~/Views/Definitions/02_SubLaborDefinition/UnProductionreasons/UnProductionreasonsIndex.cshtml";
        //03_EquipToolsDefinition
        public static string EquipmentCategory = "~/Views/Definitions/03_SubEquipToolsDefinition/EquipmentCategory/EquipmentCategoryIndex.cshtml";
        public static string EquipmentDefinition = "~/Views/Definitions/03_SubEquipToolsDefinition/EquipmentDefinition/EquipmentDefinitionIndex.cshtml";
        //04_Expenses
        public static string ExpensesCategory = "~/Views/Definitions/04_SubExpenses/ExpensesCategory/ExpensesCategoryIndex.cshtml";
        public static string Expenses = "~/Views/Definitions/04_SubExpenses/Expenses/ExpensesIndex.cshtml";
        //05_AreaDefinition
        public static string LocationDefinition = "~/Views/Definitions/05_SubAreaDefinition/LocationDefinition/LocationDefinitionIndex.cshtml";
        public static string PeriodManagement = "~/Views/Definitions/05_SubAreaDefinition/PeriodManagement/PeriodManagementIndex.cshtml";
        //06_ActivityInformationBank
        public static string ScopeClassandCat = "~/Views/Definitions/06_SubActivityInformationBank/ScopeClassandCat/ScopeClassandCatIndex.cshtml";
        public static string ScopeDefinition = "~/Views/Definitions/06_SubActivityInformationBank/ScopeDefinition/ScopeDefinitionIndex.cshtml";
        
        //07_OtherDefinition
        public static string CalendarDefinition = "~/Views/Definitions/07_SubOtherDefinition/CalendarDefinition/CalendarDefinitionIndex.cshtml";
        public static string Nationality = "~/Views/Definitions/07_SubOtherDefinition/Nationality/NationalityIndex.cshtml";
        public static string SystemSetting = "~/Views/Definitions/07_SubOtherDefinition/SystemSetting/SystemSettingIndex.cshtml";
        public static string UnitsOfMeasure = "~/Views/Definitions/07_SubOtherDefinition/UnitsOfMeasure/UnitsOfMeasureIndex.cshtml";
        public static string UsersSetting = "~/Views/Definitions/07_SubOtherDefinition/UsersSetting/UsersSettingIndex.cshtml";
        #endregion

        #region Sales
        //01_SalesDataLibrary
        public static string SalesItemPlan = "~/Views/Sales/01_SalesDataLibrary/SalesItemPlan/SalesItemPlanIndex.cshtml";
        public static string SalesItemLibrary = "~/Views/Sales/01_SalesDataLibrary/SalesItemLibrary/SalesItemLibraryIndex.cshtml";
        public static string Customers = "~/Views/Sales/01_SalesDataLibrary/Customers/CustomersIndex.cshtml";
        public static string CustomerRespItems = "~/Views/Sales/01_SalesDataLibrary/CustomerRespItems/CustomerRespItemsIndex.cshtml";
        public static string CustomerCategory = "~/Views/Sales/01_SalesDataLibrary/CustomerCategory/CustomerCategoryIndex.cshtml";
        public static string CompanyRespItem = "~/Views/Sales/01_SalesDataLibrary/CompanyRespItem/CompanyRespItemIndex.cshtml";
        public static string ActivityPrice = "~/Views/Sales/01_SalesDataLibrary/ActivityPrice/ActivityPriceIndex.cshtml";
        public static string SalesPaymentTerms = "~/Views/Sales/01_SalesDataLibrary/SalesPaymentTerms/SalesPaymentTermsIndex.cshtml";

        //02_ProductionAndBilling
        public static string SalesManBonus = "~/Views/Sales/02_ProductionAndBilling/SalesManBonus/SalesManBonusIndex.cshtml";
        public static string IssueProduction = "~/Views/Sales/02_ProductionAndBilling/IssueProduction/IssueProductionIndex.cshtml";
        public static string CustomerBilling = "~/Views/Sales/02_ProductionAndBilling/CustomerBilling/CustomerBillingIndex.cshtml";
        public static string CustomerDbCr = "~/Views/Sales/02_ProductionAndBilling/CustomerDbCr/CustomerDbCrIndex.cshtml";
 
        public static string StartOfWork = "~/Views/Sales/03_SalesOperations/StartOfWork/StartOfWorkIndex.cshtml";
        public static string OfferSpecification = "~/Views/Sales/03_SalesOperations/OfferSpecification/OfferSpecificationIndex.cshtml";
        public static string OfferDefinition = "~/Views/Sales/03_SalesOperations/OfferDefinition/OfferDefinitionIndex.cshtml";
        public static string OfferCostEstimation = "~/Views/Sales/03_SalesOperations/OfferCostEstimation/OfferCostEstimationIndex.cshtml";
        public static string OfferBillingSchedule = "~/Views/Sales/03_SalesOperations/OfferBillingSchedule/OfferBillingScheduleIndex.cshtml";
        //04_Reports
        public static string SalesmanActivity = "~/Views/Sales/04_Reports/SalesmanActivity/SalesmanActivityIndex.cshtml";
        public static string ProductionVsBilling = "~/Views/Sales/04_Reports/ProductionVsBilling/ProductionVsBillingIndex.cshtml";
        public static string ContractList = "~/Views/Sales/04_Reports/ContractList/ContractListIndex.cshtml";
        public static string OfferList = "~/Views/Sales/04_Reports/OfferList/OfferListIndex.cshtml";
        public static string ProjItemsInventory = "~/Views/Sales/04_Reports/ProjectItemsInventory/ProjectItemsInventory.cshtml";
        public static string BillingList = "~/Views/Sales/04_Reports/BillingList/BillingList.cshtml";
        public static string CRMReport = "~/Views/Sales/04_Reports/CRMReport/CRMReport.cshtml";
        public static string TaxInvoicelist = "~/Views/Sales/04_Reports/TaxInvoicelist/TaxInvoicelist.cshtml";
 
        

        #endregion

        #region Enineer
        //01_Project                            
        public static string ProjectDefination = "~/Views/Engineer/01_Projects/ProjectDefination/ProjectDefinationIndex.cshtml";
        public static string ProjectSpecification = "~/Views/Engineer/01_Projects/ProjectSpecification/ProjectSpecificationIndex.cshtml";
        public static string ProjectMasterPlan = "~/Views/Engineer/01_Projects/ProjectMasterPlan/ProjectMasterPlanIndex.cshtml";
        public static string ProjectChange = "~/Views/Engineer/01_Projects/ProjectChange/ProjectChangeIndex.cshtml";
        public static string WorkActivities = "~/Views/Engineer/01_Projects/WorkActivities/WorkActivitiesIndex.cshtml";
        public static string Projectvaliation = "~/Views/Engineer/01_Projects/Projectvaliation/ProjectvaliationIndex.cshtml";
        //02_Operations
        public static string WorkSchedule = "~/Views/Engineer/02_Operations/WorkSchedule/WorkScheduleIndex.cshtml";
        public static string OpProductionEntry = "~/Views/Engineer/02_Operations/OpProductionEntry/OpProductionEntryIndex.cshtml";
        public static string OpProjectExpenses = "~/Views/Engineer/02_Operations/OpProjectExpenses/OpProjectExpensesIndex.cshtml";
        //03_SubContractor
        public static string Prequalification = "~/Views/Engineer/03_SubContractor/Prequalification/PrequalificationIndex.cshtml";
        public static string Definition = "~/Views/Engineer/03_SubContractor/Definition/DefinitionIndex.cshtml";
        public static string SubContContract = "~/Views/Engineer/03_SubContractor/SubContContract/SubContContractIndex.cshtml";
        public static string ServiceOrder = "~/Views/Engineer/03_SubContractor/ServiceOrder/ServiceOrderIndex.cshtml";
        public static string ProductionEntry = "~/Views/Engineer/03_SubContractor/ProductionEntry/ProductionEntryIndex.cshtml";
        //04_SubContractor popup Reports 
        public static string SubContractorListing = "~/Views/Engineer/04_SubContractorReports/SubContractorListing/SubContractorListingIndex.cshtml";
        public static string SubContrActivity = "~/Views/Engineer/04_SubContractorReports/SubContractorActivity/SubContractorActivityIndex.cshtml";
        public static string Production = "~/Views/Engineer/04_SubContractorReports/Production/ProductionIndex.cshtml";
        public static string Evaluation = "~/Views/Engineer/04_SubContractorReports/Evaluation/EvaluationIndex.cshtml";
        //06_Budget
        public static string PeriodBudget = "~/Views/Engineer/06_Budget/PeriodBudget/PeriodBudgetIndex.cshtml";
        public static string Prepare = "~/Views/Engineer/06_Budget/Prepare/PrepareIndex.cshtml";
        //public static string BudgetRequirements = "~/Views/Engineer/06_Budget/BudgetRequirements/BudgetRequirements.cshtml";

        //05_Reports popup 
        public static string LaborScheduleUtz = "~/Views/Engineer/05_Reports/LaborScheduleUtz/LaborScheduleUtzIndex.cshtml";
        public static string ProjectExpensesRep = "~/Views/Engineer/05_Reports/ProjectExpenses/ProjectExpensesIndex.cshtml";
        public static string ProjectProgress = "~/Views/Engineer/05_Reports/ProjectProgress/ProjectProgressIndex.cshtml";
        public static string ProjectSchedule = "~/Views/Engineer/05_Reports/ProjectSchedule/ProjectScheduleIndex.cshtml";



        public static string ProjectStatus = "~/Views/Engineer/05_Reports/ProjectStatus/ProjectStatusIndex.cshtml";
        public static string BudgetRequirements = "~/Views/GeneralReports/Engineer/BudgetRequirements/BudgetRequirements.cshtml";
        public static string MonthBudgetByEng = "~/Views/GeneralReports/Engineer/MonthBudgetByEng/MonthBudgetByEng.cshtml";
        public static string MonthBudgetForBranch = "~/Views/GeneralReports/Engineer/MonthBudgetForBranch/MonthBudgetForBranch.cshtml";
        public static string Prodvsprogress = "~/Views/Engineer/05_Reports/Prodvsprogress/ProdvsprogressIndex.cshtml";
       

        public static string ImagePopup = "~/Views/Partial/ImagePopup.cshtml";





        #endregion

        #region Resource Management
        public static string BillOfMaterial = "~/Views/ResourceManagement/01_Material/BillOfMaterial/BillOfMaterialIndex.cshtml";
        public static string MaterialMonitoring = "~/Views/ResourceManagement/01_Material/MaterialMonitoring/MaterialMonitoringIndex.cshtml";
        public static string MaterialRequest = "~/Views/ResourceManagement/01_Material/MaterialRequest/MaterialRequestIndex.cshtml";
        public static string MaterialIssuance = "~/Views/ResourceManagement/01_Material/MaterialIssuance/MaterialIssuanceIndex.cshtml";
        public static string MaterialReturn = "~/Views/ResourceManagement/01_Material/MaterialReturn/MaterialReturnIndex.cshtml";
        public static string MaterialList = "~/Views/ResourceManagement/01_Material/MaterialList/MaterialListIndex.cshtml";

        public static string EquipmentMonitoring = "~/Views/ResourceManagement/02_Equipment/EquipmentMonitoring/EquipmentMonitoringIndex.cshtml";
        public static string EquipmentRequest = "~/Views/ResourceManagement/02_Equipment/EquipmentRequest/EquipmentRequestIndex.cshtml";
        public static string EquipmentAssign = "~/Views/ResourceManagement/02_Equipment/EquipmentAssign/EquipmentAssignIndex.cshtml";

        public static string LaborMonitoring = "~/Views/ResourceManagement/03_Labor/LaborMonitoring/LaborMonitoringIndex.cshtml";
        public static string LaborRequest = "~/Views/ResourceManagement/03_Labor/LaborRequest/LaborRequestIndex.cshtml";
        public static string LaborAssign = "~/Views/ResourceManagement/03_Labor/LaborAssign/LaborAssignIndex.cshtml";
        public static string OverTimeSheet = "~/Views/ResourceManagement/03_Labor/OverTimeSheet/OverTimeSheetIndex.cshtml";
        public static string LateandAbsence = "~/Views/ResourceManagement/03_Labor/LateandAbsence/LateandAbsenceIndex.cshtml";
        #endregion

        #region RepGeneralReport
        public static string ProjectBandFollowUp = "~/Views/RepGeneralReport/01_Monitoring/ProjectBandFollowUp/ProjectBandFollowUpIndex.cshtml";
        public static string ProjectDistribution = "~/Views/RepGeneralReport/01_Monitoring/ProjectDistribution/ProjectDistributionIndex.cshtml";
        public static string ProjectFollowUp = "~/Views/RepGeneralReport/01_Monitoring/ProjectFollowUp/ProjectFollowUpIndex.cshtml";
        public static string ProjectPhaseDistribution = "~/Views/RepGeneralReport/01_Monitoring/ProjectPhaseDistribution/ProjectPhaseDistributionIndex.cshtml";
        public static string ProjectWorking = "~/Views/RepGeneralReport/01_Monitoring/ProjectWorking/ProjectWorkingIndex.cshtml";
        //02
        public static string RepLaborEvaluation   = "~/Views/RepGeneralReport/02_Evaluation/RepLaborEvaluationIndex.cshtml";
        public static string RepSiteEngineerBonus = "~/Views/RepGeneralReport/02_Evaluation/RepSiteEngineerBonusIndex.cshtml";
        public static string RepProjectEvaluation = "~/Views/RepGeneralReport/02_Evaluation/RepProjectEvaluationIndex.cshtml";
        //03
        public static string RepProjectCost = "~/Views/RepGeneralReport/03_Variance/RepProjectCostIndex.cshtml";
        public static string RepProjectCostVarian = "~/Views/RepGeneralReport/03_Variance/RepProjectCostVarianIndex.cshtml";
        public static string RepMaterialCoverage = "~/Views/RepGeneralReport/03_Variance/RepMaterialCoverageIndex.cshtml";
        public static string RepLaborCostVariance = "~/Views/RepGeneralReport/03_Variance/RepLaborCostVarianceIndex.cshtml";
        public static string RepEquipCostVariance = "~/Views/RepGeneralReport/03_Variance/RepEquipCostVarianceIndex.cshtml";
        #endregion



        #region DecisionSupport
        //01
        public static string DirectCostComparison = "~/Views/DecisionSupport/01_BranchComparison/DirectCostComparison.cshtml";
        public static string IncomeComparison = "~/Views/DecisionSupport/01_BranchComparison/IncomeComparison.cshtml";
        public static string ProductionComparison = "~/Views/DecisionSupport/01_BranchComparison/ProductionComparison.cshtml";
        public static string SalesComparison = "~/Views/DecisionSupport/01_BranchComparison/SalesComparison.cshtml";
        public static string MonthBudgetForComp = "~/Views/DecisionSupport/01_BranchComparison/MonthBudgetForComp.cshtml";
        public static string ProjectBillingSteaus = "~/Views/DecisionSupport/01_BranchComparison/ProjectBillingSteaus.cshtml";
        //02
        public static string ByBranch = "~/Views/DecisionSupport/02_EvaluationComparison/ByBranch.cshtml";
        public static string ByCustomerClass = "~/Views/DecisionSupport/02_EvaluationComparison/ByCustomerClass.cshtml";
        public static string ByItem = "~/Views/DecisionSupport/02_EvaluationComparison/ByItem.cshtml";
        public static string ByProject = "~/Views/DecisionSupport/02_EvaluationComparison/ByProject.cshtml";
        public static string ByScopeCategory = "~/Views/DecisionSupport/02_EvaluationComparison/ByScopeCategory.cshtml";
        public static string EC_ByScope = "~/Views/DecisionSupport/02_EvaluationComparison/EC_ByScope.cshtml";
        //03
        public static string Activity = "~/Views/DecisionSupport/03_CompanyCollectiveWork/Activity.cshtml";
        public static string NormsVariationReport = "~/Views/DecisionSupport/03_CompanyCollectiveWork/NormsVariationReport.cshtml";
        public static string CC_ByScope = "~/Views/DecisionSupport/03_CompanyCollectiveWork/CC_ByScope.cshtml";
        public static string C_ByScopeCategory = "~/Views/DecisionSupport/03_CompanyCollectiveWork/C_ScopeCategory.cshtml";
        public static string SubContractorWork = "~/Views/DecisionSupport/03_CompanyCollectiveWork/SubContractorWork.cshtml";
        #endregion
        public static string LaborSchedule = "~/Views/GeneralReports/ResourceManagement/LaborSchedule/LaborSchedule.cshtml";

        public static string AttendanceSheet = "~/Views/GeneralReports/ResourceManagement/AttendanceSheet/AttendanceSheet.cshtml";
        public static string Equipmentmovement = "~/Views/GeneralReports/ResourceManagement/Equipmentmovement/Equipmentmovement.cshtml";
        public static string Equipmentutilization = "~/Views/GeneralReports/ResourceManagement/Equipmentutilization/Equipmentutilization.cshtml";
        public static string LaborMovement = "~/Views/GeneralReports/ResourceManagement/LaborMovement/LaborMovement.cshtml";
        public static string Laborutilization = "~/Views/GeneralReports/ResourceManagement/Laborutilization/Laborutilization.cshtml";

        public static string LaborWork = "~/Views/GeneralReports/ResourceManagement/LaborWork/LaborWork.cshtml";
        public static string MaterialUsage = "~/Views/GeneralReports/ResourceManagement/MaterialUsage/MaterialUsage.cshtml";
        public static string MaterialUsageSummary = "~/Views/GeneralReports/ResourceManagement/MaterialUsage/MaterialUsageSummary.cshtml";
        public static string MaterialUsageproject = "~/Views/GeneralReports/ResourceManagement/MaterialUsage/MaterialUsageproject.cshtml";
        public static string ProjectRequirements = "~/Views/GeneralReports/ResourceManagement/ProjectRequirements/ProjectRequirements.cshtml";
        public static string UnprodHour = "~/Views/GeneralReports/ResourceManagement/UnprodHour/UnprodHour.cshtml";

    }
}