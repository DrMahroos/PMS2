using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.WebUI.Models.CustomModels
{
    //Sales
    public class PQ_SrchSlsItem
    {
        public int ItemID { get; set; }
        public string ItemCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public Nullable<decimal> MinUnitPrice { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<bool> IsDetail { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string uom_UomCode { get; set; }
        public string uom_DescA { get; set; }
        public string uom_DescE { get; set; }
        public Nullable<int> ScopeID { get; set; }
        public string TechDescA { get; set; }
        public string TechDescE { get; set; }
    }

    public partial class GetSystemsSubsByUserCode_Result
    {
        public string UserCode { get; set; }
        public string SYSTEM_CODE { get; set; }
        public string SYSTEM_DESCA { get; set; }
        public string SYSTEM_DESCE { get; set; }
        public string ICON_PATH { get; set; }
        public string SUB_SYSTEM_CODE { get; set; }
        public string SUB_SYSTEM_DESCA { get; set; }
        public string SUB_SYSTEM_DESCE { get; set; }
        public bool Access { get; set; }
    }
    public class M_D_OfferSpecification
    {
        public P_TR_SalesOffer P_TR_SalesOffer { get; set; }
        public List<P_Tr_SalesOfferStageItem> P_Tr_SalesOfferStageItem { get; set; }
        public List<P_Tr_SalesOfferStageItemActivity> P_Tr_SalesOfferStageItemActivity { get; set; }
    }

    public class M_D_OfferSpecificationView
    {
        public PQ_GetSalesOffer PQ_GetSalesOffer { get; set; }
        public IEnumerable<PQ_GetSlsOfferStageItem> PQ_GetSlsOfferStageItem { get; set; }
        public IEnumerable<PQ_GetSlsOfferActivity> PQ_GetSlsOfferActivity { get; set; }
    }

    public class M_D_ProductionEntry
    {
        public P_TR_SubProduction P_TR_SubProduction { get; set; }
        public List<P_TR_SubProductionActivity> P_TR_SubProductionActivity { get; set; }
    }
    
    public class M_D_EngProjectPhaseDetails
    {
        public P_TR_EngProject P_TR_EngProject { get; set; }
        public List<P_TR_EngProjectPhase> P_TR_EngProjectPhase { get; set; }
       
    }
    public class M_D_ProjectDefDetails
    {
        public P_TR_EngProject P_TR_EngProject { get; set; }
        public List<P_TR_EngProjectPhase> P_TR_EngProjectPhase { get; set; }
        public List<P_TR_EngProjectItem> P_TR_EngProjectItem { get; set; }
        public List<P_TR_EngProjectActivity> P_TR_EngProjectActivity { get; set; }
    }

    public class M_D_ProjectDefDetailsView
    {
        public PQ_GetEngProject PQ_GetEngProject { get; set; }
        public List<PQ_GetEngProjectPhase> PQ_GetEngProjectPhase { get; set; }
        public List<PQ_GetEngProjectItem> PQ_GetEngProjectItem { get; set; }
    }

    public class M_D_CustomerBilling
    {
        public P_TR_SalesInvoice P_TR_SalesInvoice { get; set; }
        public List<P_TR_SalesInvoiceDetail> P_TR_SalesInvoiceDetail { get; set; }
        //public List<P_TR_SalesInvoiceProd> P_TR_SalesInvoiceProd { get; set; }
        //public List<P_TR_SalesProduction> P_TR_SalesProduction { get; set; }
    }
    public class M_D_CustomerBillingMasterDetail
    {
        public PQ_GetSalesInvoice PQ_GetSalesInvoice { get; set; }
        public List<PQ_GetSalesInvoiceDetail> PQ_GetSalesInvoiceDetail { get; set; }
         


    }
    public class M_D_CustomerDbCr
    {
        public P_TR_SalesDbCr P_TR_SalesDbCr { get; set; }
        public List<P_TR_SalesDbCrDetail> P_TR_SalesDbCrDetail { get; set; }
       
    }
    public class M_D_IssueProduction
    {
        public P_TR_SalesProduction P_TR_SalesProduction { get; set; }
        public List<P_TR_SalesProductionDetail> P_TR_SalesProductionDetail { get; set; }
    }
    //Engineer
    public partial class PProc_EngVariationLoadItem_Result
    {
        public int ProjectPhaseItemId { get; set; }
        public Nullable<int> ProjectPhaseId { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public Nullable<int> OfferItemId { get; set; }
        public string LineCode { get; set; }
        public Nullable<int> ItemID { get; set; }
        public Nullable<decimal> ContrQty { get; set; }
        public Nullable<decimal> ItemQty { get; set; }
        public Nullable<decimal> ProdQty { get; set; }
        public Nullable<decimal> BilledQty { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> StdUnitPrice { get; set; }
        public Nullable<bool> IsOfferItem { get; set; }
        public Nullable<byte> ProductionType { get; set; }
        public string SlsITm_ItemCode { get; set; }
        public string SlsITm_DescA { get; set; }
        public string SlsITm_DescE { get; set; }
        public Nullable<int> ScopeID { get; set; }
        public string UomCode { get; set; }
        public Nullable<decimal> ProgQty { get; set; }
    }
    public class M_D_EngSpcDetails
    {
        public P_TR_EngProjectPhase P_TR_EngProjectPhase { get; set; }
        public List<P_TR_EngProjectItem> P_TR_EngProjectItem { get; set; }
        public List<P_TR_EngProjectActivity> P_TR_EngProjectActivity { get; set; }
    }

    public class M_D_EngSpcDetailsView
    {
        public List<PQ_GetEngProjectPhase> PQ_GetEngProjectPhase { get; set; }
        public List<PQ_GetEngProjectItem> PQ_GetEngProjectItem { get; set; }
        public List<PQ_GetEngProjectActivity> PQ_GetEngProjectActivity { get; set; }
    }
    // Resource Management
    public class M_D_ResOverTime
    {
        public P_TR_ResOverTime P_TR_ResOverTime { get; set; }
        public List<P_TR_ResOverTimeLabour> P_TR_ResOverTimeLabour { get; set; }
    }
    public class M_D_LabourAbsenceDetails
    {
        public P_TR_ResAbsence P_TR_ResAbsence { get; set; }
        public List<P_TR_ResAbsenceLabour> P_TR_ResAbsenceLabour { get; set; }
    }

    public class M_D_ItemPlan
    {
        public P_D_SalesItems P_D_SalesItems { get; set; }
        public List<P_D_SalesItemsActivity> P_D_SalesItemsActivity { get; set; }
    }
    public class M_D_Period
    {
        
        public List<P_G_Period> P_G_PeriodDetail { get; set; }
    }
    public class M_D_LaborAssign
    {
        public P_Tr_ResRequestLabour P_Tr_ResRequestLabour { get; set; }
        public List<P_TR_EngScheduleLabor> P_TR_EngScheduleLabor { get; set; }
    }
    public class M_D_EquipAssign
    {
        public P_TR_ResRequestEquipment P_TR_ResRequestEquipment { get; set; }
        public List<P_TR_EngScheduleEquip> P_TR_EngScheduleEquip { get; set; }
    }
    public class M_D_ReqMaterial
    {
        public P_TR_ResRequestMaterial P_TR_ResRequestMaterial { get; set; }
        public List<P_TR_ResRequestMaterialDetail> P_TR_ResRequestMaterialDetail { get; set; }
    }

    public class M_D_EngVariation
    {
        public P_TR_EngVariation P_TR_EngVariation { get; set; }
        public List<P_TR_EngVariationItem> P_TR_EngVariationItemDetail { get; set; }
        public List<P_TR_EngVariationActivity> P_TR_EngVariationActivityDetial { get; set; }
        public SessionRecord sessionRecord { get; set; }
    }
    
}