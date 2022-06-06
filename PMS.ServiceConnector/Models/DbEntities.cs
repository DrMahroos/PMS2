using PMS.ApiService.Models;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Models.Entities.Definitions;
using PMS.ServiceConnector.Models.Entities.Engineer;
using PMS.ServiceConnector.Models.Entities.Sales;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models
{
    public class DbEntities
    {
        public static string ServiceUrl = "";
        //General Class 
        public DataContext<A_ACCOUNT> A_ACCOUNT
        {
            get { return new DataContext<Models.A_ACCOUNT>(ServiceUrl); }
        }
        public DataContext<G_SearchFormModule> G_SearchFormModule
        {
            get
            {
                return new DataContext<G_SearchFormModule>(ServiceUrl);
            }
        }
        public DataContext<G_SearchForm> G_SearchForm
        {
            get
            {
                return new DataContext<G_SearchForm>(ServiceUrl);
            }
        }
        public DataContext<G_MODULES> G_MODULES
        {
            get
            {
                return new DataContext<G_MODULES>(ServiceUrl);
            }
        }
        public DataContext<G_SearchFormSetting> G_SearchFormSetting
        {
            get
            {
                return new DataContext<G_SearchFormSetting>(ServiceUrl);
            }
        }
        public DataContext<G_USER_BRANCH> G_USER_BRANCH
        {
            get
            {
                return new DataContext<G_USER_BRANCH>(ServiceUrl);
            }
        }
        public DataContext<G_USERS> G_USERS
        {
            get
            {
                return new DataContext<G_USERS>(ServiceUrl);
            }
        }
        public DataContext<G_USER_FAVORITE> G_USER_FAVORITE
        {
            get
            {
                return new DataContext<G_USER_FAVORITE>(ServiceUrl);
            }
        }
        public DataContext<G_USER_MODULE> G_USER_MODULE
        {
            get
            {
                return new DataContext<G_USER_MODULE>(ServiceUrl);
            }
        }
        public DataContext<G_BRANCH> G_BRANCH
        {
            get
            {
                return new DataContext<G_BRANCH>(ServiceUrl);
            }
        }
        public DataContext<G_Nationality> G_Nationality
        {
            get
            {
                return new DataContext<G_Nationality>(ServiceUrl);
            }
        }
        public DataContext<P_Control> P_Control
        {
            get
            {
                return new DataContext<P_Control>(ServiceUrl);
            }
        }
        public DataContext<GQ_GetUserModule> GQ_GetUserModule
        {
            get
            {
                return new DataContext<GQ_GetUserModule>(ServiceUrl);
            }
        }
        public DataContext<GQ_UserFavorite> GQ_UserFavorite
        {
            get
            {
                return new DataContext<GQ_UserFavorite>(ServiceUrl);
            }
        }
        public DataContext<G_ModuleHelp> G_ModuleHelp
        {
            get
            {
                return new DataContext<G_ModuleHelp>(ServiceUrl);
            }
        }
        //End General Class

        //strat PMS
        public DataContext<P_D_Activity> P_D_Activity
        {
            get
            {
                return new DataContext<P_D_Activity>(ServiceUrl);
            }
        }
        public DataContext<P_D_ActivityEquipClass> P_D_ActivityEquipClass
        {
            get
            {
                return new DataContext<P_D_ActivityEquipClass>(ServiceUrl);
            }
        }
        public DataContext<P_D_ActivityIMaterial> P_D_ActivityIMaterial
        {
            get
            {
                return new DataContext<P_D_ActivityIMaterial>(ServiceUrl);
            }
        }
        public DataContext<P_D_ActivityLaborClass> P_D_ActivityLaborClass
        {
            get
            {
                return new DataContext<P_D_ActivityLaborClass>(ServiceUrl);
            }
        }
        public DataContext<P_D_Calender> P_D_Calender
        {
            get
            {
                return new DataContext<P_D_Calender>(ServiceUrl);
            }
        }
        public DataContext<P_D_CalenderDays> P_D_CalenderDays
        {
            get
            {
                return new DataContext<P_D_CalenderDays>(ServiceUrl);
            }
        }
        public DataContext<P_D_Equipment> P_D_Equipment
        {
            get
            {
                return new DataContext<P_D_Equipment>(ServiceUrl);
            }
        }
        public DataContext<P_D_EquipmentClass> P_D_EquipmentClass
        {
            get
            {
                return new DataContext<P_D_EquipmentClass>(ServiceUrl);
            }
        }
        public DataContext<P_D_Expences> P_D_Expences
        {
            get
            {
                return new DataContext<P_D_Expences>(ServiceUrl);
            }
        }
        public DataContext<P_D_ExpencesCategory> P_D_ExpencesCategory
        {
            get
            {
                return new DataContext<P_D_ExpencesCategory>(ServiceUrl);
            }
        }
        public DataContext<P_D_Labor> P_D_Labor
        {
            get
            {
                return new DataContext<P_D_Labor>(ServiceUrl);
            }
        }
        public DataContext<P_D_LaborAbsenceType> P_D_LaborAbsenceType
        {
            get
            {
                return new DataContext<P_D_LaborAbsenceType>(ServiceUrl);
            }
        }
        public DataContext<P_D_LaborCategory> P_D_LaborCategory
        {
            get
            {
                return new DataContext<P_D_LaborCategory>(ServiceUrl);
            }
        }
        public DataContext<P_D_LaborClass> P_D_LaborClass
        {
            get
            {
                return new DataContext<P_D_LaborClass>(ServiceUrl);
            }
        }
        public DataContext<P_D_LaborClass> P_D_LaborLaborClass
        {
            get
            {
                return new DataContext<P_D_LaborClass>(ServiceUrl);
            }
        }
        public DataContext<P_D_LaborOverTimeType> P_D_LaborOverTimeType
        {
            get
            {
                return new DataContext<P_D_LaborOverTimeType>(ServiceUrl);
            }
        }
        public DataContext<P_D_Location> P_D_Location
        {
            get
            {
                return new DataContext<P_D_Location>(ServiceUrl);
            }
        }
        public DataContext<P_D_SalesEgineer> P_D_SalesEgineer
        {
            get
            {
                return new DataContext<P_D_SalesEgineer>(ServiceUrl);
            }
        }
        public DataContext<P_D_SalesEngCateory> P_D_SalesEngCateory
        {
            get
            {
                return new DataContext<P_D_SalesEngCateory>(ServiceUrl);
            }
        }
        public DataContext<P_D_Scope> P_D_Scope
        {
            get
            {
                return new DataContext<P_D_Scope>(ServiceUrl);
            }
        }
        public DataContext<P_D_ScopeCategory> P_D_ScopeCategory
        {
            get
            {
                return new DataContext<P_D_ScopeCategory>(ServiceUrl);
            }
        }
        public DataContext<P_D_SiteEngCategory> P_D_SiteEngCategory
        {
            get
            {
                return new DataContext<P_D_SiteEngCategory>(ServiceUrl);
            }
        }
        public DataContext<P_D_SiteEngineer> P_D_SiteEngineer
        {
            get
            {
                return new DataContext<P_D_SiteEngineer>(ServiceUrl);
            }
        }
        public DataContext<P_D_SubContractor> P_D_SubContractor
        {
            get
            {
                return new DataContext<P_D_SubContractor>(ServiceUrl);
            }
        }
        public DataContext<P_D_UnProdCategory> P_D_UnProdCategory
        {
            get
            {
                return new DataContext<P_D_UnProdCategory>(ServiceUrl);
            }
        }
        public DataContext<P_D_UnProdReason> P_D_UnProdReason
        {
            get
            {
                return new DataContext<P_D_UnProdReason>(ServiceUrl);
            }
        }
        public DataContext<P_D_UOM> P_D_UOM
        {
            get
            {
                return new DataContext<P_D_UOM>(ServiceUrl);
            }
        }
        public DataContext<P_G_Period> P_G_Period
        {
            get
            {
                return new DataContext<P_G_Period>(ServiceUrl);
            }
        }
        public DataContext<P_G_Region> P_G_Region
        {
            get
            {
                return new DataContext<P_G_Region>(ServiceUrl);
            }
        }
        public DataContext<P_G_WorkStatus> P_G_WorkStatus
        {
            get
            {
                return new DataContext<P_G_WorkStatus>(ServiceUrl);
            }
        }
        public DataContext<GQ_GetUserBranch> GQ_GetUserBranch
        {
            get
            {
                return new DataContext<GQ_GetUserBranch>(ServiceUrl);
            }
        }
        public DataContext<I_Item> I_Item
        {
            get
            {
                return new DataContext<I_Item>(ServiceUrl);
            }
        }

        //sales
        public DataContext<P_D_SalesCustomerCategory> P_D_SalesCustomerCategory
        {
            get
            {
                return new DataContext<P_D_SalesCustomerCategory>(ServiceUrl);
            }
        }
        public DataContext<P_D_SalesResponsibility> P_D_SalesResponsibility
        {
            get
            {
                return new DataContext<P_D_SalesResponsibility>(ServiceUrl);
            }
        }
        public DataContext<P_D_SalesPaymentTerms> P_D_SalesPaymentTerms
        {
            get
            {
                return new DataContext<P_D_SalesPaymentTerms>(ServiceUrl);
            }
        }

        public DataContext<P_D_SalesItems> P_D_SalesItems
        {
            get
            {
                return new DataContext<P_D_SalesItems>(ServiceUrl);
            }
        }
        
        public DataContext<PQ_GETSalesItemActivity> PQ_GETSalesItemActivity
        {
            get
            {
                return new DataContext<PQ_GETSalesItemActivity>(ServiceUrl);
            }
        }

        public DataContext<PQ_GetSalesCustomerDoc> PQ_GetSalesCustomerDoc
        {
            get
            {
                return new DataContext<PQ_GetSalesCustomerDoc>(ServiceUrl);
            }
        }
        public DataContext<P_D_Status> P_D_Status
        {
            get
            {
                return new DataContext<P_D_Status>(ServiceUrl);
            }
        }
        
        public DataContext<P_D_SalesItemsActivity> P_D_SalesItemsActivity
        {
            get
            {
                return new DataContext<P_D_SalesItemsActivity>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetSalesItem> PQ_GetSalesItem
        {
            get
            {
                return new DataContext<PQ_GetSalesItem>(ServiceUrl);
            }
        }

        public DataContext<P_Tr_SalesActivtyPrice> P_Tr_SalesActivtyPrice
        {
            get
            {
                return new DataContext<P_Tr_SalesActivtyPrice>(ServiceUrl);
            }
        }

        public DataContext<PQ_GetSalesActivityPrice> PQ_GetSalesActivityPrice
        {
            get
            {
                return new DataContext<PQ_GetSalesActivityPrice>(ServiceUrl);
            }
        }

        public DataContext<PQ_GetSalesActivityPriceDetails> PQ_GetSalesActivityPriceDetails
        {
            get
            {
                return new DataContext<PQ_GetSalesActivityPriceDetails>(ServiceUrl);
            }
        }

        public DataContext<P_TR_SalesProduction> P_TR_SalesProduction
        {
            get
            {
                return new DataContext<P_TR_SalesProduction>(ServiceUrl);
            }
        }

        public DataContext<P_TR_EngProjectItem> P_TR_EngProjectItem
        {
            get
            {
                return new DataContext<P_TR_EngProjectItem>(ServiceUrl);
            }
        }

        public DataContext<P_TR_EngProjectActivity> P_TR_EngProjectActivity
        {
            get
            {
                return new DataContext<P_TR_EngProjectActivity>(ServiceUrl);
            }
        }
        

        public DataContext<P_Tr_SalesBonus> P_Tr_SalesBonus
        {
            get
            {
                return new DataContext<P_Tr_SalesBonus>(ServiceUrl);
            }
        }

        public DataContext<PQ_GetSalesManBonus> PQ_GetSalesManBonus
        {
            get
            {
                return new DataContext<PQ_GetSalesManBonus>(ServiceUrl);
            }
        }

        public DataContext<P_Tr_SalesOfferStageItem> P_Tr_SalesOfferStageItem
        {
            get
            {
                return new DataContext<P_Tr_SalesOfferStageItem>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetSlsCustomer> PQ_GetSlsCustomer
        {
            get
            {
                return new DataContext<PQ_GetSlsCustomer>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetSlsOfferBilling> PQ_GetSlsOfferBilling
        {
            get
            {
                return new DataContext<PQ_GetSlsOfferBilling>(ServiceUrl);
            }
        }

        public DataContext<P_TR_SalesOffer> P_TR_SalesOffer
        {
            get
            {
                return new DataContext<P_TR_SalesOffer>(ServiceUrl);
            }
        }

        public DataContext<P_Tr_SalesOfferPayment> P_Tr_SalesOfferPayment
        {
            get
            {
                return new DataContext<P_Tr_SalesOfferPayment>(ServiceUrl);
            }
        }
        public DataContext<P_Tr_SalesOfferStage> P_Tr_SalesOfferStage
        {
            get
            {
                return new DataContext<P_Tr_SalesOfferStage>(ServiceUrl);
            }
        }
        public DataContext<P_TR_SalesInvoice> P_TR_SalesInvoice
        {
            get
            {
                return new DataContext<P_TR_SalesInvoice>(ServiceUrl);
            }
        }
        public DataContext<P_TR_SalesInvoiceDetail> P_TR_SalesInvoiceDetail
        {
            get
            {
                return new DataContext<P_TR_SalesInvoiceDetail>(ServiceUrl);
            }
        }
        public DataContext<P_TR_SalesInvoiceProd> P_TR_SalesInvoiceProd
        {
            get
            {
                return new DataContext<P_TR_SalesInvoiceProd>(ServiceUrl);
            }
        }
        public DataContext<I_Pay_Vendor> I_Pay_Vendor
        {
            get
            {
                return new DataContext<I_Pay_Vendor>(ServiceUrl);
            }
        }
        public DataContext<P_D_SalesCustomer> P_D_SalesCustomer
        {
            get
            {
                return new DataContext<P_D_SalesCustomer>(ServiceUrl);
            }
        }
        public DataContext<P_TR_EngProject> P_TR_EngProject
        {
            get
            {
                return new DataContext<P_TR_EngProject>(ServiceUrl);
            }
        }
        //End PMS
        public DataContext<IQ_SrchItem> IQ_SrchItem
        {
            get
            {
                return new DataContext<IQ_SrchItem>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetActivityEquipmentClass> PQ_GetActivityEquipmentClass
        {
            get
            {
                return new DataContext<PQ_GetActivityEquipmentClass>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetActivityLaborClass> PQ_GetActivityLaborClass
        {
            get
            {
                return new DataContext<PQ_GetActivityLaborClass>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetActivityMaterialClass> PQ_GetActivityMaterialClass
        {
            get
            {
                return new DataContext<PQ_GetActivityMaterialClass>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetSalesOffer> PQ_GetSalesOffer
        {
            get
            {
                return new DataContext<PQ_GetSalesOffer>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetSlsOfferStage> PQ_GetSlsOfferStage
        {
            get
            {
                return new DataContext<PQ_GetSlsOfferStage>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetSlsOfferResponsibility> PQ_GetSlsOfferResponsibility
        {
            get
            {
                return new DataContext<PQ_GetSlsOfferResponsibility>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetSlsOfferPayment> PQ_GetSlsOfferPayment
        {
            get
            {
                return new DataContext<PQ_GetSlsOfferPayment>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetSlsOfferStageItem> PQ_GetSlsOfferStageItem
        {
            get
            {
                return new DataContext<PQ_GetSlsOfferStageItem>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetSlsOfferActivity> PQ_GetSlsOfferActivity
        {
            get
            {
                return new DataContext<PQ_GetSlsOfferActivity>(ServiceUrl);
            }
        }
        public DataContext<P_D_SubCandidate> P_D_SubCandidate
        {
            get
            {
                return new DataContext<P_D_SubCandidate>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngSubCandidateScope> PQ_GetEngSubCandidateScope
        {
            get
            {
                return new DataContext<PQ_GetEngSubCandidateScope>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngSubContractorScope> PQ_GetEngSubContractorScope
        {
            get
            {
                return new DataContext<PQ_GetEngSubContractorScope>(ServiceUrl);
            }
        }
        public DataContext<P_TR_EngProjectPhase> P_TR_EngProjectPhase
        {
            get
            {
                return new DataContext<P_TR_EngProjectPhase>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngExpenses> PQ_GetEngExpenses
        {
            get
            {
                return new DataContext<PQ_GetEngExpenses>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngExpensesDetail> PQ_GetEngExpensesDetail
        {
            get
            {
                return new DataContext<PQ_GetEngExpensesDetail>(ServiceUrl);
            }
        }
        public DataContext<P_TR_EngExpensesEntry> P_TR_EngExpensesEntry
        {
            get
            {
                return new DataContext<P_TR_EngExpensesEntry>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngWorkSchdule> PQ_GetEngWorkSchdule
        {
            get
            {
                return new DataContext<PQ_GetEngWorkSchdule>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngWorkSchduleActivity> PQ_GetEngWorkSchduleActivity
        {
            get
            {
                return new DataContext<PQ_GetEngWorkSchduleActivity>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngWorkSchduleEquip> PQ_GetEngWorkSchduleEquip
        {
            get
            {
                return new DataContext<PQ_GetEngWorkSchduleEquip>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngWorkSchduleEquipClass> PQ_GetEngWorkSchduleEquipClass
        {
            get
            {
                return new DataContext<PQ_GetEngWorkSchduleEquipClass>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngWorkSchduleLabor> PQ_GetEngWorkSchduleLabor
        {
            get
            {
                return new DataContext<PQ_GetEngWorkSchduleLabor>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngWorkSchduleLaborClass> PQ_GetEngWorkSchduleLaborClass
        {
            get
            {
                return new DataContext<PQ_GetEngWorkSchduleLaborClass>(ServiceUrl);
            }
        }
        public DataContext<PQ_SrchEngProjectActivity> PQ_SrchEngProjectActivity
        {
            get
            {
                return new DataContext<PQ_SrchEngProjectActivity>(ServiceUrl);
            }
        }
        public DataContext<P_TR_EngSchedule> P_TR_EngSchedule
        {
            get
            {
                return new DataContext<P_TR_EngSchedule>(ServiceUrl);
            }
        }
        public DataContext<P_Tr_EngProduction> P_Tr_EngProduction
        {
            get
            {
                return new DataContext<P_Tr_EngProduction>(ServiceUrl);
            }
        }
        public DataContext<P_TR_EngProductionActiv> P_TR_EngProductionActiv
        {
            get
            {
                return new DataContext<P_TR_EngProductionActiv>(ServiceUrl);
            }
        }
        public DataContext<P_TR_EngVariation> P_TR_EngVariation
        {
            get
            {
                return new DataContext<P_TR_EngVariation>(ServiceUrl);
            }
        }
        public DataContext<P_TR_EngProductionEquip> P_TR_EngProductionEquip
        {
            get
            {
                return new DataContext<P_TR_EngProductionEquip>(ServiceUrl);
            }
        }
        public DataContext<P_TR_EngProductionLabour> P_TR_EngProductionLabour
        {
            get
            {
                return new DataContext<P_TR_EngProductionLabour>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngProduction> PQ_GetEngProduction
        {
            get
            {
                return new DataContext<PQ_GetEngProduction>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngproductionActivity> PQ_GetEngproductionActivity
        {
            get
            {
                return new DataContext<PQ_GetEngproductionActivity>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngProductionEquipment> PQ_GetEngProductionEquipment
        {
            get
            {
                return new DataContext<PQ_GetEngProductionEquipment>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngProductionLabour> PQ_GetEngProductionLabour
        {
            get
            {
                return new DataContext<PQ_GetEngProductionLabour>(ServiceUrl);
            }
        }
        public DataContext<P_Tr_SalesOfferStageItemActivity> P_Tr_SalesOfferStageItemActivity
        {
            get
            {
                return new DataContext<P_Tr_SalesOfferStageItemActivity>(ServiceUrl);
            }
        }

        public DataContext<PQ_GetEngWorkSchduleMaterial> PQ_GetEngWorkSchduleMaterial
        {
            get
            {
                return new DataContext<PQ_GetEngWorkSchduleMaterial>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngSubContract> PQ_GetEngSubContract
        {
            get
            {
                return new DataContext<PQ_GetEngSubContract>(ServiceUrl);
            }
        }

        public DataContext<PQ_GetEngSubContractActivity> PQ_GetEngSubContractActivity
        {
            get
            {
                return new DataContext<PQ_GetEngSubContractActivity>(ServiceUrl);
            }
        }
        public DataContext<PQ_SrchEngProjectPhase> PQ_SrchEngProjectPhase
        {
            get
            {
                return new DataContext<PQ_SrchEngProjectPhase>(ServiceUrl);
            }
        }
        public DataContext<P_TR_SubContract> P_TR_SubContract
        {
            get
            {
                return new DataContext<P_TR_SubContract>(ServiceUrl);
            }
        }
        public DataContext<PQ_SrchActivity> PQ_SrchActivity
        {
            get
            {
                return new DataContext<PQ_SrchActivity>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngSubServiceOrder> PQ_GetEngSubServiceOrder
        {
            get
            {
                return new DataContext<PQ_GetEngSubServiceOrder>(ServiceUrl);
            }
        }
        public DataContext<P_TR_SubServiceOrder> P_TR_SubServiceOrder
        {
            get
            {
                return new DataContext<P_TR_SubServiceOrder>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngProjectPhase> PQ_GetEngProjectPhase
        {
            get
            {
                return new DataContext<PQ_GetEngProjectPhase>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngServiceOrderActivity> PQ_GetEngServiceOrderActivity
        {
            get
            {
                return new DataContext<PQ_GetEngServiceOrderActivity>(ServiceUrl);
            }
        }
        public DataContext<PQ_LoadEngSubSOContractActivity> PQ_LoadEngSubSOContractActivity
        {
            get
            {
                return new DataContext<PQ_LoadEngSubSOContractActivity>(ServiceUrl);
            }
        }
        public DataContext<P_TR_SubProduction> P_TR_SubProduction
        {
            get
            {
                return new DataContext<P_TR_SubProduction>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngSubProductionActivity> PQ_GetEngSubProductionActivity
        {
            get
            {
                return new DataContext<PQ_GetEngSubProductionActivity>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngSubProduction> PQ_GetEngSubProduction
        {
            get
            {
                return new DataContext<PQ_GetEngSubProduction>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngVariation> PQ_GetEngVariation
        {
            get
            {
                return new DataContext<PQ_GetEngVariation>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngVariationItem> PQ_GetEngVariationItem
        {
            get
            {
                return new DataContext<PQ_GetEngVariationItem>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngVariationActivity> PQ_GetEngVariationActivity
        {
            get
            {
                return new DataContext<PQ_GetEngVariationActivity>(ServiceUrl);
            }
        }
        
        // Begin Resourse Managment
        public DataContext<PProc_EngMonitorScheduleLabour_Result> PProc_EngMonitorScheduleLabour_Result
        {
            get
            {
                return new DataContext<PProc_EngMonitorScheduleLabour_Result>(ServiceUrl);
            }
        }
        public DataContext<PProc_EngMonitorScheduleLabourClass_Result> PProc_EngMonitorScheduleLabourClass_Result
        {
            get
            {
                return new DataContext<PProc_EngMonitorScheduleLabourClass_Result>(ServiceUrl);
            }
        }
        public DataContext<PProc_EngVariationLoadItem_Result> PProc_EngVariationLoadItem_Result
        {
            get
            {
                return new DataContext<PProc_EngVariationLoadItem_Result>(ServiceUrl);
            }
        }
        public DataContext<I_D_Category> I_D_Category
        {
            get
            {
                return new DataContext<I_D_Category>(ServiceUrl);
            }
        }
        public DataContext<I_D_UOM> I_D_UOM
        {
            get
            {
                return new DataContext<I_D_UOM>(ServiceUrl);
            }
        }
        public DataContext<IQ_GetItemList> IQ_GetItemList
        {
            get
            {
                return new DataContext<IQ_GetItemList>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngProjectItem> PQ_GetEngProjectItem { get { return new DataContext<PQ_GetEngProjectItem>(ServiceUrl); } }
        public DataContext<PQ_GetEngProject> PQ_GetEngProject { get { return new DataContext<PQ_GetEngProject>(ServiceUrl); } }

        public DataContext<P_TR_ResOverTime> P_TR_ResOverTime
        {
            get
            {
                return new DataContext<P_TR_ResOverTime>(ServiceUrl);
            }
        }
        
        public DataContext<PQ_GetResLabourOverTime> PQ_GetResLabourOverTime
        {
            get
            {
                return new DataContext<PQ_GetResLabourOverTime>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetResLabourOverTimeDetail> PQ_GetResLabourOverTimeDetail
        {
            get
            {
                return new DataContext<PQ_GetResLabourOverTimeDetail>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetEngProjectActivity> PQ_GetEngProjectActivity
        {
            get
            {
                return new DataContext<PQ_GetEngProjectActivity>(ServiceUrl);
            }
        }
        
        public DataContext<PQ_GetSalesIssueProduction> PQ_GetSalesIssueProduction
        {
            get
            {
                return new DataContext<PQ_GetSalesIssueProduction>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetSalesIssueProductionDetails> PQ_GetSalesIssueProductionDetails
        {
            get
            {
                return new DataContext<PQ_GetSalesIssueProductionDetails>(ServiceUrl);
            }
        }
        public DataContext<P_TR_ResOverTimeLabour> P_TR_ResOverTimeLabour
        {
            get
            {
                return new DataContext<P_TR_ResOverTimeLabour>(ServiceUrl);
            }
        }
        public DataContext<G_COST_CENTER> G_COST_CENTER
        {
            get
            {
                return new DataContext<G_COST_CENTER>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetSalesInvoice> PQ_GetSalesInvoice
        {
            get
            {
                return new DataContext<PQ_GetSalesInvoice>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetSalesDbCr> PQ_GetSalesDbCr
        {
            get
            {
                return new DataContext<PQ_GetSalesDbCr>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetSalesInvoiceDetail> PQ_GetSalesInvoiceDetail
        {
            get
            {
                return new DataContext<PQ_GetSalesInvoiceDetail>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetSalesDbCrDetail> PQ_GetSalesDbCrDetail
        {
            get
            {
                return new DataContext<PQ_GetSalesDbCrDetail>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetSalesInvoiceProd> PQ_GetSalesInvoiceProd
        {
            get
            {
                return new DataContext<PQ_GetSalesInvoiceProd>(ServiceUrl);
            }
        }
        public DataContext<PQ_SalesInvoiceDetail> PQ_SalesInvoiceDetail
        {
            get
            {
                return new DataContext<PQ_SalesInvoiceDetail>(ServiceUrl);
            }
        }


        public DataContext<P_TR_ResAbsence> P_TR_ResAbsence
        {
            get
            {
                return new DataContext<P_TR_ResAbsence>(ServiceUrl);
            }
        }

        public DataContext<P_TR_ResAbsenceLabour> P_TR_ResAbsenceLabour
        {
            get
            {
                return new DataContext<P_TR_ResAbsenceLabour>(ServiceUrl);
            }
        }

        public DataContext<PQ_GetResLabourAbsence> PQ_GetResLabourAbsence
        {
            get
            {
                return new DataContext<PQ_GetResLabourAbsence>(ServiceUrl);
            }
        }

        public DataContext<PQ_GetResLabourAbsenceDetail> PQ_GetResLabourAbsenceDetail
        {
            get
            {
                return new DataContext<PQ_GetResLabourAbsenceDetail>(ServiceUrl);
            }
        }
        public DataContext<PQ_SrcSchdule> PQ_SrcSchdule
        {
            get
            {
                return new DataContext<PQ_SrcSchdule>(ServiceUrl);
            }
        }
        public DataContext<PQ_Sales_SrchOfferItem> PQ_Sales_SrchOfferItem
        {
            get
            {
                return new DataContext<PQ_Sales_SrchOfferItem>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetResReqLabour> PQ_GetResReqLabour
        {
            get
            {
                return new DataContext<PQ_GetResReqLabour>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetResRequestLabours> PQ_GetResRequestLabours
        {
            get
            {
                return new DataContext<PQ_GetResRequestLabours>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetResRequestLaborDetails> PQ_GetResRequestLaborDetails
        {
            get
            {
                return new DataContext<PQ_GetResRequestLaborDetails>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetResLabourAssign> PQ_GetResLabourAssign
        {
            get
            {
                return new DataContext<PQ_GetResLabourAssign>(ServiceUrl);
            }
        }
        public DataContext<P_TR_ResRequestEquipment> P_TR_ResRequestEquipment
        {
            get
            {
                return new DataContext<P_TR_ResRequestEquipment>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetResRequestEquipment> PQ_GetResRequestEquipment
        {
            get
            {
                return new DataContext<PQ_GetResRequestEquipment>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetResEquipAssign> PQ_GetResEquipAssign
        {
            get
            {
                return new DataContext<PQ_GetResEquipAssign>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetResRequestMaterial> PQ_GetResRequestMaterial
        {
            get
            {
                return new DataContext<PQ_GetResRequestMaterial>(ServiceUrl);
            }
        }
        public DataContext<P_TR_ResRequestMaterial> P_TR_ResRequestMaterial
        {
            get
            {
                return new DataContext<P_TR_ResRequestMaterial>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetResRequestMaterialDetails> PQ_GetResRequestMaterialDetails
        {
            get
            {
                return new DataContext<PQ_GetResRequestMaterialDetails>(ServiceUrl);
            }
        }
        public DataContext<PQ_SearchSchduleMaterial> PQ_SearchSchduleMaterial
        {
            get
            {
                return new DataContext<PQ_SearchSchduleMaterial>(ServiceUrl);
            }
        }
        public DataContext<P_TR_ResMaterialIssue> P_TR_ResMaterialIssue
        {
            get
            {
                return new DataContext<P_TR_ResMaterialIssue>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetResMaterialIssue> PQ_GetResMaterialIssue
        {
            get
            {
                return new DataContext<PQ_GetResMaterialIssue>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetResMaterialIssueDetails> PQ_GetResMaterialIssueDetails
        {
            get
            {
                return new DataContext<PQ_GetResMaterialIssueDetails>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetResMaterialReturned> PQ_GetResMaterialReturned
        {
            get
            {
                return new DataContext<PQ_GetResMaterialReturned>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetResMaterialReturnedDetails> PQ_GetResMaterialReturnedDetails
        {
            get
            {
                return new DataContext<PQ_GetResMaterialReturnedDetails>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetResRequestMaterialMontoring> PQ_GetResRequestMaterialMontoring
        {
            get
            {
                return new DataContext<PQ_GetResRequestMaterialMontoring>(ServiceUrl);
            }
        }
        public DataContext<PQ_GetSalesFillInvoiceProd> PQ_GetSalesFillInvoiceProd
        {
            get
            {
                return new DataContext<PQ_GetSalesFillInvoiceProd>(ServiceUrl);
            }
        }
        public DataContext<GQ_GetUserSubsystem> GQ_GetUserSubsystem
        {
            get
            {
                return new DataContext<GQ_GetUserSubsystem>(ServiceUrl);
            }
        }
        public DataContext<P_TR_SalesDbCr> P_TR_SalesDbCr
        {
            get
            {
                return new DataContext<P_TR_SalesDbCr>(ServiceUrl);
            }
        }
        public DataContext<P_Tr_ResRequestLabour> P_Tr_ResRequestLabour { get { return new DataContext<P_Tr_ResRequestLabour>(ServiceUrl); } }
        public DataContext<P_G_Budget> P_G_Budget { get { return new DataContext<P_G_Budget>(ServiceUrl); } }
        // End Resourse Managment
    }
}
