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
    
    public partial class PQ_SrchSalesOffer
    {
        public int OfferID { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<int> TrSerial { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public string RefCode { get; set; }
        public string DescA { get; set; }
        public string DescL { get; set; }
        public Nullable<System.DateTime> SendDate { get; set; }
        public Nullable<bool> IsMaintenanceWork { get; set; }
        public Nullable<bool> IsMainCustomerPay { get; set; }
        public Nullable<decimal> ProjArea { get; set; }
        public string ProjAddress { get; set; }
        public string ProjTechnicalSpecs { get; set; }
        public string ProjectTermsCond { get; set; }
        public string CustomerPONo { get; set; }
        public Nullable<byte> Status { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string Loc_LocCode { get; set; }
        public string Loc_DescA { get; set; }
        public string loc_DescE { get; set; }
        public string eng_EngCode { get; set; }
        public string Eng_DescA { get; set; }
        public string Eng_DescE { get; set; }
        public Nullable<int> cus_CustomerCode { get; set; }
        public Nullable<bool> cus_IsTemporary { get; set; }
        public string cus_DescA { get; set; }
        public string Cus_DescE { get; set; }
        public string ContractCode { get; set; }
        public Nullable<decimal> ContractNetPrice { get; set; }
        public string StatusType { get; set; }
        public string Stat_DescA { get; set; }
        public string Stat_DescE { get; set; }
    }
}
