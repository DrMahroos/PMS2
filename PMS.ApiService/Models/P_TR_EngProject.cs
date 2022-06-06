//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PMS.ApiService.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class P_TR_EngProject
    {
        public int ProjectID { get; set; }
        public string ProjectCode { get; set; }
        public string DescA { get; set; }
        public string DescL { get; set; }
        public Nullable<int> OfferID { get; set; }
        public Nullable<int> OfferTrNo { get; set; }
        public Nullable<int> OfferTrSerial { get; set; }
        public Nullable<int> LocationId { get; set; }
        public Nullable<int> CustomerID { get; set; }
        public Nullable<int> SalesEngineerId { get; set; }
        public string CustomerAccCode { get; set; }
        public string CustomerTel { get; set; }
        public string CustomerMobile { get; set; }
        public string CustomerContact { get; set; }
        public Nullable<decimal> CC_CODE { get; set; }
        public Nullable<decimal> ProjArea { get; set; }
        public string ProjAddress { get; set; }
        public string ProjTechnicalSpecs { get; set; }
        public string ProjectTermsCond { get; set; }
        public string ContractCode { get; set; }
        public Nullable<System.DateTime> ContractDate { get; set; }
        public string ContractRefNo { get; set; }
        public Nullable<int> ContractPeriod { get; set; }
        public Nullable<decimal> ContractPrice { get; set; }
        public Nullable<decimal> ContractDiscountPrc { get; set; }
        public Nullable<decimal> ContractDiscountAmount { get; set; }
        public Nullable<decimal> ContractAdditions { get; set; }
        public Nullable<int> ContractDuration { get; set; }
        public string ContractWarantyPrd { get; set; }
        public Nullable<byte> PaymentMethod { get; set; }
        public Nullable<decimal> DownPaymentPrc { get; set; }
        public Nullable<decimal> DownPaymentAmount { get; set; }
        public Nullable<decimal> WarrntyPaymentPrc { get; set; }
        public Nullable<decimal> WarrntyPaymentAmount { get; set; }
        public Nullable<byte> Status { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public Nullable<decimal> OHMaterialPrc { get; set; }
        public Nullable<decimal> OHLaborPrc { get; set; }
        public Nullable<decimal> OHEquipPrc { get; set; }
        public Nullable<decimal> ProdOHMaterialPrc { get; set; }
        public Nullable<decimal> ProdOHLaborPrc { get; set; }
        public Nullable<decimal> ProdOHEquipPrc { get; set; }
        public Nullable<decimal> ProfitMarginPrc { get; set; }
        public Nullable<decimal> EstimatedMaterial { get; set; }
        public Nullable<decimal> EstimatedLabor { get; set; }
        public Nullable<decimal> EstimatedEquip { get; set; }
        public Nullable<decimal> EstimatedProfit { get; set; }
        public Nullable<decimal> EstimatedOH { get; set; }
        public Nullable<decimal> EstimatedPOH { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public Nullable<bool> ISPosted { get; set; }
        public Nullable<decimal> VatPrc { get; set; }
    }
}
