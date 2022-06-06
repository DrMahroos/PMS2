using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Models.CustomEntities
{
    public class M_D_OfferSpecification
    {
        public P_TR_SalesOffer P_TR_SalesOffer { get; set; }
        public List<P_Tr_SalesOfferStageItem> P_Tr_SalesOfferStageItem { get; set; }
        public List<P_Tr_SalesOfferStageItemActivity> P_Tr_SalesOfferStageItemActivity { get; set; }
    }

    public class M_D_ItemPlan
    {
        public P_D_SalesItems P_D_SalesItems { get; set; }
        public List<P_D_SalesItemsActivity> P_D_SalesItemsActivity { get; set; }
    }
    public class P_G_PeriodMasterDetail
    {
        public P_G_Period P_G_PeriodMaster { get; set; }
        public List<P_G_Period> P_G_PeriodDetail { get; set; }
    }

    public class M_D_ResOverTime
    {
        public P_TR_ResOverTime P_TR_ResOverTime { get; set; }
        public List<P_TR_ResOverTimeLabour> P_TR_ResOverTimeLabour { get; set; }
    }
    public class M_D_Period
    {
        public P_G_Period Master { get; set; }
        public List<P_G_Period> Details { get; set; }
    }
    public class M_D_EngVariation
    {
        public P_TR_EngVariation P_TR_EngVariation { get; set; }
        public List<P_TR_EngVariationItem> P_TR_EngVariationItemDetail { get; set; }
        public List<P_TR_EngVariationActivity> P_TR_EngVariationActivityDetial { get; set; }
        public SessionRecord sessionRecord { get; set; }
    }

    public class PQ_GetEngProjectItem_View
    {
        public int ProjectPhaseId { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public string ProjectPhaseCode { get; set; }
        public string DescA { get; set; }
        public string DescL { get; set; }
        public Nullable<int> OfferID { get; set; }
        public Nullable<int> OfferTrSerial { get; set; }
        public string CC_CODE { get; set; }
        public Nullable<int> OfferTrNo { get; set; }
        public Nullable<int> SiteEngineerId { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public Nullable<bool> IsMaintenanceWork { get; set; }
        public Nullable<bool> IsBonusIncluded { get; set; }
        public Nullable<bool> ToBeInvoiced { get; set; }
        public Nullable<int> ScopeID { get; set; }
        public Nullable<int> CalenderId { get; set; }
        public Nullable<byte> Status { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> EstimatedMaterial { get; set; }
        public Nullable<decimal> EstimatedLabor { get; set; }
        public Nullable<decimal> EstimatedEquip { get; set; }
        public Nullable<decimal> EstimatedProfit { get; set; }
        public Nullable<decimal> EstimatedOH { get; set; }
        public Nullable<decimal> EstimatedPOH { get; set; }
        public string Cal_Calendercode { get; set; }
        public string Cal_DescA { get; set; }
        public string Cal_DescE { get; set; }
        public Nullable<decimal> Cal_DailyWorkHours { get; set; }
        public string Scop_ScopeCode { get; set; }
        public string Scop_DescA { get; set; }
        public string Scop_DescE { get; set; }
        public string Eng_EngCode { get; set; }
        public string Eng_DescA { get; set; }
        public string Eng_DescE { get; set; }
        public string Status_DesecA { get; set; }
        public string Status_DescE { get; set; }
        public string EngProj_ProjectCode { get; set; }
        public string EngProj_DescA { get; set; }
        public string EngProj_DescL { get; set; }
        public Nullable<int> EngProj_CustomerId { get; set; }
        public string Cust_DescA { get; set; }
        public string Cust_DescE { get; set; }
        public Nullable<int> Cust_CustomerCode { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public decimal Deuration { get; set; }
    }

    public class M_D_ProjectDefDetails
    {
        public P_TR_EngProject P_TR_EngProject { get; set; }
        public List<P_TR_EngProjectPhase> P_TR_EngProjectPhase { get; set; }
        public List<P_TR_EngProjectItem> P_TR_EngProjectItem { get; set; }
        public List<P_TR_EngProjectActivity> P_TR_EngProjectActivity { get; set; }
    }
    public class M_D_OfferDefDetailsView
    {
        public IEnumerable<PQ_GetSlsOfferStage> PQ_GetSlsOfferStage { get; set; }
        public IEnumerable<PQ_GetSlsOfferResponsibility> PQ_GetSlsOfferResponsibility { get; set; }
        public IEnumerable<PQ_GetSlsOfferResponsibility> PQ_GetSlsOfferResponsibility2 { get; set; }
        public IEnumerable<PQ_GetSlsOfferPayment> PQ_GetSlsOfferPayment { get; set; }
    }
    public class OfferDropdowenData
    {
        public List<P_D_Scope> P_D_Scope = new List<P_D_Scope>();
        public List<P_D_SalesResponsibility> P_D_SalesResponsibility = new List<P_D_SalesResponsibility>();
        public List<P_D_SalesPaymentTerms> P_D_SalesPaymentTerms = new List<P_D_SalesPaymentTerms>();
    }

    public class ImgPath
    {
        public int ID { get; set; }
        public string Name { get; set; }

        public string IncodeImg { get; set; }
    }

    public class M_D_OfferSpecificationView
    {
        public PQ_GetSalesOffer PQ_GetSalesOffer { get; set; }
        public IEnumerable<PQ_GetSlsOfferStageItem> PQ_GetSlsOfferStageItem { get; set; }
        public IEnumerable<PQ_GetSlsOfferActivity> PQ_GetSlsOfferActivity { get; set; }
    }
    public class ProjectDefinationTemp
    {
        public IEnumerable<P_D_SiteEngineer> P_D_SiteEngineer { get; set; }
        public IEnumerable<P_D_Scope> P_D_Scope { get; set; }
        public IEnumerable<P_D_Calender> P_D_Calender { get; set; }
    }
    public class M_D_ProjectDefDetailsView
    {
        public PQ_GetEngProject PQ_GetEngProject { get; set; }
        public List<PQ_GetEngProjectPhase> PQ_GetEngProjectPhase { get; set; }
        public List<PQ_GetEngProjectItem> PQ_GetEngProjectItem { get; set; }
    }
 public class MasterDetailsUsers
    {
        public SessionRecord sessionRecord { get; set; }
        public G_USERS G_USERS { get; set; }
        public List<G_USER_MODULE> G_USER_MODULE { get; set; }
        public List<G_USER_BRANCH> G_USER_BRANCH { get; set; }
        public List<G_USER_SUB_SYSTEM> G_USER_SUB_SYSTEM { get; set; }
    }
}